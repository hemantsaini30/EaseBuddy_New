const express = require("express");
const router = express.Router();
const { getMyProgress, markSectionComplete } = require("../controllers/progressController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/me", protect, getMyProgress);
router.put("/mark-section", protect, markSectionComplete);

module.exports = router;
