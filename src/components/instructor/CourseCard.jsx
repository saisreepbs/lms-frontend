import { useMemo, useEffect, useState } from "react";
import api from "../../api";

const STATUS_STYLES = {
    ACTIVE: "bg-green-50 text-green-700 border border-green-200",
    INACTIVE: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    HIDDEN: "bg-gray-100 text-gray-700 border border-gray-200",
};

const STATUS_LABELS = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    HIDDEN: "Hidden",
};

export default function CourseCard({ course, onEdit, onRemove }) {
    const [thumbnailSrc, setThumbnailSrc] = useState(null);

    // Build preview URL for local files or absolute URLs already available on the course
    const localCoverSrc = useMemo(() => {
        if (course.cover instanceof File) {
            return URL.createObjectURL(course.cover);
        }
        if (typeof course.cover === "string") {
            return course.cover;
        }
        return null;
    }, [course.cover]);

    // Fetch secure thumbnails via the resource controller so the auth header is included
    useEffect(() => {
        let isMounted = true;
        let objectUrl;

        const shouldFetchRemoteThumbnail =
            !!course.thumbnailId && !localCoverSrc;

        if (!shouldFetchRemoteThumbnail) {
            setThumbnailSrc(null);
            return undefined;
        }

        const fetchThumbnail = async () => {
            try {
                const response = await api.get(
                    `/api/resources/${course.thumbnailId}`,
                    { responseType: "blob" }
                );
                objectUrl = URL.createObjectURL(response.data);
                if (isMounted) {
                    setThumbnailSrc(objectUrl);
                }
            } catch (err) {
                console.error("Failed to load course thumbnail", err);
                if (isMounted) {
                    setThumbnailSrc(null);
                }
            }
        };

        fetchThumbnail();

        return () => {
            isMounted = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [course.thumbnailId, localCoverSrc]);

    useEffect(() => {
        if (course.cover instanceof File && localCoverSrc) {
            return () => URL.revokeObjectURL(localCoverSrc);
        }
        return undefined;
    }, [course.cover, localCoverSrc]);

    const coverSrc = localCoverSrc || thumbnailSrc;
    const rawStatus = course.currentStatus || course.status || course.visibility;
    const normalizedStatus = typeof rawStatus === "string" ? rawStatus.toUpperCase() : rawStatus;
    const statusLabel = STATUS_LABELS[normalizedStatus] || normalizedStatus || "--";
    const statusClass = STATUS_STYLES[normalizedStatus] || STATUS_STYLES.HIDDEN;

    return (
        <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            {/* Thumbnail image */}
            {coverSrc ? (
                <img
                    src={coverSrc}
                    alt={course.title}
                    className="h-32 w-full object-cover"
                />
            ) : (
                <div className="flex h-32 items-center justify-center bg-slate-100 text-slate-400">
                    No Image
                </div>
            )}

            {/* Course info */}
            <div className="space-y-2 p-5">
                <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-slate-900 line-clamp-1">{course.title}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${statusClass}`}>
                        {statusLabel}
                    </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                    <button
                        onClick={() => onEdit(course)}
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onRemove(course.id)}
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 cursor-pointer"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
