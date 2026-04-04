const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

// Route imports
const authRoutes = require("./routes/authRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const progressRoutes = require("./routes/progressRoutes");
const aiRoutes = require("./routes/aiRoutes");
const mockTestRoutes = require("./routes/mockTestRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const formulaRoutes = require("./routes/formulaRoutes");


dotenv.config();
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/mock-test", mockTestRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/formulas", formulaRoutes);


// Health check
app.get("/api/health", (req, res) => res.json({ status: "OK", env: process.env.NODE_ENV }));

// ─── Global Error Handler ────────────────────────────────
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
