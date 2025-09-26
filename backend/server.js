import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import contentRoutes from "./routes/contentRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173", // for local dev
    "https://the-watchlist-graveyard.onrender.com" // your deployed frontend
  ],
  credentials: true, // only if you use cookies/auth headers
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.error(err));

// Routes
app.use("/api/content", contentRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000,
  ()=>console.log(`Server running on port ${process.env.PORT || 5000}`));
