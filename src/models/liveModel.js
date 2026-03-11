import mongoose from 'mongoose';

const liveSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  title: { type: String, required: true },
  viewers: { type: String, default: "0" },
  commentary: [
    {
      over: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

const Live = mongoose.model('Live', liveSchema);
export default Live;