import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UploadPanel from "../components/UploadPanel";
import Stats from "../components/Stats";
import Workspace from "../components/Workspace";
import QuestionPanel from "../components/QuestionPanel";
import ProgressPanel from "../components/ProgressPanel";
import AIInsights from "../components/AIInsights";
import MyNotes from "../components/MyNotes";
import "../styles/dashboard.css";

export default function Dashboard() {

  const [activeSection, setActiveSection] = useState("dashboard");

  const [graphData, setGraphData] = useState(null);

  // NEW
  const [notes, setNotes] = useState("");

  const [selectedNode, setSelectedNode] = useState(null);

  const [visitedNodes, setVisitedNodes] = useState(() => {
    const saved = localStorage.getItem("visitedNodes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "visitedNodes",
      JSON.stringify(visitedNodes)
    );
  }, [visitedNodes]);

  return (
    <div className="dashboard">

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="main">

        <Topbar />

        <div className="dashboard-content">

          {/* Dashboard */}

          {activeSection === "dashboard" && (
            <>
              <UploadPanel
                setGraphData={setGraphData}
                setNotes={setNotes}
              />

              <Stats />

              <div className="workspace-grid">

                <Workspace
                  graphData={graphData}
                  selectedNode={selectedNode}
                  setSelectedNode={setSelectedNode}
                  visitedNodes={visitedNodes}
                  setVisitedNodes={setVisitedNodes}
                />

                <div className="side-panel">

                  <QuestionPanel
                    selectedNode={selectedNode}
                  />

                  <ProgressPanel
                    graphData={graphData}
                    visitedNodes={visitedNodes}
                  />

                </div>

              </div>

            </>
          )}

          {/* Upload */}

          {activeSection === "upload" && (

            <UploadPanel
              setGraphData={setGraphData}
              setNotes={setNotes}
            />

          )}

          {/* Knowledge Graph */}

          {activeSection === "graph" && (

            <Workspace
              graphData={graphData}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              visitedNodes={visitedNodes}
              setVisitedNodes={setVisitedNodes}
            />

          )}

          {/* Socratic Coach */}

          {activeSection === "coach" && (

            <QuestionPanel
              selectedNode={selectedNode}
            />

          )}

          {/* Voice */}

          {activeSection === "voice" && (

            <div className="coming-soon">
              <h2>Voice Tutor</h2>
              <p>Coming Soon...</p>
            </div>

          )}
          {/* Notes */}

          {activeSection === "notes" && (
  <MyNotes />
)}

          {/* AI Insights */}

          {activeSection === "insights" && (

            <AIInsights
              notes={notes}
            />

          )}
{/* Analytics */}

          {activeSection === "analytics" && (

            <ProgressPanel
              graphData={graphData}
              visitedNodes={visitedNodes}
            />

          )}

          
{/* Learning Path */}

          {activeSection === "path" && (

            <div className="coming-soon">
              <h2>Learning Path</h2>
              <p>Coming Soon...</p>
            </div>

          )}
          

        </div>

      </main>

    </div>
  );

}