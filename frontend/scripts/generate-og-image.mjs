// Génère public/og-image.jpg (1200×630) à partir d'un SVG. À relancer si la
// marque change : `node scripts/generate-og-image.mjs`.
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../public/og-image.jpg", import.meta.url));

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#b5838d"/>
      <stop offset="100%" stop-color="#6d4c52"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="96" font-weight="700" fill="#ffffff" letter-spacing="2">Vêtements Hiba</text>
  <text x="600" y="350" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
        font-size="42" fill="#ffffff" opacity="0.95">Pyjamas · Sous-vêtements · Homewear</text>
  <text x="600" y="430" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
        font-size="32" fill="#ffffff" opacity="0.85">Livraison partout au Maroc · Paiement à la livraison</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(out);
console.log("[og-image] écrit dans public/og-image.jpg");
