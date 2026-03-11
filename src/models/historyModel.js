import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  year: { type: Number, required: true },
  winner: { type: String, required: true },
  runnerUp: { type: String, required: true },
  host: { type: String, required: true },
  // ✨ New Field added here
  tournament: { 
    type: String, 
    required: true, 
    enum: ['T20 World Cup', 'ICC World Cup', 'Champions Trophy', 'Asia Cup'] 
  }
});

const History = mongoose.model('History', historySchema);
export default History;