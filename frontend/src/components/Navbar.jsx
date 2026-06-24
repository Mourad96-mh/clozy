import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CATEGORIES } from "../data/products";
import { SITE } from "../data/config";
import { useCart } from "../context/CartContext";

export default function Navbar({ onCartClick }) {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__top">
        <p>Livraison partout au Maroc · Paiement à la livraison 🚚</p>
      </div>
      <div className="navbar__main container">
        <button
          className="navbar__burger"
          aria-label="Menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          ☰
        </button>

        <Link to="/" className="navbar__logo" aria-label={SITE.name}>
          <img src="/logo.jpeg" alt={SITE.name} className="navbar__logo-img" />
        </Link>

        <nav className={`navbar__nav ${mobileOpen ? "is-open" : ""}`}>
          {CATEGORIES.map((cat) => (
            <div className="navbar__item" key={cat.slug}>
              <NavLink
                to={`/categorie/${cat.slug}`}
                className="navbar__link"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </NavLink>
              <div className="navbar__dropdown">
                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    to={`/categorie/${cat.slug}/${sub.slug}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <button className="navbar__cart" onClick={onCartClick} aria-label="Panier">
          🛒
          {count > 0 && <span className="navbar__badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
