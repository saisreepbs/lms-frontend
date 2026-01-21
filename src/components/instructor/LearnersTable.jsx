// src/components/instructor/LearnersTable.jsx
export default function LearnersTable({ learners }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 text-sm font-semibold text-slate-900">
                Enrolled Learners
            </div>
            <table className="w-full">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                        <th className="px-5 py-3 text-left font-semibold">Name</th>
                        <th className="px-5 py-3 text-left font-semibold">Email</th>
                        <th className="px-5 py-3 text-left font-semibold">Belongs to</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {learners.map((l) => (
                        <tr key={l.email} className="border-t border-slate-100">
                            <td className="px-5 py-3 font-medium text-slate-900">{l.name}</td>
                            <td className="px-5 py-3 text-slate-600">{l.email}</td>
                            <td className="px-5 py-3 text-slate-600">{l.belongsTo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
