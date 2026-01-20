// src/layouts/SuperAdminLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useLogout, useAuth } from "../context/AuthContext";

export default function SuperAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const { user } = useAuth();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <aside
        className="w-64 h-full flex flex-col justify-between text-white"
        style={{ backgroundColor: "#434E78" }}
      >
        <div className="p-6">
          <div className="flex items-center text-lg font-semibold mb-8">
            <div className="w-9 h-9 rounded-full bg-[#f7f8f9] text-[rgb(12,12,12)] flex items-center justify-center mr-3">
              👤
            </div>
            <div>
              <span>Super Admin</span>
              {user?.fullName && (
                <p className="text-sm font-normal text-white/70">{user.fullName}</p>
              )}
            </div>
          </div>

          <nav className="space-y-3">
            <button
              onClick={() => navigate("/superadmin/tenants")}
              className={`w-full py-2 rounded-md font-semibold ${
                isActive("/superadmin/tenants")
                  ? "bg-white text-[#434E78]"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Manage Tenants
            </button>
          </nav>
        </div>

        <div className="p-6">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-auto" style={{ backgroundColor: "#FCF6D9" }}>
        <Outlet />
      </div>
    </div>
  );
}
