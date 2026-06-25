// =====================================================================
//  Prompts Gemini par produit (3ᵉ vague) — version « développée » des
//  entrées de gemini-prompts-nouveaux-produits.md : chaque description
//  d'article est associée à son « wrapper » (modèle femme / homme /
//  enfant, ou mannequin invisible pour la lingerie), déjà rédigé en
//  toutes lettres pour être envoyé tel quel à l'API.
//
//  promptFor(target) → texte complet du prompt pour ce fichier .webp.
//  Édite librement une description ci-dessous avant de (re)générer.
// =====================================================================

const WRAP = {
  femme:
    'Worn by a young adult woman with a friendly neutral expression, standing in a natural relaxed pose, ' +
    'full body visible head-to-ankle, centered. Plain uniform light-grey seamless studio background. ' +
    'Soft, even, diffused studio lighting, no harsh shadows. Photorealistic high-resolution e-commerce ' +
    'catalogue photography, sharp focus on the garment, accurate fabric texture and colour. Portrait ' +
    'orientation, 3:4 aspect ratio. The model is fully and modestly dressed, tasteful and appropriate.',
  homme:
    'Worn by a young adult man with a friendly neutral expression, standing in a natural relaxed pose, ' +
    'full body visible head-to-ankle, centered. Plain uniform light-grey seamless studio background. ' +
    'Soft, even, diffused studio lighting, no harsh shadows. Photorealistic high-resolution e-commerce ' +
    'catalogue photography, sharp focus on the garment, accurate fabric texture and colour. Portrait ' +
    'orientation, 3:4 aspect ratio. The model is fully and modestly dressed, tasteful and appropriate.',
  child:
    'Worn by a child model with a friendly neutral expression, standing in a natural relaxed pose, ' +
    'full body visible, centered. Plain uniform light-grey seamless studio background. Soft, even, ' +
    'diffused studio lighting, no harsh shadows. Photorealistic high-resolution e-commerce catalogue ' +
    'photography, sharp focus on the garment, accurate fabric texture and colour. Portrait orientation, ' +
    '3:4 aspect ratio. The child is fully and modestly dressed, tasteful and appropriate.',
  ghost:
    'Presented on an invisible / ghost mannequin (no visible person). Plain uniform light-grey seamless ' +
    'studio background, soft even studio lighting, no harsh shadows. Photorealistic high-resolution ' +
    'e-commerce product photography, sharp focus on the garment, accurate fabric texture and colour. ' +
    'Portrait orientation, 3:4 aspect ratio.',
}

// d = description de l'article ; w = wrapper (clé de WRAP ci-dessus).
const PRODUCTS = {
  // ── Sous-vêtements (mannequin invisible) ──────────────────────────
  'soutien-gorge-coton-armatures-blanc.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a white full-coverage non-wired cotton bra with wide plush straps, soft full cups with a subtle lace overlay and a small centre bow.' },
  'debardeur-coton-fleur-dentelle-blanc.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a white soft-cotton camisole with thin spaghetti straps and a small floral lace appliqué at the neckline.' },
  'culotte-imprime-pommes-rose.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of pale-pink cotton briefs with an all-over small red apple print, picot trim and a tiny bow, shown as a lower-body form only.' },
  'brassiere-confort-bretelles-olive.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of an olive-green wireless bralette with thin adjustable straps, a soft scoop neckline and a wide elastic band.' },
  'debardeur-cotele-col-v-dentelle-blanc.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a white ribbed-cotton tank top with a V-neckline trimmed in floral lace.' },
  'debardeur-cotele-bretelles-dentelle.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a grey ribbed-knit tank top with lace-trimmed shoulder straps and a small lace panel at the centre front.' },
  'debardeur-julia-cotele-dentelle.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a single cream ribbed-cotton camisole with thin straps, a lace-trimmed neckline and a small button placket. Do not include any brand logo or reference text.' },
  'parure-pushup-dentelle-taupe.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a women’s two-piece bra-and-briefs lingerie set in mauve-taupe: a smooth push-up bra with a lace lower edge and matching briefs with lace side panels. Remove any hangers and labels.' },
  'parure-pushup-satin-rose.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a women’s two-piece lingerie set in rose: a smooth push-up bra with satin straps and a matching tanga with a small bow. Remove any hangers and labels.' },
  'parure-pushup-prune.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a women’s two-piece lingerie set in deep plum: a smooth push-up bra with embellished straps and a matching thong. Remove any hangers and labels.' },
  'parure-pushup-dentelle-vert-sauge.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a women’s two-piece lingerie set in sage green: a smooth push-up bra with lace and matching briefs with lace side panels. Remove any hangers and labels.' },
  'parure-pushup-bleu-canard.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a women’s two-piece lingerie set in teal: a smooth push-up bra with crystal-trim straps and a matching thong. Remove any hangers and labels.' },

  // ── Homewear ──────────────────────────────────────────────────────
  'cycliste-uni-bordeaux.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of high-waist mid-thigh cycling shorts in solid burgundy soft stretch fabric, worn with a plain neutral top.' },
  'cycliste-dentelle-cote-creme.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of high-waist mid-thigh cycling shorts in cream with lace inserts on the outer side seams, worn with a plain neutral top.' },
  'short-long-uni-blanc.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of knee-length plain white stretch-cotton shorts with a high elastic waistband, worn with a plain neutral top.' },
  'pantacourt-bord-dentelle-blanc.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of flowy white cropped lounge trousers with a wide floral-lace hem band and an elastic waist, worn with a plain neutral top.' },
  'pantacourt-fluide-dentelle-noir.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of flowy black cropped lounge trousers with an elastic waist and a delicate lace trim at the hem, worn with a plain neutral top.' },
  'legging-long-uni-beige.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of full-length beige soft-cotton leggings with a high comfort waistband, worn with a plain neutral top.' },
  'pantalon-large-fluide-mauve.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of wide-leg flowy lounge trousers in mauve soft knit with a drawstring elastic waist and side pockets, worn with a plain neutral top.' },
  'tshirt-basique-cintre-noir.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a fitted black short-sleeve cotton T-shirt with a round neck.' },
  'top-thermique-manches-longues-nude.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a long-sleeve round-neck thermal base-layer top in smooth nude fabric.' },
  'top-dentelle-epaules-manches-mocha.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a long-sleeve soft-knit top in mocha with a sheer lace shoulder yoke and lace sleeves.' },
  'top-col-montant-dentelle-blanc.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a white long-sleeve top with a floral-lace yoke and a high lace mock-neck collar.' },
  'top-col-montant-dentelle-noir.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a black long-sleeve top with a gathered mock-neck and lace insets on the shoulders.' },
  'ensemble-brassiere-culotte-sport.webp': { w: 'femme', d:
    'Clean catalogue image of a women’s two-piece sports set: a racerback sports bra and matching briefs with a contrast logo waistband, worn as athletic wear. Remove the "SPORT BRA" text from the original.' },

  // ── Pyjamas / Chemises de nuit / Robes d'intérieur ────────────────
  'nuisette-fond-robe-dentelle-ecru.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a casual ivory slip-style nightdress / under-dress in flowy fabric, with a V-neck and hem trimmed with lace and thin adjustable straps, knee-length.' },
  'chemise-nuit-flora-rose-chine.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a soft marled-pink short-sleeve mid-length nightdress with flutter sleeves and a white lace V-neck with a small bow. Do not include any brand logo or reference text.' },
  'chemise-nuit-suzana-boutonnee.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a short-sleeve mid-length nightdress in rose with a buttoned lace-trimmed yoke, a small bow and a flared cut. Do not include any brand logo or reference text.' },
  'chemise-nuit-volants-cerises-blanc.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a white nightdress with an all-over small red cherry print, ruffled flutter sleeves, a gathered yoke and a ruffled hem. Do not include any brand logo or reference text.' },
  'chemise-nuit-paisley-blanc.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a white short-sleeve nightdress with a large coral-and-grey paisley print and a square neckline with a contrast black bow. Do not include any reference text.' },
  'chemise-nuit-coeurs.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a flowy short-sleeve nightdress in peach with an all-over small multicolour heart print, gathered sleeves and side pockets, knee-length.' },
  'chemise-nuit-velours-col-volant.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a long terracotta velvet long-sleeve nightgown with a ruffled lace collar and ruffled lace cuffs. Do not include any reference text.' },
  'chemise-nuit-longue-brodee.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a long green cotton long-sleeve nightgown with an embroidered floral front yoke and soft gathers. Do not include any reference text.' },
  'robe-interieur-brodee-latay.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a long red short-sleeve cotton house dress with an embroidered front yoke and soft gathers. Do not include any brand logo or reference text.' },
  'pyjama-chemise-palmiers-ecru.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a two-piece pyjama set: a short-sleeve notch-collar shirt and matching trousers, with a green palm-tree print on ivory. Do not include any brand logo or reference text.' },
  'pyjama-chemise-fruits.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a two-piece pyjama set: a short-sleeve notch-collar shirt and matching trousers, with a colourful all-over fruit print on ivory. Do not include any brand logo or reference text.' },
  'pyjama-lionceaux-pois-ecru.webp': { w: 'femme', d:
    'Photorealistic e-commerce image of a two-piece pyjama set in ivory with small black polka dots: a short-sleeve T-shirt with a generic cute lion-cub cartoon print (NOT a licensed character) and matching cropped capri trousers with a drawstring.' },

  // ── Enfant ────────────────────────────────────────────────────────
  'debardeur-enfant-pointelle-blanc.webp': { w: 'ghost', d:
    'Photorealistic e-commerce image of a girl’s white pointelle-knit (heart pattern) sleeveless undershirt with a scalloped neckline and a tiny bow, presented on a child-sized invisible / ghost mannequin.' },
  'pyjama-fille-california-rose.webp': { w: 'child', d:
    'Photorealistic e-commerce image of a girl’s two-piece pyjama set: a pink short-sleeve printed T-shirt and matching mauve capri leggings.' },
  'ensemble-garcon-tshirt-short-gris.webp': { w: 'child', d:
    'Photorealistic e-commerce image of a boy’s two-piece co-ord set: a grey-marled short-sleeve printed T-shirt and matching shorts. Remove the runway background from the original.' },
  'ensemble-homme-tshirt-short-raye-marine.webp': { w: 'homme', d:
    'Photorealistic e-commerce image of a men’s two-piece co-ord set: a short-sleeve striped (red/white/blue) T-shirt with a chest pocket and navy shorts with a drawstring.' },
}

function promptFor(target) {
  const p = PRODUCTS[target]
  if (!p) return null
  return `${p.d}\n\n${WRAP[p.w]}`
}

module.exports = { promptFor, PRODUCTS, WRAP }
