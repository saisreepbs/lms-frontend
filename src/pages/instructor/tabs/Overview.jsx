import { useState, useEffect } from "react";
import FormInput from "../../../components/instructor/FormInput.jsx";
import RadioGroup from "../../../components/instructor/RadioGroup.jsx";
import FileUpload from "../../../components/instructor/FileUpload.jsx";
import api from "../../../api";

const STATUS_LABELS = {
    DRAFT: "Draft",
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    HIDDEN: "Hidden",
};

export default function Overview({ course, onSave }) {
    const [title, setTitle] = useState(course?.title || "");
    const [desc, setDesc] = useState(course?.description || "");
    const [status, setStatus] = useState(course?.currentStatus || "HIDDEN");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTitle(course?.title || "");
        setDesc(course?.description || "");
        setStatus(course?.currentStatus || "HIDDEN");
        setSelectedFile(null);
        setError(null);
    }, [course]);

    useEffect(() => {
        let isMounted = true;
        let objectUrl;

        if (selectedFile) {
            objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }

        if (!course?.thumbnailId) {
            setPreviewUrl(null);
            return undefined;
        }

        const fetchThumbnail = async () => {
            try {
                const response = await api.get(`/api/resources/${course.thumbnailId}`, {
                    responseType: "blob",
                });
                objectUrl = URL.createObjectURL(response.data);
                if (isMounted) {
                    setPreviewUrl(objectUrl);
                }
            } catch (err) {
                console.error("Failed to load course thumbnail", err);
                if (isMounted) {
                    setPreviewUrl(null);
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
    }, [course?.thumbnailId, selectedFile]);

    const handleFilesSelected = (files) => {
        setSelectedFile(files[0] || null);
    };

    const handleUpdate = async () => {
        if (!title.trim()) {
            setError("Course title is required.");
            return;
        }

        setIsSaving(true);
        setError(null);

        const result = await onSave({
            title,
            description: desc,
            status,
            thumbnailFile: selectedFile,
        });

        if (!result?.success) {
            setError(result?.error || "Failed to update course.");
        } else {
            setSelectedFile(null);
        }

        setIsSaving(false);
    };

    const statusOptions = (() => {
        if (course?.statusOptions && Object.keys(course.statusOptions).length > 0) {
            return Object.keys(course.statusOptions)
                .map(key => ({ value: key, label: STATUS_LABELS[key] || key }));
        }
        return [];
    })();

    return (
        <div className="row g-4">
            <div className="col-lg-7">
                <FormInput label="Course Title" value={title} onChange={setTitle} />
                <FormInput label="Description" multiline value={desc} onChange={setDesc} />
                <RadioGroup label="Visibility" value={status} onChange={setStatus} options={statusOptions} />

                {error && (
                    <div className="alert alert-danger py-2">
                        {error}
                    </div>
                )}
                <div className="d-flex flex-wrap gap-2 align-items-center">
                    <button
                        onClick={handleUpdate}
                        disabled={isSaving}
                        className="btn btn-dark"
                    >
                        {isSaving ? "Updating..." : "Update course"}
                    </button>
                    {selectedFile && (
                        <span className="text-muted small">New image selected</span>
                    )}
                </div>
            </div>

            <div className="col-lg-5">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                        <h6 className="fw-semibold mb-3">Cover picture</h6>
                        {previewUrl ? (
                            <img src={previewUrl} alt={course?.title} className="img-fluid rounded mb-3" style={{ height: "180px", width: "100%", objectFit: "cover" }} />
                        ) : (
                            <div className="d-flex align-items-center justify-content-center border border-2 border-dashed rounded bg-light text-muted mb-3" style={{ height: "180px" }}>
                                No image uploaded
                            </div>
                        )}
                        <FileUpload
                            label="Replace Cover"
                            onFilesSelected={handleFilesSelected}
                            accept="image/*"
                            multiple={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
