-- Seed ONLY information supplied by the project owner (spec sections 9 and 17).
-- Schedule values must be reviewed by the chaplaincy before public launch.
-- Societies are seeded as DRAFT with unverified review status and no invented history, patrons or executives.

insert into activities (key, name, kind) values
  ('mass-first', 'First Mass', 'mass'),
  ('mass-second', 'Second Mass', 'mass'),
  ('mass-morning', 'Morning Mass', 'mass'),
  ('mass-afternoon', 'Afternoon Mass', 'mass'),
  ('mass-evening', 'Evening Mass', 'mass'),
  ('mass-divine-mercy', 'Divine Mercy Mass', 'mass'),
  ('benediction', 'Sunday Benediction', 'devotion'),
  ('adoration', 'Adoration', 'devotion'),
  ('infant-baptism', 'Infant Baptism', 'sacrament'),
  ('confession', 'Sacrament of Penance (Confession)', 'sacrament'),
  ('catechism', 'Catechism Classes', 'formation')
on conflict (key) do update set name = excluded.name, kind = excluded.kind;

-- Reset recurring_schedules cleanly so re-running this seed is idempotent without creating duplicates
delete from recurring_schedules;

-- Sunday
insert into recurring_schedules (activity_id, label, weekday, start_time, sort_order)
select a.id, v.label, 'sun'::weekday, v.t::time, v.o from (values
  ('mass-first','First Mass','06:30',1),
  ('mass-second','Second Mass','08:30',2),
  ('catechism','Catechism Classes','16:00',3),
  ('benediction','Sunday Benediction','17:00',4),
  ('mass-evening','Evening Mass','17:30',5)) v(k,label,t,o) join activities a on a.key = v.k;

-- Monday, Tuesday, Wednesday, Friday
insert into recurring_schedules (activity_id, label, weekday, start_time, sort_order)
select a.id, v.label, d.wd::weekday, v.t::time, v.o
from (values ('mon'),('tue'),('wed'),('fri')) d(wd)
cross join (values
  ('mass-morning','Morning Mass','06:20',1),
  ('mass-afternoon','Afternoon Mass','15:15',2)) v(k,label,t,o)
join activities a on a.key = v.k;

-- Thursday
insert into recurring_schedules (activity_id, label, weekday, start_time, note, sort_order)
select a.id, v.label, 'thu'::weekday, v.t::time, v.note, v.o from (values
  ('mass-morning','Morning Mass','06:20',null,1),
  ('mass-divine-mercy','Divine Mercy Mass','15:00',null,2),
  ('adoration','Adoration',null,'Follows the Divine Mercy Mass',3)) v(k,label,t,note,o) join activities a on a.key = v.k;

-- Saturday
insert into recurring_schedules (activity_id, label, weekday, start_time, note, sort_order)
select a.id, v.label, 'sat'::weekday, v.t::time, v.note, v.o from (values
  ('mass-morning','Morning Mass','06:20',null,1),
  ('confession','Confessions',null,'Every Saturday immediately after the Morning Mass',2),
  ('catechism','Catechism Classes','16:00',null,3)) v(k,label,t,note,o) join activities a on a.key = v.k;

-- Infant Baptism: every third Saturday of the month. Held after the Saturday Morning Mass; no separate clock time, so start_time stays null.
insert into recurring_schedules (activity_id, label, weekday, start_time, nth_of_month, note, sort_order)
select a.id, 'Infant Baptism', 'sat'::weekday, null, 3, 'Third Saturday of the month, after the Morning Mass.', 9
from activities a where a.key = 'infant-baptism';

-- ---------------------------------------------------------------- societies
insert into society_categories (key, name, display_order) values
  ('associations', 'Associations', 1),
  ('organizations', 'Organizations', 2),
  ('societies', 'Societies and Devotional Groups', 3)
on conflict (key) do update set name = excluded.name, display_order = excluded.display_order;

insert into societies (category_id, slug, name, short_name, display_order, status, review)
select c.id, v.slug, v.name, v.short, v.o, 'draft', 'unverified'
from (values
  ('associations','altar-knights-association','Altar Knights Association',null,1),
  ('associations','choir','Choir',null,2),
  ('associations','church-wardens','Church Wardens',null,3),
  ('associations','altar-decorators','Altar Decorators',null,4),
  ('associations','board-of-lectors','Board of Lectors',null,5),
  ('organizations','catholic-men-organization','Catholic Men Organization','CMO',1),
  ('organizations','catholic-women-organization','Catholic Women Organization','CWO',2),
  ('organizations','catholic-youth-organization-of-nigeria','Catholic Youth Organization of Nigeria','CYON',3),
  ('organizations','nigerian-federation-of-catholic-students','Nigerian Federation of Catholic Students','NFCS',4),
  ('organizations','federation-of-catholic-medical-and-dental-students','Federation of Catholic Medical and Dental Students','FECAMDS',5),
  ('organizations','knights-of-saint-john','Knights of Saint John','KSJ',6),
  ('societies','legion-of-mary','Legion of Mary',null,1),
  ('societies','our-mother-of-perpetual-help-devotional-society','Our Mother of Perpetual Help Devotional Society',null,2),
  ('societies','rosa-mystica','Rosa Mystica',null,3),
  ('societies','block-rosary','Block Rosary',null,4),
  ('societies','sacred-heart','Sacred Heart Devotion',null,5),
  ('societies','hospital-visitationaries-of-mary','Hospital Visitationaries of Mary',null,6),
  ('societies','saint-anthony-of-padua-society','Saint Anthony of Padua Society',null,7),
  ('societies','catholic-charismatic-renewal-of-nigeria','Catholic Charismatic Renewal of Nigeria','CCRN',8)
) v(cat, slug, name, short, o) join society_categories c on c.key = v.cat
on conflict (slug) do update set
  name = excluded.name,
  short_name = coalesce(excluded.short_name, societies.short_name),
  display_order = excluded.display_order;

-- Ecclesiastical offices (structure only). Appointments are deliberately NOT seeded:
-- every name must be verified against official Vatican/diocesan sources first (spec section 16).
insert into ecclesiastical_offices (key, title, level, description, display_order) values
  ('first-pope', 'First Pope', 'universal', 'Saint Peter, first pope', 1),
  ('supreme-pontiff', 'Supreme Pontiff', 'universal', 'Bishop of Rome and visible head of the universal Church', 2),
  ('apostolic-nuncio', 'Apostolic Nuncio', 'nunciature', 'The Holy See''s representative to Nigeria; not a local ordinary', 3),
  ('metropolitan-archbishop', 'Metropolitan Archbishop', 'province', 'Head of the ecclesiastical province', 4),
  ('diocesan-ordinary', 'Diocesan Ordinary of Abakaliki', 'diocese', 'Diocesan bishop or apostolic administrator, as canonically verified', 5),
  ('chaplain', 'Chaplain', 'chaplaincy', null, 6),
  ('assistant-chaplain', 'Assistant Chaplain', 'chaplaincy', null, 7)
on conflict (key) do update set
  title = excluded.title,
  level = excluded.level,
  description = excluded.description,
  display_order = excluded.display_order;

insert into announcement_categories (key, name) values
  ('general','General'),('liturgical','Liturgical'),('sacramental','Sacramental'),
  ('student-community','Student community'),('society','Society'),('event','Event'),
  ('urgent','Urgent notice'),('administrative','Administrative'),('pastoral','Pastoral')
on conflict (key) do update set name = excluded.name;
