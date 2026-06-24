import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { api, finalPrice } from "../api";
import { SITE } from "../data/config";
import { getCategory } from "../data/products";
import { useCart } from "../context/CartContext";
import Seo from "../components/Seo";
import Img from "../components/Img";

// Chargé au build (prerender) ET à la navigation client : les données produit
// sont donc présentes dans le HTML statique.
export async function productLoader({ params }) {
  try {
    return await api.getProduct(params.idOrSlug);
  } catch {
    return null;
  }
}

export default function ProductDetail() {
  const product = useLoaderData();
  const { add } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product?.sizes?.[0] || "");
  const [color, setColor] = useState(product?.colors?.[0] || "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product)
    return (
      <div className="container section">
        <Seo
          title="Produit introuvable | Vêtements Hiba"
          description="Ce produit n'est plus disponible."
          noindex
        />
        <h1>Produit introuvable</h1>
        <Link to="/" className="btn btn--outline">Retour à l'accueil</Link>
      </div>
    );

  const price = finalPrice(product);
  const images = product.images?.length ? product.images : ["/placeholder.svg"];
  const category = getCategory(product.category);
  const categoryName = category?.name || product.category;
  const path = `/produit/${product.slug || product._id}`;
  const absImages = images.map((src) =>
    src.startsWith("http") ? src : SITE.origin + src
  );

  const description =
    product.description ||
    `${product.name} — ${categoryName} disponible chez Vêtements Hiba. Livraison partout au Maroc, paiement à la livraison.`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: absImages,
    description,
    sku: product.slug || product._id,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      url: SITE.origin + path,
      priceCurrency: "MAD",
      price: String(price),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.origin + "/" },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName,
        item: `${SITE.origin}/categorie/${product.category}`,
      },
      { "@type": "ListItem", position: 3, name: product.name, item: SITE.origin + path },
    ],
  };

  const handleAdd = () => {
    add({ ...product, price, image: images[0] }, { size, color, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="container section pdp">
      <Seo
        title={`${product.name} — ${categoryName} | Vêtements Hiba`}
        description={description.slice(0, 155)}
        path={path}
        image={absImages[0]}
        type="product"
      >
        <script type="application/ld+json">{JSON.stringify(productLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Seo>

      <nav className="crumbs">
        <Link to="/">Accueil</Link> <span>/</span>{" "}
        <Link to={`/categorie/${product.category}`}>{categoryName}</Link>{" "}
        <span>/</span> <span>{product.name}</span>
      </nav>

      <div className="pdp__grid">
        <div className="pdp__gallery">
          <div className="pdp__main-img">
            <Img
              src={images[activeImg]}
              alt={product.name}
              cdnWidth={800}
              loading="eager"
            />
          </div>
          {images.length > 1 && (
            <div className="pdp__thumbs">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={i === activeImg ? "is-active" : ""}
                  onClick={() => setActiveImg(i)}
                >
                  <Img src={src} alt={`${product.name} ${i + 1}`} cdnWidth={160} />
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
