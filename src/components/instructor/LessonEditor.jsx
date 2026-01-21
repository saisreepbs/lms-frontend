// src/components/instructor/LessonEditor.jsx
import FormInput from "./FormInput.jsx";

export default function LessonEditor({ lesson, onChange, onSave }) {
    if (!lesson) {
        return (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
                Select a lesson to edit.
            </div>
        );
    }
    return (
        <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5">
            <div className="text-sm font-semibold text-slate-600">
                Lesson {lesson.order}: <span className="text-slate-900">{lesson.title}</span>
            </div>
            <FormInput
                label="Title"
                value={lesson.title}
                onChange={(v) => onChange({ ...lesson, title: v })}
            />
            <FormInput
                label="Description"
                multiline
                value={lesson.description || ""}
                onChange={(v) => onChange({ ...lesson, description: v })}
            />
            <label className="block space-y-1">
                <span className="text-sm font-medium text-slate-700">Content Type</span>
                <select
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                    value={lesson.type}
                    onChange={(e) => onChange({ ...lesson, type: e.target.value })}
                >
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                    <option value="quiz">Quiz</option>
                </select>
            </label>
            <FormInput
                label="Resource Link"
                placeholder="Paste the resource link here"
                value={lesson.resource || ""}
                onChange={(v) => onChange({ ...lesson, resource: v })}
            />
            <div>
                <button
                    onClick={() => onSave(lesson)}
                    className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 cursor-pointer"
                >
                    Save lesson
                </button>
            </div>
        </div>
    );
}
