import Match from '../models/matchModel.js';

// 1. Naya Match Save Karne ke liye (POST)
export const createMatch = async (req, res) => {
  try {
    // Postman se jo data aa raha hai, usay model ke mutabiq check karein
    const { teamA, teamB, scoreA, status, matchDate } = req.body;

    // Validation: Check karein ke zaroori cheezain missing to nahi
    if (!teamA || !teamB) {
      return res.status(400).json({ message: "Team A aur Team B ke naam zaroori hain!" });
    }

    const newMatch = new Match({
      teamA,
      teamB,
      scoreA: scoreA || "0/0", // Agar score nahi bheja to default 0/0
      status: status || "Upcoming",
      matchDate: matchDate || Date.now()
    });

    const savedMatch = await newMatch.save();
    console.log("Match Saved Successfully: ✅", savedMatch);
    res.status(201).json(savedMatch);

  } catch (error) {
    // Agar MongoDB reject karey (maslan duplicate ID ya validation fail)
    console.log("MongoDB Error Details: ❌", error.message);
    res.status(400).json({ 
      message: "Match save nahi ho saka", 
      error: error.message 
    });
  }
};

// 2. Saare Matches Get karne ke liye (GET)
export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({}).sort({ createdAt: -1 }); // Newest first
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Score Update karne ke liye (PUT)
export const updateMatch = async (req, res) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Validators zaroor run karein
    );
    if (!updatedMatch) return res.status(404).json({ message: "Match nahi mila" });
    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};