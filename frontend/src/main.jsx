import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App.jsx";
import "./index.css";

// Point d'entrée vite-react-ssg : sert au prerender (build) et à l'hydratation
// (navigateur). Les contextes Panier/Auth sont fournis par le layout <Root>.
export const createRoot = ViteReactSSG({ routes });
