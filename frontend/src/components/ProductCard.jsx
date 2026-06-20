import { Link } from "react-router-dom";
import { finalPrice } from "../api";
import { SITE } from "../data/config";

export default function ProductCard({ product }) {
  const price = finalPrice(product);
  const img = (product.images && product.images[0]) || "/placeholder.svg";

  return (
    <Link to={`/produit/${product.slug || product._id}`} className="card">
      <div className="card__media">
        <img src={img} alt={product.name} loading="lazy" />
        {product.discount > 0 && (
          <span className="card__badge card__badge--sale">-{product.discount}%</span>
        )}
        {product.newArrival && (
          <span className="card__badge card__badge--new">Nouveau</span>
        )}
        {!product.inStock && (
          <span className="card__badge card__badge--out">Épuisé</span>
        )}
      </div>
      <div className="card__body">
        <h3 className="card__name">{product.name}</h3>
        <div className="card__price">
          <span className="card__price-now">
            {price} {SITE.currency}
          </span>
          {product.discount > 0 && (
            <span className="card__price-old">
              {product.price} {SITE.currency}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
