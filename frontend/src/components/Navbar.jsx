import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CATEGORIES } from "../data/products";
import { CATEGORIES_AR } from "../data/categories.ar";
import { SITE } from "../data/config";
import { useCart } from "../context/CartContext";
import {
  localeFromPath,
  stripLocale,
  withLocale,
  t,
} from "../data/i18n";

export default function Navbar({ onCartClick }) {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const str = t(locale);

  const catName = (cat) =>
    locale === "ar" ? CATEGORIES_AR[cat.slug]?.name || cat.name : cat.name;
  const subName = (catSlug, sub) =>
    locale === "ar"
      ? CATEGORIES_AR[catSlug]?.subcategories?.[sub.slug]?.name || sub.name
      : sub.name;
  const lp = (p) => withLocale(p, locale); // localized path

  // Sélecteur de langue (interrupteur FR / ع vers la même page dans l'autre langue).
  const neutral = stripLocale(pathname);
  const translatable =
    neutral === "/" ||
    neutral === "/vente-en-gros" ||
    neutral.startsWith("/categorie/");
  const frHref = neutral; // la version FR existe toujours
  const arHref = translatable ? withLocale(neutral, "ar") : "/ar";

  return (
    <header className="navbar">
      <div className="navbar__top">
        <p>{str.perks[0]} · {str.perks[1]}</p>
      </div>
      <div className="navbar__main container">
        <button
          className="navbar__burger"
          aria-label="Menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          ☰
        </button>

        <Link to={lp("/")} className="navbar__logo" aria-label={SITE.name}>
          <img src="/logo.jpeg" alt={SITE.name} className="navbar__logo-img" />
        </Link>

        <nav className={`navbar__nav ${mobileOpen ? "is-open" : ""}`}>
          {CATEGORIES.map((cat) => (
            <div className="navbar__item" key={cat.slug}>
              <NavLink
                to={lp(`/categorie/${cat.slug}`)}
                className="navbar__link"
                onClick={() => setMobileOpen(false)}
              >
                {catName(cat)}
              </NavLink>
              <div className="navbar__dropdown">
                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    to={lp(`/categorie/${cat.slug}/${sub.slug}`)}
                    onClick={() => setMobileOpen(false)}
                  >
                    {subName(cat.slug, sub)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="navbar__item">
            <NavLink
              to={lp("/vente-en-gros")}
              className="navbar__link"
              onClick={() => setMobileOpen(false)}
            >
              {str.venteEnGros}
            </NavLink>
          </div>
          <div className="navbar__item navbar__item--lang">
            <div className="lang-switch" role="group" aria-label="Langue / اللغة">
              <Link
                to={frHref}
                className={`lang-switch__opt ${locale === "fr" ? "is-active" : ""}`}
                aria-current={locale === "fr" ? "true" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                FR
              </Link>
              <Link
                to={arHref}
                className={`lang-switch__opt ${locale === "ar" ? "is-active" : ""}`}
                aria-current={locale === "ar" ? "true" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                ع
              </Link>
            </div>
          </div>
        </nav>

        <button className="navbar__cart" onClick={onCartClick} aria-label="Panier">
          🛒
          {count > 0 && <span className="navbar__badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
