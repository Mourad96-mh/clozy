// Petit client HTTP pour parler au backend.
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function authHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("boutique-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const res = await fetch(`${BASE}/api${path}`, {
    method,
    // Toujours récupérer des données fraîches : sans ça, le navigateur peut
    // servir une ancienne réponse en cache (ex : liste produits obsolète).
    cache: "no-store",
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(auth ? authHeaders() : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Erreur réseau");
  return data;
}

export const api = {
  base: BASE,

  // ── Produits ──────────────────────────────────────────────
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products${qs ? `?${qs}` : ""}`);
  },
  getProduct: (idOrSlug) => request(`/products/${idOrSlug}`),
  createProduct: (body) => request("/products", { method: "POST", body, auth: true }),
  updateProduct: (id, body) =>
    request(`/products/${id}`, { method: "PATCH", body, auth: true }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE", auth: true }),

  // ── Commandes ─────────────────────────────────────────────
  createOrder: (body) => request("/orders", { method: "POST", body }),
  getOrders: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/orders${qs ? `?${qs}` : ""}`, { auth: true });
  },
  updateOrder: (id, body) =>
    request(`/orders/${id}`, { method: "PATCH", body, auth: true }),
  deleteOrder: (id) => request(`/orders/${id}`, { method: "DELETE", auth: true }),

  // ── Auth ──────────────────────────────────────────────────
  login: (body) => request("/auth/login", { method: "POST", body }),
  updateCredentials: (body) =>
    request("/auth/credentials", { method: "PUT", body, auth: true }),

  // ── Upload image (multipart) ──────────────────────────────
  uploadImage: async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`${BASE}/api/upload`, {
      method: "POST",
      headers: { ...authHeaders() },
      body: fd,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Erreur upload");
    return data.url;
  },
};

// Prix après remise
export function finalPrice(p) {
  return p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
}
