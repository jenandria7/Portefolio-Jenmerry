import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ ok: true, message: "Backend OK ✅" });
});

export default router;
