const express = require("express");
const router = express.Router();
const { Visit } = require("../db");

const allowedPurposes = ["Guest", "Delivery", "Helper"];

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateVisit(body) {
  const visitor_name = cleanText(body.visitor_name);
  const visitor_phone = cleanText(body.visitor_phone);
  const house_number = cleanText(body.house_number);
  const purpose = cleanText(body.purpose);
  const errors = [];

  if (visitor_name.length < 2 || visitor_name.length > 100) {
    errors.push("Visitor name must be between 2 and 100 characters.");
  }
  if (visitor_phone && !/^\d{7,15}$/.test(visitor_phone)) {
    errors.push("Phone number must contain 7 to 15 digits.");
  }
  if (house_number.length > 30) {
    errors.push("House number cannot exceed 30 characters.");
  }
  if (!allowedPurposes.includes(purpose)) {
    errors.push("Purpose must be Guest, Delivery, or Helper.");
  }

  return { errors, visit: { visitor_name, visitor_phone: visitor_phone || null, house_number: house_number || null, purpose } };
}

// GET all visits
router.get("/", async (req, res) => {
  try {
    const visits = await Visit.findAll({ order: [["id", "DESC"]] });
    res.json(visits);
  } catch (err) {
    console.error("❌ Error fetching visits:", err);
    res.status(500).json({ error: "Failed to fetch visits" });
  }
});

// POST new visit
router.post("/", async (req, res) => {
  try {
    const { errors, visit } = validateVisit(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const newVisit = await Visit.create(visit);
    res.status(201).json(newVisit);
  } catch (err) {
    console.error("❌ Error adding visit:", err);
    res.status(500).json({ error: "Failed to add visit" });
  }
});

// PUT (update) visit
router.put("/:id", async (req, res) => {
  try {
    const checkOut = req.body.check_out;
    if (!checkOut || Number.isNaN(Date.parse(checkOut))) {
      return res.status(400).json({ error: "A valid check-out time is required." });
    }

    const [updated] = await Visit.update({ check_out: new Date(checkOut) }, { where: { id: req.params.id } });
    if (updated) {
      const updatedVisit = await Visit.findByPk(req.params.id);
      res.json(updatedVisit);
    } else {
      res.status(404).json({ error: "Visit not found" });
    }
  } catch (err) {
    console.error("❌ Error updating visit:", err);
    res.status(500).json({ error: "Failed to update visit" });
  }
});

// DELETE visit
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Visit.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ deletedId: req.params.id });
    } else {
      res.status(404).json({ error: "Visit not found" });
    }
  } catch (err) {
    console.error("❌ Error deleting visit:", err);
    res.status(500).json({ error: "Failed to delete visit" });
  }
});

module.exports = router;
