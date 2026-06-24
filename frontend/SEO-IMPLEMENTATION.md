# SEO Implementation Tasks — Vêtements Hiba frontend

Engineering checklist for Claude Code. Work **top to bottom** (later tasks assume earlier
ones). Read `../CLAUDE.md` and `../../Clozy-SEO-Audit.md` first. After each task, run
`npm run build` and verify the **prerendered HTML** (in `dist/`) contains the expected
content — not just the JS bundle.

Current state (verified): client-only SPA, no per-page metadata (no `document.title`, no
helmet anywhere in `src/`), no `robots.txt`, no `sitemap.xml`, no JSON-LD, subcategories are
query params, deployed `dist/index.html` title is stale ("Boutique —" vs source "Vêtements Hiba —").

---

## TASK 0 — Set one site constant
In `src/data/config.js`, add the production origin so canonicals/sitemap/OG can use it:
```js
export const SITE = { /* …existing… */ origin: "https://vetementshiba.com" };
```
Use `SITE.origin` everywhere a fully-qualified URL is needed. **Acceptance:** no hard-coded
domains elsewhere.

---

## TASK 1 — 🔴 Make routes prerender to static HTML (the root fix)
Convert the storefront from CSR to **prerendered SSG** while keeping the React Router code.
Recommended: **`vite-react-ssg`** (least churn for this codebase). Next.js/Astro are fine if
you prefer, but `vite-react-ssg` maps 1:1 onto the current `src/`.

Steps:
1. `npm i vite-react-ssg` and switch `src/main.jsx` to its entry, exporting the routes.
2. Provide the dynamic route lists at build time:
   - categories/subcategories from `CATEGORIES` in `src/data/products.js`
   - product slugs by fetching the backend product list during `getStaticPaths`-equivalent.
3. Routes to prerender: `/`, each `/categorie/:slug`, each `/categorie/:slug/:sub`
   (see TASK 4), each `/produit/:slug`. **Exclude `/admin/*`** — keep it client-only.
4. Update `package.json` build script to the `vite-react-ssg build` command.

**Acceptance:** `dist/categorie/femme/pyjamas/index.html` (and a product page) contain the
real product/category markup and a correct `<title>` with JavaScript disabled.

---

## TASK 2 — 🔴 Per-page metadata via a shared `<Seo>` component
Create `src/components/Seo.jsx` using `vite-react-ssg`'s `<Head>` (or react-helmet-async if
you chose another stack). It must render, per page: `<title>`, `<meta name="description">`,
`<link rel="canonical" href="{SITE.origin}{path}">`, Open Graph (`og:title`,
`og:description`, `og:type`, `og:url`, `og:image`, `og:locale=fr_MA`), and twitter card.

Wire it into every page component:
- `Home.jsx` → title "Vêtements Hiba — Pyjamas, sous-vêtements & homewear au Maroc"
- `Category.jsx` → title/desc/H1 templated from the category + keyword map in `../CLAUDE.md`
- `ProductDetail.jsx` → title `"{product.name} — {category} | Vêtements Hiba"`, desc from product
- `NotFound.jsx` → `<meta name="robots" content="noindex">` and ensure it serves **HTTP 404**
- All `/admin/*` pages → `<meta name="robots" content="noindex,nofollow">`

**Acceptance:** every prerendered page has a **unique** title + description + self-canonical.
No two storefront pages share a title.

---

## TASK 3 — 🔴 robots.txt + build-time sitemap.xml
1. Add `public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Disallow: /admin
   Sitemap: https://vetementshiba.com/sitemap.xml
   ```
2. Add `scripts/generate-sitemap.mjs` that runs **after** prerender: scan `dist/` for
   `index.html` files (or build the URL list from `CATEGORIES` + product slugs), write
   `dist/sitemap.xml` with `<loc>` (absolute, `SITE.origin`) and `<lastmod>`. Exclude
   `/admin/*`, `/commande`, and 404. Wire it as a `postbuild` npm script.

**Acceptance:** `dist/robots.txt` and `dist/sitemap.xml` exist; sitemap lists home + every
category, subcategory, and product URL; no admin URLs. Submit in Google Search Console.

---

## TASK 4 — 🟠 Promote money subcategories to real paths
Today subcategories use `/categorie/femme?sub=pyjamas`. Add real routes in `App.jsx`:
```
<Route path="/categorie/:slug" element={<Category />} />
<Route path="/categorie/:slug/:sub" element={<Category />} />
```
Update `Category.jsx` to read `:sub` from the path (not the query string), update `Navbar.jsx`
links (`/categorie/${cat.slug}/${sub.slug}`), and 301-redirect the old `?sub=` URLs to the new
paths. These subcategory pages are the primary ranking pages — give each its own title/H1/copy.

**Acceptance:** `/categorie/femme/pyjamas` renders and is prerendered; old `?sub=` URLs redirect.

---

## TASK 5 — 🟠 JSON-LD structured data
Add JSON-LD (via the `<Head>` of the relevant components):
- **Layout/Home:** `Organization` + `LocalBusiness` (name, Casablanca address, `SITE.email`,
  WhatsApp, `areaServed: MA`) and `WebSite` with `SearchAction`.
- **ProductDetail:** `Product` + `Offer` (`priceCurrency: "MAD"`, price, availability, image,
  brand "Vêtements Hiba").
- **Category + Product:** `BreadcrumbList` mirroring the existing breadcrumb.

**Acceptance:** Google Rich Results Test passes for a product and the homepage with no errors.

---

## TASK 6 — 🟠 On-page content
- Rewrite each category/subcategory **H1** with its primary keyword (e.g. "Pyjamas femme"),
  and add **80–150 words** of intro copy + a 2–3 question FAQ to each money page
  (`Category.jsx` can render `category.intro` / `category.faq` added to `CATEGORIES`).
- Home H1 → "Pyjamas, sous-vêtements & homewear pour femme au Maroc" (keep the slogan as sub-text).
- Give each product a short unique description (2–3 sentences) if not already present.

**Acceptance:** no category page is a bare product grid; each has a keyword-rich H1 + copy.

---

## TASK 7 — 🟡 Image optimisation
Run the existing `backend/migrate-images-webp.js` (or a frontend `sharp` script) across
`frontend/public/` so every catalog image ships as **WebP** with responsive widths; keep
`loading="lazy"` and the existing `alt` text. Several JPEGs are 200–300 KB (e.g.
`burkini-marelisa-floral-rouge.jpeg` ≈ 287 KB) — these hurt LCP.

**Acceptance:** no catalog image > ~120 KB; `<img>` uses WebP + width/`srcset`.

---

## TASK 8 — 🟡 Final polish & redeploy
- Add a real OG image (1200×630) and `<meta name="theme-color">`.
- Pick one trailing-slash convention and enforce it (avoid duplicate URLs).
- **Rebuild and redeploy** to clear the stale `dist` title.
- In GSC: verify the property, submit `sitemap.xml`, request indexing for the money pages.

**Acceptance:** live `https://vetementshiba.com` source HTML shows the new per-page titles; sitemap
submitted; money pages requested for indexing.

---

### Definition of done (whole project)
View-source (JS disabled) on home, a category, a subcategory, and a product page each shows:
unique title + meta description + self-canonical + real content + valid JSON-LD; `robots.txt`
and `sitemap.xml` are live and correct; `/admin/*` is noindex and absent from the sitemap.
