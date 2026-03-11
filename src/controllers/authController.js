import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Token banane ka function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '30d' });
};

// 📝 USER REGISTRATION
export const registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email.toLowerCase().trim(); // Saaf suthri email

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User pehle se maujood hai" });

    const user = await User.create({ name, email, password });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔑 USER LOGIN
export const loginUser = async (req, res) => {
  try {
    // 💡 Input ko clean aur lowercase karein
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      // Agar yahan aaye, toh matlab password match nahi hua
      res.status(401).json({ message: "Ghalat email ya password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};