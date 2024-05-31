import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "reactflow/dist/style.css";
import FlowBuilder from "./components/FlowBuilder";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";
import { getItem, removeItem, setItem } from "./utils/localStorage";
import { useNodesState, useEdgesState } from "reactflow";
import toast, { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const initialNodes = [
  {
    id: "1",
    type: "messageNode",
    data: { label: "Text message 1" },
    position: { x: 0, y: 0 },
  },
];

function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    getItem("nodes") || initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    getItem("edges") || []
  );

  const handleNodeTextChange = (id, text) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: text } } : node
      )
    );
    setSelectedNode((prevNode) => ({
      ...prevNode,
      data: { ...prevNode.data, label: text },
    }));
  };

  const handleSave = () => {
    // Find nodes with empty targates
    const targetNodes = new Set(edges.map((edge) => edge.target));
    const nodesWithEmptyTargets = nodes.filter(
      (node) => !targetNodes.has(node.id)
    );

    // IF we have more than one nodes with empty target, will not save the flow & throw error
    if (nodes.length > 1 && nodesWithEmptyTargets.length > 1) {
      toast.error(
        "Cann't save flow : More than one node has empty target handles"
      );
      return;
    }

    // Save flow in localstorage (In real usecase will save flow in our db)
    setItem("nodes", nodes);
    setItem("edges", edges);
    toast.success("Flow saved successfully in local storage");
  };

  // Function to reset the flow
  const handleReset = () => {
    setNodes(initialNodes);
    setEdges([]);
    removeItem("edges");
    removeItem("nodes");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-lvh">
        <div className="flex justify-between h-lvh">
          <section className="h-full w-full">
            <FlowBuilder
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              setSelectedNode={setSelectedNode}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
            />
          </section>
          <aside className="w-96 h-lvh border-l-2 border-l-gray-100 px-2">
            <div className="border-b-2 border-b-gray-100 mb-2 flex justify-center gap-6 p-3">
              <button
                onClick={handleSave}
                className="px-8 py-1.5 rounded-md border-2 border-blue-600 hover:text-blue-600 duration-200 "
              >
                Save
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-1.5 rounded-md border-2 border-red-500 hover:text-red-600 duration-200 "
              >
                Reset
              </button>
            </div>
            {selectedNode ? (
              <SettingsPanel
                nodes={nodes}
                setNodes={setNodes}
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                onNodeTextChange={handleNodeTextChange}
              />
            ) : (
              <NodesPanel />
            )}
          </aside>
        </div>
        <Toaster />
      </div>
    </DndProvider>
  );
}

export default App;
