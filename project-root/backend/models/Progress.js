const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    subject: { type: String, required: true },
    classLevel: { type: Number, required: true },

    // What has been completed in this chapter?
    completedSections: {
      video: { type: Boolean, default: false },
      ncert: { type: Boolean, default: false },
      pyq: { type: Boolean, default: false },
      book: { type: Boolean, default: false },
      mcq: { type: Boolean, default: false },
    },
    isChapterComplete: { type: Boolean, default: false },

    // Analytics: time spent in minutes
    timeSpentMinutes: { type: Number, default: 0 },

    // MCQ score for this chapter
    lastMCQScore: { type: Number, default: null }, // e.g. 14 out of 20
  },
  { timestamps: true }
);

// Compound unique index: one progress record per user per chapter
progressSchema.index({ userId: 1, chapterId: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);
