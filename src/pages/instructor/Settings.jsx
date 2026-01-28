import { useAuth } from "../../context/AuthContext";
import Header from "../../components/instructor/Header.jsx";

export default function Settings() {
  const { user } = useAuth();

  return (
    <div>
      <Header
        title="Settings"
        description="Manage your profile and preferences"
      />
      <div className="row">
        <div className="col-lg-6 col-xl-5">
          <div className="card">
            <div className="card-body">
              <h3 className="h6 mb-3">Profile Information</h3>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={user?.fullName || ""}
                  disabled
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
