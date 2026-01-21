// src/pages/instructor/tabs/Overview.jsx
import React, { useState, useEffect } from "react";
import FormInput from "../../../components/instructor/FormInput.jsx";
import RadioGroup from "../../../components/instructor/RadioGroup.jsx";
import FileUpload from "../../../components/instructor/FileUpload.jsx";
import api from "../../../api/axios.js";

const STATUS_LABELS = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    HIDDEN: "Hidden",
};

const STATUS_ORDER = ["ACTIVE", "INACTIVE", "HIDDEN"];

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
        if (course?.statusOptions) {
            const available = STATUS_ORDER.filter((key) => key in course.statusOptions);
            if (available.length) {
                return available.map((key) => ({ value: key, label: STATUS_LABELS[key] || key }));
            }
        }
        return STATUS_ORDER.map((key) => ({ value: key, label: STATUS_LABELS[key] }));
    })();

    return (
        <div className="max-w-2xl space-y-4">
            <FormInput label="Course Title" value={title} onChange={setTitle} />
            <FormInput label="Description" multiline value={desc} onChange={setDesc} />
            <RadioGroup label="Visibility" value={status} onChange={setStatus} options={statusOptions} />

            <div className="space-y-2">
                <div className="text-sm font-medium">Cover Picture</div>
                {previewUrl ? (
                    <img src={previewUrl} alt={course?.title} className="w-64 h-32 object-cover rounded" />
                ) : (
                    <div className="w-64 h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}
                <FileUpload
                    label="Replace Cover"
                    onFilesSelected={handleFilesSelected}
                    accept="image/*"
                    multiple={false}
                />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm">{error}</div>
            )}
            <button
                onClick={handleUpdate}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSaving ? "Updating..." : "Update Course"}
            </button>
        </div>
    );
}
