// src/components/instructor/Header.jsx
export default function Header({ title, actions, showBack = false, onBack }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                {showBack && (
                    <button onClick={onBack} className="text-blue-600 hover:text-blue-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-2">{actions}</div>
        </div>
    );
}
