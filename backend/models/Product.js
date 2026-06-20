const mongoose = require('mongoose')

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    // Catégorie principale : femme | homme | enfant
    category: { type: String, required: true },
    // Sous-catégorie : pyjamas | sous-vetements | homewear | maternite | fille | garcon
    subcategory: { type: String, default: '' },
    price: { type: Number, required: true },
    // Pourcentage de remise (0–100). Le prix barré est calculé côté client.
    discount: { type: Number, default: 0, min: 0, max: 100 },
    images: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    slug: { type: String, unique: true, sparse: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', category: 'text', subcategory: 'text' })

productSchema.pre('save', async function () {
  if (this.slug) return
  const base = generateSlug(this.name)
  let slug = base
  let i = 1
  while (await mongoose.model('Product').exists({ slug, _id: { $ne: this._id } })) {
    slug = `${base}-${i++}`
  }
  this.slug = slug
})

module.exports = mongoose.model('Product', productSchema)
