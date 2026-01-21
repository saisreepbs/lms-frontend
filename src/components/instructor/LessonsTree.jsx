// src/components/instructor/LessonsTree.jsx
export default function LessonsTree({ modules, activeLessonId, onSelectLesson, onAddModule, onAddLesson }) {
    return (
        <div className="max-h-[70vh] overflow-auto rounded-2xl border border-slate-100 bg-white p-4">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Course content</div>
            <div className="space-y-4">
                {modules.map((m) => (
                    <div key={m.id} className="space-y-2 rounded-xl border border-slate-100 bg-slate-50/40 p-3">
                        <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                            <span>Module {m.order}</span>
                            <span className="max-w-[60%] truncate text-xs font-normal text-slate-500">
                                {m.title || `Module ${m.order}`}
                            </span>
                        </div>
                        <div className="space-y-1">
                            {m.lessons.map((l) => (
                                <button
                                    key={l.id}
                                    onClick={() => onSelectLesson(l.id)}
                                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition cursor-pointer ${
                                        activeLessonId === l.id
                                            ? "bg-slate-900 text-white shadow"
                                            : "text-slate-600 hover:bg-white"
                                    }`}
                                >
                                    Lesson {l.order}: {l.title}
                                </button>
                            ))}
                            <button
                                onClick={() => onAddLesson(m.id)}
                                className="px-3 py-1 text-left text-sm font-medium text-slate-600 transition hover:text-slate-900 cursor-pointer"
                            >
                                + Add lesson
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    onClick={onAddModule}
                    className="text-sm font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                    + Add module
                </button>
            </div>
        </div>
    );
}
