import "../styles/stats.css";
import { Star, BookOpen, CircleHelp, Flame } from "lucide-react";

export default function Stats({
  stats = {
    learningScore: 0,
    conceptsLearned: 0,
    questionsSolved: 0,
    studyStreak: 0,
  },
}) {
  const cards = [
    {
      title: "Learning Score",
      value: `${stats.learningScore}%`,
      subtitle: "Overall Progress",
      icon: <Star size={15} />,
      color: "purple",
    },
    {
      title: "Concepts Learned",
      value: stats.conceptsLearned,
      subtitle: "Concepts Unlocked",
      icon: <BookOpen size={15} />,
      color: "blue",
    },
    {
      title: "Questions Solved",
      value: stats.questionsSolved,
      subtitle: "Questions Answered",
      icon: <CircleHelp size={15} />,
      color: "green",
    },
    {
      title: "Study Streak",
      value: `${stats.studyStreak} Days`,
      subtitle: "Current Streak",
      icon: <Flame size={15} />,
      color: "orange",
    },
  ];

  return (
    <div className="stats">
      {cards.map((card, index) => (
        <div className="stat-card" key={index}>
          <div className="card-header">
            <span className="card-title">{card.title}</span>

            <div className={`icon-box ${card.color}`}>
              {card.icon}
            </div>
          </div>

          <div className="card-value">{card.value}</div>

          <div className="card-subtitle">{card.subtitle}</div>
        </div>
      ))}
    </div>
  );
}