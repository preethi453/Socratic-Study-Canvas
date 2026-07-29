import "../styles/sidebar.css";

import {
  LayoutDashboard,
  Upload,
  Network,
  BrainCircuit,
  Mic,
  Route,
  BarChart3,
  Sparkles,
  FileText,
  Crown,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ activeSection, setActiveSection }) {
  const menu = [
    {
      icon: <LayoutDashboard size={18} />,
      text: "Dashboard",
      id: "dashboard",
    },
    {
      icon: <Upload size={18} />,
      text: "Upload Notes",
      id: "upload",
    },
    {
      icon: <Network size={18} />,
      text: "Knowledge Graph",
      id: "graph",
    },
    {
      icon: <BrainCircuit size={18} />,
      text: "Socratic Coach",
      id: "coach",
    },
    {
      icon: <Mic size={18} />,
      text: "Voice Tutor",
      id: "voice",
      badge: "NEW",
    },
    {
      icon: <Route size={18} />,
      text: "Learning Path",
      id: "path",
    },
    {
      icon: <BarChart3 size={18} />,
      text: "Analytics",
      id: "analytics",
    },
    {
      icon: <Sparkles size={18} />,
      text: "AI Insights",
      id: "insights",
    },
    {
      icon: <FileText size={18} />,
      text: "My Notes",
      id: "notes",
    },
    
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">✦</div>

        <div className="logo-text">
          <h2>Socratic</h2>
          <p>Study Canvas</p>
        </div>
      </div>

      <nav>
        {menu.map((item) => (
          <div
            key={item.id}
            className={
              activeSection === item.id
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActiveSection(item.id)}
            style={{ cursor: "pointer" }}
          >
            {item.icon}

            <span>{item.text}</span>

            {item.badge && <small>{item.badge}</small>}
          </div>
        ))}
      </nav>

      <div className="ai-card">
        <div className="ai-header">
          <Sparkles size={18} />
          <h4>AI Assistant</h4>
        </div>

        <div className="ai-item">
          <span>Today's Goal</span>
          <strong>2 / 5 Concepts</strong>
        </div>

        <div className="ai-item">
          <span>Weak Topic</span>
          <strong>Dynamic Programming</strong>
        </div>

        <button>
          Continue Learning
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar">A</div>

          <div>
            <h4>Amrutha</h4>
            <p>Student</p>
          </div>
        </div>

        <div className="score">
          <div>
            <span>Learning Score</span>
            <strong>91%</strong>
          </div>

          <div className="progress">
            <div className="fill"></div>
          </div>
        </div>

        <button className="upgrade-btn">
          <Crown size={18} />
          Upgrade Plan
        </button>
      </div>

    </aside>
  );
}