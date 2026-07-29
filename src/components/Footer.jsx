import { Mail } from "lucide-react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer" id="contact">

      <div className="footer-top">

        {/* Left Side */}
        <div className="footer-brand">

          <div className="footer-logo">

            <div className="footer-logo-icon">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="footer-logo-text">
              <h2>Socratic</h2>
              <span>Study Canvas</span>
            </div>

          </div>

          <p>
            AI-powered study assistant that transforms notes into
            interactive knowledge graphs, helping students learn
            smarter through visualization and Socratic questioning.
          </p>

        </div>

        {/* Right Side */}
        <div className="footer-links">

          <div>
            <h3>Platform</h3>

            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="/login">Dashboard</a>
          </div>

          <div>
            <h3>Resources</h3>

            <a href="#">Documentation</a>
            <a href="#">Blog</a>
            <a href="#">Support</a>
          </div>

          <div>
            <h3>Contact</h3>

            <a href="mailto:contact@studycanvas.ai">
              <Mail size={18} />
              <span>contact@studycanvas.ai</span>
            </a>

            <a href="#">
              GitHub
            </a>

            <a href="#">
              LinkedIn
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Socratic Study Canvas. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;