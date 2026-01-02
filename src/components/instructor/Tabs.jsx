// src/components/instructor/Tabs.jsx
export default function Tabs({ tabs, active, onChange }) {
    return (
        <div className="border-b mb-4">
            <div className="flex gap-1">
                {tabs.map((t) => (
                    <button
                        key={t.value}
                        onClick={() => onChange(t.value)}
                        className={`px-4 py-2 text-sm rounded-t ${active === t.value
                                ? 'bg-white border-x border-t font-medium'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
