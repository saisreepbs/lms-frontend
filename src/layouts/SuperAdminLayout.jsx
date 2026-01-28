import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SuperAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <aside className="d-flex flex-column justify-content-between bg-dark text-white" style={{ width: "250px" }}>
        <div className="p-4">
          <div className="d-flex align-items-center mb-4">
            <div className="bg-light text-dark rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "36px", height: "36px" }}>
              👤
            </div>
            <div>
              <span className="fw-semibold">Super Admin</span>
              {user?.fullName && (
                <p className="small text-white-50 mb-0">{user.fullName}</p>
              )}
            </div>
          </div>

          <div className="list-group list-group-flush">
            <button
              onClick={() => navigate("/superadmin/tenants")}
              className={`list-group-item list-group-item-action ${isActive("/superadmin/tenants") ? "active" : "bg-dark text-white border-0"}`}
            >
              Manage Tenants
            </button>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="btn btn-danger w-100"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-fill p-4 overflow-auto bg-light">
        <Outlet />
      </div>
    </div>
  );
}
