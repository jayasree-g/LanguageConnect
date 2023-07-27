import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 8000;
const OPEN_AI_API_KEY = "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";

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.post("/openAi", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.text }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
