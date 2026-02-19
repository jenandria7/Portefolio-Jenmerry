import { Router } from "express";
import { search } from "../controllers/youtube.controller.js";

const router = Router();

router.get("/search", search);

export default router;
