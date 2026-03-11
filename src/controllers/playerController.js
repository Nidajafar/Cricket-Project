import Player from '../models/playerModel.js';

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find({});
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Players ka data nahi mil saka" });
  }
};

// Admin ke liye naya player add karne ka function
export const createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(400).json({ message: "Player save nahi ho saka" });
  }
};