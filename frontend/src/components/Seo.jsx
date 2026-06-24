import { Head } from "vite-react-ssg";
import { SITE } from "../data/config";

// Métadonnées par page : <title>, description, canonical, Open Graph, Twitter.
// `children` permet d'injecter du JSON-LD (<script type="application/ld+json">).
//
//   path      chemin absolu de la page (ex: "/categorie/femme/pyjamas")
//   image     URL d'image OG (relative au site ou absolue)
//   type      "website" (défaut) ou "product"
//   noindex   true pour exclure la page de l'indexation
export default function Seo({
  title,
  description,
  path = "",
  image,
  type = "website",
  noindex = false,
  children,
}) {
  const url = SITE.origin + path;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : SITE.origin + image
    : `${SITE.origin}/og-image.jpg`;

  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="fr_MA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Head>
  );
}
