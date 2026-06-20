import { useEffect, useState } from "react";
import { api, finalPrice } from "../../api";
import { SITE } from "../../data/config";
import ProductFormModal from "./ProductFormModal";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "new" | product
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    api
      .getProducts({ limit: 500 })
      .then((d) => setProducts(d.products))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const remove = async (p) => {
    if (!confirm(`Supprimer « ${p.name} » ?`)) return;
    await api.deleteProduct(p._id);
    load();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="admin__head">
        <h1>Produits ({products.length})</h1>
        <button className="btn btn--primary" onClick={() => setModal("new")}>
          + Nouveau produit
        </button>
      </div>

      <input
        className="admin__search"
        placeholder="Rechercher un produit…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="muted">Chargement…</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      className="admin-thumb"
                      src={p.images?.[0] || "/placeholder.svg"}
                      alt=""
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>
                    {p.category}
                    {p.subcategory ? ` · ${p.subcategory}` : ""}
                  </td>
                  <td>
                    {finalPrice(p)} {SITE.currency}
                    {p.discount > 0 && (
                      <span className="muted"> (-{p.discount}%)</span>
                    )}
                  </td>
                  <td>
                    {p.inStock ? (
                      <span className="tag tag--ok">En stock</span>
                    ) : (
                      <span className="tag tag--out">Épuisé</span>
                    )}
                  </td>
                  <td className="admin-table__actions">
                    <button onClick={() => setModal(p)}>Modifier</button>
                    <button className="danger" onClick={() => remove(p)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="muted" style={{ textAlign: "center" }}>
                    Aucun produit.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <ProductFormModal
          product={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={() => {
            setModal(null);
            load();
          }}
        />
      )}
    </div>
  );
}
