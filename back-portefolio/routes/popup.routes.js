import { Router } from "express";
import PopupSelection from "../models/PopupSelection.js";

const router = Router();

// POST /api/popup -> enregistre une sélection de popup
router.post("/", async (req, res) => {
  try {
    const { mood, artist, title, videoId, videoUrl, sessionId } = req.body;

    if (!mood && !artist && !title && !videoId) {
      return res.status(400).json({ message: "Données manquantes" });
    }

    const query = `${artist || ""} ${title || ""}`.trim();

    const created = await PopupSelection.create({
      mood,
      artist,
      title,
      query,
      videoId,
      videoUrl,
      sessionId,
    });

    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET /api/popup/latest?sessionId=xxx -> récupère le dernier choix
router.get("/latest", async (req, res) => {
  try {
    const { sessionId } = req.query;

    const filter = {};
    if (sessionId) filter.sessionId = sessionId;

    const latest = await PopupSelection.findOne(filter).sort({ createdAt: -1 });
    return res.json(latest);
  } catch (err) {
    console.error("POPUP ROUTE ERROR:", err); // 👈 AJOUT
    return res.status(500).json({ message: err.message });
  }
});

export default router;
