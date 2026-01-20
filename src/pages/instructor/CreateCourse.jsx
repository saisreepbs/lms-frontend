// src/pages/instructor/CreateCourse.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/instructor/FormInput.jsx";
import RadioGroup from "../../components/instructor/RadioGroup.jsx";
import FileUpload from "../../components/instructor/FileUpload.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { createCourse } from "../../api/courseService.js";

export default function CreateCourse() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [visibility, setVisibility] = useState("HIDDEN");
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleFilesSelected = (selectedFiles) => {
        setFiles(selectedFiles);
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
        <div>
            {/* Header with back arrow */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => navigate("/instructor/courses")}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-2xl font-semibold">Create new course</h1>
            </div>

            {/* Form */}
            <div className="max-w-2xl space-y-4">
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
                {files[0] && (
                    <div className="text-sm text-gray-600">Selected file: {files[0].name}</div>
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
                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                    Note: You can add modules and lessons to this course after creating it.
                </div>
                {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm">
                        {submitError}
                    </div>
                )}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={() => navigate("/instructor/courses")}
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
