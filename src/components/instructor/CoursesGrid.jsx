// src/components/instructor/CoursesGrid.jsx
import CourseCard from './CourseCard.jsx';

export default function CoursesGrid({ courses, onEdit, onRemove }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
