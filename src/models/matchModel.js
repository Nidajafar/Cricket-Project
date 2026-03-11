import mongoose from 'mongoose';

const matchSchema = mongoose.Schema(
  {
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    teamALogo: { type: String }, // Flag ya logo ka URL
    teamBLogo: { type: String },
    scoreA: { type: String, default: "0/0 (0)" }, // Example: 156/3 (18.2)
    scoreB: { type: String, default: "0/0 (0)" },
    status: { 
      type: String, 
      required: true, 
      enum: ['Live', 'Upcoming', 'Finished'], 
      default: 'Upcoming' 
    },
    venue: { type: String },
    matchDate: { type: Date, required: true },
  },
  { timestamps: true } // Is se "Created At" khud ba khud aa jayega
);

const Match = mongoose.model('Match', matchSchema);
export default Match;