import { Link, useLocation } from "react-router-dom";
import { CATEGORIES } from "../data/products";
import { CATEGORIES_AR } from "../data/categories.ar";
import { SITE } from "../data/config";
import { localeFromPath, withLocale, t } from "../data/i18n";

export default function Footer() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const str = t(locale);
  const lp = (p) => withLocale(p, locale);
  const catName = (cat) =>
    locale === "ar" ? CATEGORIES_AR[cat.slug]?.name || cat.name : cat.name;
  const tagline = locale === "ar" ? str.home.eyebrow : SITE.tagline;
  const city = locale === "ar" ? "الدار البيضاء، المغرب" : SITE.city;

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <img src="/logo.jpeg" alt={SITE.name} className="footer__logo-img" />
          <p>{tagline}</p>
          <p className="footer__muted">{city}</p>
        </div>

        <div>
          <h4>{str.footer.categories}</h4>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={lp(`/categorie/${c.slug}`)}>{catName(c)}</Link>
              </li>
            ))}
            <li>
              <Link to={lp("/vente-en-gros")}>{str.venteEnGros}</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>{str.footer.help}</h4>
          <ul>
            <li>{str.footer.delivery}</li>
            <li>{str.footer.sizes}</li>
            <li>{str.footer.contactUs}</li>
          </ul>
        </div>

        <div>
          <h4>{str.footer.contact}</h4>
          <ul>
            <li>📞 +{SITE.whatsapp}</li>
            <li>✉️ {SITE.email}</li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                {str.footer.orderWhatsapp}
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noreferrer">
                📷 Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} {SITE.name}. {str.footer.rights}
        </p>
      </div>
    </footer>
  );
}
