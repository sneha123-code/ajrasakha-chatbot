const express = require("express");
const cors = require("cors");
const { goldenDataset, popDataset } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

// Search function
function findAnswer(dataset, message) {
  return dataset.find(item =>
    message.toLowerCase().includes(item.question)
  );
}

// Dummy AI response
function getAIResponse(message) {
  return `AI Suggestion: Try proper fertilizer and irrigation for "${message}"`;
}

app.post("/chat", (req, res) => {
  const { message } = req.body;

  // 1. Golden Dataset
  const golden = findAnswer(goldenDataset, message);
  if (golden) {
    return res.json({ source: "Golden", answer: golden.answer });
  }

  // 2. PoP
  const pop = findAnswer(popDataset, message);
  if (pop) {
    return res.json({ source: "PoP", answer: pop.answer });
  }

  // 3. AI
  const ai = getAIResponse(message);
  return res.json({ source: "AI", answer: ai });
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});