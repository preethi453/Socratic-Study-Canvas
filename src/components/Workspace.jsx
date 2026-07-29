import { useRef, useEffect, useState } from "react";

import "../styles/workspace.css";

import {
  Download,
  Share2,
  Maximize2,
  Minimize2,
  Sparkles,
} from "lucide-react";

import KnowledgeGraph from "./KnowledgeGraph";

function Workspace({
  graphData,
  selectedNode,
  setSelectedNode,
  visitedNodes,
  setVisitedNodes,
}) {
  const graphRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);

      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 300);
    };

    document.addEventListener("fullscreenchange", handleChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  const handleFullScreen = async () => {
  try {
    if (!document.fullscreenElement) {
      await graphRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }

    // Give the browser time to finish the fullscreen transition
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);

  } catch (err) {
    console.error(err);
  }
};

  const handleExport = () => {
    if (!graphData) {
      alert("Generate a graph first.");
      return;
    }

    const blob = new Blob(
      [JSON.stringify(graphData, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "knowledge-graph.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!graphData) {
      alert("Generate a graph first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(
        JSON.stringify(graphData, null, 2)
      );

      alert("Graph copied to clipboard!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = () => {
    alert(
      "Use the Generate button in the Upload Panel after uploading notes."
    );
  };

  return (
    <section className="workspace">
      <div className="workspace-header">

  <h2>Knowledge Graph</h2>

  <p>
    AI generated visualization from your uploaded notes.
  </p>

  <div className="workspace-actions">

    <button onClick={handleGenerate}>
      <Sparkles size={18} />
      Generate
    </button>

    <button onClick={handleExport}>
      <Download size={18} />
      Export
    </button>

    <button onClick={handleShare}>
      <Share2 size={18} />
      Share
    </button>

    <button
      className="icon-btn"
      onClick={handleFullScreen}
      title="Fullscreen"
    >
      {isFullscreen ? (
        <Minimize2 size={18} />
      ) : (
        <Maximize2 size={18} />
      )}
    </button>

  </div>

</div>

      <div
        ref={graphRef}
        className={`graph-card ${
          isFullscreen ? "fullscreen" : ""
        }`}
      >
        <div className="graph-top">
          <div className="graph-title">
            {graphData?.title || "Knowledge Graph"}
          </div>

          <div className="graph-status">
            ● Live Graph
          </div>
        </div>

        <div className="graph-container">
          <KnowledgeGraph
            graphData={graphData}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            visitedNodes={visitedNodes}
            setVisitedNodes={setVisitedNodes}
          />
        </div>
      </div>
    </section>
  );
}

export default Workspace;