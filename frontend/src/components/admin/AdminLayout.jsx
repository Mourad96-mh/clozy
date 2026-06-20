import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SITE } from "../../data/config";
import "../../styles/admin.css";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">{SITE.name} · Admin</div>
        <nav className="admin__nav">
          <NavLink to="/admin/produits">📦 Produits</NavLink>
          <NavLink to="/admin/commandes">🧾 Commandes</NavLink>
          <NavLink to="/admin/parametres">⚙️ Paramètres</NavLink>
        </nav>
        <div className="admin__sidebar-foot">
          <a href="/" target="_blank" rel="noreferrer">↗ Voir la boutique</a>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      </aside>
      <main className="admin__main">
        <Outlet />
      </main>
    </div>
  );
}
