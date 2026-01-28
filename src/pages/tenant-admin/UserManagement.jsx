import { useState } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      name: "X",
      email: "x@tenant.com",
      role: "Instructor",
      belongsTo: "CSE / Semester 1 / A",
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    branch: "",
    semester: "",
    section: "",
  });

  const addUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;

    setUsers([
      ...users,
      {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        belongsTo: `${newUser.branch} / ${newUser.semester} / ${newUser.section}`,
        status: "Active",
      },
    ]);

    setNewUser({
      name: "",
      email: "",
      role: "",
      branch: "",
      semester: "",
      section: "",
    });

    setShowModal(false);
  };

  return (
    <div>
      {/* Page Heading */}
      <h1 className="h3 fw-bold mb-4">User Management</h1>

      {/* Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          placeholder="Search users"
          className="form-control"
          style={{ width: "250px" }}
        />

        <button
          onClick={() => setShowModal(true)}
          className="btn btn-dark"
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Belongs To</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No users added
                  </td>
                </tr>
              ) : (
                users.map((u, i) => (
                  <tr key={i}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{u.belongsTo}</td>
                    <td>
                      <span className="badge bg-success">
                        {u.status}
                      </span>
                    </td>
                    <td className="text-center">⋮</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD USER MODAL */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add User</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                  >
                    <option value="">Select role</option>
                    <option>Instructor</option>
                    <option>Learner</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Branch</label>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setNewUser({ ...newUser, branch: e.target.value })
                    }
                  >
                    <option value="">Select branch</option>
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>MECH</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Semester</label>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setNewUser({ ...newUser, semester: e.target.value })
                    }
                  >
                    <option value="">Select semester</option>
                    <option>Semester 1</option>
                    <option>Semester 2</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Section</label>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setNewUser({ ...newUser, section: e.target.value })
                    }
                  >
                    <option value="">Select section</option>
                    <option>A</option>
                    <option>B</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={addUser}
                  className="btn btn-dark"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
