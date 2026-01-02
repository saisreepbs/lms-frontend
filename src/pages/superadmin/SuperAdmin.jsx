import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TenantTable from "../components/TenantTable";
import CreateTenantForm from "../components/CreateTenantForm";

function SuperAdmin({ onLogout }) {
    const [view, setView] = useState("default");
    return (
        <div className="w-screen h-screen flex">
            {/* Sidebar */}
            <Sidebar
                onManageTenants={() =>
                    setView((prev) => (prev === "list" ? "default" : "list"))
                }
                onLogout={onLogout}
            />


            {/* Right Content */}
            <div
                className="flex-1 p-10"
                style={{ backgroundColor: "#FCF6D9" }}
            >
                {/* DEFAULT VIEW (after login) */}
                {view === "default" && (
                    <div className="flex justify-end">
                        <button
                            onClick={() => setView("create")}
                            className="bg-indigo-600 text-black px-6 py-2 rounded-md font-semibold"
                        >
                            + New Tenant
                        </button>
                    </div>
                )}

                {/* TENANT LIST */}
                {view === "list" && (
                    <TenantTable onNewTenant={() => setView("create")} />
                )}

                {/* CREATE TENANT */}
                {view === "create" && (
                    <CreateTenantForm onBack={() => setView("list")} />
                )}
            </div>
        </div>
    );
}

export default SuperAdmin;
