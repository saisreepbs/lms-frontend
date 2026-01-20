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
            <div className="text-sm font-medium">{label}</div>
            <div className="border-2 border-dashed rounded p-6 text-center bg-gray-50">
                <div className="text-gray-600">Drag and drop files here</div>
                <div className="mt-2">
                    <label className="inline-block px-4 py-2 border rounded bg-white cursor-pointer hover:bg-gray-50">
                        Choose files to Upload
                        <input
                            type="file"
                            accept={accept}
                            multiple={multiple}
                            className="hidden"
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
