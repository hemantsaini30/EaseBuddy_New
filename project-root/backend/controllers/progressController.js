const asyncHandler = require("express-async-handler");
const Progress = require("../models/Progress");
const User = require("../models/User");

// ─── GET /api/progress/me ─────────────────────────────────
const getMyProgress = asyncHandler(async (req, res) => {
  const progress = await Progress.find({ userId: req.user._id }).populate("chapterId", "title subject");
  res.json({ success: true, data: progress });
});

// ─── PUT /api/progress/mark-section ──────────────────────
// Body: { chapterId, subject, classLevel, section }
// section: "video" | "ncert" | "pyq" | "book" | "mcq"
const markSectionComplete = asyncHandler(async (req, res) => {
  const { chapterId, subject, classLevel, section, mcqScore } = req.body;

  let progress = await Progress.findOne({ userId: req.user._id, chapterId });

  if (!progress) {
    progress = await Progress.create({
      userId: req.user._id,
      chapterId,
      subject,
      classLevel,
    });
  }

  // Mark the section
  progress.set(`completedSections.${section}`, true);
  if (section === "mcq" && req.body.mcqScore !== undefined) {
  progress.lastMCQScore = mcqScore;
  
  }

  // Check if all 5 sections are done
  const { video, ncert, pyq, book, mcq } = progress.completedSections;
  progress.isChapterComplete = [video, ncert, pyq, book, mcq].every(Boolean);

  await progress.save();

  // Update user streak if chapter just completed
  if (progress.isChapterComplete) {
    await updateUserStreak(req.user._id);
  }

  res.json({ success: true, data: progress });
});

// ─── Helper: update streak ────────────────────────────────
const updateUserStreak = async (userId) => {
  const user = await User.findById(userId);
  const today = new Date().toDateString();
  const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate).toDateString() : null;

  if (lastActive !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = lastActive === yesterday.toDateString();
    user.streak = isYesterday ? user.streak + 1 : 1;
    user.lastActiveDate = new Date();
    await user.save();
  }
};

module.exports = { getMyProgress, markSectionComplete };
