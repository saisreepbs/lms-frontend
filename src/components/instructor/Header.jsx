// src/components/instructor/Header.jsx
export default function Header({ title, description, actions, showBack = false, onBack }) {
    return (
        <div className="mb-4 pb-3 border-bottom d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
                {showBack && (
                    <button
                        onClick={onBack}
                        className="btn btn-sm btn-outline-secondary"
                        aria-label="Go back"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                )}
                <div>
                    <h1 className="h3 mb-1">{title}</h1>
                    {description && <p className="text-muted mb-0">{description}</p>}
                </div>
            </div>
            {actions && <div className="d-flex flex-wrap align-items-center gap-2">{actions}</div>}
        </div>
    );
}
