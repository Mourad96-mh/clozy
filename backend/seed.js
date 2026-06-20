require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

// =====================================================================
//  CATALOGUE RÉEL — photos du client (dans frontend/public/).
//
//  ⚠️  PRIX = PLACEHOLDERS. Les valeurs `price` ci-dessous sont des
//  estimations à ajuster depuis le tableau de bord admin (/admin/produits)
//  ou ici avant de relancer `npm run seed`.
//
//  Les images sont servies depuis frontend/public à la racine du site
//  (ex: "/pyjama-satin-raye-gris.webp"). Si vous migrez vers Cloudinary,
//  remplacez ces chemins par les URLs renvoyées par l'upload.
// =====================================================================

// Tailles standard réutilisées
const TAILLES_FEMME = ['S', 'M', 'L', 'XL', 'XXL']
const TAILLES_HOMME = ['M', 'L', 'XL', 'XXL']
const TAILLES_BURKINI = ['M', 'L', 'XL', '2XL', '3XL', '4XL']

const PRODUITS = [
  // ── FEMME · PYJAMAS & CHEMISES DE NUIT ────────────────────────────
  {
    name: "Pyjama 3 pièces gilet en dentelle — vert d'eau",
    description:
      "Ensemble pyjama 3 pièces : caraco, gilet long en dentelle et pantalon assorti. Tissu doux et fluide pour un confort toute la nuit.",
    category: 'femme',
    subcategory: 'pyjamas',
    price: 249,
    discount: 0,
    images: ['/pyjama-3pieces-gilet-dentelle-vert.webp'],
    sizes: TAILLES_FEMME,
    colors: ["Vert d'eau"],
    featured: true,
    newArrival: true,
  },
  {
    name: 'Pyjama tunique en dentelle — écru',
    description:
      'Pyjama deux pièces avec tunique boutonnée en dentelle et pantalon fluide. Élégant et confortable.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 229,
    discount: 0,
    images: ['/pyjama-tunique-dentelle-ecru.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Écru'],
    featured: true,
  },
  {
    name: 'Pyjama satiné rayé manches longues — gris',
    description:
      'Pyjama satiné effet soie, chemise à manches longues et pantalon assorti. Coupe classique et chic.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 199,
    discount: 10,
    images: ['/pyjama-satin-raye-gris.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Gris'],
    newArrival: true,
  },
  {
    name: 'Ensemble gilet dentelle à ceinture — rose poudré',
    description:
      'Gilet long en dentelle à nouer à la taille porté sur caraco et pantalon assortis. Tout en finesse.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 249,
    discount: 0,
    images: ['/pyjama-gilet-dentelle-ceinture-rose.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Rose poudré'],
    featured: true,
  },
  {
    name: 'Pyjama boutonné manches courtes — fuchsia',
    description:
      'Pyjama deux pièces boutonné à manches courtes, finitions contrastées et poche poitrine. Tout en coton doux.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 179,
    discount: 0,
    images: ['/pyjama-boutonne-manches-courtes-fuchsia.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Fuchsia'],
    newArrival: true,
  },
  {
    name: 'Pyjama chemise + pantalon imprimé géométrique — écru',
    description:
      'Chemise unie manches longues associée à un pantalon imprimé géométrique. Ensemble cosy et tendance.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 199,
    discount: 0,
    images: ['/pyjama-chemise-geometrique-ecru.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Écru'],
  },
  {
    name: 'Pyjama t-shirt + pantalon imprimé — rose',
    description:
      'T-shirt manches courtes et pantalon imprimé assorti, matière souple et respirante.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 169,
    discount: 0,
    images: ['/pyjama-tshirt-imprime-rose.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Rose'],
  },
  {
    name: 'Pyjama t-shirt brodé fleurs — rose',
    description:
      'Pyjama t-shirt à broderies fleuries et manches volantées, pantalon imprimé assorti.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 169,
    discount: 0,
    images: ['/pyjama-tshirt-fleurs-rose.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Rose'],
    newArrival: true,
  },
  {
    name: 'Chemise de nuit longue manches résille — violet',
    description:
      'Chemise de nuit fluide mi-longue, manches en résille imprimée. Légère et féminine.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 189,
    discount: 0,
    images: ['/chemise-nuit-manches-resille-violet.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Violet'],
  },
  {
    name: 'Pyjama t-shirt imprimé fraises — écru',
    description:
      'Ensemble t-shirt imprimé fraises et pantalon assorti, finitions ondulées. Doux et estival.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 169,
    discount: 0,
    images: ['/pyjama-fraises-ecru.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Écru'],
    featured: true,
  },
  {
    name: "Pyjama côtelé boutonné manches courtes — vert d'eau",
    description:
      'Pyjama en maille côtelée, chemise boutonnée à manches volantées et pantalon assorti. Très confortable.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 179,
    discount: 0,
    images: ['/pyjama-cotele-boutonne-vert.webp'],
    sizes: TAILLES_FEMME,
    colors: ["Vert d'eau"],
    newArrival: true,
  },
  {
    name: 'Pyjama boutonné imprimé oursons — pêche',
    description:
      'Pyjama boutonné à manches courtes, imprimé oursons et finitions froncées. Tendre et douillet.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 179,
    discount: 0,
    images: ['/pyjama-oursons-peche.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Pêche'],
  },
  {
    name: 'Chemise de nuit côtelée à nœuds — noir',
    description:
      'Chemise de nuit en maille côtelée mi-longue, détails nœuds et col fendu. Sobre et élégante.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 159,
    discount: 0,
    images: ['/chemise-nuit-cotele-noeuds-noir.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
  },
  {
    name: 'Chemise de nuit imprimé Stitch — vert anis',
    description:
      'Chemise de nuit t-shirt longue, imprimé ludique. Coton léger pour des nuits décontractées.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 129,
    discount: 0,
    images: ['/chemise-nuit-stitch-vert.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Vert anis'],
  },
  {
    name: 'Pantalon de pyjama à carreaux — vert',
    description:
      'Pantalon de pyjama fluide à motif carreaux, taille élastiquée à cordon. À porter seul ou à assortir.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 99,
    discount: 0,
    images: ['/pantalon-pyjama-carreaux-vert.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Vert'],
  },
  {
    name: 'Chemise de nuit longue col en dentelle — vert sauge',
    description:
      'Chemise de nuit longue à manches longues, col et poignets froncés ornés de dentelle. Douce et couvrante.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 189,
    discount: 0,
    images: ['/chemise-nuit-col-dentelle-vert.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Vert sauge'],
    featured: true,
  },

  // ── FEMME · HOMEWEAR ──────────────────────────────────────────────
  {
    name: 'Homewear 3 pièces caraco + gilet — beige',
    description:
      'Ensemble homewear 3 pièces : caraco à fines bretelles, gilet long et pantalon ample. Texture brodée discrète.',
    category: 'femme',
    subcategory: 'homewear',
    price: 239,
    discount: 0,
    images: ['/homewear-3pieces-caraco-gilet-beige.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Beige'],
    featured: true,
    newArrival: true,
  },
  {
    name: 'Ensemble top fleuri + pantalon côtelé — rose',
    description:
      'Top manches courtes à imprimé floral coloré et pantalon côtelé rose. Look homewear gai et confortable.',
    category: 'femme',
    subcategory: 'homewear',
    price: 159,
    discount: 0,
    images: ['/homewear-top-fleuri-pantalon-cotele-rose.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Rose'],
  },
  {
    name: 'Ensemble t-shirt + corsaire imprimé jean — bleu',
    description:
      'T-shirt uni à manches volantées et corsaire à imprimé effet jean. Tenue d’intérieur décontractée.',
    category: 'femme',
    subcategory: 'homewear',
    price: 169,
    discount: 0,
    images: ['/homewear-tshirt-corsaire-jean-bleu.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Bleu'],
  },
  {
    name: 'Ensemble blouse imprimé coquillages — vert / écru',
    description:
      'Blouse fluide rayée à imprimé coquillages et pantalon large assorti. Style bohème et aéré.',
    category: 'femme',
    subcategory: 'homewear',
    price: 199,
    discount: 0,
    images: ['/homewear-blouse-coquillages-vert.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Vert', 'Écru'],
    newArrival: true,
  },
  {
    name: 'Ensemble côtelé à nœuds — beige',
    description:
      'Top et pantalon large en maille côtelée, détails nœuds contrastés. Confort et allure au quotidien.',
    category: 'femme',
    subcategory: 'homewear',
    price: 179,
    discount: 0,
    images: ['/homewear-cotele-noeuds-beige.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Beige'],
    featured: true,
  },
  {
    name: 'Ensemble tunique + legging épaules dentelle — blanc',
    description:
      'Tunique longue à empiècement dentelle sur les épaules et legging assorti. Idéal sous une tenue ou en intérieur.',
    category: 'femme',
    subcategory: 'homewear',
    price: 159,
    discount: 0,
    images: ['/ensemble-tunique-legging-blanc.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Blanc'],
  },
  {
    name: 'Legging court cycliste imprimé tropical — bleu marine',
    description:
      'Legging court longueur genou en maille extensible, imprimé floral tropical (feuilles de palmier et fleurs) sur fond bleu marine. Coupe ajustée et confortable pour l’intérieur ou le sport.',
    category: 'femme',
    subcategory: 'homewear',
    price: 99,
    discount: 0,
    images: ['/short-cycliste-tropical-floral-bleu.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Bleu marine'],
    newArrival: true,
  },

  // ── HOMME ─────────────────────────────────────────────────────────
  {
    name: 'Pyjama homme manches courtes à pois — noir',
    description:
      'Pyjama homme deux pièces : t-shirt à micro-pois colorés, finitions contrastées, et pantalon uni. Coton respirant.',
    category: 'homme',
    subcategory: 'pyjamas',
    price: 199,
    discount: 0,
    images: ['/pyjama-homme-pois-noir.webp'],
    sizes: TAILLES_HOMME,
    colors: ['Noir'],
    featured: true,
    newArrival: true,
  },

  // ── FEMME · MAILLOTS DE BAIN & BURKINI ────────────────────────────
  {
    name: 'Burkini 3 pièces manches fleuries — bleu marine',
    description:
      'Burkini couvrant : tunique à manches imprimées tropical, corsaire et bonnet assortis. Tissu de bain extensible et opaque.',
    category: 'femme',
    subcategory: 'maillots',
    price: 299,
    discount: 0,
    images: ['/burkini-manches-fleuries-marine.webp'],
    sizes: TAILLES_BURKINI,
    colors: ['Bleu marine'],
    featured: true,
    newArrival: true,
  },
  {
    name: 'Burkini à capuche intégrée — terracotta',
    description:
      'Burkini long uni avec capuche/cagoule intégrée, manches longues et legging. Couvrance totale, séchage rapide.',
    category: 'femme',
    subcategory: 'maillots',
    price: 299,
    discount: 0,
    images: ['/burkini-capuche-terracotta.webp'],
    sizes: TAILLES_BURKINI,
    colors: ['Terracotta'],
    featured: true,
  },
  {
    name: 'Burkini imprimé fleuri tropical — vert',
    description:
      'Burkini tunique à imprimé floral, legging et bonnet assortis. Coupe ample et modeste pour la baignade.',
    category: 'femme',
    subcategory: 'maillots',
    price: 299,
    discount: 0,
    images: ['/burkini-fleuri-tropical-vert.webp'],
    sizes: TAILLES_BURKINI,
    colors: ['Vert'],
    newArrival: true,
  },
  {
    name: 'Burkini tunique zippée + legging — vert',
    description:
      'Burkini sport : tunique cintrée à col montant et fermeture zippée, legging assorti. Maintien et liberté de mouvement.',
    category: 'femme',
    subcategory: 'maillots',
    price: 320,
    discount: 0,
    images: ['/burkini-zip-vert.webp'],
    sizes: TAILLES_BURKINI,
    colors: ['Vert'],
    featured: true,
  },
  {
    name: 'Burkini tunique + legging — gris',
    description:
      'Burkini tunique longue manches longues et legging assorti. Tissu de bain doux, couvrance complète.',
    category: 'femme',
    subcategory: 'maillots',
    price: 279,
    discount: 0,
    images: ['/burkini-tunique-legging-gris.webp'],
    sizes: TAILLES_BURKINI,
    colors: ['Gris'],
  },
  {
    name: 'Burkini sport rashguard imprimé tropical — bleu',
    description:
      'Ensemble de bain sport : top rashguard à manches imprimées et corsaire assorti. Idéal piscine et plage.',
    category: 'femme',
    subcategory: 'maillots',
    price: 299,
    discount: 0,
    images: ['/burkini-rashguard-tropical-bleu.webp'],
    sizes: TAILLES_BURKINI,
    colors: ['Bleu'],
    newArrival: true,
  },

  // ── FEMME · SOUS-VÊTEMENTS ────────────────────────────────────────
  {
    name: 'Ensemble lingerie satin rayé à nœud — bleu pétrole',
    description:
      'Ensemble lingerie 2 pièces en satin rayé ton sur ton : soutien-gorge push-up à armatures avec nœud satin, bord en dentelle festonnée et galon strass dorés, et culotte assortie. Élégant et confortable.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 149,
    discount: 0,
    images: ['/lingerie-satin-raye-bleu-petrole.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Bleu pétrole'],
    newArrival: true,
  },
  {
    name: 'Ensemble lingerie soutien-gorge + culotte — rouge',
    description:
      'Parure 2 pièces en rouge : soutien-gorge push-up à nœud satin et culotte assortie à nœud. Coupe galbante et confortable.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 149,
    discount: 0,
    images: ['/parure-sg-culotte-rouge.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Rouge'],
    featured: true,
    newArrival: true,
  },
  {
    name: 'Ensemble lingerie soutien-gorge + culotte — crème',
    description:
      'Parure 2 pièces en crème satiné : soutien-gorge push-up et culotte à finitions volantées. Douce et élégante.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 149,
    discount: 0,
    images: ['/parure-sg-culotte-creme.webp'],
    sizes: TAILLES_FEMME,
    colors: ['Crème'],
    newArrival: true,
  },

  // ── NOUVEAUTÉS (juin 2026) — images .jpeg TEMPORAIRES (logos d'origine)
  //    à remplacer par la photo on-model .webp (même slug) une fois générée.
  {
    name: 'Burkini 3 pièces imprimé floral — rouge & gris',
    description:
      'Burkini couvrant 3 pièces : tunique zippée à ceinture imprimée floral, legging et bonnet assortis. Tissu de bain extensible et opaque.',
    category: 'femme',
    subcategory: 'maillots',
    price: 299,
    discount: 0,
    images: ['/burkini-marelisa-floral-rouge.jpeg'],
    sizes: TAILLES_BURKINI,
    colors: ['Rouge', 'Gris'],
    featured: true,
    newArrival: true,
  },
  {
    name: 'Burkini long zippé manches longues — bleu marbré',
    description:
      'Burkini long à fermeture zippée et capuche, imprimé marbré bleu, porté sur legging de bain assorti. Couvrance totale.',
    category: 'femme',
    subcategory: 'maillots',
    price: 289,
    discount: 0,
    images: ['/burkini-dms-bleu-marbre.jpeg'],
    sizes: TAILLES_BURKINI,
    colors: ['Bleu'],
    newArrival: true,
  },
  {
    name: 'Burkini long zippé manches longues — marine imprimé',
    description:
      'Burkini long zippé à capuche, haut marine et bas imprimé contrasté, legging de bain assorti. Séchage rapide.',
    category: 'femme',
    subcategory: 'maillots',
    price: 289,
    discount: 0,
    images: ['/burkini-dms-marine-imprime.jpeg'],
    sizes: TAILLES_BURKINI,
    colors: ['Marine'],
    newArrival: true,
  },
  {
    name: 'Burkini long zippé manches longues — noir camouflage',
    description:
      'Burkini long zippé à capuche, noir à imprimé camouflage multicolore, legging de bain assorti. Couvrance complète.',
    category: 'femme',
    subcategory: 'maillots',
    price: 289,
    discount: 0,
    images: ['/burkini-dms-noir-camo.jpeg'],
    sizes: TAILLES_BURKINI,
    colors: ['Noir'],
    newArrival: true,
  },
  {
    name: 'Burkini long zippé manches longues — bordeaux & noir',
    description:
      'Burkini long zippé à capuche, bicolore bordeaux et noir, legging de bain assorti. Élégant et couvrant.',
    category: 'femme',
    subcategory: 'maillots',
    price: 289,
    discount: 0,
    images: ['/burkini-dms-bordeaux-noir.jpeg'],
    sizes: TAILLES_BURKINI,
    colors: ['Bordeaux', 'Noir'],
    newArrival: true,
  },
  {
    name: 'Ensemble loungewear imprimé tunique + pantalon — marine',
    description:
      'Ensemble détente : tunique manches longues et pantalon large assorti, imprimé coloré (fleurs, feuilles). Tissu doux et fluide.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 199,
    discount: 0,
    images: ['/loungewear-imprime-coord-marine.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Marine'],
    newArrival: true,
  },
  {
    name: 'Ensemble caraco dentelle + corsaire — noir',
    description:
      'Ensemble 2 pièces : caraco à empiècement dentelle dans le dos et corsaire assorti à inserts dentelle. Coupe confortable grande taille.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 169,
    discount: 0,
    images: ['/loungewear-caraco-dentelle-capri-noir.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
    newArrival: true,
  },
  {
    name: 'Peignoir éponge à capuche rayé — turquoise',
    description:
      'Peignoir en éponge à capuche, rayures turquoise et grises, ceinture à nouer et poches. Doux et absorbant.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 219,
    discount: 0,
    images: ['/peignoir-eponge-capuche-raye-turquoise.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Turquoise'],
  },
  {
    name: 'Peignoir éponge col châle — gris',
    description:
      'Peignoir en éponge moelleuse à col châle, ceinture à nouer et deux poches. Chaud et enveloppant.',
    category: 'femme',
    subcategory: 'pyjamas',
    price: 219,
    discount: 0,
    images: ['/peignoir-eponge-col-chale-gris.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Gris'],
  },
  {
    name: 'Soutien-gorge dentelle sans armatures — blanc',
    description:
      'Soutien-gorge sans armatures à bonnets en dentelle florale, bretelles réglables et petit nœud central. Maintien doux.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 99,
    discount: 0,
    images: ['/soutien-gorge-dentelle-blanc.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Blanc'],
  },
  {
    name: 'Brassière sans coutures — multicolore',
    description:
      'Brassière triangle sans coutures, fines bretelles réglables et bande souple. Plusieurs coloris disponibles.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 79,
    discount: 0,
    images: ['/brassiere-channo.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Beige', 'Blanc', 'Rose', 'Fuchsia', 'Turquoise', 'Pêche', 'Bleu jean', 'Noir'],
    newArrival: true,
  },
  {
    name: 'Gaine-short dentelle galbante — beige',
    description:
      'Gaine-short taille haute en tissu lisse galbant avec empiècements dentelle sur les côtés. Effet gainant discret.',
    category: 'femme',
    subcategory: 'sous-vetements',
    price: 129,
    discount: 0,
    images: ['/gaine-short-dentelle-beige.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Beige'],
  },
  {
    name: 'Ensemble brassière + cycliste sport — coloris assortis',
    description:
      'Ensemble 2 pièces : brassière de sport et short cycliste taille haute assorti. Maille extensible, plusieurs coloris.',
    category: 'femme',
    subcategory: 'homewear',
    price: 149,
    discount: 0,
    images: ['/ensemble-brassiere-cycliste-sport.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Rose', 'Beige', 'Mauve'],
    newArrival: true,
  },
  {
    name: 'Brassière de sport dos croisé — coloris assortis',
    description:
      'Brassière de sport coupe crop, dos croisé et large bande de maintien. Plusieurs coloris disponibles.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/brassiere-sport-dos-croise.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Gris', 'Noir', 'Fuchsia', 'Écru', 'Vert'],
  },
  {
    name: 'Legging capri dentelle — noir',
    description:
      'Legging court (capri) en coton doux, large ceinture confort et bord en dentelle. Coupe galbante.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/legging-capri-dentelle-noir.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
  },
  {
    name: 'Legging capri imprimé fleuri — marine',
    description:
      'Legging court (capri) marine à imprimé floral, ceinture confort élastiquée. Doux et extensible.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/legging-capri-fleuri-marine.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Marine'],
  },
  {
    name: 'Legging capri à bord dentelle — noir / blanc',
    description:
      'Legging court (capri) à large ceinture confort et bord en dentelle, disponible en noir et blanc.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/legging-capri-lina-3674.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Noir', 'Blanc'],
  },
  {
    name: 'Legging capri uni — beige / blanc / noir',
    description:
      'Legging court (capri) en maille douce, ceinture haute confort, disponible en beige, blanc et noir.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/legging-capri-lina-4564.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Beige', 'Blanc', 'Noir'],
  },
  {
    name: 'Legging capri homewear — noir',
    description:
      'Legging court (capri) homewear noir, large ceinture souple et bord en dentelle. Confort au quotidien.',
    category: 'femme',
    subcategory: 'homewear',
    price: 79,
    discount: 0,
    images: ['/legging-capri-lina-homewear-noir.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
  },
  {
    name: 'Legging long uni — noir',
    description:
      'Legging long en maille opaque lisse, ceinture haute confort. Basique indispensable.',
    category: 'femme',
    subcategory: 'homewear',
    price: 89,
    discount: 0,
    images: ['/legging-long-noir-7600.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Noir'],
  },
  {
    name: 'Ensemble thermique haut + legging — blanc / noir',
    description:
      'Ensemble sous-vêtement thermique : haut manches longues à col rond et legging assorti, disponible en blanc et noir. Chaud et léger.',
    category: 'femme',
    subcategory: 'homewear',
    price: 159,
    discount: 0,
    images: ['/ensemble-thermique-lina-5789.jpeg'],
    sizes: TAILLES_FEMME,
    colors: ['Blanc', 'Noir'],
  },
  {
    name: 'Ensemble t-shirt + short imprimé plage — marine',
    description:
      'Ensemble homme été : t-shirt manches courtes marine à col contrasté et short imprimé assorti. Coton léger.',
    category: 'homme',
    subcategory: 'homewear',
    price: 199,
    discount: 0,
    images: ['/ensemble-homme-tshirt-short-plage-marine.jpeg'],
    sizes: TAILLES_HOMME,
    colors: ['Marine'],
    newArrival: true,
  },
]

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté — seed en cours...')
  await Product.deleteMany({})
  for (const p of PRODUITS) {
    await Product.create(p) // create() déclenche le hook de slug
  }
  console.log(`${PRODUITS.length} produits insérés.`)
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
