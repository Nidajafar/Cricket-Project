import express from 'express';
import Team from '../models/teamModel.js';
const router = express.Router();

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a new team
router.post('/add', async (req, res) => {
  try {
    const team = new Team(req.body);
    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a team
router.delete('/:id', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Team Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;