import { MEDIA } from "@/lib/media";

export type ArtKind = "rose" | "rays" | "rosary";

/** A resolved image: from the built-in registry or from the admin media library. */
export interface SlideImage {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  title?: string;
  byline?: string;
  maxCssWidth?: number;
}

const img = (id: string): SlideImage => {
  const m = MEDIA[id];
  return { src: m.src, width: m.width, height: m.height, alt: m.alt, title: m.title, byline: m.byline, maxCssWidth: m.maxCssWidth };
};

export interface Slide {
  id: string;
  kind: "identity" | "inscription";
  latin?: string;
  english?: string;
  /** Attribution for the Latin text. */
  source?: string;
  /** Ornament drawn when no image is set */
  art?: ArtKind;
  /** Shown as a framed plate beside the text */
  image?: SlideImage;
  /** Full-width background behind the text, under a flat overlay. May be combined with `image`. */
  background?: SlideImage;
  cta?: { href: string; label: string };
}

/**
 * Default hero slides. Each Latin text is paired with an image that matches its meaning.
 * Administrators will be able to add, reorder and replace slides in the CMS; these are the defaults.
 */
export const SLIDES: Slide[] = [
  { id: "identity", kind: "identity" },
  {
    id: "ave-maria", kind: "inscription",
    latin: "Ave Maria, gratia plena", english: "Hail Mary, full of grace", source: "The Hail Mary",
    image: img("annunciation"), background: img("annunciation"),
    cta: { href: "/prayer-intentions", label: "Request a prayer" },
  },
  {
    id: "venite", kind: "inscription",
    latin: "Venite adoremus", english: "Come, let us adore", source: "Good Friday liturgy and Eucharistic hymn",
    background: img("crucifix"),
    cta: { href: "/mass-schedule", label: "View Mass schedule" },
  },
  {
    id: "regina-angelorum", kind: "inscription",
    latin: "Regina Angelorum, ora pro nobis", english: "Queen of Angels, pray for us", source: "Litany of Loreto",
    image: img("virgin-of-the-angels"), background: img("virgin-of-the-angels"),
    cta: { href: "/about", label: "About the Chaplaincy" },
  },
  {
    id: "misericordias", kind: "inscription",
    latin: "Misericordias Domini in aeternum cantabo", english: "The mercies of the Lord I will sing for ever", source: "Psalm 88:2 (Vulgate)",
    image: img("divine-mercy"), background: img("divine-mercy"),
    cta: { href: "/mass-intentions/offer", label: "Offer a Mass intention" },
  },
  {
    id: "tu-es-petrus", kind: "inscription",
    latin: "Tu es Petrus", english: "You are Peter, and upon this rock I will build my Church", source: "Matthew 16:18",
    background: img("st-peters-light"),
    cta: { href: "/ecclesiastical-communion", label: "In communion with the Church" },
  },
  {
    id: "claves", kind: "inscription",
    latin: "Tibi dabo claves regni caelorum", english: "I will give you the keys of the kingdom of heaven", source: "Matthew 16:19",
    image: img("peter-keys"), background: img("peter-keys"),
    cta: { href: "/leadership", label: "Our chaplaincy leadership" },
  },
  {
    id: "credo", kind: "inscription",
    latin: "Credo in unam, sanctam, catholicam et apostolicam Ecclesiam", english: "I believe in one, holy, catholic and apostolic Church", source: "Nicene Creed",
    background: img("cardinals-st-peters"),
    cta: { href: "/ecclesiastical-communion", label: "Our communion with Rome" },
  },
  {
    id: "sub-tuum", kind: "inscription",
    latin: "Sub tuum praesidium confugimus, sancta Dei Genetrix", english: "We fly to your patronage, O holy Mother of God", source: "Ancient Marian antiphon",
    image: img("sistine-madonna"), background: img("sistine-madonna"),
    cta: { href: "/contact", label: "Contact the Chaplaincy" },
  },
  {
    id: "tota-pulchra", kind: "inscription",
    latin: "Tota pulchra es, Maria", english: "You are all fair, O Mary", source: "Song of Songs 4:7, Marian antiphon",
    image: img("immaculate-conception"), background: img("immaculate-conception"),
    cta: { href: "/sacred-art", label: "Explore the sacred art" },
  },
  {
    id: "surrexit", kind: "inscription",
    latin: "Surrexit Dominus vere", english: "The Lord is risen indeed", source: "Luke 24:34",
    image: img("risen-christ-window"), background: img("risen-christ-window"),
    cta: { href: "/events", label: "See upcoming events" },
  },
  {
    id: "gloria", kind: "inscription",
    latin: "Gloria in excelsis Deo", english: "Glory to God in the highest", source: "Hymn of the Mass; Luke 2:14",
    background: img("church-interior"),
    cta: { href: "/announcements", label: "Read the announcements" },
  },
  {
    id: "lucerna", kind: "inscription",
    latin: "Lucerna pedibus meis verbum tuum", english: "Your word is a lamp to my feet", source: "Psalm 118:105 (Vulgate)",
    background: img("rosary-bible"),
    cta: { href: "/societies", label: "Join a society" },
  },
  {
    id: "christus-vincit", kind: "inscription",
    latin: "Christus vincit, Christus regnat, Christus imperat", english: "Christ conquers, Christ reigns, Christ commands", source: "Laudes Regiae",
    image: img("christ-king"), background: img("christ-king"),
    cta: { href: "/mass-schedule", label: "Join us at Mass" },
  },
];
