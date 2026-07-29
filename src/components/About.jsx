import "../styles/about.css";
import {
  Brain,
  Sparkles,
  Network,
  GraduationCap,
} from "lucide-react";

function About() {
  return (
    <section className="about" id="about">

      <div className="about-left">

        <span className="about-tag">
          ABOUT PLATFORM
        </span>

        <h2>
          AI That Helps You
          <span> Understand, Not Memorize</span>
        </h2>

        <p>
          Socratic Study Canvas transforms ordinary notes into interactive
          knowledge graphs. Instead of simply providing answers, the AI guides
          learners with intelligent questions, helping them develop a deeper
          understanding of every concept.
        </p>

        <div className="about-list">

          <div className="about-item">
            <Brain size={26} />
            <div>
              <h4>AI-Powered Learning</h4>
              <p>Generate structured concept maps instantly.</p>
            </div>
          </div>

          <div className="about-item">
            <Network size={26} />
            <div>
              <h4>Knowledge Connections</h4>
              <p>Visualize how concepts relate to one another.</p>
            </div>
          </div>

          <div className="about-item">
            <Sparkles size={26} />
            <div>
              <h4>Personalized Study</h4>
              <p>Receive AI-generated learning suggestions.</p>
            </div>
          </div>

        </div>

      </div>

      <div className="about-right">

        <div className="about-card">

          <GraduationCap size={60} />

          <h3>Smart Learning Experience</h3>

          <p>
            Upload notes, generate concept graphs, answer Socratic questions,
            and track your mastery—all in one intelligent workspace.
          </p>

        </div>

      </div>

    </section>
  );
}

export default About;