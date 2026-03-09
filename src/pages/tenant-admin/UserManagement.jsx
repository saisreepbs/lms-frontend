import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getUsers, createUser,
  getOrgStructuresDetailed, getOrgUnitsTree,
  getUserOrgUnits, assignUserOrgUnit, removeUserOrgUnit,
} from "../../api";

const ROLE_LABELS = {
  INSTRUCTOR: "Instructor",
  LEARNER: "Learner",
  ADMIN: "Admin",
};

const ROLE_BADGE_CLASS = {
  INSTRUCTOR: "badge-enterprise",
  LEARNER: "badge-enterprise",
  ADMIN: "badge-enterprise",
};

const roleBadgeStyle = (role) => ({
  INSTRUCTOR: { background: "#e9ecef", color: "#495057" },
  LEARNER: { background: "#f8f9fa", color: "#6c757d" },
  ADMIN: { background: "#dee2e6", color: "#343a40" },
}[role] || { background: "#e9ecef", color: "#495057" });

export default function UserManagement() {
  const { user } = useAuth();
  const tenantId = user?.tenantId;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [newUser, setNewUser] = useState({ fullName: "", email: "", password: "", role: "LEARNER" });

  // Org unit assignment modal state
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [orgModalUser, setOrgModalUser] = useState(null);
  const [orgAssignments, setOrgAssignments] = useState([]);
  const [orgStructures, setOrgStructures] = useState([]);
  const [selectedStructure, setSelectedStructure] = useState("");
  const [orgUnitsTree, setOrgUnitsTree] = useState([]);
  const [selectedOrgUnit, setSelectedOrgUnit] = useState("");
  const [orgLoading, setOrgLoading] = useState(false);
  const [orgError, setOrgError] = useState("");
  const [orgSaving, setOrgSaving] = useState(false);

  const fetchUsers = () => {
    if (!tenantId) return;
    setLoading(true);
    getUsers(tenantId)
      .then(setUsers)
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, [tenantId]);

  const handleAddUser = async () => {
    if (!newUser.fullName.trim() || !newUser.email.trim() || !newUser.password.trim()) {
      setFormError("Full name, email, and password are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      await createUser(tenantId, newUser);
      setNewUser({ fullName: "", email: "", password: "", role: "LEARNER" });
      setShowModal(false);
      fetchUsers();
    } catch {
      setFormError("Failed to create user. Email may already be in use.");
    } finally {
      setSaving(false);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ─── Org Unit Modal Handlers ───────────────────────────────────────────
  const openOrgModal = async (u) => {
    setOrgModalUser(u);
    setShowOrgModal(true);
    setOrgError("");
    setSelectedStructure("");
    setOrgUnitsTree([]);
    setSelectedOrgUnit("");
    setOrgLoading(true);
    try {
      const [assignments, structures] = await Promise.all([
        getUserOrgUnits(tenantId, u.id),
        getOrgStructuresDetailed(tenantId),
      ]);
      setOrgAssignments(assignments);
      setOrgStructures(structures);
    } catch {
      setOrgError("Failed to load org data");
    } finally {
      setOrgLoading(false);
    }
  };

  // Build full breadcrumb path for each org unit
  const buildOrgUnitPaths = (flatTree) => {
    const byId = Object.fromEntries(flatTree.map((u) => [u.id, u]));
    return flatTree.map((u) => {
      const parts = [];
      let cur = u;
      while (cur) {
        parts.unshift(cur.name);
        cur = cur.parentId ? byId[cur.parentId] : null;
      }
      return { ...u, path: parts.join(" / ") };
    });
  };

  const handleStructureChange = async (structureId) => {
    setSelectedStructure(structureId);
    setSelectedOrgUnit("");
    if (!structureId) { setOrgUnitsTree([]); return; }
    try {
      const tree = await getOrgUnitsTree(tenantId, structureId);
      setOrgUnitsTree(buildOrgUnitPaths(tree));
    } catch {
      setOrgError("Failed to load org units");
    }
  };

  const handleAssignOrgUnit = async () => {
    if (!selectedOrgUnit) return;
    setOrgSaving(true);
    setOrgError("");
    try {
      const result = await assignUserOrgUnit(tenantId, orgModalUser.id, {
        orgUnitId: selectedOrgUnit,
        isPrimary: false,
      });
      setOrgAssignments((prev) => [...prev, result]);
      setSelectedOrgUnit("");
    } catch (err) {
      setOrgError(err.response?.data?.message || "Failed to assign org unit");
    } finally {
      setOrgSaving(false);
    }
  };

  const handleRemoveOrgUnit = async (orgUnitId) => {
    setOrgError("");
    try {
      await removeUserOrgUnit(tenantId, orgModalUser.id, orgUnitId);
      setOrgAssignments((prev) => prev.filter((a) => a.orgUnitId !== orgUnitId));
    } catch (err) {
      setOrgError(err.response?.data?.message || "Failed to remove org unit");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-header-title">User Management</h1>
        <button onClick={() => { setFormError(""); setShowModal(true); }} className="btn-enterprise-primary">
          + Add User
        </button>
      </div>

      {error && <div className="alert-enterprise-danger mb-3">{error}</div>}

      <div className="card-enterprise">
        <div className="card-enterprise-header d-flex justify-content-between align-items-center">
          <span style={{ fontWeight: 600 }}>All Users</span>
          <input
            className="form-control-enterprise"
            style={{ width: "220px" }}
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="card-enterprise-body p-0">
          {loading ? (
            <div className="d-flex justify-content-center p-4">
              <div className="loading-enterprise"></div>
              <span className="ms-2" style={{ color: "var(--enterprise-muted)" }}>Loading…</span>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table-enterprise">
                <thead>
                  <tr>
                    <th className="table-enterprise-id">#</th>
                    <th className="table-enterprise-name">Full Name</th>
                    <th>Email</th>
                    <th className="table-enterprise-label">Role</th>
                    <th className="table-enterprise-label">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="table-enterprise-empty">
                        {search ? "No users match your search." : "No users yet. Add the first one."}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((u) => (
                      <tr key={u.id}>
                        <td className="table-enterprise-id">{u.id}</td>
                        <td className="table-enterprise-name">{u.fullName}</td>
                        <td>{u.email}</td>
                        <td>
                          <span
                            className="badge-enterprise"
                            style={roleBadgeStyle(u.role)}
                          >
                            {ROLE_LABELS[u.role] || u.role}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-enterprise-ghost"
                            style={{ fontSize: "0.8rem", padding: "4px 10px" }}
                            onClick={() => openOrgModal(u)}
                          >
                            Org Units
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
          <div className="modal-dialog">
            <div className="modal-content" style={{ border: "1px solid var(--enterprise-border)", borderRadius: "8px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
              <div className="modal-header" style={{ borderBottom: "1px solid var(--enterprise-border)", padding: "1.25rem 1.5rem" }}>
                <h5 className="modal-title" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--enterprise-text)" }}>Add New User</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body" style={{ padding: "1.5rem" }}>
                {formError && <div className="alert-enterprise-danger mb-3">{formError}</div>}

                <div className="form-group-enterprise">
                  <label className="form-label-enterprise">Full Name</label>
                  <input
                    className="form-control-enterprise"
                    placeholder="John Smith"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  />
                </div>

                <div className="form-group-enterprise">
                  <label className="form-label-enterprise">Email Address</label>
                  <input
                    type="email"
                    className="form-control-enterprise"
                    placeholder="john@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>

                <div className="form-group-enterprise">
                  <label className="form-label-enterprise">Password</label>
                  <input
                    type="password"
                    className="form-control-enterprise"
                    placeholder="Temporary password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>

                <div className="form-group-enterprise">
                  <label className="form-label-enterprise">Role</label>
                  <select
                    className="form-control-enterprise"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="LEARNER">Learner</option>
                    <option value="INSTRUCTOR">Instructor</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: "1px solid var(--enterprise-border)", padding: "1rem 1.5rem" }}>
                <button onClick={() => setShowModal(false)} className="btn-enterprise-ghost" disabled={saving}>
                  Cancel
                </button>
                <button onClick={handleAddUser} className="btn-enterprise-primary" disabled={saving}>
                  {saving ? "Creating…" : "Create User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Org Unit Assignment Modal */}
      {showOrgModal && orgModalUser && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
          <div className="modal-dialog" style={{ maxWidth: "540px" }}>
            <div className="modal-content" style={{ border: "1px solid var(--enterprise-border)", borderRadius: "8px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
              <div className="modal-header" style={{ borderBottom: "1px solid var(--enterprise-border)", padding: "1.25rem 1.5rem" }}>
                <h5 className="modal-title" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--enterprise-text)" }}>
                  Org Units — {orgModalUser.fullName}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowOrgModal(false)}></button>
              </div>
              <div className="modal-body" style={{ padding: "1.5rem" }}>
                {orgError && <div className="alert-enterprise-danger mb-3">{orgError}</div>}

                {orgLoading ? (
                  <div style={{ textAlign: "center", padding: "24px", color: "var(--enterprise-muted)" }}>Loading…</div>
                ) : (
                  <>
                    {/* Current assignments */}
                    <div style={{ marginBottom: "1.25rem" }}>
                      <label className="form-label-enterprise" style={{ marginBottom: 8 }}>Current Assignments</label>
                      {orgAssignments.length === 0 ? (
                        <div style={{ color: "var(--enterprise-muted)", fontSize: "0.875rem" }}>No org units assigned yet.</div>
                      ) : (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {orgAssignments.map((a) => (
                            <span key={a.orgUnitId} className="badge-enterprise" style={{ background: "#e9ecef", color: "#495057", display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px" }}>
                              {a.orgUnitPath || a.orgUnitName}
                              <button
                                onClick={() => handleRemoveOrgUnit(a.orgUnitId)}
                                style={{ background: "none", border: "none", cursor: "pointer", color: "#dc3545", fontWeight: 700, fontSize: "1rem", lineHeight: 1, padding: 0 }}
                                title="Remove"
                              >×</button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Add new assignment */}
                    <div className="form-group-enterprise">
                      <label className="form-label-enterprise">Org Structure</label>
                      <select
                        className="form-control-enterprise"
                        value={selectedStructure}
                        onChange={(e) => handleStructureChange(e.target.value)}
                      >
                        <option value="">Select a structure…</option>
                        {orgStructures.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    {orgUnitsTree.length > 0 && (
                      <div className="form-group-enterprise">
                        <label className="form-label-enterprise">Org Unit</label>
                        <select
                          className="form-control-enterprise"
                          value={selectedOrgUnit}
                          onChange={(e) => setSelectedOrgUnit(e.target.value)}
                        >
                          <option value="">Select an org unit…</option>
                          {orgUnitsTree.map((ou) => (
                            <option key={ou.id} value={ou.id}>
                              {ou.path}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {selectedOrgUnit && (
                      <button
                        className="btn-enterprise-primary"
                        onClick={handleAssignOrgUnit}
                        disabled={orgSaving}
                        style={{ marginTop: 8 }}
                      >
                        {orgSaving ? "Assigning…" : "Assign Org Unit"}
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="modal-footer" style={{ borderTop: "1px solid var(--enterprise-border)", padding: "1rem 1.5rem" }}>
                <button onClick={() => setShowOrgModal(false)} className="btn-enterprise-ghost">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
