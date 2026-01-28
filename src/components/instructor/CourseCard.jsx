import { useMemo, useEffect, useState } from "react";
import api from "../../api";

const STATUS_STYLES = {
    ACTIVE: "bg-success text-white",
    INACTIVE: "bg-warning text-dark",
    HIDDEN: "bg-secondary text-white",
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
        <div className="card h-100 border-0 shadow-sm">
            {/* Thumbnail image */}
            {coverSrc ? (
                <img
                    src={coverSrc}
                    alt={course.title}
                    className="card-img-top"
                    style={{ height: "160px", objectFit: "cover" }}
                />
            ) : (
                <div 
                    className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-10 text-muted" 
                    style={{ height: "160px" }}
                >
                    No Image
                </div>
            )}

            {/* Course info */}
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <h6 className="fw-semibold mb-0 text-truncate flex-grow-1">{course.title}</h6>
                    <span className={`badge ${statusClass} flex-shrink-0`}>
                        {statusLabel}
                    </span>
                </div>
                <p 
                    className="text-muted small mb-3 flex-grow-1" 
                    style={{ 
                        overflow: "hidden", 
                        textOverflow: "ellipsis", 
                        display: "-webkit-box", 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: "vertical" 
                    }}
                >
                    {course.description || "No description"}
                </p>

                {/* Action buttons */}
                <div className="d-flex gap-2 mt-auto">
                    <button
                        onClick={() => onEdit(course)}
                        className="btn btn-outline-dark btn-sm flex-fill"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onRemove(course.id)}
                        className="btn btn-outline-danger btn-sm flex-fill"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
