const mongoose = require("mongoose");

const mistakeSchema = new mongoose.Schema(
  {
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    resourceId:{ type: mongoose.Schema.Types.ObjectId, ref: "Resource", required: true },

    // Snapshot of the question — stored so it shows even if resource changes
    question:       { type: String, required: true },
    options:        [{ type: String }],
    correctIndex:   { type: Number, required: true },
    explanation:    { type: String, default: "" },
    difficulty:     { type: String, enum: ["easy","medium","hard"], default: "medium" },

    // Context
    chapterTitle:   { type: String, required: true },
    subject:        { type: String, required: true },
    classLevel:     { type: Number, required: true },

    // What the student answered (-1 = skipped)
    userAnswerIndex: { type: Number, default: -1 },

    // Mastery tracking
    status: {
      type: String,
      enum: ["unseen", "reattempted", "mastered"],
      default: "unseen",
    },
    attempts:        { type: Number, default: 1 },  // how many times attempted
    lastAttemptCorrect: { type: Boolean, default: false },
    masteredAt:      { type: Date, default: null },

    // How it was added — "wrong" or "skipped"
    addedReason: { type: String, enum: ["wrong", "skipped"], default: "wrong" },
  },
  { timestamps: true }
);

// One mistake per user per question
mistakeSchema.index({ userId: 1, resourceId: 1 }, { unique: true });
// Fast lookup by user + subject
mistakeSchema.index({ userId: 1, subject: 1, status: 1 });

module.exports = mongoose.model("Mistake", mistakeSchema);