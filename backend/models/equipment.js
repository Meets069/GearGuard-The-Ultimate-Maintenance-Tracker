const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true }, // e.g., Production, IT, HR
  assignedTo: { type: String }, // e.g., "John Doe" (for laptops)
  maintenanceTeam: { 
    type: String, 
    enum: ["IT", "Mechanics", "Electrical"], 
    required: true 
  },
  location: { type: String, required: true }, // e.g., "Floor 2, Room 201"
  status: { 
    type: String, 
    enum: ["Operational", "Under Repair", "Scrapped"], 
    default: "Operational" 
  },
  purchaseDate: { type: Date },
  warrantyExpiration: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Equipment", equipmentSchema);