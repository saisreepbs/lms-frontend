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
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Actions */}
      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Search users"
          className="border px-3 py-2 w-64"
        />

        <button
          onClick={() => setShowModal(true)}
          className="border px-4 py-2 bg-black text-white rounded"
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Belongs To</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
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
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.role}</td>
                  <td className="border p-2">{u.belongsTo}</td>
                  <td className="border p-2">
                    <span className="text-green-600 font-semibold">
                      {u.status}
                    </span>
                  </td>
                  <td className="border p-2 text-center">⋮</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD USER MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-100 p-6 border">
            <h2 className="text-xl font-bold mb-4">Add User</h2>

            <label className="text-sm font-semibold">Name</label>
            <input
              className="border w-full p-2 mb-2"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
            />

            <label className="text-sm font-semibold">Email</label>
            <input
              className="border w-full p-2 mb-2"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <label className="text-sm font-semibold">Role</label>
            <select
              className="border w-full p-2 mb-2"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
            >
              <option value="">Select role</option>
              <option>Instructor</option>
              <option>Learner</option>
            </select>

            <label className="text-sm font-semibold">Branch</label>
            <select
              className="border w-full p-2 mb-2"
              onChange={(e) =>
                setNewUser({ ...newUser, branch: e.target.value })
              }
            >
              <option value="">Select branch</option>
              <option>CSE</option>
              <option>ECE</option>
              <option>MECH</option>
            </select>

            <label className="text-sm font-semibold">Semester</label>
            <select
              className="border w-full p-2 mb-2"
              onChange={(e) =>
                setNewUser({ ...newUser, semester: e.target.value })
              }
            >
              <option value="">Select semester</option>
              <option>Semester 1</option>
              <option>Semester 2</option>
            </select>

            <label className="text-sm font-semibold">Section</label>
            <select
              className="border w-full p-2 mb-4"
              onChange={(e) =>
                setNewUser({ ...newUser, section: e.target.value })
              }
            >
              <option value="">Select section</option>
              <option>A</option>
              <option>B</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={addUser}
                className="border px-4 py-2 bg-black text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
