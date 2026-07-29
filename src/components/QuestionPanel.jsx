import { useState, useEffect } from "react";
import api from "../api/api";

import "../styles/question.css";

import {
  BrainCircuit,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  X,
} from "lucide-react";

function QuestionPanel({ selectedNode }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setQuestionIndex(0);
    setExplanation(null);
    setShowExplanation(false);
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="question-panel">
        <div className="question-header">
          <div>
            <h2>Socratic Coach</h2>
            <p>Select a concept</p>
          </div>

          <span className="progress-pill">0%</span>
        </div>

        <div className="question-progress">
          <div
            className="question-progress-fill"
            style={{ width: "0%" }}
          />
        </div>

        <div className="question-card">

          <div className="question-tag">
            <BrainCircuit size={16}/>
            Waiting...
          </div>

          <h3>
            Click any node in the Knowledge Graph to begin learning.
          </h3>

          <div className="hint-box">

            <Lightbulb size={18}/>

            <div>
              <strong>Getting Started</strong>

              <p>
                Select a concept to receive guided questions and AI
                explanations.
              </p>

            </div>

          </div>

        </div>

      </div>
    );
  }

  const concept = selectedNode.data.label;

  const questions = [
    `What is ${concept}?`,
    `Why is ${concept} important?`,
    `How does ${concept} connect to other concepts?`,
    `Can you explain ${concept} in simple words?`,
    `Can you think of a real-world example of ${concept}?`,
  ];

  const currentQuestion = questions[questionIndex];

  const progress = Math.round(
    ((questionIndex + 1) / questions.length) * 100
  );

  const nextQuestion = () => {
    setQuestionIndex((prev) => (prev + 1) % questions.length);
    setExplanation(null);
    setShowExplanation(false);
  };

  const fetchExplanation = async () => {
    try {
      setLoading(true);

      const response = await api.post("/explain", {
        concept,
      });

      setExplanation(response.data.data);
      setShowExplanation(true);

    } catch (err) {
      console.error(err);
      alert("Failed to generate explanation.");
    } finally {
      setLoading(false);
    }
  };
  return (
  <>
    <div className="question-panel">

      <div className="question-header">
        <div>
          <h2>Socratic Coach</h2>

          <p>
            Question {questionIndex + 1} of {questions.length}
          </p>
        </div>

        <span className="progress-pill">
          {progress}%
        </span>
      </div>

      <div className="question-progress">
        <div
          className="question-progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="question-card">

        <div className="question-tag">
          <BrainCircuit size={16} />
          {concept}
        </div>

        <h3>{currentQuestion}</h3>

        {!showExplanation && (
          <div className="hint-box">
            <Lightbulb size={18} />

            <div>
              <strong>Hint</strong>

              <p>
                Think about how <strong>{concept}</strong> connects with
                related concepts before answering.
              </p>
            </div>
          </div>
        )}

      </div>

      <div className="question-actions">

        <button
          className="secondary-btn"
          onClick={nextQuestion}
        >
          <RefreshCw size={16} />
          Next Question
        </button>

        <button
          className="primary-btn"
          onClick={fetchExplanation}
          disabled={loading}
        >
          {loading ? "Generating..." : "Show Explanation"}

          <ArrowRight size={16} />
        </button>

      </div>

    </div>

    {showExplanation && explanation && (
      <div
        className="fullscreen-overlay"
        onClick={() => setShowExplanation(false)}
      >
        <div
          className="fullscreen-card"
          onClick={(e) => e.stopPropagation()}
        >

          <div className="fullscreen-header">

            <div>

              <h2>{concept}</h2>

              <p>AI Generated Explanation</p>

            </div>

            <button
              className="close-btn"
              onClick={() => setShowExplanation(false)}
            >
              <X size={20} />
            </button>

          </div>

          <div className="fullscreen-body">

            <section>

              <h3>Explanation</h3>

              <p>{explanation.explanation}</p>

            </section>

            <section>

              <h3>Example</h3>

              <p>{explanation.example}</p>

            </section>

            <section>

              <h3>Common Misconception</h3>

              <p>{explanation.misconception}</p>

            </section>

            <section>

              <h3>Study Tip</h3>

              <p>{explanation.tip}</p>

            </section>

          </div>

        </div>
      </div>
    )}
  </>
);

}

export default QuestionPanel;