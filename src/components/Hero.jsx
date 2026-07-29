import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-tag">
          <Sparkles size={14} />
          AI Powered Learning Platform
        </span>

        <h1>
          Transform your notes
          <br />
          <span>into an Interactive Knowledge Graph</span>
        </h1>

        <p>
          Upload your study material and let AI generate meaningful
          connections, insights, and Socratic questions to accelerate
          your learning journey.
        </p>

        <div className="hero-buttons">
          <Link to="/login" className="primary-btn">
            Get Started
            <ArrowRight size={18}/>
          </Link>

          <a href="#features" className="secondary-btn">
            Explore Demo
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <h2>98%</h2>
            <p>AI Accuracy</p>
          </div>

          <div>
            <h2>24/7</h2>
            <p>AI Assistance</p>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Hero;
