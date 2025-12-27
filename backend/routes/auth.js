// const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/user");

// const router = express.Router();

// // password rule
// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

// /**
//  * SIGNUP
//  */
// router.post("/signup", async (req, res) => {
//   const { email, password } = req.body;

//   // email duplicate
//   const exists = await User.findOne({ email });
//   if (exists) {
//     return res.status(400).json({ message: "Email already exists" });
//   }

//   // password validation
//   if (!passwordRegex.test(password)) {
//     return res.status(400).json({
//       message:
//         "Password must contain uppercase, lowercase, special character and minimum 8 characters"
//     });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await User.create({
//     email,
//     password: hashedPassword
//   });

//   res.status(201).json({ message: "Signup successful" });
// });

// /**
//  * LOGIN
//  */
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).json({ message: "Account not exist" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid Password" });
//   }

//   res.json({ message: "Login successful" });
// });

// module.exports = router;
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user"); // Fixed path to plural "users"

const router = express.Router();
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

/** SIGNUP **/
router.post("/signup", async (req, res) => {
  try {
    // Destructure ALL fields from the React formData
    const { name, email, password, role, team } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password too weak." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with ALL fields
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role, 
      teamName: team // Match the field name in your model
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database Error" });
  }
});

/** LOGIN **/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Account does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

    // IMPORTANT: Return the role and team so React can redirect
    res.json({ 
      message: "Login successful", 
      user: {
        id: user._id,
        name: user.name,
        role: user.role, // React needs this for 'user.role !== role' check
        team: user.teamName
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
