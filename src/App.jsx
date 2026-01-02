// src/App.jsx
import { useState } from "react";

import Sidebar from "./components/tenant-admin/Sidebar";

import Dashboard from "./pages/tenant-admin/Dashboard";
import OrgStructure from "./pages/tenant-admin/OrgStructure";
import CreateStructure from "./pages/tenant-admin/CreateStructure";
import AddStructure from "./pages/tenant-admin/AddStructure";
import UserManagement from "./pages/tenant-admin/UserManagement";

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
