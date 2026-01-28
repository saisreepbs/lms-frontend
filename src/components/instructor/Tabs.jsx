// src/components/instructor/Tabs.jsx
export default function Tabs({ tabs, active, onChange }) {
    return (
        <ul className="nav nav-tabs border-0">
            {tabs.map((t) => (
                <li key={t.value} className="nav-item">
                    <button
                        onClick={() => onChange(t.value)}
                        className={`nav-link border-0 px-4 py-2 ${
                            active === t.value 
                                ? "active fw-semibold text-dark border-bottom border-2 border-primary" 
                                : "text-muted"
                        }`}
                        style={{ borderRadius: 0 }}
                    >
                        {t.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}
