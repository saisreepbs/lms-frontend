import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCourses } from "../../api";
import Header from "../../components/instructor/Header.jsx";
import CoursesGrid from "../../components/instructor/CoursesGrid.jsx";

export default function Drafts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.tenantId) return;
      try {
        const data = await getCourses(user.tenantId);
        const drafts = data.filter(c => c.currentStatus === "HIDDEN" || !c.currentStatus);
        setCourses(drafts);
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
        <Header title="Drafts" description="Courses you're still working on" />
        <div className="rounded-2xl bg-white p-8">
          <div className="flex items-center gap-4">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
            <p>Loading drafts…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title="Drafts"
        description="Courses you're still working on"
        actions={
          <button
            onClick={() => navigate("/instructor/courses/new")}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <span className="text-lg">+</span> New Course
          </button>
        }
      />
      {courses.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900">No drafts</h3>
          <p className="mt-2 text-sm text-slate-500">Create a new course to get started</p>
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
