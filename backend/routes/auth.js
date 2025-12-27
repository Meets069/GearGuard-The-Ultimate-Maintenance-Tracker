const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

// password rule
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

/**
 * SIGNUP
 */
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // email duplicate
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // password validation
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain uppercase, lowercase, special character and minimum 8 characters"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: "Signup successful" });
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Account not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  res.json({ message: "Login successful" });
});

module.exports = router;
