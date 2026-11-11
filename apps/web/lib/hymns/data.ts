/**
 * Catholic Hymnary & Liturgical Music Catalog
 * Includes Entrance, Kyrie, Gloria, Credo, Offertory, Sanctus, Agnus Dei,
 * Communion, Thanksgiving, and Dismissal hymns in English, Igbo, and Latin.
 */

export type HymnCategory =
  | "entrance"
  | "kyrie"
  | "gloria"
  | "credo"
  | "offertory"
  | "sanctus"
  | "memorial"
  | "agnus_dei"
  | "communion"
  | "thanksgiving"
  | "dismissal";

export interface Hymn {
  id: string;
  number?: string;
  title: string;
  category: HymnCategory;
  categoryLabel: string;
  language: "English" | "Igbo" | "Latin" | "Bilingual";
  tune?: string;
  refrain?: string;
  verses: string[];
}

export const CATHOLIC_HYMNS: Hymn[] = [
  // 1. ENTRANCE HYMNS
  {
    id: "ent-001",
    number: "H-01",
    title: "All People That on Earth Do Dwell",
    category: "entrance",
    categoryLabel: "Entrance Hymn",
    language: "English",
    tune: "Old 100th (LM)",
    verses: [
      "All people that on earth do dwell,\nSing to the Lord with cheerful voice;\nHim serve with fear, His praise forth tell,\nCome ye before Him and rejoice.",
      "The Lord, ye know, is God indeed,\nWithout our aid He did us make;\nWe are His folk, He doth us feed,\nAnd for His sheep He doth us take.",
      "O enter then His gates with praise,\nApproach with joy His courts unto;\nPraise, laud, and bless His Name always,\nFor it is seemly so to do.",
      "For why? The Lord our God is good;\nHis mercy is for ever sure;\nHis truth at all times firmly stood,\nAnd shall from age to age endure.",
      "To Father, Son, and Holy Ghost,\nThe God Whom heaven and earth adore,\nFrom men and from the angel-host\nBe praise and glory evermore. Amen.",
    ],
  },
  {
    id: "ent-002",
    number: "H-02",
    title: "Holy, Holy, Holy! Lord God Almighty",
    category: "entrance",
    categoryLabel: "Entrance Hymn",
    language: "English",
    tune: "Nicaea (11.12.12.10)",
    verses: [
      "Holy, Holy, Holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee;\nHoly, Holy, Holy! Merciful and Mighty!\nGod in Three Persons, blessed Trinity!",
      "Holy, Holy, Holy! All the saints adore Thee,\nCasting down their golden crowns around the glassy sea;\nCherubim and seraphim falling down before Thee,\nWhich wert, and art, and evermore shalt be.",
      "Holy, Holy, Holy! Though the darkness hide Thee,\nThough the eye of sinful man Thy glory may not see,\nOnly Thou art holy; there is none beside Thee,\nPerfect in power, in love, and purity.",
      "Holy, Holy, Holy! Lord God Almighty!\nAll Thy works shall praise Thy Name, in earth, and sky, and sea;\nHoly, Holy, Holy! Merciful and Mighty!\nGod in Three Persons, blessed Trinity!",
    ],
  },
  {
    id: "ent-003",
    number: "H-03",
    title: "K'Anyị Nyenụ Ya Ekele (Igbo Entrance)",
    category: "entrance",
    categoryLabel: "Entrance Hymn",
    language: "Igbo",
    refrain: "K'anyị nyenụ Ya ekele, k'anyị nyenụ Ya otito;\nỌ dị mma, Ọ dị mma, Chineke anyị dị mma!",
    verses: [
      "Bịanụ k'anyị banye n'ụlọ nsọ Ya na-eti mkpu ọṅụ,\nK'anyị sekpuru n'ala nye Eze anyị na Onye kere anyị.",
      "N'ihi na Ọ bụ Ya bụ Chineke anyị, anyị bụkwa atụrụ Ya,\nAtụrụ Ọ na-azụ n'ọhịa ọma Ya mgbe niile.",
      "Bịanụ k'anyị gaa n'iru Ya n'abụ ekele,\nK'anyị were ukwe ụtọ na-enye Ya otito n'elu kachasị elu.",
    ],
  },
  {
    id: "ent-004",
    number: "H-04",
    title: "Praise to the Lord, the Almighty",
    category: "entrance",
    categoryLabel: "Entrance Hymn",
    language: "English",
    tune: "Lobe den Herren (14.14.4.7.8)",
    verses: [
      "Praise to the Lord, the Almighty, the King of creation!\nO my soul, praise Him, for He is thy health and salvation!\nAll ye who hear, now to His temple draw near;\nJoin me in glad adoration!",
      "Praise to the Lord, Who o'er all things so wondrously reigneth,\nShelters thee under His wings, yea, so gently sustaineth!\nHast thou not seen how thy desires e'er have been\nGranted in what He ordaineth?",
      "Praise to the Lord, Who doth prosper thy work and defend thee;\nSurely His goodness and mercy here daily attend thee.\nPonder anew what the Almighty can do,\nIf with His love He befriend thee.",
      "Praise to the Lord, O let all that is in me adore Him!\nAll that hath life and breath, come now with praises before Him.\nLet the Amen sound from His people again,\nGladly for aye we adore Him.",
    ],
  },

  // 2. KYRIE ELEISON
  {
    id: "kyr-001",
    number: "K-01",
    title: "Kyrie Eleison (Missa de Angelis)",
    category: "kyrie",
    categoryLabel: "Kyrie Eleison",
    language: "Latin",
    verses: [
      "Kýrie, eléison. (Lord, have mercy)\nKýrie, eléison.",
      "Christe, eléison. (Christ, have mercy)\nChriste, eléison.",
      "Kýrie, eléison. (Lord, have mercy)\nKýrie, eléison.",
    ],
  },
  {
    id: "kyr-002",
    number: "K-02",
    title: "Onyenweanyị Mee Ebere (Igbo)",
    category: "kyrie",
    categoryLabel: "Kyrie Eleison",
    language: "Igbo",
    verses: [
      "Onyenweanyị, mee ebere. (Onyenweanyị, mee ebere)\nOnyenweanyị, mee ebere n'isi anyị.",
      "Kraịst, mee ebere. (Kraịst, mee ebere)\nKraịst, mee ebere n'isi anyị.",
      "Onyenweanyị, mee ebere. (Onyenweanyị, mee ebere)\nOnyenweanyị, mee ebere n'isi anyị.",
    ],
  },

  // 3. GLORIA
  {
    id: "glo-001",
    number: "G-01",
    title: "Glória in Excelsis Deo (Missa de Angelis)",
    category: "gloria",
    categoryLabel: "Gloria",
    language: "Latin",
    verses: [
      "Glória in excélsis Deo\net in terra pax homínibus bonae voluntátis.\nLaudámus te, benedícimus te,\nadorámus te, glorificámus te,\ngrátias ágimus tibi propter magnam glóriam tuam.",
      "Dómine Deus, Rex caeléstis, Deus Pater omnípotens.\nDómine Fili unigénite, Iesu Christe,\nDómine Deus, Agnus Dei, Fílius Patris,\nqui tollis peccáta mundi, miserére nobis.",
      "Qui tollis peccáta mundi, súscipe deprecatiónem nostram.\nQui sedes ad déxteram Patris, miserére nobis.\nQuóniam tu solus Sanctus, tu solus Dóminus,\ntu solus Altíssimus, Iesu Christe,\ncum Sancto Spíritu: in glória Dei Patris. Amen.",
    ],
  },
  {
    id: "glo-002",
    number: "G-02",
    title: "Otito Diri Chineke n'Elu Kachasị Elu (Igbo Gloria)",
    category: "gloria",
    categoryLabel: "Gloria",
    language: "Igbo",
    refrain: "Otito diri Chineke n'elu kachasị elu!\nNa n'ụwa udo diri mmadụ ndi obi ha dị mma!",
    verses: [
      "Anyị na-eto Gị, anyị na-agọzi Gị, anyị na-akpọ isiala nye Gị,\nAnyị na-ebuli aha Gị elu, anyị na-ekele Gị maka nnukwu otito Gị.",
      "Onyenweanyị Chineke, Eze nke eligwe, Chineke Nna Pụrụ Ime Ihe Niile,\nOnyenweanyị Jesu Kraịst, Ọkpara mụrụ naanị Ya.",
      "Onyenweanyị Chineke, Nwa Atụrụ nke Chineke, Ọkpara nke Nna,\nGị Onye na-ewepụ mmehie nke ụwa, mee ebere n'isi anyị.",
      "Maka na naanị Gị di nsọ, naanị Gị bu Onyenweanyị,\nNaanị Gị bu Onye kachasị elu, Jesu Kraịst, Ya na Mmụọ Nsọ, n'otito nke Chineke Nna. Amen.",
    ],
  },

  // 4. CREDO
  {
    id: "crd-001",
    number: "C-01",
    title: "Credo in Unum Deum (Credo III)",
    category: "credo",
    categoryLabel: "Credo (Nicene Creed)",
    language: "Latin",
    verses: [
      "Credo in unum Deum, Patrem omnipoténtem,\nfactórem caeli et terrae, visibílium ómnium et invisibílium.",
      "Et in unum Dóminum Iesum Christum, Fílium Dei unigénitum,\net ex Patre natum ante ómnia saécula.\nDeum de Deo, lumen de lúmine, Deum verum de Deo vero,\ngénitum, non factum, consubstantiálem Patri: per quem ómnia facta sunt.",
      "Et incarnátus est de Spíritu Sancto ex María Vírgine, et homo factus est.\nCrucifíxus étiam pro nobis sub Póntio Piláto; passus et sepúltus est,\net resurréxit tértia die, secúndum Scriptúras.",
      "Et in Spíritum Sanctum, Dóminum et vivificántem: qui ex Patre Filióque procédit.\nConfíteor unum baptísma in remissiónem peccatórum.\nEt exspécto resurrectiónem mortuórum, et vitam ventúri saéculi. Amen.",
    ],
  },

  // 5. OFFERTORY HYMNS
  {
    id: "off-001",
    number: "O-01",
    title: "Take Our Bread, We Ask You",
    category: "offertory",
    categoryLabel: "Offertory Hymn",
    language: "English",
    refrain: "Take our bread, we ask You, take our hearts, we love You,\nTake our lives, oh Father, we are Yours, we are Yours.",
    verses: [
      "Yours as we stand at the table You set,\nYours as we eat the bread our hearts can't forget.\nWe are the sign of Your life with us yet;\nWe are Yours, we are Yours.",
      "Your holy people standing washed in Your blood,\nSpirit-filled, called by Name, living in Your love.\nTake our lives, our labour, all that we are;\nWe are Yours, we are Yours.",
    ],
  },
  {
    id: "off-002",
    number: "O-02",
    title: "What Shall I Render to the Lord",
    category: "offertory",
    categoryLabel: "Offertory Hymn",
    language: "English",
    tune: "Evan (CM)",
    verses: [
      "What shall I render to the Lord for all His gifts to me?\nThe cup of blessing I will take and call upon His Name.",
      "Dear in the presence of the Lord is His saints' mortal hour;\nYour servant, Lord, Your servant I; You have set me free.",
      "A sacrifice of praise I'll give and call upon the Lord;\nMy vows unto the Lord I'll pay before His people all.",
    ],
  },
  {
    id: "off-003",
    number: "O-03",
    title: "Chineke Nna Nara Aja Anyị (Igbo Offertory)",
    category: "offertory",
    categoryLabel: "Offertory Hymn",
    language: "Igbo",
    refrain: "Chineke Nna, nara aja anyị ji obi dị ọcha na-enye Gị,\nWere ya gọzie anyị, were ya zọpụta anyị.",
    verses: [
      "Lee achịcha anyị na-ebute n'iru Gị,\nỌ bụ mkpụrụ nke ubi na ọrụ aka mmadụ,\nKa ọ ghọọrọ anyị nri na-enye ndụ ebighị ebi.",
      "Lee mmanya vine a gwakọtara na mmiri,\nKa ọ ghọọrọ anyị ọbara nke Ọkpara Gị Jesu Kraịst,\nMaka mgbaghara mmehie nke ụwa niile.",
      "Nara onyinye anyị na-ebute n'iru ebe ịchụ-aja Gị,\nNye anyị ngozi Gị, chekwaba ezinụlọ anyị niile.",
    ],
  },
  {
    id: "off-004",
    number: "O-04",
    title: "Accept, Almighty Father, These Gifts",
    category: "offertory",
    categoryLabel: "Offertory Hymn",
    language: "English",
    verses: [
      "Accept, Almighty Father, these gifts of bread and wine,\nWhich now we bring before Thee, and offer at Thy shrine.",
      "With these we bring our sorrow for sins that we have done,\nUnite them with the Passion of Thy beloved Son.",
      "Transform these earthly tokens into His Flesh and Blood,\nAnd feed our hungry spirits with pure celestial food.",
    ],
  },

  // 6. SANCTUS
  {
    id: "san-001",
    number: "S-01",
    title: "Sanctus, Sanctus, Sanctus (Missa de Angelis)",
    category: "sanctus",
    categoryLabel: "Sanctus (Holy, Holy)",
    language: "Latin",
    verses: [
      "Sanctus, Sanctus, Sanctus Dóminus Deus Sábaoth.\nPleni sunt caeli et terra glória tua.\nHosánna in excélsis.",
      "Benedíctus qui venit in nómine Dómini.\nHosánna in excélsis.",
    ],
  },
  {
    id: "san-002",
    number: "S-02",
    title: "Dị Nsọ, Dị Nsọ, Dị Nsọ (Igbo)",
    category: "sanctus",
    categoryLabel: "Sanctus (Holy, Holy)",
    language: "Igbo",
    verses: [
      "Dị Nsọ, Dị Nsọ, Dị Nsọ, Onyenweanyị Chineke nke igwe ndi agha!\nEligwe na ala jula n'otito Gị!\nHosanna n'elu kachasị elu!",
      "Ngọzi diri Onye ahụ na-abịa n'aha Onyenweanyị!\nHosanna n'elu kachasị elu!",
    ],
  },

  // 7. MEMORIAL ACCLAMATION
  {
    id: "mem-001",
    number: "M-01",
    title: "Memorial Acclamation (Christ Has Died)",
    category: "memorial",
    categoryLabel: "Memorial Acclamation",
    language: "English",
    verses: [
      "We proclaim your Death, O Lord,\nand profess your Resurrection\nuntil you come again.",
      "(Alternative):\nWhen we eat this Bread and drink this Cup,\nwe proclaim your Death, O Lord,\nuntil you come again.",
    ],
  },
  {
    id: "mem-002",
    number: "M-02",
    title: "Ihe Omimi nke Okwukwe (Igbo)",
    category: "memorial",
    categoryLabel: "Memorial Acclamation",
    language: "Igbo",
    verses: [
      "Ọnwụ Gị ka anyị na-akpọsa, O Onyenweanyị,\nMa n'ọbịbịa Ya ka anyị na-ekwupụta mbilite n'ọnwụ Gị,\nRuo mgbe Ị ga-alọghachi.",
    ],
  },

  // 8. AGNUS DEI
  {
    id: "agn-001",
    number: "A-01",
    title: "Agnus Dei (Missa de Angelis)",
    category: "agnus_dei",
    categoryLabel: "Agnus Dei (Lamb of God)",
    language: "Latin",
    verses: [
      "Agnus Dei, qui tollis peccáta mundi: miserére nobis.",
      "Agnus Dei, qui tollis peccáta mundi: miserére nobis.",
      "Agnus Dei, qui tollis peccáta mundi: dona nobis pacem.",
    ],
  },
  {
    id: "agn-002",
    number: "A-02",
    title: "Nwa Atụrụ nke Chineke (Igbo)",
    category: "agnus_dei",
    categoryLabel: "Agnus Dei (Lamb of God)",
    language: "Igbo",
    verses: [
      "Nwa Atụrụ nke Chineke, Onye na-ewepụ mmehie nke ụwa: mee ebere n'isi anyị.",
      "Nwa Atụrụ nke Chineke, Onye na-ewepụ mmehie nke ụwa: mee ebere n'isi anyị.",
      "Nwa Atụrụ nke Chineke, Onye na-ewepụ mmehie nke ụwa: nye anyị udo.",
    ],
  },

  // 9. COMMUNION HYMNS
  {
    id: "com-001",
    number: "CO-01",
    title: "Soul of My Saviour (Anima Christi)",
    category: "communion",
    categoryLabel: "Communion Hymn",
    language: "English",
    tune: "Anima Christi (10.10.10.10)",
    verses: [
      "Soul of my Saviour, sanctify my breast;\nBody of Christ, be Thou my saving guest;\nBlood of my Saviour, bathe me in Thy tide,\nWash me with water flowing from Thy side.",
      "Strength and protection may Thy Passion be;\nO Blessed Jesus, hear and answer me;\nDeep in Thy wounds, Lord, hide and shelter me;\nSo shall I never, never part from Thee.",
      "Guard and defend me from the foe malign;\nIn death's dread moments make me only Thine;\nCall me and bid me come to Thee on high,\nWhere I may praise Thee with Thy saints for aye. Amen.",
    ],
  },
  {
    id: "com-002",
    number: "CO-02",
    title: "I Am the Bread of Life",
    category: "communion",
    categoryLabel: "Communion Hymn",
    language: "English",
    refrain: "And I will raise you up, and I will raise you up,\nAnd I will raise you up on the last day.",
    verses: [
      "I am the Bread of life.\nHe who comes to Me shall not hunger;\nHe who believes in Me shall not thirst.\nNo one can come to Me unless the Father beckons.",
      "The bread that I will give is My flesh for the life of the world,\nAnd he who eats of this bread, he shall live for ever,\nHe shall live for ever.",
      "Unless you eat of the flesh of the Son of Man,\nAnd drink of His blood, and drink of His blood,\nYou shall not have life within you.",
      "I am the resurrection, I am the life.\nHe who believes in Me, even if he die,\nHe shall live for ever.",
    ],
  },
  {
    id: "com-003",
    number: "CO-03",
    title: "Sweet Sacrament Divine",
    category: "communion",
    categoryLabel: "Communion Hymn",
    language: "English",
    verses: [
      "Sweet Sacrament divine, hid in Thy earthly home,\nLo, round Thy lowly shrine, with suppliant hearts we come;\nJesus, to Thee our voice we raise in songs of love and heartfelt praise:\nSweet Sacrament divine, sweet Sacrament divine.",
      "Sweet Sacrament of peace, dear home of every good,\nHere may our troubles cease in Thy refreshing flood;\nHere may we find our heart's release, and gentle calm that cannot cease:\nSweet Sacrament of peace, sweet Sacrament of peace.",
      "Sweet Sacrament of rest, ark from the stormy blast,\nHere on the loving breast of Christ our Lord at last;\nSafe in the shelter of Thy grace, we find a holy resting place:\nSweet Sacrament of rest, sweet Sacrament of rest.",
    ],
  },
  {
    id: "com-004",
    number: "CO-04",
    title: "Nri nke Eligwe (Igbo Communion)",
    category: "communion",
    categoryLabel: "Communion Hymn",
    language: "Igbo",
    refrain: "Nri nke eligwe, nri nke ndi mmụọ-ozi,\nJesu Kraịst n'onwe Ya na-enye anyị onwe Ya.",
    verses: [
      "Bịanụ ndi niile bu ibu dị arọ,\nBịakwutenụ Ya, Ọ ga-enye unu izuike na ndụ.",
      "Ahụ Ya bụ ezigbo nri, ọbara Ya bụ ezigbo ihe ọṅụṅụ;\nOnye na-eri Ya ga-enwe ndụ ebighị ebi.",
      "O Onyenweanyị, anyị erughị eru ka Ị bata n'obi anyị,\nKama kwuo okwu ma anyị ga-adị mma.",
    ],
  },

  // 10. THANKSGIVING HYMNS
  {
    id: "thk-001",
    number: "T-01",
    title: "Now Thank We All Our God",
    category: "thanksgiving",
    categoryLabel: "Thanksgiving Hymn",
    language: "English",
    tune: "Nun Danket (6.7.6.7.6.6.6.6)",
    verses: [
      "Now thank we all our God with heart and hands and voices,\nWho wondrous things has done, in Whom His world rejoices;\nWho from our mothers' arms has blessed us on our way\nWith countless gifts of love, and still is ours today.",
      "O may this bounteous God through all our life be near us,\nWith ever joyful hearts and blessed peace to cheer us;\nAnd keep us in His grace, and guide us when perplexed;\nAnd free us from all ills in this world and the next.",
      "All praise and thanks to God the Father now be given;\nThe Son, and Him Who reigns with Them in highest heaven;\nThe one eternal God, Whom earth and heaven adore;\nFor thus it was, is now, and shall be evermore. Amen.",
    ],
  },

  // 11. DISMISSAL & MARIAN HYMNS
  {
    id: "dis-001",
    number: "D-01",
    title: "Great Mother of Perpetual Help (Chaplaincy Patronal Hymn)",
    category: "dismissal",
    categoryLabel: "Recessional & Marian Hymn",
    language: "English",
    refrain: "Mother of Perpetual Help, protect thy children here;\nIn every trial, grief, and pain, be thou forever near!",
    verses: [
      "Great Mother of Perpetual Help, to thee we lift our eyes;\nBehold us at thy sacred shrine, and hear our humble cries!\nThou art the refuge of the sick, the comfort of the poor,\nIn all our struggles here below, thy helping love is sure.",
      "Thou holdest in thy tender arms the Saviour and our King,\nWho bids us to thy loving heart our every sorrow bring;\nLook down with gentle mercy now on this our hospital shrine,\nAnd bless our doctors, nurses, sick, with healing love divine.",
      "When earthly life is drawing near its sunset and its close,\nBe by our side, dear Mother blest, to grant our souls repose;\nLead us to Jesus Christ thy Son, upon the heavenly shore,\nWhere we with all the saints shall praise His Name forevermore. Amen.",
    ],
  },
  {
    id: "dis-002",
    number: "D-02",
    title: "Faith of Our Fathers",
    category: "dismissal",
    categoryLabel: "Recessional Hymn",
    language: "English",
    refrain: "Faith of our fathers, holy faith!\nWe will be true to thee till death.",
    verses: [
      "Faith of our fathers, living still, in spite of dungeon, fire, and sword;\nO how our hearts beat high with joy whene'er we hear that glorious word!\nFaith of our fathers, holy faith! We will be true to thee till death.",
      "Our fathers, chained in prisons dark, were still in heart and conscience free;\nHow sweet would be their children's fate, if they, like them, could die for thee!\nFaith of our fathers, holy faith! We will be true to thee till death.",
      "Faith of our fathers, we will love both friend and foe in all our strife;\nAnd preach thee, too, as love knows how, by kindly words and virtuous life.\nFaith of our fathers, holy faith! We will be true to thee till death.",
    ],
  },
  {
    id: "dis-003",
    number: "D-03",
    title: "Daily, Daily Sing to Mary (Omni Die Dic Mariae)",
    category: "dismissal",
    categoryLabel: "Marian Hymn",
    language: "English",
    verses: [
      "Daily, daily sing to Mary, sing, my soul, her praises due;\nAll her feasts, her actions worship, with the heart's devotion true.\nLost in wond'ring contemplation, be her majesty confessed;\nCall her Mother, call her Virgin, happy Mother, Virgin blest.",
      "She is mighty to deliver; call upon her, at thy need;\nFor the scathe of worldly pleasure, with her counsel she will lead.\nSeek her aid in tribulation, flee to her with confidence;\nShe will never fail her children, their protection and defense.",
      "Sing, my tongue, the Virgin's honours, who for us her Saviour bore;\nFor the matching of her graces, is a ground for praising more.\nOn the cross her dying Jesus, gave her to us for our own;\nLet us love her, let us serve her, standing near the eternal throne. Amen.",
    ],
  },
  {
    id: "dis-004",
    number: "D-04",
    title: "Ka Anyị Jee n'Udo nke Kraịst (Igbo Dismissal)",
    category: "dismissal",
    categoryLabel: "Recessional Hymn",
    language: "Igbo",
    refrain: "Ka anyị jee n'udo nke Kraịst, ka anyị jee na-ekwupụta Oziọma Ya!",
    verses: [
      "Mass agwụla ma ofufe anyị na-aga n'iru n'ụwa,\nK'anyị buru ịhụnanya Kraịst gaa nye mmadụ niile.",
      "Maria Nne anyị nke Enyemaka Ebighị Ebi,\nNọnyere anyị na ndụ anyị niile, ruo mgbe anyị ga-erute n'eligwe. Amen.",
    ],
  },
];

export interface MassHymnSelection {
  date: string;
  massName?: string;
  entranceId: string;
  kyrieId?: string;
  gloriaId?: string;
  credoId?: string;
  offertoryId: string;
  sanctusId?: string;
  memorialId?: string;
  agnusDeiId?: string;
  communionId: string;
  thanksgivingId?: string;
  dismissalId: string;
}

export const DEFAULT_HYMN_SELECTION: MassHymnSelection = {
  date: new Date().toISOString().split("T")[0],
  massName: "Holy Mass",
  entranceId: "ent-001",
  kyrieId: "kyr-001",
  gloriaId: "glo-001",
  credoId: "crd-001",
  offertoryId: "off-001",
  sanctusId: "san-001",
  memorialId: "mem-001",
  agnusDeiId: "agn-001",
  communionId: "com-001",
  thanksgivingId: "thk-001",
  dismissalId: "dis-001",
};

export const HYMN_CATEGORY_LABELS: Record<HymnCategory, string> = {
  entrance: "Entrance Hymn",
  kyrie: "Kyrie Eleison",
  gloria: "Gloria in Excelsis",
  credo: "Credo (Creed)",
  offertory: "Offertory Hymn",
  sanctus: "Sanctus (Holy, Holy)",
  memorial: "Memorial Acclamation",
  agnus_dei: "Agnus Dei (Lamb of God)",
  communion: "Communion Hymn",
  thanksgiving: "Thanksgiving Hymn",
  dismissal: "Dismissal & Marian Hymn",
};
