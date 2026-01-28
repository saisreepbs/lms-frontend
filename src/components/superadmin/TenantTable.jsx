import { useState } from "react";

function TenantTable({ onNewTenant }) {
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h2 className="h5 mb-0">Tenants</h2>

                <button
                    onClick={onNewTenant}
                    className="btn btn-primary btn-sm"
                >
                    + New Tenant
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Admin</th>
                            <th>Category</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[1, 2, 3].map((i) => (
                            <tr key={i} className="position-relative">
                                <td>{i}</td>
                                <td>Tenant {i}</td>
                                <td>Admin {i}</td>
                                <td>Corporate</td>
                                <td>12 Sep 2025</td>
                                <td><span className="badge bg-success">Active</span></td>

                                {/* Actions column */}
                                <td className="text-center position-relative">
                                    <div className="dropdown">
                                        <button
                                            onClick={() =>
                                                setOpenMenu(openMenu === i ? null : i)
                                            }
                                            className="btn btn-link text-dark"
                                        >
                                            ⋮
                                        </button>

                                        {openMenu === i && (
                                            <div className="dropdown-menu show position-absolute end-0">
                                                <button className="dropdown-item">
                                                    Active
                                                </button>
                                                <button className="dropdown-item">
                                                    Inactive
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TenantTable;
