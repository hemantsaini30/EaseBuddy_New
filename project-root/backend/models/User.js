const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: function () {
        // Password not required for Google OAuth users
        return !this.googleId;
      },
      minlength: 6,
      select: false, // Never return password in queries
    },
    googleId: { type: String, default: null },
    avatar: { type: String, default: "" },
    // Class: 6, 7, 8, 9, or 10
    classLevel: {
      type: Number,
      enum: [6, 7, 8, 9, 10],
      default: 10,
    },
    school: { type: String, default: "" },
    streak: { type: Number, default: 0 },
    longestStreak:    { type: Number, default: 0 },
    totalSectionsDone:{ type: Number, default: 0 },
    bookmarks: [
      {
        chapterId:    { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
        chapterTitle: { type: String },
        subject:      { type: String },
        classLevel:   { type: Number },
        slug:         { type: String },
        bookName:     { type: String, default: null }, // for English/Hindi/SST
        bookId:       { type: String, default: null },
        subjectId:    { type: String },               // e.g. "social-science"
        addedAt:      { type: Date, default: Date.now },
      },
    ],
    passwordResetToken:   { type: String,  default: null },
    passwordResetExpires: { type: Date,    default: null },
    lastActiveDate: { type: Date, default: Date.now },
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
