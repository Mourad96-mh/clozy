// =====================================================================
//  CATÉGORIES (statique) — les PRODUITS viennent de l'API backend.
// =====================================================================

export const CATEGORIES = [
  {
    slug: "femme",
    name: "Femme",
    subcategories: [
      { slug: "pyjamas", name: "Pyjamas & robes de chambre" },
      { slug: "sous-vetements", name: "Sous-vêtements" },
      { slug: "homewear", name: "Homewear & survêtements" },
      { slug: "maillots", name: "Maillots de bain & burkini" },
      { slug: "maternite", name: "Maternité" },
    ],
  },
  {
    slug: "homme",
    name: "Homme",
    subcategories: [
      { slug: "pyjamas", name: "Pyjamas & peignoirs" },
      { slug: "sous-vetements", name: "Sous-vêtements" },
      { slug: "homewear", name: "Survêtements" },
    ],
  },
  {
    slug: "enfant",
    name: "Enfant",
    subcategories: [
      { slug: "fille", name: "Fille" },
      { slug: "garcon", name: "Garçon" },
    ],
  },
];

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}
