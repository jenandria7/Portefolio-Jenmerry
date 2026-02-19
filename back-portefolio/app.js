import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import youtubeRoutes from "./routes/youtube.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/health", healthRoutes);
app.use("/api/youtube", youtubeRoutes);

export default app;
