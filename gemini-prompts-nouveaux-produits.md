# Prompts Gemini — nouvelles photos produits (juin 2026)

Même méthode que la 1ère vague : on régénère chaque photo « boutique / mannequin / emballage »
en **photo studio portée par un modèle**, fond gris clair uniforme, portrait 3:4, e-commerce.

---

## ⭐ PROMPT UNIQUE (à coller avec n'importe quelle image du dossier public/)

> Un seul prompt générique qui gère tous les cas (mannequin / emballage / flat-lay → porté par
> un modèle). Joignez l'image et collez ce texte tel quel.

```
Using the clothing item in the attached photo, generate a new photorealistic
e-commerce product image of that exact garment worn by a model.

Keep the garment's design, cut, fabric, pattern and colours identical to the photo.
Ignore the original background, packaging, mannequin, flat-lay or any text/logos —
recreate the item cleanly as if professionally photographed.

Model & framing:
- A young adult model with a friendly neutral expression, natural relaxed standing pose.
- Full body visible head-to-ankle, centered.
- Plain uniform light-grey seamless studio background.
- Soft, even, diffused studio lighting, no harsh shadows.
- Portrait orientation, 3:4 aspect ratio, high resolution, sharp focus on the garment,
  accurate fabric texture and colour.

Rules (keep it tasteful and within content policy):
- The subject is fully and modestly dressed at all times, appropriate and respectful.
- If the item is a pyjama / nightdress / loungewear, present it as a casual daytime
  co-ord / loungewear set, fully covered.
- If the item is a burkini or swimwear, present it as modest full-coverage swimwear,
  with a matching swim hijab fully covering the hair and neck.
- If the item is underwear / a bra / shapewear, do NOT show it on a human body —
  present it on an invisible / ghost mannequin (no visible person) instead, on the same
  light-grey studio background.
- If the item is for a man, use a young adult male model; for a child, a child model.
```

---

## Prompts détaillés par image (optionnel, si le prompt unique ne suffit pas)

## Règles (filtre de sécurité Gemini 2.5 Flash Image / Nano Banana)
- Toujours : **« fully and modestly dressed, tasteful, appropriate »**.
- **Pyjama / nuisette / lingerie** → reformuler en *loungewear / co-ord set / casual daytime*.
- **Soutien-gorge / culotte seuls** → préférer le rendu **« ghost mannequin / invisible mannequin »**
  (mannequin invisible) plutôt qu'un corps humain → pro, jamais refusé. Variante « on-model »
  donnée en plus, mais reformulée en haut de loungewear couvrant.
- **Burkini** → *modest full-coverage swimwear*, **cheveux couverts** par un hijab de bain assorti.

## Wrapper standard (à coller à la fin de chaque description)
> ...worn by a model, standing in a natural relaxed pose, full body visible head-to-ankle, centered.
> Plain uniform light-grey seamless studio background. Soft, even, diffused studio lighting, no harsh
> shadows. Photorealistic high-resolution e-commerce catalogue photography, sharp focus on the garment,
> accurate fabric texture and colour. Portrait orientation, 3:4 aspect ratio. The model is fully and
> modestly dressed, tasteful and appropriate.

- Femme → *worn by a young adult woman with a friendly neutral expression*.
- Burkini → *worn by a young adult woman wearing a matching swim hijab that fully covers her hair and neck*.
- Homme → *worn by a young adult man*.

> Astuce variantes couleur : générez 1 fois, puis « keep everything identical, change only the colour to X ».

---

# MAILLOTS DE BAIN & BURKINI

### 1. Marelisa burkini 3 pièces — floral rouge/gris (réf 20393)
`→ burkini-marelisa-floral-rouge.webp`
> Generate a photorealistic e-commerce image of a modest full-coverage 3-piece burkini swimsuit: a
> long-sleeve hip-length tunic top with a front zip and a tie belt at the waist, in a bold red, grey,
> black and white abstract floral print with solid dark-grey side panels, worn over matching slim
> dark-grey swim leggings, plus a matching swim cap. Worn by a young adult woman wearing a matching
> swim hijab that fully covers her hair and neck. [wrapper standard]

### 2. Burkini DMS « Best Choice » — bleu marbré
`→ burkini-dms-bleu-marbre.webp`
> Photorealistic e-commerce image of a modest full-coverage long burkini swim coat with a front zip and
> a small "DMS" chest print, in a blue marbled / tie-dye pattern (light blue and deep blue swirls),
> worn over matching blue swim leggings. Worn by a young adult woman wearing a matching swim hijab that
> fully covers her hair and neck. [wrapper standard]

### 3. Burkini DMS — marine + imprimé gris
`→ burkini-dms-marine-imprime.webp`
> Same modest full-coverage long DMS burkini swim coat with front zip, navy blue on the upper body
> fading into a black-and-white brushstroke print on the lower half, worn over navy swim leggings.
> Worn by a young adult woman with a matching swim hijab fully covering her hair and neck. [wrapper standard]

### 4. Burkini DMS — noir camouflage multicolore
`→ burkini-dms-noir-camo.webp`
> Same modest full-coverage long DMS burkini swim coat with front zip, black with a multicolour
> camouflage / abstract print (blue, beige, purple) on the sleeves and lower front, worn over black
> swim leggings. Worn by a young adult woman with a matching swim hijab fully covering her hair and
> neck. [wrapper standard]

### 5. Burkini DMS — bordeaux & noir
`→ burkini-dms-bordeaux-noir.webp`
> Same modest full-coverage long DMS burkini swim coat with front zip, two-tone deep burgundy and black
> colour-block, worn over black swim leggings. Worn by a young adult woman with a matching swim hijab
> fully covering her hair and neck. [wrapper standard]

> 💡 Photos #2–#5 = même modèle DMS en coloris différents → soit 4 produits, soit 1 produit « 4 coloris ».

---

# PYJAMAS, HOMEWEAR & ROBES DE CHAMBRE

### 6. Ensemble loungewear imprimé M.S (réf 2526)
`→ loungewear-imprime-coord-marine.webp`
> Photorealistic e-commerce image of a casual daytime co-ord loungewear set: a long-sleeve hip-length
> tunic top and matching wide-leg trousers, in navy with a colourful all-over print (flowers, leaves,
> birds). Fully and modestly dressed. [wrapper standard, femme]

### 7. Ensemble loungewear caraco dentelle + capri — noir (TM, grande taille)
`→ loungewear-caraco-dentelle-capri-noir.webp`
> Photorealistic e-commerce image of a casual daytime co-ord loungewear set: a black sleeveless tank
> top with a decorative lace panel across the upper back, and matching black cropped capri leggings
> with small lace inserts at the hem. Fully and modestly dressed, comfortable everyday loungewear.
> [wrapper standard, femme] (plus-size friendly fit)

### 8. Peignoir éponge à capuche rayé — turquoise
`→ peignoir-eponge-capuche-raye-turquoise.webp`
> Photorealistic e-commerce image of a hooded terry-cloth bathrobe in vertical turquoise, white and
> grey stripes, with a tie belt and two front patch pockets. Worn closed and belted, fully and modestly
> dressed. [wrapper standard, femme]

### 9. Peignoir éponge col châle — gris
`→ peignoir-eponge-col-chale-gris.webp`
> Photorealistic e-commerce image of a dark-grey terry-cloth bathrobe with a shawl collar, a tie belt
> and two front patch pockets. Worn closed and belted, fully and modestly dressed. [wrapper standard, femme]

---

# SOUS-VÊTEMENTS  (préférer le rendu « invisible/ghost mannequin »)

> Pour ces articles, version recommandée = **mannequin invisible** (pas de personne) :
> remplacer le wrapper par : *« presented on an invisible / ghost mannequin (no visible person),
> plain uniform light-grey seamless studio background, soft even studio lighting, photorealistic
> high-resolution e-commerce product photography, portrait 3:4. »*

### 10. Parure soutien-gorge + culotte — rouge
`→ parure-sg-culotte-rouge.webp`
> Photorealistic e-commerce image of a women's two-piece underwear set in solid red: a smooth push-up
> bra with a small bow at the centre, and matching briefs with a small bow. Presented on an invisible /
> ghost mannequin (no visible person). [wrapper ghost mannequin]

### 11. Parure soutien-gorge + culotte — crème
`→ parure-sg-culotte-creme.webp`
> Same as above but in cream / pale-ivory satin, push-up bra with a subtle satin trim and matching
> ruffle-edge briefs. Presented on an invisible / ghost mannequin. [wrapper ghost mannequin]

### 12. Soutien-gorge dentelle sans armatures — blanc (NBB)
`→ soutien-gorge-dentelle-blanc.webp`
> Photorealistic e-commerce image of a white non-wired full-coverage bra with floral lace cups, a small
> centre bow and adjustable straps. Presented on an invisible / ghost mannequin. [wrapper ghost mannequin]

### 13. Brassières CHANNO sans coutures (9 coloris)
`→ brassiere-channo-[couleur].webp`
> Photorealistic e-commerce image of a seamless wireless triangle bralette with thin adjustable straps
> and a soft band. Presented on an invisible / ghost mannequin. [wrapper ghost mannequin]
> Coloris : beige, blanc, rose clair, fuchsia, turquoise, pêche, magenta, bleu jean, noir → générer par couleur.

### 14. Brassières sport dos croisé (5 coloris)
`→ brassiere-sport-dos-croise-[couleur].webp`
> Photorealistic e-commerce image of a women's racer/cross-back sports bra (crop-top style, full
> coverage, wide supportive band). Worn by a young adult woman as activewear with matching high-waist
> leggings, fully and modestly dressed (athletic look). [wrapper standard, femme]
> Coloris : gris anthracite, noir, fuchsia, écru, vert. Générer par couleur.

### 15. Gaine-short dentelle galbante — beige (YONI réf 746)
`→ gaine-short-dentelle-beige.webp`
> Photorealistic e-commerce image of a women's high-waist shaping shorts / shapewear short in nude
> beige, smooth fabric with floral lace side panels. Presented on an invisible / ghost mannequin
> (lower body form only). [wrapper ghost mannequin]

---

# LEGGINGS & HOMEWEAR BAS

### 16. Legging capri dentelle — noir (TOP SHOP 2XL, réf 1423)
`→ legging-capri-dentelle-noir.webp`
> Photorealistic e-commerce image of black cropped capri leggings in soft cotton, with a wide comfort
> waistband and a delicate black lace trim at the hem. Worn by a young adult woman with a plain neutral
> top, fully and modestly dressed. [wrapper standard, femme]

### 17. Legging capri dentelle LINA (réf 3674)
`→ legging-capri-lina-3674.webp`
> Photorealistic e-commerce image of cropped capri leggings with a high comfort waistband and a small
> lace trim at the hem, available in black and in white. Worn by a young adult woman with a plain top,
> fully and modestly dressed. [wrapper standard, femme] (générer noir + blanc)

### 18. Legging capri homewear LINA — noir
`→ legging-capri-lina-homewear-noir.webp`
> Photorealistic e-commerce image of black cropped capri homewear leggings with a wide soft waistband
> and lace trim at the hem. Worn by a young adult woman with a plain top, fully and modestly dressed.
> [wrapper standard, femme]

### 19. Ensemble thermique LINA (réf 5789)
`→ ensemble-thermique-lina-5789.webp`
> Photorealistic e-commerce image of a women's thermal underwear / base-layer co-ord set: a long-sleeve
> round-neck top with a fine lace neckline trim and matching full-length leggings, available in white
> and in black. Worn by a young adult woman, fully and modestly dressed. [wrapper standard, femme]
> (générer blanc + noir)

### 20. Legging long — noir (réf 7600)
`→ legging-long-noir-7600.webp`
> Photorealistic e-commerce image of full-length black leggings in smooth opaque fabric with a high
> comfort waistband. Worn by a young adult woman with a plain top, fully and modestly dressed.
> [wrapper standard, femme]

### 21. Legging capri LINA (réf 4564)
`→ legging-capri-lina-4564.webp`
> Photorealistic e-commerce image of cropped capri leggings with a high comfort waistband, smooth
> fabric, available in beige, white and black. Worn by a young adult woman with a plain top, fully and
> modestly dressed. [wrapper standard, femme] (générer beige + blanc + noir)

### 22. Legging capri fleuri (réf 7700)
`→ legging-capri-fleuri-marine.webp`
> Photorealistic e-commerce image of cropped capri leggings in navy with an all-over small pink and
> grey floral print, high comfort waistband. Worn by a young adult woman with a plain top, fully and
> modestly dressed. [wrapper standard, femme]

---

# HOMME

### 23. Ensemble plage t-shirt + short ENZO SALVATORE (réf 20231)
`→ ensemble-homme-tshirt-short-plage-marine.webp`
> Photorealistic e-commerce image of a men's casual summer co-ord set: a navy-blue short-sleeve cotton
> T-shirt with a small palm-tree/car chest print and light-blue ribbed collar, with matching light-blue
> printed shorts ("SUN" / palm-tree pattern). Worn by a young adult man, fully and modestly dressed.
> [wrapper standard, homme]
