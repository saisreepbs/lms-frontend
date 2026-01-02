import { useNavigate, useParams } from "react-router-dom";

export default function CourseOverview() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div>
      <button onClick={() => navigate("/learner/courses")} className="mb-4">
        🡸 Back to Courses
      </button>

      <div className="flex border rounded mb-6">
        <button className="flex-1 py-2 bg-[#9db7e8]">Overview</button>
        <button
          onClick={() => navigate(`/learner/courses/${courseId}/content`)}
          className="flex-1 py-2"
        >
          Content
        </button>
      </div>

      <div className="border p-6 bg-white flex gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Programming with Java</h2>
          <p className="text-sm mb-2">Author: Dr. Stephen Strange</p>
          <p className="text-sm mb-4">
            Programming with Java is a comprehensive course created for beginners and professionals.
          </p>
          <button
            onClick={() => navigate(`/learner/courses/${courseId}/content`)}
            className="px-3 py-1 border rounded"
          >
            View Content
          </button>
        </div>
        <div className="w-64 h-40 border flex items-center justify-center">
          Cover Image
        </div>
      </div>
    </div>
  );
}