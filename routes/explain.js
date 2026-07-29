import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { concept } = req.body;

    if (!concept) {
      return res.status(400).json({
        success: false,
        message: "Concept is required.",
      });
    }

    const prompt = `
You are an expert AI tutor.

Explain the following concept in a beginner-friendly way.

Concept:
${concept}

Return ONLY valid JSON in this format:

{
  "concept": "",
  "explanation": "",
  "example": "",
  "misconception": "",
  "tip": ""
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.4,

      response_format: {
        type: "json_object",
      },
    });

    const result = JSON.parse(
      completion.choices[0].message.content
    );

    res.json({
      success: true,
      data: result,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to generate explanation.",
    });
  }
});

export default router;