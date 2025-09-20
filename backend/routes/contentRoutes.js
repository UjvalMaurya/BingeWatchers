import express from "express";
import Content from "../models/Content.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create content
router.post("/", authMiddleware, async (req,res)=>{
  try {
    const content = new Content({ ...req.body, user: req.user.id });
    const saved = await content.save();
    res.json(saved);
  } catch(err){
    res.status(400).json({message:err.message});
  }
});

// Delete content by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  console.log("DELETE request received for:", req.params.id);  // 👈 ADD
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    if (content.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await content.deleteOne();
    console.log("Deleted:", req.params.id); // 👈 ADD
    res.json({ message: "Content deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err); // 👈 ADD
    res.status(500).json({ message: err.message });
  }
});


// Get all user's content (optionally filter by type)
router.get("/", authMiddleware, async (req,res)=>{
  try {
    const filter = { user: req.user.id };
    if(req.query.type) filter.type = req.query.type;
    const data = await Content.find(filter)
      .populate("connections.prequel connections.sequel connections.spinOff connections.sharedUniverse");
    res.json(data);
  } catch(err){
    res.status(500).json({message: err.message});
  }
});

export default router;
