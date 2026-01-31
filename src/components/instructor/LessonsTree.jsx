// src/components/instructor/LessonsTree.jsx
export default function LessonsTree({ modules, activeLessonId, onSelectLesson, onAddModule, onAddLesson }) {
    return (
        <div className="card-enterprise" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <div className="card-enterprise-header">
                <h3>Course Content</h3>
            </div>
            <div className="card-enterprise-body">
                {modules.map((m) => (
                    <div key={m.id} style={{ background: "#f8f9fa", border: "1px solid #eee", borderRadius: "3px", marginBottom: "12px", padding: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            <span style={{ fontWeight: "600", fontSize: "13px", color: "#2c3e50" }}>Module {m.order}</span>
                            <span style={{ fontSize: "12px", color: "#7f8c8d" }}>
                                {m.title || `Module ${m.order}`}
                            </span>
                        </div>
                        <div>
                            {m.lessons.map((l) => (
                                <button
                                    key={l.id}
                                    onClick={() => onSelectLesson(l.id)}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "8px 12px",
                                        marginBottom: "4px",
                                        fontSize: "13px",
                                        border: "1px solid #ddd",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                        background: activeLessonId === l.id ? "#3498db" : "#fff",
                                        color: activeLessonId === l.id ? "#fff" : "#333",
                                        transition: "all 0.15s ease"
                                    }}
                                >
                                    Lesson {l.order}: {l.title}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => onAddLesson(m.id)}
                            style={{ background: "none", border: "none", color: "#3498db", fontSize: "12px", fontWeight: "500", cursor: "pointer", padding: "4px 0", marginTop: "8px" }}
                        >
                            + Add Lesson
                        </button>
                    </div>
                ))}
                <button
                    onClick={onAddModule}
                    style={{ background: "none", border: "none", color: "#3498db", fontSize: "13px", fontWeight: "600", cursor: "pointer", padding: "0" }}
                >
                    + Add Module
                </button>
            </div>
        </div>
    );
}
