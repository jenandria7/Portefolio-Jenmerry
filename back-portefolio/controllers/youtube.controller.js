import { searchYoutube } from "../services/youtube.service.js";

export async function search(req, res) {
  try {
    const q = String(req.query.q || "").trim();
    if (!q) return res.status(400).json({ error: "Missing query param: q" });

    const items = await searchYoutube(q, Number(req.query.maxResults || 5));
    return res.json({ items });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}
