const mongoose = require("mongoose");
const dotenv   = require("dotenv");
const Chapter  = require("./models/Chapter");
const Resource = require("./models/Resource");
const Formula  = require("./models/Formula");

dotenv.config();

// ── All chapters ──────────────────────────────────────────
const chapters = [
  // SCIENCE
  { title:"Chemical Reactions and Equations", slug:"chemical-reactions-and-equations", subject:"Science", classLevel:10, chapterNumber:1, description:"Balancing equations, types of chemical reactions.", tags:["chemical reactions","balancing equations","redox"] },
  { title:"Acids, Bases and Salts",           slug:"acids-bases-and-salts",            subject:"Science", classLevel:10, chapterNumber:2, description:"pH scale, indicators, and neutralization reactions." },
  { title:"Metals and Non-metals",            slug:"metals-and-non-metals",            subject:"Science", classLevel:10, chapterNumber:3, description:"Properties, reactivity series, extraction of metals." },
  { title:"Carbon and its Compounds",         slug:"carbon-and-its-compounds",         subject:"Science", classLevel:10, chapterNumber:4, description:"Covalent bonding, hydrocarbons, functional groups." },
  { title:"Life Processes",                   slug:"life-processes",                   subject:"Science", classLevel:10, chapterNumber:6, description:"Nutrition, respiration, transportation, excretion." },
  { title:"Control and Coordination",         slug:"control-and-coordination",         subject:"Science", classLevel:10, chapterNumber:7, description:"Nervous system, hormones, plant movements." },
  { title:"Light - Reflection and Refraction",slug:"light-reflection-and-refraction",  subject:"Science", classLevel:10, chapterNumber:10, description:"Laws of reflection, mirrors, lenses, refraction." },
  { title:"Electricity",                      slug:"electricity",                      subject:"Science", classLevel:10, chapterNumber:12, description:"Ohm's law, resistance, circuits, electric power." },

  // MATHEMATICS
  { title:"Real Numbers",                               slug:"real-numbers",                   subject:"Mathematics", classLevel:10, chapterNumber:1,  description:"Euclid's division lemma, HCF, LCM, irrational numbers." },
  { title:"Polynomials",                                slug:"polynomials",                     subject:"Mathematics", classLevel:10, chapterNumber:2,  description:"Zeroes of polynomials, relationship between zeroes and coefficients." },
  { title:"Pair of Linear Equations in Two Variables",  slug:"pair-of-linear-equations",       subject:"Mathematics", classLevel:10, chapterNumber:3,  description:"Graphical method, substitution, elimination." },
  { title:"Quadratic Equations",                        slug:"quadratic-equations",             subject:"Mathematics", classLevel:10, chapterNumber:4,  description:"Factorisation, completing the square, quadratic formula." },
  { title:"Arithmetic Progressions",                    slug:"arithmetic-progressions",         subject:"Mathematics", classLevel:10, chapterNumber:5,  description:"nth term, sum of n terms, applications." },
  { title:"Triangles",                                  slug:"triangles",                       subject:"Mathematics", classLevel:10, chapterNumber:6,  description:"Similarity, BPT theorem, Pythagoras theorem." },
  { title:"Coordinate Geometry",                        slug:"coordinate-geometry",             subject:"Mathematics", classLevel:10, chapterNumber:7,  description:"Distance formula, section formula, area of triangle." },
  { title:"Introduction to Trigonometry",               slug:"introduction-to-trigonometry",    subject:"Mathematics", classLevel:10, chapterNumber:8,  description:"Trigonometric ratios, identities, complementary angles." },
  { title:"Circles",                                    slug:"circles",                         subject:"Mathematics", classLevel:10, chapterNumber:10, description:"Tangents, number of tangents from a point." },
  { title:"Areas Related to Circles",                   slug:"areas-related-to-circles",        subject:"Mathematics", classLevel:10, chapterNumber:11, description:"Perimeter and area of circle, sector, segment." },
  { title:"Surface Areas and Volumes",                  slug:"surface-areas-and-volumes",       subject:"Mathematics", classLevel:10, chapterNumber:12, description:"Combinations of solids, frustum." },
  { title:"Statistics",                                 slug:"statistics",                      subject:"Mathematics", classLevel:10, chapterNumber:13, description:"Mean, median, mode of grouped data, ogive." },
  { title:"Probability",                                slug:"probability",                     subject:"Mathematics", classLevel:10, chapterNumber:14, description:"Classical probability, events, sample space." },

  // ENGLISH
  { title:"A Letter to God",                        slug:"a-letter-to-god",                          subject:"English", book:"First Flight",           classLevel:10, chapterNumber:1 },
  { title:"Nelson Mandela: Long Walk to Freedom",   slug:"nelson-mandela-long-walk-to-freedom",       subject:"English", book:"First Flight",           classLevel:10, chapterNumber:2 },
  { title:"Two Stories About Flying",               slug:"two-stories-about-flying",                  subject:"English", book:"First Flight",           classLevel:10, chapterNumber:3 },
  { title:"From the Diary of Anne Frank",           slug:"from-the-diary-of-anne-frank",              subject:"English", book:"First Flight",           classLevel:10, chapterNumber:4 },
  { title:"A Triumph of Surgery",                   slug:"a-triumph-of-surgery",                      subject:"English", book:"Footprints Without Feet", classLevel:10, chapterNumber:1 },
  { title:"The Thief's Story",                      slug:"the-thiefs-story",                          subject:"English", book:"Footprints Without Feet", classLevel:10, chapterNumber:2 },

  // SOCIAL SCIENCE
  { title:"The Rise of Nationalism in Europe", slug:"rise-of-nationalism-in-europe", subject:"Social Science", book:"History",   classLevel:10, chapterNumber:1 },
  { title:"Nationalism in India",              slug:"nationalism-in-india",           subject:"Social Science", book:"History",   classLevel:10, chapterNumber:2 },
  { title:"Resources and Development",         slug:"resources-and-development",      subject:"Social Science", book:"Geography", classLevel:10, chapterNumber:1 },
  { title:"Water Resources",                   slug:"water-resources",                subject:"Social Science", book:"Geography", classLevel:10, chapterNumber:3 },
  { title:"Power Sharing",                     slug:"power-sharing",                  subject:"Social Science", book:"Civics",    classLevel:10, chapterNumber:1 },
  { title:"Federalism",                        slug:"federalism",                     subject:"Social Science", book:"Civics",    classLevel:10, chapterNumber:2 },
  { title:"Development",                       slug:"development",                    subject:"Social Science", book:"Economics", classLevel:10, chapterNumber:1 },
  { title:"Money and Credit",                  slug:"money-and-credit",               subject:"Social Science", book:"Economics", classLevel:10, chapterNumber:3 },

  // HINDI
  { title:"Surdas - Pad",                  slug:"surdas-pad",                  subject:"Hindi", book:"Kshitij", classLevel:10, chapterNumber:1 },
  { title:"Ram Lakshman Parshuram Samvad", slug:"ram-lakshman-parshuram-samvad",subject:"Hindi", book:"Kshitij", classLevel:10, chapterNumber:2 },
  { title:"Neta Ji ka Chashma",            slug:"neta-ji-ka-chashma",          subject:"Hindi", book:"Kshitij", classLevel:10, chapterNumber:10 },
];

// ── Seed function ─────────────────────────────────────────
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear everything
    await Chapter.deleteMany({});
    await Resource.deleteMany({});
    await Formula.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // ── Insert chapters ───────────────────────────────────
    const insertedChapters = await Chapter.insertMany(chapters);
    console.log(`📚 Inserted ${insertedChapters.length} chapters`);

    // Build slug → chapter map  ← chapterMap is defined HERE inside the function
    const chapterMap = {};
    insertedChapters.forEach((ch) => {
      chapterMap[ch.slug] = ch;
    });

    // ── Build resources ───────────────────────────────────
    const resources = [];

    const ch1 = chapterMap["chemical-reactions-and-equations"];
    if (ch1) {
      resources.push(
        {
          chapterId: ch1._id, type:"video",
          title:"Chemical Reactions - Full Chapter | Class 10 CBSE",
          youtubeVideoId:"TODO_YOUTUBE_ID",
          videoDuration:"18:00", order:1,
        },
        {
          chapterId: ch1._id, type:"ncert",
          title:"NCERT Class 10 Science Chapter 1",
          driveFileId:"TODO_DRIVE_FILE_ID", order:1,
        },
        {
          chapterId: ch1._id, type:"pyq",
          title:"PYQ 2023",
          question:"What happens when dilute H₂SO₄ is added to zinc granules?",
          answer:"Zinc reacts with H₂SO₄ to form zinc sulphate and hydrogen gas: Zn + H₂SO₄ → ZnSO₄ + H₂↑",
          year:2023, marks:2, difficulty:"medium", order:1,
        },
        // Easy MCQ
        {
          chapterId: ch1._id, type:"mcq", testLevel:"easy",
          title:"MCQ Easy Q1",
          mcqQuestion:"Which of the following is a combination reaction?",
          mcqOptions:["2H₂O → 2H₂ + O₂","CaO + H₂O → Ca(OH)₂","Fe + CuSO₄ → FeSO₄ + Cu","2KClO₃ → 2KCl + 3O₂"],
          mcqCorrectIndex:1,
          mcqExplanation:"CaO + H₂O → Ca(OH)₂ combines two substances into one — that's a combination reaction.",
          order:1,
        },
        // Medium MCQ
        {
          chapterId: ch1._id, type:"mcq", testLevel:"medium",
          title:"MCQ Medium Q1",
          mcqQuestion:"In 2PbO + C → 2Pb + CO₂, which substance is oxidised?",
          mcqOptions:["PbO","Carbon","Lead","CO₂"],
          mcqCorrectIndex:1,
          mcqExplanation:"Carbon gains oxygen → it is oxidised. PbO loses oxygen → it is reduced.",
          order:1,
        },
        // Hard MCQ
        {
          chapterId: ch1._id, type:"mcq", testLevel:"hard",
          title:"MCQ Hard Q1",
          mcqQuestion:"What is the role of AgNO₃ in AgNO₃ + NaCl → AgCl + NaNO₃?",
          mcqOptions:["Oxidising agent","Reducing agent","Precipitating agent","Catalyst"],
          mcqCorrectIndex:2,
          mcqExplanation:"AgNO₃ causes AgCl to precipitate out of solution.",
          order:1,
        }
      );
    }

    const math1 = chapterMap["real-numbers"];
    if (math1) {
      resources.push(
        {
          chapterId: math1._id, type:"video",
          title:"Real Numbers - Complete Chapter | Class 10 Maths",
          youtubeVideoId:"TODO_YOUTUBE_ID", videoDuration:"22:00", order:1,
        },
        {
          chapterId: math1._id, type:"pyq",
          title:"PYQ 2022",
          question:"Find the HCF of 96 and 404 by prime factorisation. Hence find their LCM.",
          answer:"96 = 2⁵ × 3, 404 = 2² × 101. HCF = 4, LCM = (96 × 404)/4 = 9696",
          year:2022, marks:3, difficulty:"medium", order:1,
        },
        {
          chapterId: math1._id, type:"mcq", testLevel:"easy",
          title:"MCQ Easy Q1",
          mcqQuestion:"The decimal expansion of 17/8 is:",
          mcqOptions:["Terminating","Non-terminating repeating","Non-terminating non-repeating","None"],
          mcqCorrectIndex:0,
          mcqExplanation:"8 = 2³, denominator has only factor 2, so decimal terminates. 17/8 = 2.125",
          order:1,
        }
      );
    }

    const eng1 = chapterMap["a-letter-to-god"];
    if (eng1) {
      resources.push(
        {
          chapterId: eng1._id, type:"video",
          title:"A Letter to God - Explanation | Class 10 English",
          youtubeVideoId:"TODO_YOUTUBE_ID", videoDuration:"15:00", order:1,
        },
        {
          chapterId: eng1._id, type:"pyq",
          title:"PYQ 2023",
          question:"What did Lencho hope for after the hailstorm?",
          answer:"Lencho hoped his field would recover. He wrote a letter to God asking for 100 pesos to sow his field again.",
          year:2023, marks:2, difficulty:"easy", order:1,
        }
      );
    }

    // TODO: Add more resources for remaining chapters the same way

    if (resources.length) {
      const insertedResources = await Resource.insertMany(resources);
      console.log(`🎬 Inserted ${insertedResources.length} resources`);
    }

    // ── Build formulas ────────────────────────────────────
    // NOTE: This entire block is INSIDE seedDatabase so chapterMap exists
    const formulas = [];

    // Science: Electricity
    const elecCh = chapterMap["electricity"];
    if (elecCh) {
      const base = { chapterId:elecCh._id, subject:"Science", classLevel:10, chapterName:"Electricity" };
      formulas.push(
        { ...base, order:1, isKeyFormula:true,  title:"Ohm's Law",         formula:"V = I × R",                    description:"Voltage equals current multiplied by resistance.", variables:[{symbol:"V",meaning:"Potential difference (Volts)"},{symbol:"I",meaning:"Current (Amperes)"},{symbol:"R",meaning:"Resistance (Ohms, Ω)"}], example:"I=2A, R=5Ω → V=10V", category:"Current Electricity" },
        { ...base, order:2, isKeyFormula:true,  title:"Electric Power",    formula:"P = V × I = I² × R = V² / R", description:"Rate at which electrical energy is consumed.",       variables:[{symbol:"P",meaning:"Power (Watts)"},{symbol:"V",meaning:"Voltage"},{symbol:"I",meaning:"Current"},{symbol:"R",meaning:"Resistance"}], example:"V=220V, I=5A → P=1100W", category:"Current Electricity" },
        { ...base, order:3, isKeyFormula:false, title:"Series Resistance",  formula:"R_total = R₁ + R₂ + R₃",      description:"Total resistance is the sum of individual resistances.", variables:[{symbol:"R_total",meaning:"Total resistance"},{symbol:"R₁,R₂",meaning:"Individual resistances"}], category:"Circuits" },
        { ...base, order:4, isKeyFormula:false, title:"Parallel Resistance",formula:"1/R_total = 1/R₁ + 1/R₂",     description:"Reciprocal of total resistance equals sum of reciprocals.", category:"Circuits" },
        { ...base, order:5, isKeyFormula:true,  title:"Electric Energy",   formula:"H = V × I × t = I² × R × t",  description:"Heat produced in a circuit.", variables:[{symbol:"H",meaning:"Heat energy (Joules)"},{symbol:"t",meaning:"Time (seconds)"}], category:"Heating Effect" }
      );
    }

    // Science: Light
    const lightCh = chapterMap["light-reflection-and-refraction"];
    if (lightCh) {
      const base = { chapterId:lightCh._id, subject:"Science", classLevel:10, chapterName:"Light — Reflection and Refraction" };
      formulas.push(
        { ...base, order:1, isKeyFormula:true,  title:"Mirror Formula",     formula:"1/f = 1/v + 1/u",           description:"Relates focal length, image distance, and object distance.", variables:[{symbol:"f",meaning:"Focal length"},{symbol:"v",meaning:"Image distance"},{symbol:"u",meaning:"Object distance"}], example:"u=−30cm, f=−10cm → v=−15cm", category:"Mirrors" },
        { ...base, order:2, isKeyFormula:true,  title:"Magnification",      formula:"m = -v / u = h' / h",       description:"Ratio of image height to object height.", variables:[{symbol:"m",meaning:"Magnification"},{symbol:"h'",meaning:"Image height"},{symbol:"h",meaning:"Object height"}], category:"Mirrors" },
        { ...base, order:3, isKeyFormula:true,  title:"Snell's Law",        formula:"n₁ sinθ₁ = n₂ sinθ₂",      description:"Relationship between angles of incidence and refraction.", category:"Refraction" },
        { ...base, order:4, isKeyFormula:false, title:"Refractive Index",   formula:"n = c / v = sin i / sin r", description:"How much a medium bends light.", category:"Refraction" },
        { ...base, order:5, isKeyFormula:true,  title:"Lens Formula",       formula:"1/f = 1/v - 1/u",           description:"Relates focal length to image and object distances for lenses.", category:"Lenses" },
        { ...base, order:6, isKeyFormula:false, title:"Power of a Lens",    formula:"P = 1 / f (metres)",        description:"Ability of a lens to converge or diverge light. Unit: Dioptre.", category:"Lenses" }
      );
    }

    // Maths: Quadratic Equations
    const quadCh = chapterMap["quadratic-equations"];
    if (quadCh) {
      const base = { chapterId:quadCh._id, subject:"Mathematics", classLevel:10, chapterName:"Quadratic Equations" };
      formulas.push(
        { ...base, order:1, isKeyFormula:true,  title:"Quadratic Formula",     formula:"x = (-b ± √(b²-4ac)) / 2a", description:"Finds roots of any quadratic equation ax² + bx + c = 0.", variables:[{symbol:"a,b,c",meaning:"Coefficients of ax²+bx+c=0"},{symbol:"x",meaning:"Root(s)"}], example:"x²-5x+6=0 → x=3 or x=2", category:"Roots" },
        { ...base, order:2, isKeyFormula:true,  title:"Discriminant",           formula:"D = b² - 4ac",              description:"D>0: two distinct real roots · D=0: equal roots · D<0: no real roots", variables:[{symbol:"D>0",meaning:"Two distinct real roots"},{symbol:"D=0",meaning:"Equal roots"},{symbol:"D<0",meaning:"No real roots"}], category:"Nature of Roots" },
        { ...base, order:3, isKeyFormula:false, title:"Sum & Product of Roots", formula:"α+β = -b/a   |   αβ = c/a", description:"Relation between roots and coefficients.", variables:[{symbol:"α,β",meaning:"Roots of the quadratic"}], category:"Roots" }
      );
    }

    // Maths: Trigonometry
    const trigCh = chapterMap["introduction-to-trigonometry"];
    if (trigCh) {
      const base = { chapterId:trigCh._id, subject:"Mathematics", classLevel:10, chapterName:"Introduction to Trigonometry" };
      formulas.push(
        { ...base, order:1, isKeyFormula:true,  title:"Basic Ratios",        formula:"sinθ = P/H   cosθ = B/H   tanθ = P/B",           description:"Trigonometric ratios in a right-angled triangle.", variables:[{symbol:"P",meaning:"Perpendicular"},{symbol:"B",meaning:"Base"},{symbol:"H",meaning:"Hypotenuse"}], category:"Basic Ratios" },
        { ...base, order:2, isKeyFormula:false, title:"Reciprocal Ratios",   formula:"cosecθ = 1/sinθ   secθ = 1/cosθ   cotθ = 1/tanθ", description:"Reciprocals of the three primary trig ratios.", category:"Basic Ratios" },
        { ...base, order:3, isKeyFormula:true,  title:"Pythagorean Identity",formula:"sin²θ + cos²θ = 1",                                description:"Most important trig identity — memorise this.", example:"sinθ=3/5 → cosθ=4/5", category:"Identities" },
        { ...base, order:4, isKeyFormula:false, title:"Other Identities",    formula:"1 + tan²θ = sec²θ   |   1 + cot²θ = cosec²θ",    description:"Derived from the Pythagorean identity.", category:"Identities" },
        { ...base, order:5, isKeyFormula:false, title:"Standard Values",     formula:"sin0°=0  sin30°=½  sin45°=1/√2  sin60°=√3/2  sin90°=1", description:"cos goes in reverse order. tan = sin/cos.", category:"Standard Values" }
      );
    }

    // Maths: Real Numbers
    const realCh = chapterMap["real-numbers"];
    if (realCh) {
      const base = { chapterId:realCh._id, subject:"Mathematics", classLevel:10, chapterName:"Real Numbers" };
      formulas.push(
        { ...base, order:1, isKeyFormula:true,  title:"Euclid's Division Lemma", formula:"a = bq + r,  where 0 ≤ r < b", description:"Any positive integer a can be expressed as a = bq + r.", variables:[{symbol:"a",meaning:"Dividend"},{symbol:"b",meaning:"Divisor"},{symbol:"q",meaning:"Quotient"},{symbol:"r",meaning:"Remainder (0 ≤ r < b)"}], example:"20 = 6×3 + 2", category:"Number Theory" },
        { ...base, order:2, isKeyFormula:true,  title:"HCF × LCM Relation",      formula:"HCF(a,b) × LCM(a,b) = a × b",  description:"Product of HCF and LCM equals product of the two numbers.", example:"HCF(12,18)=6, LCM=36 → 6×36=216=12×18 ✓", category:"Number Theory" }
      );
    }

    if (formulas.length) {
      const insertedFormulas = await Formula.insertMany(formulas);
      console.log(`📐 Inserted ${insertedFormulas.length} formulas`);
    }

    // ── Summary ───────────────────────────────────────────
    console.log("\n✅ DATABASE SEEDED SUCCESSFULLY");
    console.log("────────────────────────────────────");
    console.log(`Chapters  : ${insertedChapters.length}`);
    console.log(`Resources : ${resources.length}`);
    console.log(`Formulas  : ${formulas.length}`);
    console.log("────────────────────────────────────");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();