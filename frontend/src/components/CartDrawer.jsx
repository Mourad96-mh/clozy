import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SITE } from "../data/config";

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, shipping, total, count, setQty, remove } = useCart();
  const navigate = useNavigate();

  const goCheckout = () => {
    onClose();
    navigate("/commande");
  };

  return (
    <>
      <div
        className={`drawer__overlay ${open ? "is-open" : ""}`}
        onClick={onClose}
      />
      <aside className={`drawer ${open ? "is-open" : ""}`}>
        <div className="drawer__head">
          <h2>Mon panier ({count})</h2>
          <button onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        {items.length === 0 ? (
          <div className="drawer__empty">
            <p>Votre panier est vide.</p>
          </div>
        ) : (
          <>
            <div className="drawer__items">
              {items.map((i) => (
                <div className="drawer__item" key={i.key}>
                  <img src={i.image || "/placeholder.svg"} alt={i.name} />
                  <div className="drawer__item-info">
                    <p className="drawer__item-name">{i.name}</p>
                    <p className="drawer__item-opts">
                      {[i.size, i.color].filter(Boolean).join(" · ")}
                    </p>
                    <div className="drawer__qty">
                      <button onClick={() => setQty(i.key, i.qty - 1)}>−</button>
                      <span>{i.qty}</span>
                      <button onClick={() => setQty(i.key, i.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div className="drawer__item-right">
                    <span>{i.qty * i.price} {SITE.currency}</span>
                    <button
                      className="drawer__remove"
                      onClick={() => remove(i.key)}
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawer__foot">
              <div className="drawer__row">
                <span>Sous-total</span>
                <span>{subtotal} {SITE.currency}</span>
              </div>
              <div className="drawer__row">
                <span>Livraison</span>
                <span>{shipping === 0 ? "Gratuite" : `${shipping} ${SITE.currency}`}</span>
              </div>
              <div className="drawer__row drawer__row--total">
                <span>Total</span>
                <span>{total} {SITE.currency}</span>
              </div>
              <button className="btn btn--primary btn--block" onClick={goCheckout}>
                Commander
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
