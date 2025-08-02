const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // for your frontend files

// Save prompt to server (mock DB using a JSON file)
app.post("/save-prompt", (req, res) => {
  const prompt = req.body.prompt;

  fs.appendFile("prompts.txt", prompt + "\n", (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving prompt" });
    }
    res.status(200).json({ message: "Prompt saved successfully" });
  });
});

// Get all saved prompts
app.get("/prompts", (req, res) => {
  fs.readFile("prompts.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading prompts" });
    }
    res.status(200).json({ prompts: data.split("\n").filter(Boolean) });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
