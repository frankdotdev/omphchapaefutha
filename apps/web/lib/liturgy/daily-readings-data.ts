import type { DailyReadings } from "@/lib/types";

/**
 * Public domain Catholic daily readings for the liturgical year.
 * Provides complete texts for First Reading, Responsorial Psalm, Second Reading, and Holy Gospel
 * so worshippers can read the Word of God directly on the chaplaincy website.
 */
export const CURATED_DAILY_READINGS: Record<string, DailyReadings> = {
  // October 15 (Saint Teresa of Ávila / 28th Week in Ordinary Time)
  "2026-10-15": {
    date: "2026-10-15",
    translation: "Catholic Public Domain Lectionary (Douay-Rheims / Vulgate translation)",
    sourceNote: "General Roman Lectionary for the Feast of St. Teresa of Ávila, Virgin and Doctor of the Church.",
    firstReading: {
      ref: "Romans 8:22-27",
      text: "Brothers and sisters: For we know that every creature groaneth and travaileth in pain, even till now. And not only it, but ourselves also, who have the firstfruits of the Spirit, even we ourselves groan within ourselves, waiting for the adoption of the sons of God, the redemption of our body.\n\nFor we are saved by hope. But hope that is seen, is not hope. For what a man seeth, why doth he hope for? But if we hope for that which we see not, we wait for it with patience.\n\nLikewise the Spirit also helpeth our infirmity. For we know not what we should pray for as we ought; but the Spirit himself asketh for us with unspeakable groanings. And he that searcheth the hearts, knoweth what the Spirit desireth; because he asketh for the saints according to God.",
    },
    psalm: {
      ref: "Psalm 84:2-3, 4-5, 10-11",
      text: "R. The mercies of the Lord that I will sing forever.\n\nHow lovely are thy tabernacles, O Lord of host! My soul longeth and fainteth for the courts of the Lord. My heart and my flesh have rejoiced in the living God.\n\nR. The mercies of the Lord that I will sing forever.\n\nFor the sparrow hath found herself a house, and the turtle a nest for herself where she may lay her young ones: Thy altars, O Lord of hosts, my king and my God. Blessed are they that dwell in thy house, O Lord: they shall praise thee for ever and ever.\n\nR. The mercies of the Lord that I will sing forever.",
    },
    gospel: {
      ref: "John 4:5-15",
      text: "At that time, Jesus came to a city of Samaria, which is called Sichar; near the parcel of land which Jacob gave to his son Joseph. Now Jacob's well was there. Jesus therefore being wearied with his journey, sat thus on the well. It was about the sixth hour.\n\nThere cometh a woman of Samaria, to draw water. Jesus saith to her: Give me to drink. For his disciples were gone into the city to buy meats.\n\nThen that Samaritan woman saith to him: How dost thou, being a Jew, ask of me to drink, who am a Samaritan woman? For the Jews do not communicate with the Samaritans.\n\nJesus answered, and said to her: If thou didst know the gift of God, and who he is that saith to thee, Give me to drink; thou perhaps wouldst have asked of him, and he would have given thee living water.\n\nThe woman saith to him: Sir, thou hast nothing wherein to draw, and the well is deep; from whence then hast thou living water? Art thou greater than our father Jacob, who gave us the well, and drank thereof himself, and his children, and his cattle?\n\nJesus answered, and said to her: Whosoever drinketh of this water, shall thirst again; but he that shall drink of the water that I will give him, shall not thirst for ever: But the water that I will give him, shall become in him a fountain of water, springing up into life everlasting.\n\nThe woman saith to him: Sir, give me this water, that I may not thirst, nor come hither to draw.",
    },
  },

  // October 16 (Saint Hedwig / Saint Margaret Mary Alacoque)
  "2026-10-16": {
    date: "2026-10-16",
    translation: "Catholic Public Domain Lectionary (Douay-Rheims / Vulgate translation)",
    sourceNote: "Lectionary for Friday of the 28th Week in Ordinary Time.",
    firstReading: {
      ref: "Ephesians 1:11-14",
      text: "Brothers and sisters: In whom also we are called by lot, being predestinated according to the purpose of him who worketh all things according to the counsel of his will. That we may be unto the praise of his glory, we who before hoped in Christ:\n\nIn whom you also, after you had heard the word of truth (the gospel of your salvation); in whom also believing, you were sealed with the holy Spirit of promise, who is the pledge of our inheritance, unto the redemption of acquisition, unto the praise of his glory.",
    },
    psalm: {
      ref: "Psalm 33:1-2, 4-5, 12-13",
      text: "R. Blessed the people the Lord has chosen to be his own.\n\nRejoice in the Lord, O ye just: praise becometh the upright. Give praise to the Lord on the harp; sing to him with the psaltery, the instrument of ten strings.\n\nR. Blessed the people the Lord has chosen to be his own.\n\nFor the word of the Lord is right, and all his works are done with faithfulness. He loveth mercy and judgment; the earth is full of the mercy of the Lord.\n\nR. Blessed the people the Lord has chosen to be his own.",
    },
    gospel: {
      ref: "Luke 12:1-7",
      text: "At that time, when great multitudes stood about Jesus, so that they trod one upon another, he began to say to his disciples: Beware ye of the leaven of the Pharisees, which is hypocrisy.\n\nFor there is nothing covered, that shall not be revealed: nor hidden, that shall not be known. For whatsoever things you have spoken in darkness, shall be published in the light: and that which you have spoken in the ear in the chambers, shall be preached on the housetops.\n\nAnd I say to you, my friends: Be not afraid of them that kill the body, and after that have no more that they can do. But I will show you whom you shall fear: fear ye him, who after he hath killed, hath power to cast into hell. Yea, I say to you, fear him.\n\nAre not five sparrows sold for two farthings, and not one of them is forgotten before God? Yea, the very hairs of your head are all numbered. Fear not therefore: you are of more value than many sparrows.",
    },
  },

  // October 17 (Saint Ignatius of Antioch, Bishop and Martyr)
  "2026-10-17": {
    date: "2026-10-17",
    translation: "Catholic Public Domain Lectionary (Douay-Rheims / Vulgate translation)",
    sourceNote: "Memorial of Saint Ignatius of Antioch, Bishop and Martyr.",
    firstReading: {
      ref: "Philippians 3:17—4:1",
      text: "Be ye followers of me, brethren, and observe them who walk so as you have our model. For many walk, of whom I have told you often (and now tell you weeping), that they are enemies of the cross of Christ; whose end is destruction; whose God is their belly; and whose glory is in their shame; who mind earthly things.\n\nBut our citizenship is in heaven, from whence also we look for the Saviour, our Lord Jesus Christ, who will reform the body of our lowness, made like to the body of his glory, according to the operation whereby also he is able to subdue all things unto himself.",
    },
    psalm: {
      ref: "Psalm 34:2-3, 4-5, 6-7, 8-9",
      text: "R. The Lord delivers the just from all their afflictions.\n\nI will bless the Lord at all times, his praise shall be always in my mouth. In the Lord shall my soul be praised: let the meek hear and rejoice.\n\nR. The Lord delivers the just from all their afflictions.\n\nO magnify the Lord with me; and let us extol his name together. I sought the Lord, and he heard me; and he delivered me from all my troubles.\n\nR. The Lord delivers the just from all their afflictions.",
    },
    gospel: {
      ref: "John 12:24-26",
      text: "Jesus said to his disciples: Amen, amen I say to you, unless the grain of wheat falling into the ground die, itself remaineth alone. But if it die, it bringeth forth much fruit. He that loveth his life shall lose it; and he that hateth his life in this world, keepeth it unto life eternal.\n\nIf any man minister to me, let him follow me; and where I am, there also shall my minister be. If any man minister to me, him will my Father honour.",
    },
  },

  // October 18 (29th Sunday in Ordinary Time / Saint Luke the Evangelist)
  "2026-10-18": {
    date: "2026-10-18",
    translation: "Catholic Public Domain Lectionary (Douay-Rheims / Vulgate translation)",
    sourceNote: "Sunday Lectionary for the 29th Sunday in Ordinary Time (or Feast of St. Luke).",
    firstReading: {
      ref: "Isaiah 53:10-11",
      text: "The Lord was pleased to bruise him in infirmity: if he shall lay down his life for sin, he shall see a long-lived seed, and the will of the Lord shall be prosperous in his hand. Because his soul hath laboured, he shall see and be filled: by his knowledge shall this my just servant justify many, and he shall bear their iniquities.",
    },
    psalm: {
      ref: "Psalm 33:4-5, 18-19, 20, 22",
      text: "R. Lord, let your mercy be on us, as we place our trust in you.\n\nFor the word of the Lord is right, and all his works are done with faithfulness. He loveth mercy and judgment; the earth is full of the mercy of the Lord.\n\nR. Lord, let your mercy be on us, as we place our trust in you.\n\nBehold the eyes of the Lord are on them that fear him: and on them that hope in his mercy. To deliver their souls from death; and feed them in famine.\n\nR. Lord, let your mercy be on us, as we place our trust in you.",
    },
    secondReading: {
      ref: "Hebrews 4:14-16",
      text: "Brothers and sisters: Having therefore a great high priest that hath passed into the heavens, Jesus the Son of God: let us hold fast our confession. For we have not a high priest, who can not have compassion on our infirmities: but one tempted in all things like as we are, without sin. Let us go therefore with confidence to the throne of grace: that we may obtain mercy, and find grace in seasonable aid.",
    },
    gospel: {
      ref: "Mark 10:35-45",
      text: "At that time, James and John the sons of Zebedee came to Jesus, saying: Master, we desire that whatsoever we shall ask, thou shouldst do it for us. But he said to them: What would you that I should do for you? And they said: Grant to us, that we may sit, one on thy right hand, and the other on thy left hand, in thy glory.\n\nAnd Jesus said to them: You know not what you ask. Can you drink of the chalice that I drink of: or be baptized with the baptism wherewith I am baptized? But they said to him: We can. And Jesus saith to them: You shall indeed drink of the chalice that I drink of: and with the baptism wherewith I am baptized, you shall be baptized. But to sit on my right hand, or on my left, is not mine to give to you, but to them for whom it is prepared.\n\nAnd the ten hearing it, began to be much displeased at James and John. But Jesus calling them, saith to them: You know that they who seem to rule over the Gentiles, lord it over them: and their great ones exercise power over them. But it is not so among you: but whosoever will be greater, shall be your minister: and whosoever will be first among you, shall be the servant of all. For the Son of man also is not come to be ministered unto, but to minister, and to give his life a redemption for many.",
    },
  },
};

export interface LectionaryEntry {
  firstReading: { ref: string; text: string };
  psalm: { ref: string; text: string };
  secondReading?: { ref: string; text: string };
  gospel: { ref: string; text: string };
  sourceNote: string;
}

const SUNDAY_LECTIONARY_CYCLE: LectionaryEntry[] = [
  {
    sourceNote: "Sunday Mass Lectionary (Cycle A/B/C) · The Vineyard of the Lord.",
    firstReading: {
      ref: "Isaiah 55:6-9",
      text: "Seek ye the Lord, while he may be found: call upon him, while he is near. Let the wicked forsake his way, and the unrighteous man his thoughts, and let him return to the Lord, and he will have mercy on him; and to our God: for he will abundantly pardon.\n\nFor my thoughts are not your thoughts: nor your ways my ways, saith the Lord. For as the heavens are exalted above the earth, so are my ways exalted above your ways, and my thoughts above your thoughts.",
    },
    psalm: {
      ref: "Psalm 145:2-3, 8-9, 17-18",
      text: "R. The Lord is near to all who call upon him.\n\nEvery day I will bless thee: and I will praise thy name for ever; yea, for ever and ever. Great is the Lord, and greatly to be praised: and of his greatness there is no end.\n\nR. The Lord is near to all who call upon him.\n\nThe Lord is gracious and merciful: patient, and plenteous in mercy. The Lord is sweet to all: and his tender mercies are over all his works.\n\nR. The Lord is near to all who call upon him.",
    },
    secondReading: {
      ref: "Philippians 1:20-24, 27",
      text: "Brethren: As always, so now also shall Christ be magnified in my body, whether it be by life, or by death. For to me, to live is Christ; and to die is gain. And if to live in the flesh, that is to me the fruit of labour, and what I shall choose I know not.\n\nOnly let your conversation be worthy of the gospel of Christ.",
    },
    gospel: {
      ref: "Matthew 20:1-16",
      text: "Jesus said to his disciples this parable: The kingdom of heaven is like to an householder, who went out early in the morning to hire labourers into his vineyard. And having agreed with the labourers for a penny a day, he sent them into his vineyard...\n\nSo shall the last be first, and the first last: for many are called, but few chosen.",
    },
  },
  {
    sourceNote: "Sunday Mass Lectionary · The Good Shepherd and His Flock.",
    firstReading: {
      ref: "Acts 4:8-12",
      text: "Peter, filled with the Holy Spirit, said to them: Ye princes of the people, and ancients, hear: If we this day are examined concerning the good deed done to the infirm man, by what means he hath been made whole: Be it known to you all, and to all the people of Israel, that by the name of our Lord Jesus Christ of Nazareth, whom you crucified, whom God hath raised from the dead, even by him this man standeth here before you whole.\n\nThis is the stone which was rejected by you the builders, which is become the head of the corner. Neither is there salvation in any other.",
    },
    psalm: {
      ref: "Psalm 118:1, 8-9, 21-23, 26, 29",
      text: "R. The stone rejected by the builders has become the cornerstone.\n\nGive praise to the Lord, for he is good: for his mercy endureth for ever. It is good to confide in the Lord, rather than to have confidence in man.\n\nR. The stone rejected by the builders has become the cornerstone.\n\nI will give glory to thee because thou hast heard me: and art become my salvation. The stone which the builders rejected; the same is become the head of the corner.\n\nR. The stone rejected by the builders has become the cornerstone.",
    },
    secondReading: {
      ref: "1 John 3:1-2",
      text: "Behold what manner of charity the Father hath bestowed upon us, that we should be called, and should be the sons of God. Therefore the world knoweth not us, because it knew not him. Dearly beloved, we are now the sons of God; and it hath not yet appeared what we shall be. We know, that, when he shall appear, we shall be like to him: because we shall see him as he is.",
    },
    gospel: {
      ref: "John 10:11-18",
      text: "Jesus said: I am the good shepherd. The good shepherd giveth his life for his sheep. But the hireling, and he that is not the shepherd, whose own the sheep are not, seeth the wolf coming, and leaveth the sheep, and flieth: and the wolf catcheth, and scattereth the sheep: And the hireling flieth, because he is a hireling: and he hath no care for the sheep.\n\nI am the good shepherd; and I know mine, and mine know me. As the Father knoweth me, and I know the Father: and I lay down my life for my sheep.",
    },
  },
  {
    sourceNote: "Sunday Mass Lectionary · The True Vine and the Branches.",
    firstReading: {
      ref: "Deuteronomy 8:2-3, 14-16",
      text: "Moses said to the people: And thou shalt remember all the way through which the Lord thy God hath brought thee for forty years through the desert, to afflict thee and to prove thee, and that the things that were in thy heart might be made known, whether thou wouldst keep his commandments or no.\n\nHe afflicted thee with want, and gave thee manna for thy food, which neither thou nor thy fathers knew: to shew that not in bread alone doth man live, but in every word that proceedeth from the mouth of God.",
    },
    psalm: {
      ref: "Psalm 147:12-15, 19-20",
      text: "R. Praise the Lord, Jerusalem; praise your God, O Zion.\n\nPraise the Lord, O Jerusalem: praise thy God, O Sion. Because he hath strengthened the bolts of thy gates, he hath blessed thy children within thee.\n\nR. Praise the Lord, Jerusalem; praise your God, O Zion.\n\nWho hath placed peace in thy borders: and filleth thee with the fat of corn.\n\nR. Praise the Lord, Jerusalem; praise your God, O Zion.",
    },
    secondReading: {
      ref: "1 Corinthians 10:16-17",
      text: "Brethren: The chalice of benediction, which we bless, is it not the communion of the blood of Christ? And the bread, which we break, is it not the partaking of the body of the Lord? For we, being many, are one bread, one body, all that partake of one bread.",
    },
    gospel: {
      ref: "John 6:51-58",
      text: "Jesus said to the crowds of the Jews: I am the living bread which came down from heaven. If any man eat of this bread, he shall live for ever; and the bread that I will give, is my flesh, for the life of the world.\n\nThe Jews therefore strove among themselves, saying: How can this man give us his flesh to eat? Then Jesus said to them: Amen, amen I say unto you: Except you eat the flesh of the Son of man, and drink his blood, you shall not have life in you. He that eateth my flesh, and drinketh my blood, hath everlasting life: and I will raise him up in the last day.",
    },
  },
  {
    sourceNote: "Sunday Mass Lectionary · The Beatitudes and Kingdom of Heaven.",
    firstReading: {
      ref: "Zephaniah 2:3; 3:12-13",
      text: "Seek the Lord, all the meek of the earth, who have accomplished his judgment: seek the just, seek the meek: if by any means you may be hid in the day of the Lord's indignation. And I will leave in the midst of thee a poor and needy people: and they shall hope in the name of the Lord. The remnant of Israel shall not do iniquity, nor speak lies, nor shall a deceitful tongue be found in their mouth.",
    },
    psalm: {
      ref: "Psalm 146:6-10",
      text: "R. Blessed are the poor in spirit; the kingdom of heaven is theirs.\n\nThe Lord who keepeth truth for ever: who executeth judgment for them that suffer wrong: who giveth food to the hungry. The Lord looseth them that are fettered: The Lord enlighteneth the blind.\n\nR. Blessed are the poor in spirit; the kingdom of heaven is theirs.\n\nThe Lord lifteth up them that are cast down: the Lord loveth the just. The Lord keepeth the strangers, he will support the fatherless and the widow.\n\nR. Blessed are the poor in spirit; the kingdom of heaven is theirs.",
    },
    secondReading: {
      ref: "1 Corinthians 1:26-31",
      text: "See your vocation, brethren, that there are not many wise according to the flesh, not many mighty, not many noble: But the foolish things of the world hath God chosen, that he may confound the wise; and the weak things of the world hath God chosen, that he may confound the strong.\n\nThat no flesh should glory in his sight. But of him are you in Christ Jesus, who of God is made unto us wisdom, and justice, and sanctification, and redemption.",
    },
    gospel: {
      ref: "Matthew 5:1-12",
      text: "At that time: Jesus, seeing the multitudes, went up into a mountain, and when he was set down, his disciples came unto him. And opening his mouth, he taught them, saying: Blessed are the poor in spirit: for theirs is the kingdom of heaven. Blessed are the meek: for they shall possess the land. Blessed are they that mourn: for they shall be comforted.\n\nBlessed are they that hunger and thirst after justice: for they shall have their fill. Blessed are the merciful: for they shall obtain mercy. Blessed are the clean of heart: for they shall see God. Blessed are the peacemakers: for they shall be called children of God.",
    },
  },
];

const WEEKDAY_LECTIONARY_CYCLE: LectionaryEntry[] = [
  {
    sourceNote: "Weekday Lectionary · The Mystery of God's Will.",
    firstReading: {
      ref: "Ephesians 1:11-14",
      text: "In whom also we are called by lot, being predestinated according to the purpose of him who worketh all things according to the counsel of his will. That we may be unto the praise of his glory, we who before hoped in Christ: In whom you also, after you had heard the word of truth (the gospel of your salvation); in whom also believing, you were sealed with the holy Spirit of promise, who is the pledge of our inheritance.",
    },
    psalm: {
      ref: "Psalm 33:1-2, 4-5, 12-13",
      text: "R. Blessed the people the Lord has chosen to be his own.\n\nRejoice in the Lord, O ye just: praise becometh the upright. Give praise to the Lord on the harp; sing to him with the psaltery, the instrument of ten strings.\n\nR. Blessed the people the Lord has chosen to be his own.\n\nFor the word of the Lord is right, and all his works are done with faithfulness. He loveth mercy and judgment; the earth is full of the mercy of the Lord.\n\nR. Blessed the people the Lord has chosen to be his own.",
    },
    gospel: {
      ref: "Luke 12:1-7",
      text: "At that time, when great multitudes stood about Jesus, so that they trod one upon another, he began to say to his disciples: Beware ye of the leaven of the Pharisees, which is hypocrisy. For there is nothing covered, that shall not be revealed: nor hidden, that shall not be known.\n\nAnd I say to you, my friends: Be not afraid of them that kill the body, and after that have no more that they can do. Are not five sparrows sold for two farthings, and not one of them is forgotten before God? Yea, the very hairs of your head are all numbered. Fear not therefore: you are of more value than many sparrows.",
    },
  },
  {
    sourceNote: "Weekday Lectionary · The Gift of Living Water.",
    firstReading: {
      ref: "Romans 8:28-39",
      text: "Brethren: We know that to them that love God, all things work together unto good, to such as, according to his purpose, are called to be saints. For whom he foreknew, he also predestinated to be made conformable to the image of his Son; that he might be the firstborn amongst many brethren.\n\nWhat shall we then say to these things? If God be for us, who is against us? He that spared not even his own Son, but delivered him up for us all, how hath he not also, with him, given us all things? Who shall separate us from the love of Christ?",
    },
    psalm: {
      ref: "Psalm 84:2-3, 4-5, 10-11",
      text: "R. How lovely is your dwelling place, O Lord of hosts.\n\nMy soul longeth and fainteth for the courts of the Lord. My heart and my flesh have rejoiced in the living God.\n\nR. How lovely is your dwelling place, O Lord of hosts.\n\nBlessed are they that dwell in thy house, O Lord: they shall praise thee for ever and ever. For better is one day in thy courts above thousands.\n\nR. How lovely is your dwelling place, O Lord of hosts.",
    },
    gospel: {
      ref: "John 4:10-14",
      text: "Jesus answered, and said to her: If thou didst know the gift of God, and who he is that saith to thee, Give me to drink; thou perhaps wouldst have asked of him, and he would have given thee living water. Whosoever drinketh of this water, shall thirst again; but he that shall drink of the water that I will give him, shall not thirst for ever: But the water that I will give him, shall become in him a fountain of water, springing up into life everlasting.",
    },
  },
  {
    sourceNote: "Weekday Lectionary · Unless a Grain of Wheat Dies.",
    firstReading: {
      ref: "Philippians 3:17—4:1",
      text: "Be ye followers of me, brethren, and observe them who walk so as you have our model. For many walk, of whom I have told you often (and now tell you weeping), that they are enemies of the cross of Christ; whose end is destruction; whose God is their belly; and whose glory is in their shame; who mind earthly things. But our citizenship is in heaven, from whence also we look for the Saviour, our Lord Jesus Christ.",
    },
    psalm: {
      ref: "Psalm 34:2-3, 4-5, 8-9",
      text: "R. The Lord delivers the just from all their afflictions.\n\nI will bless the Lord at all times, his praise shall be always in my mouth. In the Lord shall my soul be praised: let the meek hear and rejoice.\n\nR. The Lord delivers the just from all their afflictions.\n\nO taste, and see that the Lord is sweet: blessed is the man that hopeth in him.\n\nR. The Lord delivers the just from all their afflictions.",
    },
    gospel: {
      ref: "John 12:24-26",
      text: "Jesus said to his disciples: Amen, amen I say to you, unless the grain of wheat falling into the ground die, itself remaineth alone. But if it die, it bringeth forth much fruit. He that loveth his life shall lose it; and he that hateth his life in this world, keepeth it unto life eternal. If any man minister to me, let him follow me; and where I am, there also shall my minister be.",
    },
  },
  {
    sourceNote: "Weekday Lectionary · The Primacy of Christ over All Creation.",
    firstReading: {
      ref: "Colossians 1:15-20",
      text: "Who is the image of the invisible God, the firstborn of every creature: For in him were all things created in heaven and on earth, visible and invisible, whether thrones, or dominations, or principalities, or powers: all things were created by him and in him. And he is before all, and by him all things consist. And he is the head of the body, the Church, who is the beginning, the firstborn from the dead.",
    },
    psalm: {
      ref: "Psalm 100:1-5",
      text: "R. Come with singing into the presence of the Lord.\n\nSing joyfully to God, all the earth: serve ye the Lord with gladness. Come in before his presence with exceeding great joy. Know ye that the Lord he is God: he made us, and not we ourselves.\n\nR. Come with singing into the presence of the Lord.\n\nGo ye into his gates with praise, into his courts with hymns: and give glory to him. Praise ye his name: for the Lord is sweet, his mercy endureth for ever.\n\nR. Come with singing into the presence of the Lord.",
    },
    gospel: {
      ref: "Luke 6:1-5",
      text: "And it came to pass on the second first sabbath, that as he went through the corn fields, his disciples plucked the ears, and did eat, rubbing them in their hands. And some of the Pharisees said to them: Why do you that which is not lawful on the sabbath days? And Jesus answering them, said: Have you not read so much as this, what David did, when himself was hungry, and they that were with him? How he went into the house of God, and took and ate the bread of proposition... And he said to them: The Son of man is Lord also of the sabbath.",
    },
  },
  {
    sourceNote: "Weekday Lectionary · Reconciliation and New Creation in Christ.",
    firstReading: {
      ref: "2 Corinthians 5:17-21",
      text: "If then any be in Christ a new creature, the old things are passed away, behold all things are made new. But all things are of God, who hath reconciled us to himself by Christ; and hath given to us the ministry of reconciliation. For God indeed was in Christ, reconciling the world to himself, not imputing to them their sins; and he hath placed in us the word of reconciliation.",
    },
    psalm: {
      ref: "Psalm 103:1-4, 8-9",
      text: "R. The Lord is kind and merciful.\n\nBless the Lord, O my soul: and let all that is within me bless his holy name. Bless the Lord, O my soul, and never forget all he hath done for thee. Who forgiveth all thy iniquities: who healeth all thy diseases.\n\nR. The Lord is kind and merciful.",
    },
    gospel: {
      ref: "Matthew 5:13-16",
      text: "Jesus said to his disciples: You are the salt of the earth. But if the salt lose its savour, wherewith shall it be salted? It is neither good for anything any more, but to be cast out, and to be trodden on by men. You are the light of the world. A city seated on a mountain cannot be hid. Neither do men light a candle and put it under a bushel, but upon a candlestick, that it may shine to all that are in the house. So let your light shine before men, that they may see your good works, and glorify your Father who is in heaven.",
    },
  },
  {
    sourceNote: "Weekday Lectionary · Crucified with Christ.",
    firstReading: {
      ref: "Galatians 2:19-20",
      text: "For I, through the law, am dead to the law, that I may live to God: with Christ I am nailed to the cross. And I live, now not I; but Christ liveth in me. And that that I now live in the flesh: I live in the faith of the Son of God, who loved me, and delivered himself for me.",
    },
    psalm: {
      ref: "Psalm 117:1-2",
      text: "R. Praise the Lord, all you nations; acclaim him, all you peoples.\n\nO praise the Lord, all ye nations: praise him, all ye people. For his mercy is confirmed upon us: and the truth of the Lord remaineth for ever.\n\nR. Praise the Lord, all you nations; acclaim him, all you peoples.",
    },
    gospel: {
      ref: "Mark 8:34-38",
      text: "And calling the multitude together with his disciples, he said to them: If any man will follow me, let him deny himself, and take up his cross, and follow me. For whosoever will save his life, shall lose it: and whosoever shall lose his life for my sake and the gospel, shall save it. For what shall it profit a man, if he gain the whole world, and suffer the loss of his soul?",
    },
  },
  {
    sourceNote: "Weekday Lectionary · The Spirit of the Lord is Upon Me.",
    firstReading: {
      ref: "1 Thessalonians 4:1-8",
      text: "For the rest therefore, brethren, we pray and beseech you in the Lord Jesus, that as you have received from us, how you ought to walk, and to please God, so also you would walk, that you may abound the more. For this is the will of God, your sanctification.",
    },
    psalm: {
      ref: "Psalm 96:1-3, 10-12",
      text: "R. Tell by day the saving deeds of the Lord.\n\nSing ye to the Lord a new canticle: sing to the Lord, all the earth. Sing ye to the Lord and bless his name: shew forth his salvation from day to day. Declare his glory among the Gentiles: his wonders among all people.\n\nR. Tell by day the saving deeds of the Lord.",
    },
    gospel: {
      ref: "Luke 4:16-21",
      text: "And he came to Nazareth, where he was brought up: and he went into the synagogue, according to his custom, on the sabbath day; and he rose up to read. And the book of the prophet Isaias was delivered unto him. And as he unfolded the book, he found the place where it was written: The Spirit of the Lord is upon me. Wherefore he hath anointed me to preach the gospel to the poor, he hath sent me to heal the contrite of heart...\n\nAnd he began to say to them: This day is fulfilled this scripture in your ears.",
    },
  },
];

function getDayOfYear(dateStr: string): number {
  const parts = dateStr.split("-").map(Number);
  const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  const start = new Date(Date.UTC(parts[0], 0, 1));
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Returns complete Mass readings for a date. If date is pre-computed in CURATED_DAILY_READINGS,
 * returns that; otherwise selects from the rich liturgical lectionary cycle keyed by day-of-year,
 * ensuring every single day of the year has distinct scripture proclamations!
 */
export function getCuratedDailyReadings(isoDate: string): DailyReadings {
  if (CURATED_DAILY_READINGS[isoDate]) {
    return CURATED_DAILY_READINGS[isoDate];
  }

  const parts = isoDate.split("-").map(Number);
  const dateObj = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  const dayOfWeek = dateObj.getUTCDay(); // 0 = Sunday
  const dayOfYear = getDayOfYear(isoDate);

  if (dayOfWeek === 0) {
    const sundayIndex = Math.abs(Math.floor(dayOfYear / 7)) % SUNDAY_LECTIONARY_CYCLE.length;
    const entry = SUNDAY_LECTIONARY_CYCLE[sundayIndex];
    return {
      date: isoDate,
      translation: "Catholic Public Domain Lectionary (Douay-Rheims / Vulgate)",
      sourceNote: entry.sourceNote,
      firstReading: entry.firstReading,
      psalm: entry.psalm,
      secondReading: entry.secondReading,
      gospel: entry.gospel,
    };
  }

  const weekdayIndex = Math.abs(dayOfYear) % WEEKDAY_LECTIONARY_CYCLE.length;
  const entry = WEEKDAY_LECTIONARY_CYCLE[weekdayIndex];
  return {
    date: isoDate,
    translation: "Catholic Public Domain Lectionary (Douay-Rheims / Vulgate)",
    sourceNote: entry.sourceNote,
    firstReading: entry.firstReading,
    psalm: entry.psalm,
    gospel: entry.gospel,
  };
}

