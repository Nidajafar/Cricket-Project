import mongoose from 'mongoose';

const matchSchema = mongoose.Schema({
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    teamA_Logo: { type: String },
    teamB_Logo: { type: String },
    status: { 
      type: String, 
      enum: ['Live', 'Upcoming', 'Finished'], 
      default: 'Upcoming' 
    },
    venue: { type: String },
    matchDate: { type: Date },
    videoUrl: { type: String }, // 👈 Live Stream Link (YouTube Embed)
    commentary: [ // 👈 Live updates ke liye array
      {
        over: String,
        text: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);
export default Match;