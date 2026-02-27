import { useState, useEffect } from "react";
import { getTenants } from "../../api";

const CATEGORY_LABELS = {
    CORPORATE: "Corporate",
    EDUCATION: "Education",
    TRAINING: "Training",
};

function TenantTable({ onNewTenant }) {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const data = await getTenants();
                setTenants(data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load tenants.");
            } finally {
                setLoading(false);
            }
        };
        fetchTenants();
    }, []);

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h2 className="h5 mb-0">Tenants</h2>
                <button onClick={onNewTenant} className="btn btn-primary btn-sm">
                    + New Tenant
                </button>
            </div>

            {loading && (
                <div className="card-body text-center py-5">
                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
                    <span className="text-muted">Loading tenants…</span>
                </div>
            )}

            {error && (
                <div className="card-body">
                    <div className="alert alert-danger mb-0">{error}</div>
                </div>
            )}

            {!loading && !error && tenants.length === 0 && (
                <div className="card-body text-center py-5 text-muted">
                    No tenants yet. Create your first one.
                </div>
            )}

            {!loading && !error && tenants.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: "200px" }}>ID</th>
                                <th>Name</th>
                                <th>Admin</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenants.map((tenant) => (
                                <tr key={tenant.id}>
                                    <td>
                                        <code className="text-muted small">
                                            {tenant.id.slice(0, 8)}…
                                        </code>
                                    </td>
                                    <td className="fw-medium">{tenant.name}</td>
                                    <td>{tenant.admin || <span className="text-muted fst-italic">No admin</span>}</td>
                                    <td>
                                        <span className="badge bg-secondary">
                                            {CATEGORY_LABELS[tenant.category] ?? tenant.category}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TenantTable;
