import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api, finalPrice } from "../api";
import { SITE } from "../data/config";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getProduct(idOrSlug)
      .then((p) => {
        setProduct(p);
        setSize(p.sizes?.[0] || "");
        setColor(p.colors?.[0] || "");
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [idOrSlug]);

  if (loading) return <div className="container section"><p className="muted">Chargement…</p></div>;
  if (!product)
    return (
      <div className="container section">
        <h1>Produit introuvable</h1>
        <Link to="/" className="btn btn--outline">Retour à l'accueil</Link>
      </div>
    );

  const price = finalPrice(product);
  const images = product.images?.length ? product.images : ["/placeholder.svg"];

  const handleAdd = () => {
    add(
      { ...product, price, image: images[0] },
      { size, color, qty }
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="container section pdp">
      <nav className="crumbs">
        <Link to="/">Accueil</Link> <span>/</span>{" "}
        <Link to={`/categorie/${product.category}`}>{product.category}</Link>{" "}
        <span>/</span> <span>{product.name}</span>
      </nav>

      <div className="pdp__grid">
        <div className="pdp__gallery">
          <div className="pdp__main-img">
            <img src={images[activeImg]} alt={product.name} />
          </div>
          {images.length > 1 && (
            <div className="pdp__thumbs">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={i === activeImg ? "is-active" : ""}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={src} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp__info">
          <h1>{product.name}</h1>
          <div className="pdp__price">
            <span className="pdp__price-now">{price} {SITE.currency}</span>
            {product.discount > 0 && (
              <>
                <span className="pdp__price-old">{product.price} {SITE.currency}</span>
                <span className="pdp__price-badge">-{product.discount}%</span>
              </>
            )}
          </div>

          {product.description && <p className="pdp__desc">{product.description}</p>}

          {product.sizes?.length > 0 && (
            <div className="pdp__opt">
              <label>Taille</label>
              <div className="pdp__choices">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`choice ${size === s ? "is-active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors?.length > 0 && (
            <div className="pdp__opt">
              <label>Couleur</label>
              <div className="pdp__choices">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={`choice ${color === c ? "is-active" : ""}`}
                    onClick={() => setColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pdp__opt">
            <label>Quantité</label>
            <div className="pdp__qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          {product.inStock ? (
            <button className="btn btn--primary btn--block" onClick={handleAdd}>
              {added ? "✓ Ajouté au panier" : "Ajouter au panier"}
            </button>
          ) : (
            <button className="btn btn--block" disabled>Épuisé</button>
          )}

          <button
            className="btn btn--whatsapp btn--block"
            onClick={() => {
              const text = encodeURIComponent(
                `Bonjour, je suis intéressé(e) par : ${product.name} (${price} ${SITE.currency})`
              );
              window.open(`https://wa.me/${SITE.whatsapp}?text=${text}`, "_blank");
            }}
          >
            Commander sur WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
