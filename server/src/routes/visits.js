const express = require("express");
const router = express.Router();
const { Visit } = require("../db");

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
    const newVisit = await Visit.create(req.body);
    res.status(201).json(newVisit);
  } catch (err) {
    console.error("❌ Error adding visit:", err);
    res.status(500).json({ error: "Failed to add visit" });
  }
});

// PUT (update) visit
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Visit.update(req.body, { where: { id: req.params.id } });
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