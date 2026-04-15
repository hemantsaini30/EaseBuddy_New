const express      = require("express");
const router       = express.Router();
const asyncHandler = require("express-async-handler");
const { protect }  = require("../middlewares/authMiddleware");
const Progress     = require("../models/Progress");
const {
  getMyProgress,
  markSectionComplete,
  addTime,
} = require("../controllers/progressController");

router.get("/me",           protect, getMyProgress);
router.put("/mark-section", protect, markSectionComplete);
router.put("/add-time",     protect, addTime);

module.exports = router;