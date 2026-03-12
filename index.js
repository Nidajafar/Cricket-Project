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
import router from './src/routes/PlayerRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Updated Middleware (CORS Fix)
app.use(cors({
    origin: ["https://frontend-chi-brown-90.vercel.app", "http://localhost:5173"], // Live aur local dono allow hain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 📁 Uploads folder check
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

// Connect Database
connectDB();

app.get("/", (req, res) => {
    res.send("cricket api is running");
});

// 🔗 API Routes
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/stats', statsRoutes); 
app.use('/api/players', router);

// Error Handling Middleware (401 aur doosre errors dekhne ke liye)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));