const express = require("express");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
const port = 3003; // Use a different port to avoid conflict

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/data/:symbol", (req, res) => {
  const results = [];
  const symbol = req.params.symbol;
  const filePath = path.join(__dirname, `${symbol}.csv`);

  if (fs.existsSync(filePath)) {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        res.json(results);
      });
  } else {
    res.status(404).send("File not found");
  }
});

// For any other requests, serve the React app's index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
