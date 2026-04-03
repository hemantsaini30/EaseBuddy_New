const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Resource = require("../models/Resource");
const Chapter = require("../models/Chapter");

// POST /api/mock-test/generate
// Body: { subject, classLevel, totalQuestions, difficulty }
// difficulty: "easy" | "medium" | "hard" | "mixed"
router.post("/generate", protect, async (req, res) => {
  try {
    const { subject, classLevel, totalQuestions = 30, difficulty = "mixed" } = req.body;

    // Find all chapter IDs for this subject + class
    const chapters = await Chapter.find({ subject, classLevel, isActive: true });
    const chapterIds = chapters.map((c) => c._id);

    if (!chapterIds.length) {
      return res.status(404).json({ success: false, message: "No chapters found for this subject and class." });
    }

    // Build query filter
    const filter = { type: "mcq", chapterId: { $in: chapterIds }, isActive: true };

    // For mixed: pull equal parts easy/medium/hard
    let questions = [];

    if (difficulty === "mixed") {
      const perLevel = Math.floor(totalQuestions / 3);
      const remainder = totalQuestions % 3;

      const [easy, medium, hard] = await Promise.all([
        Resource.aggregate([
          { $match: { ...filter, testLevel: "easy" } },
          { $sample: { size: perLevel + (remainder > 0 ? 1 : 0) } },
        ]),
        Resource.aggregate([
          { $match: { ...filter, testLevel: "medium" } },
          { $sample: { size: perLevel + (remainder > 1 ? 1 : 0) } },
        ]),
        Resource.aggregate([
          { $match: { ...filter, testLevel: "hard" } },
          { $sample: { size: perLevel } },
        ]),
      ]);

      // Shuffle the combined array
      questions = [...easy, ...medium, ...hard].sort(() => Math.random() - 0.5);
    } else {
      questions = await Resource.aggregate([
        { $match: { ...filter, testLevel: difficulty } },
        { $sample: { size: totalQuestions } },
      ]);
    }

    if (!questions.length) {
      return res.status(404).json({ success: false, message: "Not enough questions in the bank yet. Add more MCQs first." });
    }

    // Attach chapter title to each question
    const chapterMap = {};
    chapters.forEach((c) => { chapterMap[c._id.toString()] = c.title; });

    const enriched = questions.map((q) => ({
      _id: q._id,
      question: q.mcqQuestion,
      options: q.mcqOptions,
      correctIndex: q.mcqCorrectIndex,
      explanation: q.mcqExplanation,
      difficulty: q.testLevel,
      chapterTitle: chapterMap[q.chapterId?.toString()] || "Unknown Chapter",
      marks: q.testLevel === "hard" ? 2 : 1, // hard = 2 marks, others = 1 mark
    }));

    // Calculate total marks and suggested duration
    const totalMarks = enriched.reduce((sum, q) => sum + q.marks, 0);
    const durationMinutes = Math.round(totalQuestions * 1.5); // 1.5 min per question

    res.json({
      success: true,
      data: {
        subject,
        classLevel,
        difficulty,
        questions: enriched,
        totalQuestions: enriched.length,
        totalMarks,
        durationMinutes,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Mock test generation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;