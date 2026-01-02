// src/App.jsx
import { useState } from "react";

/* ✅ FIXED IMPORT PATH */
import Sidebar from "./tenant-admin/Sidebar";

import Dashboard from "./tenant-admin/Dashboard";
import OrgStructure from "./tenant-admin/OrgStructure";
import CreateStructure from "./tenant-admin/CreateStructure";
import AddStructure from "./tenant-admin/AddStructure";
import UserManagement from "./tenant-admin/UserManagement";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const [structure, setStructure] = useState({
    name: "Academics",
    branches: {}
  });

  return (
    <div className="flex h-screen">
      <Sidebar page={page} setPage={setPage} />

      <div className="flex-1 p-8 overflow-auto bg-[#FCF6D9]">
        {page === "dashboard" && <Dashboard />}

        {page === "org" && (
          <OrgStructure
            structure={structure}
            setPage={setPage}
          />
        )}

        {page === "create" && (
          <CreateStructure
            setPage={setPage}
            setStructure={setStructure}
          />
        )}

        {page === "update" && (
          <AddStructure
            structure={structure}
            setStructure={setStructure}
            setPage={setPage}
          />
        )}

        {page === "users" && <UserManagement />}
      </div>
    </div>
  );
}
