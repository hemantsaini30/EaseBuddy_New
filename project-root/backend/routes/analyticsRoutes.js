const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Progress = require("../models/Progress");
const Resource = require("../models/Resource");
const Chapter = require("../models/Chapter");

// GET /api/analytics/performance
// Returns full performance breakdown per subject + chapter
router.get("/performance", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all progress records for this user
    const progressRecords = await Progress.find({ userId })
      .populate("chapterId", "title subject chapterNumber");

    if (!progressRecords.length) {
      return res.json({
        success: true,
        data: null,
        message: "no_data",
      });
    }

    // Get all MCQ attempts — pull from progress where mcq section done
    // Also grab chapter IDs where mcq is complete to fetch scores
    const chapterIds = progressRecords
      .filter((p) => p.completedSections?.mcq)
      .map((p) => p.chapterId?._id)
      .filter(Boolean);

    // Build per-subject stats
    const subjectMap = {};

    for (const record of progressRecords) {
      const chapter = record.chapterId;
      if (!chapter) continue;

      const subject = record.subject;
      if (!subjectMap[subject]) {
        subjectMap[subject] = {
          subject,
          totalChapters: 0,
          completedChapters: 0,
          totalSections: 0,       // max possible sections (5 per chapter)
          completedSections: 0,
          mcqAttempted: 0,
          mcqTotalScore: 0,
          mcqMaxScore: 0,
          timeSpentMinutes: 0,
          chapters: [],
        };
      }

      const s = subjectMap[subject];
      s.totalChapters++;
      if (record.isChapterComplete) s.completedChapters++;

      // Count sections
      const sections = record.completedSections || {};
      const done = Object.values(sections).filter(Boolean).length;
      s.totalSections += 5;       // 5 sections per chapter
      s.completedSections += done;
      s.timeSpentMinutes += record.timeSpentMinutes || 0;

      // MCQ score data
      if (record.lastMCQScore !== null && record.lastMCQScore !== undefined) {
        s.mcqAttempted++;
        s.mcqTotalScore += record.lastMCQScore;
        s.mcqMaxScore += record.lastMCQTotal ?? 20;      // 20 questions per quiz
      }

      // Per-chapter breakdown
      s.chapters.push({
        chapterId: chapter._id,
        title: chapter.title,
        chapterNumber: chapter.chapterNumber,
        isComplete: record.isChapterComplete,
        sectionsCompleted: done,
        mcqScore: record.lastMCQScore,
        timeSpent: record.timeSpentMinutes || 0,
        // Strength score 0-100 based on completion + mcq
        strengthScore: calcStrengthScore(done, record.lastMCQScore),
      });
    }

    // Calculate final per-subject scores
    const subjects = Object.values(subjectMap).map((s) => {
      const completionScore = s.totalSections > 0
        ? Math.round((s.completedSections / s.totalSections) * 100) : 0;
      const mcqScore = s.mcqMaxScore > 0
        ? Math.round((s.mcqTotalScore / s.mcqMaxScore) * 100) : null;
      // Weighted: 60% completion, 40% mcq (if attempted)
      const overallScore = mcqScore !== null
        ? Math.round(completionScore * 0.6 + mcqScore * 0.4)
        : completionScore;

      // Sort chapters by strength score ascending to find weak ones
      const sortedChapters = [...s.chapters].sort(
        (a, b) => a.strengthScore - b.strengthScore
      );

      return {
        ...s,
        completionScore,
        mcqScore,
        overallScore,
        weakChapters: sortedChapters.slice(0, 2).filter(
          (c) => c.strengthScore < 60
        ),
        strongChapters: sortedChapters
          .reverse()
          .slice(0, 2)
          .filter((c) => c.strengthScore >= 70),
      };
    });

    // Global weak areas (across all subjects, bottom 3 chapters)
    const allChapters = subjects.flatMap((s) =>
      s.chapters.map((c) => ({ ...c, subject: s.subject }))
    );
    const globalWeak = [...allChapters]
      .filter((c) => c.mcqScore !== null) // only chapters where MCQ was attempted
      .sort((a, b) => a.strengthScore - b.strengthScore)
      .slice(0, 3);

    const globalStrong = [...allChapters]
      .filter((c) => c.mcqScore !== null)
      .sort((a, b) => b.strengthScore - a.strengthScore)
      .slice(0, 3);

    res.json({
      success: true,
      data: {
        subjects,
        globalWeak,
        globalStrong,
        totalTimeMinutes: subjects.reduce((s, sub) => s + sub.timeSpentMinutes, 0),
        totalChaptersCompleted: subjects.reduce((s, sub) => s + sub.completedChapters, 0),
        totalMCQAttempted: subjects.reduce((s, sub) => s + sub.mcqAttempted, 0),
      },
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Helper: compute 0-100 strength score for a chapter
function calcStrengthScore(sectionsCompleted, mcqScore) {
  const completionPart = Math.round((sectionsCompleted / 5) * 100 * 0.5);
  const mcqPart = mcqScore !== null && mcqScore !== undefined
    ? Math.round((mcqScore / 20) * 100 * 0.5)
    : 0;
  return completionPart + mcqPart;
}

module.exports = router;