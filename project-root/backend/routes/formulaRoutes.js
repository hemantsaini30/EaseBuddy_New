const express = require("express");
const router  = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const Formula = require("../models/Formula");

// GET /api/formulas/:chapterId
router.get("/:chapterId", protect, async (req, res) => {
  try {
    const formulas = await Formula.find({
      chapterId: req.params.chapterId,
      isActive: true,
    }).sort({ order: 1 });

    res.json({ success: true, count: formulas.length, data: formulas });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/formulas (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const formula = await Formula.create(req.body);
    res.status(201).json({ success: true, data: formula });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// POST /api/formulas/bulk (admin only) — insert many at once
router.post("/bulk", protect, adminOnly, async (req, res) => {
  try {
    const formulas = await Formula.insertMany(req.body.formulas);
    res.status(201).json({ success: true, count: formulas.length, data: formulas });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;