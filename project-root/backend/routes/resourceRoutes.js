const express = require("express");
const router = express.Router();
const { getResourcesByChapter, createResource } = require("../controllers/resourceController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// GET /api/resources/:chapterId?type=video
router.get("/:chapterId", protect, getResourcesByChapter);
router.post("/", protect, adminOnly, createResource);

module.exports = router;
