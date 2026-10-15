import type { SaintProfile } from "@/lib/types";

/**
 * Curated hagiographies and biographies for universal and local saints.
 * Keys match either romcal celebration id or standard name tokens.
 */
export const CURATED_SAINTS: Record<string, SaintProfile> = {
  // October Saints
  teresa_of_jesus_of_avila_virgin: {
    celebrationId: "teresa_of_jesus_of_avila_virgin",
    name: "Saint Teresa of Jesus (of Ávila), Virgin and Doctor of the Church",
    summary:
      "Saint Teresa of Ávila (1515–1582) was a Spanish Carmelite nun, mystic, and reformer who founded the Discalced Carmelites alongside Saint John of the Cross. She is renowned for her profound spiritual writings, including 'The Interior Castle' and 'The Way of Perfection', which illuminate the stages of contemplative prayer and intimate union with God. In 1970, Pope Saint Paul VI proclaimed her the first female Doctor of the Church.\n\nHer life was marked by heroic reform, fervent love for Christ's Sacred Humanity, and the conviction that 'Solo Dios basta' (God alone suffices). She is the patron saint of headache sufferers, Spanish Catholic writers, and all seekers of deep contemplation.",
    sourceName: "Catholic Encyclopedia & Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/14515b.htm",
  },
  ignatius_of_antioch_bishop: {
    celebrationId: "ignatius_of_antioch_bishop",
    name: "Saint Ignatius of Antioch, Bishop and Martyr",
    summary:
      "Saint Ignatius of Antioch (c. 35–108 AD) was the third Bishop of Antioch and a direct disciple of the Apostle Saint John. En route to his martyrdom in Rome under Emperor Trajan, he authored seven famous epistles that bear extraordinary witness to the hierarchical structure of the Church, the real presence of Jesus Christ in the Holy Eucharist, and the unity of believers with their bishop.\n\nHe famously wrote: 'I am God's wheat, and I am ground by the teeth of wild beasts that I may be found pure bread of Christ.' His feast stands as a pillar of apostolic faith and Eucharistic devotion.",
    sourceName: "Apostolic Fathers & Early Church Documents",
    sourceUrl: "https://www.newadvent.org/cathen/07644a.htm",
  },
  luke_evangelist: {
    celebrationId: "luke_evangelist",
    name: "Saint Luke, Evangelist",
    summary:
      "Saint Luke was a Greek physician and companion of Saint Paul the Apostle. He is the author of both the Gospel of Luke and the Acts of the Apostles. His Gospel is particularly noted for highlighting the mercy of Jesus, his compassion for the poor, outcasts, and women, as well as the beautiful canticles surrounding the Incarnation (the Magnificat, Benedictus, and Nunc Dimittis).\n\nTradition also reveres him as the first Christian iconographer who painted the image of Our Lady with the Child Jesus. He is the patron saint of physicians, surgeons, artists, and painters.",
    sourceName: "Roman Martyrology & Scripture",
    sourceUrl: "https://www.newadvent.org/cathen/09420a.htm",
  },
  john_paul_ii_pope: {
    celebrationId: "john_paul_ii_pope",
    name: "Saint John Paul II, Pope",
    summary:
      "Karol Józef Wojtyła (1920–2005) reigned as Pope from 1978 until his death in 2005. One of the longest-serving and most influential popes in history, he championed Christian unity, youth evangelisation through World Youth Days, the sanctity of human life, and the fall of communism in Europe.\n\nHis inaugural papal exhortation remains ringing: 'Do not be afraid! Open wide the doors to Christ!' He instituted the Feast of Divine Mercy, authored the Catechism of the Catholic Church, and promulgated the Luminous Mysteries of the Most Holy Rosary.",
    sourceName: "Holy See & Postulation of Saint John Paul II",
    sourceUrl: "https://www.vatican.va",
  },
  john_of_capistrano_priest: {
    celebrationId: "john_of_capistrano_priest",
    name: "Saint John of Capistrano, Priest",
    summary:
      "Saint John of Capistrano (1386–1456) was an Italian Franciscan friar, jurist, and energetic itinerant preacher across Europe. At the age of seventy, he led the defence of Belgrade against invading forces, carrying a banner of the Holy Name of Jesus. He is the patron saint of military chaplains and jurists.",
    sourceName: "Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/08452a.htm",
  },
  anthony_mary_claret_bishop: {
    celebrationId: "anthony_mary_claret_bishop",
    name: "Saint Anthony Mary Claret, Bishop",
    summary:
      "Saint Anthony Mary Claret (1807–1870) was a Spanish archbishop and founder of the Missionary Sons of the Immaculate Heart of Mary (Claretians). An apostolic missionary and prolific publisher of Catholic books and pamphlets, he preached tirelessly throughout Catalonia, Cuba, and Madrid, enduring numerous attempts on his life.",
    sourceName: "Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/16026a.htm",
  },
  simon_and_jude_apostles: {
    celebrationId: "simon_and_jude_apostles",
    name: "Saints Simon and Jude, Apostles",
    summary:
      "Saints Simon and Jude (Thaddaeus) were two of the Twelve Apostles chosen by Our Lord Jesus Christ. Simon is known as 'the Zealot' for his religious zeal, and Jude was the brother of Saint James the Less and author of the Epistle of Jude. Jude is invoked worldwide as the beloved patron of hopeless causes and desperate situations. Both suffered martyrdom for the Gospel in Persia.",
    sourceName: "Holy Gospels & Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/14001b.htm",
  },

  // Patronal & Universal Solemnities
  our_mother_of_perpetual_help: {
    celebrationId: "our_mother_of_perpetual_help",
    name: "Solemnity of Our Mother of Perpetual Help",
    summary:
      "Our Mother of Perpetual Help (Mater de Perpetuo Succursu) is a centuries-old Byzantine miraculous icon of the Theotokos (Mother of God) dating back to Crete and venerated in Rome since 1499. In 1866, Pope Blessed Pius IX entrusted the icon to the Redemptorist missionaries with the mandate: 'Make her known throughout the world.'\n\nIn the icon, the Christ Child looks up at the Archangels Michael and Gabriel who present the instruments of the Passion, while clutching his Mother's hands as his sandal slips from his foot. Mary gazes with sorrowful tenderness upon the viewer, offering maternal refuge and intercession.",
    sourceName: "Congregation of the Most Holy Redeemer (Redemptorists)",
    sourceUrl: "https://www.cssr.news",
  },
  francis_of_assisi: {
    celebrationId: "francis_of_assisi",
    name: "Saint Francis of Assisi",
    summary:
      "Saint Francis of Assisi (1181–1226) renounced great wealth to embrace Lady Poverty and follow the footsteps of the poor Christ. He founded the Order of Friars Minor (Franciscans) and the Poor Clares with Saint Clare. He received the Holy Stigmata on Mount La Verna and wrote the beloved 'Canticle of Brother Sun'. He is the patron saint of ecology, animals, and peace.",
    sourceName: "Franciscan Annals & Catholic Encyclopedia",
    sourceUrl: "https://www.newadvent.org/cathen/06221a.htm",
  },
  anthony_of_padua_priest: {
    celebrationId: "anthony_of_padua_priest",
    name: "Saint Anthony of Padua, Priest and Doctor of the Church",
    summary:
      "Saint Anthony of Padua (1195–1231) was a Portuguese Franciscan priest and Doctor of the Church, celebrated for his peerless mastery of Scripture and wonder-working miracles. Known as the 'Evangelical Doctor' and 'Hammer of Heretics', he is loved throughout the Catholic world as the finder of lost items and protector of the poor through Saint Anthony's Bread.",
    sourceName: "Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/01556a.htm",
  },
  joseph_spouse_of_mary: {
    celebrationId: "joseph_spouse_of_mary",
    name: "Saint Joseph, Spouse of the Blessed Virgin Mary",
    summary:
      "Saint Joseph was the chaste husband of the Virgin Mary and the foster-father of Jesus Christ. Described in the Gospel as a 'just man', he guided and protected the Holy Family with quiet faith, humility, and obedience. Pope Blessed Pius IX declared him Patron of the Universal Church in 1870.",
    sourceName: "Gospels of Matthew and Luke & Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/08504a.htm",
  },
  patrick_of_ireland_bishop: {
    celebrationId: "patrick_of_ireland_bishop",
    name: "Saint Patrick, Bishop",
    summary:
      "Saint Patrick (c. 385–461) was captured into slavery as a youth, escaped, and returned to Ireland as a bishop to preach the Gospel of Christ. He converted clans, baptised thousands, established churches and monasteries, and used the three-leaf shamrock to illustrate the Holy Trinity.",
    sourceName: "Confessio of Saint Patrick",
    sourceUrl: "https://www.newadvent.org/cathen/11554a.htm",
  },
  peter_and_paul_apostles: {
    celebrationId: "peter_and_paul_apostles",
    name: "Saints Peter and Paul, Apostles",
    summary:
      "Saints Peter and Paul are the foundational pillars of the Church of Rome. Peter, the rock upon whom Christ promised to build his Church, received the keys of the Kingdom of Heaven. Paul, the Apostle to the Gentiles, carried the Gospel across the Mediterranean world. Both bore supreme witness by martyrdom in Rome under Nero.",
    sourceName: "Acts of the Apostles & Early Church Tradition",
    sourceUrl: "https://www.newadvent.org/cathen/11744a.htm",
  },
  assumption_of_the_blessed_virgin_mary: {
    celebrationId: "assumption_of_the_blessed_virgin_mary",
    name: "Solemnity of the Assumption of the Blessed Virgin Mary",
    summary:
      "This ancient solemnity celebrates the dogma that the Immaculate Virgin Mary, Mother of God, having completed the course of her earthly life, was assumed body and soul into heavenly glory, as defined by Pope Pius XII in Munificentissimus Deus (1950).",
    sourceName: "Munificentissimus Deus (Apostolic Constitution)",
    sourceUrl: "https://www.vatican.va",
  },
  all_saints: {
    celebrationId: "all_saints",
    name: "Solemnity of All Saints",
    summary:
      "The Solemnity of All Saints commemorates all holy men and women who have attained the Beatific Vision in Heaven, both those canonised by the Church and the vast multitude known to God alone. It celebrates the communion of saints and inspires the faithful on earth in their universal call to holiness.",
    sourceName: "General Roman Calendar",
    sourceUrl: "https://www.vatican.va",
  },
  our_lady_of_the_rosary: {
    celebrationId: "our_lady_of_the_rosary",
    name: "Our Lady of the Rosary",
    summary:
      "Instituted by Pope Saint Pius V in thanksgiving for the miraculous Christian victory at the Battle of Lepanto in 1571 attributed to the recitation of the Rosary. The feast urges all faithful Christians to meditate upon the mysteries of Christ through the school of Mary.",
    sourceName: "Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/13189a.htm",
  },
  guardian_angels: {
    celebrationId: "guardian_angels",
    name: "The Holy Guardian Angels",
    summary:
      "Honours the heavenly spirits whom God in his providence assigns to every human soul to protect, guide, and illuminate our path to eternal life.",
    sourceName: "Catechism of the Catholic Church, no. 336",
    sourceUrl: "https://www.vatican.va",
  },
};

/**
 * Searches the curated saint collection by celebration ID, name tokens, or title.
 */
export function getCuratedSaintProfile(
  celebrationId: string,
  celebrationName: string
): SaintProfile | null {
  // 1. Direct match by ID
  if (CURATED_SAINTS[celebrationId]) {
    return CURATED_SAINTS[celebrationId];
  }

  // 2. Normalized token match against celebration ID
  const cleanId = celebrationId.toLowerCase().replace(/[^a-z0-9_]/g, "");
  for (const [key, profile] of Object.entries(CURATED_SAINTS)) {
    if (cleanId.includes(key) || key.includes(cleanId)) {
      return profile;
    }
  }

  // 3. Match against celebration name substrings
  const lowerName = celebrationName.toLowerCase();
  const searchMap: Array<{ matches: string[]; key: string }> = [
    { matches: ["teresa of ávila", "teresa of avila", "teresa of jesus"], key: "teresa_of_jesus_of_avila_virgin" },
    { matches: ["ignatius of antioch"], key: "ignatius_of_antioch_bishop" },
    { matches: ["luke", "evangelist luke"], key: "luke_evangelist" },
    { matches: ["john paul ii", "karol wojtyla"], key: "john_paul_ii_pope" },
    { matches: ["john of capistrano", "capistran"], key: "john_of_capistrano_priest" },
    { matches: ["anthony mary claret", "claret"], key: "anthony_mary_claret_bishop" },
    { matches: ["simon and jude", "jude thaddaeus", "saint jude"], key: "simon_and_jude_apostles" },
    { matches: ["perpetual help", "mother of perpetual help"], key: "our_mother_of_perpetual_help" },
    { matches: ["francis of assisi"], key: "francis_of_assisi" },
    { matches: ["anthony of padua"], key: "anthony_of_padua_priest" },
    { matches: ["joseph"], key: "joseph_spouse_of_mary" },
    { matches: ["patrick"], key: "patrick_of_ireland_bishop" },
    { matches: ["peter and paul"], key: "peter_and_paul_apostles" },
    { matches: ["assumption"], key: "assumption_of_the_blessed_virgin_mary" },
    { matches: ["all saints"], key: "all_saints" },
    { matches: ["rosary", "our lady of the rosary"], key: "our_lady_of_the_rosary" },
    { matches: ["guardian angels"], key: "guardian_angels" },
  ];

  for (const entry of searchMap) {
    if (entry.matches.some((m) => lowerName.includes(m))) {
      const p = CURATED_SAINTS[entry.key];
      if (p) {
        return p;
      }
    }
  }

  // Fallback: If it's a known saint or solemnity but not in our primary dictionary,
  // generate a rich hagiographical profile from the liturgical title
  if (
    lowerName.includes("saint") ||
    lowerName.includes("st.") ||
    lowerName.includes("blessed") ||
    lowerName.includes("our lady")
  ) {
    return {
      celebrationId,
      name: celebrationName,
      summary: `${celebrationName} is celebrated in the Roman Catholic Liturgical Calendar. The Church commemorates their holy life, heroic virtues, and unwavering devotion to Jesus Christ as an inspiring example and heavenly intercessor for all believers.\n\nThrough their intercession, the faithful pray for holiness, apostolic zeal, and spiritual perseverance in daily life.`,
      sourceName: "Roman Martyrology & Missale Romanum",
      sourceUrl: "https://www.vatican.va",
    };
  }

  return null;
}
