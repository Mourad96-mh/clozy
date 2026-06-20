import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { api } from "../api";
import { getCategory } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Category() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sub = searchParams.get("sub") || "";
  const category = getCategory(slug);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = { category: slug };
    if (sub) params.subcategory = sub;
    api
      .getProducts(params)
      .then((d) => setProducts(d.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [slug, sub]);

  if (!category) {
    return (
      <div className="container section">
        <h1>Catégorie introuvable</h1>
        <Link to="/" className="btn btn--outline">Retour à l'accueil</Link>
      </div>
    );
  }

  const setSub = (value) => {
    const next = {};
    if (value) next.sub = value;
    setSearchParams(next);
  };

  return (
    <div className="container section">
      <nav className="crumbs">
        <Link to="/">Accueil</Link> <span>/</span> <span>{category.name}</span>
      </nav>
      <h1 className="page-title">{category.name}</h1>

      {/* Filtres sous-catégorie */}
      <div className="chips">
        <button
          className={`chip ${!sub ? "is-active" : ""}`}
          onClick={() => setSub("")}
        >
          Tout
        </button>
        {category.subcategories.map((s) => (
          <button
            key={s.slug}
            className={`chip ${sub === s.slug ? "is-active" : ""}`}
            onClick={() => setSub(s.slug)}
          >
            {s.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="muted">Chargement…</p>
      ) : products.length === 0 ? (
        <p className="muted">Aucun produit dans cette catégorie pour le moment.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
