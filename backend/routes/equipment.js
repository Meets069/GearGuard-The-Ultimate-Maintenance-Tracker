const express = require("express");
const router = express.Router();
const Equipment = require("../models/equipment");

// 1. Create New Equipment (Manager Only logic handled by UI)
router.post("/add", async (req, res) => {
  try {
    const newAsset = new Equipment(req.body);
    await newAsset.save();
    res.status(201).json({ message: "Equipment Registered", data: newAsset });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2. Get All Equipment
router.get("/all", async (req, res) => {
  const assets = await Equipment.find();
  res.json(assets);
});

module.exports = router;