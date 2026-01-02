// src/pages/instructor/tabs/Overview.jsx
import React, { useState } from 'react';
import FormInput from '../../../components/instructor/FormInput.jsx';
import RadioGroup from '../../../components/instructor/RadioGroup.jsx';
import FileUpload from '../../../components/instructor/FileUpload.jsx';

export default function Overview({ course, onUpdate }) {
    const [title, setTitle] = useState(course.title);
    const [desc, setDesc] = useState(course.description);
    const [visibility, setVisibility] = useState(course.visibility);

    const handleUpdate = () => {
        const updated = {
            ...course,
            title: title.trim(),
            description: desc.trim(),
            visibility,
            updatedAt: new Date().toLocaleString(), // ✅ update time
        };
        onUpdate(updated);
    };

    return (
        <div className="max-w-2xl space-y-4">
            {/* Editable fields */}
            <FormInput label="Course Title" value={title} onChange={setTitle} />
            <FormInput label="Description" multiline value={desc} onChange={setDesc} />
            <RadioGroup
                label="Visibility"
                value={visibility}
                onChange={setVisibility}
                options={[
                    { value: 'hidden', label: 'Hidden' },
                    { value: 'active', label: 'Active' },
                ]}
            />

            {/* Cover image preview + replace option */}
            <div className="space-y-2">
                <div className="text-sm font-medium">Cover Picture</div>
                {course.cover ? (
                    <img
                        src={URL.createObjectURL(course.cover)}
                        alt={course.title}
                        className="w-64 h-32 object-cover rounded"
                    />
                ) : (
                    <div className="w-64 h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}
                <FileUpload
                    label="Replace Cover"
                    onFilesSelected={(files) => {
                        const updated = { ...course, cover: files[0] };
                        onUpdate(updated);
                    }}
                    accept="image/*"
                    multiple={false}
                />
            </div>

            {/* Metadata */}
            {course.createdAt && (
                <div className="text-sm text-gray-600">Created at: {course.createdAt}</div>
            )}
            {course.updatedAt && (
                <div className="text-sm text-gray-600">Last updated: {course.updatedAt}</div>
            )}

            {/* Update button */}
            <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Update Course
            </button>
        </div>
    );
}
