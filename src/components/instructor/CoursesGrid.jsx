// src/components/instructor/CoursesGrid.jsx
import CourseCard from "./CourseCard.jsx";

export default function CoursesGrid({ courses, onEdit, onRemove }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {courses.map((c) => (
                <CourseCard
                    key={c.id}
                    course={c}
                    onEdit={onEdit}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}
