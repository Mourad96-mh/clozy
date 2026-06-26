import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link, Navigate, useLoaderData } from "react-router-dom";
import { api } from "../api";
import { getCategory, getSubcategory } from "../data/products";
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
    return <Navigate to={`/categorie/${slug}/${legacySub}`} replace />;
  }

  if (!category) {
    return (
      <div className="container section">
        <Seo
          title="Catégorie introuvable | Vêtements Hiba"
          description="Cette catégorie n'existe pas."
          path={`/categorie/${slug}`}
          noindex
        />
        <h1>Catégorie introuvable</h1>
        <Link to="/" className="btn btn--outline">Retour à l'accueil</Link>
      </div>
    );
  }

  const subData = getSubcategory(slug, sub);
  const seo = (subData || category).seo;
  const path = sub ? `/categorie/${slug}/${sub}` : `/categorie/${slug}`;
  const intro = subData?.intro;
  const faq = subData?.faq;

  // BreadcrumbList + FAQPage JSON-LD
  const crumbItems = [
    { name: "Accueil", url: SITE.origin + "/" },
    { name: category.name, url: `${SITE.origin}/categorie/${slug}` },
  ];
  if (subData) {
    crumbItems.push({ name: subData.name, url: SITE.origin + path });
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
      <Seo title={seo.title} description={seo.description} path={path}>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
        {faqLd && (
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        )}
      </Seo>

      <nav className="crumbs">
        <Link to="/">Accueil</Link> <span>/</span>{" "}
        {subData ? (
          <>
            <Link to={`/categorie/${slug}`}>{category.name}</Link> <span>/</span>{" "}
            <span>{subData.name}</span>
          </>
        ) : (
          <span>{category.name}</span>
        )}
      </nav>

      <h1 className="page-title">{seo.h1}</h1>

      {/* Filtres sous-catégorie (liens crawlables) */}
      <div className="chips">
        <Link
          to={`/categorie/${slug}`}
          className={`chip ${!sub ? "is-active" : ""}`}
        >
          Tout
        </Link>
        {category.subcategories.map((s) => (
          <Link
            key={s.slug}
            to={`/categorie/${slug}/${s.slug}`}
            className={`chip ${sub === s.slug ? "is-active" : ""}`}
          >
            {s.name}
          </Link>
        ))}
      </div>

      {intro && <p className="cat-intro">{intro}</p>}

      {products.length === 0 ? (
        <p className="muted">Aucun produit dans cette catégorie pour le moment.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

      {faq?.length > 0 && (
        <section className="cat-faq section">
          <h2 className="section__title">Questions fréquentes</h2>
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
