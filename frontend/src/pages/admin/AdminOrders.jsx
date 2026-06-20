import { Fragment, useEffect, useState } from "react";
import { api } from "../../api";
import { SITE } from "../../data/config";

const STATUSES = ["nouvelle", "confirmée", "expédiée", "livrée", "annulée"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);

  const load = () => {
    setLoading(true);
    api
      .getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const changeStatus = async (order, status) => {
    await api.updateOrder(order._id, { status });
    setOrders((os) => os.map((o) => (o._id === order._id ? { ...o, status } : o)));
  };

  const remove = async (order) => {
    if (!confirm(`Supprimer la commande ${order.ref} ?`)) return;
    await api.deleteOrder(order._id);
    load();
  };

  if (loading) return <p className="muted">Chargement…</p>;

  return (
    <div>
      <div className="admin__head">
        <h1>Commandes ({orders.length})</h1>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Réf.</th>
              <th>Client</th>
              <th>Ville</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <Fragment key={o._id}>
                <tr>
                  <td><strong>{o.ref}</strong></td>
                  <td>{o.customer?.name}<br /><span className="muted">{o.customer?.phone}</span></td>
                  <td>{o.customer?.city}</td>
                  <td>{o.total} {SITE.currency}</td>
                  <td>
                    <select
                      value={o.status}
                      onChange={(e) => changeStatus(o, e.target.value)}
                      className={`status status--${o.status}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="muted">
                    {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="admin-table__actions">
                    <button onClick={() => setOpen(open === o._id ? null : o._id)}>
                      {open === o._id ? "Masquer" : "Détails"}
                    </button>
                    <button className="danger" onClick={() => remove(o)}>Suppr.</button>
                  </td>
                </tr>
                {open === o._id && (
                  <tr>
                    <td colSpan={7}>
                      <div className="order-detail">
                        <div>
                          <h4>Articles</h4>
                          <ul>
                            {o.items.map((i, idx) => (
                              <li key={idx}>
                                {i.name} {[i.size, i.color].filter(Boolean).join(", ")} × {i.qty} — {i.qty * i.price} {SITE.currency}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4>Livraison</h4>
                          <p>{o.customer?.address}, {o.customer?.city}</p>
                          {o.customer?.note && <p className="muted">Note : {o.customer.note}</p>}
                          <p>Sous-total : {o.subtotal} {SITE.currency} · Livraison : {o.shipping} {SITE.currency}</p>
                          <a
                            className="btn btn--whatsapp"
                            href={`https://wa.me/${o.customer?.phone?.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Contacter le client
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="muted" style={{ textAlign: "center" }}>
                  Aucune commande pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
