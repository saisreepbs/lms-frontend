// src/components/instructor/LessonsTree.jsx
export default function LessonsTree({ modules, activeLessonId, onSelectLesson, onAddModule, onAddLesson }) {
    return (
        <div className="card" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <div className="card-body">
                <div className="small text-muted text-uppercase fw-semibold mb-3">Course content</div>
                {modules.map((m) => (
                    <div key={m.id} className="card bg-light mb-3">
                        <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="fw-semibold small">Module {m.order}</span>
                                <span className="small text-muted text-truncate" style={{ maxWidth: "60%" }}>
                                    {m.title || `Module ${m.order}`}
                                </span>
                            </div>
                            <div className="list-group list-group-flush">
                                {m.lessons.map((l) => (
                                    <button
                                        key={l.id}
                                        onClick={() => onSelectLesson(l.id)}
                                        className={`list-group-item list-group-item-action small ${
                                            activeLessonId === l.id ? "active" : ""
                                        }`}
                                    >
                                        Lesson {l.order}: {l.title}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => onAddLesson(m.id)}
                                className="btn btn-link btn-sm text-decoration-none p-0 mt-2"
                            >
                                + Add lesson
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    onClick={onAddModule}
                    className="btn btn-link btn-sm text-decoration-none p-0 fw-semibold"
                >
                    + Add module
                </button>
            </div>
        </div>
    );
}
