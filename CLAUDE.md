# CLAUDE.md — Vêtements Hiba project brain (read this first)

This file tells Claude Code what this project is and the rules to follow when making
changes. A full SEO audit lives at `../Clozy-SEO-Audit.md`; the step-by-step engineering
tasks live at `frontend/SEO-IMPLEMENTATION.md`. **Read all three before editing.**

## What this is
Vêtements Hiba — an e-commerce store selling **pyjamas, sous-vêtements, homewear, maillots/burkini
and maternité** for femme (primary), homme and enfant. Based in **Casablanca, Maroc**.
Cash-on-delivery + WhatsApp ordering. Domain: **vetementshiba.com**.

- Market: **Maroc** · Language: **Français (fr)** · Currency: **MAD (DH)**
- Brand config lives in `frontend/src/data/config.js` (name, whatsapp, email, city…).
- Categories are static in `frontend/src/data/products.js` (`CATEGORIES`); products come
  from the Express/MongoDB backend API (`frontend/src/api.js`).

## Stack
- **Frontend:** React 18 + Vite 5 + react-router-dom 6 — **currently a client-only SPA**
  (`frontend/index.html` ships `<div id="root">`, `public/_redirects` is `/* /index.html 200`).
- **Backend:** Node/Express + MongoDB (`backend/`), image handling via `sharp`.

## The SEO standard this project must meet
The site MUST ship **crawlable static HTML per route** (SSG / prerendered). A client-only
SPA is the weakest possible choice for SEO and is the #1 issue to fix. Concretely, every
route must have, in the initial HTML (no JS required):
1. Real page content (rendered server-side / prerendered).
2. A **unique** `<title>`, meta description, and self-referencing `<link rel="canonical">`.
3. `robots.txt` + a build-time generated `sitemap.xml`.
4. JSON-LD schema: `Organization`/`LocalBusiness`, `Product`/`Offer`, `BreadcrumbList`, `WebSite`.
5. Correct locale (`<html lang="fr">`, `og:locale=fr_MA`).

Keep `/admin/*` **client-only and `noindex`** — it must never be crawled or in the sitemap.

## Money pages (priority order)
1. `/categorie/femme/pyjamas` ★★ — biggest on-catalog demand (~11.6k searches/mo, Low comp.)
2. `/categorie/femme/sous-vetements` ★ (~2k/mo)
3. `/categorie/femme/homewear`
4. `/categorie/femme/maillots-burkini` (niche wedge)
5. `/categorie/femme/maternite`
6. `/categorie/homme/pyjamas`
7. Home `/` (brand + "pyjama femme maroc" + local)

Subcategories are currently **query params** (`/categorie/femme?sub=pyjamas`). Promote the
money ones to **real crawlable paths** (`/categorie/femme/pyjamas`).

## Keyword → page reference (use these for titles/H1/copy)
| Page | Primary kw | Secondary |
|---|---|---|
| femme/pyjamas | pyjama femme | pyjama pour femme, pyjama femme maroc, ensemble pyjama femme, pyjama coton/hiver/short |
| femme/sous-vetements | sous vêtement femme | lingerie femme, culotte femme, caleçon femme |
| femme/homewear | homewear femme | loungewear, vêtement d'intérieur |
| femme/maillots-burkini | burkini femme | maillot de bain femme, burkini maroc |
| femme/maternite | vêtement grossesse | pyjama maternité, homewear grossesse |
| homme/pyjamas | pyjama homme | peignoir homme |
| home / | pyjama femme maroc | magasin de vêtement femme, sous-vêtements, homewear |

Full clustered keyword data: `../clozy-keywords-clustered.csv`.
Consolidate `pyjama femme` / `pyjama pour femme` / `femme pyjama` onto **one** page
(they're the same intent — don't create duplicates).

## Working rules
- Don't break the existing cart / checkout / admin flows or the backend API contract.
- French, idiomatic copy. Titles ≤ 60 chars, meta descriptions ≤ 155 chars, one `<h1>` per page.
- Set the real domain once (canonicals/sitemap/OG depend on it) — keep it in one constant.
- After each change, rebuild and confirm the rendered HTML (not the JS bundle) contains the
  title/meta/content. Validate schema (Rich Results Test) and submit the sitemap in GSC.
- Make metadata/sitemap **dynamic** so new products/categories are covered automatically.
