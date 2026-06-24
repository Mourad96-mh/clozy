// =====================================================================
//  CATÉGORIES (statique) — les PRODUITS viennent de l'API backend.
//
//  Chaque catégorie / sous-catégorie porte ses métadonnées SEO :
//    seo.title       <title> (≤ 60 caractères)
//    seo.h1          titre H1 de la page (mot-clé principal)
//    seo.description meta description (≤ 155 caractères)
//    intro           paragraphe d'introduction (80–150 mots) — pages money
//    faq             questions/réponses (FAQPage JSON-LD)        — pages money
//
//  ⚠ Les `slug` de sous-catégorie servent aussi à filtrer les produits côté
//  backend (champ `subcategory`). Ne pas les renommer sans migrer les données.
// =====================================================================

export const CATEGORIES = [
  {
    slug: "femme",
    name: "Femme",
    seo: {
      title: "Pyjamas, lingerie & homewear femme | Vêtements Hiba",
      h1: "Vêtements femme",
      description:
        "Pyjamas, sous-vêtements, homewear et burkini pour femme. Confort et qualité, livraison partout au Maroc, paiement à la livraison.",
    },
    subcategories: [
      {
        slug: "pyjamas",
        name: "Pyjamas & robes de chambre",
        seo: {
          title: "Pyjama femme : ensembles & robes de chambre | Vêtements Hiba",
          h1: "Pyjamas femme",
          description:
            "Pyjama femme : ensembles coton, pyjamas d'hiver, shorts et robes de chambre. Doux et tendance, livraison partout au Maroc.",
        },
        intro:
          "Découvrez notre collection de pyjamas femme pensés pour le confort, nuit après nuit. Ensembles en coton respirant pour l'été, pyjamas chauds et molletonnés pour l'hiver, pyjashorts légers et élégantes robes de chambre : chaque modèle allie douceur, qualité et style. Que vous cherchiez un ensemble pyjama femme classique, un modèle boutonné ou une parure en satin, vous trouverez chez Vêtements Hiba de quoi vous sentir bien chez vous. Tous nos pyjamas pour femme sont disponibles en plusieurs tailles et coloris, livrés partout au Maroc avec paiement à la livraison.",
        faq: [
          {
            q: "Quelle matière choisir pour un pyjama femme ?",
            a: "Le coton est idéal toute l'année car il est respirant et doux ; pour l'hiver, privilégiez un pyjama molletonné ou en polaire, et pour l'été un modèle léger en coton ou en satin.",
          },
          {
            q: "Comment choisir la taille de mon pyjama ?",
            a: "Chaque fiche produit indique les tailles disponibles. En cas d'hésitation entre deux tailles, choisissez la plus grande pour un confort optimal.",
          },
          {
            q: "Livrez-vous partout au Maroc ?",
            a: "Oui, nous livrons dans toutes les villes du Maroc avec paiement à la livraison. La livraison est gratuite à partir de 300 DH.",
          },
        ],
      },
      {
        slug: "sous-vetements",
        name: "Sous-vêtements",
        seo: {
          title: "Sous-vêtement femme : lingerie & culottes | Vêtements Hiba",
          h1: "Sous-vêtements femme",
          description:
            "Sous-vêtement femme : lingerie, culottes, soutiens-gorge et caleçons. Confort et élégance, livraison partout au Maroc.",
        },
        intro:
          "Nos sous-vêtements femme conjuguent confort au quotidien et élégance discrète. Culottes, soutiens-gorge, ensembles de lingerie, caleçons et gaines : retrouvez tout ce qu'il faut pour se sentir bien au plus près du corps. Nous sélectionnons des matières douces qui respectent la peau et tiennent dans le temps. Du basique indispensable à la lingerie plus raffinée, chaque pièce est proposée en plusieurs tailles et coloris. Commandez vos sous-vêtements pour femme en quelques clics, avec livraison partout au Maroc et paiement à la livraison.",
        faq: [
          {
            q: "Comment connaître ma taille de soutien-gorge ?",
            a: "Mesurez votre tour de dessous de poitrine et votre tour de poitrine ; la fiche produit précise les correspondances de tailles pour chaque modèle.",
          },
          {
            q: "Vos sous-vêtements sont-ils en coton ?",
            a: "La plupart de nos modèles utilisent du coton doux ou des mélanges respirants ; la composition est indiquée sur chaque fiche produit.",
          },
          {
            q: "La livraison est-elle disponible partout au Maroc ?",
            a: "Oui, nous livrons dans tout le Maroc avec paiement à la livraison, gratuite dès 300 DH.",
          },
        ],
      },
      {
        slug: "homewear",
        name: "Homewear & survêtements",
        seo: {
          title: "Homewear femme : loungewear & intérieur | Vêtements Hiba",
          h1: "Homewear femme",
          description:
            "Homewear femme : loungewear et vêtements d'intérieur doux et chics pour la maison. Livraison partout au Maroc.",
        },
        intro:
          "Le homewear femme, c'est l'art d'être élégante chez soi sans rien sacrifier au confort. Notre collection de loungewear et de vêtements d'intérieur réunit ensembles caraco, gilets, blouses, pantalons et tenues coordonnées dans des matières douces. Parfaites pour télétravailler, recevoir ou simplement se détendre, ces pièces se portent aussi bien à la maison que pour une sortie décontractée. Découvrez des coupes flatteuses et des coloris tendance, disponibles en plusieurs tailles. Livraison partout au Maroc, paiement à la livraison.",
        faq: [
          {
            q: "Quelle différence entre homewear et pyjama ?",
            a: "Le homewear (ou loungewear) désigne des tenues d'intérieur confortables et habillées que l'on peut porter en journée, alors que le pyjama est pensé avant tout pour la nuit.",
          },
          {
            q: "Peut-on porter le homewear à l'extérieur ?",
            a: "Oui, beaucoup de nos ensembles homewear sont assez chics pour une sortie décontractée ou des courses rapides.",
          },
          {
            q: "Livrez-vous dans tout le Maroc ?",
            a: "Oui, livraison partout au Maroc avec paiement à la livraison, gratuite dès 300 DH.",
          },
        ],
      },
      {
        slug: "maillots",
        name: "Maillots de bain & burkini",
        seo: {
          title: "Burkini & maillot de bain femme | Vêtements Hiba",
          h1: "Maillots de bain & burkini femme",
          description:
            "Burkini et maillots de bain femme : modèles couvrants, élégants et confortables. Livraison partout au Maroc.",
        },
        intro:
          "Profitez de la plage et de la piscine en toute sérénité avec notre sélection de burkinis et maillots de bain femme. Modèles couvrants à manches longues, tuniques avec legging, rashguards et combinaisons : nos burkinis allient pudeur, style et liberté de mouvement. Les tissus à séchage rapide et résistants au chlore garantissent confort et tenue. Que vous cherchiez un burkini fleuri, uni ou à capuche, vous trouverez le modèle qui vous correspond, en plusieurs tailles et coloris. Livraison partout au Maroc, paiement à la livraison.",
        faq: [
          {
            q: "Qu'est-ce qu'un burkini ?",
            a: "Le burkini est un maillot de bain couvrant qui laisse seulement le visage, les mains et les pieds apparents, idéal pour se baigner tout en restant couverte.",
          },
          {
            q: "Quelle matière pour un burkini ?",
            a: "Nos burkinis sont en tissu technique à séchage rapide, résistant à l'eau et au chlore, pour un confort optimal à la plage comme à la piscine.",
          },
          {
            q: "Livrez-vous partout au Maroc ?",
            a: "Oui, nous livrons dans tout le Maroc avec paiement à la livraison.",
          },
        ],
      },
      {
        slug: "maternite",
        name: "Maternité",
        seo: {
          title: "Vêtement grossesse : pyjama & homewear | Vêtements Hiba",
          h1: "Maternité",
          description:
            "Vêtements de grossesse : pyjamas et homewear maternité confortables avant et après bébé. Livraison partout au Maroc.",
        },
        intro:
          "Vivez votre grossesse confortablement avec notre gamme de vêtements de maternité. Pyjamas d'allaitement, homewear de grossesse et tenues d'intérieur évolutives accompagnent chaque étape, avant et après l'arrivée de bébé. Nous privilégions des matières douces et extensibles qui s'adaptent aux changements du corps, avec des coupes pratiques pour l'allaitement. Confortables de jour comme de nuit, ces pièces sont proposées en plusieurs tailles. Offrez-vous le confort que vous méritez, avec une livraison partout au Maroc et le paiement à la livraison.",
        faq: [
          {
            q: "Vos vêtements de grossesse conviennent-ils à l'allaitement ?",
            a: "Plusieurs de nos modèles sont pensés pour faciliter l'allaitement ; la fiche produit le précise lorsque c'est le cas.",
          },
          {
            q: "Quelle taille choisir enceinte ?",
            a: "Nos matières extensibles s'adaptent à l'évolution du corps ; en cas de doute, prenez votre taille habituelle ou la taille au-dessus pour plus d'aisance.",
          },
          {
            q: "Livrez-vous partout au Maroc ?",
            a: "Oui, livraison dans tout le Maroc avec paiement à la livraison.",
          },
        ],
      },
    ],
  },
  {
    slug: "homme",
    name: "Homme",
    seo: {
      title: "Vêtements homme : pyjamas & sous-vêtements | Vêtements Hiba",
      h1: "Vêtements homme",
      description:
        "Pyjamas, peignoirs et sous-vêtements pour homme. Confort au quotidien, livraison partout au Maroc, paiement à la livraison.",
    },
    subcategories: [
      {
        slug: "pyjamas",
        name: "Pyjamas & peignoirs",
        seo: {
          title: "Pyjama homme & peignoir | Vêtements Hiba",
          h1: "Pyjamas homme",
          description:
            "Pyjama homme et peignoirs confortables, coton et matières douces. Livraison partout au Maroc, paiement à la livraison.",
        },
        intro:
          "Nos pyjamas homme allient confort et simplicité pour des nuits paisibles. Ensembles en coton doux, pyjamas chauds pour l'hiver et peignoirs en éponge moelleuse : chaque modèle est pensé pour bien dormir et se détendre à la maison. Coupes classiques, matières respirantes et coloris sobres composent une collection facile à vivre. Disponibles en plusieurs tailles, nos pyjamas et peignoirs pour homme se commandent en quelques clics, avec livraison partout au Maroc et paiement à la livraison.",
        faq: [
          {
            q: "Quelle matière pour un pyjama homme ?",
            a: "Le coton est idéal toute l'année ; pour l'hiver, optez pour un modèle molletonné ou un peignoir en éponge bien chaud.",
          },
          {
            q: "Comment choisir ma taille ?",
            a: "Chaque fiche produit indique les tailles disponibles ; en cas d'hésitation, choisissez la taille supérieure pour plus de confort.",
          },
          {
            q: "Livrez-vous partout au Maroc ?",
            a: "Oui, livraison dans tout le Maroc avec paiement à la livraison, gratuite dès 300 DH.",
          },
        ],
      },
      {
        slug: "sous-vetements",
        name: "Sous-vêtements",
        seo: {
          title: "Sous-vêtement homme : boxers & caleçons | Vêtements Hiba",
          h1: "Sous-vêtements homme",
          description:
            "Sous-vêtements homme : boxers, caleçons et tee-shirts confortables. Livraison partout au Maroc, paiement à la livraison.",
        },
      },
      {
        slug: "homewear",
        name: "Survêtements",
        seo: {
          title: "Homewear & survêtement homme | Vêtements Hiba",
          h1: "Survêtements homme",
          description:
            "Survêtements et homewear homme pour le confort à la maison. Livraison partout au Maroc, paiement à la livraison.",
        },
      },
    ],
  },
  {
    slug: "enfant",
    name: "Enfant",
    seo: {
      title: "Vêtements enfant : pyjamas fille & garçon | Vêtements Hiba",
      h1: "Vêtements enfant",
      description:
        "Pyjamas et vêtements confortables pour filles et garçons. Livraison partout au Maroc, paiement à la livraison.",
    },
    subcategories: [
      {
        slug: "fille",
        name: "Fille",
        seo: {
          title: "Pyjama & vêtements fille | Vêtements Hiba",
          h1: "Fille",
          description:
            "Pyjamas et vêtements confortables pour filles. Matières douces, livraison partout au Maroc, paiement à la livraison.",
        },
      },
      {
        slug: "garcon",
        name: "Garçon",
        seo: {
          title: "Pyjama & vêtements garçon | Vêtements Hiba",
          h1: "Garçon",
          description:
            "Pyjamas et vêtements confortables pour garçons. Matières douces, livraison partout au Maroc, paiement à la livraison.",
        },
      },
    ],
  },
];

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getSubcategory(catSlug, subSlug) {
  const cat = getCategory(catSlug);
  if (!cat || !subSlug) return undefined;
  return cat.subcategories.find((s) => s.slug === subSlug);
}
