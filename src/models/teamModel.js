import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  captain: { type: String, required: true },
  league: { 
    type: String, 
    required: true, 
    enum: ['International', 'PSL', 'IPL'] 
  },
  players: [{ type: String }], // Array of strings for squad
  icon: { type: String },
  color: { type: String, default: '#064E3B' } // Default Green
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);