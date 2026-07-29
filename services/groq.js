import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

console.log("Groq key loaded:", !!process.env.GROQ_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateKnowledgeGraph(notes) {
  const prompt = `
You are an AI Study Assistant.

Analyze the following study notes and generate a knowledge graph.

Return ONLY valid JSON.

The JSON MUST exactly follow this schema:

{
  "title": "string",
  "summary": "string",

  "nodes": [
    {
      "id": "1",
      "label": "Main Topic",
      "type": "root"
    },
    {
      "id": "2",
      "label": "Concept",
      "type": "concept"
    }
  ],

  "edges": [
    {
      "source": "1",
      "target": "2"
    }
  ],

  "questions": [
    "Question 1",
    "Question 2",
    "Question 3"
  ]
}

Rules:

1. Create between 5 and 10 nodes.
2. The first node MUST be the root node.
3. Every node MUST have:
   - id
   - label
   - type
4. type can only be:
   - root
   - concept
5. Every edge must connect valid node ids.
6. Do NOT return empty arrays.
7. Return ONLY JSON.
8. No markdown.
9. No explanations.

Study Notes:

${notes}
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0.2,

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

    console.log("===== GROQ RAW RESPONSE =====");
    console.log(response);

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const graph = JSON.parse(response);

    if (
      !graph.nodes ||
      graph.nodes.length === 0
    ) {
      throw new Error("AI returned no nodes.");
    }

    return graph;

  } catch (error) {

    console.error("Groq Error:", error);

    return {
      title: "Study Notes",
      summary: "Fallback graph generated because AI response was invalid.",

      nodes: [
        {
          id: "1",
          label: "Study Notes",
          type: "root",
        },
        {
          id: "2",
          label: "Main Concepts",
          type: "concept",
        },
        {
          id: "3",
          label: "Examples",
          type: "concept",
        },
        {
          id: "4",
          label: "Applications",
          type: "concept",
        },
        {
          id: "5",
          label: "Revision",
          type: "concept",
        },
      ],

      edges: [
        {
          source: "1",
          target: "2",
        },
        {
          source: "1",
          target: "3",
        },
        {
          source: "1",
          target: "4",
        },
        {
          source: "1",
          target: "5",
        },
      ],

      questions: [
        "What is the main topic?",
        "Why is this concept important?",
        "Where can it be applied?",
        "Can you explain it in simple words?",
      ],
    };
  }
}