require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

// =====================================================================
//  AJOUT NON DESTRUCTIF de nouveaux produits (≠ seed.js qui fait
//  deleteMany). On insère seulement les produits absents (par `name`).
//  Lancer :  node add-new-products.js
//  PRIX = PLACEHOLDERS — à ajuster dans /admin/produits.
// =====================================================================

const TAILLES_FEMME = ['S', 'M', 'L', 'XL', 'XXL']
const TAILLES_HOMME = ['M', 'L', 'XL', 'XXL']
const TAILLES_BURKINI = ['M', 'L', 'XL', '2XL', '3XL', '4XL']

// ⚠️  Les produits dont l'image est encore un `.jpeg` utilisent la photo
//     source d'origine (logos concurrents visibles) — TEMPORAIRE jusqu'à
//     génération de la photo « on-model » en `.webp` (même slug).
const NOUVEAUX = [
  // ── FEMME · SOUS-VÊTEMENTS (images on-model prêtes) ───────────────
  {
    name: 'Ensemble lingerie soutien-gorge + culotte — rouge',
    description:
      'Parure 2 pièces en rouge : soutien-gorge push-up à nœud satin et culotte assortie à nœud. Coupe galbante et confortable.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 149,
    discount: 0,
    images: ['/parure-sg-culotte-rouge.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Rouge'],
    featured: true,
    newArrival: true,
  },
  {
    name: 'Ensemble lingerie soutien-gorge + culotte — crème',
    description:
      'Parure 2 pièces en crème satiné : soutien-gorge push-up et culotte à finitions volantées. Douce et élégante.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 149,
    discount: 0,
    images: ['/parure-sg-culotte-creme.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Crème'],
    newArrival: true,
  },

  // ── FEMME · MAILLOTS DE BAIN & BURKINI (images .jpeg temporaires) ──
  {
    name: 'Burkini 3 pièces imprimé floral — rouge & gris',
    description:
      'Burkini couvrant 3 pièces : tunique zippée à ceinture imprimée floral, legging et bonnet assortis. Tissu de bain extensible et opaque.',
    category: 'femme',
    subcategory: 'maillots',
    price: 299,
    discount: 0,
    images: ['/burkini-marelisa-floral-rouge.jpeg'],
    sizes: TAILLES_BURKINI,
    colors: ['Rouge', 'Gris'],
    featured: true,
    newArrival: true,
  },
  {
    name: 'Burkini long zippé manches longues — bleu marbré',
    description:
      'Burkini long à fermeture zippée et capuche, imprimé marbré bleu, porté sur legging de bain assorti. Couvrance totale.',
    category: 'femme',
    subcategory: 'maillots',
    price: 289,
    discount: 0,
    images: ['/burkini-dms-bleu-marbre.jpeg'],
    sizes: TAILLES_BURKINI,
    colors: ['Bleu'],
    newArrival: true,
  },
  {
    name: 'Burkini long zippé manches longues — marine imprimé',
    description:
      'Burkini long zippé à capuche, haut marine et bas imprimé contrasté, legging de bain assorti. Séchage rapide.',
    category: 'femme',
    subcategory: 'maillots',
    price: 289,
    discount: 0,
    images: ['/burkini-dms-marine-imprime.jpeg'],
    sizes: TAILLES_BURKINI,
    colors: ['Marine'],
    newArrival: true,
  },
  {
    name: 'Burkini long zippé manches longues — noir camouflage',
    description:
      'Burkini long zippé à capuche, noir à imprimé camouflage multicolore, legging de bain assorti. Couvrance complète.',
    category: 'femme',
    subcategory: 'maillots',
    price: 289,
    discount: 0,
    images: ['/burkini-dms-noir-camo.jpeg'],
    sizes: TAILLES_BURKINI,
    colors: ['Noir'],
    newArrival: true,
  },
  {
    name: 'Burkini long zippé manches longues — bordeaux & noir',
    description:
      'Burkini long zippé à capuche, bicolore bordeaux et noir, legging de bain assorti. Élégant et couvrant.',
    category: 'femme',
    subcategory: 'maillots',
    price: 289,
    discount: 0,
    images: ['/burkini-dms-bordeaux-noir.jpeg'],
    sizes: TAILLES_BURKINI,
    colors: ['Bordeaux', 'Noir'],
    newArrival: true,
  },

  // ── FEMME · PYJAMAS & ROBES DE CHAMBRE (images .jpeg temporaires) ──
  {
    name: 'Ensemble loungewear imprimé tunique + pantalon — marine',
    description:
      'Ensemble détente : tunique manches longues et pantalon large assorti, imprimé coloré (fleurs, feuilles). Tissu doux et fluide.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 199,
    discount: 0,
    images: ['/loungewear-imprime-coord-marine.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Marine'],
    newArrival: true,
  },
  {
    name: 'Ensemble caraco dentelle + corsaire — noir',
    description:
      'Ensemble 2 pièces : caraco à empiècement dentelle dans le dos et corsaire assorti à inserts dentelle. Coupe confortable grande taille.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 169,
    discount: 0,
    images: ['/loungewear-caraco-dentelle-capri-noir.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
    newArrival: true,
  },
  {
    name: 'Peignoir éponge à capuche rayé — turquoise',
    description:
      'Peignoir en éponge à capuche, rayures turquoise et grises, ceinture à nouer et poches. Doux et absorbant.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 219,
    discount: 0,
    images: ['/peignoir-eponge-capuche-raye-turquoise.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Turquoise'],
  },
  {
    name: 'Peignoir éponge col châle — gris',
    description:
      'Peignoir en éponge moelleuse à col châle, ceinture à nouer et deux poches. Chaud et enveloppant.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 219,
    discount: 0,
    images: ['/peignoir-eponge-col-chale-gris.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Gris'],
  },

  // ── FEMME · SOUS-VÊTEMENTS (images .jpeg temporaires) ─────────────
  {
    name: 'Soutien-gorge dentelle sans armatures — blanc',
    description:
      'Soutien-gorge sans armatures à bonnets en dentelle florale, bretelles réglables et petit nœud central. Maintien doux.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 99,
    discount: 0,
    images: ['/soutien-gorge-dentelle-blanc.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Blanc'],
  },
  {
    name: 'Brassière sans coutures — multicolore',
    description:
      'Brassière triangle sans coutures, fines bretelles réglables et bande souple. Plusieurs coloris disponibles.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 79,
    discount: 0,
    images: ['/brassiere-channo.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Beige', 'Blanc', 'Rose', 'Fuchsia', 'Turquoise', 'Pêche', 'Bleu jean', 'Noir'],
    newArrival: true,
  },
  {
    name: 'Gaine-short dentelle galbante — beige',
    description:
      'Gaine-short taille haute en tissu lisse galbant avec empiècements dentelle sur les côtés. Effet gainant discret.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 129,
    discount: 0,
    images: ['/gaine-short-dentelle-beige.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Beige'],
  },

  // ── FEMME · HOMEWEAR & SPORT (images .jpeg temporaires) ───────────
  {
    name: 'Ensemble brassière + cycliste sport — coloris assortis',
    description:
      'Ensemble 2 pièces : brassière de sport et short cycliste taille haute assorti. Maille extensible, plusieurs coloris.',
    category: 'femme',
    subcategory: 'homewear',
    price: 149,
    discount: 0,
    images: ['/ensemble-brassiere-cycliste-sport.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Rose', 'Beige', 'Mauve'],
    newArrival: true,
  },
  {
    name: 'Brassière de sport dos croisé — coloris assortis',
    description:
      'Brassière de sport coupe crop, dos croisé et large bande de maintien. Plusieurs coloris disponibles.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/brassiere-sport-dos-croise.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Gris', 'Noir', 'Fuchsia', 'Écru', 'Vert'],
  },
  {
    name: 'Legging capri dentelle — noir',
    description:
      'Legging court (capri) en coton doux, large ceinture confort et bord en dentelle. Coupe galbante.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/legging-capri-dentelle-noir.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
  },
  {
    name: 'Legging capri imprimé fleuri — marine',
    description:
      'Legging court (capri) marine à imprimé floral, ceinture confort élastiquée. Doux et extensible.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/legging-capri-fleuri-marine.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Marine'],
  },
  {
    name: 'Legging capri à bord dentelle — noir / blanc',
    description:
      'Legging court (capri) à large ceinture confort et bord en dentelle, disponible en noir et blanc.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/legging-capri-lina-3674.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Noir', 'Blanc'],
  },
  {
    name: 'Legging capri uni — beige / blanc / noir',
    description:
      'Legging court (capri) en maille douce, ceinture haute confort, disponible en beige, blanc et noir.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/legging-capri-lina-4564.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Beige', 'Blanc', 'Noir'],
  },
  {
    name: 'Legging capri homewear — noir',
    description:
      'Legging court (capri) homewear noir, large ceinture souple et bord en dentelle. Confort au quotidien.',
    category: 'femme',
    subcategory: 'homewear',
    price: 79,
    discount: 0,
    images: ['/legging-capri-lina-homewear-noir.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
  },
  {
    name: 'Legging long uni — noir',
    description:
      'Legging long en maille opaque lisse, ceinture haute confort. Basique indispensable.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/legging-long-noir-7600.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
  },
  {
    name: 'Ensemble thermique haut + legging — blanc / noir',
    description:
      'Ensemble sous-vêtement thermique : haut manches longues à col rond et legging assorti, disponible en blanc et noir. Chaud et léger.',
    category: 'femme',
    subcategory: 'homewear',
    price: 159,
    discount: 0,
    images: ['/ensemble-thermique-lina-5789.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Blanc', 'Noir'],
  },

  // ── HOMME (image .jpeg temporaire) ────────────────────────────────
  {
    name: 'Ensemble t-shirt + short imprimé plage — marine',
    description:
      'Ensemble homme été : t-shirt manches courtes marine à col contrasté et short imprimé assorti. Coton léger.',
    category: 'homme',
    subcategory: 'homewear',
    price: 199,
    discount: 0,
    images: ['/ensemble-homme-tshirt-short-plage-marine.jpeg'],
    sizes: TAILLES_HOMME,
    colors: ['Marine'],
    newArrival: true,
  },
]

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté — ajout des nouveaux produits...')
  let added = 0
  let skipped = 0
  for (const p of NOUVEAUX) {
    const exists = await Product.exists({ name: p.name })
    if (exists) {
      console.log(`↷ déjà présent, ignoré : ${p.name}`)
      skipped++
      continue
    }
    await Product.create(p) // create() déclenche le hook de slug
    console.log(`✓ ajouté : ${p.name}`)
    added++
  }
  console.log(`Terminé. ${added} ajouté(s), ${skipped} ignoré(s).`)
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
