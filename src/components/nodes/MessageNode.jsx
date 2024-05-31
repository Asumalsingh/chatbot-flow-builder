import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { IoLogoWhatsapp } from "react-icons/io";

export default function MessageNode(props) {
  const { id, data, selected, isConnectable } = props;

  return (
    <div
      className={`bg-white rounded-md border ${
        selected ? "border-cyan-600" : ""
      } shadow-sm w-32 overflow-hidden`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 bg-blue-500"
        id="a"
        isConnectable={isConnectable}
      />

      <div className="flex justify-between items-center mb-2 bg-cyan-400 rounded-t-md px-2 py-1">
        <span className="font-semibold text-gray-700 text-[0.5rem]">
          Send Message
        </span>
        <div className="bg-white text-green-500 rounded-full p-0.5">
          <IoLogoWhatsapp size={10} />
        </div>
      </div>
      <div className="text-gray-700 px-2 text-[0.5rem]">{data.label}</div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 bg-red-500"
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}
