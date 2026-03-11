import express from 'express';
import player from '../models/player.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // File delete karne ke liye (Optional but good)

const router = express.Router();

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check karein ke 'uploads' folder exist karta hai
    if (!fs.existsSync('uploads/')) {
        fs.mkdirSync('uploads/');
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 1. Get all players
router.get('/', async (req, res) => {
    try {
        const players = await player.find();
        res.json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Add player with Image
router.post('/add', upload.single('photo'), async (req, res) => {
  try {
    const { name, role, matches, runs, wickets, strikeRate } = req.body;
    
    // Photo path set karna
    const photoPath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';

    const newRecord = new player({
      name,
      role,
      matches,
      runs,
      wickets,
      strikeRate,
      photo: photoPath
    });

    await newRecord.save();
    res.status(201).json({ message: "Player saved successfully!", data: newRecord });

  } catch (err) {
    console.error("Error saving data:", err.message);
    res.status(400).json({ message: err.message });
  }
});

// 3. Update Player (Image Update Logic Added)
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Agar nayi photo upload hui hai, to path update karein
    if (req.file) {
      updateData.photo = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updatedPlayer = await player.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!updatedPlayer) return res.status(404).json({ message: "Player not found" });
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. Delete Player (Final Fix for Delete Error)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await player.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
        return res.status(404).json({ message: "Player not found in database" });
    }
    
    res.json({ message: "Player Deleted Successfully" });
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;