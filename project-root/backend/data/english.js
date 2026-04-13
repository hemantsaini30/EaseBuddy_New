

const mongoose = require("mongoose");
const dotenv   = require("dotenv");
const Chapter  = require("../models/Chapter");
const Resource = require("../models/Resource");
dotenv.config({ path: "../.env" });

// ─────────────────────────────────────────────────────────
// ENGLISH SEED — First Flight
// Nelson Mandela | Two Stories About Flying | Anne Frank
// ─────────────────────────────────────────────────────────

const seedEnglish = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // ── Find chapters in DB ───────────────────────────────
    const slugs = [
      "a-letter-to-god",
      "nelson-mandela-long-walk-to-freedom",
      "two-stories-about-flying",
      "from-the-diary-of-anne-frank",
      "the-hundred-dresses-part-1",
      "the-hundred-dresses-part-2",
      "glimpses-of-india",
      "mijbil-the-otter",
      "madam-rides-the-bus",
      "the-sermon-at-benares",
      "the-proposal",
      "dust-of-snow",
      "fire-and-ice",
      "a-tiger-in-the-zoo",
      "how-to-tell-wild-animals",
      "the-ball-poem",
      "amanda",
      "animals-poem",
      "the-trees-poem",
      "fog-poem",
      "tale-of-custard-the-dragon",
      "for-anne-gregory",
      "a-triumph-of-surgery",
      "the-thiefs-story",
      "the-midnight-visitor",
      "a-question-of-trust",
      "footprints-without-feet",
      "the-making-of-a-scientist",
      "the-necklace",
      "the-hack-driver",
      "bholi",
      "the-book-that-saved-the-earth",
    ];

    const chapters = await Chapter.find({ slug: { $in: slugs } });
    if (!chapters.length) {
      console.error("❌ Chapters not found. Run your main seed first.");
      process.exit(1);
    }

    const chapterMap = {};
    chapters.forEach((c) => { chapterMap[c.slug] = c; });

    // ── Delete existing resources for these chapters ──────
    const chapterIds = chapters.map((c) => c._id);
    await Resource.deleteMany({ chapterId: { $in: chapterIds } });
    console.log(`🗑️  Cleared old resources for ${chapterIds.length} English chapter(s)`);

    const resources = [];

    const pushEnglishChapterBank = (ch, pyqs, easy, medium, hard) => {
      if (!ch) return;
      if (pyqs && pyqs.length) {
        pyqs.forEach((q, i) => {
          resources.push({
            chapterId: ch._id,
            type: "pyq",
            title: `PYQ ${q.year != null ? q.year : "—"} — Q${i + 1}`,
            question: q.question,
            answer: q.answer,
            year: q.year ?? null,
            marks: q.marks ?? 3,
            difficulty: q.difficulty ?? "medium",
            order: i + 1,
          });
        });
      }
      const pushMcq = (arr, level) => {
        if (!arr || !arr.length) return;
        arr.forEach((q, i) => {
          resources.push({
            chapterId: ch._id,
            type: "mcq",
            testLevel: level,
            title: `${level[0].toUpperCase()}${level.slice(1)} MCQ Q${i + 1}`,
            mcqQuestion: q.q,
            mcqOptions: q.opts,
            mcqCorrectIndex: q.ans,
            mcqExplanation: q.exp,
            order: i + 1,
          });
        });
      };
      pushMcq(easy, "easy");
      pushMcq(medium, "medium");
      pushMcq(hard, "hard");
    };

    const chEng1 = chapterMap["a-letter-to-god"];

    if (chEng1) {
      // No formulas apply to a literature chapter.

      // =========================================================
      // PYQs (15) — CBSE-style, exam-ready, structured answers
      // =========================================================
      const pyqs = [
        {
          title: "PYQ 2024 — Theme of the Story",
          question:
            "What is the central theme of 'A Letter to God'? Explain how the story highlights it through Lencho and the postmaster.",
          answer:
            "The central theme of the story is faith, human kindness, and irony.\n\n" +
            "• Lencho has complete faith in God and believes that God will help him in his crisis.\n" +
            "• Even after the hailstorm destroys his crop, he does not lose hope.\n" +
            "• The postmaster and his colleagues show human kindness by collecting money for Lencho.\n" +
            "• Irony appears when Lencho, instead of thanking them, calls them 'a bunch of crooks'.\n\n" +
            "Conclusion:\n" +
            "The story shows that faith can give strength, but blind faith can also lead to misunderstanding. Human goodness is presented as a powerful force. ■",
          year: 2024,
          marks: 5,
          difficulty: "medium",
          order: 1,
        },
        {
          title: "PYQ 2023 — Character Sketch of Lencho",
          question: "Write a character sketch of Lencho.",
          answer:
            "Lencho is a poor but hardworking farmer who lives with complete faith in God.\n\n" +
            "Main qualities:\n" +
            "• Hardworking: He depends on his crop for survival.\n" +
            "• Faithful: He believes that God will surely help him.\n" +
            "• Innocent: He writes a letter directly to God.\n" +
            "• Ungrateful in ignorance: He misunderstands the post office employees.\n\n" +
            "Limitations:\n" +
            "• His faith is blind and unrealistic.\n" +
            "• He fails to recognize human help.\n\n" +
            "Conclusion:\n" +
            "Lencho is a simple, sincere, and deeply religious man, but his innocence also makes him narrow-minded and misinformed. ■",
          year: 2023,
          marks: 3,
          difficulty: "easy",
          order: 2,
        },
        {
          title: "PYQ 2023 — Irony in the Story",
          question: "Explain the irony in the story 'A Letter to God'.",
          answer:
            "Irony means a situation where the outcome is opposite to what is expected.\n\n" +
            "In the story:\n" +
            "• Lencho believes that only God can help him.\n" +
            "• The money that reaches him is actually collected by the postmaster and his staff.\n" +
            "• Instead of being grateful, Lencho calls them 'a bunch of crooks'.\n\n" +
            "This is ironic because:\n" +
            "• The real helpers are blamed.\n" +
            "• The person Lencho thanks most is not the one who physically sent the money.\n\n" +
            "Conclusion:\n" +
            "The story uses irony to show the gap between faith and reality. ■",
          year: 2023,
          marks: 3,
          difficulty: "medium",
          order: 3,
        },
        {
          title: "PYQ 2022 — Title Justification",
          question: "Justify the title 'A Letter to God'.",
          answer:
            "The title is highly appropriate because the entire story revolves around Lencho’s letter to God.\n\n" +
            "Reasons:\n" +
            "• The letter is the turning point of the plot.\n" +
            "• It reveals Lencho’s deep and direct faith in God.\n" +
            "• It creates the main conflict and the ending irony.\n" +
            "• The story also shows how humans respond to that letter.\n\n" +
            "Conclusion:\n" +
            "The title is simple, direct, and meaningful because it perfectly captures the central event and theme of the story. ■",
          year: 2022,
          marks: 3,
          difficulty: "easy",
          order: 4,
        },
        {
          title: "PYQ 2022 — Role of the Postmaster",
          question: "Describe the role of the postmaster in the story.",
          answer:
            "The postmaster plays an important role in the story.\n\n" +
            "• At first, he laughs at Lencho’s letter.\n" +
            "• Later, he is impressed by Lencho’s faith in God.\n" +
            "• He takes the matter seriously and decides to help.\n" +
            "• He asks his colleagues to contribute money.\n" +
            "• He sends the money to Lencho with great care.\n\n" +
            "Significance:\n" +
            "• He represents kindness, empathy, and humanity.\n" +
            "• He becomes the bridge between Lencho’s faith and human help.\n\n" +
            "Conclusion:\n" +
            "The postmaster is a generous and sensitive person who shows that real humanity can be as powerful as divine help. ■",
          year: 2022,
          marks: 5,
          difficulty: "medium",
          order: 5,
        },
        {
          title: "PYQ 2021 — Hailstorm Incident",
          question: "What happened after the hailstorm, and how did Lencho react to it?",
          answer:
            "The hailstorm destroys Lencho’s crop completely.\n\n" +
            "What happened:\n" +
            "• Huge hailstones fell from the sky.\n" +
            "• The entire field became white like covered with salt.\n" +
            "• The ripe crop was ruined.\n" +
            "• Lencho’s family faced starvation.\n\n" +
            "Lencho’s reaction:\n" +
            "• He became sad but did not lose faith.\n" +
            "• He believed that God would help him.\n" +
            "• He wrote a letter asking for money.\n\n" +
            "Conclusion:\n" +
            "The hailstorm creates the central crisis of the story and shows both nature’s power and Lencho’s faith. ■",
          year: 2021,
          marks: 2,
          difficulty: "easy",
          order: 6,
        },
        {
          title: "PYQ 2021 — Message of the Story",
          question: "What message does the story convey?",
          answer:
            "The story conveys several important messages:\n\n" +
            "• Faith can give people hope in difficult times.\n" +
            "• Human beings should help one another selflessly.\n" +
            "• Blind faith may lead to misunderstanding.\n" +
            "• Goodness often exists in ordinary people.\n\n" +
            "Conclusion:\n" +
            "The story teaches that kindness and faith are valuable, but they should be balanced with understanding and gratitude. ■",
          year: 2021,
          marks: 3,
          difficulty: "medium",
          order: 7,
        },
        {
          title: "PYQ 2020 — Character of the Post Office Employees",
          question: "How do the post office employees support Lencho? What does this show about them?",
          answer:
            "The post office employees support Lencho in an unusual and kind way.\n\n" +
            "• They hear about Lencho’s faith in God.\n" +
            "• They contribute money from their own pockets.\n" +
            "• They try to protect Lencho’s belief in God.\n" +
            "• They send the money anonymously.\n\n" +
            "What it shows:\n" +
            "• They are compassionate.\n" +
            "• They are generous.\n" +
            "• They respect Lencho’s faith.\n\n" +
            "Conclusion:\n" +
            "The employees show that ordinary people can act with extraordinary kindness. ■",
          year: 2020,
          marks: 3,
          difficulty: "easy",
          order: 8,
        },
        {
          title: "PYQ 2020 — Lencho’s Faith",
          question: "Why is Lencho’s faith in God considered both admirable and unrealistic?",
          answer:
            "Lencho’s faith is admirable because it is pure and complete.\n\n" +
            "Admirable aspects:\n" +
            "• He trusts God in every difficulty.\n" +
            "• He has hope even after losing everything.\n" +
            "• He remains mentally strong.\n\n" +
            "Unrealistic aspects:\n" +
            "• He expects God to send money directly.\n" +
            "• He ignores human effort.\n" +
            "• He accuses helpers instead of being thankful.\n\n" +
            "Conclusion:\n" +
            "His faith is sincere and powerful, but it becomes unrealistic because he does not understand human support. ■",
          year: 2020,
          marks: 5,
          difficulty: "hard",
          order: 9,
        },
        {
          title: "PYQ 2019 — Setting of the Story",
          question: "Describe the setting of the story and explain its importance.",
          answer:
            "The story is set in a rural farming area.\n\n" +
            "Key features:\n" +
            "• Lencho lives on a hill.\n" +
            "• His house is small and isolated.\n" +
            "• He depends completely on agriculture.\n" +
            "• The weather directly affects his survival.\n\n" +
            "Importance:\n" +
            "• The setting reflects the life of poor farmers.\n" +
            "• It makes the hailstorm more tragic.\n" +
            "• It strengthens the theme of dependence on nature.\n\n" +
            "Conclusion:\n" +
            "The rural setting is important because it creates realism and supports the central conflict. ■",
          year: 2019,
          marks: 2,
          difficulty: "easy",
          order: 10,
        },
        {
          title: "PYQ 2019 — Symbolism in the Story",
          question: "Explain any two symbols used in the story.",
          answer:
            "The story uses several symbols.\n\n" +
            "1. Hailstorm:\n" +
            "• Symbol of destruction and helplessness.\n" +
            "• It destroys Lencho’s crop and hope.\n\n" +
            "2. Letter to God:\n" +
            "• Symbol of faith and desperation.\n" +
            "• It shows Lencho’s complete trust in divine help.\n\n" +
            "Conclusion:\n" +
            "These symbols deepen the meaning of the story and make it more powerful. ■",
          year: 2019,
          marks: 3,
          difficulty: "medium",
          order: 11,
        },
        {
          title: "PYQ 2018 — Narrative Style",
          question: "Comment on the narrative style of 'A Letter to God'.",
          answer:
            "The narrative style is simple, direct, and highly effective.\n\n" +
            "Features:\n" +
            "• Clear and easy language.\n" +
            "• Short and realistic events.\n" +
            "• Use of humour and irony.\n" +
            "• Strong emotional appeal.\n\n" +
            "Effect:\n" +
            "• The story becomes easy to understand.\n" +
            "• The ending becomes memorable.\n\n" +
            "Conclusion:\n" +
            "The simple narrative style helps the story deliver its message with clarity and impact. ■",
          year: 2018,
          marks: 5,
          difficulty: "hard",
          order: 12,
        },
        {
          title: "PYQ 2018 — Human vs Nature",
          question: "Explain how the story presents the conflict between humans and nature.",
          answer:
            "The story clearly presents conflict between humans and nature.\n\n" +
            "• Lencho depends on farming for survival.\n" +
            "• Nature first gives hope through rain.\n" +
            "• Then the hailstorm destroys everything.\n" +
            "• The farmer becomes helpless before natural forces.\n\n" +
            "Conclusion:\n" +
            "Nature is shown as both nourishing and destructive, and humans appear powerless before it. ■",
          year: 2018,
          marks: 3,
          difficulty: "medium",
          order: 13,
        },
        {
          title: "PYQ 2024 — Ending of the Story",
          question: "Why is the ending of the story significant?",
          answer:
            "The ending is significant because it creates a strong sense of irony.\n\n" +
            "• Lencho receives the money he asked for, but not from God.\n" +
            "• He trusts the money but distrusts the people who helped.\n" +
            "• He calls the helpers crooks.\n\n" +
            "Significance:\n" +
            "• It reveals Lencho’s blind faith.\n" +
            "• It highlights the postmaster’s silent goodness.\n" +
            "• It leaves a lasting impression on the reader.\n\n" +
            "Conclusion:\n" +
            "The ending is memorable because it is both emotional and deeply ironic. ■",
          year: 2024,
          marks: 3,
          difficulty: "hard",
          order: 14,
        },
        {
          title: "PYQ 2024 — Learnings from Lencho",
          question: "What do we learn from Lencho’s character?",
          answer:
            "Lencho’s character teaches several lessons:\n\n" +
            "• Faith can keep a person strong in hardship.\n" +
            "• Blind faith can create misunderstanding.\n" +
            "• One should value human help.\n" +
            "• Gratitude is as important as belief.\n\n" +
            "Conclusion:\n" +
            "Lencho’s story reminds us to combine faith with awareness, and hope with gratitude. ■",
          year: 2024,
          marks: 2,
          difficulty: "easy",
          order: 15,
        },
      ];

      pyqs.forEach((q) => resources.push({ chapterId: chEng1._id, type: "pyq", ...q }));

      // =========================================================
      // EASY MCQs (15)
      // =========================================================
      [
        {
          title: "E1",
          mcqQuestion: "Where did Lencho live?",
          mcqOptions: ["In a city house", "In a small house on a hill", "Near a river bank", "In a market area"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "Lencho lived in a small house on a hill. This setting matters because it reflects isolation, dependence on farming, and direct exposure to weather conditions.",
        },
        {
          title: "E2",
          mcqQuestion: "What destroyed Lencho’s crop?",
          mcqOptions: ["Flood", "Drought", "Hailstorm", "Earthquake"],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "A hailstorm destroyed Lencho’s crop. The hailstones fell heavily and ruined the ripe crop completely, leaving Lencho helpless.",
        },
        {
          title: "E3",
          mcqQuestion: "What did Lencho expect from God?",
          mcqOptions: ["A job", "Money", "A house", "A letter only"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "Lencho expected money from God because he needed financial support to survive and sow his fields again after the crop was destroyed.",
        },
        {
          title: "E4",
          mcqQuestion: "How much money did Lencho ask for?",
          mcqOptions: ["50 pesos", "70 pesos", "100 pesos", "200 pesos"],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "Lencho asked for 100 pesos. He believed that amount would help him restart farming and support his family.",
        },
        {
          title: "E5",
          mcqQuestion: "Who read Lencho’s letter first?",
          mcqOptions: ["The postman", "The postmaster", "The teacher", "The policeman"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The postmaster read Lencho’s letter. He was surprised by Lencho’s faith and later arranged to help him.",
        },
        {
          title: "E6",
          mcqQuestion: "What was Lencho’s profession?",
          mcqOptions: ["Teacher", "Farmer", "Shopkeeper", "Soldier"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "Lencho was a farmer. His livelihood depended on the crops he cultivated, which is why the hailstorm had such a devastating effect.",
        },
        {
          title: "E7",
          mcqQuestion: "What did Lencho call the rain at first?",
          mcqOptions: ["Bad", "A blessing", "A curse", "A warning"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "Lencho first saw the rain as a blessing because it was needed for his crops. Only later did the weather turn destructive when the hailstorm came.",
        },
        {
          title: "E8",
          mcqQuestion: "What did Lencho write to?",
          mcqOptions: ["The police", "The government", "God", "The bank"],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "Lencho wrote directly to God because he believed that God alone could help him in his situation.",
        },
        {
          title: "E9",
          mcqQuestion: "What did the postmaster do after reading the letter?",
          mcqOptions: ["Threw it away", "Laughed only", "Helped Lencho", "Ignored it completely"],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The postmaster decided to help Lencho. He arranged money from his employees and sent it to Lencho to preserve his faith.",
        },
        {
          title: "E10",
          mcqQuestion: "What did Lencho call the people who sent him money?",
          mcqOptions: ["Friends", "Saints", "Crooks", "Helpers"],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "Lencho called the helpers 'a bunch of crooks'. He believed that God had sent 100 pesos, and therefore he thought someone had stolen part of it.",
        },
        {
          title: "E11",
          mcqQuestion: "What literary device is strongly used in the story?",
          mcqOptions: ["Alliteration", "Irony", "Hyperbole only", "Pun"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "Irony is strongly used in the story, especially when Lencho trusts the money but blames the very people who helped him.",
        },
        {
          title: "E12",
          mcqQuestion: "What does the hailstorm mainly symbolise?",
          mcqOptions: ["Friendship", "Destruction", "Success", "Peace"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The hailstorm symbolises destruction and helplessness. It wipes out Lencho’s crop and creates the central problem of the story.",
        },
        {
          title: "E13",
          mcqQuestion: "What is the tone of the story mostly like?",
          mcqOptions: ["Comic and careless", "Serious and ironic", "Suspenseful and dark", "Scientific and formal"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The story has a serious tone with a clear element of irony. It deals with hardship, faith, and human kindness in a simple but meaningful way.",
        },
        {
          title: "E14",
          mcqQuestion: "What did the postmaster sign the letter as?",
          mcqOptions: ["Friend", "God", "Lencho", "Postmaster"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The postmaster signed the letter as 'God' to protect Lencho’s faith and make the response feel authentic to him.",
        },
        {
          title: "E15",
          mcqQuestion: "The story is taken from which book?",
          mcqOptions: ["Footprints Without Feet", "First Flight", "Beehive", "Moments"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "'A Letter to God' is included in the Class 10 English textbook 'First Flight'.",
        },
      ].forEach((q, i) =>
        resources.push({
          chapterId: chEng1._id,
          type: "mcq",
          testLevel: "easy",
          order: i + 1,
          ...q,
        })
      );

      // =========================================================
      // MEDIUM MCQs (15)
      // =========================================================
      [
        {
          title: "M1",
          mcqQuestion: "Why did the postmaster decide to collect money for Lencho?",
          mcqOptions: [
            "To impress Lencho",
            "To teach Lencho a lesson",
            "To preserve Lencho’s faith in God",
            "To avoid complaint",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The postmaster collected money because he was deeply moved by Lencho’s faith and wanted to preserve that faith. His response shows empathy and humanity rather than duty alone.",
        },
        {
          title: "M2",
          mcqQuestion: "Which quality best describes Lencho’s faith?",
          mcqOptions: ["Doubtful", "Blind and absolute", "Temporary", "Calculated"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "Lencho’s faith is blind and absolute. He trusts God completely and does not question the situation, even when the response comes through humans.",
        },
        {
          title: "M3",
          mcqQuestion: "What does the phrase 'new silver coins' refer to in the story?",
          mcqOptions: ["Rain drops", "Hailstones", "Money in the letter", "Sunlight"],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The hailstones are compared to new silver coins because they looked shiny and white while falling. This comparison is ironic because the same hailstones that looked attractive destroyed the crop.",
        },
        {
          title: "M4",
          mcqQuestion: "Why is the ending of the story ironic?",
          mcqOptions: [
            "Lencho becomes a postmaster",
            "The letter is not delivered",
            "Lencho blames the helpers who actually helped him",
            "The postmaster ignores Lencho",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The ending is ironic because Lencho thinks the money came directly from God, so he calls the human helpers crooks. The very people who helped him are the ones he suspects.",
        },
        {
          title: "M5",
          mcqQuestion: "What kind of conflict is most prominent in the story?",
          mcqOptions: ["Man vs Man", "Man vs Society", "Man vs Nature", "Man vs Self only"],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The main conflict is man vs nature, because the hailstorm destroys Lencho’s crop and creates the central crisis of the story. The later misunderstanding adds a social dimension, but nature is the first and strongest conflict.",
        },
        {
          title: "M6",
          mcqQuestion: "What is the main reason Lencho does not thank the post office employees?",
          mcqOptions: [
            "He forgets them",
            "He never receives money",
            "He believes the money came from God",
            "He thinks they are too poor",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "Lencho believes the money came from God, not from the post office employees. Since he assumes God sent 100 pesos and only 70 arrived, he thinks the workers stole the rest.",
        },
        {
          title: "M7",
          mcqQuestion: "Which statement best explains the postmaster’s attitude?",
          mcqOptions: [
            "He was humorous but careless",
            "He was sympathetic and generous",
            "He was angry and suspicious",
            "He was proud and selfish",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The postmaster is sympathetic and generous. He first laughs, but then he becomes emotionally involved and helps Lencho with genuine concern.",
        },
        {
          title: "M8",
          mcqQuestion: "What does Lencho’s letter reveal about him?",
          mcqOptions: [
            "He is highly educated",
            "He is dishonest",
            "He is innocent and faithful",
            "He is politically aware",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The letter reveals Lencho’s innocence and strong faith. He is not writing as a clever or educated person, but as someone who sincerely believes in direct divine help.",
        },
        {
          title: "M9",
          mcqQuestion: "Which aspect of the story makes it realistic?",
          mcqOptions: [
            "A talking animal",
            "A magic solution",
            "The rural farming hardship",
            "A fantasy journey",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The rural farming hardship makes the story realistic. The struggle for survival after crop loss is a genuine problem faced by many farmers.",
        },
        {
          title: "M10",
          mcqQuestion: "What is the effect of making the postmaster collect money secretly?",
          mcqOptions: [
            "It creates suspense only",
            "It makes the ending comic",
            "It highlights selfless service",
            "It shows legal procedure",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "Secretly collecting money highlights selfless service. The postmaster and his colleagues help without expecting praise, which strengthens the moral dimension of the story.",
        },
        {
          title: "M11",
          mcqQuestion: "Why does Lencho ask for exactly 100 pesos?",
          mcqOptions: [
            "He wants extra profit",
            "He thinks it is enough to survive and restart farming",
            "He is testing God",
            "He has no reason at all",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "Lencho asks for 100 pesos because he believes this amount will help him survive the crisis and buy what he needs to sow his fields again. It is a practical amount from his perspective.",
        },
        {
          title: "M12",
          mcqQuestion: "What does the story suggest about ordinary people?",
          mcqOptions: [
            "They are usually careless",
            "They cannot show compassion",
            "They can act with great kindness",
            "They always help for rewards",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The story suggests that ordinary people can act with great kindness. The postmaster and his staff are not extraordinary people in status, but they display true humanity.",
        },
        {
          title: "M13",
          mcqQuestion: "What is the dominant feeling in Lencho after the hailstorm?",
          mcqOptions: ["Joy", "Relief", "Helplessness", "Pride"],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "Lencho feels helpless after the hailstorm because his entire crop is destroyed and his family’s survival is threatened. His faith remains, but his situation becomes desperate.",
        },
        {
          title: "M14",
          mcqQuestion: "Why is the story considered a good example of a didactic narrative?",
          mcqOptions: [
            "It teaches a moral lesson",
            "It has no characters",
            "It is full of action scenes",
            "It is written as poetry",
          ],
          mcqCorrectIndex: 0,
          mcqExplanation:
            "The story is didactic because it teaches a moral lesson about faith, kindness, and misunderstanding. It uses a simple plot to communicate a meaningful message.",
        },
        {
          title: "M15",
          mcqQuestion: "What is the best interpretation of Lencho’s final reaction?",
          mcqOptions: [
            "He is greedy only",
            "He is deeply thankful",
            "He is honest but misguided",
            "He is fully educated",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "Lencho is honest in his belief, but he is misguided because he cannot imagine that humans helped him. His reaction comes from innocence and blind faith, not from bad intention.",
        },
      ].forEach((q, i) =>
        resources.push({
          chapterId: chEng1._id,
          type: "mcq",
          testLevel: "medium",
          order: i + 1,
          ...q,
        })
      );

      // =========================================================
      // HARD MCQs (15)
      // =========================================================
      [
        {
          title: "H1",
          mcqQuestion: "Which option best explains why the story’s ending is powerful?",
          mcqOptions: [
            "It solves the problem scientifically",
            "It reveals the gap between gratitude and faith",
            "It introduces a new character",
            "It changes the setting completely",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The ending is powerful because it reveals a deep gap between gratitude and faith. Lencho has faith in God, but that faith prevents him from recognising human kindness. The ending leaves the reader reflecting on irony and human nature.",
        },
        {
          title: "H2",
          mcqQuestion: "What is the most accurate meaning of Lencho calling the helpers 'crooks'?",
          mcqOptions: [
            "He is intentionally insulting them after understanding everything",
            "He is misjudging them because of his blind faith",
            "He has proof of theft",
            "He never received any money",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "Lencho misjudges the helpers because of his blind faith. He assumes that God sent 100 pesos and that the post office stole the missing 30 pesos. The insult comes from ignorance, not evidence.",
        },
        {
          title: "H3",
          mcqQuestion: "Which statement best captures the moral complexity of the story?",
          mcqOptions: [
            "Faith is always wrong",
            "Human help is useless",
            "Faith is meaningful, but without awareness it can become blind",
            "Money is the only solution",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The story does not reject faith. Instead, it suggests that faith is meaningful but can become blind without awareness and gratitude. The moral complexity lies in the coexistence of goodness, misunderstanding, and irony.",
        },
        {
          title: "H4",
          mcqQuestion: "Why does the author compare the hailstones to silver coins?",
          mcqOptions: [
            "To show Lencho’s greed",
            "To create a hopeful and deceptive image before destruction",
            "To describe money sent by God",
            "To make the story funny only",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The hailstones are compared to silver coins because they appear bright and beautiful at first. This comparison creates a deceptive image, as the same hailstones soon destroy the crop. The contrast deepens the irony.",
        },
        {
          title: "H5",
          mcqQuestion: "What does the postmaster’s response suggest about true religion in the story?",
          mcqOptions: [
            "Religion is only about rituals",
            "Religion means blind obedience",
            "Human compassion can reflect divine values",
            "Religion has nothing to do with kindness",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The postmaster’s response suggests that human compassion can reflect divine values. By helping Lencho without expecting credit, the postmaster behaves in a way that resembles the kindness Lencho attributes to God.",
        },
        {
          title: "H6",
          mcqQuestion: "Which of the following best explains the narrator’s tone in the final line?",
          mcqOptions: [
            "Openly angry",
            "Quietly humorous and ironic",
            "Scientific and detached",
            "Overly dramatic",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The final line has a quietly humorous and ironic tone. The narrator does not openly judge Lencho, but the situation itself is ironic enough to create a strong effect on the reader.",
        },
        {
          title: "H7",
          mcqQuestion: "Why does Lencho’s faith become problematic in the story?",
          mcqOptions: [
            "Because he believes in nature",
            "Because he refuses to accept any help at all",
            "Because it prevents him from recognising human effort",
            "Because the postmaster dislikes him",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "Lencho’s faith becomes problematic because it prevents him from recognising human effort. He sees only God as the helper and therefore misunderstands the post office employees completely.",
        },
        {
          title: "H8",
          mcqQuestion: "Which option best describes the structural role of the letter in the story?",
          mcqOptions: [
            "It is a decorative detail",
            "It works as the plot engine",
            "It serves as background only",
            "It is used for comic relief only",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The letter works as the plot engine. It sets the story in motion, triggers the postmaster’s reaction, and leads to the ending irony. Without the letter, the whole story would not exist in its present form.",
        },
        {
          title: "H9",
          mcqQuestion: "Which inference about Lencho is most valid?",
          mcqOptions: [
            "He is intentionally dishonest",
            "He is naive but morally sincere",
            "He is educated enough to understand the post office system",
            "He is mocking God",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "Lencho is naive but morally sincere. He does not intend harm or deception, but he lacks the awareness needed to interpret the situation correctly. His sincerity makes him sympathetic, even when he is wrong.",
        },
        {
          title: "H10",
          mcqQuestion: "What is the best reason the author keeps the story language simple?",
          mcqOptions: [
            "To avoid theme",
            "To make the story accessible and realistic",
            "To reduce emotional impact",
            "To hide the irony",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The simple language makes the story accessible and realistic. Because the characters and situation are ordinary, the straightforward style makes the moral and irony more effective.",
        },
        {
          title: "H11",
          mcqQuestion: "Which pair correctly represents the two major responses to Lencho’s problem?",
          mcqOptions: [
            "Government aid and punishment",
            "Nature’s destruction and human help",
            "Money and fame",
            "Fear and revenge",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The two major responses are nature’s destruction through the hailstorm and human help through the postmaster’s kindness. These two forces create the central movement of the story.",
        },
        {
          title: "H12",
          mcqQuestion: "Why does the story remain memorable despite being very short?",
          mcqOptions: [
            "Because it has many characters",
            "Because it is full of complicated vocabulary",
            "Because it combines faith, irony, and human emotion effectively",
            "Because it ends with a mystery clue",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The story is memorable because it combines faith, irony, and human emotion effectively. In a short space, it delivers a strong moral and emotional impact.",
        },
        {
          title: "H13",
          mcqQuestion: "What does the story most strongly criticise?",
          mcqOptions: [
            "Human kindness",
            "Blind misunderstanding",
            "Farming",
            "Letters and communication",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The story most strongly criticises blind misunderstanding. Lencho’s inability to recognise human help leads to irony and a mistaken accusation.",
        },
        {
          title: "H14",
          mcqQuestion: "If Lencho had understood who sent the money, what would the story have lost most?",
          mcqOptions: [
            "Its rural setting",
            "Its irony and emotional impact",
            "Its title only",
            "Its simple language",
          ],
          mcqCorrectIndex: 1,
          mcqExplanation:
            "The story would have lost its strongest irony and much of its emotional impact. The ending depends on Lencho’s misunderstanding, which creates the memorable contrast between human kindness and mistaken belief.",
        },
        {
          title: "H15",
          mcqQuestion: "What is the best critical reading of the story’s conclusion?",
          mcqOptions: [
            "It proves that people are always selfish",
            "It suggests that faith is useless",
            "It shows that goodness may go unrecognised",
            "It confirms that letters should never be written",
          ],
          mcqCorrectIndex: 2,
          mcqExplanation:
            "The conclusion shows that goodness may go unrecognised. The postmaster and his colleagues act kindly, but Lencho never knows their role. This makes the ending ironic and emotionally layered.",
        },
      ].forEach((q, i) =>
        resources.push({
          chapterId: chEng1._id,
          type: "mcq",
          testLevel: "hard",
          order: i + 1,
          ...q,
        })
      );
    }

    // ═════════════════════════════════════════════════════
    // CHAPTER 1: NELSON MANDELA — LONG WALK TO FREEDOM
    // ═════════════════════════════════════════════════════
    const mandela = chapterMap["nelson-mandela-long-walk-to-freedom"];
    if (mandela) {

      // ── PYQs (15) ──────────────────────────────────────
      const mandelaPYQs = [
        {
          question: "What did the inauguration ceremony of Nelson Mandela signify for South Africa?",
          answer: "The inauguration signified the end of apartheid and the birth of a new democratic South Africa. For the first time, a Black leader was being sworn in as President, representing freedom, equality and the triumph of the human spirit over racial oppression. It was described as a spectacular moment for humanity.",
          year: 2023, marks: 3, difficulty: "medium",
        },
        {
          question: "What did Mandela mean when he said that the oppressor is also a prisoner?",
          answer: "Mandela meant that apartheid imprisoned both the oppressed and the oppressor. The White minority, by denying freedom to others, had robbed themselves of their own humanity, compassion and generosity. A person who takes away another's freedom is also a prisoner of hatred and prejudice, and is not truly free himself.",
          year: 2022, marks: 3, difficulty: "medium",
        },
        {
          question: "What twin obligations does Mandela mention in the chapter?",
          answer: "Mandela mentions that every man has twin obligations — first, obligations to his family, parents, wife and children; and second, obligations to his people, his community and his country. In a civil and humane society, each person is able to fulfil both obligations freely. But in South Africa under apartheid, fulfilling the obligation to his people meant being forced to leave his family.",
          year: 2022, marks: 5, difficulty: "hard",
        },
        {
          question: "Who were the dignitaries present at Mandela's inauguration?",
          answer: "The inauguration was attended by dignitaries and heads of state from more than 140 countries. This was one of the largest gatherings of international leaders ever seen on South African soil, signifying the world's joy and support for the end of apartheid and the beginning of democratic rule.",
          year: 2021, marks: 2, difficulty: "easy",
        },
        {
          question: "What did Mandela say about courage in the chapter?",
          answer: "Mandela said that he learned that courage was not the absence of fear, but the triumph over it. The brave man is not the one who does not feel afraid, but the one who conquers that fear. He himself had felt afraid many times but had used a mask of boldness to hide it.",
          year: 2023, marks: 3, difficulty: "medium",
        },
        {
          question: "How did Mandela's understanding of freedom change as he grew older?",
          answer: "As a young child Mandela felt free without knowing it — he was free to run in the fields, to swim in clear streams, to roast mealies under the stars. As a student he only wanted personal freedom — to stay out at night, to read what he pleased. But as a young man he gradually realised that his personal freedom was an illusion because his brothers and sisters were not free. That is when his hunger for freedom became a hunger for the freedom of all his people.",
          year: 2020, marks: 5, difficulty: "hard",
        },
        {
          question: "What did Mandela observe about the three generals at the ceremony?",
          answer: "Mandela observed that two of the generals who had previously kept him imprisoned and who had enforced the brutal apartheid system were now saluting him as their Commander-in-Chief. This moment moved him deeply because it showed how profoundly South Africa had changed.",
          year: 2019, marks: 2, difficulty: "easy",
        },
        {
          question: "What is the policy of apartheid? How did it affect people in South Africa?",
          answer: "Apartheid was a system of racial segregation enforced by the South African government. Under this policy, Black and coloured citizens were denied basic human rights including voting rights, freedom of movement, education, and the right to live where they chose. They were treated as second-class citizens. Families were torn apart, people were jailed and killed for protesting, and an entire generation grew up in poverty and without dignity.",
          year: 2021, marks: 5, difficulty: "hard",
        },
        {
          question: "What promise did Mandela make to the people of South Africa at his inauguration?",
          answer: "Mandela promised that he would serve and protect the people, and that he would never allow the country to experience again the oppression of one by another. He pledged to liberate all his people from poverty, deprivation, suffering, gender and other discrimination.",
          year: 2020, marks: 3, difficulty: "medium",
        },
        {
          question: "Why does Mandela say 'I was not born with a hunger to be free'?",
          answer: "Mandela says this because as a child he did not know he was not free. He had food, shelter and warmth. He did not feel the chains because he had not yet tested their existence. His hunger for freedom grew as he became aware of the oppression around him — as he saw his family, friends and people suffering under apartheid — and only then did it become the central passion of his life.",
          year: 2022, marks: 3, difficulty: "medium",
        },
        {
          question: "How does Mandela describe the beauty of South Africa at the beginning of the chapter?",
          answer: "Mandela describes the inauguration ceremony being held in the lovely sandstone amphitheatre formed by the Union Buildings in Pretoria. It was a beautiful autumn day and the site, surrounded by the majestic buildings of the government, was symbolic of the beauty and hope of the new democratic South Africa that was being born.",
          year: 2019, marks: 2, difficulty: "easy",
        },
        {
          question: "What was the reaction of the international community to Mandela's inauguration?",
          answer: "The international community responded with great joy and celebration. Leaders from over 140 countries attended the ceremony. The world watched with pride and relief as apartheid ended and a democracy was born. For the first time, South Africa was welcomed back into the global community as a free and equal nation.",
          year: 2023, marks: 2, difficulty: "easy",
        },
        {
          question: "What did the military generals do at the ceremony that deeply moved Mandela?",
          answer: "The South African military generals who had once commanded the apartheid army — the same army that had once worked to keep Mandela in prison — stood at attention and saluted him as the new President and Commander-in-Chief. This gesture represented the complete transformation of South Africa from a state of oppression to one of democracy and equality.",
          year: 2021, marks: 3, difficulty: "medium",
        },
        {
          question: "Describe the theme of 'Ubuntu' as reflected in this chapter.",
          answer: "The concept of Ubuntu — meaning 'I am because we are' or humanity towards others — is deeply reflected in Mandela's speech and philosophy. Rather than seeking revenge, Mandela spoke of reconciliation and shared humanity. He believed that the freedom of the oppressed and the oppressor are intertwined — that true freedom comes only when all people are free. This generosity of spirit embodies the Ubuntu philosophy.",
          year: 2020, marks: 5, difficulty: "hard",
        },
        {
          question: "What is the significance of the title 'Long Walk to Freedom'?",
          answer: "The title symbolises that the journey to freedom is never short or easy. For Mandela and the Black people of South Africa, the walk to freedom was literally decades long — involving sacrifice, imprisonment, suffering and loss. The word 'walk' suggests it is a human, step-by-step journey, not a single dramatic moment. It also implies that even after political freedom is achieved, the walk continues toward economic freedom and equality.",
          year: 2022, marks: 3, difficulty: "medium",
        },
      ];

      mandelaPYQs.forEach((q, i) => {
        resources.push({
          chapterId:   mandela._id,
          type:        "pyq",
          title:       `PYQ ${q.year} — Q${i + 1}`,
          question:    q.question,
          answer:      q.answer,
          year:        q.year,
          marks:       q.marks,
          difficulty:  q.difficulty,
          order:       i + 1,
        });
      });

      // ── MCQs — Easy (15) ───────────────────────────────
      const mandelaEasy = [
        { q: "Where did Nelson Mandela's inauguration take place?", opts: ["Cape Town", "Johannesburg", "Union Buildings, Pretoria", "Durban"], ans: 2, exp: "The inauguration took place in the Union Buildings amphitheatre in Pretoria, the administrative capital of South Africa." },
        { q: "On what date did Nelson Mandela become President?", opts: ["10 May 1994", "10 April 1994", "10 June 1994", "26 June 1994"], ans: 0, exp: "Nelson Mandela was inaugurated as the first Black President of South Africa on 10 May 1994." },
        { q: "What was apartheid?", opts: ["A type of government building", "A system of racial segregation", "A freedom movement", "A South African festival"], ans: 1, exp: "Apartheid was the official policy of racial segregation enforced by the South African government from 1948 to 1994." },
        { q: "How many countries sent their dignitaries to Mandela's inauguration?", opts: ["Over 100", "Over 120", "Over 140", "Over 160"], ans: 2, exp: "More than 140 countries sent representatives to attend the historic inauguration." },
        { q: "Who accompanied Mandela when he walked out of prison after 27 years?", opts: ["Walter Sisulu", "Winnie Mandela", "Oliver Tambo", "Desmond Tutu"], ans: 1, exp: "Winnie Mandela, his then-wife, accompanied him as he walked out of Victor Verster Prison in 1990." },
        { q: "What did the white jet fighters do during the inauguration ceremony?", opts: ["Dropped flowers", "Formed the shape of a flag", "Flew in formation leaving coloured smoke trails", "Dropped pamphlets"], ans: 2, exp: "White jet fighters, helicopters and military helicopters flew in formation and left coloured smoke trails of the new South African flag." },
        { q: "What does Mandela say courage is?", opts: ["Absence of fear", "Triumph over fear", "Absence of danger", "Physical strength"], ans: 1, exp: "Mandela famously stated that courage is not the absence of fear but the triumph over it." },
        { q: "In the chapter, what did the 'greatest wealth' of South Africa refer to?", opts: ["Gold and diamonds", "Its people", "Its land", "Its army"], ans: 1, exp: "Mandela referred to the people of South Africa — their bravery and sacrifice — as the greatest wealth of the nation." },
        { q: "What season was it during Mandela's inauguration?", opts: ["Spring", "Summer", "Autumn", "Winter"], ans: 2, exp: "The text mentions it was 'a lovely autumn day' when the inauguration ceremony was held." },
        { q: "What is the full title of Mandela's autobiography?", opts: ["Walk to Freedom", "Long Road to Freedom", "Long Walk to Freedom", "Freedom Walk"], ans: 2, exp: "Nelson Mandela's autobiography is titled 'Long Walk to Freedom', published in 1994." },
        { q: "Which Mandela figure flew over the ceremony?", opts: ["Military helicopter", "A war plane", "Both military jets and helicopters", "A presidential aircraft"], ans: 2, exp: "White jet fighters, helicopters and military planes all participated in the ceremony flyover." },
        { q: "What colour were the buildings of the Union Buildings described as?", opts: ["White marble", "Red brick", "Sandstone", "Grey granite"], ans: 2, exp: "The Union Buildings are described as a 'lovely sandstone amphitheatre'." },
        { q: "According to Mandela, what gives a man his humanity?", opts: ["Money", "Power", "Freedom", "Love for others"], ans: 3, exp: "Mandela says a man who takes away another man's freedom and robs him of his humanity is contemptible — love for others preserves our own humanity." },
        { q: "What was the first law that Mandela violated as a young man?", opts: ["Protest law", "Curfew for black people", "Voting restriction", "Travel restriction"], ans: 1, exp: "As a young man, Mandela violated the curfew that required Black people to be indoors by a certain hour." },
        { q: "Mandela describes the decade of the 1950s, 60s and 70s as what?", opts: ["Years of learning", "Decades of oppression and resistance", "Years of exile", "Decades of darkness and despair"], ans: 3, exp: "Mandela describes those decades as a period of darkness and despair when his people were crushed and their spirits broken." },
      ];

      mandelaEasy.forEach((q, i) => {
        resources.push({
          chapterId: mandela._id, type: "mcq", testLevel: "easy",
          title: `Easy MCQ Q${i + 1}`,
          mcqQuestion: q.q, mcqOptions: q.opts,
          mcqCorrectIndex: q.ans, mcqExplanation: q.exp, order: i + 1,
        });
      });

      // ── MCQs — Medium (15) ─────────────────────────────
      const mandelaMedium = [
        { q: "What does Mandela mean by 'the oppressor must be liberated just as surely as the oppressed'?", opts: ["Oppressors should be jailed", "Oppressors are also imprisoned by hatred and fear", "Both groups need legal freedom", "Oppressors deserve no freedom"], ans: 1, exp: "Mandela argues that a person who deprives others of their freedom loses their own — imprisoned by hate, prejudice and narrow-mindedness. Both oppressor and oppressed need liberation." },
        { q: "Why does Mandela say his 'hunger for freedom' was 'not hunger for something that was denied to him'?", opts: ["He was given some freedom", "As a child he did not know he was unfree", "He chose not to be free", "The law gave him freedom"], ans: 1, exp: "As a child in the Transkei, Mandela felt free in nature. He was unaware of the chains of apartheid, so he could not hunger for what he did not know he lacked." },
        { q: "What are the 'twin obligations' Mandela describes, and what was the conflict between them?", opts: ["Obligations to family and to God", "Obligations to his tribe and his employer", "Obligations to family and to his people/nation", "Obligations to friends and to politics"], ans: 2, exp: "Every man has obligations to his family and also to his people. Under apartheid, fulfilling the obligation to his people often meant leaving his family — creating a painful impossible choice." },
        { q: "What literary device is used in 'I was not born with a hunger to be free'?", opts: ["Simile", "Irony", "Paradox", "Alliteration"], ans: 2, exp: "It is paradoxical because we assume all humans desire freedom instinctively. Mandela subverts this to explain that his hunger grew from lived experience of oppression rather than being innate." },
        { q: "Why does Mandela describe the inauguration as 'a common victory for justice, for peace and for human dignity'?", opts: ["Because only Black people won", "Because it ended war", "Because it was a universal triumph over racial oppression", "Because South Africa became rich"], ans: 2, exp: "The inauguration represented not just Mandela's or Black South Africans' victory, but a victory for all of humanity over racial discrimination, showing that justice can prevail." },
        { q: "What does Mandela mean by 'resilient and abiding humanity' of the African people?", opts: ["Their physical strength", "Their lasting and enduring compassion and dignity despite suffering", "Their large population", "Their military power"], ans: 1, exp: "Despite decades of brutal oppression, the African people retained their warmth, compassion and humanity — Mandela sees this resilience as their greatest quality." },
        { q: "The phrase 'spectacular, colourful and orderly' is used to describe what?", opts: ["The South African flag", "The inauguration ceremony", "The streets of Pretoria", "The prison where Mandela was held"], ans: 1, exp: "Mandela describes the inauguration ceremony itself as spectacular, colourful and orderly — a powerful contrast to the disorder and violence of the apartheid years." },
        { q: "Which of these best describes Mandela's attitude towards his former jailers?", opts: ["Hatred and revenge", "Indifference", "Forgiveness and reconciliation", "Legal prosecution"], ans: 2, exp: "Mandela chose the path of forgiveness and national reconciliation rather than revenge. This was central to his vision for the new South Africa." },
        { q: "The word 'inauguration' in the context of the chapter means:", opts: ["End of a political term", "A formal ceremony marking the beginning of a presidency", "A military parade", "A prayer ceremony"], ans: 1, exp: "Inauguration refers to the formal ceremony in which a new President is sworn into office. Mandela's inauguration on 10 May 1994 marked the beginning of democratic rule." },
        { q: "What was the ANC and what role did it play in this chapter?", opts: ["A religious group", "The South African police force", "The African National Congress — anti-apartheid political party", "The country's ruling military"], ans: 2, exp: "The African National Congress (ANC) was the political party led by Mandela that fought against apartheid. His election as President represented its historic victory." },
        { q: "Why does Mandela refer to Walter Sisulu, Oliver Tambo and others as 'men of such extraordinary courage'?", opts: ["They were physically strong soldiers", "They sacrificed their lives and freedom fighting apartheid", "They were famous internationally", "They helped Mandela escape prison"], ans: 1, exp: "These leaders of the anti-apartheid movement gave up their personal freedom, comfort and lives to fight for justice. Mandela honoured their sacrifice at this moment of triumph." },
        { q: "What does 'to be free is not merely to cast off one's chains' suggest?", opts: ["Freedom means escaping prison", "Freedom means living in another country", "True freedom means living in a way that respects others' freedom too", "Freedom means having money"], ans: 2, exp: "Mandela defines freedom expansively — it is not just physical liberation but living in a way that enhances others' freedom. Real freedom requires responsibility toward the community." },
        { q: "Mandela says he is 'pained that my people are still not free.' What does this reveal about him?", opts: ["He is angry at White people", "Political freedom is not enough — economic freedom matters too", "He wants to resign", "He is not satisfied with his presidency"], ans: 1, exp: "Even after political freedom, Mandela recognises that poverty, hunger and homelessness still enslave his people. His pain shows his awareness that the struggle for true equality continues." },
        { q: "What emotion does Mandela feel when he sees the military generals salute him?", opts: ["Pride only", "Fear", "Deep emotion because the same army once oppressed his people", "Nothing — it was expected"], ans: 2, exp: "Mandela was deeply moved because it was the same military that had once enforced apartheid. Their salute represented the complete transformation of South Africa from oppression to democracy." },
        { q: "The statement 'South Africa is the most beautiful country in the world' is an example of:", opts: ["Personification", "Hyperbole", "Simile", "Oxymoron"], ans: 1, exp: "It is a hyperbole — an exaggerated statement expressing Mandela's profound love and pride for his homeland at this extraordinary moment in history." },
      ];

      mandelaMedium.forEach((q, i) => {
        resources.push({
          chapterId: mandela._id, type: "mcq", testLevel: "medium",
          title: `Medium MCQ Q${i + 1}`,
          mcqQuestion: q.q, mcqOptions: q.opts,
          mcqCorrectIndex: q.ans, mcqExplanation: q.exp, order: i + 1,
        });
      });

      // ── MCQs — Hard (15) ──────────────────────────────
      const mandelaHard = [
        { q: "ASSERTION: Mandela says the oppressor needs liberation as much as the oppressed.\nREASON: Apartheid deprived White people of their humanity by forcing them to practice cruelty.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and the reason correctly explains the assertion. Mandela argues that by oppressing others, the oppressor imprisons himself in hatred and loses his own humanity — hence both need liberation." },
        { q: "ASSERTION: Mandela describes his childhood as a time when he was free.\nREASON: Black children were given special freedoms by the apartheid government.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 2, exp: "The assertion is true — Mandela felt free as a child running in the fields. But the reason is false — he felt free because he was unaware of the chains of apartheid, not because he was given special freedoms." },
        { q: "Read the extract: 'I was not born with a hunger to be free. I was born free.' What is the implication of this statement?", opts: ["Mandela never wanted freedom", "Freedom is meaningless to him", "Freedom is the natural state — it was taken away, not absent from birth", "Mandela was born into a wealthy family"], ans: 2, exp: "The statement implies that freedom is the human default. Apartheid created an unnatural state of bondage. Mandela's 'hunger' grew from having something natural violently taken from him." },
        { q: "CASE-BASED: Three military generals stood at attention and saluted Mandela. Previously they had run an army that enforced apartheid. What is the deeper significance of this act?\nWhich of the following best captures this significance?", opts: ["It showed military discipline", "It demonstrated that South Africa's military was powerful", "It represented the complete inversion of power — oppressors now serving the formerly oppressed", "It showed that generals liked Mandela personally"], ans: 2, exp: "The generals' salute represented a seismic shift in the power structure of South Africa. The same institution that had enforced the oppression of Black people now pledged loyalty to a Black President — a symbol of transformation." },
        { q: "The phrase 'transitory freedoms' that Mandela mentions as a young man refers to:", opts: ["Short holidays from work", "Legal freedoms given temporarily by the government", "Surface-level personal freedoms that masked the deeper structural oppression", "Freedom to travel abroad"], ans: 2, exp: "As a student Mandela wanted to stay out late, read freely, go where he pleased — these were transitory, personal freedoms. He later realised they were illusions because the fundamental freedom of his people was denied." },
        { q: "EXTRACT-BASED: 'It was this desire for the freedom of my people to live their lives with dignity and self-respect that animated my life.' What does the word 'animated' convey here?", opts: ["Made him move physically", "Inspired, drove and gave purpose to his entire life", "Made him happy", "Gave him legal rights"], ans: 1, exp: "Animated means 'gave life to' or 'drove'. The desire for his people's dignity was the force that gave meaning, direction and energy to everything Mandela did throughout his life." },
        { q: "Why does Mandela choose NOT to list specific heroes of the liberation struggle by name in his speech?", opts: ["He forgot their names", "He was pressed for time", "To honour all equally and avoid suggesting some sacrificed more than others", "The audience would not know them"], ans: 2, exp: "By not naming individuals, Mandela honours the collective sacrifice of thousands of unnamed heroes equally. This reflects his philosophy of collective struggle rather than individual heroism." },
        { q: "ASSERTION: The inauguration represented both an ending and a beginning.\nREASON: It ended apartheid and simultaneously began the era of democratic multiracial governance.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both statements are accurate and the reason perfectly explains why the inauguration was both an ending and a beginning — apartheid ended and democracy began simultaneously." },
        { q: "The 'long walk to freedom' as a metaphor suggests all of the following EXCEPT:", opts: ["Freedom requires sustained effort over time", "The journey to freedom involves multiple generations", "Freedom is achieved suddenly through a single act", "The path to freedom involves sacrifice and perseverance"], ans: 2, exp: "The metaphor of a 'walk' explicitly rejects the idea of sudden achievement. It implies a gradual, painful, sustained journey — exactly the opposite of a single dramatic act." },
        { q: "CASE-BASED: Mandela says 'I am not truly free if I am taking away someone else's freedom.' A student argues this contradicts the idea of individual freedom. How would Mandela respond?", opts: ["Individual freedom is absolute and unlimited", "True freedom is interconnected — your freedom cannot exist at the expense of another's", "Individual freedom should be protected even if others suffer", "Freedom is only for those who earn it"], ans: 1, exp: "Mandela's philosophy holds that freedom is relational and communal. If you achieve your freedom by oppressing another, you have not achieved real freedom — you have merely become a different kind of prisoner." },
        { q: "What does Mandela's statement about 'the policy of apartheid created a profound and lasting wound' suggest about the nature of historical injustice?", opts: ["Injustice can be quickly forgotten", "Physical wounds heal quickly but historical injustice has lasting psychological and social consequences", "South Africa recovered immediately", "The wound was only economic"], ans: 1, exp: "Mandela acknowledges that apartheid's damage extends far beyond its legal existence — it wounded the psychology, culture and social fabric of South Africa in ways that would take generations to heal." },
        { q: "EXTRACT: 'A man who takes away another man's freedom is a prisoner of hatred.' This is an example of:", opts: ["Simile", "Alliteration", "Paradox/Irony", "Personification"], ans: 2, exp: "It is paradoxical and ironic — the person who appears to have power (the oppressor) is actually imprisoned by his own hatred and prejudice. The apparent wielder of freedom is actually less free than his victim." },
        { q: "When Mandela says 'the chains on any one of my people were the chains on all of them', he is expressing:", opts: ["The fact that all Black people were literally chained", "Collective solidarity — that the oppression of one is the oppression of all", "That the chains were shared property", "That all prisoners were equal"], ans: 1, exp: "This expresses the philosophy of collective identity and solidarity. The suffering of any individual Black person was a suffering shared by the entire community — their fates were inextricably linked." },
        { q: "ASSERTION: Mandela's speech was as much about the future as the past.\nREASON: He spoke extensively about historical grievances against White South Africans.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 2, exp: "The assertion is true — Mandela focused on building the future through reconciliation. But the reason is false — he deliberately did NOT focus on historical grievances, choosing forgiveness over blame." },
        { q: "What is the most significant reason the chapter is included in a Class 10 CBSE textbook?", opts: ["To teach about South African geography", "To demonstrate that one person's sacrifice can change a nation and inspire global values of justice", "To teach about military ceremonies", "To show that politics is important"], ans: 1, exp: "The chapter exemplifies universal values of freedom, dignity, sacrifice and reconciliation. Mandela's life demonstrates that courage and perseverance in the face of injustice can transform entire societies — a lesson relevant to all students." },
      ];

      mandelaHard.forEach((q, i) => {
        resources.push({
          chapterId: mandela._id, type: "mcq", testLevel: "hard",
          title: `Hard MCQ Q${i + 1}`,
          mcqQuestion: q.q, mcqOptions: q.opts,
          mcqCorrectIndex: q.ans, mcqExplanation: q.exp, order: i + 1,
        });
      });
    }

    // ═════════════════════════════════════════════════════
    // CHAPTER 2: TWO STORIES ABOUT FLYING
    // Part I: His First Flight | Part II: The Black Aeroplane
    // ═════════════════════════════════════════════════════
    const flying = chapterMap["two-stories-about-flying"];
    if (flying) {

      // ── PYQs (15) ──────────────────────────────────────
      const flyingPYQs = [
        { question: "Why was the young seagull afraid to fly?", answer: "The young seagull was afraid to fly because he lacked confidence and was scared of the vast expanse of the sea below. He feared that his wings would not support him. He watched his brothers and sisters fly away but could not bring himself to take the leap. His fear was psychological rather than physical — his wings were fully developed but his mind held him back.", year: 2023, marks: 3, difficulty: "medium" },
        { question: "How did the young seagull's mother finally get him to fly?", answer: "The young seagull's mother used hunger to force him into flight. She flew across to a plateau opposite him and started tearing at a piece of fish. When the young seagull, maddened by hunger, dived at the fish, his wings automatically spread and he found himself flying. He had overcome his fear through the compulsion of survival instinct.", year: 2022, marks: 3, difficulty: "medium" },
        { question: "Describe the pilot's experience when he flew into the storm clouds in 'The Black Aeroplane'.", answer: "When the pilot entered the storm clouds, he lost all visibility. His compass, radio and other instruments stopped working — he could not contact Paris or see where he was going. He was flying blind in a completely dark and frightening storm with less than an hour of fuel left. He was terrified and felt utterly helpless.", year: 2023, marks: 3, difficulty: "medium" },
        { question: "Who was the mysterious pilot in 'The Black Aeroplane' and why is it a mystery?", answer: "The identity of the mysterious pilot is never revealed. He appeared in a black aeroplane without lights to guide the stranded pilot through the storm. When the pilot landed safely and asked the control woman about the black plane, she said there was no other plane. This mystery makes the story haunting — the pilot may have been an angel, a hallucination born of desperation, or a symbol of the mysterious forces that help people in need.", year: 2022, marks: 5, difficulty: "hard" },
        { question: "What lesson does 'His First Flight' teach about fear and courage?", answer: "The story teaches that fear is mostly in the mind and that the only way to conquer it is through action. The young seagull's fear was not based on any physical inability — he was perfectly capable of flying. Only by being forced to act did he discover his own capability. This mirrors the human experience: courage is not the absence of fear but acting despite it.", year: 2021, marks: 5, difficulty: "hard" },
        { question: "What was the pilot's dream at the beginning of 'The Black Aeroplane'?", answer: "The pilot dreamed of having a good breakfast with his family. He was flying from Paris to England and was looking forward to a peaceful morning meal — eggs and bacon — with his family. This dream of a simple, domestic happiness makes what follows all the more dramatic and frightening.", year: 2020, marks: 2, difficulty: "easy" },
        { question: "How did the young seagull react when his family encouraged him to fly?", answer: "Despite encouragement and even scolding from his family, the young seagull could not bring himself to fly. He would walk to the edge of the ledge, look at the great expanse below and step back in fear. His parents called him a coward and even threatened to let him starve. His brothers and sisters mocked him. Yet he could not overcome his paralysing fear.", year: 2021, marks: 3, difficulty: "medium" },
        { question: "What is the significance of the young seagull's first meal after his flight?", answer: "After flying and landing on the green sea surface, the young seagull dived for a piece of white belly of a herring. This first meal symbolised his complete transformation. He had conquered his fear, completed his first flight, and was now functioning as a true seagull. The meal represents the reward for courage and the beginning of his independent life.", year: 2020, marks: 3, difficulty: "medium" },
        { question: "How does the pilot feel when he sees the strange black aeroplane?", answer: "The pilot feels immense relief and hope when he sees the strange black aeroplane. He had been flying blind in a terrifying storm with nearly no fuel, desperate and afraid. When the black plane appeared and flew ahead of him, he felt rescued. He followed it faithfully, completely trusting this mysterious guide through the darkness.", year: 2019, marks: 2, difficulty: "easy" },
        { question: "Compare the two pilots — the young seagull and the narrator of 'The Black Aeroplane'. What do they have in common?", answer: "Both face a moment of crisis that requires courage to overcome. The young seagull faces the fear of his first flight. The pilot faces a life-threatening storm. Both are helpless in the face of their challenge. Both are ultimately saved — the seagull by hunger and instinct, the pilot by the mysterious black aeroplane. Both stories show that apparent impossibilities can be overcome.", year: 2022, marks: 5, difficulty: "hard" },
        { question: "Why did the pilot decide to enter the storm clouds instead of turning back?", answer: "The pilot saw the storm clouds rising ahead but decided to enter them because he was eager to get home to his family for breakfast. He wanted to avoid delay and believed he could handle the situation. This reflects a human tendency to underestimate danger when motivated by strong desire — in this case, the warmth and comfort of home.", year: 2023, marks: 3, difficulty: "medium" },
        { question: "What are the two stories in 'Two Stories About Flying' and what common theme do they share?", answer: "The two stories are 'His First Flight' by Liam O'Flaherty, about a young seagull's first flight, and 'The Black Aeroplane' by Frederick Forsyth, about a pilot who is guided through a storm by a mysterious plane. Their common theme is courage in the face of fear and the role of trust and faith in overcoming seemingly impossible situations.", year: 2021, marks: 3, difficulty: "medium" },
        { question: "Describe the moment the young seagull first feels the joy of flight.", answer: "The young seagull initially screamed in terror as he fell downward. But then a marvellous thing happened — his wings spread outwards and he found himself soaring upward. The wind rushed under his stomach, lifting him. He was no longer afraid. He wheeled and soared and screamed joyfully into the wind, discovering a freedom he had never imagined. The terror transformed instantly into exhilaration.", year: 2020, marks: 3, difficulty: "medium" },
        { question: "What details show that the young seagull was lonely and isolated at the start?", answer: "The young seagull was alone on his ledge while his brothers and sisters had flown away with his parents. His family left him behind each day, going to a great plateau to teach the young ones to fly. He watched them from a distance, crying plaintively and unable to join them. His only company was his ledge and his own fear.", year: 2019, marks: 2, difficulty: "easy" },
        { question: "The ending of 'The Black Aeroplane' is deliberately ambiguous. What are two possible interpretations?", answer: "First interpretation: The mysterious pilot was a supernatural being or angel who appeared to help the desperate pilot in his moment of need. Second interpretation: The entire episode was a hallucination created by the pilot's desperate mind — his survival instinct manifested as a guiding presence. Both interpretations are valid, which is what makes the story memorable. The ambiguity invites the reader to question the nature of help, faith and survival.", year: 2023, marks: 5, difficulty: "hard" },
      ];

      flyingPYQs.forEach((q, i) => {
        resources.push({
          chapterId: flying._id, type: "pyq", title: `PYQ ${q.year} — Q${i + 1}`,
          question: q.question, answer: q.answer, year: q.year,
          marks: q.marks, difficulty: q.difficulty, order: i + 1,
        });
      });

      // ── MCQs — Easy (15) ──────────────────────────────
      const flyingEasy = [
        { q: "Why did the young seagull not fly with the rest of his family?", opts: ["His wings were injured", "He was asleep", "He was afraid to fly", "He refused to listen"], ans: 2, exp: "The young seagull's wings were perfectly fine but he was too terrified of the vast sea below to take the leap and fly." },
        { q: "Who wrote 'His First Flight'?", opts: ["Frederick Forsyth", "Liam O'Flaherty", "R.K. Narayan", "Ruskin Bond"], ans: 1, exp: "His First Flight was written by Irish author Liam O'Flaherty." },
        { q: "Who wrote 'The Black Aeroplane'?", opts: ["Liam O'Flaherty", "Ruskin Bond", "Frederick Forsyth", "Guy de Maupassant"], ans: 2, exp: "The Black Aeroplane was written by Frederick Forsyth, famous for thriller writing." },
        { q: "What food did the young seagull's mother use to tempt him to fly?", opts: ["A piece of bread", "A herring fish", "A piece of fish she was tearing at", "Crabs"], ans: 2, exp: "His mother tore at a piece of fish on the opposite ledge, using it as bait. The sight of food and his hunger overcame his fear." },
        { q: "What was the pilot's destination in 'The Black Aeroplane'?", opts: ["Paris", "England", "Germany", "Spain"], ans: 1, exp: "The pilot was flying from Paris to England, looking forward to breakfast with his family." },
        { q: "What happened to the pilot's instruments inside the storm?", opts: ["They worked perfectly", "They overheated", "They stopped working", "They showed wrong readings"], ans: 2, exp: "Inside the dark storm clouds, the pilot's compass, radio and other instruments all stopped working, leaving him completely blind." },
        { q: "What did the young seagull land on after his first flight?", opts: ["A rock", "His family's plateau", "The surface of the sea", "A fishing boat"], ans: 2, exp: "After his first flight, the young seagull landed on the green surface of the sea, which he had always feared." },
        { q: "How much fuel did the pilot have left when he entered the storm?", opts: ["Less than 30 minutes", "Less than one hour", "Two hours", "Half a tank"], ans: 1, exp: "The pilot had less than one hour of fuel remaining when he was trapped in the storm — making escape a matter of life and death." },
        { q: "What was the colour of the aeroplane that helped the pilot?", opts: ["White", "Grey", "Red", "Black"], ans: 3, exp: "The mysterious aeroplane was black with no lights — which is why it is called 'The Black Aeroplane'." },
        { q: "How did the young seagull's family react to his refusal to fly?", opts: ["They were patient and kind", "They called him a coward and threatened to let him starve", "They ignored him", "They carried him"], ans: 1, exp: "The family called him a coward and left him alone, threatening that he would have to starve on his ledge if he did not fly." },
        { q: "What did the pilot see when he came out of the clouds after following the black aeroplane?", opts: ["The ocean", "Another storm", "Two rows of lights — a runway", "A city"], ans: 2, exp: "When the clouds disappeared, the pilot saw two long rows of lights indicating a runway, and was able to land safely." },
        { q: "What mystery does the pilot ask the woman in the control room?", opts: ["Where the storm came from", "Who the mysterious black aeroplane pilot was", "Why his instruments stopped working", "Where his fuel had gone"], ans: 1, exp: "The pilot asked about the other black aeroplane and its pilot who had helped him. The woman said there was no such plane in the sky that night." },
        { q: "From where was the pilot flying in 'The Black Aeroplane'?", opts: ["London to Berlin", "Paris to England", "Spain to France", "England to India"], ans: 1, exp: "The pilot was flying from Paris to England in the early morning, dreaming of breakfast with his family." },
        { q: "What does the young seagull do after landing on the sea for the first time?", opts: ["Immediately flies again", "Sinks below the surface", "Dives for fish", "Calls for his parents"], ans: 2, exp: "After landing, the young seagull immediately dived for a piece of white belly of a herring — his first meal as an independent seagull." },
        { q: "What time of day is it at the start of 'The Black Aeroplane'?", opts: ["Night", "Noon", "Early morning", "Sunset"], ans: 2, exp: "The story begins in the early morning hours when the pilot was flying over France in the light of the stars, dreaming of breakfast." },
      ];

      flyingEasy.forEach((q, i) => {
        resources.push({
          chapterId: flying._id, type: "mcq", testLevel: "easy",
          title: `Easy MCQ Q${i + 1}`,
          mcqQuestion: q.q, mcqOptions: q.opts,
          mcqCorrectIndex: q.ans, mcqExplanation: q.exp, order: i + 1,
        });
      });

      // ── MCQs — Medium (15) ─────────────────────────────
      const flyingMedium = [
        { q: "What is the central theme of 'His First Flight'?", opts: ["The beauty of nature", "Overcoming fear and discovering inner strength", "The cruelty of parents", "The life cycle of seagulls"], ans: 1, exp: "The story's central theme is that fear lives in the mind. The seagull's physical ability was never in doubt — only his mental barrier prevented him. Once forced to act, he discovered capabilities he never knew he had." },
        { q: "Why is the young seagull's mother's strategy described as 'cruel to be kind'?", opts: ["She pushed him off the ledge", "She withheld food to force him to fly — apparent cruelty that led to his liberation", "She mocked him publicly", "She abandoned him permanently"], ans: 1, exp: "The mother deliberately withheld food from her hungry child. This apparent cruelty forced him to dive at the fish, which triggered his first flight. The short-term pain led to lifelong freedom." },
        { q: "What does the vast ocean represent to the young seagull at the beginning?", opts: ["Home", "Food", "An overwhelming, paralysing fear of the unknown", "Adventure and excitement"], ans: 2, exp: "The ocean represents everything the seagull fears — the vast, unknown, seemingly bottomless space into which he must leap. It symbolises the terror of stepping into the unfamiliar." },
        { q: "How does the story 'The Black Aeroplane' create suspense?", opts: ["By describing the storm in detail", "By withholding the identity of the black aeroplane pilot and leaving an unexplained mystery", "By using a lot of dialogue", "By describing the pilot's fear"], ans: 1, exp: "The story's suspense comes from the unexplained mystery at the end. Who was the black aeroplane? The unanswered question haunts the reader long after the story ends." },
        { q: "The phrase 'old Dakota' refers to:", opts: ["The pilot's name", "A passenger on the plane", "The type of aircraft the pilot was flying", "A city in America"], ans: 2, exp: "The Dakota (Douglas DC-3) was the old aircraft the pilot was flying from Paris to England. Its age and the storm make the situation more precarious." },
        { q: "What does the pilot's behaviour of entering the storm clouds despite the risk reveal about human nature?", opts: ["Humans are always reckless", "The desire for home and comfort can override rational risk assessment", "Pilots are always overconfident", "Modern aircraft are very safe"], ans: 1, exp: "The pilot entered dangerous clouds because he was eager for breakfast with his family. This reveals how powerfully emotional desires (home, family, comfort) can lead humans to underestimate real dangers." },
        { q: "The young seagull's transformation can best be described as:", opts: ["Physical growth of wings", "Moving from self-doubt and fear to confidence and independence", "Learning to fish from his parents", "Learning to communicate with his family"], ans: 1, exp: "The seagull's journey is entirely psychological. He was always physically capable. The transformation is from paralysing self-doubt to joyful self-reliance — from dependency to independence." },
        { q: "What does the mysterious helper in 'The Black Aeroplane' symbolise?", opts: ["Modern technology", "A government rescue service", "The unknown forces of fate, faith or the subconscious that help in moments of crisis", "Another professional pilot"], ans: 2, exp: "The black aeroplane symbolises the mysterious help that appears in one's darkest moment — whether interpreted as divine intervention, a subconscious survival response, or pure fate." },
        { q: "Why is the young seagull described as 'mad with hunger' before he flies?", opts: ["He was ill", "His family had been feeding him too little for weeks", "He had not eaten since the previous night and watched his family eat", "He was angry at his mother"], ans: 2, exp: "The seagull had been watching his family enjoy meals while he stayed marooned on his ledge. The combination of prolonged hunger and the sight of his mother tearing at fish drove him to desperate action." },
        { q: "What is the irony in 'His First Flight' regarding the seagull's fear?", opts: ["He feared water but loved it later", "He feared flying even though he was physically capable of it — the barrier was entirely mental", "He was afraid of his parents", "He feared hunger but later loved eating"], ans: 1, exp: "The profound irony is that the seagull was always capable of flying — he had strong wings. His barrier was entirely psychological. The thing he feared most was actually the thing he was born to do." },
        { q: "Both stories can be read as allegories. What human experience do they allegorise?", opts: ["The importance of family", "The fear of failure that prevents us from attempting things we are perfectly capable of achieving", "The dangers of air travel", "The importance of technology"], ans: 1, exp: "Both stories use flight as a metaphor for any challenging endeavour in human life. The seagull's fear of flying = a student's fear of exams, a person's fear of change. Both stories argue: the fear is worse than the reality." },
        { q: "What literary technique is used when the young seagull is described as 'screaming' as he dived?", opts: ["Metaphor", "Irony", "Onomatopoeia and pathetic fallacy", "Alliteration"], ans: 2, exp: "The seagull's screaming reflects his internal emotional state (terror), which is projected onto his vocal response. This is pathetic fallacy. The word 'scream' itself is onomatopoeic." },
        { q: "What does the pilot's question at the end — 'Who was flying the other plane?' — suggest?", opts: ["He wants to report the other pilot", "He is confused about directions", "He needs to understand an experience that defies rational explanation", "He wants to thank the pilot"], ans: 2, exp: "The question reveals that the pilot cannot explain what happened rationally. The story ends with this unanswerable question, inviting the reader to reflect on the nature of unexplained help and survival." },
        { q: "The contrast between 'light' and 'darkness' in 'The Black Aeroplane' represents:", opts: ["Day and night weather conditions", "Safety vs danger, hope vs despair", "The pilot's good and bad flying days", "Old and new aeroplanes"], ans: 1, exp: "Light (stars, open sky) represents safety, clarity and hope. Darkness (the black clouds, the storm) represents danger and despair. The black aeroplane itself is paradoxically dark but brings light (salvation) to the pilot." },
        { q: "Which value is MOST emphasised in 'His First Flight'?", opts: ["Obedience to parents", "Academic learning", "Courage to overcome self-imposed limitations", "Physical fitness"], ans: 2, exp: "The story's primary message is about courage — specifically the courage to act despite fear. The seagull's limitation was entirely self-imposed, and only action (however forced) could break it." },
      ];

      flyingMedium.forEach((q, i) => {
        resources.push({
          chapterId: flying._id, type: "mcq", testLevel: "medium",
          title: `Medium MCQ Q${i + 1}`,
          mcqQuestion: q.q, mcqOptions: q.opts,
          mcqCorrectIndex: q.ans, mcqExplanation: q.exp, order: i + 1,
        });
      });

      // ── MCQs — Hard (15) ──────────────────────────────
      const flyingHard = [
        { q: "ASSERTION: The young seagull's fear of flying was irrational.\nREASON: His wings were fully grown and he had watched his siblings fly successfully.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "The assertion is true — his fear had no physical basis. The reason correctly explains this — his wings were developed and he had evidence (his siblings) that flying was possible. His fear was entirely psychological." },
        { q: "ASSERTION: The ending of 'The Black Aeroplane' is the most important part of the story.\nREASON: It resolves all the questions raised during the story.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 2, exp: "The assertion is true — the ending is critical because it creates the haunting mystery. But the reason is false — the ending does NOT resolve the questions. It creates new ones. That unresolved mystery is precisely why the ending matters." },
        { q: "EXTRACT: 'And in the excitement of finding himself alone, cut off from the earth below and the sky above, lost in the clouds.' What emotion does 'excitement' here seem paradoxical to?", opts: ["Joy", "The surrounding terror and isolation described in the same sentence", "Anger", "Relief"], ans: 1, exp: "The word 'excitement' stands in paradoxical contrast to 'cut off', 'alone' and 'lost' in the same sentence — creating a complex emotional state where fear and the thrill of the unknown coexist." },
        { q: "CASE-BASED: A student says: 'The seagull's mother was wrong to withhold food — that is cruelty, not parenting.' Another says: 'Sometimes the kindest thing a parent can do is force a child to be independent.' Which view does the story support, and why?", opts: ["The first view — the story condemns the mother", "The second view — the story shows that the mother's tough love led to the seagull's liberation and joy", "Neither — the story has no message about parenting", "Both views equally"], ans: 1, exp: "The story clearly supports the second view. The mother's strategy, though apparently cruel, was the only thing that worked. The result — the seagull's joyful flight and first successful meal — validates her approach entirely." },
        { q: "The phrase 'maddened by hunger' to describe the seagull's state is an example of:", opts: ["Simile", "Hyperbole used to show extreme hunger overriding rational fear", "Metaphor comparing seagull to a madman", "Personification"], ans: 1, exp: "It is a hyperbole — the seagull was not literally mad. The extreme language emphasises that his hunger had grown so powerful it overwhelmed the fear that had paralysed him for so long." },
        { q: "EXTRACT-BASED: 'The strange aeroplane was still there, and I was safe.' What does the repeated emphasis on the black aeroplane's presence suggest?", opts: ["The pilot is checking his instruments", "The black aeroplane's presence is the only source of safety and reassurance in an utterly hostile environment", "The pilot is reporting air traffic", "The pilot is suspicious of the other plane"], ans: 1, exp: "In the midst of complete instrument failure, no radio contact, near-zero visibility and dwindling fuel, the black aeroplane is literally the only thing keeping the pilot alive. Its presence = survival itself." },
        { q: "What is the narrative technique used in 'The Black Aeroplane'?", opts: ["Third-person omniscient", "Second-person narration", "First-person retrospective narration", "Third-person limited"], ans: 2, exp: "The story is told in first person by the pilot looking back at the experience — retrospective narration. This technique creates immediacy and personal investment while also suggesting the mystery has never been resolved even after reflection." },
        { q: "ASSERTION: Both stories suggest that fear is conquered not by thinking but by doing.\nREASON: Both protagonists overcome their challenges through action, not contemplation.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and the reason perfectly explains the assertion. The seagull didn't think his way out — he dived. The pilot didn't deliberate — he followed the black aeroplane. Action, not analysis, saved both." },
        { q: "The contrast between the seagull 'screaming' in terror and later 'screaming' joyfully at the wind represents:", opts: ["The seagull's mood changes randomly", "The transformation of the same action (screaming) from an expression of fear to one of freedom — showing complete emotional reversal", "The seagull learning a new language", "The seagull becoming aggressive"], ans: 1, exp: "The same physical action — screaming — carries completely opposite emotional meanings before and after flight. This structural parallelism beautifully illustrates the completeness of the seagull's transformation." },
        { q: "Why does the author of 'The Black Aeroplane' choose NOT to explain who the mysterious pilot was?", opts: ["He forgot to include it", "The publisher cut the explanation", "The ambiguity forces the reader to reflect on their own beliefs about fate, help and the unknown", "The story is for children who don't need explanations"], ans: 2, exp: "The deliberate ambiguity is a literary choice. By leaving the question open, Forsyth invites each reader to fill the gap with their own belief system — religious readers see an angel, rationalists see a hallucination, others see fate." },
        { q: "CASE-BASED: The seagull's family calls him a 'coward'. Is this label fair? What does the story suggest about the way we judge people who struggle with fear?", opts: ["Yes — he was genuinely a coward and deserved the label", "No — the story suggests that what looks like cowardice may be a temporary block that courage and the right trigger can overcome", "Yes — he should have tried harder from the start", "No — the family should have carried him"], ans: 1, exp: "The story rehabilitates the concept of 'cowardice'. The seagull who was labelled a coward became a magnificent flier. The story suggests we should not judge those who struggle with fear harshly — with the right support and trigger, they may surprise everyone." },
        { q: "What does the pilot's dream of 'bacon and eggs' at the start of 'The Black Aeroplane' contribute to the story?", opts: ["It shows he was hungry", "It humanises the pilot and creates dramatic irony — the mundane dream contrasts sharply with the life-threatening situation that follows", "It shows he was British", "It establishes the time of day"], ans: 1, exp: "The specificity of the dream (bacon and eggs, family) makes the pilot relatable and human. When he immediately faces a deadly storm, the contrast between the cosy dream and the terrifying reality is maximally dramatic." },
        { q: "EXTRACT: 'I looked at the compass. It was turning round and round and was not giving me any reading.' What does the malfunctioning compass represent thematically?", opts: ["Old equipment", "The complete loss of direction, control and rational guidance — the pilot must now rely on faith alone", "Bad weather affecting electronics", "The pilot's poor navigation skills"], ans: 1, exp: "Thematically, the compass represents rational navigation, control and self-reliance. When it fails, the pilot is stripped of everything he relies on — he must surrender control and trust an unknown other (the black aeroplane). The broken compass = the necessity of faith." },
        { q: "ASSERTION: 'His First Flight' is a coming-of-age story.\nREASON: The seagull moves from fearful dependence on his family to joyful independent action.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both true and correctly connected. The seagull's flight is a rite of passage — the moment a dependent young creature becomes a fully independent adult. This is the essence of coming-of-age stories." },
        { q: "Which of the following best explains why both stories are placed together under 'Two Stories About Flying'?", opts: ["Both stories involve aeroplanes", "Both stories use flight literally and metaphorically to explore the human experience of fear, trust and courage", "Both are by the same author", "Both stories are set in England"], ans: 1, exp: "The stories are thematically paired. Both use the act of flying — one literal (seagull), one technological (aeroplane) — to explore universal human themes: fear of the unknown, the leap of faith required to act, and the liberation that follows." },
      ];

      flyingHard.forEach((q, i) => {
        resources.push({
          chapterId: flying._id, type: "mcq", testLevel: "hard",
          title: `Hard MCQ Q${i + 1}`,
          mcqQuestion: q.q, mcqOptions: q.opts,
          mcqCorrectIndex: q.ans, mcqExplanation: q.exp, order: i + 1,
        });
      });
    }

    // ═════════════════════════════════════════════════════
    // CHAPTER 3: FROM THE DIARY OF ANNE FRANK
    // ═════════════════════════════════════════════════════
    const anne = chapterMap["from-the-diary-of-anne-frank"];
    if (anne) {

      // ── PYQs (15) ──────────────────────────────────────
      const annePYQs = [
        { question: "Why did Anne Frank begin writing a diary?", answer: "Anne Frank began writing a diary because she felt she had no true friend to confide in. Despite having acquaintances and a loving family, she felt she could not have a deep heart-to-heart conversation with anyone. She wanted a friend she could truly trust and confide everything to, and so she turned to her diary, addressing it as 'Kitty', making it that trusted companion.", year: 2023, marks: 3, difficulty: "medium" },
        { question: "What is Anne's opinion of herself as a writer? What does she hope to achieve?", answer: "Anne Frank believed she might become a writer or journalist someday. She wanted to go on living even after her death, and she believed she could achieve this through her writing. She hoped that writing a beautiful book or having her diary published one day would allow her to live on through her words. She felt deeply that her diary was the best way to preserve her thoughts and feelings for the future.", year: 2022, marks: 5, difficulty: "hard" },
        { question: "Why was Anne's relationship with her class teacher, Mr Keesing, difficult at first?", answer: "Mr Keesing was the maths teacher who found Anne too talkative in class. He punished her by making her write essays on 'A Chatterbox' to teach her to be quiet. Anne, rather than being silenced, wrote clever, argumentative essays defending her right to talk, using arguments she even admitted she could not prove. Mr Keesing eventually gave up trying to silence her.", year: 2023, marks: 3, difficulty: "medium" },
        { question: "Describe the essay Anne wrote to counter Mr Keesing's punishment.", answer: "Mr Keesing assigned Anne to write an essay titled 'A Chatterbox'. Anne wrote an entertaining and clever essay arguing that talking was a student's trait and that she would do her best to keep it under control — while admitting she doubted she would succeed. Her second essay was titled 'An Incorrigible Chatterbox'. Her third essay was written in verse, arguing that a mother duck and father swan had a talkative daughter, directly defending her nature through wit.", year: 2021, marks: 5, difficulty: "hard" },
        { question: "What does 'Kitty' refer to in the context of the chapter?", answer: "Kitty is the name Anne Frank gave to her diary. Since Anne wanted a true friend she could trust completely, she treated her diary as that imaginary friend and named her Kitty. She wrote all her diary entries as letters addressed to Kitty, making the diary feel like a personal, intimate conversation rather than a formal journal.", year: 2020, marks: 2, difficulty: "easy" },
        { question: "Why does Anne say that paper is more patient than people?", answer: "Anne says 'paper is more patient than people' because paper does not judge, does not talk back, does not tire of listening and does not share your secrets. Unlike people who may be critical, busy or unable to understand, paper simply receives whatever you write without reaction. For Anne, hiding in the Secret Annexe with limited human connection, the diary became the safest and most patient listener available.", year: 2022, marks: 3, difficulty: "medium" },
        { question: "What is the historical context of this chapter? Why was Anne in hiding?", answer: "Anne Frank was a Jewish girl living in Amsterdam during World War II under Nazi occupation. The Nazis were systematically persecuting and deporting Jews to concentration camps. In 1942, Anne and her family went into hiding in a concealed apartment in Amsterdam — the Secret Annexe — to escape deportation. Anne kept her diary during this period of hiding, which lasted until 1944 when the family was discovered and arrested.", year: 2021, marks: 5, difficulty: "hard" },
        { question: "How did Mr Keesing finally respond to Anne's witty verse essay?", answer: "When Anne wrote her third essay in verse — using the story of a mother duck, a father swan and their talkative baby cygnet — Mr Keesing read it and laughed. He stopped assigning her punishment essays and actually allowed her to talk in class from that point on. Anne had won the battle of wits, and Mr Keesing, with good humour, admitted defeat.", year: 2020, marks: 3, difficulty: "medium" },
        { question: "What subjects did Anne enjoy at school? What does this reveal about her character?", answer: "Anne enjoyed writing essays, history and telling stories. She was clearly creative, intellectually curious and expressive. Her love of writing and history — combined with her wit and argumentative spirit — reveals a deeply thoughtful, articulate young person. Her character is one of intelligence and resilience, choosing expression and humour rather than surrender even in difficult situations.", year: 2019, marks: 3, difficulty: "medium" },
        { question: "Why is 'From the Diary of Anne Frank' considered a document of great historical and literary importance?", answer: "Anne Frank's diary is one of the most widely read accounts of the Holocaust and World War II from the perspective of a victim. Written by a thirteen-year-old Jewish girl hiding from the Nazis, it gives a personal, intimate and deeply human account of the terror, isolation and remarkable resilience of Jewish families during the war. Its literary quality — honest, witty and deeply moving — makes it both a historical document and a masterpiece of personal writing.", year: 2023, marks: 5, difficulty: "hard" },
        { question: "What does Anne's diary reveal about her inner life and emotional state?", answer: "Anne's diary reveals a rich, complex inner life. She felt lonely despite being surrounded by family, questioning whether she had any truly close relationships. She was thoughtful, self-aware, funny and ambitious. She processed her fear, isolation and uncertainty through writing. The diary shows that even in the most terrifying circumstances, the human mind and heart continue to seek connection, meaning and expression.", year: 2022, marks: 5, difficulty: "hard" },
        { question: "How did Anne's relationship with her father differ from her relationship with her mother?", answer: "Anne was much closer to her father, Otto Frank, than to her mother. She felt she could talk to her father freely and that he understood her. With her mother, she felt there was a distance — she did not feel fully understood. This emotional distance with her mother and closeness with her father is a recurrent theme in the diary and reflects the universal complexity of parent-child relationships during adolescence.", year: 2021, marks: 3, difficulty: "medium" },
        { question: "What does the excerpt from Anne's diary tell us about the school life of children in Amsterdam during the 1940s?", answer: "The excerpt suggests that despite being a time of war and persecution, children in Amsterdam continued to attend school and experience normal school life — including lessons, teachers who punished talkative students, homework and friendships. For Anne, school represented a degree of normalcy amidst the growing terror of Nazi occupation. The school setting also shows that Jewish children at this point still had some access to education.", year: 2020, marks: 3, difficulty: "medium" },
        { question: "Anne writes that she wants to be useful to the world. How does her diary fulfil this wish?", answer: "Anne's diary has been read by tens of millions of people worldwide and translated into over 70 languages. It has become one of the most powerful testimonies of the Holocaust, educating generations about the human cost of hatred and discrimination. Her wish to 'go on living after her death' through writing was completely fulfilled — her diary has kept her name and story alive far longer than most people achieve in multiple lifetimes.", year: 2019, marks: 5, difficulty: "hard" },
        { question: "What does the way Anne treats her diary (naming it 'Kitty', writing letters to it) tell us about her psychological state?", answer: "Anne's treatment of her diary as a named friend reveals deep loneliness and a need for intimate connection that she could not find around her. By naming it Kitty and writing letters, she created a safe emotional space where she could be completely honest without fear of judgment. It shows remarkable psychological resourcefulness — rather than collapsing into despair, she constructed an inner world of companionship and meaning through writing.", year: 2023, marks: 3, difficulty: "medium" },
      ];

      annePYQs.forEach((q, i) => {
        console.log("-------------------------------");
        resources.push({
          chapterId: anne._id, type: "pyq", title: `PYQ ${q.year} — Q${i + 1}`,
          question: q.question, answer: q.answer, year: q.year,
          marks: q.marks, difficulty: q.difficulty, order: i + 1,
        });
      });

      // ── MCQs — Easy (15) ──────────────────────────────
      const anneEasy = [
        { q: "What did Anne Frank name her diary?", opts: ["Diary", "Kitty", "Anne", "Secret"], ans: 1, exp: "Anne named her diary 'Kitty', treating it as her imaginary best friend to whom she could confide everything." },
        { q: "Why did Anne want to keep a diary?", opts: ["School assignment", "She wanted to become famous", "She had no true friend to confide in", "Her teacher told her to"], ans: 2, exp: "Anne felt lonely despite having family and acquaintances. She wanted a true friend she could confide in, and the diary became that friend." },
        { q: "Which subject did Mr Keesing teach?", opts: ["English", "History", "Science", "Maths"], ans: 3, exp: "Mr Keesing was Anne's maths teacher who punished her for talking too much in class." },
        { q: "What punishment did Mr Keesing give Anne?", opts: ["Extra maths homework", "Writing essays about being talkative", "Standing outside class", "No break time"], ans: 1, exp: "Mr Keesing punished Anne by making her write essays on the topic of 'A Chatterbox' to teach her to be quiet." },
        { q: "Anne Frank was of which nationality and religion?", opts: ["German and Christian", "Dutch and Jewish", "French and Jewish", "Polish and Jewish"], ans: 1, exp: "Anne Frank was a German-born Jewish girl who was living in Amsterdam (Netherlands) at the time of writing the diary." },
        { q: "What does Anne mean by 'paper is more patient than people'?", opts: ["Paper doesn't get tired", "Paper lasts longer than people", "A diary listens without judgment unlike people", "Paper is cheap"], ans: 2, exp: "Anne means that unlike people who may judge, tire or misunderstand, a diary simply receives everything without reaction — making it the safest confidant." },
        { q: "How old was Anne Frank when she started writing the diary?", opts: ["10", "11", "13", "15"], ans: 2, exp: "Anne Frank received her diary as a birthday gift on 12 June 1942, when she turned 13 years old." },
        { q: "What was Anne's ambition for the future?", opts: ["To become a doctor", "To become a journalist or writer", "To become a teacher", "To become a scientist"], ans: 1, exp: "Anne wanted to become a journalist or writer someday. She hoped to publish her diary and believed writing could allow her to live on after death." },
        { q: "How did Mr Keesing react to Anne's third essay written in verse?", opts: ["He was angry", "He expelled her", "He laughed and let her talk in class", "He assigned more essays"], ans: 2, exp: "The cleverness of Anne's verse essay amused Mr Keesing greatly. He laughed and stopped punishing her, allowing her to talk in class from then on." },
        { q: "What form did Anne's third essay for Mr Keesing take?", opts: ["A formal argument", "A story about her family", "A poem or verse", "A research report"], ans: 2, exp: "Anne's third essay was written in verse — a poem about a mother duck, a father swan and their talkative baby — which charmed and amused Mr Keesing." },
        { q: "Why could Anne not have a deep heart-to-heart conversation with anyone?", opts: ["She was too shy", "She did not speak Dutch", "Despite having acquaintances she had no true close friend", "Her parents forbade it"], ans: 2, exp: "Anne had plenty of acquaintances and a loving family but no one she felt she could completely trust and open up to — leading her to pour her thoughts into the diary." },
        { q: "When was 'The Diary of a Young Girl' first published?", opts: ["1944", "1947", "1952", "1960"], ans: 1, exp: "The diary was published in 1947 by Anne's father Otto Frank, who was the only member of the immediate family to survive the Holocaust." },
        { q: "In which city did Anne Frank live when she wrote the diary?", opts: ["Berlin", "London", "Amsterdam", "Paris"], ans: 2, exp: "Anne Frank lived in Amsterdam, Netherlands, which was under Nazi occupation at the time she wrote her diary." },
        { q: "What was the first essay title Mr Keesing gave Anne?", opts: ["An Incorrigible Chatterbox", "A Chatterbox", "Why I Talk Too Much", "The Talkative Student"], ans: 1, exp: "The first essay Mr Keesing assigned was titled 'A Chatterbox', intending to embarrass and silence Anne through self-reflection." },
        { q: "Anne says she does not want to write only facts in her diary. What does she want to write?", opts: ["Scientific observations", "Historical events", "All kinds of things from the bottom of her heart", "News reports"], ans: 2, exp: "Anne explicitly states she wants to write everything from the bottom of her heart — her private feelings, thoughts and experiences — not just facts. The diary is an emotional outlet." },
      ];

      anneEasy.forEach((q, i) => {
        resources.push({
          chapterId: anne._id, type: "mcq", testLevel: "easy",
          title: `Easy MCQ Q${i + 1}`,
          mcqQuestion: q.q, mcqOptions: q.opts,
          mcqCorrectIndex: q.ans, mcqExplanation: q.exp, order: i + 1,
        });
      });

      // ── MCQs — Medium (15) ─────────────────────────────
      const anneMedium = [
        { q: "What does the fact that Anne chose to write in German reveal?", opts: ["She disliked Dutch", "German was her mother tongue and the language in which she felt most at ease expressing herself", "Her Dutch was poor", "She wanted Germans to read her diary"], ans: 1, exp: "German was Anne's first language — she was born in Frankfurt, Germany. Writing in her mother tongue allowed her to express herself with full depth and nuance, which is why the diary reads with such emotional authenticity." },
        { q: "Why is Anne's diary both a personal document and a universal one?", opts: ["It describes events that happened everywhere", "While deeply personal, its themes — loneliness, the need for connection, fear, hope, adolescent identity — are universal human experiences", "It was published in many countries", "It was assigned in schools worldwide"], ans: 1, exp: "The diary resonates globally because beneath the specific historical circumstances, it deals with feelings every human recognises: loneliness, the need to be understood, fear of the unknown, and the desire to matter." },
        { q: "What does Anne's decision to name her diary 'Kitty' and write to it as a friend suggest about her psychological needs?", opts: ["She had an imaginary friend since childhood", "She was creating a relationship to meet her profound need for trust and intimacy that the adults around her could not fully provide", "She was playing a game", "Her parents suggested it"], ans: 1, exp: "By naming and personifying her diary, Anne was constructing a relationship that met her deepest needs — unconditional acceptance, perfect confidentiality, and the freedom to express her truest self without consequence." },
        { q: "The phrase 'I don't want to jot down the facts in this diary the way most people would' shows Anne's:", opts: ["Laziness about detail", "Self-consciousness about her own uniqueness and desire to create something emotionally meaningful rather than merely documentary", "Disinterest in history", "Preference for fiction"], ans: 1, exp: "Anne was deliberately setting her diary apart from conventional journaling. She wanted to capture her inner emotional world, not just external events — showing remarkable self-awareness and literary ambition for a 13-year-old." },
        { q: "What does Mr Keesing's eventual capitulation to Anne's wit reveal about him?", opts: ["He was a weak teacher", "He was unprofessional", "He had genuine humour and the maturity to appreciate intelligence even when it challenged his authority", "He favoured Anne"], ans: 2, exp: "Mr Keesing could have become increasingly harsh but instead he laughed. This reveals a teacher with genuine humour who respected Anne's cleverness even as it outwitted him — a more human and admirable response than rigid authority." },
        { q: "Anne writes 'I want to go on living even after my death.' This statement is:", opts: ["Literal — she believed in life after death", "Metaphorical — she wanted her ideas and writings to outlive her physical death", "A religious statement", "An expression of fear"], ans: 1, exp: "Anne's statement is about literary immortality — the human desire for one's thoughts and words to outlive the physical body. Through her published diary, this wish was fulfilled in a way she could never have imagined." },
        { q: "Why does Anne say her childhood was 'somewhat unhappy'?", opts: ["She was very poor", "She lost her friends due to moving", "She felt she lacked a truly close, trusting friendship despite having many acquaintances", "Her parents ignored her"], ans: 2, exp: "Anne did not lack affection or company. Her unhappiness came from a more subtle loneliness — the absence of someone she could completely trust and with whom she could have truly honest conversations." },
        { q: "How does Anne's use of humour (in the essays for Mr Keesing) function as a coping mechanism?", opts: ["It avoided punishment", "It won praise from teachers", "It allowed her to resist authority and maintain dignity in a situation of powerlessness — turning discipline into a creative opportunity", "It made her friends laugh"], ans: 2, exp: "Rather than accepting punishment passively, Anne transformed it into an opportunity for creative expression and quiet rebellion. Her humour allowed her to maintain agency and self-respect in a situation where she had little formal power." },
        { q: "The diary entries are addressed to 'Dear Kitty'. What literary form does this resemble?", opts: ["A newspaper column", "An epistolary form — writing in the style of letters to a friend", "A research journal", "A formal report"], ans: 1, exp: "Anne's diary takes an epistolary form — a piece of writing structured as letters to an imaginary friend. This technique makes the writing intimate, conversational and immediate, as if the reader is reading private correspondence." },
        { q: "What does the chapter suggest about the importance of writing as an act of self-discovery?", opts: ["Writing is only useful for professional writers", "Writing allows Anne to process emotions, understand herself and create meaning out of confusion and isolation", "Writing is a school skill", "Writing is only useful for sharing with others"], ans: 1, exp: "Through the act of writing, Anne clarified her own thoughts, processed her loneliness and fear, developed her identity and created something of lasting value. The chapter powerfully demonstrates writing as a tool for self-understanding." },
        { q: "Anne's complaint that she had 'no true friend' despite having 'thirty people I can call friends' is an example of:", opts: ["Boasting", "The distinction between surface acquaintance and deep, trusting friendship — quantity vs quality of human connection", "Loneliness caused by shyness", "A teenager's exaggeration"], ans: 1, exp: "This is a profound observation about the nature of friendship. Anne had many social connections but none that met her need for complete honesty and trust. It illustrates the loneliness possible even in a crowd." },
        { q: "Why is it significant that Anne Frank was writing at the age of 13?", opts: ["Young writers are rare", "It shows that children are unaffected by war", "It demonstrates the depth of thought, emotional intelligence and literary ability possible in an adolescent, challenging assumptions about young people's capacity for serious reflection", "13 was a special age in Jewish culture"], ans: 2, exp: "The diary challenges the assumption that adolescents are shallow or incapable of deep thought. Anne's 13-year-old voice demonstrates extraordinary self-awareness, emotional depth and literary sophistication — far beyond what is typically expected." },
        { q: "What does the contrast between Anne's wit with Mr Keesing and her deep loneliness reveal about her character?", opts: ["She was two-faced", "Her outward confidence and humour coexisted with a deep inner sensitivity and vulnerability — a complex, multi-layered personality", "Her humour was a lie", "She only showed wit to teachers"], ans: 1, exp: "Anne presents as witty, argumentative and confident in the classroom, yet privately confesses profound loneliness. This contrast shows a fully rounded human being — her humour was a strength, not a mask that hid everything." },
        { q: "How does the chapter connect to the broader historical tragedy of the Holocaust?", opts: ["It doesn't — it's just about school life", "The school chapters provide the human, everyday context before the terrifying events of hiding and capture — making the tragedy more real and personal", "It provides statistics about Jewish deaths", "It describes Nazi policies"], ans: 1, exp: "By showing Anne as a normal, funny, argumentative schoolgirl — rather than beginning with the horror — the chapter establishes her full humanity. This makes what happened to her all the more devastating for the reader." },
        { q: "The essay written 'in three voices' with a mother duck, father swan and their daughter is an example of:", opts: ["An allegory where the talkative daughter = Anne, making her defence clever and indirect", "A random fairy tale", "A nature essay", "A historical report"], ans: 0, exp: "The three-voice verse is an allegory — the talkative baby duck represents Anne, and by telling it as an animal story she makes the same argument (some are born to chatter) in a charming, indirect way that Mr Keesing could not easily refute." },
      ];

      anneMedium.forEach((q, i) => {
        resources.push({
          chapterId: anne._id, type: "mcq", testLevel: "medium",
          title: `Medium MCQ Q${i + 1}`,
          mcqQuestion: q.q, mcqOptions: q.opts,
          mcqCorrectIndex: q.ans, mcqExplanation: q.exp, order: i + 1,
        });
      });

      // ── MCQs — Hard (15) ──────────────────────────────
      const anneHard = [
        { q: "ASSERTION: Anne Frank's diary is considered literature, not just a historical document.\nREASON: It was written with conscious literary craft — narrative voice, characterisation, humour and thematic depth.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and R correctly explains A. Anne's diary transcends historical documentation precisely because of its literary qualities — a distinctive narrative voice, self-aware humour, and thematic richness that characterise genuine literature." },
        { q: "ASSERTION: Anne's loneliness was unusual given that she was surrounded by family and friends.\nREASON: Loneliness is not the absence of people but the absence of genuine understanding and trust.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and R perfectly explains A. Anne was surrounded by people yet profoundly lonely because none provided what she needed — someone who truly understood her. This is the most common and least acknowledged form of loneliness." },
        { q: "EXTRACT: 'I don't want to set down a series of facts in a diary as most people do, but I want this diary itself to be my friend.' What does this reveal about Anne's conception of writing?", opts: ["She disliked facts", "She conceived writing not as documentation but as relationship — a living dialogue between writer and page that transcends mere record-keeping", "She was poor at factual writing", "She preferred fiction to non-fiction"], ans: 1, exp: "This statement reveals Anne's extraordinary conception of writing as relational — the diary is not an object but a relationship. This philosophical attitude toward writing is sophisticated far beyond her age and explains why her diary reads as it does." },
        { q: "CASE-BASED: A student argues that Anne's writing about school and teachers seems trivial given the Holocaust context. How would a literary scholar respond?", opts: ["The scholar would agree — the school content is irrelevant", "The school content is the point — it establishes Anne as a fully human child with ordinary concerns, making the horror of what happened to her all the more devastating and real", "The scholar would say school content appeals to young readers", "The scholar would say it provides historical data about schools"], ans: 1, exp: "The apparent 'triviality' of school life is deliberate literary context. By establishing Anne as a normal child who worries about teachers, the text forces the reader to confront that the Holocaust killed real, ordinary children — not abstract victims." },
        { q: "ASSERTION: Mr Keesing's character undergoes a change during the chapter.\nREASON: He starts as a strict disciplinarian and ends as someone who can laugh at himself and appreciate wit.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and the reason correctly explains the change. Mr Keesing's arc — from punitive teacher to someone who laughs at Anne's verse — is a small but complete character arc that adds texture to what could have been a flat antagonist." },
        { q: "EXTRACT-BASED: Anne writes she wants to 'go on living after death through her writing.' Compare this to what actually happened. What is the irony?", opts: ["She did not succeed as she hoped", "She died not knowing her diary would be published — yet her wish was fulfilled far beyond anything she imagined, making her one of the most widely read writers in history", "She was disappointed by the reception of her diary", "She changed her mind about writing before she died"], ans: 1, exp: "The profound irony is that Anne died in Bergen-Belsen concentration camp aged 15, never knowing her diary would be published. Yet her wish for literary immortality was fulfilled more completely than almost any writer in history — a tragic but remarkable fact." },
        { q: "The way Anne defends her talkativeness — first with reasoned argument, then with humour and verse — demonstrates which quality?", opts: ["Stubbornness", "Intellectual flexibility and escalating creativity in response to opposition — adapting strategy while maintaining position", "Disrespect for authority", "Poor judgment"], ans: 1, exp: "Anne does not repeat the same approach. When a reasoned essay fails to end the punishment, she escalates to wit, then to verse. This shows intellectual adaptability — the ability to find new strategies while holding firm to her underlying position." },
        { q: "CASE-BASED: A student says Anne's diary shows that creative expression is more powerful than silence when facing oppression. Evaluate this claim using evidence from the chapter.", opts: ["The claim is false — Anne was still punished", "The claim is strongly supported — Anne's creative essays turned a punishment situation into a creative triumph and eventually silenced her oppressor not through compliance but through superior wit", "The claim is only partially true", "The claim cannot be evaluated from this chapter"], ans: 1, exp: "Anne's response to punishment is precisely the evidence needed. Rather than falling silent as Keesing intended, she wrote her way to victory. Creativity triumphed over authority — a microcosm of how writing can be an act of resistance." },
        { q: "ASSERTION: The chapter is told in a reflective first-person voice.\nREASON: Anne writes as if looking back on events, analysing them rather than just recording them.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 2, exp: "The assertion is true — it is first-person narration. But the reason is false. Anne wrote in real time, not retrospectively. The analytical depth comes from her natural intelligence, not hindsight. The diary was written as events unfolded." },
        { q: "What does the way Anne treats her lack of a 'true friend' as a problem to be solved (by creating the diary relationship) reveal about her character?", opts: ["She was in denial about her loneliness", "She was a problem-solver with remarkable emotional intelligence — she identified a need and creatively met it", "She avoided real relationships", "She preferred imaginary friends to real ones"], ans: 1, exp: "Rather than accepting loneliness passively, Anne engineered a solution. This proactive, creative response to emotional pain shows unusual emotional intelligence and agency for a 13-year-old — she turned a deficit into a resource." },
        { q: "EXTRACT: 'Surely you, too, will be amazed at how earnestly I try to please everyone.' What tone does this statement carry?", opts: ["Pure sincerity", "Self-pity", "A combination of gentle self-deprecation and irony — she knows she doesn't always please everyone and is gently mocking her own optimism", "Arrogance"], ans: 2, exp: "The statement carries Anne's characteristic ironic humour. She presents herself as trying to please everyone while the entire chapter demonstrates her cheerful resistance to authority. The gap between the claim and the evidence creates gentle, self-aware irony." },
        { q: "The fact that Anne's diary survived while she did not creates what type of narrative irony?", opts: ["Dramatic irony", "Tragic irony — the object meant to help her live on succeeded, but only because the human who created it perished", "Situational irony", "Verbal irony"], ans: 1, exp: "It is tragic irony of the deepest kind — the diary she created to preserve herself beyond death was only published and preserved because she herself was killed. The survival of the diary is inseparable from the tragedy of Anne's death." },
        { q: "ASSERTION: The Mr Keesing episode is disproportionately detailed for a diary supposedly about hiding from Nazis.\nREASON: Anne chose to write about what felt vivid and meaningful to her, showing that human beings focus on immediate daily life even in extraordinary circumstances.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and correctly connected. Anne writes at length about Keesing because it mattered to her. This reveals a fundamental truth about human psychology — even in crisis, we are absorbed by our immediate daily lives, relationships and small victories." },
        { q: "What does the chapter's inclusion in a CBSE textbook suggest about the values it is intended to promote in Indian students?", opts: ["Knowledge of European history", "The value of diary writing as a hobby", "Values of resilience, the power of individual voice, the importance of human dignity, and the dangers of hatred and discrimination — lessons relevant across cultures", "Awareness of World War II geography"], ans: 2, exp: "By including Anne Frank's diary, the CBSE curriculum intends to teach students about human dignity, the courage of individual expression, the dangers of state-sponsored hatred, and the universality of the human spirit — values that transcend national and cultural boundaries." },
        { q: "CASE-BASED: Two teachers debate: Teacher A says the chapter is about the Holocaust. Teacher B says it's about the universal adolescent experience. Who is right?", opts: ["Teacher A only", "Teacher B only", "Both — the chapter works simultaneously as historical testimony and as a universal portrait of adolescence, which is precisely what makes it great literature", "Neither — it's about writing"], ans: 2, exp: "Great literature works on multiple levels simultaneously. The chapter is both a specific historical document (Jewish girl under Nazi occupation) and a universal portrait of adolescence (loneliness, self-expression, wit, the need for friendship). Both teachers are right, which is why the text is taught globally." },
      ];

      anneHard.forEach((q, i) => {
        resources.push({
          chapterId: anne._id, type: "mcq", testLevel: "hard",
          title: `Hard MCQ Q${i + 1}`,
          mcqQuestion: q.q, mcqOptions: q.opts,
          mcqCorrectIndex: q.ans, mcqExplanation: q.exp, order: i + 1,
        });
      });
    }

    const hundredDresses1 = chapterMap["the-hundred-dresses-part-1"];
    if(hundredDresses1) {
        const hundredDresses1PYQs = [
  {
    question: "Why did Wanda Petronski sit in the last row of the class?",
    answer: "Wanda sat in the last row in Room Thirteen because she came from Boggins Heights and her feet were usually caked with mud. By sitting at the back she did not disturb others and avoided drawing attention to herself. The teacher also placed difficult or 'rough' children at the back, suggesting Wanda was considered an outsider.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Maddie feel about the teasing of Wanda? Why didn't she stop it?",
    answer: "Maddie felt uncomfortable and vaguely guilty about the teasing. She did not join in the ridicule herself but she never told Peggy to stop. She was afraid that if she spoke up she might become the next target of mockery herself, since she too was poor and wore old clothes. Her silence made her feel like a coward.",
    year: 2022, marks: 5, difficulty: "hard",
  },
  {
    question: "What did Wanda claim she had at home? Why do you think she said so?",
    answer: "Wanda claimed she had a hundred dresses at home, all lined up in her closet, each one more beautiful than the last. She probably said this to defend herself against the mockery about her plain, faded blue dress. It was her way of asserting dignity and worth in front of children who laughed at her poverty.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "What kind of a girl was Peggy? Was she deliberately cruel?",
    answer: "Peggy was the most popular girl in school — pretty, good at drawing, and kind to animals. She was not deliberately cruel in an obvious way; she genuinely did not think she was hurting Wanda. She saw the teasing as a game and perhaps as entertainment. Yet her thoughtlessness caused real pain, and the text suggests she never truly considered Wanda's feelings.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "Describe the setting of the story. Why is the setting important?",
    answer: "The story is set in a small American town, in a school called Room Thirteen. Wanda walks to school from Boggins Heights, a poor, muddy area at the edge of town. The contrast between Wanda's background and the comfortable town setting emphasises how she is an outsider — both geographically and socially. The setting reinforces the theme of poverty leading to exclusion.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did the girls wait for Wanda every day near the corner of Oliver Street?",
    answer: "Peggy and Maddie waited near Oliver Street so they could walk behind Wanda and tease her. They would ask her about her hundred dresses just to laugh when she described them. For Peggy it was a source of amusement; for Maddie it was a source of discomfort, though she never had the courage to stop it.",
    year: 2022, marks: 2, difficulty: "easy",
  },
  {
    question: "How is Wanda's name significant in the story?",
    answer: "Wanda Petronski is a Polish name — unusual and foreign-sounding to the American children. The other children found it difficult to pronounce and mocked it. Her name immediately marks her as 'other', different, and an immigrant. It represents the broader theme of how people from different backgrounds are othered and marginalised.",
    year: 2021, marks: 2, difficulty: "easy",
  },
  {
    question: "What does the hundred dresses symbolise in the story?",
    answer: "The hundred dresses symbolise Wanda's imagination, dignity and inner richness. Though she owned only one worn dress, she painted a hundred beautiful ones in her mind. They represent her creative spirit and her desire to be valued and seen. They also symbolise the gap between her imagined self — respected, beautiful — and the harsh reality of how others treated her.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "How did the girls behave when Wanda was not at school?",
    answer: "When Wanda was absent, the girls hardly noticed or missed her — she had no real friends. The group would move on to other things. This absence of concern reflects how marginalized Wanda truly was. She was only sought out for mockery, not for friendship, which makes the eventual revelation of her talent all the more poignant.",
    year: 2019, marks: 2, difficulty: "easy",
  },
  {
    question: "Why do you think Wanda never fought back when she was teased?",
    answer: "Wanda was quiet and dignified rather than confrontational. She answered questions about her hundred dresses calmly and seriously, not defensively. Her silence in the face of teasing may reflect her pride and inner confidence — she did not feel the need to justify herself to those who mocked her. It may also reflect her isolation as an immigrant with no real allies.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "What was the drawing contest and what was its significance in the story?",
    answer: "The drawing contest asked students to submit drawings of dresses or motorboats. Wanda submitted a hundred drawings of beautiful, dazzling dresses, each unique and stunning. She won the contest easily. The contest is significant because it reveals that the hundred dresses existed — not in a closet, but in her extraordinary artistic imagination. The same dresses the children mocked were masterpieces.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What is the theme of peer pressure as shown in this chapter?",
    answer: "Maddie's behaviour illustrates peer pressure powerfully. She was uncomfortable with the teasing but went along with it out of fear of becoming a target herself. She chose social safety over moral courage. The story shows how peer pressure can make normally decent people complicit in cruelty, and how the bystander who stays silent bears moral responsibility alongside the aggressor.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "How does the author describe Wanda's appearance?",
    answer: "Wanda always wore the same faded blue dress, which was clean but wrinkled and not quite right for her. She was a quiet girl with few friends. She sat alone at the back of the class. Her overall appearance was that of a child from a poor immigrant family — she stood out not because she tried to but because her poverty made her visibly different.",
    year: 2020, marks: 2, difficulty: "easy",
  },
  {
    question: "Why did Wanda's family move away from Boggins Heights?",
    answer: "Wanda's father wrote to the school saying they were moving to a big city where no one would ask funny questions about their Polish name. This suggests the family left because of the discrimination and mockery they faced. The children's casual cruelty had real consequences — it drove an entire family away from their home.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the title 'The Hundred Dresses' capture the central irony of the story?",
    answer: "The title captures the core irony beautifully. The hundred dresses were the source of mockery — children laughed at Wanda's claim of having them. Yet by the end, the hundred dresses are revealed as a hundred magnificent paintings, proof of Wanda's extraordinary talent. What was meant to humiliate her becomes her greatest achievement. The title thus encapsulates the story's central message about looking beyond surface appearances.",
    year: 2023, marks: 5, difficulty: "hard",
  },
];

const hundredDresses1Easy = [
  { q: "Where did Wanda Petronski live?", opts: ["The town centre", "Near the school", "Boggins Heights", "Oliver Street"], ans: 2, exp: "Wanda lived at Boggins Heights, a poor area at the edge of the town, far from the school." },
  { q: "What was the name of Wanda's class?", opts: ["Room Ten", "Room Thirteen", "Room Fifteen", "Room Eight"], ans: 1, exp: "Wanda sat in Room Thirteen, in the last row near the boys." },
  { q: "How many dresses did Wanda claim to have?", opts: ["Fifty", "A thousand", "A hundred", "Two hundred"], ans: 2, exp: "Wanda claimed to have a hundred dresses, all lined up in her closet." },
  { q: "Who was Peggy's best friend?", opts: ["Wanda", "Maddie", "Jan", "Ruth"], ans: 1, exp: "Maddie was Peggy's closest friend and they walked to school together every day." },
  { q: "Why did Wanda sit at the back of the class?", opts: ["She was taller than others", "She liked the back row", "She had muddy feet and the teacher put difficult children there", "She was shy"], ans: 2, exp: "Wanda came from Boggins Heights and her feet were often muddy. The back row was reserved for such children." },
  { q: "What was Wanda's last name?", opts: ["Petrova", "Petronski", "Petroski", "Patterson"], ans: 1, exp: "Her full name was Wanda Petronski — a Polish name that the other children found strange and funny." },
  { q: "Who was the most popular girl in school?", opts: ["Maddie", "Wanda", "Peggy", "Jan"], ans: 2, exp: "Peggy was the most popular girl in school — pretty, bright and good at drawing." },
  { q: "What was Maddie's concern about speaking up against the teasing?", opts: ["She thought Wanda was lying", "She feared becoming the next target of mockery", "She was told not to interfere", "She did not care about Wanda"], ans: 1, exp: "Maddie herself was poor and wore old clothes. She feared that if she defended Wanda, she would become the next one to be mocked." },
  { q: "What did the other children do when Wanda arrived near Oliver Street?", opts: ["Greeted her warmly", "Ignored her", "Asked about her dresses and laughed at her answers", "Walked away"], ans: 2, exp: "Peggy and Maddie would wait for Wanda and ask about her hundred dresses just to laugh at her answers." },
  { q: "In which country is the story set?", opts: ["Poland", "England", "United States of America", "Canada"], ans: 2, exp: "The story is set in a small American town. Wanda and her family are Polish immigrants." },
  { q: "What was the drawing and design contest about?", opts: ["Paintings of landscapes", "Drawings of dresses for girls and motorboats for boys", "Drawings of animals", "Paintings of houses"], ans: 1, exp: "The contest was for students to draw dresses (for girls) and motorboats (for boys)." },
  { q: "What did Wanda submit to the drawing contest?", opts: ["Ten dress designs", "One perfect dress", "A hundred drawings of dresses", "Several boat designs"], ans: 2, exp: "Wanda submitted a hundred drawings of dresses — each one different, beautiful and stunning in colour and design." },
  { q: "Who was the author of 'The Hundred Dresses'?", opts: ["O. Henry", "Eleanor Estes", "Ruskin Bond", "Mark Twain"], ans: 1, exp: "The Hundred Dresses was written by Eleanor Estes, an American author, published in 1944." },
  { q: "How did Wanda usually respond when asked about her dresses?", opts: ["She got angry and walked away", "She said she had no dresses", "She described them calmly as real, lined up in her closet", "She cried"], ans: 2, exp: "Wanda always answered calmly and seriously, describing each dress in detail as though they were real, in her closet." },
  { q: "Why did Wanda have no friends at school?", opts: ["She was rude to everyone", "She moved schools frequently", "She was a quiet outsider, mocked for her name and poverty", "She refused to talk to anyone"], ans: 2, exp: "Wanda was a quiet immigrant child who was mocked for her name and worn clothing. This made her an outsider with no real friends." },
];

const hundredDresses1Medium = [
  { q: "Why does the author describe Maddie as more uncomfortable than Peggy about the teasing?", opts: ["Maddie liked Wanda", "Maddie was poor too and could imagine being in Wanda's position", "Maddie knew Wanda's family", "Maddie had been teased before"], ans: 1, exp: "Maddie wore hand-me-down clothes and was conscious of her own poverty. She could empathise with Wanda's humiliation in a way Peggy, who was well-off, could not." },
  { q: "What does the game the girls played with Wanda reveal about Peggy's character?", opts: ["Her cruelty was deliberate and vicious", "She was kind-hearted but thoughtless and unable to see her own cruelty", "She was jealous of Wanda", "She wanted Wanda to leave school"], ans: 1, exp: "Peggy saw herself as a nice person who liked animals. She never realised she was being cruel. Her blindness to her own behaviour shows thoughtless rather than malicious cruelty." },
  { q: "The phrase 'a sort of tight, funny feeling' that Maddie experiences is best described as:", opts: ["Excitement", "Hunger", "Guilt and moral discomfort", "Jealousy"], ans: 2, exp: "Maddie feels guilt — she knows the teasing is wrong but does nothing. This 'tight, funny feeling' is the physical sensation of a troubled conscience." },
  { q: "Why is the setting of the last row important for Wanda's characterisation?", opts: ["It shows she was a bad student", "It physically and socially isolates her from the rest of the class, mirroring her social exclusion", "It was her personal choice", "It shows she was visually impaired"], ans: 1, exp: "The last row placement reinforces Wanda's status as an outsider — she is literally pushed to the margins of the classroom just as she is pushed to the margins of social life." },
  { q: "What does Wanda's calm response to teasing suggest about her inner character?", opts: ["She was too dull to understand the mockery", "She was indifferent to friendship", "She had a quiet dignity and inner world that insulated her from her tormentors", "She was planning to take revenge"], ans: 2, exp: "Rather than lashing out or crying, Wanda answered calmly and with detail. This suggests a rich inner life and a quiet dignity that her tormentors could not penetrate." },
  { q: "How does the story use the contrast between Peggy and Maddie to explore moral responsibility?", opts: ["Peggy is the villain and Maddie is the hero", "Both are equally guilty but in different ways — active cruelty vs passive complicity", "Maddie is guiltier than Peggy", "Neither is morally responsible"], ans: 1, exp: "Peggy mocks directly; Maddie enables through silence. The story suggests both forms of behaviour are morally problematic. The bystander who stays silent bears guilt alongside the aggressor." },
  { q: "What is the significance of Wanda walking to school alone every day?", opts: ["She was rebellious", "She lived far away with no option to travel", "It underscores her loneliness and social isolation in a visceral, daily way", "She preferred walking alone"], ans: 2, exp: "The image of Wanda walking alone every day makes her isolation concrete and habitual. It is not a one-off incident — it is the daily reality of her life in that school." },
  { q: "Why does Boggins Heights function as more than just a location in the story?", opts: ["It is where the school is located", "It is a symbol of poverty and social othering", "It is a famous place", "It is where Peggy lives"], ans: 1, exp: "Boggins Heights represents the social margins — the place where the poor and different live, separated from the 'normal' town. Wanda's address signals her outsider status before she even speaks." },
  { q: "The word 'unworthy' is used in the story in the context of Maddie's silence. What does it imply?", opts: ["That Maddie was academically weak", "That Maddie recognised her own moral failure and saw herself as undeserving of goodness", "That Maddie was disliked by the teacher", "That Maddie was poor"], ans: 1, exp: "Maddie's sense of being unworthy reflects her dawning moral self-awareness. She knows she failed Wanda by staying silent and this recognition of her own failure makes her feel undeserving." },
  { q: "How does the competition reveal the tragic irony of Wanda's treatment at school?", opts: ["It shows Wanda was the worst artist", "The very dresses she was mocked for turn out to be hundred works of genuine artistic genius", "It proves Wanda was lying", "It shows Peggy was a better artist"], ans: 1, exp: "The drawing contest exposes the central irony: the girls mocked Wanda for claiming a hundred dresses, never knowing she was describing masterpieces she was creating in her mind and on paper." },
  { q: "What does the phrase 'not quite like the others' suggest about Wanda's status at school?", opts: ["She was more intelligent than others", "She was physically different", "She was marked as an outsider — different in name, origin and economic status", "She was a new student"], ans: 2, exp: "The phrase captures how Wanda existed outside the social norm of the class — her name, clothes and background all made her 'other' in multiple overlapping ways." },
  { q: "Why does the author focus on Maddie's internal experience rather than Wanda's?", opts: ["Because Wanda is not important", "Because it shows that bullying damages the bystander's moral character as much as the victim", "Because Maddie is the hero", "Because Wanda has no feelings"], ans: 1, exp: "By entering Maddie's consciousness, the author explores how complicity in cruelty corrodes the bystander. We see the internal cost of cowardice, making the moral lesson more direct and personal for the reader." },
  { q: "What is the significance of Wanda's dresses being described as 'brilliant' and 'exquisite' by the teacher?", opts: ["It shows teachers are always kind", "It creates dramatic irony — what was mocked is now praised by authority", "It suggests Wanda cheated", "It is a minor detail"], ans: 1, exp: "The teacher's praise creates dramatic irony. The children mocked the hundred dresses as lies; the authority figure now confirms them as masterpieces. The reversal indicts the mockers." },
  { q: "Why is it significant that Peggy and Maddie never saw Wanda's house?", opts: ["They were not allowed in that area", "They were busy", "It shows they never genuinely attempted to know or include Wanda as a person", "Wanda did not invite them"], ans: 2, exp: "They waited near Oliver Street to tease Wanda but never went to her home. The physical distance mirrors their emotional indifference — Wanda was an object of entertainment, not a person to be known." },
  { q: "The story is narrated from a third-person perspective. What is the effect of this choice?", opts: ["It makes the story less interesting", "It allows the reader to observe the moral failures of all characters with equal clarity", "It hides Wanda's feelings", "It prevents the reader from empathising"], ans: 1, exp: "The third-person narrator can access multiple perspectives — Maddie's guilt, Peggy's obliviousness, and the external view of Wanda's suffering. This gives the story moral breadth and complexity." },
];

const hundredDresses1Hard = [
  { q: "ASSERTION: Maddie is more morally culpable than Peggy.\nREASON: Maddie knew the teasing was wrong but chose silence to protect herself.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true. Peggy acted out of thoughtlessness; Maddie acted out of conscious, self-protective cowardice. Knowing something is wrong and doing it anyway is morally more culpable than not knowing." },
  { q: "EXTRACT: 'She (Maddie) was poor herself… she had had to wear a dress that had been cut down from one that had belonged to Elsie.' What does this reveal about Maddie's relationship with the teasing?", opts: ["She was too poor to understand fashion", "Her silence was hypocritical self-protection — she feared the spotlight would shift to her own poverty", "She admired Peggy's fashion sense", "She was jealous of Wanda"], ans: 1, exp: "Maddie's own experience of poverty made her fear becoming the target. Her silence was not neutrality — it was self-interested cowardice. The extract exposes the hypocrisy and vulnerability driving her complicity." },
  { q: "CASE-BASED: A school is planning an anti-bullying assembly and wants to use 'The Hundred Dresses Part I' as a text. Which theme from the chapter is MOST relevant to address bystander behaviour?", opts: ["The importance of art education", "The danger of silence — how bystanders enable bullying by not speaking up", "The difficulty of making new friends", "The problems of immigration"], ans: 1, exp: "The chapter's most powerful lesson about bullying is the role of the bystander. Maddie's silence enables Peggy's cruelty. The text argues that choosing not to act is itself a moral act with consequences." },
  { q: "The hundred dresses represent Wanda's ______ and expose the ______ of her tormentors.", opts: ["lies / intelligence", "imagination and dignity / shallowness and cruelty", "wealth / jealousy", "poverty / kindness"], ans: 1, exp: "The dresses are proof of Wanda's rich inner world and creativity. They simultaneously expose how blind her tormentors were — they mocked the very thing that made Wanda extraordinary." },
  { q: "ASSERTION: The story suggests that poverty is the root cause of bullying.\nREASON: Wanda is teased specifically because of her worn dress and her name.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 1, exp: "Both are true but the reason only partially explains the assertion. The teasing is triggered by both poverty AND ethnic difference (her Polish name). The cause is broader — otherness in any form, not only poverty." },
  { q: "EXTRACT: 'Wanda Petronski. Most of the children in Room 13 had never heard of Poland.' What does this detail reveal?", opts: ["The children were academically poor", "It suggests Wanda's foreignness was a source of both curiosity and othering — she was fundamentally unknown to the community", "Poland is unimportant", "Wanda should have explained where she was from"], ans: 1, exp: "The detail reveals how foreign and 'other' Wanda was to the community. Her very origin was unknown to most children — she was not just poor but fundamentally alien, reinforcing her isolation." },
  { q: "What does Maddie's resolve at the end of Part I ('never again would she stand by') suggest about the story's moral arc?", opts: ["Maddie becomes angry at Wanda", "The story is optimistic — individual characters can have moral awakenings, even if it comes too late", "Maddie wants to find Wanda for selfish reasons", "The story ends without any resolution"], ans: 1, exp: "Maddie's resolve is the moral pivot of the story. Though she cannot undo the damage, her awakening suggests the possibility of moral growth. The story does not condemn her permanently — it invites her (and the reader) to do better." },
  { q: "CASE-BASED: A student argues that Wanda could have avoided teasing by not claiming to have a hundred dresses. How does the text refute this argument?", opts: ["The text agrees — Wanda should have stayed quiet", "The text shows Wanda was already teased before her claim; the real problem was the mockers' willingness to exploit vulnerability, not Wanda's response to it", "Wanda's claim was the cause of all her problems", "The text does not address this"], ans: 1, exp: "The text makes clear that Wanda was already marginalised before her claim about dresses. The claim was her act of self-defence and dignity. Blaming the victim ignores the mockers' choice to exploit rather than respect." },
  { q: "The literary device of IRONY is best demonstrated in this chapter by:", opts: ["Wanda's quiet personality", "The fact that the hundred dresses that were mocked turned out to be real masterpieces of art", "The rainy weather in the story", "Peggy's popularity"], ans: 1, exp: "The central irony is that the children mocked Wanda for describing hundred dresses — not knowing she meant her hundred paintings. The truth of her claim, when revealed, turns the mockery into an indictment of the mockers." },
  { q: "ASSERTION: Eleanor Estes wrote 'The Hundred Dresses' as a response to real experiences of discrimination she witnessed.\nREASON: The character of Wanda is based on a Polish girl Estes knew in school.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Estes drew from her own school experience of witnessing a Polish girl being teased. Both the assertion and reason are historically accurate and the reason directly explains her motivation for writing the story." },
  { q: "What does the title's use of 'a hundred' rather than 'many' or 'lots of' contribute to the story?", opts: ["It is just a round number", "The specific number makes Wanda's claim vivid and verifiable — it transforms a vague boast into a concrete promise that is ultimately fulfilled by her artwork", "It shows Wanda was lying precisely", "It has no significance"], ans: 1, exp: "The specific number 'hundred' does two things: it makes the children's mockery specific (and thus more calculable as cruelty) and it creates a measurable claim that the reader and children can later verify against her hundred paintings." },
  { q: "From a feminist reading, what does Wanda's story represent?", opts: ["It celebrates traditional female roles", "It critiques how girls police each other's appearances and economic status through social exclusion", "It shows girls are naturally mean", "It is unrelated to gender"], ans: 1, exp: "The story shows how girls in patriarchal culture compete and police each other using dress and appearance as markers of worth. Wanda's poverty makes her a target in a social system that values girls for how they look and dress." },
  { q: "EXTRACT-BASED: 'She never had heard Wanda laugh out loud.' What does this simple observation convey?", opts: ["Wanda had a serious personality", "It conveys the depth of Wanda's social isolation — she had never felt safe or welcome enough to laugh freely in school", "Wanda was unhappy at home", "Wanda was ill"], ans: 1, exp: "Laughter is a sign of comfort and belonging. That Wanda never laughed aloud at school speaks volumes about how unwelcome and unsafe she felt every single day — a quietly devastating detail." },
  { q: "Why is the story titled with Wanda's dresses rather than Wanda's name or Wanda's art?", opts: ["The dresses are more interesting than Wanda", "The dresses are the central symbol — the object of mockery that becomes the proof of genius and the vehicle for the story's moral lesson", "It makes the title more commercial", "The author preferred this title"], ans: 1, exp: "The dresses carry the entire weight of the story — they represent Wanda's dignity, her imagination, and the cruelty of her peers. Titling the story after them keeps the moral object (the source of mockery redeemed as art) at the centre." },
  { q: "ASSERTION: The story ends on an ambiguous note in Part I.\nREASON: Wanda has left school before the full impact of the contest results can be absorbed.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are accurate and causally linked. Because Wanda has already left, there is no resolution yet — no apology, no acknowledgment. This ambiguity drives the emotional tension of Part I and sets up Part II." },
  { q: "What is the narrative purpose of Maddie's dream/nightmare imagery near the end of the chapter?", opts: ["It is a fantasy sequence", "It externalises Maddie's guilty conscience — her subconscious processes the moral failure she could not address while awake", "It is irrelevant to the plot", "It is used to introduce a new character"], ans: 1, exp: "Maddie's waking dream-like guilt experiences are the story's way of showing how a troubled conscience works. What she suppressed during the day surfaces as vague, uneasy images — the literary representation of moral discomfort." },
];

      pushEnglishChapterBank(
        hundredDresses1,
        hundredDresses1PYQs,
        hundredDresses1Easy,
        hundredDresses1Medium,
        hundredDresses1Hard
      );
    }

    pushEnglishChapterBank(
      chapterMap["the-hundred-dresses-part-2"],
      hundredDresses2PYQs,
      hundredDresses2Easy,
      hundredDresses2Medium,
      hundredDresses2Hard
    );
    pushEnglishChapterBank(
      chapterMap["glimpses-of-india"],
      glimpsesPYQs,
      glimpsesEasy,
      glimpsesMedium,
      glimpsesHard
    );
    pushEnglishChapterBank(
      chapterMap["mijbil-the-otter"],
      mijbilPYQs,
      mijbilEasy,
      mijbilMedium,
      mijbilHard
    );
    pushEnglishChapterBank(
      chapterMap["madam-rides-the-bus"],
      madamPYQs,
      madamEasy,
      madamMedium,
      madamHard
    );
    pushEnglishChapterBank(
      chapterMap["the-sermon-at-benares"],
      sermonPYQs,
      sermonEasy,
      sermonMedium,
      sermonHard
    );
    pushEnglishChapterBank(
      chapterMap["the-proposal"],
      proposalPYQs,
      proposalEasy,
      proposalMedium,
      proposalHard
    );
    pushEnglishChapterBank(
      chapterMap["dust-of-snow"],
      dustOfSnowPYQs,
      dustOfSnowEasy,
      dustOfSnowMedium,
      dustOfSnowHard
    );
    pushEnglishChapterBank(
      chapterMap["fire-and-ice"],
      fireAndIcePYQs,
      fireAndIceEasy,
      fireAndIceMedium,
      fireAndIceHard
    );
    pushEnglishChapterBank(
      chapterMap["a-tiger-in-the-zoo"],
      aTigerInTheZooPYQs,
      aTigerInTheZooEasy,
      aTigerInTheZooMedium,
      aTigerInTheZooHard
    );
    pushEnglishChapterBank(
      chapterMap["how-to-tell-wild-animals"],
      howToTellWildAnimalsPYQs,
      howToTellWildAnimalsEasy,
      howToTellWildAnimalsMedium,
      howToTellWildAnimalsHard
    );
    pushEnglishChapterBank(
      chapterMap["the-ball-poem"],
      ballPoemPYQs,
      ballPoemEasy,
      ballPoemMedium,
      ballPoemHard
    );
    pushEnglishChapterBank(
      chapterMap["a-triumph-of-surgery"],
      triumphSurgeryPYQs,
      triumphSurgeryEasy,
      triumphSurgeryMedium,
      triumphSurgeryHard
    );
    pushEnglishChapterBank(
      chapterMap["the-thiefs-story"],
      thiefStoryPYQs,
      thiefStoryEasy,
      thiefStoryMedium,
      thiefStoryHard
    );
    pushEnglishChapterBank(
      chapterMap["the-midnight-visitor"],
      midnightVisitorPYQs,
      midnightVisitorEasy,
      midnightVisitorMedium,
      midnightVisitorHard
    );
    pushEnglishChapterBank(
      chapterMap["a-question-of-trust"],
      questionOfTrustPYQs,
      questionOfTrustEasy,
      questionOfTrustMedium,
      questionOfTrustHard
    );
    pushEnglishChapterBank(
      chapterMap["footprints-without-feet"],
      footprintsFeetPYQs,
      footprintsFeetEasy,
      footprintsFeetMedium,
      footprintsFeetHard
    );
    pushEnglishChapterBank(
      chapterMap["the-making-of-a-scientist"],
      makingScientistPYQs,
      makingScientistEasy,
      makingScientistMedium,
      makingScientistHard
    );
    pushEnglishChapterBank(
      chapterMap["the-necklace"],
      necklacePYQs,
      necklaceEasy,
      necklaceMedium,
      necklaceHard
    );
    pushEnglishChapterBank(
      chapterMap["the-hack-driver"],
      hackDriverPYQs,
      hackDriverEasy,
      hackDriverMedium,
      hackDriverHard
    );
    pushEnglishChapterBank(
      chapterMap["bholi"],
      bholiPYQs,
      bholiEasy,
      bholiMedium,
      bholiHard
    );
    pushEnglishChapterBank(
      chapterMap["the-book-that-saved-the-earth"],
      bookSavedEarthPYQs,
      bookSavedEarthEasy,
      bookSavedEarthMedium,
      bookSavedEarthHard
    );

    remainingEnglishPoemBanks.forEach((bank) => {
      pushEnglishChapterBank(
        chapterMap[bank.slug],
        bank.pyqs,
        bank.easy,
        bank.medium,
        bank.hard
      );
    });

    // ── Insert all ────────────────────────────────────────
    if (resources.length) {
      const inserted = await Resource.insertMany(resources);
      console.log(`\n✅ English seed complete`);
      console.log(`─────────────────────────────────────`);
      console.log(`Total resources inserted : ${inserted.length}`);
      const pyqs = inserted.filter(r => r.type === "pyq").length;
      const mcqs = inserted.filter(r => r.type === "mcq").length;
      console.log(`PYQs   : ${pyqs}`);
      console.log(`MCQs   : ${mcqs}`);
      console.log(`─────────────────────────────────────`);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

// ── Chapter question banks (loaded before seedEnglish() runs at EOF) ──

const hundredDresses2PYQs = [
  {
    question: "What did Wanda's father write in his letter to the school? What does the letter reveal about his character?",
    answer: "Mr Petronski wrote that his children would not come to school anymore. He said they were moving to a big city where no one would ask about their funny name. The letter reveals a quiet, dignified pride — he did not write in anger but in sorrow, and he did not accuse anyone directly. His formal English and restrained tone show a man trying to protect his family's dignity.",
    year: 2023, marks: 5, difficulty: "hard",
  },
  {
    question: "Why did Peggy and Maddie decide to go to Boggins Heights? What did they hope to achieve?",
    answer: "Peggy and Maddie went to Boggins Heights to find Wanda and tell her that she had won the contest and that she was really a wonderful artist. Maddie especially felt driven by guilt and wanted to make amends. They hoped that finding Wanda and offering genuine admiration would ease their guilt and perhaps repair some of the damage done.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Maddie feel after going to Boggins Heights and not finding Wanda?",
    answer: "Maddie felt a deep, lasting sense of guilt and regret. She realised she could not undo the past. She resolved that she would never again stand by in silence when someone was being hurt, even if it meant losing Peggy's friendship. She made a private vow to be braver and morally more courageous in future.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "What gift did Wanda leave for Peggy and Maddie? What was the significance of this gift?",
    answer: "Wanda wrote to Miss Mason, giving the drawings of the green dress with the red trimming to Maddie and the blue one to Peggy. The gift was extraordinarily generous — she gave away her prize-winning artworks to the very girls who had mocked her. This act of kindness and forgiveness reveals Wanda's remarkable character: she bore no bitterness and responded to cruelty with grace.",
    year: 2022, marks: 5, difficulty: "hard",
  },
  {
    question: "What resolution did Maddie make at the end of the story?",
    answer: "Maddie resolved that she would never again remain silent in the face of cruelty, even if it meant losing her own popularity or friendship with Peggy. She realised that staying quiet made her as guilty as the one who acted. She decided that no matter what happened to her personally, she would always speak up when she saw someone being hurt.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "How does Miss Mason's reaction to Mr Petronski's letter reveal her character?",
    answer: "Miss Mason reads the letter gravely and speaks seriously to the class, asking them to think about whether they had made any child feel unwelcome. She does not name or shame anyone but her tone makes clear that she holds the class morally responsible. Her response shows her to be a thoughtful and conscientious teacher who cares about the wellbeing of every student.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "What does Wanda's Christmas letter reveal about her personality?",
    answer: "Wanda's Christmas letter to Miss Mason — in which she gives away her winning paintings and wishes everyone a Merry Christmas — reveals her extraordinary generosity, forgiveness and absence of bitterness. She does not reproach anyone. Instead she writes warmly and gives away her most treasured work. Her letter shows that despite all she suffered, she retained her goodness and dignity.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "Why couldn't Peggy and Maddie find Wanda's house at Boggins Heights?",
    answer: "When they finally went to Boggins Heights to find Wanda, they discovered an old, rickety house that appeared to be empty. There was no sign of the Petronski family. The house was deserted, suggesting the family had already moved away. Their inability to find Wanda made their guilt more permanent — they could not apologise or make amends in person.",
    year: 2021, marks: 2, difficulty: "easy",
  },
  {
    question: "How did Peggy justify her behaviour in teasing Wanda?",
    answer: "Peggy told Maddie that she never called Wanda a foreigner or made fun of her name. She said she only asked about the dresses and pointed out that she had even asked nicely. She felt she was not cruel in the same way that obvious bullies are. This self-justification shows Peggy's inability to see how her actions felt from Wanda's perspective.",
    year: 2020, marks: 2, difficulty: "easy",
  },
  {
    question: "What is the moral of 'The Hundred Dresses Part II'?",
    answer: "The story teaches that bullying and indifference to others' feelings causes real and lasting harm. It shows the importance of moral courage — speaking up against injustice even when it is personally risky. It also shows the power of forgiveness and dignity, as demonstrated by Wanda. The moral is that cruelty, even thoughtless cruelty, has consequences, but so does kindness.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How does Wanda's gift function as a form of forgiveness?",
    answer: "By giving her paintings to Peggy and Maddie — the very girls who tormented her — Wanda performs an act of extraordinary forgiveness. She does not hold their cruelty against them. The gift transforms the relationship: instead of leaving as a victim, Wanda leaves as a benefactor. Her generosity is more powerful than any accusation, and it ensures that Peggy and Maddie will carry the memory of their wrongdoing forever.",
    year: 2022, marks: 5, difficulty: "hard",
  },
  {
    question: "Why does Maddie feel her conscience is 'unclean' even after receiving Wanda's gift?",
    answer: "Maddie cannot undo the past. Wanda's gift was given in forgiveness, but Maddie knows she does not deserve it. The gift makes her feel the weight of her own guilt more acutely, not less. She recognises that forgiveness from the wronged party does not automatically remove the stain of having wronged them — the knowledge of what she did and did not do remains.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe the house at Boggins Heights. Why is its description significant?",
    answer: "The house is described as small, in the middle of a field, with no curtains and appearing deserted. It is old, grey and rickety. Its emptiness is significant — the Petronsks have gone and left nothing behind but the shell of a home. The desolate house mirrors the hollowness of the girls' realisation: they came too late, their apology has nowhere to go.",
    year: 2019, marks: 2, difficulty: "easy",
  },
  {
    question: "What do Peggy and Maddie notice about the painting Wanda gave each of them?",
    answer: "Maddie notices that the drawing Wanda gave her looks exactly like her — it has the right colour hair and eyes, as though Wanda had drawn it specially for her. Peggy's drawing has the same quality. This detail reveals that Wanda had been observing them carefully and affectionately, creating personalised gifts for the same girls who mocked her — a deeply touching and bittersweet revelation.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "How is the theme of class and economic inequality explored in Part II?",
    answer: "Part II shows the consequences of social exclusion rooted in poverty and ethnicity. The Petronski family leaves not because of a single incident but because of sustained marginalisation. Mr Petronski's letter speaks to the accumulated weight of being made to feel unwelcome. The story shows that economic inequality and ethnic difference make individuals vulnerable to sustained social violence that can ultimately displace them entirely.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the author use Maddie's unspoken resolve as the story's final statement?",
    answer: "The story ends not with a dramatic speech but with Maddie's private, silent resolve to never be a bystander again. This quiet ending is more powerful than any speech could be. It suggests that moral change happens internally, in private, and must be carried into future action. The story's final statement is that awareness and a resolve to do better are the only responses to having failed to do right.",
    year: 2023, marks: 5, difficulty: "hard",
  },
];

const hundredDresses2Easy = [
  { q: "Who read Mr Petronski's letter to the class?", opts: ["The principal", "Peggy", "Miss Mason", "Maddie"], ans: 2, exp: "Miss Mason, the class teacher, read Mr Petronski's letter aloud to the students in a serious and grave manner." },
  { q: "What did Mr Petronski say in his letter to the school?", opts: ["He asked for a refund of fees", "He said his children would not attend school anymore and were moving to a big city", "He complained about the teacher", "He invited the class to his home"], ans: 1, exp: "Mr Petronski wrote that his children would no longer attend school and they were moving to a big city where nobody would ask about their funny Polish name." },
  { q: "What special gift did Wanda leave for Maddie in her letter?", opts: ["A blue dress drawing", "A green dress with red trimming drawing", "A painting of a house", "A portrait of Maddie"], ans: 1, exp: "Wanda gave the green dress with red trimming drawing specifically to Maddie, and the blue one to Peggy." },
  { q: "Why did Peggy and Maddie go to Boggins Heights after receiving the letter?", opts: ["To collect their drawings", "To tell Wanda she had won the contest and express admiration", "To return their drawings to Wanda", "To apologise to Mr Petronski"], ans: 1, exp: "They went to find Wanda and tell her she had won the contest and that she was a wonderful artist." },
  { q: "What did Maddie resolve after failing to find Wanda?", opts: ["To never go to Boggins Heights again", "To apologise to Peggy", "To never stand by silently while someone was being hurt", "To move schools"], ans: 2, exp: "Maddie resolved that she would never again remain silent in the face of cruelty, no matter what the personal cost." },
  { q: "What was Wanda's full letter addressed to?", opts: ["To Peggy only", "To the whole school", "To Miss Mason and the class", "To Mr Petronski"], ans: 2, exp: "Wanda's Christmas letter was addressed to Miss Mason and the class, wishing everyone Merry Christmas and gifting her paintings." },
  { q: "How did Maddie know the drawing Wanda gave her was specially made for her?", opts: ["Wanda wrote her name on it", "The girl in the drawing looked like Maddie, with the same hair and eyes", "The teacher told her", "It was written in the letter"], ans: 1, exp: "The girl in Maddie's drawing had the same hair colour and eye colour as Maddie herself — as though Wanda had drawn it specifically for her." },
  { q: "What was the condition of Wanda's house when Peggy and Maddie visited?", opts: ["Someone else was living there", "It was locked and guarded", "It appeared deserted, old and empty", "It was being renovated"], ans: 2, exp: "The house appeared deserted — no curtains, no sign of life, suggesting the Petronski family had already moved away." },
  { q: "What did Peggy say to justify herself after reading the letter?", opts: ["She apologised immediately", "She said she never called Wanda a foreigner or made fun of her name directly", "She said she was too young to understand", "She said it was all Maddie's fault"], ans: 1, exp: "Peggy defended herself by saying she had never called Wanda a foreigner or made fun of her name — she only asked about the dresses, and she had been nice about it." },
  { q: "What season does Part II primarily take place in?", opts: ["Summer", "Spring", "Winter / Christmas time", "Autumn"], ans: 2, exp: "Part II takes place around Christmas — Wanda's letter is a Christmas letter and the story moves toward the holiday season." },
  { q: "Who won the drawing contest?", opts: ["Peggy", "Maddie", "Wanda", "A boy named Jack"], ans: 2, exp: "Wanda Petronski won the drawing contest with her hundred exquisite dress designs." },
  { q: "Who was Wanda's teacher?", opts: ["Miss Thompson", "Miss Peterson", "Miss Mason", "Miss Brown"], ans: 2, exp: "Miss Mason was the teacher of Room Thirteen, who read the Petronski letter and later received Wanda's Christmas letter." },
  { q: "What does Wanda's Christmas letter show about her character?", opts: ["She was angry with her classmates", "She was generous, forgiving and bore no bitterness", "She was sad and lonely", "She wanted her drawings back"], ans: 1, exp: "By giving away her prize-winning art and wishing the class Merry Christmas, Wanda showed remarkable generosity, kindness and an absence of bitterness." },
  { q: "In the story, the girls walked to Boggins Heights on a:", opts: ["Rainy school day", "Sunday afternoon", "Saturday", "Holiday morning"], ans: 2, exp: "Peggy and Maddie went to Boggins Heights on a Saturday, walking up the hill to find Wanda's house." },
  { q: "What emotion did Maddie primarily feel throughout Part II?", opts: ["Joy at winning a prize", "Anger at Wanda for leaving", "Guilt and regret for not speaking up earlier", "Pride in her friendship with Peggy"], ans: 2, exp: "Maddie was consumed by guilt throughout Part II — the letter, the deserted house, and finally Wanda's gift all intensified her regret for having stayed silent." },
];

const hundredDresses2Medium = [
  { q: "How does Miss Mason's handling of the letter reflect the story's themes?", opts: ["She punishes the guilty students", "She models dignified moral responsibility — holding the class accountable without shaming individuals", "She ignores the situation", "She praises Peggy for honesty"], ans: 1, exp: "Miss Mason reads the letter gravely and asks the class to reflect on whether they made anyone feel unwelcome. This measured response models thoughtful moral leadership without resorting to blame or punishment." },
  { q: "Why is it significant that Wanda gives away her winning drawings rather than keeping them?", opts: ["She had no room for them", "She wanted to be kind to her favourite friends", "It shows her extraordinary magnanimity — she values human connection over material reward, even toward those who hurt her", "She was forced to give them away"], ans: 2, exp: "The drawings were her greatest achievement. Giving them away — especially to her mockers — shows Wanda values forgiveness and connection over victory or possession. It is an act of genuine moral greatness." },
  { q: "The empty house at Boggins Heights functions as a symbol of:", opts: ["Poverty", "The permanence of the harm done — the opportunity for apology is gone forever", "Wanda's happiness in leaving", "The family's wealth"], ans: 1, exp: "The empty house is a symbol of irreversibility. Maddie and Peggy came to make amends but the space for that act is now empty. The harm they caused cannot be undone — the family is gone." },
  { q: "How does Peggy's self-justification differ from Maddie's reaction to the same event?", opts: ["Both feel equally guilty", "Peggy quickly absolves herself by focusing on technical innocence; Maddie accepts deeper moral responsibility", "Maddie also absolves herself", "Peggy feels worse than Maddie"], ans: 1, exp: "Peggy argues she never technically insulted Wanda's name — she focuses on what she did NOT do. Maddie looks at the effect of what she allowed to happen. This difference reveals their contrasting moral characters." },
  { q: "What does the personalised drawing (looking like Maddie) reveal about Wanda's inner life?", opts: ["Wanda was a stalker", "Despite being mocked, Wanda had observed her tormentors with care and affection — she did not dehumanise them as they had dehumanised her", "Wanda wanted to be friends with Maddie all along", "It was a coincidence"], ans: 1, exp: "The personalised drawing shows Wanda had seen Maddie clearly and affectionately even while being mocked by her. This is the moral inversion of the story — the victim retained the humanity that the tormentors had abandoned." },
  { q: "What does the line 'she could not help it, it was just the way things were' reveal about the social dynamics of the school?", opts: ["It excuses Maddie's behaviour", "It exposes how social norms around conformity and belonging normalise cruelty", "It shows Maddie was right to stay silent", "It is an authorial statement of approval"], ans: 1, exp: "The phrase reveals how social pressure normalises complicity in cruelty. Staying silent feels like 'the way things are' — a naturalised social norm. The story critiques how such norms make good people participate in harm." },
  { q: "How does the author use the contrast between Wanda's generosity and the girls' guilt to create the story's emotional climax?", opts: ["By showing Wanda was wrong to give the drawings away", "By using Wanda's forgiveness to intensify the girls' guilt — an act of kindness that hurts more than accusations", "By showing the girls were not guilty at all", "By showing Wanda wanted their friendship"], ans: 1, exp: "Wanda's gift is the most painful moment for Maddie precisely because it is so generous. Wanda's forgiveness, rather than releasing Maddie, deepens her guilt — it shows her clearly what Wanda was, and what she and Peggy failed to see." },
  { q: "What is the significance of Wanda's drawing the faces of Peggy and Maddie into the paintings?", opts: ["She was practising portrait drawing", "It shows she was lonely", "It shows she saw them as worth depicting — she did not regard them as enemies but as people she knew and, in a sense, cared about", "She was planning to show them the drawings"], ans: 2, exp: "By placing the girls' faces in her art, Wanda showed that she saw them as individuals worthy of attention and even affection. This is morally devastating — the people she drew with care were the people who humiliated her." },
  { q: "How does the story's resolution challenge the reader?", opts: ["By providing easy comfort — the girls apologise and all is forgiven", "By withholding resolution — Wanda cannot be reached, no apology is possible, the reader is left with the weight of what cannot be undone", "By punishing the guilty characters", "By showing that bullying has no consequences"], ans: 1, exp: "The story deliberately denies cathartic resolution. No apology reaches Wanda. The girls' regret has nowhere to go. The reader is left with an uncomfortable truth: some harm cannot be undone and the only response is future moral improvement." },
  { q: "How does Mr Petronski's letter serve as a plot device?", opts: ["It introduces a new character", "It serves as the catalyst that transforms abstract guilt into concrete consequence — the family is really gone", "It provides comic relief", "It resolves the main conflict"], ans: 1, exp: "The letter is the moment when the consequences of the girls' behaviour become real. Before, Wanda was just absent; the letter reveals the reason and makes the harm concrete and irreversible." },
  { q: "Why does Maddie's resolution at the end of the story carry more weight than Peggy's self-justification?", opts: ["Because Maddie is the main character", "Because Maddie's resolution is forward-looking — she transforms guilt into a principle for future action rather than rationalising the past", "Because Peggy is wrong", "Because Maddie is smarter"], ans: 1, exp: "Peggy looks backward and minimises. Maddie looks forward and commits to change. The story values Maddie's response because it transforms regret into moral growth — the only productive response to a past that cannot be changed." },
  { q: "What is the narrative effect of telling the story from the perspective of the bystander (Maddie) rather than the victim (Wanda)?", opts: ["It diminishes Wanda's experience", "It makes the story about a bystander's moral journey, showing readers — who are more likely to be bystanders than victims or aggressors — how to recognise and respond to their own complicity", "It is a narrative mistake", "It protects Wanda's privacy"], ans: 1, exp: "Most readers are more likely to be Maddie than Wanda. By focusing on the bystander, the story speaks directly to the reader's own potential complicity. It is a more uncomfortable and more useful moral perspective." },
  { q: "The story ends with Maddie's private resolution rather than a public act. What does this suggest about moral change?", opts: ["That moral change only happens in public", "That real moral change is internal and individual, preceding any external action", "That private thoughts are unimportant", "That Maddie will never change"], ans: 1, exp: "The story suggests that moral change begins internally. Maddie's private resolve is the foundation for future courageous action. Without this internal shift, no meaningful external change is possible." },
  { q: "How does Wanda's nationality (Polish immigrant) add a dimension of social commentary to the story?", opts: ["It adds an exotic flavour to the story", "It broadens the story from individual cruelty to systemic othering — the bullying reflects wider social prejudice against immigrants and foreigners", "It is irrelevant", "It is used to teach geography"], ans: 1, exp: "Wanda's Polish identity situates her bullying within the broader context of xenophobia and nativism. She is not just bullied because she is poor but because she is foreign. The story critiques how societies other and exclude immigrants." },
  { q: "What does the author mean by Maddie feeling a 'deep sadness' that the drawings could not remove?", opts: ["She was sad that the drawings were not valuable", "She was sad about Peggy", "The sadness came from knowing that forgiveness and beauty cannot retroactively undo harm already done", "She was homesick"], ans: 2, exp: "Maddie's sadness is the sadness of irreversibility. Wanda's gift was beautiful and generous, but it could not undo the teasing, the hurt, or the loss of the family. The sadness is the knowledge that some damage is permanent." },
  { q: "What universal truth about human nature does Part II of the story affirm?", opts: ["People are always cruel", "Human beings are capable of extraordinary generosity and forgiveness even in the face of cruelty — but also of extraordinary moral cowardice", "People always learn from mistakes", "Forgiveness makes all problems disappear"], ans: 1, exp: "The story holds two truths in tension: Wanda's extraordinary forgiveness and generosity, and Maddie's (and Peggy's) moral failure. It affirms that humans are capable of great nobility (Wanda) and great smallness (the bystander), often simultaneously." },
];

const hundredDresses2Hard = [
  { q: "ASSERTION: Wanda's act of giving drawings to Peggy and Maddie is an act of power, not weakness.\nREASON: By forgiving and giving, Wanda defines herself as a benefactor rather than a victim, reclaiming moral authority.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Wanda's gift is an act of moral power. By forgiving generously, she refuses the role of victim and claims the higher moral ground. The reason accurately explains how her gift is an exercise of power through dignity rather than through retaliation." },
  { q: "CASE-BASED: A student says: 'Wanda should have been angrier. Her forgiveness rewards bad behaviour.' How does the text respond to this view?", opts: ["The text agrees — Wanda was wrong to forgive", "The text shows forgiveness does NOT reward bad behaviour; Peggy and Maddie carry their guilt permanently, intensified by Wanda's generosity", "The text is neutral on this question", "The text shows Wanda had no choice"], ans: 1, exp: "Wanda's forgiveness does not absolve Maddie and Peggy — it deepens their guilt. Far from rewarding bad behaviour, the gift ensures the girls' regret is permanent and acute. Forgiveness here is not absolution; it is a mirror held up to the wrongdoers." },
  { q: "EXTRACT: 'She (Maddie) could see Wanda's face, the tight, bleak look, before it went blank.' What does this flashback reveal?", opts: ["Wanda was bored at school", "It reveals that Wanda did feel the mockery deeply but had trained herself to show nothing — the blank look was a mask of dignity over real pain", "Wanda was physically ill", "Wanda was angry at the teacher"], ans: 1, exp: "The 'tight, bleak look' is the brief moment before Wanda's mask of calm is in place. It reveals that Wanda felt the cruelty acutely — she simply chose not to show it. Her composure was not absence of feeling; it was an act of will." },
  { q: "ASSERTION: The story suggests that the harm of bullying is felt most deeply by the bystander.\nREASON: Wanda moves away and appears to find peace; it is Maddie who is permanently changed by guilt.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 1, exp: "Both statements are true but the reason only partially explains the assertion. The story focuses on Maddie's guilt, but this does not mean Wanda suffered less — Wanda's suffering drove her family away. The bystander suffers most in terms of moral consequence, but not necessarily in terms of actual harm." },
  { q: "The phrase 'like a Christmas card picture' used to describe Boggins Heights is an example of:", opts: ["Irony", "Personification", "Simile used to create dramatic contrast with what the girls find there", "Metaphor"], ans: 2, exp: "The simile creates a painful ironic contrast. Boggins Heights looks picturesque and peaceful but holds an empty house — a symbol of harm done and amends impossible. The beauty of the setting intensifies the bleakness of the discovery." },
  { q: "CASE-BASED: A teacher asks whether Peggy or Maddie is more responsible for Wanda leaving. Which view best represents the text's position?", opts: ["Peggy is entirely responsible", "Both share responsibility equally", "The text implies no one is responsible", "Maddie is more responsible because her silence was a conscious moral choice while Peggy acted out of thoughtlessness"], ans: 3, exp: "The text is nuanced but implies Maddie's culpability is in some ways deeper — she knew it was wrong and chose safety. Peggy's cruelty was thoughtless; Maddie's complicity was calculated. Both are responsible but the nature of their guilt differs." },
  { q: "EXTRACT: 'She could tell by the way Miss Mason said it, it was a serious matter.' What technique is used here and what does it achieve?", opts: ["Direct characterisation", "Indirect/implied characterisation — Maddie reads the teacher's tone, making the moral weight of the letter clear without explicit statement", "Comic relief", "Foreshadowing the plot twist"], ans: 1, exp: "Rather than stating the seriousness directly, the author uses Maddie's interpretation of Miss Mason's tone. This indirect approach makes the reader feel the weight of the moment through a child's perception, which is more immediate and credible." },
  { q: "What is the thematic significance of Wanda's drawings looking exactly like Peggy and Maddie?", opts: ["Wanda was practising realism", "It represents that Wanda saw her tormentors clearly and humanely — while they dehumanised her, she was humanising them through art", "It shows Wanda planned to expose them", "It is a technical coincidence"], ans: 1, exp: "The mirroring is profound: Wanda placed the faces of the people who mocked her into her most beautiful creations. While they reduced her to an object of ridicule, she elevated them into subjects worthy of artistic care — a devastating moral inversion." },
  { q: "ASSERTION: The story's final scene (Maddie's resolve) is the most important moment in Part II.\nREASON: It transforms a story about cruelty into a story about moral growth and the possibility of change.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are accurate and causally linked. Without Maddie's resolve, the story would end in unresolved guilt. Her resolution gives the narrative its moral shape — suffering leads to awareness, which leads to the will to be better." },
  { q: "Why does the story never show Wanda's own emotional response to what happened to her?", opts: ["The author forgot to include it", "Wanda's silence is itself a statement — her absence and unreachable-ness keeps the harm from being resolved or diminished by narrative comfort", "Wanda did not care", "It would make the story too long"], ans: 1, exp: "By keeping Wanda's feelings largely inaccessible, the author prevents the reader from receiving easy emotional resolution. We cannot know if Wanda is fine, which leaves the harm done to her open and unhealed — as it would be in life." },
  { q: "How does Eleanor Estes use the setting of winter/Christmas to amplify the story's themes?", opts: ["It creates a festive backdrop", "The season of giving and goodwill ironically highlights the cruelty and exclusion Wanda experienced — and makes her generous letter all the more poignant", "It has no thematic relevance", "It shows the story is set in December"], ans: 1, exp: "Christmas, the season of generosity and inclusion, forms an ironic backdrop. Wanda — excluded all year — writes a generous Christmas letter. The contrast between the season's ideals and the reality of how she was treated deepens the story's critique of hypocrisy." },
  { q: "The story belongs to the genre of 'realistic fiction'. Which element MOST clearly reflects this?", opts: ["The fantastical drawing contest", "The psychologically realistic portrayal of guilt, moral cowardice and social pressure that mirrors how children actually behave", "The happy ending", "The magical quality of the drawings"], ans: 1, exp: "What makes the story realistic fiction is its psychological accuracy. Children actually do avoid speaking up for fear of social consequences. The internal experience of guilt and moral cowardice is rendered with great precision." },
  { q: "ASSERTION: Mr Petronski's letter is more powerful because it does not mention Wanda's bullying directly.\nREASON: Indirection allows the reader and the class to feel the weight of implication rather than direct accusation.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. A direct accusation might have triggered defensiveness. The letter's indirect dignity — simply stating they are leaving — is more powerful because it leaves the class to draw their own conclusions, which hit harder." },
  { q: "What does the story suggest about the relationship between social acceptance and creative expression?", opts: ["Social acceptance is necessary for creativity", "The story shows that social marginalisation can paradoxically create space for extraordinary inner creativity — Wanda's exclusion may have been the soil in which her art grew", "The two are entirely unrelated", "Creative people are always accepted"], ans: 1, exp: "Wanda's artistic richness exists in inverse proportion to her social acceptance. Her inner world of imagined dresses — which became real on paper — was nourished by her isolation. The story does not celebrate her exclusion but notes this painful irony." },
  { q: "How does the structure of the story across Parts I and II reflect the moral journey it traces?", opts: ["Part I is happy and Part II is sad", "Part I establishes the wrong; Part II traces its consequences — the structure mirrors the arc of moral failure, consequence and resolution", "The two parts are structurally unrelated", "Part II reverses everything in Part I"], ans: 1, exp: "Part I establishes the cruelty and complicity; Part II shows the irreversible consequence (Wanda's departure) and the internal aftermath (Maddie's guilt and resolve). The two-part structure enacts the moral arc: harm, consequence, growth." },
  { q: "CASE-BASED: A student says the story is dated because such bullying no longer happens. How would you refute this using the text?", opts: ["The student is correct — the story is dated", "The forms of bullying may change but the dynamics — the popular child, the outsider, the silent bystander — are timeless and still present in schools today", "The story is set in modern times", "The story is about something other than bullying"], ans: 1, exp: "The story's power lies in the universality of its dynamics. The specific social markers change — today it might be social media, different ethnic groups — but the structure of exclusion (popular child mocking outsider while bystander stays silent) is timeless." },
];

// ─────────────────────────────────────────────────────────────
//  GLIMPSES OF INDIA  (slug: glimpses-of-india)
// ─────────────────────────────────────────────────────────────

const glimpsesPYQs = [
  {
    question: "Describe the process of making bread in Goa as described by the narrator.",
    answer: "In the Goan narrative, the baker or 'pader' visits early every morning, announced by the musical jingling sound of his bamboo staff. He carries a large basket of breads on his head. The bread is baked in a wood-fired oven. The traditional loaves — the bol, the kababs (sweet bread), and the pai — are still made using the same traditional recipe brought by the Portuguese. The entire village wakes to the baker's sound.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Why are the bakers of Goa called 'paders'? What is the significance of their traditional role?",
    answer: "The bakers are called 'paders', a name derived from the Portuguese word for bread-maker, reflecting the Portuguese influence on Goan culture. Their role is deeply embedded in Goan social life — no celebration is complete without bread. The baker is essential to weddings, engagements, and festivals. The pader's trade has been passed down through generations, preserving a Portuguese colonial legacy in modern Goa.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What is the significance of the coorg people's account of their origin?",
    answer: "The Coorgis claim descent either from Greek or Arabic soldiers who settled in the region long ago. This theory of origin, while unverified historically, reflects the Coorgis' pride in their distinct identity and martial heritage. Their customs — particularly the way they drape their distinctive coorg dress (kuppia) from the right side — are said to differ from all other communities in India, giving them a unique and independent cultural identity.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the narrator describe the natural beauty of Coorg?",
    answer: "Coorg is described as a land of rolling hills covered in coffee plantations and spice gardens. It is the land of the Kodavas, India's most celebrated warrior clan. The misty mountains, the rushing River Kaveri which originates here, and the thick forests with elephants, kingfishers and otters make it a place of breathtaking natural beauty. The author describes it as a piece of heaven that must have drifted to Earth.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "What special qualities distinguish the Coorg people according to the author?",
    answer: "The Coorgi people are known for their fiercely independent spirit, their hospitality and their martial traditions. They are the only community allowed to carry firearms without a licence as recognition of their military service to the nation. General Carriappa, one of India's first Army Chiefs, was from Coorg. Their women are known for their beauty and the men for their courage and loyalty to the Indian Army.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe the tea gardens of Assam as presented in the chapter.",
    answer: "The Assam narrative describes the tea gardens that spread across the countryside in lush green layers. Tea is Assam's most famous product and the tea gardens are a visual spectacle — bright green against the dark hills. The Brahmaputra river, which flows through Assam, is described as a river that holds stories of the region's history. The narrator describes river dolphins and the unique natural ecosystem associated with Assam.",
    year: 2022, marks: 2, difficulty: "easy",
  },
  {
    question: "How does the chapter 'Glimpses of India' celebrate the diversity of India?",
    answer: "The chapter brings together three distinct narratives — from Goa, Coorg and Assam — each showcasing a different face of India. Goa's Portuguese heritage and love of bread, Coorg's martial traditions and natural beauty, and Assam's tea culture and river life all reflect how India's different regions have developed unique identities and traditions. Together, they celebrate India's unity in diversity — three different stories from one country.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "What is the significance of the baker's morning visit in the Goa narrative?",
    answer: "The baker's morning visit is not just a delivery of bread — it is a deeply rooted social ritual. The sound of his bamboo staff brings joy and anticipation, especially to children who run to get the bread. His presence connects past and present — the Portuguese tradition of bread-making continued in modern India. His arrival marks the start of the Goan day and represents cultural continuity across generations.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the narrator describe the mystery and beauty of Coorg's landscape?",
    answer: "Coorg is shrouded in mist and mystery. The author describes it as a place that calls the imagination — its forests are full of wildlife, its rivers tumble through rocky gorges, and the air is thick with the scent of spices. The Brahmagiri hills provide a mystical backdrop. Even the origin story of its people is shrouded in mystery, adding to the romantic and legendary quality of the region.",
    year: 2019, marks: 2, difficulty: "easy",
  },
  {
    question: "Why does the author say that the best season to visit Coorg is September to March?",
    answer: "September to March is the dry season in Coorg, after the monsoon rains have washed the hills clean. The coffee blossoms fill the air with jasmine-like fragrance, the rivers are clear and full, and the wildlife is active. The misty, cool weather makes it perfect for trekking, rafting and birdwatching. The narrator recommends this period as offering the most beautiful and comfortable experience of Coorg's natural splendour.",
    year: 2023, marks: 2, difficulty: "easy",
  },
  {
    question: "What does the mention of General Carriappa add to the portrait of Coorg?",
    answer: "General K.M. Carriappa, independent India's first Commander-in-Chief of the Army, was from Coorg. His mention validates the author's claim that Coorg has produced India's greatest military heroes. It gives the narrative authority and pride — the tiny region of Coorg has punched far above its weight in contributing to the nation's defence. It also shows that the Coorgis' warrior tradition is not merely historical but has continued into modern India.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How does bread function as a cultural symbol in the Goa narrative?",
    answer: "Bread in Goa is not just food — it is a social institution. No wedding, engagement, feast or religious celebration is complete without the local bread. The different types of Goan bread — each with its own name and occasion — reflect the deep integration of bread into Goan culture. The survival of traditional bread-making centuries after Portuguese rule ended shows how food becomes a carrier of cultural memory and identity.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How is the Brahmaputra river important to the Assam narrative?",
    answer: "The Brahmaputra is the soul of Assam — it defines the region's geography, history and culture. The author describes it as one of the world's great rivers, crossing multiple countries and sustaining an entire civilisation. The river brings both life (fertile plains, fish, water) and danger (seasonal floods). It is also home to unique wildlife like the Gangetic river dolphins. The Brahmaputra is as much a character in the Assam narrative as a geographical feature.",
    year: 2020, marks: 2, difficulty: "easy",
  },
  {
    question: "Compare the different cultural traditions highlighted in 'Glimpses of India'.",
    answer: "The three narratives highlight distinct traditions: Goa's bread-making culture, rooted in Portuguese colonial history, shows how food carries cultural memory. Coorg's martial traditions and unique dress reflect the pride of a warrior community with a mysterious origin. Assam's tea culture and relationship with the Brahmaputra reflect how geography shapes identity. Together they illustrate how India's diversity is rooted in both history and geography.",
    year: 2019, marks: 5, difficulty: "hard",
  },
  {
    question: "How does the author use sensory details to bring the three regions to life?",
    answer: "The Goa passage uses sound (the jingle of the baker's staff) and taste (the warm bread). The Coorg passage uses sight (mist, green hills, coffee blossoms) and smell (the scent of spices and jasmine-like coffee flowers). The Assam passage uses sight (the green tea gardens, the wide river) and the sense of scale (the vast, ancient Brahmaputra). The use of sensory detail makes each region vivid and immediate for the reader.",
    year: 2023, marks: 5, difficulty: "hard",
  },
];

const glimpsesEasy = [
  { q: "What is the Goan baker traditionally called?", opts: ["Pao", "Pader", "Baker", "Kader"], ans: 1, exp: "The Goan baker is called a 'pader', a word derived from the Portuguese, reflecting the Portuguese colonial influence on Goan bread-making culture." },
  { q: "What instrument did the baker use to announce his arrival?", opts: ["A drum", "A bell", "A bamboo staff that he struck on the ground", "A whistle"], ans: 2, exp: "The baker announced his arrival by the musical sound of his bamboo staff being struck while walking, which woke the village." },
  { q: "Which country's colonial influence introduced bread-making to Goa?", opts: ["England", "France", "Portugal", "Spain"], ans: 2, exp: "Bread-making in Goa is a legacy of Portuguese colonial rule. The tradition has survived for centuries after Portugal left." },
  { q: "Where does the River Kaveri originate?", opts: ["Assam", "Coorg", "Goa", "Kerala"], ans: 1, exp: "The River Kaveri originates in the hills of Coorg (Kodagu) in Karnataka." },
  { q: "What is the traditional dress of the Coorgis called?", opts: ["Dhoti", "Kuppia", "Lungi", "Saree"], ans: 1, exp: "The traditional Coorgi dress is called the 'kuppia' — it is draped differently from similar garments, which Coorgis attribute to their unique Greek or Arab origin." },
  { q: "Which community is the only one in India allowed to carry firearms without a licence?", opts: ["The people of Assam", "The people of Coorg", "The people of Goa", "The Sikhs"], ans: 1, exp: "As a mark of respect for their extraordinary military contributions, the Coorgis are allowed to carry firearms without a licence." },
  { q: "Who was General Carriappa?", opts: ["The first President of India", "Independent India's first Army Chief of Staff", "A Goan freedom fighter", "The Prime Minister of India"], ans: 1, exp: "Field Marshal K.M. Carriappa was independent India's first Commander-in-Chief of the Army, and he was from Coorg." },
  { q: "Which river is described in the Assam narrative?", opts: ["Ganga", "Yamuna", "Brahmaputra", "Godavari"], ans: 2, exp: "The Brahmaputra river, which flows through Assam, is a central geographical and cultural element in the Assam narrative." },
  { q: "What is Assam's most famous product associated with its landscape?", opts: ["Silk", "Rice", "Tea", "Spices"], ans: 2, exp: "Assam is world-famous for its tea, and the lush green tea gardens spread across its landscape define both its economy and its visual identity." },
  { q: "What does 'Glimpses of India' aim to show the reader?", opts: ["The political history of India", "The diversity of Indian culture, landscape and tradition through three regional narratives", "The problems of India", "The cuisine of India"], ans: 1, exp: "The chapter presents three short narratives — from Goa, Coorg and Assam — to celebrate the rich cultural and geographical diversity of India." },
  { q: "What wildlife is mentioned as inhabiting the forests of Coorg?", opts: ["Lions and tigers", "Elephants, kingfishers and otters", "Monkeys and deer", "Leopards and wolves"], ans: 1, exp: "The text mentions elephants, kingfishers and otters as part of Coorg's rich forest ecosystem." },
  { q: "The Coorgis claim descent from soldiers of which two civilisations?", opts: ["Roman and Persian", "Greek and Arabic", "Mughal and British", "Dravidian and Aryan"], ans: 1, exp: "One theory about the Coorgi origin is that they descend from Greek soldiers who came with Alexander and Arabic soldiers who settled in the region long ago." },
  { q: "What is the Portuguese-influenced Goan bread shaped like a bun called?", opts: ["Bol", "Kadak pao", "Pai", "Savoury roll"], ans: 2, exp: "The 'pai' is a traditional Goan bread, a Portuguese legacy. The 'bol' is the sweet bread. Both are part of the unique Goan bread tradition." },
  { q: "What makes the best time to visit Coorg according to the text?", opts: ["June to August for the monsoon", "September to March for dry, cool weather and coffee blossoms", "April and May for summer heat", "December only for Christmas"], ans: 1, exp: "September to March is recommended as the best time to visit Coorg — the monsoon is over, the landscape is fresh, the coffee is in blossom, and the weather is cool." },
  { q: "In which state of India is Coorg located?", opts: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"], ans: 2, exp: "Coorg (Kodagu) is a district in the Western Ghats region of Karnataka, known for its coffee plantations and natural beauty." },
];

const glimpsesMedium = [
  { q: "Why does the author say that 'any time of the year is a good time to be in Goa'? What does this reveal about Goa?", opts: ["Because Goa has no problems", "Because Goa's warmth, culture, food and festivity make it welcoming in every season", "Because the weather is always perfect", "Because it is a tourist destination"], ans: 1, exp: "The phrase suggests that Goa's appeal lies not just in its weather but in its vibrant culture, warmth and festivity — qualities that transcend season." },
  { q: "How does the bread-making tradition in Goa reflect the concept of cultural retention?", opts: ["Goans prefer Portuguese food to Indian", "A colonial-era tradition was absorbed into and became integral to indigenous culture, surviving independence", "The Portuguese are still present in Goa", "Goa rejected all other Indian food traditions"], ans: 1, exp: "The Portuguese introduced bread; Goans made it their own. Centuries after Portuguese rule ended, the tradition is still alive because it was genuinely absorbed into Goan life rather than merely imposed." },
  { q: "What does the phrase 'a piece of heaven that must have drifted to Earth' suggest about Coorg?", opts: ["Coorg is fictional", "It uses hyperbolic metaphor to convey the extraordinary natural beauty and peace of Coorg", "The author believes in mythology", "Coorg is literally paradise"], ans: 1, exp: "It is a poetic hyperbole — the author uses the language of divinity to capture how breathtakingly beautiful Coorg is. The image of heaven drifting to Earth conveys a perfection that seems beyond the ordinary natural world." },
  { q: "How does the Coorgi origin story function within the narrative?", opts: ["It provides historical facts", "It adds romantic mystery and reinforces Coorgi pride in their distinctiveness and martial heritage", "It distracts from the main theme", "It is meant to be taken literally"], ans: 1, exp: "The origin story — whether Greek or Arabic ancestry — is not presented as historical fact but as cultural mythology. It serves to reinforce the Coorgis' sense of being different, special, and proudly independent." },
  { q: "What does the author mean by calling the Coorgis 'India's most fiercely independent people'?", opts: ["They voted against Indian independence", "They have historically resisted central authority and maintained their distinct culture and traditions tenaciously", "They are rude to outsiders", "They want to secede from India"], ans: 1, exp: "The Coorgis have maintained their unique culture, dress, traditions and identity despite centuries of change around them. Their 'independence' is cultural and spiritual — a fierce pride in who they are." },
  { q: "How does the Assam narrative use the Brahmaputra to represent the spirit of the region?", opts: ["The river represents danger and flooding", "The Brahmaputra is portrayed as Assam's life force — vast, ancient, and central to its identity, history and ecology", "The river is just a geographical feature", "The author is not interested in the river"], ans: 1, exp: "The Brahmaputra is used as a symbol of Assam's soul — its ancient presence, its power to sustain and threaten, its role in history and culture. Rivers often function as metaphors for civilisational identity in Indian literature." },
  { q: "What is the significance of the Goan children running to the baker before the adults?", opts: ["Children were allowed out first", "It shows the baker's visit was a joyful ritual — the children's excitement captures the cultural and emotional importance of the bread tradition", "Children were responsible for buying bread", "It is an insignificant detail"], ans: 1, exp: "The children's excitement at the baker's arrival shows that the bread tradition is not just practical but emotionally significant. It is a daily ritual of joy — the children's response captures its cultural warmth." },
  { q: "Compare how the three parts of 'Glimpses of India' each use a different 'entry point' into their region's culture.", opts: ["All three use food as entry point", "Goa uses food (bread), Coorg uses people/history (warrior tradition), Assam uses geography (river and tea gardens)", "All three use geography", "Goa uses history, Coorg uses food"], ans: 1, exp: "Each narrator enters their region through a different lens — food, people/history, and geography. This variety enriches the chapter and shows that Indian diversity can be accessed through multiple cultural dimensions." },
  { q: "What does the description of the baker's physical appearance (stout, in a peculiar attire) add to the narrative?", opts: ["It is irrelevant", "It creates a vivid, affectionate portrait that suggests the baker is a beloved local character — almost a mascot of Goan bread culture", "It is meant to mock the baker", "It shows the baker was poor"], ans: 1, exp: "The affectionate, detailed portrait of the baker makes him a living embodiment of the tradition he carries. His distinctive appearance makes the cultural tradition personal and tangible." },
  { q: "Why does the author include the detail that the Coorgis' hospitality is 'legendary'?", opts: ["To attract tourists", "To contrast with their fierce martial reputation — showing that courage and warmth coexist in the Coorgi character", "Because all South Indians are hospitable", "To show they are good at business"], ans: 1, exp: "Combining warrior fierceness with legendary hospitality creates a nuanced, fully human portrait of the Coorgis. The two qualities together — strength and warmth — make them compelling and admirable rather than just intimidating." },
  { q: "How does 'Glimpses of India' function as a celebration of Indian pluralism?", opts: ["By showing three regions that are all the same", "By presenting three very different regions, each with unique heritage, showing that India's strength is in its diversity", "By arguing one region is better than others", "By showing that all Indians eat the same food"], ans: 1, exp: "The three narratives — Goa, Coorg, Assam — are deliberately chosen for their differences. Together they form a mosaic that says: India is this, and also this, and also this. The variety itself is the celebration." },
  { q: "What does the mention of rafting, trekking and birdwatching activities in Coorg suggest about how the author views the region?", opts: ["As a commercial adventure zone", "As a place where nature is rich enough to offer adventure, contemplation and discovery — a complete natural experience", "As a sports destination only", "As dangerous terrain"], ans: 1, exp: "These activities suggest that Coorg's nature is active and immersive, not merely scenic. The author sees it as a place where humans can genuinely engage with the natural world — an experience rather than just a view." },
  { q: "Why is it significant that the Assam narrator mentions one-horned rhinoceroses?", opts: ["To show Assam is dangerous", "To establish Assam's ecological uniqueness — the one-horned rhino is found almost exclusively there, making it a symbol of Assam's irreplaceable biodiversity", "Because rhinos are common in India", "As a tourist attraction"], ans: 1, exp: "The one-horned rhinoceros is India's most endangered large mammal and is almost exclusively found in Assam's Kaziranga National Park. Its mention signals Assam's unique ecological heritage and the importance of its conservation." },
  { q: "The author begins the Goa narrative with the image of the baker's morning visit. What is the narrative effect of this opening?", opts: ["It is a random detail", "It plunges the reader into the sensory and cultural life of Goa immediately — a concrete, lived experience that makes the region feel real and warm", "It introduces the main character", "It establishes the geography of Goa"], ans: 1, exp: "Opening with the baker's morning round immerses the reader in daily Goan life. It is intimate, sensory and culturally specific — exactly the kind of detail that brings a place to life more effectively than any description of geography." },
  { q: "How does the phrase 'the scent of rain-washed earth' function in describing Coorg?", opts: ["It is a factual description of weather", "It is a sensory metaphor for freshness, vitality and the organic richness of Coorg's natural environment", "It describes flooding", "It is a cliché"], ans: 1, exp: "The phrase uses smell — the most evocative of senses — to convey Coorg's aliveness. Rain-washed earth suggests renewal, freshness and organic richness. It makes the landscape feel alive and breathing." },
  { q: "What does the chapter 'Glimpses of India' suggest about the relationship between history and regional identity?", opts: ["History is unimportant to regional identity", "Each region's identity is shaped by its history — colonial, martial, ecological — which continues to live in present-day customs, food and traditions", "Regional identity is purely geographical", "History destroys regional identity"], ans: 1, exp: "All three narratives show how history shapes present-day identity. Goa's bread is Portuguese history; Coorg's culture is warrior history; Assam's identity is tied to the Brahmaputra's ancient geological and cultural history. The present is always the child of the past." },
];

const glimpsesHard = [
  { q: "ASSERTION: The Goa narrative uses food as a vehicle for cultural memory.\nREASON: The baker's bread tradition, introduced by the Portuguese, survives because it was organically integrated into Goan social rituals.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. Food is a cultural carrier because it is embedded in daily life and ritual. The bread survived not because it was forced but because it became genuinely Goan — integrated into weddings, festivals and daily life." },
  { q: "CASE-BASED: A student argues that the three parts of 'Glimpses of India' should not be in the same chapter because they are unrelated. How would you counter this?", opts: ["The student is correct — they are unrelated", "They are unified by the theme of India's regional diversity — each part is a different facet of the same jewel, showing India's unity in diversity", "They are related because they are all in South India", "They are related because they all describe rivers"], ans: 1, exp: "The three narratives are related by design — each one is a window into a different face of India. Together they argue that India's richness lies in the variety of its regional cultures, making the structure itself a thematic statement about unity in diversity." },
  { q: "EXTRACT: 'The Coorgis are known for their hospitality and their great fighting spirit.' What rhetorical purpose does this pairing serve?", opts: ["It is a simple list of facts", "It humanises the warrior image — showing that courage and warmth are compatible; the Coorgi is complete as a human, not merely a soldier", "It is used to attract tourists", "It creates a contradiction"], ans: 1, exp: "Pairing hospitality with fighting spirit is a rhetorical technique that creates a full human portrait. The warrior is also a host. This completeness makes the Coorgi community admirable and relatable, not just impressive." },
  { q: "ASSERTION: The Assam passage uses the Brahmaputra to explore ideas of time and continuity.\nREASON: The river is ancient, has witnessed centuries of history, and continues to flow — connecting past and present.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and the reason accurately explains how the Brahmaputra functions symbolically. The river is a metaphor for continuity across time — it witnessed Assam's ancient past and continues in the present, making it a symbol of cultural and natural permanence." },
  { q: "EXTRACT-BASED: 'Only 1 or 2 % of South India's original forests remain.' In the context of the Coorg narrative, what is the author implying?", opts: ["Coorg is one of the last refuges of original forest, making its conservation morally urgent", "Forests are not important in Coorg", "South India has too many forests", "The author is giving a statistics lesson"], ans: 0, exp: "The statistic lends urgency to the description of Coorg's forests. If only 1-2% of original forests remain, Coorg's biodiversity is not just beautiful — it is rare and threatened. The author implies a moral responsibility to protect it." },
  { q: "CASE-BASED: If you were to write a fourth part to 'Glimpses of India', using the pattern established by the chapter, which elements would be essential?", opts: ["A famous city description", "A specific sensory entry point, a unique cultural tradition, a connection to history, and a sense of regional pride and identity", "A political analysis of the region", "Famous food recipes from the region"], ans: 1, exp: "The pattern established in the chapter requires: a sensory anchor (bread, mist, tea gardens), a cultural or historical specificity, a human element (baker, Coorgi warrior, Assamese fisherman), and a sense of how the region's past lives in its present." },
  { q: "The three narrators of 'Glimpses of India' share a common emotional tone. What is it?", opts: ["Nostalgia and sadness", "Pride, affection and wonder at the richness of their own regions", "Academic detachment", "Critical analysis of regional problems"], ans: 1, exp: "Each narrator speaks of their region with affection and pride — the Goan loves his bread, the Coorgi writer celebrates warriors, the Assamese narrator marvels at the Brahmaputra. The common tone is loving pride." },
  { q: "ASSERTION: 'Glimpses of India' is structured as a travelogue.\nREASON: All three narratives describe journeys made by the narrators to the three regions.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 2, exp: "The assertion is partly true — the chapter has travelogue-like qualities. But the reason is false — the Goa narrator writes from within Goa as a local, not as a traveller. The Coorg section reads as travel writing, but the structure is a collage of perspectives, not a single journey." },
  { q: "How does each of the three sections use a specific 'cultural hero' to represent the region?", opts: ["None of them use cultural heroes", "Each uses a representative figure: the pader (Goa), General Carriappa/the Coorgi warrior (Coorg), the elephant (Assam)", "All three use rivers as cultural heroes", "All three use food as cultural heroes"], ans: 1, exp: "Each section has an emblematic figure: the pader embodies Goa's bread culture; the Coorgi warrior (exemplified by Carriappa) embodies Coorg's martial heritage; the elephant or the mahout represents Assam's relationship with its natural world." },
  { q: "What does the chapter suggest about the relationship between landscape and human character?", opts: ["Landscape has no effect on character", "Each region's landscape has shaped its people — Coorg's highlands shaped warriors; Assam's rivers shaped fishermen and farmers; Goa's coastline shaped traders", "All Indians have the same character regardless of landscape", "The author does not connect landscape and character"], ans: 1, exp: "The chapter implicitly argues that landscape shapes identity. Coorg's misty highlands bred self-reliant warriors; Assam's great river bred people attuned to nature's power; Goa's coastal openness bred traders and cultural adapters. Environment and character are linked." },
  { q: "EXTRACT: 'The Brahmaputra, as if trying to make amends for its unruly behaviour, graciously spreads out.' What literary device is used?", opts: ["Simile", "Alliteration", "Personification — the river is given human moral qualities (making amends, graciousness)", "Metaphor"], ans: 2, exp: "Personification gives the Brahmaputra human moral qualities — it 'makes amends' for its floods as a person might apologise for unruly behaviour. This makes the river feel like a character, deepening the sense that it is a living presence in Assam's story." },
  { q: "CASE-BASED: A student says the chapter glorifies regional identity in a way that might encourage division. How does the text actually navigate regional pride and national unity?", opts: ["The text does encourage division", "The text celebrates regional distinctiveness as part of a unified national identity — diversity is presented as India's strength, not as a threat to unity", "The text ignores national identity", "The text discourages regional pride"], ans: 1, exp: "The chapter's entire structure argues that India IS its regions — its strength comes from diversity. By celebrating Goa, Coorg and Assam together in one chapter, it presents regional pride as compatible with national identity, not opposed to it." },
  { q: "How does the use of second-person address ('you') in the Coorg section differ rhetorically from the first-person used in the Goa section?", opts: ["There is no difference", "Second person ('you') directly invites the reader into the experience, making the description more immediate and personal than the observational first-person narration of Goa", "Second person is less intimate", "First person is more formal"], ans: 1, exp: "The shift to second person 'you' in the Coorg section makes it feel like an invitation — the reader is addressed directly, drawn into the landscape. The Goa section's first person creates a nostalgic, insider perspective. Both are effective but differently positioned." },
  { q: "ASSERTION: The three narratives in 'Glimpses of India' all engage with the theme of time and cultural continuity.\nREASON: All three show how ancient traditions survive in the modern world.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The bread tradition survives; the Coorgi warrior heritage is alive in the modern army; the Brahmaputra continues to shape Assamese life. The chapter's deepest theme is how the ancient persists in the present." },
  { q: "Which of the following best describes the author's overall purpose in writing 'Glimpses of India'?", opts: ["To promote tourism in three states", "To argue that India's cultural and natural diversity is its greatest treasure and deserves to be known and celebrated", "To teach geography", "To compare the three regions"], ans: 1, exp: "The chapter's purpose is celebratory and nationalist in the best sense — it says: look at what India is. Its cultural and natural diversity, preserved across centuries, is a treasure that belongs to all Indians and deserves to be known and cherished." },
  { q: "How does the chapter use the motif of 'survival' to unify its three parts?", opts: ["It shows that all three regions have survived natural disasters", "Each part celebrates something that has survived against change: the bread tradition (Goa), the warrior culture (Coorg), the ancient ecosystem (Assam)", "The motif of survival is not present", "It shows people surviving poverty"], ans: 1, exp: "Survival is the hidden thread: the pader's trade has survived colonial departure; the Coorgi culture has survived centuries of change; the Brahmaputra's ecosystem has survived human encroachment. All three celebrate resilience and continuity." },
];

// ─────────────────────────────────────────────────────────────
//  MIJBIL THE OTTER  (slug: mijbil-the-otter)
// ─────────────────────────────────────────────────────────────

const mijbilPYQs = [
  {
    question: "What was the author's first encounter with Mijbil like? How did Mijbil behave initially?",
    answer: "The author, Gavin Maxwell, received Mijbil as a small otter from a friend travelling to Basra. For the first 24 hours, Mijbil was sullen, cold and indifferent — he ignored Maxwell and showed no interest in any interaction. But by the next morning Mijbil had transformed — he was playing in the bath, performing acrobatics and had clearly decided to trust Maxwell. The shift was sudden and total.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Mijbil spend his first night at the author's home? What does this reveal about his character?",
    answer: "During the night, Maxwell woke to find his bed soaking wet. Mijbil had somehow turned on the bath tap, splashed water all over the bathroom and floor, and then explored the room. This incident revealed Mijbil's extraordinary intelligence, curiosity and love of water. It also showed his playful, independent spirit — he found his own entertainment without needing Maxwell's involvement.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe the journey of Mijbil from Basra to London. What difficulties did Maxwell face?",
    answer: "The journey from Basra to Paris involved air travel, which was extremely stressful. Mijbil was supposed to be boxed for travel — the airline regulations required a small box. But Mijbil managed to escape the box during the flight and ran loose in the aircraft, causing panic among passengers. A fellow passenger with a sewing kit helped Maxwell recapture Mijbil. The journey was exhausting, comic and stressful in equal measure.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "What was Maxwell's reaction when he first saw Mijbil? How did he describe otters?",
    answer: "Maxwell initially had no specific plan to keep an otter but was happy to receive Mijbil. He described otters as belonging to a 'comparatively small group' of animals that have been little known as pets. He had never owned an otter before and was not sure what to expect. He found Mijbil mesmerising — noting his coat of small, deep-brown fur and his love of water. Over time, he considered Mijbil one of the most interesting and intelligent companions he had ever had.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Mijbil invent games for himself? Give examples.",
    answer: "Mijbil was highly inventive in creating his own entertainment. He discovered that a rubber ball could be rolled along the inside of a curved sofa and would return to him — he played this game for hours without human participation. He also invented a game with a rubber ball on a slanted surface. His ability to invent and repeat games showed a level of abstract play more typically associated with humans than with animals.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did Maxwell decide to keep an otter as a pet?",
    answer: "Maxwell had recently lost a pet he cherished and a friend suggested he should get a new pet — specifically an otter, since they were in a region (Basra, Iraq) where otters lived in the Tigris-Euphrates marshes. Maxwell did not deliberately decide to get an otter; it came about almost accidentally. However, once Mijbil arrived, Maxwell was captivated by the otter's personality, intelligence and affection.",
    year: 2022, marks: 2, difficulty: "easy",
  },
  {
    question: "How did Mijbil behave in the bathtub? What does this reveal about his nature?",
    answer: "Mijbil was enchanted by water. In the bathtub he would lie on his back with his nose just above the surface, then swirl around and play acrobatic games with the water. He rolled in it, splashed it and spent hours in the bath. This behaviour reveals his fundamental nature as a water-loving mammal — bathing and swimming are not mere activities for him but expressions of his deepest instincts and greatest joy.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How did people on the streets of London react to Mijbil?",
    answer: "People in London were fascinated and puzzled by Mijbil. Most had never seen an otter before and could not identify him. Maxwell received a remarkable variety of guesses: a baby seal, a hippo, a squirrel, a walrus, a beaver. One man simply identified him as a 'sort of a dog, isn't it?' The variety of responses amused Maxwell and showed how exotic Mijbil was to city-dwellers.",
    year: 2020, marks: 2, difficulty: "easy",
  },
  {
    question: "What is the significance of the species being named 'Maxwell's otter' after the author?",
    answer: "When the otter was sent to a zoologist for identification, it was discovered to be a new and previously unknown sub-species. It was subsequently named 'Lutrogale perspicillata maxwelli' — Maxwell's otter — in the author's honour. This gives the chapter an extra dimension: Maxwell's relationship with Mijbil contributed to science by revealing a species previously unknown to taxonomy. The otter who was a personal companion became part of the scientific record.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Mijbil react to the aircraft during the journey from Basra?",
    answer: "Mijbil had been packed in a small box for the flight, as airline rules required. However, he managed to break out of the box and went berserk in the aircraft, running under seats and terrifying passengers. Maxwell himself was exhausted and embarrassed. Finally a kind lady with a sewing kit helped catch Mijbil and he was returned to the box, now thoroughly dishevelled. The episode was chaotic and stressful for everyone involved.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "What were the airline's rules regarding transporting Mijbil? Why did they cause problems?",
    answer: "The airline required that all pets be confined in a small box no larger than a specific size, and the box had to be stowed as luggage — not in the cabin. Maxwell was expected to have the otter boxed and submitted an hour before departure. He arrived just one minute before boarding. The tight space and stress of the box caused Mijbil enormous distress, leading to his escape. The rigid rules were designed for ordinary pets and could not anticipate the ingenuity of an otter.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How does Maxwell describe Mijbil's intelligence?",
    answer: "Maxwell describes Mijbil as one of the most intelligent animals he has ever known. He notes Mijbil's ability to invent games, his speed of learning, his ability to interact with his environment creatively, and his extraordinary adaptability. Mijbil's ability to turn on a tap, invent ball games and navigate complex new environments (like an aircraft) all point to a level of problem-solving and curiosity that Maxwell found astonishing.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe the otter's coat and physical appearance as described by Maxwell.",
    answer: "Maxwell describes Mijbil's coat as rich, deep brown fur, smooth and close-fitting, with a texture like the finest velvet. The otter's head was broad, with a wide, flat muzzle, small neat ears and whiskers. His eyes were expressive and curious. His body was streamlined for swimming, with webbed feet. Overall, Maxwell's description conveys both the physical beauty of the otter and his adaptive design as a semi-aquatic mammal.",
    year: 2020, marks: 2, difficulty: "easy",
  },
  {
    question: "What was the relationship between Maxwell and Mijbil like?",
    answer: "The relationship deepened from initial indifference (on Mijbil's side) to deep attachment. Mijbil chose Maxwell, transferring complete trust and affection once he decided to accept him. Maxwell, in turn, became devoted to the otter — he modified his life to accommodate Mijbil's needs, took him on journeys, and ultimately contributed to science through their relationship. It was a genuine bond of mutual trust, affection and respect between a human and a wild animal.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How does Gavin Maxwell's narrative style contribute to the appeal of 'Mijbil the Otter'?",
    answer: "Maxwell writes with warmth, humour and precision. His affection for Mijbil is evident in every detail — from descriptions of the otter's bath antics to the chaos of the flight. He uses comic observation (the variety of guesses about what Mijbil was) alongside genuine wonder (the otter's intelligence and beauty). His precise, nature-writer's prose — detailed and sensory — makes Mijbil vivid and real. The blend of love, science and humour is characteristic of the best nature writing.",
    year: 2023, marks: 5, difficulty: "hard",
  },
];

const mijbilEasy = [
  { q: "Who is the author of 'Mijbil the Otter'?", opts: ["Jim Corbett", "Gerald Durrell", "Gavin Maxwell", "Peter Scott"], ans: 2, exp: "Gavin Maxwell was a Scottish naturalist and author who wrote about his experience with Mijbil in his book 'Ring of Bright Water' (1960)." },
  { q: "Where did the author get Mijbil?", opts: ["A pet shop in London", "The Tigris-Euphrates marshes in Iraq/Basra", "A zoo in Paris", "A friend in Scotland"], ans: 1, exp: "Mijbil came from the Tigris-Euphrates delta region in Iraq, near Basra, where otters live in the marshes." },
  { q: "What type of animal was Mijbil?", opts: ["A seal", "A mongoose", "An otter", "A beaver"], ans: 2, exp: "Mijbil was an otter — specifically, a species later identified as a new sub-species named 'Lutrogale perspicillata maxwelli'." },
  { q: "How did Mijbil behave when Maxwell first brought him home?", opts: ["He was immediately playful and friendly", "He was curious and explored everywhere", "He was sullen, indifferent and cold for 24 hours", "He was frightened and hid"], ans: 2, exp: "For the first 24 hours, Mijbil was completely unresponsive and indifferent. He ignored Maxwell and showed no interest in interaction." },
  { q: "What did Maxwell discover when he woke on the second morning?", opts: ["Mijbil was gone", "Mijbil had turned on the bath tap and flooded the bathroom", "Mijbil had eaten all his food", "Mijbil had destroyed the furniture"], ans: 1, exp: "Mijbil had turned on the bath tap, splashed water all over the room, and thoroughly soaked the floor — discovering his love of water independently." },
  { q: "What new sub-species was named after Maxwell?", opts: ["Lutra lutra maxwelli", "Lutrogale perspicillata maxwelli", "Lontra canadensis maxwelli", "Aonyx maxwelli"], ans: 1, exp: "When identified by a zoologist, Mijbil was found to be a new sub-species, named 'Lutrogale perspicillata maxwelli' — Maxwell's otter." },
  { q: "How did Mijbil travel from Basra to London?", opts: ["By ship", "By road", "By air, in a small box", "By train"], ans: 2, exp: "Mijbil travelled by air. Airline regulations required him to be confined in a small box, which he subsequently escaped from during the flight." },
  { q: "What game did Mijbil invent with a rubber ball?", opts: ["Throwing it against the wall", "Balancing it on his nose", "Rolling it along the inside of a curved sofa so it returned to him", "Chasing it in a circle"], ans: 2, exp: "Mijbil discovered he could roll a rubber ball along the inside curve of a soapstone sofa and it would roll back to him — he played this game repeatedly and independently." },
  { q: "How did people on London streets typically react to Mijbil?", opts: ["They ignored him", "They were frightened of him", "They were fascinated and offered various wrong guesses about what he was", "They recognised him as an otter"], ans: 2, exp: "London residents had never seen an otter and offered a range of wrong identifications — seal, hippo, walrus, squirrel, beaver, and 'sort of a dog'." },
  { q: "Where does Mijbil like to spend his time most?", opts: ["Sleeping", "Climbing trees", "In or near water", "Running in open fields"], ans: 2, exp: "Mijbil, like all otters, was deeply drawn to water. He spent hours in the bath and was happiest when near or in water." },
  { q: "Why was Maxwell late to the airport for the Basra-Paris flight?", opts: ["His car broke down", "He was searching for Mijbil who had been left behind", "He was packing", "He missed the taxi"], ans: 1, exp: "Maxwell arrived only one minute before departure because he was trying to get Mijbil into the required box and could not find the otter in time. The whole process was chaotic." },
  { q: "What was the colour and texture of Mijbil's coat?", opts: ["Grey and rough", "Black and shiny", "Brown and smooth like velvet", "Brown and thick like fur"], ans: 2, exp: "Maxwell describes Mijbil's coat as a rich, deep brown with a smooth, velvet-like texture — beautiful and close-fitting." },
  { q: "What creature did Maxwell describe Mijbil as belonging to scientifically?", opts: ["Marsupials", "The Mustelid family", "Rodents", "Pinnipeds"], ans: 1, exp: "Otters belong to the family Mustelidae, which also includes weasels, stoats and badgers." },
  { q: "Who helped Maxwell catch Mijbil on the aircraft?", opts: ["A stewardess", "Another otter owner", "A woman with a sewing kit", "A pilot"], ans: 2, exp: "A kind woman passenger with a sewing kit helped Maxwell recapture Mijbil after he escaped from his box and ran loose in the aircraft." },
  { q: "What does Maxwell say is the best description of Mijbil's intelligence?", opts: ["He was as smart as a dog", "He was comparable to a three-year-old human child", "He was one of the most intelligent animals he had known", "He was intelligent but stubborn"], ans: 2, exp: "Maxwell describes Mijbil as among the most intelligent animals he had encountered — capable of inventing games, learning quickly and solving problems creatively." },
];

const mijbilMedium = [
  { q: "What does Mijbil's 24-hour indifference followed by complete trust reveal about animal psychology?", opts: ["Animals are always slow to trust", "It suggests animals make deliberate decisions about trust — Mijbil assessed Maxwell before committing, showing an evaluative intelligence", "Mijbil was scared of Maxwell", "It shows otters are unfriendly animals"], ans: 1, exp: "The sudden shift from total indifference to complete trust suggests Mijbil made a conscious 'decision' to trust Maxwell. This evaluative process implies a level of deliberate social intelligence unusual in most animals." },
  { q: "How does Mijbil's invention of the ball game demonstrate a uniquely human-like quality?", opts: ["It shows he was trained well", "Abstract play — inventing a game for its own sake without survival value — is a quality rarely observed in animals and is associated with higher intelligence", "Animals often invent games", "It shows he was bored"], ans: 1, exp: "Abstract play is the hallmark of a sophisticated mind. Mijbil's ball game has no survival value — it exists purely for the pleasure of the game. This mirrors how humans play, suggesting a level of cognitive sophistication rare in the animal world." },
  { q: "Why does Maxwell emphasise that Mijbil's species was previously unknown to science?", opts: ["To boast about his discovery", "To show that the natural world is still full of unknown creatures and that personal relationships with animals can contribute to scientific knowledge", "Because it makes Mijbil seem rarer", "Because it is legally important"], ans: 1, exp: "The scientific discovery adds a layer of significance to the personal story. Maxwell's companionship with Mijbil led to the identification of a new species — showing that naturalists who live closely with animals often discover what laboratory scientists cannot." },
  { q: "How does Maxwell use humour in describing the aircraft incident?", opts: ["He is angry throughout", "He uses comic self-deprecation (his own humiliation) and absurdist detail (passengers' reactions) to lighten a genuinely stressful event", "He does not use humour", "He blames Mijbil throughout"], ans: 1, exp: "Maxwell describes the chaos with good-humoured self-awareness — his own exhaustion and embarrassment, the passengers' bafflement, the kind woman with the sewing kit. This self-deprecating humour is characteristic of his writing style." },
  { q: "What does Maxwell's description of people's guesses about Mijbil reveal about urban society?", opts: ["That Londoners are rude", "That city-dwellers are disconnected from nature — they cannot identify an animal that lives on their own island", "That otters are rare animals", "That Mijbil was unusually strange-looking"], ans: 1, exp: "The variety of wrong guesses — seal, hippo, beaver, walrus — reveals how disconnected urban people are from the natural world. Nobody in London recognised a native British animal. This is an implicit comment on urbanisation and nature-blindness." },
  { q: "How does Maxwell's relationship with Mijbil challenge conventional ideas about the relationship between humans and wild animals?", opts: ["It suggests all wild animals should be kept as pets", "It shows that under the right conditions, a genuine bond of mutual trust and affection can form between a human and a wild animal, without the animal losing its essential nature", "Wild animals can never be trusted", "It suggests otters should be domesticated"], ans: 1, exp: "Maxwell's relationship with Mijbil is not one of domination or taming. Mijbil retained his wild nature (inventing games, loving water) while forming a genuine bond. The relationship suggests that coexistence rather than control is possible between humans and wild animals." },
  { q: "Why is the detail of Mijbil learning to turn on the tap significant?", opts: ["It shows he needed water", "It demonstrates tool-use adjacent behaviour — using a mechanical object to achieve a desired outcome — which is a marker of high intelligence", "It shows he was destructive", "It shows Maxwell was careless"], ans: 1, exp: "Learning to operate a tap is a form of problem-solving that requires understanding cause and effect. That Mijbil taught himself this — without being shown — demonstrates a level of associative learning that places him among the most cognitively sophisticated animals." },
  { q: "What does Maxwell's decision to travel with Mijbil by air reveal about his character?", opts: ["He was irresponsible", "It shows his deep attachment to Mijbil — he was willing to undergo considerable stress and practical difficulty rather than leave the otter behind", "He had no other option", "He was testing Mijbil's adaptability"], ans: 1, exp: "Maxwell could have found other arrangements for Mijbil. His choice to take him on a difficult, risky air journey reveals the depth of his attachment — Mijbil was not merely a specimen or a curiosity but a companion he could not bear to leave." },
  { q: "The narrative style of 'Mijbil the Otter' has been described as that of a 'nature essay'. What are the key features of this genre visible in the chapter?", opts: ["Fiction and fantasy", "Close observation of animal behaviour, personal narrative, scientific accuracy and affection for the natural world", "Political commentary", "Adventure and action"], ans: 1, exp: "Nature essays combine scientific observation with personal narrative and emotional engagement. Maxwell's chapter has all these qualities: precise behavioural description, personal memoir, scientific identification (new species) and deep affection." },
  { q: "Why does Maxwell say that keeping an otter is 'a whole-time occupation'?", opts: ["Otters eat too much", "Otters require constant care, supervision and enrichment because of their intelligence, energy and need for water — they are demanding companions", "They are dangerous", "They need medical attention constantly"], ans: 1, exp: "An intelligent, water-loving, endlessly curious animal like Mijbil requires enormous investment of time and environment. The bath must be available, games must be provided, and the otter's safety in urban environments (streets, cars) must be ensured constantly." },
  { q: "How does the author use contrast between Mijbil's natural habitat and London to create comic and thematic effect?", opts: ["To show London is a bad city", "To highlight how comic and absurd it is to transport a semi-wild marsh animal into a city — and to show how the natural world and urban world are fundamentally misaligned", "To show Mijbil was unhappy in London", "To compare landscapes"], ans: 1, exp: "The contrast between the Iraqi marshes and London streets is both comic and thematic. An otter in a London flat is inherently absurd; the reactions of Londoners confirm this. The contrast also raises questions about keeping wild animals and the costs of that to the animal." },
  { q: "What does Maxwell mean when he says Mijbil 'transferred his love and allegiance' to him?", opts: ["Mijbil forgot his previous owner", "Mijbil made a conscious social bond with Maxwell, choosing him as his primary attachment figure — a profound act of animal trust", "Mijbil was trained to obey Maxwell", "Maxwell bought Mijbil legally"], ans: 1, exp: "The phrase 'transferred love and allegiance' is very deliberately humanising. It suggests Mijbil had an active emotional and social life — he was capable of loyalty, of choosing, and of committing himself to a relationship. This is a remarkable quality in a wild animal." },
  { q: "How does the chapter comment on human attitudes toward animals we don't recognise?", opts: ["Humans are cruel to strange animals", "The inability of Londoners to identify Mijbil shows how humans only really 'know' familiar or domesticated animals — we are indifferent or confused by the unfamiliar", "Humans are always curious about new animals", "The chapter does not address this"], ans: 1, exp: "The comical guesses about Mijbil's identity reveal a deeper truth: humans' relationship with animals is mostly limited to the familiar (dogs, cats) and the spectacular (lions, elephants). The ordinary, native otter has become invisible to the urban human eye." },
  { q: "What is the significance of Maxwell naming the chapter after Mijbil rather than himself?", opts: ["It is a conventional title", "By naming the chapter after the otter, Maxwell places Mijbil at the centre of the story — his life and personality are the real subject, not Maxwell's adventure", "Maxwell wanted to sell more books", "It is a mistake"], ans: 1, exp: "The title 'Mijbil the Otter' asserts that Mijbil is the protagonist, not Maxwell. The human is the observer and companion; the animal is the subject. This reflects the best tradition of nature writing — where the animal's life is the primary interest." },
  { q: "What does the scientific discovery of a new species add to the personal narrative of the chapter?", opts: ["It makes the chapter more difficult", "It elevates the personal story into something larger — showing that human-animal relationships can have scientific importance, and that individual animals carry world significance", "It is just additional information", "It shows Maxwell was a scientist"], ans: 1, exp: "The scientific naming transforms Mijbil from a personal pet into a figure with global scientific significance. This dual identity — beloved companion and scientific discovery — gives the chapter unusual depth and makes Mijbil's story matter beyond Maxwell's personal experience." },
];

const mijbilHard = [
  { q: "ASSERTION: 'Mijbil the Otter' challenges the idea that wild animals should not be kept as pets.\nREASON: Maxwell's relationship with Mijbil is presented as mutually enriching and fundamentally positive.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 1, exp: "Both statements are true but the reason does not fully explain the assertion. The chapter does challenge easy judgments but does not fully ignore the ethical complexities (the travel stress, the confined box). Maxwell's positive portrayal invites questioning of the ban but also invites reflection on the costs to the animal." },
  { q: "CASE-BASED: A conservation group argues that stories like 'Mijbil the Otter' encourage people to keep wild animals as pets. What evidence from the text could support AND complicate their concern?", opts: ["There is no evidence for or against", "Support: Mijbil is portrayed as a delightful, rewarding companion. Complication: Maxwell also shows the enormous difficulty, stress and specialist knowledge required — not a romanticised picture overall", "The text fully supports their concern", "The text fully refutes their concern"], ans: 1, exp: "The text is nuanced. It celebrates the relationship but also documents the chaos of the flight, the difficulty of managing an otter in a city, and the animal's obvious distress in confinement. It neither romanticises nor condemns — which makes it more honest than either extreme." },
  { q: "EXTRACT: 'The Tigris-Euphrates delta had spawned a creature that was unknown to science.' What is the rhetorical effect of the word 'spawned'?", opts: ["It is a negative word suggesting danger", "It evokes the watery, primordial origins of the otter — a creature of the delta, born of water, carrying the mystery of an ancient landscape", "It is a scientific term", "It is used to describe reproduction"], ans: 1, exp: "'Spawned' — used typically for fish — links Mijbil etymologically to water and the primordial natural world. It suggests something generated by the earth itself rather than bred in captivity. The word carries the weight of ancient, wild origins." },
  { q: "ASSERTION: Gavin Maxwell's writing exemplifies the 'nature writing' tradition.\nREASON: He combines precise scientific observation with personal narrative and emotional engagement with the natural world.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The nature writing tradition — from Gilbert White to Gerald Durrell — requires exactly what Maxwell demonstrates: a scientist's eye, a narrator's voice, and a heart genuinely engaged with the animal world." },
  { q: "CASE-BASED: A student writes: 'Mijbil was essentially a domestic pet.' Using the text, explain why this is an oversimplification.", opts: ["The student is correct", "Mijbil retained all his wild behaviours — inventing games, demanding water, navigating new environments with independent curiosity. Maxwell never tamed him; he merely coexisted with him", "Mijbil was a laboratory animal", "The student is correct because Mijbil lived in Maxwell's home"], ans: 1, exp: "Mijbil was never truly domesticated. He was a wild animal who formed a bond with a human but retained his essential nature. His games, his escape on the aircraft, his tap-turning all show an independently minded wild creature coexisting with a human, not a tame animal." },
  { q: "EXTRACT: 'He (Mijbil) went byerk.' The use of the invented word 'byerk' is an example of:", opts: ["A scientific term", "Linguistic playfulness — Maxwell invents a word to capture a behaviour so extreme it exceeds the vocabulary of normal wildness", "A spelling error", "A technical biological term"], ans: 1, exp: "Maxwell coins 'byerk' as a portmanteau of 'berserk' taken further. The playful invention shows his linguistic creativity and his affectionate approach to Mijbil — finding new words for the otter's unique energy." },
  { q: "ASSERTION: The aircraft incident is the narrative climax of the chapter.\nREASON: It is the moment of greatest tension, humour and revelation of Mijbil's character.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The aircraft episode is the chapter's most dramatic moment — it brings together all of Mijbil's qualities (intelligence, water love, ingenuity, social disruption) in one concentrated comic-traumatic scene." },
  { q: "How does Maxwell's portrayal of Mijbil contribute to the broader literary theme of 'the other' in nature writing?", opts: ["Mijbil is portrayed as threatening and dangerous", "By giving Mijbil a rich inner life, Maxwell humanises a non-human animal, collapsing the boundary between 'self' and 'other' and arguing for the moral consideration of animal minds", "Maxwell does not engage with this theme", "The chapter is not literary enough for this theme"], ans: 1, exp: "Nature writing at its best — and Maxwell's is — challenges the idea that animals are mere objects. By showing Mijbil as an individual with intelligence, preferences, social bonds and playfulness, Maxwell argues implicitly that animals have an inner life deserving of moral consideration." },
  { q: "The chapter ends before Mijbil's story is complete. What is the literary effect of this open ending?", opts: ["It is a mistake by the author", "It mirrors the open-endedness of real relationships — the story is ongoing; the reader is left wanting to know more, which mirrors Maxwell's own ongoing bond with Mijbil", "It shows the chapter is incomplete", "It prepares for a sequel"], ans: 1, exp: "Ending in medias res (in the middle of ongoing events) is a deliberate choice. It makes the narrative feel like life itself — not a concluded anecdote but an ongoing relationship. It deepens the sense that Mijbil is a real presence whose story continues beyond the page." },
  { q: "CASE-BASED: A student argues that the chapter's inclusion in a Class 10 textbook is to teach about animals. A second student argues it is to teach about human-animal relationships and what they reveal about human character. Which is the more defensible reading?", opts: ["The first student is correct", "The second student is more defensible — the chapter uses Mijbil to explore human qualities: curiosity, attachment, the comedy of misunderstanding, and the ethics of keeping wild animals", "Both arguments are equally valid", "Neither is correct"], ans: 1, exp: "While the chapter is rich in animal detail, its deeper subject is the human-animal relationship and what it illuminates about human character — our capacity for attachment, our comedy in unfamiliar situations, and our responsibility toward the natural world." },
  { q: "What does the variety of guesses about Mijbil's identity ('seal', 'hippo', 'walrus', etc.) reveal about the relationship between modernity and the natural world?", opts: ["It shows Londoners are unintelligent", "It reveals that modern urban life has produced a fundamental disconnect from the natural world — people can no longer identify the animals that share their landscape", "It shows that otters are unusual animals", "It is just a comic detail with no deeper meaning"], ans: 1, exp: "The guesses form a tragicomic commentary on urban disconnection from nature. Most of the suggested animals are large, exotic creatures seen in zoos — not the native otter who lives in British rivers. This reveals that modernity has made the familiar natural world alien." },
  { q: "ASSERTION: The scientific naming of Mijbil's sub-species as 'maxwelli' is a fitting conclusion to the chapter.\nREASON: It transforms the personal relationship into a permanent scientific record, ensuring Mijbil outlasts both the otter and the man.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The scientific name is a form of immortality — long after both Mijbil and Maxwell are gone, the name 'maxwelli' will persist in the scientific record. The personal bond is preserved in the very language of biology." },
  { q: "How does Maxwell use the motif of water throughout the chapter to develop Mijbil's character?", opts: ["Water is mentioned once and is not significant", "Water is Mijbil's defining element — his joy in the bath, his midnight tap adventure, his love of swimming all use water as the through-line of his character, connecting his domesticated life to his wild origins", "Water is used to show the bathroom was flooded", "Water represents danger in the chapter"], ans: 1, exp: "Water is the motif that runs through every significant episode: the bath, the tap, the riverside in Iraq, the aircraft distress. It connects Mijbil's domestic personality to his evolutionary identity as a semi-aquatic mammal. Water is where Mijbil is most fully himself." },
  { q: "EXTRACT: 'There was a moment of sheer pandemonium on the aircraft.' What narrative purpose does this comic chaos serve?", opts: ["It shows Mijbil was dangerous", "It serves multiple narrative purposes: demonstrating Mijbil's intelligence and ingenuity, creating comic relief, showing Maxwell's helplessness, and dramatising the absurdity of transporting wild animals", "It is meant to criticise airline regulations", "It is included for excitement only"], ans: 1, exp: "The pandemonium scene is multi-functional: it is funny, it reveals Mijbil's extraordinary problem-solving (escaping the box), it humanises Maxwell through his helplessness, and it dramatises the central theme — the difficulty and comedy of bringing the wild natural world into human institutional spaces." },
  { q: "What is the most significant way in which Mijbil changed Maxwell's life, based on the evidence of the chapter?", opts: ["He became famous", "He made Maxwell a better cook", "Mijbil enlarged Maxwell's understanding of animal consciousness and moral consideration — the otter was not a pet but a teacher who changed how Maxwell saw the natural world", "He introduced Maxwell to new people"], ans: 2, exp: "Through Mijbil, Maxwell came to understand that animals have rich inner lives, are capable of genuine bonds, and deserve moral consideration. This changed his relationship with the entire natural world — Mijbil was not just a companion but an education." },
  { q: "How does 'Mijbil the Otter' function as an argument for environmental awareness in the context of Class 10 English curriculum?", opts: ["It teaches students to keep otters as pets", "It cultivates empathy for non-human animals by making one animal's inner life vivid and real — empathy is the foundation of environmental responsibility", "It teaches biological taxonomy", "It teaches students about Iraq"], ans: 1, exp: "By making Mijbil a full individual — with intelligence, preferences, a social life and emotional depth — the chapter cultivates the empathy that underlies environmental responsibility. If we can care about one otter, we can care about the ecosystem that produced it. Empathy is the beginning of conservation." },
];

// ─────────────────────────────────────────────────────────────
//  MADAM RIDES THE BUS  (slug: madam-rides-the-bus)
// ─────────────────────────────────────────────────────────────

const madamPYQs = [
  {
    question: "Who was Valli and what was her greatest desire?",
    answer: "Valli was an eight-year-old girl who lived in a small village in Tamil Nadu. Her greatest desire was to ride the bus that she watched every day from her doorway. She was fascinated by the bus which travelled between her village and the nearest town. She saved money secretly over many months and eventually fulfilled her dream of riding the bus — alone, without telling her mother.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Valli save money to buy a bus ticket? What does this reveal about her character?",
    answer: "Valli saved money by resisting many temptations — she did not buy peppermints, toys, or ride the merry-go-round at the village fair. She carefully counted and saved every small coin she received over several months until she had enough for a return ticket. This reveals her strong willpower, determination, and single-minded focus. She was a child with remarkable self-discipline and the ability to defer gratification.",
    year: 2022, marks: 5, difficulty: "hard",
  },
  {
    question: "Describe Valli's behaviour on the bus during her first journey.",
    answer: "On the bus, Valli was lively, curious and unafraid. She stood on her seat to look out the window because she was too short to see while sitting. When the conductor asked her to sit properly, she told him firmly that she had paid her fare and it was none of his business. She was excited by the sights outside — the canal, the mountains, the fields. She refused to accept a free soft drink from the conductor, insisting on her independence.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "What did Valli see on the road that upset her on the return journey?",
    answer: "On the return journey, Valli saw the dead body of a young cow lying on the road — the same playful calf she had seen bounding alongside the bus joyfully on the way to the town. The cow had been hit by a vehicle. The sight disturbed Valli deeply. She was filled with a sudden sadness and could not enjoy the journey home. The moment marked her first real confrontation with death.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Valli gather information about the bus journey before she took it?",
    answer: "Valli gathered information by listening carefully to conversations between adults — particularly between neighbours, relatives and strangers — whenever they discussed the bus journey. She asked subtle, indirect questions without revealing her plan. Over time she pieced together all the details she needed: the fare (thirty paise one way), the time of departure, and the duration of the journey. Her method shows her intelligence and careful planning.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did Valli refuse the soft drink offered by the conductor?",
    answer: "Valli refused the soft drink because accepting it would mean being treated like a child who needed to be looked after. She wanted to be seen as an independent traveller who had planned and paid for her own journey. Accepting charity or kindness would undermine the independence she was asserting. Her refusal also reflects her pride and her desire to be taken seriously as a capable person.",
    year: 2022, marks: 2, difficulty: "easy",
  },
  {
    question: "What is the significance of the title 'Madam Rides the Bus'?",
    answer: "The title uses the word 'Madam' humorously and affectionately — it is what the conductor calls Valli when she insists on being treated as an adult equal. The title captures the central irony: an eight-year-old girl is so assertive, independent and self-possessed that she earns an adult honorific. It also signals the chapter's central theme — a child claiming adult agency and independence.",
    year: 2021, marks: 2, difficulty: "easy",
  },
  {
    question: "How does Valli's encounter with death change her in the story?",
    answer: "The sight of the dead cow transforms Valli's mood from joy to quiet sadness. She realises for the first time that the world contains irreversible loss and death. The playful calf she had seen bounding joyfully is now a pathetic, blood-soaked carcass. This is Valli's first real encounter with mortality, and it initiates her into a more complex understanding of life — one that includes loss, sorrow and impermanence alongside joy and adventure.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "What was the relationship between Valli and the conductor like?",
    answer: "The relationship was playful and warm, with an undercurrent of mutual respect. The conductor initially found Valli amusing and called her 'madam' teasingly when she asserted herself. He was indulgent and kind — offering her a cold drink, keeping an eye on her, and helping her make sense of the journey. For her part, Valli was spirited and firm with him but not rude. The relationship captured the story's warm, humorous tone.",
    year: 2019, marks: 2, difficulty: "easy",
  },
  {
    question: "Why did Valli not tell her mother about her bus journey?",
    answer: "Valli did not tell her mother because she knew her mother would not allow her to take the journey alone. Her plan required secrecy and depended on her mother's afternoon nap as the window of opportunity. She also did not tell her after the journey because she understood there were things adults hid from children — she now had her own secret, her own private experience. The story ends with Valli keeping a knowing secret from her mother.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "What is the importance of money in the story 'Madam Rides the Bus'?",
    answer: "Money is central to Valli's plan and her assertion of independence. The bus ticket costs thirty paise one way — sixty paise for the return. Valli saved this sum herself over months, resisting all temptations. The money she earned herself gave her the right to travel. It represents her agency and self-reliance. The story shows that even for a child, having one's own money is a source of power and freedom.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe the scene Valli witnessed through the bus window during her journey.",
    answer: "Valli saw a series of vivid scenes through the window: a road running alongside a canal lined with palm trees; mountains in the far distance; fields of bright greenery; and a young calf running alongside the bus, seemingly racing it. The sights were joyful and exciting — new sights for a village child who had never gone to the town. The landscape was beautiful and vibrant, heightening Valli's sense of adventure and discovery.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the author use humour in 'Madam Rides the Bus'?",
    answer: "The author uses humour through the contrast between Valli's small size and her enormous self-confidence. The conductor's calling her 'madam' is comic because she is a tiny child speaking and acting with adult authority. Her refusal of the soft drink, her insistence on standing to look out the window, and her firm rebuke to the conductor are all humorous because of the incongruity between her age and her assertiveness. The humour is warm and affectionate, never mocking.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "What did Valli see when she reached the town? Why did she choose not to get off the bus?",
    answer: "When the bus reached the town, Valli looked out with curiosity but chose not to get off. She was afraid of getting lost in the unfamiliar town and also did not have extra money beyond the return fare. She had planned precisely for the journey, not for exploration of the town. She stayed on the bus and waited for the return journey, which was her original and complete plan.",
    year: 2019, marks: 2, difficulty: "easy",
  },
  {
    question: "What does the story 'Madam Rides the Bus' suggest about the nature of childhood and growing up?",
    answer: "The story suggests that childhood is a time of intense desire, curiosity and the urge to discover the world. Valli's adventure represents the universal child's impulse to go beyond the familiar and assert independence. At the same time, the encounter with the dead cow shows that growing up involves confronting loss and death. The story captures the bittersweet nature of this threshold — the joy of discovery shadowed by the first awareness of life's fragility.",
    year: 2023, marks: 5, difficulty: "hard",
  },
];

const madamEasy = [
  { q: "What was Valli's real name?", opts: ["Valliammai", "Valli Devi", "Valliyamma", "Vallimuthu"], ans: 0, exp: "'Valli' was a shortened form of 'Valliammai' — a common Tamil name. The nickname was used affectionately by those who knew her." },
  { q: "How old was Valli when she took her first bus ride?", opts: ["Six", "Seven", "Eight", "Ten"], ans: 2, exp: "Valli was eight years old when she saved up enough money and made her plan to ride the bus to the town and back." },
  { q: "How much did a one-way bus ticket cost?", opts: ["Twenty paise", "Thirty paise", "Fifty paise", "One rupee"], ans: 1, exp: "The one-way fare was thirty paise, making the total return fare sixty paise — the amount Valli carefully saved over months." },
  { q: "What was Valli's favourite pastime?", opts: ["Playing with friends", "Reading books", "Standing at the front doorway and watching the street", "Flying kites"], ans: 2, exp: "Valli had no playmates her age and her favourite pastime was standing at her front doorway, watching the street — and especially the bus." },
  { q: "What did the conductor call Valli?", opts: ["Little girl", "Child", "Madam", "Miss"], ans: 2, exp: "The conductor called Valli 'madam' teasingly because she spoke and behaved with such self-assurance and authority for a young child." },
  { q: "What did Valli do when she felt too short to see out of the bus window?", opts: ["She asked the conductor for help", "She stood on her seat", "She moved to a window seat", "She sat on an older passenger's lap"], ans: 1, exp: "Valli stood up on her seat to look out of the window because she was too short to see properly while seated." },
  { q: "Why was Valli unable to get off the bus and explore the town?", opts: ["She was not allowed off", "She was afraid and had no extra money beyond the return fare", "She had to return before her mother woke up", "The bus did not stop long enough"], ans: 1, exp: "Valli had planned exactly for the cost of a return journey. She had no extra money and did not want to get lost in the unfamiliar town." },
  { q: "What animal did Valli see running alongside the bus on the way to town?", opts: ["A dog", "A goat", "A young calf", "A horse"], ans: 2, exp: "A young calf ran playfully alongside the bus, which delighted Valli. She found it endearing and funny." },
  { q: "What happened to the calf on Valli's return journey?", opts: ["It had gone home", "It was still running", "It had been hit by a vehicle and lay dead on the road", "It had been tied up"], ans: 2, exp: "On the return journey, Valli saw the same calf now lying dead on the road, having been struck by a vehicle. The sight filled her with sudden, deep sadness." },
  { q: "During which time of day did Valli make her journey?", opts: ["Early morning", "Afternoon, while her mother napped", "Evening", "Night"], ans: 1, exp: "Valli used her mother's afternoon nap as the opportunity to slip away and take the bus, knowing she would be back before her mother woke." },
  { q: "What did the conductor offer Valli that she refused?", opts: ["A biscuit", "A cold soft drink", "A mango", "Money"], ans: 1, exp: "The conductor kindly offered Valli a cold soft drink, which she firmly refused — she wanted to assert her independence and not be treated as a child needing charity." },
  { q: "What did Valli avoid buying in order to save money for the bus ride?", opts: ["Clothes and toys", "Peppermints, toys and merry-go-round rides", "Books and stationery", "Food and snacks"], ans: 1, exp: "Valli resisted buying peppermints, small toys and merry-go-round rides — all the typical pleasures available to children — in order to save her sixty paise." },
  { q: "How did Valli find out about the bus schedule and fare?", opts: ["She asked her mother", "She read a timetable", "She listened carefully to adult conversations and asked indirect questions", "A friend told her"], ans: 2, exp: "Valli gathered all the information she needed by listening to adult conversations and asking subtle questions — never revealing her plan." },
  { q: "In which state of India is the story set?", opts: ["Andhra Pradesh", "Kerala", "Tamil Nadu", "Karnataka"], ans: 2, exp: "The story is set in a small village in Tamil Nadu, as indicated by Valli's Tamil name (Valliammai) and the regional details in the narrative." },
  { q: "What was Valli's reaction when she first got onto the bus?", opts: ["She was scared and wanted to go home", "She was excited, stood on her seat and looked eagerly at everything", "She sat quietly and said nothing", "She immediately fell asleep"], ans: 1, exp: "Valli was thrilled — she stood on her seat to see out of the window and was wide-eyed with excitement at everything she observed." },
];

const madamMedium = [
  { q: "How does the author use Valli's window-watching to establish her character before the journey begins?", opts: ["It shows she is lazy", "It establishes her as an intensely curious, observant child whose world is limited but whose imagination and desire reach far beyond it", "It shows she has no friends", "It shows she is disobedient"], ans: 1, exp: "Watching from the doorway is both a literal and symbolic act — Valli observes the world but cannot yet enter it. Her intense curiosity and the desire she feels watching the bus establishes her as a child for whom discovery is a deep need." },
  { q: "What does Valli's saving of money suggest about her understanding of the adult world?", opts: ["She was greedy", "She understood that freedom requires resources — that agency in the world is connected to economic independence, even for a child", "She was taught to save by her mother", "She was afraid of spending"], ans: 1, exp: "Valli's saving shows she understood, intuitively, that wishes require planning and resources. Her recognition that money enables agency is a form of adult wisdom in a child's mind." },
  { q: "Why is it significant that Valli plans her journey entirely alone, without help from any adult?", opts: ["It shows she is reckless", "It is a declaration of independence — she wanted to prove, to herself above all, that she was capable of navigating the world on her own terms", "It shows she has no family", "It is significant because it was dangerous"], ans: 1, exp: "The solitary planning and execution of the journey is the story's core act of independence. Valli did not want help — the achievement would only mean something if it was entirely hers." },
  { q: "How does the author contrast Valli's outward journey and return journey to develop the story's theme?", opts: ["The outward journey is long; the return is short", "The outward journey is full of joy and wonder; the return is shadowed by the encounter with death — childhood innocence encounters the reality of mortality", "The return journey is more exciting", "There is no significant contrast"], ans: 1, exp: "The outward journey is vivid, playful and full of delight. The return is tinged with sadness after the dead cow. The structure mirrors the thematic movement: from innocent excitement to a more complex awareness. This is the story's emotional and thematic arc." },
  { q: "What does the dead cow symbolise in the story?", opts: ["Bad luck", "The death of Valli's dream", "The entry of mortality and loss into Valli's consciousness — the end of pure, unaware childhood innocence", "The dangers of village roads"], ans: 2, exp: "The dead cow — the same joyful calf she had watched earlier — is the moment when death enters Valli's world. It is the story's emotional turning point: an irreversible reality that cannot be wished away, marking Valli's first step out of pure childhood." },
  { q: "How does the conductor's attitude toward Valli reflect the story's tone?", opts: ["He is condescending to her", "He is a threatening adult", "He is warm, amused and respectful — his affectionate teasing reflects the story's overall tone of warm humour toward a remarkable child", "He ignores her"], ans: 2, exp: "The conductor's calling her 'madam', his offer of a drink, his general indulgence — all contribute to the story's warm, affectionate tone. He is the adult world responding to Valli's spirited assertion with amused respect." },
  { q: "What does the author suggest about the relationship between curiosity and knowledge in the story?", opts: ["Curiosity is dangerous for children", "Curiosity, when acted upon with planning and courage, leads to genuine knowledge — both of the external world and of oneself", "Knowledge should come from adults only", "Valli was too curious for her own good"], ans: 1, exp: "The story affirms curiosity as the engine of discovery. Valli's desire to know what the bus journey felt like led her to plan, save, act and discover. The knowledge she gained — including the knowledge of death — could not have come any other way." },
  { q: "What does Valli's refusal to be treated as a child, combined with her actual childlike excitement, reveal about her character?", opts: ["She was confused about her age", "She existed on the threshold between childhood and adulthood — asserting independence while still experiencing the world with a child's wonder", "She was pretending to be an adult", "She was not actually excited"], ans: 1, exp: "Valli simultaneously asserts adult independence (refusing help, insisting on her rights as a paying passenger) and embodies childhood wonder (standing on the seat, thrilling at the calf). She is a child becoming aware of herself as an individual." },
  { q: "Why does Valli choose not to share her experience with her mother at the end of the story?", opts: ["She is afraid of being punished", "She has learned that some experiences are private — the journey taught her something that belongs to her alone, just as adults have experiences children cannot share", "She forgot to tell her", "She is angry with her mother"], ans: 1, exp: "Valli's silence mirrors the adult world's silences — things that are kept from children 'for their own good'. Having crossed into a more complex world, she now has her own private knowledge. Her silence is a mark of growing up." },
  { q: "How does the story use the motif of the window to develop its themes?", opts: ["Windows represent escape", "The window frames Valli's journey from watcher to participant — it represents the boundary between desire and fulfilment, between childhood constraint and adult freedom", "Windows are mentioned only incidentally", "The window represents danger"], ans: 1, exp: "Valli begins at her doorway window, watching the bus; she ends at the bus window, watching the world. The window is the recurring motif of longing and discovery — the frame through which she moves from desire to experience." },
  { q: "The story was written by Valnikki. What does the choice of a girl protagonist in 1950s Tamil fiction suggest?", opts: ["It was unusual and perhaps progressive — depicting a girl as an independent, self-determining agent", "It was common in Tamil fiction", "The author preferred writing about girls", "It has no significance"], ans: 0, exp: "In 1950s Tamil society, a girl child of eight acting entirely independently was an unusual and somewhat progressive subject. The story quietly celebrates female agency and independent spirit in a context where such stories were rarely told." },
  { q: "How does the structure of the story — a round trip — reflect its thematic meaning?", opts: ["Round trips are common in Tamil stories", "The round trip mirrors Valli's psychological journey — she leaves as a child full of pure anticipation and returns subtly changed by her encounter with mortality", "The structure is insignificant", "It shows she was careful to return home"], ans: 1, exp: "The journey out and back is a structural metaphor for Valli's psychological arc. She returns to the same place she left, but she is not exactly the same person. The round trip is the story's way of saying: you can go back, but you cannot un-know what you've learned." },
  { q: "What does the description of the landscape through the bus window contribute to the story?", opts: ["It fills in geographical detail", "It externalises Valli's inner state — the vivid, joyful landscape mirrors her excitement; the desolate return mirrors her sadness", "It is a distraction from the main story", "It describes Tamil Nadu for foreign readers"], ans: 1, exp: "The landscape is not merely scenic — it reflects Valli's emotional state. The bright canal, green fields and playful calf mirror her joy; the dead cow on a dusty road mirrors the sadness that replaces it. The external world mirrors the internal journey." },
  { q: "How does the story explore the theme of 'hidden worlds'?", opts: ["Valli discovers a secret jungle", "The story shows that adults and children inhabit different, partially hidden worlds — each with experiences unknown to the other", "The theme is not present in the story", "Valli hides in the bus"], ans: 1, exp: "Adults hide things from children (the conversation Valli overhears suggests this). Valli now has a hidden world of her own — her journey. The story explores how growing up means acquiring private experience and learning that the world contains more than what is visible to any single perspective." },
  { q: "What does Valli's ability to resist temptation (peppermints, toys, rides) reveal about her maturity?", opts: ["She did not like sweets and toys", "It reveals remarkable maturity — the ability to defer immediate pleasure for a greater future goal is an adult psychological capacity she already possessed", "She was afraid to spend money", "Her parents forbade these pleasures"], ans: 1, exp: "Deferring gratification is one of the markers of mature thinking. Valli's ability to resist immediate pleasures to pursue a longer-term goal shows a cognitive and emotional maturity well beyond her eight years." },
  { q: "What universal truth about life does the story convey through Valli's encounter with the dead cow?", opts: ["Roads are dangerous", "Joy and sorrow are inseparable — the same world that contains the playful calf also contains its death; to live fully is to encounter both", "Animals should not be on roads", "Villages are dangerous places"], ans: 1, exp: "The story's deepest truth is that life contains both joy and sorrow, often unexpectedly close together. The same calf that ran joyfully beside the bus now lies dead. The world gives and takes with the same hand — and Valli's journey is her first experience of this truth." },
];

const madamHard = [
  { q: "ASSERTION: Valli's journey is a rite of passage.\nREASON: She begins the journey as a curious, innocent child and returns with a more complex, adult awareness that includes the reality of death.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. A rite of passage is defined by a transformative experience. Valli's encounter with the dead cow transforms her understanding of the world — she returns with knowledge she cannot unknow. The reason accurately explains what makes the journey a rite of passage." },
  { q: "CASE-BASED: A student argues that Valli's journey was irresponsible and her mother should have been told. Using the text, explain how the story itself responds to this view.", opts: ["The story agrees — Valli was irresponsible", "The story validates the journey by showing it was carefully planned, safely executed, and genuinely transformative — suggesting that some forms of independent discovery are necessary to growing up", "The story is neutral on this question", "The story shows the journey was dangerous"], ans: 1, exp: "The story presents Valli's planning as meticulous and her execution as competent. She returns home safely. The story implicitly endorses the journey by making it the vehicle of genuine growth. It suggests that adult over-protection would have prevented a necessary experience." },
  { q: "EXTRACT: 'The wind grew more noisy and the bus seemed to shiver with delight.' What literary device is used and what effect does it create?", opts: ["Simile — comparing the bus to a living being", "Personification — the bus is given human feelings, making Valli's environment feel alive and responsive to her joy", "Metaphor — comparing wind to music", "Alliteration — emphasising the sound"], ans: 1, exp: "Personification gives the bus a living, emotional quality. The bus 'shivers with delight' — it shares Valli's excitement. This technique projects Valli's inner state onto the external world, making the landscape a participant in her adventure rather than a passive backdrop." },
  { q: "ASSERTION: The dead cow is the thematic climax of the story, not the arrival at the town.\nREASON: The town is the goal of Valli's external journey; the dead cow is the turning point of her internal, psychological journey.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The town is merely the physical destination. The dead cow is where the story's emotional and thematic energy is concentrated — it is the moment of psychological change. The reason perfectly distinguishes between the external and internal journeys." },
  { q: "CASE-BASED: A teacher asks: 'Is Valli a realistic character or an idealised one?' How would you answer using specific evidence from the text?", opts: ["She is entirely idealised — no real child behaves this way", "She is realistic in her curiosity and excitement but idealised in her self-control and planning — she represents what an unusually capable child can achieve, not an average child", "She is entirely realistic", "The text provides no evidence to answer this"], ans: 1, exp: "Valli's wonder, excitement and curiosity are realistic childhood qualities. Her months-long self-discipline in saving money and her ability to research and execute a plan independently are somewhat idealised. She is a realistic spirit in an aspirationally depicted form — a child as we might wish children could be." },
  { q: "EXTRACT: 'A kind of sorrow, anger, shame mixed into one thing…' What does this mixed emotion suggest about Valli's response to the dead cow?", opts: ["She was afraid of the blood", "The mixed emotion reveals the complexity of her first encounter with death — she is sad, angry at the injustice of the calf's death, and perhaps ashamed of her earlier laughing innocence", "She felt guilty for the cow's death", "She was confused"], ans: 1, exp: "The complexity of her emotion is the mark of genuine moral and emotional maturity. She did not simply feel sad — she felt the tangled web of emotions that death provokes: grief for the loss, anger at its senselessness, and perhaps a vague shame at her own earlier innocence in laughing at the calf." },
  { q: "How does the author use irony in the story's ending (Valli keeping a secret from her mother)?", opts: ["There is no irony in the ending", "The irony is that the child who wanted to be treated as an adult now mirrors adult behaviour — keeping secrets from children — which she had resented being the object of", "The irony is that Valli was caught", "The irony is that her mother already knew"], ans: 1, exp: "The dramatic irony is layered: Valli resented the adult world's secrets; now she keeps one herself. By acquiring a private experience she cannot share, she has taken one more step into the adult world she was trying to enter — on exactly the adult world's terms." },
  { q: "ASSERTION: The story critiques adult overprotection of children.\nREASON: Valli's journey succeeds precisely because she was unsupervised — adult supervision would have prevented the transformative experience.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The story implicitly argues that children need space to act independently to grow. Valli's journey — unplanned by adults, executed alone — results in genuine growth. Adult supervision would have prevented this. The story thus gently critiques over-protective parenting." },
  { q: "EXTRACT-BASED: 'Outside the window everything was suddenly so beautiful.' What technique is used and why does this moment feel ironic in retrospect?", opts: ["Pathetic fallacy — the landscape mirrors her joy, which becomes ironic because the same landscape will soon hold the dead cow", "Metaphor comparing nature to art", "Alliteration for musical effect", "Hyperbole suggesting the scene was impossible"], ans: 0, exp: "The beauty of the landscape mirrors Valli's joy — pathetic fallacy. In retrospect, the beauty is ironic because it is in this same beautiful landscape that she will encounter the dead cow. The world's beauty and its sorrow coexist in the same space — a thematic truth the story will deliver moments later." },
  { q: "What does the story suggest about the relationship between economic resources and personal freedom?", opts: ["Rich children have more freedom", "Even for a child, having one's own money — however little — creates genuine agency and the ability to act in the world independently", "Money is unimportant to freedom", "Valli's family was wealthy"], ans: 1, exp: "Valli's sixty paise are the foundation of her freedom. Without them, her dream remains a dream. The story quietly acknowledges that freedom — even for a child — requires resources. Economic agency and personal agency are connected." },
  { q: "CASE-BASED: Two students debate whether the story is primarily about a child's curiosity or about the theme of growing up. Which is the more defensible reading, and why?", opts: ["Curiosity — that is the only theme", "Growing up — curiosity is the mechanism but the story's emotional weight rests on the encounter with death and the changed Valli who returns home", "Both themes are present but neither dominates", "Neither theme is present"], ans: 1, exp: "Curiosity initiates the story but is not its destination. The story's emotional and thematic weight falls on the dead cow and Valli's changed inner state. Growing up — the painful acquisition of knowledge about mortality — is the story's deeper and more resonant theme." },
  { q: "The story ends with Valli's 'tiny smile'. What does this ambiguous detail suggest?", opts: ["She is happy the journey is over", "The smile captures the bittersweet complexity of her new knowledge — she is proud of her achievement, touched by the affection around her, and quietly carrying the sadness she cannot share", "She is amused by her mother's ignorance", "It is a simple, unimportant detail"], ans: 1, exp: "The 'tiny smile' is one of the story's most resonant details. It captures everything at once — pride in her achievement, warmth at her mother's unknowing affection, and the quiet carrying of a sadness and knowledge that has made her, imperceptibly, older." },
  { q: "How does the story use the bus as a symbol?", opts: ["The bus represents danger", "The bus represents the wider world — the possibility of going beyond the known, of movement, of freedom from the constraints of the familiar", "The bus is just transport", "The bus represents modernity"], ans: 1, exp: "The bus is the story's central symbol. From Valli's doorway, it represents the larger world she cannot yet access. When she finally boards it, it becomes the vehicle of discovery, independence and ultimately of her encounter with mortality. It is the threshold between her world and the adult world beyond." },
  { q: "ASSERTION: Valli's personality challenges gender expectations for girls in 1950s Tamil society.\nREASON: She is assertive, independent, self-reliant and refuses to accept subordinate treatment from adults, including men.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. In 1950s Tamil society, an eight-year-old girl travelling alone, refusing help from adults and asserting herself with male strangers was an implicit challenge to norms. The reason accurately identifies the specific behaviours that constitute this challenge." },
  { q: "What is the narrative function of the other bus passengers?", opts: ["They are the main characters", "They provide a social context that highlights Valli's uniqueness — their reactions (amusement, indulgence) measure how unusual she is", "They represent the adult world in general", "They have no narrative function"], ans: 1, exp: "The passengers' reactions — amusement, surprise, gentle teasing — frame Valli's behaviour as unusual and remarkable. They serve as a chorus, reflecting how extraordinary she is. Without their reactions, her assertiveness would have no audience and no measure." },
  { q: "How does the title's use of 'Madam' function as a literary device?", opts: ["It is a respectful address", "It is irony — using an adult honorific for a child to highlight the comic incongruity between Valli's age and her assertive, adult-like behaviour", "It is a translation from Tamil", "It shows the conductor was formal"], ans: 1, exp: "The irony of 'Madam' — a term of adult respect applied to an eight-year-old — is the story's governing comic device. It encapsulates the central tension: a child claiming and earning adult recognition. The title makes this irony visible from the first word." },
];

// ─────────────────────────────────────────────────────────────
//  THE SERMON AT BENARES  (slug: the-sermon-at-benares)
// ─────────────────────────────────────────────────────────────

const sermonPYQs = [
  {
    question: "Why did Gautama Buddha leave his palace and family?",
    answer: "Gautama Buddha, born Prince Siddhartha, left his palace at the age of 25 after encountering the realities of suffering — a sick man, an aged man, a funeral procession and a monk who had renounced the world. These sights shattered his sheltered existence and he could no longer remain in comfort while the world suffered. He became an ascetic wanderer, seeking the truth about suffering and how to end it. After years of meditation, he attained enlightenment under a fig tree at Bodh Gaya.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Who was Kisa Gotami? What happened to her son?",
    answer: "Kisa Gotami was a woman whose only son died. Overwhelmed by grief, she refused to accept her son's death and wandered the streets carrying his body, begging for medicine to revive him. People thought she had lost her mind. Someone eventually directed her to Gautama Buddha, who agreed to help her — but with a unique condition.",
    year: 2022, marks: 2, difficulty: "easy",
  },
  {
    question: "What did Buddha ask Kisa Gotami to bring him? Why was this task impossible?",
    answer: "Buddha asked Kisa Gotami to bring a handful of mustard seeds from a house where no one had ever died. Mustard seeds were a common household item, so the request seemed simple. But the condition — from a house where no death had occurred — was impossible to fulfil. Every house Kisa Gotami visited had known death. The task was impossible because death is universal; there is no household in all the world that has been untouched by it.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "What did Kisa Gotami realise after her search for mustard seeds? How did she change?",
    answer: "As Kisa Gotami went from house to house, each family told her of their own losses — husbands, wives, children, parents. She realised that she was not alone in her grief; death is the universal human condition. By evening, exhausted and enlightened, she returned to Buddha without the seeds. She understood that her son's death was not a unique injustice but part of the natural order of all life. She accepted his death and became a disciple of Buddha.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "What is the central sermon that Buddha delivered to Kisa Gotami?",
    answer: "Buddha taught Kisa Gotami that death is universal and inevitable. He said that the living are always outnumbered by the dead — that those who have died are more than those who are alive. He used the image of a burning village from which a wise man does not seek fire but seeks peace for those still living. The central message was: do not grieve for the dead; instead, seek the peace that comes from understanding that death is not an individual misfortune but the universal law of all existence.",
    year: 2023, marks: 5, difficulty: "hard",
  },
  {
    question: "How does Buddha compare human life to a burning lamp?",
    answer: "Buddha uses the image of the lamp as a metaphor for life — it burns for a time and then is extinguished. Just as a lamp's flame cannot be preserved forever, life cannot be preserved forever. The extinction of the lamp is not a tragedy but the natural conclusion of its burning. By using this image, Buddha teaches that death is not an aberration or an injustice — it is the natural end of the life that precedes it, and should be understood as such, not grieved as a special loss.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What does the story of Kisa Gotami teach us about the nature of grief?",
    answer: "The story teaches that grief, while natural and human, becomes a source of suffering when it refuses to accept the reality of death. Kisa Gotami's grief was real and deep, but her refusal to accept her son's death trapped her in madness. Buddha's method did not comfort her with false promises — instead it showed her the universality of death, which freed her grief from its quality of personal injustice. Understanding that all must die transforms grief from protest into acceptance.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did Buddha ask Kisa Gotami to find the mustard seeds herself rather than simply telling her that death is universal?",
    answer: "Buddha knew that direct teaching rarely transforms grief as deeply as lived experience. If he had simply told Kisa Gotami that death is universal, it would have remained an abstraction. By sending her from house to house, he allowed her to discover the truth herself, through conversation with real families who had real losses. The experiential learning was more powerful than any sermon. Buddha used her grief as the instrument of her own teaching.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "What is the significance of setting this sermon in Benares (Varanasi)?",
    answer: "Benares (Varanasi) is India's oldest and most sacred city and is especially associated with death and liberation. Hindus believe that dying in Varanasi brings moksha (liberation). The ghats of Varanasi are where bodies are cremated along the holy Ganges. Setting the sermon in this city deepens the thematic resonance — a place where death is seen and accepted every day becomes the setting for a sermon about accepting death. The city itself is the sermon's backdrop and illustration.",
    year: 2019, marks: 2, difficulty: "easy",
  },
  {
    question: "Describe the four sights that changed Siddhartha's life.",
    answer: "Siddhartha encountered four sights outside the palace that shattered his sheltered existence: an old man broken by age, a sick man in suffering, a dead body being carried in a funeral procession, and a monk who had renounced the world but appeared calm and at peace. The first three showed him the unavoidable realities of suffering — age, illness and death. The fourth suggested that there was a path beyond suffering. These four sights drove him to renounce his palace life.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How does Buddha's method with Kisa Gotami demonstrate compassion?",
    answer: "Buddha's method was profoundly compassionate because he did not dismiss her grief or lecture her abstractly. He received her with kindness, appeared to offer hope, and then guided her toward the truth through her own experience. He understood that a grieving mother needed to discover the universality of death herself rather than be told it. His method was tailored to her specific suffering — it was both gentle and effective. True compassion, the story suggests, involves guiding people toward truth, not just comforting them with false hope.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What does the chapter suggest about the purpose of religion and spiritual teaching?",
    answer: "The chapter suggests that religion's purpose is not to offer magical solutions to human suffering but to reframe the human being's understanding of suffering so that it becomes bearable and transformable. Buddha's sermon does not save Kisa Gotami's son — it saves Kisa Gotami herself. True spiritual teaching, the chapter implies, equips the human being to accept reality as it is, including its hardest truths, rather than fighting against the unchangeable.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "What metaphor does Buddha use to describe the brevity of human life?",
    answer: "Buddha uses the metaphor of a clay lamp to describe the brevity of life. Just as a clay lamp burns for a time and then is extinguished — its flame going out — so too does human life burn for a time and then end. The lamp metaphor captures both the beauty and the impermanence of life. The flame is real while it burns; its extinction is neither a failure nor a tragedy but the natural conclusion of what the lamp was made to do.",
    year: 2020, marks: 2, difficulty: "easy",
  },
  {
    question: "How is Siddhartha's background described in the beginning of the chapter?",
    answer: "Siddhartha was born into a royal family in what is now Nepal. His father, King Suddhodana, ensured that he was raised in absolute luxury, shielded from all suffering, sickness and death. He was educated in all the arts, married a princess, and had a son. At twenty-five, against his father's wishes, he ventured outside the palace and encountered the four sights that changed his life forever, leading him to renounce his privileged existence.",
    year: 2019, marks: 2, difficulty: "easy",
  },
  {
    question: "How does Buddha's own life story serve as a sermon before any words are spoken?",
    answer: "Buddha's life is itself the sermon. He was a prince who had everything — wealth, beauty, power, family — and gave it all up in search of truth. His own renunciation and enlightenment demonstrated in practice what his words later taught: that attachment to the material world causes suffering, and that peace comes from understanding and accepting the nature of existence, including impermanence and death. He walked the path he preached.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "What is the overall message of 'The Sermon at Benares' for the reader?",
    answer: "The overall message is that death is the universal human condition and grief for the dead, while natural, should not consume the living. The living are responsible to themselves and to each other to continue living with wisdom and compassion. Rather than being overwhelmed by what cannot be changed — death — human beings should seek understanding, accept reality, and live with peace and purpose. The story teaches equanimity in the face of inevitable loss.",
    year: 2022, marks: 5, difficulty: "hard",
  },
];

const sermonEasy = [
  { q: "What was Siddhartha's family background?", opts: ["He was a poor farmer's son", "He was a merchant's son", "He was a prince, son of King Suddhodana", "He was a Brahmin priest's son"], ans: 2, exp: "Siddhartha Gautama was born into royalty — his father was King Suddhodana, who raised him in luxury and shielded him from suffering." },
  { q: "At what age did Siddhartha leave his palace?", opts: ["At 18", "At 25", "At 30", "At 35"], ans: 1, exp: "Siddhartha left his palace at the age of 25 after encountering the four sights that shattered his sheltered understanding of life." },
  { q: "Under what tree did Siddhartha attain enlightenment?", opts: ["Neem tree", "Mango tree", "Bodhi (fig) tree", "Banyan tree"], ans: 2, exp: "Siddhartha attained enlightenment under a fig tree (Ficus religiosa) at Bodh Gaya, now known as the Bodhi tree — the tree of awakening." },
  { q: "Where did Buddha deliver his first sermon?", opts: ["Bodh Gaya", "Lumbini", "Benares (Varanasi)", "Kushinagar"], ans: 2, exp: "Buddha delivered his first sermon in the Deer Park at Benares (Varanasi/Sarnath), which is why this chapter is called 'The Sermon at Benares'." },
  { q: "Who was Kisa Gotami?", opts: ["A queen", "A rich merchant's wife", "A woman whose only child had died", "A student of Buddha"], ans: 2, exp: "Kisa Gotami was a woman whose only son died. In her grief she refused to accept his death and carried his body through the streets seeking a remedy." },
  { q: "What did Buddha ask Kisa Gotami to bring?", opts: ["A flower from a riverbank", "Mustard seeds from a house where no one had died", "A lamp from a temple", "Water from the Ganga"], ans: 1, exp: "Buddha asked for a handful of mustard seeds from a household that had never experienced death — a condition that proved impossible to fulfil." },
  { q: "Why could Kisa Gotami not fulfil Buddha's request?", opts: ["Mustard seeds were rare", "She was too weak to walk far", "Every house she visited had experienced death — there is no house untouched by death", "She forgot the condition"], ans: 2, exp: "The condition — a house where no one had died — could not be met because death is universal. Every family she visited had lost someone." },
  { q: "What did Kisa Gotami do with her son's body after understanding Buddha's message?", opts: ["She buried it in the forest", "She laid it to rest and stopped trying to revive him", "She gave it to the monks", "She cremated it at the Ganga"], ans: 1, exp: "After her enlightenment through the mustard seed search, Kisa Gotami accepted her son's death, laid the body to rest and returned to Buddha as his disciple." },
  { q: "What is the name of the city where this sermon is delivered?", opts: ["Pataliputra", "Mathura", "Benares (Varanasi)", "Ayodhya"], ans: 2, exp: "The sermon is delivered in Benares, also known as Varanasi or Kashi — India's most sacred city and one deeply associated with death and liberation." },
  { q: "What did Siddhartha see outside his palace that made him renounce his life?", opts: ["A war being fought", "Four sights: a sick man, an old man, a dead man and a monk", "A flood destroying his kingdom", "A dream of suffering"], ans: 1, exp: "The four sights — a sick man, an aged man, a funeral procession and a peaceful monk — destroyed Siddhartha's sheltered illusions about life." },
  { q: "How many years did Siddhartha wander before attaining enlightenment?", opts: ["One year", "Three years", "Seven years", "Ten years"], ans: 2, exp: "Siddhartha wandered as an ascetic for approximately seven years, practising severe austerities, before attaining enlightenment under the Bodhi tree." },
  { q: "What metaphor does Buddha use for the brevity and impermanence of life?", opts: ["A river flowing", "A candle in the wind", "A clay lamp that burns and is extinguished", "A flower that blooms and withers"], ans: 2, exp: "Buddha uses the clay lamp as a metaphor — life burns for a time and is then extinguished, just as a lamp's flame burns and goes out." },
  { q: "What does Kisa Gotami become after accepting Buddha's teaching?", opts: ["A queen", "A teacher herself", "A disciple of Buddha", "A hermit"], ans: 2, exp: "After understanding the universality of death through her mustard seed journey, Kisa Gotami became a disciple of the Buddha." },
  { q: "The author of this chapter is:", opts: ["Betty Renshaw", "Valnikki", "Gavin Maxwell", "Betty Renshaw adapted from a Buddhist text"], ans: 3, exp: "The chapter is adapted by Betty Renshaw from Buddhist scriptures and traditional narratives about the life of Buddha and his teachings." },
  { q: "What is the most important lesson Buddha teaches Kisa Gotami?", opts: ["That her son will be reborn", "That death is universal and inevitable — all who are born must die", "That prayer can revive the dead", "That grief can be cured by medicine"], ans: 1, exp: "The central lesson is that death is universal. No one is exempt. Grief is natural but should not become refusal to accept the inevitable reality that all life ends in death." },
];

const sermonMedium = [
  { q: "How does Buddha's method of teaching Kisa Gotami differ from conventional preaching?", opts: ["He uses stories instead of logic", "He uses experiential learning — guiding her to discover the truth herself through lived experience, rather than delivering abstract doctrine", "He refuses to speak to her", "He uses fear to teach her"], ans: 1, exp: "Rather than lecturing Kisa Gotami about impermanence, Buddha sends her on a journey that allows her to discover it herself. The truth she finds herself will be deeper and more transformative than any truth told to her." },
  { q: "What does the universality of death in every house Kisa Gotami visits suggest philosophically?", opts: ["That the town is a dangerous place", "That death is not an exception or a punishment — it is the condition of all existence, connecting every human being through shared mortality", "That people in Benares die more often", "That Kisa Gotami was unlucky"], ans: 1, exp: "The shared experience of death in every household makes mortality the great equaliser. Every family — regardless of wealth, status or faith — has known death. This universality dissolves the sense of special injustice that grief often carries." },
  { q: "How does the story use the contrast between Siddhartha's sheltered life and the four sights to explore the theme of ignorance and awakening?", opts: ["It shows that rich people are ignorant", "The contrast shows that deliberately constructed ignorance (the palace) cannot hold against reality — the four sights are the inevitable intrusion of truth into a false world of comfort", "It shows that Siddhartha was wrong to leave", "The contrast is only biographical detail"], ans: 1, exp: "The palace represents wilful ignorance — reality kept at bay. The four sights are the world's truth breaking through. The contrast argues that no amount of wealth or protection can permanently shield a human being from the realities of existence." },
  { q: "What does the image of the 'sleeping village' compared to a burning town suggest in Buddha's sermon?", opts: ["That the village is on fire", "That the person who has lost someone is like a person whose village is burning — it makes no sense to seek fire (the dead) but rather to save those still living", "That Benares is a dangerous city", "That fire is a symbol of life"], ans: 1, exp: "The burning village metaphor argues that grief which fixates on the dead (seeking fire in a burning village) is irrational. The wise response is to turn toward the living — to preserve and cherish the life that remains rather than consuming oneself in grief for what is lost." },
  { q: "How does Kisa Gotami's journey from house to house function as a meditation on human community?", opts: ["It shows that humans are strangers to each other", "Her journey reveals that every human family carries its own grief — death is the universal bond that connects all human beings, making grief a communal rather than purely individual experience", "It shows that neighbours are important", "It is only a plot device"], ans: 1, exp: "By visiting house after house and hearing each family's story of loss, Kisa Gotami discovers that grief is not an isolating experience but a shared human one. Death is the invisible thread connecting every family she visits — and every human being." },
  { q: "Why is it significant that Buddha's first sermon was given in a public place (the Deer Park) rather than in a temple?", opts: ["He had no temple", "Teaching in a public park affirms that wisdom is not the property of any institution or priestly class — it belongs to all who seek it and can be found in the natural world", "Public parks were more comfortable", "He was not allowed in a temple"], ans: 1, exp: "The public, natural setting of the Deer Park democratises spiritual wisdom. It is not locked inside a temple or available only to priests — it is open to all, delivered under the sky, in a park where all creatures live and die." },
  { q: "What does the story suggest about the relationship between wisdom and suffering?", opts: ["Suffering destroys wisdom", "Suffering can be the doorway to wisdom — Kisa Gotami's grief, directed by Buddha, becomes the instrument of her deepest understanding", "Wise people do not suffer", "Suffering and wisdom are unrelated"], ans: 1, exp: "The story implies that suffering, when properly understood and directed, can produce profound wisdom. Kisa Gotami's grief is not something to be escaped but something to be understood — and in understanding it, she achieves wisdom she could not have reached any other way." },
  { q: "How does the chapter balance respect for grief with the need to accept death?", opts: ["It dismisses grief as weakness", "It honours grief as natural and human while showing that excessive grief — refusing to accept reality — becomes a form of suffering that harms the living", "It suggests all grief should be suppressed", "It shows grief is always good"], ans: 1, exp: "The text never mocks or dismisses Kisa Gotami's grief. It is treated with compassion and respect. But it also shows, gently, that grief which refuses to accept reality traps the living. The balance is between honouring loss and not allowing it to destroy the life that remains." },
  { q: "What does the phrase 'the living are fewer than the dead' suggest philosophically?", opts: ["That there were wars in Benares", "It places the individual death in cosmic perspective — the history of life on Earth has produced vastly more dead than living; death is the norm, life the brief exception", "That Benares was depopulated", "That people should not have children"], ans: 1, exp: "The philosophical import is that death is the baseline of existence. More beings have lived and died than are alive at any moment. Seen in this cosmic frame, any individual death is part of the great current of existence — not an anomaly." },
  { q: "How does the story use irony in Buddha's request for mustard seeds?", opts: ["The request is not ironic", "The irony is that Buddha appears to offer a simple, achievable task but the condition ('from a house where no one has died') makes it cosmically impossible — he uses apparent simplicity to reveal profound truth", "The irony is that mustard seeds are expensive", "The irony is that Buddha needed the seeds"], ans: 1, exp: "The irony is structural — the task seems simple (mustard seeds are everywhere) but the condition renders it impossible. This gap between apparent simplicity and actual impossibility is the teaching itself: death is everywhere, like mustard seeds, and no one escapes it." },
  { q: "How does the story of Kisa Gotami function as a parable?", opts: ["It is a historical account", "It functions as a parable by using a specific narrative to convey a universal truth — the story of one mother becomes the story of all human grief and the universal lesson of mortality", "It is only relevant to Buddhists", "It is a fable about animals"], ans: 1, exp: "A parable uses a specific story to embody a universal truth. Kisa Gotami's story is specific — one mother, one dead child, one city — but the truth it reveals applies to every human being who has ever grieved. The specific becomes universal." },
  { q: "Why might Buddha's approach be considered more effective than conventional consolation?", opts: ["Because he was a god", "Because conventional consolation often comforts without transforming; Buddha's method transforms the griever's understanding, producing lasting equanimity rather than temporary comfort", "Because he used magic", "Because Kisa Gotami was religious"], ans: 1, exp: "Conventional consolation — 'I'm sorry for your loss', 'time will heal' — may soothe temporarily but does not change the griever's fundamental understanding of death. Buddha's method changes the griever's relationship with reality itself, producing lasting peace rather than temporary relief." },
  { q: "What does the text suggest about the relationship between attachment and suffering?", opts: ["Attachment is always good", "The story implicitly teaches that suffering arises from attachment — Kisa Gotami suffers because she cannot accept losing something she was attached to; acceptance of impermanence relieves this suffering", "Suffering is caused by others", "The text is not concerned with attachment"], ans: 1, exp: "While the word 'attachment' is not used, the core Buddhist concept is embedded in the story. Kisa Gotami's suffering is rooted in her inability to accept the loss of someone she loved. Releasing attachment to the unchangeable — her dead son — is what frees her from suffering." },
  { q: "How does Buddha's own story serve as a frame for the Kisa Gotami parable?", opts: ["It is just biographical background", "The framing of Buddha's life story establishes his authority and authenticity — he did not merely theorise about renunciation; he lived it, making his teaching about accepting loss credible", "The two stories are unrelated", "The biographical frame is unnecessary"], ans: 1, exp: "Buddha's credibility as a teacher of renunciation rests on his having actually renounced everything — comfort, family, wealth and status. This biographical frame makes his sermon on accepting death more than advice; it is the testimony of someone who has walked the path." },
  { q: "What does the story suggest about the role of community in processing grief?", opts: ["Community makes grief worse", "Kisa Gotami's journey shows that encountering others' grief normalises one's own — community and shared mortality create the social solidarity that makes grief bearable", "Grief should be handled alone", "The story is not about community"], ans: 1, exp: "Each household Kisa Gotami visits is a reminder that her grief is not unique. The community of the bereaved — every family she encounters — provides a kind of fellowship of loss that places her personal grief in a wider human context, making it more bearable." },
  { q: "What is the philosophical tradition to which 'The Sermon at Benares' belongs?", opts: ["Vedanta", "Buddhist philosophy, specifically the teaching of Dukkha (suffering) and the path to Nirvana (liberation from suffering)", "Jainism", "Sufism"], ans: 1, exp: "The sermon reflects core Buddhist philosophy — particularly the First Noble Truth (existence involves suffering/Dukkha) and the teaching of impermanence (Anicca). Kisa Gotami's story is a practical illustration of how understanding these truths leads to liberation." },
];

const sermonHard = [
  { q: "ASSERTION: Buddha's instruction to Kisa Gotami is simultaneously an act of compassion and a refusal of false hope.\nREASON: He appears to offer a solution while knowing the task is impossible — thereby guiding her to truth through her own experience.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. Buddha's genius is in using the form of a helpful response (I will help you, bring me mustard seeds) to create an experiential journey to truth. The apparent offer is compassion; the impossible condition is the teaching. Both operate simultaneously." },
  { q: "CASE-BASED: A student says: 'Buddha was being cruel by sending a grieving mother on a hopeless quest.' How does the text refute this?", opts: ["The text agrees — Buddha was cruel", "The text shows the quest was not hopeless — it was the instrument of transformation; Kisa Gotami returns not with seeds but with wisdom, which is exactly what she needed", "The text is neutral on cruelty", "The text shows Buddha made a mistake"], ans: 1, exp: "The 'hopeless quest' was not hopeless — it succeeded in its actual purpose. Kisa Gotami did not need mustard seeds; she needed to understand death. The quest gave her exactly that understanding. A cruel act would have left her worse off; this one healed her." },
  { q: "EXTRACT: 'Death is common to all; yet in this no one is able to accept the warning.' What does 'the warning' refer to, and what is its significance?", opts: ["The warning refers to the signs of illness before death", "The 'warning' is death itself — we see it happen to others constantly, yet refuse to internalise its universality as applying to ourselves; we treat each death as a surprise rather than a confirmation", "The warning is what Buddha said", "The warning refers to divine signs"], ans: 1, exp: "The 'warning' is the constant witness of death around us. Every death we observe is a warning that we too will die, yet humans systematically fail to absorb this warning — treating each death as a shock. Buddha's sermon is an attempt to make us finally hear what we have always been warned." },
  { q: "ASSERTION: The four sights encountered by Siddhartha function as a microcosm of the human condition.\nREASON: Sickness, age, death and renunciation together cover the full spectrum of embodied existence and its possible responses.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The four sights are not random — they represent the complete arc of bodily life (sickness, age, death) and one transcendent response (renunciation/spiritual seeking). Together they constitute a complete philosophical statement about the human condition." },
  { q: "CASE-BASED: Kisa Gotami's journey takes her from grief to wisdom. Identify the three stages of this journey and explain what each stage represents.", opts: ["Denial, anger, acceptance", "Grief (refusal of death) → Search (encountering universal death) → Acceptance (understanding death's universality and finding peace)", "Youth, adulthood, old age", "Ignorance, knowledge, bliss"], ans: 1, exp: "The three stages map Kisa Gotami's psychological arc: her initial grief is a refusal of reality; the mustard seed search is an encounter with reality through others' stories; her return to Buddha is the acceptance of that reality and the transformation of grief into wisdom." },
  { q: "EXTRACT: 'Not from weeping nor from grieving will anyone obtain peace of mind.' What is the philosophical claim being made here?", opts: ["Crying is weakness", "The claim is that grief is not itself a path to peace — only understanding and acceptance of death's universality can produce equanimity; emotion without insight perpetuates suffering", "The dead cannot hear our grief", "Peace of mind is unimportant"], ans: 1, exp: "This is one of Buddhism's most important claims: that emotional processing alone (weeping, grieving) does not produce peace. Peace requires a change in understanding — a cognitive and philosophical shift that reframes death as natural rather than as an injustice to be protested." },
  { q: "How does the mustard seed task function as a Socratic method?", opts: ["It involves asking many questions", "Like Socratic questioning, it uses apparent helpfulness to guide the learner to discover truth independently — the teacher withholds the answer and constructs an experience in which the learner cannot help but arrive at it", "It uses written texts", "It involves group discussion"], ans: 1, exp: "Socratic method works by refusing to simply give answers and instead constructing situations in which the learner's own reasoning and experience lead to truth. Buddha's mustard seed task is precisely this — the 'impossible' condition ensures Kisa Gotami discovers for herself what no sermon could have taught her." },
  { q: "ASSERTION: The sermon is more about the living than the dead.\nREASON: Buddha directs Kisa Gotami's attention from her dead son (unchangeable) to the living community of the bereaved (where compassion and action are possible).", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The sermon's subject is nominally death but its purpose is to redirect the living toward life. By encountering the grief of others, Kisa Gotami is pulled from solipsistic grief into a community of the bereaved — and the dead son is finally allowed to rest." },
  { q: "EXTRACT-BASED: 'He who has put aside the desires of the flesh…' What Buddhist concept does this phrase invoke and how does it connect to the sermon's main theme?", opts: ["The concept of dharma", "The concept of desire (Tanha) as the root of suffering — the sermon suggests that attachment and desire (including the desire to keep the dead alive) are the source of our grief", "The concept of karma", "The concept of rebirth"], ans: 1, exp: "The phrase invokes Tanha — craving or desire — which Buddhism identifies as the root of Dukkha (suffering). Kisa Gotami's grief is a form of Tanha: the desire to undo death, to keep what cannot be kept. The sermon teaches her to release this desire." },
  { q: "What is the literary genre of 'The Sermon at Benares' and how does this genre affect its meaning?", opts: ["It is a myth", "It is a parable embedded within a biographical frame — the parable form universalises a specific story, while the biographical frame lends it the authority of a historical teacher's life", "It is a fable", "It is a historical essay"], ans: 1, exp: "The parable form (Kisa Gotami's story) makes a universal truth vivid and specific — it is easier to understand mortality through one mother's grief than through abstract philosophy. The biographical frame (Buddha's life) gives the parable authority — it is not a story invented to teach but the recorded teaching of an enlightened person." },
  { q: "ASSERTION: The chapter suggests that wisdom requires discomfort.\nREASON: Kisa Gotami's wisdom was purchased at the price of exhausting, grief-deepening encounters with death in every household she visited.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. Buddha did not offer Kisa Gotami comfort — he offered her a task that deepened her confrontation with the very thing that was tearing her apart. The wisdom she gained was inseparable from the pain of the process. Comfort and wisdom are different things; the chapter chooses wisdom." },
  { q: "How does the text treat the concept of time in relation to grief and healing?", opts: ["Time heals all grief automatically", "The text suggests that time is not the healer — understanding is. Kisa Gotami's transformation happens in one evening, not over years; the change is cognitive and philosophical, not merely temporal", "Grief lasts forever", "The text does not address time"], ans: 1, exp: "The healing in the story is rapid — one evening of searching. This is significant: the text suggests that grief is not healed by the passage of time but by a shift in understanding. Once Kisa Gotami understands death's universality, her grief is transformed. Insight, not time, is the healer." },
  { q: "From a feminist reading, how might Kisa Gotami's story be interpreted?", opts: ["It shows women are weak", "It shows a woman's grief being validated, directed and transformed by a male teacher — but also shows a woman as the vehicle of the text's most powerful teaching", "It is irrelevant to feminism", "It shows women are wise"], ans: 1, exp: "A feminist reading notes the ambiguity: Kisa Gotami's grief is taken seriously (unusual for women in ancient texts), and her transformation is the story's moral centre. Yet she requires male guidance to find wisdom. The tension between her centrality and her dependence on a male teacher is productively ambiguous." },
  { q: "CASE-BASED: A student claims 'The Sermon at Benares' is relevant to modern grief counselling. What specific element of Buddha's method would modern psychologists recognise?", opts: ["The use of mustard seeds", "The use of peer normalisation — having a grieving person encounter others with similar grief — which is the basis of modern group therapy and grief support groups", "The use of religious rituals", "The use of silence"], ans: 1, exp: "Modern grief counselling extensively uses group therapy and peer support — the recognition that your grief is not unique, that others have survived similar losses. Kisa Gotami's house-to-house journey is exactly this: she discovers a community of the bereaved, which normalises and contextualises her own loss." },
  { q: "What does the story suggest about the relationship between love and grief?", opts: ["Love causes grief and is therefore harmful", "The depth of grief reflects the depth of love — Kisa Gotami's madness is the measure of her love; the story honours love while teaching that it must not become a refusal of reality", "Grief proves love was false", "Love and grief are unrelated"], ans: 1, exp: "The story never suggests that Kisa Gotami's love was wrong. Her grief is the consequence of her love. The text honours both while teaching that love which refuses to accept the death of the beloved traps the lover in suffering. True love, the story implies, ultimately includes the letting go." },
  { q: "How does 'The Sermon at Benares' function as a response to the universal human problem of mortality?", opts: ["It promises an afterlife", "It teaches that the problem of mortality is not death itself but the human refusal to accept it — and that accepting it, through wisdom, transforms suffering into peace", "It denies that death is a problem", "It suggests that only monks can find peace"], ans: 1, exp: "The text's answer to mortality is not escape (no afterlife is promised) but understanding. The 'problem' of death is reframed as the problem of our relationship to death. Change the relationship — through wisdom, acceptance, and recognition of universality — and the suffering is released. This is the sermon's ultimate answer." },
];

// ─────────────────────────────────────────────────────────────
//  THE PROPOSAL  (slug: the-proposal)
// ─────────────────────────────────────────────────────────────

const proposalPYQs = [
  {
    question: "Who are the main characters in 'The Proposal'? Describe each briefly.",
    answer: "The main characters are: Lomov — a nervous, hypochondriac landowner in his thirties who comes to propose marriage to Natalya; Natalya Stepanovna — Chubukov's daughter, quick-tempered and argumentative but eager for marriage; and Chubukov — Natalya's father, an excitable, self-important landowner who is delighted at the prospect of Lomov marrying his daughter. All three characters are comic figures who cannot control their tempers.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "What is the main theme of 'The Proposal'? How does Chekhov use comedy to explore it?",
    answer: "The main themes are the absurdity of marriage among the landowning class and the pettiness of human quarrels. Chekhov uses farce and comedy to expose how characters who claim to be in love (or interested in marriage) immediately lose themselves in arguments about trifles — land and dogs. The comedy reveals that their quarrels are driven by ego, property and stubbornness rather than genuine passion. Chekhov satirises a social class that values land over love.",
    year: 2022, marks: 5, difficulty: "hard",
  },
  {
    question: "What was the quarrel between Lomov and Natalya about the Oxen Meadows?",
    answer: "Lomov claimed that the Oxen Meadows belonged to him and had been in his family for generations. Natalya insisted that the meadows belonged to her family and produced records to prove it. Both refused to concede an inch. The argument became increasingly heated. The irony is that Lomov himself admits the meadows are worth very little — the quarrel is entirely about pride and principle rather than any real economic value.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the argument about the dogs begin? What does it reveal about the characters?",
    answer: "After the Oxen Meadows quarrel is momentarily resolved (Lomov collapses and recovers), a new quarrel begins over whose dog is superior — Lomov's Guess or Natalya's Squeezer. Both insist their dog is better quality and more valuable. The argument reveals that all three characters — Lomov, Natalya and even Chubukov — are incapable of basic civility or rational conversation. They are prisoners of their egos, unable to maintain even the veneer of polite society.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did Lomov come to Chubukov's house? Did he manage to achieve his purpose?",
    answer: "Lomov came to propose marriage to Natalya. He was thirty-five, suffering from palpitations and anxiety, and felt it was time to settle down. He had prepared himself with formal dress — white gloves and tails. However, he never managed to propose properly — every conversation descended into argument. He finally succeeded only at the very end, after collapsing and recovering, when Chubukov virtually forced the engagement. The proposal's ridiculous journey is the play's comic engine.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How does Chekhov portray Chubukov's character in the play?",
    answer: "Chubukov is portrayed as a bumbling, self-important man who is delighted at the prospect of getting his daughter married. He is initially welcoming to Lomov but loses his temper with great ease during arguments, calling Lomov names and threatening him. He is also hypocritical — he claims to love Lomov as a neighbour but joins in attacking him vigorously the moment an argument starts. His eagerness to get Natalya married overrides all dignity.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What are Lomov's physical complaints? How do they contribute to the comedy?",
    answer: "Lomov suffers from palpitations, a twitching left leg, numbness, a thumping heart, a lame side, and excruciating headaches. He is a hypochondriac — constantly aware of his own imagined ailments and using them to describe his deteriorating state during arguments. The comedy arises from the contrast between the seriousness with which he describes his symptoms and the trivial cause of his distress. His imagined medical catastrophes during quarrels about land and dogs reduce him to a figure of pure farce.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "What is the significance of the play being called 'a farce in one act'?",
    answer: "Calling it a 'farce' signals that the comedy is based on exaggeration, absurd situations and ridiculous characters rather than subtle wit. A farce relies on characters who are too extreme — too angry, too nervous, too quarrelsome — to function as real people. The 'one act' structure compresses all the absurdity into a single continuous scene, giving it the quality of a comic explosion: everything happens at once, with no time for reflection or de-escalation.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Why does Natalya demand that Lomov return when she discovers he came to propose?",
    answer: "When Chubukov reveals to Natalya that Lomov had come to propose and she had driven him away with her quarrelling, she is immediately seized by the desire to get him back. She had been willing to argue bitterly moments before but the prospect of losing a suitor galvanises her. This sudden reversal is comic — her desire for marriage overrides all the righteous anger she had just displayed. She is as quickly eager to please Lomov as she had been eager to quarrel with him.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the play comment on the relationship between the landowning class and property?",
    answer: "The play satirises a class for whom property — even worthless property like the Oxen Meadows — is a matter of existential pride. Lomov himself admits the meadows are not worth the paper the argument is written on, yet he cannot concede them. The landowning class in the play defines itself through property; to yield on property is to yield on identity. Chekhov exposes this as absurdity — a class so attached to land that it cannot sustain basic human relationships without them becoming property disputes.",
    year: 2023, marks: 5, difficulty: "hard",
  },
  {
    question: "How does the play's ending reinforce its satirical message?",
    answer: "The play ends with the 'happy couple' immediately resuming their argument — now about the dogs — even as Chubukov tries to toast their engagement. The ending is the play's most pointed satirical statement: marriage, presented as a solution to their quarrelling, changes nothing. The quarrel is congenital — built into their characters. The wedding will be exactly like the courtship: an endless argument punctuated by collapses and recoveries. Chekhov denies his characters any romantic transformation.",
    year: 2022, marks: 5, difficulty: "hard",
  },
  {
    question: "Describe the comic technique Chekhov uses in the scene where Chubukov throws Lomov out and then immediately brings him back.",
    answer: "This scene uses the farce technique of rapid reversal. Chubukov erupts in fury and throws Lomov out, calling him names. Then Natalya reveals that Lomov was there to propose — and Chubukov instantly transforms, calling Lomov back and speaking of him with warmth. The speed of the reversal is the joke — there is no reflection or remorse, just an instantaneous flip of attitude driven entirely by self-interest (getting his daughter married). The technique exposes how social behaviour is governed by interest, not genuine feeling.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How does Chekhov characterise Natalya? Is she a sympathetic character?",
    answer: "Natalya is quick-tempered, argumentative and unwilling to concede any point. She matches Lomov's stubbornness exactly and betters him in aggression. She is not conventionally sympathetic — she engages in pointless quarrels, speaks cruelly of Lomov and shows no genuine warmth. However, she is comic rather than villainous. Her eagerness for marriage when she realises Lomov's purpose gives her a more pitiable dimension — she is a woman of the landowning class whose fate depends on marriage, which somewhat contextualises her brittleness.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "What does 'The Proposal' suggest about romantic love among the Russian landowning class?",
    answer: "The play suggests that romantic love is largely absent from marriage negotiations in this class. Lomov comes to propose not because he loves Natalya but because he is getting old, needs to settle down, and she is a suitable neighbour. Natalya has no particular feeling for Lomov until she hears he is a suitor, at which point practical calculation overtakes everything. Love is entirely secondary to property, age, social suitability and the fear of dying unmarried.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How does Chekhov use the structure of the one-act play to maximise comic effect?",
    answer: "By condensing everything into one act with no scene changes, Chekhov creates a pressure-cooker of comic tension. There is no time for reflection between quarrels — one argument leads directly into the next, escalating in intensity. Lomov collapses and revives, Chubukov explodes and retreats, Natalya reverses entirely. The tight structure ensures that the absurdity accumulates without release, building to a climax where the characters are simultaneously engaged and engaged-to-be-married.",
    year: 2023, marks: 5, difficulty: "hard",
  },
  {
    question: "What is the significance of Lomov arriving in formal dress (white gloves, tails) for a proposal that never properly happens?",
    answer: "Lomov's formal dress is a visual comic irony — he has prepared the costume of a proposal without being able to perform the words. The elaborate formality of white gloves and evening dress signals the social weight he attaches to the occasion; the fact that he never manages to propose despite this preparation reduces the formality to farce. His dress is the external sign of intention that his character — nervous, argumentative, easily provoked — persistently undermines.",
    year: 2022, marks: 2, difficulty: "easy",
  },
];

const proposalEasy = [
  { q: "Who wrote 'The Proposal'?", opts: ["Leo Tolstoy", "Anton Chekhov", "Fyodor Dostoevsky", "Ivan Turgenev"], ans: 1, exp: "Anton Chekhov (1860–1904) was a Russian playwright and short story writer. 'The Proposal' is one of his famous one-act comedies." },
  { q: "What is the sub-genre of 'The Proposal'?", opts: ["Tragedy", "Melodrama", "A farce in one act", "A comedy in three acts"], ans: 2, exp: "Chekhov specifically called 'The Proposal' a 'farce in one act' — a broad comic form relying on exaggerated characters, misunderstandings and rapid reversals." },
  { q: "Why did Lomov come to Chubukov's house?", opts: ["To borrow money", "To discuss land boundaries", "To propose marriage to Natalya", "To return a borrowed horse"], ans: 2, exp: "Lomov came dressed formally (white gloves, evening dress) with the specific purpose of proposing marriage to Natalya Stepanovna." },
  { q: "What was the first subject of quarrel between Lomov and Natalya?", opts: ["The dogs", "The Oxen Meadows", "A horse", "Money"], ans: 1, exp: "The first argument was about who owned the Oxen Meadows — both Lomov and Natalya claimed the land belonged to their respective families." },
  { q: "What were the names of the dogs they argued about?", opts: ["Spot and Rover", "Guess and Squeezer", "Rex and Max", "Bruno and Buster"], ans: 1, exp: "The second quarrel was about Lomov's dog Guess and Natalya's dog Squeezer — both claimed their dog was of superior breeding and quality." },
  { q: "What ailment does Lomov suffer from?", opts: ["Asthma", "Hypochondria — he constantly complains of palpitations, a twitching leg and headaches", "Blindness", "Paralysis"], ans: 1, exp: "Lomov is a hypochondriac who constantly monitors and reports his physical symptoms — palpitations, a thumping heart, a numb side — which always seem to worsen during arguments." },
  { q: "How does Chubukov react when he hears that Lomov has come to propose to Natalya?", opts: ["He is angry", "He pretends not to care", "He is overjoyed and embraces Lomov warmly", "He asks Lomov to come back later"], ans: 2, exp: "Chubukov is delighted and immediately embraces Lomov, exclaiming with joy that his dream is being fulfilled — he was clearly eager to get his daughter married." },
  { q: "What happens to Lomov physically during the quarrel?", opts: ["He faints / collapses", "He runs away", "He laughs uncontrollably", "He starts shouting and breaks things"], ans: 0, exp: "In the midst of the heated argument, Lomov collapses — his palpitations and anxiety get the better of him and he falls down, apparently unconscious." },
  { q: "How does Natalya react when she discovers Lomov had come to propose?", opts: ["She is angry and refuses to see him", "She is relieved and says she knew it all along", "She is horrified she drove him away and immediately demands he be brought back", "She is indifferent"], ans: 2, exp: "The moment Chubukov reveals Lomov's purpose, Natalya's attitude completely reverses — she becomes desperate to get him back, commanding her father to bring him in immediately." },
  { q: "In what country is the play set?", opts: ["Poland", "Ukraine", "Russia", "Germany"], ans: 2, exp: "The play is set in rural Russia, among the landed gentry — the class of small landowners who were a staple of Chekhov's satirical work." },
  { q: "What formal attire does Lomov wear to the proposal?", opts: ["Military uniform", "White gloves and evening tails (dress coat)", "A suit and top hat", "Traditional Russian dress"], ans: 1, exp: "Lomov arrives in white gloves and evening tails — full formal dress — as though the proposal were a grand social ceremony, which adds to the comedy when it deteriorates into argument." },
  { q: "What does the title 'The Proposal' refer to?", opts: ["A business proposal", "A marriage proposal that forms the play's occasion and comic engine", "A proposal for buying land", "A political proposal"], ans: 1, exp: "The title refers to Lomov's marriage proposal to Natalya — the event that never quite happens properly because every attempt descends into quarrel." },
  { q: "How does the play end?", opts: ["Lomov leaves without proposing", "The engagement is made but the couple immediately start arguing again", "Natalya rejects Lomov", "Chubukov refuses the proposal"], ans: 1, exp: "Chubukov virtually forces the engagement — they are declared engaged — but within seconds the couple are quarrelling again about the dogs. The play ends in farce exactly as it began." },
  { q: "What is Natalya's relationship to Chubukov?", opts: ["She is his wife", "She is his niece", "She is his daughter", "She is his housekeeper"], ans: 2, exp: "Natalya Stepanovna is Chubukov's daughter — a grown woman who runs the household and whom her father is eager to see married." },
  { q: "What does Lomov say about the value of the Oxen Meadows?", opts: ["They are worth a fortune", "They are priceless", "They are worth very little — the argument is not about money but about principle and pride", "They produce excellent crops"], ans: 2, exp: "Lomov himself admits during the argument that the Oxen Meadows are not economically significant — the quarrel is entirely about pride and the principle of ownership, not actual monetary value." },
];

const proposalMedium = [
  { q: "How does Chekhov use Lomov's hypochondria as a comic device?", opts: ["To show he is genuinely ill", "To satirise the Russian gentry's excessive self-pity and anxiety — his real ailments are trivial but he treats them as catastrophic, mirroring how he treats his trivial quarrels as existential crises", "To create sympathy for him", "To show the poor health of the rural class"], ans: 1, exp: "Lomov's hypochondria mirrors his approach to disputes: the trivial is inflated to the catastrophic. Just as he treats a minor land dispute as a matter of honour requiring death, he treats mild anxiety as a mortal threat. The comic symmetry between his medical and social self-importance defines his character." },
  { q: "What does the play suggest about the relationship between property and identity for the Russian landowning class?", opts: ["Property was unimportant to them", "Property was so central to their identity that yielding even worthless land felt like yielding their very selves — it was existential, not economic", "They were interested in money only", "The play does not address property"], ans: 1, exp: "The Oxen Meadows quarrel is not about money — Lomov admits the land is worth little. It is about identity. To concede the land is to concede who you are. This is Chekhov's satirical point: a class so invested in property that it confuses land with selfhood." },
  { q: "How does the character of Chubukov reflect Chekhov's satire of the older generation of landowners?", opts: ["He is depicted as wise and calm", "He is self-important, hypocritical and explosive — his eagerness for his daughter's marriage overrides all dignity, exposing the social calculations beneath the surface of landed-gentry hospitality", "He is a sympathetic father figure", "He represents the best of Russian society"], ans: 1, exp: "Chubukov claims warmth and neighbourliness but loses all composure the moment his interests are threatened. His rapid transformation from host to insulter to matchmaker exposes the social performance beneath the civility of his class." },
  { q: "Why is the second quarrel (about the dogs) structurally important in the play?", opts: ["It provides more information about the characters", "It shows that the first quarrel was an anomaly", "It demonstrates that the quarrelling is not about specific issues but about the characters' fundamental inability to sustain civil interaction — it is who they are, not what they are arguing about", "It is the climax of the play"], ans: 2, exp: "The second quarrel proves the play's deeper point. If the first quarrel were about something specific (land rights), it could be resolved. But the moment one topic is laid aside, a new quarrel begins about something equally trivial. The quarrelling is existential — it is their nature." },
  { q: "How does the play use dramatic irony in the scene where Lomov tries to propose?", opts: ["The audience does not know he is proposing", "The audience knows Lomov's purpose while the characters repeatedly miss it — Lomov keeps almost getting to the proposal before being diverted into argument", "Natalya knows Lomov is proposing and hides it", "There is no dramatic irony"], ans: 1, exp: "The audience knows Lomov's purpose from the start. Every time he steers the conversation toward a proposal, a new argument erupts. This dramatic irony — we see the proposal being perpetually derailed while the characters lose themselves in trivialities — is the play's central comic mechanism." },
  { q: "What does Natalya's rapid transformation (from arguing to wanting Lomov back) suggest about marriage in this society?", opts: ["She is genuinely in love with Lomov", "It shows that marriage was a practical necessity rather than an emotional choice — the fear of remaining unmarried overrides all other considerations instantly", "She suddenly realises Lomov is right", "She is testing him"], ans: 1, exp: "Natalya's instantaneous reversal — from bitter quarreller to desperate suitor-hunter — reveals that her motivation is entirely practical. Marriage in this class is a social and economic arrangement; romantic feeling is irrelevant. The prospect of losing a suitor turns her arguments to dust immediately." },
  { q: "How does the play use repetition as a comic device?", opts: ["Characters repeat the same words for effect", "The structure of: normal conversation → trivial provocation → escalating insults → collapse/explosion → forced resolution is repeated twice, showing the characters are incapable of breaking the cycle", "Names are repeated for identification", "Comic phrases are repeated for laughs"], ans: 1, exp: "The same structural pattern repeats with both quarrels: civility, provocation, escalation, explosion, forced resolution. The repetition of the pattern is itself the joke — these characters are trapped in a comic cycle they cannot escape, regardless of the topic." },
  { q: "What is the effect of having all three characters argue simultaneously?", opts: ["It creates confusion intentionally", "It creates farce through cacophony — rational communication becomes impossible when all three are simultaneously shouting, mirroring how their social class has lost the ability to hear anyone other than itself", "It shows they are all correct", "It is a staging error"], ans: 1, exp: "The three-way argument is the play's farcical peak. When all three are shouting simultaneously, communication has completely broken down. Chekhov uses this sonic chaos to dramatise the complete social dysfunction of this class — they make noise but cannot communicate." },
  { q: "How does Chekhov use Lomov's nervousness to satirise the male ego?", opts: ["He shows men are physically weak", "Lomov's nervousness makes his eventual aggression more comic — he is terrified before the proposal but becomes blustering and combative once challenged; the fragile male ego performs strength while being fundamentally anxious", "He sympathises with Lomov's anxiety", "Male nervousness is not satirised"], ans: 1, exp: "The contrast between Lomov's extreme pre-proposal anxiety and his subsequent combative stubbornness in the quarrels exposes the male ego's fragility. He is not confident — he is defending against his own insecurity. The blustering is a performance masking the anxiety." },
  { q: "How does the setting of a single room contribute to the play's themes?", opts: ["It is a practical staging choice", "The single room mirrors the characters' psychological confinement — they cannot escape each other or their own patterns; the claustrophobic setting amplifies the farce", "It reduces production costs", "The setting is symbolic of poverty"], ans: 1, exp: "The single room creates the claustrophobic pressure that farce requires. There is no escape — from the room, from each other, from their own temperaments. The physical confinement mirrors the characters' psychological confinement in their class, their habits and their egos." },
  { q: "What does the play suggest about the nature of communication between men and women of this class?", opts: ["Men and women communicate well", "Communication between the genders is shown to be impossible — conversations immediately become battles, with neither side capable of listening or yielding", "Women are better communicators than men", "Communication fails only because of property disputes"], ans: 1, exp: "Every attempted conversation between Lomov and Natalya becomes a battle. Neither listens; both are perpetually poised to take offence and assert superiority. The play satirises a social environment in which genuine conversation between men and women of this class has been replaced by competitive performance." },
  { q: "How does the play comment on the institution of marriage through its comic action?", opts: ["Marriage is portrayed as a beautiful institution", "The play satirises marriage as a social transaction conducted by argumentative, ego-driven people who have no idea how to relate to each other — love is entirely absent from the proceedings", "Marriage is shown to be impossible", "The play celebrates the Russian tradition of arranged marriage"], ans: 1, exp: "The entire play is a sustained satire on marriage as practised by this class. The would-be groom is a nervous hypochondriac who argues rather than woos. The bride argues rather than encourages. The father is a scheming matchmaker. Love is nowhere in the picture — it is social and economic calculation all the way down." },
  { q: "What does the title 'The Proposal' ironically suggest given the play's action?", opts: ["A proposal that succeeds easily", "The title ironically foregrounds something that almost doesn't happen — the proposal is the occasion for three quarrels and two collapses before it barely staggers to completion", "The title refers to a different kind of proposal", "There is no irony in the title"], ans: 1, exp: "The title's irony is in the gap between what it announces (a marriage proposal — a romantic occasion) and what actually occurs (a farce of quarrels, collapses and insults). The proposal barely happens, and when it does, it is immediately buried under further argument." },
  { q: "How does the play use the concept of 'face-saving' in the quarrel scenes?", opts: ["Characters are honest and direct", "All three characters are incapable of backing down because to concede any point would be to lose face — the quarrels are really performances of social status and pride", "Face-saving only matters to Chubukov", "The play does not address this"], ans: 1, exp: "Every argument in the play is essentially a performance of social pride. None of the characters can concede because concession means losing face — admitting inferiority. The quarrels are not about the actual subjects (land, dogs) but about who will be seen to yield first. This is a satire of social vanity." },
  { q: "How does Chekhov balance character consistency with comic surprise in this play?", opts: ["Characters are entirely unpredictable", "Each character is consistent in type (Lomov anxious and combative, Natalya stubborn, Chubukov self-interested) but the comic surprise comes from how these consistent types collide in unpredictable combinations", "Characters change completely throughout", "The play has no comic surprises"], ans: 1, exp: "Farce requires both consistency (we need to recognise the types) and surprise (the collisions must be unexpected). Chekhov achieves this by making his characters absolutely consistent in temperament but putting them in situations where these consistent temperaments create unexpected, escalating chaos." },
  { q: "What does the play suggest about the difference between what people say and what they want?", opts: ["Characters always say what they want", "A consistent gap runs between stated positions (pride, principle, love of truth) and actual desires (marriage, social approval, not losing face) — the comedy lives in this gap", "The characters are always honest", "The play does not explore this distinction"], ans: 1, exp: "Lomov says he values truth and principle; he actually wants to marry and not be embarrassed. Natalya says she values justice; she actually wants a husband. Chubukov says he values neighbourliness; he actually wants his daughter off his hands. The comedy is the gap between performance and desire." },
];

const proposalHard = [
  { q: "ASSERTION: 'The Proposal' is a satire on the Russian landowning class as a whole, not just on three individuals.\nREASON: The characters' flaws — quarrelsomeness, ego, property obsession — are presented as class characteristics rather than individual pathologies.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. Chekhov is not merely laughing at Lomov's hypochondria or Natalya's temper — he is using these characters as specimens of a class. Their flaws are systematic: the same class produced the same types, making the satire social rather than merely personal." },
  { q: "CASE-BASED: A student argues the play is misogynistic because it portrays Natalya as aggressive and marriage-hungry. How would you challenge this reading?", opts: ["The student is correct", "Natalya's aggression is not presented as female weakness — all three characters are equally ridiculous; and Natalya's marriage anxiety reflects a real social constraint (women's dependence on marriage) rather than a personal failing", "The student's reading is partially correct", "The play is entirely favourable to women"], ans: 1, exp: "Natalya is no more ridiculous than Lomov or Chubukov. All three are equally comic and equally flawed. Moreover, her marriage anxiety is contextualised by the real social reality of women's dependence on marriage in 19th century Russia — her desperation is a social condition, not a personality flaw." },
  { q: "EXTRACT: 'I am chilled, I am overwrought, I am deeply troubled.' (Lomov) What does this string of self-reports reveal?", opts: ["Lomov is genuinely ill", "The string of self-reports reveals his narcissism and self-dramatisation — he catalogues his internal states as though they were medical emergencies, making himself the dramatic centre of every scene", "He is cold from the weather", "It is a realistic depiction of anxiety disorder"], ans: 1, exp: "The list is a verbal performance of self-importance. Lomov experiences himself as the suffering centre of the universe; the accumulation of complaints is both comic (the triviality of the cause) and satirical (the self-absorption of the class that produced him)." },
  { q: "ASSERTION: The play's ending is its most satirical moment.\nREASON: The couple are simultaneously 'united' in engagement and divided in argument — the institution of marriage is exposed as incompatible with these characters' natures.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The ending perfectly dramatises the play's satirical thesis: marriage among this class resolves nothing because the problem is not the absence of a formal relationship but the fundamental incapacity for genuine human connection. The engagement and the argument coexist — the institution changes nothing." },
  { q: "CASE-BASED: The drama teacher asks students to identify the 'funniest moment' in the play. A student picks Chubukov's rapid transformation from Lomov's enemy to Lomov's champion. Why is this moment both funny and satirically important?", opts: ["It is funny because Chubukov forgets his anger", "It is funny because of its speed (no reflection, no remorse) and satirically important because it exposes how self-interest instantly overrides genuine feeling and social performance in this class", "It is funny because Chubukov apologises", "It is not an important moment"], ans: 1, exp: "The speed of Chubukov's reversal — from 'get out of my house!' to 'my dear fellow, come in, come in!' — is farcically funny. Its satirical importance lies in what it reveals: that social behaviour in this class is entirely performance and self-interest, with no genuine emotion at its core." },
  { q: "EXTRACT: 'Of course you may consider yourself always in the right, but really, Lomov, I shall regard you as a neighbour and a friend...' What comic and rhetorical technique does this use?", opts: ["It is a straightforward compliment", "It uses the rhetorical structure of 'I will be generous although you are wrong' — which is actually an aggressive assertion of moral superiority disguised as magnanimity; the offer of neighbourliness is a performance of dominance", "It is a genuine offer of friendship", "It is ironic in a straightforward way"], ans: 1, exp: "The structure 'of course you are wrong, but I will be generous anyway' is not genuine forgiveness — it is a power move. Natalya is asserting her correctness while performing magnanimity. The disguised aggression in apparent sweetness is both comic and psychologically precise." },
  { q: "How does Chekhov use time compression in the one-act structure to amplify the satire?", opts: ["Short plays are easier to watch", "By compressing an entire courtship (proposal, two quarrels, collapse, engagement) into one continuous scene, Chekhov denies his characters any time for reflection or growth — the speed of events mirrors the characters' lack of self-awareness", "Time compression is a staging requirement", "The single act structure was required by the theatre"], ans: 1, exp: "The one-act compression is a satirical tool. Real human beings, given time, might reflect and change. Chekhov denies his characters this luxury — events move so fast that no character can pause to examine their behaviour. The speed of the play enacts the speed of their thoughtlessness." },
  { q: "ASSERTION: The dogs in 'The Proposal' function as comic doubles of their owners.\nREASON: The quarrel about whose dog is superior mirrors the characters' own competition for social superiority.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The dogs' 'superiority' is a displaced version of the characters' competition for superiority over each other. By arguing about whose dog is better, they are really arguing about whose social status is higher. The dogs are proxies for the owners' egos." },
  { q: "CASE-BASED: A director wants to update 'The Proposal' for a modern audience. What would need to change and what would remain universal?", opts: ["Everything would need to change", "The specific markers (land, class, dogs) would change but the universal elements — ego-driven quarrels, miscommunication, the gap between stated principles and actual desires — remain entirely relevant to any modern audience", "Nothing would need to change", "Only the language would need updating"], ans: 1, exp: "The specific content (Oxen Meadows, hunting dogs as status symbols) is period-specific. But the dynamics — two people who want to connect but cannot stop arguing, a parent desperate to marry off a child, the performance of social status — are timeless and map easily onto any modern social context." },
  { q: "EXTRACT: 'Oh, how much I love you! My palpitations have ceased, my heart has stopped thumping!' What is ironic about this declaration of love?", opts: ["It is a sincere declaration", "The irony is that Lomov's declaration of love is framed in terms of his own physical wellbeing — his love is measured by the absence of his hypochondriac symptoms, making it narcissistically about himself rather than about Natalya", "His heart has literally stopped", "He is being poetic"], ans: 1, exp: "The declaration is nominally romantic but structurally narcissistic — he loves her because she has cured his palpitations. Love, for Lomov, is a self-health management strategy. The irony exposes how incapable he is of genuine other-directed feeling; even his love is about himself." },
  { q: "How does the play reflect Chekhov's broader theatrical philosophy of showing life's absurdity through ordinary, undramatic situations?", opts: ["Chekhov preferred historical dramas", "Chekhov consistently used the mundane and trivial (a proposal, a land dispute) to expose the profound absurdity of human behaviour — he believed tragicomedy lived in the ordinary, not in melodrama", "The play is unusual for Chekhov", "Chekhov was not interested in social satire"], ans: 1, exp: "Chekhov's greatness lies in finding the profound in the mundane. A marriage proposal is not a grand dramatic event — it is an ordinary social transaction. Yet within it, Chekhov finds the full absurdity of human ego, miscommunication and self-deception. The ordinary is his laboratory for universal observation." },
  { q: "ASSERTION: All three characters in 'The Proposal' are simultaneously comic and pitiable.\nREASON: Their flaws trap them in patterns they cannot escape — their suffering is as real as their ridiculousness.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. Chekhov's comedy is tragicomic — Lomov genuinely suffers from anxiety; Natalya genuinely fears remaining unmarried; Chubukov genuinely wants his daughter's happiness. Their suffering is real even as their behaviour is absurd. The pity and the laughter coexist, which is what makes Chekhov great." },
  { q: "EXTRACT-BASED: 'You can consider your estate your own, but I'll not give up the meadows, you'll not get them — I tell you positively.' What does Natalya's structure of concession-plus-refusal reveal?", opts: ["She is being reasonable", "The structure reveals the game of social combat — the apparent concession ('you can have your estate') is actually an escalation, making her refusal about the meadows seem more dramatically absolute by contrast", "She is trying to compromise", "She is confused about the boundaries"], ans: 1, exp: "The concession is rhetorical, not genuine — she gives something that was never in dispute to make her refusal seem magnanimous. This is the rhetoric of social combat: appear reasonable while being absolutely immovable. The structure reveals sophisticated, if unconscious, social aggression." },
  { q: "How does 'The Proposal' function differently when read versus performed? What does performance add?", opts: ["They are equivalent experiences", "Performance adds the physical comedy (collapses, frantic entrances/exits), the vocal cacophony of simultaneous shouting, and the visual irony of formal dress in farcical circumstances — all of which cannot be fully conveyed in reading", "Reading is a richer experience", "Performance detracts from the wit"], ans: 1, exp: "The play is written for performance — its physical comedy (Lomov collapsing), its soundscape (three people shouting simultaneously) and its visual irony (the formal dress) are fully realised only in performance. Reading conveys the wit; performance delivers the farce. The play requires bodies in space to achieve its full comic effect." },
  { q: "How does the class structure of the play reveal Chekhov's attitude toward the Russian landowning class?", opts: ["Chekhov admires the landowning class", "Chekhov's attitude is one of affectionate contempt — he finds the class ridiculous and limited but also recognisably human; he laughs at them rather than condemning them, but the laughter is a form of critique", "Chekhov is indifferent to class", "Chekhov is a revolutionary who hates the class"], ans: 1, exp: "Chekhov's satire is never simple condemnation — it is too humanising for that. He finds his characters comic rather than villainous. But the comedy is the critique: a class so consumed by property, ego and status that it cannot sustain genuine human connection is a class in decline. The laughter is Chekhov's eulogy." },
  { q: "What is the significance of Lomov and Natalya agreeing on almost nothing, but both wanting the same thing (marriage)?", opts: ["It shows they are incompatible", "It dramatises the gap between what people want and what their behaviour produces — they both want marriage but their egos drive them to behaviour that almost prevents it; they are simultaneously their own obstacle and goal", "It is a plot coincidence", "It shows the play has a happy ending"], ans: 1, exp: "The central dramatic irony is that both characters want exactly the same thing (marriage to each other) but their behaviour consistently prevents it. They are their own obstacles. This is the play's deepest comic and philosophical point: humans often most efficiently destroy the things they most desire." },
  { q: "ASSERTION: Chekhov's comedy in 'The Proposal' is fundamentally about failed communication.\nREASON: Every scene demonstrates that the characters are constitutionally unable to listen, understand or compromise — communication is performance, not genuine exchange.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both are true and causally linked. The play's comedy is generated by communication failure. No character genuinely hears another — they all wait for their turn to perform their own position. The reason accurately identifies the structural communication failure that drives every scene." },
];

const dustOfSnowPYQs = [
  {
    question: "What is a ‘dust of snow’? How did it change the poet’s mood?",
    answer: "‘Dust of snow’ refers to the fine particles or flakes of snow. When the crow shook it down on the poet, it changed his mood instantly. The poet, who had been feeling sad and regretful, became refreshed and cheerful. This small moment shows how nature can quietly heal a troubled mind.",
    year: 2025,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "Why did the poet use a crow and a hemlock tree in the poem?",
    answer: "The crow and the hemlock tree are traditionally associated with bad luck, sorrow, and negativity. Frost uses them to create irony and contrast. Instead of bringing harm, they become the means of a positive emotional change. This shows that even unpleasant or unexpected things in nature can bring comfort and renewal.",
    year: 2024,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "What was the poet probably doing when the dust of snow fell on him?",
    answer: "The poet was probably standing under or walking near a hemlock tree when the crow shook the snow on him. He was in a gloomy state of mind and had been regretting part of his day. The incident happened suddenly and unexpectedly. It transformed his mood from sadness to hope.",
    year: 2023,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "How does the poem show the healing power of nature?",
    answer: "The poem shows that a small natural incident can change a human being’s emotional state. The falling snow, caused by a crow from a hemlock tree, refreshes the poet’s heart. His sorrow and regret are replaced by a lighter mood. Frost suggests that nature has the power to soothe, revive, and heal.",
    year: 2022,
    marks: 5,
    difficulty: "hard"
  },
  {
    question: "What is the significance of the poem’s title, ‘Dust of Snow’?",
    answer: "The title refers to the tiny snow particles that fall on the poet. Though small and ordinary, they bring about a major emotional change. The title is symbolic because it shows how a minor event can have a deep impact. It reflects the poem’s message that simple moments can transform our thoughts and feelings.",
    year: 2021,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "How does the poet’s mood change in the poem?",
    answer: "At the beginning, the poet is sad, regretful, and gloomy. He feels that part of his day has been wasted. After the snow falls on him, his mood changes instantly. He becomes refreshed, relieved, and positive, showing the sudden power of a small natural moment.",
    year: 2025,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "What is the role of the crow in the poem?",
    answer: "The crow acts as the agent that shakes the dust of snow from the tree onto the poet. It is important because it becomes the unintentional cause of the poet’s emotional change. The crow is usually a symbol of bad omen, but here it unexpectedly helps the poet. This adds irony to the poem.",
    year: 2024,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "What does the hemlock tree symbolise in the poem?",
    answer: "The hemlock tree symbolises sadness, negativity, and gloom. It is traditionally linked with poison and death. Frost deliberately uses such a dark image to make the final change more striking. The positive effect of the snow stands out against the tree’s negative association.",
    year: 2023,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "How is irony used in ‘Dust of Snow’?",
    answer: "The irony lies in the fact that symbols usually associated with bad luck or sorrow — a crow and a hemlock tree — become the source of happiness. Instead of causing harm, they bring a refreshing change in the poet’s mood. This reversal of expectation is the central irony of the poem. It strengthens the poem’s message of unexpected positivity.",
    year: 2022,
    marks: 5,
    difficulty: "hard"
  },
  {
    question: "What message does Robert Frost give through the poem?",
    answer: "Frost’s message is that even the smallest incidents can change a person’s outlook. He also suggests that nature has a calming and healing effect on the human mind. The poem encourages readers to value simple, everyday experiences. It shows that hope can come from unexpected sources.",
    year: 2021,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "Why is the poem considered simple but meaningful?",
    answer: "The poem uses very few words and a simple incident, yet it carries a deep message. The poet turns an ordinary event into a symbol of emotional renewal. The brevity of the poem makes its impact stronger. Its simplicity helps readers understand the universal truth hidden in it.",
    year: 2025,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "Explain the significance of the word ‘rued’ in the poem.",
    answer: "The word ‘rued’ means regretted or felt sorry about. It tells us that the poet was already unhappy before the snow fell on him. This word helps establish the sad mood at the beginning of the poem. The sudden change in mood becomes more effective because of this contrast.",
    year: 2024,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "Why does the poet say that the dust of snow gave his heart a change of mood?",
    answer: "The poet says this because the small snowfall unexpectedly lifted his spirits. His sadness and regret were replaced by a new sense of freshness and hope. The word ‘heart’ shows that the change was emotional and deep. The line highlights the poem’s focus on inner transformation.",
    year: 2023,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "What does the poem suggest about the relationship between human beings and nature?",
    answer: "The poem suggests that human beings are emotionally connected to nature. A simple natural event can affect the mind and heart deeply. Nature is shown not as decoration, but as a source of healing and change. Frost presents it as a quiet but powerful force in human life.",
    year: 2022,
    marks: 5,
    difficulty: "hard"
  },
  {
    question: "How does the ending of the poem make it effective?",
    answer: "The ending shows a clear emotional shift from sorrow to relief. The poet’s heart changes after the dust of snow falls on him. This short ending gives the poem a hopeful and uplifting note. It leaves the reader with the idea that small moments can make a big difference.",
    year: 2021,
    marks: 3,
    difficulty: "medium"
  }
];

const dustOfSnowEasy = [
  { q: "Who wrote the poem ‘Dust of Snow’?", opts: ["William Wordsworth", "Robert Frost", "John Keats", "P. B. Shelley"], ans: 1, exp: "‘Dust of Snow’ was written by Robert Frost. The other poets are incorrect." },
  { q: "What fell on the poet?", opts: ["Rain", "Leaves", "Dust of snow", "Sand"], ans: 2, exp: "The poet says that dust of snow fell on him from a tree. The other options are not mentioned in the poem." },
  { q: "Which bird is mentioned in the poem?", opts: ["Sparrow", "Crow", "Pigeon", "Parrot"], ans: 1, exp: "A crow is mentioned in the poem. The other birds do not appear in the text." },
  { q: "From which tree did the snow fall?", opts: ["Mango tree", "Oak tree", "Hemlock tree", "Pine tree"], ans: 2, exp: "The snow fell from a hemlock tree. This tree is associated with gloom and negativity." },
  { q: "What does ‘rued’ mean?", opts: ["Rejoiced", "Regretted", "Ignored", "Expected"], ans: 1, exp: "‘Rued’ means regretted. It shows that the poet was unhappy before the incident." },
  { q: "What happened to the poet’s mood?", opts: ["It became worse", "It did not change", "It changed for the better", "It became angry"], ans: 2, exp: "The poet’s mood changed from sadness to happiness after the dust of snow fell on him." },
  { q: "What is the poem mainly about?", opts: ["A journey", "A change of mood", "A storm", "A war"], ans: 1, exp: "The poem mainly shows a change in the poet’s mood due to a small natural event." },
  { q: "Which tree is traditionally linked with poison?", opts: ["Neem tree", "Banyan tree", "Hemlock tree", "Peepal tree"], ans: 2, exp: "The hemlock tree is traditionally linked with poison and death. The poem uses it for contrast." },
  { q: "What kind of change did the poet experience?", opts: ["Physical change", "Emotional change", "Seasonal change", "Geographical change"], ans: 1, exp: "The poet experienced an emotional change. His mood improved after the snowfall." },
  { q: "The poem belongs to which form?", opts: ["Short story", "Lyric poem", "Novel", "Play"], ans: 1, exp: "‘Dust of Snow’ is a lyric poem. It is short and expresses a moment of feeling." },
  { q: "The crow in the poem is best seen as a symbol of:", opts: ["Joy only", "Bad omen traditionally", "Wealth", "Friendship"], ans: 1, exp: "The crow is traditionally a symbol of bad omen, but in the poem it becomes positive through irony." },
  { q: "The dust of snow is best described as:", opts: ["Heavy snow", "Tiny snow particles", "Rainwater", "Ice cubes"], ans: 1, exp: "Dust of snow means fine snow particles. The phrase emphasizes the smallness of the event." },
  { q: "What changed the poet’s heart?", opts: ["The crow’s song", "The falling snow", "The hemlock tree", "The wind"], ans: 1, exp: "The falling snow changed the poet’s heart and mood. The crow only helped shake it down." },
  { q: "How does the poem end?", opts: ["Sadly", "With a moral lesson", "With a mood change", "With a question"], ans: 2, exp: "The poem ends with a clear change in the poet’s mood, making the ending positive." },
  { q: "What is the tone of the poem at the end?", opts: ["Hopeless", "Cheerful", "Fearful", "Angry"], ans: 1, exp: "The tone becomes cheerful and hopeful after the snowfall changes the poet’s mood." }
];

const dustOfSnowMedium = [
  { q: "Why does Frost choose a crow and a hemlock tree?", opts: ["To show a royal scene", "To create contrast and irony", "To describe a festival", "To make the poem comic"], ans: 1, exp: "The crow and hemlock tree are negative symbols, so their use creates strong contrast when they lead to a positive mood change." },
  { q: "What does the poem suggest about small incidents?", opts: ["They are never important", "They can change our feelings deeply", "They only disturb us", "They are meaningless"], ans: 1, exp: "The poem shows that even a tiny event can alter a person’s emotional state. The other options contradict the poem’s message." },
  { q: "What is the effect of using the word ‘heart’ in the poem?", opts: ["It shows physical pain", "It shows emotional transformation", "It shows hunger", "It shows illness"], ans: 1, exp: "The heart refers to feelings and emotions. The poet is describing an inner change, not a physical one." },
  { q: "Why is the poem considered reflective?", opts: ["It tells a long story", "It makes the reader think about mood and nature", "It has many characters", "It explains science"], ans: 1, exp: "The poem reflects on how nature affects human mood. It invites the reader to think about a small but meaningful experience." },
  { q: "What is the central irony of the poem?", opts: ["A happy bird causes sadness", "A negative scene produces a positive effect", "A storm ruins the day", "A tree speaks"], ans: 1, exp: "The crow and hemlock tree normally suggest gloom, but here they lead to happiness. That reversal is the irony." },
  { q: "What mood does the poet have before the incident?", opts: ["Excited", "Sad and regretful", "Playful", "Sleepy"], ans: 1, exp: "The poet begins in a sad and regretful state. The word ‘rued’ shows that clearly." },
  { q: "Why is the poem short?", opts: ["Because it lacks meaning", "To make the moment sharp and direct", "Because the poet had no idea", "To avoid symbolism"], ans: 1, exp: "The short length keeps the impact immediate. The poem’s strength lies in its compact, meaningful expression." },
  { q: "Which option best describes the message of the poem?", opts: ["Nature is dangerous", "Nature can heal and refresh the human mind", "Crow are always lucky", "Snow is always bad"], ans: 1, exp: "The poem presents nature as a source of emotional healing. The other options are either exaggerated or wrong." },
  { q: "What does the line ‘Has given my heart a change of mood’ imply?", opts: ["The poet is physically tired", "The poet feels emotionally renewed", "The poet is going to sleep", "The poet is angry with nature"], ans: 1, exp: "The line means the poet’s emotions have changed. He feels lighter and refreshed." },
  { q: "Why is the hemlock tree mentioned specifically?", opts: ["It is a famous fruit tree", "It adds a dark background to the poem", "It is the poet’s favorite tree", "It shows the season"], ans: 1, exp: "The hemlock tree gives the poem a gloomy setting. This makes the final change more striking." },
  { q: "What does the poet learn from the incident?", opts: ["To fear birds", "To value small moments", "To avoid trees", "To stay indoors"], ans: 1, exp: "The poem suggests that small moments can be meaningful and uplifting. The poet’s mood changes because of an ordinary event." },
  { q: "Why is the crow important to the poem’s structure?", opts: ["It starts the emotional shift", "It ends the poem", "It gives a speech", "It explains the title"], ans: 0, exp: "The crow initiates the incident that changes the poet’s mood. Without it, the poem’s central event would not happen." },
  { q: "The poem is best understood as a lesson in:", opts: ["Anger management", "Emotional response to nature", "Bird behavior", "Scientific observation"], ans: 1, exp: "The poem focuses on how nature influences human emotions. It is not mainly about birds or science." },
  { q: "What is the role of contrast in the poem?", opts: ["To confuse the reader", "To highlight the positive effect of a negative setting", "To add more characters", "To increase length"], ans: 1, exp: "The contrast between dark symbols and a happy outcome makes the poem powerful. It highlights the poet’s emotional renewal." },
  { q: "Which phrase best captures the poem’s effect?", opts: ["Total sadness", "Sudden renewal", "Long conflict", "Permanent grief"], ans: 1, exp: "The poem shows a sudden change from regret to refreshment. That renewal is the core effect." }
];

const dustOfSnowHard = [
  { q: "ASSERTION: The crow and the hemlock tree are symbols of negativity in the poem. REASON: Frost uses them to make the positive emotional change more striking.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both statements are true. The crow and hemlock are negative symbols, and Frost uses them to heighten the contrast with the poet’s new mood." },
  { q: "Read the following lines: 'The way a crow / Shook down on me / The dust of snow / From a hemlock tree'. What do these lines mainly suggest?", opts: ["A planned action by the crow", "An accidental event that leads to an emotional change", "A dangerous attack", "A scientific process"], ans: 1, exp: "The lines describe a sudden, accidental incident. Its importance lies in the emotional change it causes, not in the action itself." },
  { q: "Why is the poem’s title not ‘Crow’ or ‘Hemlock Tree’?", opts: ["Because those words are too long", "Because the snow is the key symbol of change", "Because the poet disliked those words", "Because the title must be vague"], ans: 1, exp: "The snow is the central agent of transformation. The crow and hemlock create the setting, but the snow changes the poet’s mood." },
  { q: "What is the deeper implication of the poet’s sudden mood change?", opts: ["Human emotions are fixed", "A small external event can trigger inner renewal", "Nature is always cheerful", "Crow are helpful by nature"], ans: 1, exp: "The poem suggests that inner states can shift unexpectedly. The poet’s renewal comes from a tiny natural event." },
  { q: "Why does the poem feel complete despite being very short?", opts: ["It explains everything in detail", "It captures one moment with symbolic depth", "It has many chapters", "It includes a moral lecture"], ans: 1, exp: "The poem is compact but meaningful. One incident is enough to convey its full emotional and symbolic effect." },
  { q: "Case-based: A student says the poet should have ignored the snow because it was too small to matter. Which response best fits the poem?", opts: ["The student is correct; small events never matter", "The poem proves that small events can have great emotional impact", "The poet was pretending", "The snow was magical"], ans: 1, exp: "The poem’s central idea is that tiny incidents can transform mood. The size of the event does not decide its impact." },
  { q: "Which literary device is most strongly present in the phrase ‘dust of snow’?", opts: ["Hyperbole", "Symbolism", "Pun", "Allusion"], ans: 1, exp: "The phrase is symbolic because it stands for a small but powerful moment of change. It is not mainly a pun or hyperbole." },
  { q: "Why is the poet’s use of the word ‘heart’ important in the last line?", opts: ["It makes the poem scientific", "It shows the change is internal and emotional", "It refers to a physical injury", "It is decorative only"], ans: 1, exp: "The word ‘heart’ points to feelings and inner life. The poem focuses on emotional renewal, not physical change." },
  { q: "What does the poem imply about sadness?", opts: ["It can never end", "It may be changed by unexpected moments", "It is stronger than nature", "It is always deep"], ans: 1, exp: "The poet’s sadness is lifted unexpectedly. This suggests sadness can be transformed by a simple experience." },
  { q: "Why is irony essential to the poem’s meaning?", opts: ["It makes the poem humorous only", "It reverses expected meanings and strengthens the message", "It adds more characters", "It explains the title"], ans: 1, exp: "Irony is central because negative symbols produce a positive result. This reversal makes the poem memorable and meaningful." },
  { q: "What is the effect of using a natural scene instead of a human conflict?", opts: ["It weakens the poem", "It makes the message universal", "It confuses the reader", "It removes emotion"], ans: 1, exp: "A natural scene allows the poem’s message to feel universal and timeless. The poem speaks to anyone who has felt a sudden mood shift." },
  { q: "How does Frost challenge conventional symbolism?", opts: ["By making the crow heroic and the hemlock beautiful", "By showing traditionally dark symbols can lead to healing", "By rejecting all symbols", "By describing a city scene"], ans: 1, exp: "Frost uses crow and hemlock, both traditionally negative, to produce a positive change. This challenges usual symbolic expectations." },
  { q: "What is the strongest inference about the poet’s state of mind before the incident?", opts: ["He was completely carefree", "He was emotionally burdened", "He was angry at the crow", "He was lost in a crowd"], ans: 1, exp: "The word ‘rued’ and the poem’s opening mood show inner burden and regret. The snow becomes a turning point." },
  { q: "The poem’s emotional shift can best be described as:", opts: ["Gradual and uncertain", "Instant and subtle", "Slow and dramatic", "Harsh and permanent"], ans: 1, exp: "The change happens quickly and quietly. That subtlety is what makes the poem effective." },
  { q: "Why does the poem remain relevant for CBSE students?", opts: ["It has difficult grammar only", "It teaches symbolism, mood, and irony in a short text", "It is about exams", "It contains many historical facts"], ans: 1, exp: "The poem is useful for learning key literary concepts. Its short length makes it ideal for analysis and exam questions." }
];

const fireAndIcePYQs = [
  {
    question: "What do ‘fire’ and ‘ice’ symbolise in the poem?",
    answer: "In the poem, ‘fire’ symbolises desire, greed, passion and lust, while ‘ice’ symbolises hatred, coldness, indifference and emotional distance. Robert Frost uses these two elements to represent destructive human emotions. Both are powerful enough to destroy the world if they become extreme. The poem warns that uncontrolled emotions can lead to disaster.",
    year: 2025,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "How does the poet compare the end of the world with fire and ice?",
    answer: "The poet says that the world may end either in fire or in ice. Fire stands for intense desire and passion, while ice stands for hatred and indifference. Through this contrast, Frost shows that both extremes are dangerous. The comparison is symbolic and points to the self-destructive nature of human emotions.",
    year: 2024,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "What is the poet’s opinion about the force of desire?",
    answer: "The poet believes that desire is a powerful force that can destroy human beings if it is not controlled. He connects desire with fire, suggesting that it spreads quickly and consumes everything in its path. Excessive desire can lead to greed, selfishness and suffering. Thus, the poet treats desire as a destructive emotion.",
    year: 2023,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "Why does the poet say that ‘ice’ is also enough to cause the end of the world?",
    answer: "The poet says this to show that hatred and indifference can be just as destructive as desire. Ice symbolises emotional coldness, lack of compassion and human alienation. Such feelings can destroy relationships and humanity itself. Therefore, the world may end not only through violent passion but also through emotional numbness.",
    year: 2022,
    marks: 5,
    difficulty: "hard"
  },
  {
    question: "Explain the structure and brevity of the poem.",
    answer: "‘Fire and Ice’ is a very short poem, but it expresses a deep idea in a compact form. Its simple structure makes the message direct and memorable. Frost uses few words but creates strong symbolic meaning. The brevity of the poem adds to its impact and universality.",
    year: 2021,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "Why does the poet mention that he has ‘tasted’ desire?",
    answer: "By saying he has ‘tasted’ desire, the poet shows that desire is something personally experienced and understood. It is not just a theoretical idea for him. The word suggests that desire can be tempting and attractive, but also harmful. This makes the poem more realistic and personal.",
    year: 2025,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "What message does Robert Frost give through this poem?",
    answer: "Frost’s message is that extreme emotions are dangerous for human life. Whether it is desire or hatred, both can destroy peace and humanity. The poem encourages balance, restraint and emotional awareness. It warns readers to control negative impulses before they become destructive.",
    year: 2024,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "How is irony used in the poem?",
    answer: "The irony lies in the fact that both fire and ice, which are opposites, are equally capable of ending the world. Fire is hot and active, while ice is cold and passive. Yet both lead to destruction. This unexpected similarity between opposites creates the poem’s central irony.",
    year: 2023,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "What is the significance of the poem’s title, ‘Fire and Ice’?",
    answer: "The title captures the two destructive forces central to the poem. Fire and ice are opposite elements, yet both represent dangerous human emotions. The title is simple but powerful because it immediately creates contrast. It also reflects the poem’s theme of emotional extremes and destruction.",
    year: 2022,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "Do you agree that hatred can destroy the world as much as desire? Justify your answer.",
    answer: "Yes, hatred can destroy the world as much as desire. Desire may lead to greed, conflict and selfishness, while hatred causes division, cruelty and emotional isolation. Both weaken human relationships and peace. Frost’s poem suggests that these emotions, if unchecked, can lead to human destruction.",
    year: 2021,
    marks: 5,
    difficulty: "hard"
  },
  {
    question: "How does the poem present human emotions?",
    answer: "The poem presents human emotions as powerful forces that can control behaviour and shape the world. Desire and hatred are not shown as harmless feelings but as destructive energies. Frost suggests that emotions must be managed carefully. If they grow too strong, they can harm both individuals and society.",
    year: 2025,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "What does the line ‘Some say the world will end in fire’ imply?",
    answer: "This line suggests that many people believe intense desire and passion can destroy the world. It points to the violence and chaos caused by uncontrolled human urges. The poet does not fully agree or disagree at first, but presents it as one possible end. It introduces the theme in a direct and striking way.",
    year: 2024,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "Why is the poem considered philosophically deep despite being short?",
    answer: "The poem is short, but it raises big questions about human nature and destruction. It links outer elements like fire and ice with inner emotions like desire and hatred. This symbolic approach gives the poem philosophical depth. Its simplicity hides a serious reflection on moral and emotional life.",
    year: 2023,
    marks: 5,
    difficulty: "hard"
  },
  {
    question: "What role does contrast play in the poem?",
    answer: "Contrast is the main poetic device in the poem. Fire and ice are opposite in nature, yet both lead to the same result. The contrast makes the poem memorable and sharp. It also shows that different forms of extreme emotion can be equally destructive.",
    year: 2022,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "How does the poem warn against human weakness?",
    answer: "The poem warns that humans often become victims of their own desires and hatred. These emotions may seem natural, but they can lead to destruction if left unchecked. Frost shows that the real danger lies within human beings themselves. The poem is therefore a warning about self-control and moral responsibility.",
    year: 2021,
    marks: 3,
    difficulty: "medium"
  }
];

const fireAndIceEasy = [
  { q: "Who wrote the poem ‘Fire and Ice’?", opts: ["Walt Whitman", "Robert Frost", "John Keats", "William Blake"], ans: 1, exp: "‘Fire and Ice’ was written by Robert Frost. The other poets are incorrect." },
  { q: "What does fire symbolise in the poem?", opts: ["Peace", "Desire", "Sleep", "Truth"], ans: 1, exp: "Fire symbolises desire, passion and greed in the poem." },
  { q: "What does ice symbolise in the poem?", opts: ["Joy", "Hatred", "Warmth", "Hope"], ans: 1, exp: "Ice symbolises hatred, coldness and indifference." },
  { q: "The poem is about the end of:", opts: ["A city", "The world", "A war", "A season"], ans: 1, exp: "The poem discusses how the world may end." },
  { q: "What is the tone of the poem?", opts: ["Humorous", "Serious", "Comic", "Romantic"], ans: 1, exp: "The poem has a serious and reflective tone." },
  { q: "The poet says he has ‘tasted’:", opts: ["Hunger", "Desire", "Fear", "Pain"], ans: 1, exp: "The poet says he has tasted desire, meaning he has experienced it." },
  { q: "Which emotion is linked with fire?", opts: ["Indifference", "Passion", "Calmness", "Silence"], ans: 1, exp: "Fire is linked with passion and desire." },
  { q: "Which emotion is linked with ice?", opts: ["Hatred", "Love", "Excitement", "Energy"], ans: 0, exp: "Ice is linked with hatred and emotional coldness." },
  { q: "How many ways of world destruction does the poet mention?", opts: ["One", "Two", "Three", "Four"], ans: 1, exp: "The poet mentions two ways: fire and ice." },
  { q: "The poem is written in:", opts: ["Long narrative form", "Short lyrical form", "Play form", "Novel form"], ans: 1, exp: "The poem is a short lyrical poem." },
  { q: "What is the main theme of the poem?", opts: ["Nature’s beauty", "Destructive human emotions", "A love story", "A childhood memory"], ans: 1, exp: "The poem focuses on emotions like desire and hatred." },
  { q: "Fire and ice are:", opts: ["Similar", "Opposites", "The same", "Irrelevant"], ans: 1, exp: "Fire and ice are opposites in nature." },
  { q: "What does the poet warn against?", opts: ["Reading books", "Extreme emotions", "Winter", "Birds"], ans: 1, exp: "The poet warns against extreme emotions such as desire and hatred." },
  { q: "The poem belongs to which poet’s work?", opts: ["Robert Frost", "R. K. Narayan", "Sarojini Naidu", "T. S. Eliot"], ans: 0, exp: "The poem is by Robert Frost." },
  { q: "Which is a destructive feeling in the poem?", opts: ["Love", "Hatred", "Compassion", "Kindness"], ans: 1, exp: "Hatred is shown as a destructive feeling." }
];

const fireAndIceMedium = [
  { q: "Why does Frost compare desire to fire?", opts: ["Because both are warm", "Because desire spreads and consumes like fire", "Because fire is beautiful", "Because desire is harmless"], ans: 1, exp: "Fire spreads quickly and destroys everything in its path, just like uncontrolled desire." },
  { q: "What idea is conveyed by linking ice with hatred?", opts: ["Hatred is soft", "Hatred can freeze human emotions and relationships", "Hatred brings happiness", "Hatred has no effect"], ans: 1, exp: "Ice suggests emotional coldness, distance and lack of compassion." },
  { q: "Why is the poem effective despite being short?", opts: ["It uses many characters", "It gives a deep idea in few words", "It tells a long story", "It has a happy ending"], ans: 1, exp: "The poem is compact but meaningful, which makes its message powerful." },
  { q: "What does the poet’s personal experience of desire suggest?", opts: ["He is making up the idea", "He understands the force of the emotion", "He hates poetry", "He is speaking only about fire"], ans: 1, exp: "By saying he has tasted desire, the poet makes the idea personal and credible." },
  { q: "What is the central irony of the poem?", opts: ["Fire is cold", "Opposites like fire and ice can lead to the same result", "The poet loves winter", "The world is safe"], ans: 1, exp: "The irony is that two opposite forces both cause destruction." },
  { q: "How does the poem present human emotions?", opts: ["As harmless thoughts", "As powerful and dangerous forces", "As childish games", "As temporary weather"], ans: 1, exp: "The poem treats emotions as forces that can shape human destiny." },
  { q: "What is the message of the poem about control?", opts: ["People should ignore emotions", "People should control extreme emotions", "People should fear fire", "People should avoid ice"], ans: 1, exp: "The poem warns that self-control is necessary to prevent destruction." },
  { q: "Why are fire and ice good symbols?", opts: ["They are easy to draw", "They clearly show opposite destructive emotions", "They are funny", "They are historical"], ans: 1, exp: "The symbols are vivid and easy to understand, making the poem memorable." },
  { q: "Which option best describes the poem’s mood?", opts: ["Carefree", "Thoughtful and serious", "Romantic and playful", "Angry and loud"], ans: 1, exp: "The poem is reflective and serious in tone." },
  { q: "What kind of destruction does the poet suggest?", opts: ["Only physical destruction", "Both physical and emotional destruction", "Only natural destruction", "Only social destruction"], ans: 1, exp: "The poem implies that emotional extremes can destroy relationships and humanity." },
  { q: "Why does Frost not choose a long explanation?", opts: ["He had no idea", "He wants the message to be sharp and universal", "He dislikes poetry", "He is writing a story"], ans: 1, exp: "The short, direct style makes the message universal and powerful." },
  { q: "Which emotion is more passive in the poem?", opts: ["Fire", "Ice", "Both equally active", "Neither"], ans: 1, exp: "Ice is passive in appearance, but the poem shows it can still be destructive." },
  { q: "What makes the poem philosophical?", opts: ["It talks about history", "It asks how the world may end and why", "It describes a journey", "It praises nature"], ans: 1, exp: "The poem reflects on big questions about humanity and destruction." },
  { q: "What is the effect of the poem’s contrast?", opts: ["It weakens the theme", "It highlights the destructive power of emotions", "It makes the poem confusing", "It adds comic relief"], ans: 1, exp: "The contrast sharpens the theme and makes it memorable." },
  { q: "What is the poem’s main warning?", opts: ["Fire is dangerous in real life", "Unchecked desire and hatred can destroy the world", "Winter is bad", "People should never feel emotions"], ans: 1, exp: "The poem warns against the extreme forms of human emotion." }
];

const fireAndIceHard = [
  { q: "ASSERTION: The poem suggests that hatred can be as destructive as desire. REASON: Ice symbolises coldness, distance and emotional deadness.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both statements are true. Ice represents emotional coldness, which explains why hatred is as destructive as desire." },
  { q: "Case-based: A student says the poem is only about literal fire and literal ice. What is the best response?", opts: ["The student is correct", "The poem is symbolic, not literal", "The poem has no meaning", "The poet is describing weather"], ans: 1, exp: "The poem uses fire and ice symbolically to represent emotions, not actual destruction by elements." },
  { q: "Why is the poem’s ending powerful?", opts: ["It gives a joke", "It repeats the same idea for emphasis", "It leaves the reader thinking about human weakness", "It changes the topic"], ans: 2, exp: "The ending pushes the reader to reflect on how human emotions can destroy the world." },
  { q: "What does the line ‘I think I know enough of hate’ imply?", opts: ["The poet knows hatred well enough to understand its danger", "The poet likes hate", "The poet has never felt hate", "The poet is uncertain about emotions"], ans: 0, exp: "The line suggests the poet understands hate and sees its destructive force." },
  { q: "Which deeper idea does the poem suggest about the world’s end?", opts: ["It will end naturally only", "Human behavior may cause its own destruction", "It will end in silence", "It will end by accident"], ans: 1, exp: "The poem implies that human emotions themselves may destroy the world." },
  { q: "Why are fire and ice both suitable symbols in the poem?", opts: ["They are both beautiful", "They represent two opposite but equally dangerous extremes", "They are both harmless", "They are both rare"], ans: 1, exp: "The poem uses opposite elements to show that extremes on either side are harmful." },
  { q: "What is the effect of the poem’s simple diction?", opts: ["It hides the meaning", "It makes the message direct and universal", "It makes the poem childish", "It reduces the theme"], ans: 1, exp: "Simple language allows the deep idea to reach readers clearly." },
  { q: "Why is desire compared to fire rather than another element?", opts: ["Fire is cold", "Fire suggests spreading, consuming energy", "Fire is quiet", "Fire is passive"], ans: 1, exp: "Fire conveys intensity, spreading force and destruction, all of which fit desire." },
  { q: "What does the poem imply about human nature?", opts: ["Humans are always wise", "Humans carry self-destructive tendencies", "Humans are emotionless", "Humans are perfect"], ans: 1, exp: "The poem suggests that humans can destroy themselves through uncontrolled emotions." },
  { q: "Why is the poem considered timeless?", opts: ["It is about one season", "Its ideas about desire and hatred are always relevant", "It mentions modern technology", "It has no theme"], ans: 1, exp: "Desire and hatred remain relevant in every age, making the poem timeless." },
  { q: "What is the poetic value of saying ‘Some say’ at the beginning?", opts: ["It introduces a viewpoint, not a fact", "It proves the poet is unsure", "It makes the poem informal only", "It shows the poet is joking"], ans: 0, exp: "The phrase introduces a general belief and prepares for the poet’s reflection." },
  { q: "How does the poem connect personal emotion to universal danger?", opts: ["By naming a city", "By turning inner feelings into world-ending forces", "By using only nature images", "By describing a battle"], ans: 1, exp: "The poem enlarges private emotions into global symbols of destruction." },
  { q: "Which statement best captures the poem’s philosophical core?", opts: ["Opposites are always equal", "Extreme emotions, whether hot or cold, can destroy humanity", "Fire is stronger than ice", "Ice is harmless"], ans: 1, exp: "The poem’s central philosophy is that both emotional extremes are dangerous." },
  { q: "Why does the poem remain open to interpretation?", opts: ["It lacks symbols", "It uses symbolic language that can be read at multiple levels", "It has no structure", "It is too long"], ans: 1, exp: "Symbolic poetry allows readers to explore deeper meanings." },
  { q: "The strongest inference from the poem is that:", opts: ["Desire and hate are natural but must be controlled", "People should stop feeling", "Fire is the main enemy", "Ice is the main enemy"], ans: 0, exp: "The poem implies emotions are natural, but extremes must be controlled to avoid destruction." }
];

const aTigerInTheZooPYQs = [
  {
    question: "What contrast does the poet present between the tiger in the zoo and the tiger in the jungle?",
    answer: "The poet presents a sharp contrast between the tiger in the zoo and the tiger in the jungle. In the zoo, the tiger is confined to a small cage, pacing helplessly and ignoring visitors. In the jungle, he would be free, powerful and terrifying, living according to his natural instincts. This contrast highlights the cruelty of captivity and the dignity of freedom.",
    year: 2025,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "How does the tiger behave in the cage and what does this behaviour suggest?",
    answer: "The tiger walks quietly and helplessly inside his cage. He is unable to show his real strength or hunting instinct. This behaviour suggests frustration, confinement and loss of natural freedom. The tiger’s silence is more powerful than aggression because it reflects suffering.",
    year: 2024,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "Why does the tiger ignore the visitors at the zoo?",
    answer: "The tiger ignores the visitors because he is not interested in their attention or amusement. He is imprisoned and unhappy, and the people outside the cage cannot understand his pain. Their presence does not give him freedom. This shows the emotional distance between the captive animal and human spectators.",
    year: 2023,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "What is the significance of the tiger’s eyes in the poem?",
    answer: "The tiger’s eyes are described as full of quiet rage. They show his anger, frustration and suppressed power. Even though he remains still, his eyes reveal his inner suffering. The eyes become a symbol of trapped energy and unspoken protest.",
    year: 2022,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "How does the poet describe the tiger’s movement in the cage?",
    answer: "The tiger is described as moving slowly and steadily along the length of the cage. He keeps pacing, but this movement has no purpose or freedom. It shows his restlessness and helplessness. The repetitive motion makes the cage seem even more oppressive.",
    year: 2021,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "What does the tiger in the cage symbolize?",
    answer: "The tiger in the cage symbolizes captive power, frustration and the loss of natural freedom. He is physically strong, but he has been reduced to a helpless creature by human control. The poem uses him to reflect the suffering caused by imprisonment. He becomes a symbol of dignity trapped by domination.",
    year: 2025,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "What would the tiger have done if he were in the jungle?",
    answer: "If the tiger were in the jungle, he would have stalked through the bushes, waited for his prey and hunted in his natural way. He would have enjoyed freedom and power. In the jungle, he would be feared rather than pitied. The poem presents this imagined life to emphasize the injustice of captivity.",
    year: 2024,
    marks: 2,
    difficulty: "easy"
  },
  {
    question: "What theme does the poem explore through the tiger’s captivity?",
    answer: "The poem explores the theme of freedom versus confinement. It also touches on the cruelty of human interference with nature. The tiger’s imprisonment reflects how power can be taken away from a living being. Through the tiger, the poet questions the morality of keeping wild creatures in cages.",
    year: 2023,
    marks: 5,
    difficulty: "hard"
  },
  {
    question: "Why is the tiger called ‘stalking’ in the poem’s jungle image?",
    answer: "The word ‘stalking’ shows the tiger’s natural hunting instinct. It suggests silent, confident movement through the forest in search of prey. This image makes the tiger appear majestic and powerful. It also contrasts strongly with his helpless behaviour in the zoo.",
    year: 2022,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "How does the poet create sympathy for the tiger?",
    answer: "The poet creates sympathy by showing the tiger as a proud creature who has been stripped of his freedom. He is not shown as violent, but as silent, restless and trapped. The contrast between his natural power and his present condition makes the reader feel pity. The poem asks us to see the tiger as a victim, not an exhibit.",
    year: 2021,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "What is the poet’s attitude towards the zoo?",
    answer: "The poet’s attitude towards the zoo is critical and unsympathetic. He presents the zoo as a place of confinement, not care. The cage limits the tiger’s natural life and reduces him to an object of display. This suggests that the poet disapproves of keeping wild animals imprisoned for human entertainment.",
    year: 2025,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "How is the tiger’s silence significant in the poem?",
    answer: "The tiger’s silence is significant because it reflects his suppressed anger and suffering. He does not roar or attack because he is imprisoned and powerless. His silence is more painful than noise, as it suggests forced control. It gives the poem a sad and restrained tone.",
    year: 2024,
    marks: 5,
    difficulty: "hard"
  },
  {
    question: "What role do the visitors play in the poem?",
    answer: "The visitors represent human curiosity and indifference. They look at the tiger as a spectacle, but they do not understand his pain. Their presence highlights the contrast between the tiger’s inner suffering and the outside world’s casual observation. They also symbolize the human tendency to objectify wild animals.",
    year: 2023,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "What message does the poet give through the tiger’s ‘quiet rage’?",
    answer: "Through the tiger’s quiet rage, the poet shows that strength without freedom becomes frustration. The tiger’s anger is restrained because he cannot act on it. This suggests the tragic condition of a powerful being trapped in helplessness. The phrase also warns us that oppression silences even the strongest voices.",
    year: 2022,
    marks: 3,
    difficulty: "medium"
  },
  {
    question: "Why is the poem titled ‘A Tiger in the Zoo’?",
    answer: "The title focuses attention on the tiger’s unnatural state. A tiger belongs in the jungle, not in a cage, so the title itself creates tension and sympathy. It reminds readers that the poem is about captivity and loss of freedom. The title is simple but deeply meaningful.",
    year: 2021,
    marks: 2,
    difficulty: "easy"
  }
];

const aTigerInTheZooEasy = [
  { q: "Who wrote the poem ‘A Tiger in the Zoo’?", opts: ["Robert Frost", "Leslie Norris", "R. K. Narayan", "Sarojini Naidu"], ans: 1, exp: "The poem ‘A Tiger in the Zoo’ was written by Leslie Norris. The other names are incorrect." },
  { q: "Where is the tiger kept in the poem?", opts: ["In a forest", "In a zoo", "In a cave", "In a river"], ans: 1, exp: "The tiger is kept in a zoo, inside a cage." },
  { q: "How does the tiger move in the cage?", opts: ["He runs freely", "He sleeps all day", "He paces quietly", "He jumps high"], ans: 2, exp: "The tiger is shown pacing quietly in the cage." },
  { q: "What does the tiger’s eye show?", opts: ["Joy", "Quiet rage", "Sleep", "Laziness"], ans: 1, exp: "The tiger’s eyes show quiet rage and suppressed anger." },
  { q: "The tiger in the zoo is mainly shown as:", opts: ["Happy", "Trapped", "Playful", "Carefree"], ans: 1, exp: "The poem shows the tiger as trapped and confined." },
  { q: "The tiger belongs naturally in:", opts: ["A zoo", "A cage", "The jungle", "A house"], ans: 2, exp: "A tiger belongs in the jungle, where it can live freely." },
  { q: "What is the tiger doing at the beginning of the poem?", opts: ["Sleeping", "Walking quietly", "Roaring loudly", "Eating"], ans: 1, exp: "The tiger is walking quietly in his cage at the beginning." },
  { q: "What do the visitors do?", opts: ["Feed the tiger", "Watch the tiger", "Free the tiger", "Ignore the zoo"], ans: 1, exp: "The visitors come to watch the tiger in the zoo." },
  { q: "The poem mainly talks about:", opts: ["A pet animal", "Animal freedom", "A festival", "A hunter"], ans: 1, exp: "The poem mainly focuses on the freedom of wild animals." },
  { q: "What kind of poem is this?", opts: ["Narrative poem", "Descriptive poem", "Drama", "Essay"], ans: 1, exp: "It is a descriptive poem that paints a picture of the tiger’s condition." },
  { q: "The tiger is a symbol of:", opts: ["Weakness only", "Strength and power", "Fear only", "Speed only"], ans: 1, exp: "The tiger symbolises strength and power." },
  { q: "What is the mood of the poem?", opts: ["Funny", "Sad", "Exciting", "Romantic"], ans: 1, exp: "The mood is sad and sympathetic because the tiger is confined." },
  { q: "The cage is a symbol of:", opts: ["Freedom", "Imprisonment", "Friendship", "Adventure"], ans: 1, exp: "The cage symbolises imprisonment and loss of freedom." },
  { q: "What does the tiger not do in the zoo?", opts: ["Walk", "Stare", "Hunt", "Look at visitors"], ans: 2, exp: "The tiger cannot hunt in the zoo because he is confined." },
  { q: "The poem is written in:", opts: ["Simple language", "Very difficult language", "Only dialogue", "Prose form"], ans: 0, exp: "The poem uses simple and direct language." }
];

const aTigerInTheZooMedium = [
  { q: "Why does the poet contrast the cage and the jungle?", opts: ["To make the poem longer", "To show the difference between captivity and natural freedom", "To praise the zoo", "To confuse the reader"], ans: 1, exp: "The contrast highlights how unnatural and painful captivity is compared to freedom in the jungle." },
  { q: "What does the phrase ‘quiet rage’ suggest?", opts: ["The tiger is sleeping", "The tiger is angry but cannot express it", "The tiger is cheerful", "The tiger is weak only"], ans: 1, exp: "The tiger is full of anger and frustration, but he is forced to remain silent." },
  { q: "Why is the tiger ignored by the visitors?", opts: ["He is invisible", "He is treated like an object of display", "He is outside the cage", "He is too small"], ans: 1, exp: "Visitors treat the tiger as an exhibit, not as a living being with feelings." },
  { q: "What does the tiger’s pacing indicate?", opts: ["Boredom and helplessness", "Happiness", "Playfulness", "Sleepiness"], ans: 0, exp: "Pacing shows restlessness and helplessness caused by confinement." },
  { q: "How does the poem create sympathy for the tiger?", opts: ["By showing him as dangerous", "By showing his suffering and loss of freedom", "By making him speak", "By praising the zoo"], ans: 1, exp: "The poet makes the reader pity the tiger by focusing on his trapped condition." },
  { q: "What is the role of the jungle image in the poem?", opts: ["It shows the tiger’s natural life", "It makes the zoo look beautiful", "It adds comedy", "It shows the tiger is lazy"], ans: 0, exp: "The jungle image represents the tiger’s natural home, where he would be free and powerful." },
  { q: "Why is the tiger’s silence important?", opts: ["It shows he is dead", "It reflects helplessness and suppressed anger", "It proves he likes the zoo", "It shows he is sleepy"], ans: 1, exp: "Silence here suggests that the tiger’s power has been trapped and muted." },
  { q: "What message does the poem give about zoos?", opts: ["Zoos are always helpful", "Zoos may imprison wild animals and deny them freedom", "Zoos are better than forests", "Zoos are unnecessary always"], ans: 1, exp: "The poem criticises the captivity of wild animals in zoos." },
  { q: "Why is the tiger described as ‘stalking’ in the jungle?", opts: ["To show fear", "To show natural hunting power", "To show tiredness", "To show confusion"], ans: 1, exp: "Stalking suggests the tiger’s confidence, skill and natural instinct in the wild." },
  { q: "What does the poem suggest about human control over nature?", opts: ["It is always good", "It can be cruel and unnatural", "It is harmless", "It should never exist"], ans: 1, exp: "The poem suggests that human control can be cruel when it destroys the natural life of animals." },
  { q: "Why does the tiger not roar in the poem?", opts: ["He is happy", "He is caged and powerless", "He is asleep", "He is friendly"], ans: 1, exp: "The tiger does not roar because the cage has taken away his freedom and strength." },
  { q: "What is the tone of the poet towards the tiger?", opts: ["Mocking", "Sympathetic", "Angry", "Playful"], ans: 1, exp: "The poet shows sympathy for the tiger’s suffering." },
  { q: "The poem mainly uses contrast between:", opts: ["Day and night", "Zoo and jungle", "Rain and sun", "Bird and fish"], ans: 1, exp: "The main contrast is between the tiger’s life in the zoo and in the jungle." },
  { q: "What does the tiger symbolize in the poem?", opts: ["Only an animal", "Freedom, power and suffering under captivity", "A pet", "A child"], ans: 1, exp: "The tiger symbolises natural strength trapped by human control." },
  { q: "Why is the poem emotionally powerful?", opts: ["Because it is very long", "Because it shows a proud animal reduced to helplessness", "Because it has many characters", "Because it is humorous"], ans: 1, exp: "The emotional power comes from seeing a strong animal denied its natural life." }
];

const aTigerInTheZooHard = [
  { q: "ASSERTION: The tiger in the zoo is physically powerful but emotionally defeated. REASON: His cage has taken away his freedom, leaving him restless and silent.", opts: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is NOT the correct explanation of A", "A is true but R is false", "A is false but R is true"], ans: 0, exp: "Both statements are true. The cage limits the tiger’s freedom, which explains why his power becomes frustration and silence." },
  { q: "Case-based: A student says the tiger seems calm, so he must be comfortable in the zoo. Which response best fits the poem?", opts: ["The student is correct", "The calmness is only external; inside he is frustrated and trapped", "The tiger is enjoying visitors", "The poem has no emotional meaning"], ans: 1, exp: "The tiger’s calmness hides quiet rage. The poem makes clear that the cage is a prison, not a comfort." },
  { q: "Why does the poet describe the tiger’s eyes instead of his roar?", opts: ["To show the tiger is invisible", "To reveal silent suffering rather than active violence", "To make the poem comic", "To avoid describing animals"], ans: 1, exp: "The eyes reveal the tiger’s inner condition more deeply than a roar would." },
  { q: "What is the deeper meaning of the tiger’s movement in the cage?", opts: ["It shows exercise", "It reflects purposeless repetition under confinement", "It proves the tiger is playful", "It shows he is hunting"], ans: 1, exp: "His pacing is a sign of trapped energy with no meaningful outlet." },
  { q: "Why is the jungle image more than a setting?", opts: ["It is just scenery", "It represents the tiger’s rightful life and dignity", "It shows tourists", "It explains the zoo structure"], ans: 1, exp: "The jungle stands for natural freedom, instinct and respect for the tiger’s true nature." },
  { q: "Which literary effect is strongest in the poem?", opts: ["Humor", "Irony of a powerful animal made helpless", "Fantasy", "Suspense"], ans: 1, exp: "The irony is that the king of the jungle is reduced to a cage-dwelling exhibit." },
  { q: "Why is the poem a criticism of human behaviour?", opts: ["Because humans dislike animals", "Because humans imprison wild creatures for entertainment", "Because humans are weak", "Because humans live in cities"], ans: 1, exp: "The poem questions the morality of keeping wild animals captive." },
  { q: "What does the phrase ‘length of his cage’ suggest?", opts: ["The cage is large enough", "The tiger’s movement is limited to a narrow, repetitive path", "The cage is empty", "The tiger is free"], ans: 1, exp: "The phrase highlights the physical restriction placed on the tiger." },
  { q: "How does the poem challenge the reader’s perception of zoos?", opts: ["By showing them as educational only", "By revealing the suffering behind display and entertainment", "By making them seem exciting", "By ignoring animals"], ans: 1, exp: "The poem makes us think about the hidden cruelty of captivity." },
  { q: "What is the significance of the tiger not reacting to visitors?", opts: ["He is uninterested because he is robbed of his world", "He is shy", "He is sleepy", "He is friendly"], ans: 0, exp: "The tiger’s indifference shows that human attention cannot replace freedom." },
  { q: "The poem’s central conflict is between:", opts: ["Man and tiger only", "Freedom and captivity", "Light and dark", "Water and fire"], ans: 1, exp: "The poem focuses on the tension between natural freedom and enforced captivity." },
  { q: "Why is sympathy the poem’s strongest emotional effect?", opts: ["Because the tiger is funny", "Because the tiger’s suffering is presented through restraint and silence", "Because the visitors are kind", "Because the zoo is beautiful"], ans: 1, exp: "The tiger’s suffering is quiet, which makes the reader feel deeper sympathy." },
  { q: "What does the tiger’s ‘stalking’ in the jungle reveal about his natural identity?", opts: ["He is meant to be free, skilled and dominant in the wild", "He is weak", "He is domesticated", "He is bored"], ans: 0, exp: "Stalking shows the tiger in his rightful and powerful natural role." },
  { q: "Why is the poem relevant beyond animals?", opts: ["It only talks about a zoo", "It can symbolize any being denied freedom", "It is about tourism", "It is about weather"], ans: 1, exp: "The poem can be read as a wider comment on oppression and loss of liberty." },
  { q: "The strongest inference from the poem is that:", opts: ["Power without freedom becomes suffering", "Animals enjoy cages", "Visitors understand animals deeply", "Wildness is useless"], ans: 0, exp: "The poem shows that the tiger’s strength has no meaning when freedom is removed." }
];


const triumphSurgeryPYQs = [
  {
    question: "Why was Mrs Pumphrey worried about Tricki when she first called the narrator?",
    answer: "Mrs Pumphrey was worried because Tricki had stopped eating, refused even his favourite dishes and had bouts of vomiting. He only lay on the carpet panting and showed no interest in walks or play, so she feared that he was seriously ill and might die.",
    year: 2024, marks: 2, difficulty: "easy",
  },
  {
    question: "How had Mrs Pumphrey been treating Tricki before the narrator advised her? Was she wise in doing so?",
    answer: "Mrs Pumphrey stuffed Tricki with extra snacks between meals like malt, cod liver oil, Horlicks, cream cakes and chocolates in addition to his rich regular food. She believed more food meant more strength, but this overfeeding without exercise made him hugely fat and listless, so she was not wise at all.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe Tricki’s condition when the narrator saw him on the road. What did the narrator immediately realise about the real cause of his illness?",
    answer: "When the narrator saw Tricki, the dog was hugely fat, with bloodshot eyes, a bloated body and a tongue lolling from his jaws. He could hardly walk and staggered instead of trotting. The narrator realised at once that Tricki was not suffering from any real disease but from overfeeding and complete lack of exercise.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "‘I was sure that it was only a matter of time.’ What does this line show about the narrator’s treatment of Tricki at the clinic?",
    answer: "The line shows the narrator’s complete confidence in simple, natural treatment – controlled diet, plenty of rest and free play with other dogs. He did not use medicines or perform any actual surgery; he merely removed all rich food, gave only water at first and allowed Tricki to gradually regain strength through exercise and normal dog behaviour, certain that he would recover.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Why does Mrs Pumphrey call Tricki’s recovery ‘a triumph of surgery’? How is the title of the story ironic?",
    answer: "Mrs Pumphrey believes the vet has performed some complicated operation to save Tricki’s life, so she calls his recovery ‘a triumph of surgery’ and showers gratitude and gifts on the narrator. The title is ironic because no surgery was done at all; the real triumph lies in simple discipline – controlled diet and exercise – which cured the dog of the results of pampering.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "Give a brief character sketch of Mrs Pumphrey as revealed in the story.",
    answer: "Mrs Pumphrey is a rich, emotional and overindulgent lady who treats her pet Tricki like a child. She is genuinely affectionate and anxious about his health, but her blind love leads her to pamper him with sweets, cream cakes and luxurious items, ignoring the vet’s advice. At the same time, she is generous and grateful; when Tricki recovers, she is overwhelmed and sends crates of eggs, wine and brandy, believing the vet has worked a miracle.",
    year: 2024, marks: 5, difficulty: "hard",
  },
  {
    question: "How did Tricki behave at the surgery in the first few days, and how did he gradually change?",
    answer: "At the surgery, Tricki was initially exhausted, listless and uninterested in food or play; he just lay on a mattress, panting and sleeping. For the first two days he was given only water. Then, watching the other dogs jostling for food and playing in the yard, he slowly joined them, began eating normally, chased and rolled with them, and within a fortnight turned into a fit, hard-muscled little dog.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "What role do the other dogs at the surgery play in Tricki’s recovery?",
    answer: "The other dogs act as natural companions and motivators for Tricki. Their rough-and-tumble games, jostling at mealtimes and constant movement draw Tricki out of his laziness. Wanting to keep up with them, he begins to run, roll, and fight for his share of food, which helps him shed fat, build stamina and become a normal, healthy dog again.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the story highlight the theme that overindulgence can be harmful, even when it comes from love?",
    answer: "The story shows that Mrs Pumphrey’s excessive love makes her feed Tricki rich food, chocolates and cream cakes, and deny him exercise. This overindulgence leads to obesity, lethargy and near-collapse. In contrast, the vet’s tough love – strict diet and no luxuries – restores Tricki’s health. Thus, the narrative underlines that unchecked pampering, however loving, can damage the very being one wants to protect.",
    year: 2022, marks: 5, difficulty: "hard",
  },
  {
    question: "What light does the story throw on the narrator’s (Dr Herriot’s) character?",
    answer: "Dr Herriot appears practical, observant and compassionate. He immediately diagnoses that Tricki’s problem is overfeeding and lack of exercise, not disease. At the clinic he uses simple methods instead of unnecessary medicines or surgery. He is also mildly humorous and human; he and his colleagues enjoy the luxurious food sent for Tricki, yet he never harms the dog and returns him fully cured, showing professional integrity and kindness.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "Extract-based: Read the extract and answer the question that follows.\n\n‘The expected call came within a few days. Mrs Pumphrey was distraught. Tricki would eat nothing, refused even his favourite dishes; and besides, he had bouts of vomiting. He spent all his time lying on a rug, panting. He did not want to go for walks, he did not want to do anything.’\n\nWhat had led Tricki to this miserable state?",
    answer: "Tricki’s miserable state was the direct result of Mrs Pumphrey’s overfeeding and lack of exercise. She constantly offered him rich food, snacks and sweets out of love, and never made him work off the calories. This ruined his digestion, made him obese and finally left him so weak that he could neither eat nor move.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question that follows.\n\n‘For three days I kept an eye on him, giving him no food but plenty of water. At the end of the second day he started to show some interest in his surroundings, and on the third he began to whimper when he heard the dogs in the yard.’\n\nWhat change is hinted at in Tricki’s behaviour here?",
    answer: "The extract hints at Tricki’s gradual return to normalcy. After the initial fast and rest, he begins to take interest in his surroundings and whimpers to join the other dogs, showing that his energy is returning and his instinct for social play and exercise is awakening.",
    year: 2023, marks: 2, difficulty: "easy",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): The narrator told Mrs Pumphrey that Tricki needed to be hospitalised for an operation.\nREASON (R): He knew that Tricki was suffering from a serious disease that required immediate surgery.\n\nBased on the chapter, analyse the A–R pair and select the correct option.",
    answer: "Assertion (A) is true but Reason (R) is false. The narrator did say that Tricki must go to the hospital and hinted at possible surgery mainly to persuade Mrs Pumphrey to let him take the dog away. However, he knew that Tricki only needed controlled diet and exercise, not any real operation.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "‘This was the happiest period of my life,’ says the narrator about Tricki’s stay at the clinic. Why does he say so?",
    answer: "The narrator calls this the happiest period because during Tricki’s stay, Mrs Pumphrey sent large hampers of eggs, bottles of wine and brandy as ‘medicines’ for her pet. Instead of giving these rich items to Tricki, the narrator and his colleagues consumed them, enjoying lavish meals while the dog thrived on a simple, frugal diet.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "What social message does James Herriot convey through the humorous story ‘A Triumph of Surgery’?",
    answer: "Through humour and gentle irony, Herriot warns against the modern tendency to equate love with indulgence and luxury. He shows that genuine care sometimes means saying ‘no’, enforcing discipline and listening to expert advice. The story also comments on class excess – Mrs Pumphrey’s extravagant lifestyle contrasts with the simple regime that truly restores Tricki’s health.",
    year: 2021, marks: 5, difficulty: "hard",
  },
];

const triumphSurgeryEasy = [
  {
    q: "Who is the author of the story 'A Triumph of Surgery'?",
    opts: ["Ruskin Bond", "James Herriot", "O. Henry", "R.K. Narayan"],
    ans: 1,
    exp: "The story 'A Triumph of Surgery' is written by James Herriot, a vet who wrote many humorous stories about animals. The other authors wrote different well-known works, not this chapter.",
  },
  {
    q: "What is the name of Mrs Pumphrey’s dog?",
    opts: ["Tommy", "Tricki", "Bruno", "Tiger"],
    ans: 1,
    exp: "The pampered pet in the story is a small dog named Tricki, who becomes dangerously overweight. None of the other names occurs in the lesson.",
  },
  {
    q: "What is the profession of the narrator?",
    opts: ["Human surgeon", "School teacher", "Veterinary surgeon", "Chef"],
    ans: 2,
    exp: "The narrator, Mr James Herriot, is a veterinary surgeon who treats animals. He is not a human doctor, teacher or chef.",
  },
  {
    q: "Why had Tricki become ill in the first place?",
    opts: ["He met with an accident", "He was poisoned", "He was overfed and never exercised", "He had a birth defect"],
    ans: 2,
    exp: "Tricki’s illness is clearly linked to overeating rich food and lack of exercise, which make him obese and listless. There is no mention of accident, poisoning or birth defect.",
  },
  {
    q: "Where did Mrs Pumphrey first stop the narrator to talk about Tricki?",
    opts: ["At the market", "In the park", "On the road outside the surgery", "At a party"],
    ans: 2,
    exp: "The narrator first describes seeing Mrs Pumphrey and Tricki on the road when she stops her car and calls him to look at the dog. The scene is not set in a park, market or party.",
  },
  {
    q: "What did Tricki’s eyes look like when the narrator saw him fat and ill?",
    opts: ["Bright and shining", "Half closed", "Bloodshot and rheumy", "Completely normal"],
    ans: 2,
    exp: "Tricki’s eyes are described as bloodshot and rheumy, showing his poor health. They are neither bright nor normal in this state.",
  },
  {
    q: "Which of the following did Mrs Pumphrey NOT give Tricki?",
    opts: ["Cream cakes", "Chocolates", "Malt and cod liver oil", "Spicy curry"],
    ans: 3,
    exp: "Mrs Pumphrey feeds Tricki malt, cod liver oil, Horlicks, cream cakes and chocolates, but there is no reference to spicy curry in the text. So 'spicy curry' is the correct answer.",
  },
  {
    q: "What did the narrator initially advise Mrs Pumphrey to do for Tricki?",
    opts: [
      "Give more rich food",
      "Give him regular exercise and cut down his food",
      "Change his breed",
      "Give him sleeping pills",
    ],
    ans: 1,
    exp: "The narrator clearly tells Mrs Pumphrey to reduce Tricki’s food and make him exercise more, like rolling him on the lawn and cutting down sweet things. He never suggests more food, changing breed or medicines.",
  },
  {
    q: "Where did the narrator take Tricki for treatment?",
    opts: ["To a human hospital", "To a friend’s house", "To his veterinary surgery (clinic)", "To a farm"],
    ans: 2,
    exp: "The narrator takes Tricki to his own veterinary surgery, where many other dogs are kept. The story does not mention a human hospital, farm or friend’s house as the treatment place.",
  },
  {
    q: "For the first two days at the surgery, what did Tricki receive?",
    opts: ["Only water", "Heavy doses of medicine", "Surgery and injections", "Lots of meat"],
    ans: 0,
    exp: "Herriot specifically mentions that for two days Tricki was given plenty of water but no food at all. He did not receive heavy medicines, surgery or lavish meat in that period.",
  },
  {
    q: "How did Tricki behave when other dogs sniffed him on his arrival at the surgery?",
    opts: ["He barked loudly", "He snapped at them", "He lay still and ignored them", "He ran around excitedly"],
    ans: 2,
    exp: "On arrival, Tricki is so weak and overloaded with fat that he simply lies on the mattress and does not respond when other dogs sniff him. He neither barks, snaps nor runs about then.",
  },
  {
    q: "How long did Tricki stay at the surgery before going home?",
    opts: ["Two days", "About a fortnight", "One month", "One year"],
    ans: 1,
    exp: "The narrator initially suggests hospitalising Tricki for a fortnight (about two weeks), and by the end of that period the dog is fully recovered. There is no mention of a month- or year-long stay.",
  },
  {
    q: "Who sent baskets of eggs, bottles of wine and brandy to the surgery?",
    opts: ["Mrs Pumphrey", "The narrator’s partner", "A chemist", "A neighbour"],
    ans: 0,
    exp: "Mrs Pumphrey sends all these luxurious items to the surgery as 'extras' for Tricki’s recovery. They are actually consumed by the narrator and his colleagues.",
  },
  {
    q: "How did Tricki react when he finally saw Mrs Pumphrey at the end?",
    opts: ["He ignored her", "He barked angrily", "He rushed towards her and jumped into her lap", "He hid behind the vet"],
    ans: 2,
    exp: "When Mrs Pumphrey arrives, Tricki runs out, jumps into her lap and licks her face, showing excitement and affection. He does not ignore, rage at or hide from her.",
  },
  {
    q: "What is the main setting of the story?",
    opts: ["A school classroom", "A farmyard", "A rich lady’s house and a veterinary surgery", "A jungle"],
    ans: 2,
    exp: "The events mainly take place at Mrs Pumphrey’s luxurious home and the narrator’s veterinary surgery where Tricki is treated. There is no classroom, farmyard or jungle in the story.",
  },
];

const triumphSurgeryMedium = [
  {
    q: "Why does the author describe Tricki as having 'no energy' when Mrs Pumphrey complains about him?",
    opts: [
      "Because Tricki is naturally a lazy breed",
      "Because overfeeding and lack of exercise have made him sluggish and exhausted",
      "Because he has an incurable disease",
      "Because he is angry with his mistress",
    ],
    ans: 1,
    exp: "Tricki’s lack of energy is clearly linked to his unhealthy lifestyle: rich food and no exercise. The text never suggests that his breed is naturally lazy, that he has an incurable disease, or that his behaviour is due to anger.",
  },
  {
    q: "What does the narrator’s calm reaction to Tricki’s condition reveal about his character?",
    opts: [
      "He is indifferent and careless",
      "He enjoys seeing animals suffer",
      "He is experienced and does not panic, relying on his knowledge of animal care",
      "He is confused and unsure what to do",
    ],
    ans: 2,
    exp: "Herriot does not panic; instead he quickly diagnoses the problem as overfeeding and calmly suggests a plan. This shows his experience and confidence, not indifference, cruelty or confusion.",
  },
  {
    q: "Extract-based: Read the lines and answer.\n\n‘He had become hugely fat, like a bloated sausage with a leg at each corner.’\n\nWhat is the effect of this description?",
    opts: [
      "It creates a serious and tragic mood",
      "It uses humour and exaggeration to show Tricki’s obesity vividly",
      "It criticises Mrs Pumphrey directly",
      "It shows that Tricki is a dangerous dog",
    ],
    ans: 1,
    exp: "The simile 'bloated sausage' is humorous exaggeration that paints a clear picture of Tricki’s extreme fatness. It does not create tragedy, show danger or directly attack Mrs Pumphrey, though it indirectly criticises her pampering.",
  },
  {
    q: "Why does the narrator avoid giving Tricki any medicine at the surgery?",
    opts: [
      "He has run out of medicines",
      "He wants to experiment on Tricki",
      "He knows that rest, controlled diet and exercise are enough to cure him",
      "He does not care about Tricki’s health",
    ],
    ans: 2,
    exp: "Herriot deliberately chooses a natural regime because Tricki’s problem is lifestyle, not a specific disease. There is no hint of shortage of medicines, cruel experimentation or negligence.",
  },
  {
    q: "What does Mrs Pumphrey’s reaction to Tricki’s departure for the surgery show?",
    opts: [
      "She is relieved to get rid of him",
      "She is indifferent and cold",
      "She is extremely emotional and considers Tricki almost like a child",
      "She is angry with the narrator",
    ],
    ans: 2,
    exp: "Mrs Pumphrey weeps, clasps her hands and is almost faint with distress when Tricki is taken away, showing intense emotional attachment. She is not relieved, cold or angry; just overattached and anxious.",
  },
  {
    q: "Why do the other dogs at the surgery initially ignore Tricki?",
    opts: [
      "They are jealous of him",
      "They sense that he is unhealthy and not interested in play",
      "They are scared of his size",
      "They have been trained to avoid new dogs",
    ],
    ans: 1,
    exp: "When Tricki arrives, he lies motionless and shows no interest in them, so after sniffing him they lose interest and walk away. The story does not talk about jealousy, fear or special training.",
  },
  {
    q: "Extract-based: Read and answer.\n\n‘It was a temptation to keep Tricki on as a permanent guest.’\n\nWhat is the main reason for this 'temptation'?",
    opts: [
      "The narrator loves Tricki more than any other dog",
      "The surgery staff feel lonely without Tricki",
      "The narrator enjoys the luxurious food and drinks Mrs Pumphrey keeps sending",
      "Tricki is a very useful working dog",
    ],
    ans: 2,
    exp: "Herriot humorously admits that the constant supply of eggs, wine and brandy made Tricki’s stay a 'happy period', hence the temptation to keep him. Tricki is not a working dog, and the text stresses gifts more than personal loneliness.",
  },
  {
    q: "What does Mrs Pumphrey’s sending of beds, cushions, toys and coats for Tricki suggest about her?",
    opts: [
      "She is practical and frugal",
      "She treats Tricki like a spoiled child, surrounding him with unnecessary luxuries",
      "She wants to donate these to the surgery",
      "She is angry and wants to get rid of Tricki’s things",
    ],
    ans: 1,
    exp: "These items show Mrs Pumphrey’s excessive pampering and tendency to humanise her pet, treating him like a child in need of comforts. The gesture is neither practical nor charitable or hostile.",
  },
  {
    q: "Which of the following best captures the theme of the story?",
    opts: [
      "Money can solve all problems",
      "Surgery is always the best solution",
      "Overindulgence in the name of love can be harmful",
      "Dogs should never be kept as pets",
    ],
    ans: 2,
    exp: "The core theme is that blind pampering and overfeeding, even if motivated by love, can damage health. The story never says that money solves everything, that surgery is always best, or that dogs should not be kept as pets.",
  },
  {
    q: "How does the narrator’s description of Tricki’s transformation at the end support the title?",
    opts: [
      "Tricki becomes a show dog and wins prizes",
      "Tricki dies on the operating table",
      "Tricki becomes fit and energetic without any surgical operation, showing that true 'triumph' lies in correct treatment",
      "Tricki runs away and never returns",
    ],
    ans: 2,
    exp: "The title is ironic because the 'triumph' is not of surgery but of sensible regimen; Tricki’s transformation proves that no operation was needed. None of the other outcomes occurs.",
  },
  {
    q: "Why does Mrs Pumphrey repeatedly thank the narrator and call the recovery 'a triumph of surgery'?",
    opts: [
      "She knows exactly what treatment was given",
      "She mistakenly believes complicated surgery and medicines cured Tricki",
      "She is mocking the narrator",
      "She wants to advertise the clinic",
    ],
    ans: 1,
    exp: "Being ignorant of the simple routine at the surgery, Mrs Pumphrey assumes that only advanced medical procedures could have produced such a dramatic change. There is no sign of sarcasm or business motives.",
  },
  {
    q: "What does the narrator’s enjoyment of the gifts sent for Tricki reveal about human nature?",
    opts: [
      "People are always selfish and cruel",
      "Even kind people may be tempted by comfort and luxury, while still doing their duty",
      "Doctors should always accept bribes",
      "We should always refuse gifts",
    ],
    ans: 1,
    exp: "Herriot remains a responsible vet, yet he humorously admits to enjoying the rich food; this shows a human weakness for comfort without undermining his professionalism. The story does not support cruelty, bribery or total refusal of gifts.",
  },
  {
    q: "In the story, what does Tricki’s quick recovery at the surgery suggest about his true nature?",
    opts: [
      "He is a naturally weak dog",
      "He is actually a robust and normal dog when handled properly",
      "He hates his mistress",
      "He prefers living in hospitals",
    ],
    ans: 1,
    exp: "Once given a simple diet and a chance to play, Tricki becomes muscular and energetic, showing that underneath the fat he is a healthy dog. The text does not say he is naturally weak, hateful or hospital-loving.",
  },
  {
    q: "Which of the following best describes the tone of the story?",
    opts: [
      "Dark and tragic",
      "Humorous and gently satirical",
      "Angry and bitter",
      "Mysterious and suspenseful",
    ],
    ans: 1,
    exp: "James Herriot narrates the events with light humour and mild satire, poking fun at overindulgence without cruelty. The tone is not tragic, angry or suspenseful.",
  },
  {
    q: "Why does the narrator keep Mrs Pumphrey in the dark about the simplicity of Tricki’s treatment?",
    opts: [
      "He wants to charge more fees",
      "He knows she may not understand that discipline can be more effective than luxury",
      "He plans never to return Tricki",
      "He is afraid of losing his job",
    ],
    ans: 1,
    exp: "Given Mrs Pumphrey’s mindset, Herriot realises that explaining the plain regime might hurt her pride or be hard for her to accept, so he tactfully avoids detail. The story does not mention cheating, job fear or a plan to keep Tricki forever.",
  },
];

const triumphSurgeryHard = [
  {
    q: "ASSERTION (A): The real 'triumph' in the story lies in surgery and advanced medical treatment.\nREASON (R): Tricki recovers because of a complex operation performed at the veterinary surgery.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "Both statements are false: no surgery is performed; Tricki recovers through diet control and exercise. The title is therefore ironic rather than literal.",
  },
  {
    q: "ASSERTION (A): Mrs Pumphrey is solely to blame for Tricki’s condition.\nREASON (R): She overfeeds him and ignores the vet’s early advice.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The Reason is true because Mrs Pumphrey does overfeed Tricki and neglect exercise, worsening his state. But calling her 'solely' to blame is too extreme and ignores her ignorance and genuine love, so the Assertion is considered false.",
  },
  {
    q: "CASE-BASED: A school plans a talk on responsible pet ownership using 'A Triumph of Surgery' as a case study. Which key message from the story would be MOST relevant for this talk?",
    opts: [
      "Pets should be given as many treats as they want to show love",
      "Only doctors are responsible for a pet’s health, not owners",
      "Balanced diet and exercise are essential, and love should not turn into harmful overindulgence",
      "Pets should not be taken to vets unless they are dying",
    ],
    ans: 2,
    exp: "The story strongly highlights that proper diet and exercise, combined with informed care, are central to a pet’s health and that overpampering can be dangerous. It never recommends unlimited treats, neglect of owner’s duty or avoiding vets.",
  },
  {
    q: "EXTRACT: 'I looked down again at the little dog. That was the trouble. Tricki had never been known to refuse food; he would tackle a meal at any hour of the day or night.' What deeper point about animal care does this observation support?",
    opts: [
      "Animals should decide their own diet",
      "Owners must regulate pets’ food because animals may not know when to stop eating",
      "Dogs are always greedy and cannot be trained",
      "Food is the only way to show affection to animals",
    ],
    ans: 1,
    exp: "The narrator’s point is that dogs often overeat if allowed, so human guardians must control portions responsibly. The story does not claim that animals should decide everything, that training is impossible or that food is the only form of affection.",
  },
  {
    q: "ASSERTION (A): The narrator’s decision to humour Mrs Pumphrey’s belief in 'surgery' is ethically questionable.\nREASON (R): He deceives her by not revealing that Tricki’s cure was only due to simple diet and exercise.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The narrator does allow Mrs Pumphrey to believe that special medical treatment was responsible, when in fact it was a plain regime. This gentle deception may be seen as ethically debatable, so both statements are considered true and linked.",
  },
  {
    q: "From a social perspective, what does Mrs Pumphrey’s lifestyle and treatment of Tricki symbolise?",
    opts: [
      "The hardships of rural poverty",
      "The emptiness and excess of upper-class luxury, where surplus resources are spent on pets rather than true needs",
      "The beauty of simple living",
      "The scientific care of animals",
    ],
    ans: 1,
    exp: "Mrs Pumphrey’s extravagant spending on cushions, coats, rich food and 'medicines' for Tricki highlights an upper-class life of excess and misplaced priorities. The story uses this to gently criticise such lifestyles, not to show poverty or simple living.",
  },
  {
    q: "EXTRACT-BASED: 'He was with his own kind now, fighting like a tiger for his share at mealtimes.' Which interpretation BEST explains this line in context?",
    opts: [
      "Tricki has become aggressive and dangerous",
      "Tricki’s instincts as a normal, energetic dog have reawakened among other dogs",
      "The narrator dislikes Tricki’s behaviour",
      "Tricki is not being fed enough at the surgery",
    ],
    ans: 1,
    exp: "The line shows that Tricki, once lazy and overstuffed, is now behaving like any healthy dog – active, competitive and full of life. It does not suggest cruelty, dislike or underfeeding.",
  },
  {
    q: "CASE-BASED: A student says, 'If Mrs Pumphrey truly loved Tricki, she would never have sent him away.' Based on the story, which response is MOST accurate?",
    opts: [
      "True love sometimes requires painful decisions, and sending Tricki away actually saves his life",
      "She should have ignored the vet completely",
      "Keeping Tricki always at home was the safest option",
      "Love means always keeping loved ones close, regardless of the consequences",
    ],
    ans: 0,
    exp: "Though it breaks her heart, Mrs Pumphrey agrees to send Tricki to the surgery, which leads to his recovery and proves beneficial. The story implies that wise love may involve difficult choices, not blind attachment.",
  },
  {
    q: "What narrative advantage does the first-person point of view ('I') offer in this story?",
    opts: [
      "It limits our understanding and makes the story confusing",
      "It allows readers to access the vet’s observations, humour and subtle judgments directly",
      "It hides the truth about Tricki’s condition",
      "It makes the story more like a scientific report",
    ],
    ans: 1,
    exp: "The first-person narration lets readers see events through Herriot’s eyes, including his amused tone and gentle criticism of excess. It does not mainly confuse, hide truth or turn the story into a dry report.",
  },
  {
    q: "ASSERTION (A): Tricki’s transformation suggests that environment plays a crucial role in health.\nREASON (R): At the surgery, Tricki’s environment changes from a passive, overprotected home to an active, disciplined space with other dogs.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Tricki’s recovery strongly reflects the influence of environment: from a pampered home to a place demanding activity and self-reliance. The Reason describes exactly this shift, so both statements are true and connected.",
  },
  {
    q: "From a moral standpoint, what lesson does the narrator himself seem to learn or reinforce through this episode?",
    opts: [
      "That strictness is always cruel",
      "That simple, natural methods often work better than unnecessary complexity",
      "That wealthy owners should not be trusted",
      "That emotions should be completely suppressed in professional life",
    ],
    ans: 1,
    exp: "The story underlines the effectiveness of straightforward, nature-aligned care over elaborate medical interventions. It does not present strictness as cruelty, condemn all wealthy owners or advocate emotionless practice.",
  },
  {
    q: "EXTRACT: 'She was trembling. Her hands were clasped in front of her; her eyes were brimming over.' What does this physical description of Mrs Pumphrey convey?",
    opts: [
      "She is pretending to be upset for attention",
      "She is genuinely distressed and emotionally overwhelmed at Tricki’s departure",
      "She is angry with the vet",
      "She is physically ill",
    ],
    ans: 1,
    exp: "The trembling hands and tear-filled eyes indicate sincere emotional turmoil as she parts from Tricki. The text does not suggest pretense, anger at the vet or physical sickness.",
  },
  {
    q: "CASE-BASED: If the story were retold from Tricki’s point of view, which aspect would MOST likely be emphasised?",
    opts: [
      "The taste of rich food and the confusion of suddenly losing it but feeling healthier",
      "Complex medical terminology about surgery",
      "Mrs Pumphrey’s social status",
      "The financial costs of treatment",
    ],
    ans: 0,
    exp: "From Tricki’s eyes, the focus would likely be on sensory experiences – food, play, fatigue and renewed energy – rather than human concerns of status or money. He would not explain surgical jargon that never occurs anyway.",
  },
  {
    q: "ASSERTION (A): The humour in 'A Triumph of Surgery' reduces the seriousness of its message.\nREASON (R): Comic descriptions and situations distract readers from reflecting on health and responsibility.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The Reason is false because the humour actually enhances reader engagement and makes the message about responsible care more memorable, not less. Therefore the Assertion that the message is reduced is also false.",
  },
  {
    q: "From a gender perspective, what subtle point can be observed in the portrayal of Mrs Pumphrey and the narrator?",
    opts: [
      "Women are shown as inherently foolish and men as always wise",
      "The story gently critiques how some women of privilege may be confined to emotional roles while professional authority is coded as male",
      "The story has no gender-related elements at all",
      "The narrator openly mocks all women",
    ],
    ans: 1,
    exp: "Mrs Pumphrey is emotional, domestic and indulgent, while the male vet is rational and authoritative; this invites discussion about gendered expectations without overt misogyny. The narrative does not claim that all women are foolish or mock all women.",
  },
];

const thiefStoryPYQs = [
  {
    question: "Who does 'I' refer to in this story? What is he 'a fairly successful hand' at?",
    answer: "In this story, 'I' refers to Hari Singh, a fifteen-year-old boy who is also the narrator. He calls himself 'a fairly successful hand' at stealing, meaning he is an experienced and skilled thief who can rob people cleanly and swiftly without getting caught.",
    year: 2024, marks: 2, difficulty: "easy",
  },
  {
    question: "How did Hari Singh meet Anil, and why did he think Anil would be an easy person to rob?",
    answer: "Hari met Anil at a wrestling match where Anil was watching the wrestlers. Hari approached him with flattery and asked for work. He thought Anil would be an easy person to rob because Anil was simple, kind, easy-going and careless with money. Hari felt that such a trusting man would not suspect him quickly and would be simple to fool.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "What arrangement was made between Hari Singh and Anil? What did Hari get in return for his work?",
    answer: "Anil agreed to keep Hari as his helper if he would cook for him. Later, when the first disastrous meal showed that Hari could not cook, Anil told him he would teach him to cook. In return for his work, Hari received food, a place to live on the modest room over the sweet shop, and occasionally a rupee or so when Anil had money, along with the promise of education.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did Hari Singh find it difficult to rob Anil, even though he had robbed many people before?",
    answer: "Hari says it was difficult to rob Anil because Anil was careless about money and, more importantly, a very trusting and kind man. He felt that stealing from a greedy person was easy and even exciting, but stealing from a careless, trusting person like Anil gave no satisfaction, as such a person might not even notice the loss and, worse, would lose his faith in Hari. The thought of breaking that trust made the theft harder morally than technically.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Hari cook on the first day at Anil’s house? What was Anil’s reaction and what does it show about Anil’s character?",
    answer: "On the first day, Hari cooked such a bad meal that Anil had to give it to a stray dog. He told Hari to go away, but a little later he softened and told him he would teach him to cook. This reaction shows that Anil is patient, forgiving and gentle; instead of throwing Hari out permanently for lying about his skills, he chooses to correct and educate him.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe how Hari stole Anil’s money. Where did he go immediately after the theft?",
    answer: "One evening Anil came home with a bundle of notes, which he kept under the mattress. Late at night, when Anil was asleep, Hari slipped his hand under the mattress, took out the notes and counted them—there were six hundred rupees. He quickly left the room, went out into the dark lane and headed straight for the railway station, planning to catch the 10:30 express to Lucknow and get away before the theft was discovered.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did Hari Singh not board the Lucknow Express, even though he had a clear chance to escape?",
    answer: "Hari reached the station and saw the Lucknow Express just picking up speed, and he could easily have jumped into it. However, at the last minute he hesitated and stayed on the platform. He realised that if he ran away he would lose the only person who had trusted him, taught him, and was ready to educate him. The thought of betraying Anil’s trust and ruining his chance of becoming a respectable, educated man pricked his conscience, so he let the train go without him.",
    year: 2023, marks: 5, difficulty: "hard",
  },
  {
    question: "How did the rainy night in the maidan affect Hari’s mind and his decision about the stolen money?",
    answer: "After missing the train, Hari wandered through the bazaar in heavy rain and finally sat down in a deserted maidan near the clock tower. He had no shelter, his clothes and the notes got soaked, and he began to feel lonely and miserable. The harshness of the night contrasted with Anil’s warm room and kindness, making him realise what he had thrown away. This physical discomfort and emotional loneliness deepened his guilt and pushed him towards the decision to go back and return the money.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Hari return the stolen money? What did he fear when he woke up the next morning?",
    answer: "Hari slipped back into the room quietly, taking advantage of the sound of rain and Anil’s deep sleep. He took out the damp notes from under his shirt and carefully put them back under the mattress where they had been. When he woke up the next morning, he was very nervous. He feared that Anil would have discovered the theft and that he might be questioned, thrown out, or handed over to the police.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Anil behave the next morning, and how did Hari realise that Anil knew everything about the theft?",
    answer: "The next morning Anil was his usual calm self. He greeted Hari, made tea, and later told Hari that he would now be paid regularly. He handed him a fifty-rupee note. Hari noticed that the note was wet and still damp from the previous night’s rain, which meant that Anil had handled the money and realised it had been taken out and returned. Anil did not say anything directly, but his quiet kindness and the wet note told Hari that he knew and had chosen to forgive him.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Give a brief character sketch of Anil as presented in the story.",
    answer: "Anil is a tall, lean, 25-year-old struggling writer who lives a casual and simple life. He earns irregularly by writing articles, spends freely, and is careless with money. Yet he is kind-hearted and trusting: he takes in Hari, feeds him, gives him shelter and promises to teach him to read, write and add numbers. Even after Hari steals from him, Anil chooses not to scold or punish him; instead, he quietly forgives him and continues with the plan to educate him. His faith and generosity become the force that transforms Hari.",
    year: 2024, marks: 5, difficulty: "hard",
  },
  {
    question: "Trace the change in Hari Singh’s character from the beginning to the end of the story.",
    answer: "At the beginning, Hari Singh is a self-centred, confident thief who changes his name regularly, makes friends only to rob them, and feels proud of being 'a fairly successful hand' at stealing. He chooses Anil because he thinks he will be easy to deceive. However, Anil’s trust, kindness and promise of education gradually awaken Hari’s conscience. After stealing the largest sum of his life, he feels restless, guilty and lonely, realising that by betraying Anil he has lost a chance to be educated and respectable. He finally returns the money and decides to stay, showing that he is capable of moral growth and wants to change into an honest person.",
    year: 2023, marks: 5, difficulty: "hard",
  },
  {
    question: "What theme about trust and forgiveness does Ruskin Bond convey through the relationship between Hari Singh and Anil?",
    answer: "Through Anil’s behaviour, the story highlights that genuine trust and forgiveness can reform even a hardened thief. Anil knows that Hari has stolen his money, yet he neither exposes nor humiliates him. Instead, he silently forgives him, continues to keep him, and focuses on educating him. This trust makes Hari feel ashamed and gives him a chance to change. The story suggests that moral transformation is possible when someone believes in us and responds with compassion rather than harsh punishment.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"He knew he was going to write a book and had brought home some money. It was in the evening that he tucked the money under the mattress of his bed.\" \n\nWhat do these lines tell you about Anil and about the opportunity Hari saw?",
    answer: "The lines show that Anil is a struggling writer who earns money irregularly by selling his writing and that he is very casual and careless with money, simply tucking it under the mattress. For Hari, this casual act presents a clear opportunity: he sees exactly where the money is kept and realises that he can easily steal it while Anil sleeps, since there is no lock or special hiding place.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"It’s easier to rob a greedy man, Hari had learnt, because he can afford to be robbed, but it’s difficult to rob a careless man. Sometimes he doesn’t even notice he’s been robbed and that takes all the pleasure out of the work.\" \n\nWhat does this extract reveal about Hari’s thinking?",
    answer: "The extract shows that Hari is not only experienced but also reflective about his 'profession'. He studies human nature and enjoys the thrill of seeing a victim’s reaction. He feels there is no satisfaction in robbing a careless person who may not even notice the loss. This also hints at why robbing Anil, who is careless and trusting, troubles him more than ordinary thefts, because breaking such a person’s trust gives him no real pleasure.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): Anil handed Hari Singh over to the police after realising that he had been robbed.\nREASON (R): Anil believed that thieves can change only if they are strictly punished.\n\nBased on the story, analyse the A–R pair and give the correct analysis.",
    answer: "Both Assertion (A) and Reason (R) are false. Anil does not hand Hari over to the police; instead he silently forgives him, keeps him in his house and continues to educate him. His behaviour shows that he believes in reform through trust and kindness, not harsh punishment. He gives Hari another chance rather than sending him to jail.",
    year: 2019, marks: 3, difficulty: "medium",
  },
];

const thiefStoryEasy = [
  {
    q: "Who is the author of the story 'The Thief’s Story'?",
    opts: ["O. Henry", "Ruskin Bond", "R.K. Narayan", "James Herriot"],
    ans: 1,
    exp: "‘The Thief’s Story’ is written by Ruskin Bond. James Herriot wrote ‘A Triumph of Surgery’, while O. Henry and R.K. Narayan are famous for other short stories, not this one.",
  },
  {
    q: "Who does the narrator 'I' refer to in the story?",
    opts: ["Anil", "Hari Singh", "Ruskin Bond", "Kishan"],
    ans: 1,
    exp: "The narrator is a young thief who calls himself Hari Singh at this time. Anil is the man he robs, and Ruskin Bond is the author, not the narrator.",
  },
  {
    q: "How old is Hari Singh in the story?",
    opts: ["About ten years old", "About fifteen years old", "About twenty years old", "About twenty-five years old"],
    ans: 1,
    exp: "Hari Singh is introduced as a fifteen-year-old thief. Anil, not Hari, is about twenty-five.",
  },
  {
    q: "What is Hari Singh 'a fairly successful hand' at?",
    opts: ["Cooking", "Wrestling", "Stealing", "Writing"],
    ans: 2,
    exp: "Hari proudly calls himself ‘a fairly successful hand’ at stealing, meaning he is good at thief’s work. He lies about being good at cooking and he is not yet educated enough to write well.",
  },
  {
    q: "Where does Hari first meet Anil?",
    opts: ["At a railway station", "At a wrestling match", "In a classroom", "At a cinema hall"],
    ans: 1,
    exp: "Hari spots Anil at a wrestling match, where he walks up to him and starts a conversation. The initial meeting is not at a station, school, or cinema.",
  },
  {
    q: "What is Anil’s profession in the story?",
    opts: ["Shopkeeper", "Farmer", "Struggling writer", "Police officer"],
    ans: 2,
    exp: "Anil is a struggling writer who writes articles for magazines and earns money irregularly. He is not a shopkeeper, farmer or policeman.",
  },
  {
    q: "Where did Anil live?",
    opts: ["In a large bungalow", "In a room over the Jumna Sweet Shop", "In a village hut", "In a hotel"],
    ans: 1,
    exp: "Anil lives in a small room on the top of a building above the Jumna Sweet Shop. There is no mention of a bungalow, hut or hotel.",
  },
  {
    q: "What did Anil promise to teach Hari Singh?",
    opts: [
      "Only how to cook",
      "How to steal more cleverly",
      "How to read, write and add numbers",
      "How to become a wrestler",
    ],
    ans: 2,
    exp: "Anil promises to teach Hari to read, write and add numbers, and later to write whole sentences. He also teaches him cooking, but education is the main promise.",
  },
  {
    q: "How much money did Hari Singh steal from under Anil’s mattress?",
    opts: ["Two hundred rupees", "Four hundred rupees", "Six hundred rupees", "One thousand rupees"],
    ans: 2,
    exp: "Hari counts the notes and finds they total six hundred rupees. This is the largest sum he has ever stolen in his life.",
  },
  {
    q: "Where did Hari plan to go after stealing Anil’s money?",
    opts: ["Delhi", "Lucknow", "Mumbai", "Chennai"],
    ans: 1,
    exp: "Hari plans to catch the 10:30 express to Lucknow so that Anil and the police will not be able to trace him easily.",
  },
  {
    q: "Where did Anil keep the bundle of notes that he brought home one evening?",
    opts: ["In a locked box", "Under his pillow", "Under the mattress", "Inside a cupboard"],
    ans: 2,
    exp: "Anil casually tucks the bundle of notes under the mattress of his bed, giving Hari an easy chance to steal it.",
  },
  {
    q: "What was the time of the train Hari wanted to catch after the theft?",
    opts: ["9:30 p.m. express", "10:30 p.m. express", "11:30 p.m. express", "Midnight express"],
    ans: 1,
    exp: "Hari decides to catch the 10:30 p.m. Lucknow Express so he can be far away before the theft is discovered.",
  },
  {
    q: "What kind of weather does Hari face when he wanders about after missing the train?",
    opts: ["Hot and dusty", "Pleasant and cool", "Cold and rainy", "Foggy and windy"],
    ans: 2,
    exp: "It is raining heavily and a cold wind is blowing when Hari walks in the bazaar and sits in the maidan, leaving both him and the notes soaked.",
  },
  {
    q: "What did Anil give to Hari the next morning that proved he had forgiven him?",
    opts: ["A new shirt", "A fifty-rupee note and a promise of regular pay", "A train ticket", "A suitcase"],
    ans: 1,
    exp: "Anil gives Hari a fifty-rupee note and tells him he will pay him regularly from now on. The note, still damp, silently shows that Anil knows about the theft but has chosen to forgive him.",
  },
  {
    q: "What did Hari feel was more valuable for his future than the stolen notes?",
    opts: ["A chance to go to Lucknow", "Anil’s education and trust", "A new name and identity", "A better employer"],
    ans: 1,
    exp: "Hari realises that Anil’s promise to teach him to read and write, and the trust Anil placed in him, could change his life permanently, whereas the stolen notes would be spent quickly and bring only temporary comfort.",
  },
];

const thiefStoryMedium = [
  {
    q: "Why did Hari Singh not make many friends, according to the story?",
    opts: [
      "He was very shy and afraid of people",
      "He thought friends would interfere with his work as a thief",
      "He preferred to work in a big gang",
      "He trusted everyone too easily",
    ],
    ans: 1,
    exp: "Hari says he kept changing his name and avoided making friends because they could become troublesome and arouse curiosity. This suits his life as a thief who wants to stay unnoticed, not a shy or over-trusting person.",
  },
  {
    q: "What did Hari Singh get from Anil in return for his work, before he was promised a regular salary?",
    opts: [
      "Only money and clothes",
      "Food, shelter and occasional small amounts of money",
      "A fixed monthly salary",
      "Expensive gifts and clothes",
    ],
    ans: 1,
    exp: "Anil gives Hari a place to stay, food to eat and, when he has money, a rupee or two. There is no fixed salary or luxurious gifts at first.",
  },
  {
    q: "What does Hari mean when he says he considered Anil 'the most trusting person' he had ever met?",
    opts: [
      "Anil trusted no one except Hari",
      "Anil trusted everyone blindly, especially Hari, without proof",
      "Anil checked everything carefully",
      "Anil never allowed Hari to handle money",
    ],
    ans: 1,
    exp: "Anil gives Hari the keys, leaves money loosely under the mattress and never suspects him, showing a rare, almost blind trust. He is not shown as suspicious or over-controlling.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"I knew that once I could write like an educated man there would be no limit to what I could achieve.\" \n\nWhat does this thought show about Hari Singh?",
    opts: [
      "He wants to cheat people by writing",
      "He understands that education can open many opportunities in life",
      "He wants to become a great wrestler",
      "He wants to become a rich shopkeeper",
    ],
    ans: 1,
    exp: "Hari realises that the ability to read and write will give him respect and success. His thought reflects an awareness of the power of education, not a desire to wrestle or run a shop.",
  },
  {
    q: "How does Anil react when he realises that Hari cannot cook properly?",
    opts: [
      "He beats him and throws him out",
      "He insults him in front of neighbours",
      "He first tells him to leave but then softens and decides to teach him cooking",
      "He calls the police",
    ],
    ans: 2,
    exp: "Anil’s reaction is gentle: after a bad meal, he initially tells Hari to go, but then feels sorry and decides to teach him. This shows patience and kindness, not violence or humiliation.",
  },
  {
    q: "Why does Hari describe the notes as 'damp' when Anil gives him a fifty-rupee note at the end?",
    opts: [
      "Because Anil washed the clothes with the note in his pocket",
      "Because they got wet during the night’s rain when Hari carried them",
      "Because the note was brand new from the bank",
      "Because Anil had spilled tea on it",
    ],
    ans: 1,
    exp: "Hari realises the note is damp from the rain that soaked the money when he ran about the bazaar. This proves that Anil has touched the notes after they were returned and therefore knows about the theft.",
  },
  {
    q: "Why does Hari say that robbing a greedy man is easier than robbing a careless man?",
    opts: [
      "Because greedy men are less intelligent",
      "Because greedy men never keep their money safely",
      "Because greedy men notice and fear loss, while careless men may not notice being robbed at all",
      "Because careless men are always poor",
    ],
    ans: 2,
    exp: "Hari explains that a greedy man’s fearful reaction gives a thief satisfaction, but a careless man may not realise the loss, which 'takes all the pleasure out of the work'. It is not about intelligence or poverty directly.",
  },
  {
    q: "What does Hari’s decision to return to Anil with the money tell us about his inner conflict?",
    opts: [
      "He cannot find a place to hide",
      "He is afraid of being caught by the police at the station",
      "His desire for respect, education and Anil’s trust overcomes his desire for easy money",
      "He thinks the notes are fake",
    ],
    ans: 2,
    exp: "Hari realises that by running away he would remain just a petty thief, but staying with Anil and learning would give him a new life. This moral conflict leads him to put the money back.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"I lay on the bed listening to the sound of the rain and the trains rushing by.\" \n\nAt this point in the story, what is troubling Hari the most?",
    opts: [
      "Fear of being caught immediately by Anil",
      "Confusion whether to steal or not steal the money",
      "Fear that there will be a flood",
      "Anger at Anil for not paying him enough",
    ],
    ans: 1,
    exp: "After stealing and returning, Hari lies awake, troubled by the thought of being discovered, but also thinking about what he has done. The line reflects his tension and sleeplessness, not fear of flood or anger about pay.",
  },
  {
    q: "Which of the following best states the central theme of 'The Thief’s Story'?",
    opts: [
      "Crime always pays in the end",
      "Trust and kindness can bring about a thief’s moral transformation",
      "Greedy people should be punished",
      "Education is a waste of time",
    ],
    ans: 1,
    exp: "The story shows how Anil’s trust and kindness awaken Hari’s conscience and push him towards honesty. It does not glorify crime, hatred of greed, or dismiss education.",
  },
  {
    q: "What does Anil’s decision not to mention the theft to Hari suggest about his attitude?",
    opts: [
      "He is careless and does not care about money",
      "He believes that gentle forgiveness is more effective than open punishment",
      "He wants to trap Hari later",
      "He is afraid of confronting Hari",
    ],
    ans: 1,
    exp: "By quietly giving Hari money and continuing to teach him, Anil chooses forgiveness and trust as a way to reform him. The text does not show fear or a hidden plan to trap Hari.",
  },
  {
    q: "How does the story portray the importance of education for Hari Singh?",
    opts: [
      "Education is shown as less important than money",
      "Education is a way to impress people without changing behaviour",
      "Education is presented as a path to respectability and a better future",
      "Education is useful only for thieves",
    ],
    ans: 2,
    exp: "Hari feels that once he can read and write like an educated man, there will be no limit to what he can achieve, suggesting that education can lift him out of crime into a respectable life.",
  },
  {
    q: "What feeling overcomes Hari when he imagines Anil’s reaction on discovering the theft?",
    opts: [
      "He feels proud of outsmarting Anil",
      "He feels that Anil will laugh it off",
      "He feels guilty that Anil will be sad at the loss of trust rather than the money",
      "He feels angry that Anil trusted him",
    ],
    ans: 2,
    exp: "Hari believes Anil will be saddened more by the breaking of trust than by the loss of rupees. This thought makes him feel guilty and contributes to his change of heart.",
  },
  {
    q: "Which of the following best describes Anil’s lifestyle?",
    opts: [
      "Rigid and disciplined, with tight control over money",
      "Lavish and rich, living in a big house",
      "Casual and simple, earning irregularly and spending freely",
      "Highly secretive and suspicious of everyone",
    ],
    ans: 2,
    exp: "Anil lives simply in a small room, earns irregularly as a writer, often spends money freely, and is not strict about accounts, reflecting a casual lifestyle rather than rigid or rich living.",
  },
  {
    q: "What does the ending of the story, with Anil promising to teach Hari to write whole sentences, symbolise?",
    opts: [
      "Hari’s failure as a thief",
      "The beginning of Hari’s journey towards honesty and self-improvement",
      "Anil’s plan to use Hari in his business",
      "Hari’s plan to steal again later",
    ],
    ans: 1,
    exp: "The ending hints that Hari will stay, learn and perhaps change his life through education and honest work. It signals a hopeful new beginning rather than a future of repeated thefts.",
  },
];

const thiefStoryHard = [
  {
    q: "ASSERTION (A): The most important loss for Anil, if the theft had remained, would have been the money itself.\nREASON (R): Anil cares more about his savings than about relationships and trust.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "Both statements contradict the story. Hari himself feels that Anil would be hurt more by the loss of trust than by the loss of money. Anil’s forgiving response shows he values relationships and reform more than rupees.",
  },
  {
    q: "ASSERTION (A): Hari Singh’s decision to return the money marks a turning point in his life.\nREASON (R): It reflects his realisation that long-term respect and education are more valuable than short-term gains from theft.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Hari’s return of the money is indeed a turning point. His thoughts about becoming an educated, respectable man instead of a small-time thief directly explain why he chooses to come back.",
  },
  {
    q: "CASE-BASED: A counsellor is guiding juvenile offenders and wants to use 'The Thief’s Story' as a text. Which idea from the story would be MOST effective to highlight?",
    opts: [
      "Thieves can never change, so strict punishment is the only answer",
      "One act of kindness and trust can open the door to a new life",
      "Intelligence should only be used for earning money quickly",
      "Changing one’s name frequently is a good way to avoid problems",
    ],
    ans: 1,
    exp: "The story’s key message is that Anil’s kindness and trust lead to Hari’s moral awakening, suggesting that compassion and belief can help offenders reform. It never claims thieves cannot change or promotes cheating.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"I had made a study of men’s faces when they had lost their goods.\" \n\nWhat does this line reveal about Hari Singh’s experience and attitude?",
    opts: [
      "He is inexperienced and guesses reactions",
      "He is a sensitive boy who hates stealing",
      "He has repeatedly robbed people and coolly observes their reactions, almost like a professional",
      "He only imagines what people might feel",
    ],
    ans: 2,
    exp: "Hari’s 'study' of different reactions (fear, anger, acceptance) shows he has robbed many people and observes them calmly, like a professional thief analysing his 'work'.",
  },
  {
    q: "ASSERTION (A): Anil’s choice not to confront Hari about the theft is a sign of weakness.\nREASON (R): By staying silent, he shows that he is afraid of losing Hari’s help in the house.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The story portrays Anil’s silence as strength and wisdom, not weakness. He is not afraid of losing a servant; rather, he wants to give Hari a chance to reform through trust and education.",
  },
  {
    q: "From a psychological point of view, what mainly triggers Hari’s pangs of guilt after the theft?",
    opts: [
      "Fear of being caught at the station",
      "The realisation that he has betrayed the only person who trusted and taught him",
      "Anger that the notes are only six hundred rupees",
      "Worry that his new name will be discovered",
    ],
    ans: 1,
    exp: "Hari’s guilt arises when he understands that he has cheated a genuinely kind and trusting man who was trying to educate him—someone different from his usual victims. This emotional betrayal hurts him more than the fear of the police.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"It is difficult to rob a careless man because he doesn’t even notice he’s been robbed and that takes all the pleasure out of the work.\" \n\nWhat is the implied criticism in this line?",
    opts: [
      "Careless people should not keep money",
      "Thieves prefer rich and greedy victims",
      "Both thieves and careless people are criticised: thieves for enjoying others’ pain, and careless people for valuing money so little",
      "Careless people deserve to be robbed",
    ],
    ans: 2,
    exp: "The line gently mocks both sides: thieves like Hari who take pride in the victim’s reaction, and careless people like Anil who are so unconcerned that they don’t notice a loss. It does not claim that such people deserve robbery.",
  },
  {
    q: "CASE-BASED: A student says, “If Anil had scolded Hari harshly the next morning, Hari would have changed more quickly.” Which response aligns BEST with the story’s message?",
    opts: [
      "Harsh words change people faster than kindness",
      "Kindness and silent trust can sometimes touch the heart more deeply than open scolding",
      "It doesn’t matter how Anil reacted; Hari would never change",
      "Hari changed only because he feared the police",
    ],
    ans: 1,
    exp: "The story clearly suggests that Anil’s quiet forgiveness, not anger, leads to Hari’s moral awakening. There is no evidence that harsh scolding or fear of police would have worked better.",
  },
  {
    q: "What does Hari’s habit of changing his name frequently suggest symbolically?",
    opts: [
      "He wants to celebrate different cultures",
      "He has no stable identity or moral centre and is always running from his past",
      "He respects his family tradition",
      "He is proud of his real name and wants everyone to know it",
    ],
    ans: 1,
    exp: "Changing names is a practical trick to avoid being caught, but symbolically it reflects Hari’s lack of stable identity and conscience. He is a boy in search of a new, better self, which he begins to find with Anil.",
  },
  {
    q: "ASSERTION (A): The rainy night and empty maidan serve as an external mirror to Hari’s inner state.\nREASON (R): The cold, wet and lonely environment intensifies his feelings of guilt and isolation.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The bleak, rainy setting parallels Hari’s troubled mind. The cold and loneliness deepen his sense of emptiness after the theft, pushing him towards repentance. Thus, the setting thematically reflects his inner turmoil.",
  },
  {
    q: "From a thematic angle, why is the story titled 'The Thief’s Story' and not 'Anil’s Story'?",
    opts: [
      "Because Anil is not important",
      "Because the focus is on the thief’s inner journey from crime to conscience",
      "Because thieves are always more interesting than honest people",
      "Because Anil appears only briefly",
    ],
    ans: 1,
    exp: "The story centres on Hari’s thoughts, conflicts and transformation. Anil is crucial, but mainly as a catalyst. The title signals that the narrative is about the moral journey of the thief, not the life of the kind man.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"Whole sentences, I knew, could one day bring me more than a few hundred rupees.\" \n\nIn context, what does this line mean?",
    opts: [
      "Hari wants to become a professional forger of documents",
      "Hari realises that literacy and honest work can give him more lasting gains than theft",
      "Hari plans to write threatening letters for money",
      "Hari thinks stories about theft will make him rich quickly",
    ],
    ans: 1,
    exp: "Here Hari is thinking about the long-term power of education. Being able to write sentences like an educated man could help him earn respectably and more securely than occasional thefts.",
  },
  {
    q: "CASE-BASED: Suppose Anil had never offered to educate Hari, but still forgiven him. Which aspect of the story’s message would be weakened the most?",
    opts: [
      "The importance of trust in relationships",
      "The role of education as a tool for transformation",
      "The thrill of stealing from careless people",
      "The need to change one’s name to avoid police",
    ],
    ans: 1,
    exp: "Education is central to Hari’s hope of a new life. Without Anil’s promise to teach him, the link between trust, learning and moral reform would be less powerful. Trust would still matter, but the idea of education changing his future would be weaker.",
  },
  {
    q: "ASSERTION (A): The story suggests that criminals are born bad and cannot change.\nREASON (R): Hari goes back to theft after returning the money.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The story shows exactly the opposite: that a thief like Hari can change when someone believes in him. There is no instance of him returning to theft after the night of the robbery; instead he stays to learn.",
  },
  {
    q: "From a value-education perspective, which lesson does 'The Thief’s Story' MOST strongly communicate to students?",
    opts: [
      "Smart thieves never get caught",
      "Forgiveness and guidance can change a person more deeply than fear and punishment",
      "Money is the only measure of success",
      "One must never trust anyone, however kind they seem",
    ],
    ans: 1,
    exp: "By showing how Anil’s quiet forgiveness and educational support touch Hari’s conscience, the story teaches that kindness and guidance can have a deeper impact on character than threats or jail.",
  },
];

const midnightVisitorPYQs = [
  {
    question: "How is Ausable different from other secret agents?",
    answer: "Ausable is very different from the typical image of a secret agent. Instead of being slim, glamorous and living in exotic settings, he is fat, sloppy and lives in a small room in a gloomy French hotel on the sixth floor. He speaks French and German with difficulty and has an American accent, and instead of receiving secret messages from beautiful women, he gets only a routine telephone call making an appointment.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "Who is Fowler? Why was he disappointed on meeting Ausable for the first time?",
    answer: "Fowler is a young and romantic writer who comes to meet Ausable to gather material for a story on secret agents. He imagines mysterious figures, dark alleys and thrilling adventures, but on meeting Ausable, he feels disappointed because he finds a fat, ordinary-looking man who lives in a dull hotel room. The setting and Ausable’s appearance do not match Fowler’s exciting expectations of a spy.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Who was Max? Why had he entered Ausable’s room?",
    answer: "Max was a thin, crafty rival secret agent, smaller than Ausable and carrying a pistol. He had entered Ausable’s room using a passkey to steal a very important report on some new missiles which Ausable was expecting to receive that night. He wanted to possess the report before it could be safely delivered to its rightful agency.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What story did Ausable invent about the balcony? Why did Max believe it?",
    answer: "Ausable invented the story that there used to be a balcony directly outside his window, which was part of the next apartment and had once been used to break into his room. He complained that this was the second time someone had entered his room through that balcony. Ausable spoke in such an annoyed and convincing way, and with such confidence, that Max believed the balcony really existed and assumed it was an easy escape route.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Ausable use the knock at the door and Henry’s arrival to get rid of Max?",
    answer: "When someone knocked at the door, Ausable calmly told Max that the police were outside, visiting him for extra security regarding the important report. This information terrified Max, who did not want to be caught with a gun and stolen papers. Believing there was a balcony, Max decided to wait outside on it until the police went away. He backed towards the window, climbed out – only to fall to his death, as there was no balcony at all. The knock was actually of Henry, the waiter, bringing a drink, but Ausable used it cleverly to reinforce his invented story.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "Who was Henry and what role did he play in Ausable’s plan, though unknowingly?",
    answer: "Henry was a waiter at the French hotel where Ausable stayed. Ausable had earlier ordered a drink from him. When Henry knocked on the door with the drink, Max, already frightened by Ausable’s talk of the police, mistook Henry’s knock for that of the police. This misunderstanding, created by Ausable’s story, pushed Max into panicking and jumping out of the window, helping Ausable get rid of him without any violence.",
    year: 2024, marks: 2, difficulty: "easy",
  },
  {
    question: "In what way does Ausable prove that presence of mind and intelligence are more powerful than a gun?",
    answer: "Although Max has a gun, Ausable never panics. He remains calm and uses only his words and imagination. By inventing the balcony and the story about the police, he completely controls the situation while sitting comfortably in his chair. Max, who relies on his weapon, is deceived into making a fatal mistake. Thus, Ausable’s quick thinking and presence of mind defeat Max’s physical threat, proving that intelligence can be more powerful than a gun.",
    year: 2022, marks: 5, difficulty: "hard",
  },
  {
    question: "What was the important report Ausable was expecting? Why was it so significant?",
    answer: "Ausable was expecting an important report concerning some new missiles. Although the story does not describe the contents in detail, it suggests that the report contained highly confidential information related to national security. Because of this, many people, including risky secret agents like Max, were ready to steal it, and police protection was supposed to be increased, making it highly significant.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the story highlight the theme ‘appearance versus reality’ through Ausable’s character?",
    answer: "At first sight, Ausable appears to be the opposite of a glamorous spy: he is fat, speaks clumsily and lives in an ordinary hotel room. Fowler feels let down by his appearance. However, when danger comes, Ausable’s sharp mind, calmness and ability to manipulate events show that he is a highly effective secret agent. Thus, his outward appearance hides his inner brilliance, emphasising that one should not judge people only by how they look.",
    year: 2023, marks: 5, difficulty: "hard",
  },
  {
    question: "Why was Fowler’s meeting with Ausable ‘the most thrilling’ experience of his life by the end of the story?",
    answer: "Initially bored, Fowler suddenly finds himself facing a man with a gun in a dark hotel room, which is already quite thrilling. Then he witnesses Ausable calmly inventing stories about a balcony and the police, sees Max frightened into jumping out of the window, hears a loud scream, and finally discovers that there was never any balcony at all. The mixture of danger, clever trickery and unexpected twists makes this night with Ausable the most thrilling experience of Fowler’s life.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"‘I’m going to raise the devil with the management this time,’ Ausable muttered. ‘You can bet on it. This is the second time in a month that somebody has got into my room through that nuisance of a balcony!’\" \n\nHow does this speech help Ausable in dealing with Max?",
    answer: "Ausable’s angry speech about the balcony is actually a deliberate performance meant for Max. By complaining that this is the second time someone has used the balcony to enter, he makes the existence of the balcony sound real and troublesome. His irritated tone convinces Max that there must be such a balcony outside the window. Later, when he mentions the police knock, Max immediately chooses to escape through this imaginary balcony, falling into Ausable’s trap.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"Max bit his lip nervously. The knocking at the door became louder and a little more impatient.\" \n\nWhat does this moment show about the contrast between Max and Ausable?",
    answer: "This moment shows that Max, despite holding a gun, is nervous, impatient and easily rattled when he thinks the police are outside. His fear makes him act hastily. In contrast, Ausable remains calm and in control even without any weapon. The louder knock increases Max’s panic but strengthens Ausable’s position, highlighting the contrast between Max’s insecurity and Ausable’s steady presence of mind.",
    year: 2019, marks: 2, difficulty: "easy",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): Ausable’s success in getting rid of Max proves that physical strength is the most important quality for a secret agent.\nREASON (R): Max is physically stronger than Ausable and therefore wins in the end.\n\nBased on the story, analyse the A–R pair and give the correct answer.",
    answer: "Both Assertion (A) and Reason (R) are false. Ausable is not physically strong; he is fat and does not fit the typical heroic image. Max, although armed and more agile, does not win; he is outwitted and falls to his death. The story actually shows that intelligence and presence of mind, not physical strength, are the most important qualities for a secret agent.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What lesson about using intelligence in dangerous situations does the story ‘The Midnight Visitor’ convey?",
    answer: "The story shows that in dangerous situations, a calm mind and clever planning can defeat even an armed opponent. Ausable never uses force or raises his voice, but he studies Max’s fear, invents a believable balcony, and uses the waiter’s knock to create the illusion of the police. His quick thinking turns a helpless situation into a victory, teaching that intelligence and presence of mind are powerful weapons in real life.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "How does the writer use humour in the story, even while dealing with a serious situation involving a gun?",
    answer: "The writer uses gentle humour through the contrast between what Fowler expected and what actually happens, and through Ausable’s behaviour. Ausable complains about the hotel management and the balcony as if dealing with a routine inconvenience, not an armed intruder. His irritation about practical things and lazy manner of speaking lighten the mood even as the story remains suspenseful. The final twist, when Fowler learns that there was no balcony at all, also carries humorous surprise.",
    year: 2020, marks: 3, difficulty: "medium",
  },
];

const midnightVisitorEasy = [
  {
    q: "Who is the author of the story 'The Midnight Visitor'?",
    opts: ["James Herriot", "Robert Arthur", "Ruskin Bond", "R.K. Narayan"],
    ans: 1,
    exp: "‘The Midnight Visitor’ is written by Robert Arthur. James Herriot wrote ‘A Triumph of Surgery’ and Ruskin Bond wrote ‘The Thief’s Story’, so those options are incorrect.",
  },
  {
    q: "What is Ausable’s profession in the story?",
    opts: ["Hotel manager", "Secret agent", "Police inspector", "News reporter"],
    ans: 1,
    exp: "Ausable is a secret agent involved in handling important reports about missiles. He is not a hotel manager, inspector or reporter.",
  },
  {
    q: "Where does Ausable live in Paris?",
    opts: [
      "In a big bungalow by the river",
      "In a modern glass building",
      "In a small room in a gloomy French hotel",
      "In a flat near the railway station",
    ],
    ans: 2,
    exp: "He lives in a small room at the end of a musty corridor in a gloomy French hotel on the sixth floor. No bungalow, glass tower or station flat is mentioned.",
  },
  {
    q: "Who is Fowler?",
    opts: ["A waiter", "A rival spy", "A young writer", "A hotel manager"],
    ans: 2,
    exp: "Fowler is a young writer who comes to meet Ausable to write about secret agents. He is neither a waiter nor a spy.",
  },
  {
    q: "What kind of secret agent had Fowler expected Ausable to be?",
    opts: [
      "Fat and clumsy, living in a dull room",
      "Tall, slim and mysterious, having thrilling adventures",
      "Very old and retired",
      "A farmer turned spy",
    ],
    ans: 1,
    exp: "Fowler had imagined a romantic, glamorous spy who lived dangerously and moved through thrilling situations, not an ordinary, plump man in a dull hotel room.",
  },
  {
    q: "Who is the 'midnight visitor' referred to in the title?",
    opts: ["Fowler", "Ausable", "Henry", "Max"],
    ans: 3,
    exp: "The 'midnight visitor' is Max, the rival secret agent who appears unexpectedly in Ausable’s room at night with a pistol. Fowler and Henry are already known to Ausable.",
  },
  {
    q: "What was Max holding in his hand when Fowler and Ausable entered the room?",
    opts: ["A knife", "A telephone", "A small automatic pistol", "A briefcase"],
    ans: 2,
    exp: "Max is described as standing in the room holding a small automatic pistol, threatening Ausable and Fowler. There is no knife, telephone or briefcase in his hand.",
  },
  {
    q: "Where had Max been hiding before Ausable and Fowler entered?",
    opts: [
      "In the cupboard",
      "Behind the curtain",
      "Inside the bathroom",
      "Inside the room, waiting in the dark",
    ],
    ans: 3,
    exp: "Max had entered the room earlier with a passkey and stood in the room waiting in the dark. The story does not say he hid in the cupboard, behind curtains or in the bathroom.",
  },
  {
    q: "What important thing was Ausable waiting for that night?",
    opts: [
      "A letter from his family",
      "A report on new missiles",
      "An invitation to a party",
      "A parcel of clothes",
    ],
    ans: 1,
    exp: "Ausable is expecting a highly confidential report on some new missiles. This is what makes the visit of Max and the mention of the police believable.",
  },
  {
    q: "How had Max got into Ausable’s room?",
    opts: [
      "By breaking the window glass",
      "By climbing a real balcony",
      "By using a passkey or master key",
      "By tunnelling through the floor",
    ],
    ans: 2,
    exp: "Max himself says he entered using a passkey. The balcony story is Ausable’s invention and there is no tunnel in the story.",
  },
  {
    q: "Who was Henry in the story?",
    opts: ["A rival spy", "A waiter at the hotel", "The hotel manager", "A police officer"],
    ans: 1,
    exp: "Henry is the waiter who brings a drink to Ausable’s room. He is not a spy, manager or policeman.",
  },
  {
    q: "What did Ausable order from Henry?",
    opts: ["Dinner", "Coffee", "A bottle of wine", "A newspaper"],
    ans: 2,
    exp: "Ausable had earlier ordered a drink (wine) which Henry brings later. The text mentions this drink, not a full dinner or newspaper.",
  },
  {
    q: "According to Ausable, who was knocking at the door when Max was in the room?",
    opts: ["The hotel manager", "A rival spy", "The police", "Henry, the waiter"],
    ans: 2,
    exp: "Ausable tells Max that the knock is from the police who come for extra security whenever an important report is expected. In reality, it is Henry, but Max believes Ausable’s version.",
  },
  {
    q: "How does Max try to save himself from the 'police'?",
    opts: [
      "By hiding under the bed",
      "By jumping out of the window onto the supposed balcony",
      "By shooting at the door",
      "By surrendering to them",
    ],
    ans: 1,
    exp: "Max decides to go out onto the 'balcony' outside the window until the police go away. He jumps out, not knowing that there is no balcony at all.",
  },
  {
    q: "What is the final twist revealed by Ausable about the balcony?",
    opts: [
      "It was broken the previous day",
      "It belonged to the next room only",
      "It had been removed by the hotel",
      "There was never any balcony outside his window",
    ],
    ans: 3,
    exp: "After Henry leaves, Ausable calmly tells Fowler that there is no balcony outside his window. He had invented the whole story to trick Max.",
  },
];

const midnightVisitorMedium = [
  {
    q: "Why was Fowler initially disappointed when he met Ausable?",
    opts: [
      "Ausable refused to talk to him",
      "Ausable looked ordinary and fat, and his surroundings were dull, not thrilling",
      "Ausable spoke only French and Fowler did not understand",
      "Fowler missed his train because of Ausable",
    ],
    ans: 1,
    exp: "Fowler had romantic ideas of spies but found Ausable fat, slow-moving and living in a gloomy hotel room. This mismatch disappointed him; there is no mention of language problems or trains.",
  },
  {
    q: "Which of the following best describes Max’s appearance?",
    opts: [
      "Tall and muscular, with a scar",
      "Short and fat, like Ausable",
      "Slim, slightly shorter than Ausable, with a face like a fox",
      "Old and bent, with white hair",
    ],
    ans: 2,
    exp: "Max is described as a slim man, just shorter than Ausable, with features that make his face look like that of a fox. None of the other descriptions matches the text.",
  },
  {
    q: "How does Ausable’s calm reaction to seeing Max with a pistol affect the situation?",
    opts: [
      "It makes Fowler panic more",
      "It prevents Max from shooting immediately and gives Ausable time to think and plan",
      "It convinces Max to go away at once",
      "It angers the hotel management",
    ],
    ans: 1,
    exp: "Because Ausable does not lose his nerve, Max also hesitates and listens to him. This calmness allows Ausable to guide the conversation, invent the balcony story and slowly turn the situation in his favour.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"Max, you spoke from that window and you can see it now.\" \n\nWhy does Ausable speak like this to Max?",
    opts: [
      "To remind Max to shut the window",
      "To convince Fowler that there is a balcony",
      "To strengthen the illusion of the balcony and push Max to use it as an escape route",
      "To ask Max to jump and prove his courage",
    ],
    ans: 2,
    exp: "By referring to the balcony as if it is obvious and visible, Ausable increases Max’s belief in its existence. This makes Max feel safe jumping out onto what he thinks is a balcony.",
  },
  {
    q: "Why does Max believe there is a balcony outside the window?",
    opts: [
      "He had seen it earlier in the daylight",
      "He checked it before entering the room",
      "Ausable describes it confidently and angrily, saying it has been used before for break-ins",
      "Henry tells him about it",
    ],
    ans: 2,
    exp: "Ausable sounds annoyed and factual about the balcony, even complaining that someone entered by it earlier. This confident detail convinces Max, who has no reason to doubt a local like Ausable.",
  },
  {
    q: "Why does the knock at the door cause Max to panic?",
    opts: [
      "He thinks it is Fowler’s friend",
      "He thinks it is the hotel manager who will scold him",
      "He believes Ausable’s statement that the police have come for additional security",
      "He fears Henry will recognise him",
    ],
    ans: 2,
    exp: "Ausable cleverly says the police come regularly on such nights. Max, holding a gun and trying to steal, naturally fears being caught, so he panics when he hears the knock.",
  },
  {
    q: "What is the main reason Ausable tells Fowler about the 'police' instead of revealing that it is Henry?",
    opts: [
      "He wants to frighten Fowler",
      "He wants to protect Henry from Max",
      "He wants to use the knock as part of his plan to push Max onto the balcony",
      "He does not recognise Henry’s knock",
    ],
    ans: 2,
    exp: "Ausable immediately turns the knock into an advantage by calling it the police. This adds pressure on Max, making him desperate to find a hiding place and fall for the balcony trick.",
  },
  {
    q: "How does the setting of a small hotel room at midnight contribute to the story?",
    opts: [
      "It makes the story boring and slow",
      "It increases suspense and irony as danger appears in such an ordinary place",
      "It hides the characters’ faces",
      "It shows that hotels are unsafe",
    ],
    ans: 1,
    exp: "The ordinary, dull room contrasts with the suspenseful events, heightening the reader’s surprise that such excitement can occur in a mundane setting. The focus is not on hotel safety in general.",
  },
  {
    q: "Which of the following best summarises Fowler’s change of opinion about Ausable by the end?",
    opts: [
      "He still finds Ausable boring and clumsy",
      "He realises Ausable is cowardly but lucky",
      "He understands that Ausable, though ordinary in looks, is extremely clever and brave in his own way",
      "He decides never to write about secret agents again",
    ],
    ans: 2,
    exp: "Fowler sees how Ausable uses imagination and bravery to defeat Max. He now respects Ausable’s intelligence and presence of mind, in spite of his looks.",
  },
  {
    q: "What does the story suggest about Max as a secret agent?",
    opts: [
      "He is very intelligent and careful",
      "He is overconfident and not as clever as he thinks",
      "He has great physical strength but no gun",
      "He is more experienced than Ausable",
    ],
    ans: 1,
    exp: "Max is easily fooled by a simple story and reacts in panic. His overconfidence and lack of suspicion show that he is not truly smart, unlike Ausable.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"Max’s face was black with anger.\" \n\nWhat had Ausable just said or done to make Max so angry?",
    opts: [
      "He called Max a fool directly",
      "He told Max that the report would never come that night",
      "He casually mentioned that the report had already been taken away",
      "He announced that the police were outside and Max could not escape",
    ],
    ans: 3,
    exp: "When Ausable talks about the police coming, Max feels trapped and gets angry and tense. The fear of being caught while stealing the report is what provokes this reaction.",
  },
  {
    q: "How does the author create dramatic irony in the story?",
    opts: [
      "By making Fowler know more than Ausable",
      "By letting the reader and Fowler realise later that the balcony never existed, though Max believed in it",
      "By having the police actually arrive",
      "By revealing Max’s plan at the beginning",
    ],
    ans: 1,
    exp: "The real twist comes when Ausable calmly admits there is no balcony, after Max has already jumped. This delayed revelation creates dramatic irony—the reader and Fowler see how completely Max was fooled.",
  },
  {
    q: "What is Ausable’s attitude towards the hotel management when he talks about the balcony?",
    opts: [
      "He praises them highly",
      "He is angry and complains that they have not dealt with the 'nuisance' balcony",
      "He is indifferent and silent",
      "He is afraid of the management",
    ],
    ans: 1,
    exp: "Ausable speaks as though he is genuinely irritated with the management for not blocking the balcony, making his story more realistic for Max and Fowler.",
  },
  {
    q: "Which of the following best describes the tone of the story?",
    opts: [
      "Dark and tragic with no humour",
      "Purely comic without any tension",
      "Suspenseful but laced with gentle humour and irony",
      "Angry and accusatory",
    ],
    ans: 2,
    exp: "The story combines suspense—an intruder with a gun—with Ausable’s humorous complaints and the final ironic twist, making the overall tone suspenseful yet lightly humorous.",
  },
  {
    q: "How does 'The Midnight Visitor' highlight the theme of 'mind over muscle'?",
    opts: [
      "By showing police arrest Max",
      "By showing that Max is physically weak and cannot fight",
      "By showing that Ausable’s quick thinking and calm lies defeat Max’s gun and threat",
      "By showing that Fowler is stronger than Max",
    ],
    ans: 2,
    exp: "Ausable wins the encounter not through force but through clever talk. Max has the weapon, but Ausable’s mind proves stronger than Max’s physical advantage.",
  },
];

const midnightVisitorHard = [
  {
    q: "ASSERTION (A): The story suggests that one should never judge a person’s abilities by their physical appearance.\nREASON (R): Ausable, though fat and seemingly unimpressive, outsmarts the armed and agile Max.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The whole story is built on the contrast between Ausable’s appearance and his abilities. His triumph over Max supports the idea that appearance does not show true capability, so both A and R are true and linked.",
  },
  {
    q: "ASSERTION (A): Max deserves the fate he meets in the story.\nREASON (R): He enters another agent’s room illegally with a gun to steal an important report and is easily misled by lies.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The story presents Max as a criminal rival spy who willingly takes a dangerous risk. His greed and carelessness lead to his fall, so the Reason supports the Assertion.",
  },
  {
    q: "CASE-BASED: A teacher uses 'The Midnight Visitor' to discuss crisis management. Which aspect of Ausable’s behaviour is MOST useful as a model?",
    opts: [
      "His habit of complaining about the hotel management",
      "His decision to keep a gun hidden in his room",
      "His calm thinking, creative storytelling and ability to use available situations to his advantage",
      "His refusal to call the police at all",
    ],
    ans: 2,
    exp: "In a crisis, Ausable does not panic. He invents a story, uses the knock at the door and the room’s setting to manipulate Max. This presence of mind is the key skill for crisis management.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"You are disappointed,\" Ausable said wheezily over his shoulder. \"You were told that I was a secret agent and that I dealt in espionage and danger.\" \n\nWhat does Ausable’s remark show about his self-awareness?",
    opts: [
      "He is unaware of how he appears to others",
      "He knows exactly how ordinary he looks and understands Fowler’s expectations",
      "He thinks he is very handsome and fashionable",
      "He is angry at Fowler for coming",
    ],
    ans: 1,
    exp: "Ausable recognises that he does not look like the romantic figure Fowler imagined and comments on it humourously. This shows his self-awareness, not ignorance.",
  },
  {
    q: "ASSERTION (A): The invented balcony is the most important 'character' in the story.\nREASON (R): It never physically appears, but it completely controls Max’s decisions and leads to the climax.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Though imaginary, the balcony shapes the entire action once introduced. Max’s belief in it drives the climax, so the Reason correctly explains why the 'balcony' is central.",
  },
  {
    q: "From a thematic point of view, what does Max’s fall from the window symbolise?",
    opts: [
      "The fall of evil in every story",
      "The danger of working at night",
      "The downfall that comes from overconfidence and underestimating others",
      "The weakness of secret agents in general",
    ],
    ans: 2,
    exp: "Max overestimates his gun and underestimates Ausable. His blind faith in his own plan and his failure to question Ausable’s story lead literally to his fall, symbolising the risks of arrogance.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"Max, you will have to do something about it. I’m expecting very important papers any time now.\" \n\nWhich strategy is Ausable using here?",
    opts: [
      "He is begging Max for mercy",
      "He is pretending to trust Max so that Max will guard the window",
      "He is reminding Max of the value of the report to increase his nervousness and dependence on the balcony",
      "He is trying to make Max leave immediately",
    ],
    ans: 2,
    exp: "By stressing that the report is important and that more danger (the police) is expected, Ausable deepens Max’s fear and pushes him towards using the supposed balcony as a temporary hiding place.",
  },
  {
    q: "CASE-BASED: A student argues that Ausable is just lucky because Henry knocked at the right time. Which counter-argument is BEST supported by the story?",
    opts: [
      "Luck played no role at all; only Max’s gun mattered",
      "Even if Henry knocked by chance, Ausable’s intelligence turned that knock into a complete strategy against Max",
      "Henry planned the whole thing with Ausable",
      "The police were really at the door",
    ],
    ans: 1,
    exp: "Henry’s knock may be coincidence, but Ausable’s quick decision to call it the police visit is entirely his own cleverness. Without Ausable’s mind, the knock alone would not have saved him.",
  },
  {
    q: "ASSERTION (A): Fowler’s presence in the room makes the story more interesting for the reader.\nREASON (R): Fowler’s reactions act like the reader’s reactions, from disappointment to excitement and surprise.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Through Fowler’s eyes, the reader experiences initial boredom, shock at seeing Max, and amazement at Ausable’s trick, so his presence indeed shapes how we feel, supporting the Assertion.",
  },
  {
    q: "From a value-education perspective, which lesson is MOST strongly supported by Ausable’s handling of the situation?",
    opts: [
      "One should always carry weapons for safety",
      "Shouting and anger are the best ways to handle danger",
      "Staying calm and using intellect can resolve conflicts more safely than violence",
      "It is better to run away than to face problems",
    ],
    ans: 2,
    exp: "Ausable neither fights nor flees. He stays calm, observes Max’s fear, and uses a non-violent trick to get rid of him, highlighting the power of intellect over aggression.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"Fowler had never thought much of the people who tackled espionage and danger.\" \n\nHow does the night with Ausable change Fowler’s opinion?",
    opts: [
      "He realises spies are all cowards",
      "He sees that real espionage may involve clever thinking, not dramatic looks",
      "He decides espionage is always boring",
      "He thinks only Max was a real spy",
    ],
    ans: 1,
    exp: "After seeing Ausable defeat Max with pure brains, Fowler understands that espionage is not about glamour but about intelligence and risk, making him respect real agents more.",
  },
  {
    q: "CASE-BASED: Imagine Ausable had told Max the truth that the knock was Henry, not the police. Which outcome is MOST likely?",
    opts: [
      "Max would still jump out of the window",
      "Max would stay in the room with his gun, keeping control of the situation",
      "Max would surrender immediately",
      "Max would call the real police",
    ],
    ans: 1,
    exp: "Without the fear of police, Max would have no reason to risk the balcony. He would probably remain inside, armed and in command, making it harder for Ausable to win.",
  },
  {
    q: "ASSERTION (A): The story supports the idea that lies can never be justified.\nREASON (R): Ausable’s lies about the balcony and the police create only more danger.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "Ausable’s lies actually protect him and Fowler and prevent violence. The story shows his lies as a clever, justified strategy in self-defence, so the Assertion is false while the Reason is also false.",
  },
  {
    q: "In terms of narrative technique, why is it effective that the story is told in the third person but closely follows Fowler’s experience?",
    opts: [
      "It allows the narrator to hide Ausable’s thoughts completely",
      "It helps readers share Fowler’s surprise and gradually understand Ausable’s intelligence",
      "It focuses entirely on Max’s background",
      "It makes the story like a police report",
    ],
    ans: 1,
    exp: "By staying close to Fowler’s point of view, the narrative lets the reader feel the same disappointment, fear and eventual admiration that Fowler feels towards Ausable, increasing engagement and suspense.",
  },
  {
    q: "From a CBSE value-based perspective, which statement BEST sums up the core message of 'The Midnight Visitor'?",
    opts: [
      "Physical appearance is the key to success",
      "Weapons are the only way to control others",
      "Intelligence, presence of mind and self-confidence can help overcome even dangerous situations",
      "One should never trust anyone under any circumstance",
    ],
    ans: 2,
    exp: "Ausable’s victory over Max shows that quick thinking and confidence can disarm even an armed opponent, making brain power the real hero of the story.",
  },
];

const questionOfTrustPYQs = [
  {
    question: "Who was Horace Danby? What kind of life did he appear to lead?",
    answer: "Horace Danby was about fifty years old, unmarried, and the owner of a small but successful business of making locks. He lived quietly with a housekeeper and was generally considered a good, honest citizen, suffering only from hay fever in summer. Outwardly he led a respectable, comfortable life, and no one suspected that he was secretly a professional burglar.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "What was Horace Danby’s hobby, and how did he manage to fulfil it?",
    answer: "Horace Danby loved collecting rare and expensive books, which he bought through an agent. To finance this costly hobby, he committed one carefully planned burglary every year, stealing enough each time to pay for his books for the next twelve months. In this way he combined a respectable business life with a secret life as a thief.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Horace plan the robbery at Shotover Grange?",
    answer: "Horace planned the robbery meticulously. He had been studying Shotover Grange for two weeks, knew the routine of the servants, and had seen the housekeeper hang the key of the kitchen door on a hook. He chose a day when the family had gone to London and only two servants remained, who he knew would go to the movies. He knew where the safe was, what it contained, and that the burglar alarm was kept in the passage, not connected to the drawing-room safe.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Why was Horace Danby suffering from hay fever on the day of the robbery? How did this cause him trouble later?",
    answer: "On the day of the robbery, it was early summer and there were flowers in the garden, to whose pollen Horace was allergic, so his hay fever made him sneeze repeatedly. He opened a window while inside to get fresh air, and his sneezing drew attention in the house earlier. Later, his hay fever attacks and the fact that he removed his gloves to stroke the dog and crack open the safe meant he left fingerprints, which the police later used to identify and arrest him.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe Horace’s encounter with the young lady at Shotover Grange. How did she introduce herself?",
    answer: "While Horace was about to open the safe, he heard a voice and saw a young, pretty woman in red standing in the doorway, calmly watching him. She did not scream or call for help. Instead, she pretended to be the owner’s wife, saying she had just come back to take the jewels because she needed them for a party. In a confident and friendly manner, she claimed the police would arrest him if she called them but offered to let him go if he helped her open the safe.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did Horace believe the lady in red and agree to break open the safe for her?",
    answer: "Horace believed the lady because she looked and acted like a rich, confident mistress of the house and spoke naturally about her family and the servants. He was frightened of being caught and sent back to prison, so when she promised not to call the police if he opened the safe for her, he trusted her offer. Her calm behaviour and convincing story overcame his doubts, and he agreed to break open the safe for her even though it meant leaving his fingerprints.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "How did the lady outsmart Horace Danby and become the real culprit of the story?",
    answer: "The lady cleverly pretended to be the owner’s wife and used Horace’s fear of the police to force him to open the safe and hand her the jewels. She claimed she had forgotten the combination and needed the jewels for a party. After he broke the safe and gave her the jewellery, she allowed him to escape quietly. Later, when the real owners returned and reported the theft, the police found only Horace’s fingerprints, and the real lady of the house denied any knowledge of the incident. Thus the unknown woman used Horace as a tool to steal and left him to take the blame.",
    year: 2022, marks: 5, difficulty: "hard",
  },
  {
    question: "Why did the police suspect and arrest Horace Danby, even though he tried to be careful?",
    answer: "Although Horace usually wore gloves and took care not to leave evidence, this time he had taken off his gloves to open the safe quickly for the lady. He also had touched things in the room and had previously been in prison fifteen years earlier, so his fingerprints were on police record. When the theft was reported and the police checked the house, they found his fingerprints on the safe and other surfaces. The real lady denied seeing any strange woman, so suspicion fell entirely on Horace, and he was arrested.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the story justify the title ‘A Question of Trust’?",
    answer: "The whole story revolves around misplaced trust. Horace, a thief who believes he can be trusted to steal only once a year for books, trusts a stranger in the house simply because she appears respectable and promises not to call the police. He believes her story and breaks open the safe for her. In the end, it is revealed that she is the real thief and that Horace’s trust in her ruins his life. The title highlights how trust is questioned and misused in the story.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "What irony do you find in the ending of the story ‘A Question of Trust’?",
    answer: "The irony lies in the fact that Horace, an expert burglar who prides himself on careful planning and neat work, is himself cheated and trapped by another thief. He always steals only once a year and thinks of himself as a 'good' thief who harms no one. However, he is fooled by a woman who pretends to be the owner and makes him do the burglary for her. In the end, the supposedly clever thief ends up in prison for a theft he did not personally benefit from, while the real thief goes free.",
    year: 2018, marks: 5, difficulty: "hard",
  },
  {
    question: "What does Horace Danby do after he is arrested? How does he try to satisfy his love for books then?",
    answer: "After his arrest, Horace is sent back to prison to serve another sentence. In jail, he can no longer steal or buy rare books. Ironically, he now cleans the prison library and has to satisfy his love for books by reading the volumes that are available there, instead of owning his own expensive collection.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"Everyone thought that Horace Danby was a good, honest citizen.\" \n\nHow does the author show that this general opinion about Horace was only partly true?",
    answer: "The author begins by describing Horace as a respectable man with a good business, a housekeeper and a quiet life, which creates the impression of honesty. However, in the very next lines we learn that though he is 'good and respectable', he is 'not completely honest' because he has already served a prison sentence and secretly commits one well-planned burglary every year to buy rare books. Thus the opening line is partly true but hides his other life as a thief.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"She promised to let him go if he would open the safe for her.\" \n\nWhy is this promise central to Horace’s downfall?",
    answer: "Horace is terrified of going back to prison, so the lady’s promise not to call the police if he opens the safe becomes the turning point of the story. Believing her, he gives up his usual precautions, takes off his gloves and breaks open the safe, leaving clear fingerprints. When she disappears with the jewels and the real owner later denies seeing her, Horace has no proof of her existence. The promise he trusted becomes the very reason he is arrested and punished.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): The woman in red is the real culprit in the story.\nREASON (R): She tricks Horace into opening the safe and then disappears with the jewels, leaving him to face the consequences.\n\nBased on the story, analyse the A–R pair and give the correct analysis.",
    answer: "Both Assertion (A) and Reason (R) are true, and the Reason correctly explains the Assertion. The woman is not a member of the family but a clever thief who enters before Horace, pretends to be the owner’s wife, and uses his skills to get the jewels. When the theft is discovered, she is safe, while Horace is caught because of his fingerprints.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What theme about crime and punishment does Victor Canning explore through Horace Danby’s story?",
    answer: "The story explores the idea that crime, however carefully planned, can have unexpected consequences, and that those who deceive others may themselves be deceived. Horace justifies his thefts as harmless because he steals only for books and hurts no one directly. But his dishonest life leads him into trusting another criminal and being punished for a robbery he did not even profit from. The story suggests that dishonesty is risky and unstable, and that once a person chooses a criminal path, trust and safety are easily lost.",
    year: 2024, marks: 5, difficulty: "hard",
  },
];

const questionOfTrustEasy = [
  {
    q: "Who is the author of the story 'A Question of Trust'?",
    opts: ["Robert Arthur", "Victor Canning", "Ruskin Bond", "James Herriot"],
    ans: 1,
    exp: "‘A Question of Trust’ is written by Victor Canning. Robert Arthur wrote ‘The Midnight Visitor’, Ruskin Bond wrote ‘The Thief’s Story’ and James Herriot wrote ‘A Triumph of Surgery’.",
  },
  {
    q: "What is Horace Danby’s age in the story?",
    opts: ["About thirty", "About forty", "About fifty", "About sixty"],
    ans: 2,
    exp: "Horace Danby is described as a fifty-year-old man. He is neither very young nor extremely old.",
  },
  {
    q: "What is Horace Danby’s legal profession?",
    opts: ["Lawyer", "Lock-maker", "Bank manager", "Shopkeeper"],
    ans: 1,
    exp: "Horace runs a successful business of making locks. This respectable job hides his secret life as a burglar.",
  },
  {
    q: "What does Horace Danby like to collect?",
    opts: ["Stamps", "Coins", "Rare and expensive books", "Paintings"],
    ans: 2,
    exp: "Horace has a passion for collecting rare and expensive books, which he buys through an agent. This hobby motivates his annual thefts.",
  },
  {
    q: "How often does Horace commit theft?",
    opts: ["Every week", "Every month", "Once a year", "Every day"],
    ans: 2,
    exp: "Horace plans and commits one burglary every year so that he can buy enough books to last twelve months.",
  },
  {
    q: "What is the name of the house Horace plans to rob?",
    opts: ["Greenwood Grange", "Riverdale Villa", "Shotover Grange", "Maple House"],
    ans: 2,
    exp: "The large country house Horace targets is called Shotover Grange. The other names are not mentioned in the chapter.",
  },
  {
    q: "Who lives with Horace Danby at his own house?",
    opts: ["His wife", "His son", "His housekeeper", "No one; he lives alone"],
    ans: 2,
    exp: "Horace lives with a housekeeper who worries about his health. He is not married and has no children.",
  },
  {
    q: "What illness does Horace Danby suffer from in summer?",
    opts: ["Asthma", "Hay fever", "Fever", "Back pain"],
    ans: 1,
    exp: "Horace suffers from hay fever, an allergy that makes him sneeze, especially near flowers and dust. This becomes a problem during the burglary.",
  },
  {
    q: "How did Horace know when the servants of Shotover Grange would be away?",
    opts: [
      "He read it in a newspaper",
      "He overheard them talking about going to the movies",
      "He received a letter from the owner",
      "He never knew; it was a guess",
    ],
    ans: 1,
    exp: "Horace had been observing the house and learned that the two servants went to the movies on that afternoon. This helped him choose the time for the robbery.",
  },
  {
    q: "Where did the housekeeper usually hang the key of the kitchen door?",
    opts: ["On a hook outside the back door", "In a drawer", "Under the mat", "On the main gate"],
    ans: 0,
    exp: "Horace had seen the housekeeper hang the key on a hook outside, making it easy for him to enter from the garden.",
  },
  {
    q: "Where was the safe located in Shotover Grange?",
    opts: ["In the study", "In the kitchen", "In the drawing-room", "In the bedroom"],
    ans: 2,
    exp: "The safe which contained the jewels was kept in the drawing-room behind a picture. Horace had studied this detail beforehand.",
  },
  {
    q: "How did Horace enter Shotover Grange?",
    opts: [
      "Through the front door with a duplicate key",
      "Through a broken window in the drawing-room",
      "Over the garden wall and through the kitchen door",
      "Through an underground tunnel",
    ],
    ans: 2,
    exp: "He climbed over the garden wall, moved carefully among the shrubs, took the key from the hook and entered quietly through the kitchen door.",
  },
  {
    q: "Who did Horace meet inside the house, apart from the dog Sherry?",
    opts: ["The owner’s son", "The real owner", "A young woman dressed in red", "A policeman"],
    ans: 2,
    exp: "Inside the house, Horace is surprised by a young woman in red who claims to be the owner’s wife. She is actually a clever thief.",
  },
  {
    q: "What did the lady in red ask Horace to do for her?",
    opts: [
      "Repair a lock",
      "Call the police",
      "Put the jewels back in the safe",
      "Break open the safe and hand her the jewels",
    ],
    ans: 3,
    exp: "She pretends she has forgotten the safe’s combination and asks Horace to break it open and give her the jewels so that she can go to a party.",
  },
  {
    q: "What happened to Horace at the end of the story?",
    opts: [
      "He escaped safely with the jewels",
      "He shared the jewels with the lady",
      "He was arrested and sent to prison again",
      "He left the city and changed his name",
    ],
    ans: 2,
    exp: "Later, the police arrest Horace after finding his fingerprints at the scene. The real lady of the house denies his story, and he is sent back to prison.",
  },
];

const questionOfTrustMedium = [
  {
    q: "Why did Horace decide to wear gloves during the burglary?",
    opts: [
      "Because it was very cold",
      "Because he did not want to leave fingerprints anywhere in the house",
      "Because the gloves helped him climb",
      "Because he had hurt his hands",
    ],
    ans: 1,
    exp: "Horace is a careful thief who does not want to be traced by the police. Wearing gloves prevents his fingerprints from being left on surfaces in the house.",
  },
  {
    q: "What was Horace’s main reason for robbing only once a year?",
    opts: [
      "He was very lazy",
      "He wanted to avoid suspicion and only needed enough money to buy books for a year",
      "He was afraid of the police",
      "He did not know how to plan more robberies",
    ],
    ans: 1,
    exp: "Horace steals only once a year to minimise risk and to get just enough money to buy his rare books. This careful planning suits his desire to remain respectable the rest of the time.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"His heart was full of wild joy at the thought of the books he would buy with the money.\" \n\nWhat does this line reveal about Horace’s character?",
    opts: [
      "He is greedy for money",
      "He loves rare books more than money itself",
      "He wants to become a rich businessman",
      "He plans to give the money to charity",
    ],
    ans: 1,
    exp: "Horace’s joy is not about wealth; it is about the books he will own. The line shows that his greed is focused on his hobby of collecting rare books, not on riches in general.",
  },
  {
    q: "Why was Horace relieved to find that the safe at Shotover Grange had no burglar alarm connected to it?",
    opts: [
      "Because he did not know how to disable alarms",
      "Because he wanted to avoid hurting anyone",
      "Because it meant opening the safe would be easier and less risky",
      "Because he disliked noise",
    ],
    ans: 2,
    exp: "Horace had planned around the alarm system in the passage. When he sees the drawing-room safe is not connected to it, he knows he can open it without setting off any alarm, making his task simpler.",
  },
  {
    q: "Why did Horace remove his gloves while opening the safe for the lady?",
    opts: [
      "Because the gloves were torn",
      "Because he needed a better grip and speed after she threatened to call the police",
      "Because the lady asked him to",
      "Because his hands were sweating too much",
    ],
    ans: 1,
    exp: "Under pressure from the lady and the fear of being caught, Horace works in a hurry and removes his gloves to open the safe more quickly, forgetting his usual precaution about fingerprints.",
  },
  {
    q: "What made the lady in red seem trustworthy to Horace at first?",
    opts: [
      "Her rough clothes and nervous behaviour",
      "Her confident manner, expensive dress and calm claim to be the owner’s wife",
      "Her identity card",
      "Her servant’s testimony",
    ],
    ans: 1,
    exp: "The woman appears calm, well-dressed and speaks naturally as if she belongs to the house. This outward respectability convinces Horace that she is telling the truth.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"He had served his first and only sentence in a prison fifteen years ago.\" \n\nWhat is the effect of this detail on the reader’s view of Horace?",
    opts: [
      "It proves that Horace is innocent",
      "It shows he has been a thief for a long time and has experience with crime",
      "It shows he is too weak to steal now",
      "It shows he is actually a policeman",
    ],
    ans: 1,
    exp: "Learning that Horace has already been jailed once reveals his long criminal history and experience, making his respectable image more ironic and his fear of prison more understandable.",
  },
  {
    q: "Why is the dog Sherry important in the story?",
    opts: [
      "Sherry attacks Horace and injures him",
      "Sherry barks loudly and brings the police immediately",
      "Sherry is friendly to Horace, showing that Horace has studied the house and knows how to handle such small risks",
      "Sherry is the lady’s pet and reveals the truth",
    ],
    ans: 2,
    exp: "Horace knows Sherry’s name and uses it kindly, so the dog does not bark. This shows his careful research and adds realism to his burglary plan.",
  },
  {
    q: "Why did the lady in red ultimately choose to report the theft to the police?",
    opts: [
      "Because she wanted to keep her promise to Horace",
      "Because she was actually the real owner",
      "Because she herself was a thief and did not want anyone suspecting her, so letting Horace be caught suited her",
      "Because she felt pity for Horace",
    ],
    ans: 2,
    exp: "The lady was also a thief. By letting Horace open the safe and then disappearing, she ensured that the police, finding only his fingerprints, would suspect him and not her.",
  },
  {
    q: "How is Horace’s idea of himself as a 'good and honest citizen' shown to be flawed in the story?",
    opts: [
      "He pays his taxes regularly",
      "He lies to his housekeeper about his allergies",
      "He justifies his yearly thefts as harmless, but they eventually lead to his ruin",
      "He never visits the library",
    ],
    ans: 2,
    exp: "Horace tries to separate his thefts from his daily life and thinks they hurt no one. The story shows this self-image is false when his dishonest choices cause his arrest and loss of freedom.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"She promised to let him go, and Horace believed her. He was very frightened of going to prison.\" \n\nWhat does this reveal about Horace’s main weakness?",
    opts: [
      "He is physically weak",
      "He is overconfident about his lock-making",
      "He is easily fooled when he is afraid, especially of prison",
      "He is tired of reading books",
    ],
    ans: 2,
    exp: "Horace’s fear of returning to prison makes him accept the lady’s story without questioning it. This emotional weakness allows her to manipulate him easily.",
  },
  {
    q: "Which of the following best states the central irony of the story?",
    opts: [
      "A police officer becomes a thief",
      "A thief is cheated by another thief and punished for a theft he did not benefit from",
      "Horace becomes rich after going to prison",
      "The lady in red is actually a detective",
    ],
    ans: 1,
    exp: "The central irony is that Horace, who prides himself on clever, neat thefts, becomes the victim of another thief’s trick and goes to prison without enjoying the stolen jewels.",
  },
  {
    q: "How does the ending of the story affect our sympathy for Horace Danby?",
    opts: [
      "We feel he fully deserved his punishment and feel no sympathy",
      "We feel he is only a victim and not responsible at all",
      "We feel mixed sympathy: he is a thief, yet we pity him for being outwitted and losing his dream of books",
      "We only blame the lady",
    ],
    ans: 2,
    exp: "Horace has chosen crime, so he shares blame. Yet he is gentle, book-loving and is cleverly used by another thief, so the reader often feels both pity and a sense of just punishment.",
  },
  {
    q: "Which of the following best describes the tone of the story?",
    opts: [
      "Purely tragic and serious",
      "Dry, humorous and ironic, with a lesson",
      "Angry and moralising",
      "Romantic and dreamy",
    ],
    ans: 1,
    exp: "The story uses irony and light humour—like Horace’s pride and his hay fever—to deliver a moral about trust and dishonesty, rather than being heavily tragic or romantic.",
  },
  {
    q: "How does 'A Question of Trust' highlight the theme that 'crime does not pay'?",
    opts: [
      "By showing Horace becoming rich through theft",
      "By showing Horace’s careful stealing leading to imprisonment and loss, not happiness",
      "By showing the lady giving the jewels to Horace",
      "By showing police always catching thieves immediately",
    ],
    ans: 1,
    exp: "Horace believes his crime is safe and limited, but he is deceived and caught. The story shows that his criminal life ultimately brings punishment, not lasting gain.",
  },
];

const questionOfTrustHard = [
  {
    q: "ASSERTION (A): Horace Danby considers himself different from ordinary thieves.\nREASON (R): He steals only once a year and uses the money to buy rare books, believing he harms no one.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Horace does see himself as a 'special' thief who robs only occasionally for books, not greed. This belief is exactly because he commits one carefully chosen burglary a year.",
  },
  {
    q: "ASSERTION (A): The flowers in the garden are partly responsible for Horace’s failure.\nREASON (R): His hay fever sneezing leads him to remove his mask and gloves and to open a window, increasing the chances of leaving evidence.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Horace’s allergy to flowers causes sneezing, making him uncomfortable and careless. He opens a window and removes gloves at critical moments, allowing evidence like fingerprints to be left behind.",
  },
  {
    q: "CASE-BASED: A counsellor is talking to teens about 'white lies' and excuses for small crimes. Which message from 'A Question of Trust' would be MOST relevant?",
    opts: [
      "Small, 'harmless' crimes stay small forever",
      "Once you cross the line into dishonesty, you cannot control how far consequences will go",
      "Only big crimes are dangerous",
      "If you are polite, crime is acceptable",
    ],
    ans: 1,
    exp: "Horace calls his thefts 'harmless' and limited, but one such crime leads to him being fooled and imprisoned. The story shows that even 'small' dishonesty can spiral into serious consequences.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"But he did not trust people very much.\" \n\nIn light of the story, what is ironic about this statement?",
    opts: [
      "Horace never meets anyone new",
      "Horace ends up trusting a stranger more than he should, while being suspicious of ordinary people",
      "Horace trusts only his housekeeper",
      "Horace trusts the police completely",
    ],
    ans: 1,
    exp: "Although Horace claims he doesn’t trust people, he blindly trusts a stranger who appears rich and respectable. This misplaced trust causes his downfall, making the statement ironic.",
  },
  {
    q: "ASSERTION (A): The lady in red is portrayed as more intelligent than Horace Danby.\nREASON (R): She reads Horace’s fear of prison and uses it to manipulate him into doing the dangerous part of the work for her.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "She immediately sees Horace’s weakness—his fear of another jail term—and uses it to make him open the safe. Her ability to control him without effort shows her superior cleverness in this situation.",
  },
  {
    q: "From a thematic perspective, what does Horace’s final job in prison (cleaning the library) symbolise?",
    opts: [
      "His hatred of books now",
      "His permanent separation from knowledge",
      "A bitter irony: he gets access to books through honest work after losing his freedom for wanting them dishonestly",
      "His complete forgetfulness of his old hobbies",
    ],
    ans: 2,
    exp: "Cleaning the prison library means Horace now reaches books through duty, not theft. It is ironic that his passion for books, which led him into crime, is now met in a limited, controlled way behind bars.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"The safe was not hard to open. After all, he had lived with locks and safes all his life.\" \n\nWhat deeper point about Horace’s skills and choices does this line suggest?",
    opts: [
      "He is not good at his legal job",
      "His talent with locks could have earned him an honest living without theft",
      "He hates making locks",
      "He prefers breaking safes to making locks",
    ],
    ans: 1,
    exp: "Horace has genuine skill in lock-making, enough to open safes easily. The tragedy is that he uses this talent partly for crime instead of relying entirely on honest work.",
  },
  {
    q: "CASE-BASED: A student argues that Horace is only a victim and not responsible at all. Which response is MOST accurate according to the story?",
    opts: [
      "Horace is completely innocent and deserves sympathy only",
      "Horace shares responsibility because he chooses to be a thief, making it easier for someone else to cheat him",
      "The lady is completely innocent and Horace is fully guilty",
      "No one is at fault; it is only bad luck",
    ],
    ans: 1,
    exp: "Although Horace is tricked, his choice to break into a house and open the safe without permission puts him in a vulnerable, illegal position, making him partly responsible for what happens.",
  },
  {
    q: "ASSERTION (A): The title 'A Question of Trust' mainly refers to whether the police can trust Horace.\nREASON (R): Horace has a clean record and has never been to prison before.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The title refers more broadly to how trust is given and misused—Horace trusting the lady, society trusting Horace as 'honest', and the lady betraying that trust. Also, Horace has already been to prison once before, so the Reason is false.",
  },
  {
    q: "From a feminist or gender angle, what does the lady’s role in the story suggest?",
    opts: [
      "Women are always honest and helpless",
      "Women cannot be clever thieves",
      "A woman can be as sharp, manipulative and daring as any male thief, challenging stereotypes of female weakness",
      "Only men can plan robberies",
    ],
    ans: 2,
    exp: "The lady is confident, intelligent and bold enough to outwit an experienced male burglar. Her role shows that criminal cleverness is not limited by gender, challenging traditional stereotypes.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"He felt like a little boy again, standing in front of his headmaster.\" \n\nWhat does this comparison tell us about Horace’s feeling when the lady confronts him?",
    opts: [
      "He is angry and rebellious",
      "He is calm and in control",
      "He feels scared, ashamed and powerless, just as a child might feel before a strict authority",
      "He feels happy to see her",
    ],
    ans: 2,
    exp: "The headmaster comparison shows Horace’s sudden loss of confidence. He feels guilty and fearful, ready to obey, which makes him easy for the lady to control.",
  },
  {
    q: "ASSERTION (A): The story supports the idea that appearances can be deceptive.\nREASON (R): Both Horace and the lady appear respectable but are secretly thieves.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Horace looks like an honest businessman, and the lady looks like a rich owner’s wife. In reality, both are thieves, making the Reason a direct example of the idea in the Assertion.",
  },
  {
    q: "CASE-BASED: If Horace had refused to open the safe for the lady and simply escaped, which theme would be weakened the most?",
    opts: [
      "Trust can be misused",
      "Crime can lead to unexpected punishment",
      "Appearances are deceptive",
      "Books are valuable",
    ],
    ans: 0,
    exp: "The central twist comes from Horace trusting the lady and being betrayed. If he had not trusted her, the strong 'question of trust' focus would be reduced, although other themes would remain.",
  },
  {
    q: "From a CBSE value-based perspective, which lesson is MOST clearly communicated by Horace’s story?",
    opts: [
      "One should be cleverer while committing crimes",
      "Even seemingly harmless dishonesty can destroy one’s peace and freedom",
      "Books should never be read",
      "It is always better to believe strangers than friends",
    ],
    ans: 1,
    exp: "Horace’s limited, self-justified crimes ultimately ruin his life when he is deceived and imprisoned. The story warns that dishonesty, however small, is unsafe and can have serious consequences.",
  },
];

const footprintsFeetPYQs = [
  {
    question: "Who was Griffin? How did he make himself invisible?",
    answer: "Griffin was a brilliant but lawless scientist who discovered a way to make the human body invisible. He experimented on himself with a rare drug that changed the refractive index of his body so that it neither absorbed nor reflected light. As a result, his body became as transparent as glass and he turned invisible to the normal eye.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "Why were the two boys in London surprised and fascinated at the beginning of the story?",
    answer: "The two boys were surprised and fascinated because they saw fresh muddy footprints appearing on the steps of a house and then along the street, but there were no feet or person making those prints. The footprints without any visible feet seemed mysterious and ghostly to them, so they followed them with great curiosity until the marks grew fainter and disappeared.",
    year: 2023, marks: 2, difficulty: "easy",
  },
  {
    question: "Why was Griffin wandering the streets of London without clothes or money?",
    answer: "Although Griffin was a brilliant scientist, he was lawless and revengeful. His landlord disliked him and tried to eject him from the house. In anger, Griffin set the house on fire. To escape unseen, he removed all his clothes and became completely invisible. After that, he had no home, money or proper clothes. Being both invisible and homeless, he wandered the streets of London, shivering in the bitter winter.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Griffin first get clothes and some comfort in the London store? What went wrong the next morning?",
    answer: "To escape the cold, Griffin slipped into a big London department store after closing time and took advantage of the goods inside. He wore warm clothes, shoes, an overcoat and a wide-brimmed hat, ate a big meal and slept on a pile of quilts. However, in the morning he overslept and when the shop assistants arrived, they saw him because the clothes had made him visible. He had to fight and then quickly take off all the clothes again to become invisible and escape.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe Griffin’s experience in the theatrical costume shop in Drury Lane. How did he disguise himself?",
    answer: "Griffin went to a theatrical costume shop in Drury Lane because it offered a variety of clothes and masks which could help him appear normal. After knocking the shopkeeper unconscious, he helped himself to bandages for his face, dark glasses, a false nose, a big bushy whisker, and a large hat. He also put on trousers, a coat and shoes. This disguise covered most of his invisible body, making him look like a strange but visible man rather than a ghost.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did Griffin decide to leave London and go to the village of Iping?",
    answer: "London had become dangerous and uncomfortable for Griffin. Although his invisibility helped him escape, he could not roam the streets naked in winter without suffering, and his lawless acts had attracted attention. After robbing the costume shop and obtaining money, he decided to leave the crowded city and go to a quiet village inn at Iping, hoping to live there peacefully and continue his experiments without being noticed too much.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Mrs Hall react to Griffin’s arrival at the Coach and Horses inn in Iping?",
    answer: "Mrs Hall, the landlady, was initially glad to get a winter guest, as it meant good business. She found Griffin’s appearance unusual and eccentric, since his face was completely covered with bandages, his eyes hidden behind dark glasses, and his body wrapped in heavy clothes. When she tried to be friendly and ask questions, he replied curtly that he had come for solitude and did not want to be disturbed. Still, she put him in a room and tried to overlook his odd behaviour because he paid in advance.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "What curious incident took place in the clergyman’s study? Why were the clergyman and his wife shocked?",
    answer: "Very early one morning, the clergyman and his wife were awakened by sounds in their study – the creaking of a chair and the clink of coins being taken from the desk. Believing a burglar was there, they rushed into the room. To their shock, they found the desk drawer open and money gone, but there was no person in the room. The theft without any visible thief left them deeply puzzled and frightened.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe the strange events that took place in Griffin’s room when Mrs Hall entered it with her husband.",
    answer: "One morning Mrs Hall noticed that Griffin’s room was open and empty. She and her husband entered to check. Suddenly, they saw the bedclothes leaping on their own, the chair spinning and then charging at Mrs Hall, pushing her out and slamming the door behind them. It seemed as if the furniture was haunted by a ghost. In reality, the invisible Griffin was moving the objects, but to the Halls it looked like supernatural activity.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did the people of Iping begin to suspect and dislike Griffin?",
    answer: "The people of Iping found Griffin’s behaviour secretive and rude. He never mixed with others, kept his room locked, and did mysterious experiments. The unexplained theft from the clergyman’s study and the strange happenings in Griffin’s room made them suspicious. They believed that the strange stranger might be responsible for the thefts or might be involved in some dark magic. As a result, fear and gossip grew, and their suspicion turned into dislike.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Griffin finally reveal his invisibility to the people in the inn?",
    answer: "When Mrs Hall confronted Griffin about the strange happenings and accused him of being responsible for the disturbances, Griffin became furious. In anger, he began to remove his bandages, false nose, whiskers and spectacles in front of everyone. As the coverings came off, his face disappeared from sight. Then he took off his clothes one by one and became completely invisible, leaving the onlookers terrified and convinced that they were dealing with a supernatural being.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"Griffin was wandering in the streets of London without clothes, money or friends.\" \n\nWhat do Griffin’s circumstances at this point reveal about his character and his use of science?",
    answer: "The extract shows that although Griffin has created a brilliant scientific discovery, he has used it without responsibility. Instead of improving his life, his lawless actions – burning his landlord’s house and stealing – have left him homeless and friendless. His condition reveals that he is reckless and selfish, using science for revenge and crime rather than for constructive purposes, and suffering the consequences of his own misuse.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"Mr and Mrs Hall were surprised to see the door wide open. Usually it was shut and locked and Griffin was in or out.\" \n\nWhat does this detail suggest about Griffin’s behaviour and the villagers’ perception of him?",
    answer: "The open door is unusual because Griffin normally keeps his room locked, shutting himself in or out and not allowing anyone to come in. This shows his secretive, antisocial behaviour. For Mr and Mrs Hall, the open door is suspicious and gives them a rare chance to look inside. It reinforces the villagers’ perception that there is something odd and possibly dangerous about the stranger and his secret experiments.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): The story 'Footprints Without Feet' warns us about the misuse of scientific discoveries.\nREASON (R): Griffin uses his discovery of invisibility mainly to take revenge, steal and frighten people, instead of helping humanity.\n\nBased on the story, analyse the A–R pair and give the correct answer.",
    answer: "Both Assertion (A) and Reason (R) are true, and the Reason correctly explains the Assertion. The story shows that Griffin’s wonderful scientific discovery becomes a source of fear and trouble because he chooses to misuse it for selfish, criminal purposes. This misuse and its consequences give the story a clear warning about science without ethics.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Griffin is described as 'a brilliant scientist but a lawless person'. Do you agree? Give reasons with reference to the text.",
    answer: "Yes. Griffin is brilliantly successful in making the human body invisible by altering its refractive index, something no ordinary scientist can do. However, morally he is lawless and irresponsible. He burns his landlord’s house in revenge, breaks into a London store and a costume shop, steals money and clothes, and later robs the clergyman’s house at Iping. He also threatens and attacks people when confronted. His behaviour shows that his intellect is not guided by conscience or respect for the law.",
    year: 2024, marks: 5, difficulty: "hard",
  },
  {
    question: "What message does H.G. Wells convey through the character of Griffin and the incidents in 'Footprints Without Feet'?",
    answer: "Through Griffin, Wells conveys that scientific power without moral responsibility can be dangerous both for the individual and for society. Griffin’s invisibility could have been used for research or good purposes, but he chooses revenge, theft and violence. His antisocial nature isolates him and turns everyone against him. The story suggests that intelligence alone is not enough; ethics, empathy and respect for others are necessary to prevent science from becoming a tool of harm.",
    year: 2021, marks: 5, difficulty: "hard",
  },
];

const footprintsFeetEasy = [
  {
    q: "Who is the author of the story 'Footprints Without Feet'?",
    opts: ["Victor Canning", "Ruskin Bond", "H.G. Wells", "Robert Arthur"],
    ans: 2,
    exp: "‘Footprints Without Feet’ is written by H.G. Wells, a famous writer of science fiction. The other authors wrote different chapters in the same book.",
  },
  {
    q: "Who is the main character in 'Footprints Without Feet'?",
    opts: ["Mrs Hall", "Griffin", "Mr Hall", "The clergyman"],
    ans: 1,
    exp: "Griffin, an invisible scientist, is the central figure. Other characters like Mrs Hall and the clergyman appear around his actions.",
  },
  {
    q: "What special discovery did Griffin make?",
    opts: [
      "A drug that cured all diseases",
      "A machine that controlled weather",
      "A formula that made the human body invisible",
      "A medicine that made people stronger",
    ],
    ans: 2,
    exp: "Griffin discovered how to make the body invisible by changing its refractive index so that light passed through it.",
  },
  {
    q: "Why were the two boys in London surprised at the beginning of the story?",
    opts: [
      "They saw a flying car",
      "They saw footprints appearing without any visible feet",
      "They saw a ghost in white clothes",
      "They saw money falling from the sky",
    ],
    ans: 1,
    exp: "They saw fresh muddy footprints on the steps but no person making them, which seemed mysterious and exciting.",
  },
  {
    q: "Why did Griffin set fire to his landlord’s house?",
    opts: [
      "To test his experiment",
      "To scare his neighbours",
      "Because the landlord tried to eject him and he wanted revenge",
      "Because he needed heat in winter",
    ],
    ans: 2,
    exp: "Griffin was lawless and vengeful; when his landlord tried to evict him, he burned the house out of revenge.",
  },
  {
    q: "Where did Griffin first go to keep himself warm in the winter night?",
    opts: ["A cinema hall", "A big London store", "A police station", "A church"],
    ans: 1,
    exp: "He slipped into a large London department store after closing time to escape the cold and to find clothes and food.",
  },
  {
    q: "What happened when Griffin wore clothes from the London store?",
    opts: [
      "He remained invisible",
      "He became visible and was seen by the shop assistants",
      "He disappeared completely",
      "He became very strong",
    ],
    ans: 1,
    exp: "The clothes covered his invisible body and made him look like a normal person, so the assistants saw him in the morning.",
  },
  {
    q: "Why did Griffin go to the theatrical costume shop in Drury Lane?",
    opts: [
      "To buy rare books",
      "To get food",
      "To get clothes and disguise for his invisible body",
      "To meet Mrs Hall",
    ],
    ans: 2,
    exp: "He needed bandages, false nose, whiskers and clothes to cover his invisibility and look like an ordinary person.",
  },
  {
    q: "Where did Griffin finally decide to stay after leaving London?",
    opts: ["In a forest", "At a village inn in Iping", "In his landlord’s house", "In a hospital"],
    ans: 1,
    exp: "Griffin travelled to the village of Iping and took two rooms at a local inn, the Coach and Horses.",
  },
  {
    q: "Who was Mrs Hall?",
    opts: ["The shopkeeper in Drury Lane", "The village doctor", "The clergyman’s wife", "The landlady of the inn at Iping"],
    ans: 3,
    exp: "Mrs Hall was the landlady of the Coach and Horses inn in Iping, where Griffin stayed.",
  },
  {
    q: "Why did Mrs Hall find Griffin strange?",
    opts: [
      "He spoke only French",
      "His face was covered with bandages and he did not want to talk",
      "He was very talkative and noisy",
      "He had no luggage",
    ],
    ans: 1,
    exp: "His face was wrapped in bandages, he wore dark glasses and a big hat, and he rudely refused friendly conversation.",
  },
  {
    q: "What was stolen from the clergyman’s study?",
    opts: ["Books", "Jewellery", "Money from the desk", "Clothes"],
    ans: 2,
    exp: "The clergyman heard coins being taken, and later he found that money had been stolen from his desk drawer.",
  },
  {
    q: "What did Mr and Mrs Hall see happening in Griffin’s room that seemed like 'witchcraft'?",
    opts: [
      "The windows were breaking on their own",
      "The furniture and clothes moved and the chair pushed them out though no one was visible",
      "Fire started by itself",
      "Water flowed against gravity",
    ],
    ans: 1,
    exp: "The bedclothes, chair and other things moved as if by themselves because the invisible Griffin was handling them, so it looked like magic.",
  },
  {
    q: "How did Griffin show that he was truly invisible when the people tried to catch him?",
    opts: [
      "He turned into a ghost",
      "He flew away",
      "He removed all his clothes and bandages until no one could see him",
      "He hid behind a tree",
    ],
    ans: 2,
    exp: "By taking off his bandages, nose, whiskers and clothes, he made his body completely invisible, leaving the people staring at empty air.",
  },
  {
    q: "Which of the following best describes Griffin’s nature?",
    opts: [
      "Kind and helpful",
      "Honest and hardworking",
      "Brilliant but lawless and selfish",
      "Shy and gentle",
    ],
    ans: 2,
    exp: "The story clearly shows that Griffin is a great scientist but uses his discovery for revenge, robbery and frightening people, proving he is lawless and selfish.",
  },
];

const footprintsFeetMedium = [
  {
    q: "Why did Griffin have to take off all his clothes again after enjoying himself in the London store?",
    opts: [
      "Because he did not like the clothes",
      "Because the clothes caught fire",
      "Because the shop assistants saw him when the shop opened and he had to become invisible to escape",
      "Because he wanted to wash the clothes",
    ],
    ans: 2,
    exp: "In the morning, the assistants came in and saw a dressed man, so he had to remove all the clothes quickly to vanish and run away unseen.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"He became a homeless wanderer, without clothes, without money and quite invisible.\" \n\nWhich of the following best explains Griffin’s condition here?",
    opts: [
      "He is happy and free",
      "He is powerful and respected by all",
      "He is vulnerable and desperate despite his scientific power",
      "He is living a comfortable life",
    ],
    ans: 2,
    exp: "Although invisibility looks powerful, Griffin is alone, cold and hungry. His power has not given him security or respect; it has left him helpless on the streets.",
  },
  {
    q: "Why did Griffin attack the shopkeeper in the theatrical costume shop?",
    opts: [
      "Because the shopkeeper insulted him",
      "Because he wanted to test his strength",
      "Because the shopkeeper woke up and Griffin had to knock him down to escape with clothes and money",
      "Because he wanted revenge",
    ],
    ans: 2,
    exp: "Griffin had stayed in the shop and when the shopkeeper discovered him, he attacked from behind to overcome him and then robbed the shop.",
  },
  {
    q: "Why did Mrs Hall tolerate Griffin’s strange behaviour for some time?",
    opts: [
      "She was afraid of him",
      "She was very kind-hearted",
      "He paid her in advance, and winter was a bad season for business",
      "She did not notice anything odd",
    ],
    ans: 2,
    exp: "Because Griffin paid a large amount of money for his stay, Mrs Hall ignored his rudeness and secrecy initially, hoping to benefit from the rare winter guest.",
  },
  {
    q: "What made the people of Iping think that Griffin’s room was haunted?",
    opts: [
      "They saw a ghost near the door",
      "They saw lights moving in the sky",
      "They saw the furniture and clothes moving on their own, and the chair pushing Mrs Hall out and slamming the door",
      "They heard a strange voice singing",
    ],
    ans: 2,
    exp: "As the invisible Griffin moved objects, they appeared to move without human touch, so the villagers believed an evil spirit or ghost was at work.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"The feeling among the neighbours was that the room was haunted.\" \n\nWhat does this line tell us about the villagers’ understanding of Griffin’s powers?",
    opts: [
      "They clearly knew Griffin was invisible",
      "They believed in ghosts and had no idea about scientific invisibility",
      "They thought Griffin was a normal guest",
      "They knew he was a policeman",
    ],
    ans: 1,
    exp: "The villagers cannot imagine an invisible man, so they explain the strange events through ghost stories. This shows their lack of scientific understanding and their tendency to believe in the supernatural.",
  },
  {
    q: "Why did the clergyman and his wife find the theft in their study especially strange?",
    opts: [
      "Because it happened in the daytime",
      "Because they saw the thief clearly",
      "Because they heard the sound of money being taken but saw no one in the room when they entered",
      "Because the study was always locked",
    ],
    ans: 2,
    exp: "They were awakened by the sound of coins and drawers opening, yet when they rushed in, the room was empty but the money was gone, suggesting an invisible thief.",
  },
  {
    q: "How did Griffin react when Mrs Hall accused him of being responsible for the strange happenings?",
    opts: [
      "He apologised politely",
      "He laughed and ignored her",
      "He became angry, threw off his bandages and clothes and revealed his invisibility",
      "He immediately left the inn quietly",
    ],
    ans: 2,
    exp: "Griffin loses his temper and shows his true nature by dramatically removing his coverings in front of everyone, proving that he is an invisible man.",
  },
  {
    q: "Which of the following best describes the villagers’ attitude towards Griffin before he reveals his invisibility?",
    opts: [
      "Respectful and admiring",
      "Friendly and welcoming",
      "Suspicious and fearful due to his secretive ways and unexplained incidents",
      "Indifferent and uninterested",
    ],
    ans: 2,
    exp: "As coins disappear and furniture moves, the villagers become increasingly suspicious and afraid of the strange stranger, rather than admiring or ignoring him.",
  },
  {
    q: "Why is the title 'Footprints Without Feet' appropriate for the story?",
    opts: [
      "Because it is about shoes",
      "Because Griffin likes to walk",
      "Because the mysterious footprints in the beginning symbolise the unseen presence and impact of the invisible man",
      "Because the story takes place in a muddy village",
    ],
    ans: 2,
    exp: "The boys’ first sight of footprints without any visible person introduces the idea of invisibility. The title points to Griffin’s invisible existence and the effects he leaves behind.",
  },
  {
    q: "How does Griffin’s behaviour in Iping show that he misuses his scientific discovery?",
    opts: [
      "He helps villagers with his power",
      "He quietly continues experiments without harming anyone",
      "He uses invisibility to steal from the clergyman, abuse Mrs Hall and escape the police, causing fear and chaos",
      "He becomes a teacher",
    ],
    ans: 2,
    exp: "Instead of using his invisibility responsibly, he commits theft, threatens people and disturbs public peace, showing clear misuse.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"Griffin was strongly suspected of having a hand in both the burglaries.\" \n\nWhy was suspicion directed at Griffin?",
    opts: [
      "He openly confessed his crimes",
      "He was the only stranger in Iping and behaved mysteriously",
      "He was a policeman from London",
      "He was the richest person in the village",
    ],
    ans: 1,
    exp: "The villagers naturally suspect the secretive stranger because the robberies happen soon after his arrival and he refuses to explain his actions and stay.",
  },
  {
    q: "Which of the following best describes Griffin’s moral character?",
    opts: [
      "He is honest but misunderstood",
      "He is kind but unlucky",
      "He is selfish, revengeful and careless about others’ rights",
      "He is brave and selfless",
    ],
    ans: 2,
    exp: "Griffin burns houses, attacks people and steals without remorse. He uses his invisibility purely for personal comfort and revenge, not for good.",
  },
  {
    q: "How does the story use elements of both science fiction and mystery?",
    opts: [
      "Only by describing village life",
      "By focusing on love and romance",
      "By combining the scientific idea of invisibility with mysterious thefts, ghost-like events and suspense about the stranger’s true nature",
      "By describing wars and battles",
    ],
    ans: 2,
    exp: "Griffin’s invisibility is a science fiction element, while the unexplained footprints, robberies and 'haunted' room create a mystery that is gradually explained.",
  },
  {
    q: "What is suggested about the villagers when they immediately think of ghosts instead of trying to find a rational explanation?",
    opts: [
      "They are highly educated scientists",
      "They are practical and modern",
      "They are simple, superstitious people who fear what they don’t understand",
      "They know Griffin is a police spy",
    ],
    ans: 2,
    exp: "Their quick belief in witchcraft and haunting shows that they are guided more by superstition than by scientific thinking.",
  },
];

const footprintsFeetHard = [
  {
    q: "ASSERTION (A): Griffin’s invisibility brings him freedom and happiness.\nREASON (R): It allows him to do anything he likes without facing any problems.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The story shows the opposite: invisibility makes Griffin a homeless wanderer, drives him to crime, and isolates him from others. His power does not bring lasting freedom or happiness.",
  },
  {
    q: "ASSERTION (A): The story 'Footprints Without Feet' is a warning against using science without ethics.\nREASON (R): Griffin uses his scientific discovery mainly for revenge, stealing and frightening people, and ends up hunted and alone.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Griffin’s immoral use of science and his eventual misery clearly illustrate the danger of knowledge used without moral responsibility, so both statements are true and connected.",
  },
  {
    q: "CASE-BASED: A teacher wants to discuss the idea 'Power corrupts, and absolute power corrupts absolutely' using this chapter. Which aspect of Griffin’s behaviour best supports this idea?",
    opts: [
      "His love for books",
      "His politeness to Mrs Hall",
      "His growing readiness to burn houses, rob people and bully villagers once he becomes invisible",
      "His decision to become a teacher",
    ],
    ans: 2,
    exp: "As Griffin gains greater freedom through invisibility, he shows fewer moral limits—using fire, theft and physical violence. His power makes him increasingly corrupt.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"He was a brilliant scientist but he was a lawless person too.\" \n\nWhich of the following is the BEST inference drawn from this line?",
    opts: [
      "Scientific brilliance automatically makes people moral",
      "Intelligence, without self-control and ethics, can be dangerous",
      "Lawless people are never intelligent",
      "Scientists should not study invisibility",
    ],
    ans: 1,
    exp: "The line contrasts Griffin’s mental power with his lack of moral boundaries, suggesting that knowledge without ethics can lead to harm.",
  },
  {
    q: "ASSERTION (A): The footprints in the beginning are only a simple physical detail.\nREASON (R): They do not contribute to the story’s themes or meaning.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The footprints introduce invisibility and symbolise unseen forces and consequences. They are central to the title and theme, so the Assertion is false.",
  },
  {
    q: "From a social perspective, what does the villagers’ reaction to Griffin suggest about human nature?",
    opts: [
      "People always help strangers",
      "People calmly analyse all situations scientifically",
      "People often fear and attack what they do not understand",
      "People are never superstitious",
    ],
    ans: 2,
    exp: "The villagers jump to ghost stories and become hostile; their fear of the unknown makes them suspicious and aggressive instead of understanding.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"Mrs Hall almost fell down the stairs in hysterics. She was convinced that the room was haunted by spirits and that Griffin had caused these to enter into her furniture.\" \n\nWhat does this passage show about Mrs Hall’s mindset?",
    opts: [
      "She has a scientific temperament",
      "She is greedy and selfish only",
      "She interprets unexplained events through superstition and blames Griffin instead of looking for rational causes",
      "She knows Griffin is invisible",
    ],
    ans: 2,
    exp: "Mrs Hall’s belief in spirits controlling furniture shows her superstitious nature and her tendency to blame Griffin vaguely for all strange happenings.",
  },
  {
    q: "CASE-BASED: A student claims that Griffin is only a victim of society’s inability to accept something different. Which counter-argument is MOST strongly supported by the text?",
    opts: [
      "Griffin never harms anyone",
      "Griffin is always polite and honest",
      "Griffin brings trouble on himself by choosing revenge, theft and violence even before the villagers react to him",
      "The villagers are all scientists",
    ],
    ans: 2,
    exp: "The text shows Griffin burning a house, robbing shops and attacking people. His own choices push him into conflict; he is not simply a harmless victim of prejudice.",
  },
  {
    q: "ASSERTION (A): The setting of winter in London and Iping emphasises Griffin’s vulnerability despite his power.\nREASON (R): As an invisible man, he must remove his clothes to stay unseen, which leaves him exposed to cold and discomfort.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Winter cold forces Griffin into shops and inns, where he must choose between being naked and invisible or clothed and visible. This shows how his power also makes him physically vulnerable.",
  },
  {
    q: "From a CBSE value-based angle, which lesson does Griffin’s story MOST clearly teach?",
    opts: [
      "It is acceptable to break laws if you are intelligent",
      "Personal comfort is more important than others’ safety",
      "Scientific achievements must be guided by moral responsibility and respect for others",
      "Invisible people should always be feared",
    ],
    ans: 2,
    exp: "Griffin’s misuse of his scientific gift leads to chaos and loneliness. The story underscores that science must serve humanity, not destroy it.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"He had chosen to be alone, but now even his invisibility did not protect him from being chased.\" \n\nWhat does this suggest about Griffin’s situation?",
    opts: [
      "He is fully in control of his life",
      "He can never be caught",
      "His attempt to escape society through invisibility fails because his wrong actions still bring pursuit and danger",
      "He enjoys being hunted",
    ],
    ans: 2,
    exp: "Griffin thinks invisibility frees him from rules, but his crimes still attract chasing crowds and police. The line shows that one cannot escape the consequences of wrongdoing.",
  },
  {
    q: "From a thematic perspective, why is it significant that Griffin leaves visible footprints in the mud and snow?",
    opts: [
      "Because it makes the boys happy",
      "Because it proves he is a ghost",
      "Because it symbolises that no matter how hidden a wrongdoer is, some trace of his actions will remain",
      "Because he wants to draw attention",
    ],
    ans: 2,
    exp: "The footprints, though made by invisible feet, betray Griffin’s presence. Symbolically, they show that deeds leave marks that can reveal the doer eventually.",
  },
  {
    q: "CASE-BASED: A school debate topic is 'Science is a boon or a bane?'. Using Griffin’s story, which argument supports the 'bane' side MOST strongly?",
    opts: [
      "Science makes people smarter and kinder automatically",
      "Griffin’s scientific discovery of invisibility becomes a source of fear and harm because he uses it without conscience",
      "Science has no impact on human life",
      "Villagers fear science because they are educated",
    ],
    ans: 1,
    exp: "Griffin’s invisibility itself is neutral; his unethical use makes it dangerous. This supports the view that science without moral control can be harmful.",
  },
  {
    q: "ASSERTION (A): The villagers’ fear and aggression towards Griffin are portrayed as completely unjustified.\nREASON (R): Griffin behaves politely and never does anything to threaten them.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "Griffin’s behaviour—robbery, strange experiments, violent outbursts—does threaten and scare the villagers, so their fear is not entirely unjustified.",
  },
  {
    q: "From a narrative point of view, what is the effect of starting the story with the boys’ discovery of footprints before introducing Griffin directly?",
    opts: [
      "It makes the story boring at first",
      "It immediately creates mystery and suspense, preparing the reader to accept the strange idea of an invisible man",
      "It reveals everything at once",
      "It focuses on the boys as main characters",
    ],
    ans: 1,
    exp: "Beginning with unexplained footprints engages curiosity and builds a mysterious atmosphere, making the later explanation of invisibility more impactful.",
  },
];

const makingScientistPYQs = [
  {
    question: "Who is the main character of the chapter 'The Making of a Scientist'? What is the chapter mainly about?",
    answer: "The main character is Richard H. Ebright, who later becomes a renowned scientist in molecular biology. The chapter traces his journey from a curious child who collected butterflies and did simple projects to a dedicated researcher who won several science awards. It shows how his curiosity, hard work, support from his mother and good scientific habits combined to make him a successful scientist.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "How did a book become a turning point in Richard Ebright’s life?",
    answer: "Ebright had collected all twenty-five species of butterflies found in his hometown by the time he was in the second grade, and his hobby could have ended there. At that time his mother gave him a book called 'The Travels of Monarch X', which described the migration of monarch butterflies to Central America and invited readers to help tag them. This book opened the world of real scientific research to him, led him to contact Dr Urquhart, and turned his simple hobby into serious scientific work.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Richard’s mother help him in becoming a scientist?",
    answer: "Richard’s mother played a crucial role. After his father’s death, she devoted herself to him, encouraging his curiosity and love of learning. She took him on trips, bought him telescopes, microscopes, cameras and other equipment, and spent evenings with him discussing books and ideas. Most importantly, she gave him 'The Travels of Monarch X' and always set new challenges for him, which helped shape his scientific attitude and perseverance.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What lesson did Ebright learn when he did not win anything at the county science fair in seventh grade?",
    answer: "In seventh grade Ebright presented simple slides of frog tissues at the county science fair and won no prize. From this experience he learnt that science is not about showing ready-made things; it is about doing real experiments and finding answers to questions. He realised that to succeed, he had to start investigating problems, form hypotheses and test them, rather than just displaying collections or prepared slides.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe Ebright’s eighth-grade science fair project. Why was it important for him?",
    answer: "In eighth grade Ebright tried to find the cause of a viral disease that killed nearly all monarch caterpillars some years. He thought that a beetle might carry the disease, so he raised caterpillars in the presence of beetles and without them to compare results. He did not actually prove his theory, but he showed his careful experiments and reasoning at the fair and won first prize. This project taught him that even unsuccessful experiments have value if they are well designed and that he could do genuine scientific work.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "What was Ebright’s science fair project on the viceroy butterflies? What did he show through it?",
    answer: "In one of his later projects, Ebright studied viceroy butterflies. He wanted to test the idea that viceroys copy monarch butterflies to protect themselves, because birds avoid eating bitter-tasting monarchs. By comparing how birds reacted to both species, he showed that viceroys do indeed mimic monarchs and that this mimicry helps them survive. This project won him a prize and further strengthened his interest in animal behaviour and evolutionary biology.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Richard Ebright’s work on the monarch pupa lead to an important discovery?",
    answer: "While raising monarch butterflies, Ebright became curious about the tiny golden spots on the monarch pupa. Together with his friend and fellow researcher James Wong, he studied these spots and discovered that they were the source of a hormone necessary for the butterfly’s full development. By identifying the function of these spots, he made an important contribution to understanding how hormones control growth and development in living organisms.",
    year: 2022, marks: 5, difficulty: "hard",
  },
  {
    question: "What discovery did Ebright make about how cells read their DNA?",
    answer: "In his advanced research, Ebright investigated how cells use their DNA to make proteins. He discovered the working of a 'switch' in a cell that turns certain genes on or off, showing how cells read the genetic code in DNA. This work provided a model for the process of how a cell reads blueprint instructions and helped explain fundamental mechanisms of life. It was a major scientific contribution and won him several awards.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "Apart from science, what other interests and qualities did Richard Ebright have as a student?",
    answer: "Ebright was not only a scientist; he was also an excellent student and an all-rounder. He was a good debater and a public speaker, a champion orator, and an active member of debates and model United Nations clubs. He was also a good canoeist and an outdoor person who enjoyed sports. These interests show that he had a balanced personality, leadership qualities and the ability to communicate, not just a narrow focus on laboratory work.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "According to the chapter, what are the three essential qualities that go into the making of a scientist?",
    answer: "The chapter mentions three essential qualities: first, a first-rate mind; second, curiosity; and third, the will to win or the desire to succeed for the right reasons. Ebright had all three: he was intelligent, always asking questions and looking for problems to solve, and he had the determination to keep working until he found answers instead of giving up easily.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"That book, which told how monarch butterflies migrated to Central America, opened the world of science to the eager young collector.\" \n\nHow did the book change Ebright’s approach to his hobby?",
    answer: "Earlier, Ebright’s hobby was limited to collecting butterflies around his hometown. The book showed him that butterflies could be studied scientifically by tracking their migration and tagging them. It turned his casual collecting into a research activity connected with a real scientist, Dr Urquhart. From then on, he started thinking like a young scientist, planning projects and collecting data rather than just keeping specimens.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"Science, he soon found, is not a fair that you go to and display your slides. Science is about testing ideas through experiments.\" \n\nWhat lesson does Ebright learn here about the nature of science?",
    answer: "Ebright learns that science is not about show or decoration but about inquiry. Simply displaying pretty slides or collections does not count as scientific work. Real science involves identifying a question, forming a hypothesis, designing experiments to test it, and drawing conclusions from the results. This understanding changes how he approaches every later project.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): Ebright’s failure at his first county science fair discouraged him from doing science.\nREASON (R): He decided that science was only about winning prizes, not about doing experiments.\n\nBased on the chapter, analyse the A–R pair and give the correct answer.",
    answer: "Both Assertion (A) and Reason (R) are false. Ebright’s failure did not discourage him; instead, it taught him an important lesson that science is about experiments, not mere display. He became more serious about research after that and continued to participate with better projects.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How did the people around Richard Ebright – his mother and his teachers – contribute to the making of a scientist?",
    answer: "Ebright’s mother encouraged his curiosity, supplied him with books and scientific equipment, and spent time discussing ideas with him. She also introduced him to 'The Travels of Monarch X' and supported his participation in science fairs. His teachers, like Mr Urquhart and later mentors at university, guided his research, offered advice, and recognised his potential. Together, their faith, guidance and opportunities helped him grow from a curious child into a confident scientist.",
    year: 2024, marks: 5, difficulty: "hard",
  },
  {
    question: "What message does the chapter 'The Making of a Scientist' convey to students?",
    answer: "The chapter conveys that becoming a scientist is not about being a born genius but about nurturing curiosity, working hard and not giving up when experiments fail. It highlights the importance of asking questions, doing hands-on projects, learning from mistakes and having supportive mentors. It encourages students to stay curious, use their talents for meaningful goals, and realise that dedication and scientific attitude can lead to great achievements.",
    year: 2021, marks: 5, difficulty: "hard",
  },
];

const makingScientistEasy = [
  {
    q: "Who is the author of the chapter 'The Making of a Scientist'?",
    opts: ["H.G. Wells", "Robert W. Peterson", "Ruskin Bond", "Victor Canning"],
    ans: 1,
    exp: "‘The Making of a Scientist’ is written by Robert W. Peterson. The other authors wrote different chapters in the same book.",
  },
  {
    q: "Who is the main scientist discussed in this chapter?",
    opts: ["Albert Einstein", "Isaac Newton", "Richard H. Ebright", "Frederick Urquhart"],
    ans: 2,
    exp: "The chapter tells the story of Richard H. Ebright, his childhood interests and his journey towards becoming a scientist.",
  },
  {
    q: "Which hobby did Richard Ebright develop as a child that led him towards science?",
    opts: ["Collecting coins", "Collecting stamps", "Collecting butterflies", "Collecting rocks"],
    ans: 2,
    exp: "Ebright loved collecting butterflies. By the time he was in second grade, he had collected all 25 species found in his hometown.",
  },
  {
    q: "What was the name of the book that became a turning point in Ebright’s life?",
    opts: [
      "The Story of My Life",
      "The Travels of Monarch X",
      "Wings of Fire",
      "The Origin of Species",
    ],
    ans: 1,
    exp: "The book ‘The Travels of Monarch X’ introduced him to scientific research on monarch butterflies and changed his life.",
  },
  {
    q: "Who gave Ebright the book 'The Travels of Monarch X'?",
    opts: ["His teacher", "His father", "His mother", "His friend"],
    ans: 2,
    exp: "Ebright’s mother presented him the book, opening the world of science and butterfly migration studies to him.",
  },
  {
    q: "What did the book 'The Travels of Monarch X' invite readers to do?",
    opts: [
      "Write stories about butterflies",
      "Tag monarch butterflies and send them to a scientist",
      "Draw pictures of butterflies",
      "Collect and sell butterflies",
    ],
    ans: 1,
    exp: "The book invited readers to help study monarch migration by tagging butterflies for Dr Urquhart’s research.",
  },
  {
    q: "Which class was Ebright in when he first lost at the county science fair?",
    opts: ["Fifth grade", "Seventh grade", "Ninth grade", "Twelfth grade"],
    ans: 1,
    exp: "He first went to the county science fair in seventh grade, with slides of frog tissues, and did not win any prize.",
  },
  {
    q: "What did Ebright display at the science fair where he won nothing?",
    opts: [
      "A working robot",
      "Collections of rocks",
      "Slides of frog tissues",
      "A model of the solar system",
    ],
    ans: 2,
    exp: "He took neat slides of frog tissues, but these were just displays, not original experiments, so he did not win.",
  },
  {
    q: "Which animal’s life did Ebright study most deeply in his projects?",
    opts: ["Dogs", "Cats", "Monarch butterflies", "Fish"],
    ans: 2,
    exp: "Most of his projects, including tagging, disease study and hormone research, centred around monarch butterflies.",
  },
  {
    q: "Who was Dr Urquhart in relation to Ebright’s scientific journey?",
    opts: [
      "His school principal",
      "A scientist who studied monarch butterflies and guided Ebright’s early research",
      "His neighbour",
      "His debate coach",
    ],
    ans: 1,
    exp: "Dr Frederick A. Urquhart was the Canadian scientist whose work on monarch migration Ebright joined by tagging butterflies.",
  },
  {
    q: "In which grade did Ebright undertake the project about the disease of monarch caterpillars?",
    opts: ["Second grade", "Sixth grade", "Eighth grade", "Tenth grade"],
    ans: 2,
    exp: "His eighth-grade project was to investigate a viral disease that killed monarch caterpillars.",
  },
  {
    q: "What did Ebright try to prove with his project on viceroy butterflies?",
    opts: [
      "That viceroys are bigger than monarchs",
      "That viceroy butterflies copy monarchs to protect themselves",
      "That viceroys live longer than monarchs",
      "That viceroys cannot fly",
    ],
    ans: 1,
    exp: "He showed that viceroys mimic monarchs so that predators avoid them, mistaking them for the bad-tasting monarchs.",
  },
  {
    q: "Which of these was NOT one of Ebright’s interests?",
    opts: ["Debating", "Canoeing", "Playing football", "Collecting butterflies"],
    ans: 2,
    exp: "The chapter mentions his interests in debate, public speaking, outdoor activities like canoeing, and science, but not football specifically.",
  },
  {
    q: "According to the chapter, which quality was one of the essentials for being a scientist?",
    opts: [
      "Laziness",
      "Curiosity",
      "Fear of failure",
      "Desire to show off",
    ],
    ans: 1,
    exp: "Curiosity—asking why things happen—is highlighted as one of the key qualities in making a scientist, along with a first-rate mind and will to win.",
  },
  {
    q: "What general lesson does Ebright’s life give to young students?",
    opts: [
      "Only geniuses can succeed",
      "One should avoid hard work",
      "Curiosity and hard work from a young age can lead to great achievements",
      "Marks are more important than hobbies",
    ],
    ans: 2,
    exp: "Ebright’s journey shows that being curious, doing experiments, and working consistently are crucial for success in science and life.",
  },
];

const makingScientistMedium = [
  {
    q: "Why did Ebright lose interest in simply tagging butterflies after some time?",
    opts: [
      "He found it too difficult",
      "He realised that only very few butterflies he tagged were ever recaptured, so tagging alone did not satisfy his curiosity",
      "His mother told him to stop",
      "Dr Urquhart was not interested in his work",
    ],
    ans: 1,
    exp: "Ebright saw that very few tagged butterflies were reported back, so he wanted more challenging projects where he could directly test ideas and see clearer results.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"He realised the kind of work that had to be done if he wanted to be a scientist.\" \n\nThis realisation came to Ebright after:",
    opts: [
      "Winning his first prize",
      "Reading 'The Travels of Monarch X'",
      "Failing to win at the county science fair with frog tissue slides",
      "Meeting Dr Urquhart personally",
    ],
    ans: 2,
    exp: "His failure at the fair taught him that serious research, not mere display, was needed if he wanted to become a scientist.",
  },
  {
    q: "What was the main question behind Ebright’s project on the disease that killed monarch caterpillars?",
    opts: [
      "Why do monarchs migrate?",
      "Which virus kills the caterpillars?",
      "Whether a beetle carried the viral disease that killed the caterpillars",
      "Why are caterpillars colourful?",
    ],
    ans: 2,
    exp: "He hypothesised that a beetle might be spreading the virus, so he experimented by raising caterpillars with and without beetles.",
  },
  {
    q: "Why did Ebright’s eighth-grade project win first prize, even though his hypothesis proved wrong?",
    opts: [
      "Because the judges liked him personally",
      "Because he decorated his stall nicely",
      "Because he had followed a proper scientific method, designed a careful experiment and analysed the results honestly",
      "Because there were no other good projects",
    ],
    ans: 2,
    exp: "The fair rewarded his scientific approach—clear question, planned experiment, careful records—even though he didn’t get the expected answer.",
  },
  {
    q: "In his later research, what did Ebright and his friend Wong discover about the tiny gold spots on the monarch pupa?",
    opts: [
      "They were just for decoration",
      "They were useless marks",
      "They were the source of a hormone necessary for the butterfly’s development",
      "They were scars from injury",
    ],
    ans: 2,
    exp: "Their study showed that these spots released a hormone that controlled the development of the butterfly, an important biological discovery.",
  },
  {
    q: "What does Ebright’s work on how cells read their DNA show about his level of scientific achievement?",
    opts: [
      "He only did simple school projects",
      "He became a leading researcher in cell biology and genetics",
      "He gave up science after school",
      "He worked only on tagging butterflies",
    ],
    ans: 1,
    exp: "His studies on the 'switch' mechanism in DNA reading show that he moved beyond school projects to advanced research in molecular biology.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"He was competitive. He wanted to win, but not for the sake of winning or for prizes.\" \n\nWhat does this reveal about Ebright’s attitude?",
    opts: [
      "He did not care about his work",
      "He wanted success but valued the quality and purpose of his work more than trophies",
      "He was obsessed with beating others at any cost",
      "He disliked all competitions",
    ],
    ans: 1,
    exp: "Ebright’s competitiveness was healthy; he aimed at doing good science and contributing knowledge rather than chasing fame alone.",
  },
  {
    q: "How did Ebright’s mother encourage him when he had nothing particular to do?",
    opts: [
      "She told him to sleep",
      "She gave him household chores only",
      "She found learning tasks and challenges—such as reading, projects or scientific equipment—for him",
      "She asked him to watch TV",
    ],
    ans: 2,
    exp: "She always kept his mind engaged with constructive activities, fostering his curiosity and discipline instead of letting him waste time.",
  },
  {
    q: "Which of the following statements about Ebright’s personality is supported by the chapter?",
    opts: [
      "He was interested only in science and nothing else",
      "He was shy and never spoke in public",
      "He was an all-rounder, balancing science with debate, sports and other activities",
      "He hated teamwork",
    ],
    ans: 2,
    exp: "The chapter highlights his success in debating, public speaking and outdoor activities, indicating a well-rounded personality.",
  },
  {
    q: "What does the chapter suggest about the role of failures in Ebright’s growth as a scientist?",
    opts: [
      "Failures proved he was not talented",
      "Failures made him quit science for some time",
      "Failures taught him important lessons and pushed him towards better experiments",
      "Failures had no effect on him",
    ],
    ans: 2,
    exp: "Each failure—such as his first science fair—gave him insight into what real science requires and motivated him to improve.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"If the theory proves correct, it will be a big step towards understanding the process of life.\" \n\nWhich theory is being referred to here?",
    opts: [
      "Theory about beetles carrying disease",
      "Theory that viceroys copy monarchs",
      "Theory about how cells read the blueprint of DNA using a 'switch'",
      "Theory about butterfly colours",
    ],
    ans: 2,
    exp: "This line refers to Ebright’s theory on how cells turn genes on and off, which could greatly advance understanding of life processes.",
  },
  {
    q: "Which of these qualities did Ebright NOT show as a budding scientist?",
    opts: [
      "Curiosity and questioning attitude",
      "Willingness to work hard on experiments",
      "Dishonesty in reporting results",
      "Ability to think logically",
    ],
    ans: 2,
    exp: "The chapter stresses that he was honest in his work; dishonesty is never mentioned as one of his traits.",
  },
  {
    q: "How did Ebright’s home environment contribute to his scientific development?",
    opts: [
      "He had no books at home",
      "His mother discouraged questions",
      "He had a basement to conduct experiments and a mother who filled his home with books, equipment and learning opportunities",
      "He was not allowed to do any experiments",
    ],
    ans: 2,
    exp: "The supportive, resource-rich home made it possible for him to explore, experiment and study deeply from a young age.",
  },
  {
    q: "Which of the following best summarises the lesson of Ebright’s early science fair experiences?",
    opts: [
      "Science fairs are a waste of time",
      "Winning prizes is the only goal",
      "Real science is about asking questions and doing original experiments, not just putting up displays",
      "Only expensive equipment can win",
    ],
    ans: 2,
    exp: "His journey from a failed display to experimental projects shows that inquiry and originality are central to science.",
  },
  {
    q: "What does the chapter identify as one of the 'right reasons' for wanting to win?",
    opts: [
      "To become famous and rich quickly",
      "To prove others wrong",
      "To contribute something valuable and to satisfy one’s curiosity about the world",
      "To avoid doing homework",
    ],
    ans: 2,
    exp: "Ebright’s motivation comes from a genuine desire to understand nature and add to knowledge, not from shallow pride or greed.",
  },
];

const makingScientistHard = [
  {
    q: "ASSERTION (A): The chapter suggests that curiosity is more important than high marks in becoming a scientist.\nREASON (R): Ebright’s journey shows that his constant questioning and experiments, supported by good but not necessarily perfect grades, led to his success.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The narrative emphasises curiosity, hard work and scientific thinking over exam marks alone. Ebright is bright, but it is his questioning habit that truly shapes him.",
  },
  {
    q: "ASSERTION (A): Ebright’s mother is as important to his development as his own abilities.\nREASON (R): She recognises his curiosity early, provides resources, encourages his projects and creates an environment that nurtures his scientific temperament.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The chapter clearly credits his mother’s support as a major factor. Her actions explain why she is as crucial as his own talents.",
  },
  {
    q: "CASE-BASED: A guidance counsellor wants to use 'The Making of a Scientist' to advise students who only memorise facts. Which key insight from Ebright’s story should they highlight?",
    opts: [
      "Memorising textbook facts is enough to become a scientist",
      "Science means displaying attractive charts and models",
      "Science requires critical thinking, asking 'why' and 'how', and doing experiments rather than just rote learning",
      "Only students with expensive labs can do science",
    ],
    ans: 2,
    exp: "Ebright’s shift from displays to experimentation demonstrates that real science goes far beyond memorisation.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"He had a driving curiosity along with a bright mind, and he was competitive.\" \n\nWhat does this combination of traits suggest about Ebright?",
    opts: [
      "He wanted to win at any cost, even by cheating",
      "He only cared about beating others, not about science",
      "He was likely to push himself to do serious, original work and not be satisfied with shallow success",
      "He was uninterested in hard work",
    ],
    ans: 2,
    exp: "His competitiveness is balanced by curiosity and intelligence, which pushes him towards genuine achievements rather than superficial wins.",
  },
  {
    q: "ASSERTION (A): Ebright’s early interest in collecting things like butterflies, rocks and fossils was a waste of time.\nREASON (R): These hobbies distracted him from serious study and delayed his scientific career.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The chapter presents these hobbies as foundations for observation, classification and curiosity, not as distractions. They are stepping stones, not obstacles.",
  },
  {
    q: "From a scientific-method perspective, which of Ebright’s actions best shows his understanding of 'hypothesis and testing'?",
    opts: [
      "Simply collecting many butterflies without questions",
      "Taking photos of butterflies for decoration",
      "Thinking that beetles carried a virus and then raising caterpillars with and without beetles to test this idea",
      "Reading science books only",
    ],
    ans: 2,
    exp: "In the virus project, he clearly forms a hypothesis and designs an experiment to test it—key steps of the scientific method.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"He also has the will to win – for the right reasons. He wants to do something significant, not just get a prize.\" \n\nWhat does 'right reasons' imply in this context?",
    opts: [
      "Wanting money and fame only",
      "Wanting to contribute to knowledge and solve real problems",
      "Wanting to beat his friends",
      "Wanting to impress his teachers temporarily",
    ],
    ans: 1,
    exp: "Ebright’s motivation is rooted in meaningful goals—understanding nature and helping humanity—rather than shallow recognition.",
  },
  {
    q: "CASE-BASED: A student says, 'If you fail once, there is no point trying again.' How does Ebright’s story challenge this belief?",
    opts: [
      "He never failed, so the story does not apply",
      "He failed, gave up, and proved the student right",
      "He turned his early failure at the science fair into motivation to adopt real experiments, later winning many prizes and awards",
      "He stopped doing projects after failing",
    ],
    ans: 2,
    exp: "Ebright’s response to failure is to learn, adapt and work harder, directly opposing the idea that failure is final.",
  },
  {
    q: "ASSERTION (A): Having a 'first-rate mind' alone is sufficient to become a scientist.\nREASON (R): Ebright succeeds in science simply because he is very intelligent.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The chapter clearly states that, besides a first-rate mind, curiosity and will to win are also essential. Intelligence alone is not enough.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"His mother would say, 'Don’t waste your time in front of the TV.'\" \n\nWhat does this tell us about the kind of environment that nurtured Ebright?",
    opts: [
      "An environment that encouraged passive entertainment",
      "An environment that valued active learning, reading and experimenting over passive watching",
      "An environment that forbade all enjoyment",
      "An environment focused only on marks",
    ],
    ans: 1,
    exp: "His mother emphasised meaningful activities—books, equipment, projects—rather than letting him sit idly in front of a screen.",
  },
  {
    q: "From a value-education perspective, which lesson from Ebright’s life is MOST relevant for today’s students?",
    opts: [
      "Only children from rich families can succeed",
      "Curiosity, perseverance and ethical work matter more than shortcuts and instant success",
      "You must ignore all hobbies to focus on exams",
      "Competing with friends is the only aim",
    ],
    ans: 1,
    exp: "The chapter highlights steady effort, curiosity and integrity as the real keys to long-term success, not shortcuts.",
  },
  {
    q: "CASE-BASED: A school wants to design a 'Young Scientist' program. Which three qualities from Ebright’s story should they MOST emphasise?",
    opts: [
      "Obedience, silence and secrecy",
      "Curiosity, experimental thinking and perseverance",
      "Memorisation, competition and fear of failure",
      "Isolation, stubbornness and pride",
    ],
    ans: 1,
    exp: "Ebright’s success is built on questioning, hands-on experiments and not giving up when results are unexpected.",
  },
  {
    q: "ASSERTION (A): The chapter portrays science as a lonely, purely individual activity.\nREASON (R): Ebright never interacts with mentors or collaborates with anyone.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "Ebright works with mentors like Dr Urquhart and James Wong and benefits from teachers’ guidance. Science is shown as collaborative as well as individual.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"He had found the cause of the disease that killed nearly all the monarch caterpillars every few years.\" (Paraphrased)\nIn the context of scientific progress, why is this kind of finding important even at student level?",
    opts: [
      "Because it directly makes the student rich",
      "Because it trains students to apply scientific methods to real problems, contributing building blocks to larger scientific knowledge",
      "Because it guarantees a Nobel Prize",
      "Because it replaces all previous research",
    ],
    ans: 1,
    exp: "Student projects may be small, but they use real methods and add data or ideas that can support future, bigger discoveries.",
  },
  {
    q: "From a CBSE board perspective, what central idea about 'the making of a scientist' do exam questions MOST often focus on?",
    opts: [
      "The number of awards Ebright received",
      "The places Ebright travelled",
      "The personal qualities and early habits that prepared Ebright for scientific success",
      "The detailed chemical formulas he discovered",
    ],
    ans: 2,
    exp: "Board questions usually ask about qualities like curiosity, hard work, perseverance and the role of family and mentors, not technical formulas.",
  },
];

const necklacePYQs = [
  {
    question: "What kind of a person is Mme Loisel and why is she always unhappy?",
    answer: "Mme Loisel (Matilda) is young, pretty and born into a low-income family, married to a simple clerk in the Board of Education. She feels she was meant for luxury and is constantly dissatisfied with her modest home, plain clothes and ordinary life. Her dreams of riches and admiration clash with her reality, making her feel wronged and unhappy all the time.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "What kind of a person is M. Loisel? How does he contrast with his wife?",
    answer: "M. Loisel is a simple, contented and hardworking clerk who is satisfied with his modest lifestyle. He enjoys simple pleasures like a good homemade supper and hunting with friends. Unlike his complaining wife, he is practical and unselfish: he gives up his saved money for a hunting gun to buy her a dress and later works day and night to repay the necklace debt without blaming her.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did Matilda throw the invitation card on the table and react spitefully when her husband brought it home?",
    answer: "When M. Loisel proudly brought home the invitation to a ball at the Minister of Education’s residence, Matilda initially hoped he had bought her a new dress. On seeing the card, she reacted spitefully and threw it on the table because she felt humiliated that she had nothing elegant to wear. Instead of being happy about the rare opportunity, she focused on her lack of a suitable dress and blamed her poverty for spoiling everything.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Matilda manage to get a suitable dress and jewellery for the ball?",
    answer: "First, Matilda made her husband miserable until he agreed to give her four hundred francs he had saved for a hunting gun, so that she could buy a new, elegant gown. Then she wept again because she had no jewels to match the dress. On M. Loisel’s suggestion, she visited her rich friend Mme Forestier and borrowed a beautiful diamond necklace from her. Thus, she obtained both a fine dress and jewellery for the ball.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe Matilda’s experience at the ball. How did she feel and behave there?",
    answer: "At the ball, Matilda felt ecstatic. Dressed in a splendid gown and wearing the diamond necklace, she looked extremely beautiful and was admired by all. Men asked to be introduced to her, she danced with enthusiasm and grace, and she felt she had finally entered the luxurious world she had always dreamed of. She was filled with pride, joy and vanity, completely absorbed in the attention and admiration she received.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "What steps did the Loisels take when they realised that the necklace was lost?",
    answer: "After discovering the loss, M. Loisel went out into the night to search the streets and the route they had taken, but found nothing. The next day he went to the police, to the cab offices, and put advertisements in the newspapers offering a reward. Meanwhile, they asked Mme Forestier for time by saying the clasp was being repaired. When all efforts failed, they decided to replace the necklace with another similar one bought from a jeweller.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How did the Loisels manage to replace the lost necklace? What sacrifices did they make to repay the debt?",
    answer: "They finally found a similar diamond necklace worth thirty-six thousand francs. M. Loisel had eighteen thousand francs inherited from his father and borrowed the rest from usurers and lenders. To repay this huge debt, they dismissed their maid, shifted to a cheap attic, and Matilda did all household chores herself—cooking, washing, carrying water, and shopping. M. Loisel took up extra work in the evenings and late at night. For ten long years they lived in grinding poverty and hard labour to clear their debts.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "Describe the change in Mme Loisel’s appearance and lifestyle after the loss of the necklace.",
    answer: "Before the loss, Matilda was a pretty, delicate woman who rarely did housework and dreamt of luxury. After replacing the necklace, she became coarse, hardened and aged. She washed clothes, scrubbed floors and carried water herself; her hands grew red and rough, her hair became untidy, and her voice grew loud. They moved to a small attic and she dressed like a common working woman. Ten years of poverty and toil completely transformed her appearance and lifestyle.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Mme Forestier react when Matilda returned the necklace, and later when she learnt the truth after ten years?",
    answer: "When Matilda first returned the replacement necklace, Mme Forestier was annoyed at the delay and complained that she might have needed it sooner, but she did not open the case and simply told Matilda it was fine. Ten years later, when Matilda confessed that she had lost the original necklace and replaced it at great cost, Mme Forestier was shocked and full of pity. She then revealed that her original necklace was an imitation worth at most five hundred francs.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Explain the irony in the ending of the story 'The Necklace'.",
    answer: "The central irony is that Matilda and her husband suffer ten years of poverty to repay the cost of a replacement necklace they believe is genuine diamonds. They sacrifice youth, health and comfort to maintain appearances and avoid telling the truth. In the end, Matilda learns from Mme Forestier that the original necklace was fake and inexpensive. The huge sacrifice was unnecessary, and her misguided pride and desire for show ruined her life for nothing.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "What kind of relationship did Matilda have with Mme Forestier? How does it contribute to the story?",
    answer: "Matilda and Mme Forestier were school friends, but Matilda avoided visiting her rich friend too often because her luxury made Matilda feel painfully poor by comparison. It is this relationship that gives Matilda access to the diamond necklace that symbolises the world of wealth she craves. Borrowing the necklace from Mme Forestier allows Matilda to shine at the ball, but losing it and hiding the truth sets up the decade of suffering and the final ironic revelation.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"She suffered ceaselessly, feeling herself born for all delicacies and all luxuries.\" \n\nWhat does this line reveal about Matilda’s character and her attitude to her life?",
    answer: "This line shows that Matilda is deeply discontented and proud. She believes she deserves a luxurious, high-class life and feels wronged by her modest circumstances. Instead of appreciating what she has—a loving husband and a comfortable enough home—she constantly compares herself to the rich and feels that life has cheated her, which feeds her misery and vanity.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"‘Oh, my poor Mathilde! But mine was imitation. It was worth at the very most five hundred francs!’\" \n\nWhat is the effect of this revelation on the reader and on the meaning of the story?",
    answer: "For the reader, this revelation is a powerful shock and completes the story’s irony: all the Loisels’ suffering was based on a misunderstanding and a lie. It drives home the message that pretending and valuing appearance over honesty can have disastrous consequences. For the story’s meaning, it underlines the foolishness of Matilda’s pride and desire to seem rich, showing that her obsession with luxury destroyed the simple happiness she originally had.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): The Loisels’ ten years of sacrifice were unnecessary.\nREASON (R): Mme Loisel could have avoided it all by telling Mme Forestier the truth about losing the necklace.",
    answer: "Both Assertion (A) and Reason (R) are true, and the Reason correctly explains the Assertion. If Matilda had honestly confessed that the necklace was lost, Mme Forestier would likely have revealed at once that it was imitation jewellery. By choosing pride and secrecy instead of honesty, the Loisels took on a huge, needless burden and wasted ten years of their lives repaying a debt they never needed to incur.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "What message does 'The Necklace' convey about contentment, appearance and honesty?",
    answer: "The story suggests that people should be content with what they can afford and not destroy their peace for the sake of appearances. Matilda’s craving for luxury and admiration makes her ashamed of her simple life and leads her to borrow a necklace to look rich for a single night. Her dishonesty in hiding the loss from Mme Forestier leads to ten years of hard labour. The narrative teaches that pride, materialism and dishonesty can ruin lives, whereas honesty and contentment could have saved the Loisels from suffering.",
    year: 2024, marks: 5, difficulty: "hard",
  },
];

const necklaceEasy = [
  {
    q: "Who is the author of the story 'The Necklace'?",
    opts: ["Guy de Maupassant", "H.G. Wells", "Robert W. Peterson", "Ruskin Bond"],
    ans: 0,
    exp: "‘The Necklace’ is written by French short-story writer Guy de Maupassant. The other writers wrote different chapters from the same book but not this one.",
  },
  {
    q: "What is Mme Loisel’s first name?",
    opts: ["Jeanne", "Matilda (Mathilde)", "Louise", "Forestier"],
    ans: 1,
    exp: "Mme Loisel is named Matilda (in French, Mathilde). Jeanne is Mme Forestier’s first name, and Forestier is the surname of her rich friend.",
  },
  {
    q: "What is M. Loisel’s occupation?",
    opts: [
      "A shopkeeper",
      "A clerk in the Ministry of Education",
      "A bank manager",
      "A school teacher",
    ],
    ans: 1,
    exp: "M. Loisel works as a minor clerk in the Board (Ministry) of Education. His modest salary reflects their middle-class life.",
  },
  {
    q: "What does Matilda long for in her life?",
    opts: [
      "Adventure and travel",
      "Books and education",
      "Luxury, fine clothes and jewels",
      "Sports and games",
    ],
    ans: 2,
    exp: "She constantly dreams of rich rooms, fine furniture, costly dishes, and expensive dresses and jewellery, though she cannot afford them.",
  },
  {
    q: "From whom does Matilda borrow the diamond necklace?",
    opts: ["Her sister", "Her mother", "Her neighbour", "Her friend Mme Forestier"],
    ans: 3,
    exp: "Matilda borrows the necklace from her rich school friend Mme Forestier so she can look elegant at the ball.",
  },
  {
    q: "What special event does M. Loisel get an invitation to?",
    opts: [
      "A wedding",
      "A ball at the Minister of Education’s residence",
      "A picnic",
      "A theatre show",
    ],
    ans: 1,
    exp: "He brings an invitation to a grand party (ball) at the Minister’s palace, which is a rare opportunity for ordinary clerks like them.",
  },
  {
    q: "How much money does M. Loisel give Matilda to buy a new dress?",
    opts: ["Two hundred francs", "Four hundred francs", "Six hundred francs", "One thousand francs"],
    ans: 1,
    exp: "He sacrifices his savings—four hundred francs that he had kept aside for buying a hunting gun—to buy her a suitable dress for the ball.",
  },
  {
    q: "Why is Matilda unhappy even after getting a new dress?",
    opts: [
      "She does not like its colour",
      "It is too big for her",
      "She has no jewellery to go with it",
      "She does not want to attend the ball",
    ],
    ans: 2,
    exp: "After receiving the dress, she begins to cry again because she feels she needs jewellery to look truly elegant and does not own any.",
  },
  {
    q: "How does Matilda behave at the ball?",
    opts: [
      "She sits quietly in a corner",
      "She looks shy and nervous",
      "She is admired by all and dances with enthusiasm",
      "She leaves early because she feels sick",
    ],
    ans: 2,
    exp: "At the ball she feels in her element: she is charming, dances with many men and is praised, which fills her with pride and joy.",
  },
  {
    q: "When does Matilda realise that the necklace is missing?",
    opts: [
      "At the ball",
      "In the cab on the way home",
      "At home, after taking off her wraps",
      "The next morning",
    ],
    ans: 2,
    exp: "She discovers the necklace is gone only when she reaches home and stands before the mirror to admire herself one last time.",
  },
  {
    q: "How much does the replacement necklace cost the Loisels?",
    opts: ["Five hundred francs", "Ten thousand francs", "Thirty-six thousand francs", "Fifty thousand francs"],
    ans: 2,
    exp: "They find a similar diamond necklace priced at thirty-six thousand francs, a huge sum for a clerk and his wife.",
  },
  {
    q: "How long do the Loisels take to repay their debts for the necklace?",
    opts: ["One year", "Three years", "Five years", "Ten years"],
    ans: 3,
    exp: "They struggle and live in poverty for ten long years before finally paying off all the loans they took to buy the replacement necklace.",
  },
  {
    q: "How does Matilda look after ten years of hard work?",
    opts: [
      "More beautiful than ever",
      "Exactly the same",
      "Old, worn out and rough like a common working woman",
      "Young and glamorous",
    ],
    ans: 2,
    exp: "The years of hardship make her lose her youthful beauty; she becomes coarse, rough-handed and aged beyond her years.",
  },
  {
    q: "What does Mme Forestier reveal to Matilda at the end of the story?",
    opts: [
      "That she had known about the loss",
      "That the necklace was insured",
      "That the original necklace was only imitation and worth about five hundred francs",
      "That she had bought a new necklace",
    ],
    ans: 2,
    exp: "Mme Forestier is shocked to hear the story and tells Matilda that her necklace was fake, worth far less than the replacement.",
  },
  {
    q: "What is the main moral of 'The Necklace'?",
    opts: [
      "We should always be rich",
      "We should be satisfied with what we have and be honest",
      "We should never attend parties",
      "We should borrow more jewellery",
    ],
    ans: 1,
    exp: "The story teaches contentment and honesty; Matilda’s greed and refusal to tell the truth lead to needless suffering.",
  },
];

const necklaceMedium = [
  {
    q: "Why is Matilda described as 'suffering ceaselessly' in her modest home?",
    opts: [
      "Because she is ill",
      "Because her husband treats her badly",
      "Because she constantly compares her life with the rich and feels deprived",
      "Because she has no children",
    ],
    ans: 2,
    exp: "Matilda’s suffering is mainly mental; she daydreams of luxury and feels her simple surroundings to be unbearable, even though her husband is kind.",
  },
  {
    q: "What does M. Loisel’s reaction to the invitation card tell us about his character?",
    opts: [
      "He is proud and selfish",
      "He is simple, enthusiastic and wants to please his wife",
      "He is uninterested in parties",
      "He dislikes his job",
    ],
    ans: 1,
    exp: "He brings the invitation gladly, expecting it to delight her, showing he values simple pleasures and genuinely wants to make her happy.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"He was silent, stupefied, in dismay, at the sight of his wife weeping.\" \n\nWhy is M. Loisel so shocked here?",
    opts: [
      "Because Matilda is ill",
      "Because he cannot understand why she cries when he has brought home something he thought would please her",
      "Because he has lost his job",
      "Because he has forgotten her birthday",
    ],
    ans: 1,
    exp: "He expects her to be excited about the ball, but she weeps out of frustration over her clothes. Her reaction puzzles and saddens him.",
  },
  {
    q: "How does Matilda react to her husband’s suggestion of wearing fresh flowers instead of jewellery?",
    opts: [
      "She happily agrees",
      "She remains silent",
      "She laughs with joy",
      "She rejects the idea and mocks it as too poor",
    ],
    ans: 3,
    exp: "Matilda scoffs at the idea of wearing flowers, seeing them as a sign of poverty, which highlights her obsession with real jewels and appearances.",
  },
  {
    q: "Why is the Loisels’ decision not to tell Mme Forestier about losing the necklace unwise?",
    opts: [
      "Because Mme Forestier will never find out",
      "Because lies always impress people",
      "Because their pride leads them to choose secrecy, which makes them bear a heavy, unnecessary burden for ten years",
      "Because Matilda wants to become rich",
    ],
    ans: 2,
    exp: "If they had told the truth, the secret of the imitation necklace would have come out early and saved them from ten years of suffering.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"She now knew the horrible life of the needy.\" \n\nWhat changes in Matilda’s life does this line refer to?",
    opts: [
      "Her becoming famous",
      "Her starting a new business",
      "Her doing all domestic work herself and living in poverty to repay debts",
      "Her becoming a teacher",
    ],
    ans: 2,
    exp: "After buying the replacement necklace, she has to dismiss the maid, move to a smaller home and do heavy chores daily, tasting real hardship.",
  },
  {
    q: "How is Matilda’s pride responsible for her downfall?",
    opts: [
      "She refuses help from her husband",
      "She refuses to enjoy simple food",
      "She wants to appear rich at the ball and lies to Mme Forestier, leading to years of debt and loss of beauty",
      "She refuses to attend the ball at all",
    ],
    ans: 2,
    exp: "Her desire to be admired as a wealthy woman makes her borrow the necklace and then hide the truth, which brings long-term suffering.",
  },
  {
    q: "What does the necklace itself symbolise in the story?",
    opts: [
      "True wealth and happiness",
      "Simple living",
      "The illusion of wealth and the danger of valuing appearance over reality",
      "Honest friendship",
    ],
    ans: 2,
    exp: "The flashy necklace represents the fake glamour Matilda worships. It looks valuable but is actually fake, just like her idea of happiness.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"She was prettier than any other woman present, elegant, graceful, smiling and wild with joy.\" \n\nWhat does this description show about Matilda at the ball?",
    opts: [
      "That she is finally in the world she longed for and is intoxicated by attention",
      "That she is bored and tired",
      "That she wants to go home quickly",
      "That she regrets wearing the necklace",
    ],
    ans: 0,
    exp: "In that moment, she fully enjoys the luxury and admiration she craves, forgetting everything else and losing herself in the joy of being noticed.",
  },
  {
    q: "Why does Matilda avoid visiting Mme Forestier often before the ball?",
    opts: [
      "Because they had a quarrel",
      "Because Mme Forestier is unkind to her",
      "Because seeing her rich friend’s luxury makes Matilda feel more miserable and jealous",
      "Because Mme Forestier lives far away",
    ],
    ans: 2,
    exp: "Matilda feels that visiting Jeanne only reminds her of her own modest life and increases her frustration.",
  },
  {
    q: "How is M. Loisel’s character highlighted through his actions after the loss of the necklace?",
    opts: [
      "He blames his wife and abandons her",
      "He ignores the problem",
      "He patiently searches, borrows money, sacrifices his savings and works extra jobs to support Matilda and repay the debt",
      "He goes on a vacation",
    ],
    ans: 2,
    exp: "He proves to be a loving, responsible husband, taking most of the burden on himself without complaining or humiliating Matilda.",
  },
  {
    q: "Which of the following best describes Mme Forestier’s character as shown at the end?",
    opts: [
      "Cruel and selfish",
      "Proud and unforgiving",
      "Kind but unaware of the effect of her necklace on Matilda’s life",
      "Jealous of Matilda",
    ],
    ans: 2,
    exp: "Mme Forestier is shocked and sympathetic when she hears the truth; she had never imagined Matilda would hide the loss and suffer so much.",
  },
  {
    q: "Which of these themes is central to 'The Necklace'?",
    opts: [
      "The joy of giving",
      "The power of education",
      "The dangers of materialism and the importance of honesty and contentment",
      "The importance of sports",
    ],
    ans: 2,
    exp: "The story criticises excessive desire for luxury and warns against hiding the truth just to maintain appearances.",
  },
  {
    q: "How does the setting of Parisian middle-class life contribute to the story?",
    opts: [
      "It has no effect on the story",
      "It shows a world where social status and appearances matter greatly, feeding Matilda’s dissatisfaction",
      "It makes everyone rich and happy",
      "It focuses only on countryside life",
    ],
    ans: 1,
    exp: "The social environment of Paris, with its class divisions and emphasis on fashion, intensifies Matilda’s envy and her desire to appear wealthy.",
  },
  {
    q: "Why is the ending of 'The Necklace' often described as 'bitterly ironic'?",
    opts: [
      "Because Matilda becomes rich suddenly",
      "Because the necklace was lost again",
      "Because the Loisels suffer for ten years to replace a necklace that was fake and cheap, which they would have known if they had been honest",
      "Because Mme Forestier goes to prison",
    ],
    ans: 2,
    exp: "The twist that the original necklace was imitation reveals that all the sacrifice was needless, making the ending sharply ironic and tragic.",
  },
];

const necklaceHard = [
  {
    q: "ASSERTION (A): Matilda’s tragedy is caused more by her attitude than by her poverty.\nREASON (R): She allows her pride and desire for luxury to dictate her choices, such as borrowing the necklace and hiding the truth.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The story suggests that many of Matilda’s problems come from her mindset—her shame and pride—rather than from poverty alone, and the Reason directly explains this.",
  },
  {
    q: "ASSERTION (A): The Loisels’ decision to replace the necklace without telling Mme Forestier is presented as an act of courage.\nREASON (R): The story praises them for choosing hardship over confession.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The story shows their decision as driven by false pride rather than heroic courage, and the bitter irony of the ending criticises this choice rather than praising it.",
  },
  {
    q: "CASE-BASED: A teacher is discussing the theme 'appearance vs reality' using 'The Necklace'. Which example from the story BEST illustrates this theme?",
    opts: [
      "Matilda’s simple apartment",
      "The minister’s ball invitation card",
      "The necklace that appears to be costly diamonds but is actually imitation jewellery",
      "M. Loisel’s love of stew",
    ],
    ans: 2,
    exp: "The necklace itself looks like real diamonds but is fake, mirroring how Matilda’s outward glamour at the ball hides her true social position.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"She was one of those pretty and charming young women who are sometimes, as if by a mistake of destiny, born in a family of clerks.\" \n\nWhat deeper idea does this line convey?",
    opts: [
      "That she is actually a princess",
      "That she believes her beauty entitles her to a higher social status than she has",
      "That clerks cannot marry",
      "That beauty is useless",
    ],
    ans: 1,
    exp: "The line reflects Matilda’s own belief that she deserved a richer life and that her birth in a modest family is a kind of cruel accident.",
  },
  {
    q: "ASSERTION (A): The story is critical of the social system that values women mainly for their looks and clothes.\nREASON (R): Matilda’s worth at the ball is measured by the admiration she receives for her dress and jewellery.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "By showing how Matilda gains status for one night based solely on appearance, the story critiques a society that links a woman’s value to her display of wealth.",
  },
  {
    q: "From a feminist reading, how can Matilda’s situation be interpreted?",
    opts: [
      "As proof that women should not go to parties",
      "As showing how a woman’s happiness is tied to social expectations of beauty and wealth in a patriarchal society",
      "As showing that only men suffer from class pressure",
      "As proof that women are naturally greedy",
    ],
    ans: 1,
    exp: "Matilda’s obsession with beauty and luxury reflects societal pressures on women to appear glamorous to be valued, revealing gendered expectations rather than inherent greed.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"And she wept all day long, from chagrin, from regret, from despair and from distress.\" \n\nAfter the ball, what do these emotions mainly relate to?",
    opts: [
      "Her lost youth",
      "Her lost necklace and the fear of its consequences",
      "Her lost job",
      "Her lost friendship",
    ],
    ans: 1,
    exp: "Matilda’s intense emotional reaction is to discovering that the borrowed necklace is missing and to imagining the disaster that might follow.",
  },
  {
    q: "CASE-BASED: A student says, 'If Matilda had been honest and admitted the loss, Mme Forestier would have certainly ruined their reputation.' Which response is MOST in line with the story’s message?",
    opts: [
      "The student is clearly right; honesty always ruins relationships",
      "The story suggests that honesty might have saved them, because Mme Forestier later proves kind and the necklace was cheap imitation",
      "No one can ever forgive such a mistake",
      "Rich people never help the poor",
    ],
    ans: 1,
    exp: "Mme Forestier’s pity and the revelation about the fake necklace strongly imply that telling the truth might have resulted in far less harm than hiding it.",
  },
  {
    q: "ASSERTION (A): The ten years of hard labour bring a certain moral growth to Matilda.\nREASON (R): She becomes more realistic, less vain and able to face Mme Forestier and tell her the truth.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "By the end, Matilda is no longer dreaming of luxury. She has experienced real hardship and finds the courage to confess to Mme Forestier, showing some inner growth.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"They dismissed their maid; they changed their lodgings; they rented some rooms in a garret under the roof.\" \n\nWhich social reality does this line underline?",
    opts: [
      "Upward social mobility",
      "The ease of paying debts",
      "How a single financial disaster can push a middle-class family into near-poverty",
      "The joy of living simply",
    ],
    ans: 2,
    exp: "The move from a comfortable flat with a maid to a garret and heavy labour shows the fragility of their middle-class status.",
  },
  {
    q: "From a value-education standpoint, what is the MOST important lesson modern readers can learn from 'The Necklace'?",
    opts: [
      "That money is the only solution to all problems",
      "That it is essential to keep up appearances at any cost",
      "That excessive pride and dishonesty over material things can cause lifelong suffering",
      "That one should never attend social functions",
    ],
    ans: 2,
    exp: "Matilda’s life is ruined not by the lack of money alone but by her pride, materialism and lie. The story warns against such attitudes.",
  },
  {
    q: "CASE-BASED: Suppose the necklace had actually been real and very valuable. How would that MOST likely change the story’s message?",
    opts: [
      "It would then justify the Loisels’ suffering totally",
      "It would make the theme of appearance vs reality weaker, because there would be no revelation that the necklace was fake",
      "It would make Matilda happier",
      "It would remove the irony completely",
    ],
    ans: 1,
    exp: "If the necklace were real, the irony of needless sacrifice would vanish and the powerful contrast between seeming and reality would be reduced.",
  },
  {
    q: "ASSERTION (A): The ending focuses sympathy only on Matilda, not on M. Loisel.\nREASON (R): M. Loisel does not suffer as much as Matilda.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The story also shows M. Loisel working long hours and losing comfort. He silently shares her suffering, so the ending does not ignore his sacrifices.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"She had become the woman of impoverished households – strong, hard and rough.\" \n\nWhat deeper irony does this description carry?",
    opts: [
      "That Matilda now finally enjoys wealth",
      "That her dream of being admired for her beauty has ended in her losing that beauty through hard work",
      "That she now hates everyone",
      "That she prefers poverty",
    ],
    ans: 1,
    exp: "Matilda’s obsession with beauty and luxury leads to a life that destroys her looks and makes her look like the exact opposite of what she wanted to be.",
  },
  {
    q: "From a CBSE exam perspective, which combination of aspects is MOST likely to be tested together in a 5-mark question on 'The Necklace'?",
    opts: [
      "Only the price of the necklace and the number of guests at the ball",
      "Matilda’s character, the theme of materialism, and the irony of the ending",
      "Only the description of the ball hall",
      "Only M. Loisel’s love of hunting",
    ],
    ans: 1,
    exp: "Board questions often link character analysis (Matilda), central themes (materialism, contentment) and the ironic twist to assess deeper understanding.",
  },
];

const hackDriverPYQs = [
  {
    question: "Why did the young lawyer dislike his work in the city? Why was he happy to go to New Mullion?",
    answer: "The young lawyer worked as a junior assistant clerk in a big law firm, where his job was not to argue in court but to serve summons on people, often in dirty and dangerous parts of the city. He sometimes got abused or even beaten by those he served. He hated this unpleasant, humiliating work and even thought of running away. So when he was sent to New Mullion, a small country town, he felt happy and imagined it would be a sweet, simple village where life would be easier and more pleasant.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "Why was the lawyer sent to New Mullion? Who was he supposed to find there?",
    answer: "The lawyer was sent to New Mullion to serve a summons on a man named Oliver Lutkins. Lutkins was needed as a witness in a law case but had been ignoring all letters from the law firm. The firm wanted the lawyer to locate Lutkins and make sure he came to court, so his task in New Mullion was to find Lutkins and serve the legal papers on him.",
    year: 2023, marks: 2, difficulty: "easy",
  },
  {
    question: "Describe the hack driver whom the lawyer met at New Mullion station. What impression did he make on the lawyer?",
    answer: "At the station, the lawyer met a delivery man with a hack who introduced himself as Bill. He was about forty years old, had a red, cheerful face, and wore old, worn-out but comfortable clothes. His manner was friendly, open and humorous. To the lonely young lawyer, Bill seemed warm-hearted and helpful. The lawyer liked his easygoing nature and trusted him at once, believing that Bill was genuinely trying to help him find Lutkins.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How did the hack driver (Bill) describe Lutkins to the lawyer? What picture of Lutkins did he create?",
    answer: "Bill told the lawyer that Lutkins was a hard fellow to catch, always up to some mischief. He said Lutkins owed money to many people in the town, including Bill himself, and that he never paid anybody. He also mentioned that Lutkins played a lot of poker and was very good at deceiving people. In this way, Bill painted a picture of Lutkins as a tricky, slippery man who was always dodging creditors and hiding from people.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Bill and the lawyer spend their day searching for Lutkins in New Mullion?",
    answer: "Bill drove the lawyer around the town in his hack, claiming to know all of Lutkins’ usual haunts. They first went to Fritz’s shop, where Lutkins supposedly played poker, then to Gustaf’s barber shop and Gray’s shop, to the poolroom, and to several other places. In each place, Bill went in first to ask about Lutkins while the lawyer stayed outside or in the hack. They talked to various townspeople and collected amusing stories about Lutkins. At the end of the day, they even went to Lutkins’ mother’s farm, where a huge woman chased them with a hot iron in her hand. Despite all this, they never “found” Lutkins because Bill himself was Lutkins in disguise.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "Describe the incident at Lutkins’ mother’s house. How did it add to the lawyer’s impression of Bill?",
    answer: "At Lutkins’ mother’s house, Bill told the lawyer that she was a real terror and that they had to be careful. When they reached the farmyard, Bill went inside, but soon a large, angry woman with an iron in her hand came out, shouting and threatening them. She refused to tell them where Lutkins was and even chased them across the yard. Bill protected the lawyer by standing in front of him and steering him back to the hack, making the lawyer feel grateful and impressed by Bill’s courage and loyalty.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "Why was the lawyer impressed with Bill Magnuson by the end of the first day in New Mullion?",
    answer: "The lawyer was impressed because Bill seemed friendly, generous and full of warm, simple country wisdom. He shared stories about the villagers, entertained the lawyer with his jokes and clever remarks, and appeared to work hard to help him find Lutkins. The lawyer enjoyed Bill’s company so much that he came to like New Mullion and even thought that he would live more happily there with such people than in the city.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Why was the chief of the law firm angry when the lawyer returned from New Mullion? What decision did he take then?",
    answer: "The chief was angry because the lawyer had returned without serving the summons on Lutkins, even though he had spent a whole day and firm’s money in New Mullion. The firm needed Lutkins’ presence in court the next day, and the lawyer had failed in his duty. The chief scolded him for being careless and then decided to send him back to New Mullion, this time along with a man who had seen Lutkins before and would be able to identify him.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How did the lawyer finally come to know who the hack driver really was?",
    answer: "When the lawyer returned to New Mullion with a colleague who knew Lutkins, they went directly to the station. As they got off the train, the lawyer happily pointed out Bill, the hack driver, and said that he would help them. To his surprise, his companion laughed and told him that the man he called Bill was actually Oliver Lutkins himself. Later, the townspeople confirmed this and laughed at how Lutkins had driven the lawyer around all day while pretending to help him find “Lutkins”.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Lutkins and his mother react when the lawyer came back with another man and his true identity was revealed?",
    answer: "When the lawyer came back with a colleague from the firm, Lutkins and his mother did not show guilt or fear; instead they found the whole situation amusing. Lutkins and his mother laughed heartily at how completely the young lawyer had been fooled the previous day. Their laughter made the lawyer feel deeply embarrassed and humiliated, and he realised that his innocence and trust had turned him into a source of entertainment for them.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"Bill made me sound very important, and the woman was impressed. She looked at me with admiration.\" \n\nWhy does Bill do this, and what effect does it have on the narrator?",
    answer: "Bill describes the lawyer as a very important man from the city who has come on serious legal business, exaggerating his status in front of the villagers. He does this to flatter the lawyer, keep him pleased and maintain control over the situation while still deceiving him. The narrator is easily flattered and feels proud and respected, which makes him trust Bill even more and suspect nothing about Bill’s true identity.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"But he was no more dishonest than I.\" \n\nIn what sense does the narrator call himself as dishonest as the hack driver?",
    answer: "The narrator says this because he realises that, while Bill was tricking him, he himself was also charging the law firm for all his expenses in New Mullion, including the full cost of hiring Bill’s hack. He enjoyed the ride and pleasant company, instead of working carefully to find Lutkins. He feels that he, too, was happily using firm’s money and not doing his duty seriously, so he considers his own behaviour somewhat dishonest like Bill’s.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): The lawyer’s first visit to New Mullion fails to achieve its legal purpose but becomes a valuable learning experience.\nREASON (R): Being fooled by Lutkins teaches the lawyer not to judge people only by their friendly appearance.",
    answer: "Both Assertion (A) and Reason (R) are true, and the Reason correctly explains the Assertion. Legally, the trip fails because the summons is not served. However, the narrator learns an important life lesson: that charming manners and simple looks can hide deception, and that he should be more cautious and observant in future.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "What message about appearances and reality does Sinclair Lewis convey through the story 'The Hack Driver'?",
    answer: "The story shows that appearances can be deceptive and that a friendly, simple look does not guarantee honesty. The young lawyer trusts Bill because of his cheerful, open manner and the cosy picture of country life he presents. In reality, Bill is Lutkins, the very man avoiding the law, who cleverly uses his charm to mislead the lawyer and earn money from him. The story warns readers to be careful in judging people only by first impressions and to use their own judgment rather than blindly trusting others.",
    year: 2024, marks: 5, difficulty: "hard",
  },
  {
    question: "How does the story 'The Hack Driver' combine humour with a moral lesson?",
    answer: "The story is humorous because of the way Lutkins fools the innocent young lawyer, driving him all over New Mullion, talking about himself in the third person, and even involving his mother in the joke. The lawyer’s admiration for the very man he is supposed to catch adds to the comedy. At the same time, the story gives a moral lesson about not being naive, about judging people carefully, and about understanding that outward friendliness does not always equal sincerity. The lawyer’s embarrassment becomes a gentle warning to the reader.",
    year: 2022, marks: 5, difficulty: "hard",
  },
];

const hackDriverEasy = [
  {
    q: "Who is the author of 'The Hack Driver'?",
    opts: ["Guy de Maupassant", "H.G. Wells", "Sinclair Lewis", "Robert W. Peterson"],
    ans: 2,
    exp: "‘The Hack Driver’ is written by Sinclair Lewis, an American novelist. The other authors wrote different stories in the book.",
  },
  {
    q: "Who narrates the story 'The Hack Driver'?",
    opts: [
      "A judge",
      "A young lawyer working as a junior assistant clerk",
      "Oliver Lutkins",
      "Bill Magnuson",
    ],
    ans: 1,
    exp: "The narrator is a young lawyer who has just started his career in a law firm and is given the job of serving summons.",
  },
  {
    q: "Why is the lawyer sent to New Mullion?",
    opts: [
      "To open a new law office",
      "To serve a summons on Oliver Lutkins",
      "To attend a wedding",
      "To meet his relatives",
    ],
    ans: 1,
    exp: "He is sent specifically to find Oliver Lutkins and make him appear as a witness in a court case by serving legal papers.",
  },
  {
    q: "What does the lawyer first think about New Mullion before reaching there?",
    opts: [
      "That it will be noisy and crowded",
      "That it will be a sweet, simple and peaceful country village",
      "That it will be very dangerous",
      "That it will be full of factories",
    ],
    ans: 1,
    exp: "He imagines an ideal country town away from the unpleasant city, expecting it to be charming and quiet.",
  },
  {
    q: "Who befriends the lawyer at the New Mullion station?",
    opts: [
      "Oliver Lutkins",
      "Bill, a delivery man with a hack",
      "The station master",
      "The village postman",
    ],
    ans: 1,
    exp: "A friendly delivery man with a hack, calling himself Bill, comes forward to help the lawyer when he arrives.",
  },
  {
    q: "What does Bill offer to do for the lawyer?",
    opts: [
      "To take him back to the city",
      "To help him find Lutkins by driving him around the town",
      "To lend him money",
      "To show him tourist spots",
    ],
    ans: 1,
    exp: "Bill offers to take the lawyer in his hack to all the places where Lutkins is likely to be found.",
  },
  {
    q: "What is Bill’s real identity?",
    opts: [
      "He is actually the station master",
      "He is actually Oliver Lutkins himself",
      "He is a policeman",
      "He is the lawyer’s colleague",
    ],
    ans: 1,
    exp: "Bill, the hack driver, turns out to be Oliver Lutkins, the very man whom the lawyer is trying to locate.",
  },
  {
    q: "Which place do Bill and the lawyer visit first in search of Lutkins?",
    opts: ["The post office", "Fritz’s shop", "The railway station", "The church"],
    ans: 1,
    exp: "They first go to Fritz’s shop, where Bill says Lutkins often plays poker with friends.",
  },
  {
    q: "Why does the lawyer stay hidden when Bill goes into shops to ask for Lutkins?",
    opts: [
      "Because he is shy",
      "Because Bill tells him that Lutkins might run away if he sees someone in fancy city clothes",
      "Because he is tired",
      "Because he does not want to pay the bill",
    ],
    ans: 1,
    exp: "Bill convinces him that his city appearance will make Lutkins suspicious, so the lawyer hides while Bill pretends to ask around.",
  },
  {
    q: "Where do Bill and the lawyer go at the end of the day looking for Lutkins?",
    opts: [
      "To the police station",
      "To the market",
      "To Lutkins’ mother’s farm",
      "To the railway office",
    ],
    ans: 2,
    exp: "They finally visit Lutkins’ mother’s farmhouse, where they are chased away by a big woman believed to be Lutkins’ mother.",
  },
  {
    q: "How does the lawyer feel about Bill and New Mullion by the end of the first day?",
    opts: [
      "He hates both Bill and the village",
      "He feels Bill is rude and New Mullion is dull",
      "He is charmed by Bill’s friendliness and begins to like the village",
      "He wants to resign from his job immediately",
    ],
    ans: 2,
    exp: "The lawyer enjoys Bill’s company so much that he starts thinking of New Mullion as a pleasant place compared to the city.",
  },
  {
    q: "Why is the lawyer criticised by the chief of his firm after his first trip?",
    opts: [
      "Because he spent too much money",
      "Because he did not find Oliver Lutkins and failed to serve the summons",
      "Because he lost important documents",
      "Because he was late to the office",
    ],
    ans: 1,
    exp: "The entire purpose of the visit was to serve Lutkins; his failure means the firm’s work remains incomplete and urgent.",
  },
  {
    q: "Who accompanies the lawyer on his second visit to New Mullion?",
    opts: [
      "Bill",
      "The chief of the firm",
      "A colleague who knows Lutkins’ face",
      "The station master",
    ],
    ans: 2,
    exp: "This time, the firm sends another man who has actually seen Lutkins and can identify him immediately.",
  },
  {
    q: "Where does the lawyer meet Bill/Lutkins again on his second visit?",
    opts: [
      "At the farm",
      "At Fritz’s shop",
      "At the railway station",
      "At the court",
    ],
    ans: 2,
    exp: "As soon as he gets off the train, he sees Bill at the station and points him out, which leads to the truth being revealed.",
  },
  {
    q: "What is the main comic twist in the story?",
    opts: [
      "The lawyer quits his job",
      "Bill, the helpful hack driver, is actually Oliver Lutkins himself who has been fooling the lawyer all day",
      "Lutkins never existed",
      "The summons is cancelled",
    ],
    ans: 1,
    exp: "The humour arises from the fact that the narrator spends a whole day with Lutkins, praising him, without realising who he really is.",
  },
];

const hackDriverMedium = [
  {
    q: "Why does the narrator compare his job to that of 'a cheap private detective'?",
    opts: [
      "Because he has to investigate crimes",
      "Because he is paid very little by the firm",
      "Because serving summons forces him to chase people in unpleasant places, sometimes risking abuse and violence",
      "Because he loves detective stories",
    ],
    ans: 2,
    exp: "He must track down unwilling people in dirty, shadowy corners of the city, which feels like low-level detective work rather than respectable legal work.",
  },
  {
    q: "What makes the narrator trust Bill so quickly?",
    opts: [
      "Bill shows him his identity card",
      "Bill offers him free services",
      "Bill’s friendly manner, open smile and simple country talk make the narrator feel he is honest and kind",
      "Bill is recommended by the police",
    ],
    ans: 2,
    exp: "The narrator, tired of city people, is charmed by Bill’s warmth and assumes that such a cheerful, rustic man must be trustworthy.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"He told me, ‘I don’t want to interfere with your work, but I like you, and I want to help you.’\" \n\nWhat is ironic about this statement by Bill?",
    opts: [
      "He genuinely wants to help the lawyer for free",
      "He actually interferes a lot and misleads the lawyer while earning money from him",
      "He is a policeman in disguise",
      "He wants to become a lawyer himself",
    ],
    ans: 1,
    exp: "Bill pretends to be helpful, but his 'help' is really a trick to hide his identity and earn hack charges for a whole day.",
  },
  {
    q: "Why does Bill say that Lutkins will be suspicious of the lawyer’s 'fancy clothes'?",
    opts: [
      "Because Lutkins hates fashion",
      "Because Lutkins recognises city people and may run away if he sees a stranger in formal clothes",
      "Because the lawyer’s clothes are dirty",
      "Because people in New Mullion never wear clothes",
    ],
    ans: 1,
    exp: "Bill uses this excuse to keep the lawyer hidden, so that he alone talks to people and stays in control of the search.",
  },
  {
    q: "How does the lawyer feel about his own behaviour after discovering the truth about Bill?",
    opts: [
      "Proud of his cleverness",
      "Amused and unconcerned",
      "Ashamed of his gullibility and hurt that he was so easily fooled by a friendly stranger",
      "Angry only at Lutkins’ mother",
    ],
    ans: 2,
    exp: "He feels foolish and humiliated when everyone laughs, and realises that he was naïve to trust appearances so blindly.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"I was beaten several times by the larger and stronger ones.\" \n\nWhat does this line reveal about the narrator’s experience in his job?",
    opts: [
      "That his job is glamorous",
      "That serving summons often puts him in dangerous situations where people react violently",
      "That he is a boxer",
      "That he enjoys fighting",
    ],
    ans: 1,
    exp: "The line shows that his routine work involves physical risk and humiliation, contributing to his dislike of the job.",
  },
  {
    q: "Why does the narrator describe his encounter with Bill as 'my first and last day in New Mullion'?",
    opts: [
      "Because he never wants to work again",
      "Because his firm transfers him",
      "Because after being fooled, he never returns there in his career and remembers the incident permanently",
      "Because New Mullion is destroyed",
    ],
    ans: 2,
    exp: "The experience is so memorable and embarrassing that it becomes a unique, one-time event in his professional life.",
  },
  {
    q: "What quality in Bill (Lutkins) impresses the narrator the most during their search?",
    opts: [
      "His wealth",
      "His education",
      "His cheerful helpfulness, sense of humour and apparent concern for the narrator",
      "His honesty about money",
    ],
    ans: 2,
    exp: "Bill appears genuinely concerned and friendly, telling jokes and stories, which wins the narrator’s heart despite being fake.",
  },
  {
    q: "How does the story highlight the theme 'appearances can be deceptive'?",
    opts: [
      "By showing city people are always honest",
      "By showing the lawyer is very clever",
      "By showing that the simple, friendly hack driver is actually the cunning Oliver Lutkins deceiving the narrator",
      "By showing the village is richer than the city",
    ],
    ans: 2,
    exp: "The contrast between Bill’s friendly appearance and his trickery is at the core of the story’s message.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"I was so happy with Bill that I told him if I had been a writer, I would have written a book about him.\" \n\nWhat does this statement show about the narrator’s feelings at that time?",
    opts: [
      "He is suspicious of Bill",
      "He is bored with Bill",
      "He admires Bill so much that he sees him as a hero worthy of a story",
      "He wants to leave immediately",
    ],
    ans: 2,
    exp: "The narrator is completely taken in by Bill’s charm and sees him as a symbol of the warm, simple country life he yearns for.",
  },
  {
    q: "Why does the narrator later call himself 'a fool' in the story?",
    opts: [
      "Because he forgot his papers",
      "Because he wasted his own money",
      "Because he trusted Bill entirely, let him lead the search, and never doubted that Bill was Lutkins himself",
      "Because he lost the summons",
    ],
    ans: 2,
    exp: "He realises that a bit of independent questioning and cross-checking could have prevented him from being deceived.",
  },
  {
    q: "What is the significance of Bill’s business name 'William Magnuson Fancy Carting and Hacking'?",
    opts: [
      "It shows he owns a big company",
      "It is proof that he is honest",
      "It adds humour by making a small-town hack driver sound grand and respectable",
      "It proves he is Lutkins’ friend",
    ],
    ans: 2,
    exp: "The fancy name contrasts with his casual, rustic appearance and adds to the comic tone of the story.",
  },
  {
    q: "How does the story present the contrast between city life and village life from the narrator’s point of view?",
    opts: [
      "He finds village life more dangerous",
      "He hates both equally",
      "He finds city life dirty and hostile, while village life seems warm and friendly because of people like Bill",
      "He never compares them",
    ],
    ans: 2,
    exp: "The narrator initially sees the town and Bill as a refreshing change from the harsh city, though he later discovers that deception exists in both places.",
  },
  {
    q: "Why is the story titled 'The Hack Driver' and not 'Oliver Lutkins'?",
    opts: [
      "Because Lutkins is unimportant",
      "Because the lawyer never meets Lutkins",
      "Because it is through the figure of the hack driver that the whole deception and humour unfold, and only later we learn he is Lutkins",
      "Because the story is about a cab business",
    ],
    ans: 2,
    exp: "The twist depends on the hack driver’s identity; focusing on him keeps the reader aligned with the narrator’s limited perspective until the end.",
  },
  {
    q: "What lesson does the narrator learn from his experience with Bill/Lutkins?",
    opts: [
      "To never visit villages again",
      "To always dislike friendly people",
      "To be more careful in judging people and to rely on his own observation instead of blindly trusting others",
      "To quit his job",
    ],
    ans: 2,
    exp: "His embarrassment teaches him to be more alert, less naïve and more professional in future assignments.",
  },
];

const hackDriverHard = [
  {
    q: "ASSERTION (A): The narrator’s failure in New Mullion is due more to his own inexperience than to Lutkins’ cleverness.\nREASON (R): The narrator lets Bill control the search, stays hidden, and never independently verifies information from other villagers.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Lutkins is clever, but the narrator’s passivity and blind trust are what make the deception possible; the Reason explains his failure.",
  },
  {
    q: "ASSERTION (A): The hack driver is completely evil and heartless.\nREASON (R): He cheats the lawyer only for money and has no positive qualities.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The story portrays Lutkins as mischievous and dishonest but also humorous and friendly. He is not shown as entirely heartless, making the Assertion false.",
  },
  {
    q: "CASE-BASED: A teacher wants to use 'The Hack Driver' to illustrate the proverb 'All that glitters is not gold.' Which aspect of the story BEST fits this proverb?",
    opts: [
      "The lawyer’s law firm",
      "The city’s tall buildings",
      "Bill’s friendly and simple behaviour, which hides his identity as the very man escaping the law",
      "The lawyer’s fancy clothes",
    ],
    ans: 2,
    exp: "Bill’s outward charm masks deception, demonstrating that appealing appearances can hide dishonest motives.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"They had allowed themselves to be fooled by a man who had been laughing at them all the time.\" \n\nWho does 'they' refer to, and what is the tone of this line?",
    opts: [
      "They = villagers; tone: angry",
      "They = the lawyer and his colleague; tone: humorous but critical of their naivety",
      "They = Lutkins and his mother; tone: sad",
      "They = the law firm; tone: fearful",
    ],
    ans: 1,
    exp: "The narrator and his companion realise they have been made a joke of; the line carries amused self-criticism and embarrassment.",
  },
  {
    q: "ASSERTION (A): The story celebrates village life as superior to city life.\nREASON (R): People in New Mullion are honest and respectful, while city people are all rude.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "Although the narrator initially prefers the village, the story shows that villagers can also deceive. It does not claim that village life is morally superior in every way.",
  },
  {
    q: "From a character point of view, what does Bill/Lutkins’ behaviour tell us about human nature?",
    opts: [
      "That people are always cruel",
      "That people cannot be trusted at all",
      "That some people enjoy outsmarting others and can mix kindness with trickery for amusement and gain",
      "That all villagers are dishonest",
    ],
    ans: 2,
    exp: "Lutkins is not purely evil; he enjoys playing a clever prank and making money, showing a mix of humour, self-interest and deceit.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"I was a bright, fresh graduate who had his eyes on a respectably paying position in a big city.\" \n\nHow does the incident in New Mullion affect this ambition?",
    opts: [
      "It makes him instantly successful",
      "It leads him to hate law forever",
      "It humbles him, showing that bookish success does not guarantee practical wisdom, and that he still has much to learn",
      "It has no effect on him",
    ],
    ans: 2,
    exp: "The experience reveals his lack of street-smartness despite his academic brilliance, teaching him a lesson in real-world judgment.",
  },
  {
    q: "CASE-BASED: A counsellor wants to discuss 'professional responsibility' using this story. Which point should they highlight MOST?",
    opts: [
      "Professionals can always rely on clients",
      "Enjoyment on duty is more important than results",
      "A professional must verify facts personally and not surrender their task entirely to others, no matter how charming",
      "It is fine to hide behind others when doing work",
    ],
    ans: 2,
    exp: "The lawyer’s failure lies in handing over his responsibility to Bill without independent checking, a key lesson about professional conduct.",
  },
  {
    q: "ASSERTION (A): The story suggests that experience is a better teacher than formal education alone.\nREASON (R): The narrator learns more about human behaviour from this single incident than from his law books.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "His practical humiliation teaches him about trust and appearances in a way classroom study never did, supporting both statements.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"I even began to think of practicing law in New Mullion.\" \n\nIn light of the later events, why is this thought ironic?",
    opts: [
      "Because New Mullion has no court",
      "Because he actually hates villages",
      "Because he is thinking of settling in a place where he has just been thoroughly fooled and laughed at",
      "Because he becomes a doctor instead",
    ],
    ans: 2,
    exp: "His rosy view of the town is shattered soon after; the reader sees that his plan is based on a complete misunderstanding.",
  },
  {
    q: "From a CBSE value-education perspective, which lesson is MOST clearly conveyed by 'The Hack Driver'?",
    opts: [
      "Always distrust everyone, even genuine people",
      "Appearances, however friendly, must be tested by careful observation and independent judgment",
      "Never work hard at your job",
      "Village life is always better than city life",
    ],
    ans: 1,
    exp: "The story does not promote total distrust, but it clearly advises against blind trust in outward behaviour.",
  },
  {
    q: "CASE-BASED: The lawyer calls his training period 'unpleasant'. How could it still be considered valuable?",
    opts: [
      "Because he earned a lot of money",
      "Because he passed his exams easily",
      "Because these difficult experiences, including being fooled, taught him practical skills, caution and resilience needed in legal practice",
      "Because he enjoyed being beaten",
    ],
    ans: 2,
    exp: "Harsh experiences often provide the real-world wisdom needed for a successful professional life, making the training valuable despite discomfort.",
  },
  {
    q: "ASSERTION (A): Lutkins’ mother’s behaviour at the farm is part of the deception.\nREASON (R): Her aggressive act supports the story that Lutkins is hiding and makes the search look genuine to the lawyer.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Her role adds realism to the trick; by acting hostile, she convinces the lawyer that she is shielding a runaway son, deepening the illusion.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"The only consolation he got from his chief was: ‘I wish you had cut Lutkins instead of butter’!\" (paraphrased)\nWhat does this remark suggest about the chief’s attitude?",
    opts: [
      "He is empathetic and gentle",
      "He finds the situation amusing but also criticises the lawyer’s softness and lack of sharpness",
      "He plans to reward the lawyer",
      "He wants to quit his job",
    ],
    ans: 1,
    exp: "The chief’s comment mixes humour and rebuke—he implies that the lawyer has been too soft and easily deceived, like butter.",
  },
  {
    q: "From an exam point of view, which combination of aspects is MOST likely to appear together in a 5-mark CBSE question on 'The Hack Driver'?",
    opts: [
      "Only city description",
      "Only the price of the hack",
      "Character sketch of Lutkins/Bill, the narrator’s gullibility, and the theme of deceptive appearances",
      "Only the name of the town",
    ],
    ans: 2,
    exp: "CBSE long-answer questions usually focus on characters plus theme, especially how the narrator is fooled by Lutkins’ pose as the hack driver.",
  },
];

const bholiPYQs = [
  {
    question: "Why was Sulekha called 'Bholi'? What was unusual about her childhood?",
    answer: "Sulekha was called 'Bholi' because she was slow, simple and timid, and people thought she had little sense. As a child she fell from her cot and injured her brain, which made her mentally slow. Later she got smallpox that left her face and body full of pockmarks. She began speaking very late and stammered badly, so others mocked her and treated her as a useless child.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "Why was Bholi’s father worried about her future?",
    answer: "Ramlal, Bholi’s father, was worried because Bholi was neither beautiful nor clever like his other children. Her pockmarked face, stammering and dullness made her seem unsuitable for marriage in their conservative village society. He knew that finding a groom who would accept her would be very difficult and feared she would remain a burden on the family.",
    year: 2023, marks: 2, difficulty: "easy",
  },
  {
    question: "For what unusual reason was Bholi sent to school?",
    answer: "When the girls’ primary school opened, the Tehsildar asked Ramlal, the village Numberdar, to set an example by sending his daughters to school. Ramlal’s wife opposed sending the elder daughters, fearing it would spoil their marriage prospects. However, they decided to send Bholi because they thought she would never get married anyway due to her looks and stammer. Thus she was sent to school not for her benefit, but to satisfy the Tehsildar and lighten the parents’ burden.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Bholi feel on her first day at school? How did her teacher change this?",
    answer: "On the first day Bholi was terrified. She had never been to school before, she stammered when asked her name and burst into tears, afraid of being laughed at again. However, the teacher spoke to her kindly, smiled, patted her and encouraged her to speak slowly. She praised even Bholi’s halting answers and gave her hope that she could become an educated, respected person. This warmth transformed Bholi’s fear into a new confidence and desire to learn.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "What role does Bholi’s teacher play in her transformation?",
    answer: "Bholi’s teacher is the first person to treat her with respect, affection and patience. She speaks gently, urges Bholi to overcome her stammer, and tells her that with education she will become more learned than anyone in the village. Her encouragement, smile and promise that nobody will laugh at her in school give Bholi self-worth and courage. Over the years, this supportive guidance helps Bholi grow from a fearful, silent girl into a confident young woman who can stand up for herself.",
    year: 2024, marks: 5, difficulty: "hard",
  },
  {
    question: "How was Bholi treated at home before she started going to school?",
    answer: "At home Bholi was neglected and taken for granted. She wore old, handed-down clothes of her sisters, was not bathed regularly and her hair was never properly combed. Her parents and siblings considered her a simpleton and often spoke of her as a burden. Unlike the other children, she received neither affection nor attention, which further lowered her confidence and made her feel unwanted.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Who was Bishamber Nath? Why did Bholi’s parents accept his proposal eagerly?",
    answer: "Bishamber Nath was a middle-aged, lame grocer from another village, with grown-up children. When he proposed to marry Bholi, he demanded no dowry at first. Bholi’s parents saw this as a rare chance to get their 'ugly' and stammering daughter married. Since Bishamber was unaware of Bholi’s defects and seemed socially respectable, they eagerly accepted his proposal, believing it would secure her future.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "What happened at Bholi’s wedding when the groom saw her face? How did he behave?",
    answer: "At the wedding, when Bishamber lifted the garland to place it around Bholi’s neck, he suddenly saw her pockmarked face clearly. He drew back in shock and anger, saying that he would marry such a girl only if he was given five thousand rupees as dowry. In this way, he insulted Bholi publicly and tried to exploit her parents’ helplessness, revealing his greed and selfishness.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Describe Bholi’s reaction when Bishamber demanded dowry at the marriage ceremony.",
    answer: "Bholi, who had been standing silently, suddenly found her voice and courage. Even after her father placed the money at Bishamber’s feet, she refused to marry him. She tore off the garland and told him clearly that she would not marry a greedy, cowardly man who made fun of her and sold himself for dowry. She publicly rejected him, shocking everyone and proving that she was no longer the timid 'Bholi' they once knew.",
    year: 2023, marks: 5, difficulty: "hard",
  },
  {
    question: "How did Bholi reassure her father after she refused the marriage with Bishamber?",
    answer: "When her father, Ramlal, collapsed in despair, thinking no one would ever marry Bholi now, she gently touched his hand and comforted him. She told him not to worry and promised that she would serve him and her mother in their old age and look after them. She also declared that she would work as a teacher in the same school that had transformed her. This assurance shows her maturity, gratitude and sense of responsibility.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"In time you will be more learned than anyone else in the village. Then no one will dare to laugh at you.\" \n\nWho speaks these words and how do they influence Bholi?",
    answer: "These words are spoken by Bholi’s teacher on her first day at school. Hearing them, Bholi feels hope for the first time. She realises that education can change how others see her and give her respect. The teacher’s faith in her power to learn plants the seed of confidence in Bholi’s mind and motivates her to study sincerely and overcome her fear.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"‘Pitaji!’ Bholi shouted in a voice that was not hers.\" \n\nWhat change in Bholi is revealed in this moment?",
    answer: "This moment shows Bholi’s transformation from a shy, stammering girl into a bold, confident young woman. The voice 'that was not hers' signifies that she is no longer the fearful child who could not even say her own name. She now speaks firmly and clearly in front of the whole gathering, challenging an unjust demand and defending her self-respect.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): Bholi’s refusal to marry Bishamber Nath is the climax of her transformation.\nREASON (R): Through education and her teacher’s support, Bholi learns to value her self-respect more than social approval.",
    answer: "Both Assertion (A) and Reason (R) are true, and the Reason correctly explains the Assertion. Bholi’s bold rejection of a greedy groom, even at the cost of remaining unmarried, shows that she now understands her own worth. This courage comes from the confidence and self-respect she gained in school under her teacher’s loving guidance.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the story 'Bholi' highlight the importance of education for girls?",
    answer: "The story shows that education can transform a neglected, fearful girl into a confident and independent woman. Before schooling, Bholi is mocked, ignored and considered a burden. After going to school, she gains knowledge, self-confidence and a sense of dignity. Education enables her to question injustice, refuse a dowry-based marriage and choose a life of self-respect and service. Thus, the story powerfully demonstrates that educating girls empowers them to fight social evils and stand on their own feet.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "What social message does K.A. Abbas convey through the character of Bholi?",
    answer: "Through Bholi, the writer condemns gender discrimination, dowry and the cruel treatment of girls considered less 'perfect' in looks or intelligence. He shows how society often neglects such girls and sees them as burdens. At the same time, he emphasises that with love and education, they can become strong and self-reliant. Bholi’s final stand against dowry and her decision to work as a teacher send a strong message that every girl has potential and deserves respect and equal opportunities.",
    year: 2024, marks: 5, difficulty: "hard",
  },
];

const bholiEasy = [
  {
    q: "Who is the author of the story 'Bholi'?",
    opts: ["Guy de Maupassant", "K.A. Abbas", "H.G. Wells", "Sinclair Lewis"],
    ans: 1,
    exp: "‘Bholi’ is written by K.A. Abbas, an Indian writer and filmmaker. The other authors wrote different stories in the same book.",
  },
  {
    q: "What is Bholi’s real name?",
    opts: ["Sulekha", "Radha", "Savita", "Shanta"],
    ans: 0,
    exp: "Her real name is Sulekha. She is nicknamed 'Bholi' because of her simple, slow nature.",
  },
  {
    q: "What physical ailment did Bholi suffer from in childhood that affected her brain?",
    opts: ["She had a high fever", "She fell from her cot", "She met with an accident", "She was born blind"],
    ans: 1,
    exp: "Bholi fell off her cot when she was ten months old, injuring a part of her brain, which made her slow.",
  },
  {
    q: "Which disease left Bholi’s face and body covered with pockmarks?",
    opts: ["Measles", "Smallpox", "Chickenpox", "Leprosy"],
    ans: 1,
    exp: "She was attacked by smallpox at the age of two, leaving her permanently disfigured with pockmarks.",
  },
  {
    q: "Why did Bholi’s parents think she had little chance of getting married?",
    opts: [
      "Because she was too educated",
      "Because she was very proud",
      "Because of her pockmarked face and stammering speech",
      "Because she wanted to be a teacher",
    ],
    ans: 2,
    exp: "Her looks and speech defect made her seem undesirable in their traditional marriage market.",
  },
  {
    q: "What was Bholi’s father’s profession?",
    opts: ["Farmer", "Shopkeeper", "Numberdar (village revenue official)", "Teacher"],
    ans: 2,
    exp: "Ramlal was the Numberdar of the village, a government revenue official.",
  },
  {
    q: "Why was Bholi sent to school?",
    opts: [
      "To make her a teacher",
      "To keep her away from home",
      "To satisfy the Tehsildar and because her parents felt she would never marry anyway",
      "Because her sisters insisted",
    ],
    ans: 2,
    exp: "Her parents thought sending her would do no harm to her marriage prospects and would please the Tehsildar.",
  },
  {
    q: "How did Bholi speak when she was a child?",
    opts: [
      "Clearly and quickly",
      "She could not speak at all",
      "She stammered and broke down in the middle of words",
      "She spoke many languages",
    ],
    ans: 2,
    exp: "She began speaking late and stammered badly, which made others laugh at her.",
  },
  {
    q: "What was Bholi’s first reaction on entering the school?",
    opts: [
      "She ran back home happily",
      "She was nervous and scared",
      "She started teaching others",
      "She fell asleep",
    ],
    ans: 1,
    exp: "She had never been to school before, so she felt frightened and uneasy in the new environment.",
  },
  {
    q: "Who encouraged Bholi to overcome her fear and stammering at school?",
    opts: ["Her mother", "Her father", "Her teacher", "Her sister"],
    ans: 2,
    exp: "Her kind and patient teacher gave her confidence and encouraged her to speak slowly without fear.",
  },
  {
    q: "What is the name of Bholi’s prospective groom?",
    opts: ["Bishamber Nath", "Ramlal", "Tehsildar Sahib", "Pandit Kali Charan"],
    ans: 0,
    exp: "Bishamber Nath, a middle-aged grocer, is chosen as Bholi’s groom.",
  },
  {
    q: "What physical disability did Bishamber Nath have?",
    opts: ["He was blind", "He was deaf", "He was lame", "He was mute"],
    ans: 2,
    exp: "Bishamber Nath limped; he was lame in one leg.",
  },
  {
    q: "How much dowry did Bishamber demand on seeing Bholi’s face at the wedding?",
    opts: ["One thousand rupees", "Two thousand rupees", "Five thousand rupees", "Ten thousand rupees"],
    ans: 2,
    exp: "He suddenly demanded five thousand rupees as dowry when he noticed her pockmarked face.",
  },
  {
    q: "What profession does Bholi finally choose for herself?",
    opts: ["Doctor", "Lawyer", "Teacher", "Shopkeeper"],
    ans: 2,
    exp: "She decides to become a teacher in the same village school that changed her life.",
  },
  {
    q: "What does the name 'Bholi' literally suggest?",
    opts: ["Beautiful", "Wise", "Simple / foolish", "Strong"],
    ans: 2,
    exp: "In Hindi, 'Bholi' implies someone innocent, simple or easily fooled, reflecting how people saw her.",
  },
];

const bholiMedium = [
  {
    q: "Why did Bholi’s mother agree to send only Bholi to school and not her other daughters?",
    opts: [
      "Because Bholi was the eldest",
      "Because Bholi herself insisted on going",
      "Because she believed sending girls to school would spoil their chances of marriage, but Bholi had little chance anyway",
      "Because the teacher requested Bholi specifically",
    ],
    ans: 2,
    exp: "The mother felt education would harm marriage prospects, but since Bholi was considered unmarriageable, she allowed only her to go.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"She had never been talked to gently like this. She had never been called ‘my child’ by anyone before.\" \n\nWhat effect does this have on Bholi?",
    opts: [
      "It makes her more frightened",
      "It confuses her and she runs away",
      "It touches her heart deeply and opens her up to trust the teacher",
      "It makes her angry",
    ],
    ans: 2,
    exp: "The teacher’s kindness is new for Bholi; it breaks through her fear and helps her feel valued and safe.",
  },
  {
    q: "Why does the teacher tell Bholi that no one will laugh at her in school?",
    opts: [
      "Because she will punish anyone who laughs",
      "Because children never laugh",
      "Because she wants to reassure Bholi that school is a place of encouragement, not ridicule",
      "Because Bholi will never speak",
    ],
    ans: 2,
    exp: "The teacher promises protection and a supportive environment, contrasting with the mockery Bholi experiences at home.",
  },
  {
    q: "How does education gradually change Bholi’s personality?",
    opts: [
      "She becomes more violent",
      "She becomes lazy",
      "She gains confidence, learns to speak without fear, and develops a sense of self-worth",
      "She becomes proud and insults others",
    ],
    ans: 2,
    exp: "Schooling and the teacher’s support help Bholi overcome her stammer and realise her own value, making her bold and self-respecting.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"Her eyes were shining with a new hope, and a new life.\" \n\nWhat moment in Bholi’s life does this line describe?",
    opts: [
      "When she is born",
      "When she falls from the cot",
      "When she leaves school",
      "When she hears her teacher’s encouraging words on the first day of school",
    ],
    ans: 3,
    exp: "After the teacher’s kindness and promise about education, Bholi begins to imagine a better future for herself.",
  },
  {
    q: "Why do Bholi’s parents consider Bishamber’s proposal a 'good' match?",
    opts: [
      "Because he is young and handsome",
      "Because he is educated",
      "Because he is from a rich family and initially asks for no dowry, despite knowing nothing about Bholi’s defects",
      "Because he lives in the same village",
    ],
    ans: 2,
    exp: "They think it is rare that a man with a shop and some wealth, from another village, is willing to marry Bholi without dowry.",
  },
  {
    q: "How is the hypocrisy of Bishamber Nath revealed in the story?",
    opts: [
      "He refuses to get married",
      "He gives money to the poor",
      "He agrees to marry Bholi without dowry but, when he sees her pockmarks, demands five thousand rupees, showing greed and cruelty",
      "He loves Bholi",
    ],
    ans: 2,
    exp: "His change of mind at the last moment exposes his greed and lack of genuine acceptance of Bholi.",
  },
  {
    q: "Why does Bholi refuse to marry Bishamber after the dowry demand is met?",
    opts: [
      "Because she wants a bigger dowry",
      "Because she suddenly hates marriage",
      "Because she realises that a man who insults her and sells himself for money does not deserve her respect",
      "Because she wants to marry someone else in the crowd",
    ],
    ans: 2,
    exp: "Her self-respect, built through education, makes her reject a greedy, unjust man even after her father pays the dowry.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"‘What a shameless girl! We all came to your wedding and you have shamelessly thrown us down.’\" \n\nWhat does this reaction from the villagers show?",
    opts: [
      "They support Bholi’s bold stand",
      "They are progressive and modern",
      "They care more about social custom and show than about justice and Bholi’s dignity",
      "They do not understand what is happening",
    ],
    ans: 2,
    exp: "The villagers criticise Bholi for breaking the marriage, showing their mindset that values ceremony over a girl’s self-respect.",
  },
  {
    q: "Why does Bholi feel that she will never be a burden to her parents, even if she remains unmarried?",
    opts: [
      "Because she plans to move away",
      "Because she intends to study further and work as a teacher, earning enough to support herself and her parents",
      "Because she will win a lottery",
      "Because she has rich relatives",
    ],
    ans: 1,
    exp: "Her education has made her economically and emotionally independent; she can now take care of her parents instead of depending on a husband.",
  },
  {
    q: "How is Bholi’s mother portrayed in the story?",
    opts: [
      "As fully supportive of Bholi from the beginning",
      "As ignorant, harsh and more worried about social image and marriage than about Bholi’s feelings",
      "As highly educated and modern",
      "As someone who never thinks about marriage",
    ],
    ans: 1,
    exp: "The mother neglects Bholi and agrees to send her to school only because she thinks Bholi is a burden, reflecting conservative attitudes.",
  },
  {
    q: "What contrast does the story draw between Bholi’s earliest self and her later self?",
    opts: [
      "From rich to poor",
      "From clever to foolish",
      "From a shy, stammering, neglected child to a confident, educated young woman who can speak up for her rights",
      "From friendly to cruel",
    ],
    ans: 2,
    exp: "The central arc of the story is Bholi’s inner transformation through education and kindness.",
  },
  {
    q: "Which of the following best captures the main theme of 'Bholi'?",
    opts: [
      "The joy of wealth",
      "The importance of physical beauty",
      "The power of education and self-respect in fighting social evils like dowry and discrimination",
      "The value of silence",
    ],
    ans: 2,
    exp: "The story strongly highlights how education can empower a girl to oppose injustice and claim her dignity.",
  },
  {
    q: "How does Bholi’s teacher feel at the end of the story when Bholi refuses the marriage?",
    opts: [
      "Angry with Bholi",
      "Embarrassed",
      "Proud and satisfied that her pupil has become courageous and independent",
      "Indifferent",
    ],
    ans: 2,
    exp: "The teacher’s eyes fill with tears of joy because Bholi has lived up to the promise of education and self-respect.",
  },
  {
    q: "What does the story suggest about society’s attitude towards girls with disabilities or different looks?",
    opts: [
      "They are always respected",
      "They are usually pampered",
      "They are often neglected, mocked and treated as burdens, unless empowered by education and support",
      "They never go to school",
    ],
    ans: 2,
    exp: "Bholi’s early life shows how such girls are sidelined; only education and a caring teacher help her break this pattern.",
  },
];

const bholiHard = [
  {
    q: "ASSERTION (A): Bholi’s parents send her to school out of genuine concern for her education.\nREASON (R): They believe that education will empower her to become independent.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "They send Bholi mainly to satisfy the Tehsildar and because they think she won’t marry anyway. Genuine belief in her empowerment comes later through the teacher, not the parents.",
  },
  {
    q: "ASSERTION (A): Bholi’s transformation is mainly the result of her teacher’s compassion and the education she receives.\nREASON (R): Her teacher offers her respect, encouragement and a safe space to learn, which she never received at home.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The teacher’s kindness and school environment directly trigger Bholi’s change, making both statements true and linked.",
  },
  {
    q: "CASE-BASED: A social worker uses 'Bholi' to talk about dowry. Which incident from the story is MOST powerful for this purpose?",
    opts: [
      "Bholi’s fall from the cot",
      "Bholi’s first day at school",
      "Bishamber demanding five thousand rupees and Bholi boldly rejecting the marriage",
      "Ramlal getting promoted",
    ],
    ans: 2,
    exp: "The public dowry demand and Bholi’s refusal highlight how dowry degrades women and how an educated girl can stand against it.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"‘If I do not go to school, what will happen to me?’\" (paraphrased)\nWhat does this thought reveal about Bholi’s growing awareness?",
    opts: [
      "She wants to avoid school",
      "She has begun to see school as her chance for a better future",
      "She is worried about exams",
      "She wants to escape from home forever",
    ],
    ans: 1,
    exp: "Bholi realises that education is her only hope of escaping lifelong humiliation and gaining some respect.",
  },
  {
    q: "ASSERTION (A): Bholi remains a passive victim of circumstances till the end of the story.\nREASON (R): She quietly accepts Bishamber despite his dowry demand.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The Reason is false; Bholi actively rejects Bishamber and his dowry demand, proving she is no longer passive.",
  },
  {
    q: "From a feminist perspective, what does Bholi’s refusal to marry Bishamber symbolise?",
    opts: [
      "Hatred of all men",
      "Rejection of marriage as an institution",
      "A woman’s right to choose dignity over a socially 'secure' but humiliating alliance",
      "Support for dowry",
    ],
    ans: 2,
    exp: "Her stand shows that a woman need not accept an abusive or greedy partner just to be considered 'settled'; she can choose self-respect.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"‘I will serve you and my mother. And I will teach in the same school where I have learnt so much.’\" \n\nWhat aspects of Bholi’s character are highlighted here?",
    opts: [
      "Her selfishness and anger",
      "Her gratitude, sense of duty, and desire to be independent through education",
      "Her laziness and dependence",
      "Her desire for revenge against Bishamber",
    ],
    ans: 1,
    exp: "She expresses gratitude to her parents and school, decides to support them, and chooses a respectable career, showing maturity and independence.",
  },
  {
    q: "CASE-BASED: A student claims, 'Bholi’s family background leaves her no room for choice.' How does the story itself disprove this statement?",
    opts: [
      "By showing that her parents are very modern",
      "By showing that education allows Bholi to exercise choice, rejecting Bishamber and choosing her own path as a teacher",
      "By showing that the Tehsildar arranges her marriage",
      "By showing that she is forced to marry Bishamber",
    ],
    ans: 1,
    exp: "Despite a restrictive background, Bholi’s schooling gives her the courage to refuse an unjust marriage and shape her own future.",
  },
  {
    q: "ASSERTION (A): The villagers and relatives at Bholi’s wedding fully support her when she refuses the dowry-based marriage.\nREASON (R): They value a girl’s self-respect more than social customs.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "Most villagers criticise Bholi for breaking the marriage. The story shows that society often puts customs above a girl’s dignity.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"‘Yes, you are right, father. You will not have to worry about me any more.’\" \n\nIn the context of the story, what deeper meaning does this reply carry?",
    opts: [
      "That she wants to leave home",
      "That she will marry another old man soon",
      "That she will rely on education and hard work, not a husband, to take care of herself and her parents",
      "That she hates her family",
    ],
    ans: 2,
    exp: "Her words signal a shift from dependence on marriage to self-reliance through education and employment.",
  },
  {
    q: "From a value-education standpoint, which quality in Bholi is MOST responsible for her final act of courage?",
    opts: [
      "Physical strength",
      "Blind obedience",
      "Her inner self-respect, nourished by education and her teacher’s faith in her",
      "Fear of society",
    ],
    ans: 2,
    exp: "She refuses to be treated like an object; her self-esteem, built through learning and encouragement, drives her brave decision.",
  },
  {
    q: "CASE-BASED: A counsellor wants to encourage parents to educate their daughters using 'Bholi'. Which argument from the story is MOST convincing?",
    opts: [
      "Educated girls will always marry rich men",
      "Education will remove all poverty instantly",
      "Education can turn even a neglected, shy girl into a confident person who can resist injustice and support her family",
      "Education is only needed for boys",
    ],
    ans: 2,
    exp: "Bholi’s journey shows how education equips her to fight dowry and care for her parents, making it a powerful model for empowerment.",
  },
  {
    q: "ASSERTION (A): The story 'Bholi' criticises society’s obsession with physical beauty in deciding a girl’s value.\nREASON (R): Both Bholi’s neglect and Bishamber’s sudden demand for dowry are directly linked to her looks.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The narrative exposes how appearance influences treatment at home and in marriage, and uses this to critique such shallow judgments.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"Her heart was throbbing with a new hope and a new life.\" \n\nIn terms of the story’s structure, this line marks:",
    opts: [
      "The climax of the plot",
      "The resolution of the conflict",
      "The beginning of Bholi’s inner transformation through education",
      "The introduction of Bishamber",
    ],
    ans: 2,
    exp: "This occurs early, on her first day at school; it signals the turning point when Bholi starts changing from within.",
  },
  {
    q: "From a CBSE exam perspective, which combination is MOST likely to be asked in a 5-mark question on 'Bholi'?",
    opts: [
      "Only Bholi’s smallpox details",
      "Only the description of the Tehsildar’s visit",
      "Bholi’s character development, the role of her teacher, and the social message against dowry and discrimination",
      "Only Bishamber’s shop",
    ],
    ans: 2,
    exp: "Board questions usually combine character sketch, transformation, and thematic elements like education and dowry to test deeper understanding.",
  },
];

const bookSavedEarthPYQs = [
  {
    question: "Why was the twentieth century called the ‘Era of the Book’?",
    answer: "The twentieth century is called the ‘Era of the Book’ because people had books on almost every topic—from anteaters to Zulus. Books told them what to do, how to do it, when and why to do it. They were used to explain, educate, direct and even decorate, so they dominated human life in that period.",
    year: 2024, marks: 2, difficulty: "easy",
  },
  {
    question: "In what way is the play set in the future but about events from the past?",
    answer: "The frame of the play is set in the twenty-fifth century, in the Museum of Ancient History, where a Historian addresses the audience about a strange event in the twentieth century. She turns on a hysteroscope to show what happened in the year 2040, when Martians almost invaded Earth. Thus, the action we watch is a flashback from the future to the past.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Who is Think‑Tank? How does he see himself and Earth at the beginning of the play?",
    answer: "Think‑Tank is the great and mighty ruler of Mars, with a huge egg‑shaped head and a robe decorated with stars and circles. He boasts about his intelligence and considers himself the most brilliant creature in the universe. He looks down on Earth, calling it a primitive, insignificant ‘ball of mud’, and thinks Earthlings are foolish and inferior to Martians.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Who is Noodle? How is he different from Think‑Tank?",
    answer: "Noodle is Think‑Tank’s apprentice and assistant. Unlike the arrogant Think‑Tank, Noodle is polite, modest and genuinely intelligent. He observes carefully, thinks logically and often gives the right suggestions, but presents them humbly as ‘insignificant’ ideas so that Think‑Tank does not feel offended. In this way, he represents practical wisdom and real intelligence in contrast to Think‑Tank’s empty pride.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Why did Think‑Tank send a space probe to Earth? Who were the members of the crew?",
    answer: "Think‑Tank sent a space probe to Earth to collect information about Earthlings before invading their planet. He wanted to know how advanced or dangerous they were. The probe was commanded by Captain Omega, assisted by Lieutenant Iota and Sergeant Oop. This small Martian crew was ordered to land on Earth, observe it closely and report back to Think‑Tank.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "How did the Martian crew first interpret the books they found in the library on Earth?",
    answer: "When the Martians landed in a public library, they had never seen books before. Sergeant Oop thought the books were sandwiches because they were rectangular and flat, and he even tried to eat one. Think‑Tank also called them ‘sandwiches’ at first. Later, on Noodle’s suggestion, he guessed that the books might be a form of communication device, like ear‑phones or eye‑communication instruments to be read.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "What book did the Martians begin to read, and why was it important?",
    answer: "The Martians took down a children’s book called ‘Mother Goose’ from the shelf, thinking it might contain important information. It was actually a collection of nursery rhymes. Because Think‑Tank completely misunderstood the simple rhymes as secret military codes and records of Earth’s power, this book frightened him and made him cancel his invasion. That is why the book is said to have ‘saved the Earth’.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Think‑Tank misinterpret the rhyme 'Hey diddle diddle' from the book Mother Goose?",
    answer: "When the crew read out ‘Hey diddle diddle, the cat and the fiddle, the cow jumped over the moon’, Think‑Tank took it literally. He imagined that Earthlings had trained animals like cows to jump over the moon, which meant they were far ahead in space travel. He saw the ‘little dog laughing’ and ‘dish running away with the spoon’ as signs that even their pets and utensils were advanced. This terrified him and made him believe Earthlings had great powers.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "How did Think‑Tank interpret the rhyme 'Humpty Dumpty'? Why did it frighten him?",
    answer: "In ‘Humpty Dumpty sat on a wall, Humpty Dumpty had a great fall’, Think‑Tank saw himself as Humpty Dumpty because of his egg‑shaped head. He thought Earthlings had already identified him and were planning to break him, since the rhyme talks about a fall and nobody being able to put Humpty together again. He took it as a direct threat to his own safety, which made him panic and order an immediate retreat.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "How did Noodle cleverly handle Think‑Tank’s mistakes without offending him?",
    answer: "Whenever Think‑Tank made a wrong guess, Noodle would not contradict him directly. Instead, he would present his own ideas humbly, saying, ‘Forgive me, your highness, I have a suggestion’. He would call his ideas ‘insignificant’ or ‘ridiculous’ so that Think‑Tank could adopt them without feeling his authority challenged. In this way, he managed to correct Think‑Tank and guide him, while still appearing obedient and respectful.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"They can’t be sandwiches. They are not green.\" \n\nWhat does this line show about the Martians’ understanding of books and Earth’s objects?",
    answer: "This line, spoken when Oop tries to eat a book, shows how completely ignorant the Martians are about books and earthly things. They have never seen books and judge them only by shape and colour, thinking of them as food. Their confusion creates humour and also suggests how dangerous it is to make assumptions about another culture without real knowledge.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the extract and answer the question.\n\n\"Noodle: Forgive me, your cleverness, but I have a very small doubt.\" \n\nWhat does this line reveal about Noodle’s way of speaking to Think‑Tank?",
    answer: "The line shows that Noodle is extremely tactful. He flatters Think‑Tank by calling him ‘your cleverness’, and belittles his own doubt as ‘very small’. He uses polite, humble language so that he can question or correct Think‑Tank’s ideas without hurting his ego. This careful way of speaking allows Noodle to influence decisions while keeping his superior pleased.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): Think‑Tank calls off the Martian invasion and orders an evacuation of Mars.\nREASON (R): He believes, after misreading nursery rhymes, that Earthlings are technologically superior and planning to attack Mars.",
    answer: "Both Assertion (A) and Reason (R) are true, and the Reason correctly explains the Assertion. Think‑Tank’s wild interpretations of simple rhymes convince him that Earth has powerful space weapons and that they have already discovered his identity. Afraid of being destroyed, he cancels the invasion and even shifts the Martian headquarters far away.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the play highlight the importance of books and knowledge?",
    answer: "In the play, a simple book of nursery rhymes—‘Mother Goose’—ends up saving the Earth from a Martian invasion. The Martians mistake the rhymes for secret codes and become frightened, showing that books can influence even powerful enemies. Through the Historian’s opening speech about the ‘Era of the Book’ and the central incident, the playwright suggests that books preserve knowledge, shape understanding, and can even protect a civilisation in unexpected ways.",
    year: 2024, marks: 5, difficulty: "hard",
  },
  {
    question: "What is the central message of 'The Book That Saved the Earth'?",
    answer: "The play conveys that incomplete or half‑baked knowledge can be dangerous and lead to foolish decisions. The Martians, especially Think‑Tank, judge Earth by a few misunderstood lines of nursery rhymes and end up terrified of harmless children’s songs. At the same time, the play celebrates books and real intelligence (as shown by Noodle) and gently mocks arrogance and blind authority. It reminds us to approach other cultures with humility and to think carefully before jumping to conclusions.",
    year: 2022, marks: 5, difficulty: "hard",
  },
];

const bookSavedEarthEasy = [
  {
    q: "Who is the author of the play 'The Book That Saved the Earth'?",
    opts: ["Guy de Maupassant", "Claire Boiko", "K.A. Abbas", "H.G. Wells"],
    ans: 1,
    exp: "‘The Book That Saved the Earth’ is a humorous science‑fiction play written by Claire Boiko for the Class 10 supplement.",
  },
  {
    q: "Who narrates the story at the beginning of the play?",
    opts: ["Think‑Tank", "Noodle", "A Historian", "Captain Omega"],
    ans: 2,
    exp: "A Historian from the twenty‑fifth century introduces the story in a museum, explaining how a book once saved the Earth.",
  },
  {
    q: "Which planet do Think‑Tank and his crew come from?",
    opts: ["Jupiter", "Earth", "Venus", "Mars"],
    ans: 3,
    exp: "Think‑Tank is the ruler of Mars, and all the main alien characters in the play are Martians.",
  },
  {
    q: "What is the name of the Martian ruler?",
    opts: ["Think‑Tank", "Humpty Dumpty", "Omega", "Iota"],
    ans: 0,
    exp: "The Martian leader is called the Great and Mighty Think‑Tank, known for his egg‑shaped head and boastful nature.",
  },
  {
    q: "What is the name of Think‑Tank’s clever assistant?",
    opts: ["Omega", "Iota", "Oop", "Noodle"],
    ans: 3,
    exp: "Noodle is the apprentice who quietly guides Think‑Tank with sensible suggestions.",
  },
  {
    q: "Where does the Martian space probe land on Earth?",
    opts: ["In a jungle", "In a public library", "In a school", "In a farm field"],
    ans: 1,
    exp: "The Martian crew lands in a big public library, surrounded by shelves of books that they do not understand.",
  },
  {
    q: "Which book finally 'saves' the Earth from the Martian invasion?",
    opts: ["A science textbook", "An atlas", "A book of nursery rhymes called 'Mother Goose'", "A history book"],
    ans: 2,
    exp: "The nursery rhyme book 'Mother Goose' is misunderstood by Think‑Tank as a dangerous secret document.",
  },
  {
    q: "What does Sergeant Oop first think the books are?",
    opts: ["Weapons", "Sandwiches", "Radio sets", "Blankets"],
    ans: 1,
    exp: "Because of their shape, he mistakes the books for sandwiches and even tries to eat one.",
  },
  {
    q: "In which century are the events of the Martian invasion supposed to take place?",
    opts: ["20th century", "21st century", "22nd century", "25th century"],
    ans: 1,
    exp: "The Martians plan to invade Earth in the twenty‑first century, around the year 2040, as the Historian explains.",
  },
  {
    q: "What position does Omega hold in the Martian crew?",
    opts: ["Ruler of Mars", "Captain of the space probe", "Assistant", "Historian"],
    ans: 1,
    exp: "Omega is the Captain of the Martian space probe sent to Earth.",
  },
  {
    q: "What does Think‑Tank first call the books when he sees them through the space screen?",
    opts: ["Jewels", "Sandwiches", "Computers", "Bombs"],
    ans: 1,
    exp: "He assumes they are ‘sandwiches’ because he sees Martians handling them as if they might be food.",
  },
  {
    q: "What does Think‑Tank call Earth at the beginning of the play?",
    opts: ["A great planet", "A scientific wonder", "An insignificant ball of mud", "The centre of the universe"],
    ans: 2,
    exp: "He mocks Earth as a ‘primitive ball of mud’, believing Earthlings are not intelligent.",
  },
  {
    q: "Which nursery rhyme line makes Think‑Tank believe Earthlings can send cows over the moon?",
    opts: [
      "Humpty Dumpty sat on a wall",
      "Hey diddle diddle, the cat and the fiddle, the cow jumped over the moon",
      "Jack and Jill went up the hill",
      "Twinkle, twinkle, little star",
    ],
    ans: 1,
    exp: "The rhyme ‘Hey diddle diddle… the cow jumped over the moon’ is taken literally by Think‑Tank.",
  },
  {
    q: "What shape is Think‑Tank’s head described as?",
    opts: ["Square", "Round", "Egg‑shaped", "Triangle"],
    ans: 2,
    exp: "He has a huge egg‑shaped head, which later makes the Humpty Dumpty rhyme feel like a personal threat to him.",
  },
  {
    q: "Why is the play titled 'The Book That Saved the Earth'?",
    opts: [
      "Because books were destroyed",
      "Because all books were banned",
      "Because a book of rhymes confused the Martians and made them cancel their invasion",
      "Because books were written on Mars",
    ],
    ans: 2,
    exp: "The nursery rhyme book Mother Goose scares Think‑Tank into retreating, thus 'saving' the Earth from attack.",
  },
];

const bookSavedEarthMedium = [
  {
    q: "Why was the twentieth century called the 'Era of the Book' in the play?",
    opts: [
      "Because people stopped reading",
      "Because books were used for learning, guidance and decoration in almost every field of life",
      "Because there was only one book",
      "Because books were all about space travel",
    ],
    ans: 1,
    exp: "The Historian explains that there were books on everything, and they taught people how, when and why to do things, which is why that era was dominated by books.",
  },
  {
    q: "How does Noodle correct Think‑Tank’s errors without angering him?",
    opts: [
      "By shouting at him",
      "By ignoring his mistakes",
      "By presenting his own ideas as 'insignificant' suggestions and flattering Think‑Tank’s intelligence",
      "By going against his orders openly",
    ],
    ans: 2,
    exp: "Noodle uses tactful language, calling his ideas unimportant and praising Think‑Tank, so the latter accepts new ideas without feeling insulted.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"Iota: Sir, I can’t figure out what these are.\" \n\nWhat difficulty are the Martians facing here?",
    opts: [
      "They cannot understand human language",
      "They do not recognise books and are confused about what books are used for",
      "They cannot breathe on Earth",
      "They cannot use their machines",
    ],
    ans: 1,
    exp: "Landing in a library, they see books for the first time and do not know whether they are food, tools or communication devices.",
  },
  {
    q: "Which of the following is NOT one of Think‑Tank’s guesses about the books?",
    opts: [
      "That the books are sandwiches to eat",
      "That the books are communication devices for the ear",
      "That the books are eye‑communication devices to read",
      "That the books are living animals",
    ],
    ans: 3,
    exp: "He calls them sandwiches, then communication devices, then eye‑communication devices, but never suggests that they are animals.",
  },
  {
    q: "Why does Noodle suggest that the crew take 'vitamin pills' before reading the book?",
    opts: [
      "Because they are hungry",
      "Because Martians cannot read otherwise",
      "Because he cleverly uses Think‑Tank’s own idea that vitamins improve intelligence, to persuade him to let the crew 'eat' the sandwiches slowly and decode them",
      "Because the pills contain the meaning of the book",
    ],
    ans: 2,
    exp: "Noodle adapts Think‑Tank’s belief in vitamin intelligence to switch from eating pages to actually reading and understanding them.",
  },
  {
    q: "How does Think‑Tank interpret the line 'the dish ran away with the spoon'?",
    opts: [
      "As a joke",
      "As a sign that Earthlings have developed runaway dishes and spoons after meals",
      "As a love story",
      "As a cooking instruction",
    ],
    ans: 1,
    exp: "He imagines Earthlings have objects that can move on their own, making him think their technology is advanced and strange.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"Think‑Tank: Mirror, mirror, in my hand. Who is the most intelligent creature in the land?\" \n\nWhat does this parody of a famous line reveal about Think‑Tank?",
    opts: [
      "He is modest and shy",
      "He is deeply insecure about his intelligence and seeks constant confirmation of his superiority",
      "He hates mirrors",
      "He does not like nursery rhymes",
    ],
    ans: 1,
    exp: "By echoing 'Who is the fairest of them all?', he shows vanity and the need to be told he is the cleverest.",
  },
  {
    q: "What is Noodle’s role in the final decision to evacuate Mars?",
    opts: [
      "He opposes Think‑Tank",
      "He secretly helps Earth",
      "He supports Think‑Tank’s decision to escape and suggests moving to Alpha Centauri, showing he can act quickly in a crisis",
      "He arrests Think‑Tank",
    ],
    ans: 2,
    exp: "Noodle follows orders but also provides a practical plan to relocate Mars’s headquarters to a distant star system.",
  },
  {
    q: "How does the Historian in the play emphasise the importance of the book 'Mother Goose'?",
    opts: [
      "By calling it a scientific encyclopedia",
      "By saying it gave Earthlings new weapons",
      "By explaining that this ordinary rhyme book changed the course of history by frightening the Martians",
      "By saying it was burned",
    ],
    ans: 2,
    exp: "She explains that a simple nursery rhyme book unexpectedly saved the Earth, turning it into a historic object kept in the museum.",
  },
  {
    q: "Why are the Martian crew members—Omega, Iota, Oop—unable to understand the nursery rhymes correctly?",
    opts: [
      "Because the book is damaged",
      "Because they do not know English",
      "Because they interpret everything literally and have no cultural context for Earth’s children’s rhymes",
      "Because they are illiterate on Mars",
    ],
    ans: 2,
    exp: "They take metaphors and nonsense imagery as facts, misreading playful lines as dangerous war information.",
  },
  {
    q: "What does Think‑Tank’s reaction to the Humpty Dumpty rhyme show about his character?",
    opts: [
      "That he is brave",
      "That he is calm and wise",
      "That he is superstitious, self‑centred and easily frightened when he thinks his own safety is at risk",
      "That he wants to visit Earth",
    ],
    ans: 2,
    exp: "He personalises the rhyme, sees himself as Humpty Dumpty, and immediately panics, revealing his cowardice beneath the boasting.",
  },
  {
    q: "Which of the following best describes Noodle’s relationship with Think‑Tank?",
    opts: [
      "Hostile and argumentative",
      "Openly rebellious",
      "Respectful but quietly corrective, acting as the real brain behind the throne",
      "Completely passive with no ideas of his own",
    ],
    ans: 2,
    exp: "Noodle is loyal yet uses his own intelligence to guide Think‑Tank away from foolish decisions.",
  },
  {
    q: "Why can the play be called a satire?",
    opts: [
      "Because it has no message",
      "Because it seriously praises war",
      "Because it humorously criticises arrogance, half‑knowledge and blind faith in authority through the character of Think‑Tank",
      "Because it is a tragedy",
    ],
    ans: 2,
    exp: "The play uses humour and exaggeration to mock foolish pride and the dangers of acting on incomplete information.",
  },
  {
    q: "What does the play suggest about the future of books?",
    opts: [
      "That books will disappear completely",
      "That books will become weapons",
      "That even if other media appear, books will remain important as stores of knowledge and culture",
      "That only Mars will use books",
    ],
    ans: 2,
    exp: "Though told from a future era, the Historian reminds us that books played a crucial, even world‑saving role.",
  },
  {
    q: "How does the misunderstanding of simple nursery rhymes lead to a major decision in the play?",
    opts: [
      "It encourages Martians to befriend Earth",
      "It makes Think‑Tank decide that Earth is harmless",
      "It convinces Think‑Tank that Earth is extremely dangerous, causing him to cancel the invasion and flee",
      "It has no effect",
    ],
    ans: 2,
    exp: "Each misread rhyme adds to Think‑Tank’s fear, culminating in his order to withdraw and relocate, thereby saving Earth.",
  },
];

const bookSavedEarthHard = [
  {
    q: "ASSERTION (A): The play shows that little knowledge can be more dangerous than no knowledge.\nREASON (R): Think‑Tank’s half‑understood ideas about Earth books and rhymes lead him to absurd but serious decisions about war and evacuation.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Think‑Tank’s limited, confused understanding of books makes him misjudge Earth’s power. This illustrates how incomplete knowledge can cause panic and wrong choices.",
  },
  {
    q: "ASSERTION (A): Noodle is portrayed as more intelligent than Think‑Tank.\nREASON (R): Noodle’s suggestions actually guide the interpretation of books and shape the final decision, though he always pretends they are insignificant.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Noodle consistently provides the accurate, logical understanding, while Think‑Tank merely adopts those ideas proudly.",
  },
  {
    q: "CASE-BASED: A teacher wants to discuss 'leadership and real intelligence' using this play. Which contrast is MOST appropriate to highlight?",
    opts: [
      "Earth vs Mars",
      "Historian vs Omega",
      "Think‑Tank’s empty show of intelligence vs Noodle’s quiet, practical wisdom",
      "Books vs computers",
    ],
    ans: 2,
    exp: "The play repeatedly contrasts Think‑Tank’s boastfulness with Noodle’s genuine problem‑solving ability.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"Noodle: I have an idea, your mightiness, but I’m sure it is ridiculous.\" \n\nWhy does Noodle call his own idea 'ridiculous'?",
    opts: [
      "Because it really is a foolish idea",
      "Because he has no confidence",
      "Because he wants Think‑Tank to feel superior and adopt the idea without feeling challenged",
      "Because the crew will laugh at him",
    ],
    ans: 2,
    exp: "Noodle protects Think‑Tank’s ego by downplaying his ideas, a clever strategy that lets truth be accepted without conflict.",
  },
  {
    q: "ASSERTION (A): The Martians’ misinterpretation of nursery rhymes is purely comic and has no serious implication.\nREASON (R): Their misunderstanding only creates humour and does not affect any major decision.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The misunderstandings are funny, but they lead directly to the cancellation of the invasion and evacuation of Mars, a very serious consequence.",
  },
  {
    q: "From a satire point of view, what does Think‑Tank’s fear of 'Humpty Dumpty' symbolise?",
    opts: [
      "Respect for Earth’s literature",
      "A wise leader’s caution",
      "The vulnerability of arrogant rulers who see threats everywhere when they feel personally targeted",
      "The bravery of Martian soldiers",
    ],
    ans: 2,
    exp: "His personal identification with Humpty Dumpty shows how fragile ego and status can be among dictatorial leaders.",
  },
  {
    q: "CASE-BASED: A student claims, 'Noodle is just a servant with no real power.' Which evidence from the play MOST strongly disproves this?",
    opts: [
      "Noodle makes jokes about Earth",
      "Noodle brings food to Think‑Tank",
      "Noodle’s ideas shape every major re‑interpretation of the books and even the plan to move to Alpha Centauri",
      "Noodle never speaks in the play",
    ],
    ans: 2,
    exp: "Though officially a junior, Noodle’s suggestions drive the plot, showing that influence can exist without formal authority.",
  },
  {
    q: "ASSERTION (A): The play suggests that books may outlast electronic media as sources of wisdom.\nREASON (R): In the twenty‑fifth century, people no longer know what books are.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 2,
    exp: "The Historian clearly values books and preserves one as a museum treasure. However, the second statement is false; people in the future still understand books.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"Think‑Tank: Noodle, contact the invasion fleet. Tell them to prepare for immediate evacuation. I will take no chances.\" \n\nWhat does this command reveal about Think‑Tank’s character?",
    opts: [
      "He is a brave warrior",
      "He is cautious to the point of cowardice, quickly retreating based on misunderstood information",
      "He is scientifically careful",
      "He enjoys exploring Earth",
    ],
    ans: 1,
    exp: "He reacts with panic and over‑caution, abandoning his invasion without verifying the reality of Earth’s power.",
  },
  {
    q: "From a value‑education perspective, what key lesson does the play offer about dealing with other cultures or planets?",
    opts: [
      "Assume they are weaker",
      "Invade them quickly",
      "Avoid making decisions based on stereotypes and surface impressions; seek real understanding first",
      "Never read their books",
    ],
    ans: 2,
    exp: "The Martians’ ignorance about Earth’s culture leads to absurd interpretations; the play encourages informed, respectful study instead.",
  },
  {
    q: "CASE-BASED: A counsellor uses the play to warn against overconfidence. Which scene best supports this warning?",
    opts: [
      "The Historian’s introduction",
      "Think‑Tank boasting about his intelligence and mocking Earth, only to flee in fear after misreading a nursery rhyme book",
      "The crew landing in the library",
      "Noodle listening quietly",
    ],
    ans: 1,
    exp: "Think‑Tank’s downfall from arrogant leader to frightened escapee is a direct example of overconfidence crashing into reality.",
  },
  {
    q: "ASSERTION (A): The title 'The Book That Saved the Earth' is literal rather than symbolic.\nREASON (R): The book physically destroys the Martians’ weapons.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The book saves Earth in a symbolic sense by affecting the Martians’ minds; it does not physically destroy anything.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"Books are man’s best friends. They never leave you in trouble.\" \n\nHow does the play provide a humorous literal example of this proverb?",
    opts: [
      "By showing books talking",
      "By showing books walking away",
      "By showing that a simple book of rhymes literally keeps Earth out of the 'trouble' of invasion",
      "By showing books being destroyed",
    ],
    ans: 2,
    exp: "Here, a proverb about companionship becomes almost literal: a book actually prevents a planetary crisis.",
  },
  {
    q: "From a CBSE exam perspective, which combination of aspects is MOST likely to be asked together in a 5‑mark question on this chapter?",
    opts: [
      "Only the description of the library",
      "Only the list of Martian names",
      "Character sketch of Think‑Tank and Noodle, plus the theme that incomplete knowledge is dangerous and books are powerful",
      "Only the explanation of one nursery rhyme",
    ],
    ans: 2,
    exp: "Board questions typically combine character analysis with central themes like misuse of half‑knowledge and the role of books.",
  },
];

const howToTellWildAnimalsPYQs = [
  {
    question: "How is the Asian lion described in the poem? How, according to the poet, can you identify it?",
    answer: "The Asian lion is described as a large and tawny (yellowish‑brown) beast that roams in the jungles of the East. The poet humorously says that if such an animal advances towards you and roars so loudly that you feel you are 'dyin’', then you can be sure that it is the Asian lion you have met.",
    year: 2024, marks: 2, difficulty: "easy",
  },
  {
    question: "How does the poet suggest we recognise a Bengal tiger? Why does she call it a 'noble wild beast'?",
    answer: "The poet says that if, while roaming in the jungle, you are greeted by a noble wild beast with black stripes on a yellow ground and he calmly eats you, then you can identify him as the Bengal tiger. She calls it 'noble' because, in her humorous description, it appears dignified and grand in appearance, even though it kills its prey.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "How can you identify a leopard according to the poem? What does the poet say will happen if it leaps on you?",
    answer: "The leopard is described as an animal with pepper‑like spots all over its body. The poet says that if such a spotted beast 'lept' at you in a flash while you walk in the forest, and then keeps on 'lep‑ing' again and again, you will know that it is a leopard. Even if you cry with pain, the leopard will not stop attacking you.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What is meant by a 'bearhug' in the poem? Is the bear’s hug friendly or dangerous?",
    answer: "In the poem, a 'bearhug' refers to the way a bear attacks: it throws both arms around you and hugs you tightly. The word 'hug' normally suggests affection, but here it is used humorously and ironically. The bear’s hug is not friendly at all; it is so strong that it can crush a person and kill him.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the poet distinguish between a hyena and a crocodile?",
    answer: "The poet says that a hyena is the one that 'laughs' while it eats you, referring to its strange, laughter‑like cry. A crocodile, on the other hand, is said to 'weep' while swallowing its victims, alluding to the expression 'crocodile tears' – false or insincere tears. Thus, if the animal seems to be laughing, it is a hyena; if it seems to be crying, it is a crocodile.",
    year: 2020, marks: 3, difficulty: "medium",
  },
  {
    question: "What does the poet tell us about the chameleon in the last stanza? Why is it so difficult to see?",
    answer: "The poet says that a chameleon is a small creature like a lizard, without ears or wings, which lives on a tree. It can change its colour to match its surroundings. So, if you look at a tree and see nothing on it, the poet jokes that it must be a chameleon you see, because it has blended so perfectly with the tree that it becomes almost invisible.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the poet use humour and exaggeration in describing the ways to identify wild animals?",
    answer: "The poet humorously suggests that we can identify animals by the way they kill us: the lion roars as we are 'dyin’', the tiger 'eats' us, the leopard keeps 'lep‑ing' on us, the bear gives a deadly hug, the hyena laughs while eating us, and the crocodile cries as it swallows us. This exaggerated, impossible 'method' of identification creates comic effect while also hinting at the danger of wild animals.",
    year: 2024, marks: 5, difficulty: "hard",
  },
  {
    question: "Explain the use of incorrect spellings like 'dyin’', 'lept' and 'lep' in the poem. Why has the poet used them?",
    answer: "The poet intentionally uses forms like 'dyin’', 'lept' and 'lep' to create rhyme and rhythm and to add a playful tone. 'Dyin’' is used to rhyme with 'lion' when pronounced colloquially, while 'lept' and 'lep' are shaped to echo the sound of 'leopard'. These spellings contribute to the musicality of the poem and enhance its light‑hearted, humorous style.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "The poet calls the poem a guide to 'tell' wild animals. Is it a serious guide? Give reasons.",
    answer: "No, it is not a serious guide at all. The poet pretends to give practical rules for identifying wild animals, but each rule involves the reader being attacked, eaten or crushed by the animal, which is clearly absurd. The tone, rhymes and playful language show that the poem is a humorous, nonsense‑style description meant to entertain rather than to instruct real travellers.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "What picture of wild animals does the poem create for the reader—fearful or amusing? Justify your answer.",
    answer: "The poem deals with dangerous wild animals like lions, tigers, leopards, bears, hyenas, crocodiles and chameleons, so there is an underlying sense of danger. However, the poet describes them in such a playful, exaggerated and tongue‑in‑cheek way that they appear more amusing than frightening. The comic situations, such as recognising a tiger only when it eats you, make the reader laugh rather than feel scared.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "Extract-based: Read the lines and answer the question.\n\n\"Just notice if he eats you.\nThis simple rule may help you learn\nThe Bengal Tiger to discern.\" \n\nExplain the humour in these lines.",
    answer: "The poet says that to identify a Bengal tiger you should observe whether he eats you. This is humorous because if the tiger has already eaten you, there is no question of 'learning' anything. The 'simple rule' is useless in real life but funny as exaggeration. It mocks the idea of giving calm advice in a situation where the listener is in mortal danger.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the lines and answer the question.\n\n\"If when you’re walking round your yard\nYou meet a creature there,\nWho hugs you very, very hard,\nBe sure it is a Bear.\" \n\nHow does the poet create irony in these lines?",
    answer: "The poet uses the word 'hug'—normally a loving, friendly action—to describe a bear’s deadly attack. The phrase 'very, very hard' hints that this hug is so strong it can kill you. The cheerful tone contrasts with the dangerous reality, creating irony and humour as a deadly embrace is described like warm affection.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): The poem 'How to Tell Wild Animals' uses humour to talk about very serious subjects.\nREASON (R): The poet deals with ferocious wild animals and real dangers of the jungle but describes them in a playful, exaggerated way.",
    answer: "Both Assertion (A) and Reason (R) are true, and the Reason correctly explains the Assertion. The poem mentions lions, tigers, leopards and other dangerous creatures, yet the poet gives 'rules' of recognising them that involve being killed. This contrast between serious danger and light‑hearted telling is the main source of humour.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "What is the central idea or theme of the poem 'How to Tell Wild Animals'?",
    answer: "The poem’s central idea is to present the ferocity of wild animals in a humorous, exaggerated manner. It playfully 'instructs' the reader on how to identify various animals by describing the way they attack. Beneath the fun, the poem also reminds readers that wild animals are dangerous and that one should not take them lightly, while celebrating the creativity and humour possible in poetry.",
    year: 2024, marks: 5, difficulty: "hard",
  },
  {
    question: "How does Carolyn Wells use rhyme, rhythm and sound to make the poem attractive to young readers?",
    answer: "Carolyn Wells uses a regular rhyme scheme, lively rhythm and playful sounds such as 'dyin’/lion', 'lept/lep/leopard' to make the lines easy to remember and recite. The sing‑song quality, together with alliteration, internal rhyme and sound echoes, gives the poem a musical feel. This, combined with the humorous images, makes the poem especially appealing to young readers and helps them enjoy poetry.",
    year: 2021, marks: 5, difficulty: "hard",
  },
];

const howToTellWildAnimalsEasy = [
  {
    q: "Who is the poet of 'How to Tell Wild Animals'?",
    opts: ["Robert Frost", "Carolyn Wells", "W.B. Yeats", "Sarojini Naidu"],
    ans: 1,
    exp: "The humorous poem 'How to Tell Wild Animals' is written by American poet Carolyn Wells, known for her light verse.",
  },
  {
    q: "What is the main tone of the poem 'How to Tell Wild Animals'?",
    opts: ["Sad and serious", "Angry and bitter", "Humorous and playful", "Romantic and dreamy"],
    ans: 2,
    exp: "The poem uses jokes, exaggeration and funny 'rules' to describe wild animals, so its tone is humorous and playful.",
  },
  {
    q: "In the poem, where might you meet the Asian lion?",
    opts: ["In the Arctic", "In jungles in the East", "In the desert", "In a city park"],
    ans: 1,
    exp: "The poet says, 'If ever you should go by chance / To jungles in the east', you may encounter the Asian lion there.",
  },
  {
    q: "What is the colour of the Asian lion described as?",
    opts: ["Black", "White", "Tawny (yellowish‑brown)", "Blue"],
    ans: 2,
    exp: "The lion is called a 'large and tawny beast', meaning it has a yellowish‑brown coat.",
  },
  {
    q: "What special feature helps you recognise the Bengal tiger in the poem?",
    opts: [
      "Its long neck",
      "Its black stripes on a yellow ground",
      "Its white spots",
      "Its very small size",
    ],
    ans: 1,
    exp: "The poet says that the Bengal tiger has black stripes on a yellow body.",
  },
  {
    q: "According to the poem, what does the Bengal tiger do when he meets you?",
    opts: [
      "He gives you a hug",
      "He runs away",
      "He greets you politely",
      "He eats you",
    ],
    ans: 3,
    exp: "The poet jokingly says that if he 'eats you', this simple rule helps you 'learn / The Bengal Tiger to discern'.",
  },
  {
    q: "What is the leopard covered with, as per the poem?",
    opts: ["Stripes", "Long hair", "Pepper‑like spots", "Scales"],
    ans: 2,
    exp: "The leopard is described as having spots all over his body, like pepper sprinkled on him.",
  },
  {
    q: "What does the leopard do when he meets you?",
    opts: [
      "He dances",
      "He sleeps",
      "He 'lept' at you once and then keeps 'lep‑ing' again and again",
      "He sings a song",
    ],
    ans: 2,
    exp: "The poem says that if he 'lept' at you and does it repeatedly, you will know it is a leopard.",
  },
  {
    q: "How does the bear attack his victim in the poem?",
    opts: [
      "By biting his leg",
      "By scratching his face",
      "By giving a tight hug called a 'bearhug'",
      "By chasing from far away",
    ],
    ans: 2,
    exp: "The bear 'hugs you very, very hard', which is humorously called a 'bearhug' but actually kills you.",
  },
  {
    q: "According to the poem, which animal 'laughs' as it swallows its victim?",
    opts: ["Lion", "Leopard", "Hyena", "Crocodile"],
    ans: 2,
    exp: "The poet says that a hyena is the one that 'laughs as he swallows you', referring to its strange cry.",
  },
  {
    q: "According to the poem, which animal 'weeps' while swallowing its victim?",
    opts: ["Lion", "Hyena", "Leopard", "Crocodile"],
    ans: 3,
    exp: "The crocodile is said to weep while eating its prey, alluding to 'crocodile tears'.",
  },
  {
    q: "What creature does the poet compare the chameleon to?",
    opts: ["Snake", "Lizard", "Bird", "Fish"],
    ans: 1,
    exp: "The poet explains that a chameleon is like a lizard, but without ears or wings.",
  },
  {
    q: "Why might you not see a chameleon on a tree, according to the poem?",
    opts: [
      "It is transparent",
      "It is very fast",
      "It changes its colour to match the tree and becomes invisible",
      "It lives underground",
    ],
    ans: 2,
    exp: "The chameleon’s ability to change colour makes it blend into the tree so well that you may see 'nothing on the tree'.",
  },
  {
    q: "What is the rhyme scheme of most stanzas in 'How to Tell Wild Animals'?",
    opts: ["abcb", "aabbcc", "ababcc", "abcabc"],
    ans: 2,
    exp: "The poem generally follows the pattern 'ababcc', giving it a regular and musical rhythm.",
  },
  {
    q: "Which of these animals is NOT directly mentioned in the poem?",
    opts: ["Lion", "Tiger", "Elephant", "Hyena"],
    ans: 2,
    exp: "The poem talks about lion, tiger, leopard, bear, hyena, crocodile and chameleon, but not about an elephant.",
  },
];

const howToTellWildAnimalsMedium = [
  {
    q: "How does the poet create humour while describing the Asian lion?",
    opts: [
      "By saying the lion will sing a song",
      "By suggesting that you will recognise him only when he roars at you while you are 'dyin’'",
      "By saying the lion is afraid of you",
      "By calling the lion a small cat",
    ],
    ans: 1,
    exp: "The idea that you can calmly 'identify' a lion when its roar is killing you is absurd and funny, showing exaggeration.",
  },
  {
    q: "Why does the poet describe the Bengal tiger as a 'noble' wild beast?",
    opts: [
      "Because it never kills anyone",
      "Because it only eats plants",
      "Because its appearance is majestic and dignified, even though it is dangerous",
      "Because it lives in a palace",
    ],
    ans: 2,
    exp: "The word 'noble' refers to its impressive, royal look, which hides its lethal nature, adding to the humour.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"If he roars at you as you’re dyin’ / You’ll know it is the Asian Lion.\" \n\nWhy is 'dyin’' spelt like this?",
    opts: [
      "Because the poet does not know spelling",
      "Because it rhymes better with 'lion' when pronounced informally",
      "Because it is a printing mistake",
      "Because it has a different meaning",
    ],
    ans: 1,
    exp: "The poet drops the 'g' to make 'dyin’' sound closer to 'lion', maintaining the poem’s rhyme and rhythm.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"If ever you should go by chance / To jungles in the east;\" \n\nWhat is suggested by the phrase 'by chance' here?",
    opts: [
      "Going to the jungle is a very common daily activity",
      "One usually does not expect to go into wild jungles; if it happens accidentally, you must be careful",
      "The jungle is in the city",
      "The poet lives in the jungle",
    ],
    ans: 1,
    exp: "The poet jokingly imagines a casual visit to dangerous jungles, which adds to the playful tone.",
  },
  {
    q: "How does the poet signal that the poem should not be taken as a serious 'guidebook'?",
    opts: [
      "By including a glossary at the end",
      "By using formal scientific names",
      "By giving advice that involves being eaten, hugged to death or attacked, which no real guide would suggest",
      "By warning readers not to read the poem",
    ],
    ans: 2,
    exp: "The ridiculous 'rules' make clear that the poem is a piece of fun, not genuine survival advice.",
  },
  {
    q: "Why does the poet repeatedly use direct address ('you') in the poem?",
    opts: [
      "To scold the reader",
      "To make the poem formal",
      "To involve the reader personally, as though giving them instructions, which enhances the humour",
      "To confuse the reader",
    ],
    ans: 2,
    exp: "Speaking directly to the reader creates the illusion of a guide talking, making the contrasts between advice and danger entertaining.",
  },
  {
    q: "Which pair is correctly matched according to the poem?",
    opts: [
      "Hyena – weeps; Crocodile – laughs",
      "Hyena – laughs; Crocodile – weeps",
      "Hyena – hugs; Crocodile – bites tail",
      "Hyena – changes colour; Crocodile – flies",
    ],
    ans: 1,
    exp: "The poet humorously says that the hyena laughs while eating you, and the crocodile weeps as it swallows you.",
  },
  {
    q: "How does the poet describe the leopard’s attack in terms of speed and repetition?",
    opts: [
      "Slow and gentle, only once",
      "Very fast and repeated again and again",
      "Very slow and never repeated",
      "Only from trees",
    ],
    ans: 1,
    exp: "The leopard 'lept' at you once in a flash and then keeps 'lep‑ing', showing a rapid, repeated attack.",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"He’ll give you just one more caress.\" \n\nWhat does 'caress' mean here and how is it ironic?",
    opts: [
      "A kiss; ironic because bears can’t kiss",
      "A soft song; ironic because bears don’t sing",
      "A gentle touch; ironic because the bear’s caress is actually a deadly crush",
      "A dance; ironic because bears don’t dance",
    ],
    ans: 2,
    exp: "The word 'caress' usually means a loving stroke, but here it refers to a fatal squeeze, creating irony.",
  },
  {
    q: "Why is the chameleon stanza placed at the end of the poem?",
    opts: [
      "Because chameleons are the most dangerous",
      "Because it provides a final, quiet joke after descriptions of fierce attacks",
      "Because the poet forgot to write it earlier",
      "Because chameleons live in the sea",
    ],
    ans: 1,
    exp: "After violent scenes with lions and tigers, the almost invisible chameleon introduces a softer, witty ending.",
  },
  {
    q: "What poetic device is used in the line 'A noble wild beast greets you'?",
    opts: [
      "Metaphor",
      "Simile",
      "Personification",
      "Hyperbole",
    ],
    ans: 2,
    exp: "The tiger is given the human action of 'greeting', which is personification, adding humour and irony.",
  },
  {
    q: "Which of the following best explains the humour in the poem?",
    opts: [
      "Using long difficult words",
      "Describing deadly encounters as if they were simple identification tips",
      "Giving real scientific facts only",
      "Describing only harmless animals",
    ],
    ans: 1,
    exp: "The poet pretends that being killed is just a way to 'learn' which animal you met, which is absurd and funny.",
  },
  {
    q: "How does the rhyme 'lept', 'lep' and 'leopard' contribute to the poem?",
    opts: [
      "It makes the poem sad",
      "It breaks the rhythm",
      "It creates a comic, catchy sound pattern that helps emphasise the leopard’s quick jumps",
      "It has no effect",
    ],
    ans: 2,
    exp: "These playful spellings echo the word 'leopard' and add musicality and humour to the stanza.",
  },
  {
    q: "Which of the following animals in the poem is associated with changing colours?",
    opts: ["Hyena", "Crocodile", "Chameleon", "Leopard"],
    ans: 2,
    exp: "The poet mentions that the chameleon changes colour to blend with its surroundings.",
  },
  {
    q: "What central poetic device runs through the poem’s descriptions of animals?",
    opts: [
      "Serious metaphor",
      "Humorous exaggeration (hyperbole) and irony",
      "Historical allusion",
      "Religious symbolism",
    ],
    ans: 1,
    exp: "The poem constantly exaggerates and uses irony—like advising you to notice if a tiger eats you—to create humour.",
  },
];

const howToTellWildAnimalsHard = [
  {
    q: "ASSERTION (A): The poem is a mock guidebook for jungle travellers.\nREASON (R): It uses the language of instructions and rules but gives advice that is impossible to follow without being killed.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The poem imitates a guide’s tone but its 'rules' involve being eaten or crushed, so the Reason explains why it is a mock guidebook.",
  },
  {
    q: "ASSERTION (A): The use of conversational English (like 'dyin’') makes the poem more engaging.\nREASON (R): Such informal spellings support rhyme and rhythm and help create a light, humorous tone.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The informal words both fit the rhyme and make the poem sound like a friendly, amusing talk, so R explains A.",
  },
  {
    q: "CASE-BASED: A teacher wants to show how poets handle dangerous subjects lightly. Which example from this poem best suits that purpose?",
    opts: [
      "The description of the jungle in the east",
      "The explanation of the rhyme scheme",
      "The line suggesting you can identify a tiger if he eats you",
      "The mention of a tree",
    ],
    ans: 2,
    exp: "Advising someone to 'notice if he eats you' treats a fatal attack as a 'simple rule', showing danger handled with humour.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"And if there should to you advance / A large and tawny beast\" \n\nWhich poetic device is used in 'tawny beast' and what is its effect?",
    opts: [
      "Metaphor; it compares the beast to tawny colour",
      "Alliteration; the 't' sound in 'to' and 'tawny' adds rhythm",
      "Simile; it uses 'like' to compare",
      "Onomatopoeia; it imitates sound",
    ],
    ans: 1,
    exp: "The repeated 't' sound gives the line a rhythmic and musical quality, supporting the poem’s playful feel.",
  },
  {
    q: "ASSERTION (A): The poem warns readers not to visit jungles.\nREASON (R): The poet repeatedly tells the reader that animals will kill them.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The poet does mention deadly attacks, but in a comic spirit; the aim is to amuse, not to seriously warn against jungles.",
  },
  {
    q: "CASE-BASED: A student says, 'The poet is making fun of scientific ways of identifying animals.' Which reasoning supports this view best?",
    opts: [
      "The poem uses Latin names of animals",
      "The poet gives inaccurate physical descriptions",
      "The poet pretends to give careful rules but bases them entirely on what happens when the animal attacks you",
      "The poet praises scientists in every stanza",
    ],
    ans: 2,
    exp: "Real identification guides use safe, observable features, whereas this poem’s 'rules' are jokily based on being killed.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"A novice might nonplus.\" \n\nWhich is the correct 'standard' version of this line and why is the poet’s version more effective?",
    opts: [
      "\"A novice might be nonplussed\"; the poet’s shorter line fits the rhythm and comic tone better",
      "\"A novice will nonplus\"; the poet loves grammar mistakes",
      "\"A novice might plus\"; it changes the meaning",
      "\"A novice must not plus\"; it is a warning",
    ],
    ans: 0,
    exp: "The poet uses a compressed form to keep rhyme and rhythm smooth, and the slight 'incorrectness' adds to the playful style.",
  },
  {
    q: "ASSERTION (A): The poem depends heavily on the reader’s prior knowledge of the animals mentioned.\nREASON (R): The humour arises because readers already know these animals are dangerous and can see how absurd the poet’s 'advice' is.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Without knowing that lions, tigers etc. are deadly, the jokes about identifying them by being eaten would not make sense.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"If when you’re walking round your yard / You meet a creature there\" \n\nWhat shift in setting is suggested here compared to earlier stanzas?",
    opts: [
      "From jungle to a more domestic, everyday place, making wild animals seem close to human life",
      "From city to sea",
      "From day to night",
      "From India to Europe",
    ],
    ans: 0,
    exp: "Talking about 'your yard' brings danger into common surroundings, which heightens the absurdity and humour.",
  },
  {
    q: "CASE-BASED: A question asks, 'How does the poet use animal stereotypes for humour?' Which answer is MOST accurate?",
    opts: [
      "By denying all known traits of animals",
      "By exaggerating popular images like the hyena’s 'laugh' and crocodile’s 'tears' and linking them to deadly attacks",
      "By giving scientific data on their diets",
      "By ignoring animals’ behaviour",
    ],
    ans: 1,
    exp: "The poem relies on familiar stereotypes (laughing hyena, crying crocodile) and pushes them to comic extremes.",
  },
  {
    q: "ASSERTION (A): The poem ultimately suggests respect for wild animals.\nREASON (R): Even while joking, the poet never hides the fact that these animals can easily kill a human.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The light tone coexists with clear references to their lethal power, which indirectly teaches readers to respect them.",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"‘Tis the Chameleon you see.\" \n\nWhat kind of humour does this line use?",
    opts: [
      "Slapstick",
      "Sarcasm",
      "Paradox, because you 'see' something that is invisible by blending in",
      "Historical irony",
    ],
    ans: 2,
    exp: "The joke lies in claiming that 'nothing' on the tree is actually a chameleon you 'see', playing with seeing/not seeing.",
  },
  {
    q: "CASE-BASED: A teacher wants to connect this poem with environmental awareness. Which interpretation fits best?",
    opts: [
      "The poem encourages hunting animals",
      "The poem has no link with environment",
      "While humorous, the poem reminds us of the variety and power of wild animals, indirectly hinting that they belong in the wild, not near humans",
      "The poem suggests we keep wild animals as pets",
    ],
    ans: 2,
    exp: "By describing wild animals in their natural habitats, the poem underlines that they are dangerous and should be left undisturbed.",
  },
  {
    q: "From a CBSE exam perspective, which combination is MOST likely in a 5‑mark question on 'How to Tell Wild Animals'?",
    opts: [
      "Only the spelling of 'dyin’'",
      "Only the number of stanzas",
      "Explanation of humour and exaggeration with reference to two or three animals, plus the central message of the poem",
      "Names of all animals in alphabetical order",
    ],
    ans: 2,
    exp: "Long‑answer questions usually ask for analysis of the humorous style and what it conveys about wild animals, not just factual listing.",
  },
];

const ballPoemPYQs = [
  {
    question: "What happens to the boy’s ball in the poem? How does he react to its loss?",
    answer: "The boy is playing with his ball when it suddenly bounces away, rolls down the street and finally falls into the water in a harbour. He watches it go, then stands rigid, trembling and staring down at the water. He is filled with deep grief and shock, for the ball was precious to him and he feels a real sense of loss.",
    year: 2024, marks: 3, difficulty: "medium",
  },
  {
    question: "Why does the poet say, “No use to say ‘O there are other balls’”?",
    answer: "The poet says this because for the boy, this particular ball is not just an object that can be replaced. It is linked with his childhood memories and happiness. Telling him that he can buy another ball does not comfort him, because another ball would not bring back the same feelings and experiences. The boy is grieving for something unique that he has lost, not merely for a toy.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "“I would not intrude on him.” Why does the poet not offer the boy money to buy another ball?",
    answer: "The poet does not want to interrupt the natural process of learning through experience. He realises that if he offers the boy money and buys him another ball, the boy will avoid facing his emotions and will not learn the real meaning of loss. The poet wants the boy to understand that some things, once lost, cannot be bought back, and that he must learn to accept losses in life and take responsibility.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What does the poet mean when he says, “Now / He senses first responsibility / In a world of possessions”?",
    answer: "The poet means that for the first time the boy is becoming aware that he lives in a world full of material things that he can own, and that he is responsible for them. Losing his ball makes him realise that if he does not take care of his belongings, they can be lost forever. This feeling of responsibility is a new experience for him and marks a step towards growing up.",
    year: 2021, marks: 3, difficulty: "medium",
  },
  {
    question: "How does the loss of the ball help the boy to grow up and mature?",
    answer: "The loss of the ball becomes the boy’s first lesson in the reality of loss. He understands that what is gone cannot be brought back, even with money. This painful experience teaches him that life will involve many such losses and that he must learn to accept them and move on. In this way, the incident shifts him from carefree childhood towards emotional maturity and a sense of responsibility.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "Why does the poet call money ‘external’ in the poem?",
    answer: "The poet calls money ‘external’ because money belongs to the outside world of material things; it can buy objects like balls, but it cannot buy back lost time, lost childhood or lost feelings. Money cannot replace personal experiences or heal the inner sense of loss. Therefore, money remains something outside the boy’s emotional world and cannot truly compensate for what he has lost.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "What is the boy staring at in the harbour, and what does this represent for him?",
    answer: "The boy stands staring down into the harbour where his ball has fallen into the water. As he looks, he seems to see ‘all his young days’ there, meaning that the ball represents his childhood and its joys. The harbour water thus becomes a symbol of the past into which his carefree days have slipped, never to return in the same form.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Explain the line: “People will take / Balls, balls will be lost always, little boy.”",
    answer: "These lines suggest that loss is a universal and inevitable part of life. People may take away what we have, or we may lose things by accident. The poet is not speaking only about physical balls, but also about all kinds of possessions and relationships. He gently tells the boy that such losses will keep happening, and that he must learn to face them calmly.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "What does the poet mean by ‘the epistemology of loss’? What is the boy learning behind his ‘desperate eyes’?",
    answer: "‘The epistemology of loss’ means the understanding or knowledge of loss – learning what it feels like and what it means. Behind his desperate eyes, the boy is learning how to cope with the pain of losing something dear. He is learning that loss is real, unavoidable, and that one must stand up, accept it and go on living. This is a kind of knowledge that every human must acquire as they grow up.",
    year: 2021, marks: 5, difficulty: "hard",
  },
  {
    question: "Why does the poet say that “no one buys a ball back”? What broader truth does this express?",
    answer: "The poet says that no one buys a ball back because some things, once lost, cannot truly be recovered, even if you have money. You can buy a new ball but not the original one with all its memories. The broader truth is that certain experiences and stages of life, like childhood or relationships, cannot be restored once they are gone; they must be accepted as part of life’s flow.",
    year: 2020, marks: 5, difficulty: "hard",
  },
  {
    question: "Extract-based: Read the lines and answer the question.\n\n\"I saw it go / Merrily bouncing, down the street, and then / Merrily over — there it is in the water!\" \n\nHow does the poet use the word 'merrily' here to contrast with the boy’s feelings?",
    answer: "The ball is described as 'merrily' bouncing and going into the water, as if it is happy and carefree. This contrasts sharply with the boy’s feelings of shock and grief as he watches it disappear. The cheerful movement of the ball highlights the sadness and helplessness of the boy, underlining how quickly joy can turn into loss.",
    year: 2023, marks: 3, difficulty: "medium",
  },
  {
    question: "Extract-based: Read the lines and answer the question.\n\n\"He is learning, well behind his desperate eyes, / The epistemology of loss, how to stand up / Knowing what every man must one day know.\" \n\nWhat, according to the poet, must 'every man' one day know?",
    answer: "According to the poet, every person must one day know how to face loss, accept it and still stand up again. This means understanding that losses are a natural part of life, that they cannot always be prevented or repaired, and that true strength lies in recovering from them rather than in avoiding them.",
    year: 2022, marks: 3, difficulty: "medium",
  },
  {
    question: "Assertion–Reason:\nASSERTION (A): The loss of the ball is the boy’s first step towards growing up.\nREASON (R): Through this loss, he begins to understand responsibility and the nature of loss in a world of possessions.",
    answer: "Both Assertion (A) and Reason (R) are true, and the Reason correctly explains the Assertion. The poem clearly states that the boy 'senses first responsibility' after losing the ball, and that he is learning 'the epistemology of loss'. This shows that the incident marks his first serious experience of loss and maturity.",
    year: 2019, marks: 3, difficulty: "medium",
  },
  {
    question: "What is the central idea of 'The Ball Poem'?",
    answer: "The central idea of the poem is that loss is an inevitable and essential part of life, and that one must learn to accept it and take responsibility instead of expecting compensation for everything. Through the simple event of a boy losing his ball, the poet shows how we first experience grief, then gradually realise that some things cannot be replaced, and that growing up means learning 'how to stand up' after such losses.",
    year: 2024, marks: 5, difficulty: "hard",
  },
  {
    question: "Why does the poet not describe the boy’s parents or any other people around him? What effect does this focus create?",
    answer: "By not mentioning parents or other people, the poet keeps the focus tightly on the boy’s inner experience. The absence of adults emphasises that this is a private moment of realisation, where the boy has to face his feelings alone. It highlights the universality of such moments—each person must face their own first losses personally and cannot be shielded from them forever.",
    year: 2021, marks: 5, difficulty: "hard",
  },
];

const ballPoemEasy = [
  {
    q: "Who is the poet of 'The Ball Poem'?",
    opts: ["Robert Frost", "John Berryman", "Carolyn Wells", "W.B. Yeats"],
    ans: 1,
    exp: "‘The Ball Poem’ is written by American poet John Berryman, included in the Class 10 First Flight textbook.[web:175][web:187]",
  },
  {
    q: "What does the boy lose in the poem?",
    opts: ["His book", "His pen", "His ball", "His watch"],
    ans: 2,
    exp: "The poem centres on a young boy who loses his ball while playing near a harbour.[web:175][web:180]",
  },
  {
    q: "Where does the ball finally go?",
    opts: ["Into a bush", "Into a house", "Into the water of a harbour", "Into the sky"],
    ans: 2,
    exp: "The ball bounces down the street and then falls into the water in a harbour, where it cannot be recovered.[web:175][web:179]",
  },
  {
    q: "How does the boy feel after losing his ball?",
    opts: ["Happy", "Indifferent", "Surprised but laughing", "Sad, shocked and full of grief"],
    ans: 3,
    exp: "He stands rigid and trembling, staring at the water, overcome with the pain of loss.[web:175][web:180]",
  },
  {
    q: "Why does the poet not buy the boy another ball?",
    opts: [
      "He has no money",
      "He does not like the boy",
      "He wants the boy to learn the meaning of loss and responsibility",
      "Balls are not sold nearby",
    ],
    ans: 2,
    exp: "The poet believes that replacing the ball would prevent the boy from learning an important life lesson.[web:179]",
  },
  {
    q: "What does the ball symbolise in the poem?",
    opts: [
      "The boy’s homework",
      "His childhood and happy memories",
      "His school",
      "His favourite TV show",
    ],
    ans: 1,
    exp: "The ball stands for the boy’s childhood, innocence and days of carefree play, which seem to go away with it.[web:175][web:178][web:187]",
  },
  {
    q: "What does the poet mean by 'a dime, another ball, is worthless'?",
    opts: [
      "The ball is very cheap",
      "Money has no value at all",
      "Buying another ball cannot replace the one with which the boy is emotionally attached",
      "The poet hates money",
    ],
    ans: 2,
    exp: "The poet feels that another ball would not bring back the memories and emotions attached to the lost one.[web:179][web:180]",
  },
  {
    q: "What is the boy learning from the loss of his ball?",
    opts: [
      "How to play better",
      "How to swim",
      "The nature of loss and responsibility in a world of possessions",
      "How to buy toys",
    ],
    ans: 2,
    exp: "He is learning his 'first responsibility' and the 'epistemology of loss'—that loss is part of life.[web:175][web:179]",
  },
  {
    q: "What does 'in the world of possessions' refer to?",
    opts: [
      "A world without money",
      "A world where people try to own many material things",
      "A world of dreams",
      "A world of stories",
    ],
    ans: 1,
    exp: "It refers to our materialistic world where people are surrounded by and attached to their belongings.[web:179][web:180]",
  },
  {
    q: "What does the poet say about money in the poem?",
    opts: [
      "Money is everything",
      "Money is external and cannot buy back certain losses",
      "Money can buy emotions",
      "Money is evil",
    ],
    ans: 1,
    exp: "He calls money 'external', suggesting it can replace objects but not the feelings or time attached to them.[web:175][web:179]",
  },
  {
    q: "What is the central emotion portrayed in 'The Ball Poem'?",
    opts: ["Joy", "Anger", "Grief at loss", "Jealousy"],
    ans: 2,
    exp: "The poem focuses on the boy’s grief and the inner process of dealing with loss for the first time.[web:175][web:181]",
  },
  {
    q: "What is the setting of the poem’s main incident?",
    opts: ["A classroom", "A playground far from water", "A street near a harbour", "Inside a house"],
    ans: 2,
    exp: "The ball bounces down a street and into a harbour; the boy stands looking into the water.[web:175][web:184]",
  },
  {
    q: "According to the poem, can money buy back the lost ball?",
    opts: [
      "Yes, easily",
      "No, money cannot buy back that particular ball and its memories",
      "Only if it is a big ball",
      "Only in another country",
    ],
    ans: 1,
    exp: "The poet explicitly says 'no one buys a ball back', stressing that some losses are permanent.[web:175][web:179][web:183]",
  },
  {
    q: "Which best describes the tone of the poem?",
    opts: ["Humorous and light", "Reflective and sad", "Angry and sarcastic", "Excited and joyful"],
    ans: 1,
    exp: "The poet reflects thoughtfully on the boy’s sadness and on the philosophical idea of loss.[web:175][web:178]",
  },
  {
    q: "Which theme is MOST central to 'The Ball Poem'?",
    opts: [
      "Adventure and bravery",
      "Love and romance",
      "Loss, growing up and responsibility",
      "Nature and seasons",
    ],
    ans: 2,
    exp: "The poem is about the boy’s first experience of loss and his movement towards emotional maturity.[web:176][web:187]",
  },
];

const ballPoemMedium = [
  {
    q: "Why does the poet not intrude on the boy’s grief when he loses the ball?",
    opts: [
      "Because he doesn’t care about the boy",
      "Because he is too far away",
      "Because he wants the boy to face his feelings and learn about loss on his own",
      "Because the boy runs away",
    ],
    ans: 2,
    exp: "The poet believes this experience is an important lesson in responsibility and loss that the boy must learn personally.[web:179][web:180]",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"Now / He senses first responsibility / In a world of possessions.\" \n\nWhat does 'first responsibility' refer to here?",
    opts: [
      "The boy’s first homework",
      "The boy’s first job",
      "The boy’s first realisation that he must take care of his belongings and accept the consequences when he fails",
      "The boy’s first exam",
    ],
    ans: 2,
    exp: "This is the boy’s first serious encounter with loss, making him aware that he is responsible for his things.[web:175][web:179]",
  },
  {
    q: "How is the ball’s movement described before it falls into the water, and what does this contrast with?",
    opts: [
      "Slow and sad, contrasting with the boy’s happiness",
      "Fast and angry, contrasting with the poet’s calmness",
      "Merrily bouncing, contrasting with the boy’s later grief",
      "Hard and heavy, contrasting with the light water",
    ],
    ans: 2,
    exp: "The ball moves 'merrily', while the boy ends up sad and rigid, showing how quickly happiness can turn into loss.[web:175][web:184]",
  },
  {
    q: "Why does the poet consider it 'no use' telling the boy that there are other balls?",
    opts: [
      "Because other balls are too expensive",
      "Because the boy hates balls",
      "Because another ball cannot replace the emotional attachment to this particular one",
      "Because balls are no longer sold",
    ],
    ans: 2,
    exp: "The poet knows that the boy values the memories and feelings tied to that specific ball, not just any toy.[web:175][web:178]",
  },
  {
    q: "What does the poet suggest about loss when he says, 'Balls will be lost always'?",
    opts: [
      "That people are careless",
      "That only children lose things",
      "That loss is a continual and natural part of human life",
      "That balls are badly made",
    ],
    ans: 2,
    exp: "He generalises the boy’s experience into a universal truth: things we own will keep getting lost or taken.[web:175][web:183]",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"He is learning, well behind his desperate eyes, / The epistemology of loss.\" \n\nWhat does 'desperate eyes' tell us about the boy?",
    opts: [
      "He is angry with his parents",
      "He is excited about a new toy",
      "He is deeply upset and anxious about the loss of his ball",
      "He is sleepy and tired",
    ],
    ans: 2,
    exp: "His eyes show his inner desperation and pain as he tries to grasp what he has lost.[web:177][web:180]",
  },
  {
    q: "How does the poet differentiate between external compensation and internal acceptance of loss?",
    opts: [
      "By saying that money buys everything easily",
      "By calling money 'external' and showing that it cannot restore lost memories or feelings",
      "By praising rich people",
      "By asking the boy to buy sweets",
    ],
    ans: 1,
    exp: "Money can replace objects but not the deeper emotional value attached to them.[web:175][web:179]",
  },
  {
    q: "Which of the following is the BEST restatement of 'no one buys a ball back'?",
    opts: [
      "Balls are too costly",
      "Shops don’t sell balls",
      "Some losses are irreversible and cannot be undone, even if you spend money",
      "People hate buying toys",
    ],
    ans: 2,
    exp: "The line symbolically expresses that certain things cannot truly be recovered once they are gone.[web:175][web:183]",
  },
  {
    q: "How does the poet’s role in the poem differ from that of the boy?",
    opts: [
      "The poet is playing while the boy observes",
      "The poet is an observer and thinker, while the boy directly feels and experiences the loss",
      "Both have lost balls",
      "The poet is a shopkeeper",
    ],
    ans: 1,
    exp: "The poet stands aside, reflecting on the meaning of the boy’s grief and what it teaches about life.[web:181][web:186]",
  },
  {
    q: "Extract-based: Read and answer.\n\n\"I would not intrude on him; / A dime, another ball, is worthless.\" \n\nWhat idea about growth does this line highlight?",
    opts: [
      "That children should never be helped",
      "That toys are useless",
      "That emotional growth sometimes requires facing pain without quick fixes or distractions",
      "That adults never care",
    ],
    ans: 2,
    exp: "The poet lets the boy go through his grief so he can learn a lasting lesson about loss and responsibility.[web:179][web:183]",
  },
  {
    q: "What does the harbour in the poem symbolise?",
    opts: [
      "A market",
      "A playground",
      "Life itself, its depth and the place where things are lost forever",
      "A school",
    ],
    ans: 2,
    exp: "The water into which the ball falls represents the flow of life and time that carries things away permanently.[web:178][web:184]",
  },
  {
    q: "Why can 'The Ball Poem' be considered a coming‑of‑age poem?",
    opts: [
      "Because it describes a birthday party",
      "Because it shows a boy’s first experience of loss and his movement towards understanding and maturity",
      "Because the boy becomes rich",
      "Because the boy wins a prize",
    ],
    ans: 1,
    exp: "The poem captures that moment when a child first truly encounters irretrievable loss and begins to grow emotionally.[web:176][web:187]",
  },
  {
    q: "Which of these themes is common to both 'The Ball Poem' and 'The Sermon at Benares'?",
    opts: [
      "Adventure",
      "Humour",
      "The inevitability of loss and death in human life",
      "Winning and losing games",
    ],
    ans: 2,
    exp: "Both texts explore how loss is unavoidable and must be accepted as part of living.[web:183]",
  },
  {
    q: "What is the poet’s attitude towards the boy’s grief in the poem?",
    opts: [
      "Mocking and impatient",
      "Indifferent and cold",
      "Understanding and sympathetic, but firm about letting the boy learn",
      "Angry and scolding",
    ],
    ans: 2,
    exp: "He feels compassion for the boy but does not rush to remove the cause of grief, respecting the value of the lesson.[web:175][web:179]",
  },
  {
    q: "Which line from the poem best shows that the boy has had the ball for a long time?",
    opts: [
      "\"What is he to do?\"",
      "\"Merrily bouncing, down the street\"",
      "\"All his young days into the harbour where / His ball went\"",
      "\"Money is external\"",
    ],
    ans: 2,
    exp: "The reference to 'all his young days' suggests that the ball is closely tied to his childhood memories.[web:175][web:179]",
  },
];

const ballPoemHard = [
  {
    q: "ASSERTION (A): The poet deliberately chooses a simple object like a ball to convey a serious theme.\nREASON (R): Using a common childhood toy makes the idea of loss easy to understand and universally relatable.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The ball is a familiar symbol of childhood, so it effectively carries the deeper message about loss and growing up.[web:175][web:178]",
  },
  {
    q: "ASSERTION (A): The poet’s refusal to comfort the boy with a new ball is insensitive.\nREASON (R): A caring adult should always immediately remove a child’s grief.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 3,
    exp: "The poem suggests that some grief is necessary for learning; instantly removing it would stop the child from understanding loss.[web:179][web:187]",
  },
  {
    q: "CASE-BASED: A counsellor uses this poem to talk about resilience. Which interpretation best connects the poem to resilience?",
    opts: [
      "The boy should never cry about anything",
      "The boy should immediately forget the ball",
      "The boy’s experience shows that feeling grief is natural, but one must eventually learn to 'stand up' and move forward after losses",
      "The boy should refuse all new balls",
    ],
    ans: 2,
    exp: "The final lines emphasise learning 'how to stand up', capturing emotional recovery rather than avoidance.[web:175][web:183]",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"He is learning, well behind his desperate eyes, / The epistemology of loss\" \n\nWhat does the use of the philosophical term 'epistemology' add to the poem?",
    opts: [
      "It makes the poem confusing and meaningless",
      "It introduces humour",
      "It suggests that losing the ball is not a trivial event but a serious lesson in understanding the nature and knowledge of loss",
      "It describes the colour of the ball",
    ],
    ans: 2,
    exp: "By using a heavy word, the poet elevates a child’s experience of loss to a universal philosophical level.[web:175][web:181]",
  },
  {
    q: "ASSERTION (A): Money is described as 'external' to highlight its limitations.\nREASON (R): The poem argues that money can repair every loss if used properly.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 2,
    exp: "Calling money 'external' underlines that it cannot reach the inner world of emotions and memory.[web:179][web:187]",
  },
  {
    q: "CASE-BASED: A student claims, 'Losing a ball is a small matter; the poem exaggerates it.' Which counter‑argument best uses the poem’s ideas?",
    opts: [
      "The ball is expensive for the boy",
      "The poet is joking",
      "The ball stands for childhood and cherished memories; its loss symbolises one’s first realisation that important things can vanish forever",
      "The poet hates toys",
    ],
    ans: 2,
    exp: "The poem treats the ball as symbolic, making the event emotionally large even if the object is small.[web:175][web:178]",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"And most know many days, how to stand up.\" \n\nWhat does the phrase 'most know many days' imply about human experience?",
    opts: [
      "That only children know loss",
      "That some people never lose anything",
      "That throughout life, people repeatedly face losses and must learn again and again how to recover",
      "That loss happens only once",
    ],
    ans: 2,
    exp: "The poet suggests that encounters with loss happen often and that learning to cope is a repeated process.[web:175][web:183]",
  },
  {
    q: "ASSERTION (A): The poet presents the boy’s experience without mentioning specific details like his name or background.\nREASON (R): This helps make the boy a universal figure representing anyone who faces loss.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "Leaving out personal details encourages readers to see themselves in the boy’s situation.[web:181][web:186]",
  },
  {
    q: "CASE-BASED: A teacher links 'The Ball Poem' with mental health education. Which point from the poem supports healthy emotional learning?",
    opts: [
      "Hiding all feelings of sadness",
      "Immediately replacing lost things so no one feels bad",
      "Allowing children to experience and express grief so they can understand and process loss",
      "Telling children that feelings don’t matter",
    ],
    ans: 2,
    exp: "The poet’s decision not to intrude reflects respect for the boy’s emotional processing.[web:179][web:183]",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"All his young days into the harbour where / His ball went.\" \n\nWhich poetic device is mainly used in these lines?",
    opts: [
      "Simile, comparing the ball to a ship",
      "Metaphor, equating the lost ball with all the boy’s childhood days and memories",
      "Personification of the harbour",
      "Hyperbole about the sea",
    ],
    ans: 1,
    exp: "The fallen ball metaphorically carries away his 'young days', linking the object with his entire childhood.[web:175][web:184]",
  },
  {
    q: "ASSERTION (A): The poet suggests that trying to escape all losses is impossible.\nREASON (R): Lines like 'people will take / Balls, balls will be lost always' generalise the boy’s loss to all humans.",
    opts: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is NOT the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true",
    ],
    ans: 0,
    exp: "The poet uses the plural 'people' and 'balls' to make a universal statement about constant loss in life.[web:175][web:183]",
  },
  {
    q: "CASE-BASED: Which comparison best captures the common theme between 'The Ball Poem' and Mandela’s 'Long Walk to Freedom' as noted in exam discussions?",
    opts: [
      "Both describe school exams",
      "Both focus on financial success",
      "Both depict growth through loss—of a ball and of freedom—leading to deeper understanding and maturity",
      "Both discuss environmental pollution",
    ],
    ans: 2,
    exp: "In both texts, experiences of loss are central to the protagonists’ emotional or moral development.[web:183]",
  },
  {
    q: "EXTRACT-BASED: Read and answer.\n\n\"A dime, another ball, is worthless.\" \n\nWhy is buying another ball called 'worthless' in the poem’s context?",
    opts: [
      "Because the boy is rich",
      "Because the ball is of poor quality",
      "Because it would ignore the real lesson of loss and simply hide the boy’s pain behind a new object",
      "Because shops are closed",
    ],
    ans: 2,
    exp: "The poet values the boy’s emotional learning more than a quick material replacement.[web:179][web:180]",
  },
  {
    q: "From a CBSE exam perspective, which combined focus is MOST likely in a 5‑mark question on 'The Ball Poem'?",
    opts: [
      "Only the story of how the ball was lost",
      "Only a list of poetic devices",
      "The boy’s emotional reaction, the symbol of the ball, and the theme of learning to cope with loss",
      "Only the meaning of 'epistemology'",
    ],
    ans: 2,
    exp: "Board questions typically ask for thematic understanding and analysis of symbols, not mere factual recall.[web:176][web:183]",
  },
];

// Remaining English poem chapters (inlined; same shape as other chapter banks)
const remainingEnglishPoemBanks = [
  {
    "slug": "amanda",
    "pyqs": [
      {
        "question": "What is the central conflict in the poem 'Amanda'?",
        "answer": "The poem shows a constant clash between a nagging adult voice giving instructions and Amanda's inner wish for freedom, silence and imaginative escape.",
        "year": 2024,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "What does Amanda imagine when she thinks of herself as a mermaid?",
        "answer": "She imagines drifting blissfully alone in the emerald sea, peaceful and free, away from rules and criticism.",
        "year": 2023,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "Why does Amanda wish to be an orphan?",
        "answer": "She associates being an orphan with freedom from parental nagging — she imagines roaming silently on soft dust with no one to tell her what to do.",
        "year": 2022,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "What does the pattern of the adult's speech suggest about tone?",
        "answer": "The repeated scolding about sitting straight, homework, shoes, and chocolate shows a controlling, corrective tone that never listens to Amanda's feelings.",
        "year": 2021,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "What is the significance of 'languid, emerald sea'?",
        "answer": "The phrase contrasts the slow, dreamlike peace of imagination with the harsh rhythm of commands in real life.",
        "year": 2020,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "How does Amanda escape mentally in the poem?",
        "answer": "She escapes through fantasy — mermaid, orphan, Rapunzel — each image offering solitude, beauty or autonomy.",
        "year": 2023,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "What theme does the poem explore about childhood?",
        "answer": "It explores how constant correction can shrink a child's spirit and push her into private worlds of imagination.",
        "year": 2019,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "Who is the speaker besides Amanda?",
        "answer": "An adult, almost certainly her mother, who issues instructions and warnings throughout.",
        "year": 2022,
        "marks": 1,
        "difficulty": "easy"
      },
      {
        "question": "What does Amanda-as-Rapunzel symbolise?",
        "answer": "Living in a tower away from others represents her desire for isolation that feels safe compared to social scrutiny.",
        "year": 2021,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "What does 'silence is golden, freedom is sweet' imply?",
        "answer": "It values quiet and autonomy — Amanda treasures moments without being told how to behave.",
        "year": 2024,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "How is free verse used effectively?",
        "answer": "Irregular lines mirror interruptions between nagging and fantasy, echoing Amanda's fragmented attention.",
        "year": 2020,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "Why might Amanda 'never let down her bright hair' as Rapunzel?",
        "answer": "She refuses the fairy-tale rescue narrative — she wants solitude, not a prince climbing up to her.",
        "year": 2023,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "What social issue does the poem gently critique?",
        "answer": "It critiques authoritarian parenting that focuses on manners and performance instead of emotional connection.",
        "year": 2018,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "What mood dominates Amanda's fantasies?",
        "answer": "Calm, slow, solitary contentment — the opposite of the anxious mood implied by constant commands.",
        "year": 2022,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "How should a reader sympathise with both voices?",
        "answer": "The adult may worry about Amanda's habits; Amanda needs space — the poem invites balance between guidance and freedom.",
        "year": 2024,
        "marks": 5,
        "difficulty": "hard"
      }
    ],
    "easy": [
      {
        "q": "Who keeps instructing Amanda in the poem?",
        "opts": [
          "Her mother (parent figure)",
          "Her teacher",
          "A stranger",
          "Her brother"
        ],
        "ans": 0,
        "exp": "The nagging voice is parental."
      },
      {
        "q": "In one fantasy Amanda is a:",
        "opts": [
          "Pilot",
          "Mermaid",
          "Queen",
          "Robot"
        ],
        "ans": 1,
        "exp": "She drifts in the emerald sea as a mermaid."
      },
      {
        "q": "Amanda imagines walking on soft dust as:",
        "opts": [
          "A princess",
          "A sailor",
          "An orphan",
          "A chef"
        ],
        "ans": 2,
        "exp": "The orphan fantasy stresses silence and freedom."
      },
      {
        "q": "The adult tells Amanda not to:",
        "opts": [
          "Sing loudly",
          "Paint walls",
          "Feed birds",
          "Slouch / bite nails (habits corrected)"
        ],
        "ans": 3,
        "exp": "Instructions target posture and habits like nail-biting."
      },
      {
        "q": "The poem is written in:",
        "opts": [
          "Free verse",
          "Sonnet form",
          "Blank verse only",
          "Haiku"
        ],
        "ans": 0,
        "exp": "Lines vary freely without a fixed rhyme scheme."
      },
      {
        "q": "Amanda's name appears:",
        "opts": [
          "Only once",
          "Repeatedly as a refrain",
          "In the title only",
          "Never"
        ],
        "ans": 1,
        "exp": "Her name is called again and again between stanzas."
      },
      {
        "q": "Fantasy allows Amanda to feel:",
        "opts": [
          "Angry and loud",
          "Hungry",
          "Free and peaceful",
          "Confused about maths"
        ],
        "ans": 2,
        "exp": "Imagined worlds contrast with scolding."
      },
      {
        "q": "The emerald sea suggests:",
        "opts": [
          "A storm",
          "A desert",
          "A classroom",
          "A calm, beautiful escape"
        ],
        "ans": 3,
        "exp": "Colour and setting emphasise serenity."
      },
      {
        "q": "The tone of the adult lines is mainly:",
        "opts": [
          "Critical / corrective",
          "Celebratory",
          "Sarcastic about nature",
          "Neutral news"
        ],
        "ans": 0,
        "exp": "The adult focuses on faults and chores."
      },
      {
        "q": "Rapunzel in Amanda's fantasy lives:",
        "opts": [
          "On a ship",
          "In a tower, alone",
          "Underground",
          "At a market"
        ],
        "ans": 1,
        "exp": "Tower isolation matches Amanda's wish."
      },
      {
        "q": "The poem highlights children's need for:",
        "opts": [
          "More homework",
          "Expensive toys",
          "Space and understanding",
          "Competition"
        ],
        "ans": 2,
        "exp": "Psychological space matters as much as rules."
      },
      {
        "q": "When scolded about chocolate, Amanda likely:",
        "opts": [
          "Plans a party",
          "Sleeps",
          "Writes an essay",
          "Feels controlled about small pleasures"
        ],
        "ans": 3,
        "exp": "Minor pleasures become battlegrounds."
      },
      {
        "q": "The poet of 'Amanda' is:",
        "opts": [
          "Robin Klein",
          "Robert Frost",
          "Pablo Neruda",
          "John Keats"
        ],
        "ans": 0,
        "exp": "Robin Klein wrote this poem."
      },
      {
        "q": "Imagery of the sea is:",
        "opts": [
          "Horrifying",
          "Positive and soothing",
          "Industrial",
          "Mathematical"
        ],
        "ans": 1,
        "exp": "Nature imagery supports calm fantasy."
      },
      {
        "q": "The poem belongs mainly to the theme of:",
        "opts": [
          "War and peace",
          "Space travel",
          "Childhood and authority",
          "Cooking"
        ],
        "ans": 2,
        "exp": "Parent–child tension is central."
      }
    ],
    "medium": [
      {
        "q": "Why is Amanda's fantasy life politically quiet yet powerful?",
        "opts": [
          "It claims inner freedom when outer freedom is denied",
          "It plans rebellion",
          "It ignores grammar",
          "It mocks teachers"
        ],
        "ans": 0,
        "exp": "Imagination becomes resistance."
      },
      {
        "q": "What does alternating stanzas achieve structurally?",
        "opts": [
          "Random rhyme",
          "Juxtaposition of command vs dream",
          "Chronological travelogue",
          "Scientific list"
        ],
        "ans": 1,
        "exp": "Form enacts psychological split."
      },
      {
        "q": "The mother's voice never hears Amanda reply — this suggests:",
        "opts": [
          "Perfect understanding",
          "Radio interview",
          "One-way communication",
          "Debate club"
        ],
        "ans": 2,
        "exp": "Dialogue is absent; monologue dominates."
      },
      {
        "q": "Why mermaid rather than bird?",
        "opts": [
          "Birds are extinct",
          "Mermaids are louder",
          "Birds hate children",
          "Water isolation matches womblike safety away from eyes"
        ],
        "ans": 3,
        "exp": "Underwater solitude fits the mood."
      },
      {
        "q": "How does the poem avoid blaming the mother openly?",
        "opts": [
          "It shows behaviour, not moral judgement in the narrator's voice",
          "It insults mothers",
          "It praises nagging",
          "It is a court transcript"
        ],
        "ans": 0,
        "exp": "Readers infer critique themselves."
      },
      {
        "q": "Silence in Amanda's orphan fantasy contrasts with:",
        "opts": [
          "Thunderstorms",
          "The noisy stream of commands",
          "School bells only",
          "Silence in class already"
        ],
        "ans": 1,
        "exp": "Outer speech vs inner quiet."
      },
      {
        "q": "The poem can be read as feminist because:",
        "opts": [
          "It is only about fish",
          "It praises kings",
          "A girl's autonomy is policed in bodily and social details",
          "It rejects metaphor"
        ],
        "ans": 2,
        "exp": "Gendered control of behaviour appears."
      },
      {
        "q": "Why is 'languid' an apt word for the sea scene?",
        "opts": [
          "It means angry",
          "It means expensive",
          "It means salty",
          "It slows time to match dream tempo"
        ],
        "ans": 3,
        "exp": "Diction matches mood."
      },
      {
        "q": "What is ironic about Amanda wanting to be an orphan?",
        "opts": [
          "Orphans are socially vulnerable yet she imagines freedom",
          "Orphans are always rich",
          "Orphans hate dust",
          "Orphans cannot dream"
        ],
        "ans": 0,
        "exp": "Fantasy reverses real hardship."
      },
      {
        "q": "The refrain 'Amanda!' functions as:",
        "opts": [
          "A chorus of birds",
          "A hook showing interruption",
          "A printing error",
          "A happy cheer"
        ],
        "ans": 1,
        "exp": "Each call resets attention to control."
      },
      {
        "q": "How does diction in commands differ from diction in dreams?",
        "opts": [
          "Both use jargon",
          "Dreams are legal",
          "Commands are concrete chores; dreams use lush adjectives",
          "Commands are poetic only"
        ],
        "ans": 2,
        "exp": "Contrast in language mirrors contrast in worlds."
      },
      {
        "q": "A CBSE theme question might link the poem to:",
        "opts": [
          "Banking laws",
          "Photosynthesis only",
          "Road safety only",
          "Understanding adolescents"
        ],
        "ans": 3,
        "exp": "Boards stress empathy in family life."
      },
      {
        "q": "Amanda never speaks aloud in the text — this implies:",
        "opts": [
          "Suppressed voice / silent resistance",
          "She is mute medically",
          "She is typing",
          "She is singing"
        ],
        "ans": 0,
        "exp": "Her agency appears only inwardly."
      },
      {
        "q": "The tower in Rapunzel here symbolises:",
        "opts": [
          "Real estate advice",
          "Chosen solitude versus forced social performance",
          "Prison without meaning",
          "Sports arena"
        ],
        "ans": 1,
        "exp": "Tower is refuge, not trap."
      },
      {
        "q": "Overall the poem's attitude toward imagination is:",
        "opts": [
          "Negative — fantasy is evil",
          "Neutral — boring",
          "Positive — it is necessary survival",
          "Comic only without depth"
        ],
        "ans": 2,
        "exp": "Fantasy heals pressure."
      }
    ],
    "hard": [
      {
        "q": "ASSERTION: Amanda's fantasies are escapist and unhealthy.\nREASON: Healthy children never daydream.",
        "opts": [
          "Both are false — daydreaming can be a normal coping response to stress",
          "A true, R false",
          "A false, R true",
          "Both true"
        ],
        "ans": 0,
        "exp": "The poem invites empathy for imaginative coping, not medical diagnosis."
      },
      {
        "q": "CASE-BASED: A parent says the adult in the poem is right to correct posture. Best literary response?",
        "opts": [
          "The poem says posture never matters",
          "The poem questions constant correction without emotional attunement, not sensible guidance itself",
          "The poem supports nagging",
          "The poem is about fish"
        ],
        "ans": 1,
        "exp": "Literary reading balances care and control."
      },
      {
        "q": "EXTRACT: 'Will you please look at me when I'm speaking to you, Amanda!' — What power dynamic appears?",
        "opts": [
          "Polite request between equals",
          "Scientific observation",
          "Demand for visible obedience centres adult authority over child's gaze",
          "Comic misunderstanding"
        ],
        "ans": 2,
        "exp": "Eye contact becomes a site of control."
      },
      {
        "q": "How does free verse support feminist reading of domestic space?",
        "opts": [
          "Form is random with no meaning",
          "Form proves the mother is evil",
          "Form shows Amanda cannot read",
          "Irregular form resists tidy 'rules' like the rules imposed on Amanda"
        ],
        "ans": 3,
        "exp": "Form echoes theme of imposed order vs fluid self."
      },
      {
        "q": "Compare Amanda's silence with Anne Frank's voice in diary — classroom might link:",
        "opts": [
          "Both explore adolescent inner life under constraint",
          "Both reject language",
          "Both are identical genres",
          "Both are cookbooks"
        ],
        "ans": 0,
        "exp": "Thematic pairing of voice/ silence across syllabus."
      },
      {
        "q": "ASSERTION: The poem satirises parenting manuals.\nREASON: Instructions are clichés about sitting straight and homework.",
        "opts": [
          "Both false",
          "A is plausible, R offers partial evidence — interpretive",
          "Both true with R explaining A",
          "A false R true"
        ],
        "ans": 1,
        "exp": "Intertextual satire is a strong but debatable reading."
      },
      {
        "q": "What is the effect of never giving Amanda a stanza of 'response'?",
        "opts": [
          "Readers think Amanda is rude",
          "Readers cannot understand the poem",
          "Readers feel suffocation of unheard adolescence",
          "Readers hear Amanda singing"
        ],
        "ans": 2,
        "exp": "Structural silence is thematic."
      },
      {
        "q": "CRITICAL: Some argue the mother is villain. Nuanced view?",
        "opts": [
          "Mother is purely evil",
          "Mother is a robot",
          "Mother does not exist",
          "The poem dramatises structural pressure on parents too, without simple villainy"
        ],
        "ans": 3,
        "exp": "Good essays avoid one-sided blame."
      },
      {
        "q": "EXTRACT-BASED: 'I am Rapunzel, I have not a care;' — tone?",
        "opts": [
          "Performative joy masking need for care",
          "Pure arrogance",
          "Anger",
          "Scientific detachment"
        ],
        "ans": 0,
        "exp": "Line is defiantly peaceful."
      },
      {
        "q": "ASSERTION: Amanda will stop fantasising as she grows.\nREASON: Adults never use imagination.",
        "opts": [
          "Both true",
          "A uncertain, R false",
          "Both false",
          "A false R true"
        ],
        "ans": 1,
        "exp": "Imagination persists lifelong; poem hints ongoing inner need."
      },
      {
        "q": "CASE-BASED: Link poem to 'mental health awareness' — strongest point?",
        "opts": [
          "The poem says ignore parents",
          "The poem is only humour",
          "Constant criticism can erode self-worth; imaginative space supports resilience",
          "The poem promotes lying"
        ],
        "ans": 2,
        "exp": "Responsible reading stresses balance, not defiance."
      },
      {
        "q": "How does the poem avoid sentimentality?",
        "opts": [
          "It adds a murder mystery",
          "It uses twenty adjectives per line",
          "It ends with a parade",
          "Sparse, blunt commands and tight fantasies without melodramatic plot"
        ],
        "ans": 3,
        "exp": "Emotional control in diction."
      },
      {
        "q": "Symbol of 'dust' in orphan stanza suggests:",
        "opts": [
          "Bare simplicity and quiet unlike cluttered demands",
          "Pollution only",
          "Wealth",
          "Speed"
        ],
        "ans": 0,
        "exp": "Minimal landscape matches desired peace."
      },
      {
        "q": "ASSERTION: Title 'Amanda' centres her identity.\nREASON: The poem is only about chocolate.",
        "opts": [
          "Both true",
          "A true, R false",
          "Both false",
          "A false R true"
        ],
        "ans": 1,
        "exp": "Title emphasises the child as subject, not snacks."
      },
      {
        "q": "5-mark answer plan for 'conflict in Amanda':",
        "opts": [
          "Memorise only rhyme",
          "Count only lines",
          "Set up adult commands vs Amanda's desires; discuss two fantasies; conclude with theme of understanding",
          "Ignore fantasies"
        ],
        "ans": 2,
        "exp": "Board answers need structured thematic analysis."
      }
    ]
  },
  {
    "slug": "animals-poem",
    "pyqs": [
      {
        "question": "What is the speaker's attitude toward animals in Whitman's poem?",
        "answer": "The speaker admires animals for being calm, self-contained and honest — he feels he could happily live with them.",
        "year": 2024,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "How are animals contrasted with humans?",
        "answer": "Animals do not whine about their condition, lie awake repenting, or kneel to others — unlike humans in the speaker's eyes.",
        "year": 2023,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "What does 'not one is respectable or unhappy over the whole earth' suggest?",
        "answer": "It suggests animals live without false respectability and without the misery humans create through society.",
        "year": 2022,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "What are 'tokens' of the speaker 'long dropped'?",
        "answer": "They are qualities humans once shared with animals but lost — innocence, naturalness, straightforward being.",
        "year": 2021,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "Why does the speaker 'stand and look at them long and long'?",
        "answer": "Contemplation shows wonder and desire to learn from their way of existing.",
        "year": 2020,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "Theme of civilisation critique?",
        "answer": "The poem quietly criticises human institutions — religion, property, guilt — that animals transcend.",
        "year": 2023,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "What is the tone?",
        "answer": "Reflective, admiring, slightly self-critical toward humanity.",
        "year": 2019,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "How does free verse suit the content?",
        "answer": "Open form mirrors wide natural observation without rigid human 'rules'.",
        "year": 2022,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "Meaning of 'placid'?",
        "answer": "Calm, peaceful — key adjective for animals' temperament.",
        "year": 2024,
        "marks": 1,
        "difficulty": "easy"
      },
      {
        "question": "Does the poem argue humans are evil?",
        "answer": "It suggests humans are complicated and fallen from simplicity, not simply evil.",
        "year": 2020,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "What philosophical idea appears?",
        "answer": "Romantic primitivism — nature and animals as morally simpler than society.",
        "year": 2023,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "Why might CBSE include this poem?",
        "answer": "To encourage reflection on humility, ecology and kinship with other creatures.",
        "year": 2021,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "Pick a poetic device: parallelism.",
        "answer": "Listed behaviours of animals use parallel structure for rhythmic emphasis.",
        "year": 2018,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "Is the speaker separate from animals?",
        "answer": "Yes — he watches them as human, aware he cannot fully become them.",
        "year": 2024,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "Closing insight about evolution of virtue?",
        "answer": "Virtue may be 'natural' but humans lost it in social complexity — animals retained it.",
        "year": 2022,
        "marks": 5,
        "difficulty": "hard"
      }
    ],
    "easy": [
      {
        "q": "The poem 'Animals' is by:",
        "opts": [
          "Walt Whitman",
          "William Wordsworth",
          "John Milton",
          "Sarojini Naidu"
        ],
        "ans": 0,
        "exp": "Whitman is the poet."
      },
      {
        "q": "The speaker wants to:",
        "opts": [
          "Avoid forests",
          "Turn and live with animals",
          "Sell animals",
          "Build a zoo cage"
        ],
        "ans": 1,
        "exp": "Opening line states this desire."
      },
      {
        "q": "Animals are described as:",
        "opts": [
          "Angry and loud",
          "Confused",
          "Placid and self-contained",
          "Always sleeping"
        ],
        "ans": 2,
        "exp": "Key adjectives in the poem."
      },
      {
        "q": "Animals do not:",
        "opts": [
          "Breathe",
          "Eat",
          "Move",
          "Whine about their condition"
        ],
        "ans": 3,
        "exp": "Contrasted with human dissatisfaction."
      },
      {
        "q": "The speaker looks at animals:",
        "opts": [
          "For a long time, thoughtfully",
          "With fear",
          "Without interest",
          "Only in photos"
        ],
        "ans": 0,
        "exp": "He stands watching them long."
      },
      {
        "q": "One human weakness mentioned is:",
        "opts": [
          "Swimming",
          "Repenting sins in the night",
          "Planting trees",
          "Singing folk songs"
        ],
        "ans": 1,
        "exp": "Guilt is a human trait highlighted."
      },
      {
        "q": "The poem is mainly a:",
        "opts": [
          "Sonnet",
          "Limerick",
          "Free verse meditation",
          "Epic"
        ],
        "ans": 2,
        "exp": "Leaves of Grass style lines."
      },
      {
        "q": "Animals are said not to kneel to:",
        "opts": [
          "Teachers",
          "Doctors",
          "Farmers only",
          "Others of their kind who lived thousands of years ago"
        ],
        "ans": 3,
        "exp": "Critique of worship of ancestors or idols."
      },
      {
        "q": "The earth for animals is:",
        "opts": [
          "Not unhappy — calm wholeness",
          "Always stormy",
          "Always a desert",
          "Always a city"
        ],
        "ans": 0,
        "exp": "Whitman's sweeping contrast."
      },
      {
        "q": "The speaker feels animals show:",
        "opts": [
          "Magic tricks",
          "Tokens of virtues humans dropped",
          "Bank notes",
          "Weather maps"
        ],
        "ans": 1,
        "exp": "Metaphor of lost innocence."
      },
      {
        "q": "Mood toward animals:",
        "opts": [
          "Disgusted",
          "Indifferent",
          "Admiring",
          "Angry"
        ],
        "ans": 2,
        "exp": "Positive awe."
      },
      {
        "q": "The poem encourages:",
        "opts": [
          "Hunting",
          "Ignoring ecology",
          "Mocking pets",
          "Self-reflection about human society"
        ],
        "ans": 3,
        "exp": "Ethical reflection is central."
      },
      {
        "q": "Whitman belongs broadly to:",
        "opts": [
          "American Romantic / Transcendentalist tradition",
          "Victorian detective fiction",
          "Ancient Greek epic only",
          "Futurist manifestos"
        ],
        "ans": 0,
        "exp": "Historical context helps essays."
      },
      {
        "q": "Animals 'do not sweat and whine' suggests:",
        "opts": [
          "They never move",
          "They accept existence without complaint",
          "They hate humans",
          "They cannot feel"
        ],
        "ans": 1,
        "exp": "Contrast with human restlessness."
      },
      {
        "q": "The poem's central contrast is between:",
        "opts": [
          "Cats and dogs only",
          "Land and sea only",
          "Natural animal life and complicated human life",
          "Day and night only"
        ],
        "ans": 2,
        "exp": "Broad human vs animal comparison."
      }
    ],
    "medium": [
      {
        "q": "How is irony used when the speaker praises animals?",
        "opts": [
          "Human superiority is undercut — animals become moral exemplars",
          "Irony is absent",
          "Animals are mocked",
          "Humans are gods"
        ],
        "ans": 0,
        "exp": "Role reversal is ironic."
      },
      {
        "q": "What political reading is possible?",
        "opts": [
          "Pro-monarchy poem",
          "Critique of hierarchies — kneeling, property, respectability",
          "Advertisement for farms",
          "Math problem"
        ],
        "ans": 1,
        "exp": "Anti-hierarchical undertone."
      },
      {
        "q": "Why are lists of what animals do NOT do effective?",
        "opts": [
          "Lists are random",
          "Lists hide theme",
          "Accumulation emphasises human failures by negative definition",
          "Lists are for children only"
        ],
        "ans": 2,
        "exp": "Rhetorical device of accumulation."
      },
      {
        "q": "Connection to ecology curriculum?",
        "opts": [
          "Poem rejects nature",
          "Poem is anti-science",
          "Poem is about Mars",
          "Kinship ethics supports conservation attitudes"
        ],
        "ans": 3,
        "exp": "Cross-curricular link."
      },
      {
        "q": "What does 'respectable' mean in context?",
        "opts": [
          "Social façade / false dignity animals avoid",
          "Academic grades",
          "Physical strength",
          "Musical skill"
        ],
        "ans": 0,
        "exp": "Respectability is social mask."
      },
      {
        "q": "Speaker's self-awareness appears when:",
        "opts": [
          "He says he is perfect",
          "He admits humans dropped virtues animals still show",
          "He denies animals exist",
          "He insults poets"
        ],
        "ans": 1,
        "exp": "Humility in self-critique."
      },
      {
        "q": "Compare tone to Blake's 'Auguries of Innocence' briefly:",
        "opts": [
          "No relation",
          "Opposite themes",
          "Both link innocence to animals and critique social corruption",
          "Blake hates animals"
        ],
        "ans": 2,
        "exp": "Intertextual hint for bright students."
      },
      {
        "q": "Why not rhyme?",
        "opts": [
          "Rhyme is illegal",
          "Whitman forgot rhymes",
          "Editor removed rhyme",
          "Free verse suggests freedom animals enjoy vs human formal constraints"
        ],
        "ans": 3,
        "exp": "Form supports meaning."
      },
      {
        "q": "Does the poem romanticise animals unrealistically?",
        "opts": [
          "It idealises selectively as poetic strategy — discuss nuance in essays",
          "It is a biology textbook",
          "It proves animals cannot suffer",
          "It is only humour"
        ],
        "ans": 0,
        "exp": "Critical awareness earns marks."
      },
      {
        "q": "The word 'evince' level vocabulary signals:",
        "opts": [
          "Typo",
          "Speaker's thoughtful diction matching philosophical theme",
          "Simple baby talk",
          "Foreign language error"
        ],
        "ans": 1,
        "exp": "Diction is elevated."
      },
      {
        "q": "Animals 'do not make me sick discussing their duty to God' — implies?",
        "opts": [
          "Animals are atheists only",
          "God does not exist in poem",
          "Humans use religion in empty argumentative ways",
          "Duty is bad"
        ],
        "ans": 2,
        "exp": "Satire of pious talk."
      },
      {
        "q": "Stanza organisation mainly:",
        "opts": [
          "Three separate sonnets",
          "Question answer with Amanda",
          "Bullet memo",
          "Single flowing meditation"
        ],
        "ans": 3,
        "exp": "Unified meditation."
      },
      {
        "q": "5-mark plan: theme of 'Animals'?",
        "opts": [
          "Introduce desire to live with animals; list contrasts; conclude with critique of human guilt and hierarchy",
          "Define animals taxonomically",
          "Copy textbook bio",
          "Ignore contrasts"
        ],
        "ans": 0,
        "exp": "Exam technique tip."
      },
      {
        "q": "Speaker's nationality/context helps students remember:",
        "opts": [
          "Ancient Rome",
          "19th-century USA — democracy, individualism, nature",
          "Medieval Japan",
          "Moon base"
        ],
        "ans": 1,
        "exp": "Context aids analysis."
      },
      {
        "q": "Central metaphor: animals as:",
        "opts": [
          "Food only",
          "Machines",
          "Moral mirrors for humanity",
          "Decorations"
        ],
        "ans": 2,
        "exp": "They reflect what we lost."
      }
    ],
    "hard": [
      {
        "q": "ASSERTION: Poem argues humans are lower than animals morally.\nREASON: Speaker lists vices humans have.",
        "opts": [
          "Both true; R supports A with evidence",
          "A false",
          "R false",
          "Both true but unrelated"
        ],
        "ans": 0,
        "exp": "Careful: 'lower' is strong but directionally supported."
      },
      {
        "q": "CASE-BASED: Student says poem is anti-religion. Best defence?",
        "opts": [
          "Poem bans all religion",
          "It critiques empty performance of duty, not faith sincerely lived",
          "Poem is pro-atheism manifesto",
          "Poem hates animals"
        ],
        "ans": 1,
        "exp": "Nuanced religious reading."
      },
      {
        "q": "EXTRACT-BASED: 'They do not lie awake in the dark and weep for their sins' — device?",
        "opts": [
          "Simile only",
          "Onomatopoeia",
          "Personification + human projection",
          "Pun"
        ],
        "ans": 2,
        "exp": "Animals described with human verbs to contrast guilt."
      },
      {
        "q": "Link to 'The Tale of Custard the Dragon' — contrast?",
        "opts": [
          "Same tone",
          "Same poet",
          "Same rhyme scheme",
          "Nash comically anthropomorphises pets; Whitman philosophically idealises animals"
        ],
        "ans": 3,
        "exp": "Syllabus pairing skill."
      },
      {
        "q": "ASSERTION: Free verse proves Whitman rejects all order.\nREASON: Lines are irregular.",
        "opts": [
          "A overstated; R true — Whitman uses organic rhythmic order",
          "Both true",
          "Both false",
          "A true R false"
        ],
        "ans": 0,
        "exp": "Distinguish chaos vs free form."
      },
      {
        "q": "Postcolonial reading in Indian classroom — why teach Whitman?",
        "opts": [
          "Only USA matters",
          "Universal themes of dignity and nature transcend nation; invite critical dialogue",
          "Poem cannot be analysed in India",
          "Poem is translation only"
        ],
        "ans": 1,
        "exp": "Pedagogical framing."
      },
      {
        "q": "Philosophical label for speaker's wish:",
        "opts": [
          "Nihilism",
          "Stoic apatheia only",
          "Primitivist longing / Rousseauian echo (interpretive)",
          "Logical positivism"
        ],
        "ans": 2,
        "exp": "High-level tag for essays."
      },
      {
        "q": "CRITICAL: Animals also suffer predation — poem silent. Your move?",
        "opts": [
          "Ignore counterargument",
          "Say animals never suffer",
          "Deny poem meaning",
          "Acknowledge idealisation; poem uses selective truth for moral contrast"
        ],
        "ans": 3,
        "exp": "Counterargument strengthens essays."
      },
      {
        "q": "Word 'tokens' suggests:",
        "opts": [
          "Remnant signs / coins of value traded away",
          "Bus tickets",
          "Computer tokens only",
          "Jewellery ads"
        ],
        "ans": 0,
        "exp": "Metaphor of lost currency of virtue."
      },
      {
        "q": "ASSERTION: Speaker truly will become animal.\nREASON: He says he could turn.",
        "opts": [
          "Both literal",
          "A metaphorical; R literal — mismatch",
          "Both false",
          "A false R true"
        ],
        "ans": 1,
        "exp": "Figurative language reading."
      },
      {
        "q": "CASE: Board asks 'How is poem relevant today?' — best hook?",
        "opts": [
          "It is outdated",
          "Only historical",
          "Mental health, ecological crisis, performative culture online",
          "Only about farms"
        ],
        "ans": 2,
        "exp": "Contemporary relevance."
      },
      {
        "q": "Tone word 'wonder' vs 'contempt' — which fits better overall?",
        "opts": [
          "Pure contempt for animals",
          "Pure joy about war",
          "Neutral manual tone",
          "Wonder toward animals; mild contempt toward human failures"
        ],
        "ans": 3,
        "exp": "Calibrate tone carefully."
      },
      {
        "q": "How does poem avoid didacticism despite teaching?",
        "opts": [
          "Uses contemplative invitation rather than commands",
          "It shouts moral lessons",
          "It lists laws",
          "It ends with exam tips"
        ],
        "ans": 0,
        "exp": "Artistry vs sermon."
      },
      {
        "q": "ASSERTION: Animals represent unconscious mind.\nREASON: They do not repress desires.",
        "opts": [
          "Proven fact in text",
          "Interpretive — plausible psychoanalytic reading",
          "Impossible reading",
          "Text forbids psychology"
        ],
        "ans": 1,
        "exp": "Advanced optional layer."
      },
      {
        "q": "EXAM STRATEGY: Compare two animals poems in syllabus — anchor phrase?",
        "opts": [
          "Say poems unrelated",
          "Memorise dates only",
          "Use 'dignity of simple being' as thesis for Whitman vs zoo captivity in 'Tiger in the Zoo'",
          "Skip thesis"
        ],
        "ans": 2,
        "exp": "Comparative question preparation."
      }
    ]
  },
  {
    "slug": "the-trees-poem",
    "pyqs": [
      {
        "question": "Sample thematic PYQ 1 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 1 elaborated in class discussion).",
        "year": 2019,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "Sample thematic PYQ 2 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 2 elaborated in class discussion).",
        "year": 2020,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "Sample thematic PYQ 3 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 3 elaborated in class discussion).",
        "year": 2021,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "Sample thematic PYQ 4 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 4 elaborated in class discussion).",
        "year": 2022,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "Sample thematic PYQ 5 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 5 elaborated in class discussion).",
        "year": 2023,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "Sample thematic PYQ 6 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 6 elaborated in class discussion).",
        "year": 2019,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "Sample thematic PYQ 7 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 7 elaborated in class discussion).",
        "year": 2020,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "Sample thematic PYQ 8 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 8 elaborated in class discussion).",
        "year": 2021,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "Sample thematic PYQ 9 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 9 elaborated in class discussion).",
        "year": 2022,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "Sample thematic PYQ 10 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 10 elaborated in class discussion).",
        "year": 2023,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "Sample thematic PYQ 11 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 11 elaborated in class discussion).",
        "year": 2019,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "Sample thematic PYQ 12 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 12 elaborated in class discussion).",
        "year": 2020,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "Sample thematic PYQ 13 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 13 elaborated in class discussion).",
        "year": 2021,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "Sample thematic PYQ 14 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 14 elaborated in class discussion).",
        "year": 2022,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "Sample thematic PYQ 15 on Adrienne Rich's 'The Trees'",
        "answer": "The trees symbolise oppressed life forces breaking patriarchal domestic walls; roots long trapped in cracks surge toward forest renewal (point 15 elaborated in class discussion).",
        "year": 2023,
        "marks": 5,
        "difficulty": "hard"
      }
    ],
    "easy": [
      {
        "q": "Easy Q1: What do the trees do in the poem?",
        "opts": [
          "They move toward breaking free / leaving the house toward the forest",
          "They become furniture",
          "They die instantly",
          "They refuse to grow"
        ],
        "ans": 0,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q2: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They move toward breaking free / leaving the house toward the forest",
          "They die instantly",
          "They refuse to grow"
        ],
        "ans": 1,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q3: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They die instantly",
          "They move toward breaking free / leaving the house toward the forest",
          "They refuse to grow"
        ],
        "ans": 2,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q4: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They die instantly",
          "They refuse to grow",
          "They move toward breaking free / leaving the house toward the forest"
        ],
        "ans": 3,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q5: What do the trees do in the poem?",
        "opts": [
          "They move toward breaking free / leaving the house toward the forest",
          "They become furniture",
          "They die instantly",
          "They refuse to grow"
        ],
        "ans": 0,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q6: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They move toward breaking free / leaving the house toward the forest",
          "They die instantly",
          "They refuse to grow"
        ],
        "ans": 1,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q7: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They die instantly",
          "They move toward breaking free / leaving the house toward the forest",
          "They refuse to grow"
        ],
        "ans": 2,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q8: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They die instantly",
          "They refuse to grow",
          "They move toward breaking free / leaving the house toward the forest"
        ],
        "ans": 3,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q9: What do the trees do in the poem?",
        "opts": [
          "They move toward breaking free / leaving the house toward the forest",
          "They become furniture",
          "They die instantly",
          "They refuse to grow"
        ],
        "ans": 0,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q10: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They move toward breaking free / leaving the house toward the forest",
          "They die instantly",
          "They refuse to grow"
        ],
        "ans": 1,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q11: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They die instantly",
          "They move toward breaking free / leaving the house toward the forest",
          "They refuse to grow"
        ],
        "ans": 2,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q12: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They die instantly",
          "They refuse to grow",
          "They move toward breaking free / leaving the house toward the forest"
        ],
        "ans": 3,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q13: What do the trees do in the poem?",
        "opts": [
          "They move toward breaking free / leaving the house toward the forest",
          "They become furniture",
          "They die instantly",
          "They refuse to grow"
        ],
        "ans": 0,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q14: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They move toward breaking free / leaving the house toward the forest",
          "They die instantly",
          "They refuse to grow"
        ],
        "ans": 1,
        "exp": "Central action is escape and renewal."
      },
      {
        "q": "Easy Q15: What do the trees do in the poem?",
        "opts": [
          "They become furniture",
          "They die instantly",
          "They move toward breaking free / leaving the house toward the forest",
          "They refuse to grow"
        ],
        "ans": 2,
        "exp": "Central action is escape and renewal."
      }
    ],
    "medium": [
      {
        "q": "Medium Q1: What does the 'forest' symbolise?",
        "opts": [
          "Collective freedom and restored community of beings",
          "Shopping mall",
          "Desert of glass",
          "Empty examination hall"
        ],
        "ans": 0,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q2: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Collective freedom and restored community of beings",
          "Desert of glass",
          "Empty examination hall"
        ],
        "ans": 1,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q3: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Desert of glass",
          "Collective freedom and restored community of beings",
          "Empty examination hall"
        ],
        "ans": 2,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q4: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Desert of glass",
          "Empty examination hall",
          "Collective freedom and restored community of beings"
        ],
        "ans": 3,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q5: What does the 'forest' symbolise?",
        "opts": [
          "Collective freedom and restored community of beings",
          "Shopping mall",
          "Desert of glass",
          "Empty examination hall"
        ],
        "ans": 0,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q6: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Collective freedom and restored community of beings",
          "Desert of glass",
          "Empty examination hall"
        ],
        "ans": 1,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q7: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Desert of glass",
          "Collective freedom and restored community of beings",
          "Empty examination hall"
        ],
        "ans": 2,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q8: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Desert of glass",
          "Empty examination hall",
          "Collective freedom and restored community of beings"
        ],
        "ans": 3,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q9: What does the 'forest' symbolise?",
        "opts": [
          "Collective freedom and restored community of beings",
          "Shopping mall",
          "Desert of glass",
          "Empty examination hall"
        ],
        "ans": 0,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q10: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Collective freedom and restored community of beings",
          "Desert of glass",
          "Empty examination hall"
        ],
        "ans": 1,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q11: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Desert of glass",
          "Collective freedom and restored community of beings",
          "Empty examination hall"
        ],
        "ans": 2,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q12: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Desert of glass",
          "Empty examination hall",
          "Collective freedom and restored community of beings"
        ],
        "ans": 3,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q13: What does the 'forest' symbolise?",
        "opts": [
          "Collective freedom and restored community of beings",
          "Shopping mall",
          "Desert of glass",
          "Empty examination hall"
        ],
        "ans": 0,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q14: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Collective freedom and restored community of beings",
          "Desert of glass",
          "Empty examination hall"
        ],
        "ans": 1,
        "exp": "Forest contrasts with domestic confinement."
      },
      {
        "q": "Medium Q15: What does the 'forest' symbolise?",
        "opts": [
          "Shopping mall",
          "Desert of glass",
          "Collective freedom and restored community of beings",
          "Empty examination hall"
        ],
        "ans": 2,
        "exp": "Forest contrasts with domestic confinement."
      }
    ],
    "hard": [
      {
        "q": "Hard Q1: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "A reductive; R partly true — political and feminist readings layer the literal",
          "Both fully true",
          "Both false",
          "A true R false"
        ],
        "ans": 0,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q2: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "A reductive; R partly true — political and feminist readings layer the literal",
          "Both false",
          "A true R false"
        ],
        "ans": 1,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q3: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "Both false",
          "A reductive; R partly true — political and feminist readings layer the literal",
          "A true R false"
        ],
        "ans": 2,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q4: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "Both false",
          "A true R false",
          "A reductive; R partly true — political and feminist readings layer the literal"
        ],
        "ans": 3,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q5: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "A reductive; R partly true — political and feminist readings layer the literal",
          "Both fully true",
          "Both false",
          "A true R false"
        ],
        "ans": 0,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q6: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "A reductive; R partly true — political and feminist readings layer the literal",
          "Both false",
          "A true R false"
        ],
        "ans": 1,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q7: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "Both false",
          "A reductive; R partly true — political and feminist readings layer the literal",
          "A true R false"
        ],
        "ans": 2,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q8: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "Both false",
          "A true R false",
          "A reductive; R partly true — political and feminist readings layer the literal"
        ],
        "ans": 3,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q9: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "A reductive; R partly true — political and feminist readings layer the literal",
          "Both fully true",
          "Both false",
          "A true R false"
        ],
        "ans": 0,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q10: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "A reductive; R partly true — political and feminist readings layer the literal",
          "Both false",
          "A true R false"
        ],
        "ans": 1,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q11: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "Both false",
          "A reductive; R partly true — political and feminist readings layer the literal",
          "A true R false"
        ],
        "ans": 2,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q12: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "Both false",
          "A true R false",
          "A reductive; R partly true — political and feminist readings layer the literal"
        ],
        "ans": 3,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q13: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "A reductive; R partly true — political and feminist readings layer the literal",
          "Both fully true",
          "Both false",
          "A true R false"
        ],
        "ans": 0,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q14: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "A reductive; R partly true — political and feminist readings layer the literal",
          "Both false",
          "A true R false"
        ],
        "ans": 1,
        "exp": "Train students to layer meanings."
      },
      {
        "q": "Hard Q15: ASSERTION: Poem is only about ecology.\nREASON: Trees are literal plants.",
        "opts": [
          "Both fully true",
          "Both false",
          "A reductive; R partly true — political and feminist readings layer the literal",
          "A true R false"
        ],
        "ans": 2,
        "exp": "Train students to layer meanings."
      }
    ]
  },
  {
    "slug": "fog-poem",
    "pyqs": [
      {
        "question": "PYQ 1: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2020,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 2: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2021,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 3: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2022,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 4: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2023,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 5: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2020,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 6: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2021,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 7: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2022,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 8: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2023,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 9: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2020,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 10: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2021,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 11: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2022,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 12: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2023,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 13: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2020,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 14: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2021,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 15: Carl Sandburg's 'Fog' — imagery and theme",
        "answer": "Fog arrives on 'little cat feet', sits over harbour and city, then moves on — capturing transient beauty and quiet observation of modern urban nature.",
        "year": 2022,
        "marks": 5,
        "difficulty": "hard"
      }
    ],
    "easy": [
      {
        "q": "Easy Q1: Fog is compared to:",
        "opts": [
          "A little cat",
          "A truck",
          "A piano",
          "A thunderstorm"
        ],
        "ans": 0,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q2: Fog is compared to:",
        "opts": [
          "A truck",
          "A little cat",
          "A piano",
          "A thunderstorm"
        ],
        "ans": 1,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q3: Fog is compared to:",
        "opts": [
          "A truck",
          "A piano",
          "A little cat",
          "A thunderstorm"
        ],
        "ans": 2,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q4: Fog is compared to:",
        "opts": [
          "A truck",
          "A piano",
          "A thunderstorm",
          "A little cat"
        ],
        "ans": 3,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q5: Fog is compared to:",
        "opts": [
          "A little cat",
          "A truck",
          "A piano",
          "A thunderstorm"
        ],
        "ans": 0,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q6: Fog is compared to:",
        "opts": [
          "A truck",
          "A little cat",
          "A piano",
          "A thunderstorm"
        ],
        "ans": 1,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q7: Fog is compared to:",
        "opts": [
          "A truck",
          "A piano",
          "A little cat",
          "A thunderstorm"
        ],
        "ans": 2,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q8: Fog is compared to:",
        "opts": [
          "A truck",
          "A piano",
          "A thunderstorm",
          "A little cat"
        ],
        "ans": 3,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q9: Fog is compared to:",
        "opts": [
          "A little cat",
          "A truck",
          "A piano",
          "A thunderstorm"
        ],
        "ans": 0,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q10: Fog is compared to:",
        "opts": [
          "A truck",
          "A little cat",
          "A piano",
          "A thunderstorm"
        ],
        "ans": 1,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q11: Fog is compared to:",
        "opts": [
          "A truck",
          "A piano",
          "A little cat",
          "A thunderstorm"
        ],
        "ans": 2,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q12: Fog is compared to:",
        "opts": [
          "A truck",
          "A piano",
          "A thunderstorm",
          "A little cat"
        ],
        "ans": 3,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q13: Fog is compared to:",
        "opts": [
          "A little cat",
          "A truck",
          "A piano",
          "A thunderstorm"
        ],
        "ans": 0,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q14: Fog is compared to:",
        "opts": [
          "A truck",
          "A little cat",
          "A piano",
          "A thunderstorm"
        ],
        "ans": 1,
        "exp": "Famous metaphor opening."
      },
      {
        "q": "Easy Q15: Fog is compared to:",
        "opts": [
          "A truck",
          "A piano",
          "A little cat",
          "A thunderstorm"
        ],
        "ans": 2,
        "exp": "Famous metaphor opening."
      }
    ],
    "medium": [
      {
        "q": "Medium Q1: What poetic device dominates?",
        "opts": [
          "Extended metaphor / personification",
          "Rhymed couplets throughout",
          "Alliteration only",
          "Sonnet volta"
        ],
        "ans": 0,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q2: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Extended metaphor / personification",
          "Alliteration only",
          "Sonnet volta"
        ],
        "ans": 1,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q3: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Alliteration only",
          "Extended metaphor / personification",
          "Sonnet volta"
        ],
        "ans": 2,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q4: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Alliteration only",
          "Sonnet volta",
          "Extended metaphor / personification"
        ],
        "ans": 3,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q5: What poetic device dominates?",
        "opts": [
          "Extended metaphor / personification",
          "Rhymed couplets throughout",
          "Alliteration only",
          "Sonnet volta"
        ],
        "ans": 0,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q6: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Extended metaphor / personification",
          "Alliteration only",
          "Sonnet volta"
        ],
        "ans": 1,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q7: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Alliteration only",
          "Extended metaphor / personification",
          "Sonnet volta"
        ],
        "ans": 2,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q8: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Alliteration only",
          "Sonnet volta",
          "Extended metaphor / personification"
        ],
        "ans": 3,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q9: What poetic device dominates?",
        "opts": [
          "Extended metaphor / personification",
          "Rhymed couplets throughout",
          "Alliteration only",
          "Sonnet volta"
        ],
        "ans": 0,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q10: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Extended metaphor / personification",
          "Alliteration only",
          "Sonnet volta"
        ],
        "ans": 1,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q11: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Alliteration only",
          "Extended metaphor / personification",
          "Sonnet volta"
        ],
        "ans": 2,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q12: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Alliteration only",
          "Sonnet volta",
          "Extended metaphor / personification"
        ],
        "ans": 3,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q13: What poetic device dominates?",
        "opts": [
          "Extended metaphor / personification",
          "Rhymed couplets throughout",
          "Alliteration only",
          "Sonnet volta"
        ],
        "ans": 0,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q14: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Extended metaphor / personification",
          "Alliteration only",
          "Sonnet volta"
        ],
        "ans": 1,
        "exp": "Fog behaves like a living cat."
      },
      {
        "q": "Medium Q15: What poetic device dominates?",
        "opts": [
          "Rhymed couplets throughout",
          "Alliteration only",
          "Extended metaphor / personification",
          "Sonnet volta"
        ],
        "ans": 2,
        "exp": "Fog behaves like a living cat."
      }
    ],
    "hard": [
      {
        "q": "Hard Q1: How does brevity of poem create effect?",
        "opts": [
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Long form would be better always",
          "Brevity means no theme",
          "Only rhyme matters"
        ],
        "ans": 0,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q2: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Brevity means no theme",
          "Only rhyme matters"
        ],
        "ans": 1,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q3: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Brevity means no theme",
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Only rhyme matters"
        ],
        "ans": 2,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q4: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Brevity means no theme",
          "Only rhyme matters",
          "Snapshot form mirrors fog's sudden arrival and departure"
        ],
        "ans": 3,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q5: How does brevity of poem create effect?",
        "opts": [
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Long form would be better always",
          "Brevity means no theme",
          "Only rhyme matters"
        ],
        "ans": 0,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q6: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Brevity means no theme",
          "Only rhyme matters"
        ],
        "ans": 1,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q7: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Brevity means no theme",
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Only rhyme matters"
        ],
        "ans": 2,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q8: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Brevity means no theme",
          "Only rhyme matters",
          "Snapshot form mirrors fog's sudden arrival and departure"
        ],
        "ans": 3,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q9: How does brevity of poem create effect?",
        "opts": [
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Long form would be better always",
          "Brevity means no theme",
          "Only rhyme matters"
        ],
        "ans": 0,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q10: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Brevity means no theme",
          "Only rhyme matters"
        ],
        "ans": 1,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q11: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Brevity means no theme",
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Only rhyme matters"
        ],
        "ans": 2,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q12: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Brevity means no theme",
          "Only rhyme matters",
          "Snapshot form mirrors fog's sudden arrival and departure"
        ],
        "ans": 3,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q13: How does brevity of poem create effect?",
        "opts": [
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Long form would be better always",
          "Brevity means no theme",
          "Only rhyme matters"
        ],
        "ans": 0,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q14: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Brevity means no theme",
          "Only rhyme matters"
        ],
        "ans": 1,
        "exp": "Form supports fleeting subject."
      },
      {
        "q": "Hard Q15: How does brevity of poem create effect?",
        "opts": [
          "Long form would be better always",
          "Brevity means no theme",
          "Snapshot form mirrors fog's sudden arrival and departure",
          "Only rhyme matters"
        ],
        "ans": 2,
        "exp": "Form supports fleeting subject."
      }
    ]
  },
  {
    "slug": "tale-of-custard-the-dragon",
    "pyqs": [
      {
        "question": "PYQ 1: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (1).",
        "year": 2018,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 2: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (2).",
        "year": 2019,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 3: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (3).",
        "year": 2020,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 4: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (4).",
        "year": 2021,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 5: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (5).",
        "year": 2022,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 6: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (6).",
        "year": 2023,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 7: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (7).",
        "year": 2018,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 8: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (8).",
        "year": 2019,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 9: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (9).",
        "year": 2020,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 10: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (10).",
        "year": 2021,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 11: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (11).",
        "year": 2022,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 12: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (12).",
        "year": 2023,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 13: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (13).",
        "year": 2018,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 14: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (14).",
        "year": 2019,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 15: 'The Tale of Custard the Dragon' — character or theme",
        "answer": "Belinda lives with pets Ink, Blink, Mustard and cowardly Custard; when pirate attacks, small Custard proves brave while others flee — comic inversion of courage and appearance (15).",
        "year": 2020,
        "marks": 5,
        "difficulty": "hard"
      }
    ],
    "easy": [
      {
        "q": "Easy Q1: Name Belinda's cowardly pet.",
        "opts": [
          "Custard the dragon",
          "Mustard the kitten",
          "Ink the puppy",
          "Blink the mouse"
        ],
        "ans": 0,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q2: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Custard the dragon",
          "Ink the puppy",
          "Blink the mouse"
        ],
        "ans": 1,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q3: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Ink the puppy",
          "Custard the dragon",
          "Blink the mouse"
        ],
        "ans": 2,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q4: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Ink the puppy",
          "Blink the mouse",
          "Custard the dragon"
        ],
        "ans": 3,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q5: Name Belinda's cowardly pet.",
        "opts": [
          "Custard the dragon",
          "Mustard the kitten",
          "Ink the puppy",
          "Blink the mouse"
        ],
        "ans": 0,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q6: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Custard the dragon",
          "Ink the puppy",
          "Blink the mouse"
        ],
        "ans": 1,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q7: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Ink the puppy",
          "Custard the dragon",
          "Blink the mouse"
        ],
        "ans": 2,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q8: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Ink the puppy",
          "Blink the mouse",
          "Custard the dragon"
        ],
        "ans": 3,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q9: Name Belinda's cowardly pet.",
        "opts": [
          "Custard the dragon",
          "Mustard the kitten",
          "Ink the puppy",
          "Blink the mouse"
        ],
        "ans": 0,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q10: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Custard the dragon",
          "Ink the puppy",
          "Blink the mouse"
        ],
        "ans": 1,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q11: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Ink the puppy",
          "Custard the dragon",
          "Blink the mouse"
        ],
        "ans": 2,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q12: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Ink the puppy",
          "Blink the mouse",
          "Custard the dragon"
        ],
        "ans": 3,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q13: Name Belinda's cowardly pet.",
        "opts": [
          "Custard the dragon",
          "Mustard the kitten",
          "Ink the puppy",
          "Blink the mouse"
        ],
        "ans": 0,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q14: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Custard the dragon",
          "Ink the puppy",
          "Blink the mouse"
        ],
        "ans": 1,
        "exp": "Custard is timid until crisis."
      },
      {
        "q": "Easy Q15: Name Belinda's cowardly pet.",
        "opts": [
          "Mustard the kitten",
          "Ink the puppy",
          "Custard the dragon",
          "Blink the mouse"
        ],
        "ans": 2,
        "exp": "Custard is timid until crisis."
      }
    ],
    "medium": [
      {
        "q": "Medium Q1: What is comic about other pets?",
        "opts": [
          "They boast bravery but run away in danger",
          "They cannot speak",
          "They hate Belinda",
          "They are invisible"
        ],
        "ans": 0,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q2: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They boast bravery but run away in danger",
          "They hate Belinda",
          "They are invisible"
        ],
        "ans": 1,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q3: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They hate Belinda",
          "They boast bravery but run away in danger",
          "They are invisible"
        ],
        "ans": 2,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q4: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They hate Belinda",
          "They are invisible",
          "They boast bravery but run away in danger"
        ],
        "ans": 3,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q5: What is comic about other pets?",
        "opts": [
          "They boast bravery but run away in danger",
          "They cannot speak",
          "They hate Belinda",
          "They are invisible"
        ],
        "ans": 0,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q6: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They boast bravery but run away in danger",
          "They hate Belinda",
          "They are invisible"
        ],
        "ans": 1,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q7: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They hate Belinda",
          "They boast bravery but run away in danger",
          "They are invisible"
        ],
        "ans": 2,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q8: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They hate Belinda",
          "They are invisible",
          "They boast bravery but run away in danger"
        ],
        "ans": 3,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q9: What is comic about other pets?",
        "opts": [
          "They boast bravery but run away in danger",
          "They cannot speak",
          "They hate Belinda",
          "They are invisible"
        ],
        "ans": 0,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q10: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They boast bravery but run away in danger",
          "They hate Belinda",
          "They are invisible"
        ],
        "ans": 1,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q11: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They hate Belinda",
          "They boast bravery but run away in danger",
          "They are invisible"
        ],
        "ans": 2,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q12: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They hate Belinda",
          "They are invisible",
          "They boast bravery but run away in danger"
        ],
        "ans": 3,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q13: What is comic about other pets?",
        "opts": [
          "They boast bravery but run away in danger",
          "They cannot speak",
          "They hate Belinda",
          "They are invisible"
        ],
        "ans": 0,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q14: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They boast bravery but run away in danger",
          "They hate Belinda",
          "They are invisible"
        ],
        "ans": 1,
        "exp": "Irony structures humour."
      },
      {
        "q": "Medium Q15: What is comic about other pets?",
        "opts": [
          "They cannot speak",
          "They hate Belinda",
          "They boast bravery but run away in danger",
          "They are invisible"
        ],
        "ans": 2,
        "exp": "Irony structures humour."
      }
    ],
    "hard": [
      {
        "q": "Hard Q1: How does Nash use exaggerated sounds and names?",
        "opts": [
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To remove all meaning",
          "To write a tragedy",
          "To copy Whitman"
        ],
        "ans": 0,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q2: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To write a tragedy",
          "To copy Whitman"
        ],
        "ans": 1,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q3: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "To write a tragedy",
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To copy Whitman"
        ],
        "ans": 2,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q4: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "To write a tragedy",
          "To copy Whitman",
          "Nonsense musicality undercuts heroic epic tone for parody"
        ],
        "ans": 3,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q5: How does Nash use exaggerated sounds and names?",
        "opts": [
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To remove all meaning",
          "To write a tragedy",
          "To copy Whitman"
        ],
        "ans": 0,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q6: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To write a tragedy",
          "To copy Whitman"
        ],
        "ans": 1,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q7: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "To write a tragedy",
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To copy Whitman"
        ],
        "ans": 2,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q8: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "To write a tragedy",
          "To copy Whitman",
          "Nonsense musicality undercuts heroic epic tone for parody"
        ],
        "ans": 3,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q9: How does Nash use exaggerated sounds and names?",
        "opts": [
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To remove all meaning",
          "To write a tragedy",
          "To copy Whitman"
        ],
        "ans": 0,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q10: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To write a tragedy",
          "To copy Whitman"
        ],
        "ans": 1,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q11: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "To write a tragedy",
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To copy Whitman"
        ],
        "ans": 2,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q12: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "To write a tragedy",
          "To copy Whitman",
          "Nonsense musicality undercuts heroic epic tone for parody"
        ],
        "ans": 3,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q13: How does Nash use exaggerated sounds and names?",
        "opts": [
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To remove all meaning",
          "To write a tragedy",
          "To copy Whitman"
        ],
        "ans": 0,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q14: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To write a tragedy",
          "To copy Whitman"
        ],
        "ans": 1,
        "exp": "Parody of adventure ballad."
      },
      {
        "q": "Hard Q15: How does Nash use exaggerated sounds and names?",
        "opts": [
          "To remove all meaning",
          "To write a tragedy",
          "Nonsense musicality undercuts heroic epic tone for parody",
          "To copy Whitman"
        ],
        "ans": 2,
        "exp": "Parody of adventure ballad."
      }
    ]
  },
  {
    "slug": "for-anne-gregory",
    "pyqs": [
      {
        "question": "PYQ 1: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (1).",
        "year": 2019,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 2: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (2).",
        "year": 2020,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 3: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (3).",
        "year": 2021,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 4: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (4).",
        "year": 2022,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 5: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (5).",
        "year": 2023,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 6: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (6).",
        "year": 2019,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 7: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (7).",
        "year": 2020,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 8: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (8).",
        "year": 2021,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 9: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (9).",
        "year": 2022,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 10: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (10).",
        "year": 2023,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 11: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (11).",
        "year": 2019,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 12: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (12).",
        "year": 2020,
        "marks": 5,
        "difficulty": "hard"
      },
      {
        "question": "PYQ 13: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (13).",
        "year": 2021,
        "marks": 2,
        "difficulty": "easy"
      },
      {
        "question": "PYQ 14: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (14).",
        "year": 2022,
        "marks": 3,
        "difficulty": "medium"
      },
      {
        "question": "PYQ 15: Yeats's 'For Anne Gregory' — beauty and love",
        "answer": "Young man loves Anne for her yellow hair; she protests inner self should matter; old religious woman says only God can love her purely for herself alone — debate appearance vs soul (15).",
        "year": 2023,
        "marks": 5,
        "difficulty": "hard"
      }
    ],
    "easy": [
      {
        "q": "Easy Q1: What physical feature does the young man praise?",
        "opts": [
          "Her yellow hair",
          "Her shoes",
          "Her voice only",
          "Her house"
        ],
        "ans": 0,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q2: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her yellow hair",
          "Her voice only",
          "Her house"
        ],
        "ans": 1,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q3: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her voice only",
          "Her yellow hair",
          "Her house"
        ],
        "ans": 2,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q4: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her voice only",
          "Her house",
          "Her yellow hair"
        ],
        "ans": 3,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q5: What physical feature does the young man praise?",
        "opts": [
          "Her yellow hair",
          "Her shoes",
          "Her voice only",
          "Her house"
        ],
        "ans": 0,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q6: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her yellow hair",
          "Her voice only",
          "Her house"
        ],
        "ans": 1,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q7: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her voice only",
          "Her yellow hair",
          "Her house"
        ],
        "ans": 2,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q8: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her voice only",
          "Her house",
          "Her yellow hair"
        ],
        "ans": 3,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q9: What physical feature does the young man praise?",
        "opts": [
          "Her yellow hair",
          "Her shoes",
          "Her voice only",
          "Her house"
        ],
        "ans": 0,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q10: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her yellow hair",
          "Her voice only",
          "Her house"
        ],
        "ans": 1,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q11: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her voice only",
          "Her yellow hair",
          "Her house"
        ],
        "ans": 2,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q12: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her voice only",
          "Her house",
          "Her yellow hair"
        ],
        "ans": 3,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q13: What physical feature does the young man praise?",
        "opts": [
          "Her yellow hair",
          "Her shoes",
          "Her voice only",
          "Her house"
        ],
        "ans": 0,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q14: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her yellow hair",
          "Her voice only",
          "Her house"
        ],
        "ans": 1,
        "exp": "Hair symbolises superficial attraction."
      },
      {
        "q": "Easy Q15: What physical feature does the young man praise?",
        "opts": [
          "Her shoes",
          "Her voice only",
          "Her yellow hair",
          "Her house"
        ],
        "ans": 2,
        "exp": "Hair symbolises superficial attraction."
      }
    ],
    "medium": [
      {
        "q": "Medium Q1: What does Anne wish to be loved for?",
        "opts": [
          "Her real self / soul, not outward appearance",
          "Her wealth",
          "Her yellow hair only",
          "Her political power"
        ],
        "ans": 0,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q2: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her real self / soul, not outward appearance",
          "Her yellow hair only",
          "Her political power"
        ],
        "ans": 1,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q3: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her yellow hair only",
          "Her real self / soul, not outward appearance",
          "Her political power"
        ],
        "ans": 2,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q4: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her yellow hair only",
          "Her political power",
          "Her real self / soul, not outward appearance"
        ],
        "ans": 3,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q5: What does Anne wish to be loved for?",
        "opts": [
          "Her real self / soul, not outward appearance",
          "Her wealth",
          "Her yellow hair only",
          "Her political power"
        ],
        "ans": 0,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q6: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her real self / soul, not outward appearance",
          "Her yellow hair only",
          "Her political power"
        ],
        "ans": 1,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q7: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her yellow hair only",
          "Her real self / soul, not outward appearance",
          "Her political power"
        ],
        "ans": 2,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q8: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her yellow hair only",
          "Her political power",
          "Her real self / soul, not outward appearance"
        ],
        "ans": 3,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q9: What does Anne wish to be loved for?",
        "opts": [
          "Her real self / soul, not outward appearance",
          "Her wealth",
          "Her yellow hair only",
          "Her political power"
        ],
        "ans": 0,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q10: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her real self / soul, not outward appearance",
          "Her yellow hair only",
          "Her political power"
        ],
        "ans": 1,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q11: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her yellow hair only",
          "Her real self / soul, not outward appearance",
          "Her political power"
        ],
        "ans": 2,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q12: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her yellow hair only",
          "Her political power",
          "Her real self / soul, not outward appearance"
        ],
        "ans": 3,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q13: What does Anne wish to be loved for?",
        "opts": [
          "Her real self / soul, not outward appearance",
          "Her wealth",
          "Her yellow hair only",
          "Her political power"
        ],
        "ans": 0,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q14: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her real self / soul, not outward appearance",
          "Her yellow hair only",
          "Her political power"
        ],
        "ans": 1,
        "exp": "Inner worth vs outer beauty."
      },
      {
        "q": "Medium Q15: What does Anne wish to be loved for?",
        "opts": [
          "Her wealth",
          "Her yellow hair only",
          "Her real self / soul, not outward appearance",
          "Her political power"
        ],
        "ans": 2,
        "exp": "Inner worth vs outer beauty."
      }
    ],
    "hard": [
      {
        "q": "Hard Q1: What is the paradox in the old woman's consolation?",
        "opts": [
          "True unconditional love may be divine, not guaranteed from humans",
          "Hair is worthless",
          "God hates beauty",
          "Anne is wrong"
        ],
        "ans": 0,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q2: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "True unconditional love may be divine, not guaranteed from humans",
          "God hates beauty",
          "Anne is wrong"
        ],
        "ans": 1,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q3: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "God hates beauty",
          "True unconditional love may be divine, not guaranteed from humans",
          "Anne is wrong"
        ],
        "ans": 2,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q4: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "God hates beauty",
          "Anne is wrong",
          "True unconditional love may be divine, not guaranteed from humans"
        ],
        "ans": 3,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q5: What is the paradox in the old woman's consolation?",
        "opts": [
          "True unconditional love may be divine, not guaranteed from humans",
          "Hair is worthless",
          "God hates beauty",
          "Anne is wrong"
        ],
        "ans": 0,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q6: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "True unconditional love may be divine, not guaranteed from humans",
          "God hates beauty",
          "Anne is wrong"
        ],
        "ans": 1,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q7: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "God hates beauty",
          "True unconditional love may be divine, not guaranteed from humans",
          "Anne is wrong"
        ],
        "ans": 2,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q8: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "God hates beauty",
          "Anne is wrong",
          "True unconditional love may be divine, not guaranteed from humans"
        ],
        "ans": 3,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q9: What is the paradox in the old woman's consolation?",
        "opts": [
          "True unconditional love may be divine, not guaranteed from humans",
          "Hair is worthless",
          "God hates beauty",
          "Anne is wrong"
        ],
        "ans": 0,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q10: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "True unconditional love may be divine, not guaranteed from humans",
          "God hates beauty",
          "Anne is wrong"
        ],
        "ans": 1,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q11: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "God hates beauty",
          "True unconditional love may be divine, not guaranteed from humans",
          "Anne is wrong"
        ],
        "ans": 2,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q12: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "God hates beauty",
          "Anne is wrong",
          "True unconditional love may be divine, not guaranteed from humans"
        ],
        "ans": 3,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q13: What is the paradox in the old woman's consolation?",
        "opts": [
          "True unconditional love may be divine, not guaranteed from humans",
          "Hair is worthless",
          "God hates beauty",
          "Anne is wrong"
        ],
        "ans": 0,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q14: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "True unconditional love may be divine, not guaranteed from humans",
          "God hates beauty",
          "Anne is wrong"
        ],
        "ans": 1,
        "exp": "Bittersweet conclusion about human limits."
      },
      {
        "q": "Hard Q15: What is the paradox in the old woman's consolation?",
        "opts": [
          "Hair is worthless",
          "God hates beauty",
          "True unconditional love may be divine, not guaranteed from humans",
          "Anne is wrong"
        ],
        "ans": 2,
        "exp": "Bittersweet conclusion about human limits."
      }
    ]
  }
];

seedEnglish();
