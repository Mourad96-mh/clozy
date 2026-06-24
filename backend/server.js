require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Admin = require('./models/Admin')

const app = express()

// ── Middleware ────────────────────────────────────────────────
// Construit la liste blanche : localhost (dev) + FRONTEND_URL, en autorisant
// automatiquement les variantes www / non-www (ex: vetementshiba.com et
// www.vetementshiba.com) pour éviter les blocages CORS selon le domaine servi.
function buildAllowedOrigins() {
  const origins = ['http://localhost:5173', 'http://localhost:3000']
  const front = process.env.FRONTEND_URL
  if (front) {
    const clean = front.replace(/\/$/, '') // sans slash final
    origins.push(clean)
    try {
      const u = new URL(clean)
      const host = u.host.replace(/^www\./, '')
      origins.push(`${u.protocol}//${host}`)
      origins.push(`${u.protocol}//www.${host}`)
    } catch (_) {
      // FRONTEND_URL mal formé : on garde au moins la valeur brute.
    }
  }
  return [...new Set(origins)]
}

const allowedOrigins = buildAllowedOrigins()

app.use(
  cors({
    // Autorise aussi les requêtes sans Origin (curl, health checks).
    origin: (origin, cb) =>
      !origin || allowedOrigins.includes(origin)
        ? cb(null, true)
        : cb(new Error(`Origin non autorisée par CORS : ${origin}`)),
    credentials: true,
  })
)
app.use(express.json())

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/upload', require('./routes/upload'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// ── Base de données + démarrage ───────────────────────────────
async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connecté')

    // Crée un admin par défaut si aucun n'existe
    const adminExists = await Admin.findOne()
    if (!adminExists && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      console.log(`Admin créé: ${process.env.ADMIN_EMAIL}`)
    }

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`))
  } catch (err) {
    console.error('Erreur démarrage:', err)
    process.exit(1)
  }
}

start()
