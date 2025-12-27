const express = require("express");
const router = express.Router();
const MaintenanceRequest = require("../models/MaintenanceRequest");
const Equipment = require("../models/equipment");

// Update Request Stage (including Scrap Logic)
router.patch("/update-stage/:id", async (req, res) => {
  try {
    const { stage } = req.body; // e.g., "Scrap", "Repaired", "In Progress"
    
    // 1. Update the Maintenance Request
    const updatedRequest = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      { stage },
      { new: true }
    );

    // 2. IF stage is "Scrap", update the linked Equipment status
    if (stage === "Scrap") {
      await Equipment.findByIdAndUpdate(updatedRequest.equipmentId, {
        status: "Scrapped"
      });
    }

    res.json({ 
      message: `Request moved to ${stage}`, 
      data: updatedRequest 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});