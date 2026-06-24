// Optimisation des images : Cloudinary à la volée + WebP local.
import WEBP_MANIFEST from "../data/webp-manifest.json";

const webpSet = new Set(WEBP_MANIFEST);

// Cloudinary : insère f_auto (WebP/AVIF auto), q_auto et une largeur max.
// Sans effet sur les autres URLs. Idempotent.
export function cdn(src, width) {
  if (typeof src !== "string") return src;
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    if (/\/upload\/[^/]*(f_auto|q_auto)/.test(src)) return src; // déjà transformé
    const t = `f_auto,q_auto${width ? `,w_${width},c_limit` : ""}`;
    return src.replace("/upload/", `/upload/${t}/`);
  }
  return src;
}

// Pour une image locale .jpeg/.jpg disposant d'un frère .webp (cf. manifeste),
// renvoie le chemin .webp ; sinon null. Les images déjà en .webp renvoient null
// (la balise <img> les sert directement).
export function localWebp(src) {
  if (typeof src === "string" && webpSet.has(src)) {
    return src.replace(/\.(jpe?g)$/i, ".webp");
  }
  return null;
}
