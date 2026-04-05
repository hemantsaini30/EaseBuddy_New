const express  = require("express");
const router   = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Mistake  = require("../models/Mistake");

// ── GET /api/mistakes ─────────────────────────────────────
// Get all mistakes for the logged-in user
// Query: ?subject=Science&status=unseen&classLevel=10
router.get("/", protect, async (req, res) => {
  try {
    const { subject, status, classLevel } = req.query;
    const filter = { userId: req.user._id };
    if (subject)    filter.subject    = subject;
    if (status)     filter.status     = status;
    if (classLevel) filter.classLevel = Number(classLevel);

    const mistakes = await Mistake.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: mistakes.length, data: mistakes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/mistakes/stats ───────────────────────────────
// Summary counts per subject
router.get("/stats", protect, async (req, res) => {
  try {
    const stats = await Mistake.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: { subject: "$subject", status: "$status" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Reshape into { Science: { unseen:3, mastered:2 }, ... }
    const shaped = {};
    stats.forEach(({ _id, count }) => {
      if (!shaped[_id.subject]) shaped[_id.subject] = { unseen:0, reattempted:0, mastered:0, total:0 };
      shaped[_id.subject][_id.status] += count;
      shaped[_id.subject].total       += count;
    });

    res.json({ success: true, data: shaped });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST /api/mistakes/bulk ───────────────────────────────
// Save multiple mistakes at once (called after quiz submit)
// Body: { mistakes: [...] }
router.post("/bulk", protect, async (req, res) => {
  try {
    const { mistakes } = req.body;
    if (!mistakes?.length) return res.json({ success: true, data: [] });

    const saved = [];
    for (const m of mistakes) {
      // Upsert — if already exists, just increment attempts
      const existing = await Mistake.findOne({
        userId:     req.user._id,
        resourceId: m.resourceId,
      });

      if (existing) {
        // Already in mistake book — don't overwrite, just bump attempts
        existing.attempts++;
        // Update their latest wrong answer
        if (m.userAnswerIndex !== undefined) existing.userAnswerIndex = m.userAnswerIndex;
        // If it was mastered before but got wrong again, reopen it
        if (existing.status === "mastered") existing.status = "reattempted";
        await existing.save();
        saved.push(existing);
      } else {
        const created = await Mistake.create({ userId: req.user._id, ...m });
        saved.push(created);
      }
    }

    res.json({ success: true, count: saved.length, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PUT /api/mistakes/:id/reattempt ──────────────────────
// Called when student reattempts a question from Mistake Book
// Body: { userAnswerIndex }
router.put("/:id/reattempt", protect, async (req, res) => {
  try {
    const { userAnswerIndex } = req.body;
    const mistake = await Mistake.findOne({
      _id: req.params.id, userId: req.user._id,
    });
    if (!mistake) return res.status(404).json({ success:false, message:"Not found" });

    const isCorrect = userAnswerIndex === mistake.correctIndex;
    mistake.attempts++;
    mistake.userAnswerIndex    = userAnswerIndex;
    mistake.lastAttemptCorrect = isCorrect;
    mistake.status = isCorrect ? "mastered" : "reattempted";
    if (isCorrect) mistake.masteredAt = new Date();

    await mistake.save();
    res.json({ success: true, data: mistake });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── DELETE /api/mistakes/:id ──────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    await Mistake.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;