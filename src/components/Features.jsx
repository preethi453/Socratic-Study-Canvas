import "../styles/features.css";
import {
  Brain,
  Network,
  FileText,
  MessageCircle,
  BarChart3,
  Sparkles,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: <Brain size={34} />,
      title: "AI Concept Mapping",
      desc: "Convert study notes into interactive knowledge graphs using Generative AI.",
    },
    {
      icon: <Network size={34} />,
      title: "Knowledge Graph",
      desc: "Visualize relationships between concepts with an interactive graph.",
    },
    {
      icon: <MessageCircle size={34} />,
      title: "Socratic Questions",
      desc: "Strengthen understanding through guided AI-generated questions.",
    },
    {
      icon: <FileText size={34} />,
      title: "PDF & Notes Upload",
      desc: "Upload lecture notes, PDFs and documents to generate study maps.",
    },
    {
      icon: <BarChart3 size={34} />,
      title: "Progress Tracking",
      desc: "Track mastered concepts and monitor your learning journey.",
    },
    {
      icon: <Sparkles size={34} />,
      title: "AI Insights",
      desc: "Receive personalized recommendations to improve understanding.",
    },
  ];

  return (
    <section className="features" id="features">

      <div className="section-title">
        <span>FEATURES</span>

        <h2>
          Everything You Need to
          <span> Learn Smarter</span>
        </h2>

        <p>
          Experience the next generation of learning with AI-powered concept
          visualization and intelligent tutoring.
        </p>
      </div>

      <div className="feature-grid">

        {features.map((item, index) => (
          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;