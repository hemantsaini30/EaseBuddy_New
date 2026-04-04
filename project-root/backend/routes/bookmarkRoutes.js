const express  = require("express");
const router   = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const User     = require("../models/User");

// ── GET /api/bookmarks ────────────────────────────────────
// Returns all bookmarks for the logged-in user
router.get("/", protect, async (req, res) => {
  const user = await User.findById(req.user._id).select("bookmarks");
  // Sort newest first
  const sorted = [...(user.bookmarks || [])].sort(
    (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
  );
  res.json({ success: true, data: sorted });
});

// ── POST /api/bookmarks ───────────────────────────────────
// Add a bookmark — idempotent (won't duplicate)
router.post("/", protect, async (req, res) => {
  const {
    chapterId, chapterTitle, subject,
    classLevel, slug, bookName, bookId, subjectId,
  } = req.body;

  const user = await User.findById(req.user._id);

  // Check if already bookmarked
  const exists = user.bookmarks.some(
    (b) => b.chapterId?.toString() === chapterId
  );
  if (exists) {
    return res.json({ success: true, data: user.bookmarks, alreadyExists: true });
  }

  user.bookmarks.push({
    chapterId, chapterTitle, subject,
    classLevel, slug, bookName, bookId, subjectId,
  });
  await user.save();

  res.json({ success: true, data: user.bookmarks });
});

// ── DELETE /api/bookmarks/:chapterId ─────────────────────
// Remove a bookmark by chapterId
router.delete("/:chapterId", protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  user.bookmarks = user.bookmarks.filter(
    (b) => b.chapterId?.toString() !== req.params.chapterId
  );
  await user.save();

  res.json({ success: true, data: user.bookmarks });
});

// ── DELETE /api/bookmarks ─────────────────────────────────
// Clear ALL bookmarks
router.delete("/", protect, async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { bookmarks: [] });
  res.json({ success: true, data: [] });
});

module.exports = router;