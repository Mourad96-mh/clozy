import { useState } from "react";
import { api } from "../../api";
import { CATEGORIES } from "../../data/products";

// Éditeur de "tags" (tailles / couleurs) : presets cliquables + ajout/suppression.
function TagEditor({ label, value, onChange, presets = [], placeholder }) {
  const [input, setInput] = useState("");

  const add = (raw) => {
    const v = String(raw).trim();
    if (!v) return;
    if (!value.includes(v)) onChange([...value, v]);
    setInput("");
  };
  const remove = (t) => onChange(value.filter((x) => x !== t));

  return (
    <div className="tag-field">
      <span className="tag-field__label">{label}</span>

      {presets.length > 0 && (
        <div className="tag-presets">
          {presets.map((p) => (
            <button
              type="button"
              key={p}
              className={`tag-preset ${value.includes(p) ? "is-on" : ""}`}
              onClick={() => (value.includes(p) ? remove(p) : add(p))}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="tag-input">
        <input
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add(input);
            }
          }}
        />
        <button type="button" className="btn btn--outline" onClick={() => add(input)}>
          Ajouter
        </button>
      </div>

      {value.length > 0 && (
        <div className="tag-chips">
          {value.map((t) => (
            <span className="chip" key={t}>
              {t}
              <button type="button" onClick={() => remove(t)} aria-label={`Retirer ${t}`}>
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const empty = {
  name: "",
  description: "",
  category: "femme",
  subcategory: "",
  price: "",
  discount: 0,
  images: [],
  sizes: [],
  colors: [],
  featured: false,
  newArrival: false,
  inStock: true,
};

export default function ProductFormModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState(product ? { ...empty, ...product } : empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const subOptions =
    CATEGORIES.find((c) => c.slug === form.category)?.subcategories || [];

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError("");
    try {
      const urls = [];
      for (const file of files) {
        const url = await api.uploadImage(file);
        urls.push(url);
      }
      set("images", [...form.images, ...urls]);
    } catch (err) {
      setError(err.message || "Échec de l'upload (vérifiez les clés Cloudinary).");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (i) =>
    set("images", form.images.filter((_, idx) => idx !== i));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.price) {
      setError("Nom et prix sont obligatoires.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        discount: Number(form.discount) || 0,
      };
      if (product?._id) {
        await api.updateProduct(product._id, payload);
      } else {
        await api.createProduct(payload);
      }
      onSaved();
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h2>{product ? "Modifier le produit" : "Nouveau produit"}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <form className="modal__body" onSubmit={submit}>
          {error && <div className="alert alert--error">{error}</div>}

          <label>
            Nom *
            <input value={form.name} onChange={(e) => set("name", e.target.value)} />
          </label>

          <label>
            Description
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              Catégorie
              <select
                value={form.category}
                onChange={(e) => {
                  set("category", e.target.value);
                  set("subcategory", "");
                }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </label>
            <label>
              Sous-catégorie
              <select
                value={form.subcategory}
                onChange={(e) => set("subcategory", e.target.value)}
              >
                <option value="">—</option>
                {subOptions.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Prix (DH) *
              <input
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
              />
            </label>
            <label>
              Remise (%)
              <input
                type="number"
                min="0"
                max="100"
                value={form.discount}
                onChange={(e) => set("discount", e.target.value)}
              />
            </label>
          </div>

          <TagEditor
            label="Tailles"
            value={form.sizes}
            onChange={(v) => set("sizes", v)}
            presets={["S", "M", "L", "XL", "XXL", "2XL", "3XL", "4XL"]}
            placeholder="Ajouter une taille…"
          />

          <TagEditor
            label="Couleurs"
            value={form.colors}
            onChange={(v) => set("colors", v)}
            placeholder="Ajouter une couleur (ex : Rose) puis Entrée"
          />

          {/* Images */}
          <label>Images</label>
          <div className="img-uploader">
            {form.images.map((url, i) => (
              <div className="img-uploader__thumb" key={i}>
                <img src={url} alt="" />
                <button type="button" onClick={() => removeImage(i)}>✕</button>
              </div>
            ))}
            <label className="img-uploader__add">
              {uploading ? "…" : "+ Ajouter"}
              <input type="file" accept="image/*" multiple hidden onChange={handleUpload} />
            </label>
          </div>

          <div className="form-checks">
            <label className="check">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />
              En vedette
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={form.newArrival}
                onChange={(e) => set("newArrival", e.target.checked)}
              />
              Nouveauté
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => set("inStock", e.target.checked)}
              />
              En stock
            </label>
          </div>

          <div className="modal__foot">
            <button type="button" className="btn btn--outline" onClick={onClose}>
              Annuler
            </button>
            <button className="btn btn--primary" disabled={saving}>
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
