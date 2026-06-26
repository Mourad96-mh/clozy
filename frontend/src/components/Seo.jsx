import { Head } from "vite-react-ssg";
import { SITE } from "../data/config";
import { withLocale, dirFor, htmlLangFor, ogLocaleFor } from "../data/i18n";

// Métadonnées par page : <title>, description, canonical, Open Graph, Twitter,
// langue/direction du document et alternates hreflang (FR/AR).
// `children` permet d'injecter du JSON-LD (<script type="application/ld+json">).
//
//   path        chemin NEUTRE de la page sans préfixe de langue (ex: "/categorie/femme")
//   locale      "fr" (défaut) ou "ar" — la version arabe est servie sous "/ar"
//   bilingual   true => émet les liens hreflang FR ↔ AR ↔ x-default
//   image       URL d'image OG (relative au site ou absolue)
//   type        "website" (défaut) ou "product"
//   noindex     true pour exclure la page de l'indexation
export default function Seo({
  title,
  description,
  path = "/",
  locale = "fr",
  bilingual = false,
  image,
  type = "website",
  noindex = false,
  children,
}) {
  const url = SITE.origin + withLocale(path, locale);
  const frUrl = SITE.origin + withLocale(path, "fr");
  const arUrl = SITE.origin + withLocale(path, "ar");
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : SITE.origin + image
    : `${SITE.origin}/og-image.jpg`;

  return (
    <Head>
      <html lang={htmlLangFor(locale)} dir={dirFor(locale)} />

      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      {/* hreflang : versions linguistiques alternatives (pages bilingues) */}
      {bilingual && <link rel="alternate" hrefLang="fr-MA" href={frUrl} />}
      {bilingual && <link rel="alternate" hrefLang="ar-MA" href={arUrl} />}
      {bilingual && <link rel="alternate" hrefLang="x-default" href={frUrl} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={ogLocaleFor(locale)} />
      {bilingual && (
        <meta
          property="og:locale:alternate"
          content={ogLocaleFor(locale === "ar" ? "fr" : "ar")}
        />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Head>
  );
}
