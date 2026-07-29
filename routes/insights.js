import express from "express";
import { generateInsights } from "../services/insightsService.js";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { notes } = req.body;

    if (!notes || notes.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Notes are required.",
      });
    }

    const insights = await generateInsights(notes);

    res.json({
      success: true,
      insights,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI insights.",
    });

  }

});

export default router;