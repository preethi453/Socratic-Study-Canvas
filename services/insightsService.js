import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateInsights(notes) {
  const prompt = `
You are an AI Study Coach.

Analyze the following study notes.

Return ONLY valid JSON.

Schema:

{
  "summary":"string",
  "difficulty":"Easy | Medium | Hard",
  "estimatedStudyTime":"string",
  "knowledgeScore":number,

  "strongConcepts":[
    "concept1",
    "concept2"
  ],

  "weakConcepts":[
    "concept1",
    "concept2"
  ],

  "recommendedOrder":[
    "topic1",
    "topic2"
  ],

  "quizSuggestions":[
    "question1",
    "question2",
    "question3"
  ],

  "tips":[
    "tip1",
    "tip2"
  ]
}

Rules:

1. Return ONLY JSON.
2. No markdown.
3. knowledgeScore must be between 0 and 100.
4. Give 3-5 strong concepts.
5. Give 3-5 weak concepts.
6. Give 3-5 recommended topics.
7. Give 3 quiz questions.
8. Give 2 study tips.

Study Notes:

${notes}
`;

  try {

    const completion = await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      temperature: 0.3,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let response = completion.choices[0].message.content;

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(response);

  } catch (error) {

    console.error("Insights Error:", error);

    return {

      summary: "Unable to generate AI insights.",

      difficulty: "Unknown",

      estimatedStudyTime: "Unknown",

      knowledgeScore: 0,

      strongConcepts: [],

      weakConcepts: [],

      recommendedOrder: [],

      quizSuggestions: [],

      tips: [],
    };

  }

}