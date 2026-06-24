import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <div className="container section narrow" style={{ textAlign: "center" }}>
      <Seo
        title="Page introuvable (404) | Vêtements Hiba"
        description="La page que vous cherchez n'existe pas."
        noindex
      />
      <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
      <p className="muted">La page que vous cherchez n'existe pas.</p>
      <Link to="/" className="btn btn--primary">Retour à l'accueil</Link>
    </div>
  );
}
