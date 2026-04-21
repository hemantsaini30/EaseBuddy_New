const express    = require("express");
const router     = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Resource   = require("../models/Resource");
const Chapter    = require("../models/Chapter");
const mongoose   = require("mongoose");

// POST /api/mock-test/generate
// Body: {
//   subject?        — old single-subject mode (still works)
//   chapterIds?     — new: array of specific chapter _id strings
//   classLevel,
//   totalQuestions,
//   difficulty: "easy" | "medium" | "hard" | "mixed"
// }
router.post("/generate", protect, async (req, res) => {
  try {
    const {
      subject,
      chapterIds,
      classLevel,
      totalQuestions = 30,
      difficulty     = "mixed",
    } = req.body;

    // ── 1. Resolve chapters ───────────────────────────────
    let chapters = [];

    // ── 1. Resolve chapters ───────────────────────────────
if (chapterIds && chapterIds.length > 0) {
  chapters = await Chapter.find({
    _id: { $in: chapterIds.map(id => new mongoose.Types.ObjectId(id)) },
    isActive: { $ne: false },   // ← was: isActive: true
  });
} else if (subject) {
  chapters = await Chapter.find({
    subject, classLevel,
    isActive: { $ne: false },   // ← was: isActive: true
  });
} else {
  chapters = await Chapter.find({
    classLevel,
    isActive: { $ne: false },   // ← was: isActive: true
  });
}



    if (!chapters.length) {
      return res.status(404).json({
        success: false,
        message: "No chapters found for your selection.",
      });
    }

    // Build chapterMap for enrichment later
    const chapterMap = {};
    chapters.forEach((c) => {
      chapterMap[c._id.toString()] = c;
    });

    const resolvedChapterIds = chapters.map((c) => c._id);

    // ── 2. Build base filter ──────────────────────────────
const filter = {
  type:      "mcq",
  chapterId: { $in: resolvedChapterIds },
  isActive:  { $ne: false },    // ← was: isActive: true
};

    // ── 3. Sample questions ───────────────────────────────
    let questions = [];

    if (difficulty === "mixed") {
      const perLevel = Math.floor(totalQuestions / 3);
      const remainder = totalQuestions % 3;

      const [easy, medium, hard] = await Promise.all([
        Resource.aggregate([
          { $match: { ...filter, testLevel: "easy"   } },
          { $sample: { size: perLevel + (remainder > 0 ? 1 : 0) } },
        ]),
        Resource.aggregate([
          { $match: { ...filter, testLevel: "medium" } },
          { $sample: { size: perLevel + (remainder > 1 ? 1 : 0) } },
        ]),
        Resource.aggregate([
          { $match: { ...filter, testLevel: "hard"   } },
          { $sample: { size: perLevel } },
        ]),
      ]);

      // Shuffle combined array
      questions = [...easy, ...medium, ...hard].sort(() => Math.random() - 0.5);
    } else {
      questions = await Resource.aggregate([
        { $match: { ...filter, testLevel: difficulty } },
        { $sample: { size: totalQuestions } },
      ]);
    }

    if (!questions.length) {
      return res.status(404).json({
        success: false,
        message: "Not enough questions found. Try selecting more chapters or a different difficulty.",
      });
    }

    // ── 4. Enrich with chapter metadata ───────────────────
    const enriched = questions.map((q) => {
      const ch = chapterMap[q.chapterId?.toString()];
      return {
        // Keep all original Resource fields (mcqQuestion, mcqOptions, etc.)
        ...q,
        // Convenience aliases used by QuizScreen
        mcqQuestion:     q.mcqQuestion,
        mcqOptions:      q.mcqOptions,
        mcqCorrectIndex: q.mcqCorrectIndex,
        mcqExplanation:  q.mcqExplanation,
        testLevel:       q.testLevel,
        // Chapter metadata
        chapterId:    q.chapterId,
        chapterTitle: ch?.title      || "Unknown Chapter",
        subject:      ch?.subject    || subject || "",
        classLevel:   ch?.classLevel || classLevel,
        // Marks: hard = 2, others = 1
        marks: q.testLevel === "hard" ? 2 : 1,
      };
    });

    // ── 5. Stats for response ─────────────────────────────
    const totalMarks      = enriched.reduce((sum, q) => sum + q.marks, 0);
    const durationMinutes = Math.round(totalQuestions * 1.5);

    // Subjects covered (useful when multi-subject selection)
    const subjectsCovered = [...new Set(enriched.map(q => q.subject).filter(Boolean))];

    res.json({
      success: true,
      data: enriched,          // frontend reads data as flat array of questions
      meta: {
        subject:          subject || null,
        subjectsCovered,
        classLevel,
        difficulty,
        totalQuestions:   enriched.length,
        totalMarks,
        durationMinutes,
        chaptersUsed:     chapters.length,
        generatedAt:      new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error("Mock test generation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;