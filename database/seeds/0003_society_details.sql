-- 0003_society_details.sql
-- Researched movement details for societies, associations and organizations.
-- Local history, meeting schedules, meeting venues, and executive names are intentionally
-- left empty/null pending direct verification by the chaplaincy office.
-- Status remains 'draft' and review remains 'unverified' until formally approved in admin.

update societies set
  summary = 'The Altar Knights Association comprises acolytes and altar servers dedicated to assisting the sacred ministers at the altar during the celebration of the Holy Mass, Benediction, and other liturgical rites.',
  mission = 'To foster a deep love and reverent understanding of the sacred liturgy, promote holiness of life among young servers, and ensure the orderly, dignified celebration of divine worship in the sanctuary.',
  spirituality = 'Centred on the Holy Eucharist, Eucharistic adoration, and humble service in the sanctuary, drawing inspiration from Christ who came not to be served, but to serve.',
  movement_history = 'The ministry of serving at the altar developed from the minor order of acolyte in the early Church. Modern altar guilds and servers associations, such as the Archconfraternity of Saint Stephen, established structured formation for youth to serve at liturgical functions.',
  patron = 'Saint Tarcisius and Saint John Berchmans',
  patron_source = 'Roman Martyrology; Papal Address of Pope Benedict XVI to Altar Servers (August 4, 2010).',
  feast_day = '15 August (Saint Tarcisius); 13 August (Saint John Berchmans)',
  activities = 'Serving at daily and Sunday Masses, liturgical rehearsals, sanctuary preparation, study of liturgical vessels and rubrics, and fraternal prayer.',
  source_notes = 'Sources: General Instruction of the Roman Missal, Chapter III; Pope Benedict XVI, Address to the European Pilgrimage of Altar Servers (4 August 2010); Butler''s Lives of the Saints.'
where slug = 'altar-knights-association';

update societies set
  summary = 'The Chaplaincy Choir leads and animates the liturgical assembly in sacred song, praising Almighty God and lifting the hearts and minds of worshippers through sacred music and hymns.',
  mission = 'To glorify God and sanctify the faithful through music of genuine artistic beauty, leading the congregation in active liturgical participation during Mass and sacred celebrations.',
  spirituality = 'Grounded in the psalms, liturgical prayer, and the scriptural tradition of praise, uniting vocal discipline with deep personal contemplation of the liturgical mysteries.',
  movement_history = 'Sacred liturgical singing has accompanied Catholic worship from apostolic times. The Second Vatican Council''s Constitution on the Sacred Liturgy, Sacrosanctum Concilium, affirmed that the musical tradition of the universal Church is a treasure of inestimable value, higher even than that of any other art.',
  patron = 'Saint Cecilia',
  patron_source = 'Roman Martyrology; Second Vatican Council, Sacrosanctum Concilium, Chapter VI.',
  feast_day = '22 November',
  activities = 'Weekly choir rehearsals, learning liturgical chants and hymns in English, Latin, and local languages, animating Sunday Masses and solemn feast days, and singing during sacred concerts and carol services.',
  source_notes = 'Sources: Second Vatican Council, Sacrosanctum Concilium (1963), nos. 112-121; Sacred Congregation of Rites, Instruction Musicam Sacram (1967); Butler''s Lives of the Saints.'
where slug = 'choir';

update societies set
  summary = 'The Church Wardens are ministers of Christian hospitality and liturgical order, welcoming congregants, seating worshippers, and maintaining a quiet, prayerful atmosphere in God''s house.',
  mission = 'To welcome every visitor and parishioner with Christian charity, assist with orderly processions, facilitate Sunday collections, and respond calmly to medical emergencies or safety needs.',
  spirituality = 'Based on the servant leadership of Christ and Saint Benedict''s rule that all guests should be welcomed as Christ himself.',
  movement_history = 'In the early centuries of the Church, the order of ostiarii (porters or doorkeepers) was established to guard the doors of the church and care for the safety and good order of the assembly. Church wardens and ushers continue this ancient lay ministry in parishes worldwide.',
  patron = 'Saint Zita and Saint Peter',
  patron_source = 'Roman Martyrology; historical traditions of the ostiariate.',
  feast_day = '27 April (Saint Zita)',
  activities = 'Greeting worshippers at church entrances, seating congregants, coordinating the offertory collection, organising communion processions, distributing bulletins, and securing church property.',
  source_notes = 'Sources: General Instruction of the Roman Missal, no. 105c; Code of Canon Law; Catholic Encyclopedia (Entry on Porter and Churchwardens).'
where slug = 'church-wardens';

update societies set
  summary = 'The Altar Decorators care for the physical beauty, cleanliness, and floral adornment of the sanctuary, altar, and sacred linens in accordance with the liturgical seasons.',
  mission = 'To prepare a clean, worthy, and beautiful physical environment for the Holy Sacrifice of the Mass, respecting liturgical colours and norms for each feast and liturgical season.',
  spirituality = 'Inspired by Saint Martha''s generous hospitality and service to Jesus, combined with Mary''s quiet adoration, viewing every cleaning task and floral arrangement as an act of prayer and praise.',
  movement_history = 'Altar guilds have historically operated within Catholic parishes, often led by women and men devoted to the care of sacred vestments, church linens (corporals, purificators), and sanctuary decor.',
  patron = 'Saint Martha of Bethany',
  patron_source = 'Roman Martyrology; Luke 10:38-42.',
  feast_day = '29 July (Saints Martha, Mary, and Lazarus)',
  activities = 'Sanctuary decoration with fresh flowers, washing and ironing altar linens and vestments, preparing seasonal liturgical environments for Advent, Christmas, Lent, and Easter, and maintaining church cleaning schedules.',
  source_notes = 'Sources: General Instruction of the Roman Missal, nos. 304-306; Congregation for Divine Worship, Directory on Popular Piety and the Liturgy (2001).'
where slug = 'altar-decorators';

update societies set
  summary = 'The Board of Lectors comprises lay ministers appointed to proclaim the Word of God from Sacred Scripture (other than the Gospel) during the celebration of Holy Mass and liturgical services.',
  mission = 'To proclaim the Word of God with clarity, reverence, and spiritual understanding, allowing the living voice of God to resonate within the hearts of the assembly.',
  spirituality = 'Deep love and reverence for Sacred Scripture, nurtured by daily prayer, biblical study, and meditation on the mysteries of salvation.',
  movement_history = 'The ministry of reader (lector) was one of the earliest ordained minor orders in the ancient Church. Pope Saint Paul VI, in the 1972 motu proprio Ministeria Quaedam, reconstituted the office of lector as an instituted ministry and encouraged lay readers to exercise this service in parishes.',
  patron = 'Saint Jerome and Saint Bede the Venerable',
  patron_source = 'Roman Martyrology; Pope Paul VI, Motu Proprio Ministeria Quaedam (1972).',
  feast_day = '30 September (Saint Jerome)',
  activities = 'Proclaiming the First and Second Readings and the General Intercessions at Mass, ongoing biblical formation, vocal and diction workshops, and prayerful preparation using the liturgical lectionary.',
  source_notes = 'Sources: General Instruction of the Roman Missal, nos. 99, 101; Second Vatican Council, Dei Verbum, nos. 21-25; Pope Francis, Motu Proprio Spiritus Domini (2021).'
where slug = 'board-of-lectors';

update societies set
  summary = 'The Catholic Men Organization (CMO) is the umbrella body for all Catholic fathers and men in the chaplaincy, dedicated to personal sanctification and building Christian families.',
  mission = 'To empower Catholic men to live as faithful husbands, loving fathers, and dedicated servants of the Church and society, upholding Catholic moral values in homes and professions.',
  spirituality = 'Rooted in the quiet obedience, protection, and tireless labour of Saint Joseph, Head of the Holy Family, fostering integrity, fatherhood, and sacrificial love.',
  movement_history = 'Formed across Nigerian dioceses under the Catholic Bishops'' Conference of Nigeria (CBCN) to unite Catholic men in the apostolate of the family, Church leadership, and national development.',
  patron = 'Saint Joseph the Worker',
  patron_source = 'Catholic Bishops'' Conference of Nigeria (CBCN) Lay Apostolate guidelines; Roman Martyrology.',
  feast_day = '19 March (Solemnity of Saint Joseph); 1 May (Saint Joseph the Worker)',
  activities = 'Spiritual retreats and seminars for husbands and fathers, financial and physical support for chaplaincy infrastructure, men''s prayer fellowships, and mentoring young men.',
  source_notes = 'Sources: Catholic Bishops'' Conference of Nigeria (CBCN), National Laity Council Guidelines; Pope Francis, Apostolic Letter Patris Corde (2020); CMO National Constitution.'
where slug = 'catholic-men-organization';

update societies set
  summary = 'The Catholic Women Organization (CWO) unites Catholic mothers and women in the chaplaincy, serving as a beacon of maternal care, faith formation, and charitable outreach.',
  mission = 'To foster spiritual growth, maternal responsibility, and active evangelisation among Catholic women, strengthening family life and supporting the Church''s pastoral mission.',
  spirituality = 'Centred on the Blessed Virgin Mary, especially in her humble obedience, maternal love, and fidelity at the foot of the Cross, as well as the charity of Saint Anne.',
  movement_history = 'Established in Nigeria in the 1960s and affiliated nationally with the National Council of Catholic Women Organisations (NCCWO) and internationally with the World Union of Catholic Women''s Organisations (WUCWO, founded in 1910).',
  patron = 'Our Lady of Good Counsel and Saint Anne',
  patron_source = 'WUCWO Official Statutes; CBCN Commission on the Laity; Roman Martyrology.',
  feast_day = '26 April (Our Lady of Good Counsel); 26 July (Saints Joachim and Anne)',
  activities = 'Celebrating annual Mothering Sunday celebrations, family life seminars, visiting the sick and orphaned, supporting seminarians and religious, and organising charitable welfare projects.',
  source_notes = 'Sources: World Union of Catholic Women''s Organisations (WUCWO) Directory; Catholic Bishops'' Conference of Nigeria (CBCN) Laity Directives; NCCWO Handbooks.'
where slug = 'catholic-women-organization';

update societies set
  summary = 'CYON is the official association for Catholic youths and young adults, fostering spiritual formation, moral uprightness, and active apostolic zeal.',
  mission = 'To gather Catholic youth into vibrant communities of faith, promoting intellectual, spiritual, moral, and vocational growth, while bearing witness to the Gospel in contemporary society.',
  spirituality = 'Christ-centred, dynamic, and mission-oriented, drawing inspiration from youthful saints who embraced heroic holiness in the modern world.',
  movement_history = 'Formed by the Catholic Bishops'' Conference of Nigeria (CBCN) in 1985 as the unified national youth structure, collaborating with the universal Church''s World Youth Day movement inaugurated by Pope Saint John Paul II.',
  patron = 'Saint Charles Lwanga and the Uganda Martyrs',
  patron_source = 'CBCN National Youth Pastoral Commission; Roman Martyrology.',
  feast_day = '3 June (Saint Charles Lwanga and Companions); Solemnity of Christ the King (World Youth Day)',
  activities = 'Youth retreats and seminars, skills acquisition workshops, youth rallies and sports festivals, hospital and prison visitations, liturgical animation, and choir or drama outreach.',
  source_notes = 'Sources: CBCN National Youth Policy and Guidelines; Pope Francis, Post-Synodal Apostolic Exhortation Christus Vivit (2019); Pontifical Council for the Laity.'
where slug = 'catholic-youth-organization-of-nigeria';

update societies set
  summary = 'NFCS is the national student body uniting Catholic students in tertiary institutions across Nigeria, fostering deep faith, intellectual rigour, and moral integrity on campus.',
  mission = 'To evangelise the university and college environment, nurture mature Christian leaders, and support Catholic students academically, spiritually, and socially.',
  spirituality = 'Integration of faith and reason (Fides et Ratio), campus evangelisation, and solidarity, summarised in its motto: Caritas Christi Urget Nos (The Love of Christ Compels Us).',
  movement_history = 'Founded in Nigeria in 1956, NFCS is affiliated with Pax Romana (the International Movement of Catholic Students - IMCS), which was founded in Fribourg, Switzerland, in 1921.',
  patron = 'Saint Thomas Aquinas',
  patron_source = 'Pax Romana IMCS Statutes; CBCN Education Commission; Roman Martyrology.',
  feast_day = '28 January (Saint Thomas Aquinas)',
  activities = 'Weekly student fellowships and Bible study, orientation programs for new undergraduates, academic tutorials and symposiums, rural and medical outreaches, and national NFCS conferences.',
  source_notes = 'Sources: NFCS National Constitution; Pax Romana IMCS History and Archives; Pope John Paul II, Encyclical Fides et Ratio (1998).'
where slug = 'nigerian-federation-of-catholic-students';

update societies set
  summary = 'FECAMDS is the specialised fellowship of Catholic medical and dental students in university teaching hospitals, dedicated to integrating Catholic bioethics with clinical training.',
  mission = 'To uphold the sanctity of human life from conception to natural death, cultivate ethical medical professionalism grounded in the Gospel, and provide medical relief to vulnerable communities.',
  spirituality = 'Seeing Christ in the sick and suffering patient (Matthew 25:36), living the medical profession as a Christian vocation of healing and compassionate care.',
  movement_history = 'Established in Nigerian medical colleges as a specialised student wing of the Association of Catholic Medical Practitioners of Nigeria (ACMPN), affiliated with the World Federation of Catholic Medical Associations (FIAMC, founded in 1966).',
  patron = 'Saint Luke the Evangelist, and Saints Cosmas and Damian',
  patron_source = 'FIAMC Official Directives; Pontifical Council for Health Pastoral Care; Roman Martyrology.',
  feast_day = '18 October (Saint Luke); 26 September (Saints Cosmas and Damian)',
  activities = 'Bioethics seminars on clinical dilemmas, hospital ward visitation and patient prayer, rural medical missions and health screenings, academic mentorship for preclinical students, and medical ethics retreats.',
  source_notes = 'Sources: Charter for Health Care Workers (Pontifical Council for Pastoral Assistance to Health Care Workers); FIAMC Declarations; ACMPN Directory.'
where slug = 'federation-of-catholic-medical-and-dental-students';

update societies set
  summary = 'The Knights of Saint John International (KSJI) is a fraternal Catholic military order of laymen and their ladies auxiliary, dedicated to defending the Church and supporting charity.',
  mission = 'To cultivate fraternity among Catholic men, defend the Catholic faith and clergy, promote patriotic duty, and perform corporal and spiritual works of mercy.',
  spirituality = 'Chivalric honour, martial discipline in prayer, unwavering loyalty to the Holy Father and the hierarchy, and steadfast commitment to the Holy Eucharist.',
  movement_history = 'Incorporated in New York in 1886 and tracing its spiritual heritage to the ancient Knights Hospitaller of Saint John of Jerusalem. It was introduced to Nigeria in the early 20th century, growing into one of the country''s most respected Catholic fraternal knighthoods.',
  patron = 'Saint John the Baptist',
  patron_source = 'Constitution of Knights of Saint John International (KSJI); Roman Martyrology.',
  feast_day = '24 June (Nativity of Saint John the Baptist)',
  activities = 'Providing ceremonial honour guards for bishops and the Blessed Sacrament, funding seminarian training, disaster relief and charitable donations, and spiritual drills.',
  source_notes = 'Sources: Supreme Commandery KSJI Official Handbook; CBCN Directory of Catholic Lay Fraternities; Papal recognitions of KSJI.'
where slug = 'knights-of-saint-john';

update societies set
  summary = 'The Legion of Mary is a worldwide apostolic lay association dedicated to the sanctification of its members through prayer and active evangelisation in union with Mary.',
  mission = 'To advance the glory of God through holiness of life developed by prayer and active spiritual works of mercy, such as visiting homes, the sick, and lapsed Catholics.',
  spirituality = 'Based on Saint Louis de Montfort''s True Devotion to the Blessed Virgin Mary, acting as instruments of Mary''s maternal love for souls under the guidance of the Holy Spirit.',
  movement_history = 'Founded in Dublin, Ireland, on 7 September 1921 by the Servant of God Frank Duff. It has spread to almost every country in the world, with millions of active and auxiliary members.',
  patron = 'Mary, Queen of the Apostles, and the Holy Spirit',
  patron_source = 'Official Handbook of the Legion of Mary, Chapter 24.',
  feast_day = '8 September (Nativity of the Blessed Virgin Mary); Acies ceremony near 25 March',
  activities = 'Weekly praesidium meetings with the Legion altar and Tessera prayers, door-to-door home visitation, visiting hospital patients, promoting the Rosary, and conducting the annual Acies consecration.',
  source_notes = 'Sources: Official Handbook of the Legion of Mary (Concilium Legionis Mariae, Dublin); Frank Duff, Miracles on the Tap (1961); Butler''s Lives of the Saints.'
where slug = 'legion-of-mary';

update societies set
  summary = 'The Our Mother of Perpetual Help Devotional Society is the patronal devotional sodality of our chaplaincy, dedicated to venerating the ancient Byzantine icon of Our Lady of Perpetual Help.',
  mission = 'To spread devotion to Our Lady of Perpetual Help, intercede for the sick, afflicted, and suffering, and inspire believers to place complete childlike trust in Christ through Mary.',
  spirituality = 'Contemplation of the mysteries depicted in the sacred icon—the Child Jesus seeking refuge in his mother''s arms while gazing upon the instruments of the Passion—and relying on Mary''s perpetual, maternal protection.',
  movement_history = 'The historic icon was venerated in Rome for centuries and entrusted by Pope Pius IX in 1866 to the Redemptorist missionaries with the commission: Make her known throughout the world. Novena devotions spread globally and became a foundational pillar in Nigerian Catholic parishes.',
  patron = 'Our Lady of Perpetual Help and Saint Alphonsus Liguori',
  patron_source = 'Apostolic Letter of Pope Pius IX (1866); Congregation of the Most Holy Redeemer (Redemptorist) Liturgical Calendar.',
  feast_day = '27 June (Solemnity of Our Lady of Perpetual Help)',
  activities = 'Weekly Perpetual Help novenas, first Saturday devotions, procession on the patronal feast day, intercessory prayers for hospital patients and students, and distribution of novena booklets.',
  source_notes = 'Sources: Congregation of the Most Holy Redeemer (Redemptorists) Rome, Annals of the Icon of Perpetual Help; Fabriciano Ferrero, The Story of an Icon (2002); Catholic Bishops'' Conference of Nigeria liturgical calendar.'
where slug = 'our-mother-of-perpetual-help-devotional-society';

update societies set
  summary = 'The Rosa Mystica Devotional Society gathers faithful to pray for the sanctification of priests, religious, and consecrated souls, honouring Mary as the Mystical Rose.',
  mission = 'To offer fervent prayers, sacrifices, and acts of reparation for consecrated souls, bishops, and priests, fostering vocations and fidelity to Christ.',
  spirituality = 'Marked by the threefold call to prayer, penance, and sacrifice (symbolised by the white, red, and golden roses), cultivating spiritual motherhood for priests.',
  movement_history = 'The title Mystical Rose belongs to the ancient Litany of Loreto. Devotion to Our Lady Rosa Mystica gained worldwide prominence through mid-20th-century prayer movements dedicated to the sanctification of the clergy, finding deep roots in Nigerian dioceses.',
  patron = 'The Blessed Virgin Mary, Rosa Mystica',
  patron_source = 'Litany of Loreto (approved by Pope Sixtus V, 1587); Diocesan Marian directories.',
  feast_day = '13 July (Rosa Mystica commemoration); 8 December (Immaculate Conception)',
  activities = 'Hour of Grace prayer on 8 December, weekly Rosary processions, offering Masses and fasts for priests and seminarians, and visiting lonely sick patients.',
  source_notes = 'Sources: Litany of Loreto; Congregation for the Doctrine of the Faith, Norms on Apparitions; Catholic Secretariat of Nigeria Directives on Marian Devotions.'
where slug = 'rosa-mystica';

update societies set
  summary = 'The Block Rosary Crusade is a grassroots neighbourhood and parish devotional movement dedicated to fulfilling the requests of Our Lady of Fatima through daily recitation of the Holy Rosary.',
  mission = 'To gather children and families daily for communal recitation of the Rosary, encouraging morning offering, penance, and acts of reparation to the Immaculate Heart of Mary.',
  spirituality = 'Fatima-centred spirituality: devotion to the Immaculate Heart of Mary, reparation for sins, praying for peace, and encouraging children in simple, ardent faith.',
  movement_history = 'Began in the United States in the 1940s and spread rapidly to Nigeria in the 1960s and 1970s, establishing local centres in streets, hospital quarters, and villages where children gather at dusk to pray.',
  patron = 'Our Lady of the Rosary of Fatima, and Saints Francisco and Jacinta Marto',
  patron_source = 'Official Memoirs of Sister Lucia of Fatima; Roman Martyrology; National Block Rosary Crusade Constitution (Nigeria).',
  feast_day = '13 May (Our Lady of Fatima); 20 February (Saints Francisco and Jacinta Marto)',
  activities = 'Daily evening Rosary recitation, teaching catechism and basic prayers to children, observing the First Saturday devotions, pilgrimage walks, and cultural presentations during Marian months.',
  source_notes = 'Sources: National Block Rosary Crusade of Nigeria Handbook; Congregation for Divine Worship, Directory on Popular Piety; Official Fatima Archives.'
where slug = 'block-rosary';

update societies set
  summary = 'The Sacred Heart Devotional Society fosters intense personal and communal love for Jesus Christ by contemplating his heart wounded for our sins and burning with love for humanity.',
  mission = 'To console the wounded Heart of Jesus through acts of reparation, practice First Friday devotions, and consecrate families and institutions to his Sacred Heart.',
  spirituality = 'Based on the revelations to Saint Margaret Mary Alacoque, focusing on Christ''s tender, burning love, reparation for ingratitude, and trusting surrender to divine mercy.',
  movement_history = 'Popes throughout modern history (especially Pope Leo XIII in Annum Sacrum and Pope Pius XII in Haurietis Aquas) solemnly consecrated humanity to the Sacred Heart and promoted this devotion worldwide.',
  patron = 'Saint Margaret Mary Alacoque and Saint Claude de la Colombiere',
  patron_source = 'Papal Encyclicals: Haurietis Aquas (Pius XII, 1956) and Dilexit Nos (Francis, 2024); Roman Martyrology.',
  feast_day = 'Solemnity of the Most Sacred Heart of Jesus (June); 16 October (Saint Margaret Mary)',
  activities = 'First Friday Eucharistic adoration and communion of reparation, monthly Holy Hour of Gethsemane, enthronement of the Sacred Heart in homes and hospital wards, and spiritual works of mercy.',
  source_notes = 'Sources: Pope Francis, Encyclical Dilexit Nos (2024); Pope Pius XII, Encyclical Haurietis Aquas (1956); Catechism of the Catholic Church, no. 478.'
where slug = 'sacred-heart';

update societies set
  summary = 'The Hospital Visitationaries of Mary is a compassionate lay apostolate dedicated to visiting hospitalised patients, ministering to the sick, and comforting families in clinical environments.',
  mission = 'To bring the maternal tenderness and presence of Mary to the bedside of patients, providing comfort, prayer, practical assistance, and notifying the chaplains when patients require the sacraments.',
  spirituality = 'Inspired by Mary''s joyful haste to the hill country of Judea to visit and care for her pregnant cousin Elizabeth (The Visitation), seeing Christ in the afflicted patient.',
  movement_history = 'Formed within teaching hospital chaplaincies to assist pastoral care teams, bridging the clinical ward and the altar through regular lay bedside visitation.',
  patron = 'The Blessed Virgin Mary of the Visitation, and Saint Camillus de Lellis',
  patron_source = 'Luke 1:39-56; Roman Martyrology; Pontifical Council for Health Care Workers.',
  feast_day = '31 May (Feast of the Visitation); 14 July (Saint Camillus de Lellis)',
  activities = 'Ward-to-ward patient visitation, distributing rosaries and prayer leaflets, consoling grieving families, assisting patients who lack family support with basic toiletries and provisions, and coordinating with the hospital chaplain for Emergency Anointings and Confessions.',
  source_notes = 'Sources: Pontifical Council for Health Pastoral Care, Charter for Health Care Workers; Congregation for Divine Worship, Directory on Popular Piety; Gospel of Luke.'
where slug = 'hospital-visitationaries-of-mary';

update societies set
  summary = 'The Saint Anthony of Padua Society fosters devotion to the wonder-working Franciscan Doctor of the Church, known as the Evangelical Doctor and patron of the poor and lost things.',
  mission = 'To imitate Saint Anthony''s profound love for Scripture and the poor, practicing Christian charity through Saint Anthony''s Bread and assisting the destitute.',
  spirituality = 'Franciscan humility, fervent love for the Infant Jesus and the Holy Eucharist, bold proclamation of the Gospel, and active charity towards the poor.',
  movement_history = 'Originating from the canonisation of Saint Anthony in 1232, the devotion spread globally via Franciscan friars. The pious practice of Saint Anthony''s Bread (almsgiving in thanksgiving for favours received) became a worldwide charitable institution.',
  patron = 'Saint Anthony of Padua',
  patron_source = 'Roman Martyrology; Papal Bull of Canonisation Cum Dicat Dominus (Pope Gregory IX, 1232).',
  feast_day = '13 June (Saint Anthony of Padua)',
  activities = 'Tuesday Novenas to Saint Anthony, distribution of Saint Anthony''s Bread and relief supplies to impoverished patients and destitute persons, and prayer for lost souls.',
  source_notes = 'Sources: Assisi Compendium of Saint Anthony of Padua; Pope Leo XIII, Apostolic Letter on Saint Anthony (1891); Butler''s Lives of the Saints.'
where slug = 'saint-anthony-of-padua-society';

update societies set
  summary = 'CCRN is a movement of spiritual awakening in the Catholic Church, encouraging personal conversion to Jesus Christ and openness to the gifts and charisms of the Holy Spirit.',
  mission = 'To foster personal holiness, ongoing spiritual renewal, evangelisation, and the active exercise of the charismatic gifts (charisms) for building up the Body of Christ in full fidelity to the Church.',
  spirituality = 'Pentecostal and pneumatic spirituality anchored firmly in Catholic tradition: praise and worship, Life in the Spirit seminars, charismatic prayer, and devotion to the Word of God and the sacraments.',
  movement_history = 'Began during a retreat at Duquesne University (USA) in February 1967 and was introduced to Nigeria in 1971 at the Dominican Institute in Ibadan. Pope Francis established CHARIS (Catholic Charismatic Renewal International Service) in Rome in 2018 to coordinate the movement globally.',
  patron = 'The Holy Spirit, and Saint Paul the Apostle',
  patron_source = 'CHARIS Statutes (approved by the Dicastery for Laity, Family and Life, Rome, 2018); CBCN Pastoral Directives on Charismatic Renewal.',
  feast_day = 'Solemnity of Pentecost (fifty days after Easter)',
  activities = 'Weekly prayer meetings, Life in the Spirit Seminars (LSS), intercessory prayer vigils, Bible study fellowships, praise and worship ministrations, and parish evangelisation outreaches.',
  source_notes = 'Sources: CHARIS Statutes, Vatican City (2018); Catholic Bishops'' Conference of Nigeria, Guidelines for the Catholic Charismatic Renewal (CCRN); Catechism of the Catholic Church, nos. 799-801.'
where slug = 'catholic-charismatic-renewal-of-nigeria';
