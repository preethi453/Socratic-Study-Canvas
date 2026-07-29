import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">

        {/* Badge */}

        <div className="hero-tag">
          <Sparkles size={16} />
          <span>AI Powered Learning Platform</span>
        </div>

        {/* Heading */}

        <h1>
          Transform your notes
          <br />
          <span>Into an Interactive Knowledge Graph</span>
        </h1>

        {/* Description */}

        <p>
          Upload your study material and let AI intelligently transform
          scattered notes into interactive concept maps, generate
          meaningful insights, and guide your learning through Socratic
          questioning.
        </p>

        {/* Buttons */}

        <div className="hero-buttons">
          <Link to="/login" className="primary-btn">
            Get Started
            <ArrowRight size={18} />
          </Link>

          <a href="#features" className="secondary-btn">
            Explore Demo
          </a>
        </div>

        {/* Statistics */}

        <div className="hero-stats">

          <div className="stat">
            <h2>98%</h2>
            <p>AI Accuracy</p>
          </div>

          <div className="stat">
            <h2>24/7</h2>
            <p>AI Assistance</p>
          </div>

          <div className="stat">
            <h2>10K+</h2>
            <p>Concepts Generated</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;