const fs = require('fs');
const path = require('path');

const DOCTRINE_DIR = path.join(__dirname, '..', 'apps', 'web', 'data', 'doctrine');

const newEntries = {
  "god-trinity-creation.json": [
    {
      "id": "gtc-divine-simplicity-attributes",
      "category": "god-trinity-creation",
      "question": "What does the Catholic Church teach about the attributes and simplicity of God?",
      "answer": "The Catholic Church teaches that God is infinite, eternal, unchangeable, all-powerful, all-knowing, and perfectly good. Unlike creatures, God does not have parts or conflicting traits; theology describes this as Divine Simplicity. In God, His being, His knowing, and His loving are one identical and infinite reality. He is pure act and the fullness of Being itself, who revealed His holy name to Moses as 'I AM WHO AM' (Exodus 3:14). Because God is simple and spiritual, He is completely transcendent above all created things yet intimately present to every corner of creation.",
      "sources": [
        { "type": "ccc", "ref": "200-221" },
        { "type": "scripture", "ref": "Exodus 3:14" }
      ],
      "keywords": ["divine attributes", "simplicity of god", "omnipotence", "omniscience", "eternal", "pure act"],
      "level": "intermediate"
    },
    {
      "id": "gtc-creation-ex-nihilo",
      "category": "god-trinity-creation",
      "question": "Did God create the universe out of pre-existing matter?",
      "answer": "No. The Catholic Church dogmatically teaches that God created everything out of nothing (in Latin, 'creatio ex nihilo'). God did not need any pre-existing material, tool, or blueprint. Out of His absolute freedom and overflowing love, He willed heaven and earth, visible and invisible, into being by His Almighty Word. This shows that the universe is not an accident or an illusion, but an intentional gift possessing inherent dignity, order, and goodness, sustained at every moment by God's preserving power.",
      "sources": [
        { "type": "ccc", "ref": "296-298" },
        { "type": "scripture", "ref": "2 Maccabees 7:28" }
      ],
      "keywords": ["creation out of nothing", "creatio ex nihilo", "genesis", "sovereignty", "origin of universe"],
      "level": "basic"
    },
    {
      "id": "gtc-holy-spirit-divinity-procession",
      "category": "god-trinity-creation",
      "question": "Who is the Holy Spirit, and how does He proceed in the Trinity?",
      "answer": "The Holy Spirit is the Third Person of the Most Holy Trinity, truly and fully God, equal in majesty and glory with the Father and the Son. In the Nicene-Constantinopolitan Creed, Catholics confess: 'I believe in the Holy Spirit, the Lord, the giver of life, who proceeds from the Father and the Son, who with the Father and the Son is adored and glorified.' The Spirit proceeds eternally as the mutual, infinite Love between the Father and the Son, poured into our hearts at Baptism and Confirmation to sanctify us and guide the Church into all truth.",
      "sources": [
        { "type": "ccc", "ref": "683-701" },
        { "type": "scripture", "ref": "John 14:26" }
      ],
      "keywords": ["holy spirit", "filioque", "sanctifier", "trinity", "paraclete", "counselor"],
      "level": "intermediate"
    },
    {
      "id": "gtc-human-soul-creation",
      "category": "god-trinity-creation",
      "question": "Is the human soul evolved from matter, or directly created by God?",
      "answer": "The Church teaches that while the human body may have developed from pre-existing living matter under divine guidance, every individual human spiritual soul is immediately and directly created by God at the moment of conception. The human soul is not produced by the parents, nor is it a product of biological evolution. Because the soul is spiritual, it is intrinsically immortal; it does not perish when the physical body dies, and it will be reunited with the body at the final resurrection.",
      "sources": [
        { "type": "ccc", "ref": "366" },
        { "type": "scripture", "ref": "Jeremiah 1:5" }
      ],
      "keywords": ["human soul", "immortality", "conception", "creation of soul", "spiritual nature", "imago dei"],
      "level": "intermediate"
    },
    {
      "id": "gtc-angels-and-demons",
      "category": "god-trinity-creation",
      "question": "What does Catholic doctrine say about the nature of angels and demons?",
      "answer": "Angels are purely spiritual creatures, created by God with intellect and free will, possessing no material body. They are personal beings and immortal servants of God who carry out His divine messages and protect humanity. Scripture and Tradition reveal that some angels, led by Satan (Lucifer), irrevocably rejected God's reign through pride and rebellion, becoming demons. Hell was prepared for them. While demons tempt humanity toward sin, their power is strictly limited by God's sovereignty, and Christ has definitively triumphed over them on the Cross.",
      "sources": [
        { "type": "ccc", "ref": "328-336" },
        { "type": "ccc", "ref": "391-395" },
        { "type": "scripture", "ref": "Revelation 12:7-9" }
      ],
      "keywords": ["angels", "demons", "satan", "spiritual warfare", "archangels", "fall of angels"],
      "level": "basic"
    },
    {
      "id": "gtc-imago-dei-human-dignity",
      "category": "god-trinity-creation",
      "question": "What does it mean that man is made in the 'Image and Likeness of God'?",
      "answer": "To be created in the image and likeness of God ('Imago Dei') means that human persons possess a unique spiritual dignity that sets them apart from all other visible creatures. Man alone is capable of knowing and loving his Creator, endowed with spiritual intellect, free will, and the capacity for self-giving love and communion with others. Because every human person reflects God's image, every life has inviolable sacred worth from the moment of conception until natural death, regardless of ability, age, race, or social status.",
      "sources": [
        { "type": "ccc", "ref": "355-357" },
        { "type": "scripture", "ref": "Genesis 1:26-27" }
      ],
      "keywords": ["imago dei", "image of god", "human dignity", "intellect and will", "sacredness of life"],
      "level": "basic"
    },
    {
      "id": "gtc-concupiscence-and-the-fall",
      "category": "god-trinity-creation",
      "question": "What is concupiscence and how does it relate to the Fall of Adam and Eve?",
      "answer": "Concupiscence is the inclination toward sin that remains in human nature even after Original Sin is washed away in Baptism. Through the original disobedience of our first parents, Adam and Eve, humanity lost original holiness and original justice. Although Baptism restores sanctifying grace and divine sonship, the wound to human nature remains: our intellect is darkened, our will is weakened, and our passions often rebel against right reason. Concupiscence is not sin in itself, but it serves as an arena for spiritual struggle where grace helps us cultivate virtue and holiness.",
      "sources": [
        { "type": "ccc", "ref": "405" },
        { "type": "ccc", "ref": "1264" },
        { "type": "scripture", "ref": "Romans 7:15-20" }
      ],
      "keywords": ["concupiscence", "original sin", "the fall", "struggle with sin", "human weakness", "sanctifying grace"],
      "level": "intermediate"
    },
    {
      "id": "gtc-god-omnipresence",
      "category": "god-trinity-creation",
      "question": "Is God present everywhere, and how is He present in the world?",
      "answer": "Yes, God is omnipresent: He is present in all places and at all times. Because God is pure spirit and not confined by space or physical boundaries, He is present everywhere in three distinct ways: by His power (all things are subject to His rule), by His presence (all things are open and bare before His gaze), and by His essence (He sustains everything in being at every moment). In a special way, God is present by grace in the souls of the just, and uniquely, sacramentally, and substantially in the Most Holy Eucharist.",
      "sources": [
        { "type": "ccc", "ref": "300-301" },
        { "type": "scripture", "ref": "Psalm 139:7-10" }
      ],
      "keywords": ["omnipresence", "god everywhere", "divine presence", "sustaining creation", "indwelling"],
      "level": "basic"
    },
    {
      "id": "gtc-the-five-ways-aquinas",
      "category": "god-trinity-creation",
      "question": "What are the 'Five Ways' of St. Thomas Aquinas for proving God's existence?",
      "answer": "St. Thomas Aquinas formulated five philosophical demonstrations (the 'Quinque Viae') showing that reason can know God exists from observing the created world: 1) The Argument from Motion (every moving thing requires an Unmoved Mover); 2) The Argument from Efficient Cause (an uncaused First Cause must exist); 3) The Argument from Contingency (contingent beings require a Necessary Being); 4) The Argument from Gradation (degrees of truth and goodness point to a Supreme Perfection); and 5) The Teleological Argument from Design (unintelligent natural systems acting toward an end require an Intelligent Governor).",
      "sources": [
        { "type": "ccc", "ref": "31-35" },
        { "type": "scripture", "ref": "Wisdom 13:1-9" }
      ],
      "keywords": ["st thomas aquinas", "five ways", "proofs of god", "first cause", "unmoved mover", "teleology"],
      "level": "advanced"
    },
    {
      "id": "gtc-fatherhood-of-god",
      "category": "god-trinity-creation",
      "question": "How is God 'Father' in Catholic theology?",
      "answer": "God is called 'Father' in two profound senses. First, within the eternal life of the Trinity, God the Father is the unbegotten Principle who eternally generates the Son in an exchange of infinite love. Second, in relation to creation, God is the loving Father and Creator of all. More intimately still, through the grace of adoption in Jesus Christ, Christians become true children of the Father by the Holy Spirit (Romans 8:15). God transcends human gender, incorporating the perfection of fatherly protection and motherly tenderness, yet Christ specifically revealed Him as 'Abba, Father'.",
      "sources": [
        { "type": "ccc", "ref": "238-242" },
        { "type": "scripture", "ref": "Romans 8:15-16" }
      ],
      "keywords": ["god the father", "divine fatherhood", "adoption", "abba", "holy trinity"],
      "level": "basic"
    },
    {
      "id": "gtc-covenant-theology",
      "category": "god-trinity-creation",
      "question": "What is a biblical covenant and how has God unfolded His covenants in history?",
      "answer": "A covenant in Catholic biblical theology is not a mere legal contract; it is a sacred kinship bond initiated by God that establishes family relationship between Himself and humanity. Salvation history unfolds across six major covenants: with Adam (marriage), Noah (family household), Abraham (tribe/chieftain), Moses (nation of Israel), David (kingdom), and definitively with Jesus Christ in the New and Everlasting Covenant (the universal Church). Each covenant expanded the scope of God's family until all nations were invited into salvation through Christ.",
      "sources": [
        { "type": "ccc", "ref": "54-67" },
        { "type": "scripture", "ref": "Luke 22:20" }
      ],
      "keywords": ["covenant", "salvation history", "abraham", "moses", "new covenant", "kinship with god"],
      "level": "intermediate"
    },
    {
      "id": "gtc-divine-mercy-and-justice",
      "category": "god-trinity-creation",
      "question": "How do God's infinite justice and infinite mercy harmonize?",
      "answer": "In God, justice and mercy are never in opposition; they are two aspects of the same infinite divine love. God's justice is His holiness and truth, giving to each what is due and upholding the moral order of creation. God's mercy is His compassionate love meeting human misery and forgiving guilt. On the Cross of Jesus Christ, justice and mercy kiss: divine justice is satisfied by the perfect self-offering of the Son, and divine mercy is lavished upon repentant sinners, granting forgiveness and divine life without compromising absolute holiness.",
      "sources": [
        { "type": "ccc", "ref": "1846-1848" },
        { "type": "scripture", "ref": "Psalm 85:10" }
      ],
      "keywords": ["divine mercy", "divine justice", "the cross", "atonement", "holiness of god"],
      "level": "intermediate"
    },
    {
      "id": "gtc-free-will-and-predestination",
      "category": "god-trinity-creation",
      "question": "Does God's omniscience take away human free will or cause double predestination?",
      "answer": "The Catholic Church rejects Calvinistic 'double predestination' (the belief that God positively predestines certain souls to damnation without regard to their sins). God desires all men to be saved and come to knowledge of truth (1 Timothy 2:4). While God eternally knows all human actions in His timeless present, His foreknowledge does not coerce human choices. Grace works interiorly to heal and elevate free will rather than destroy it. A person is only condemned if they freely and deliberately persist in mortal sin and final impenitence until death.",
      "sources": [
        { "type": "ccc", "ref": "1037" },
        { "type": "ccc", "ref": "1730-1738" },
        { "type": "scripture", "ref": "1 Timothy 2:4" }
      ],
      "keywords": ["free will", "predestination", "grace", "reprobation", "human freedom", "salvation"],
      "level": "advanced"
    },
    {
      "id": "gtc-meaning-of-glory-of-god",
      "category": "god-trinity-creation",
      "question": "Why did God create the world? Was He lacking anything?",
      "answer": "God created the world not to increase His own glory or fulfill any lack, because He is infinitely complete, happy, and blessed in Himself. As the First Vatican Council declared, God created out of His sheer goodness and love to manifest His glory and share His infinite beatitude with rational creatures. As Saint Irenaeus famously wrote: 'The glory of God is man fully alive, and the life of man is the vision of God.' Creation is an act of sovereign generosity meant to draw us into the eternal joy of the Holy Trinity.",
      "sources": [
        { "type": "ccc", "ref": "293-294" },
        { "type": "scripture", "ref": "Ephesians 1:5-6" }
      ],
      "keywords": ["glory of god", "why god created", "irenaeus", "divine goodness", "beatitude"],
      "level": "intermediate"
    }
  ],

  "jesus-christ.json": [
    {
      "id": "jc-incarnation-word-flesh",
      "category": "jesus-christ",
      "question": "What is the mystery of the Incarnation?",
      "answer": "The Incarnation is the central mystery of the Christian faith whereby the second Person of the Holy Trinity, the eternal Son of God, assumed a human nature in order to accomplish our salvation in that same human nature. As Saint John's Gospel proclaims: 'The Word was made flesh and dwelt among us' (John 1:14). Jesus did not merely appear to be human (the heresy of Docetism); He took a real human body and a human soul from the Virgin Mary by the power of the Holy Spirit, becoming truly man without ceasing to be truly God.",
      "sources": [
        { "type": "ccc", "ref": "461-463" },
        { "type": "scripture", "ref": "John 1:14" }
      ],
      "keywords": ["incarnation", "word made flesh", "son of god", "nativity", "christmas", "christology"],
      "level": "basic"
    },
    {
      "id": "jc-hypostatic-union",
      "category": "jesus-christ",
      "question": "What is the Hypostatic Union defined at the Council of Chalcedon?",
      "answer": "The Hypostatic Union is the theological term defining the union of Christ's two complete natures—divine and human—in the one single divine Person (hypostasis) of the Son. Defined at the Council of Chalcedon in 451 AD, Catholic doctrine proclaims that Jesus is fully God and fully man, existing in two natures 'without confusion, without change, without division, without separation.' Because Jesus is one divine Person, all His human actions (sleeping, weeping, suffering, dying) belong to the Son of God, giving His sacrifice infinite saving power.",
      "sources": [
        { "type": "ccc", "ref": "464-469" },
        { "type": "scripture", "ref": "Colossians 2:9" }
      ],
      "keywords": ["hypostatic union", "council of chalcedon", "two natures", "divine person", "christology"],
      "level": "advanced"
    },
    {
      "id": "jc-two-wills-of-christ",
      "category": "jesus-christ",
      "question": "Did Jesus have both a human will and a divine will?",
      "answer": "Yes. The Third Council of Constantinople (681 AD) declared that Christ possesses two natural wills and two natural operations: one divine and one human. His human will does not resist or oppose His divine will; rather, it is in perfect, loving submission and harmony with the divine will. We see this vividly in Gethsemane when Jesus prayed: 'Father, if it be possible, let this chalice pass from me; nevertheless, not as I will, but as you will' (Matthew 26:39). This perfect obedience healed Adam's disobedience.",
      "sources": [
        { "type": "ccc", "ref": "475" },
        { "type": "scripture", "ref": "Matthew 26:39" }
      ],
      "keywords": ["two wills", "dyothelitism", "gethsemane", "obedience of christ", "human will"],
      "level": "advanced"
    },
    {
      "id": "jc-transfiguration-meaning",
      "category": "jesus-christ",
      "question": "What is the significance of the Transfiguration of Jesus on Mount Tabor?",
      "answer": "The Transfiguration of Jesus before Peter, James, and John revealed His unveiled divine glory and strengthened the Apostles' faith ahead of the scandal of the Cross. Moses (representing the Law) and Elijah (representing the Prophets) appeared conversing with Jesus about His upcoming departure in Jerusalem, proving that Christ fulfills all of Old Testament revelation. The event was also a Trinitarian manifestation: the Father spoke from the luminous cloud, the Son shone with uncreated light, and the Holy Spirit overshadowed them, giving us a foretaste of Christ's resurrection and our future glory.",
      "sources": [
        { "type": "ccc", "ref": "554-556" },
        { "type": "scripture", "ref": "Matthew 17:1-8" }
      ],
      "keywords": ["transfiguration", "mount tabor", "moses and elijah", "divine glory", "trinity"],
      "level": "intermediate"
    },
    {
      "id": "jc-threefold-office-prophet-priest-king",
      "category": "jesus-christ",
      "question": "What is meant by the Threefold Office of Christ as Priest, Prophet, and King?",
      "answer": "The word 'Christ' means 'Anointed One' (Messiah). In the Old Testament, three offices were consecrated by anointing: priests, prophets, and kings. Jesus unites and fulfills all three: as Supreme High Priest, He offered Himself as the immaculate sacrifice on Calvary to reconcile humanity with God; as Prophet, He is the living Word who proclaims the Kingdom and reveals the fullness of truth; and as King, He rules over all creation not with worldly dominion, but with humility, pastoral love, and sacrificial service.",
      "sources": [
        { "type": "ccc", "ref": "436-440" },
        { "type": "scripture", "ref": "Hebrews 4:14-16" }
      ],
      "keywords": ["threefold office", "priest prophet king", "messiah", "anointed one", "munera christi"],
      "level": "basic"
    },
    {
      "id": "jc-descent-into-hell-holy-saturday",
      "category": "jesus-christ",
      "question": "What does the Creed mean by 'He descended into hell' on Holy Saturday?",
      "answer": "In the Apostles' Creed, 'hell' does not refer to Gehenna (the realm of the damned), but to Sheol or Hades—the abode of the dead where the souls of the righteous who died before Christ's coming were awaiting their Redeemer. On Holy Saturday, Jesus went in His human soul to announce the Good News to the imprisoned spirits (1 Peter 3:19) and open the gates of heaven to Adam, Eve, Abraham, Moses, David, and all the holy souls. His descent proves that His death was real and that His victory liberates all times and all places.",
      "sources": [
        { "type": "ccc", "ref": "631-637" },
        { "type": "scripture", "ref": "1 Peter 3:18-20" }
      ],
      "keywords": ["descended into hell", "holy saturday", "sheol", "limbo of the fathers", "harrowing of hell"],
      "level": "intermediate"
    },
    {
      "id": "jc-historical-reality-resurrection",
      "category": "jesus-christ",
      "question": "Is the Resurrection of Jesus a literal historical event or merely a metaphor?",
      "answer": "The Catholic Church firmly teaches that the Resurrection of Jesus Christ was a real, historical, and bodily event, verified by tangible signs such as the empty tomb and physical encounters with eyewitnesses. The Apostles touched His wounds, heard His voice, and ate meals with Him after He rose from the dead. At the same time, Christ's resurrection transcends ordinary history: His risen body was not merely resuscitated to die again like Lazarus, but was transfigured into a glorified, immortal state entering into the fullness of divine life.",
      "sources": [
        { "type": "ccc", "ref": "639-646" },
        { "type": "scripture", "ref": "Luke 24:36-43" }
      ],
      "keywords": ["resurrection", "empty tomb", "glorified body", "eyewitnesses", "easter victory"],
      "level": "basic"
    },
    {
      "id": "jc-temptation-in-desert",
      "category": "jesus-christ",
      "question": "Why did Jesus allow Himself to be tempted in the desert by Satan?",
      "answer": "Following His baptism in the Jordan, Jesus fasted for forty days in the wilderness and allowed Himself to be tempted by Satan to reveal Himself as the New Adam and the true Israel. Where Adam succumbed to pride and disobedience in Paradise, and Israel rebelled during forty years in the desert, Jesus remained flawlessly faithful to the Father through humility, prayer, and the Word of God. His victory over temptation inaugurates His triumph over the prince of this world and teaches us how to overcome temptation through fasting and Scripture.",
      "sources": [
        { "type": "ccc", "ref": "538-540" },
        { "type": "scripture", "ref": "Matthew 4:1-11" }
      ],
      "keywords": ["temptation of jesus", "forty days", "fasting", "new adam", "desert spiritual warfare"],
      "level": "basic"
    },
    {
      "id": "jc-sacred-heart-devotion",
      "category": "jesus-christ",
      "question": "What is the Catholic theology behind devotion to the Sacred Heart of Jesus?",
      "answer": "Devotion to the Most Sacred Heart of Jesus honors the physical heart of Christ as the living symbol of His boundless, sacrificial love for humanity and the Holy Trinity. Pierced by the soldier's lance on Calvary, from which flowed blood and water (representing the Sacraments of Baptism and the Eucharist), the Sacred Heart calls believers to reparation, gratitude, and intimate love. Formalized especially after revelations to Saint Margaret Mary Alacoque in the 17th century, the devotion centers on contemplating Christ's compassionate burning love for wounded humanity.",
      "sources": [
        { "type": "ccc", "ref": "478" },
        { "type": "scripture", "ref": "John 19:34" }
      ],
      "keywords": ["sacred heart", "margaret mary", "love of christ", "reparation", "blood and water"],
      "level": "basic"
    },
    {
      "id": "jc-miracles-as-signs-of-kingdom",
      "category": "jesus-christ",
      "question": "What was the primary purpose of the miracles worked by Jesus?",
      "answer": "Jesus performed miracles not as magical spectacles to satisfy idle curiosity, but as messianic 'signs' and 'wonders' demonstrating that the Kingdom of God had arrived in His person. His healings, exorcisms, raising of the dead, and authority over nature fulfilled Old Testament prophecies and testified that the Father had sent Him. Moreover, Christ's miracles pointed to an even greater healing: deliverance from the slavery of sin and eternal death, inviting observers to faith, conversion, and trust in His divine authority.",
      "sources": [
        { "type": "ccc", "ref": "547-550" },
        { "type": "scripture", "ref": "John 20:30-31" }
      ],
      "keywords": ["miracles of jesus", "signs and wonders", "kingdom of god", "messianic signs", "healings"],
      "level": "basic"
    },
    {
      "id": "jc-divine-mercy-revelation",
      "category": "jesus-christ",
      "question": "What is the message of the Divine Mercy revealed to Saint Faustina Kowalska?",
      "answer": "The message of Divine Mercy, revealed by Jesus to Saint Maria Faustina Kowalska in the 1930s, reminds the modern world that God's mercy is greater than any sin and is readily available to the most hardened sinner. Jesus asked for the Chaplet of Divine Mercy, the veneration of the Divine Mercy Image with the signature 'Jesus, I trust in You', and the celebration of Divine Mercy Sunday on the Second Sunday of Easter. The rays of pale and red light streaming from His heart symbolize the water that justifies and the blood that enlivens souls.",
      "sources": [
        { "type": "ccc", "ref": "1846" },
        { "type": "scripture", "ref": "Ephesians 2:4-5" }
      ],
      "keywords": ["divine mercy", "st faustina", "chaplet", "mercy sunday", "jesus i trust in you"],
      "level": "basic"
    },
    {
      "id": "jc-good-shepherd-allegory",
      "category": "jesus-christ",
      "question": "How does Jesus embody the title 'The Good Shepherd'?",
      "answer": "In John 10, Jesus calls Himself the Good Shepherd who 'lays down his life for the sheep,' contrasting Himself with hirelings who abandon the flock in times of danger. Jesus knows His sheep individually by name, leads them to green pastures of eternal life, and seeks out the lost with boundless patience (Luke 15). By shedding His blood on Calvary, He fulfilled Ezekiel's prophecy that God Himself would shepherd His people, establishing a model of self-sacrificing pastoral charity that all bishops and priests are called to emulate.",
      "sources": [
        { "type": "ccc", "ref": "754" },
        { "type": "scripture", "ref": "John 10:11-16" }
      ],
      "keywords": ["good shepherd", "pastoral care", "john 10", "lost sheep", "sacrificial love"],
      "level": "basic"
    },
    {
      "id": "jc-christ-the-king-sovereignty",
      "category": "jesus-christ",
      "question": "What is the meaning of the Solemnity and Kingship of Christ the King?",
      "answer": "Instituted by Pope Pius XI in 1925 with the encyclical Quas Primas, the Kingship of Christ affirms that Jesus Christ holds universal sovereignty not only over individual hearts and the Church, but over all nations, governments, and societies. His kingdom is 'not of this world' in its worldly ambition or violent methods, but a kingdom of truth, justice, peace, and holiness. The Solemnity of Our Lord Jesus Christ, King of the Universe, marks the final Sunday of the Liturgical Year, anticipating the final triumph when God will be all in all.",
      "sources": [
        { "type": "ccc", "ref": "440" },
        { "type": "ccc", "ref": "2105" },
        { "type": "scripture", "ref": "Revelation 19:16" }
      ],
      "keywords": ["christ the king", "kingship of christ", "quas primas", "sovereignty", "liturgical year"],
      "level": "intermediate"
    },
    {
      "id": "jc-atonement-and-redemption",
      "category": "jesus-christ",
      "question": "How did Jesus' sacrifice on the Cross redeem humanity from sin?",
      "answer": "Christ's sacrifice on the Cross redeemed humanity by offering a sacrifice of infinite love, obedience, and reparation that outweighed the infinite offense of human sin against God. In Catholic theology, this is not penal substitution (God pouring out wrath on an innocent victim), but vicarious satisfaction and redemptive love: as the New Adam and Head of the human race, Jesus freely offered His life as a fragrant offering to the Father. Through His precious blood, He purchased our freedom from the slavery of Satan, canceled the debt of sin, and reopened paradise.",
      "sources": [
        { "type": "ccc", "ref": "613-618" },
        { "type": "scripture", "ref": "1 Peter 1:18-19" }
      ],
      "keywords": ["atonement", "redemption", "salvation", "satisfaction", "precious blood", "sacrifice of the cross"],
      "level": "intermediate"
    }
  ],

  "church-and-hierarchy.json": [
    {
      "id": "ch-mystical-body-of-christ",
      "category": "church-and-hierarchy",
      "question": "What does it mean that the Church is the 'Mystical Body of Christ'?",
      "answer": "The Apostle Paul teaches that the Church is not merely a social club or human organization, but the living Mystical Body of Christ on earth (1 Corinthians 12). Christ is the divine Head, and all baptized faithful are His members, united by the Holy Spirit. Just as bodily organs have distinct functions yet cooperate for the health of the whole, each Christian has specific charisms and duties. When one member suffers, all suffer together; when one is honored, all rejoice. Through the sacraments, especially the Eucharist, this mystical union with Christ and each other is continually nourished.",
      "sources": [
        { "type": "ccc", "ref": "787-795" },
        { "type": "scripture", "ref": "1 Corinthians 12:12-27" }
      ],
      "keywords": ["mystical body", "head and members", "communion", "st paul", "unity in diversity"],
      "level": "basic"
    },
    {
      "id": "ch-magisterium-ordinary-extraordinary",
      "category": "church-and-hierarchy",
      "question": "What is the difference between the Extraordinary and Ordinary Magisterium?",
      "answer": "The Magisterium is the teaching authority of the Church entrusted to the Pope and the bishops in communion with him. The Extraordinary Magisterium is exercised in two definitive ways: when the Pope speaks 'ex cathedra' to define a dogma of faith or morals, or when an Ecumenical Council in union with the Pope defines doctrine. The Ordinary and Universal Magisterium is exercised when bishops worldwide, teaching in communion with the Roman Pontiff, agree on a doctrine to be held definitively. Catholics owe religious submission of will and intellect to the authentic teaching of both.",
      "sources": [
        { "type": "ccc", "ref": "888-892" },
        { "type": "scripture", "ref": "Luke 10:16" }
      ],
      "keywords": ["magisterium", "extraordinary magisterium", "ordinary magisterium", "dogma", "papal teaching"],
      "level": "advanced"
    },
    {
      "id": "ch-three-degrees-holy-orders",
      "category": "church-and-hierarchy",
      "question": "What are the three degrees of the Sacrament of Holy Orders?",
      "answer": "The Sacrament of Holy Orders comprises three distinct hierarchical degrees instituted by Christ: the Episcopate (bishops), the Presbyterate (priests), and the Diaconate (deacons). Bishops possess the fullness of the sacrament, succeeding the Apostles as chief pastors, teachers, and sanctifiers of their dioceses. Priests are co-workers of the bishops, consecrated to preach the Gospel, shepherd the faithful, and celebrate the sacraments, especially the Eucharist and Reconciliation. Deacons are ordained not unto the priesthood, but unto ministry of service (caritas), the Word, and liturgical assistance.",
      "sources": [
        { "type": "ccc", "ref": "1554-1571" },
        { "type": "scripture", "ref": "1 Timothy 3:1-13" }
      ],
      "keywords": ["holy orders", "bishops", "priests", "deacons", "episcopate", "presbyterate", "diaconate"],
      "level": "basic"
    },
    {
      "id": "ch-permanent-diaconate-role",
      "category": "church-and-hierarchy",
      "question": "What is the permanent diaconate and what can a Catholic deacon do?",
      "answer": "Restored as a permanent rank by the Second Vatican Council, the permanent diaconate allows both married and single men to be ordained to sacred ministry for life. A deacon is an ordained minister who proclaims the Gospel at Mass, preaches homilies, administers solemn Baptism, witnesses and blesses Holy Matrimony, brings Viaticum to the dying, and presides at funeral vigils and burial services. Deacons also lead works of charitable outreach and social justice in parishes, embodying Christ the Servant.",
      "sources": [
        { "type": "ccc", "ref": "1569-1571" },
        { "type": "scripture", "ref": "Acts 6:1-6" }
      ],
      "keywords": ["permanent deacon", "diaconate", "parish ministry", "christ the servant", "ordination"],
      "level": "basic"
    },
    {
      "id": "ch-consecrated-life-vows",
      "category": "church-and-hierarchy",
      "question": "What is consecrated religious life and the evangelical counsels?",
      "answer": "Consecrated life is a special state in the Church where men and women profess the three evangelical counsels of poverty, chastity, and obedience through public vows. Living in religious communities (such as Benedictines, Franciscans, Dominicans, or Salesians) or as consecrated virgins and hermits, they dedicate their entire lives to God's love and the salvation of souls. Their life of prayer, contemplation, and apostolic charity serves as a living sign of the heavenly kingdom and a witness to the radical demands of the Gospel.",
      "sources": [
        { "type": "ccc", "ref": "914-933" },
        { "type": "scripture", "ref": "Matthew 19:12" }
      ],
      "keywords": ["consecrated life", "evangelical counsels", "poverty chastity obedience", "religious orders", "monks and nuns"],
      "level": "intermediate"
    },
    {
      "id": "ch-ecumenism-christian-unity",
      "category": "church-and-hierarchy",
      "question": "What is the Catholic approach to ecumenism and non-Catholic Christians?",
      "answer": "Ecumenism is the Holy Spirit-inspired movement toward restoring full visible unity among all baptized Christians, in accordance with Christ's prayer 'that they may all be one' (John 17:21). The Second Vatican Council affirmed that non-Catholic Christians are real brothers and sisters in Christ through Baptism, sharing many elements of sanctification and truth (such as Sacred Scripture, grace, faith, and the gifts of the Spirit). True ecumenism requires spiritual conversion, prayer, fraternal dialogue, and common charitable action, while faithfully upholding the fullness of Catholic truth.",
      "sources": [
        { "type": "ccc", "ref": "817-822" },
        { "type": "scripture", "ref": "John 17:20-23" }
      ],
      "keywords": ["ecumenism", "christian unity", "unitatis redintegratio", "separated brethren", "dialogue"],
      "level": "intermediate"
    },
    {
      "id": "ch-interreligious-dialogue-nostra-aetate",
      "category": "church-and-hierarchy",
      "question": "How does the Catholic Church view non-Christian religions?",
      "answer": "In the declaration Nostra Aetate, the Second Vatican Council stated that the Catholic Church rejects nothing that is true and holy in non-Christian religions (such as Judaism, Islam, Hinduism, and Buddhism). The Church recognizes whatever truth and goodness they contain as a 'preparation for the Gospel.' The Church holds a special spiritual bond with the Jewish people, the root of salvation history. Nevertheless, the Church constantly proclaims Jesus Christ as 'the Way, the Truth, and the Life' in whom all fullness of religious life is found.",
      "sources": [
        { "type": "ccc", "ref": "839-845" },
        { "type": "scripture", "ref": "Acts 17:22-28" }
      ],
      "keywords": ["interreligious dialogue", "nostra aetate", "non-christian religions", "judaism and islam", "evangelization"],
      "level": "intermediate"
    },
    {
      "id": "ch-ecumenical-councils-authority",
      "category": "church-and-hierarchy",
      "question": "What is an Ecumenical Council and what authority do its teachings hold?",
      "answer": "An Ecumenical (Universal) Council is a solemn assembly of the worldwide College of Bishops convened and confirmed by the Roman Pontiff to address crucial matters of doctrine, morals, and Church discipline. There have been 21 historical Ecumenical Councils, from Nicaea I (325 AD) to Vatican II (1962-1965). When an Ecumenical Council solemnly defines a dogma of faith or morals in union with the Pope, its decrees are infallible and binding on the universal Church, guided by the Holy Spirit.",
      "sources": [
        { "type": "ccc", "ref": "884" },
        { "type": "scripture", "ref": "Acts 15:1-29" }
      ],
      "keywords": ["ecumenical councils", "council of nicaea", "vatican ii", "college of bishops", "infallibility"],
      "level": "intermediate"
    },
    {
      "id": "ch-canon-law-purpose",
      "category": "church-and-hierarchy",
      "question": "What is the Code of Canon Law and why does the Church have legal rules?",
      "answer": "The Code of Canon Law (Codex Iuris Canonici) is the organized body of ecclesiastical laws governing the life, sacraments, administration, and rights of the faithful in the Catholic Church. Canon law does not replace the Gospel, but translates the Gospel and theology into practical ecclesiastical life. Its supreme purpose is summarized in its final canon (Canon 1752): 'the salvation of souls, which must always be the supreme law in the Church' (salus animarum suprema lex).",
      "sources": [
        { "type": "ccc", "ref": "894-896" },
        { "type": "scripture", "ref": "1 Corinthians 14:40" }
      ],
      "keywords": ["canon law", "code of canon law", "church discipline", "salvation of souls", "administration"],
      "level": "intermediate"
    },
    {
      "id": "ch-eastern-catholic-churches",
      "category": "church-and-hierarchy",
      "question": "What are the Eastern Catholic Churches and how are they related to Rome?",
      "answer": "The Catholic Church is an organic communion of 24 distinct 'Sui Iuris' (self-governing) autonomous Churches: 1 Western (Latin) Church and 23 Eastern Catholic Churches (such as the Byzantine, Maronite, Melkite, Ukrainian, and Syro-Malabar Churches). Eastern Catholics share identical dogmas and full sacramental communion under the Pope, but celebrate different ancient liturgical rites, have unique spiritual and canonical traditions, and ordain married men to the priesthood according to their patrimony.",
      "sources": [
        { "type": "ccc", "ref": "814" },
        { "type": "ccc", "ref": "1202-1203" },
        { "type": "scripture", "ref": "Galatians 3:28" }
      ],
      "keywords": ["eastern catholic churches", "byzantine rite", "maronite", "sui iuris", "communion with rome"],
      "level": "intermediate"
    },
    {
      "id": "ch-parish-pastoral-and-finance-councils",
      "category": "church-and-hierarchy",
      "question": "What is the role of Parish Pastoral and Finance Councils in local chaplaincies?",
      "answer": "Under Canon Law (Canons 536 and 537), each parish and chaplaincy is guided by the Parish Priest (Pastor / Chaplain), assisted by consultative bodies of the lay faithful: the Parish Pastoral Council and Parish Finance Council. The Pastoral Council helps discern pastoral initiatives, evangelization, and youth programs, while the Finance Council oversees the stewardship, budgeting, auditing, and maintenance of church properties. These councils embody co-responsibility and active lay collaboration.",
      "sources": [
        { "type": "ccc", "ref": "900-913" },
        { "type": "scripture", "ref": "1 Peter 4:10" }
      ],
      "keywords": ["parish pastoral council", "finance council", "stewardship", "laity collaboration", "parish administration"],
      "level": "basic"
    },
    {
      "id": "ch-synodality-meaning",
      "category": "church-and-hierarchy",
      "question": "What does 'Synodality' mean in the life of the Catholic Church?",
      "answer": "The Greek word 'synod' means 'walking together on the way'. Synodality describes the specific style, culture, and path of the Church as the People of God journeying together in mission, guided by the Holy Spirit. It emphasizes mutual listening between the hierarchy and the laity, discernment through prayer and dialogue, and co-responsibility for the Gospel. Synodality is not parliamentary democracy or changing settled dogmas; rather, it is a spiritual renewal of communion and participation for evangelization.",
      "sources": [
        { "type": "ccc", "ref": "781-782" },
        { "type": "scripture", "ref": "Acts 15:28" }
      ],
      "keywords": ["synodality", "synod of bishops", "walking together", "listening", "communion participation mission"],
      "level": "intermediate"
    },
    {
      "id": "ch-vatican-city-holy-see",
      "category": "church-and-hierarchy",
      "question": "What is the Holy See and why does Vatican City exist as an independent state?",
      "answer": "The 'Holy See' (Sancta Sedes) is the episcopal jurisdiction and supreme governing authority of the Bishop of Rome (the Pope) over the universal Catholic Church. Vatican City State is the small sovereign territory established by the Lateran Treaty in 1929. Its primary purpose is not political power, but to guarantee the complete spiritual freedom, diplomatic sovereignty, and independence of the Pope and the Holy See from control by any secular nation or political empire.",
      "sources": [
        { "type": "ccc", "ref": "882" },
        { "type": "scripture", "ref": "Matthew 16:18-19" }
      ],
      "keywords": ["holy see", "vatican city", "papacy", "sovereignty", "lateran treaty", "independence"],
      "level": "basic"
    },
    {
      "id": "ch-parish-societies-pious-organizations",
      "category": "church-and-hierarchy",
      "question": "Why does the Church encourage pious societies and lay apostolic organizations?",
      "answer": "The Catholic Church strongly encourages lay associations, pious societies, and confraternities (such as the Legion of Mary, Catholic Men Organization, Catholic Women Organization, St. Vincent de Paul Society, and Catholic Youth Organization) as vital expressions of the lay apostolate. These organizations foster deep spiritual growth, brotherly fellowship, charitable service to the poor, and active evangelization within parishes, helping parishioners live out their baptismal call in daily family and professional life.",
      "sources": [
        { "type": "ccc", "ref": "900-905" },
        { "type": "scripture", "ref": "Romans 12:4-8" }
      ],
      "keywords": ["pious societies", "lay associations", "legion of mary", "cmo", "cwo", "cyo", "apostolate"],
      "level": "basic"
    }
  ],

  "mary-and-saints.json": [
    {
      "id": "ms-perpetual-virginity-of-mary",
      "category": "mary-and-saints",
      "question": "What does the dogma of the Perpetual Virginity of Mary mean?",
      "answer": "The dogma of the Perpetual Virginity teaches that Mary was a virgin before, during, and perpetually after the birth of Jesus Christ ('aeiparthenos'). Christ was conceived without human seed by the Holy Spirit. Her virginity is a sign of her undivided consecration to God and the miraculous divine origin of Jesus. When Scripture mentions the 'brothers of Jesus' (Mark 6:3), ancient Hebrew and Aramaic idioms used the term 'brother' for close cousins and kinsmen, as seen throughout the Old Testament.",
      "sources": [
        { "type": "ccc", "ref": "496-507" },
        { "type": "scripture", "ref": "Luke 1:34" }
      ],
      "keywords": ["perpetual virginity", "brothers of jesus", "virgin birth", "marian dogmas", "consecration"],
      "level": "intermediate"
    },
    {
      "id": "ms-mother-of-the-church",
      "category": "mary-and-saints",
      "question": "Why is the Blessed Virgin Mary called 'Mother of the Church'?",
      "answer": "Mary was proclaimed 'Mother of the Church' (Mater Ecclesiae) by Pope Saint Paul VI at the close of the Second Vatican Council. Because she is the Mother of Jesus Christ, who is the Head of the Mystical Body, she is spiritually the Mother of all who are united to Him as members of that Body. At the foot of the Cross, Jesus gave Mary to the beloved disciple John—and in him, to all believers—with the words: 'Woman, behold your son... Behold your mother' (John 19:26-27). She continually intercedes for the pilgrim Church.",
      "sources": [
        { "type": "ccc", "ref": "963-970" },
        { "type": "scripture", "ref": "John 19:26-27" }
      ],
      "keywords": ["mother of the church", "mater ecclesiae", "foot of the cross", "spiritual mother", "marian devotion"],
      "level": "basic"
    },
    {
      "id": "ms-the-holy-rosary-mysteries",
      "category": "mary-and-saints",
      "question": "What is the Holy Rosary and what are its four sets of mysteries?",
      "answer": "The Holy Rosary is a biblical, meditative prayer tracing the life, ministry, passion, and glory of Jesus Christ through the eyes of His Mother. It consists of reciting decades of Hail Marys preceded by the Our Father and followed by the Glory Be, while contemplating twenty sacred mysteries: the Joyful Mysteries (incarnation and childhood), the Luminous Mysteries (public ministry instituted by Pope John Paul II), the Sorrowful Mysteries (passion and death), and the Glorious Mysteries (resurrection and eternal life).",
      "sources": [
        { "type": "ccc", "ref": "971" },
        { "type": "ccc", "ref": "2678" },
        { "type": "scripture", "ref": "Luke 1:28" }
      ],
      "keywords": ["holy rosary", "mysteries of the rosary", "joyful sorrowful glorious luminous", "hail mary", "john paul ii"],
      "level": "basic"
    },
    {
      "id": "ms-marian-apparitions-discernment",
      "category": "mary-and-saints",
      "question": "How does the Catholic Church investigate and approve Marian apparitions?",
      "answer": "The Catholic Church exercises extreme rigor and prudence before approving any reported apparition or private revelation. The local bishop and the Dicastery for the Doctrine of the Faith examine the psychological health and moral integrity of the visionary, the theological orthodoxy of the messages, the fruits of spiritual conversion, and absence of financial exploitation. Even when approved (such as Lourdes, Fatima, or Guadalupe), apparitions belong to private revelation and do not add to the public deposit of faith; their purpose is simply to help believers live the Gospel more deeply.",
      "sources": [
        { "type": "ccc", "ref": "67" },
        { "type": "scripture", "ref": "1 Thessalonians 5:19-21" }
      ],
      "keywords": ["marian apparitions", "fatima", "lourdes", "private revelation", "discernment", "investigation"],
      "level": "intermediate"
    },
    {
      "id": "ms-latria-dulia-hyperdulia",
      "category": "mary-and-saints",
      "question": "What is the theological difference between Latria, Dulia, and Hyperdulia?",
      "answer": "Catholic theology makes strict distinctions regarding honor: 1) Latria is true worship, adoration, and sacrificial honor due exclusively to God (Father, Son, and Holy Spirit); 2) Dulia is the veneration, honor, and respect given to holy angels and human saints who reflect God's grace; 3) Hyperdulia is the highest degree of veneration reserved uniquely for the Blessed Virgin Mary, honoring her supreme dignity as Mother of God and Queen of Heaven. Catholics never offer Latria (adoration) to Mary or any creature.",
      "sources": [
        { "type": "ccc", "ref": "971" },
        { "type": "ccc", "ref": "2132" },
        { "type": "scripture", "ref": "Luke 1:48" }
      ],
      "keywords": ["latria", "dulia", "hyperdulia", "worship vs veneration", "adoration of god"],
      "level": "intermediate"
    },
    {
      "id": "ms-st-joseph-patron-universal-church",
      "category": "mary-and-saints",
      "question": "What is the role of Saint Joseph in Catholic theology and devotion?",
      "answer": "Saint Joseph, the chaste spouse of Mary and foster father of Jesus, holds the highest place of honor among the saints after Our Lady (a veneration known as 'Protodulia'). Declared Patron of the Universal Church by Pope Blessed Pius IX, Joseph is the silent guardian of the Holy Family, model of fathers and workers, and Terror of Demons. He is especially invoked as the Patron of a Happy Death because he passed away in the arms of Jesus and Mary.",
      "sources": [
        { "type": "ccc", "ref": "437" },
        { "type": "ccc", "ref": "532" },
        { "type": "scripture", "ref": "Matthew 1:19-24" }
      ],
      "keywords": ["st joseph", "patron of church", "holy family", "terror of demons", "happy death", "chaste spouse"],
      "level": "basic"
    },
    {
      "id": "ms-canonization-process-steps",
      "category": "mary-and-saints",
      "question": "What are the stages of the canonization process for becoming a recognized saint?",
      "answer": "The Church's canonization process follows four rigorous steps: 1) Servant of God: The candidate's life and writings are investigated locally after a five-year waiting period; 2) Venerable: The Vatican Congregation for the Causes of Saints confirms that the person lived a life of 'heroic virtue' or was martyred; 3) Blessed (Beatification): A verified miracle attributed to their intercession is approved (waived for martyrs), permitting localized veneration; 4) Saint (Canonization): A second confirmed miracle is certified, and the Pope solemnly declares the person to be in heaven for universal veneration.",
      "sources": [
        { "type": "ccc", "ref": "828" },
        { "type": "scripture", "ref": "Hebrews 12:1" }
      ],
      "keywords": ["canonization", "beatification", "servant of god", "venerable", "miracles", "heroic virtue"],
      "level": "intermediate"
    },
    {
      "id": "ms-our-mother-of-perpetual-help-icon",
      "category": "mary-and-saints",
      "question": "What is the theological symbolism of the icon of Our Mother of Perpetual Help?",
      "answer": "The Byzantine icon of Our Mother of Perpetual Help depicts Mary holding the Child Jesus with profound maternal tenderness. The Archangels Michael and Gabriel hover above, displaying the instruments of Christ's Passion (the cross, nails, lance, and sponge). The young Jesus gazes back at the cross in apprehension, running to His Mother so swiftly that His sandal falls from His foot. Mary's eyes look not at the instruments or her Son, but directly at the viewer, inviting us to find refuge and perpetual help in all our trials and tribulations.",
      "sources": [
        { "type": "ccc", "ref": "1160-1161" },
        { "type": "scripture", "ref": "John 2:5" }
      ],
      "keywords": ["our mother of perpetual help", "byzantine icon", "maternal refuge", "omph", "chaplaincy patron"],
      "level": "basic"
    },
    {
      "id": "ms-patron-saints-intercession",
      "category": "mary-and-saints",
      "question": "Why do Catholics choose patron saints for baptism, confirmation, and professions?",
      "answer": "Choosing a patron saint provides the Christian with a heavenly model of heroic virtue, an intimate spiritual friend, and a tireless intercessor before the throne of God. By taking a saint's name at Baptism and Confirmation, the believer is inspired to imitate their fidelity to the Gospel and can call upon their protection throughout life. Likewise, parishes, dioceses, nations, and occupational groups (such as doctors under St. Luke or musicians under St. Cecilia) have heavenly patrons who intercede for their specific needs.",
      "sources": [
        { "type": "ccc", "ref": "2156" },
        { "type": "scripture", "ref": "Revelation 8:3-4" }
      ],
      "keywords": ["patron saints", "confirmation name", "intercession", "role models", "heavenly advocates"],
      "level": "basic"
    },
    {
      "id": "ms-brown-scapular-and-medals",
      "category": "mary-and-saints",
      "question": "What is the spiritual meaning of wearing the Brown Scapular and Miraculous Medal?",
      "answer": "Sacramentals like the Brown Scapular of Our Lady of Mount Carmel and the Miraculous Medal (revealed to St. Catherine Labouré) are sacred signs that dispose the soul to receive grace and foster devotion. The Scapular represents Mary's protective mantle, symbolizing our consecration to her virtues of purity, prayer, and humility, rather than a magical talisman guaranteeing heaven. Wearing these items faithfully reminds Catholics of their baptismal promises and encourages frequent prayer and fidelity to Christ.",
      "sources": [
        { "type": "ccc", "ref": "1667-1670" },
        { "type": "scripture", "ref": "Acts 19:11-12" }
      ],
      "keywords": ["brown scapular", "miraculous medal", "sacramentals", "carmel", "marian devotion"],
      "level": "basic"
    },
    {
      "id": "ms-communion-of-saints-three-states",
      "category": "mary-and-saints",
      "question": "What are the three states of the Church in the Communion of Saints?",
      "answer": "The Communion of Saints unites all members of Christ across three distinct states: 1) The Church Militant: the faithful on earth engaged in spiritual warfare against sin and temptation; 2) The Church Suffering (or Penitent): the holy souls in Purgatory being purified before entering heaven, helped by our prayers and Masses; and 3) The Church Triumphant: the blessed in Heaven enjoying the Beatific Vision, who intercede for us. All three states are joined in one great communion of love and prayer in Christ.",
      "sources": [
        { "type": "ccc", "ref": "954-959" },
        { "type": "scripture", "ref": "Hebrews 12:22-24" }
      ],
      "keywords": ["communion of saints", "church militant", "church suffering", "church triumphant", "purgatory"],
      "level": "intermediate"
    },
    {
      "id": "ms-hail-mary-scriptural-roots",
      "category": "mary-and-saints",
      "question": "What are the scriptural origins of the Hail Mary prayer?",
      "answer": "The Hail Mary (Ave Maria) is almost entirely taken directly from Sacred Scripture. The first line combines the greeting of Archangel Gabriel at the Annunciation: 'Hail, full of grace, the Lord is with you' (Luke 1:28) and Elizabeth's greeting inspired by the Holy Spirit at the Visitation: 'Blessed are you among women, and blessed is the fruit of your womb' (Luke 1:42). The second petitionary half—'Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death'—was formulated by the Church to invoke the Mother of God's intercession.",
      "sources": [
        { "type": "ccc", "ref": "2676-2677" },
        { "type": "scripture", "ref": "Luke 1:28" },
        { "type": "scripture", "ref": "Luke 1:42" }
      ],
      "keywords": ["hail mary", "annunciation", "visitation", "biblical prayer", "ave maria"],
      "level": "basic"
    },
    {
      "id": "ms-mary-ark-of-the-new-covenant",
      "category": "mary-and-saints",
      "question": "Why does Catholic typology describe Mary as the 'Ark of the New Covenant'?",
      "answer": "In Old Testament typology, the golden Ark of the Covenant carried three items: the stone tablets of the Ten Commandments (the Word of God), the golden urn of manna (the bread from heaven), and Aaron's staff that budded (the true high priest). Mary is the living Ark of the New Covenant because she carried in her womb Jesus Christ: the living Word made flesh, the true Bread of Life come down from heaven, and the eternal High Priest. Revelation 11:19-12:1 directly connects the Ark in heaven with the woman clothed with the sun.",
      "sources": [
        { "type": "ccc", "ref": "2676" },
        { "type": "scripture", "ref": "Revelation 11:19" },
        { "type": "scripture", "ref": "Revelation 12:1" }
      ],
      "keywords": ["ark of the covenant", "marian typology", "manna", "word made flesh", "revelation 12"],
      "level": "intermediate"
    },
    {
      "id": "ms-magnificat-canticle",
      "category": "mary-and-saints",
      "question": "What is the spiritual theme of the Magnificat (Mary's Canticle)?",
      "answer": "The Magnificat (Luke 1:46-55), proclaimed by Mary during her visit to Elizabeth, is the great hymn of praise celebrating God's fidelity, holiness, and mercy. Mary rejoices in God her Savior, acknowledging that He looks with favor on the humble and scatters the proud in their conceit. The song declares that God fills the hungry with good things while sending the rich away empty, fulfilling the promises made to Abraham. Prayed daily in the Church's Evening Prayer (Vespers), it is a model of Christian praise and social justice.",
      "sources": [
        { "type": "ccc", "ref": "2619" },
        { "type": "scripture", "ref": "Luke 1:46-55" }
      ],
      "keywords": ["magnificat", "canticle of mary", "vespers", "humility", "mercy of god"],
      "level": "basic"
    }
  ],

  "sacraments-initiation-healing.json": [
    {
      "id": "sih-seven-sacraments-overview",
      "category": "sacraments-initiation-healing",
      "question": "What is a sacrament and why are there exactly seven sacraments?",
      "answer": "A sacrament is an efficacious sign of grace, instituted by Christ and entrusted to the Church, by which divine life is dispensed to us through visible rites. The Church recognizes seven sacraments corresponding to all the key stages and healing moments of human life: three Sacraments of Christian Initiation (Baptism, Confirmation, Eucharist), two Sacraments of Healing (Penance/Reconciliation and Anointing of the Sick), and two Sacraments of Service/Vocation (Holy Orders and Matrimony). They work 'ex opere operato' by the power of Christ's paschal sacrifice.",
      "sources": [
        { "type": "ccc", "ref": "1113-1131" },
        { "type": "scripture", "ref": "Matthew 28:19" }
      ],
      "keywords": ["seven sacraments", "ex opere operato", "efficacious sign", "grace", "initiation and healing"],
      "level": "basic"
    },
    {
      "id": "sih-baptism-desire-and-blood",
      "category": "sacraments-initiation-healing",
      "question": "Can someone be saved without water baptism through 'Baptism of Blood' or 'Baptism of Desire'?",
      "answer": "Yes. While the Church teaches that water baptism is the ordinary means of salvation instituted by Christ, God is not bound by His sacraments. Baptism of Blood occurs when an unbaptized person suffers martyrdom for the Christian faith, washed clean by dying with and for Christ. Baptism of Desire applies to catechumens who die before baptism, or anyone who, through no fault of their own, does not know the Gospel or the Church, yet sincerely seeks God and strives to do His will under the impulse of grace.",
      "sources": [
        { "type": "ccc", "ref": "1258-1260" },
        { "type": "scripture", "ref": "Luke 23:42-43" }
      ],
      "keywords": ["baptism of desire", "baptism of blood", "martyrdom", "salvation", "invincible ignorance"],
      "level": "intermediate"
    },
    {
      "id": "sih-indelible-sacramental-character",
      "category": "sacraments-initiation-healing",
      "question": "Which sacraments impart an indelible sacramental mark and cannot be repeated?",
      "answer": "Three sacraments confer an indelible spiritual mark (or 'character') on the soul: Baptism, Confirmation, and Holy Orders. This character is an indelible seal imprinted by the Holy Spirit that configures the recipient permanently to Christ and His Church. Because this divine seal lasts forever on the soul (persisting even into eternity), these three sacraments can only be validly received once in a person's lifetime. Even if a baptized person falls away or commits apostasy, the character remains intact.",
      "sources": [
        { "type": "ccc", "ref": "1121" },
        { "type": "ccc", "ref": "1272" },
        { "type": "scripture", "ref": "Ephesians 1:13" }
      ],
      "keywords": ["indelible character", "sacramental seal", "baptism confirmation holy orders", "unrepeatable sacraments"],
      "level": "intermediate"
    },
    {
      "id": "sih-gifts-and-fruits-of-holy-spirit",
      "category": "sacraments-initiation-healing",
      "question": "What are the Seven Gifts and Twelve Fruits of the Holy Spirit received in Confirmation?",
      "answer": "In Confirmation, the seven gifts of the Holy Spirit (Isaiah 11:2) are perfected in the soul: Wisdom, Understanding, Counsel, Fortitude, Knowledge, Piety, and Fear of the Lord. These supernatural habits make the Christian docent to divine inspirations. When a Christian lives in cooperation with these gifts, the soul produces the twelve fruits of the Holy Spirit (Galatians 5:22-23): Charity, Joy, Peace, Patience, Kindness, Goodness, Generosity, Gentleness, Faithfulness, Modesty, Self-control, and Chastity.",
      "sources": [
        { "type": "ccc", "ref": "1830-1832" },
        { "type": "scripture", "ref": "Isaiah 11:2" },
        { "type": "scripture", "ref": "Galatians 5:22-23" }
      ],
      "keywords": ["gifts of holy spirit", "fruits of holy spirit", "confirmation", "isaiah 11", "galatians 5"],
      "level": "basic"
    },
    {
      "id": "sih-transubstantiation-explained",
      "category": "sacraments-initiation-healing",
      "question": "How does the Council of Trent define 'Transubstantiation'?",
      "answer": "At the words of consecration spoken by a validly ordained priest during the Holy Mass, a miraculous change occurs: the entire substance of bread is changed into the Body of Christ, and the entire substance of wine is changed into His Blood. The Council of Trent fittingly named this change 'Transubstantiation'. While the outward appearances ('accidents' or species) such as taste, texture, smell, and chemical properties remain bread and wine, the underlying reality is truly, really, and substantially the living Jesus Christ—Body, Blood, Soul, and Divinity.",
      "sources": [
        { "type": "ccc", "ref": "1373-1377" },
        { "type": "scripture", "ref": "John 6:51-56" }
      ],
      "keywords": ["transubstantiation", "real presence", "council of trent", "substance and accidents", "eucharist"],
      "level": "intermediate"
    },
    {
      "id": "sih-eucharistic-adoration-and-tabernacle",
      "category": "sacraments-initiation-healing",
      "question": "What is Eucharistic Adoration and why is the Blessed Sacrament reserved in the Tabernacle?",
      "answer": "Because the Eucharist is substantially Jesus Christ, the Church accords to the consecrated Host the worship of latria (adoration) that is due to God alone. Outside of Mass, consecrated hosts are reverently reserved in the tabernacle, primarily to provide Holy Communion to the sick and dying (Viaticum). The faithful also gather for Eucharistic Adoration, where the Host is displayed in a monstrance for silent prayer, contemplation, and Benediction. Sitting before Jesus in the Blessed Sacrament brings profound peace and spiritual intimacy.",
      "sources": [
        { "type": "ccc", "ref": "1378-1380" },
        { "type": "scripture", "ref": "Matthew 26:40" }
      ],
      "keywords": ["eucharistic adoration", "tabernacle", "monstrance", "benediction", "blessed sacrament"],
      "level": "basic"
    },
    {
      "id": "sih-eucharistic-fast-rules",
      "category": "sacraments-initiation-healing",
      "question": "What is the Eucharistic fast and what are its exemptions?",
      "answer": "Under Canon 919 of the Code of Canon Law, Catholics preparing to receive Holy Communion must abstain from all food and drink (except water and true medicine) for at least one full hour prior to receiving the sacrament. This brief physical fast fosters reverent anticipation and recollection, reminding us that the Eucharist is heavenly food unlike ordinary meals. The elderly, the sick, and those caring for them are exempt from the one-hour fast and may receive Communion without delay.",
      "sources": [
        { "type": "ccc", "ref": "1387" },
        { "type": "scripture", "ref": "1 Corinthians 11:27-29" }
      ],
      "keywords": ["eucharistic fast", "one hour fast", "receiving communion", "canon 919", "reverence"],
      "level": "basic"
    },
    {
      "id": "sih-viaticum-food-for-the-journey",
      "category": "sacraments-initiation-healing",
      "question": "What is Viaticum and why is it given to the dying?",
      "answer": "Viaticum (Latin for 'provisions for the journey') is Holy Communion administered to a dying Christian as they prepare to pass from this earthly life to eternity. Accompanied by the Apostolic Pardon, the Anointing of the Sick, and the renewal of baptismal promises, Viaticum is the ultimate pledge of the resurrection: Christ says, 'He who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day' (John 6:54). It gives spiritual fortitude to face death with peace.",
      "sources": [
        { "type": "ccc", "ref": "1524-1525" },
        { "type": "scripture", "ref": "John 6:54" }
      ],
      "keywords": ["viaticum", "last rites", "dying christian", "communion for dying", "apostolic pardon"],
      "level": "intermediate"
    },
    {
      "id": "sih-perfect-vs-imperfect-contrition",
      "category": "sacraments-initiation-healing",
      "question": "What is the difference between Perfect and Imperfect Contrition in confession?",
      "answer": "Contrition is heartfelt sorrow for sins committed, accompanied by a firm resolution not to sin again. Imperfect contrition (attrition) arises from consideration of sin's ugliness or the fear of eternal damnation and God's punishments; this is sufficient for valid sacramental absolution in Confession. Perfect contrition arises purely from love of God, who is infinitely good and lovable above all things. Perfect contrition remits venial sins immediately, and even pardons mortal sins provided the penitent has the sincere intention to go to sacramental confession as soon as possible.",
      "sources": [
        { "type": "ccc", "ref": "1451-1454" },
        { "type": "scripture", "ref": "Psalm 51:17" }
      ],
      "keywords": ["perfect contrition", "imperfect contrition", "attrition", "sorrow for sin", "absolution"],
      "level": "intermediate"
    },
    {
      "id": "sih-seal-of-the-confessional",
      "category": "sacraments-initiation-healing",
      "question": "How absolute is the Seal of Confession for Catholic priests?",
      "answer": "The sacramental seal of Confession is inviolable and absolute without any exception whatsoever (Canon 983). A priest can never reveal, directly or indirectly, by word, gesture, or any other manner, the sins confessed to him by a penitent, even under pain of death or civil imprisonment. Any priest who intentionally breaks this sacred seal incurs automatic excommunication (latae sententiae) reserved to the Holy See. This absolute guarantee allows penitents to lay bare their souls before Christ's mercy with total trust and peace.",
      "sources": [
        { "type": "ccc", "ref": "1467" },
        { "type": "scripture", "ref": "Proverbs 11:13" }
      ],
      "keywords": ["seal of confession", "sacramental seal", "confessional secrecy", "canon 983", "excommunication"],
      "level": "basic"
    },
    {
      "id": "sih-satisfaction-and-penance",
      "category": "sacraments-initiation-healing",
      "question": "Why does the priest assign a penance in the Sacrament of Reconciliation?",
      "answer": "While sacramental absolution wipes away the guilt of sin and eternal punishment, sin still leaves temporal punishment, bad habits, and harm done to oneself and others (such as damage to property or reputation). The penance assigned by the confessor (prayers, fasting, almsgiving, or acts of service) is an act of 'satisfaction' helping to repair this spiritual damage, restore spiritual health, and expiate the temporal consequences of sin in union with Christ's cross.",
      "sources": [
        { "type": "ccc", "ref": "1459-1460" },
        { "type": "scripture", "ref": "Luke 19:8" }
      ],
      "keywords": ["penance", "satisfaction", "reparation", "temporal punishment", "reconciliation"],
      "level": "basic"
    },
    {
      "id": "sih-anointing-of-sick-effects",
      "category": "sacraments-initiation-healing",
      "question": "Who can receive the Anointing of the Sick and what are its spiritual effects?",
      "answer": "The Sacrament of the Anointing of the Sick is not only for the moment of death, but for any Catholic who begins to be in danger of death due to grave illness, advanced age, or before undergoing serious surgery. Anointed with blessed oil by a priest, the sick person receives: union with Christ's passion for the good of the Church, peace and courage to endure suffering, the forgiveness of sins if unable to confess, and physical recovery if it serves the salvation of their soul.",
      "sources": [
        { "type": "ccc", "ref": "1511-1523" },
        { "type": "scripture", "ref": "James 5:14-15" }
      ],
      "keywords": ["anointing of the sick", "extreme unction", "oil of the sick", "healing sacrament", "james 5"],
      "level": "basic"
    },
    {
      "id": "sih-frequency-of-confession",
      "category": "sacraments-initiation-healing",
      "question": "How often should a Catholic go to Confession?",
      "answer": "Under the Precepts of the Church, every Catholic who has reached the age of discretion is strictly bound to confess mortal sins at least once a year, and must always confess before receiving Holy Communion if conscious of having committed a mortal sin. Beyond this bare minimum, the Church highly recommends frequent confession of even venial sins (e.g., monthly or bi-weekly). Regular confession deepens self-knowledge, fosters Christian humility, uproots bad habits, and supplies sacramental grace to resist future temptations.",
      "sources": [
        { "type": "ccc", "ref": "1457-1458" },
        { "type": "scripture", "ref": "1 John 1:9" }
      ],
      "keywords": ["frequent confession", "precepts of the church", "monthly confession", "venial sins", "growth in virtue"],
      "level": "basic"
    }
  ],

  "sacraments-service-and-liturgy.json": [
    {
      "id": "ssl-the-mass-as-holy-sacrifice",
      "category": "sacraments-service-and-liturgy",
      "question": "Why does Catholic theology call the Mass a 'True Sacrifice'?",
      "answer": "The Holy Mass is not a mere symbolic reenactment or a simple fellowship meal; it is the re-presentation (making present) of the one, identical sacrifice of Jesus Christ on Calvary. The victim is the same (Jesus Christ), the high priest offering it is the same (Jesus acting through the ordained priest 'in persona Christi'), only the manner of offering differs: on Calvary it was bloody, whereas on the altar it is offered in an unbloody sacramental manner. Through this sacrifice, the infinite graces of the Cross are applied to the living and dead.",
      "sources": [
        { "type": "ccc", "ref": "1362-1372" },
        { "type": "scripture", "ref": "Malachi 1:11" },
        { "type": "scripture", "ref": "1 Corinthians 11:26" }
      ],
      "keywords": ["sacrifice of the mass", "calvary", "unbloody sacrifice", "re-presentation", "in persona christi"],
      "level": "intermediate"
    },
    {
      "id": "ssl-liturgical-seasons-cycle",
      "category": "sacraments-service-and-liturgy",
      "question": "What are the seasons of the Catholic Liturgical Year and their spiritual focus?",
      "answer": "The Liturgical Year celebrates the entire mystery of Christ across six distinct seasons: 1) Advent: four weeks of prayerful preparation and penitence for the birth of Christ and His Second Coming; 2) Christmas: rejoicing in the Incarnation, extending from Christmas Eve to the Baptism of the Lord; 3) Ordinary Time (first part): reflecting on Jesus' teachings and miracles; 4) Lent: forty days of fasting, prayer, and almsgiving preparing for Holy Week; 5) The Sacred Paschal Triduum (Holy Thursday, Good Friday, Easter Vigil/Sunday): the summit of the year; 6) Easter: fifty days of joy culminating in Pentecost; followed by Ordinary Time (second part).",
      "sources": [
        { "type": "ccc", "ref": "1163-1171" },
        { "type": "scripture", "ref": "Ecclesiastes 3:1" }
      ],
      "keywords": ["liturgical seasons", "advent christmas lent easter", "paschal triduum", "ordinary time", "liturgical calendar"],
      "level": "basic"
    },
    {
      "id": "ssl-liturgical-colors-meaning",
      "category": "sacraments-service-and-liturgy",
      "question": "What do the various liturgical vestment colors symbolize at Mass?",
      "answer": "The Church uses specific liturgical vestment colors to visually express the character of the mystery being celebrated: 1) White/Gold: Joy, purity, and victory, worn during Easter, Christmas, feasts of Our Lord, Mary, and non-martyr saints; 2) Red: Fire of the Holy Spirit and shed blood, worn on Palm Sunday, Good Friday, Pentecost, and feasts of martyrs; 3) Green: Hope, spiritual life, and growth, worn during Ordinary Time; 4) Violet/Purple: Penance, expectation, and mourning, worn in Advent, Lent, and funerals; 5) Rose: Joy amidst penance, worn on Gaudete Sunday (Advent) and Laetare Sunday (Lent); 6) Black: Mourning, permitted on All Souls' Day and requiems.",
      "sources": [
        { "type": "ccc", "ref": "1155" },
        { "type": "scripture", "ref": "Revelation 7:9" }
      ],
      "keywords": ["liturgical colors", "vestments", "white red green violet rose", "gaudete laetare", "symbolism"],
      "level": "basic"
    },
    {
      "id": "ssl-what-are-sacramentals",
      "category": "sacraments-service-and-liturgy",
      "question": "What are sacramentals and how do they differ from the seven sacraments?",
      "answer": "Sacramentals are sacred signs (such as blessings, holy water, blessed salt, crucifixes, palms, ashes, and rosaries) instituted by the Church rather than directly by Christ. Unlike the seven sacraments which confer grace 'ex opere operato' by their own power, sacramentals prepare the soul to receive grace and dispose us to cooperate with God's Holy Spirit ('ex opere operantis Ecclesiae'). They sanctify every circumstance of daily human life and protect against demonic influences.",
      "sources": [
        { "type": "ccc", "ref": "1667-1679" },
        { "type": "scripture", "ref": "1 Timothy 4:4-5" }
      ],
      "keywords": ["sacramentals", "holy water", "crucifix", "blessings", "sacred signs"],
      "level": "basic"
    },
    {
      "id": "ssl-liturgy-of-the-hours",
      "category": "sacraments-service-and-liturgy",
      "question": "What is the Liturgy of the Hours (Divine Office)?",
      "answer": "The Liturgy of the Hours (the Breviary or Divine Office) is the official public liturgical prayer of the universal Catholic Church, consecrating the hours of day and night with the Psalms, canticles, Scripture readings, and intercessions. Ordained clergy and consecrated religious are canonically bound to pray the Hours daily, and the Second Vatican Council strongly encouraged the laity to pray them as well. The two hinges are Morning Prayer (Lauds) at daybreak and Evening Prayer (Vespers) at sunset, keeping the Church in unceasing prayer.",
      "sources": [
        { "type": "ccc", "ref": "1174-1178" },
        { "type": "scripture", "ref": "Psalm 119:164" }
      ],
      "keywords": ["liturgy of the hours", "divine office", "breviary", "lauds and vespers", "psalms"],
      "level": "intermediate"
    },
    {
      "id": "ssl-active-participation-liturgy",
      "category": "sacraments-service-and-liturgy",
      "question": "What is 'full, conscious, and active participation' in the sacred liturgy?",
      "answer": "Emphasized by the Second Vatican Council in Sacrosanctum Concilium, active liturgical participation is first and foremost internal: uniting one's heart, intellect, intentions, and trials with Christ's sacrifice on the altar through reverent prayer, attentive listening, and spiritual silence. Externally, this interior devotion is expressed by reciting communal responses, singing hymns, observing reverent bodily postures (kneeling, bowing, standing), and receiving Holy Communion with clean hearts.",
      "sources": [
        { "type": "ccc", "ref": "1140-1144" },
        { "type": "scripture", "ref": "Romans 12:1" }
      ],
      "keywords": ["active participation", "sacrosanctum concilium", "liturgical worship", "reverence", "postures at mass"],
      "level": "intermediate"
    },
    {
      "id": "ssl-marriage-annulment-vs-divorce",
      "category": "sacraments-service-and-liturgy",
      "question": "What is a Decree of Nullity (Annulment) and how does it differ from a divorce?",
      "answer": "A civil divorce claims to dissolve a legal marriage contract. In contrast, the Catholic Church upholds Christ's explicit teaching that a valid, consummated sacramental marriage can never be dissolved by any human power ('What God has joined together, let not man put asunder'). A Decree of Nullity is not 'Catholic divorce'; it is a canonical judgment after ecclesiastical investigation stating that on the wedding day, an essential element was missing (such as lack of free consent, grave lack of discretion, psychological incapacity, or deliberate exclusion of children or fidelity), meaning no valid sacramental bond was ever formed.",
      "sources": [
        { "type": "ccc", "ref": "1625-1632" },
        { "type": "scripture", "ref": "Matthew 19:6" }
      ],
      "keywords": ["annulment", "decree of nullity", "indissolubility", "matrimonial tribunal", "divorce difference"],
      "level": "intermediate"
    },
    {
      "id": "ssl-mixed-marriages-disparity-cult",
      "category": "sacraments-service-and-liturgy",
      "question": "Can a Catholic marry a non-Catholic, and what permissions are required?",
      "answer": "Yes. A marriage between a Catholic and a baptized non-Catholic Christian is a 'mixed marriage' requiring episcopal permission. A marriage between a Catholic and an unbaptized person is 'disparity of cult' requiring a dispensation for validity. In both cases, the Catholic party must sincerely promise to preserve their Catholic faith and do everything in their power to have all children baptized and brought up in the Catholic Church, and the non-Catholic partner must be informed of this commitment.",
      "sources": [
        { "type": "ccc", "ref": "1633-1637" },
        { "type": "scripture", "ref": "1 Corinthians 7:12-16" }
      ],
      "keywords": ["mixed marriage", "disparity of cult", "dispensation", "raising children catholic", "wedding rules"],
      "level": "basic"
    },
    {
      "id": "ssl-convalidation-of-marriage",
      "category": "sacraments-service-and-liturgy",
      "question": "What is the convalidation of a marriage in the Catholic Church?",
      "answer": "If a Catholic entered into a civil marriage or married outside the canonical form without dispensation from the bishop, that union is not recognized as valid by the Church. Convalidation is the canonical process by which this union is made a valid, sacramental marriage. The couple renews their true matrimonial consent before an authorized priest or deacon and two witnesses in a sacred ceremony, imparting sacramental grace and allowing the Catholic spouse to resume receiving the Sacraments.",
      "sources": [
        { "type": "ccc", "ref": "1623" },
        { "type": "scripture", "ref": "Colossians 3:18-19" }
      ],
      "keywords": ["convalidation", "canonical form", "civil marriage", "validation of marriage", "sacramental bond"],
      "level": "intermediate"
    },
    {
      "id": "ssl-priestly-celibacy-reasons",
      "category": "sacraments-service-and-liturgy",
      "question": "Why does the Latin Catholic Church practice clerical celibacy?",
      "answer": "In the Latin (Roman) Rite, priests freely choose perpetual celibacy 'for the sake of the kingdom of heaven' (Matthew 19:12). Following the example of Jesus Christ Himself, the celibate priest consecrates his whole heart and body to God with an undivided love. Celibacy frees the priest from familial obligations so he can be fully available to all parishioners day and night as a spiritual father, and serves as an eschatological witness pointing to the heavenly life where people neither marry nor are given in marriage.",
      "sources": [
        { "type": "ccc", "ref": "1579-1580" },
        { "type": "scripture", "ref": "Matthew 19:12" },
        { "type": "scripture", "ref": "1 Corinthians 7:32-35" }
      ],
      "keywords": ["priestly celibacy", "clergy celibacy", "undivided heart", "chastity", "latin rite discipline"],
      "level": "basic"
    },
    {
      "id": "ssl-why-only-men-ordained",
      "category": "sacraments-service-and-liturgy",
      "question": "Why does the Catholic Church only ordain men to the ministerial priesthood?",
      "answer": "In Ordinatio Sacerdotalis (1994), Pope Saint John Paul II reaffirmed that the Church has no authority whatsoever to confer priestly ordination on women, a teaching to be held definitively by all the faithful. This is not about human inequality or dignity (Mary is higher in dignity than any apostle or pope), but fidelity to Christ's own divine example: Jesus chose twelve men as His Apostles despite living in a culture filled with pagan priestesses, and the Apostles did likewise. The priest acts 'in persona Christi Capitis' (in the person of Christ the Bridegroom) offering His life for the Church, His Bride.",
      "sources": [
        { "type": "ccc", "ref": "1577-1578" },
        { "type": "scripture", "ref": "Mark 3:13-19" }
      ],
      "keywords": ["ordination of men", "ordinatio sacerdotalis", "in persona christi", "twelve apostles", "priestly role"],
      "level": "intermediate"
    },
    {
      "id": "ssl-postures-genuflection-reverence",
      "category": "sacraments-service-and-liturgy",
      "question": "What is the meaning of genuflecting, bowing, and kneeling in Catholic liturgy?",
      "answer": "In Catholic worship, bodily postures express and reinforce interior dispositions of faith. Kneeling is a sign of humble adoration, penance, and reverence before the majesty of God, especially during the Eucharistic Consecration. Genuflecting (touching the right knee completely to the floor) is an act of adoration directed specifically to the Real Presence of Jesus Christ in the Tabernacle. Bowing of the head or body honors the Holy Trinity, the name of Jesus and Mary, the altar of sacrifice, and the bishop.",
      "sources": [
        { "type": "ccc", "ref": "1153-1155" },
        { "type": "scripture", "ref": "Philippians 2:10" }
      ],
      "keywords": ["genuflection", "kneeling at mass", "bowing", "bodily postures", "adoration of eucharist"],
      "level": "basic"
    },
    {
      "id": "ssl-liturgy-of-the-word-structure",
      "category": "sacraments-service-and-liturgy",
      "question": "How is the Liturgy of the Word structured at Sunday Mass?",
      "answer": "The Liturgy of the Word feeds the faithful from the table of God's Word. On Sundays and Solemnities, it follows a three-year cycle (Years A, B, C) featuring: 1) The First Reading (almost always from the Old Testament, harmonizing with the Gospel); 2) The Responsorial Psalm (the sung prayer of Israel); 3) The Second Reading (from the New Testament Epistles or Revelation); 4) The Gospel Acclamation (Alleluia); 5) The Gospel reading (proclaimed by a deacon or priest while the assembly stands); followed by the Homily, the Creed, and the Universal Prayer (Prayers of the Faithful).",
      "sources": [
        { "type": "ccc", "ref": "1349" },
        { "type": "scripture", "ref": "Luke 4:16-21" }
      ],
      "keywords": ["liturgy of the word", "three year cycle", "readings at mass", "responsorial psalm", "gospel proclamation"],
      "level": "basic"
    },
    {
      "id": "ssl-sacred-vessels-and-linens",
      "category": "sacraments-service-and-liturgy",
      "question": "What are the sacred vessels and linens used on the altar at Mass?",
      "answer": "Due to reverence for the Real Presence, the Church uses dedicated sacred vessels and linens: 1) The Chalice (the cup holding the Precious Blood); 2) The Paten (the gold or silver plate holding the host); 3) The Ciborium (the covered vessel containing hosts for communion and reservation in the tabernacle); 4) The Corporal (the white linen cloth unfolded on the altar upon which the chalice and paten rest); 5) The Purificator (the linen cloth used to wipe the chalice); and 6) The Pall (a stiff linen square placed over the chalice to prevent foreign particles from falling into the Precious Blood).",
      "sources": [
        { "type": "ccc", "ref": "1147-1148" },
        { "type": "scripture", "ref": "Exodus 25:29" }
      ],
      "keywords": ["sacred vessels", "chalice and paten", "ciborium", "corporal and purificator", "altar linens"],
      "level": "basic"
    }
  ],

  "scripture-and-tradition.json": [
    {
      "id": "st-three-legged-stool-theology",
      "category": "scripture-and-tradition",
      "question": "What is the relationship between Scripture, Tradition, and the Magisterium?",
      "answer": "In Catholic theology, Sacred Scripture, Sacred Tradition, and the Magisterium are so closely linked that no one of them can stand without the others (often compared to a three-legged stool). As the Second Vatican Council taught in Dei Verbum, Sacred Scripture is the written speech of God, Sacred Tradition transmits the full living Word of God entrusted to the Apostles, and the Magisterium (the Pope and bishops) is the living teaching authority that authentically interprets them. Together, under the Holy Spirit, they safeguard the one divine deposit of faith.",
      "sources": [
        { "type": "ccc", "ref": "80-95" },
        { "type": "scripture", "ref": "2 Thessalonians 2:15" }
      ],
      "keywords": ["three-legged stool", "dei verbum", "sacred tradition", "magisterium", "deposit of faith"],
      "level": "intermediate"
    },
    {
      "id": "st-biblical-inerrancy-meaning",
      "category": "scripture-and-tradition",
      "question": "Does the Catholic Church teach that the Bible is without error (Inerrancy)?",
      "answer": "Yes. The Catholic Church firmly teaches the biblical inerrancy of Sacred Scripture regarding saving truth. Because the human authors wrote under the supernatural inspiration of the Holy Spirit, God Himself is the principal author of the Bible. Therefore, as Dei Verbum states: 'The books of Scripture firmly, faithfully, and without error teach that truth which God, for the sake of our salvation, wished to see confided to the Sacred Scriptures.' Inerrancy does not mean treating ancient poetic idioms as modern scientific textbooks, but affirms that Scripture never deceives regarding salvation, faith, and morals.",
      "sources": [
        { "type": "ccc", "ref": "105-108" },
        { "type": "scripture", "ref": "2 Timothy 3:16" }
      ],
      "keywords": ["biblical inerrancy", "inspiration of scripture", "dei verbum", "saving truth", "holy spirit author"],
      "level": "intermediate"
    },
    {
      "id": "st-four-senses-of-scripture",
      "category": "scripture-and-tradition",
      "question": "What are the Four Senses of Scripture in Catholic exegesis?",
      "answer": "According to ancient Catholic tradition, Scripture can be understood according to four senses: 1) The Literal Sense: the meaning conveyed by the words discovered through historical-grammatical exegesis; and the Spiritual Sense, divided into three: 2) The Allegorical Sense: acquiring a deeper understanding by recognizing events as pointing to Christ (e.g., the crossing of the Red Sea prefigures Baptism); 3) The Moral Sense: events reported in Scripture that instruct us to act justly; and 4) The Anagogical Sense: viewing realities in terms of their eternal significance, leading us toward Heaven.",
      "sources": [
        { "type": "ccc", "ref": "115-119" },
        { "type": "scripture", "ref": "1 Corinthians 10:1-11" }
      ],
      "keywords": ["four senses of scripture", "literal allegorical moral anagogical", "biblical interpretation", "exegesis"],
      "level": "advanced"
    },
    {
      "id": "st-deuterocanonical-seven-books",
      "category": "scripture-and-tradition",
      "question": "Why do Catholic Bibles contain seven more Old Testament books than Protestant Bibles?",
      "answer": "Catholic Bibles contain 73 books (46 in the Old Testament, 27 in the New Testament), whereas Protestant Bibles omit 7 Old Testament books (Tobit, Judith, 1 and 2 Maccabees, Wisdom, Sirach, and Baruch, plus portions of Daniel and Esther). These are called the 'Deuterocanonical' books. The early Christians and Apostles used the Greek translation of the Old Testament (the Septuagint), which contained these books. While 16th-century Protestant reformers dropped them following a later rabbinic canon, the Catholic Church definitively confirmed the historic 73-book canon at the Council of Trent.",
      "sources": [
        { "type": "ccc", "ref": "120" },
        { "type": "scripture", "ref": "2 Maccabees 12:43-46" }
      ],
      "keywords": ["deuterocanonical books", "septuagint", "73 books", "canon of scripture", "council of trent", "apocrypha"],
      "level": "basic"
    },
    {
      "id": "st-latin-vulgate-st-jerome",
      "category": "scripture-and-tradition",
      "question": "What is the Latin Vulgate and what was Saint Jerome's contribution?",
      "answer": "In the late 4th century, Pope Damasus I commissioned Saint Jerome to translate the Sacred Scriptures from their original Hebrew, Aramaic, and Greek into the common Latin language of the people ('versio vulgata'). Jerome spent decades in Bethlehem producing this monumental work, known as the Latin Vulgate. For over a millennium, the Vulgate served as the standard liturgical and theological biblical text of the Western Church, celebrated for its fidelity. Jerome famously declared: 'Ignorance of Scripture is ignorance of Christ.'",
      "sources": [
        { "type": "ccc", "ref": "133" },
        { "type": "scripture", "ref": "Hebrews 4:12" }
      ],
      "keywords": ["latin vulgate", "st jerome", "translation of bible", "ignorance of scripture", "biblical text"],
      "level": "intermediate"
    },
    {
      "id": "st-lectio-divina-steps",
      "category": "scripture-and-tradition",
      "question": "What are the four classical steps of Lectio Divina (Sacred Reading)?",
      "answer": "Lectio Divina is an ancient monastic method of praying with Sacred Scripture, structured in four progressive movements: 1) Lectio (Reading): reading a short biblical passage slowly and attentively, listening to what God says; 2) Meditatio (Meditation): reflecting deeply on the text, asking what God is saying to my life personally; 3) Oratio (Prayer): responding to God in conversational prayer with thanksgiving, petition, or repentance; and 4) Contemplatio (Contemplation): resting silently in God's loving presence beyond words, letting His grace transform the heart.",
      "sources": [
        { "type": "ccc", "ref": "1177" },
        { "type": "ccc", "ref": "2708" },
        { "type": "scripture", "ref": "Luke 2:19" }
      ],
      "keywords": ["lectio divina", "meditation on scripture", "reading praying meditating", "contemplation", "bible study"],
      "level": "basic"
    },
    {
      "id": "st-gnostic-gospels-rejection",
      "category": "scripture-and-tradition",
      "question": "Why did the early Catholic Church reject the 'Gnostic gospels' (e.g., Gospel of Thomas)?",
      "answer": "During the 2nd and 3rd centuries, heretical sects (such as the Gnostics) wrote pseudepigraphal texts falsely attributing them to apostles like Thomas, Judas, or Mary Magdalene. The Church evaluated writings based on four apostolic criteria: 1) Apostolic Origin (written by an apostle or close disciple); 2) Orthodoxy (conforming to the apostolic Rule of Faith, not denying Christ's true humanity or creation's goodness); 3) Catholicity (broadly recognized and used by Churches everywhere); and 4) Liturgical Use (publicly read at Mass). The Gnostic texts failed all four tests.",
      "sources": [
        { "type": "ccc", "ref": "120" },
        { "type": "scripture", "ref": "1 John 4:1-3" }
      ],
      "keywords": ["gnostic gospels", "gospel of thomas", "canon criteria", "apostolic origin", "orthodoxy"],
      "level": "advanced"
    },
    {
      "id": "st-typology-in-salvation-history",
      "category": "scripture-and-tradition",
      "question": "What is biblical 'Typology' in Catholic Scripture reading?",
      "answer": "Typology is the discernment of God's works in the Old Testament as prefigurations ('types') that find fulfillment in the New Testament in the person of Jesus Christ. Saint Augustine beautifully encapsulated this: 'The New Testament lies hidden in the Old, and the Old Testament is unveiled in the New.' For instance, the sacrifice of Isaac prefigures Christ's sacrifice on Calvary; the Passover Lamb prefigures Christ our Pasch; and the bronze serpent in the desert prefigures Christ lifted up on the Cross to heal those poisoned by sin.",
      "sources": [
        { "type": "ccc", "ref": "128-130" },
        { "type": "scripture", "ref": "John 3:14-15" }
      ],
      "keywords": ["typology", "augustine quote", "old and new testaments", "prefiguration", "passover lamb"],
      "level": "intermediate"
    },
    {
      "id": "st-how-councils-fixed-canon",
      "category": "scripture-and-tradition",
      "question": "When and how did the Catholic Church settle the 73-book Canon of the Bible?",
      "answer": "The Bible did not fall from the sky complete with a table of contents; it was the Catholic Church that discerned which ancient writings were inspired by the Holy Spirit. Early local councils under the authority of Rome—Council of Rome (382 AD under Pope Damasus I), Council of Hippo (393 AD), and Council of Carthage (397 AD)—established the list of 73 inspired books. This same list was reaffirmed at the Ecumenical Council of Florence (1442) and dogmatically defined against Protestant deletions at the Council of Trent (1546).",
      "sources": [
        { "type": "ccc", "ref": "120" },
        { "type": "scripture", "ref": "2 Peter 3:15-16" }
      ],
      "keywords": ["canon of scripture", "council of hippo", "council of carthage", "pope damasus", "council of trent"],
      "level": "intermediate"
    },
    {
      "id": "st-psalms-as-prayerbook",
      "category": "scripture-and-tradition",
      "question": "Why are the Psalms central to Catholic liturgy and prayer?",
      "answer": "The 150 Psalms of the Old Testament are the inspired prayer book of God's People, expressing every human emotion—praise, joy, lament, sorrow, fear, repentance, and thanksgiving. Jesus Himself prayed the Psalms during His earthly life and quoted Psalm 22 on the Cross. In the Mass, the Responsorial Psalm responds to the First Reading, and in the Liturgy of the Hours, the Psalms form the continuous heartbeat of the Church's unceasing prayer throughout every day, training our hearts to pray in Christ's own voice.",
      "sources": [
        { "type": "ccc", "ref": "2585-2589" },
        { "type": "scripture", "ref": "Psalm 22:1" }
      ],
      "keywords": ["book of psalms", "responsorial psalm", "prayer of the church", "psalm on the cross", "david"],
      "level": "basic"
    },
    {
      "id": "st-interpreting-hard-ot-passages",
      "category": "scripture-and-tradition",
      "question": "How should Catholics understand violent and difficult passages in the Old Testament?",
      "answer": "Difficult Old Testament passages (such as ancient warfare or harsh judicial laws) must be interpreted according to divine pedagogy—God's progressive, patient education of a fallen human race across centuries. God met His people in their historical culture, slowly weaning them away from pagan brutality and idolatry toward higher moral truth, culminating in Jesus Christ. Jesus taught the definitive meaning of the Law, commanding love of enemies. Violent imagery is also understood spiritually as a fierce allegorical battle against sin and demonic temptation.",
      "sources": [
        { "type": "ccc", "ref": "53" },
        { "type": "ccc", "ref": "122" },
        { "type": "scripture", "ref": "Matthew 5:43-48" }
      ],
      "keywords": ["difficult bible passages", "divine pedagogy", "old testament violence", "spiritual warfare", "sermon on mount"],
      "level": "intermediate"
    },
    {
      "id": "st-bible-within-living-tradition",
      "category": "scripture-and-tradition",
      "question": "Why can the Bible not be interpreted in complete isolation from the Church?",
      "answer": "As Saint Peter explicitly warns: 'No prophecy of Scripture is a matter of one's own private interpretation' (2 Peter 1:20). Sacred Scripture was written within the living community of the Church, for the Church, and inspired by the Holy Spirit who guides the Church. Separating the Bible from Sacred Tradition and the Magisterium leads to thousands of conflicting private interpretations, sectarian splits, and theological errors. The Bible is only read in its authentic fullness within the living faith of the Church that compiled it.",
      "sources": [
        { "type": "ccc", "ref": "113" },
        { "type": "scripture", "ref": "2 Peter 1:20-21" }
      ],
      "keywords": ["private interpretation", "living tradition", "communion of faith", "st peter warning", "unity of truth"],
      "level": "basic"
    },
    {
      "id": "st-gospels-historical-fidelity",
      "category": "scripture-and-tradition",
      "question": "What does the Church teach concerning the historical accuracy of the Four Gospels?",
      "answer": "The Second Vatican Council solemnly declared in Dei Verbum (no. 19) that the Church unhesitatingly asserts the historical character of the four Gospels. They faithfully hand on what Jesus, the Son of God, while He lived among men, really did and taught for their eternal salvation until the day He was taken up. The Apostles and evangelists wrote based on eyewitness accounts, oral transmission, and guided synthesis under the inspiration of the Holy Spirit, giving us authentic testimony concerning Christ.",
      "sources": [
        { "type": "ccc", "ref": "126" },
        { "type": "scripture", "ref": "Luke 1:1-4" }
      ],
      "keywords": ["four gospels", "historical character", "dei verbum", "eyewitness accounts", "apostolic testimony"],
      "level": "intermediate"
    },
    {
      "id": "st-scripture-in-catechesis",
      "category": "scripture-and-tradition",
      "question": "What role does Sacred Scripture play in Catholic preaching, prayer, and catechesis?",
      "answer": "Sacred Scripture is the soul of all theology and catechesis. As Dei Verbum states, 'The Church has always venerated the divine Scriptures just as she venerates the body of the Lord, since, especially in the sacred liturgy, she unceasingly receives and offers to the faithful the bread of life from the table both of God's Word and of Christ's body.' All pastoral homilies, catechisms, and personal devotions must be continually nourished and ruled by Sacred Scripture to remain vibrant and true.",
      "sources": [
        { "type": "ccc", "ref": "131-133" },
        { "type": "scripture", "ref": "Colossians 3:16" }
      ],
      "keywords": ["table of the word", "catechesis", "soul of theology", "veneration of scripture", "christian instruction"],
      "level": "basic"
    }
  ],

  "moral-life.json": [
    {
      "id": "ml-beatitudes-heart-of-gospel",
      "category": "moral-life",
      "question": "What are the Beatitudes and why are they central to Catholic morality?",
      "answer": "Proclaimed by Jesus at the Sermon on the Mount (Matthew 5:3-12), the eight Beatitudes are the heart of Christian moral teaching. They respond to the natural desire for happiness that God has placed in the human heart, depicting the countenance of Jesus Christ and outlining the path to true blessedness. Unlike legalistic external codes, the Beatitudes call for an interior conversion of heart—poverty of spirit, meekness, purity of heart, mercy, and peacemaking—promising that the kingdom of heaven belongs to those who embrace Christ's cross.",
      "sources": [
        { "type": "ccc", "ref": "1716-1724" },
        { "type": "scripture", "ref": "Matthew 5:3-12" }
      ],
      "keywords": ["beatitudes", "sermon on the mount", "christian happiness", "purity of heart", "gospel morality"],
      "level": "basic"
    },
    {
      "id": "ml-theological-virtues",
      "category": "moral-life",
      "question": "What are the three Theological Virtues and how do they function?",
      "answer": "The three Theological Virtues are Faith, Hope, and Charity (1 Corinthians 13:13). They are called 'theological' because they have God as their immediate object, origin, and end. Infused into the soul at Baptism, they adapt human faculties for participation in the divine nature: Faith enables us to believe in God and all that He has revealed; Hope enables us to desire the kingdom of heaven and rely on Christ's promises rather than our own strength; and Charity enables us to love God above all things for His own sake, and our neighbor as ourselves for the love of God.",
      "sources": [
        { "type": "ccc", "ref": "1812-1829" },
        { "type": "scripture", "ref": "1 Corinthians 13:13" }
      ],
      "keywords": ["theological virtues", "faith hope charity", "infused virtues", "love of god", "baptismal gifts"],
      "level": "basic"
    },
    {
      "id": "ml-cardinal-virtues",
      "category": "moral-life",
      "question": "What are the four Cardinal Virtues in Catholic moral theology?",
      "answer": "The four Cardinal Virtues (from the Latin 'cardo', meaning 'hinge', because all other human virtues hinge upon them) are Prudence, Justice, Fortitude, and Temperance: 1) Prudence disposes practical reason to discern our true good in every circumstance and choose the right means of achieving it; 2) Justice consists in the firm and constant will to give to God and neighbor what is their due; 3) Fortitude ensures firmness in difficulties and constancy in the pursuit of the good; and 4) Temperance moderates the attraction of pleasures and provides balance in using created goods.",
      "sources": [
        { "type": "ccc", "ref": "1805-1809" },
        { "type": "scripture", "ref": "Wisdom 8:7" }
      ],
      "keywords": ["cardinal virtues", "prudence justice fortitude temperance", "hinge virtues", "human virtue", "moral habits"],
      "level": "basic"
    },
    {
      "id": "ml-three-sources-of-morality",
      "category": "moral-life",
      "question": "What are the three sources that determine whether an action is morally good or bad?",
      "answer": "Catholic moral theology teaches that the morality of any human act depends upon three distinct sources: 1) The Object chosen (the specific action directly willed); 2) The Intention or end in view (the subjective motive); and 3) The Circumstances (including consequences, pressure, or knowledge). For an act to be morally good, all three must be good ('bonum ex integra causa, malum ex quocumque defectu'). A good intention never justifies an intrinsically evil object, meaning 'one may never do evil that good may come of it' (Romans 3:8).",
      "sources": [
        { "type": "ccc", "ref": "1749-1761" },
        { "type": "scripture", "ref": "Romans 3:8" }
      ],
      "keywords": ["sources of morality", "moral object", "intention and circumstance", "intrinsically evil acts", "veritatis splendor"],
      "level": "intermediate"
    },
    {
      "id": "ml-principle-of-double-effect",
      "category": "moral-life",
      "question": "What is the Principle of Double Effect in Catholic bioethics and moral decisions?",
      "answer": "The Principle of Double Effect is a crucial moral tool used when a single action has two foreseeable effects: one good and intended, and one bad and unintended. An action is morally permissible under double effect only if four strict conditions are met: 1) The act itself must be morally good or indifferent; 2) The good effect must be intended, while the bad effect is merely tolerated or foreseen; 3) The good effect cannot be achieved by means of the bad effect; and 4) There must be a proportionately serious reason for permitting the bad effect (e.g., removing a cancerous uterus to save a mother's life).",
      "sources": [
        { "type": "ccc", "ref": "2263-2267" },
        { "type": "scripture", "ref": "Romans 3:8" }
      ],
      "keywords": ["principle of double effect", "moral theology", "bioethics", "unintended consequences", "proportionality"],
      "level": "advanced"
    },
    {
      "id": "ml-catholic-social-teaching-principles",
      "category": "moral-life",
      "question": "What are the four permanent pillars of Catholic Social Teaching?",
      "answer": "Grounded in the Gospel and articulated from Pope Leo XIII's Rerum Novarum to modern encyclicals, Catholic Social Teaching rests upon four foundational pillars: 1) The Dignity of the Human Person (every human is created in God's image and has inherent worth); 2) The Common Good (the sum total of social conditions allowing all people to achieve fulfillment); 3) Subsidiarity (matters ought to be handled by the smallest, lowest, or least centralized competent authority rather than overgrown state bureaucracy); and 4) Solidarity (active commitment to the welfare and brotherhood of all people).",
      "sources": [
        { "type": "ccc", "ref": "1877-1948" },
        { "type": "scripture", "ref": "Micah 6:8" }
      ],
      "keywords": ["catholic social teaching", "human dignity", "common good", "subsidiarity", "solidarity", "rerum novarum"],
      "level": "intermediate"
    },
    {
      "id": "ml-preferential-option-for-the-poor",
      "category": "moral-life",
      "question": "What is the 'Preferential Option for the Poor' in Catholic doctrine?",
      "answer": "The preferential option for the poor is a distinctive Christian commitment rooted in the life and teachings of Jesus Christ, who became poor for our sakes and declared that whatever we do to the least of His brothers, we do to Him (Matthew 25:40). It inspires the Church's constant love and priority for the destitute, the sick, refugees, the unborn, and the marginalized. This love moves Christians both toward direct corporal works of mercy and toward reforming unjust social structures that oppress the vulnerable.",
      "sources": [
        { "type": "ccc", "ref": "2443-2449" },
        { "type": "scripture", "ref": "Matthew 25:31-46" }
      ],
      "keywords": ["preferential option for poor", "corporal works of mercy", "matthew 25", "justice for poor", "almsgiving"],
      "level": "basic"
    },
    {
      "id": "ml-just-war-doctrine",
      "category": "moral-life",
      "question": "What are the strict criteria for a 'Just War' according to the Catholic Church?",
      "answer": "The Church's Just War doctrine (articulated by St. Augustine, St. Thomas Aquinas, and CCC 2309) insists that war is a grave evil that must only be undertaken as a last resort for legitimate self-defense. Four rigorous conditions must be met simultaneously: 1) The damage inflicted by the aggressor must be lasting, grave, and certain; 2) All other means of ending it must have been shown to be impractical or ineffective; 3) There must be serious prospects of success; and 4) The use of arms must not produce evils and disorders graver than the evil to be eliminated (proportionality). Non-combatants and prisoners must be respected.",
      "sources": [
        { "type": "ccc", "ref": "2307-2317" },
        { "type": "scripture", "ref": "Romans 13:4" }
      ],
      "keywords": ["just war theory", "legitimate defense", "st augustine", "proportionality", "last resort"],
      "level": "advanced"
    },
    {
      "id": "ml-natural-moral-law",
      "category": "moral-life",
      "question": "What is the Natural Moral Law and can it ever be erased from the human heart?",
      "answer": "The Natural Moral Law is nothing other than the light of understanding placed in us by God, by which we know what must be done and what must be avoided. Expressed in the universal command to 'do good and avoid evil', it is engraved by the Creator upon every human conscience and accessible to natural reason, regardless of religious background or culture. Because it is rooted in human nature, the Natural Law is universal, objective, and immutable across all history; though sin can obscure its clarity, it can never be completely uprooted from the heart.",
      "sources": [
        { "type": "ccc", "ref": "1954-1960" },
        { "type": "scripture", "ref": "Romans 2:14-15" }
      ],
      "keywords": ["natural moral law", "do good avoid evil", "conscience", "universal morality", "immutable truth"],
      "level": "intermediate"
    }
  ],

  "prayer-and-spiritual-life.json": [
    {
      "id": "psl-three-expressions-of-prayer",
      "category": "prayer-and-spiritual-life",
      "question": "What are the three traditional expressions of Christian prayer?",
      "answer": "The Catechism divides Christian prayer into three major expressions: 1) Vocal Prayer: praying aloud or internally using words, uniting body and soul to follow the example of Jesus who taught the Our Father; 2) Meditative Prayer: engaging thought, imagination, emotion, and desire using Scripture, icons, or spiritual books to deepen our faith and conform our will to Christ; and 3) Contemplative Prayer (mental prayer): a quiet, wordless gaze of faith fixed entirely on Jesus, resting in His love in a union of silent contemplation.",
      "sources": [
        { "type": "ccc", "ref": "2699-2719" },
        { "type": "scripture", "ref": "Matthew 6:7-8" }
      ],
      "keywords": ["vocal prayer", "meditative prayer", "contemplative prayer", "mental prayer", "expressions of prayer"],
      "level": "intermediate"
    },
    {
      "id": "psl-distractions-and-dryness",
      "category": "prayer-and-spiritual-life",
      "question": "How should a Catholic handle distractions and spiritual dryness (aridity) in prayer?",
      "answer": "Distractions and dryness are common battles in the spiritual life. When distractions occur, the spiritual masters advise not to panic or become frustrated, but gently turn the heart back to God with humility. Dryness—the lack of spiritual sweetness, consolations, or emotional warmth—is often permitted by God to purify our love, teaching us to seek the God of consolations rather than the consolations of God. True fidelity in prayer consists of showing up and persevering in faith, even when we feel nothing.",
      "sources": [
        { "type": "ccc", "ref": "2729-2733" },
        { "type": "scripture", "ref": "Galatians 6:9" }
      ],
      "keywords": ["distractions in prayer", "spiritual dryness", "aridity", "perseverance", "consolations"],
      "level": "basic"
    },
    {
      "id": "psl-ignatian-daily-examen",
      "category": "prayer-and-spiritual-life",
      "question": "What is the Daily Examen of Saint Ignatius of Loyola?",
      "answer": "The Daily Examen is a five-step prayerful review of one's day formulated by Saint Ignatius of Loyola to recognize God's presence and movements in daily life: 1) Give thanks: recall God's blessings and gifts received today; 2) Ask for light: pray for the Holy Spirit to reveal truth without self-deception; 3) Review the day: examine thoughts, words, actions, and reactions hour by hour; 4) Ask for forgiveness: express sorrow for where you fell short or sinned; and 5) Resolve for tomorrow: ask for grace to grow in virtue and live more faithfully tomorrow.",
      "sources": [
        { "type": "ccc", "ref": "2713" },
        { "type": "scripture", "ref": "Lamentations 3:40" }
      ],
      "keywords": ["daily examen", "st ignatius", "examination of conscience", "discernment", "daily reflection"],
      "level": "basic"
    },
    {
      "id": "psl-fasting-abstinence-and-penance",
      "category": "prayer-and-spiritual-life",
      "question": "Why do Catholics fast and abstain from meat on Fridays and during Lent?",
      "answer": "Fasting and abstinence are biblical spiritual disciplines practiced by Jesus and recommended throughout Christian history. By voluntarily denying bodily appetites, fasting strengthens self-discipline, purifies prayer, atones for personal sins, and shows solidarity with the hungry. In the universal Church, every Friday is a day of penance in commemoration of Christ's Passion on Good Friday. On Ash Wednesday and Good Friday, Catholics fast (one full meal, two smaller snacks) and abstain from meat, uniting themselves to Christ's self-giving love.",
      "sources": [
        { "type": "ccc", "ref": "1434-1438" },
        { "type": "scripture", "ref": "Matthew 6:16-18" }
      ],
      "keywords": ["fasting and abstinence", "friday penance", "ash wednesday", "good friday", "lent disciplines"],
      "level": "basic"
    },
    {
      "id": "psl-pilgrimages-and-holy-sites",
      "category": "prayer-and-spiritual-life",
      "question": "What is the Catholic theology behind making holy pilgrimages?",
      "answer": "A pilgrimage is a journey to a sacred shrine, holy site, or cathedral (such as Jerusalem, Rome, Lourdes, Fatima, or local shrines) undertaken with prayerful and penitential purpose. In Catholic spirituality, a pilgrimage is a vivid physical reminder that the Christian's entire earthly existence is a pilgrimage toward our heavenly homeland. Stepping out of daily routine, enduring physical exertion, and seeking sacramental renewal at shrines disposes the pilgrim to receive special healing, conversion, and graces of renewal.",
      "sources": [
        { "type": "ccc", "ref": "1674" },
        { "type": "ccc", "ref": "2691" },
        { "type": "scripture", "ref": "Psalm 84:5-7" }
      ],
      "keywords": ["pilgrimages", "holy shrines", "pilgrim church", "spiritual journey", "sacred places"],
      "level": "basic"
    },
    {
      "id": "psl-morning-offering-prayer",
      "category": "prayer-and-spiritual-life",
      "question": "What is the Morning Offering and how does it sanctify the day?",
      "answer": "The Morning Offering is a Catholic devotional prayer recited upon waking, consecrating every thought, word, joy, sorrow, and labor of the upcoming day to God through the Immaculate Heart of Mary in union with the Holy Sacrifice of the Mass offered throughout the world. By making this deliberate offering, everyday mundane chores, professional duties, and sufferings are elevated into acts of worship and spiritual sacrifice, sanctifying ordinary work and earning spiritual merits.",
      "sources": [
        { "type": "ccc", "ref": "2638" },
        { "type": "scripture", "ref": "Colossians 3:17" }
      ],
      "keywords": ["morning offering", "consecration of the day", "sanctification of work", "daily prayer", "immaculate heart"],
      "level": "basic"
    },
    {
      "id": "psl-the-angelus-and-regina-caeli",
      "category": "prayer-and-spiritual-life",
      "question": "What is the Angelus and the Regina Caeli?",
      "answer": "The Angelus is a traditional Catholic prayer recited three times daily (morning at 6:00 AM, noon, and evening at 6:00 PM) at the ringing of church bells, honoring the Incarnation of Jesus through the dialogue between the Archangel Gabriel and Mary. It features three versicles and Hail Marys concluding with a collect. During the Easter season, the Angelus is replaced by the joyful hymn 'Regina Caeli' (Queen of Heaven, Rejoice!), celebrating the Resurrection of Christ and Mary's maternal triumph.",
      "sources": [
        { "type": "ccc", "ref": "2673-2678" },
        { "type": "scripture", "ref": "Luke 1:26-38" }
      ],
      "keywords": ["the angelus", "regina caeli", "easter prayer", "incarnation devotion", "noon prayer"],
      "level": "basic"
    },
    {
      "id": "psl-spiritual-communion-act",
      "category": "prayer-and-spiritual-life",
      "question": "What is an Act of Spiritual Communion and when should it be made?",
      "answer": "An Act of Spiritual Communion is a prayer expressing a fervent desire to receive Jesus into one's soul when one is physically or canonically unable to receive the sacrament (e.g., due to illness, lack of a priest, or conscious of unconfessed mortal sin). As taught by St. Thomas Aquinas and St. Alphonsus Liguori, God is not restricted by sacramental bounds; a sincere, heartfelt act of spiritual communion draws abundant graces, spiritual union, and love of Jesus into the soul.",
      "sources": [
        { "type": "ccc", "ref": "1387-1388" },
        { "type": "scripture", "ref": "Revelation 3:20" }
      ],
      "keywords": ["spiritual communion", "alphonsus liguori", "desire for eucharist", "unable to attend mass", "prayer"],
      "level": "basic"
    },
    {
      "id": "psl-devotion-to-the-precious-blood",
      "category": "prayer-and-spiritual-life",
      "question": "What is the theological meaning of devotion to the Precious Blood of Jesus?",
      "answer": "Devotion to the Most Precious Blood of Jesus focuses on the price of our redemption, for as Saint Peter wrote, 'You were redeemed not with corruptible things like gold or silver, but with the precious blood of Christ, as of a lamb unblemished and spotless' (1 Peter 1:18-19). Poured out at the Circumcision, the Agony in Gethsemane, the Scourging, the Crowning with Thorns, the Carrying of the Cross, and the Crucifixion, Christ's Precious Blood cleanses souls, conquers demons, and provides reconciliation in every Mass.",
      "sources": [
        { "type": "ccc", "ref": "613" },
        { "type": "scripture", "ref": "1 Peter 1:18-19" },
        { "type": "scripture", "ref": "Hebrews 9:14" }
      ],
      "keywords": ["precious blood", "redemption price", "cleansing blood", "seven sheddings", "calvary"],
      "level": "basic"
    },
    {
      "id": "psl-novenas-scriptural-origin",
      "category": "prayer-and-spiritual-life",
      "question": "What is a Novena and what is its scriptural foundation?",
      "answer": "A novena is nine consecutive days of prayer and intercession for a specific intention or feast day. Its biblical archetype is found in Acts 1, where the Apostles, the holy women, and the Blessed Virgin Mary gathered in the Upper Room in unceasing prayer for nine days between the Ascension of Jesus and the descent of the Holy Spirit at Pentecost. Novenas demonstrate perseverance, patient trust in God's promises, and spiritual solidarity in petition.",
      "sources": [
        { "type": "ccc", "ref": "2671" },
        { "type": "scripture", "ref": "Acts 1:14" }
      ],
      "keywords": ["novena", "nine days of prayer", "upper room", "pentecost preparation", "persevering prayer"],
      "level": "basic"
    },
    {
      "id": "psl-dark-night-of-the-soul",
      "category": "prayer-and-spiritual-life",
      "question": "What is the 'Dark Night of the Soul' according to Saint John of the Cross?",
      "answer": "In mystical theology, the 'Dark Night of the Soul' (described by Doctor of the Church Saint John of the Cross) is an intense stage of spiritual purification where God withdraws sensible consolations, spiritual pleasures, and intellectual lights from the soul. Divided into the Dark Night of the Senses and the Dark Night of the Spirit, this painful experience is not divine abandonment, but a profound surgery of divine love freeing the soul from spiritual pride, attachments, and self-love so it can achieve mystical union with God in pure charity.",
      "sources": [
        { "type": "ccc", "ref": "2725-2731" },
        { "type": "scripture", "ref": "Psalm 63:1" }
      ],
      "keywords": ["dark night of soul", "john of the cross", "purification", "mystical theology", "spiritual union"],
      "level": "advanced"
    },
    {
      "id": "psl-chaplet-of-st-michael",
      "category": "prayer-and-spiritual-life",
      "question": "What is the Chaplet of Saint Michael the Archangel?",
      "answer": "The Chaplet of Saint Michael is a devotional prayer honoring Saint Michael and the nine choirs of angels (Seraphim, Cherubim, Thrones, Dominions, Virtues, Powers, Principalities, Archangels, and Angels). Approved by Pope Blessed Pius IX, the chaplet asks for angelic assistance in resisting temptations, living with purity, and persevering in grace. St. Michael promised that anyone who recites this chaplet with devotion will receive an escort of nine angels chosen from each choir when approaching Holy Communion.",
      "sources": [
        { "type": "ccc", "ref": "336" },
        { "type": "scripture", "ref": "Daniel 10:13" }
      ],
      "keywords": ["chaplet of st michael", "nine choirs of angels", "archangel michael", "angelic protection", "pius ix"],
      "level": "basic"
    }
  ],

  "last-things-and-apologetics.json": [
    {
      "id": "lta-beatific-vision",
      "category": "last-things-and-apologetics",
      "question": "What is the Beatific Vision in Catholic theology?",
      "answer": "The Beatific Vision is the direct, unmediated contemplation of God in His heavenly essence, face to face, enjoyed by the angels and saints for all eternity. Because God's infinite majesty transcends human natural capacity, God elevates the intellect of the blessed through the 'light of glory' (lumen gloriae). In the Beatific Vision, human persons experience the supreme fulfillment of all longing, infinite joy, perfect rest, and complete union of love with the Father, Son, and Holy Spirit.",
      "sources": [
        { "type": "ccc", "ref": "1028-1029" },
        { "type": "scripture", "ref": "1 Corinthians 13:12" },
        { "type": "scripture", "ref": "1 John 3:2" }
      ],
      "keywords": ["beatific vision", "heaven", "light of glory", "face to face with god", "eternal bliss"],
      "level": "intermediate"
    },
    {
      "id": "lta-indulgences-plenary-and-partial",
      "category": "last-things-and-apologetics",
      "question": "What is an indulgence and how does it relate to temporal punishment?",
      "answer": "An indulgence is the remission before God of the temporal punishment due to sins whose guilt has already been forgiven in sacramental Confession. Drawing from the infinite spiritual treasury of Christ's merits and the prayers of the saints, the Church dispenses indulgences as partial or plenary (complete). A plenary indulgence removes all temporal punishment for sin, applicable to oneself or to the holy souls in Purgatory. To gain a plenary indulgence, one must perform the prescribed work, be completely detached from sin, and receive Sacramental Confession, Holy Communion, and pray for the Pope's intentions.",
      "sources": [
        { "type": "ccc", "ref": "1471-1479" },
        { "type": "scripture", "ref": "Matthew 16:19" }
      ],
      "keywords": ["indulgences", "plenary indulgence", "temporal punishment", "treasury of merits", "purgatory relief"],
      "level": "intermediate"
    },
    {
      "id": "lta-hell-as-self-exclusion",
      "category": "last-things-and-apologetics",
      "question": "Why does a loving God allow the reality of Hell?",
      "answer": "The Catholic Church teaches that Hell is the state of definitive self-exclusion from communion with God and the blessed. God does not predestine anyone to Hell; rather, God respects human freedom so profoundly that He does not force His love or presence on anyone who obstinately refuses Him. Hell is the tragedy of a creature exercising their free will to permanently reject God's mercy and forgiveness through unrepented mortal sin until the moment of death. The chief punishment of Hell is eternal separation from God, in whom alone man can have life and joy.",
      "sources": [
        { "type": "ccc", "ref": "1033-1037" },
        { "type": "scripture", "ref": "Matthew 25:41" }
      ],
      "keywords": ["hell", "eternal punishment", "self-exclusion", "mortal sin", "justice of god", "free will"],
      "level": "intermediate"
    },
    {
      "id": "lta-apologetics-gentleness-and-reverence",
      "category": "last-things-and-apologetics",
      "question": "What is the purpose of Catholic Apologetics and how should it be practiced?",
      "answer": "Apologetics (from the Greek 'apologia', meaning a reasoned defense) is the intellectual discipline of explaining and defending the truth of the Catholic faith against objections. Rooted in 1 Peter 3:15—'Always be prepared to make a defense to anyone who calls you to account for the hope that is in you, yet do it with gentleness and reverence'—apologetics is not about winning contentious arguments, but clearing away misconceptions, removing stumbling blocks to faith, and winning hearts for Jesus Christ through charity and truth.",
      "sources": [
        { "type": "ccc", "ref": "156" },
        { "type": "scripture", "ref": "1 Peter 3:15" }
      ],
      "keywords": ["apologetics", "defense of faith", "1 peter 3 15", "gentleness and reverence", "evangelization"],
      "level": "basic"
    },
    {
      "id": "lta-why-confess-to-a-priest",
      "category": "last-things-and-apologetics",
      "question": "How do Catholics respond to the objection: 'Why confess sins to a man instead of directly to God?'",
      "answer": "Catholics do confess directly to God, because only God can forgive sins. However, God chose to reconcile humanity through Christ's human nature, and Christ explicitly entrusted His authority to forgive sins to human apostles. On the evening of His Resurrection, Jesus breathed on the Apostles and declared: 'Receive the Holy Spirit. If you forgive the sins of any, they are forgiven; if you retain the sins of any, they are retained' (John 20:22-23). The priest acts not by his own power, but as Christ's appointed sacramental ambassador, assuring the penitent with an audible sentence of divine pardon.",
      "sources": [
        { "type": "ccc", "ref": "1441-1442" },
        { "type": "scripture", "ref": "John 20:21-23" },
        { "type": "scripture", "ref": "2 Corinthians 5:18" }
      ],
      "keywords": ["confession to priest", "john 20", "forgiveness of sins", "ministry of reconciliation", "apologetics"],
      "level": "basic"
    },
    {
      "id": "lta-call-no-man-father-objection",
      "category": "last-things-and-apologetics",
      "question": "Why do Catholics call priests 'Father' when Jesus said 'Call no man father' (Matthew 23:9)?",
      "answer": "In Matthew 23:9, Jesus was using Middle Eastern hyperbole to rebuke the proud Pharisees who placed their own authority above God the Father, not issuing a literal prohibition against titles. If interpreted strictly literally, one could not call their biological parent 'father', nor teachers 'teachers' (Matthew 23:8). The Apostles themselves repeatedly used the spiritual title 'father': St. Paul wrote to the Corinthians, 'I became your father in Christ Jesus through the gospel' (1 Corinthians 4:15), and St. John addressed church leaders as 'fathers' (1 John 2:13). Priests are called 'Father' because they share in God's spiritual paternity.",
      "sources": [
        { "type": "ccc", "ref": "238" },
        { "type": "scripture", "ref": "1 Corinthians 4:15" },
        { "type": "scripture", "ref": "Matthew 23:9" }
      ],
      "keywords": ["call no man father", "matthew 23", "priests called father", "spiritual fatherhood", "paul to corinthians"],
      "level": "basic"
    },
    {
      "id": "lta-crucifix-vs-empty-cross",
      "category": "last-things-and-apologetics",
      "question": "Why do Catholics display the crucifix with Christ's body rather than just an empty cross?",
      "answer": "While Catholics fully rejoice that Christ is risen, the crucifix highlights the exact cost and supreme demonstration of God's love: 'We preach Christ crucified, a stumbling block to Jews and folly to Gentiles, but to those who are called... the power of God and the wisdom of God' (1 Corinthians 1:23-24). The crucifix visually proclaims Christ's sacrificial atonement on Calvary, stirs our hearts to true contrition for sin, and comforts those carrying their own painful crosses, showing that suffering united to Jesus leads to everlasting glory.",
      "sources": [
        { "type": "ccc", "ref": "616-618" },
        { "type": "scripture", "ref": "1 Corinthians 1:23" },
        { "type": "scripture", "ref": "Galatians 6:14" }
      ],
      "keywords": ["crucifix", "empty cross", "corpus", "preach christ crucified", "sacrifice of the cross"],
      "level": "basic"
    },
    {
      "id": "lta-rapture-vs-catholic-eschatology",
      "category": "last-things-and-apologetics",
      "question": "Does the Catholic Church believe in the modern concept of the 'Secret Rapture'?",
      "answer": "No. The popular 19th-century theory of a 'secret rapture' (where believers disappear silently years before a separate public return of Christ) was invented in the 1830s by John Nelson Darby and is unknown to historic Christianity. Catholic eschatology teaches a single, glorious Second Coming of Jesus Christ (the Parousia). At His return, the dead will be raised, the final judgment will occur, and all history will be brought to fulfillment. First Thessalonians 4 describes the faithful meeting the returning King in the clouds to escort Him into His kingdom.",
      "sources": [
        { "type": "ccc", "ref": "675-677" },
        { "type": "ccc", "ref": "1001" },
        { "type": "scripture", "ref": "1 Thessalonians 4:16-17" }
      ],
      "keywords": ["rapture", "secret rapture", "parousia", "second coming", "eschatology", "darby myth"],
      "level": "intermediate"
    },
    {
      "id": "lta-exorcisms-and-deliverance",
      "category": "last-things-and-apologetics",
      "question": "What is the Catholic Church's teaching and practice regarding Major Exorcisms?",
      "answer": "The Catholic Church takes demonic activity seriously while exercising extreme medical and psychological prudence. The Church distinguishes between minor exorcisms (such as those in the baptismal liturgy) and the Major Exorcism (solemn rite). A Major Exorcism can only be performed by an authorized priest with the explicit permission of the diocesan bishop, after thorough medical and psychiatric examinations have ruled out mental illness. Through the authority of Jesus Christ and His Church, the priest commands demons to depart, liberating victims from demonic possession.",
      "sources": [
        { "type": "ccc", "ref": "1673" },
        { "type": "scripture", "ref": "Mark 16:17" }
      ],
      "keywords": ["exorcism", "major exorcism", "demonic possession", "deliverance", "bishop permission"],
      "level": "intermediate"
    },
    {
      "id": "lta-salvation-of-non-christians",
      "category": "last-things-and-apologetics",
      "question": "Can non-Christians who do not know the Gospel be saved?",
      "answer": "Yes, through the mercy of Jesus Christ and His Church. The Second Vatican Council taught in Lumen Gentium (no. 16) that those who, through no fault of their own, do not know the Gospel of Christ or His Church, but who nevertheless seek God with a sincere heart and, moved by grace, try in their actions to do His will as known through the dictates of their conscience, can attain eternal salvation. All salvation comes through Jesus Christ, but God can apply the saving grace of Christ's cross in ways known only to Himself.",
      "sources": [
        { "type": "ccc", "ref": "846-848" },
        { "type": "scripture", "ref": "1 Timothy 2:3-4" }
      ],
      "keywords": ["salvation of non christians", "lumen gentium", "invincible ignorance", "mercy of god", "sincere conscience"],
      "level": "intermediate"
    },
    {
      "id": "lta-infants-who-die-without-baptism",
      "category": "last-things-and-apologetics",
      "question": "What happens to infants who die without being baptized?",
      "answer": "The Church entrusts infants who die without baptism to the infinite mercy of God, who desires all people to be saved. In funeral liturgies for unbaptized infants, the Church prays with great confidence in God's tender love. While baptism remains the necessary ordinary sacrament revealed by Christ, Jesus displayed boundless tenderness toward little children, saying: 'Let the children come to me, and do not hinder them, for to such belongs the kingdom of heaven' (Matthew 19:14). There is strong hope that God provides a way of salvation for them.",
      "sources": [
        { "type": "ccc", "ref": "1261" },
        { "type": "scripture", "ref": "Matthew 19:14" }
      ],
      "keywords": ["unbaptized infants", "limbo of infants", "mercy of god", "hope of salvation", "infant death"],
      "level": "intermediate"
    },
    {
      "id": "lta-new-heavens-and-new-earth",
      "category": "last-things-and-apologetics",
      "question": "What is meant by the 'New Heavens and New Earth' at the end of time?",
      "answer": "At the end of time, the visible universe itself will be transformed and freed from the bondage of decay and corruption. Sacred Scripture describes this ultimate renewal as 'a new heaven and a new earth' (Revelation 21:1; 2 Peter 3:13). In this glorified cosmos, creation will share in the glorious freedom of the children of God. God will dwell visibly among humanity, wiping away every tear from their eyes; there will be no more death, mourning, crying, or pain, for the old order will have passed away.",
      "sources": [
        { "type": "ccc", "ref": "1042-1050" },
        { "type": "scripture", "ref": "Revelation 21:1-4" },
        { "type": "scripture", "ref": "Romans 8:19-21" }
      ],
      "keywords": ["new heavens new earth", "cosmic renewal", "revelation 21", "parousia", "glorified creation"],
      "level": "intermediate"
    },
    {
      "id": "lta-general-resurrection-of-the-dead",
      "category": "last-things-and-apologetics",
      "question": "What will happen to our physical bodies at the General Resurrection?",
      "answer": "At the Final Judgment, Christ will return in glory, and by His divine power, all the dead will rise. The souls of the departed will be definitively reunited with their bodies. The bodies of the damned will rise to eternal shame, while the bodies of the righteous will be transformed into the likeness of Christ's glorious body (Philippians 3:21). St. Paul explains in 1 Corinthians 15 that the risen body will be incorruptible, glorious, powerful, and spiritual—no longer subject to physical sickness, age, weakness, or death.",
      "sources": [
        { "type": "ccc", "ref": "988-1004" },
        { "type": "scripture", "ref": "1 Corinthians 15:42-44" },
        { "type": "scripture", "ref": "Philippians 3:21" }
      ],
      "keywords": ["general resurrection", "resurrection of the body", "incorruptible body", "1 corinthians 15", "glorified state"],
      "level": "intermediate"
    },
    {
      "id": "lta-praying-to-saints-vs-necromancy",
      "category": "last-things-and-apologetics",
      "question": "How does asking saints for prayers differ from the occult practice of necromancy?",
      "answer": "Necromancy is the occult practice of attempting to summon spirits of the dead through séances, mediums, or conjuring in order to gain hidden information or power, which the Church strictly condemns (Deuteronomy 18:10-12). In stark contrast, Catholic prayer to the saints is simply asking our living brothers and sisters in Christ who are alive in heaven to intercede for us before the throne of God. As Jesus proved, God 'is not the God of the dead, but of the living' (Mark 12:27). It is the same as asking a Christian friend on earth to pray for you.",
      "sources": [
        { "type": "ccc", "ref": "2116-2117" },
        { "type": "scripture", "ref": "Mark 12:27" },
        { "type": "scripture", "ref": "Deuteronomy 18:10-12" }
      ],
      "keywords": ["intercession of saints", "necromancy difference", "god of the living", "apologetics", "communion of saints"],
      "level": "basic"
    }
  ]
};

let totalAdded = 0;
for (const [filename, entries] of Object.entries(newEntries)) {
  const filePath = path.join(DOCTRINE_DIR, filename);
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const existingIds = new Set(existing.map(e => e.id));
  
  const toAdd = entries.filter(e => !existingIds.has(e.id));
  existing.push(...toAdd);
  totalAdded += toAdd.length;
  
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
  console.log(`Updated ${filename}: now has ${existing.length} entries (+${toAdd.length})`);
}

console.log(`Successfully added ${totalAdded} new doctrine entries.`);
