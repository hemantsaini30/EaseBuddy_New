const express      = require("express");
const router       = express.Router();
const crypto       = require("crypto");
const asyncHandler = require("express-async-handler");
const User         = require("../models/User");
const generateToken = require("../utils/generateToken");
const { sendPasswordResetEmail } = require("../utils/sendEmail");
const { protect }  = require("../middlewares/authMiddleware");

// ── Existing routes ───────────────────────────────────────
const {
  registerUser, loginUser, getMe, updateProfile,
} = require("../controllers/authController");

router.post("/register",        registerUser);
router.post("/login",           loginUser);
router.get("/me",               protect, getMe);
router.put("/update-profile",   protect, updateProfile);

// ── POST /api/auth/forgot-password ────────────────────────
// Student enters their email → we send a reset link
router.post("/forgot-password", asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  // Always respond with success even if email not found
  // This prevents email enumeration attacks
  if (!user) {
    return res.json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
    });
  }

  // Generate a secure random token
  const rawToken   = crypto.randomBytes(32).toString("hex");
  // Hash it before storing (so DB leak doesn't expose tokens)
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  // Save hashed token + 1 hour expiry to user
  user.passwordResetToken   = hashedToken;
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save({ validateBeforeSave: false });

  // Build reset URL with RAW token (not hashed)
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;

  try {
    await sendPasswordResetEmail(user.email, resetLink, user.name);
    res.json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (emailError) {
    // If email fails, clear the token so user can try again
    user.passwordResetToken   = null;
    user.passwordResetExpires = null;
    await user.save({ validateBeforeSave: false });

    console.error("Email send failed:", emailError);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
}));

// ── GET /api/auth/verify-reset-token/:token ───────────────
// Frontend calls this to check if token is still valid
// before showing the new password form
router.get("/verify-reset-token/:token", asyncHandler(async (req, res) => {
  // Hash the raw token from URL to compare with stored hash
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken:   hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // not expired
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Reset link is invalid or has expired.",
    });
  }

  res.json({ success: true, message: "Token is valid." });
}));

// ── POST /api/auth/reset-password/:token ──────────────────
// Student submits new password
router.post("/reset-password/:token", asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password || password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters.");
  }

  // Hash the raw token from URL
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find user with valid token
  const user = await User.findOne({
    passwordResetToken:   hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Reset link is invalid or has expired.");
  }

  // Set new password (pre-save hook in User.js will hash it)
  user.password             = password;
  user.passwordResetToken   = null;
  user.passwordResetExpires = null;
  await user.save();

  // Log them in automatically with a new token
  res.json({
    success: true,
    message: "Password reset successful.",
    data: {
      _id:        user._id,
      name:       user.name,
      email:      user.email,
      classLevel: user.classLevel,
      token:      generateToken(user._id),
    },
  });
}));

module.exports = router;