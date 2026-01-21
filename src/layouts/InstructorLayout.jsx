// src/layouts/InstructorLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useLogout, useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Courses", path: "/instructor/courses" },
  { label: "Settings", path: "/instructor/settings" },
];

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
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="text-sm uppercase tracking-wide text-slate-300">Instructor</p>
          <p className="mt-1 text-lg font-semibold leading-tight">
            {user?.fullName || "Welcome"}
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                isActive(item.path)
                  ? "bg-white text-slate-900 font-semibold"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full py-2.5 rounded-xl bg-white/10 text-sm font-semibold tracking-wide backdrop-blur hover:bg-white/20 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-8 lg:px-12 lg:py-10">
          <div className="mb-6 flex flex-wrap gap-3 lg:hidden">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition ${
                  isActive(item.path)
                    ? "bg-slate-900 text-white border-slate-900"
                    : "text-slate-600 border-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
