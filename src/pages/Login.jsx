import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setError("");

  if (!formData.email || !formData.password) {
    setError("Please enter email and password.");
    return;
  }

  // SIGN UP
  if (!isLogin) {
    if (!formData.name) {
      setError("Please enter your name.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");

    setIsLogin(true);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    return;
  }

  // SIGN IN
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (
    storedUser &&
    storedUser.email === formData.email &&
    storedUser.password === formData.password
  ) {
    navigate("/dashboard");
  } else {
    setError("Invalid email or password.");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="brand">
          <h1>Socratic Study Canvas</h1>

          <p>
            Transform your notes into interactive knowledge graphs and learn
            through AI-powered Socratic questioning.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-box">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {!isLogin && (
              <div className="input-box">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}

            {error && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                {error}
              </p>
            )}

            <button type="submit" className="auth-btn">
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="switch-auth">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setIsLogin(false);
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setIsLogin(true);
                  }}
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          <Link to="/" className="back-home">
            ← Back to Home
          </Link>

          
        </div>
      </div>
    </div>
  );
}

export default Login;