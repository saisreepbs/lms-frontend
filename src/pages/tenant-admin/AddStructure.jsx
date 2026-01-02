import { useState } from "react";

export default function AddStructure({ structure, setStructure, setPage }) {
  // Inputs
  const [branchInput, setBranchInput] = useState("");
  const [semesterInput, setSemesterInput] = useState("");
  const [sectionInput, setSectionInput] = useState("");

  // Selected dropdowns
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  // Review modal
  const [showReview, setShowReview] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  /* ================= ADD HANDLERS ================= */

  const addBranch = () => {
    if (!branchInput) return;
    setStructure({ ...structure, [branchInput]: {} });
    setBranchInput("");
  };

  const addSemester = () => {
    if (!semesterInput || !selectedBranch) return;

    setStructure({
      ...structure,
      [selectedBranch]: {
        ...structure[selectedBranch],
        [semesterInput]: [],
      },
    });
     

    setSemesterInput("");
  };

  const addSection = () => {
    if (!sectionInput || !selectedBranch || !selectedSemester) return;

    setStructure({
      ...structure,
      [selectedBranch]: {
        ...structure[selectedBranch],
        [selectedSemester]: [
          ...(structure[selectedBranch][selectedSemester] || []),
          sectionInput,
        ],
      },
    });

    setSectionInput("");
  };

  /* ================= UI ================= */

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Add Organization Structure
      </h1>

      {/* ================= LEVEL BOXES ================= */}
      <div className="grid grid-cols-3 gap-6">
        {/* ---------- LEVEL 1 : BRANCH ---------- */}
        <div className="border bg-white p-4">
          <p className="font-semibold mb-2">Level: Branch</p>

          <input
            value={branchInput}
            onChange={(e) => setBranchInput(e.target.value)}
            placeholder="Branch name"
            className="border px-2 py-1 w-full mb-2"
          />

          <button onClick={addBranch} className="border px-3 py-1 mb-3">
            + Add Branch
          </button>

          <ul className="text-sm space-y-1">
            {Object.keys(structure).map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        {/* ---------- LEVEL 2 : SEMESTER ---------- */}
        <div className="border bg-white p-4">
          <p className="font-semibold mb-2">Level: Semester</p>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="border px-2 py-1 w-full mb-2"
          >
            <option value="">Select Branch</option>
            {Object.keys(structure).map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <input
            value={semesterInput}
            onChange={(e) => setSemesterInput(e.target.value)}
            placeholder="Semester name"
            className="border px-2 py-1 w-full mb-2"
          />

          <button onClick={addSemester} className="border px-3 py-1 mb-3">
            + Add Semester
          </button>

          <ul className="text-sm space-y-1">
            {selectedBranch &&
              Object.keys(structure[selectedBranch] || {}).map((s) => (
                <li key={s}>{s}</li>
              ))}
          </ul>
        </div>

        {/* ---------- LEVEL 3 : SECTION ---------- */}
        <div className="border bg-white p-4">
          <p className="font-semibold mb-2">Level: Section</p>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="border px-2 py-1 w-full mb-2"
          >
            <option value="">Select Branch</option>
            {Object.keys(structure).map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="border px-2 py-1 w-full mb-2"
          >
            <option value="">Select Semester</option>
            {selectedBranch &&
              Object.keys(structure[selectedBranch] || {}).map((s) => (
                <option key={s}>{s}</option>
              ))}
          </select>

          <input
            value={sectionInput}
            onChange={(e) => setSectionInput(e.target.value)}
            placeholder="Section name"
            className="border px-2 py-1 w-full mb-2"
          />

          <button onClick={addSection} className="border px-3 py-1 mb-3">
            + Add Section
          </button>

          <ul className="text-sm space-y-1">
            {selectedBranch &&
              selectedSemester &&
              (structure[selectedBranch][selectedSemester] || []).map(
                (sec, i) => <li key={i}>{sec}</li>
              )}
          </ul>
        </div>
      </div>

      {/* ================= SAVE ================= */}
      <div className="flex justify-end mt-6 gap-3">
        <button
            onClick={() => setPage("org")}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        <button
          onClick={() => setShowReview(true)}
          className="border px-4 py-2 rounded"
        >
          Save Structure
        </button>
      </div>

      {/* ================= REVIEW MODAL ================= */}
      {showReview && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 w-[400px] border">
            <h2 className="font-bold mb-3">Review Structure</h2>

            {Object.entries(structure).map(([b, sems]) => (
              <div key={b}>
                <p className="font-semibold">➤ {b}</p>
                {Object.entries(sems).map(([s, secs]) => (
                  <div className="ml-4" key={s}>
                    <p>➤ {s}</p>
                    {secs.map((sec, i) => (
                      <p className="ml-4 text-sm" key={i}>
                        {sec}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowReview(false)}
                className="border px-3 py-1"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setShowReview(false);
                  setStructure(structure);   // already updated in-place
                  setConfirmed(true);
                  setPage("org");            // go back to tree

                }}
                className="border px-3 py-1"
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUCCESS MESSAGE ================= */}
      {confirmed && (
        <p className="text-green-600 mt-4 font-semibold">
          ✅ Organization structure updated successfully
        </p>
      )}
    </div>
  );
}
