const mongoose = require("mongoose");

const formulaSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    subject:     { type: String, required: true }, // "Mathematics" | "Science"
    classLevel:  { type: Number, required: true },
    chapterName: { type: String, required: true },

    // Display order on the page
    order: { type: Number, default: 0 },

    // Formula card fields
    title:       { type: String, required: true }, // e.g. "Ohm's Law"
    formula:     { type: String, required: true }, // e.g. "V = IR"
    description: { type: String, default: "" },    // plain English explanation
    variables:   [
      {
        symbol:  { type: String }, // e.g. "V"
        meaning: { type: String }, // e.g. "Potential difference (Volts)"
      },
    ],
    example:     { type: String, default: "" },    // worked example
    category:    { type: String, default: "" },    // e.g. "Kinematics", "Algebra"
    isKeyFormula: { type: Boolean, default: false }, // starred / most important
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Index for fast chapter lookups
formulaSchema.index({ chapterId: 1, order: 1 });

module.exports = mongoose.model("Formula", formulaSchema);