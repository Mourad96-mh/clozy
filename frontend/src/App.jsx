import { Navigate } from "react-router-dom";

import Root from "./layouts/Root.jsx";
import StorefrontLayout from "./layouts/StorefrontLayout.jsx";

import Home from "./pages/Home.jsx";
import Category, { categoryLoader } from "./pages/Category.jsx";
import ProductDetail, { productLoader } from "./pages/ProductDetail.jsx";
import Checkout from "./pages/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";

import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";

// Routes au format objet (data router) consommées par vite-react-ssg pour le
// prerender. La boutique est prérendue en HTML statique ; /admin/* reste en
// client-only (exclu du prerender via ssgOptions.includedRoutes dans vite.config).
export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <StorefrontLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "categorie/:slug", element: <Category />, loader: categoryLoader },
          { path: "categorie/:slug/:sub", element: <Category />, loader: categoryLoader },
          { path: "produit/:idOrSlug", element: <ProductDetail />, loader: productLoader },
          { path: "commande", element: <Checkout /> },
        ],
      },

      // ── Admin (client-only, noindex) ─────────────────────────
      { path: "admin/login", element: <AdminLogin /> },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="/admin/produits" replace /> },
          { path: "produits", element: <AdminProducts /> },
          { path: "commandes", element: <AdminOrders /> },
          { path: "parametres", element: <AdminSettings /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
];
