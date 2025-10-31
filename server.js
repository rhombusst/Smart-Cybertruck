const express = require("express");
const { exec } = require("child_process");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get("/open-processing", (req, res) => {
  const filePath = req.query.path;
  if (!filePath) return res.status(400).send("No path provided");

  // Wrap path in quotes (for spaces)
  const command = `"${filePath}"`;

  exec(command, (err) => {
    if (err) {
      console.error("Error launching Processing:", err);
      return res.status(500).send("❌ Failed to open: " + filePath);
    }
    console.log("✅ Opened:", filePath);
    res.send("✅ Successfully opened: " + filePath);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});