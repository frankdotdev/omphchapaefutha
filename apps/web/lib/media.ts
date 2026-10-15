/**
 * Registry of supplied images. Defaults used by the site until an administrator replaces them
 * through the media library (stored in the database; see database/migrations/0003).
 *
 * `rights`:
 *   "public-domain-art"  historic artwork whose copyright has expired
 *   "confirmed"          supplied by the chaplaincy; the chaplaincy has confirmed the right to use it
 *   "to-confirm"         rights not yet confirmed (use for any newly added image)
 * `maxCssWidth` is the widest size at which the file stays sharp: do not display wider than this.
 */
export interface MediaItem {
  id: string;
  src: string;
  width: number;
  height: number;
  /** Short caption shown to visitors */
  title: string;
  /** Artist or subject line shown with the caption */
  byline?: string;
  alt: string;
  rights: "public-domain-art" | "confirmed" | "to-confirm";
  maxCssWidth: number;
}

const art = (
  id: string,
  file: string,
  width: number,
  height: number,
  title: string,
  byline: string | undefined,
  alt: string,
  rights: MediaItem["rights"],
): MediaItem => ({ id, src: `/images/art/${file}`, width, height, title, byline, alt, rights, maxCssWidth: width });

export const MEDIA: Record<string, MediaItem> = {
  annunciation: art("annunciation", "annunciation.jpg", 246, 138, "The Annunciation", "Fra Angelico", "The angel Gabriel greets the Virgin Mary in a fresco of the Annunciation", "public-domain-art"),
  "sistine-madonna": art("sistine-madonna", "sistine-madonna.jpg", 192, 263, "The Sistine Madonna", "Raphael", "The Virgin and Child between Saint Sixtus and Saint Barbara, with two cherubs below", "public-domain-art"),
  "immaculate-conception": art("immaculate-conception", "immaculate-conception.jpg", 199, 254, "The Immaculate Conception", "after Murillo", "The Virgin Mary standing on a crescent moon, surrounded by cherubs", "public-domain-art"),
  "risen-christ-window": art("risen-christ-window", "risen-christ-window.jpg", 183, 275, "The Risen Christ", "Stained-glass window", "A stained-glass window of the risen Christ holding a banner of victory", "confirmed"),
  "divine-mercy": art("divine-mercy", "divine-mercy.jpg", 410, 748, "Divine Mercy", "Jesus, I trust in You", "Image of Divine Mercy: Christ with rays of red and pale light from His heart", "public-domain-art"),
  "church-interior": art("church-interior", "church-interior.jpg", 512, 385, "A Catholic church at Christmas", undefined, "Interior of a Catholic church decorated for Christmas, with the faithful gathered", "confirmed"),
  "rosary-bible": art("rosary-bible", "rosary-bible.jpg", 671, 298, "Rosary on an open Bible", undefined, "A wooden rosary lying on an open Bible at the Psalms", "confirmed"),
  "virgin-of-the-angels": art("virgin-of-the-angels", "virgin-of-the-angels.jpg", 402, 497, "The Virgin of the Angels", "Bouguereau", "The Virgin Mary enthroned with the Child Jesus, surrounded by adoring angels", "public-domain-art"),
  crucifix: art("crucifix", "crucifix.jpg", 738, 387, "The Crucifix", undefined, "A crucifix against a dark, stormy sky", "confirmed"),
  "cardinals-st-peters": art("cardinals-st-peters", "cardinals-st-peters.jpg", 688, 445, "Mass in Saint Peter's Basilica", undefined, "Cardinals in red vestments gathered for Mass beneath the baldachin in Saint Peter's Basilica", "confirmed"),
  "peter-keys": art("peter-keys", "peter-keys.jpg", 250, 329, "Saint Peter with the keys", "Peter Paul Rubens", "Saint Peter in white vestments looking upward, holding the keys of the kingdom of heaven", "public-domain-art"),
  "christ-king": art("christ-king", "christ-king.jpg", 303, 400, "Christ the King", undefined, "Christ crowned as King, holding a sceptre and raising his hand in blessing, his Sacred Heart encircled by thorns", "confirmed"),
  "st-peters-light": { id: "st-peters-light", src: "/images/art/st-peters-light.jpg", width: 1600, height: 2576, title: "Light in Saint Peter's Basilica", alt: "Shafts of light entering Saint Peter's Basilica beneath a gilded coffered vault", rights: "confirmed", maxCssWidth: 1600 },
};

/** Portraits supplied by the chaplaincy, keyed by ecclesiastical office. Matched by the order supplied. */
export const PORTRAITS: Record<string, { src: string; rights: MediaItem["rights"] }> = {
  "supreme-pontiff": { src: "/images/portraits/portrait-pope-sq.jpg", rights: "confirmed" },
  "apostolic-nuncio": { src: "/images/portraits/portrait-nuncio-sq.jpg", rights: "confirmed" },
  "metropolitan-archbishop": { src: "/images/portraits/portrait-metropolitan-sq.jpg", rights: "confirmed" },
  "diocesan-ordinary": { src: "/images/portraits/portrait-administrator-sq.jpg", rights: "confirmed" },
};

export const media = (id: string): MediaItem => {
  const m = MEDIA[id];
  if (!m) throw new Error(`Unknown media id: ${id}`);
  return m;
};
