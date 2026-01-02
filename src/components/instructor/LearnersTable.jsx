// src/components/instructor/LearnersTable.jsx
export default function LearnersTable({ learners }) {
    return (
        <div className="border rounded bg-white overflow-hidden">
            <div className="px-4 py-3 border-b font-medium">Enrolled Learners</div>
            <table className="w-full">
                <thead className="bg-gray-50 text-sm">
                    <tr>
                        <th className="text-left px-4 py-2">Name</th>
                        <th className="text-left px-4 py-2">Email</th>
                        <th className="text-left px-4 py-2">Belongs to</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {learners.map((l) => (
                        <tr key={l.email} className="border-t">
                            <td className="px-4 py-2">{l.name}</td>
                            <td className="px-4 py-2">{l.email}</td>
                            <td className="px-4 py-2">{l.belongsTo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
