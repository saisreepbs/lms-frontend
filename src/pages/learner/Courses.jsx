import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">Courses</h1>

      <div className="grid grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5].map((c) => (
          <div key={c} className="border p-4 bg-white">
            <div className="h-32 border mb-3 flex items-center justify-center">
              Image
            </div>
            <h3 className="font-semibold">Course {c}</h3>
            <p className="text-sm text-gray-600 mb-3">Description</p>
            <button
              onClick={() => navigate(`/learner/courses/${c}`)}
              className="px-3 py-1 border rounded"
            >
              View Content
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}