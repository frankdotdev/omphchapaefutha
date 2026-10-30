import type { SaintProfile } from "@/lib/types";

/**
 * Curated hagiographies and biographies for universal and local saints.
 * Keys match either romcal celebration id or standard name tokens.
 */
export const CURATED_SAINTS: Record<string, SaintProfile> = {
  // Chaplaincy Patron & Heritage
  our_mother_of_perpetual_help: {
    celebrationId: "our_mother_of_perpetual_help",
    name: "Solemnity of Our Mother of Perpetual Help",
    summary:
      "Our Mother of Perpetual Help (Sancta Maria de Perpetuo Succursu) is a miraculous Byzantine icon of the Mother of God, venerated in Rome since 1499 and entrusted by Pope Blessed Pius IX in 1866 to the Redemptorists with the mission: 'Make her known throughout the world.'\n\nIn the sacred icon, the Child Jesus clutches His Mother's hand as He gazes upon the Archangels Michael and Gabriel holding the instruments of the Passion, his sandal falling loose. Mary's eyes look tenderly toward us, extending maternal refuge, perpetual help, and consolation to patients, doctors, nurses, and all who suffer in body or soul.",
    sourceName: "Redemptorist Historical Archives & Congregation of the Most Holy Redeemer",
    sourceUrl: "https://www.cssr.news",
  },
  padre_pio: {
    celebrationId: "pio_of_pietrelcina_priest",
    name: "Saint Pio of Pietrelcina (Padre Pio), Priest",
    summary:
      "Saint Pio of Pietrelcina (1887–1968), affectionately known as Padre Pio, was an Italian Capuchin Franciscan priest blessed with extraordinary spiritual charisms, including the Holy Stigmata of Christ, healing miracles, and reading souls in the confessional. He founded the 'Casa Sollievo della Sofferenza' (Home for the Relief of the Suffering), one of Europe's largest research and clinical hospitals.\n\nHe famously counselled: 'Pray, hope, and don't worry. Worry is useless. God is merciful and will hear your prayer.' The chaplaincy bears deep historical roots under his intercession.",
    sourceName: "Sanctuary of Saint Pio & Roman Martyrology",
    sourceUrl: "https://www.vatican.va",
  },
  cyprian_michael_iwene_tansi: {
    celebrationId: "cyprian_michael_iwene_tansi",
    name: "Blessed Cyprian Michael Iwene Tansi, Priest",
    summary:
      "Blessed Cyprian Michael Iwene Tansi (1903–1964) was a Nigerian diocesan priest of the Archdiocese of Onitsha who later embraced the rigorous contemplative life of a Trappist monk at Mount Saint Bernard Abbey in England. A heroic evangeliser of Eastern Nigeria, he travelled on foot and bicycle from village to village, catechising, fostering vocations, and defending the dignity of women and Christian marriage.\n\nPope Saint John Paul II beatified him in Oba, Onitsha, Nigeria, on 22 March 1998, holding him up as an exemplar of priestly self-giving and holiness.",
    sourceName: "Catholic Bishops' Conference of Nigeria & Holy See",
    sourceUrl: "https://www.vatican.va",
  },
  charles_lwanga_and_companions: {
    celebrationId: "charles_lwanga_and_companions_martyrs",
    name: "Saint Charles Lwanga and Companions, Martyrs of Uganda",
    summary:
      "Saint Charles Lwanga and his twenty-one youthful companions were young African catechumens and pages in the royal court of Buganda who were martyred between 1885 and 1887 under King Mwanga II for refusing to renounce Christ or commit immoral acts. They went to the pyre at Namugongo singing hymns of praise to Almighty God. Canonised in 1964, Saint Charles is the patron of African Catholic youth and Catholic Action.",
    sourceName: "Roman Martyrology & African Saints Calendar",
    sourceUrl: "https://www.vatican.va",
  },
  camillus_de_lellis: {
    celebrationId: "camillus_de_lellis_priest",
    name: "Saint Camillus de Lellis, Priest (Patron of the Sick and Healthcare Workers)",
    summary:
      "Saint Camillus de Lellis (1550–1614) was an Italian soldier who experienced deep conversion and dedicated the rest of his life to caring for hospital patients and the plague-stricken. He founded the Ministers of the Sick (Camillians), who wear a large red cross on their habit. He instructed his friars: 'See Jesus Christ in the sick, and care for each patient with the love of a mother for her only child.' He is the patron saint of hospitals, patients, doctors, and nurses.",
    sourceName: "Roman Martyrology & Catholic Encyclopedia",
    sourceUrl: "https://www.newadvent.org/cathen/03217b.htm",
  },
  cosmas_and_damian: {
    celebrationId: "cosmas_and_damian_martyrs",
    name: "Saints Cosmas and Damian, Martyrs (Patrons of Doctors and Pharmacists)",
    summary:
      "Saints Cosmas and Damian were twin brothers and physicians in Roman Syria who treated the sick free of charge, earning the title 'Anargyroi' (the holy unmercenaries). Through their surgical skill and fervent prayers, they healed bodies and converted souls to Christ before sealing their witness through martyrdom under Emperor Diocletian. They are mentioned in the Roman Canon (Eucharistic Prayer I).",
    sourceName: "Roman Canon & Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/04403e.htm",
  },

  // October & November Universal Saints
  teresa_of_jesus_of_avila_virgin: {
    celebrationId: "teresa_of_jesus_of_avila_virgin",
    name: "Saint Teresa of Jesus (of Ávila), Virgin and Doctor of the Church",
    summary:
      "Saint Teresa of Ávila (1515–1582) was a Spanish Carmelite nun, mystic, and reformer who founded the Discalced Carmelites alongside Saint John of the Cross. She is renowned for her profound spiritual writings, including 'The Interior Castle' and 'The Way of Perfection', which illuminate the stages of contemplative prayer and intimate union with God. In 1970, Pope Saint Paul VI proclaimed her the first female Doctor of the Church.\n\nHer conviction remains a beacon of trust: 'Let nothing disturb you, let nothing frighten you. All things are passing; God never changes. Patience obtains all things. Whoever has God lacks nothing; God alone suffices.'",
    sourceName: "Catholic Encyclopedia & Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/14515b.htm",
  },
  ignatius_of_antioch_bishop: {
    celebrationId: "ignatius_of_antioch_bishop",
    name: "Saint Ignatius of Antioch, Bishop and Martyr",
    summary:
      "Saint Ignatius of Antioch (c. 35–108 AD) was the third Bishop of Antioch and a direct disciple of the Apostle Saint John. En route to his martyrdom in Rome under Emperor Trajan, he authored seven famous epistles that bear extraordinary witness to the hierarchical structure of the Church, the real presence of Jesus Christ in the Holy Eucharist, and the unity of believers with their bishop.\n\nHe famously wrote: 'I am God's wheat, and I am ground by the teeth of wild beasts that I may be found pure bread of Christ.'",
    sourceName: "Apostolic Fathers & Early Church Documents",
    sourceUrl: "https://www.newadvent.org/cathen/07644a.htm",
  },
  luke_evangelist: {
    celebrationId: "luke_evangelist",
    name: "Saint Luke, Evangelist (Patron of Physicians)",
    summary:
      "Saint Luke was a Greek physician and companion of Saint Paul the Apostle. He authored the Gospel of Luke and the Acts of the Apostles. His Gospel highlights the divine mercy of Jesus, compassion for the poor, outcasts, and sick, and the canticles of the Incarnation (Magnificat, Benedictus, and Nunc Dimittis). Tradition honours him as the first Christian iconographer.",
    sourceName: "Roman Martyrology & Scripture",
    sourceUrl: "https://www.newadvent.org/cathen/09420a.htm",
  },
  john_paul_ii_pope: {
    celebrationId: "john_paul_ii_pope",
    name: "Saint John Paul II, Pope",
    summary:
      "Karol Józef Wojtyła (1920–2005) reigned as Pope from 1978 to 2005. One of the most influential pontiffs in Catholic history, he championed Christian unity, youth evangelisation through World Youth Days, the sanctity of human life, and the fall of totalitarianism. He instituted Divine Mercy Sunday, promulgated the Catechism of the Catholic Church, and gave the Church the Luminous Mysteries of the Rosary.",
    sourceName: "Holy See & Postulation of Saint John Paul II",
    sourceUrl: "https://www.vatican.va",
  },
  simon_and_jude_apostles: {
    celebrationId: "simon_and_jude_apostles",
    name: "Saints Simon and Jude, Apostles",
    summary:
      "Saints Simon and Jude (Thaddaeus) were two of the Twelve Apostles chosen by Our Lord Jesus Christ. Simon was called the Zealot for his fervent devotion, and Jude was the author of the canonical Epistle of Jude. Saint Jude is universally venerated as the beloved patron of hopeless causes and desperate situations. Both suffered martyrdom for Christ in Persia.",
    sourceName: "Holy Gospels & Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/14001b.htm",
  },
  all_saints: {
    celebrationId: "all_saints",
    name: "Solemnity of All Saints",
    summary:
      "The Solemnity of All Saints commemorates all the holy men and women who have reached the Beatific Vision in Heaven—both the canonised saints commemorated on the Church's calendar and the vast multitude known to God alone. It celebrates the communion of saints and confirms the universal call to holiness for every Christian.",
    sourceName: "General Roman Calendar & Vatican Council II",
    sourceUrl: "https://www.vatican.va",
  },
  all_souls: {
    celebrationId: "all_souls",
    name: "The Commemoration of All the Faithful Departed (All Souls' Day)",
    summary:
      "On All Souls' Day, the Church turns her prayers, Holy Masses, and indulgences toward the holy souls in Purgatory, asking God to cleanse them from every stain of venial sin and grant them eternal rest and perpetual light in heaven. Catholic doctrine affirms that it is a holy and wholesome thought to pray for the dead (2 Maccabees 12:46).",
    sourceName: "Roman Missal & Catechism of the Catholic Church, no. 1032",
    sourceUrl: "https://www.vatican.va",
  },
  martin_de_porres_religious: {
    celebrationId: "martin_de_porres_religious",
    name: "Saint Martin de Porres, Religious",
    summary:
      "Saint Martin de Porres (1579–1639) was a Peruvian Dominican lay brother known for his deep humility, Eucharistic contemplation, and heroic charity toward the sick, impoverished, and enslaved of Lima. He founded hospitals and orphanages, practiced herbal healing, and demonstrated the universal brotherhood of all races under Christ.",
    sourceName: "Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/09727a.htm",
  },
  leo_the_great_pope: {
    celebrationId: "leo_the_great_pope",
    name: "Saint Leo the Great, Pope and Doctor of the Church",
    summary:
      "Saint Leo the Great (c. 400–461) reigned as Bishop of Rome during a time of immense imperial instability and theological turmoil. His famous 'Tome of Leo' to the Council of Chalcedon (451) definitively articulated that Christ is one divine Person in two full natures (true God and true man). He famously confronted Attila the Hun and persuaded him to spare Rome.",
    sourceName: "Roman Martyrology & Conciliar Documents",
    sourceUrl: "https://www.newadvent.org/cathen/09154b.htm",
  },
  cecilia_virgin_martyr: {
    celebrationId: "cecilia_virgin_martyr",
    name: "Saint Cecilia, Virgin and Martyr (Patroness of Musicians)",
    summary:
      "Saint Cecilia was a young Roman noblewoman martyred for Christ in the early centuries. As sacred musical instruments played at her wedding, she sang in her heart to God alone: 'Let my heart and my body be undefiled, that I may not be confounded.' She converted her husband Valerian and his brother Tiburtius, and gave her home to be consecrated as a church. She is the patron saint of church choirs and sacred music.",
    sourceName: "Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/03471b.htm",
  },
  francis_of_assisi: {
    celebrationId: "francis_of_assisi",
    name: "Saint Francis of Assisi",
    summary:
      "Saint Francis of Assisi (1181–1226) renounced earthly wealth to embrace Lady Poverty and follow Christ. He founded the Order of Friars Minor (Franciscans) and the Poor Clares with Saint Clare. He received the Holy Stigmata on Mount La Verna and composed the 'Canticle of Brother Sun'. He is the patron saint of ecology, animals, and peace.",
    sourceName: "Franciscan Annals & Catholic Encyclopedia",
    sourceUrl: "https://www.newadvent.org/cathen/06221a.htm",
  },
  anthony_of_padua_priest: {
    celebrationId: "anthony_of_padua_priest",
    name: "Saint Anthony of Padua, Priest and Doctor of the Church",
    summary:
      "Saint Anthony of Padua (1195–1231) was a Portuguese Franciscan priest and Doctor of the Church, celebrated for his peerless preaching of Sacred Scripture and wonder-working miracles. Known as the 'Evangelical Doctor', he is loved throughout the Catholic world as the finder of lost things and protector of the poor through Saint Anthony's Bread.",
    sourceName: "Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/01556a.htm",
  },
  joseph_spouse_of_mary: {
    celebrationId: "joseph_spouse_of_mary",
    name: "Saint Joseph, Spouse of the Blessed Virgin Mary",
    summary:
      "Saint Joseph was the chaste husband of the Virgin Mary and the foster-father of Jesus Christ. Described in the Gospel as a 'just man', he guided and protected the Holy Family with quiet faith, humility, and obedience. Pope Blessed Pius IX declared him Patron of the Universal Church in 1870, and he is invoked as the Terror of Demons and Patron of Workers and Fathers.",
    sourceName: "Gospels of Matthew and Luke & Roman Martyrology",
    sourceUrl: "https://www.newadvent.org/cathen/08504a.htm",
  },
  peter_and_paul_apostles: {
    celebrationId: "peter_and_paul_apostles",
    name: "Saints Peter and Paul, Apostles",
    summary:
      "Saints Peter and Paul are the apostolic foundation of the Church of Rome. Peter, the rock upon whom Christ promised to build his Church, received the keys of the Kingdom of Heaven. Paul, the Apostle to the Gentiles, carried the Gospel across the Mediterranean. Both sealed their witness by martyrdom in Rome under Emperor Nero.",
    sourceName: "Acts of the Apostles & Early Church Tradition",
    sourceUrl: "https://www.newadvent.org/cathen/11744a.htm",
  },
  assumption_of_the_blessed_virgin_mary: {
    celebrationId: "assumption_of_the_blessed_virgin_mary",
    name: "Solemnity of the Assumption of the Blessed Virgin Mary",
    summary:
      "This solemnity celebrates the dogma that the Immaculate Virgin Mary, having completed the course of her earthly life, was assumed body and soul into heavenly glory, as solemnly defined by Pope Pius XII in Munificentissimus Deus (1950).",
    sourceName: "Munificentissimus Deus (Apostolic Constitution)",
    sourceUrl: "https://www.vatican.va",
  },
  immaculate_conception: {
    celebrationId: "immaculate_conception",
    name: "Solemnity of the Immaculate Conception of the Blessed Virgin Mary",
    summary:
      "The Solemnity of the Immaculate Conception celebrates the truth of faith defined by Pope Blessed Pius IX in Ineffabilis Deus (1854): that Mary, by a unique privilege of Almighty God in anticipation of the merits of Jesus Christ, was preserved entirely free from the stain of original sin from the first instant of her conception.",
    sourceName: "Ineffabilis Deus (Apostolic Constitution)",
    sourceUrl: "https://www.vatican.va",
  },
  christ_the_king: {
    celebrationId: "christ_the_king",
    name: "Solemnity of Our Lord Jesus Christ, King of the Universe",
    summary:
      "Instituted by Pope Pius XI in 1925 with the encyclical Quas Primas, this grand solemnity crowns the liturgical year. It proclaims the supreme, sovereign dominion of Jesus Christ over hearts, families, societies, nations, and all created things.",
    sourceName: "Quas Primas (Encyclical) & Roman Missal",
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
    { matches: ["perpetual help", "mother of perpetual help"], key: "our_mother_of_perpetual_help" },
    { matches: ["padre pio", "pio of pietrelcina"], key: "padre_pio" },
    { matches: ["tansi", "iwene tansi", "cyprian michael"], key: "cyprian_michael_iwene_tansi" },
    { matches: ["charles lwanga", "uganda martyrs", "lwanga"], key: "charles_lwanga_and_companions" },
    { matches: ["camillus", "camillus de lellis"], key: "camillus_de_lellis" },
    { matches: ["cosmas and damian", "cosmas", "damian"], key: "cosmas_and_damian" },
    { matches: ["teresa of ávila", "teresa of avila", "teresa of jesus"], key: "teresa_of_jesus_of_avila_virgin" },
    { matches: ["ignatius of antioch"], key: "ignatius_of_antioch_bishop" },
    { matches: ["luke", "evangelist luke"], key: "luke_evangelist" },
    { matches: ["john paul ii", "karol wojtyla"], key: "john_paul_ii_pope" },
    { matches: ["simon and jude", "jude thaddaeus", "saint jude"], key: "simon_and_jude_apostles" },
    { matches: ["francis of assisi"], key: "francis_of_assisi" },
    { matches: ["anthony of padua"], key: "anthony_of_padua_priest" },
    { matches: ["joseph"], key: "joseph_spouse_of_mary" },
    { matches: ["peter and paul"], key: "peter_and_paul_apostles" },
    { matches: ["all saints"], key: "all_saints" },
    { matches: ["all souls", "faithful departed"], key: "all_souls" },
    { matches: ["martin de porres"], key: "martin_de_porres_religious" },
    { matches: ["leo the great"], key: "leo_the_great_pope" },
    { matches: ["cecilia"], key: "cecilia_virgin_martyr" },
    { matches: ["assumption"], key: "assumption_of_the_blessed_virgin_mary" },
    { matches: ["immaculate conception"], key: "immaculate_conception" },
    { matches: ["christ the king"], key: "christ_the_king" },
  ];

  for (const entry of searchMap) {
    if (entry.matches.some((m) => lowerName.includes(m))) {
      const p = CURATED_SAINTS[entry.key];
      if (p) return p;
    }
  }

  // 4. Dynamic Catholic Hagiography Generator for any saint or feast
  if (
    lowerName.includes("saint") ||
    lowerName.includes("st.") ||
    lowerName.includes("blessed") ||
    lowerName.includes("our lady") ||
    lowerName.includes("apostle") ||
    lowerName.includes("martyr") ||
    lowerName.includes("feast") ||
    lowerName.includes("solemnity")
  ) {
    return {
      celebrationId,
      name: celebrationName,
      summary: `${celebrationName} is solemnly commemorated today in the Roman Catholic Church and the sacred liturgy. The Church honours their heroic faith, steadfast love for Jesus Christ, and exemplary Christian virtue as an inspiring model and heavenly intercessor for all believers.\n\nThrough their prayers and intercession, we ask Almighty God for grace, healing, purity of heart, and perseverance in our daily Christian journey.`,
      sourceName: "Roman Martyrology & General Roman Calendar",
      sourceUrl: "https://www.vatican.va",
    };
  }

  return null;
}
