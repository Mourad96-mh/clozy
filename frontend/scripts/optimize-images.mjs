// Génère un .webp optimisé pour chaque .jpeg/.jpg de public/ (sans supprimer
// l'original, pour ne pas casser les chemins encore stockés en base).
// La qualité est réduite par paliers jusqu'à passer sous le budget de poids.
//
// Usage : node scripts/optimize-images.mjs
//
// Ensuite, pour basculer les chemins en base vers .webp :
//   node ../backend/migrate-images-webp.js   (nécessite l'accès MongoDB)
import sharp from "sharp";
import { readdir, stat, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC = fileURLToPath(new URL("../public", import.meta.url));
const MAX_WIDTH = 1000; // largeur max d'affichage (PDP)
const BUDGET = 115 * 1024; // viser < 115 KB
const QUALITIES = [80, 72, 64, 58];

// On ne traite que les photos catalogue (pas l'image OG ni les SVG).
const files = (await readdir(PUBLIC)).filter(
  (f) => /\.(jpe?g)$/i.test(f) && !f.startsWith("og-image")
);

let total = 0;
const converted = []; // chemins JPEG (avec "/") qui ont un frère WebP
for (const f of files) {
  const src = join(PUBLIC, f);
  const dest = join(PUBLIC, f.replace(/\.(jpe?g)$/i, ".webp"));
  let after = Infinity;
  let used = QUALITIES[0];
  for (const q of QUALITIES) {
    await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: q })
      .toFile(dest);
    after = (await stat(dest)).size;
    used = q;
    if (after <= BUDGET) break;
  }
  const before = (await stat(src)).size;
  // Si le WebP n'est pas plus léger que l'original, on le jette : inutile de
  // servir un fichier plus lourd (la migration ne basculera pas ce produit).
  if (after >= before) {
    await unlink(dest);
    console.log(`  ${f}  WebP plus lourd (${(after / 1024) | 0}KB) — conservé en JPEG`);
    continue;
  }
  total++;
  converted.push("/" + f);
  console.log(
    `  ${f}  ${(before / 1024) | 0}KB -> ${(after / 1024) | 0}KB  (q${used})`
  );
}

// Manifeste consommé par src/utils/image.js : la balise <picture> ne propose un
// <source> WebP que pour les JPEG réellement convertis (évite un 404 sans repli).
const manifest = fileURLToPath(new URL("../src/data/webp-manifest.json", import.meta.url));
await writeFile(manifest, JSON.stringify(converted.sort(), null, 2) + "\n", "utf8");

console.log(`\n${total} image(s) converties en WebP dans public/.`);
console.log(`Manifeste écrit : src/data/webp-manifest.json (${converted.length} entrées).`);
