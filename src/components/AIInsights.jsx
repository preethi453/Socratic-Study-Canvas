import { useState, useEffect } from "react";
import axios from "axios";

import {
  Brain,
  BookOpen,
  Clock,
  Target,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Route,
} from "lucide-react";

import "../styles/aiinsights.css";

export default function AIInsights({ notes }) {

  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!notes) return;

    const loadInsights = async () => {

      try {

        setLoading(true);
        setError("");

        const res = await axios.post(
          "http://localhost:5000/api/insights",
          { notes }
        );

        setInsights(res.data.insights);

      } catch (err) {

        console.error(err);
        setError("Failed to generate AI Insights.");

      } finally {

        setLoading(false);

      }

    };

    loadInsights();

  }, [notes]);

  if (!notes) {
    return (
      <div className="coming-soon">
        <Brain size={60}/>
        <h2>AI Insights</h2>
        <p>Upload your study notes first.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="coming-soon">
        <Brain size={60} className="spin"/>
        <h2>Generating AI Insights...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="coming-soon">
        <AlertTriangle size={60}/>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!insights) return null;

  return (

    <div className="ai-insights">

      <div className="insights-header">

        <Brain size={42}/>

        <div>

          <h1>AI Study Insights</h1>

          <p>
            Personalized analysis generated from your uploaded notes.
          </p>

        </div>

      </div>
      {/* =========================
    TOP INSIGHT CARDS
========================= */}

<div className="insights-grid">

  {/* Summary */}

  <div className="insight-card summary-card">

    <BookOpen size={28} />

    <h3>Summary</h3>

    <p>{insights.summary}</p>

  </div>

  {/* Difficulty */}

  <div className="insight-card difficulty-card">

    <Target size={28} />

    <h3>Difficulty</h3>

    <h2>{insights.difficulty}</h2>

  </div>

  {/* Study Time */}

  <div className="insight-card time-card">

    <Clock size={28} />

    <h3>Estimated Study Time</h3>

    <h2>{insights.estimatedStudyTime}</h2>

  </div>

  {/* Knowledge Score */}

  <div className="insight-card score-card">

    <Brain size={28} />

    <h3>Knowledge Score</h3>

    <h1>{insights.knowledgeScore}%</h1>

  </div>

</div>
{/* =========================
    STRONG & WEAK CONCEPTS
========================= */}

<div className="insight-section">

  {/* Strong Concepts */}

  <div className="insight-card large-card strong-card">

    <div className="card-header">

      <CheckCircle size={24} />

      <h3>Strong Concepts</h3>

    </div>

    <ul className="insight-list">

      {(insights.strongConcepts || []).map((concept, index) => (

        <li key={index}>
          {concept}
        </li>

      ))}

    </ul>

  </div>

  {/* Weak Concepts */}

  <div className="insight-card large-card weak-card">

    <div className="card-header">

      <AlertTriangle size={24} />

      <h3>Concepts Requiring Improvement</h3>

    </div>

    <ul className="insight-list">

      {(insights.weakConcepts || []).map((concept, index) => (

        <li key={index}>
          {concept}
        </li>

      ))}

    </ul>

  </div>

</div>
{/* =========================
    RECOMMENDED LEARNING PATH
========================= */}

<div className="insight-section">

  <div className="insight-card large-card path-card">

    <div className="card-header">

      <Route size={24} />

      <h3>Recommended Learning Path</h3>

    </div>

    <ol className="path-list">

      {(insights.recommendedOrder || []).map((topic, index) => (

        <li key={index}>

          <span className="step-number">
            {index + 1}
          </span>

          <span className="step-text">
            {topic}
          </span>

        </li>

      ))}

    </ol>

  </div>

</div>
{/* =========================
    PRACTICE QUESTIONS
    & STUDY RECOMMENDATIONS
========================= */}

<div className="insight-section">

  {/* Practice Questions */}

  <div className="insight-card large-card quiz-card">

    <div className="card-header">

      <BookOpen size={24} />

      <h3>Practice Questions</h3>

    </div>

    <ul className="quiz-list">

      {(insights.quizSuggestions || []).map((question, index) => (

        <li key={index}>
          {question}
        </li>

      ))}

    </ul>

  </div>

  {/* Study Recommendations */}

  <div className="insight-card large-card tips-card">

    <div className="card-header">

      <Lightbulb size={24} />

      <h3>Study Recommendations</h3>

    </div>

    <ul className="tips-list">

      {(insights.tips || []).map((tip, index) => (

        <li key={index}>
          {tip}
        </li>

      ))}

    </ul>

  </div>

</div>

</div>

);

}