const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "gated_community.db"),
});

// Define the Visits model
const Visit = sequelize.define("Visit", {
  visitor_name: { type: DataTypes.TEXT, allowNull: false },
  visitor_phone: { type: DataTypes.TEXT },
  house_number: { type: DataTypes.TEXT },
  purpose: { type: DataTypes.TEXT, allowNull: false },
  check_in: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  check_out: { type: DataTypes.DATE },
}, {
  timestamps: false, // Disable createdAt/updatedAt
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection error:", err));

module.exports = { sequelize, Visit };