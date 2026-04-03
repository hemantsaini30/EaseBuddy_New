const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.post("/doubt", protect, async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // 🔥 best free model
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    const data = await response.json();

    

    if (!response.ok) {
      return res.status(500).json({
        error: "Groq API failed",
        details: data,
      });
    }

    res.json(data);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;