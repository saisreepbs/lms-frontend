// src/components/instructor/LessonsTree.jsx
export default function LessonsTree({ modules, activeLessonId, onSelectLesson, onAddModule, onAddLesson }) {
    return (
        <div className="border rounded bg-white p-3 max-h-[70vh] overflow-auto">
            <div className="font-medium mb-2">Course Content</div>
            <div className="space-y-3">
                {modules.map((m) => (
                    <div key={m.id} className="space-y-2">
                        <div className="font-semibold">Module {m.order}: {m.title || `Module ${m.order}`}</div>
                        <div className="pl-3 space-y-1">
                            {m.lessons.map((l) => (
                                <button
                                    key={l.id}
                                    onClick={() => onSelectLesson(l.id)}
                                    className={`block w-full text-left px-3 py-1 rounded ${activeLessonId === l.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    Lesson {l.order}: {l.title}
                                </button>
                            ))}
                            <button
                                onClick={() => onAddLesson(m.id)}
                                className="text-sm text-blue-700 hover:underline px-3"
                            >
                                + Add lesson
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    onClick={onAddModule}
                    className="text-sm text-blue-700 hover:underline"
                >
                    + Add Module
                </button>
            </div>
        </div>
    );
}
