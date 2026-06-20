import { useState } from "react";
import { api } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { SITE } from "../../data/config";

export default function AdminSettings() {
  const { logout } = useAuth();
  const [form, setForm] = useState({
    currentPassword: "",
    newEmail: "",
    newPassword: "",
  });
  const [msg, setMsg] = useState(null);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      await api.updateCredentials(form);
      setMsg({ type: "ok", text: "Identifiants mis à jour. Reconnectez-vous." });
      setTimeout(logout, 1500);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    }
  };

  return (
    <div className="narrow-admin">
      <h1>Paramètres</h1>

      <section className="settings-card">
        <h2>Identifiants administrateur</h2>
        {msg && (
          <div className={`alert ${msg.type === "ok" ? "alert--ok" : "alert--error"}`}>
            {msg.text}
          </div>
        )}
        <form onSubmit={submit}>
          <label>
            Mot de passe actuel *
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={update}
              required
            />
          </label>
          <label>
            Nouvel email (facultatif)
            <input
              type="email"
              name="newEmail"
              value={form.newEmail}
              onChange={update}
            />
          </label>
          <label>
            Nouveau mot de passe (facultatif)
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={update}
            />
          </label>
          <button className="btn btn--primary">Mettre à jour</button>
        </form>
      </section>

      <section className="settings-card">
        <h2>Configuration de la boutique</h2>
        <p className="muted">
          Le nom, le numéro WhatsApp, l'email et les frais de livraison se modifient
          dans le fichier <code>frontend/src/data/config.js</code>.
        </p>
        <ul className="settings-list">
          <li><strong>Nom :</strong> {SITE.name}</li>
          <li><strong>WhatsApp :</strong> +{SITE.whatsapp}</li>
          <li><strong>Email :</strong> {SITE.email}</li>
          <li><strong>Livraison gratuite dès :</strong> {SITE.freeShippingFrom} {SITE.currency}</li>
          <li><strong>Frais de livraison :</strong> {SITE.shippingFee} {SITE.currency}</li>
        </ul>
      </section>
    </div>
  );
}
