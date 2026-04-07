const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Chapter = require("./models/Chapter");
const Resource = require("./models/Resource");

dotenv.config();

// PART 1 - Chapters definition (all CBSE Class 10 chapters)
const chapters = [
  // ── SCIENCE ──────────────────────────────────────────────────────────────
  { title:"Chemical Reactions and Equations",    slug:"chemical-reactions-and-equations",    subject:"Science", classLevel:10, chapterNumber:1,  description:"Balancing equations, types of chemical reactions, oxidation-reduction.", tags:["chemical reactions","balancing equations","redox"] },
  { title:"Acids, Bases and Salts",              slug:"acids-bases-and-salts",               subject:"Science", classLevel:10, chapterNumber:2,  description:"pH scale, indicators, neutralization, common salts.", tags:["acids","bases","salts","pH"] },
  { title:"Metals and Non-metals",               slug:"metals-and-non-metals",               subject:"Science", classLevel:10, chapterNumber:3,  description:"Properties, reactivity series, extraction, corrosion.", tags:["metals","reactivity series","extraction"] },
  { title:"Carbon and its Compounds",            slug:"carbon-and-its-compounds",            subject:"Science", classLevel:10, chapterNumber:4,  description:"Covalent bonding, hydrocarbons, functional groups, ethanol, ethanoic acid.", tags:["carbon","organic chemistry","hydrocarbons"] },
  { title:"Periodic Classification of Elements", slug:"periodic-classification-of-elements", subject:"Science", classLevel:10, chapterNumber:5,  description:"Dobereiner's triads, Newlands' octaves, Mendeleev's and Modern Periodic Table.", tags:["periodic table","Mendeleev","atomic number"] },
  { title:"Life Processes",                      slug:"life-processes",                      subject:"Science", classLevel:10, chapterNumber:6,  description:"Nutrition, respiration, transportation, excretion.", tags:["nutrition","respiration","transportation","excretion"] },
  { title:"Control and Coordination",            slug:"control-and-coordination",            subject:"Science", classLevel:10, chapterNumber:7,  description:"Nervous system, hormones, plant movements, endocrine system.", tags:["nervous system","hormones","reflex action"] },
  { title:"How do Organisms Reproduce?",         slug:"how-do-organisms-reproduce",          subject:"Science", classLevel:10, chapterNumber:8,  description:"Asexual and sexual reproduction, human reproductive system.", tags:["reproduction","asexual","sexual","DNA"] },
  { title:"Heredity",                            slug:"heredity",                            subject:"Science", classLevel:10, chapterNumber:9,  description:"Mendel's experiments, heredity and evolution, sex determination.", tags:["heredity","Mendel","genetics","evolution"] },
  { title:"Light - Reflection and Refraction",   slug:"light-reflection-and-refraction",     subject:"Science", classLevel:10, chapterNumber:10, description:"Laws of reflection, mirrors, lenses, refraction, power of lens.", tags:["light","reflection","refraction","mirrors","lenses"] },
  { title:"Human Eye and Colourful World",       slug:"human-eye-and-colourful-world",       subject:"Science", classLevel:10, chapterNumber:11, description:"Human eye, defects of vision, refraction through prism, dispersion.", tags:["human eye","myopia","hypermetropia","prism"] },
  { title:"Electricity",                         slug:"electricity",                         subject:"Science", classLevel:10, chapterNumber:12, description:"Ohm's law, resistance, circuits, electric power, heating effect.", tags:["Ohm's law","resistance","electric power","circuits"] },
  { title:"Magnetic Effects of Electric Current",slug:"magnetic-effects-of-electric-current",subject:"Science", classLevel:10, chapterNumber:13, description:"Magnetic field, Fleming's rules, electric motor, generator, AC/DC.", tags:["magnetic field","Fleming's rule","electric motor","generator"] },
  { title:"Our Environment",                     slug:"our-environment",                     subject:"Science", classLevel:10, chapterNumber:14, description:"Ecosystem, food chains, ozone layer, waste management.", tags:["ecosystem","food chain","ozone","environment"] },

  // ── MATHEMATICS ──────────────────────────────────────────────────────────
  { title:"Real Numbers",                              slug:"real-numbers",                  subject:"Mathematics", classLevel:10, chapterNumber:1,  description:"Euclid's division lemma, HCF, LCM, irrational numbers, decimal expansions." },
  { title:"Polynomials",                               slug:"polynomials",                   subject:"Mathematics", classLevel:10, chapterNumber:2,  description:"Zeroes of polynomials, relationship between zeroes and coefficients, division algorithm." },
  { title:"Pair of Linear Equations in Two Variables", slug:"pair-of-linear-equations",      subject:"Mathematics", classLevel:10, chapterNumber:3,  description:"Graphical method, substitution, elimination, cross-multiplication." },
  { title:"Quadratic Equations",                       slug:"quadratic-equations",            subject:"Mathematics", classLevel:10, chapterNumber:4,  description:"Factorisation, completing the square, quadratic formula, nature of roots." },
  { title:"Arithmetic Progressions",                   slug:"arithmetic-progressions",        subject:"Mathematics", classLevel:10, chapterNumber:5,  description:"nth term, sum of n terms, applications of AP." },
  { title:"Triangles",                                 slug:"triangles",                      subject:"Mathematics", classLevel:10, chapterNumber:6,  description:"Similarity criteria, BPT theorem, areas of similar triangles, Pythagoras theorem." },
  { title:"Coordinate Geometry",                       slug:"coordinate-geometry",            subject:"Mathematics", classLevel:10, chapterNumber:7,  description:"Distance formula, section formula, area of triangle, midpoint." },
  { title:"Introduction to Trigonometry",              slug:"introduction-to-trigonometry",   subject:"Mathematics", classLevel:10, chapterNumber:8,  description:"Trigonometric ratios, identities, complementary angles, standard values." },
  { title:"Some Applications of Trigonometry",         slug:"applications-of-trigonometry",   subject:"Mathematics", classLevel:10, chapterNumber:9,  description:"Heights and distances, angle of elevation, angle of depression." },
  { title:"Circles",                                   slug:"circles",                        subject:"Mathematics", classLevel:10, chapterNumber:10, description:"Tangents to a circle, number of tangents from an external point, theorems." },
  { title:"Areas Related to Circles",                  slug:"areas-related-to-circles",       subject:"Mathematics", classLevel:10, chapterNumber:11, description:"Area and perimeter of circle, sector, segment, combinations." },
  { title:"Surface Areas and Volumes",                 slug:"surface-areas-and-volumes",      subject:"Mathematics", classLevel:10, chapterNumber:12, description:"Combinations of solids, conversion of solid from one shape to another, frustum." },
  { title:"Statistics",                                slug:"statistics",                     subject:"Mathematics", classLevel:10, chapterNumber:13, description:"Mean, median, mode of grouped data, cumulative frequency, ogive." },
  { title:"Probability",                               slug:"probability",                    subject:"Mathematics", classLevel:10, chapterNumber:14, description:"Classical probability, complementary events, impossible and sure events." },

  // ── ENGLISH - FIRST FLIGHT ────────────────────────────────────────────────
  { title:"A Letter to God",                       slug:"a-letter-to-god",                       subject:"English", book:"First Flight",            classLevel:10, chapterNumber:1  },
  { title:"Nelson Mandela: Long Walk to Freedom",  slug:"nelson-mandela-long-walk-to-freedom",    subject:"English", book:"First Flight",            classLevel:10, chapterNumber:2  },
  { title:"Two Stories About Flying",              slug:"two-stories-about-flying",               subject:"English", book:"First Flight",            classLevel:10, chapterNumber:3  },
  { title:"From the Diary of Anne Frank",          slug:"from-the-diary-of-anne-frank",           subject:"English", book:"First Flight",            classLevel:10, chapterNumber:4  },
  { title:"The Hundred Dresses – Part I",          slug:"the-hundred-dresses-part-1",             subject:"English", book:"First Flight",            classLevel:10, chapterNumber:5  },
  { title:"The Hundred Dresses – Part II",         slug:"the-hundred-dresses-part-2",             subject:"English", book:"First Flight",            classLevel:10, chapterNumber:6  },
  { title:"Glimpses of India",                     slug:"glimpses-of-india",                      subject:"English", book:"First Flight",            classLevel:10, chapterNumber:7  },
  { title:"Mijbil the Otter",                      slug:"mijbil-the-otter",                       subject:"English", book:"First Flight",            classLevel:10, chapterNumber:8  },
  { title:"Madam Rides the Bus",                   slug:"madam-rides-the-bus",                    subject:"English", book:"First Flight",            classLevel:10, chapterNumber:9  },
  { title:"The Sermon at Benares",                 slug:"the-sermon-at-benares",                  subject:"English", book:"First Flight",            classLevel:10, chapterNumber:10 },
  { title:"The Proposal",                          slug:"the-proposal",                           subject:"English", book:"First Flight",            classLevel:10, chapterNumber:11 },
  // FIRST FLIGHT POEMS
  { title:"Dust of Snow (Poem)",                   slug:"dust-of-snow",                           subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:1  },
  { title:"Fire and Ice (Poem)",                   slug:"fire-and-ice",                           subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:2  },
  { title:"A Tiger in the Zoo (Poem)",             slug:"a-tiger-in-the-zoo",                     subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:3  },
  { title:"How to Tell Wild Animals (Poem)",       slug:"how-to-tell-wild-animals",               subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:4  },
  { title:"The Ball Poem",                         slug:"the-ball-poem",                          subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:5  },
  { title:"Amanda! (Poem)",                        slug:"amanda",                                 subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:6  },
  { title:"Animals (Poem)",                        slug:"animals-poem",                           subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:7  },
  { title:"The Trees (Poem)",                      slug:"the-trees-poem",                         subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:8  },
  { title:"Fog (Poem)",                            slug:"fog-poem",                               subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:9  },
  { title:"The Tale of Custard the Dragon (Poem)", slug:"tale-of-custard-the-dragon",             subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:10 },
  { title:"For Anne Gregory (Poem)",               slug:"for-anne-gregory",                       subject:"English", book:"First Flight - Poems",    classLevel:10, chapterNumber:11 },
  // FOOTPRINTS WITHOUT FEET
  { title:"A Triumph of Surgery",                  slug:"a-triumph-of-surgery",                   subject:"English", book:"Footprints Without Feet",  classLevel:10, chapterNumber:1  },
  { title:"The Thief's Story",                     slug:"the-thiefs-story",                       subject:"English", book:"Footprints Without Feet",  classLevel:10, chapterNumber:2  },
  { title:"The Midnight Visitor",                  slug:"the-midnight-visitor",                   subject:"English", book:"Footprints Without Feet",  classLevel:10, chapterNumber:3  },
  { title:"A Question of Trust",                   slug:"a-question-of-trust",                    subject:"English", book:"Footprints Without Feet",  classLevel:10, chapterNumber:4  },
  { title:"Footprints Without Feet",               slug:"footprints-without-feet",                subject:"English", book:"Footprints Without Feet",  classLevel:10, chapterNumber:5  },
  { title:"The Making of a Scientist",             slug:"the-making-of-a-scientist",              subject:"English", book:"Footprints Without Feet",  classLevel:10, chapterNumber:6  },
  { title:"The Necklace",                          slug:"the-necklace",                           subject:"English", book:"Footprints Without Feet",  classLevel:10, chapterNumber:7  },
  { title:"The Hack Driver",                       slug:"the-hack-driver",                        subject:"English", book:"Footprints Without Feet",  classLevel:10, chapterNumber:8  },
  { title:"Bholi",                                 slug:"bholi",                                  subject:"English", book:"Footprints Without Feet",  classLevel:10, chapterNumber:9  },
  { title:"The Book That Saved the Earth",         slug:"the-book-that-saved-the-earth",          subject:"English", book:"Footprints Without Feet",  classLevel:10, chapterNumber:10 },

  // ── SOCIAL SCIENCE ────────────────────────────────────────────────────────
  // History - India and the Contemporary World II
  { title:"The Rise of Nationalism in Europe",     slug:"rise-of-nationalism-in-europe",          subject:"Social Science", book:"History",   classLevel:10, chapterNumber:1 },
  { title:"Nationalism in India",                  slug:"nationalism-in-india",                   subject:"Social Science", book:"History",   classLevel:10, chapterNumber:2 },
  { title:"The Making of a Global World",          slug:"making-of-a-global-world",               subject:"Social Science", book:"History",   classLevel:10, chapterNumber:3 },
  { title:"The Age of Industrialisation",          slug:"age-of-industrialisation",               subject:"Social Science", book:"History",   classLevel:10, chapterNumber:4 },
  { title:"Print Culture and the Modern World",    slug:"print-culture-and-the-modern-world",     subject:"Social Science", book:"History",   classLevel:10, chapterNumber:5 },
  // Geography - Contemporary India II
  { title:"Resources and Development",             slug:"resources-and-development",              subject:"Social Science", book:"Geography", classLevel:10, chapterNumber:1 },
  { title:"Forest and Wildlife Resources",         slug:"forest-and-wildlife-resources",          subject:"Social Science", book:"Geography", classLevel:10, chapterNumber:2 },
  { title:"Water Resources",                       slug:"water-resources",                        subject:"Social Science", book:"Geography", classLevel:10, chapterNumber:3 },
  { title:"Agriculture",                           slug:"agriculture",                            subject:"Social Science", book:"Geography", classLevel:10, chapterNumber:4 },
  { title:"Minerals and Energy Resources",         slug:"minerals-and-energy-resources",          subject:"Social Science", book:"Geography", classLevel:10, chapterNumber:5 },
  { title:"Manufacturing Industries",              slug:"manufacturing-industries",               subject:"Social Science", book:"Geography", classLevel:10, chapterNumber:6 },
  { title:"Lifelines of National Economy",         slug:"lifelines-of-national-economy",          subject:"Social Science", book:"Geography", classLevel:10, chapterNumber:7 },
  // Civics - Democratic Politics II
  { title:"Power Sharing",                         slug:"power-sharing",                          subject:"Social Science", book:"Civics",    classLevel:10, chapterNumber:1 },
  { title:"Federalism",                            slug:"federalism",                             subject:"Social Science", book:"Civics",    classLevel:10, chapterNumber:2 },
  { title:"Democracy and Diversity",               slug:"democracy-and-diversity",                subject:"Social Science", book:"Civics",    classLevel:10, chapterNumber:3 },
  { title:"Gender, Religion and Caste",            slug:"gender-religion-and-caste",              subject:"Social Science", book:"Civics",    classLevel:10, chapterNumber:4 },
  { title:"Popular Struggles and Movements",       slug:"popular-struggles-and-movements",        subject:"Social Science", book:"Civics",    classLevel:10, chapterNumber:5 },
  { title:"Political Parties",                     slug:"political-parties",                      subject:"Social Science", book:"Civics",    classLevel:10, chapterNumber:6 },
  { title:"Outcomes of Democracy",                 slug:"outcomes-of-democracy",                  subject:"Social Science", book:"Civics",    classLevel:10, chapterNumber:7 },
  { title:"Challenges to Democracy",               slug:"challenges-to-democracy",                subject:"Social Science", book:"Civics",    classLevel:10, chapterNumber:8 },
  // Economics - Understanding Economic Development
  { title:"Development",                           slug:"development",                            subject:"Social Science", book:"Economics", classLevel:10, chapterNumber:1 },
  { title:"Sectors of the Indian Economy",         slug:"sectors-of-the-indian-economy",          subject:"Social Science", book:"Economics", classLevel:10, chapterNumber:2 },
  { title:"Money and Credit",                      slug:"money-and-credit",                       subject:"Social Science", book:"Economics", classLevel:10, chapterNumber:3 },
  { title:"Globalisation and the Indian Economy",  slug:"globalisation-and-the-indian-economy",   subject:"Social Science", book:"Economics", classLevel:10, chapterNumber:4 },
  { title:"Consumer Rights",                       slug:"consumer-rights",                        subject:"Social Science", book:"Economics", classLevel:10, chapterNumber:5 },

  // ── HINDI - KSHITIJ ──────────────────────────────────────────────────────
  { title:"Surdas - Pad",                          slug:"surdas-pad",                             subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:1  },
  { title:"Ram Lakshman Parshuram Samvad",         slug:"ram-lakshman-parshuram-samvad",          subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:2  },
  { title:"Savaiya aur Kavitt - Dev",              slug:"savaiya-aur-kavitt-dev",                 subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:3  },
  { title:"Aatmakatha - Jaishankar Prasad",        slug:"aatmakatha-jaishankar-prasad",           subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:4  },
  { title:"Utsah aur Aat Nahin Aati - Nirala",    slug:"utsah-aur-aat-nahin-aati",              subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:5  },
  { title:"Yeh Danturit Muskan - Nagarjun",        slug:"yeh-danturit-muskan",                   subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:6  },
  { title:"Chhaya Mat Chhuna - Girija Kumar",      slug:"chhaya-mat-chhuna",                     subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:7  },
  { title:"Kanyadan - Rituraj",                    slug:"kanyadan-rituraj",                       subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:8  },
  { title:"Sangatkar - Manglesh Dabral",           slug:"sangatkar-manglesh-dabral",              subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:9  },
  { title:"Neta Ji ka Chashma",                    slug:"neta-ji-ka-chashma",                     subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:10 },
  { title:"Balgobin Bhagat",                       slug:"balgobin-bhagat",                        subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:11 },
  { title:"Lakhnavi Andaz",                        slug:"lakhnavi-andaz",                         subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:12 },
  { title:"Manviya Karuna ki Divya Chamak",        slug:"manviya-karuna-ki-divya-chamak",         subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:13 },
  { title:"Ek Kahani Yeh Bhi - Mannu Bhandari",   slug:"ek-kahani-yeh-bhi",                     subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:14 },
  { title:"Stree Shiksha ke Virodhi",              slug:"stree-shiksha-ke-virodhi",              subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:15 },
  { title:"Nov Varsha aur Nav Prashna",            slug:"nav-varsha-aur-nav-prashna",            subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:16 },
  { title:"Sanskriti",                             slug:"sanskriti",                              subject:"Hindi", book:"Kshitij",   classLevel:10, chapterNumber:17 },
  // Hindi - Kritika
  { title:"Mata ka Aanchal",                       slug:"mata-ka-aanchal",                       subject:"Hindi", book:"Kritika",   classLevel:10, chapterNumber:1  },
  { title:"George Pancham ki Naak",                slug:"george-pancham-ki-naak",                subject:"Hindi", book:"Kritika",   classLevel:10, chapterNumber:2  },
  { title:"Saana-Saana Haath Jodi",                slug:"saana-saana-haath-jodi",                subject:"Hindi", book:"Kritika",   classLevel:10, chapterNumber:3  },
  { title:"Ehi Thaiyyan Jhulni Herani Ho Rama",   slug:"ehi-thaiyyan-jhulni",                   subject:"Hindi", book:"Kritika",   classLevel:10, chapterNumber:4  },
  { title:"Main Kyun Likhta Hoon",                 slug:"main-kyun-likhta-hoon",                 subject:"Hindi", book:"Kritika",   classLevel:10, chapterNumber:5  },
];




module.exports = { chapters };