import React from "react";
import { useDrag } from "react-dnd";
import { BsChatDots } from "react-icons/bs";

const nodeTypes = ["Message"];

const DraggableNode = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "node",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`px-12 py-3 rounded-md border-2 w-full cursor-grab flex justify-center items-center gap-5 ${
        isDragging ? "opacity-70" : "opacity-100"
      }`}
    >
      <BsChatDots />
      <span>{type}</span>
    </div>
  );
};

export default function NodesPanel() {
  return (
    <div>
      {nodeTypes?.map((type, index) => (
        <DraggableNode key={index} type={type} />
      ))}
    </div>
  );
}
