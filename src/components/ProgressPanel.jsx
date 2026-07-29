import "../styles/progress.css";

import {
  Trophy,
  Target,
  CheckCircle2,
  Clock,
  RotateCcw,
} from "lucide-react";

function ProgressPanel({
  graphData,
  visitedNodes,
}) {
  const totalConcepts =
    graphData?.nodes?.length || 0;

  const completedConcepts =
    visitedNodes.length;

  const remainingConcepts =
    Math.max(
      totalConcepts - completedConcepts,
      0
    );

  const mastery =
    totalConcepts === 0
      ? 0
      : Math.round(
          (completedConcepts /
            totalConcepts) *
            100
        );

  const estimatedTime =
    remainingConcepts * 2;

  const resetProgress = () => {
    localStorage.removeItem(
      "visitedNodes"
    );

    window.location.reload();
  };

  return (
    <section className="progress-panel">

      {/* Header */}

      <div className="progress-header">

        <div>

          <h2>Learning Analytics</h2>

          <p>
            Your current study session
          </p>

        </div>

        <Trophy size={26} />

      </div>

      {/* Mastery */}

      <div className="mastery-card">

        <div
          className="mastery-ring"
          style={{
            "--progress": mastery,
          }}
        >

          <div className="ring-inner">

            <h2>{mastery}%</h2>

            <span>Mastery</span>

          </div>

        </div>

        <div className="mastery-info">

          <h3>

            {mastery === 100
              ? "Completed!"
              : "Keep Learning"}

          </h3>

          <p>

            {completedConcepts} of{" "}
            {totalConcepts} concepts
            completed.

          </p>

        </div>

      </div>

      {/* Metrics */}

      <div className="metrics">

        <div className="metric-card">

          <Target size={20} />

          <div>

            <strong>
              {totalConcepts}
            </strong>

            <span>
              Total Concepts
            </span>

          </div>

        </div>

        <div className="metric-card">

          <CheckCircle2 size={20} />

          <div>

            <strong>
              {completedConcepts}
            </strong>

            <span>
              Completed
            </span>

          </div>

        </div>

        <div className="metric-card">

          <Clock size={20} />

          <div>

            <strong>
              {estimatedTime} min
            </strong>

            <span>
              Time Left
            </span>

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="activity">

        <h3 className="activity-title">

          Progress

        </h3>

        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width: `${mastery}%`,
            }}
          />

        </div>

        <p className="progress-text">

          {mastery}% Completed

        </p>
                {mastery === 100 && (

          <div className="success-card">

            <div className="success-icon">
              🎉
            </div>

            <h4>Excellent Work!</h4>

            <p>
              You've mastered every concept in
              this study session.
            </p>

          </div>

        )}

      </div>

      {/* Footer */}

      <button
        className="secondary-btn"
        onClick={resetProgress}
      >

        <RotateCcw size={18} />

        Reset Progress

      </button>

    </section>
  );
}

export default ProgressPanel;