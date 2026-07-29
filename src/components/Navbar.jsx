import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <header className="navbar-wrapper">
      <div className="navbar">

        <Link to="/" className="logo">
          <div className="logo-icon">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="logo-text">
            <h2>Socratic</h2>
            <span>Study Canvas</span>
          </div>
        </Link>

        {!isDashboard && (
          // Renamed from "nav" -> "main-nav" so this can never collide with
          // an unrelated ".nav" class defined in another stylesheet.
          <nav className={`main-nav ${open ? "active" : ""}`}>
            <a href="#features" onClick={() => setOpen(false)}>Features</a>
            <a href="#works" onClick={() => setOpen(false)}>How it Works</a>
            <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
            <a href="#about" onClick={() => setOpen(false)}>About</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          </nav>
        )}

        <div className="nav-right">
          {isDashboard ? (
            <>
              <Link to="/dashboard/profile" className="signin">
                Profile
              </Link>

              <Link to="/" className="start-btn">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="signin">
                Sign In
              </Link>

              <Link to="/login" className="start-btn">
                Get Started
              </Link>
            </>
          )}
        </div>

        {!isDashboard && (
          <button
            className="mobile-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        )}

      </div>
    </header>
  );
}

export default Navbar;
