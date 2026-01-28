import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateStructure() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [levelInput, setLevelInput] = useState("");
  const [levels, setLevels] = useState([]);
  const [message, setMessage] = useState("");

  const addLevel = () => {
    if (!levelInput.trim()) return;
    setLevels([...levels, levelInput.trim()]);
    setLevelInput("");
  };

  const handleCreate = () => {
    if (!name) {
      alert("Enter structure name");
      return;
    }

    if (levels.length === 0) {
      alert("Add at least one level");
      return;
    }

    // TODO: Save to API/global state
    const newStructure = {
      name,
      levels
    };
    console.log("Created structure:", newStructure);

    setMessage("Structure created");

    setTimeout(() => {
      navigate("/admin/organization");
    }, 800);
  };

  return (
    <div>
      {/* Page Heading */}
      <h1 className="h4 fw-bold mb-4">
        Create Organization Structure
      </h1>

      {/* White Container */}
      <div className="card" style={{ maxWidth: "450px" }}>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Structure Name</label>
            <input
              className="form-control"
              placeholder="Academics"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <p className="fw-semibold mb-2">Hierarchy Levels</p>

          {levels.map((lvl, i) => (
            <div key={i} className="border rounded p-2 mb-2">
              {i + 1}. {lvl}
            </div>
          ))}

          <div className="d-flex gap-2 mb-3">
            <input
              className="form-control"
              placeholder="Add level"
              value={levelInput}
              onChange={(e) => setLevelInput(e.target.value)}
            />
            <button
              type="button"
              onClick={addLevel}
              className="btn btn-outline-secondary"
            >
              Add
            </button>
          </div>

          <div className="alert alert-warning small mb-3">
            Note: Hierarchy levels cannot be changed after creation.
          </div>

          {message && (
            <div className="alert alert-success small mb-3">
              {message}
            </div>
          )}

          <div className="d-flex justify-content-between">
            <button
              onClick={() => navigate("/admin/organization")}
              className="btn btn-outline-secondary"
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              className="btn btn-dark"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
