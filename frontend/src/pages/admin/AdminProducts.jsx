import { useEffect, useState } from "react";
import { api, finalPrice } from "../../api";
import { SITE } from "../../data/config";
import ProductFormModal from "./ProductFormModal";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | "new" | product
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | no-sizes | no-colors | incomplete

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

  const noSizes = (p) => !p.sizes?.length;
  const noColors = (p) => !p.colors?.length;

  const filtered = products.filter((p) => {
    if (!p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "no-sizes") return noSizes(p);
    if (filter === "no-colors") return noColors(p);
    if (filter === "incomplete") return noSizes(p) || noColors(p);
    return true;
  });

  const incompleteCount = products.filter(
    (p) => noSizes(p) || noColors(p)
  ).length;

  return (
    <div>
      <div className="admin__head">
        <h1>Produits ({products.length})</h1>
        <button className="btn btn--primary" onClick={() => setModal("new")}>
          + Nouveau produit
        </button>
      </div>

      <div className="admin__filters">
        <input
          className="admin__search"
          placeholder="Rechercher un produit…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="admin__filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tous les produits</option>
          <option value="incomplete">⚠️ Incomplets (taille ou couleur manquante)</option>
          <option value="no-sizes">Sans tailles</option>
          <option value="no-colors">Sans couleurs</option>
        </select>
        {incompleteCount > 0 && filter === "all" && (
          <button
            type="button"
            className="admin__filter-badge"
            onClick={() => setFilter("incomplete")}
            title="Afficher les produits incomplets"
          >
            {incompleteCount} incomplet{incompleteCount > 1 ? "s" : ""}
          </button>
        )}
      </div>

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
                <th>Tailles / Couleurs</th>
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
                    <div className="cell-tags">
                      {p.sizes?.length ? (
                        p.sizes.map((s) => (
                          <span key={s} className="cell-chip cell-chip--size">{s}</span>
                        ))
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </div>
                    <div className="cell-tags">
                      {p.colors?.length ? (
                        p.colors.map((c) => (
                          <span key={c} className="cell-chip cell-chip--color">{c}</span>
                        ))
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </div>
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
                  <td colSpan={7} className="muted" style={{ textAlign: "center" }}>
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
