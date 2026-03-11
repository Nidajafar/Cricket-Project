import express from 'express';
import History from '../models/historyModel.js';
const router = express.Router();

// @desc    Get all history records
// @route   GET /api/history
router.get('/', async (req, res) => {
  try {
    const data = await History.find().sort({ year: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Add a new record
// @route   POST /api/history/add
// backend/routes/historyRoutes.js

router.post('/add', async (req, res) => {
  try {
    const data = req.body;

    // ✨ Check: Agar data Array (list) hai to insertMany use karo
    if (Array.isArray(data)) {
      const records = await History.insertMany(data);
      return res.status(201).json({ message: "All records saved successfully!", count: records.length });
    } 

    // ✨ Agar data sirf ek single object hai
    const newRecord = new History(data);
    await newRecord.save();
    res.status(201).json({ message: "Single record saved successfully!" });

  } catch (err) {
    console.error("Error saving data:", err.message);
    res.status(400).json({ message: err.message });
  }
});


// @desc    Delete a record
// @route   DELETE /api/history/:id
router.delete('/:id', async (req, res) => {
  try {
    await History.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;