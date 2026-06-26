import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../api";
import { CATEGORIES } from "../data/products";
import { CATEGORIES_AR } from "../data/categories.ar";
import { SITE } from "../data/config";
import { localeFromPath, withLocale, t } from "../data/i18n";
import ProductCard from "../components/ProductCard";
import Seo from "../components/Seo";

const businessLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: SITE.name,
  url: SITE.origin,
  image: `${SITE.origin}/og-image.jpg`,
  logo: `${SITE.origin}/logo.jpeg`,
  email: SITE.email,
  telephone: `+${SITE.whatsapp}`,
  sameAs: [SITE.instagram],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  areaServed: "MA",
  currenciesAccepted: "MAD",
  paymentAccepted: "Paiement à la livraison",
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.origin,
  inLanguage: "fr-MA",
};

// Visuel représentatif par catégorie pour la grille "Nos catégories".
const CAT_IMG = {
  femme: "/homewear-top-fleuri-pantalon-cotele-rose.webp",
  homme: "/pyjama-homme-pois-noir.webp",
  enfant: "/pyjama-fille-california-rose.webp",
};

export default function Home() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const str = t(locale);
  const lp = (p) => withLocale(p, locale);
  const catName = (c) =>
    locale === "ar" ? CATEGORIES_AR[c.slug]?.name || c.name : c.name;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: str.home.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const [featured, setFeatured] = useState([]);
  const [newest, setNewest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getProducts({ featured: "true", limit: 8 }),
      api.getProducts({ newArrival: "true", limit: 8 }),
    ])
      .then(([f, n]) => {
        setFeatured(f.products);
        setNewest(n.products);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Seo
        title={str.home.title}
        description={str.home.description}
        path="/"
        locale={locale}
        bilingual
      >
        <script type="application/ld+json">{JSON.stringify(businessLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Seo>

      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">{str.home.eyebrow}</p>
            <h1>{str.home.h1}</h1>
            <p className="hero__sub">{str.home.sub}</p>
            <div className="hero__cta">
              <Link to={lp("/categorie/femme")} className="btn btn--primary">
                {str.nav.femme}
              </Link>
              <Link to={lp("/categorie/homme")} className="btn btn--outline">
                {str.nav.homme}
              </Link>
              <Link to={lp("/categorie/enfant")} className="btn btn--outline">
                {str.nav.enfant}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau avantages */}
      <section className="perks container">
        {str.perks.map((p) => (
          <div className="perk" key={p}>{p}</div>
        ))}
      </section>

      {/* Catégories */}
      <section className="container section">
        <h2 className="section__title">{str.home.categories}</h2>
        <div className="gros-grid">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={lp(`/categorie/${c.slug}`)} className="gros-tile">
              <img src={CAT_IMG[c.slug]} alt={catName(c)} loading="lazy" />
              <span className="gros-tile__label">{catName(c)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Intro éditoriale (riche en mots-clés) */}
      <section className="container section home-intro">
        <h2 className="section__title">{str.home.intro.title}</h2>
        <p>{str.home.intro.body}</p>
      </section>

      {/* Nos univers — maillage interne vers les pages money */}
      <section className="container section">
        <h2 className="section__title">{str.home.universTitle}</h2>
        <div className="univers-grid">
          {str.home.univers.map((u) => (
            <Link key={u.to} to={lp(u.to)} className="univers-card">
              <span className="univers-card__title">{u.label}</span>
              <span className="univers-card__desc">{u.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Nouveautés */}
      <section className="container section">
        <div className="section__head">
          <h2 className="section__title">{str.home.newArrivals}</h2>
        </div>
        {loading ? (
          <p className="muted">{str.home.loading}</p>
        ) : newest.length === 0 ? (
          <p className="muted">{str.home.soon}</p>
        ) : (
          <div className="product-grid">
            {newest.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Sélection */}
      <section className="container section">
        <div className="section__head">
          <h2 className="section__title">{str.home.selection}</h2>
        </div>
        {!loading && featured.length > 0 && (
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Pourquoi nous choisir */}
      <section className="container section">
        <h2 className="section__title">{str.home.whyTitle}</h2>
        <div className="why-grid">
          {str.home.why.map((w) => (
            <div className="why-card" key={w.t}>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ accueil (FAQPage schema) */}
      <section className="container section">
        <h2 className="section__title">{str.home.faqTitle}</h2>
        <div className="faq">
          {str.home.faq.map((f) => (
            <details className="faq__item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Paragraphe SEO de clôture */}
      <section className="container section">
        <p className="seo-outro">{str.home.outro}</p>
      </section>
    </>
  );
}
