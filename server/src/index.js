// src/index.js
const express = require("express");
const cors = require("cors");
const visitsRoutes = require("./routes/visits");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/visits", visitsRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Gated Guest Log API running ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
