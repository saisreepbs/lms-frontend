// src/components/instructor/CourseCard.jsx
export default function CourseCard({ course, onEdit, onRemove }) {
    return (
        <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
            {/* Thumbnail image */}
            {course.cover ? (
                <img
                    src={URL.createObjectURL(course.cover)}
                    alt={course.title}
                    className="h-28 w-full object-cover"
                />
            ) : (
                <div className="h-28 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                </div>
            )}

            {/* Course info */}
            <div className="p-4 space-y-2">
                <div className="font-medium">{course.title}</div>
                <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                    <button
                        onClick={() => onEdit(course)}
                        className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onRemove(course.id)}
                        className="px-3 py-1.5 text-sm border rounded text-red-600 hover:bg-red-50"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
