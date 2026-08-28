// src/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const visitsRoutes = require("./routes/visits");
const { sequelize } = require("./db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/visits", visitsRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Gated Guest Log API running ✅");
});

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ SQLite database connected");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    server.on("error", (error) => {
      console.error(`❌ Unable to use port ${PORT}:`, error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error.message);
    process.exit(1);
  }
}

startServer();
