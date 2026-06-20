const express = require('express')
const Order = require('../models/Order')
const protect = require('../middleware/auth')

const router = express.Router()

// POST /api/orders  (public) — créée depuis le checkout
router.post('/', async (req, res) => {
  try {
    const { customer, items, subtotal, shipping, total } = req.body
    if (!customer || !items || items.length === 0)
      return res.status(400).json({ message: 'Commande invalide' })

    const order = await Order.create({ customer, items, subtotal, shipping, total })
    res.status(201).json({ ref: order.ref, id: order._id })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// GET /api/orders  (protégé) — liste pour le tableau de bord
router.get('/', protect, async (req, res) => {
  try {
    const { status } = req.query
    const filter = {}
    if (status) filter.status = status
    const orders = await Order.find(filter).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// GET /api/orders/:id  (protégé)
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Commande introuvable' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// PATCH /api/orders/:id  (protégé) — changer le statut
router.patch('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!order) return res.status(404).json({ message: 'Commande introuvable' })
    res.json(order)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE /api/orders/:id  (protégé)
router.delete('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) return res.status(404).json({ message: 'Commande introuvable' })
    res.json({ message: 'Commande supprimée' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router
