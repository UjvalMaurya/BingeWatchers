import express from "express"; 
import User from "../models/User.js";
 import jwt from "jsonwebtoken"; 
 const router = express.Router();
  // Register 
  router.post("/register", async (req, res) => {
     try { 
      const user = new User(req.body);
       await user.save(); res.status(201).json({ message: "User created" });
     }
      catch (err) { res.status(400).json({ message: err.message }); } 
  });
  //Login
  router.post("/login", async (req, res) => { 
    const { email, password } = req.body;
     const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
       const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } }); 
    });
  
   export default router;