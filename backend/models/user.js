// backend/models/users.js
const mongoose=require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      // UPDATE THIS LINE TO MATCH REACT LABELS:
      enum: ["Requester", "Technician", "Manager"], 
      default: "Requester"
    },
    teamName: { type: String, default: "" }, // Change teamId to teamName for now
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);