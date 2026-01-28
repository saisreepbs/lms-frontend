import { useAuth } from "../../context/AuthContext";
import Header from "../../components/instructor/Header.jsx";

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <Header
        title="Settings"
        description="Manage your profile and preferences"
      />
      <div className="rounded-2xl bg-white p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={user?.fullName || ""}
                  disabled
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
