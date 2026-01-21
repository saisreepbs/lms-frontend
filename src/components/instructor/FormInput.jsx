// src/components/instructor/FormInput.jsx
export default function FormInput({ label, placeholder, value, onChange, multiline = false }) {
    return (
        <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            {multiline ? (
                <textarea
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-0"
                    rows={4}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-0"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </label>
    );
}
