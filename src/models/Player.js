import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, default: 'All-Rounder' },
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    strikeRate: { type: String, default: '0.0' },
    photo: { type: String, default: '' }
});


const player= mongoose.model('Player', playerSchema);
export default player;