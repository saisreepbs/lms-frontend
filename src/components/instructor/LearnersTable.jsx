// src/components/instructor/LearnersTable.jsx
export default function LearnersTable({ learners }) {
    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white fw-semibold border-bottom">
                Enrolled Learners
            </div>
            <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead>
                        <tr className="border-bottom">
                            <th className="py-3">Name</th>
                            <th className="py-3">Email</th>
                            <th className="py-3">Belongs to</th>
                        </tr>
                    </thead>
                    <tbody>
                        {learners.map((l) => (
                            <tr key={l.email}>
                                <td className="py-3">{l.name}</td>
                                <td className="py-3">{l.email}</td>
                                <td className="py-3">{l.belongsTo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
