const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    type: {
      type: String,
      required: true,
      // videos → YouTube embeds
      // ncert  → NCERT PDF (Google Drive)
      // pyq    → Previous Year Questions
      // book   → Reference Book (RD Sharma, etc.)
      // mcq    → MCQ Question Bank
      enum: ["video", "ncert", "pyq", "book", "mcq"],
    },

    // ── For type: "video" ──────────────────────────────
    // TODO: Add YouTube video/playlist IDs here
    youtubeVideoId: { type: String, default: null },
    youtubePlaylistId: { type: String, default: null },
    videoDuration: { type: String, default: "" }, // e.g. "12:34"

    // ── For type: "ncert" | "book" ──────────────────────
    // TODO: Add Google Drive file IDs after uploading PDFs
    // Embed URL: https://drive.google.com/file/d/{driveFileId}/preview
    driveFileId: { type: String, default: null },
    driveDownloadUrl: { type: String, default: null },
    bookTitle: { type: String, default: "" }, // e.g. "RD Sharma Class 10"
    bookAuthor: { type: String, default: "" }, // e.g. "R.D. Sharma"
    buyLink: { type: String, default: null }, // Amazon/Flipkart link

    // ── For type: "pyq" ─────────────────────────────────
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
    year: { type: Number, default: null }, // e.g. 2023
    marks: { type: Number, default: 1 }, // 1, 2, 3, 5
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    // ── For type: "mcq" ─────────────────────────────────
    mcqQuestion: { type: String, default: "" },
    mcqOptions:  [{ type: String }],
    mcqCorrectIndex: { type: Number, default: 0 },
    mcqExplanation:  { type: String, default: "" },

    // NEW — which test does this question belong to?
    testLevel: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    // ── Common ──────────────────────────────────────────
    title: { type: String, required: true },
    order: { type: Number, default: 0 }, // Display order
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
