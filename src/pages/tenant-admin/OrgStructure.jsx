import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getOrgStructures, getOrgUnitsTree } from "../../api";

function buildTree(flatNodes) {
  const map = {};
  const roots = [];
  flatNodes.forEach((n) => { map[n.id] = { ...n, children: [] }; });
  flatNodes.forEach((n) => {
    if (n.parentId && map[n.parentId]) {
      map[n.parentId].children.push(map[n.id]);
    } else if (!n.parentId) {
      roots.push(map[n.id]);
    }
  });
  return roots;
}

function TreeNode({ node, depth = 0, levelNames, onSelect, selectedId }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = node.id === selectedId;

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <div
        className="d-flex align-items-center gap-1 py-1 px-2"
        onClick={() => { if (hasChildren) setOpen(!open); onSelect(node); }}
        style={{
          cursor: "pointer",
          borderRadius: "5px",
          background: isSelected ? "var(--enterprise-primary)" : "transparent",
          color: isSelected ? "#fff" : "var(--enterprise-text)",
          fontSize: "0.875rem",
          userSelect: "none",
        }}
      >
        <span style={{ width: "16px", display: "inline-block", textAlign: "center", fontSize: "0.7rem", opacity: hasChildren ? 1 : 0 }}>
          {hasChildren ? (open ? "▼" : "▶") : ""}
        </span>
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            marginRight: "6px",
            background: isSelected ? "#fff" : "var(--enterprise-primary)",
            flexShrink: 0,
          }}
        />
        <span>{node.name}</span>
        {levelNames && levelNames[node.level] && (
          <span style={{ marginLeft: "auto", fontSize: "0.7rem", opacity: 0.6, fontStyle: "italic" }}>
            {levelNames[node.level]}
          </span>
        )}
      </div>
      {open &&
        hasChildren &&
        node.children.map((child) => (
          <TreeNode key={child.id} node={child} depth={depth + 1} levelNames={levelNames} onSelect={onSelect} selectedId={selectedId} />
        ))}
    </div>
  );
}

export default function OrgStructure() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const tenantId = user?.tenantId;

  const [structures, setStructures] = useState([]);
  const [selectedStructureId, setSelectedStructureId] = useState("");
  const [treeNodes, setTreeNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loadingStructures, setLoadingStructures] = useState(true);
  const [loadingTree, setLoadingTree] = useState(false);
  const [structuresError, setStructuresError] = useState("");

  useEffect(() => {
    if (!tenantId) return;
    getOrgStructures(tenantId)
      .then((data) => {
        setStructures(data);
        if (data.length > 0) setSelectedStructureId(String(data[0].id));
      })
      .catch(() => setStructuresError("Failed to load structures"))
      .finally(() => setLoadingStructures(false));
  }, [tenantId]);

  useEffect(() => {
    if (!selectedStructureId || !tenantId) return;
    setLoadingTree(true);
    setSelectedNode(null);
    getOrgUnitsTree(tenantId, selectedStructureId)
      .then((flat) => setTreeNodes(buildTree(flat)))
      .catch(() => setTreeNodes([]))
      .finally(() => setLoadingTree(false));
  }, [selectedStructureId, tenantId]);

  const selectedStructure = structures.find((s) => String(s.id) === selectedStructureId);

  // Build level name map: { [levelIndex]: typeName }
  const levelNames = {};
  if (selectedStructure?.structure) {
    selectedStructure.structure.forEach((lvl, i) => { levelNames[i] = typeof lvl === "string" ? lvl : lvl.name; });
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-header-title">Organization Structure</h1>
        <div className="d-flex gap-2">
          <button onClick={() => navigate("/admin/organization/create")} className="btn-enterprise-ghost">
            + Create Structure
          </button>
          {selectedStructureId && (
            <button onClick={() => navigate("/admin/organization/update")} className="btn-enterprise-primary">
              Add Units
            </button>
          )}
        </div>
      </div>

      {structuresError && <div className="alert-enterprise-danger mb-3">{structuresError}</div>}

      {loadingStructures ? (
        <div className="d-flex align-items-center" style={{ color: "var(--enterprise-muted)", gap: "0.5rem" }}>
          <div className="loading-enterprise"></div> Loading structures…
        </div>
      ) : structures.length === 0 ? (
        <div className="empty-state-enterprise">
          <p>No organization structures found.</p>
          <button onClick={() => navigate("/admin/organization/create")} className="btn-enterprise-primary">
            Create your first structure
          </button>
        </div>
      ) : (
        <>
          {/* Structure selector */}
          <div className="mb-4" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <label className="form-label-enterprise mb-0">Structure:</label>
            <select
              className="form-control-enterprise"
              style={{ minWidth: "220px", width: "auto" }}
              value={selectedStructureId}
              onChange={(e) => setSelectedStructureId(e.target.value)}
            >
              {structures.map((s) => (
                <option key={s.id} value={String(s.id)}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="row">
            {/* Tree Panel */}
            <div className="col-md-6 mb-3">
              <div className="card-enterprise" style={{ height: "420px", display: "flex", flexDirection: "column" }}>
                <div className="card-enterprise-header">
                  <span style={{ fontWeight: 600 }}>{selectedStructure?.name || "Tree"}</span>
                  {selectedStructure?.structure && (
                    <span style={{ fontSize: "0.75rem", color: "var(--enterprise-muted)" }}>
                      {Array.isArray(selectedStructure.structure)
                        ? selectedStructure.structure.map((s) => (typeof s === "string" ? s : s.name)).join(" → ")
                        : ""}
                    </span>
                  )}
                </div>
                <div className="card-enterprise-body" style={{ flex: 1, overflowY: "auto" }}>
                  {loadingTree ? (
                    <div className="d-flex align-items-center" style={{ color: "var(--enterprise-muted)", gap: "0.5rem" }}>
                      <div className="loading-enterprise"></div> Loading…
                    </div>
                  ) : treeNodes.length === 0 ? (
                    <div className="empty-state-enterprise" style={{ padding: "1rem 0" }}>
                      <p style={{ margin: 0 }}>No units added yet.</p>
                    </div>
                  ) : (
                    treeNodes.map((root) => (
                      <TreeNode
                        key={root.id}
                        node={root}
                        depth={0}
                        levelNames={levelNames}
                        onSelect={setSelectedNode}
                        selectedId={selectedNode?.id}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Details Panel */}
            <div className="col-md-6">
              <div className="card-enterprise" style={{ height: "420px" }}>
                <div className="card-enterprise-header">
                  <span style={{ fontWeight: 600 }}>Details</span>
                </div>
                <div className="card-enterprise-body">
                  {!selectedNode ? (
                    <div className="empty-state-enterprise" style={{ padding: "1rem 0" }}>
                      <p style={{ margin: 0 }}>Select a node to view details.</p>
                    </div>
                  ) : (
                    <dl style={{ fontSize: "0.875rem" }}>
                      <dt style={{ color: "var(--enterprise-muted)", fontWeight: 500, marginBottom: "0.2rem" }}>Name</dt>
                      <dd style={{ marginBottom: "1rem", fontWeight: 600 }}>{selectedNode.name}</dd>

                      <dt style={{ color: "var(--enterprise-muted)", fontWeight: 500, marginBottom: "0.2rem" }}>Level</dt>
                      <dd style={{ marginBottom: "1rem" }}>
                        {levelNames[selectedNode.level]
                          ? `${selectedNode.level} — ${levelNames[selectedNode.level]}`
                          : selectedNode.level}
                      </dd>

                      <dt style={{ color: "var(--enterprise-muted)", fontWeight: 500, marginBottom: "0.2rem" }}>ID</dt>
                      <dd style={{ marginBottom: "1rem", fontFamily: "monospace", fontSize: "0.8rem", color: "var(--enterprise-muted)" }}>{selectedNode.id}</dd>

                      {selectedNode.parentId && (
                        <>
                          <dt style={{ color: "var(--enterprise-muted)", fontWeight: 500, marginBottom: "0.2rem" }}>Parent ID</dt>
                          <dd style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--enterprise-muted)" }}>{selectedNode.parentId}</dd>
                        </>
                      )}
                    </dl>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
