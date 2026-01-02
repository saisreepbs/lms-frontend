// src/pages/instructor/CreateCourse.jsx
import React, { useState } from 'react';
import InstructorSidebar from '../../components/instructor/InstructorSidebar.jsx';
import FormInput from '../../components/instructor/FormInput.jsx';
import RadioGroup from '../../components/instructor/RadioGroup.jsx';
import FileUpload from '../../components/instructor/FileUpload.jsx';

export default function CreateCourse({ onCancel, onCreated, onCourses, onSettings }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [visibility, setVisibility] = useState('hidden');
    const [files, setFiles] = useState([]);

    const handleCreate = () => {
        const newCourse = {
            id: `c-${Date.now()}`,
            title: title.trim() || 'Untitled Course',
            description: desc.trim() || 'No description provided',
            visibility,
            cover: files[0] || null,
            createdAt: new Date().toLocaleString(),
            updatedAt: null,
        };
        onCreated(newCourse);
    };

    return (
        <div className="min-h-screen flex">
            <InstructorSidebar active="courses" onCourses={onCourses} onSettings={onSettings} />
            <main className="flex-1 p-6 bg-[#FCF6D9]">
                {/* Header with back arrow */}
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={onCancel} className="text-blue-600 hover:text-blue-800">
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
                    <FileUpload label="Cover Picture" onFilesSelected={setFiles} accept="image/*" multiple={false} />
                    <RadioGroup
                        label="Visibility"
                        value={visibility}
                        onChange={setVisibility}
                        options={[
                            { value: 'hidden', label: 'Hidden' },
                            { value: 'active', label: 'Active' },
                        ]}
                    />
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                        Note: You can add modules and lessons to this course after creating it.
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button onClick={onCancel} className="px-4 py-2 border rounded hover:bg-gray-50">
                            Cancel
                        </button>
                        <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Create
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
