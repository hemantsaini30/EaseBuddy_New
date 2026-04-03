const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe, updateProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/update-profile", protect, updateProfile);

// TODO: Add Google OAuth route
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// router.get("/google/callback", passport.authenticate("google"), googleCallback);

module.exports = router;
