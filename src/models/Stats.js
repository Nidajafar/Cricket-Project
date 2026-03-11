import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match', // Ye Match model se link hai
        required: true
    },
    teamA_Score: { runs: { type: Number, default: 0 }, wickets: { type: Number, default: 0 }, overs: { type: Number, default: 0 } },
    teamB_Score: { runs: { type: Number, default: 0 }, wickets: { type: Number, default: 0 }, overs: { type: Number, default: 0 } },
    currentInnings: { type: String, default: 'Team A' },
    lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('Stats', statsSchema);