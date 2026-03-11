import express from 'express';
import Stats from '../models/Stats.js';
const router = express.Router();

// Get Stats for a specific match
router.get('/:matchId', async (req, res) => {
    try {
        const stats = await Stats.findOne({ matchId: req.params.matchId });
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Stats
router.put('/update/:matchId', async (req, res) => {
    try {
        const updatedStats = await Stats.findOneAndUpdate(
            { matchId: req.params.matchId },
            req.body,
            { new: true, upsert: true } // Upsert matlab agar nahi hai toh naya bana do
        );
        res.json(updatedStats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;