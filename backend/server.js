const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
// backend/server.js
const authRoutes = require("./routes/auth"); 
const equipmentRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.set("strictQuery", false); // optional, avoids warnings
mongoose.connect("mongodb://127.0.0.1:27017/portaluser", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use("/", authRoutes);
app.use("/api/equipment", equipmentRoutes);

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
