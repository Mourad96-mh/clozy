// =====================================================================
//  i18n — bilingue Français (défaut) / Arabe (RTL).
//  L'arabe est servi sous le préfixe d'URL "/ar". Le français reste à la racine.
//  Les pages produits restent en français (données backend FR) ; seules les
//  pages "vitrine" (accueil, catégories, vente en gros) sont bilingues.
// =====================================================================

export const DEFAULT_LOCALE = "fr";

// Déduit la langue depuis le chemin ("/ar", "/ar/…" => arabe).
export function localeFromPath(pathname) {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "fr";
}

// Chemin "neutre" sans le préfixe de langue (ex: "/ar/categorie/femme" => "/categorie/femme").
export function stripLocale(pathname) {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3);
  return pathname || "/";
}

// Ajoute le préfixe de langue à un chemin neutre.
export function withLocale(basePath, locale) {
  if (locale !== "ar") return basePath;
  return basePath === "/" ? "/ar" : "/ar" + basePath;
}

export const dirFor = (locale) => (locale === "ar" ? "rtl" : "ltr");
export const htmlLangFor = (locale) => (locale === "ar" ? "ar" : "fr");
export const ogLocaleFor = (locale) => (locale === "ar" ? "ar_MA" : "fr_MA");

// ── Chaînes d'interface + pages vitrine ──────────────────────────────
export const STRINGS = {
  fr: {
    switchTo: "العربية",
    venteEnGros: "Vente en gros",
    nav: { femme: "Femme", homme: "Homme", enfant: "Enfant" },
    perks: [
      "🚚 Livraison partout au Maroc",
      "💵 Paiement à la livraison",
      "🔄 Échange facile",
      "⭐ Qualité garantie",
    ],
    home: {
      title: "Vêtements Hiba — Pyjamas & homewear au Maroc",
      description:
        "Vêtements Hiba : pyjamas, sous-vêtements, homewear et burkini pour femme, homme et enfant. Livraison partout au Maroc, paiement à la livraison.",
      eyebrow: "Le confort, jour et nuit — pyjamas, sous-vêtements & homewear",
      h1: "Pyjamas, sous-vêtements & homewear pour femme au Maroc",
      sub: "Pyjamas, sous-vêtements et homewear pour toute la famille. Livraison partout au Maroc, paiement à la livraison.",
      categories: "Nos catégories",
      newArrivals: "Nouveautés",
      selection: "Notre sélection",
      loading: "Chargement…",
      soon: "Bientôt disponible.",
      intro: {
        title: "Vêtements Hiba, votre boutique de pyjama & homewear au Maroc",
        body: "Vêtements Hiba est une boutique en ligne marocaine spécialisée dans le pyjama femme, les sous-vêtements, le homewear, les maillots de bain et burkini ainsi que la maternité — pour femme, homme et enfant. Basés à Casablanca, nous sélectionnons des matières douces et de qualité (coton respirant, satin, molleton d'hiver, dentelle) pour vous offrir confort et élégance, de jour comme de nuit. Profitez d'une livraison partout au Maroc avec paiement à la livraison, et commandez en toute simplicité sur WhatsApp. Nos collections sont renouvelées régulièrement, à prix doux, et pensées pour toute la famille.",
      },
      universTitle: "Nos univers",
      univers: [
        { label: "Pyjamas femme", desc: "Ensembles en coton, pyjashorts et pyjamas d'hiver doux et chauds.", to: "/categorie/femme/pyjamas" },
        { label: "Sous-vêtements femme", desc: "Lingerie, culottes et soutiens-gorge confortables au quotidien.", to: "/categorie/femme/sous-vetements" },
        { label: "Homewear femme", desc: "Loungewear et tenues d'intérieur élégantes pour la maison.", to: "/categorie/femme/homewear" },
        { label: "Burkini & maillots", desc: "Maillots de bain et burkinis couvrants pour la plage et la piscine.", to: "/categorie/femme/maillots" },
        { label: "Maternité", desc: "Pyjamas et homewear de grossesse, avant et après bébé.", to: "/categorie/femme/maternite" },
        { label: "Pyjamas homme", desc: "Pyjamas et peignoirs confortables et faciles à vivre.", to: "/categorie/homme/pyjamas" },
        { label: "Vêtements enfant", desc: "Pyjamas tout doux pour filles et garçons.", to: "/categorie/enfant" },
        { label: "Vente en gros", desc: "Prix de gros pour revendeurs et boutiques, livrés partout au Maroc.", to: "/vente-en-gros" },
      ],
      whyTitle: "Pourquoi choisir Vêtements Hiba ?",
      why: [
        { t: "Livraison partout au Maroc", d: "Nous livrons dans toutes les villes du Maroc ; livraison gratuite dès 300 DH." },
        { t: "Paiement à la livraison", d: "Payez en espèces à la réception de votre colis, en toute confiance." },
        { t: "Qualité & confort", d: "Des matières douces, sélectionnées avec soin pour durer dans le temps." },
        { t: "Commande facile sur WhatsApp", d: "Une question ? Commandez et échangez directement avec nous sur WhatsApp." },
      ],
      faqTitle: "Questions fréquentes",
      faq: [
        { q: "Livrez-vous partout au Maroc ?", a: "Oui, nous livrons dans toutes les villes du Maroc avec paiement à la livraison. La livraison est gratuite à partir de 300 DH." },
        { q: "Comment passer commande ?", a: "Ajoutez vos articles au panier et validez, ou commandez directement sur WhatsApp : nous confirmons votre commande et la livraison." },
        { q: "Quel moyen de paiement acceptez-vous ?", a: "Le paiement se fait à la livraison, en espèces, au moment de la réception de votre colis." },
        { q: "Comment choisir ma taille ?", a: "Chaque fiche produit indique les tailles disponibles ; en cas de doute, choisissez la taille au-dessus pour plus de confort." },
        { q: "Proposez-vous la vente en gros ?", a: "Oui, nous proposons des prix de gros pour les revendeurs et les boutiques. Consultez notre page Vente en gros." },
      ],
      outro: "Que vous cherchiez un pyjama femme en coton, un ensemble homewear tendance, des sous-vêtements confortables, un burkini élégant ou un pyjama pour homme ou enfant, Vêtements Hiba vous accompagne partout au Maroc — Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir et bien plus. Confort, qualité et livraison à domicile avec paiement à la livraison.",
    },
    footer: {
      categories: "Catégories",
      help: "Aide",
      contact: "Contact",
      delivery: "Livraison & retours",
      sizes: "Guide des tailles",
      contactUs: "Nous contacter",
      orderWhatsapp: "Commander sur WhatsApp",
      rights: "Tous droits réservés.",
    },
    cat: {
      home: "Accueil",
      all: "Tout",
      faq: "Questions fréquentes",
      empty: "Aucun produit dans cette catégorie pour le moment.",
      notFound: "Catégorie introuvable",
      back: "Retour à l'accueil",
    },
  },
  ar: {
    switchTo: "Français",
    venteEnGros: "البيع بالجملة",
    nav: { femme: "نساء", homme: "رجال", enfant: "أطفال" },
    perks: [
      "🚚 توصيل لكل المغرب",
      "💵 الدفع عند الاستلام",
      "🔄 تبديل سهل",
      "⭐ جودة مضمونة",
    ],
    home: {
      title: "Vêtements Hiba — بيجامات وملابس منزلية في المغرب",
      description:
        "Vêtements Hiba: بيجامات وملابس داخلية وملابس منزلية وبوركيني للمرأة والرجل والطفل. توصيل لكل مدن المغرب، الدفع عند الاستلام.",
      eyebrow: "الراحة ليلاً ونهاراً — بيجامات وملابس داخلية وملابس منزلية",
      h1: "بيجامات وملابس داخلية وملابس منزلية للمرأة في المغرب",
      sub: "بيجامات وملابس داخلية وملابس منزلية لكل أفراد العائلة. توصيل إلى جميع مدن المغرب، والدفع عند الاستلام.",
      categories: "تصنيفاتنا",
      newArrivals: "وصل حديثاً",
      selection: "مختاراتنا",
      loading: "جارٍ التحميل…",
      soon: "متوفر قريباً.",
      intro: {
        title: "Vêtements Hiba، متجرك للبيجامات والملابس المنزلية في المغرب",
        body: "Vêtements Hiba متجر إلكتروني مغربي متخصص في البيجامات النسائية والملابس الداخلية والملابس المنزلية وملابس السباحة والبوركيني وملابس الحمل — للمرأة والرجل والطفل. مقرّنا في الدار البيضاء، ونختار خامات ناعمة وعالية الجودة (قطن منفّس، ساتان، أقمشة شتوية دافئة، ودانتيل) لنمنحك الراحة والأناقة ليلاً ونهاراً. استفد من التوصيل لكل المغرب مع الدفع عند الاستلام، واطلب بكل بساطة عبر واتساب. مجموعاتنا تتجدّد باستمرار، بأسعار في المتناول، ومصمّمة لكل أفراد العائلة.",
      },
      universTitle: "أقسامنا",
      univers: [
        { label: "بيجامات نسائية", desc: "أطقم قطنية، بيجامات شورت وبيجامات شتوية ناعمة ودافئة.", to: "/categorie/femme/pyjamas" },
        { label: "ملابس داخلية نسائية", desc: "لانجري وسراويل داخلية وحمالات صدر مريحة كل يوم.", to: "/categorie/femme/sous-vetements" },
        { label: "ملابس منزلية نسائية", desc: "لاونجوير وإطلالات بيت أنيقة ومريحة.", to: "/categorie/femme/homewear" },
        { label: "بوركيني وملابس سباحة", desc: "ملابس سباحة وبوركيني ساتر للشاطئ والمسبح.", to: "/categorie/femme/maillots" },
        { label: "ملابس الحمل", desc: "بيجامات وملابس منزلية للحمل، قبل الولادة وبعدها.", to: "/categorie/femme/maternite" },
        { label: "بيجامات رجالية", desc: "بيجامات وأرواب مريحة وعملية.", to: "/categorie/homme/pyjamas" },
        { label: "ملابس أطفال", desc: "بيجامات ناعمة جداً للبنات والأولاد.", to: "/categorie/enfant" },
        { label: "البيع بالجملة", desc: "أسعار جملة للتجار والمحلات، مع توصيل لكل المغرب.", to: "/vente-en-gros" },
      ],
      whyTitle: "لماذا تختار Vêtements Hiba؟",
      why: [
        { t: "توصيل لكل المغرب", d: "نوصّل لجميع مدن المغرب؛ والتوصيل مجاني ابتداءً من 300 درهم." },
        { t: "الدفع عند الاستلام", d: "ادفع نقداً عند استلام طلبك، بكل ثقة." },
        { t: "جودة وراحة", d: "خامات ناعمة مختارة بعناية لتدوم طويلاً." },
        { t: "طلب سهل عبر واتساب", d: "عندك سؤال؟ اطلب وتحدّث معنا مباشرة عبر واتساب." },
      ],
      faqTitle: "أسئلة شائعة",
      faq: [
        { q: "هل تُوصِّلون لكل المغرب؟", a: "نعم، نوصّل لجميع مدن المغرب مع الدفع عند الاستلام. التوصيل مجاني ابتداءً من 300 درهم." },
        { q: "كيف أطلب؟", a: "أضف المنتجات إلى السلة وأكمل الطلب، أو اطلب مباشرة عبر واتساب: نؤكّد طلبك والتوصيل." },
        { q: "ما هي وسيلة الدفع المتاحة؟", a: "الدفع يتم عند الاستلام، نقداً، لحظة استلام الطلب." },
        { q: "كيف أختار مقاسي؟", a: "تُوضّح كل صفحة منتج المقاسات المتوفرة؛ عند الشك اختر المقاس الأكبر لمزيد من الراحة." },
        { q: "هل توفّرون البيع بالجملة؟", a: "نعم، نوفّر أسعار جملة للتجار والمحلات. اطّلع على صفحة البيع بالجملة." },
      ],
      outro: "سواء كنت تبحث عن بيجاما نسائية قطنية، أو طقم ملابس منزلية عصري، أو ملابس داخلية مريحة، أو بوركيني أنيق، أو بيجاما للرجل أو الطفل، يرافقك Vêtements Hiba في كل المغرب — الدار البيضاء، الرباط، مراكش، فاس، طنجة، أكادير وغيرها. راحة وجودة وتوصيل إلى البيت مع الدفع عند الاستلام.",
    },
    footer: {
      categories: "التصنيفات",
      help: "المساعدة",
      contact: "اتصل بنا",
      delivery: "التوصيل والإرجاع",
      sizes: "دليل المقاسات",
      contactUs: "تواصل معنا",
      orderWhatsapp: "اطلب عبر واتساب",
      rights: "جميع الحقوق محفوظة.",
    },
    cat: {
      home: "الرئيسية",
      all: "الكل",
      faq: "أسئلة شائعة",
      empty: "لا توجد منتجات في هذا التصنيف حالياً.",
      notFound: "التصنيف غير موجود",
      back: "العودة إلى الرئيسية",
    },
  },
};

export const t = (locale) => STRINGS[locale] || STRINGS.fr;
