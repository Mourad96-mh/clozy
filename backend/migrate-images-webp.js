// =====================================================================
//  Migration : bascule les chemins d'images locaux .jpeg/.jpg -> .webp
//  pour les produits déjà en base, UNIQUEMENT si le fichier .webp existe
//  dans frontend/public. Ne touche pas aux URLs externes (Cloudinary).
//
//  Usage :  node migrate-images-webp.js
// =====================================================================
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/Product')

const PUBLIC_DIR = path.join(__dirname, '..', 'frontend', 'public')

function toWebp(src) {
  // On ne traite que les chemins locaux à la racine (ex: "/foo.jpeg")
  if (typeof src !== 'string' || !src.startsWith('/')) return src
  if (!/\.(jpe?g)$/i.test(src)) return src

  const webpPath = src.replace(/\.(jpe?g)$/i, '.webp')
  const fileOnDisk = path.join(PUBLIC_DIR, webpPath.replace(/^\//, ''))
  return fs.existsSync(fileOnDisk) ? webpPath : src
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté — migration des images en cours...')

  const products = await Product.find({})
  let changed = 0

  for (const p of products) {
    const before = Array.isArray(p.images) ? [...p.images] : []
    const after = before.map(toWebp)

    if (JSON.stringify(before) !== JSON.stringify(after)) {
      p.images = after
      await p.save()
      changed++
      console.log(`  ✓ ${p.name}`)
      before.forEach((b, i) => {
        if (b !== after[i]) console.log(`      ${b}  ->  ${after[i]}`)
      })
    }
  }

  console.log(`\n${changed} produit(s) mis à jour sur ${products.length}.`)
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
