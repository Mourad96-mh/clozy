import { Link, useLocation } from "react-router-dom";
import { SITE } from "../data/config";
import { localeFromPath, withLocale, t } from "../data/i18n";
import Seo from "../components/Seo";

// Page d'atterrissage "vente en gros / stock" (bilingue FR/AR) — cible les
// revendeurs qui cherchent à acheter un stock de vêtements en gros au Maroc.
// Les commandes en gros passent par le WhatsApp existant de la boutique.

const PATH = "/vente-en-gros";

// Mur de produits en fond du hero — évoque le "stock" / l'inventaire.
const COLLAGE = [
  "/pyjama-satin-raye-gris.webp", "/chemise-nuit-flora-rose-chine.webp",
  "/homewear-top-fleuri-pantalon-cotele-rose.webp", "/burkini-fleuri-tropical-vert.webp",
  "/parure-pushup-satin-rose.webp", "/pyjama-chemise-palmiers-ecru.webp",
  "/pyjama-oursons-peche.webp", "/chemise-nuit-coeurs.webp",
  "/pyjama-homme-pois-noir.webp", "/pyjama-fille-california-rose.webp",
  "/homewear-blouse-coquillages-vert.webp", "/legging-long-uni-beige.webp",
  "/pyjama-fraises-ecru.webp", "/parure-pushup-bleu-canard.webp",
  "/top-dentelle-epaules-manches-mocha.webp", "/ensemble-garcon-tshirt-short-gris.webp",
  "/chemise-nuit-paisley-blanc.webp", "/burkini-zip-vert.webp",
  "/pyjama-tshirt-fleurs-rose.webp", "/soutien-gorge-coton-armatures-blanc.webp",
];

// Tuiles illustrées : lien (neutre) + image ; libellés traduits via I18N.
const TILES = [
  { to: "/categorie/femme/pyjamas", img: "/pyjama-satin-raye-gris.webp" },
  { to: "/categorie/femme/sous-vetements", img: "/parure-pushup-satin-rose.webp" },
  { to: "/categorie/femme/homewear", img: "/homewear-top-fleuri-pantalon-cotele-rose.webp" },
  { to: "/categorie/femme/maillots", img: "/burkini-fleuri-tropical-vert.webp" },
  { to: "/categorie/homme", img: "/pyjama-homme-pois-noir.webp" },
  { to: "/categorie/enfant", img: "/pyjama-fille-california-rose.webp" },
];

const I18N = {
  fr: {
    title: "Vente en gros de vêtements au Maroc — pyjamas & lingerie",
    description:
      "Grossiste de pyjamas, lingerie, sous-vêtements & homewear au Maroc. Achetez votre stock de vêtements en gros à prix dégressifs, livré partout au Maroc. Commande sur WhatsApp.",
    crumbHome: "Accueil",
    crumbGros: "Vente en gros",
    eyebrow: "Grossiste · Revendeurs & boutiques",
    h1: "Vente en gros de vêtements au Maroc",
    heroLead: (
      <>
        Achetez votre <strong>stock de vêtements en gros</strong> chez Vêtements
        Hiba : pyjamas, lingerie, sous-vêtements, homewear et burkini à prix de
        gros. Que vous achetiez habituellement à <strong>Garage Allal</strong> ou
        à Derb Sultan, profitez des mêmes tarifs de gros — livrés chez vous
        partout au Maroc.
      </>
    ),
    ctaTop: "Demander les prix de gros sur WhatsApp",
    perks: ["🏷️ Prix de gros dégressifs", "🚚 Livraison dans tout le Maroc", "💵 Paiement à la livraison", "🔄 Stock renouvelé chaque semaine"],
    whatTitle: "Quels vêtements en gros ?",
    whatLead:
      "Nous fournissons aux revendeurs et aux boutiques des lots de vêtements confort pour toute la famille. Découvrez nos collections au détail pour vous faire une idée des modèles disponibles en gros :",
    tileLabels: ["Pyjamas en gros", "Sous-vêtements & lingerie en gros", "Homewear en gros", "Burkini & maillots en gros", "Vêtements homme en gros", "Vêtements enfant en gros"],
    whyTitle: "Pourquoi acheter votre stock chez Vêtements Hiba ?",
    whyLead: (
      <>
        Basés à Casablanca, nous proposons des <strong>prix de gros</strong> sur des
        pyjamas, de la lingerie et du homewear de qualité, avec un stock renouvelé en
        permanence. Idéal pour les revendeurs, les boutiques, les vendeuses en ligne
        et le <strong>déstockage</strong>. Plus besoin de vous déplacer à Garage Allal :
        nous expédions votre commande en gros dans toutes les villes du Maroc, avec
        paiement à la livraison.
      </>
    ),
    villesTitle: "Vente en gros livrée dans tout le Maroc",
    villesPrefix: "Nous livrons votre stock de vêtements en gros partout au Maroc, notamment à ",
    villesSuffix: " et dans toutes les autres villes.",
    villes: ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", "Meknès", "Oujda", "Kénitra", "Tétouan", "Salé", "Mohammedia", "El Jadida", "Béni Mellal", "Nador", "Safi"],
    faqTitle: "Questions fréquentes — achat en gros",
    faq: [
      { q: "Quel est le minimum de commande en gros ?", a: "Les quantités sont flexibles selon l'article. Contactez-nous sur WhatsApp et nous vous indiquons le minimum et les prix de gros pour le lot qui vous intéresse." },
      { q: "Quels articles sont disponibles en gros ?", a: "Pyjamas, chemises de nuit, sous-vêtements et lingerie, homewear, burkini, ainsi que des articles homme et enfant. Stock renouvelé régulièrement." },
      { q: "Livrez-vous dans tout le Maroc ?", a: "Oui. Nous livrons votre stock dans toutes les villes du Maroc (Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir…), avec paiement à la livraison possible." },
      { q: "Comment passer une commande en gros ?", a: "Écrivez-nous sur WhatsApp : nous vous envoyons le catalogue à jour et les prix de gros, puis nous organisons la livraison." },
    ],
    ctaFinal: "Commander un stock en gros sur WhatsApp",
    waMessage: "Bonjour, je suis revendeur(se) et je souhaite acheter un stock de vêtements en gros. Pouvez-vous m'envoyer le catalogue et les prix de gros ?",
  },
  ar: {
    title: "بيع الملابس بالجملة في المغرب — بيجامات ولانجري | Vêtements Hiba",
    description:
      "تاجر جملة للبيجامات واللانجري والملابس الداخلية والمنزلية في المغرب. اشترِ ستوكك من الملابس بالجملة بأسعار تنافسية مع التوصيل لكل المغرب. اطلب عبر واتساب.",
    crumbHome: "الرئيسية",
    crumbGros: "البيع بالجملة",
    eyebrow: "بيع بالجملة · للتجار والمحلات",
    h1: "بيع الملابس بالجملة في المغرب",
    heroLead: (
      <>
        اشترِ <strong>ستوكك من الملابس بالجملة</strong> لدى Vêtements Hiba: بيجامات،
        لانجري، ملابس داخلية، ملابس منزلية وبوركيني بأسعار الجملة. سواء كنت تشتري عادةً
        من <strong>كراج علال</strong> أو درب السلطان، استفد من نفس أسعار الجملة — مع
        التوصيل إلى عندك في كل المغرب.
      </>
    ),
    ctaTop: "اطلب أسعار الجملة عبر واتساب",
    perks: ["🏷️ أسعار جملة تنازلية", "🚚 توصيل لكل المغرب", "💵 الدفع عند الاستلام", "🔄 ستوك متجدد كل أسبوع"],
    whatTitle: "أي ملابس بالجملة؟",
    whatLead:
      "نزوّد التجار والمحلات بكميات من ملابس الراحة لكل أفراد العائلة. تصفّح مجموعاتنا بالتقسيط لتتعرف على الموديلات المتوفرة بالجملة:",
    tileLabels: ["بيجامات بالجملة", "ملابس داخلية ولانجري بالجملة", "ملابس منزلية بالجملة", "بوركيني وملابس سباحة بالجملة", "ملابس رجالية بالجملة", "ملابس أطفال بالجملة"],
    whyTitle: "لماذا تشتري ستوكك من Vêtements Hiba؟",
    whyLead: (
      <>
        مقرّنا في الدار البيضاء، ونوفّر <strong>أسعار جملة</strong> على بيجامات ولانجري
        وملابس منزلية عالية الجودة، مع ستوك متجدد باستمرار. مثالي للتجار والمحلات
        والبائعات عبر الإنترنت ولـ<strong>تصريف الستوك</strong>. لم تعد بحاجة للتنقل
        إلى كراج علال: نشحن طلبك بالجملة إلى جميع مدن المغرب، مع الدفع عند الاستلام.
      </>
    ),
    villesTitle: "بيع بالجملة مع توصيل لكل المغرب",
    villesPrefix: "نوصّل ستوكك من الملابس بالجملة لكل المغرب، خصوصاً إلى ",
    villesSuffix: " وجميع المدن الأخرى.",
    villes: ["الدار البيضاء", "الرباط", "مراكش", "فاس", "طنجة", "أكادير", "مكناس", "وجدة", "القنيطرة", "تطوان", "سلا", "المحمدية", "الجديدة", "بني ملال", "الناظور", "آسفي"],
    faqTitle: "أسئلة شائعة — الشراء بالجملة",
    faq: [
      { q: "ما هو الحد الأدنى للطلب بالجملة؟", a: "الكميات مرنة حسب المنتج. تواصل معنا عبر واتساب لنخبرك بالحد الأدنى وأسعار الجملة للّوط الذي يهمك." },
      { q: "ما هي المنتجات المتوفرة بالجملة؟", a: "بيجامات، قمصان نوم، ملابس داخلية ولانجري، ملابس منزلية، بوركيني، وكذلك ملابس رجالية وأطفال. ستوك متجدد باستمرار." },
      { q: "هل تُوصِّلون لكل المغرب؟", a: "نعم. نوصّل ستوكك لكل مدن المغرب (الدار البيضاء، الرباط، مراكش، فاس، طنجة، أكادير…)، مع إمكانية الدفع عند الاستلام." },
      { q: "كيف أطلب بالجملة؟", a: "راسلنا عبر واتساب: نرسل لك الكاتالوج المحدّث وأسعار الجملة، ثم ننظّم التوصيل." },
    ],
    ctaFinal: "اطلب ستوكاً بالجملة عبر واتساب",
    waMessage: "السلام عليكم، أنا تاجر/ة وأرغب في شراء ستوك من الملابس بالجملة. هل يمكن إرسال الكاتالوج وأسعار الجملة؟",
  },
};

export default function VenteEnGros() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const c = I18N[locale] || I18N.fr;
  const lp = (p) => withLocale(p, locale);
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(c.waMessage)}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.crumbHome, item: SITE.origin + withLocale("/", locale) },
      { "@type": "ListItem", position: 2, name: c.crumbGros, item: SITE.origin + withLocale(PATH, locale) },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Seo title={c.title} description={c.description} path={PATH} locale={locale} bilingual>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Seo>

      {/* Hero */}
      <section className="hero hero--gros">
        <div className="hero__collage" aria-hidden="true">
          {COLLAGE.map((img) => (
            <img key={img} src={img} alt="" loading="lazy" />
          ))}
        </div>
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">{c.eyebrow}</p>
            <h1>{c.h1}</h1>
            <p className="hero__sub">{c.heroLead}</p>
            <div className="hero__cta">
              <a className="btn btn--primary" href={waLink} target="_blank" rel="noreferrer">
                {c.ctaTop}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="perks container">
        {c.perks.map((p) => (
          <div className="perk" key={p}>{p}</div>
        ))}
      </section>

      {/* Ce qu'on propose */}
      <section className="container section">
        <h2 className="section__title">{c.whatTitle}</h2>
        <p className="muted">{c.whatLead}</p>
        <div className="gros-grid">
          {TILES.map((tile, i) => (
            <Link key={tile.to} to={lp(tile.to)} className="gros-tile">
              <img src={tile.img} alt={c.tileLabels[i]} loading="lazy" />
              <span className="gros-tile__label">{c.tileLabels[i]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="container section">
        <h2 className="section__title">{c.whyTitle}</h2>
        <p className="muted">{c.whyLead}</p>
      </section>

      {/* Villes desservies */}
      <section className="container section">
        <h2 className="section__title">{c.villesTitle}</h2>
        <p className="muted">{c.villesPrefix}{c.villes.join(locale === "ar" ? "، " : ", ")}{c.villesSuffix}</p>
      </section>

      {/* FAQ */}
      <section className="container section">
        <h2 className="section__title">{c.faqTitle}</h2>
        <div className="faq">
          {c.faq.map((f) => (
            <details className="faq__item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="container section">
        <div className="hero__cta">
          <a className="btn btn--primary" href={waLink} target="_blank" rel="noreferrer">
            {c.ctaFinal}
          </a>
        </div>
      </section>
    </>
  );
}
