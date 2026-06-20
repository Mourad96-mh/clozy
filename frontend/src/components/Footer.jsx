import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/products";
import { SITE } from "../data/config";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <h3 className="footer__logo">{SITE.name}</h3>
          <p>{SITE.tagline}</p>
          <p className="footer__muted">{SITE.city}</p>
        </div>

        <div>
          <h4>Catégories</h4>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/categorie/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Aide</h4>
          <ul>
            <li>Livraison & retours</li>
            <li>Guide des tailles</li>
            <li>Nous contacter</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>📞 +{SITE.whatsapp}</li>
            <li>✉️ {SITE.email}</li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                Commander sur WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
