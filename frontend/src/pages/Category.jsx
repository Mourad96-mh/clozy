import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link, Navigate, useLoaderData, useLocation } from "react-router-dom";
import { api } from "../api";
import { getCategory, getSubcategory } from "../data/products";
import { localizedCategory, localizedSub } from "../data/categories.ar";
import { localeFromPath, withLocale, t } from "../data/i18n";
import { SITE } from "../data/config";
import ProductCard from "../components/ProductCard";
import Seo from "../components/Seo";

// Chargé au build (prerender) ET à la navigation client : la grille produits
// est donc présente dans le HTML statique.
export async function categoryLoader({ params }) {
  try {
    const query = { category: params.slug };
    if (params.sub) query.subcategory = params.sub;
    const d = await api.getProducts(query);
    return d.products || [];
  } catch {
    return [];
  }
}

export default function Category() {
  const { slug, sub = "" } = useParams();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const str = t(locale);
  const lp = (p) => withLocale(p, locale);
  const category = getCategory(slug);

  // Le HTML statique date du build. On part des données prérendues (bonnes pour
  // le SEO / le 1er rendu) puis on revalide depuis l'API au montage afin de
  // refléter les modifs admin (prix, stock, nouveaux produits) sans rebuild.
  const [products, setProducts] = useState(useLoaderData() || []);

  useEffect(() => {
    let alive = true;
    const query = { category: slug };
    if (sub) query.subcategory = sub;
    api
      .getProducts(query)
      .then((d) => {
        if (alive) setProducts(d.products || []);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [slug, sub]);

  // Rétro-compatibilité : ancienne URL /categorie/femme?sub=pyjamas → nouveau chemin.
  const legacySub = searchParams.get("sub");
  if (legacySub && !sub) {
    return <Navigate to={lp(`/categorie/${slug}/${legacySub}`)} replace />;
  }

  if (!category) {
    return (
      <div className="container section">
        <Seo
          title={`${str.cat.notFound} | Vêtements Hiba`}
          description={str.cat.notFound}
          path={`/categorie/${slug}`}
          locale={locale}
          noindex
        />
        <h1>{str.cat.notFound}</h1>
        <Link to={lp("/")} className="btn btn--outline">{str.cat.back}</Link>
      </div>
    );
  }

  const locCategory = localizedCategory(category, locale);
  const subRaw = getSubcategory(slug, sub);
  const subData = subRaw ? localizedSub(slug, subRaw, locale) : undefined;
  const seo = (subData || locCategory).seo;
  const path = sub ? `/categorie/${slug}/${sub}` : `/categorie/${slug}`;
  const intro = subData?.intro;
  const faq = subData?.faq;

  // BreadcrumbList + FAQPage JSON-LD (noms + URLs dans la langue courante)
  const crumbItems = [
    { name: str.cat.home, url: SITE.origin + withLocale("/", locale) },
    { name: locCategory.name, url: SITE.origin + withLocale(`/categorie/${slug}`, locale) },
  ];
  if (subData) {
    crumbItems.push({ name: subData.name, url: SITE.origin + withLocale(path, locale) });
  }
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbItems.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
  const faqLd = faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <div className="container section">
      <Seo title={seo.title} description={seo.description} path={path} locale={locale} bilingual>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
        {faqLd && (
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        )}
      </Seo>

      <nav className="crumbs">
        <Link to={lp("/")}>{str.cat.home}</Link> <span>/</span>{" "}
        {subData ? (
          <>
            <Link to={lp(`/categorie/${slug}`)}>{locCategory.name}</Link> <span>/</span>{" "}
            <span>{subData.name}</span>
          </>
        ) : (
          <span>{locCategory.name}</span>
        )}
      </nav>

      <h1 className="page-title">{seo.h1}</h1>

      {/* Filtres sous-catégorie (liens crawlables) */}
      <div className="chips">
        <Link
          to={lp(`/categorie/${slug}`)}
          className={`chip ${!sub ? "is-active" : ""}`}
        >
          {str.cat.all}
        </Link>
        {category.subcategories.map((s) => (
          <Link
            key={s.slug}
            to={lp(`/categorie/${slug}/${s.slug}`)}
            className={`chip ${sub === s.slug ? "is-active" : ""}`}
          >
            {locale === "ar" ? localizedSub(slug, s, locale).name : s.name}
          </Link>
        ))}
      </div>

      {intro && <p className="cat-intro">{intro}</p>}

      {products.length === 0 ? (
        <p className="muted">{str.cat.empty}</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

      {faq?.length > 0 && (
        <section className="cat-faq section">
          <h2 className="section__title">{str.cat.faq}</h2>
          <dl className="faq-list">
            {faq.map((f) => (
              <div className="faq-item" key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
