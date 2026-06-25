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

---
---

# 3ᵉ VAGUE — photos WhatsApp du 22/06/2026

> Même méthode. Chaque entrée donne le `→ fichier.webp` cible (identique au champ `images`
> de `backend/add-new-products-2.js`) et la photo WhatsApp source.
>
> **Deux cas :**
> - **(RAW)** photo à plat / mannequin / sol → **régénérer obligatoirement** (porté par un modèle,
>   ou mannequin invisible pour les sous-vêtements).
> - **(MODEL)** déjà porté par un modèle chez le fournisseur → **régénération optionnelle**, surtout
>   pour **retirer le logo / la référence du concurrent** (ex. « Rose Miss », « Flora », « LT08-…»,
>   « SUZANA », réf 23218…) et uniformiser le fond gris clair. Sinon, recadrer simplement.

## Sous-vêtements (rendu « mannequin invisible / ghost » recommandé)

### S1. Soutien-gorge coton sans armatures — blanc  · (RAW) src `08.52.04`
`→ soutien-gorge-coton-armatures-blanc.webp`
> Photorealistic e-commerce image of a white full-coverage non-wired cotton bra with wide plush straps,
> soft full cups with subtle lace overlay and a small centre bow. Presented on an invisible / ghost
> mannequin (no visible person). [wrapper ghost mannequin]

### S2. Débardeur coton fines bretelles — blanc · (RAW) src `09.04.35`
`→ debardeur-coton-fleur-dentelle-blanc.webp`
> Photorealistic e-commerce image of a white soft-cotton camisole with thin spaghetti straps and a small
> floral lace appliqué at the neckline. Presented on an invisible / ghost mannequin. [wrapper ghost mannequin]

### S3. Culotte coton imprimé pommes — rose · (RAW) src `09.20.42`
`→ culotte-imprime-pommes-rose.webp`
> Photorealistic e-commerce image of pale-pink cotton briefs with an all-over small red apple print,
> picot trim and a tiny bow. Presented on an invisible / ghost mannequin (lower body form only).
> [wrapper ghost mannequin]

### S4. Brassière confort bretelles fines — vert olive · (RAW) src `09.15.46`
`→ brassiere-confort-bretelles-olive.webp`
> Photorealistic e-commerce image of an olive-green wireless bralette with thin adjustable straps, a soft
> scoop neckline and a wide elastic band. Presented on an invisible / ghost mannequin. [wrapper ghost mannequin]

### S5. Débardeur côtelé col V dentelle — blanc · (RAW) src `09.28.45`
`→ debardeur-cotele-col-v-dentelle-blanc.webp`
> Photorealistic e-commerce image of a white ribbed-cotton tank top with a V-neckline trimmed in floral
> lace. Presented on an invisible / ghost mannequin. [wrapper ghost mannequin]

### S6. Débardeur côtelé bretelles dentelle — multicolore · (RAW) src `09.42.25` + `10.13.33`
`→ debardeur-cotele-bretelles-dentelle.webp`  (générer par couleur : gris, rose, vert, bleu, violet, noir, blanc, bordeaux)
> Photorealistic e-commerce image of a ribbed-knit tank top with lace-trimmed shoulder straps and a small
> lace panel at the centre front. Presented on an invisible / ghost mannequin. [wrapper ghost mannequin]
> Variantes : « keep everything identical, change only the colour to X ».

### S7. Débardeur côtelé boutonné col dentelle — multicolore · (MODEL) src `10.07.58`
`→ debardeur-julia-cotele-dentelle.webp`  (crème, gris, noir, beige)
> Clean up the supplier collage: present a single ribbed-cotton camisole with thin straps, a lace-trimmed
> neckline and a small button placket, on an invisible / ghost mannequin, plain light-grey background.
> [wrapper ghost mannequin] (remove "julia" logo and REF text)

### S8–S12. Parures soutien-gorge + culotte/string  · (RAW)
> Pour chaque parure : *Photorealistic e-commerce image of a women's two-piece bra-and-briefs lingerie set
> in [COULEUR], a smooth push-up bra and matching bottoms. Presented on an invisible / ghost mannequin
> (no visible person). [wrapper ghost mannequin]* — retirer hangers et étiquettes.

- S8. taupe à dentelle (`09.48.45`) `→ parure-pushup-dentelle-taupe.webp` — push-up bra with lace lower edge + briefs with lace side panels, mauve-taupe.
- S9. rose satin (`09.51.14`) `→ parure-pushup-satin-rose.webp` — rose push-up bra with satin straps + matching tanga with bow.
- S10. prune (`09.53.32`) `→ parure-pushup-prune.webp` — deep plum push-up bra with embellished straps + matching thong.
- S11. vert sauge (`09.56.01`) `→ parure-pushup-dentelle-vert-sauge.webp` — sage-green push-up bra with lace + briefs with lace side panels.
- S12. bleu canard (`10.00.01`) `→ parure-pushup-bleu-canard.webp` — teal push-up bra with crystal-trim straps + matching thong.

## Homewear  (porté par un modèle, sauf sport sur fond uni)

### H1. Short cycliste taille haute — bordeaux · (RAW) src `08.54.27`
`→ cycliste-uni-bordeaux.webp`
> Photorealistic e-commerce image of high-waist mid-thigh cycling shorts in solid burgundy soft stretch
> fabric, worn by a young adult woman with a plain neutral top, fully and modestly dressed. [wrapper standard, femme]

### H2. Short cycliste inserts dentelle — crème · (RAW) src `09.34.18`
`→ cycliste-dentelle-cote-creme.webp`
> Same high-waist mid-thigh cycling shorts in cream, with lace inserts on the outer side seams. [wrapper standard, femme]

### H3. Short long taille haute — blanc · (RAW) src `09.00.57`
`→ short-long-uni-blanc.webp`
> Knee-length plain white stretch-cotton shorts with a high elastic waistband. [wrapper standard, femme]

### H4. Pantacourt bord dentelle — blanc · (RAW) src `09.44.00`
`→ pantacourt-bord-dentelle-blanc.webp`
> Flowy white cropped lounge trousers with a wide floral-lace hem band and elastic waist. [wrapper standard, femme]

### H5. Pantacourt fluide bord dentelle — noir · (RAW) src `09.02.49`
`→ pantacourt-fluide-dentelle-noir.webp`
> Flowy black cropped lounge trousers with an elastic waist and a delicate lace trim at the hem. [wrapper standard, femme]

### H6. Legging long uni — beige · (RAW) src `08.58.34`
`→ legging-long-uni-beige.webp`
> Full-length beige soft-cotton leggings with a high comfort waistband. [wrapper standard, femme]

### H7. Pantalon large fluide — mauve · (RAW) src `09.37.38`
`→ pantalon-large-fluide-mauve.webp`
> Wide-leg flowy lounge trousers in mauve soft knit, drawstring elastic waist and side pockets. [wrapper standard, femme]

### H8. T-shirt basique cintré — noir · (RAW) src `09.17.49`
`→ tshirt-basique-cintre-noir.webp`
> Fitted black short-sleeve cotton T-shirt with a round neck. [wrapper standard, femme]

### H9. Haut thermique manches longues — nude · (RAW) src `09.09.51`
`→ top-thermique-manches-longues-nude.webp`
> Long-sleeve round-neck thermal base-layer top in smooth nude fabric. [wrapper standard, femme]

### H10. Haut maille épaules & manches dentelle — mocha · (RAW) src `09.12.21`
`→ top-dentelle-epaules-manches-mocha.webp`
> Long-sleeve soft-knit top in mocha with sheer lace shoulder yoke and lace sleeves. [wrapper standard, femme]

### H11. Haut col montant dentelle — blanc · (RAW) src `09.24.41`
`→ top-col-montant-dentelle-blanc.webp`
> White long-sleeve top with a floral-lace yoke and a high lace mock-neck collar. [wrapper standard, femme]

### H12. Haut col montant épaules dentelle — noir · (RAW) src `09.30.36`
`→ top-col-montant-dentelle-noir.webp`
> Black long-sleeve top with a gathered mock-neck and lace insets on the shoulders. [wrapper standard, femme]

### H13. Ensemble brassière + culotte de sport — multicolore · (MODEL) src `10.16.29`
`→ ensemble-brassiere-culotte-sport.webp`  (8 coloris : rose clair, violet clair, vert lac, rouge orangé, abricot, bleu vif, blanc, noir)
> Clean catalogue image of a women's two-piece sports set: a racerback sports bra and matching briefs with
> a contrast logo waistband, worn by a young adult woman as athletic wear, fully and modestly dressed.
> [wrapper standard, femme] — générer par couleur, retirer le texte « SPORT BRA » du collage.

## Pyjamas / Chemises de nuit / Robes d'intérieur

### P1. Nuisette fond de robe dentelle — écru · (RAW) src `09.36.13`
`→ nuisette-fond-robe-dentelle-ecru.webp`
> Casual ivory slip-style nightdress / under-dress in flowy fabric, V-neck and hem trimmed with lace,
> thin adjustable straps, knee-length. Fully and modestly presented. [wrapper standard, femme]

### P2. Chemise de nuit col dentelle — rose chiné · (MODEL) src `10.06.44`
`→ chemise-nuit-flora-rose-chine.webp`
> Soft marled-pink short-sleeve mid-length nightdress with flutter sleeves and a white lace V-neck with a
> small bow. [wrapper standard, femme] — retirer le logo « Flora Secret » et la réf 23218.

### P3. Chemise de nuit boutonnée col dentelle — multicolore · (MODEL) src `10.17.09`
`→ chemise-nuit-suzana-boutonnee.webp`  (rose, beige, pêche, crème, menthe, bleu)
> Short-sleeve mid-length nightdress with a buttoned lace-trimmed yoke, a small bow and a flared cut.
> [wrapper standard, femme] — retirer le logo « SUZANA-STYLE » et le modèle S-10033. Générer par couleur.

### P4. Chemise de nuit volantée imprimé cerises — blanc · (MODEL) src `10.18.02`
`→ chemise-nuit-volants-cerises-blanc.webp`
> White nightdress with an all-over small red cherry print, ruffled flutter sleeves, a gathered yoke and a
> ruffled hem. [wrapper standard, femme] — retirer le logo « Flora Mode » et la réf 00078.

### P5. Chemise de nuit imprimé cachemire — blanc · (MODEL) src `10.23.29`
`→ chemise-nuit-paisley-blanc.webp`
> White short-sleeve nightdress with a large coral-and-grey paisley print, square neckline with a contrast
> black bow. [wrapper standard, femme] — retirer la réf 000141.

### P6. Chemise de nuit imprimé cœurs — pêche/lilas · (MODEL) src `10.20.17`
`→ chemise-nuit-coeurs.webp`  (pêche, lilas)
> Flowy short-sleeve nightdress with an all-over small multicolour heart print, gathered sleeves and side
> pockets, knee-length. [wrapper standard, femme] — générer en pêche et en lilas.

### P7. Chemise de nuit velours col à volants — multicolore · (MODEL) src `10.15.45`
`→ chemise-nuit-velours-col-volant.webp`  (terracotta, rose, vert, bleu gris)
> Long velvet long-sleeve nightgown with a ruffled lace collar and ruffled lace cuffs. [wrapper standard, femme]
> — retirer la réf LT08-3064. Générer par couleur.

### P8. Chemise de nuit longue brodée — multicolore · (MODEL) src `10.17.27`
`→ chemise-nuit-longue-brodee.webp`  (vert, beige, bleu, noir, rose)
> Long cotton long-sleeve nightgown with an embroidered floral front yoke and soft gathers. [wrapper standard, femme]
> — retirer la réf LT08-3061. Générer par couleur.

### P9. Robe d'intérieur brodée manches courtes — multicolore · (MODEL) src `10.14.40`
`→ robe-interieur-brodee-latay.webp`  (rouge, marron, lilas, vert, rose)
> Long short-sleeve cotton house dress with an embroidered front yoke and soft gathers. [wrapper standard, femme]
> — retirer le logo « Latay » et la réf 3102. Générer par couleur.

### P10. Pyjama chemise + pantalon palmiers — écru · (MODEL) src `10.08.40`
`→ pyjama-chemise-palmiers-ecru.webp`
> Two-piece pyjama set: short-sleeve notch-collar shirt and matching trousers, green palm-tree print on
> ivory. [wrapper standard, femme] — retirer le logo « Rose Miss » et la réf 23327.

### P11. Pyjama chemise + pantalon fruits — écru/rose · (MODEL) src `10.10.50`
`→ pyjama-chemise-fruits.webp`  (écru, rose)
> Two-piece pyjama set: short-sleeve notch-collar shirt and matching trousers, colourful all-over fruit
> print. [wrapper standard, femme] — retirer le logo « Rose Miss » et la réf 23174. Générer en écru et en rose.

### P12. Pyjama t-shirt lionceaux + corsaire à pois — écru · (MODEL) src `10.18.53`
`→ pyjama-lionceaux-pois-ecru.webp`
> Two-piece pyjama set in ivory with small black polka dots: a short-sleeve T-shirt with a cute lion-cub
> cartoon print and matching cropped capri trousers with a drawstring. [wrapper standard, femme]
> ⚠ Éviter toute marque déposée : générer un imprimé « lionceaux » générique, pas un personnage sous licence.

## Enfant

### E1. Débardeur fille coton ajouré — blanc · (RAW) src `09.06.51`
`→ debardeur-enfant-pointelle-blanc.webp`
> Photorealistic e-commerce image of a girl's white pointelle-knit (heart pattern) sleeveless undershirt
> with a scalloped neckline and a tiny bow, presented on an invisible / ghost mannequin (child form),
> plain light-grey background. [wrapper ghost mannequin]

### E2. Pyjama fille t-shirt + legging capri — rose · (MODEL) src `10.07.38`
`→ pyjama-fille-california-rose.webp`
> Girl's two-piece pyjama set: a pink short-sleeve printed T-shirt and matching mauve capri leggings, worn
> by a child model, plain light-grey studio background, fully and modestly dressed. [wrapper standard, child]

### E3. Ensemble t-shirt + short imprimé garçon — gris · (MODEL) src `10.19.43`
`→ ensemble-garcon-tshirt-short-gris.webp`
> Boy's two-piece co-ord set: a grey-marled short-sleeve printed T-shirt and matching shorts, worn by a
> child boy model, plain light-grey studio background. [wrapper standard, child] — retirer le décor « runway ».

### E4 → H14. Ensemble t-shirt rayé + short HOMME — marine · (RAW) src `09.26.40`
`→ ensemble-homme-tshirt-short-raye-marine.webp`
> Men's two-piece co-ord set: a short-sleeve striped (red/white/blue) T-shirt with a chest pocket and navy
> shorts with a drawstring, worn by a young adult man, light-grey background. [wrapper standard, homme]
> ✅ Classé `homme / homewear` (décision : styling + taille adulte).
