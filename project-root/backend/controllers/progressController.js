const asyncHandler = require("express-async-handler");
const Progress     = require("../models/Progress");
const User         = require("../models/User");
const Activity     = require("../models/Activity");

// ── GET /api/progress/me ──────────────────────────────────
const getMyProgress = asyncHandler(async (req, res) => {
  const progress = await Progress.find({ userId: req.user._id })
    .populate("chapterId", "title subject chapterNumber");
  res.json({ success: true, data: progress });
});

// ── PUT /api/progress/mark-section ───────────────────────
const markSectionComplete = asyncHandler(async (req, res) => {
  const {
    chapterId, subject, classLevel,
    section, mcqScore,
  } = req.body;

  let progress = await Progress.findOne({ userId: req.user._id, chapterId });

  if (!progress) {
    progress = await Progress.create({
      userId: req.user._id,
      chapterId, subject, classLevel,
    });
  }

  // If already marked — don't double-count streak
  const alreadyDone = progress.completedSections[section];

  progress.completedSections[section] = true;

  if (section === "mcq" && mcqScore !== undefined) {
    progress.lastMCQScore = mcqScore;
  }

  const sections = Object.values(progress.completedSections);
  progress.isChapterComplete = sections.every(Boolean);

  await progress.save();

  // ── Log activity ──────────────────────────────────────
  const now     = new Date();
  const dateStr = now.toISOString().split("T")[0]; // "2024-01-15"

  // Populate chapter title
  let chapterTitle = subject || "";
  try {
    const Chapter = require("../models/Chapter");
    const ch = await Chapter.findById(chapterId).select("title");
    if (ch) chapterTitle = ch.title;
  } catch (_) {}

  await Activity.create({
    userId: req.user._id,
    chapterId,
    chapterTitle,
    subject,
    classLevel,
    section,
    dateStr,
    timestamp: now,
  });

  // ── Update streak ─────────────────────────────────────
  const user = await User.findById(req.user._id);

  const todayStr     = dateStr;
  const yesterday    = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const lastStr      = user.lastActiveDate
    ? new Date(user.lastActiveDate).toISOString().split("T")[0]
    : null;

  if (lastStr !== todayStr) {
    // First activity today
    if (lastStr === yesterdayStr) {
      // Consecutive day — extend streak
      user.streak += 1;
    } else if (lastStr === null) {
      // First ever activity
      user.streak = 1;
    } else {
      // Gap > 1 day — reset streak
      user.streak = 1;
    }
    user.lastActiveDate = now;
  }
  // else: already active today, streak stays

  // Update longest streak
  if (user.streak > (user.longestStreak || 0)) {
    user.longestStreak = user.streak;
  }

  // Count total sections done (only new ones)
  if (!alreadyDone) {
    user.totalSectionsDone = (user.totalSectionsDone || 0) + 1;
  }

  await user.save();

  // Mark chapter complete streak bonus
  if (progress.isChapterComplete) {
    // Already handled above
  }

  res.json({ success: true, data: progress, user: {
    streak:        user.streak,
    longestStreak: user.longestStreak,
  }});
});

// ── PUT /api/progress/add-time ────────────────────────────
const addTime = asyncHandler(async (req, res) => {
  const { chapterId, subject, classLevel, minutes } = req.body;

  if (!minutes || minutes < 1) {
    return res.json({ success: true, message: "No time to save." });
  }

  if (chapterId) {
    const progress = await Progress.findOneAndUpdate(
      { userId: req.user._id, chapterId },
      {
        $inc: { timeSpentMinutes: minutes },
        $setOnInsert: { subject, classLevel },
      },
      { upsert: true, new: true }
    );
    return res.json({ success: true, data: progress });
  }

  res.json({ success: true, message: "Time noted." });
});

module.exports = { getMyProgress, markSectionComplete, addTime };