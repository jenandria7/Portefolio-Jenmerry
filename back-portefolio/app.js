import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import healthRoutes from "./routes/health.routes.js";
import youtubeRoutes from "./routes/youtube.routes.js";
import popupRoutes from "./routes/popup.routes.js";

dotenv.config();
await connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/youtube", youtubeRoutes);
app.use("/api/popup", popupRoutes);

export default app;
