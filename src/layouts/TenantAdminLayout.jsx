import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TenantAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    if (path === "/admin" || path === "/admin/dashboard") {
      return location.pathname === "/admin" || location.pathname === "/admin/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="d-flex flex-column bg-dark text-white p-4" style={{ width: "250px" }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
            👤
          </div>
          <div>
            <h1 className="h6 mb-0 text-white">Tenant Admin</h1>
            {user?.fullName && (
              <p className="small text-white-50 mb-0">{user.fullName}</p>
            )}
          </div>
        </div>

        <div className="list-group list-group-flush mb-auto">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className={`list-group-item list-group-item-action ${isActive("/admin/dashboard") ? "active" : "bg-dark text-white border-0"}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/organization")}
            className={`list-group-item list-group-item-action ${isActive("/admin/organization") ? "active" : "bg-dark text-white border-0"}`}
          >
            Organization Structure
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className={`list-group-item list-group-item-action ${isActive("/admin/users") ? "active" : "bg-dark text-white border-0"}`}
          >
            User Management
          </button>
        </div>

        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="btn btn-danger w-100 mt-3"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-fill p-4 overflow-auto bg-light">
        <Outlet />
      </div>
    </div>
  );
}
