const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    qty: Number,
    size: String,
    color: String,
    image: String,
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    // Référence courte lisible (ex : CMD-3F7A2)
    ref: { type: String, unique: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
      note: { type: String, default: '' },
    },
    items: { type: [orderItemSchema], default: [] },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    // nouvelle | confirmée | expédiée | livrée | annulée
    status: { type: String, default: 'nouvelle' },
  },
  { timestamps: true }
)

orderSchema.pre('save', function (next) {
  if (!this.ref) {
    this.ref = 'CMD-' + Math.random().toString(36).slice(2, 7).toUpperCase()
  }
  next()
})

module.exports = mongoose.model('Order', orderSchema)
