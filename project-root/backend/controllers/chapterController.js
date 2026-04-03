const asyncHandler = require("express-async-handler");
const Chapter = require("../models/Chapter");

// ─── GET /api/chapters?subject=Science&classLevel=10 ─────
const getChapters = asyncHandler(async (req, res) => {
  const { subject, classLevel, book } = req.query;
  const filter = { isActive: true };
  if (subject) filter.subject = subject;
  if (classLevel) filter.classLevel = Number(classLevel);
  if (book) filter.book = book;

  const chapters = await Chapter.find(filter).sort({ chapterNumber: 1 });
  res.json({ success: true, count: chapters.length, data: chapters });
});

// ─── GET /api/chapters/:slug ──────────────────────────────
const getChapterBySlug = asyncHandler(async (req, res) => {
  const chapter = await Chapter.findOne({ slug: req.params.slug, isActive: true });
  if (!chapter) {
    res.status(404);
    throw new Error("Chapter not found");
  }
  res.json({ success: true, data: chapter });
});

// ─── POST /api/chapters (admin only) ─────────────────────
const createChapter = asyncHandler(async (req, res) => {
  const chapter = await Chapter.create(req.body);
  res.status(201).json({ success: true, data: chapter });
});

// ─── PUT /api/chapters/:id (admin only) ──────────────────
const updateChapter = asyncHandler(async (req, res) => {
  const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!chapter) {
    res.status(404);
    throw new Error("Chapter not found");
  }
  res.json({ success: true, data: chapter });
});

module.exports = { getChapters, getChapterBySlug, createChapter, updateChapter };
