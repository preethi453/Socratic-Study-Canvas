import "dotenv/config";

import express from "express";
import cors from "cors";

import generateRoute from "./routes/generate.js";
import explainRoute from "./routes/explain.js";
import insightsRoute from "./routes/insights.js";

const app = express();

console.log("Groq Key Loaded:", !!process.env.GROQ_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Socratic Study Canvas Backend Running 🚀",
  });
});

// API Routes
app.use("/api/generate", generateRoute);
app.use("/api/explain", explainRoute);
app.use("/api/insights", insightsRoute);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});