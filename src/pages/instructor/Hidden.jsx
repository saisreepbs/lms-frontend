import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCourses } from "../../api";
import Header from "../../components/instructor/Header.jsx";
import CoursesGrid from "../../components/instructor/CoursesGrid.jsx";

export default function Hidden() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.tenantId) return;
      try {
        const data = await getCourses(user.tenantId);
        const hidden = data.filter(c => c.currentStatus === "HIDDEN");
        setCourses(hidden);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Header title="Hidden Courses" description="Temporarily unavailable courses" />
        <div className="rounded-2xl bg-white p-8">
          <div className="flex items-center gap-4">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
            <p>Loading hidden courses…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title="Hidden Courses"
        description="Temporarily unavailable courses"
      />
      {courses.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900">No hidden courses</h3>
          <p className="mt-2 text-sm text-slate-500">All your courses are visible</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-8">
          <CoursesGrid
            courses={courses}
            onEdit={(course) => navigate(`/instructor/courses/${course.id}`)}
            onRemove={(id) => setCourses(prev => prev.filter(c => c.id !== id))}
          />
        </div>
      )}
    </div>
  );
}
