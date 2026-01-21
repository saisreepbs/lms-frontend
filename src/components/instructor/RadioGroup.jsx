// src/components/instructor/RadioGroup.jsx
export default function RadioGroup({ label, options, value, onChange }) {
    return (
        <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">{label}</div>
            <div className="flex items-center gap-6">
                {options.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            className="accent-slate-900"
                            checked={value === opt.value}
                            onChange={() => onChange(opt.value)}
                        />
                        <span className="text-sm text-slate-600">{opt.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
