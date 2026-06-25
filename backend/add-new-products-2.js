require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

// =====================================================================
//  AJOUT NON DESTRUCTIF — 3ᵉ VAGUE (photos WhatsApp du 22/06/2026).
//  Même logique que add-new-products.js : on insère seulement les
//  produits absents (par `name`). Lancer :  node add-new-products-2.js
//
//  ⚠️  PRIX = PLACEHOLDERS — à ajuster dans /admin/produits.
//
//  ⚠️  IMAGES : chaque produit pointe vers le `.webp` « maison » à
//      générer via Gemini (voir gemini-prompts-nouveaux-produits.md,
//      section « 3ᵉ vague »). Le commentaire `src:` rappelle la photo
//      WhatsApp d'origine et si une régénération est nécessaire.
//
//      • src raw   → flat-lay / mannequin / sol : RÉGÉNÉRER (obligatoire)
//      • src model → déjà porté par un modèle chez le fournisseur :
//                    régénération optionnelle (surtout pour retirer le
//                    logo / la référence du concurrent).
// =====================================================================

const TAILLES_FEMME = ['S', 'M', 'L', 'XL', 'XXL']
const TAILLES_HOMME = ['S', 'M', 'L', 'XL', 'XXL']
const TAILLES_NUIT = ['M', 'L', 'XL', 'XXL']
const TAILLES_NUIT_GT = ['M', 'L', 'XL', '2XL', '3XL']
const TAILLES_ENFANT = ['4 ans', '6 ans', '8 ans', '10 ans', '12 ans']

const NOUVEAUX = [
  // ═══════════════════════════════════════════════════════════════════
  //  FEMME · SOUS-VÊTEMENTS
  // ═══════════════════════════════════════════════════════════════════

  // src raw : 08.52.04 (soutien-gorge coton blanc « Leonisa », à plat)
  {
    name: 'Soutien-gorge coton sans armatures grande taille — blanc',
    description:
      'Soutien-gorge classique en coton blanc, sans armatures, à larges bonnets pleins et empiècements dentelle, bretelles réglables et petit nœud central. Maintien doux et confort grande taille.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 119,
    discount: 0,
    images: ['/soutien-gorge-coton-armatures-blanc.webp'],
    sizes: ['85B', '90B', '95B', '100B', '105B'],
    colors: ['Blanc'],
    newArrival: true,
  },

  // src raw : 09.04.35 (débardeur coton fines bretelles, fleur dentelle)
  {
    name: 'Débardeur coton fines bretelles — blanc',
    description:
      'Débardeur en coton doux à fines bretelles, petit motif fleuri en dentelle au décolleté. Idéal en sous-vêtement ou à porter seul à la maison.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 59,
    discount: 0,
    images: ['/debardeur-coton-fleur-dentelle-blanc.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Blanc'],
  },

  // src raw : 09.20.42 (culotte coton imprimé pommes, rose)
  {
    name: 'Culotte coton imprimé pommes — rose',
    description:
      'Culotte en coton doux rose pâle à imprimé pommes, finitions picot et petit nœud. Confortable au quotidien.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 39,
    discount: 0,
    images: ['/culotte-imprime-pommes-rose.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Rose'],
  },

  // src raw : 09.15.46 (brassière confort bretelles fines, vert olive « anni »)
  {
    name: 'Brassière confort bretelles fines — vert olive',
    description:
      'Brassière sans armatures à bretelles fines réglables et large bande souple, coupe douce et galbante. Confort au quotidien.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 89,
    discount: 0,
    images: ['/brassiere-confort-bretelles-olive.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Vert olive'],
  },

  // src raw : 09.28.45 (débardeur côtelé col V dentelle, blanc)
  {
    name: 'Débardeur côtelé col V dentelle — blanc',
    description:
      'Débardeur en coton côtelé blanc, décolleté en V souligné de dentelle florale. Maillot de corps doux et féminin.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 65,
    discount: 0,
    images: ['/debardeur-cotele-col-v-dentelle-blanc.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Blanc'],
  },

  // src raw : 09.42.25 (gris) + 10.13.33 (pack multicolore) → MÊME modèle
  {
    name: 'Débardeur côtelé bretelles dentelle — multicolore',
    description:
      'Débardeur en maille côtelée à bretelles et bordure en dentelle assortie. Doux et extensible, disponible en plusieurs coloris.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 65,
    discount: 0,
    images: ['/debardeur-cotele-bretelles-dentelle.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Gris', 'Rose', 'Vert', 'Bleu', 'Violet', 'Noir', 'Blanc', 'Bordeaux'],
    newArrival: true,
  },

  // src model : 10.07.58 (Julia 19256, cami côtelée boutonnée, 4 coloris)
  {
    name: 'Débardeur côtelé boutonné col dentelle — multicolore',
    description:
      'Débardeur en coton côtelé à fines bretelles, col bordé de dentelle et petite patte boutonnée. Maillot de corps confortable, plusieurs coloris.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 69,
    discount: 0,
    images: ['/debardeur-julia-cotele-dentelle.webp'],
    sizes: TAILLES_NUIT,
    colors: ['Crème', 'Gris', 'Noir', 'Beige'],
  },

  // src raw : 09.48.45 (parure push-up + culotte dentelle, taupe « Anna Bonna »)
  {
    name: 'Parure soutien-gorge push-up + culotte dentelle — taupe',
    description:
      'Parure 2 pièces taupe : soutien-gorge push-up à bordure dentelle et petit nœud, culotte assortie à empiècements dentelle. Galbant et élégant.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 169,
    discount: 0,
    images: ['/parure-pushup-dentelle-taupe.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Taupe'],
    featured: true,
    newArrival: true,
  },

  // src raw : 09.51.14 (parure push-up + tanga satin, rose)
  {
    name: 'Parure soutien-gorge push-up + tanga satin — rose',
    description:
      'Parure 2 pièces rose : soutien-gorge push-up à bretelles satin et tanga assorti à détail nœud. Coupe glamour et confortable.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 159,
    discount: 0,
    images: ['/parure-pushup-satin-rose.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Rose'],
    newArrival: true,
  },

  // src raw : 09.53.32 (parure push-up + string, prune « Canlan Keni »)
  {
    name: 'Parure soutien-gorge push-up + string — prune',
    description:
      'Parure 2 pièces prune : soutien-gorge push-up à bretelles ornées et string assorti. Lisse, galbant et élégant.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 159,
    discount: 0,
    images: ['/parure-pushup-prune.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Prune'],
    newArrival: true,
  },

  // src raw : 09.56.01 (parure push-up + culotte dentelle, vert sauge)
  {
    name: 'Parure soutien-gorge push-up + culotte dentelle — vert sauge',
    description:
      'Parure 2 pièces vert sauge : soutien-gorge push-up à bordure dentelle et culotte assortie à empiècements dentelle. Doux et féminin.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 169,
    discount: 0,
    images: ['/parure-pushup-dentelle-vert-sauge.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Vert sauge'],
    newArrival: true,
  },

  // src raw : 10.00.01 (parure push-up + string, bleu canard « Fashion Bra »)
  {
    name: 'Parure soutien-gorge push-up + string — bleu canard',
    description:
      'Parure 2 pièces bleu canard : soutien-gorge push-up à bretelles ornées de strass et string assorti. Lisse et galbant.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 159,
    discount: 0,
    images: ['/parure-pushup-bleu-canard.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Bleu canard'],
    newArrival: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  //  FEMME · HOMEWEAR
  // ═══════════════════════════════════════════════════════════════════

  // src raw : 08.54.27 (short cycliste uni, bordeaux, sur mannequin)
  {
    name: 'Short cycliste taille haute — bordeaux',
    description:
      'Short cycliste taille haute en maille douce et extensible, bordeaux. Galbant et confortable, parfait sous une robe ou pour le sport.',
    category: 'femme',
    subcategory: 'homewear',
    price: 69,
    discount: 0,
    images: ['/cycliste-uni-bordeaux.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Bordeaux'],
  },

  // src raw : 09.34.18 (short cycliste inserts dentelle, crème)
  {
    name: 'Short cycliste inserts dentelle — crème',
    description:
      'Short cycliste mi-long en maille douce crème, inserts dentelle sur les côtés et large ceinture confort. Galbant et élégant.',
    category: 'femme',
    subcategory: 'homewear',
    price: 79,
    discount: 0,
    images: ['/cycliste-dentelle-cote-creme.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Crème'],
  },

  // src raw : 09.00.57 (short long uni, blanc)
  {
    name: 'Short long taille haute — blanc',
    description:
      'Short long (longueur genou) en coton extensible blanc, large ceinture élastiquée confort. Basique d’intérieur indispensable.',
    category: 'femme',
    subcategory: 'homewear',
    price: 69,
    discount: 0,
    images: ['/short-long-uni-blanc.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Blanc'],
  },

  // src raw : 09.44.00 (pantacourt bord dentelle large, blanc)
  {
    name: 'Pantacourt bord dentelle — blanc',
    description:
      'Pantacourt fluide blanc à large bord en dentelle et ceinture élastiquée confort. Doux et féminin pour la maison.',
    category: 'femme',
    subcategory: 'homewear',
    price: 79,
    discount: 0,
    images: ['/pantacourt-bord-dentelle-blanc.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Blanc'],
  },

  // src raw : 09.02.49 (pantacourt fluide bord dentelle, noir)
  {
    name: 'Pantacourt fluide bord dentelle — noir',
    description:
      'Pantacourt fluide noir à ceinture élastiquée et fine bordure dentelle aux chevilles. Léger et confortable à la maison.',
    category: 'femme',
    subcategory: 'homewear',
    price: 79,
    discount: 0,
    images: ['/pantacourt-fluide-dentelle-noir.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
  },

  // src raw : 08.58.34 (legging long uni, beige/camel)
  {
    name: 'Legging long uni — beige',
    description:
      'Legging long en coton doux beige, ceinture haute confort. Basique extensible à porter à la maison comme en ville.',
    category: 'femme',
    subcategory: 'homewear',
    price: 79,
    discount: 0,
    images: ['/legging-long-uni-beige.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Beige'],
  },

  // src raw : 09.37.38 (pantalon large fluide, mauve, sur mannequin)
  {
    name: 'Pantalon large fluide — mauve',
    description:
      'Pantalon d’intérieur large et fluide en maille douce mauve, taille élastiquée à cordon et poches. Décontracté et élégant.',
    category: 'femme',
    subcategory: 'homewear',
    price: 119,
    discount: 0,
    images: ['/pantalon-large-fluide-mauve.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Mauve'],
    newArrival: true,
  },

  // src raw : 09.17.49 (t-shirt basique cintré, noir)
  {
    name: 'T-shirt basique cintré — noir',
    description:
      'T-shirt basique cintré en coton doux noir, col rond et manches courtes. Indispensable à porter au quotidien.',
    category: 'femme',
    subcategory: 'homewear',
    price: 69,
    discount: 0,
    images: ['/tshirt-basique-cintre-noir.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
  },

  // src raw : 09.09.51 (haut thermique manches longues, nude)
  {
    name: 'Haut thermique manches longues — nude',
    description:
      'Haut sous-vêtement thermique à manches longues et col rond, maille douce nude. Chaud, léger et invisible sous les vêtements.',
    category: 'femme',
    subcategory: 'homewear',
    price: 99,
    discount: 0,
    images: ['/top-thermique-manches-longues-nude.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Nude'],
  },

  // src raw : 09.12.21 (haut maille épaules & manches dentelle, mocha)
  {
    name: 'Haut maille épaules & manches dentelle — mocha',
    description:
      'Haut manches longues en maille douce mocha, empiècement et manches en dentelle. Élégant à porter à la maison ou en ville.',
    category: 'femme',
    subcategory: 'homewear',
    price: 119,
    discount: 0,
    images: ['/top-dentelle-epaules-manches-mocha.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Mocha'],
  },

  // src raw : 09.24.41 (haut col montant dentelle, blanc)
  {
    name: 'Haut col montant dentelle — blanc',
    description:
      'Haut manches longues blanc, empiècement et col montant en dentelle florale. Raffiné et confortable.',
    category: 'femme',
    subcategory: 'homewear',
    price: 119,
    discount: 0,
    images: ['/top-col-montant-dentelle-blanc.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Blanc'],
  },

  // src raw : 09.30.36 (haut col montant épaules dentelle, noir)
  {
    name: 'Haut col montant épaules dentelle — noir',
    description:
      'Haut manches longues noir à col montant froncé et empiècements dentelle sur les épaules. Chic et féminin.',
    category: 'femme',
    subcategory: 'homewear',
    price: 119,
    discount: 0,
    images: ['/top-col-montant-dentelle-noir.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
  },

  // src model : 10.16.29 (ensemble brassière + culotte de sport, 8 coloris)
  {
    name: 'Ensemble brassière + culotte de sport — multicolore',
    description:
      'Ensemble 2 pièces de sport : brassière dos nageur et culotte assortie à large ceinture logo. Maille extensible, plusieurs coloris.',
    category: 'femme',
    subcategory: 'homewear',
    price: 129,
    discount: 0,
    images: ['/ensemble-brassiere-culotte-sport.webp'],
    sizes: TAILLES_FEMME,
    colors: [
      'Rose clair', 'Violet clair', 'Vert lac', 'Rouge orangé',
      'Abricot', 'Bleu vif', 'Blanc', 'Noir',
    ],
    featured: true,
    newArrival: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  //  FEMME · PYJAMAS / CHEMISES DE NUIT / ROBES D'INTÉRIEUR
  // ═══════════════════════════════════════════════════════════════════

  // src raw : 09.36.13 (nuisette / fond de robe dentelle, écru)
  {
    name: 'Nuisette fond de robe dentelle — écru',
    description:
      'Nuisette / fond de robe en maille fluide écru, décolleté et ourlet bordés de dentelle, fines bretelles réglables. Doux et élégant pour la nuit.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 129,
    discount: 0,
    images: ['/nuisette-fond-robe-dentelle-ecru.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Écru'],
  },

  // src model : 10.06.44 (Flora Secret 23218, chemise de nuit col dentelle, rose chiné)
  {
    name: 'Chemise de nuit col dentelle manches courtes — rose chiné',
    description:
      'Chemise de nuit en maille douce rose chiné, manches courtes à volant, décolleté V bordé de dentelle blanche et petit nœud. Confortable et féminine.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 169,
    discount: 0,
    images: ['/chemise-nuit-flora-rose-chine.webp'],
    sizes: TAILLES_NUIT,
    colors: ['Rose chiné'],
    newArrival: true,
  },

  // src model : 10.17.09 (Suzana S-10033, chemise de nuit boutonnée, 6 coloris)
  {
    name: 'Chemise de nuit boutonnée col dentelle — multicolore',
    description:
      'Chemise de nuit mi-longue manches courtes, empiècement boutonné orné de dentelle et fin nœud. Coupe évasée confortable, plusieurs coloris pastel.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 169,
    discount: 0,
    images: ['/chemise-nuit-suzana-boutonnee.webp'],
    sizes: TAILLES_NUIT,
    colors: ['Rose', 'Beige', 'Pêche', 'Crème', 'Menthe', 'Bleu'],
  },

  // src model : 10.18.02 (Flora Mode 00078, chemise de nuit volants cerises, blanc)
  {
    name: 'Chemise de nuit volantée imprimé cerises — blanc',
    description:
      'Chemise de nuit blanche à imprimé cerises rouges, manches papillon à volant, empiècement froncé et ourlet volanté. Légère et fraîche.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 169,
    discount: 0,
    images: ['/chemise-nuit-volants-cerises-blanc.webp'],
    sizes: TAILLES_NUIT,
    colors: ['Blanc'],
    newArrival: true,
  },

  // src model : 10.23.29 (000141, chemise de nuit imprimé cachemire, blanc)
  {
    name: 'Chemise de nuit imprimé cachemire — blanc',
    description:
      'Chemise de nuit blanche à grand imprimé cachemire (paisley) corail et gris, encolure carrée à nœud contrasté et manches courtes. Fluide et confortable.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 159,
    discount: 0,
    images: ['/chemise-nuit-paisley-blanc.webp'],
    sizes: TAILLES_NUIT_GT,
    colors: ['Blanc'],
  },

  // src model : 10.20.17 (chemise de nuit imprimé cœurs, pêche + lilas)
  {
    name: 'Chemise de nuit imprimé cœurs — pêche/lilas',
    description:
      'Chemise de nuit fluide à imprimé petits cœurs colorés, manches courtes à fronces et poches. Décontractée et douce, disponible en pêche et lilas.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 169,
    discount: 0,
    images: ['/chemise-nuit-coeurs.webp'],
    sizes: TAILLES_NUIT,
    colors: ['Pêche', 'Lilas'],
  },

  // src model : 10.15.45 (LT08-3064, chemise de nuit velours col à volants, 4 coloris)
  {
    name: 'Chemise de nuit velours col à volants — multicolore',
    description:
      'Chemise de nuit longue en velours doux, manches longues, col et poignets ornés de volants en dentelle. Chaude et élégante, plusieurs coloris.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 219,
    discount: 0,
    images: ['/chemise-nuit-velours-col-volant.webp'],
    sizes: TAILLES_NUIT,
    colors: ['Terracotta', 'Rose', 'Vert', 'Bleu gris'],
    featured: true,
    newArrival: true,
  },

  // src model : 10.17.27 (LT08-3061, chemise de nuit longue brodée, 5 coloris)
  {
    name: 'Chemise de nuit longue brodée manches longues — multicolore',
    description:
      'Chemise de nuit longue en coton, manches longues, empiècement brodé fleuri et fines fronces. Coupe ample et confortable, plusieurs coloris.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 229,
    discount: 0,
    images: ['/chemise-nuit-longue-brodee.webp'],
    sizes: TAILLES_NUIT_GT,
    colors: ['Vert', 'Beige', 'Bleu', 'Noir', 'Rose'],
    newArrival: true,
  },

  // src model : 10.14.40 (Latay 3102, robe d'intérieur brodée manches courtes, 5 coloris)
  {
    name: 'Robe d’intérieur brodée manches courtes — multicolore',
    description:
      'Longue robe d’intérieur en coton, manches courtes, empiècement brodé et fines fronces. Ample et fraîche pour la maison, plusieurs coloris.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 199,
    discount: 0,
    images: ['/robe-interieur-brodee-latay.webp'],
    sizes: TAILLES_NUIT_GT,
    colors: ['Rouge', 'Marron', 'Lilas', 'Vert', 'Rose'],
  },

  // src model : 10.08.40 (Rose Miss 23327, pyjama chemise + pantalon palmiers, écru)
  {
    name: 'Pyjama chemise + pantalon imprimé palmiers — écru',
    description:
      'Ensemble pyjama 2 pièces : chemise manches courtes à col cranté et pantalon assorti, imprimé palmiers vert sur fond écru. Tissu fluide et léger.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 199,
    discount: 0,
    images: ['/pyjama-chemise-palmiers-ecru.webp'],
    sizes: TAILLES_NUIT,
    colors: ['Écru'],
    newArrival: true,
  },

  // src model : 10.10.50 (Rose Miss 23174, pyjama chemise fruits, écru + rose)
  {
    name: 'Pyjama chemise + pantalon imprimé fruits — écru/rose',
    description:
      'Ensemble pyjama 2 pièces : chemise manches courtes à col cranté et pantalon assorti, imprimé fruits coloré. Léger et estival, en écru ou rose.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 199,
    discount: 0,
    images: ['/pyjama-chemise-fruits.webp'],
    sizes: TAILLES_NUIT,
    colors: ['Écru', 'Rose'],
  },

  // src model : 10.18.53 (pyjama t-shirt lionceaux + corsaire à pois, écru)
  {
    name: 'Pyjama t-shirt imprimé lionceaux + corsaire à pois — écru',
    description:
      'Ensemble pyjama 2 pièces écru à pois noirs : t-shirt manches courtes à imprimé lionceaux et corsaire (pantacourt) assorti à cordon. Doux et amusant.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 169,
    discount: 0,
    images: ['/pyjama-lionceaux-pois-ecru.webp'],
    sizes: TAILLES_NUIT,
    colors: ['Écru'],
    newArrival: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  //  ENFANT
  // ═══════════════════════════════════════════════════════════════════

  // src raw : 09.06.51 (débardeur fille coton ajouré, blanc)
  {
    name: 'Débardeur fille coton ajouré — blanc',
    description:
      'Débardeur fille en coton blanc à maille ajourée (motif cœurs), encolure festonnée et petit nœud. Sous-vêtement doux et respirant.',
    category: 'enfant',
    subcategory: 'fille',
    price: 35,
    discount: 0,
    images: ['/debardeur-enfant-pointelle-blanc.webp'],
    sizes: TAILLES_ENFANT,
    colors: ['Blanc'],
  },

  // src model : 10.07.38 (pyjama fille t-shirt California + legging, rose)
  {
    name: 'Pyjama fille t-shirt + legging capri — rose',
    description:
      'Ensemble pyjama fille : t-shirt rose à imprimé « California » et legging capri mauve assorti. Coton doux et confortable.',
    category: 'enfant',
    subcategory: 'fille',
    price: 129,
    discount: 0,
    images: ['/pyjama-fille-california-rose.webp'],
    sizes: TAILLES_ENFANT,
    colors: ['Rose'],
    newArrival: true,
  },

  // src model : 10.19.43 (ensemble garçon t-shirt + short imprimé, gris)
  {
    name: 'Ensemble t-shirt + short imprimé garçon — gris',
    description:
      'Ensemble garçon 2 pièces : t-shirt manches courtes gris chiné à imprimé et short assorti. Coton léger, confortable pour l’été.',
    category: 'enfant',
    subcategory: 'garcon',
    price: 119,
    discount: 0,
    images: ['/ensemble-garcon-tshirt-short-gris.webp'],
    sizes: TAILLES_ENFANT,
    colors: ['Gris'],
    newArrival: true,
  },

  // src raw : 09.26.40 (ensemble t-shirt rayé + short, marine)
  //  → classé HOMME / homewear (styling adulte : rayures, poche, cordon ; taille adulte).
  {
    name: 'Ensemble t-shirt rayé + short homme — marine',
    description:
      'Ensemble homme 2 pièces : t-shirt manches courtes à rayures (rouge, blanc, bleu) avec poche poitrine et short marine à cordon. Coton léger d’été.',
    category: 'homme',
    subcategory: 'homewear',
    price: 119,
    discount: 0,
    images: ['/ensemble-homme-tshirt-short-raye-marine.webp'],
    sizes: TAILLES_HOMME,
    colors: ['Marine'],
  },
]

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté — ajout des nouveaux produits (3ᵉ vague)...')
  let added = 0
  let skipped = 0
  for (const p of NOUVEAUX) {
    const exists = await Product.exists({ name: p.name })
    if (exists) {
      console.log(`↷ déjà présent, ignoré : ${p.name}`)
      skipped++
      continue
    }
    await Product.create(p) // create() déclenche le hook de slug
    console.log(`✓ ajouté : ${p.name}`)
    added++
  }
  console.log(`Terminé. ${added} ajouté(s), ${skipped} ignoré(s).`)
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
