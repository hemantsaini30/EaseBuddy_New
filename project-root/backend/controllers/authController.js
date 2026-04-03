const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ─── POST /api/auth/register ──────────────────────────────
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, classLevel, school } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  const user = await User.create({ name, email, password, classLevel, school });

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      classLevel: user.classLevel,
      streak: user.streak,
      token: generateToken(user._id),
    },
  });
});

// ─── POST /api/auth/login ─────────────────────────────────
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Select password explicitly (it's excluded by default)
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      classLevel: user.classLevel,
      avatar: user.avatar,
      streak: user.streak,
      token: generateToken(user._id),
    },
  });
});

// ─── GET /api/auth/me ─────────────────────────────────────
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ success: true, data: user });
});

// ─── PUT /api/auth/update-profile ────────────────────────
const updateProfile = asyncHandler(async (req, res) => {
  const { name, school, classLevel } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, school, classLevel },
    { new: true, runValidators: true }
  );
  res.json({ success: true, data: user });
});

module.exports = { registerUser, loginUser, getMe, updateProfile };
