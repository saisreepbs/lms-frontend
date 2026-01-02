// src/layouts/LearnerLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function LearnerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-[#FCF6D9]">
      {/* Sidebar */}
      <div className="w-64 bg-[#434E78] text-white p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            👤
          </div>
          <h1 className="text-2xl font-semibold text-white">Tenant Name</h1>
        </div>
        <h2 className="text-xl flex items-center justify-center mb-6">Learner</h2>

        <nav className="space-y-2">
          <button
            onClick={() => navigate("/learner/courses")}
            className={`w-full py-2 rounded ${
              isActive("/learner/courses") || location.pathname === "/learner"
                ? "bg-white text-[#434E78] font-semibold"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            Courses
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
