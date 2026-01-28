import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TenantTable from "../../components/superadmin/TenantTable";
import CreateTenantForm from "../../components/superadmin/CreateTenantForm";

function SuperAdmin() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Determine view based on URL
    const getView = () => {
        if (location.pathname === "/superadmin/tenants/new") return "create";
        if (location.pathname === "/superadmin/tenants") return "list";
        return "default";
    };
    
    const view = getView();

    return (
        <div>
            {/* DEFAULT VIEW (after login) */}
            {view === "default" && (
                <div className="d-flex justify-content-end">
                    <button
                        onClick={() => navigate("/superadmin/tenants/new")}
                        className="btn btn-primary"
                    >
                        + New Tenant
                    </button>
                </div>
            )}

            {/* TENANT LIST */}
            {view === "list" && (
                <TenantTable onNewTenant={() => navigate("/superadmin/tenants/new")} />
            )}

            {/* CREATE TENANT */}
            {view === "create" && (
                <CreateTenantForm onBack={() => navigate("/superadmin/tenants")} />
            )}
        </div>
    );
}

export default SuperAdmin;
