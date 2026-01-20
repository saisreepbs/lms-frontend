// src/layouts/InstructorLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useLogout, useAuth } from "../context/AuthContext";

export default function InstructorLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const { user } = useAuth();

  const isActive = (path) => {
    if (path === "/instructor" || path === "/instructor/courses") {
      return (
        location.pathname === "/instructor" ||
        location.pathname === "/instructor/courses" ||
        location.pathname.startsWith("/instructor/courses/")
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#434E78] text-white min-h-screen relative">
        <div className="p-4 border-b border-white/20">
          <div className="font-semibold">Instructor</div>
          {user?.fullName && (
            <div className="text-sm text-gray-200">{user.fullName}</div>
          )}
        </div>

        <nav className="p-2 space-y-1">
          <button
            onClick={() => navigate("/instructor/courses")}
            className={`w-full text-left px-3 py-2 rounded ${
              isActive("/instructor/courses")
                ? "bg-white text-[#434E78] font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => navigate("/instructor/settings")}
            className={`w-full text-left px-3 py-2 rounded ${
              isActive("/instructor/settings")
                ? "bg-white text-[#434E78] font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Settings
          </button>
        </nav>

        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={logout}
            className="w-full py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#FCF6D9] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
