const jwt = require("jsonwebtoken");

/**
 * Generate a signed JWT token for a given user ID
 * @param {string} userId - MongoDB ObjectId
 * @returns {string} signed JWT
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

module.exports = generateToken;
