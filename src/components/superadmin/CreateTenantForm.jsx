import { useState } from "react";
import { createTenant } from "../../api";

const INITIAL_FORM = {
  tenantName: "",
  tenantCategory: "",
  adminFullName: "",
  adminEmail: "",
};

function CreateTenantForm({ onBack, onCreated }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // holds TenantAndAdminResponse after success

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await createTenant(form);
      setResult(data);
      if (onCreated) onCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create tenant.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (result) {
    return (
      <div className="card" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <div className="alert alert-success mb-4">
            <strong>Tenant created successfully!</strong> Share the credentials below
            with the admin — the password <strong>cannot be retrieved later</strong>.
          </div>

          <table className="table table-bordered mb-4">
            <tbody>
              <tr>
                <th className="table-light" style={{ width: "40%" }}>Tenant Name</th>
                <td>{result.tenantName}</td>
              </tr>
              <tr>
                <th className="table-light">Category</th>
                <td>{result.tenantCategory}</td>
              </tr>
              <tr>
                <th className="table-light">Admin Email</th>
                <td><code>{result.adminEmail}</code></td>
              </tr>
              <tr>
                <th className="table-light">Admin Password</th>
                <td>
                  <code className="fw-bold text-danger">{result.adminPassword}</code>
                </td>
              </tr>
            </tbody>
          </table>

          <button onClick={onBack} className="btn btn-primary">
            ← Back to Tenant List
          </button>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="card" style={{ maxWidth: "800px" }}>
      <div className="card-body">
        <p
          onClick={onBack}
          className="small mb-4 text-primary fw-medium"
          style={{ cursor: "pointer" }}
        >
          ← Back to Tenant List
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Tenant Details */}
          <div className="border rounded p-4 mb-4">
            <h3 className="h6 fw-semibold mb-3">Tenant Details</h3>
            <div style={{ maxWidth: "500px" }}>
              <input
                name="tenantName"
                value={form.tenantName}
                onChange={handleChange}
                placeholder="Tenant Name"
                className="form-control mb-3"
                required
              />
              <select
                name="tenantCategory"
                value={form.tenantCategory}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Category</option>
                <option value="CORPORATE">Corporate</option>
                <option value="EDUCATION">Education</option>
                <option value="TRAINING">Training</option>
              </select>
            </div>
          </div>

          {/* Admin Details */}
          <div className="border rounded p-4 mb-4">
            <h3 className="h6 fw-semibold mb-3">Admin Details</h3>
            <p className="text-muted small mb-3">
              A password will be auto-generated and shown once after creation.
            </p>
            <div style={{ maxWidth: "500px" }}>
              <input
                name="adminFullName"
                value={form.adminFullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="form-control mb-3"
                required
              />
              <input
                name="adminEmail"
                value={form.adminEmail}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2" role="status" />Creating…</>
              ) : "Create Tenant"}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTenantForm;
