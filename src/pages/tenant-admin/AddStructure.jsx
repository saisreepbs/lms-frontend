import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddStructure() {
  const navigate = useNavigate();
  
  // TODO: Replace with global state or API
  const [structure, setStructure] = useState({});
  
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
      <h1 className="h4 fw-bold mb-4">
        Add Organization Structure
      </h1>

      {/* ================= LEVEL BOXES ================= */}
      <div className="row g-4">
        {/* ---------- LEVEL 1 : BRANCH ---------- */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <p className="fw-semibold mb-2">Level: Branch</p>

              <input
                value={branchInput}
                onChange={(e) => setBranchInput(e.target.value)}
                placeholder="Branch name"
                className="form-control mb-2"
              />

              <button onClick={addBranch} className="btn btn-outline-secondary btn-sm mb-3">
                + Add Branch
              </button>

              <ul className="small list-unstyled">
                {Object.keys(structure).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ---------- LEVEL 2 : SEMESTER ---------- */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <p className="fw-semibold mb-2">Level: Semester</p>

              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="form-select mb-2"
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
                className="form-control mb-2"
              />

              <button onClick={addSemester} className="btn btn-outline-secondary btn-sm mb-3">
                + Add Semester
              </button>

              <ul className="small list-unstyled">
                {selectedBranch &&
                  Object.keys(structure[selectedBranch] || {}).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ---------- LEVEL 3 : SECTION ---------- */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <p className="fw-semibold mb-2">Level: Section</p>

              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="form-select mb-2"
              >
                <option value="">Select Branch</option>
                {Object.keys(structure).map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="form-select mb-2"
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
                className="form-control mb-2"
              />

              <button onClick={addSection} className="btn btn-outline-secondary btn-sm mb-3">
                + Add Section
              </button>

              <ul className="small list-unstyled">
                {selectedBranch &&
                  selectedSemester &&
                  (structure[selectedBranch][selectedSemester] || []).map(
                    (sec, i) => <li key={i}>{sec}</li>
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SAVE ================= */}
      <div className="d-flex justify-content-end mt-4 gap-2">
        <button
            onClick={() => navigate("/admin/organization")}
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
        <button
          onClick={() => setShowReview(true)}
          className="btn btn-dark"
        >
          Save Structure
        </button>
      </div>

      {/* ================= REVIEW MODAL ================= */}
      {showReview && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Review Structure</h5>
                <button type="button" className="btn-close" onClick={() => setShowReview(false)}></button>
              </div>
              <div className="modal-body">
                {Object.entries(structure).map(([b, sems]) => (
                  <div key={b}>
                    <p className="fw-semibold">➤ {b}</p>
                    {Object.entries(sems).map(([s, secs]) => (
                      <div className="ms-3" key={s}>
                        <p>➤ {s}</p>
                        {secs.map((sec, i) => (
                          <p className="ms-3 small" key={i}>
                            {sec}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowReview(false)}
                  className="btn btn-outline-secondary"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setShowReview(false);
                    // TODO: Save to API
                    setConfirmed(true);
                    navigate("/admin/organization");
                  }}
                  className="btn btn-dark"
                >
                  Confirm & Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUCCESS MESSAGE ================= */}
      {confirmed && (
        <p className="text-success mt-4 fw-semibold">
          ✅ Organization structure updated successfully
        </p>
      )}
    </div>
  );
}
