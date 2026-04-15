const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    chapterId:    { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    chapterTitle: { type: String, default: "" },
    subject:      { type: String, default: "" },
    classLevel:   { type: Number, default: 10 },
    section:      { type: String, default: "" }, // "video" | "ncert" | "pyq" etc
    // Date stored as YYYY-MM-DD string for easy grouping
    dateStr:      { type: String, required: true }, // e.g. "2024-01-15"
    timestamp:    { type: Date, default: Date.now },
  },
  { timestamps: false }
);

// Index for fast user+date lookups
activitySchema.index({ userId: 1, dateStr: 1 });
activitySchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model("Activity", activitySchema);