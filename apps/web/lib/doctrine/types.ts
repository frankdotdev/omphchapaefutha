export type DoctrineSource =
  | { type: "ccc"; ref: string }
  | { type: "scripture"; ref: string }
  | { type: "document"; title: string; ref?: string; year?: string }
  | { type: "canon"; ref: string };

export interface DoctrineEntry {
  id: string;
  category: string;
  question: string;
  /** Plain text, our own wording. Paragraphs separated by a blank line. */
  answer: string;
  sources: DoctrineSource[];
  keywords: string[];
  level: "basic" | "intermediate" | "advanced";
}

export interface DoctrineCategory { slug: string; title: string; blurb: string }

export const DOCTRINE_CATEGORIES: DoctrineCategory[] = [
  { slug: "god-trinity-creation", title: "God, the Trinity and Creation", blurb: "Who God is, the Holy Trinity, creation, angels, and the fall." },
  { slug: "jesus-christ", title: "Jesus Christ", blurb: "The Incarnation, the Cross, the Resurrection and the titles of Christ." },
  { slug: "church-and-hierarchy", title: "The Church, the Pope and the Bishops", blurb: "What the Church is, her marks, her structure, and the Holy Spirit." },
  { slug: "mary-and-saints", title: "Mary and the Saints", blurb: "Our Lady, the saints, intercession, images and relics." },
  { slug: "sacraments-initiation-healing", title: "Baptism, Confirmation, Eucharist, Confession and Anointing", blurb: "The sacraments of initiation and healing." },
  { slug: "sacraments-service-and-liturgy", title: "Holy Orders, Marriage and the Liturgy", blurb: "The sacraments of service, the Mass and the Church's year." },
  { slug: "scripture-and-tradition", title: "Scripture, Tradition and Faith", blurb: "The Bible, Sacred Tradition, revelation, faith and reason." },
  { slug: "moral-life", title: "Moral Life and the Commandments", blurb: "Conscience, virtue, sin, the Ten Commandments and Catholic social teaching." },
  { slug: "prayer-and-spiritual-life", title: "Prayer and Spiritual Life", blurb: "How to pray, devotions, discernment, vocation and daily practice." },
  { slug: "last-things-and-apologetics", title: "Last Things and Common Questions", blurb: "Death, judgment, heaven, hell, purgatory, and answers to common objections." },
];
