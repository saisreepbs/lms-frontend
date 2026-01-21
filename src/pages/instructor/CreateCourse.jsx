// src/pages/instructor/CreateCourse.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/instructor/FormInput.jsx";
import RadioGroup from "../../components/instructor/RadioGroup.jsx";
import FileUpload from "../../components/instructor/FileUpload.jsx";
import Header from "../../components/instructor/Header.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { createCourse } from "../../api/courseService.js";

export default function CreateCourse() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [visibility, setVisibility] = useState("HIDDEN");
    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFilesSelected = (selectedFiles) => {
        setFiles(selectedFiles);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        const file = selectedFiles[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleCreate = async () => {
        const trimmedTitle = title.trim();
        const trimmedDesc = desc.trim();

        if (!trimmedTitle || !trimmedDesc) {
            setSubmitError("Title and description are required.");
            return;
        }

        if (!user?.tenantId || !user?.id) {
            setSubmitError("Missing instructor context. Please sign in again.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await createCourse(
                user.tenantId,
                {
                    title: trimmedTitle,
                    description: trimmedDesc,
                    instructorId: user.id,
                    visibility,
                },
                files[0] || null
            );
            navigate("/instructor/courses");
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to create course. Please try again.";
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <Header
                title="Create new course"
                description="Set up the essentials before adding content."
                showBack
                onBack={() => navigate("/instructor/courses")}
            />

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
                <div className="space-y-5">
                    <FormInput
                        label="Course Title"
                        placeholder="Programming with Java, etc."
                        value={title}
                        onChange={setTitle}
                    />
                    <FormInput
                        label="Description"
                        multiline
                        placeholder="Course description"
                        value={desc}
                        onChange={setDesc}
                    />
                    <FileUpload
                        label="Cover Picture"
                        onFilesSelected={handleFilesSelected}
                        accept="image/*"
                        multiple={false}
                    />
                    {previewUrl ? (
                        <div className="space-y-2">
                            <img src={previewUrl} alt="Selected cover" className="w-64 h-32 rounded object-cover" />
                            {files[0] && (
                                <div className="text-sm text-gray-600">Selected file: {files[0].name}</div>
                            )}
                        </div>
                    ) : (
                        files[0] && (
                            <div className="text-sm text-gray-600">Selected file: {files[0].name}</div>
                        )
                    )}
                    <RadioGroup
                        label="Visibility"
                        value={visibility}
                        onChange={setVisibility}
                        options={[
                            { value: "HIDDEN", label: "Hidden" },
                            { value: "ACTIVE", label: "Active" },
                            { value: "INACTIVE", label: "Inactive" },
                        ]}
                    />
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-600">
                        You can add modules and lessons once the course is created.
                    </div>
                    {submitError && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {submitError}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-3 pt-2">
                        <button
                            onClick={() => navigate("/instructor/courses")}
                            className="inline-flex items-center rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create course"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
