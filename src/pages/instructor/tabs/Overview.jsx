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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
                <FormInput label="Course Title" value={title} onChange={setTitle} />
                <FormInput label="Description" multiline value={desc} onChange={setDesc} />
                <RadioGroup label="Visibility" value={status} onChange={setStatus} options={statusOptions} />

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleUpdate}
                        disabled={isSaving}
                        className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                    >
                        {isSaving ? "Updating..." : "Update course"}
                    </button>
                    {selectedFile && (
                        <span className="text-sm text-slate-500">New image selected</span>
                    )}
                </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                <div className="text-sm font-medium text-slate-700">Cover picture</div>
                {previewUrl ? (
                    <img src={previewUrl} alt={course?.title} className="h-40 w-full rounded-xl object-cover" />
                ) : (
                    <div className="flex h-40 w-full items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-400">
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
    );
}
