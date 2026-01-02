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
      {/* ✅ PAGE HEADING (OUTSIDE CONTAINER) */}
      <h1 className="text-2xl font-bold mb-6">
        Create Organization Structure
      </h1>

      {/* White Container */}
      <div className="max-w-md bg-white p-6 rounded-md border">
        <label className="text-sm font-semibold">Structure Name</label>
        <input
          className="border w-full p-2 mb-4"
          placeholder="Academics"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p className="font-semibold mb-2">Hierarchy Levels</p>

        {levels.map((lvl, i) => (
          <div key={i} className="border p-2 mb-2">
            {i + 1}. {lvl}
          </div>
        ))}

        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1"
            placeholder="Add level"
            value={levelInput}
            onChange={(e) => setLevelInput(e.target.value)}
          />
          <button
            type="button"
            onClick={addLevel}
            className="border px-3 rounded"
          >
            Add
          </button>
        </div>

        <p className="text-xs bg-yellow-200 p-2 my-4 rounded">
          Note: Hierarchy levels cannot be changed after creation.
        </p>

        {message && (
          <p className="bg-green-100 text-green-700 p-2 mb-3 rounded text-sm">
            {message}
          </p>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/admin/organization")}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="border px-4 py-2 rounded bg-black text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
