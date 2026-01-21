// src/components/instructor/FileUpload.jsx
export default function FileUpload({
    label,
    onFilesSelected,
    accept = "*/*",
    multiple = false,
}) {
    const handleChange = (event) => {
        const selectedFiles = Array.from(event.target.files || []);
        onFilesSelected(selectedFiles);
    };

    return (
        <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">{label}</div>
            <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-6 text-center transition hover:border-slate-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mb-3 h-8 w-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 9L12 4.5 7.5 9M12 4.5v12"
                    />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Click to upload</span>
                <span className="text-xs text-slate-500">or drag & drop files</span>
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    className="sr-only"
                    onChange={handleChange}
                />
            </label>
        </div>
    );
}
