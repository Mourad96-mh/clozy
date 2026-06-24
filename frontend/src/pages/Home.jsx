import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { CATEGORIES } from "../data/products";
import { SITE } from "../data/config";
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

export default function Home() {
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
        title="Vêtements Hiba — Pyjamas & homewear au Maroc"
        description="Vêtements Hiba : pyjamas, sous-vêtements, homewear et burkini pour femme, homme et enfant. Livraison partout au Maroc, paiement à la livraison."
        path="/"
      >
        <script type="application/ld+json">{JSON.stringify(businessLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      </Seo>

      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">{SITE.tagline}</p>
            <h1>Pyjamas, sous-vêtements &amp; homewear pour femme au Maroc</h1>
            <p className="hero__sub">
              Pyjamas, sous-vêtements et homewear pour toute la famille.
              Livraison partout au Maroc, paiement à la livraison.
            </p>
            <div className="hero__cta">
              <Link to="/categorie/femme" className="btn btn--primary">
                Femme
              </Link>
              <Link to="/categorie/homme" className="btn btn--outline">
                Homme
              </Link>
              <Link to="/categorie/enfant" className="btn btn--outline">
                Enfant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau avantages */}
      <section className="perks container">
        <div className="perk">🚚 Livraison partout au Maroc</div>
        <div className="perk">💵 Paiement à la livraison</div>
        <div className="perk">🔄 Échange facile</div>
        <div className="perk">⭐ Qualité garantie</div>
      </section>

      {/* Catégories */}
      <section className="container section">
        <h2 className="section__title">Nos catégories</h2>
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/categorie/${c.slug}`} className="cat-tile">
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Nouveautés */}
      <section className="container section">
        <div className="section__head">
          <h2 className="section__title">Nouveautés</h2>
        </div>
        {loading ? (
          <p className="muted">Chargement…</p>
        ) : newest.length === 0 ? (
          <p className="muted">Bientôt disponible.</p>
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
          <h2 className="section__title">Notre sélection</h2>
        </div>
        {!loading && featured.length > 0 && (
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
