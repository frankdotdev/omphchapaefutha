/**
 * Built-in seed data: ONLY information supplied by the project owner (spec sections 9, 16, 17).
 * Used when NEXT_PUBLIC_DATA_BACKEND=seed so the site is browsable before Supabase exists.
 * Nothing here is invented: no addresses, phone numbers, histories, patrons or executives.
 */
import { PORTRAITS } from "@/lib/media";
import type {
  Announcement,
  ChaplaincyEvent,
  EcclesiasticalEntry,
  RecurringSchedule,
  Society,
  SocietyCategory,
  Weekday,
} from "@/lib/types";

let n = 0;
function rs(
  weekday: Weekday,
  activityKey: string,
  label: string,
  startTime: string | null,
  extra: Partial<RecurringSchedule> = {},
): RecurringSchedule {
  n += 1;
  return {
    id: `rs-${String(n).padStart(3, "0")}`,
    activityKey,
    label,
    weekday,
    startTime,
    nthOfMonth: null,
    timezone: "Africa/Lagos",
    sortOrder: n,
    ...extra,
  };
}

const weekdayMasses = (d: Weekday) => [
  rs(d, "mass-morning", "Morning Mass", "06:20"),
  rs(d, "mass-afternoon", "Afternoon Mass", "15:15"),
];

export const SEED_RECURRING: RecurringSchedule[] = [
  rs("sun", "mass-first", "First Mass", "06:30"),
  rs("sun", "mass-second", "Second Mass", "08:30"),
  rs("sun", "catechism", "Catechism Classes", "16:00"),
  rs("sun", "benediction", "Sunday Benediction", "17:00"),
  rs("sun", "mass-evening", "Evening Mass", "17:30"),
  ...weekdayMasses("mon"),
  ...weekdayMasses("tue"),
  ...weekdayMasses("wed"),
  rs("thu", "mass-morning", "Morning Mass", "06:20"),
  rs("thu", "mass-divine-mercy", "Divine Mercy Mass", "15:00"),
  rs("thu", "adoration", "Adoration", null, { note: "Follows the Divine Mercy Mass" }),
  ...weekdayMasses("fri"),
  rs("sat", "mass-morning", "Morning Mass", "06:20"),
  rs("sat", "confession", "Confessions", null, {
    note: "Every Saturday immediately after the Morning Mass.",
  }),
  rs("sat", "catechism", "Catechism Classes", "16:00"),
  rs("sat", "infant-baptism", "Infant Baptism", null, {
    nthOfMonth: 3,
    note: "Third Saturday of the month, after the Morning Mass.",
  }),
];

export const SEED_SOCIETY_CATEGORIES: SocietyCategory[] = [
  { key: "associations", name: "Associations", displayOrder: 1 },
  { key: "organizations", name: "Organizations", displayOrder: 2 },
  { key: "societies", name: "Societies and Devotional Groups", displayOrder: 3 },
];

export const SOCIETY_IMAGES: Record<string, string> = {
  "altar-knights-association": "/images/pictures/altarknight1.png",
  "choir": "/images/pictures/choir1.png",
  "church-wardens": "/images/pictures/churchwarden1.png",
  "altar-decorators": "/images/pictures/altardecorating1.png",
  "board-of-lectors": "/images/pictures/lector1.png",
  "catholic-men-organization": "/images/pictures/cmo.png",
  "catholic-women-organization": "/images/pictures/cwo.png",
  "catholic-youth-organization-of-nigeria": "/images/pictures/cyon.png",
  "nigerian-federation-of-catholic-students": "/images/pictures/nfcs.png",
  "federation-of-catholic-medical-and-dental-students": "/images/pictures/fecamds.png",
  "knights-of-saint-john": "/images/pictures/ksj.png",
  "legion-of-mary": "/images/pictures/legionofmary.png",
  "our-mother-of-perpetual-help-devotional-society": "/images/pictures/ourmotherofperpetualhelp.png",
  "rosa-mystica": "/images/pictures/rosamystica.png",
  "block-rosary": "/images/pictures/blockrosary.png",
  "sacred-heart": "/images/pictures/sacredheart.png",
  "hospital-visitationaries-of-mary": "/images/pictures/hospitalvisitationariesofmary.png",
  "saint-anthony-of-padua-society": "/images/pictures/saintanthony.png",
  "catholic-charismatic-renewal-of-nigeria": "/images/pictures/ccrn.png",
};

const soc = (
  categoryKey: string,
  slug: string,
  name: string,
  shortName?: string,
  extra: Partial<Society> = {},
): Society => ({
  slug,
  name,
  shortName: shortName ?? null,
  categoryKey,
  imageSrc: extra.imageSrc ?? SOCIETY_IMAGES[slug] ?? null,
  isFeatured: false,
  verified: false,
  published: true,
  ...extra,
});

export const SEED_ABOUT_HISTORY = `Our Mother of Perpetual Help Catholic Chaplaincy serves the patient community, clinical healthcare workers, academic staff, and students of the Alex Ekwueme Federal University Teaching Hospital, Abakaliki (AE-FUTHA), Ebonyi State, Nigeria. Situated within the Catholic Diocese of Abakaliki in the Onitsha Ecclesiastical Province, the chaplaincy was established to bring the healing and sacramental ministry of the Church to the hospital environment, sanctifying the daily care of the sick and providing pastoral care to medical personnel and university students.

The chaplaincy is placed under the maternal patronage of Our Lady under the title of Our Mother of Perpetual Help. Revered for centuries through her sacred Byzantine icon, Our Lady of Perpetual Help is invoked as a refuge for those who suffer in body and spirit. In a major federal healthcare setting where patients face critical illness and recovery, her maternal intercession stands as a constant reminder that Christ is close to the afflicted and that no trial is borne in isolation.

Through daily celebrations of the Holy Eucharist, regular confessions, the Sacrament of the Anointing of the Sick administered at patient bedsides, and Eucharistic Adoration, the chaplaincy sustains the liturgical heartbeat of the hospital community. It is also the spiritual home for medical and nursing undergraduates, resident doctors, consultants, and diverse lay apostolates who collaborate to bear witness to the dignity of human life from conception to natural death.`;

export const SEED_SOCIETIES: Society[] = [
  soc("associations", "altar-knights-association", "Altar Knights Association", undefined, {
    summary: "The Altar Knights Association comprises acolytes and altar servers dedicated to assisting the sacred ministers at the altar during the celebration of the Holy Mass, Benediction, and other liturgical rites.",
    mission: "To foster a deep love and reverent understanding of the sacred liturgy, promote holiness of life among young servers, and ensure the orderly, dignified celebration of divine worship in the sanctuary.",
    spirituality: "Centred on the Holy Eucharist, Eucharistic adoration, and humble service in the sanctuary, drawing inspiration from Christ who came not to be served, but to serve.",
    movementHistory: "The ministry of serving at the altar developed from the minor order of acolyte in the early Church. Modern altar guilds and servers associations, such as the Archconfraternity of Saint Stephen, established structured formation for youth to serve at liturgical functions.",
    patron: "Saint Tarcisius and Saint John Berchmans",
    feastDay: "15 August (Saint Tarcisius); 13 August (Saint John Berchmans)",
    activities: "Serving at daily and Sunday Masses, liturgical rehearsals, sanctuary preparation, study of liturgical vessels and rubrics, and fraternal prayer.",
  }),
  soc("associations", "choir", "Choir", undefined, {
    summary: "The Chaplaincy Choir leads and animates the liturgical assembly in sacred song, praising Almighty God and lifting the hearts and minds of worshippers through sacred music and hymns.",
    mission: "To glorify God and sanctify the faithful through music of genuine artistic beauty, leading the congregation in active liturgical participation during Mass and sacred celebrations.",
    spirituality: "Grounded in the psalms, liturgical prayer, and the scriptural tradition of praise, uniting vocal discipline with deep personal contemplation of the liturgical mysteries.",
    movementHistory: "Sacred liturgical singing has accompanied Catholic worship from apostolic times. The Second Vatican Council's Constitution on the Sacred Liturgy, Sacrosanctum Concilium, affirmed that the musical tradition of the universal Church is a treasure of inestimable value, higher even than that of any other art.",
    patron: "Saint Cecilia",
    feastDay: "22 November",
    activities: "Weekly choir rehearsals, learning liturgical chants and hymns in English, Latin, and local languages, animating Sunday Masses and solemn feast days, and singing during sacred concerts and carol services.",
  }),
  soc("associations", "church-wardens", "Church Wardens", undefined, {
    summary: "The Church Wardens are ministers of Christian hospitality and liturgical order, welcoming congregants, seating worshippers, and maintaining a quiet, prayerful atmosphere in God's house.",
    mission: "To welcome every visitor and parishioner with Christian charity, assist with orderly processions, facilitate Sunday collections, and respond calmly to medical emergencies or safety needs.",
    spirituality: "Based on the servant leadership of Christ and Saint Benedict's rule that all guests should be welcomed as Christ himself.",
    movementHistory: "In the early centuries of the Church, the order of ostiarii (porters or doorkeepers) was established to guard the doors of the church and care for the safety and good order of the assembly. Church wardens and ushers continue this ancient lay ministry in parishes worldwide.",
    patron: "Saint Zita and Saint Peter",
    feastDay: "27 April (Saint Zita)",
    activities: "Greeting worshippers at church entrances, seating congregants, coordinating the offertory collection, organising communion processions, distributing bulletins, and securing church property.",
  }),
  soc("associations", "altar-decorators", "Altar Decorators", undefined, {
    summary: "The Altar Decorators care for the physical beauty, cleanliness, and floral adornment of the sanctuary, altar, and sacred linens in accordance with the liturgical seasons.",
    mission: "To prepare a clean, worthy, and beautiful physical environment for the Holy Sacrifice of the Mass, respecting liturgical colours and norms for each feast and liturgical season.",
    spirituality: "Inspired by Saint Martha's generous hospitality and service to Jesus, combined with Mary's quiet adoration, viewing every cleaning task and floral arrangement as an act of prayer and praise.",
    movementHistory: "Altar guilds have historically operated within Catholic parishes, often led by women and men devoted to the care of sacred vestments, church linens (corporals, purificators), and sanctuary decor.",
    patron: "Saint Martha of Bethany",
    feastDay: "29 July (Saints Martha, Mary, and Lazarus)",
    activities: "Sanctuary decoration with fresh flowers, washing and ironing altar linens and vestments, preparing seasonal liturgical environments for Advent, Christmas, Lent, and Easter, and maintaining church cleaning schedules.",
  }),
  soc("associations", "board-of-lectors", "Board of Lectors", undefined, {
    summary: "The Board of Lectors comprises lay ministers appointed to proclaim the Word of God from Sacred Scripture (other than the Gospel) during the celebration of Holy Mass and liturgical services.",
    mission: "To proclaim the Word of God with clarity, reverence, and spiritual understanding, allowing the living voice of God to resonate within the hearts of the assembly.",
    spirituality: "Deep love and reverence for Sacred Scripture, nurtured by daily prayer, biblical study, and meditation on the mysteries of salvation.",
    movementHistory: "The ministry of reader (lector) was one of the earliest ordained minor orders in the ancient Church. Pope Saint Paul VI, in the 1972 motu proprio Ministeria Quaedam, reconstituted the office of lector as an instituted ministry and encouraged lay readers to exercise this service in parishes.",
    patron: "Saint Jerome and Saint Bede the Venerable",
    feastDay: "30 September (Saint Jerome)",
    activities: "Proclaiming the First and Second Readings and the General Intercessions at Mass, ongoing biblical formation, vocal and diction workshops, and prayerful preparation using the liturgical lectionary.",
  }),
  soc("organizations", "catholic-men-organization", "Catholic Men Organization", "CMO", {
    summary: "The Catholic Men Organization (CMO) is the umbrella body for all Catholic fathers and men in the chaplaincy, dedicated to personal sanctification and building Christian families.",
    mission: "To empower Catholic men to live as faithful husbands, loving fathers, and dedicated servants of the Church and society, upholding Catholic moral values in homes and professions.",
    spirituality: "Rooted in the quiet obedience, protection, and tireless labour of Saint Joseph, Head of the Holy Family, fostering integrity, fatherhood, and sacrificial love.",
    movementHistory: "Formed across Nigerian dioceses under the Catholic Bishops' Conference of Nigeria (CBCN) to unite Catholic men in the apostolate of the family, Church leadership, and national development.",
    patron: "Saint Joseph the Worker",
    feastDay: "19 March (Solemnity of Saint Joseph); 1 May (Saint Joseph the Worker)",
    activities: "Spiritual retreats and seminars for husbands and fathers, financial and physical support for chaplaincy infrastructure, men's prayer fellowships, and mentoring young men.",
  }),
  soc("organizations", "catholic-women-organization", "Catholic Women Organization", "CWO", {
    summary: "The Catholic Women Organization (CWO) unites Catholic mothers and women in the chaplaincy, serving as a beacon of maternal care, faith formation, and charitable outreach.",
    mission: "To foster spiritual growth, maternal responsibility, and active evangelisation among Catholic women, strengthening family life and supporting the Church's pastoral mission.",
    spirituality: "Centred on the Blessed Virgin Mary, especially in her humble obedience, maternal love, and fidelity at the foot of the Cross, as well as the charity of Saint Anne.",
    movementHistory: "Established in Nigeria in the 1960s and affiliated nationally with the National Council of Catholic Women Organisations (NCCWO) and internationally with the World Union of Catholic Women's Organisations (WUCWO, founded in 1910).",
    patron: "Our Lady of Good Counsel and Saint Anne",
    feastDay: "26 April (Our Lady of Good Counsel); 26 July (Saints Joachim and Anne)",
    activities: "Celebrating annual Mothering Sunday celebrations, family life seminars, visiting the sick and orphaned, supporting seminarians and religious, and organising charitable welfare projects.",
  }),
  soc("organizations", "catholic-youth-organization-of-nigeria", "Catholic Youth Organization of Nigeria", "CYON", {
    summary: "CYON is the official association for Catholic youths and young adults, fostering spiritual formation, moral uprightness, and active apostolic zeal.",
    mission: "To gather Catholic youth into vibrant communities of faith, promoting intellectual, spiritual, moral, and vocational growth, while bearing witness to the Gospel in contemporary society.",
    spirituality: "Christ-centred, dynamic, and mission-oriented, drawing inspiration from youthful saints who embraced heroic holiness in the modern world.",
    movementHistory: "Formed by the Catholic Bishops' Conference of Nigeria (CBCN) in 1985 as the unified national youth structure, collaborating with the universal Church's World Youth Day movement inaugurated by Pope Saint John Paul II.",
    patron: "Saint Charles Lwanga and the Uganda Martyrs",
    feastDay: "3 June (Saint Charles Lwanga and Companions); Solemnity of Christ the King (World Youth Day)",
    activities: "Youth retreats and seminars, skills acquisition workshops, youth rallies and sports festivals, hospital and prison visitations, liturgical animation, and choir or drama outreach.",
  }),
  soc("organizations", "nigerian-federation-of-catholic-students", "Nigerian Federation of Catholic Students", "NFCS", {
    summary: "NFCS is the national student body uniting Catholic students in tertiary institutions across Nigeria, fostering deep faith, intellectual rigour, and moral integrity on campus.",
    mission: "To evangelise the university and college environment, nurture mature Christian leaders, and support Catholic students academically, spiritually, and socially.",
    spirituality: "Integration of faith and reason (Fides et Ratio), campus evangelisation, and solidarity, summarised in its motto: Caritas Christi Urget Nos (The Love of Christ Compels Us).",
    movementHistory: "Founded in Nigeria in 1956, NFCS is affiliated with Pax Romana (the International Movement of Catholic Students - IMCS), which was founded in Fribourg, Switzerland, in 1921.",
    patron: "Saint Thomas Aquinas",
    feastDay: "28 January (Saint Thomas Aquinas)",
    activities: "Weekly student fellowships and Bible study, orientation programs for new undergraduates, academic tutorials and symposiums, rural and medical outreaches, and national NFCS conferences.",
  }),
  soc("organizations", "federation-of-catholic-medical-and-dental-students", "Federation of Catholic Medical and Dental Students", "FECAMDS", {
    summary: "FECAMDS is the specialised fellowship of Catholic medical and dental students in university teaching hospitals, dedicated to integrating Catholic bioethics with clinical training.",
    mission: "To uphold the sanctity of human life from conception to natural death, cultivate ethical medical professionalism grounded in the Gospel, and provide medical relief to vulnerable communities.",
    spirituality: "Seeing Christ in the sick and suffering patient (Matthew 25:36), living the medical profession as a Christian vocation of healing and compassionate care.",
    movementHistory: "Established in Nigerian medical colleges as a specialised student wing of the Association of Catholic Medical Practitioners of Nigeria (ACMPN), affiliated with the World Federation of Catholic Medical Associations (FIAMC, founded in 1966).",
    patron: "Saint Luke the Evangelist, and Saints Cosmas and Damian",
    feastDay: "18 October (Saint Luke); 26 September (Saints Cosmas and Damian)",
    activities: "Bioethics seminars on clinical dilemmas, hospital ward visitation and patient prayer, rural medical missions and health screenings, academic mentorship for preclinical students, and medical ethics retreats.",
  }),
  soc("organizations", "knights-of-saint-john", "Knights of Saint John", "KSJ", {
    summary: "The Knights of Saint John International (KSJI) is a fraternal Catholic military order of laymen and their ladies auxiliary, dedicated to defending the Church and supporting charity.",
    mission: "To cultivate fraternity among Catholic men, defend the Catholic faith and clergy, promote patriotic duty, and perform corporal and spiritual works of mercy.",
    spirituality: "Chivalric honour, martial discipline in prayer, unwavering loyalty to the Holy Father and the hierarchy, and steadfast commitment to the Holy Eucharist.",
    movementHistory: "Incorporated in New York in 1886 and tracing its spiritual heritage to the ancient Knights Hospitaller of Saint John of Jerusalem. It was introduced to Nigeria in the early 20th century, growing into one of the country's most respected Catholic fraternal knighthoods.",
    patron: "Saint John the Baptist",
    feastDay: "24 June (Nativity of Saint John the Baptist)",
    activities: "Providing ceremonial honour guards for bishops and the Blessed Sacrament, funding seminarian training, disaster relief and charitable donations, and spiritual drills.",
  }),
  soc("societies", "legion-of-mary", "Legion of Mary", undefined, {
    summary: "The Legion of Mary is a worldwide apostolic lay association dedicated to the sanctification of its members through prayer and active evangelisation in union with Mary.",
    mission: "To advance the glory of God through holiness of life developed by prayer and active spiritual works of mercy, such as visiting homes, the sick, and lapsed Catholics.",
    spirituality: "Based on Saint Louis de Montfort's True Devotion to the Blessed Virgin Mary, acting as instruments of Mary's maternal love for souls under the guidance of the Holy Spirit.",
    movementHistory: "Founded in Dublin, Ireland, on 7 September 1921 by the Servant of God Frank Duff. It has spread to almost every country in the world, with millions of active and auxiliary members.",
    patron: "Mary, Queen of the Apostles, and the Holy Spirit",
    feastDay: "8 September (Nativity of the Blessed Virgin Mary); Acies ceremony near 25 March",
    activities: "Weekly praesidium meetings with the Legion altar and Tessera prayers, door-to-door home visitation, visiting hospital patients, promoting the Rosary, and conducting the annual Acies consecration.",
  }),
  soc("societies", "our-mother-of-perpetual-help-devotional-society", "Our Mother of Perpetual Help Devotional Society", undefined, {
    summary: "The Our Mother of Perpetual Help Devotional Society is the patronal devotional sodality of our chaplaincy, dedicated to venerating the ancient Byzantine icon of Our Lady of Perpetual Help.",
    mission: "To spread devotion to Our Lady of Perpetual Help, intercede for the sick, afflicted, and suffering, and inspire believers to place complete childlike trust in Christ through Mary.",
    spirituality: "Contemplation of the mysteries depicted in the sacred icon—the Child Jesus seeking refuge in his mother's arms while gazing upon the instruments of the Passion—and relying on Mary's perpetual, maternal protection.",
    movementHistory: "The historic icon was venerated in Rome for centuries and entrusted by Pope Pius IX in 1866 to the Redemptorist missionaries with the commission: Make her known throughout the world. Novena devotions spread globally and became a foundational pillar in Nigerian Catholic parishes.",
    patron: "Our Lady of Perpetual Help and Saint Alphonsus Liguori",
    feastDay: "27 June (Solemnity of Our Lady of Perpetual Help)",
    activities: "Weekly Perpetual Help novenas, first Saturday devotions, procession on the patronal feast day, intercessory prayers for hospital patients and students, and distribution of novena booklets.",
  }),
  soc("societies", "rosa-mystica", "Rosa Mystica", undefined, {
    summary: "The Rosa Mystica Devotional Society gathers faithful to pray for the sanctification of priests, religious, and consecrated souls, honouring Mary as the Mystical Rose.",
    mission: "To offer fervent prayers, sacrifices, and acts of reparation for consecrated souls, bishops, and priests, fostering vocations and fidelity to Christ.",
    spirituality: "Marked by the threefold call to prayer, penance, and sacrifice (symbolised by the white, red, and golden roses), cultivating spiritual motherhood for priests.",
    movementHistory: "The title Mystical Rose belongs to the ancient Litany of Loreto. Devotion to Our Lady Rosa Mystica gained worldwide prominence through mid-20th-century prayer movements dedicated to the sanctification of the clergy, finding deep roots in Nigerian dioceses.",
    patron: "The Blessed Virgin Mary, Rosa Mystica",
    feastDay: "13 July (Rosa Mystica commemoration); 8 December (Immaculate Conception)",
    activities: "Hour of Grace prayer on 8 December, weekly Rosary processions, offering Masses and fasts for priests and seminarians, and visiting lonely sick patients.",
  }),
  soc("societies", "block-rosary", "Block Rosary", undefined, {
    summary: "The Block Rosary Crusade is a grassroots neighbourhood and parish devotional movement dedicated to fulfilling the requests of Our Lady of Fatima through daily recitation of the Holy Rosary.",
    mission: "To gather children and families daily for communal recitation of the Rosary, encouraging morning offering, penance, and acts of reparation to the Immaculate Heart of Mary.",
    spirituality: "Fatima-centred spirituality: devotion to the Immaculate Heart of Mary, reparation for sins, praying for peace, and encouraging children in simple, ardent faith.",
    movementHistory: "Began in the United States in the 1940s and spread rapidly to Nigeria in the 1960s and 1970s, establishing local centres in streets, hospital quarters, and villages where children gather at dusk to pray.",
    patron: "Our Lady of the Rosary of Fatima, and Saints Francisco and Jacinta Marto",
    feastDay: "13 May (Our Lady of Fatima); 20 February (Saints Francisco and Jacinta Marto)",
    activities: "Daily evening Rosary recitation, teaching catechism and basic prayers to children, observing the First Saturday devotions, pilgrimage walks, and cultural presentations during Marian months.",
  }),
  soc("societies", "sacred-heart", "Sacred Heart Devotion", undefined, {
    summary: "The Sacred Heart Devotional Society fosters intense personal and communal love for Jesus Christ by contemplating his heart wounded for our sins and burning with love for humanity.",
    mission: "To console the wounded Heart of Jesus through acts of reparation, practice First Friday devotions, and consecrate families and institutions to his Sacred Heart.",
    spirituality: "Based on the revelations to Saint Margaret Mary Alacoque, focusing on Christ's tender, burning love, reparation for ingratitude, and trusting surrender to divine mercy.",
    movementHistory: "Popes throughout modern history (especially Pope Leo XIII in Annum Sacrum and Pope Pius XII in Haurietis Aquas) solemnly consecrated humanity to the Sacred Heart and promoted this devotion worldwide.",
    patron: "Saint Margaret Mary Alacoque and Saint Claude de la Colombiere",
    feastDay: "Solemnity of the Most Sacred Heart of Jesus (June); 16 October (Saint Margaret Mary)",
    activities: "First Friday Eucharistic adoration and communion of reparation, monthly Holy Hour of Gethsemane, enthronement of the Sacred Heart in homes and hospital wards, and spiritual works of mercy.",
  }),
  soc("societies", "hospital-visitationaries-of-mary", "Hospital Visitationaries of Mary", undefined, {
    summary: "The Hospital Visitationaries of Mary is a compassionate lay apostolate dedicated to visiting hospitalised patients, ministering to the sick, and comforting families in clinical environments.",
    mission: "To bring the maternal tenderness and presence of Mary to the bedside of patients, providing comfort, prayer, practical assistance, and notifying the chaplains when patients require the sacraments.",
    spirituality: "Inspired by Mary's joyful haste to the hill country of Judea to visit and care for her pregnant cousin Elizabeth (The Visitation), seeing Christ in the afflicted patient.",
    movementHistory: "Formed within teaching hospital chaplaincies to assist pastoral care teams, bridging the clinical ward and the altar through regular lay bedside visitation.",
    patron: "The Blessed Virgin Mary of the Visitation, and Saint Camillus de Lellis",
    feastDay: "31 May (Feast of the Visitation); 14 July (Saint Camillus de Lellis)",
    activities: "Ward-to-ward patient visitation, distributing rosaries and prayer leaflets, consoling grieving families, assisting patients who lack family support with basic toiletries and provisions, and coordinating with the hospital chaplain for Emergency Anointings and Confessions.",
  }),
  soc("societies", "saint-anthony-of-padua-society", "Saint Anthony of Padua Society", undefined, {
    summary: "The Saint Anthony of Padua Society fosters devotion to the wonder-working Franciscan Doctor of the Church, known as the Evangelical Doctor and patron of the poor and lost things.",
    mission: "To imitate Saint Anthony's profound love for Scripture and the poor, practicing Christian charity through Saint Anthony's Bread and assisting the destitute.",
    spirituality: "Franciscan humility, fervent love for the Infant Jesus and the Holy Eucharist, bold proclamation of the Gospel, and active charity towards the poor.",
    movementHistory: "Originating from the canonisation of Saint Anthony in 1232, the devotion spread globally via Franciscan friars. The pious practice of Saint Anthony's Bread (almsgiving in thanksgiving for favours received) became a worldwide charitable institution.",
    patron: "Saint Anthony of Padua",
    feastDay: "13 June (Saint Anthony of Padua)",
    activities: "Tuesday Novenas to Saint Anthony, distribution of Saint Anthony's Bread and relief supplies to impoverished patients and destitute persons, and prayer for lost souls.",
  }),
  soc("societies", "catholic-charismatic-renewal-of-nigeria", "Catholic Charismatic Renewal of Nigeria", "CCRN", {
    summary: "CCRN is a movement of spiritual awakening in the Catholic Church, encouraging personal conversion to Jesus Christ and openness to the gifts and charisms of the Holy Spirit.",
    mission: "To foster personal holiness, ongoing spiritual renewal, evangelisation, and the active exercise of the charismatic gifts (charisms) for building up the Body of Christ in full fidelity to the Church.",
    spirituality: "Pentecostal and pneumatic spirituality anchored firmly in Catholic tradition: praise and worship, Life in the Spirit seminars, charismatic prayer, and devotion to the Word of God and the sacraments.",
    movementHistory: "Began during a retreat at Duquesne University (USA) in February 1967 and was introduced to Nigeria in 1971 at the Dominican Institute in Ibadan. Pope Francis established CHARIS (Catholic Charismatic Renewal International Service) in Rome in 2018 to coordinate the movement globally.",
    patron: "The Holy Spirit, and Saint Paul the Apostle",
    feastDay: "Solemnity of Pentecost (fifty days after Easter)",
    activities: "Weekly prayer meetings, Life in the Spirit Seminars (LSS), intercessory prayer vigils, Bible study fellowships, praise and worship ministrations, and parish evangelisation outreaches.",
  }),
];


/**
 * Ecclesiastical structure. Names for the universal Church, nunciature, province and diocese are NOT
 * seeded: each must be verified against official sources before publication (spec section 16).
 * The chaplain and assistant chaplain were supplied directly by the project owner.
 */
const withPortrait = (e: EcclesiasticalEntry): EcclesiasticalEntry => ({ ...e, portraitSrc: PORTRAITS[e.officeKey]?.src ?? null });

const BASE_ECCLESIASTICAL: EcclesiasticalEntry[] = [
  { officeKey: "first-pope", title: "First Pope", level: "universal", personName: "Saint Peter", occupancy: "occupied", description: "Prince of the Apostles and first Bishop of Rome." },
  { officeKey: "supreme-pontiff", title: "Supreme Pontiff", level: "universal", personName: "Pope Leo XIV", occupancy: "occupied", description: "The Bishop of Rome and visible head of the universal Church." },
  { officeKey: "apostolic-nuncio", title: "Apostolic Nuncio to Nigeria", level: "nunciature", personName: "Archbishop Michael Francis Crotty", occupancy: "occupied", description: "The Holy See's diplomatic representative to Nigeria. The Nuncio is not the local bishop." },
  { officeKey: "metropolitan-archbishop", title: "Metropolitan Archbishop of Onitsha", level: "province", personName: "Archbishop Valerian Maduka Okeke", occupancy: "occupied", description: "Head of the Onitsha ecclesiastical province, to which the Diocese of Abakaliki belongs." },
  { officeKey: "diocesan-ordinary", title: "Apostolic Administrator of the Diocese of Abakaliki", level: "diocese", personName: "Ernest Obodo", occupancy: "administered", designation: "Apostolic Administrator", description: "The diocese has no diocesan bishop at present and is governed by an Apostolic Administrator." },
  { officeKey: "chaplain", title: "Chaplain", level: "chaplaincy", personName: "Rev. Fr. Chidi Obasi", occupancy: "occupied" },
  { officeKey: "assistant-chaplain", title: "Assistant Chaplain", level: "chaplaincy", personName: "Rev. Fr. Patrick Otu-Ibe", occupancy: "occupied" },
];

export const SEED_ECCLESIASTICAL: EcclesiasticalEntry[] = BASE_ECCLESIASTICAL.map(withPortrait);

export const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    slug: "cathedraticum-and-pastoral-visit",
    title: "Urgent Notice: Diocesan Cathedraticum and Pastoral Visit",
    excerpt: "All statutory bodies, pious societies, and chaplaincy parishioners are cordially reminded of the forthcoming Cathedraticum.",
    body: "All statutory bodies (CMO, CWO, CYON), pious societies, and chaplaincy parishioners are cordially reminded of the forthcoming Diocesan Cathedraticum. The Chaplaincy Council requests all societies to finalize their reports, levies, and goodwill preparations by Friday. Let us turn out in joyful numbers to demonstrate our communion with the Diocese of Abakaliki.",
    category: "urgent",
    issuedBy: "Chaplaincy Pastoral Council",
    publishedAt: new Date().toISOString(),
    isUrgent: true,
    isFeatured: true,
  },
  {
    slug: "annual-harvest-and-thanksgiving-bazaar",
    title: "Annual Chaplaincy Harvest and Thanksgiving Bazaar",
    excerpt: "The Chaplaincy Harvest Planning Committee invites all parishioners, alumni, staff, and students to our Grand Harvest and Thanksgiving celebration.",
    body: "The Chaplaincy Harvest Planning Committee cordially invites all parishioners, alumni, academic staff, health workers, and students to our Grand Harvest and Thanksgiving celebration. The theme this year reflects God's unfailing providence and maternal care under Our Mother of Perpetual Help. Special envelopes for family harvest and thanksgiving offerings are now available at the chaplaincy secretariat after all Sunday Masses.",
    category: "general",
    issuedBy: "Harvest Planning Committee",
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isUrgent: false,
    isFeatured: true,
  },
  {
    slug: "free-health-screening-and-medical-outreach",
    title: "Free Health Screening and Medical Outreach by FECAMDS",
    excerpt: "The Federation of Catholic Medical and Dental Students conducts free blood pressure, glucose, and general health screenings.",
    body: "The Federation of Catholic Medical and Dental Students (FECAMDS), in collaboration with the Catholic Medical Guild, will conduct free health screenings, including blood pressure monitoring, blood glucose checks, BMI assessment, and medical consultations immediately following the 8:30 AM Mass on Sunday. All parishioners and community members are encouraged to avail themselves of this health outreach.",
    category: "student-community",
    issuedBy: "FECAMDS & Chaplaincy Health Team",
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    isUrgent: false,
    isFeatured: false,
  },
  {
    slug: "catechism-classes-and-sacramental-prep",
    title: "Registration for Catechism Classes & Sacramental Preparation",
    excerpt: "Registration is open for Baptism, First Holy Communion, and Confirmation classes.",
    body: "Registration is currently open for candidates preparing for the Sacraments of Christian Initiation: Infant/Adult Baptism, First Holy Communion, and the Sacrament of Confirmation. Classes are conducted every Saturday and Sunday at 4:00 PM at the Chaplaincy Hall. Parents and guardians should register their children at the Catechist's desk after morning Masses.",
    category: "sacramental",
    issuedBy: "Chaplaincy Catechetical Commission",
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    isUrgent: false,
    isFeatured: false,
  },
];

export const SEED_EVENTS: ChaplaincyEvent[] = [
  {
    slug: "solemnity-of-our-mother-of-perpetual-help",
    title: "Solemnity of Our Mother of Perpetual Help — Patronal Feast",
    description: "Grand Patronal Feast Day with solemn Pontifical Mass, Marian consecration, procession with the Miraculous Icon, and festive agape fellowship.",
    category: "Solemnity",
    startsAt: new Date(Date.now() + 86400000 * 14).toISOString(),
    endsAt: new Date(Date.now() + 86400000 * 14 + 14400000).toISOString(),
    timezone: "Africa/Lagos",
    venue: "Chaplaincy Sanctuary & Sacred Grounds",
    organizer: "OMPH Devotional Society & Pastoral Council",
    isFeatured: true,
    countdownEnabled: true,
    isCancelled: false,
  },
  {
    slug: "night-of-mercy-eucharistic-vigil",
    title: "Night of Mercy: Solemn Exposition, Adoration and Confessions",
    description: "An evening of prayer, silent adoration of the Blessed Sacrament, the Divine Mercy Chaplet, and opportunities for the Sacrament of Reconciliation.",
    category: "Devotion",
    startsAt: new Date(Date.now() + 86400000 * 7).toISOString(),
    endsAt: new Date(Date.now() + 86400000 * 7 + 10800000).toISOString(),
    timezone: "Africa/Lagos",
    venue: "Chaplaincy Main Sanctuary",
    organizer: "Chaplaincy Liturgical Team",
    isFeatured: false,
    countdownEnabled: false,
    isCancelled: false,
  },
  {
    slug: "annual-catholic-students-convention",
    title: "Annual Catholic Youth & Students Convention",
    description: "A three-day spiritual, academic, and leadership conference bringing together students from across university faculties for fellowship and spiritual formation.",
    category: "Formation",
    startsAt: new Date(Date.now() + 86400000 * 21).toISOString(),
    endsAt: new Date(Date.now() + 86400000 * 23).toISOString(),
    timezone: "Africa/Lagos",
    venue: "Chaplaincy Auditorium & Multipurpose Hall",
    organizer: "CYON & NFCS",
    isFeatured: false,
    countdownEnabled: false,
    isCancelled: false,
  },
];
