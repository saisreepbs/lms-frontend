import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- Tree Node Component ---------- */
function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: depth * 16 }}>
      {/* Node Row */}
      <div
        className="flex items-center gap-2 text-sm cursor-pointer select-none py-1"
        onClick={() => hasChildren && setOpen(!open)}
      >
        {/* Expand / Collapse Arrow */}
        {hasChildren ? (
          <span className="w-4">
            {open ? "▼" : "▶"}
          </span>
        ) : (
          <span className="w-4" />
        )}

        <span>{node.name}</span>
      </div>

      {/* Children */}
      {open &&
        hasChildren &&
        node.children.map((child, index) => (
          <TreeNode
            key={index}
            node={child}
            depth={depth + 1}
          />
        ))}
    </div>
  );
}

/* ---------- Org Structure Page ---------- */
export default function OrgStructure() {
  const navigate = useNavigate();
  
  // TODO: Replace with global state or API call
  const [structure] = useState({
    name: "Academics",
    branches: {}
  });

  return (
    <div>
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-6">
        Organization Structure
      </h1>

      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6">
        <select className="border px-4 py-2 rounded-md bg-white">
          <option>
            {structure?.name || "Select Structure"}
          </option>
          <option>Academics</option>
          <option>Corporate Training</option>
          <option>Clubs</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/organization/create")}
            className="border px-4 py-2 rounded-md bg-white"
          >
            Create
          </button>

          <button
            onClick={() => navigate("/admin/organization/update")}
            className="border px-4 py-2 rounded-md bg-white"
          >
            Update
          </button>
        </div>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-2 gap-6">
        {/* Tree Panel */}
        <div className="border bg-white p-4 h-105 overflow-auto">
          <p className="text-xl font-semibold mb-4">
            Tree Panel
          </p>

          {!structure ? (
            <p className="text-sm text-gray-400">
              No structure created yet
            </p>
          ) : (
            <TreeNode node={structure} />
          )}
        </div>

        {/* Details Panel */}
        <div className="border bg-white p-4">
          <p className="text-xl font-semibold mb-4">
            Details Panel
          </p>
          <p className="text-sm text-gray-400">
            Select a node to view details
          </p>
        </div>
      </div>
    </div>
  );
}
