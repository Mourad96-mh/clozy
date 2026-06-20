import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, buildWhatsappLink } from "../context/CartContext";
import { api } from "../api";
import { SITE } from "../data/config";

export default function Checkout() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null); // { ref }
  const [error, setError] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone || !form.city || !form.address) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        customer: form,
        items: items.map((i) => ({
          name: i.name,
          price: i.price,
          qty: i.qty,
          size: i.size,
          color: i.color,
          image: i.image,
        })),
        subtotal,
        shipping,
        total,
      };
      let ref = "";
      try {
        const r = await api.createOrder(payload);
        ref = r.ref;
      } catch {
        // Si le backend est indisponible, on continue quand même via WhatsApp.
      }
      // Ouvre WhatsApp avec la commande pré-remplie
      const link = buildWhatsappLink(items, { subtotal, shipping, total }, form);
      window.open(link, "_blank");
      clear();
      setDone({ ref: ref || "—" });
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="container section narrow">
        <div className="confirm">
          <div className="confirm__icon">✓</div>
          <h1>Commande envoyée !</h1>
          <p>
            Merci. Votre commande {done.ref !== "—" && <strong>({done.ref})</strong>} a bien
            été enregistrée. Nous vous contactons rapidement pour confirmer la livraison.
          </p>
          <p className="muted">
            Si la fenêtre WhatsApp ne s'est pas ouverte, contactez-nous au +{SITE.whatsapp}.
          </p>
          <Link to="/" className="btn btn--primary">Continuer mes achats</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container section narrow">
        <h1>Votre panier est vide</h1>
        <Link to="/" className="btn btn--primary">Voir les produits</Link>
      </div>
    );
  }

  return (
    <div className="container section checkout">
      <h1 className="page-title">Finaliser ma commande</h1>
      <div className="checkout__grid">
        <form className="checkout__form" onSubmit={submit}>
          <h2>Coordonnées de livraison</h2>
          {error && <div className="alert alert--error">{error}</div>}

          <label>
            Nom complet *
            <input name="name" value={form.name} onChange={update} required />
          </label>
          <label>
            Téléphone *
            <input name="phone" value={form.phone} onChange={update} required />
          </label>
          <label>
            Ville *
            <input name="city" value={form.city} onChange={update} required />
          </label>
          <label>
            Adresse complète *
            <input name="address" value={form.address} onChange={update} required />
          </label>
          <label>
            Note (facultatif)
            <textarea name="note" value={form.note} onChange={update} rows={3} />
          </label>

          <button className="btn btn--primary btn--block" disabled={submitting}>
            {submitting ? "Envoi…" : "Confirmer la commande"}
          </button>
          <p className="checkout__hint">
            💵 Paiement à la livraison. Votre commande sera aussi envoyée sur WhatsApp.
          </p>
        </form>

        <aside className="checkout__summary">
          <h2>Récapitulatif</h2>
          {items.map((i) => (
            <div className="checkout__line" key={i.key}>
              <img src={i.image || "/placeholder.svg"} alt={i.name} />
              <div>
                <p>{i.name}</p>
                <span className="muted">
                  {[i.size, i.color].filter(Boolean).join(" · ")} × {i.qty}
                </span>
              </div>
              <strong>{i.qty * i.price} {SITE.currency}</strong>
            </div>
          ))}
          <div className="checkout__totals">
            <div><span>Sous-total</span><span>{subtotal} {SITE.currency}</span></div>
            <div><span>Livraison</span><span>{shipping === 0 ? "Gratuite" : `${shipping} ${SITE.currency}`}</span></div>
            <div className="total"><span>Total</span><span>{total} {SITE.currency}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
