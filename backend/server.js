import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contentRoutes from "./routes/contentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "https://the-watchlist-graveyard.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // if you use cookies or auth headers
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
