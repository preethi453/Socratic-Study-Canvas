import dagre from "dagre";
import {
  ReactFlow,
  Controls,
  Background,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const rootNode = {
  background: "#7C3AED",
  color: "#fff",
  borderRadius: "16px",
  padding: "12px",
  width: 220,
  fontWeight: 700,
  fontSize: "17px",
  textAlign: "center",
  boxShadow: "0 12px 35px rgba(124,58,237,.35)",
};

const childNode = {
  background: "#1E293B",
  color: "#E2E8F0",
  border: "1px solid #475569",
  borderRadius: "12px",
  padding: "10px",
  width: 180,
  fontWeight: 500,
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,.25)",
};

const edgeStyle = {
  strokeWidth: 3,
  stroke: "#8B5CF6",
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 220;
const nodeHeight = 70;

function getLayoutedElements(nodes, edges) {
  dagreGraph.setGraph({
    rankdir: "LR", // Left -> Right
    nodesep: 100,
    ranksep: 140,
    marginx: 50,
    marginy: 50,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  nodes.forEach((node) => {
    const position = dagreGraph.node(node.id);

    node.position = {
      x: position.x - nodeWidth / 2,
      y: position.y - nodeHeight / 2,
    };

    minX = Math.min(minX, node.position.x);
    maxX = Math.max(maxX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxY = Math.max(maxY, node.position.y);
  });

  // Center the graph
  const graphWidth = maxX - minX;
  const graphHeight = maxY - minY;

  const canvasWidth = 1200;
  const canvasHeight = 700;

  const offsetX = (canvasWidth - graphWidth) / 2 - minX;
  const offsetY = (canvasHeight - graphHeight) / 2 - minY;

  nodes.forEach((node) => {
    node.position = {
      x: node.position.x + offsetX,
      y: node.position.y + offsetY,
    };
  });

  return { nodes, edges };
}
export default function KnowledgeGraph({
  graphData,
  selectedNode,
  setSelectedNode,
  visitedNodes,
  setVisitedNodes,
}) {
  if (!graphData) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#94A3B8",
          fontSize: "18px",
        }}
      >
        Upload notes and generate your AI Knowledge Graph
      </div>
    );
  }

  let nodesData = graphData.nodes || [];
  let edgesData = graphData.edges || [];

  if (nodesData.length === 0) {
    nodesData = [
      {
        id: "1",
        label: "Binary Search",
        type: "root",
      },
      {
        id: "2",
        label: "Sorted Arrays",
        type: "concept",
      },
      {
        id: "3",
        label: "Time Complexity",
        type: "concept",
      },
      {
        id: "4",
        label: "Applications",
        type: "concept",
      },
    ];

    edgesData = [
      {
        source: "1",
        target: "2",
      },
      {
        source: "1",
        target: "3",
      },
      {
        source: "1",
        target: "4",
      },
    ];
  }

  const flowNodes = nodesData.map((node) => ({
    id: String(node.id),

    position: {
      x: 0,
      y: 0,
    },

    data: {
      label: node.label,
    },

    style: {
      ...(node.type === "root" ? rootNode : childNode),

      background: visitedNodes.includes(String(node.id))
        ? "#166534"
        : node.type === "root"
        ? "#7C3AED"
        : "#1E293B",

      border:
        selectedNode?.id === String(node.id)
          ? "3px solid #22C55E"
          : "1px solid #475569",

      transition: "all .25s ease",
    },
  }));

  const flowEdges = edgesData.map((edge, index) => ({
    id: `edge-${index}`,

    source: String(edge.source),

    target: String(edge.target),

    animated: true,

    markerEnd: {
      type: MarkerType.ArrowClosed,
    },

    style: edgeStyle,
  }));

  const { nodes, edges } = getLayoutedElements(
    flowNodes,
    flowEdges
  );

  const onNodeClick = (_, node) => {
    setSelectedNode(node);

    setVisitedNodes((prev) =>
      prev.includes(node.id) ? prev : [...prev, node.id]
    );
  };

  return (
    <ReactFlow
  nodes={nodes}
  edges={edges}
  onNodeClick={onNodeClick}
  fitView
  fitViewOptions={{
    padding: 0.3,
  }}
  minZoom={0.4}
  maxZoom={2}
  defaultViewport={{
    x: 0,
    y: 0,
    zoom: 1,
  }}
  nodesDraggable={false}
  nodesConnectable={false}
  elementsSelectable
  panOnDrag
  zoomOnScroll
  zoomOnPinch
  zoomOnDoubleClick
  proOptions={{
    hideAttribution: true,
  }}
>
  <Controls position="bottom-left" />
  <Background variant="dots" gap={25} size={1.5} />
</ReactFlow>
  );
}