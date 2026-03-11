import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// DB connection
import connectDB from './src/config/db.js';

// Routes imports
import userRoutes from './src/routes/userRoute.js'; 
import historyRoutes from './src/routes/historyRoutes.js';
import teamRoutes from './src/routes/teamRoutes.js';
import matchRoutes from './src/routes/matchRoutes.js'; 
import statsRoutes from './src/routes/statsRoutes.js';
import playerRoutes from "./src/routes/playerRoutes.js";

dotenv.config();

// ES6 modules mein __dirname hasil karne ke liye
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 📁 Uploads folder check (Agar nahi hai to khud ban jaye)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 🖼️ Static folder for Images
app.use('/uploads', express.static(uploadDir));

// Connect Database
connectDB();
app.get("/",(req,res)=>{
    res.send("cricket api is running")
})
// 🔗 API Routes
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/stats', statsRoutes); 
app.use('/api/players', playerRoutes);
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS ? "Password Found" : "Password Missing");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));