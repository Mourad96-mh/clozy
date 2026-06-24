import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { SITE } from "../data/config";

const CartContext = createContext(null);

const STORAGE_KEY = "boutique-cart";

function loadInitial() {
  // Rendu côté serveur (prerender SSG) : pas de localStorage → panier vide.
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, size, color, qty } = action;
      const key = `${product.id}|${size || ""}|${color || ""}`;
      const existing = state.find((i) => i.key === key);
      if (existing) {
        return state.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...state,
        {
          key,
          id: product.id || product._id,
          name: product.name,
          price: product.price,
          image: product.image || (product.images && product.images[0]) || "",
          size,
          color,
          qty,
        },
      ];
    }
    case "REMOVE":
      return state.filter((i) => i.key !== action.key);
    case "SET_QTY":
      return state
        .map((i) => (i.key === action.key ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    const shipping =
      subtotal === 0 || subtotal >= SITE.freeShippingFrom ? 0 : SITE.shippingFee;
    const total = subtotal + shipping;

    return {
      items,
      count,
      subtotal,
      shipping,
      total,
      add: (product, { size, color, qty = 1 } = {}) =>
        dispatch({ type: "ADD", product, size, color, qty }),
      remove: (key) => dispatch({ type: "REMOVE", key }),
      setQty: (key, qty) => dispatch({ type: "SET_QTY", key, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

// Construit le message WhatsApp pré-rempli avec la commande + infos client.
export function buildWhatsappLink(items, { subtotal, shipping, total }, customer) {
  const lines = [];
  lines.push(`*Nouvelle commande — ${SITE.name}*`);
  lines.push("");
  items.forEach((i) => {
    const opts = [i.size, i.color].filter(Boolean).join(", ");
    lines.push(
      `• ${i.name}${opts ? ` (${opts})` : ""} x${i.qty} = ${i.qty * i.price} ${SITE.currency}`
    );
  });
  lines.push("");
  lines.push(`Sous-total : ${subtotal} ${SITE.currency}`);
  lines.push(`Livraison : ${shipping === 0 ? "Gratuite" : shipping + " " + SITE.currency}`);
  lines.push(`*Total : ${total} ${SITE.currency}*`);
  lines.push("");
  lines.push("*Coordonnées :*");
  lines.push(`Nom : ${customer.name}`);
  lines.push(`Téléphone : ${customer.phone}`);
  lines.push(`Ville : ${customer.city}`);
  lines.push(`Adresse : ${customer.address}`);
  if (customer.note) lines.push(`Note : ${customer.note}`);
  lines.push("");
  lines.push("Paiement à la livraison.");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}
