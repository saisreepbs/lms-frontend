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
        className="d-flex align-items-center gap-2 small py-1"
        style={{ cursor: "pointer" }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        {/* Expand / Collapse Arrow */}
        {hasChildren ? (
          <span style={{ width: "16px" }}>
            {open ? "▼" : "▶"}
          </span>
        ) : (
          <span style={{ width: "16px" }} />
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
      <h1 className="h3 fw-bold mb-4">
        Organization Structure
      </h1>

      {/* Top Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <select className="form-select" style={{ width: "auto" }}>
          <option>
            {structure?.name || "Select Structure"}
          </option>
          <option>Academics</option>
          <option>Corporate Training</option>
          <option>Clubs</option>
        </select>

        <div className="d-flex gap-2">
          <button
            onClick={() => navigate("/admin/organization/create")}
            className="btn btn-outline-secondary"
          >
            Create
          </button>

          <button
            onClick={() => navigate("/admin/organization/update")}
            className="btn btn-outline-secondary"
          >
            Update
          </button>
        </div>
      </div>

      {/* Panels */}
      <div className="row">
        {/* Tree Panel */}
        <div className="col-md-6 mb-3">
          <div className="card" style={{ height: "420px", overflowY: "auto" }}>
            <div className="card-body">
              <p className="h5 fw-semibold mb-3">
                Tree Panel
              </p>

              {!structure ? (
                <p className="small text-muted">
                  No structure created yet
                </p>
              ) : (
                <TreeNode node={structure} />
              )}
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <p className="h5 fw-semibold mb-3">
                Details Panel
              </p>
              <p className="small text-muted">
                Select a node to view details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
