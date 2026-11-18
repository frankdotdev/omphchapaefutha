/**
 * The Complete Order of the Mass (Ordo Missae)
 * According to the Third Typical Edition of The Roman Missal (2010 Recognitio for Nigeria, Prot. N. 1021/10/L)
 * Incorporating the full official English texts, authentic Igbo translations (Usoro Emume nke Misa n'Asụsụ Igbo
 * approved by the Catholic Bishops' Conference of Nigeria - CBCN / catholiclectionary.com), and Latin (Missale Romanum).
 */

export interface LiturgicalDialogue {
  id: string;
  section: string;
  title: string;
  rubric?: string;
  english: {
    celebrant?: string;
    people: string;
  };
  latin: {
    celebrant?: string;
    people: string;
  };
  igbo: {
    celebrant?: string;
    people: string;
  };
}

export interface OrderOfMassPart {
  id: string;
  category: "introductory" | "word" | "eucharist" | "communion" | "concluding";
  categoryLabel: string;
  title: string;
  latinTitle: string;
  igboTitle: string;
  rubric?: string;
  items: LiturgicalDialogue[];
}

export const ORDER_OF_MASS: OrderOfMassPart[] = [
  // 1. INTRODUCTORY RITES
  {
    id: "introductory-rites",
    category: "introductory",
    categoryLabel: "Introductory Rites",
    title: "The Introductory Rites",
    latinTitle: "Ritus Initiales",
    igboTitle: "Usoro Mbido nke Misa",
    rubric:
      "The Introductory Rites help the faithful come together as one, establish communion and prepare themselves properly to listen to the Word of God and to celebrate the Eucharist worthily. All stand. The Priest approaches the altar with the ministers and venerates it while the Entrance Song is sung.",
    items: [
      {
        id: "sign-of-cross",
        section: "Introductory Rites",
        title: "Sign of the Cross",
        rubric: "All make the Sign of the Cross as the Priest says:",
        english: {
          celebrant: "In the name of the Father, and of the Son, and of the Holy Spirit.",
          people: "Amen.",
        },
        latin: {
          celebrant: "In nómine Patris, et Fílii, et Spíritus Sancti.",
          people: "Amen.",
        },
        igbo: {
          celebrant: "N'aha Nna, na nke Ọkpara, na nke Mmụọ Nsọ.",
          people: "Amen.",
        },
      },
      {
        id: "greeting",
        section: "Introductory Rites",
        title: "The Greeting",
        rubric: "Then the Priest greets the people:",
        english: {
          celebrant:
            "Either: The grace of our Lord Jesus Christ, and the love of God, and the communion of the Holy Spirit be with you all.\n\nOr: Grace to you and peace from God our Father and the Lord Jesus Christ.\n\nOr: The Lord be with you.",
          people: "And with your spirit.",
        },
        latin: {
          celebrant:
            "Aut: Grátia Dómini nostri Iesu Christi, et cáritas Dei, et communicátio Sancti Spíritus sit cum ómnibus vobis.\n\nAut: Grátia vobis et pax a Deo Patre nostro et Dómino Iesu Christo.\n\nAut: Dóminus vobíscum.",
          people: "Et cum spíritu tuo.",
        },
        igbo: {
          celebrant:
            "Nke Mbụ: Ka amara nke Onye-nwe-anyị Jisọs Kraịst, na ịhụnanya nke Chineke, na mmekọrịta nke Mmụọ Nsọ nọnyere ụnụ niile.\n\nMaọbụ: Amara dịrị unu na udo nke si n'aka Chineke bụ Nna anyị na nke Onyenweanyị Jisọs Kraịst.\n\nMaọbụ: Onyenweanyị nọnyere unu.",
          people: "Ma nọnyekwara mmụọ gị.",
        },
      },
      {
        id: "penitential-act-confiteor",
        section: "Penitential Act",
        title: "Penitential Act (Form A — Confiteor)",
        rubric:
          "The Priest, or a Deacon, or another minister, may very briefly introduce the faithful to the Mass of the day. The Priest invites the faithful to the Penitential Act: 'Brethren (brothers and sisters), let us acknowledge our sins, and so prepare ourselves to celebrate the sacred mysteries.' A brief pause for silence follows.",
        english: {
          celebrant: "Brethren (brothers and sisters), let us acknowledge our sins, and so prepare ourselves to celebrate the sacred mysteries.",
          people:
            "I confess to almighty God and to you, my brothers and sisters, that I have greatly sinned, in my thoughts and in my words, in what I have done and in what I have failed to do,\n\n(And, striking their breast, they say:)\nthrough my fault, through my fault, through my most grievous fault;\n\ntherefore I ask blessed Mary ever-Virgin, all the Angels and Saints, and you, my brothers and sisters, to pray for me to the Lord our God.",
        },
        latin: {
          celebrant: "Fratres, agnoscámus peccáta nostra, ut apti simus ad sacra mystéria celebránda.",
          people:
            "Confíteor Deo omnipoténti et vobis, fratres, quia peccávi nimis cogitatióne, verbo, ópere et omissióne: (percutiunt sibi pectus, dicentes:) mea culpa, mea culpa, mea máxima culpa. Ideo precor beátam Maríam semper Vírginem, omnes Angelos et Sanctos, et vos, fratres, oráre pro me ad Dóminum Deum nostrum.",
        },
        igbo: {
          celebrant: "Ụmụnne m, ka anyị kwupụta mmehie anyị, ka anyị wee dozie onwe anyị nke ọma ime emume dị nsọ a.",
          people:
            "Ekwuputara m n'iru Chineke Pụrụ Ime Ihe Niile, nakwa n'iru unu ụmụnne m, na emehiela m nke ukwuu, n'echiche m, n'okwu ọnụ m, n'ihe m mere na n'ihe m hapụrụ emeghị: (kụọ aka n'obi sị:) site na mmehie m, site na mmehie m, site na mmehie kachasị ukwuu nke m. Ya mere ana m arịọ Maria dị asọ mgbe niile, ndị mụọ-ozi niile na ndị nsọ niile, na unu onwe unu ụmụnne m, ka unu kpere m Chineke bụ Onyenweanyị.",
        },
      },
      {
        id: "absolution",
        section: "Penitential Act",
        title: "The Absolution",
        rubric: "The absolution by the Priest follows:",
        english: {
          celebrant: "May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life.",
          people: "Amen.",
        },
        latin: {
          celebrant: "Misereátur nostri omnípotens Deus et, dimíssis peccátis nostris, perdúcat nos ad vitam aetérnam.",
          people: "Amen.",
        },
        igbo: {
          celebrant: "Ka Chineke Pụrụ Ime Ihe Niile meere anyị ebere, gbaghara anyị mmehie anyị, ma duru anyị gaa na ndụ ebighị ebi.",
          people: "Amen.",
        },
      },
      {
        id: "kyrie",
        section: "Penitential Act",
        title: "The Kyrie (Lord, Have Mercy)",
        rubric: "The Kyrie, eleison (Lord, have mercy) invocations may follow (in English or Greek):",
        english: {
          celebrant:
            "V. Lord, have mercy. / V. Christ, have mercy. / V. Lord, have mercy.\n\n(Or: V. Kyrie, eleison. / V. Christe, eleison. / V. Kyrie, eleison.)",
          people:
            "R. Lord, have mercy.\nR. Christ, have mercy.\nR. Lord, have mercy.\n\n(Or: R. Kyrie, eleison. / R. Christe, eleison. / R. Kyrie, eleison.)",
        },
        latin: {
          celebrant: "Kýrie, eléison. / Christe, eléison. / Kýrie, eléison.",
          people: "Kýrie, eléison. / Christe, eléison. / Kýrie, eléison.",
        },
        igbo: {
          celebrant: "Onyenweanyị, mee ebere. / Kraịst, mee ebere. / Onyenweanyị, mee ebere.",
          people: "Onyenweanyị, mee ebere. / Kraịst, mee ebere. / Onyenweanyị, mee ebere.",
        },
      },
      {
        id: "gloria",
        section: "Introductory Rites",
        title: "The Gloria (Glory to God in the Highest)",
        rubric: "When indicated this hymn is either sung or said:",
        english: {
          celebrant: "Glory to God in the highest...",
          people:
            "Glory to God in the highest,\nand on earth peace to people of good will.\nWe praise you,\nwe bless you,\nwe adore you,\nwe glorify you,\nwe give you thanks for your great glory,\nLord God, heavenly King,\nO God, almighty Father.\nLord Jesus Christ, Only Begotten Son,\nLord God, Lamb of God, Son of the Father,\nyou take away the sins of the world,\nhave mercy on us;\nyou take away the sins of the world,\nreceive our prayer;\nyou are seated at the right hand of the Father,\nhave mercy on us.\nFor you alone are the Holy One,\nyou alone are the Lord,\nyou alone are the Most High,\nJesus Christ,\nwith the Holy Spirit,\nin the glory of God the Father.\nAmen.",
        },
        latin: {
          celebrant: "Glória in excélsis Deo...",
          people:
            "Glória in excélsis Deo et in terra pax homínibus bonae voluntátis. Laudámus te, benedícimus te, adorámus te, glorificámus te, grátias ágimus tibi propter magnam glóriam tuam, Dómine Deus, Rex caeléstis, Deus Pater omnípotens. Dómine Fili unigénite, Iesu Christe, Dómine Deus, Agnus Dei, Fílius Patris, qui tollis peccáta mundi, miserére nobis; qui tollis peccáta mundi, súscipe deprecatiónem nostram. Qui sedes ad déxteram Patris, miserére nobis. Quóniam tu solus Sanctus, tu solus Dóminus, tu solus Altíssimus, Iesu Christe, cum Sancto Spíritu: in glória Dei Patris. Amen.",
        },
        igbo: {
          celebrant: "Otito dịrị Chineke n'elu kachasị elu...",
          people:
            "Otito dịrị Chineke n'elu kachasị elu, na n'ụwa udo dịrị ndị mmadụ ndị nwere ezi obi. Anyị na-eto Gị, anyị na-agọzi Gị, anyị na-akpọ isiala nye Gị, anyị na-ebuli aha Gị elu, anyị na-ekele Gị maka nnukwu otito Gị, Onyenweanyị Chineke, Eze nke eluigwe, Chineke Nna Pụrụ Ime Ihe Niile. Onyenweanyị Jisọs Kraịst, Ọkpara mụrụ naanị Ya; Onyenweanyị Chineke, Nwa Atụrụ nke Chineke, Ọkpara nke Nna, Gị Onye na-ewepụ mmehie nke ụwa, meere anyị ebere; Gị Onye na-ewepụ mmehie nke ụwa, nara arịrịọ anyị; Gị Onye nọ n'aka nri nke Nna, meere anyị ebere. Maka na naanị Gị dị nsọ, naanị Gị bụ Onyenweanyị, naanị Gị bụ Onye kachasị ihe niile elu, Jisọs Kraịst, Ya na Mmụọ Nsọ, n'otito nke Chineke Nna. Amen.",
        },
      },
      {
        id: "collect",
        section: "Introductory Rites",
        title: "The Collect",
        rubric: "The Priest says: 'Let us pray.' And all pray in silence with the Priest for a while. Then the Priest says the Collect prayer, at the end of which the people acclaim:",
        english: {
          celebrant: "Let us pray. [Collect of the Day] ... through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God, for ever and ever.",
          people: "Amen.",
        },
        latin: {
          celebrant: "Orémus. [Collecta] ... per Dóminum nostrum Iesum Christum Fílium tuum, qui tecum vivit et regnat in unitáte Spíritus Sancti, Deus, per ómnia saécula saeculórum.",
          people: "Amen.",
        },
        igbo: {
          celebrant: "Ka anyị kpee ekpere. [Ekpere Mmalite nke Ụbọchị] ... site n'Onyenweanyị Jisọs Kraịst, Ọkpara Gị, Onye Ya na Gị na Mmụọ Nsọ na-adị ndụ ma na-achị, otu Chineke, ebe niile na mgbe niile ebiebi.",
          people: "Amen.",
        },
      },
    ],
  },

  // 2. LITURGY OF THE WORD
  {
    id: "liturgy-of-the-word",
    category: "word",
    categoryLabel: "Liturgy of the Word",
    title: "The Liturgy of the Word",
    latinTitle: "Liturgia Verbi",
    igboTitle: "Emume nke Okwu Chineke",
    rubric:
      "By hearing the word proclaimed in worship, the faithful again enter into the unending dialogue between God and the covenant people, a dialogue sealed in the sharing of the Eucharistic food and drink. The proclamation of the word is thus integral to the Mass and at its very centre. It is appropriate to have a brief time of quiet after the readings for those present to take the word of God to heart and begin to prepare a prayerful response to what they have heard. All sit.",
    items: [
      {
        id: "first-reading",
        section: "Scripture Readings",
        title: "First & Second Reading Acclamation",
        rubric: "To indicate the end of these readings, the reader acclaims:",
        english: {
          celebrant: "The word of the Lord.",
          people: "Thanks be to God.",
        },
        latin: {
          celebrant: "Verbum Dómini.",
          people: "Deo grátias.",
        },
        igbo: {
          celebrant: "Okwu nke Onyenweanyị.",
          people: "Ekele dịrị Chineke.",
        },
      },
      {
        id: "gospel-proclamation",
        section: "Holy Gospel",
        title: "Proclamation of the Holy Gospel",
        rubric:
          "The assembly stands to sing the Gospel Acclamation to welcome the Gospel. They remain standing in honour of the Gospel reading, the high point of the Liturgy of the Word. At the ambo the Deacon, or the Priest says:",
        english: {
          celebrant:
            "The Lord be with you.\n\nA reading from the holy Gospel according to N.\n\n(He makes the Sign of the Cross on the book and, together with the people, on his forehead, lips, and breast.)",
          people: "And with your spirit.\n\nGlory to you, O Lord.",
        },
        latin: {
          celebrant: "Dóminus vobíscum.\n\nLéctio sancti Evangélii secúndum N.",
          people: "Et cum spíritu tuo.\n\nGlória tibi, Dómine.",
        },
        igbo: {
          celebrant:
            "Onyenweanyị nọnyere unu.\n\nỌgụgụ sitere n'Oziọma dị nsọ nke N. dere.\n\n(Ọ na-eme akara obe n'akwụkwọ ma n'egedege ihu, n'egbugbere ọnụ na n'obi ya)",
          people: "Ma nọnyekwara mmụọ gị.\n\nOtito dịrị Gị, O Onyenweanyị.",
        },
      },
      {
        id: "gospel-conclusion",
        section: "Holy Gospel",
        title: "Conclusion of the Gospel",
        rubric: "At the end of the Gospel, the Deacon, or the Priest, acclaims:",
        english: {
          celebrant: "The Gospel of the Lord.",
          people: "Praise to you, Lord Jesus Christ.",
        },
        latin: {
          celebrant: "Verbum Dómini.",
          people: "Laus tibi, Christe.",
        },
        igbo: {
          celebrant: "Oziọma nke Onyenweanyị.",
          people: "Otito dịrị Gị, Kraịst.",
        },
      },
      {
        id: "creed",
        section: "Profession of Faith",
        title: "Niceno-Constantinopolitan (“Nicene”) Creed",
        rubric:
          "On Sundays and Solemnities, the Profession of Faith or Creed will follow. During Lent and Easter Time, especially, the Apostles’ Creed may be used. At the words 'and by the Holy Spirit was incarnate... and became man', all bow.",
        english: {
          celebrant: "I believe in one God...",
          people:
            "I believe in one God,\nthe Father almighty,\nmaker of heaven and earth,\nof all things visible and invisible.\nI believe in one Lord Jesus Christ,\nthe Only Begotten Son of God,\nborn of the Father before all ages.\nGod from God,\nLight from Light,\ntrue God from true God,\nbegotten, not made, consubstantial with the Father;\nthrough him all things were made.\nFor us men and for our salvation he came down from heaven,\n\n(At the words that follow, up to and including 'and became man', all bow:)\nand by the Holy Spirit was incarnate of the Virgin Mary,\nand became man.\n\nFor our sake he was crucified under Pontius Pilate,\nhe suffered death and was buried,\nand rose again on the third day\nin accordance with the Scriptures.\nHe ascended into heaven\nand is seated at the right hand of the Father.\nHe will come again in glory\nto judge the living and the dead\nand his kingdom will have no end.\nI believe in the Holy Spirit, the Lord, the giver of life,\nwho proceeds from the Father and the Son,\nwho with the Father and the Son is adored and glorified,\nwho has spoken through the prophets.\nI believe in one, holy, catholic and apostolic Church.\nI confess one Baptism for the forgiveness of sins\nand I look forward to the resurrection of the dead\nand the life of the world to come. Amen.",
        },
        latin: {
          celebrant: "Credo in unum Deum...",
          people:
            "Credo in unum Deum, Patrem omnipoténtem, factórem caeli et terrae, visibílium ómnium et invisibílium. Et in unum Dóminum Iesum Christum, Fílium Dei unigénitum, et ex Patre natum ante ómnia saécula. Deum de Deo, lumen de lúmine, Deum verum de Deo vero, génitum, non factum, consubstantiálem Patri: per quem ómnia facta sunt. Qui propter nos hómines et propter nostram salútem descéndit de caelis. (hic genuflectitur vel inclinatur:) Et incarnátus est de Spíritu Sancto ex María Vírgine, et homo factus est. Crucifíxus étiam pro nobis sub Póntio Piláto; passus et sepúltus est, et resurréxit tértia die, secúndum Scriptúras, et ascéndit in caelum, sedet ad déxteram Patris. Et íterum ventúrus est cum glória, iudicáre vivos et mórtuos, cuius regni non erit finis. Et in Spíritum Sanctum, Dóminum et vivificántem: qui ex Patre Filióque procédit. Qui cum Patre et Fílio simul adorátur et conglorificátur: qui locútus est per prophétas. Et unam, sanctam, cathólicam et apostólicam Ecclésiam. Confíteor unum baptísma in remissiónem peccatórum. Et exspécto resurrectiónem mortuórum, et vitam ventúri saéculi. Amen.",
        },
        igbo: {
          celebrant: "Ekwere m na otu Chineke...",
          people:
            "Ekwere m na otu Chineke, bụ Nna Pụrụ Ime Ihe Niile, Onye kere eluigwe na ụwa, na ihe niile a na-ahụ anya na ihe a na-adịghị ahụ anya.\n\nNakwa n'otu Onye-nwe-anyị Jisọs Kraịst, Ọkpara Chineke mụrụ naanị Ya, Onye si na Nna pụta tupu oge niile malite. Chineke si na Chineke pụta, Ìhè si n'Ìhè pụta, Ezi Chineke si n'Ezi Chineke pụta, Onye a mụrụ amụ, nke a na-eferoghị efe, otu ihe na Nna; Onye e siri n'aka Ya mee ihe niile.\n\nMaka anyị bụ ndị mmadụ, na maka nzọpụta anyị, O siri n'eluigwe rịdata;\n\n(Kweere isi n'ala:) ma site n'ike nke Mmụọ Nsọ, O si n'afọ Meri Nwa Agbọghọ Na-amaghị Nwoke ghọọ mmadụ.\n\nA kpọgidere Ya n'obe n'ihi anyị n'okpuru Pọntius Paịlet; Ọ tara ahụhụ ma nwụọ, e lie Ya; O bilitere n'ụbọchị nke atọ dịka Akwụkwọ Nsọ siri kwuo.\n\nỌ rigoro n'eluigwe, nọdụ n'aka nri nke Nna. Ọ ga-alọghachikwa n'otito ikpe ndị dị ndụ na ndị nwụrụ anwụ ikpe, Alaeze Ya agaghị enwe ọgwụgwụ.\n\nEkwere m na Mmụọ Nsọ, Onye-nwe-anyị na Onye na-enye ndụ, Onye si na Nna na Ọkpara pụta, Onye Ya na Nna na Ọkpara na-anata otu ofufe na otu otito, Onye kwuru okwu site n'ọnụ ndị amụma.\n\nEkwere m n'otu Nzukọ Kraịst dị nsọ, nke Katọlik na nke ndị Ozi. Ekwuputara m otu baptism maka mgbaghara mmehie, ana m elekwa anya mbilite n'ọnwụ nke ndị nwụrụ anwụ, na ndụ nke ụwa na-abịa. Amen.",
        },
      },
      {
        id: "bidding-prayers",
        section: "Prayer of the Faithful",
        title: "The Prayer of the Faithful (Bidding Prayers)",
        rubric: "After each intention there is a pause while the faithful pray. The minister says:",
        english: {
          celebrant: "Lord, in your mercy.",
          people: "Hear our prayer.",
        },
        latin: {
          celebrant: "Te rogámus, audi nos.",
          people: "Te rogámus, audi nos.",
        },
        igbo: {
          celebrant: "Onyenweanyị, n'ebere Gị.",
          people: "Nụrụ ekpere anyị.",
        },
      },
    ],
  },

  // 3. LITURGY OF THE EUCHARIST
  {
    id: "liturgy-of-the-eucharist",
    category: "eucharist",
    categoryLabel: "Liturgy of the Eucharist",
    title: "The Liturgy of the Eucharist",
    latinTitle: "Liturgia Eucharistica",
    igboTitle: "Emume nke Eucharist Dị Nsọ",
    rubric:
      "For Catholics, the Eucharist is the source and summit of the whole Christian life. It is the vital centre of all that the Church is and does, because at its heart is the real presence of the crucified, risen and glorified Lord, continuing and making available his saving work among us.",
    items: [
      {
        id: "offertory-acclamation",
        section: "The Offertory",
        title: "Offertory Prayers & Blessing of Gifts",
        rubric:
          "During the Offertory Song the faithful bring forward bread, wine, and gifts for the Church and the poor. When the Priest offers the prayers of blessing aloud over the bread and wine, the people acclaim:",
        english: {
          celebrant:
            "Blessed are you, Lord God of all creation, for through your goodness we have received the bread we offer you... / ...the wine we offer you...",
          people: "Blessed be God for ever.",
        },
        latin: {
          celebrant: "Benedíctus es, Dómine, Deus univérsi, quia de tua largitáte accépimus panem / vinum...",
          people: "Benedíctus Deus in saécula.",
        },
        igbo: {
          celebrant:
            "Onye a gọziri agọzi ka Ị bụ, Onyenweanyị Chineke nke ihe niile e kere eke, n'ihi na site n'amara Gị ka anyị natara achịcha / mmanya a anyị na-ewetara Gị...",
          people: "Otito dịrị Chineke mgbe niile ebiebi.",
        },
      },
      {
        id: "orate-fratres",
        section: "The Offertory",
        title: "Orate, Fratres (Prayer over the Offerings)",
        rubric: "The Priest completes additional personal preparatory rites, and the people rise as he says:",
        english: {
          celebrant: "Pray, brethren (brothers and sisters), that my sacrifice and yours may be acceptable to God, the almighty Father.",
          people:
            "May the Lord accept the sacrifice at your hands for the praise and glory of his name, for our good and the good of all his holy Church.",
        },
        latin: {
          celebrant: "Oráte, fratres: ut meum ac vestrum sacrifícium acceptábile fiat apud Deum Patrem omnipoténtem.",
          people:
            "Suscípiat Dóminus sacrifícium de mánibus tuis ad laudem et glóriam nóminis sui, ad utilitátem quoque nostram totiúsque Ecclésiae suae sanctae.",
        },
        igbo: {
          celebrant: "Kpeenụ ụmụnne m, ka aja m na nke unu bụrụ ihe na-atọ Chineke Nna Pụrụ Ime Ihe Niile ụtọ.",
          people:
            "Ka Onyenweanyị nara aja a n'aka gị, maka otito na ekele nke aha Ya, nakwa maka abamuru nke anyị onwe anyị na nke Nzukọ Nsọ Ya niile.",
        },
      },
      {
        id: "prayer-over-offerings",
        section: "The Offertory",
        title: "Prayer over the Offerings",
        rubric: "Then the Priest says the Prayer over the Offerings, at the end of which the people acclaim:",
        english: {
          celebrant: "Prayer over the Offerings... Through Christ our Lord.",
          people: "Amen.",
        },
        latin: {
          celebrant: "Orátio super obláta... Per Christum Dóminum nostrum.",
          people: "Amen.",
        },
        igbo: {
          celebrant: "Ekpere n'elu Onyinye... Site na Kraịst Onyenweanyị.",
          people: "Amen.",
        },
      },
    ],
  },

  // 4. EUCHARISTIC PRAYER
  {
    id: "eucharistic-prayer",
    category: "eucharist",
    categoryLabel: "The Eucharistic Prayer",
    title: "Eucharistic Prayer I (‘The Roman Canon’)",
    latinTitle: "Prex Eucharistica I (Canon Romanus)",
    igboTitle: "Ekpere Eucharistica I (Canon nke Rome)",
    rubric:
      "The Eucharistic Prayer, the centre and summit of the entire celebration is a memorial proclamation of praise and thanksgiving for God’s work of salvation, a proclamation in which the Body and Blood of Christ are made present by the power of the Holy Spirit and the people are joined to Christ in offering his Sacrifice to the Father.",
    items: [
      {
        id: "preface-dialogue",
        section: "Preface",
        title: "Preface Dialogue (Sursum Corda)",
        rubric: "Extending his hands, the Priest begins:",
        english: {
          celebrant: "The Lord be with you.\n\nLift up your hearts.\n\nLet us give thanks to the Lord our God.",
          people: "And with your spirit.\n\nWe lift them up to the Lord.\n\nIt is right and just.",
        },
        latin: {
          celebrant: "Dóminus vobíscum.\n\nSursum corda.\n\nGrátias agámus Dómino Deo nostro.",
          people: "Et cum spíritu tuo.\n\nHabémus ad Dóminum.\n\nDignum et iustum est.",
        },
        igbo: {
          celebrant: "Onyenweanyị nọnyere unu.\n\nWelienụ obi unu elu.\n\nKelenụ Onyenweanyị bụ Chineke anyị.",
          people: "Ma nọnyekwara mmụọ gị.\n\nAnyị eweliela ha nye Onyenweanyị.\n\nO kwesịrị, dịkwa mma.",
        },
      },
      {
        id: "common-preface-i",
        section: "Preface",
        title: "Common Preface I (The Renewal of All Things in Christ)",
        rubric: "The Priest continues with the Preface:",
        english: {
          celebrant:
            "It is truly right and just, our duty and our salvation, always and everywhere to give you thanks, Lord, holy Father, almighty and eternal God, through Christ our Lord.\n\nIn him you have been pleased to renew all things, giving us all a share in his fullness. For though he was in the form of God, he emptied himself and by the blood of his Cross brought peace to all creation. Therefore he has been exalted above all things, and to all who obey him, has become the source of eternal salvation.\n\nAnd so, with Angels and Archangels, with Thrones and Dominions, and with all the hosts and Powers of heaven, we sing the hymn of your glory, as without end we acclaim:",
          people: "[Singing or saying the Sanctus]",
        },
        latin: {
          celebrant:
            "Vere dignum et iustum est, aequum et salutáre, nos tibi semper et ubíque grátias ágere: Dómine, sancte Pater, omnípotens aetérne Deus: per Christum Dóminum nostrum.\n\nIn quo ómnia instauráre tibi complácuit, et de eius plenitúdine nos omnes accípere tribuísti. Cum enim in forma Dei esset, semetípsum exinanívit, et per sánguinem crucis suae pacificávit univérsa; unde exaltátus est super ómnia, et oboediéntibus sibi factus est causa salútis aetérnae.\n\nEt ídeo cum Angelis et Archángelis, cum Thronis et Dominatiónibus, cumque omni milítia caeléstis exércitus, hymnum glóriae tuae cánimus, sine fine dicéntes:",
          people: "[Sanctus]",
        },
        igbo: {
          celebrant:
            "N'ezie o kwesịrị ma dịkwa mma, bụrụ ọrụ anyị na nzọpụta anyị, na anyị ga na-ekele Gị mgbe niile na ebe niile, Onyenweanyị, Nna dị nsọ, Chineke Pụrụ Ime Ihe Niile ma dịkwa ebighị ebi, site na Kraịst Onyenweanyị.\n\nN'ime Ya ka O masịrị Gị ime ka ihe niile dị ọhụrụ, na-enye anyị niile òkè site n'uju nke Ya. Maka na agbanyeghị na Ọ dị n'oyiyi nke Chineke, Ọ wedara Onwe Ya n'ala, ma site n'ọbara nke Obe Ya wetara udo nye ihe niile e kere eke. Ya mere e jiri bulie Ya elu karịa ihe niile, ma nye ndị niile na-erubere Ya isi, Ọ ghọọla isi iyi nke nzọpụta ebighị ebi.\n\nYa mere, anyị na ndị Mụọ-ozi na ndị Isi Mụọ-ozi, na ndị nọ n'oche Eze na ndị Ọchịchị, na ndị agha niile nke eluigwe, na-abụ ukwe nke otito Gị, na-akpọsa n'enweghị nkwụsị sị:",
          people: "[Dị Nsọ, Dị Nsọ]",
        },
      },
      {
        id: "sanctus",
        section: "Preface",
        title: "The Sanctus (Holy, Holy, Holy)",
        rubric:
          "The Priest concludes the Preface with the people singing or saying aloud. After the singing of the Sanctus the congregation kneels for the remainder of the Eucharistic Prayer:",
        english: {
          celebrant: "Without end we acclaim:",
          people:
            "Holy, Holy, Holy Lord God of hosts.\nHeaven and earth are full of your glory.\nHosanna in the highest.\nBlessed is he who comes in the name of the Lord.\nHosanna in the highest.",
        },
        latin: {
          celebrant: "Sine fine dicéntes:",
          people:
            "Sanctus, Sanctus, Sanctus Dóminus Deus Sábaoth.\nPleni sunt caeli et terra glória tua.\nHosánna in excélsis.\nBenedíctus qui venit in nómine Dómini.\nHosánna in excélsis.",
        },
        igbo: {
          celebrant: "Anyị na-eso ha na-abụ sị:",
          people:
            "Dị Nsọ, Dị Nsọ, Dị Nsọ, Onyenweanyị Chineke nke igwe ndị agha.\nEluigwe na ụwa jula n'otito Gị.\nHosanna n'elu kachasị elu.\nOnye a gọziri agọzi ka Onye ahụ na-abịa n'aha Onyenweanyị bụ.\nHosanna n'elu kachasị elu.",
        },
      },
      {
        id: "canon-te-igitur",
        section: "The Roman Canon",
        title: "Te Igitur & Commemoration of the Living",
        rubric: "The Priest alone recites with hands extended:",
        english: {
          celebrant:
            "To you, therefore, most merciful Father, we make humble prayer and petition through Jesus Christ, your Son, our Lord: that you accept and bless ✠ these gifts, these offerings, these holy and unblemished sacrifices, which we offer you firstly for your holy catholic Church. Be pleased to grant her peace, to guard, unite and govern her throughout the whole world, together with your servant N. our Pope and N. our Bishop, and all those who, holding to the truth, hand on the catholic and apostolic faith.\n\nRemember, Lord, your servants (N. and N.) and all gathered here, whose faith and devotion are known to you. For them, we offer you this sacrifice of praise or they offer it for themselves and all who are dear to them: for the redemption of their souls, in hope of health and well-being, and paying their homage to you, the eternal God, living and true.",
          people: "[Silent adoration]",
        },
        latin: {
          celebrant:
            "Te ígitur, clementíssime Pater, per Iesum Christum, Fílium tuum, Dóminum nostrum, súpplices rogámus ac pétimus, uti accépta hábeas et benedícas ✠ haec dona, haec múnera, haec sancta sacrifícia illibáta, in primis, quae tibi offérimus pro Ecclésia tua sancta cathólica: quam pacificáre, custodíre, adunáre et régere dignéris toto orbe terrárum: una cum fámulo tuo Papa nostro N. et Epíscopo nostro N. et ómnibus orthodóxis atque cathólicae et apostólicae fídei cultóribus.\n\nMeménto, Dómine, famulórum famularúmque tuárum N. et N. et ómnium circumstántium, quorum tibi fides cógnita est et nota devótio, pro quibus tibi offérimus: vel qui tibi ófferunt hoc sacrifícium laudis, pro se suísque ómnibus: pro redemptióne animárum suárum, pro spe salútis et incolumitátis suae: tibíque reddunt vota sua aetérno Deo, vivo et vero.",
          people: "[Silentium]",
        },
        igbo: {
          celebrant:
            "Ya mere, Nna kacha nwee ebere, anyị na-eji umeala na arịrịọ na-abịakwute Gị site na Jisọs Kraịst, Ọkpara Gị, Onyenweanyị: ka Ị nara ma gọzie ✠ onyinye ndị a, ihe ndị a a na-ewetara Gị, àjà ndị a dị nsọ ma dịkwa ọcha, nke anyị na-ebute nye Gị na mbụ maka Nzukọ Nsọ Gị nke Katọlik. Ka O masị Gị inye ya udo, ichekwa ya, ime ka ọ dịrị n'otu ma na-achị ya n'ụwa niile, tinyere ohu Gị bụ Popu anyị N., na Bishọp anyị N., na ndị niile na-ejide n'eziokwu, na-enyefe okwukwe nke Katọlik na nke ndị Ozi.\n\nCheta, Onyenweanyị, ndị ohu Gị (N. na N.) na ndị niile gbakọtara ebe a, ndị okwukwe na nraranye ha doro Gị anya. N'ihi ha, anyị na-achụrụ Gị àjà a nke otito maọbụ ha onwe ha na-achụrụ Onwe ha na maka ndị niile ha hụrụ n'anya: maka mgbapụta nke mkpụrụobi ha, n'olileanya nke ahụike na ọdịmma, na-akwụ ụgwọ nsọpụrụ ha nye Gị, Chineke ebighị ebi, dị ndụ ma bụrụkwa eziokwu.",
          people: "[Ofufe dị jụụ]",
        },
      },
      {
        id: "canon-communicantes",
        section: "The Roman Canon",
        title: "Communicantes (In Communion with the Saints)",
        english: {
          celebrant:
            "In communion with those whose memory we venerate, especially the glorious ever-Virgin Mary, Mother of our God and Lord, Jesus Christ, and blessed Joseph, her Spouse, your blessed Apostles and Martyrs, Peter and Paul, Andrew, (James, John, Thomas, James, Philip, Bartholomew, Matthew, Simon and Jude; Linus, Cletus, Clement, Sixtus, Cornelius, Cyprian, Lawrence, Chrysogonus, John and Paul, Cosmas and Damian) and all your Saints; we ask that through their merits and prayers, in all things we may be defended by your protecting help. (Through Christ our Lord. Amen.)\n\nTherefore, Lord, we pray: graciously accept this oblation of our service, that of your whole family; order our days in your peace, and command that we be delivered from eternal damnation and counted among the flock of those you have chosen. (Through Christ our Lord. Amen.)\n\nBe pleased, O God, we pray, to bless, acknowledge, and approve this offering in every respect; make it spiritual and acceptable, so that it may become for us the Body and Blood of your most beloved Son, our Lord Jesus Christ.",
          people: "[Silent adoration]",
        },
        latin: {
          celebrant:
            "Communicántes, et memóriam venerántes, in primis gloriósae semper Vírginis Maríae, Genetrícis Dei et Dómini nostri Iesu Christi: sed et beáti Ioseph, eiúsdem Vírginis Sponsi, et beatórum Apostolórum ac Mártyrum tuórum, Petri et Pauli, Andréae, (Iacóbi, Ioánnis, Thomae, Iacóbi, Philíppi, Bartholomaéi, Matthaéi, Simónis et Thaddaéi: Lini, Cleti, Cleméntis, Xysti, Cornélii, Cypriáni, Lauréntii, Chrysógoni, Ioánnis et Pauli, Cosmae et Damiáni) et ómnium Sanctórum tuórum; quorum méritis precibúsque concédas, ut in ómnibus protectiónis tuae muniámur auxílio. (Per Christum Dóminum nostrum. Amen.)\n\nHanc ígitur oblatiónem servitútis nostrae, sed et cunctae famíliae tuae, quaésumus, Dómine, ut placátus accípias: diésque nostros in tua pace dispónas, atque ab aetérna damnatióne nos éripi et in electórum tuórum iúbeas grege numerári. (Per Christum Dóminum nostrum. Amen.)\n\nQuam oblatiónem tu, Deus, in ómnibus, quaésumus, benedíctam, adscríptam, ratam, rationábilem, acceptabilémque fácere dignéris: ut nobis Corpus et Sanguis fiat dilectíssimi Fílii tui, Dómini nostri Iesu Christi.",
          people: "[Silentium]",
        },
        igbo: {
          celebrant:
            "N'otu na ndị ncheta ha anyị na-asọpụrụ, karịsịa nke Meri Nwa Agbọghọ Na-amaghị Nwoke dị ebube mgbe niile, Nne nke Chineke na Onyenweanyị Jisọs Kraịst: na nke Josef dị asọ, Di ya, na nke ndị Ozi na ndị Nwụrụ n'Okwukwe Gị gọziri agọzi, Pita na Pọl, Andru, (Jemes, Jọn, Tọmọs, Jemes, Filip, Batolomiu, Matiu, Saịmọn na Jud; Linus, Kletus, Klement, Sixtus, Kọnilius, Siprian, Lọrens, Krisogonus, Jọn na Pọl, Kọsmas na Damian) na ndị Nsọ Gị niile; anyị na-arịọ ka site n'urukwụ na ekpere ha, ka e chebe anyị n'ihe niile site n'enyemaka nchebe Gị. (Site na Kraịst Onyenweanyị. Amen.)\n\nYa mere, Onyenweanyị, anyị na-arịọ: jiri obiọma nara onyinye a nke ozi anyị, nke ezinụlọ Gị niile; dozie ụbọchị anyị n'udo Gị, ma nye iwu ka a zọpụta anyị n'ikpe ọmụma ebighị ebi ma gụnyere anyị n'ìgwè atụrụ nke ndị Ị họọrọ. (Site na Kraịst Onyenweanyị. Amen.)\n\nKa O masị Gị, O Chineke, anyị na-arịọ, ịgọzi, ịnabata, na ịkwado onyinye a n'akụkụ niile; mee ya ka ọ bụrụ nke mmụọ na nke a na-anabata nke ọma, ka o wee ghọọrọ anyị Ahụ na Ọbara nke Ọkpara Gị kacha hụ n'anya, bụ Onyenweanyị Jisọs Kraịst.",
          people: "[Ofufe dị jụụ]",
        },
      },
      {
        id: "consecration-bread-chalice",
        section: "Consecration",
        title: "Words of Consecration (Institution Narrative)",
        rubric:
          "The Priest takes the bread, holds it slightly raised above the altar, says the words of consecration, genuflects, and shows the consecrated Host to the faithful. He then does the same with the chalice:",
        english: {
          celebrant:
            "On the day before he was to suffer,\nhe took bread in his holy and venerable hands,\nand with eyes raised to heaven\nto you, O God, his almighty Father,\ngiving you thanks, he said the blessing,\nbroke the bread\nand gave it to his disciples, saying:\n\nTAKE THIS, ALL OF YOU, AND EAT OF IT,\nFOR THIS IS MY BODY,\nWHICH WILL BE GIVEN UP FOR YOU.\n\nIn a similar way, when supper was ended,\nhe took this precious chalice\nin his holy and venerable hands,\nand once more giving you thanks, he said the blessing\nand gave the chalice to his disciples, saying:\n\nTAKE THIS, ALL OF YOU, AND DRINK FROM IT,\nFOR THIS IS THE CHALICE OF MY BLOOD,\nTHE BLOOD OF THE NEW AND ETERNAL COVENANT,\nWHICH WILL BE POURED OUT FOR YOU AND FOR MANY\nFOR THE FORGIVENESS OF SINS.\nDO THIS IN MEMORY OF ME.",
          people: "[Silent adoration and bowing of heads]",
        },
        latin: {
          celebrant:
            "Qui, prídie quam paterétur,\naccepit panem in sanctas ac venerábiles manus suas,\net elevátis óculis in caelum\nad te Deum Patrem suum omnipoténtem,\ntibi grátias agens benedíxit,\nfrégit, dedítque discípulis suis, dicens:\n\nACCÍPITE ET MANDUCÁTE EX HOC OMNES:\nHOC EST ENIM CORPUS MEUM,\nQUOD PRO VOBIS TRADÉTUR.\n\nSímili modo, postquam cenátum est,\naccípiens et hunc praeclárum cálicem\nin sanctas ac venerábiles manus suas,\nitem tibi grátias agens benedíxit,\ndedítque discípulis suis, dicens:\n\nACCÍPITE ET BÍBITE EX EO OMNES:\nHIC EST ENIM CALIX SÁNGUINIS MEI\nNOVI ET AETÉRNI TESTAMÉNTI,\nQUI PRO VOBIS ET PRO MULTIS EFFUNDÉTUR\nIN REMISSIÓNEM PECCATÓRUM.\nHOC FÁCITE IN MEAM COMMEMORATIÓNEM.",
          people: "[Silentium]",
        },
        igbo: {
          celebrant:
            "N'ụbọchị tupu Ọ taa ahụhụ,\nO weere achịcha n'aka Ya dị nsọ ma dịkwa ebube,\nma welie anya Ya n'eluigwe\nnye Gị, O Chineke, Nna Ya Pụrụ Ime Ihe Niile,\nna-ekele Gị, O gọziri ya,\nnyawaa achịcha ahụ\nma nye ya ndị na-eso ụzọ Ya, sị:\n\nNARANỤ NKE A UNU NIILE TAA YA,\nN'IHI NA NKE A BỤ AHỤ M,\nNKE A GA-ENYEFA N'IHI UNU.\n\nN'otu aka ahụ, mgbe e risịrị nri anyasị,\nO weere iko a dị oké ọnụ ahịa\nn'aka Ya dị nsọ ma dịkwa ebube,\nna-ekelekwa Gị ọzọ, O gọziri ya\nma nye ya ndị na-eso ụzọ Ya, sị:\n\nNARANỤ NKE A UNU NIILE ṄỤỌ YA,\nN'IHI NA NKE A BỤ IKO NKE ỌBARA M,\nỌBARA NKE ỌGBỤGBA-NDỤ ỌHỤRỤ NA NKE EBIGHỊ EBI,\nNKE A GA-AWỤFỤ N'IHI UNU NA N'IHI ỌTỤTỤ MMADỤ\nMAKA MGBAGHARA MMEDỤ.\nNA-EMENỤ NKE A NA NCHETEKA NKE M.",
          people: "[Ofufe dị jụụ na ikwe isi n'ala]",
        },
      },
      {
        id: "memorial-acclamation",
        section: "Mystery of Faith",
        title: "The Mystery of Faith (Memorial Acclamations)",
        rubric: "After the words of Consecration the priest says: 'The mystery of faith.' The people continue, acclaiming:",
        english: {
          celebrant: "The mystery of faith.",
          people:
            "Either:\nWe proclaim your Death, O Lord,\nand profess your Resurrection\nuntil you come again.\n\nOr:\nWhen we eat this Bread and drink this Cup,\nwe proclaim your Death, O Lord,\nuntil you come again.\n\nOr:\nSave us, Saviour of the world,\nfor by your Cross and Resurrection\nyou have set us free.",
        },
        latin: {
          celebrant: "Mystérium fídei.",
          people:
            "Aut: Mortem tuam annuntiámus, Dómine, et tuam resurrectiónem confitémur, donec vénias.\n\nAut: Quotiescúmque manducámus panem hunc et cálicem bíbimus, mortem tuam annuntiámus, Dómine, donec vénias.\n\nAut: Salvátor mundi, salva nos, qui per crucem et resurrectiónem tuam liberásti nos.",
        },
        igbo: {
          celebrant: "Ihe omimi nke okwukwe anyị.",
          people:
            "Nke Mbụ:\nỌnwụ Gị ka anyị na-akpọsa, O Onyenweanyị,\nma na-ekwupụta mbilite n'ọnwụ Gị\nruo mgbe Ị ga-alọghachi.\n\nMaọbụ:\nMgbe ọ bụla anyị riri Achịcha a ma ṅụọ Iko a,\nanyị na-akpọsa ọnwụ Gị, O Onyenweanyị,\nruo mgbe Ị ga-alọghachi.\n\nMaọbụ:\nZọpụta anyị, O Onyenzọpụta nke ụwa,\nmaka na site n'Obe na Mbilite n'ọnwụ Gị\nỊ mere ka anyị nwere onwe anyị.",
        },
      },
      {
        id: "canon-anamnesis-intercessions",
        section: "The Roman Canon",
        title: "Anamnesis & Commemoration of the Dead",
        english: {
          celebrant:
            "Therefore, O Lord, as we celebrate the memorial of the blessed Passion, the Resurrection from the dead, and the glorious Ascension into heaven of Christ, your Son, our Lord, we, your servants and your holy people, offer to your glorious majesty from the gifts that you have given us, this pure victim, this holy victim, this spotless victim, the holy Bread of eternal life and the Chalice of everlasting salvation. Be pleased to look upon these offerings with a serene and kindly countenance, and to accept them, as once you were pleased to accept the gifts of your servant Abel the just, the sacrifice of Abraham, our father in faith, and the offering of your high priest Melchizedek, a holy sacrifice, a spotless victim.\n\nIn humble prayer we ask you, almighty God: command that these gifts be borne by the hands of your holy Angel to your altar on high in the sight of your divine majesty, so that all of us, who through this participation at the altar receive the most holy Body and Blood of your Son, may be filled with every grace and heavenly blessing. (Through Christ our Lord. Amen.)\n\nRemember also, Lord, your servants N. and N., who have gone before us with the sign of faith and rest in the sleep of peace. Grant them, O Lord, we pray, and all who sleep in Christ, a place of refreshment, light and peace. (Through Christ our Lord. Amen.)\n\nTo us, also, your servants, who, though sinners, hope in your abundant mercies, graciously grant some share and fellowship with your holy Apostles and Martyrs: with John the Baptist, Stephen, Matthias, Barnabas, (Ignatius, Alexander, Marcellinus, Peter, Felicity, Perpetua, Agatha, Lucy, Agnes, Cecilia, Anastasia) and all your Saints; admit us, we beseech you, into their company, not weighing our merits, but granting us your pardon, through Christ our Lord. Through whom you continue to make all these good things, O Lord; you sanctify them, fill them with life, bless them, and bestow them upon us.",
          people: "[Silent adoration]",
        },
        latin: {
          celebrant:
            "Unde et mémores, Dómine, nos servi tui, sed et plebs tua sancta, eiúsdem Christi, Fílii tui, Dómini nostri, tam beátae passiónis, necnon et ab ínferis resurrectiónis, sed et in caelos gloriósae ascensiónis: offérimus praeclárae maiestáti tuae de tuis donis ac datis hóstiam puram, hóstiam sanctam, hóstiam immaculátam, Panem sanctum vitae aetérnae et Cálicem salútis perpétuae. Supra quae propítio ac seréno vultu respícere dignéris: et accépta habére, sícuti accépta habére dignátus es múnera púeri tui iusti Abel, et sacrifícium Patriárchae nostri Abrahae, et quod tibi óbtulit summus sacérdos tuus Melchísedech, sanctum sacrifícium, immaculátam hóstiam.\n\nSúpplices te rogámus, omnípotens Deus: iube haec perférri per manus sancti Angeli tui in sublíme altáre tuum, in conspéctu divínae maiestátis tuae: ut, quotquot ex hac altáris participatióne sacrosánctum Fílii tui Corpus et Sánguinem sumpsérimus, omni benedictióne caelésti et grátia repleámur. (Per Christum Dóminum nostrum. Amen.)\n\nMeménto étiam, Dómine, famulórum famularúmque tuárum N. et N., qui nos praecessérunt cum signo fídei, et dórmiunt in somno pacis. Ipsis, Dómine, et ómnibus in Christo quiescéntibus, locum refrigérii, lucis et pacis, ut indúlgeas, deprecámur. (Per Christum Dóminum nostrum. Amen.)\n\nNobis quoque peccatóribus fámulis tuis, de multitúdine miseratiónum tuárum sperántibus, partem áliquam et societátem donáre dignéris cum tuis sanctis Apóstolis et Martýribus: cum Ioánne, Stéphano, Matthía, Bárnaba, et ómnibus Sanctis tuis: intra quorum nos consórtium, non aestimátor mériti, sed véniae, quaésumus, largítor admítte. Per Christum Dóminum nostrum. Per quem haec ómnia, Dómine, semper bona creas, sanctíficas, vivíficas, benedícis, et praestas nobis.",
          people: "[Silentium]",
        },
        igbo: {
          celebrant:
            "Ya mere, O Onyenweanyị, ka anyị na-eme ncheta nke Ahụhụ gọziri agọzi, Mbilite n'ọnwụ site na ndị nwụrụ anwụ, na Nrigoro n'eluigwe dị ebube nke Kraịst, Ọkpara Gị, Onyenweanyị, anyị bụ ndị ohu Gị na ndị nsọ Gị, na-ewetara nnukwu ebube Gị site n'onyinye ndị Ị nyere anyị, Àjà a dị ọcha, Àjà a dị nsọ, Àjà a na-enweghị ntụpọ, Achịcha dị nsọ nke ndụ ebighị ebi na Iko nke nzọpụta na-enweghị ọgwụgwụ. Ka O masị Gị iji ihu udo na nke obiọma lee onyinye ndị a, ma nabata ha, dịka Ọ masịrị Gị ịnabata onyinye nke ohu Gị bụ Abel onye eziomume, na àjà nke Abraham bụ nna anyị n'okwukwe, na onyinye nke nnukwu onye nchụàjà Gị bụ Melkizedek, àjà dị nsọ, àjà na-enweghị ntụpọ.\n\nN'ekpere dị umeala anyị na-arịọ Gị, Chineke Pụrụ Ime Ihe Niile: nye iwu ka aka nke Mụọ-ozi Gị dị nsọ buru onyinye ndị a gaa n'ebe ịchụàjà Gị dị elu n'iru ebube Chineke Gị, ka anyị niile, ndị ga-esi n'òkè a n'ebe ịchụàjà nara Ahụ na Ọbara kachasị nsọ nke Ọkpara Gị, were amara niile na ngọzi nke eluigwe jupụta. (Site na Kraịst Onyenweanyị. Amen.)\n\nCheta kwa, Onyenweanyị, ndị ohu Gị N. na N., ndị bu anyị ụzọ nwere akara nke okwukwe ma na-ezu ike n'ụra nke udo. Nye ha, O Onyenweanyị, anyị na-arịọ Gị, na ndị niile na-ezu ike n'ime Kraịst, ebe ntụrụndụ, ìhè na udo. (Site na Kraịst Onyenweanyị. Amen.)\n\nNye kwa anyị, ndị ohu Gị bụ ndị mmehie, ndị na-atụ anya n'uju nke ebere Gị, were obiọma nye anyị òkè na mmekọrịta na ndị Ozi na ndị Nwụrụ n'Okwukwe Gị dị nsọ: tinyere Jọn Onye Na-eme Baptizim, Stifin, Matias, Banabas, na ndị Nsọ Gị niile; nabata anyị, anyị na-arịọ Gị, n'ime nzukọ ha, ọ bụghị site n'ịtụle urukwụ anyị, kama site n'inye anyị mgbaghara Gị, site na Kraịst Onyenweanyị. Onye Ị na-esite n'aka Ya na-emepụta ezi ihe ndị a niile mgbe niile, O Onyenweanyị; Ị na-edo ha nsọ, na-eme ka ha dị ndụ, na-agọzi ha, ma na-enye anyị ha.",
          people: "[Ofufe dị jụụ]",
        },
      },
      {
        id: "doxology",
        section: "The Roman Canon",
        title: "The Great Doxology & Amen",
        rubric:
          "At the conclusion of the Eucharistic Prayer the Priest takes the chalice and the paten with the host and, raising both, he alone says:",
        english: {
          celebrant:
            "Through him, and with him, and in him,\nO God, almighty Father,\nin the unity of the Holy Spirit,\nall glory and honour is yours,\nfor ever and ever.",
          people: "Amen.",
        },
        latin: {
          celebrant:
            "Per ipsum, et cum ipso, et in ipso,\nest tibi Deo Patri omnipoténti,\nin unitáte Spíritus Sancti,\nomnis honor et glória\nper ómnia saécula saeculórum.",
          people: "Amen.",
        },
        igbo: {
          celebrant:
            "Site n'aka Ya, na n'ime Ya, na n'otu Ya,\nka a na-enye Gị, Chineke Nna Pụrụ Ime Ihe Niile,\nn'otu nke Mmụọ Nsọ,\notito na nsọpụrụ niile,\nebe niile na mgbe niile ebiebi.",
          people: "Amen.",
        },
      },
    ],
  },

  // 5. COMMUNION RITE
  {
    id: "communion-rite",
    category: "communion",
    categoryLabel: "The Communion Rite",
    title: "The Communion Rite",
    latinTitle: "Ritus Communionis",
    igboTitle: "Usoro Oriri Nsọ",
    rubric:
      "The eating and drinking together of the Lord’s Body and Blood in a Paschal meal is the culmination of the Eucharist. The themes underlying these rites are the mutual love and reconciliation that are both the condition and the fruit of worthy communion and the unity of the many in the One.",
    items: [
      {
        id: "pater-noster",
        section: "The Lord's Prayer",
        title: "The Lord's Prayer & Embolism",
        rubric: "The congregation stands and the Priest says:",
        english: {
          celebrant:
            "At the Saviour’s command and formed by divine teaching, we dare to say:\n\n(Together with the people, he continues:)\nOur Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.\n\n(The Priest alone continues, saying:)\nDeliver us, Lord, we pray, from every evil, graciously grant peace in our days, that, by the help of your mercy, we may be always free from sin and safe from all distress, as we await the blessed hope and the coming of our Saviour, Jesus Christ.",
          people: "For the kingdom, the power and the glory are yours now and for ever.",
        },
        latin: {
          celebrant:
            "Praecéptis salutáribus móniti, et divína institutióne formáti, audémus dícere:\n\nPater noster, qui es in caelis: sanctificétur nomen tuum; advéniat regnum tuum; fiat volúntas tua, sicut in caelo et in terra. Panem nostrum cotidiánum da nobis hódie; et dimítte nobis débita nostra, sicut et nos dimíttimus debitóribus nostris; et ne nos indúcas in tentatiónem; sed líbera nos a malo.\n\nLíbera nos, quaésumus, Dómine, ab ómnibus malis, da propítius pacem in diébus nostris, ut, ope misericórdiae tuae adiúti, et a peccáto simus semper líberi et ab omni perturbatióne secúri: exspectántes beátam spem et advéntum Salvatóris nostri Iesu Christi.",
          people: "Quia tuum est regnum, et potéstas, et glória in saécula.",
        },
        igbo: {
          celebrant:
            "Dịka Onyenzọpụta anyị siri kụzie anyị, na dịka ozizi nke Chineke si duzie anyị, anyị na-anwa anwa ikpe sị:\n\nNna anyị Nọ n'eluigwe, ka e doo aha Gị nsọ; ka Alaeze Gị bịa; ka e mee uche Gị n'ụwa dịka e si eme ya n'eluigwe. Nye anyị taa nri nke ụbọchị anyị; gbaghara anyị mmehie anyị, dịka anyị si agbaghara ndị mehiere anyị; ekwela ka anyị banye na ọnwụnwa, kama zọpụta anyị n'aka ajọ ihe.\n\nZọpụta anyị, Onyenweanyị, anyị na-arịọ Gị, n'aka ajọ ihe niile, jiri obiọma nye udo n'ụbọchị anyị, ka site n'enyemaka nke ebere Gị, anyị wee nwere onwe anyị mgbe niile pụọ na mmehie ma nọrọ ná nchebe pụọ ná nsogbu niile, ka anyị na-echere olileanya gọziri agọzi na ọbịbịa nke Onyenzọpụta anyị, Jisọs Kraịst.",
          people: "Maka na Alaeze, ike na otito bụ nke Gị ugbu a na mgbe ebighị ebi.",
        },
      },
      {
        id: "sign-of-peace",
        section: "Sign of Peace",
        title: "The Sign of Peace",
        rubric:
          "The Priest says the prayer for peace. He then adds: 'The peace of the Lord be with you always.' The Deacon, or the Priest, adds: 'Let us offer each other the sign of peace.' All offer one another the customary sign of peace (a handclasp or handshake):",
        english: {
          celebrant:
            "Lord Jesus Christ, who said to your Apostles: Peace I leave you, my peace I give you, look not on our sins, but on the faith of your Church, and graciously grant her peace and unity in accordance with your will. Who live and reign for ever and ever.\n\nThe peace of the Lord be with you always.\n\nLet us offer each other the sign of peace.",
          people: "Amen.\n\nAnd with your spirit.",
        },
        latin: {
          celebrant:
            "Dómine Iesu Christe, qui dixísti Apóstolis tuis: Pacem relínquo vobis, pacem meam do vobis: ne respícias peccáta nostra, sed fidem Ecclésiae tuae; eámque secúndum voluntátem tuam pacificáre et coadunáre dignéris. Qui vivis et regnas in saécula saeculórum.\n\nPax Dómini sit semper vobíscum.\n\nOfférte vobis pacem.",
          people: "Amen.\n\nEt cum spíritu tuo.",
        },
        igbo: {
          celebrant:
            "Onyenweanyị Jisọs Kraịst, Onye gwara ndị Ozi Gị sị: Udo ka M na-ahapụrụ unu, udo nke M ka M na-enye unu; elela mmehie anyị anya, kama lee okwukwe nke Nzukọ Gị; jirikwa obiọma nye ya udo na ịdị n'otu dịka uche Gị si dị. Gị Onye na-adị ndụ ma na-achị ebe niile na mgbe niile ebiebi.\n\nUdo nke Onyenweanyị nọnyere unu mgbe niile.\n\nKelenụ onwe unu n'udo nke Kraịst.",
          people: "Amen.\n\nMa nọnyekwara mmụọ gị.",
        },
      },
      {
        id: "agnus-dei",
        section: "Fraction of Bread",
        title: "Breaking of the Bread (Agnus Dei / Lamb of God)",
        rubric: "During the breaking of the host the following is sung or said. After the Lamb of God, the people kneel:",
        english: {
          celebrant: "May this mingling of the Body and Blood of our Lord Jesus Christ bring eternal life to us who receive it.",
          people:
            "Lamb of God, you take away the sins of the world, have mercy on us.\nLamb of God, you take away the sins of the world, have mercy on us.\nLamb of God, you take away the sins of the world, grant us peace.",
        },
        latin: {
          celebrant: "Haec commíxtio Córporis et Sánguinis Dómini nostri Iesu Christi fiat accipiéntibus nobis in vitam aetérnam.",
          people:
            "Agnus Dei, qui tollis peccáta mundi: miserére nobis.\nAgnus Dei, qui tollis peccáta mundi: miserére nobis.\nAgnus Dei, qui tollis peccáta mundi: dona nobis pacem.",
        },
        igbo: {
          celebrant: "Ka mmekọ nke Anụ Ahụ na Ọbara nke Onyenweanyị Jisọs Kraịst wetara anyị ndị na-anara ya ndụ ebighị ebi.",
          people:
            "Nwa Atụrụ nke Chineke, Onye na-ewepụ mmehie nke ụwa: meere anyị ebere.\nNwa Atụrụ nke Chineke, Onye na-ewepụ mmehie nke ụwa: meere anyị ebere.\nNwa Atụrụ nke Chineke, Onye na-ewepụ mmehie nke ụwa: nye anyị udo.",
        },
      },
      {
        id: "invitation-to-communion",
        section: "Invitation to Communion",
        title: "Invitation to Holy Communion (Domine, Non Sum Dignus)",
        rubric:
          "After his private prayers of preparation the Priest genuflects, takes the host and, holding it slightly raised above the paten or above the chalice says aloud. Together with the people he adds once:",
        english: {
          celebrant: "Behold the Lamb of God, behold him who takes away the sins of the world. Blessed are those called to the supper of the Lamb.",
          people: "Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed.",
        },
        latin: {
          celebrant: "Ecce Agnus Dei, ecce qui tollit peccáta mundi. Beáti qui ad cenam Agni vocáti sunt.",
          people: "Dómine, non sum dignus, ut intres sub tectum meum, sed tantum dic verbo et sanábitur ánima mea.",
        },
        igbo: {
          celebrant: "Lee Nwa Atụrụ nke Chineke, lee Onye na-ewepụ mmehie nke ụwa. Ngọzi dịrị ndị a kpọrọ na nri anyasị nke Nwa Atụrụ.",
          people: "Onyenweanyị, erughị m eru ka Ị bata n'okpuru ụlọ m, kama kwuo naanị otu okwu, mkpụrụobi m ga-adị mma.",
        },
      },
      {
        id: "communion-distribution",
        section: "Holy Communion",
        title: "Distribution of Holy Communion",
        rubric:
          "After the Priest has reverently consumed the Body and Blood of Christ the communicants come forward in reverent procession, and make a preparatory act of reverence by bowing their head in honour of Christ’s presence in the Sacrament. They receive Holy Communion standing. The Priest (or Minister) says:",
        english: {
          celebrant: "The Body of Christ. / (When ministered under both kinds: The Blood of Christ.)",
          people: "Amen.",
        },
        latin: {
          celebrant: "Corpus Christi. / Sanguis Christi.",
          people: "Amen.",
        },
        igbo: {
          celebrant: "Ahụ nke Kraịst. / Ọbara nke Kraịst.",
          people: "Amen.",
        },
      },
      {
        id: "prayer-after-communion",
        section: "Post-Communion",
        title: "Prayer after Communion",
        rubric:
          "After the distribution of Communion, if appropriate, a sacred silence may be observed for a while, or a psalm or hymn may be sung. Then, the Priest says: 'Let us pray.' All stand and pray in silence. Then the Priest says the Prayer after Communion, at the end of which the people acclaim:",
        english: {
          celebrant: "Let us pray. [Prayer after Communion] ... Through Christ our Lord.",
          people: "Amen.",
        },
        latin: {
          celebrant: "Orémus. [Postcommunio] ... Per Christum Dóminum nostrum.",
          people: "Amen.",
        },
        igbo: {
          celebrant: "Ka anyị kpee ekpere. [Ekpere Mmechi nke Oriri Nsọ] ... Site na Kraịst Onyenweanyị.",
          people: "Amen.",
        },
      },
    ],
  },

  // 6. CONCLUDING RITES
  {
    id: "concluding-rites",
    category: "concluding",
    categoryLabel: "The Concluding Rites",
    title: "The Concluding Rites & Dismissal",
    latinTitle: "Ritus Conclusionis",
    igboTitle: "Usoro Mmechi nke Misa",
    rubric:
      "The brief Concluding Rite sends the people forth to put into effect in their daily lives the Mystery of Christ’s Death and Resurrection and the unity in Christ which they have celebrated. Their mission is to witness to Christ in the world and to bring the Gospel to the poor. Any brief announcements to the people follow here. Then the dismissal takes place.",
    items: [
      {
        id: "final-blessing",
        section: "Concluding Rites",
        title: "The Final Blessing",
        rubric: "The Priest blesses the people, saying:",
        english: {
          celebrant: "The Lord be with you.\n\nMay almighty God bless you, the Father, and the Son, ✠ and the Holy Spirit.",
          people: "And with your spirit.\n\nAmen.",
        },
        latin: {
          celebrant: "Dóminus vobíscum.\n\nBenedícat vos omnípotens Deus, Pater, et Fílius, ✠ et Spíritus Sanctus.",
          people: "Et cum spíritu tuo.\n\nAmen.",
        },
        igbo: {
          celebrant: "Onyenweanyị nọnyere unu.\n\nKa Chineke Pụrụ Ime Ihe Niile gọzie unu, Nna, na Ọkpara, ✠ na Mmụọ Nsọ.",
          people: "Ma nọnyekwara mmụọ gị.\n\nAmen.",
        },
      },
      {
        id: "dismissal",
        section: "Concluding Rites",
        title: "The Dismissal",
        rubric: "Then the Deacon, or the Priest himself, dismisses the assembly:",
        english: {
          celebrant:
            "Either: Go forth, the Mass is ended.\n\nOr: Go and announce the Gospel of the Lord.\n\nOr: Go in peace, glorifying the Lord by your life.\n\nOr: Go in peace.",
          people: "Thanks be to God.",
        },
        latin: {
          celebrant:
            "Aut: Ite, missa est.\n\nAut: Ite in pace, glorificándo vita vestra Dóminum.\n\nAut: Ite in pace.",
          people: "Deo grátias.",
        },
        igbo: {
          celebrant:
            "Nke Mbụ: Jeenụ n'udo, Mass agwụla.\n\nMaọbụ: Jeenụ ma kpọsaa Oziọma nke Onyenweanyị.\n\nMaọbụ: Jeenụ n'udo, na-enye Onyenweanyị otito site na ndụ unu.\n\nMaọbụ: Jeenụ n'udo.",
          people: "Ekele dịrị Chineke.",
        },
      },
    ],
  },
];
