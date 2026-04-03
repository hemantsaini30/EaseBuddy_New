const asyncHandler = require("express-async-handler");
const Resource = require("../models/Resource");

// ─── GET /api/resources/:chapterId?type=video ────────────
const getResourcesByChapter = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const filter = { chapterId: req.params.chapterId, isActive: true };
  if (type) filter.type = type;

  const resources = await Resource.find(filter).sort({ order: 1 });
  res.json({ success: true, count: resources.length, data: resources });
});

// ─── POST /api/resources (admin only) ────────────────────
const createResource = asyncHandler(async (req, res) => {
  // TODO: Validate driveFileId or youtubeVideoId based on type
  const resource = await Resource.create(req.body);
  res.status(201).json({ success: true, data: resource });
});

module.exports = { getResourcesByChapter, createResource };
