import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { CATEGORIES } from "./src/data/products.js";

const API = process.env.VITE_API_URL || "http://localhost:5000";

// Récupère la liste des slugs produits depuis le backend pour le prerender.
// Tolérant aux pannes : si le backend est injoignable, on prérend quand même
// l'accueil + les catégories (les fiches produits seront rendues côté client).
async function fetchProductSlugs() {
  try {
    const res = await fetch(`${API}/api/products?limit=1000`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const slugs = (data.products || [])
      .map((p) => p.slug || p._id)
      .filter(Boolean);
    console.log(`[ssg] ${slugs.length} fiches produits à prérendre`);
    return slugs;
  } catch (err) {
    console.warn(
      `[ssg] backend injoignable (${API}) — fiches produits non prérendues : ${err.message}`
    );
    return [];
  }
}

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    dirStyle: "nested", // /categorie/femme -> /categorie/femme/index.html
    formatting: "none",
    async includedRoutes() {
      const categoryPaths = CATEGORIES.flatMap((c) => [
        `/categorie/${c.slug}`,
        ...c.subcategories.map((s) => `/categorie/${c.slug}/${s.slug}`),
      ]);
      const productPaths = (await fetchProductSlugs()).map(
        (slug) => `/produit/${slug}`
      );
      // Accueil + catégories + sous-catégories + fiches produits.
      // Exclus volontairement : /admin/*, /commande, 404.
      return ["/", ...categoryPaths, ...productPaths];
    },
  },
});
