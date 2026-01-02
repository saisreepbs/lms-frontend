// src/components/instructor/LessonEditor.jsx
import FormInput from './FormInput.jsx';

export default function LessonEditor({ lesson, onChange, onSave }) {
    if (!lesson) {
        return (
            <div className="border rounded bg-white p-4">
                <div className="text-gray-500">Select a lesson to edit.</div>
            </div>
        );
    }
    return (
        <div className="border rounded bg-white p-4 space-y-4">
            <div className="font-medium">Lesson {lesson.order}: {lesson.title}</div>
            <FormInput
                label="Title"
                value={lesson.title}
                onChange={(v) => onChange({ ...lesson, title: v })}
            />
            <FormInput
                label="Description"
                multiline
                value={lesson.description || ''}
                onChange={(v) => onChange({ ...lesson, description: v })}
            />
            <label className="block space-y-1">
                <span className="text-sm font-medium">Content Type</span>
                <select
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={lesson.resource || ''}
                onChange={(v) => onChange({ ...lesson, resource: v })}
            />
            <div>
                <button
                    onClick={() => onSave(lesson)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Save Lesson
                </button>
            </div>
        </div>
    );
}
