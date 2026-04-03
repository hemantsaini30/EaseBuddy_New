const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true },
    subject: {
      type: String,
      required: true,
      enum: ["Mathematics", "Science", "English", "Hindi", "Social Science"],
    },
    // NEW — which book does this chapter belong to?
    // e.g. "First Flight", "History", "Kshitij"
    // null for Math and Science (they have no sub-books)
    book: { type: String, default: null },

    classLevel:     { type: Number, required: true, enum: [6, 7, 8, 9, 10] },
    chapterNumber:  { type: Number, required: true },
    description:    { type: String, default: "" },
    tags:           [{ type: String }],
    isActive:       { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
