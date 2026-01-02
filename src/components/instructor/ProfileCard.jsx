// src/components/instructor/ProfileCard.jsx
export default function ProfileCard({ name = 'Tenant Name', role = 'Instructor' }) {
    return (
        <div className="border rounded bg-white p-4">
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-gray-500">{role}</div>
        </div>
    );
}
