import express from 'express';
const router = express.Router();
import Match from '../models/Match.js';

// 1. Get All Matches (For Matches Tab)
router.get('/', async (req, res) => {
    try {
        const matches = await Match.find().sort({ matchDate: 1 });
        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get Current LIVE Match (For Live Tab)
router.get('/live-now', async (req, res) => {
    try {
        const liveMatch = await Match.findOne({ status: 'Live' }).sort({ updatedAt: -1 });
        res.json(liveMatch);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Add Match (Admin)
router.post('/add', async (req, res) => {
    try {
        const newMatch = new Match(req.body);
        await newMatch.save();
        res.status(201).json({ message: "Match Added!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Update Match Details (Admin)
router.put('/:id', async (req, res) => {
    try {
        const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMatch);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Add Live Commentary (Admin)
router.post('/commentary/:id', async (req, res) => {
    try {
        const { over, text } = req.body;
        const match = await Match.findById(req.params.id);
        if (match) {
            // Nayi commentary shuru mein add hogi
            match.commentary.unshift({ over, text }); 
            await match.save();
            res.json(match);
        } else {
            res.status(404).json({ message: "Match not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Delete Match
router.delete('/:id', async (req, res) => {
    try {
        await Match.findByIdAndDelete(req.params.id);
        res.json({ message: "Match Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;