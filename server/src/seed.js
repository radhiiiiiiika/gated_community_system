const { sequelize, Visit } = require("./db");
const User = require("./models/user");
const bcrypt = require("bcrypt");

async function seed() {
  await sequelize.sync({ force: true }); // Drops and recreates all tables
  const hash = await bcrypt.hash("password", 10);

  // Seed Users
  await User.bulkCreate([
    { name: "Admin", email: "admin@site.com", password: hash, role: "admin" },
    { name: "Guard", email: "guard@site.com", password: hash, role: "guard" },
    { name: "Sadhana", email: "sadhana@example.com", password: hash, role: "resident" },
  ]);

  // Seed Visits
  await Visit.bulkCreate([
    { visitor_name: "John Doe", visitor_phone: "1234567890", house_number: "A1", purpose: "Meeting" },
    { visitor_name: "Jane Smith", visitor_phone: "0987654321", house_number: "B2", purpose: "Delivery" },
  ]);

  console.log("Seed done ✅");
  process.exit();
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});