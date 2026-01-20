// src/layouts/TenantAdminLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useLogout, useAuth } from "../context/AuthContext";

export default function TenantAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const { user } = useAuth();

  const isActive = (path) => {
    if (path === "/admin" || path === "/admin/dashboard") {
      return location.pathname === "/admin" || location.pathname === "/admin/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const navButton = (path, label) => (
    <button
      onClick={() => navigate(path)}
      className={`w-full py-3 rounded-md text-sm font-medium
        ${isActive(path) ? "border border-white" : ""}
      `}
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className="w-64 h-screen p-6 space-y-6"
        style={{ backgroundColor: "#434E78" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            👤
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Tenant Admin</h1>
            {user?.fullName && (
              <p className="text-sm text-white/70">{user.fullName}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {navButton("/admin/dashboard", "Dashboard")}
          {navButton("/admin/organization", "Organization Structure")}
          {navButton("/admin/users", "User Management")}
        </div>

        <div className="mt-auto pt-6">
          <button
            onClick={logout}
            className="w-full py-3 rounded-md text-sm font-medium bg-red-600/80 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto bg-[#FCF6D9]">
        <Outlet />
      </div>
    </div>
  );
}
