import { cdn, localWebp } from "../utils/image";

// Image optimisée :
//  • URLs Cloudinary → transformation f_auto/q_auto/w_ (WebP/AVIF auto).
//  • Images locales .jpeg ayant un frère .webp → <picture> avec repli JPEG.
//  • Autres (déjà .webp, SVG…) → <img> simple.
//
// `cdnWidth` est un indice de largeur pour Cloudinary (pas un attribut HTML, afin
// de ne pas perturber la mise en page).
export default function Img({ src, alt = "", cdnWidth, loading = "lazy", ...rest }) {
  const optimized = cdn(src, cdnWidth);
  const webp = localWebp(src);
  const img = <img src={optimized} alt={alt} loading={loading} {...rest} />;
  if (!webp) return img;
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      {img}
    </picture>
  );
}
