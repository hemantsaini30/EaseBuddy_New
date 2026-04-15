const express      = require("express");
const router       = express.Router();
const asyncHandler = require("express-async-handler");
const { protect }  = require("../middlewares/authMiddleware");
const Activity     = require("../models/Activity");

// GET /api/activity/calendar
// Returns activity counts per day for the last 365 days
router.get("/calendar", protect, asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const since  = new Date();
  since.setDate(since.getDate() - 364);
  const sinceStr = since.toISOString().split("T")[0];

  const raw = await Activity.aggregate([
    {
      $match: {
        userId:  userId,
        dateStr: { $gte: sinceStr },
      },
    },
    {
      $group: {
        _id:   "$dateStr",
        count: { $sum: 1 },
        sections: { $addToSet: "$section" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Map to { "2024-01-15": 3, ... }
  const calendar = {};
  raw.forEach((r) => { calendar[r._id] = r.count; });

  res.json({ success: true, data: calendar });
}));

// GET /api/activity/recent?limit=15
// Returns recent activity entries
router.get("/recent", protect, asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 15, 50);

  const activities = await Activity.find({ userId: req.user._id })
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean();

  res.json({ success: true, data: activities });
}));

// GET /api/activity/stats
// Returns summary statistics
router.get("/stats", protect, asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [totalDays, totalSections, subjectBreakdown] = await Promise.all([
    // Unique active days
    Activity.distinct("dateStr", { userId }),
    // Total activities
    Activity.countDocuments({ userId }),
    // Per-subject breakdown
    Activity.aggregate([
      { $match: { userId } },
      { $group: { _id: "$subject", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  // Active days this week
  const weekAgo    = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekStr    = weekAgo.toISOString().split("T")[0];
  const thisWeek   = await Activity.distinct("dateStr", { userId, dateStr: { $gte: weekStr } });

  // Active days this month
  const monthStart = new Date();
  monthStart.setDate(1);
  const monthStr   = monthStart.toISOString().split("T")[0];
  const thisMonth  = await Activity.distinct("dateStr", { userId, dateStr: { $gte: monthStr } });

  res.json({
    success: true,
    data: {
      totalActiveDays:  totalDays.length,
      totalSections,
      thisWeekDays:     thisWeek.length,
      thisMonthDays:    thisMonth.length,
      subjectBreakdown,
    },
  });
}));

module.exports = router;