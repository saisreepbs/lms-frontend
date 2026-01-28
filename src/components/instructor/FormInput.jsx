// src/components/instructor/FormInput.jsx
export default function FormInput({ label, placeholder, value, onChange, multiline = false }) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {multiline ? (
                <textarea
                    className="form-control"
                    rows={4}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );
}
