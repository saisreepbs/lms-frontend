// src/components/instructor/FileUpload.jsx
import { useRef } from "react";

export default function FileUpload({
    label,
    onFilesSelected,
    accept = "*/*",
    multiple = false,
}) {
    const inputRef = useRef(null);

    const handleChange = (event) => {
        const selectedFiles = Array.from(event.target.files || []);
        onFilesSelected(selectedFiles);
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <div 
                onClick={handleClick}
                className="border border-dashed rounded p-4 text-center bg-light" 
                style={{ cursor: "pointer" }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    className="mb-2 text-muted"
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
                <div className="fw-semibold">Click to upload</div>
                <div className="small text-muted">or drag & drop files</div>
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    className="d-none"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
