import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contentRoutes from "./routes/contentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET","POST","DELETE","PUT","PATCH"]
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
