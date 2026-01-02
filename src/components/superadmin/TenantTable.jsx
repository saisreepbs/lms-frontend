import { useState } from "react";

function TenantTable({ onNewTenant }) {
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Tenants</h2>

                <button
                    onClick={onNewTenant}
                    className="bg-blue-600 text-black px-4 py-2 rounded-md text-sm font-semibold"
                >
                    + New Tenant
                </button>
            </div>

            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-3 py-2 w-12 text-left">id</th>
                        <th className="border px-3 py-2 w-40 text-left">Name</th>
                        <th className="border px-3 py-2 w-40 text-left">Admin</th>
                        <th className="border px-3 py-2 w-32 text-left">Category</th>
                        <th className="border px-3 py-2 w-36 text-left">Created At</th>
                        <th className="border px-3 py-2 w-24 text-left">Status</th>
                        <th className="border px-3 py-2 w-24 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {[1, 2, 3].map((i) => (
                        <tr key={i} className="hover:bg-gray-50 relative">
                            <td className="border px-3 py-2">{i}</td>
                            <td className="border px-3 py-2">Tenant {i}</td>
                            <td className="border px-3 py-2">Admin {i}</td>
                            <td className="border px-3 py-2">Corporate</td>
                            <td className="border px-3 py-2">12 Sep 2025</td>
                            <td className="border px-3 py-2">Active</td>

                            {/* Actions column */}
                            <td className="border px-3 py-2 text-center relative">
                                <button
                                    onClick={() =>
                                        setOpenMenu(openMenu === i ? null : i)
                                    }
                                    className="text-xl font-bold"
                                >
                                    ⋮
                                </button>

                                {openMenu === i && (
                                    <div className="absolute right-6 top-10 bg-white border rounded-md shadow-md w-32 z-10">
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Active
                                        </button>
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Inactive
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TenantTable;
