import { useCallback, useRef, useState } from "react";
import ReactFlow, { Controls, Background, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "./nodes";
import { useDrop } from "react-dnd";

function FlowBuilder(props) {
  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    setSelectedNode,
  } = props;

  const containerRef = useRef(null);

  // To drop the node
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "node",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      // Check if containerRef.current is available
      if (!containerRef.current) {
        console.error("Container ref is not available");
        return;
      }

      // TODO will make this dynamic droping position
      // const position = containerRef.current.getBoundingClientRect();
      const newNode = {
        id: (nodes.length + 1).toString(),
        type: "messageNode",
        position: { x: 100, y: 100 },
        data: { label: `Text message ${nodes.length + 1}` },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  // To connect two nodes via edges
  const onConnect = useCallback(
    (params) => {
      // These line will make sure that one edge originating from a source handle
      const sourceHandle = params.sourceHandle;
      const existingEdges = edges.filter(
        (edge) =>
          edge.source === params.source && edge.sourceHandle === sourceHandle
      );

      if (existingEdges.length === 0) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [edges, nodes]
  );

  // Function to select node to edit in settings panel
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
        containerRef.current = instance;
      }}
      style={{ height: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default FlowBuilder;
