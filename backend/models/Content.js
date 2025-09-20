import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["Anime","Web Series","Movie Series","Single Movie","Animated Movie","Book"], // <-- added Book
    required: true
  },
  poster: String,
  language: [String],
  genres: [String],
  seasons: Number,
  totalEpisodes: Number,
  moviesCount: Number,
  duration: String,
  status: { type: String, enum: ["Ongoing","Completed","Hiatus"] },
  connections: {
    prequel: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
    sequel: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
    spinOff: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
    sharedUniverse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }]
  },
  rating: Number,
  review: String,
  platforms: [String],
  releaseDate: Date,
  ageRating: String,
  author: String,      // optional for books
  pages: Number,       // optional for books
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
},{timestamps:true});

export default mongoose.model("Content", contentSchema);
