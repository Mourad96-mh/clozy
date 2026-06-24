import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";
import { CartProvider } from "../context/CartContext.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

// Racine commune à toutes les routes (boutique + admin) : fournit les contextes
// Panier / Auth et remet le scroll en haut à chaque navigation.
export default function Root() {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <Outlet />
      </CartProvider>
    </AuthProvider>
  );
}
