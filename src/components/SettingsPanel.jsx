import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function SettingsPanel({
  nodes,
  setNodes,
  selectedNode,
  setSelectedNode,
  onNodeTextChange,
}) {
  return (
    <div className="settings-panel">
      <div className="flex justify-center mb-2 pb-2 border-b relative">
        <h2 className="font-bold">Message</h2>
        <button
          className="absolute top-1 left-2"
          onClick={() => {
            // Hide setting panel when click on back arrow
            let updatedData = [...nodes];
            updatedData.map((node) => (node.selected = false));
            setNodes(updatedData);
            setSelectedNode(null);
          }}
        >
          <FaArrowLeftLong />
        </button>
      </div>

      <textarea
        className="w-full p-2 border rounded"
        value={selectedNode?.data?.label || ""}
        onChange={(e) => onNodeTextChange(selectedNode.id, e.target.value)}
      />
    </div>
  );
}
