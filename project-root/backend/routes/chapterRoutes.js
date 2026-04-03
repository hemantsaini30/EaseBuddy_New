const express = require("express");
const router = express.Router();
const {
  getChapters,
  getChapterBySlug,
  createChapter,
  updateChapter,
} = require("../controllers/chapterController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.get("/", protect, getChapters); // GET /api/chapters?subject=Science&classLevel=10
router.get("/:slug", protect, getChapterBySlug); // GET /api/chapters/chemical-reactions
router.post("/", protect, adminOnly, createChapter);
router.put("/:id", protect, adminOnly, updateChapter);

module.exports = router;
