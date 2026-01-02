// src/components/instructor/FormInput.jsx
export default function FormInput({ label, placeholder, value, onChange, multiline = false }) {
    return (
        <label className="block space-y-1">
            <span className="text-sm font-medium">{label}</span>
            {multiline ? (
                <textarea
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </label>
    );
}
