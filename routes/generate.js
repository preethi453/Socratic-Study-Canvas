import express from "express";
import { generateKnowledgeGraph } from "../services/groq.js";

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

    const graph = await generateKnowledgeGraph(notes);

    res.json({
      success: true,
      data: graph,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;