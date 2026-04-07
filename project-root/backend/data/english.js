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

