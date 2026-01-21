// src/components/instructor/Tabs.jsx
export default function Tabs({ tabs, active, onChange }) {
    return (
        <div className="border-b border-slate-200 px-6">
            <div className="flex gap-6">
                {tabs.map((t) => (
                    <button
                        key={t.value}
                        onClick={() => onChange(t.value)}
                        className={`relative pb-3 pt-4 text-sm font-semibold transition cursor-pointer ${
                            active === t.value
                                ? "text-slate-900"
                                : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        {t.label}
                        {active === t.value && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
