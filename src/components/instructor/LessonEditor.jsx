import FormInput from "./FormInput.jsx";

export default function LessonEditor({ lesson, onChange }) {
    if (!lesson) {
        return (
            <div className="card border-dashed">
                <div className="card-body d-flex align-items-center justify-content-center text-muted" style={{ minHeight: "200px" }}>
                    Select a lesson to edit.
                </div>
            </div>
        );
    }
    return (
        <div className="card">
            <div className="card-body">
                <div className="small text-muted mb-3">
                    Lesson {lesson.order}: <span className="text-dark">{lesson.title}</span>
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
                <div className="mb-3">
                    <label className="form-label">Content Type</label>
                    <select
                        className="form-select"
                        value={lesson.type}
                        onChange={(e) => onChange({ ...lesson, type: e.target.value })}
                    >
                        <option value="video">Video</option>
                        <option value="article">Article</option>
                        <option value="quiz">Quiz</option>
                    </select>
                </div>
                <FormInput
                    label="Resource Link"
                    placeholder="Paste the resource link here"
                    value={lesson.resource || ""}
                    onChange={(v) => onChange({ ...lesson, resource: v })}
                />
            </div>
        </div>
    );
}
