# Boutique — Pyjamas & Sous-vêtements (full-stack)

Site e-commerce de type [partners.ma](https://partners.ma) : pyjamas, sous-vêtements
et homewear pour femme, homme et enfant. Commande via panier → WhatsApp +
enregistrement en base, paiement à la livraison. Comprend un **tableau de bord
administrateur** pour gérer produits et commandes.

## Stack

| Partie     | Techno                                            |
| ---------- | ------------------------------------------------- |
| Frontend   | React 18 + Vite + React Router (CSS pur)          |
| Backend    | Node + Express + MongoDB (Mongoose)               |
| Auth admin | JWT + bcrypt                                      |
| Images     | Cloudinary (upload depuis l'admin)                |

## Structure

```
clothes/
├── backend/        API Express + MongoDB
│   ├── models/     Admin, Product, Order
│   ├── routes/     auth, products, orders, upload
│   ├── middleware/ auth (JWT), upload (multer)
│   ├── server.js
│   └── seed.js     produits d'exemple
└── frontend/       App React (boutique + admin)
    └── src/
        ├── pages/         Home, Category, ProductDetail, Checkout
        ├── pages/admin/   Login, Products, Orders, Settings
        ├── components/     Navbar, Footer, ProductCard, CartDrawer…
        ├── context/        CartContext, AuthContext
        ├── data/config.js  ← nom, WhatsApp, livraison (à personnaliser)
        └── api.js          client HTTP
```

## Démarrage local

### 1. Backend

```bash
cd backend
cp .env.example .env      # puis remplir les valeurs
npm install
npm run seed              # (optionnel) insère des produits d'exemple
npm run dev               # http://localhost:5000
```

`.env` à renseigner :

- `MONGODB_URI` — MongoDB local (`mongodb://127.0.0.1:27017/boutique`) ou Atlas
- `JWT_SECRET` — chaîne aléatoire longue
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — compte admin créé au 1er démarrage
- `CLOUDINARY_*` — clés Cloudinary (pour l'upload d'images produits)

### 2. Frontend

```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

(facultatif) `frontend/.env` → `VITE_API_URL=http://localhost:5000`

## Accès

- **Boutique** : http://localhost:5173
- **Admin** : http://localhost:5173/admin  (login = `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

## Personnalisation rapide

- **Nom, WhatsApp, email, frais de livraison** : `frontend/src/data/config.js`
- **Catégories / sous-catégories** : `frontend/src/data/products.js`
- **Produits & photos** : ajoutés depuis l'admin (`/admin/produits`)

## Déploiement (suggestion)

- Frontend → Vercel / Netlify (`npm run build`, dossier `dist`, `_redirects` déjà inclus)
- Backend → Render / Railway (MongoDB Atlas + Cloudinary)
- Pensez à mettre `FRONTEND_URL` (backend) et `VITE_API_URL` (frontend) en prod.
