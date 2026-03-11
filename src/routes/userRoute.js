import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'; // ⬅️ Isay install karein: npm install bcryptjs

const router = express.Router();


// 1. SIGNUP
router.post('/signup', async (req, res) => {
  const { name, password } = req.body;
  const email = req.body.email.toLowerCase().trim();
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already registered" });

    const newUser = new User({ name, email, password, role: 'user' });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2. LOGIN (Bcrypt Fix)
router.post('/login', async (req, res) => {
  const email = req.body.email.toLowerCase().trim();
  const { password } = req.body;
  try {
    const user = await User.findOne({ email });
    // Password match karne ka sahi tareeqa
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(401).json({ message: "Ghalat email ya password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;