import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navSections = [
  {
    title: "Courses",
    items: [
      { label: "My Courses", path: "/instructor/courses", primary: true },
      { label: "Drafts", path: "/instructor/drafts" },
      { label: "Hidden", path: "/instructor/hidden" },
    ]
  },
  {
    title: "Insights",
    items: [
      { label: "Enrollments", path: "/instructor/enrollments" },
      { label: "Course Stats", path: "/instructor/stats" },
    ]
  },
  {
    title: "Account",
    items: [
      { label: "Settings", path: "/instructor/settings" },
    ]
  }
];

export default function InstructorLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    if (path === "/instructor/courses") {
      return location.pathname === "/instructor" || 
             location.pathname === "/instructor/courses" ||
             location.pathname.startsWith("/instructor/courses/");
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="hidden lg:flex w-64 flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="text-sm uppercase tracking-wide text-slate-300">Instructor</p>
          <p className="mt-1 text-lg font-semibold">{user?.fullName || "Welcome"}</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="px-4 text-xs uppercase tracking-wider text-slate-400 mb-2">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl transition ${
                      isActive(item.path) 
                        ? "bg-white text-slate-900 font-semibold" 
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="px-6 py-5 border-t border-white/10">
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="w-full py-2.5 rounded-xl bg-white/10 text-sm font-semibold hover:bg-white/20"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-6 py-6 lg:px-12 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
