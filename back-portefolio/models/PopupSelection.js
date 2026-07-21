import mongoose from "mongoose";

const PopupSelectionSchema = new mongoose.Schema(
  {
    mood: { type: String, trim: true },
    artist: String,
    title: String,
    query: String,
    videoId: String,
    videoUrl: String,
    sessionId: String,
    dateNaissance: Date,
    signeAstro: String,
  },
  { timestamps: true },
);

export default mongoose.model("PopupSelection", PopupSelectionSchema);
