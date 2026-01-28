// src/components/instructor/RadioGroup.jsx
export default function RadioGroup({ label, options, value, onChange }) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <div className="d-flex align-items-center gap-4">
                {options.map((opt) => (
                    <div key={opt.value} className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id={`radio-${opt.value}`}
                            checked={value === opt.value}
                            onChange={() => onChange(opt.value)}
                        />
                        <label className="form-check-label" htmlFor={`radio-${opt.value}`}>
                            {opt.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
