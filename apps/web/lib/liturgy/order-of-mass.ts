/**
 * The Complete Order of the Mass (Ordo Missae)
 * According to the Third Typical Edition of The Roman Missal (2010 Recognitio for Nigeria)
 * With Parallel English, Latin (Novus Ordo / Missale Romanum), and Igbo (Usoro nke Emume Mass).
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
    title: "Introductory Rites",
    latinTitle: "Ritus Initiales",
    igboTitle: "Usoro Mbido",
    rubric: "The priest and ministers enter while the Entrance Chant or Hymn is sung. All make the Sign of the Cross.",
    items: [
      {
        id: "sign-of-cross",
        section: "Introductory Rites",
        title: "Sign of the Cross",
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
        english: {
          celebrant: "The Lord be with you.",
          people: "And with your spirit.",
        },
        latin: {
          celebrant: "Dóminus vobíscum.",
          people: "Et cum spíritu tuo.",
        },
        igbo: {
          celebrant: "Onyenweanyị nọnyere unu.",
          people: "Ma nọnyekwara mmụọ gị.",
        },
      },
      {
        id: "confiteor",
        section: "Penitential Act",
        title: "Penitential Act (Confiteor)",
        rubric: "Brethren, let us acknowledge our sins, and so prepare ourselves to celebrate the sacred mysteries.",
        english: {
          celebrant: "I confess to almighty God...",
          people:
            "I confess to almighty God and to you, my brothers and sisters, that I have greatly sinned, in my thoughts and in my words, in what I have done and in what I have failed to do, through my fault, through my fault, through my most grievous fault; therefore I ask blessed Mary ever-Virgin, all the Angels and Saints, and you, my brothers and sisters, to pray for me to the Lord our God.",
        },
        latin: {
          celebrant: "Confíteor Deo omnipoténti...",
          people:
            "Confíteor Deo omnipoténti et vobis, fratres, quia peccávi nimis cogitatióne, verbo, ópere et omissióne: mea culpa, mea culpa, mea máxima culpa. Ideo precor beátam Maríam semper Vírginem, omnes Angelos et Sanctos, et vos, fratres, oráre pro me ad Dóminum Deum nostrum.",
        },
        igbo: {
          celebrant: "Ekwuputara m n'iru Chineke...",
          people:
            "Ekwuputara m n'iru Chineke Pụrụ Ime Ihe Niile, nakwa n'iru unu umunne m, na emehiela m nke ukwuu, n'echiche m, n'okwu ọnụ m, n'ihe m mere na n'ihe m hapụrụ emeghị: site na mmehie m, site na mmehie m, site na mmehie kachasị ukwuu nke m. Ya mere ario m Maria di asọ mgbe niile, ndi mụọ-ozi niile na ndi nsọ niile, na unu onwe unu umunne m, ka unu kpere m Chineke bu Onyenweanyi.",
        },
      },
      {
        id: "kyrie",
        section: "Penitential Act",
        title: "Kyrie, Eleison (Lord, Have Mercy)",
        english: {
          celebrant: "Lord, have mercy. / Christ, have mercy. / Lord, have mercy.",
          people: "Lord, have mercy. / Christ, have mercy. / Lord, have mercy.",
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
        title: "Gloria in Excelsis Deo (Glory to God)",
        rubric: "Sung or said on Sundays outside Advent and Lent, and on Solemnities and Feasts.",
        english: {
          celebrant: "Glory to God in the highest...",
          people:
            "Glory to God in the highest, and on earth peace to people of good will. We praise you, we bless you, we adore you, we glorify you, we give you thanks for your great glory, Lord God, heavenly King, O God, almighty Father. Lord Jesus Christ, Only Begotten Son, Lord God, Lamb of God, Son of the Father, you take away the sins of the world, have mercy on us; you take away the sins of the world, receive our prayer; you are seated at the right hand of the Father, have mercy on us. For you alone are the Holy One, you alone are the Lord, you alone are the Most High, Jesus Christ, with the Holy Spirit, in the glory of God the Father. Amen.",
        },
        latin: {
          celebrant: "Glória in excélsis Deo...",
          people:
            "Glória in excélsis Deo et in terra pax homínibus bonae voluntátis. Laudámus te, benedícimus te, adorámus te, glorificámus te, grátias ágimus tibi propter magnam glóriam tuam, Dómine Deus, Rex caeléstis, Deus Pater omnípotens. Dómine Fili unigénite, Iesu Christe, Dómine Deus, Agnus Dei, Fílius Patris, qui tollis peccáta mundi, miserére nobis; qui tollis peccáta mundi, súscipe deprecatiónem nostram. Qui sedes ad déxteram Patris, miserére nobis. Quóniam tu solus Sanctus, tu solus Dóminus, tu solus Altíssimus, Iesu Christe, cum Sancto Spíritu: in glória Dei Patris. Amen.",
        },
        igbo: {
          celebrant: "Otito diri Chineke n'elu kachasi elu...",
          people:
            "Otito diri Chineke n'elu kachasị elu, na n'ụwa udo diri mmadụ ndi ihe ha na-atọ Ya ụtọ. Anyị na-eto Gị, anyị na-agọzi Gị, anyị na-akpọ isiala nye Gị, anyị na-ebuli aha Gị elu, anyị na-ekele Gị maka nnukwu otito Gị, Onyenweanyị Chineke, Eze nke eligwe, Chineke Nna Pụrụ Ime Ihe Niile. Onyenweanyị Jesu Kraịst, Ọkpara mụrụ naanị Ya; Onyenweanyị Chineke, Nwa Atụrụ nke Chineke, Ọkpara nke Nna, Gị Onye na-ewepụ mmehie nke ụwa, mee ebere n'isi anyị; Gị Onye na-ewepụ mmehie nke ụwa, nara arịrịọ anyị; Gị Onye nọ n'aka nri nke Nna, mee ebere n'isi anyị. Maka na naanị Gị di nsọ, naanị Gị bu Onyenweanyị, naanị Gị bu Onye kachasị elu, Jesu Kraịst, Ya na Mmụọ Nsọ, n'otito nke Chineke Nna. Amen.",
        },
      },
    ],
  },

  // 2. LITURGY OF THE WORD
  {
    id: "liturgy-of-the-word",
    category: "word",
    categoryLabel: "Liturgy of the Word",
    title: "Liturgy of the Word",
    latinTitle: "Liturgia Verbi",
    igboTitle: "Ofufe Okwu Chineke",
    rubric: "God speaks to His people through Sacred Scripture, and the people respond with prayer and confession of faith.",
    items: [
      {
        id: "readings-dialogue",
        section: "Scripture Readings",
        title: "Conclusion of First and Second Readings",
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
          people: "Ekele diri Chineke.",
        },
      },
      {
        id: "gospel-dialogue",
        section: "Holy Gospel",
        title: "Proclamation of the Holy Gospel",
        english: {
          celebrant: "The Lord be with you. / A reading from the holy Gospel according to N.",
          people: "And with your spirit. / Glory to you, O Lord.",
        },
        latin: {
          celebrant: "Dóminus vobíscum. / Léctio sancti Evangélii secúndum N.",
          people: "Et cum spíritu tuo. / Glória tibi, Dómine.",
        },
        igbo: {
          celebrant: "Onyenweanyị nọnyere unu. / Akwụkwọ nke Oziọma dị asọ nke N. dere.",
          people: "Ma nọnyekwara mmụọ gị. / Otito diri Gị, O Onyenweanyị.",
        },
      },
      {
        id: "gospel-conclusion",
        section: "Holy Gospel",
        title: "Conclusion of the Gospel",
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
          people: "Otito diri Gị, Kraịst.",
        },
      },
      {
        id: "creed",
        section: "Profession of Faith",
        title: "The Nicene Creed (Credo)",
        rubric: "Said on Sundays and Solemnities. At the words 'and by the Holy Spirit was incarnate...' all bow.",
        english: {
          celebrant: "I believe in one God...",
          people:
            "I believe in one God, the Father almighty, maker of heaven and earth, of all things visible and invisible. I believe in one Lord Jesus Christ, the Only Begotten Son of God, born of the Father before all ages. God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through him all things were made. For us men and for our salvation he came down from heaven, and by the Holy Spirit was incarnate of the Virgin Mary, and became man. For our sake he was crucified under Pontius Pilate, he suffered death and was buried, and rose again on the third day in accordance with the Scriptures. He ascended into heaven and is seated at the right hand of the Father. He will come again in glory to judge the living and the dead and his kingdom will have no end. I believe in the Holy Spirit, the Lord, the giver of life, who proceeds from the Father and the Son, who with the Father and the Son is adored and glorified, who has spoken through the prophets. I believe in one, holy, catholic and apostolic Church. I confess one Baptism for the forgiveness of sins and I look forward to the resurrection of the dead and the life of the world to come. Amen.",
        },
        latin: {
          celebrant: "Credo in unum Deum...",
          people:
            "Credo in unum Deum, Patrem omnipoténtem, factórem caeli et terrae, visibílium ómnium et invisibílium. Et in unum Dóminum Iesum Christum, Fílium Dei unigénitum, et ex Patre natum ante ómnia saécula. Deum de Deo, lumen de lúmine, Deum verum de Deo vero, génitum, non factum, consubstantiálem Patri: per quem ómnia facta sunt. Qui propter nos hómines et propter nostram salútem descéndit de caelis. Et incarnátus est de Spíritu Sancto ex María Vírgine, et homo factus est. Crucifíxus étiam pro nobis sub Póntio Piláto; passus et sepúltus est, et resurréxit tértia die, secúndum Scriptúras, et ascéndit in caelum, sedet ad déxteram Patris. Et íterum ventúrus est cum glória, iudicáre vivos et mórtuos, cuius regni non erit finis. Et in Spíritum Sanctum, Dóminum et vivificántem: qui ex Patre Filióque procédit. Qui cum Patre et Fílio simul adorátur et conglorificátur: qui locútus est per prophétas. Et unam, sanctam, cathólicam et apostólicam Ecclésiam. Confíteor unum baptísma in remissiónem peccatórum. Et exspécto resurrectiónem mortuórum, et vitam ventúri saéculi. Amen.",
        },
        igbo: {
          celebrant: "Ekwere m na otu Chineke...",
          people:
            "Ekwere m na otu Chineke, bu Nna Pụrụ Ime Ihe Niile, Onye kere eligwe na ala, na ihe niile a na-ahu anya na nke a naghi ahu anya. Ekwere m na otu Onyenweanyị Jesu Kraịst, bu Ọkpara mụrụ naanị Ya nke Chineke, Onye Nna mụrụ tupu oge niile eruo. Chineke sitere na Chineke, Ihe sitere na Ihe, ezigbo Chineke sitere n'ezigbo Chineke; A mụrụ Ya amụ, emeghị Ya eme; Ya na Nna bu otu n'ihe ha bu: site n'aka Ya ka e jiri mee ihe niile. Ọ bu maka anyị bu mmadụ na maka nzọpụta anyị ka O jiri si n'eligwe rịdata; ma site n'ike nke Mmụọ Nsọ, O weere anụ ahụ n'afọ nke Maria di asọ, wee ghọọ mmadụ. A kpọgidere Ya n'obe maka anyị n'oge Pontius Pilate, O tara ahụhụ, a lie Ya, ma O biliri n'ọnwụ n'ụbọchị nke atọ dịka Akwụkwọ Nsọ siri kwuo. O rigoro n'eligwe, nọdụ n'aka nri nke Nna. Ọ ga-alọghachi n'otito ikpe ndi dị ndụ na ndi nwụrụ anwụ ikpe, Alaeze Ya agaghị enwe ọgwụgwụ. Ekwere m na Mmụọ Nsọ, bu Onyenweanyị na Onye na-enye ndụ, Onye si na Nna na Ọkpara pụta; Ya na Nna na Ọkpara ka a na-ekpere na-enye otito, Onye kwuru okwu site n'ọnụ ndi amụma. Ekwere m na Otu Nsọ Katọlik na Kọmunio nke ndi Ozi bu Nzukọ Kraịst. Ekwuputara m otu baptism maka mgbaghara mmehie, ana m ele anya mbilite n'ọnwụ nke ndi nwụrụ anwụ, na ndụ nke ụwa na-abịa. Amen.",
        },
      },
    ],
  },

  // 3. LITURGY OF THE EUCHARIST
  {
    id: "liturgy-of-the-eucharist",
    category: "eucharist",
    categoryLabel: "Liturgy of the Eucharist",
    title: "Liturgy of the Eucharist & Eucharistic Prayers",
    latinTitle: "Liturgia Eucharistica",
    igboTitle: "Ofufe Nsọ nke Eucharist",
    rubric: "The bread and wine are brought to the altar, blessed, and consecrated through the action of Christ and the power of the Holy Spirit.",
    items: [
      {
        id: "orate-fratres",
        section: "Offertory",
        title: "Orate, Fratres (Prayer over the Offerings)",
        english: {
          celebrant: "Pray, brethren, that my sacrifice and yours may be acceptable to God, the almighty Father.",
          people:
            "May the Lord accept the sacrifice at your hands for the praise and glory of his name, for our good and the good of all his holy Church.",
        },
        latin: {
          celebrant: "Oráte, fratres: ut meum ac vestrum sacrifícium acceptábile fiat apud Deum Patrem omnipoténtem.",
          people:
            "Suscípiat Dóminus sacrifícium de mánibus tuis ad laudem et glóriam nóminis sui, ad utilitátem quoque nostram totiúsque Ecclésiae suae sanctae.",
        },
        igbo: {
          celebrant: "Kpeenụ umunne m, ka aja m na nke unu bụrụ ihe na-atọ Chineke Nna Pụrụ Ime Ihe Niile ụtọ.",
          people:
            "Ka Onyenweanyị nara aja a n'aka gị, maka otito na ekele nke aha Ya, nakwa maka abamuru nke anyị onwe anyị na nke Nzukọ Nsọ Ya niile.",
        },
      },
      {
        id: "preface-dialogue",
        section: "Eucharistic Prayer",
        title: "Dialogue of the Preface (Sursum Corda)",
        english: {
          celebrant: "The Lord be with you. / Lift up your hearts. / Let us give thanks to the Lord our God.",
          people: "And with your spirit. / We lift them up to the Lord. / It is right and just.",
        },
        latin: {
          celebrant: "Dóminus vobíscum. / Sursum corda. / Grátias agámus Dómino Deo nostro.",
          people: "Et cum spíritu tuo. / Habémus ad Dóminum. / Dignum et iustum est.",
        },
        igbo: {
          celebrant: "Onyenweanyị nọnyere unu. / Welienụ obi unu elu. / Kelenụ Onyenweanyị bu Chineke anyị.",
          people: "Ma nọnyekwara mmụọ gị. / Anyị eweliela ha nye Onyenweanyị. / O kwesịrị, dịkwa mma.",
        },
      },
      {
        id: "sanctus",
        section: "Eucharistic Prayer",
        title: "Sanctus, Sanctus, Sanctus (Holy, Holy, Holy)",
        english: {
          celebrant: "Joining our voices with Angels and Archangels, we acclaim:",
          people:
            "Holy, Holy, Holy Lord God of hosts. Heaven and earth are full of your glory. Hosanna in the highest. Blessed is he who comes in the name of the Lord. Hosanna in the highest.",
        },
        latin: {
          celebrant: "Sine fine dicéntes:",
          people:
            "Sanctus, Sanctus, Sanctus Dóminus Deus Sábaoth. Pleni sunt caeli et terra glória tua. Hosánna in excélsis. Benedíctus qui venit in nómine Dómini. Hosánna in excélsis.",
        },
        igbo: {
          celebrant: "Anyị na-eso ndi mmụọ-ozi niile na-abụ abụ otito Gị sị:",
          people:
            "Dị Nsọ, Dị Nsọ, Dị Nsọ, Onyenweanyị Chineke nke igwe ndi agha. Eligwe na ala jula n'otito Gị. Hosanna n'elu kachasị elu. Onye a gọziri agọzi ka Onye ahụ na-abịa n'aha Onyenweanyị bu. Hosanna n'elu kachasị elu.",
        },
      },
      {
        id: "consecration-words",
        section: "Consecration",
        title: "Words of Consecration (Institution Narrative)",
        rubric: "The priest genuflects and shows the consecrated Host and Chalice to the faithful.",
        english: {
          celebrant:
            "TAKE THIS, ALL OF YOU, AND EAT OF IT, FOR THIS IS MY BODY, WHICH WILL BE GIVEN UP FOR YOU.\n\nTAKE THIS, ALL OF YOU, AND DRINK FROM IT, FOR THIS IS THE CHALICE OF MY BLOOD, THE BLOOD OF THE NEW AND ETERNAL COVENANT, WHICH WILL BE POURED OUT FOR YOU AND FOR MANY FOR THE FORGIVENESS OF SINS. DO THIS IN MEMORY OF ME.",
          people: "[Silent adoration and bowing of heads]",
        },
        latin: {
          celebrant:
            "ACCÍPITE ET MANDUCÁTE EX HOC OMNES: HOC EST ENIM CORPUS MEUM, QUOD PRO VOBIS TRADÉTUR.\n\nACCÍPITE ET BÍBITE EX EO OMNES: HIC EST ENIM CALIX SÁNGUINIS MEI NOVI ET AETÉRNI TESTAMÉNTI, QUI PRO VOBIS ET PRO MULTIS EFFUNDÉTUR IN REMISSIÓNEM PECCATÓRUM. HOC FÁCITE IN MEAM COMMEMORATIÓNEM.",
          people: "[Silent adoration and bowing of heads]",
        },
        igbo: {
          celebrant:
            "NARANỤ NKE A UNU NIILE TAA YA: N'IHI NA NKE A BỤ AHỤ M, NKE A GA-ENYEFA N'IHI UNU.\n\nNARANỤ NKE A UNU NIILE ṄỤỌ YA: N'IHI NA NKE A BỤ IKO NKE ỌBARA M, ỌBARA NKE ỌGBỤGBA-NDỤ ỌHỤRỤ NA NKE ETERNAL, NKE A GA-AWỤFỤ N'IHI UNU NA N'IHI ỌTỤTỤ MMADỤ MAKA MGBAGHARA MMEDỤ. NA-EMENỤ NKE A NA NCHETEKA NKE M.",
          people: "[Silent adoration and bowing of heads]",
        },
      },
      {
        id: "memorial-acclamation",
        section: "Eucharistic Prayer",
        title: "Memorial Acclamation (Mystery of Faith)",
        english: {
          celebrant: "The mystery of faith.",
          people:
            "We proclaim your Death, O Lord, and profess your Resurrection until you come again. (or: When we eat this Bread and drink this Cup, we proclaim your Death, O Lord, until you come again.)",
        },
        latin: {
          celebrant: "Mystérium fídei.",
          people:
            "Mortem tuam annuntiámus, Dómine, et tuam resurrectiónem confitémur, donec vénias.",
        },
        igbo: {
          celebrant: "Ihe omimi nke okwukwe anyị.",
          people:
            "Ọnwụ Gị ka anyị na-akpọsa, O Onyenweanyị, ma n'ọbịbịa Ya ka anyị na-ekwupụta mbilite n'ọnwụ Gị, ruo mgbe Ị ga-alọghachi.",
        },
      },
      {
        id: "doxology",
        section: "Eucharistic Prayer",
        title: "The Great Doxology & Amen",
        rubric: "The priest elevates the paten and chalice.",
        english: {
          celebrant:
            "Through him, and with him, and in him, O God, almighty Father, in the unity of the Holy Spirit, all glory and honour is yours, for ever and ever.",
          people: "Amen!",
        },
        latin: {
          celebrant:
            "Per ipsum, et cum ipso, et in ipso, est tibi Deo Patri omnipoténti, in unitáte Spíritus Sancti, omnis honor et glória per ómnia saécula saeculórum.",
          people: "Amen!",
        },
        igbo: {
          celebrant:
            "Site n'aka Ya, na n'ime Ya, na n'otu Ya, ka a na-enye Gị, Chineke Nna Pụrụ Ime Ihe Niile, n'otu nke Mmụọ Nsọ, otito na nsọpụrụ niile, ebe niile na mgbe niile ebiebi.",
          people: "Amen!",
        },
      },
    ],
  },

  // 4. COMMUNION RITE
  {
    id: "communion-rite",
    category: "communion",
    categoryLabel: "Communion Rite",
    title: "The Communion Rite",
    latinTitle: "Ritus Communionis",
    igboTitle: "Usoro Oriri Nsọ",
    rubric: "United as brothers and sisters in Christ, the faithful recite the Lord's Prayer, share the peace of Christ, and approach the altar for Holy Communion.",
    items: [
      {
        id: "pater-noster",
        section: "The Lord's Prayer",
        title: "The Lord's Prayer (Our Father / Pater Noster)",
        english: {
          celebrant: "At the Saviour's command and formed by divine teaching, we dare to say:",
          people:
            "Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.\n\n[After Embolism]: For the kingdom, the power and the glory are yours now and for ever.",
        },
        latin: {
          celebrant: "Praeceptis salutaribus moniti, et divina institutione formati, audemus dicere:",
          people:
            "Pater noster, qui es in caelis: sanctificétur nomen tuum; advéniat regnum tuum; fiat volúntas tua, sicut in caelo et in terra. Panem nostrum cotidiánum da nobis hódie; et dimítte nobis débita nostra, sicut et nos dimíttimus debitóribus nostris; et ne nos indúcas in tentatiónem; sed líbera nos a malo.\n\n[Quia tuum est regnum, et potéstas, et glória in saécula.]",
        },
        igbo: {
          celebrant: "Dika Onyenzọpụta anyị siri kụzie anyị, anyị na-anwa anwa ikpe sị:",
          people:
            "Nna anyị Nọ n'eligwe, ka e doo aha Gị nsọ; ka Alaeze Gị bịa; ka e mee uche Gị n'ụwa ka e si eme ya n'eligwe. Nye anyị taa nri nke ụbọchị anyị; gbaghara anyị mmehie anyị, dịka anyị si agbaghara ndi mehiere anyị; ekwela ka anyị banye na ọnwụnwa, kama zọpụta anyị n'aka ajọ ihe.\n\n[Maka na Alaeze, ike na otito bu nke Gị ugbua na mgbe ebiebi.]",
        },
      },
      {
        id: "sign-of-peace",
        section: "Sign of Peace",
        title: "The Sign of Peace",
        english: {
          celebrant: "The peace of the Lord be with you always.",
          people: "And with your spirit. (Let us offer each other the sign of peace.)",
        },
        latin: {
          celebrant: "Pax Dómini sit semper vobíscum.",
          people: "Et cum spíritu tuo. (Offérte vobis pacem.)",
        },
        igbo: {
          celebrant: "Udo nke Onyenweanyị nọnyere unu mgbe niile.",
          people: "Ma nọnyekwara mmụọ gị. (Kelenụ onwe unu n'udo nke Kraịst.)",
        },
      },
      {
        id: "agnus-dei",
        section: "Fraction of Bread",
        title: "Agnus Dei (Lamb of God)",
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
          celebrant: "Ka mmekọ nke anụ ahụ na ọbara nke Onyenweanyị Jesu Kraịst wetara anyị ndi na-anara ya ndụ ebighị ebi.",
          people:
            "Nwa Atụrụ nke Chineke, Onye na-ewepụ mmehie nke ụwa: mee ebere n'isi anyị.\nNwa Atụrụ nke Chineke, Onye na-ewepụ mmehie nke ụwa: mee ebere n'isi anyị.\nNwa Atụrụ nke Chineke, Onye na-ewepụ mmehie nke ụwa: nye anyị udo.",
        },
      },
      {
        id: "ecce-agnus-dei",
        section: "Invitation to Communion",
        title: "Domine, Non Sum Dignus",
        english: {
          celebrant: "Behold the Lamb of God, behold him who takes away the sins of the world. Blessed are those called to the supper of the Lamb.",
          people:
            "Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed.",
        },
        latin: {
          celebrant: "Ecce Agnus Dei, ecce qui tollit peccáta mundi. Beáti qui ad cenam Agni vocáti sunt.",
          people:
            "Dómine, non sum dignus, ut intres sub tectum meum, sed tantum dic verbo et sanábitur ánima mea.",
        },
        igbo: {
          celebrant: "Lee Nwa Atụrụ nke Chineke, lee Onye na-ewepụ mmehie nke ụwa. Ngọzi diri ndi a kpọrọ na nri anyasị nke Nwa Atụrụ.",
          people:
            "Onyenweanyị, erughị m eru ka Ị bata n'okpuru ụlọ m, kama kwuo naanị otu okwu, mkpụrụobi m ga-adị mma.",
        },
      },
    ],
  },

  // 5. CONCLUDING RITES
  {
    id: "concluding-rites",
    category: "concluding",
    categoryLabel: "Concluding Rites",
    title: "Concluding Rites & Dismissal",
    latinTitle: "Ritus Conclusionis",
    igboTitle: "Usoro Mmechi",
    rubric: "The priest imparts the final blessing and sends the faithful forth to love and serve the Lord in their daily vocations.",
    items: [
      {
        id: "final-blessing",
        section: "Dismissal",
        title: "Solemn Blessing",
        english: {
          celebrant: "The Lord be with you. / May almighty God bless you, the Father, and the Son, and the Holy Spirit.",
          people: "And with your spirit. / Amen.",
        },
        latin: {
          celebrant: "Dóminus vobíscum. / Benedícat vos omnípotens Deus, Pater, et Fílius, et Spíritus Sanctus.",
          people: "Et cum spíritu tuo. / Amen.",
        },
        igbo: {
          celebrant: "Onyenweanyị nọnyere unu. / Ka Chineke Pụrụ Ime Ihe Niile gọzie unu, Nna, na Ọkpara, na Mmụọ Nsọ.",
          people: "Ma nọnyekwara mmụọ gị. / Amen.",
        },
      },
      {
        id: "dismissal",
        section: "Dismissal",
        title: "The Dismissal",
        english: {
          celebrant: "Go forth, the Mass is ended. (or: Go in peace, glorifying the Lord by your life.)",
          people: "Thanks be to God.",
        },
        latin: {
          celebrant: "Ite, missa est.",
          people: "Deo grátias.",
        },
        igbo: {
          celebrant: "Jeenụ n'udo, Mass agwụla. (maọbụ: Jeenụ n'udo na-enye Onyenweanyị otito site na ndụ unu.)",
          people: "Ekele diri Chineke.",
        },
      },
    ],
  },
];
