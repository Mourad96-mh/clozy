// Génère dist/sitemap.xml APRÈS le prerender.
// On scanne dist/ pour trouver chaque page réellement prérendue (index.html),
// on en déduit l'URL, et on exclut /admin, /commande et la 404.
import { readdir, writeFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE } from "../src/data/config.js";

const DIST = fileURLToPath(new URL("../dist", import.meta.url));
const EXCLUDE = [/^\/admin(\/|$)/, /^\/commande(\/|$)/, /^\/404(\/|$)/];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
}

function toUrlPath(file) {
  const rel = relative(DIST, file).split(sep).join("/"); // ex: categorie/femme/index.html
  const path = "/" + rel.replace(/index\.html$/, "").replace(/\/$/, "");
  return path === "" ? "/" : path;
}

const files = await walk(DIST);
const lastmod = new Date().toISOString().slice(0, 10);

const paths = [...new Set(files.map(toUrlPath))]
  .filter((p) => !EXCLUDE.some((re) => re.test(p)))
  .sort((a, b) => a.length - b.length || a.localeCompare(b));

const priorityFor = (p) =>
  p === "/" ? "1.0" : /^\/categorie\/[^/]+\/[^/]+$/.test(p) ? "0.9" : /^\/categorie\//.test(p) ? "0.8" : "0.7";

const urls = paths
  .map(
    (p) =>
      `  <url>\n    <loc>${SITE.origin}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priorityFor(p)}</priority>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

await stat(DIST); // échoue clairement si dist/ n'existe pas
await writeFile(join(DIST, "sitemap.xml"), xml, "utf8");
console.log(`[sitemap] ${paths.length} URLs écrites dans dist/sitemap.xml`);
