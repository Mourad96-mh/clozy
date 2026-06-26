import { SITE } from "../data/config";

// Boutons flottants (bas-droite) : WhatsApp + appel téléphonique.
// Affichés sur toutes les pages boutique via StorefrontLayout.
const waMessage = encodeURIComponent(
  "Bonjour, je vous contacte depuis votre site Vêtements Hiba."
);
const waLink = `https://wa.me/${SITE.whatsapp}?text=${waMessage}`;
const telLink = `tel:+${SITE.whatsapp}`;

export default function FloatingContact() {
  return (
    <div className="fab" aria-label="Nous contacter">
      <a
        className="fab__btn fab__btn--wa"
        href={waLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Nous contacter sur WhatsApp"
        title="WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" fill="currentColor">
          <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.13.56 4.21 1.62 6.04L4 29l8.13-1.58a12 12 0 0 0 3.9.66h.01C22.68 28.08 28 22.68 28 16.04 28 8.4 22.68 3 16.04 3zm0 22.6h-.01a9.9 9.9 0 0 1-3.55-.66l-.43-.17-4.83.94.96-4.7-.28-.45a9.94 9.94 0 0 1-1.52-5.28c0-5.5 4.48-9.98 9.99-9.98 2.67 0 5.18 1.04 7.07 2.93a9.93 9.93 0 0 1 2.92 7.06c0 5.5-4.48 9.98-9.99 9.98zm5.48-7.47c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z"/>
        </svg>
      </a>
      <a
        className="fab__btn fab__btn--tel"
        href={telLink}
        aria-label="Nous appeler"
        title="Appeler"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
          <path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2z"/>
        </svg>
      </a>
    </div>
  );
}
