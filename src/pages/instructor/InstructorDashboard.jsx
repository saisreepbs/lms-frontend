import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCoursesByTenant } from "../../api/courseService";
import Header from "../../components/instructor/Header.jsx";
import CoursesGrid from "../../components/instructor/CoursesGrid.jsx";

const SectionShell = ({ children }) => (
  <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
    {children}
  </section>
);

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.tenantId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getCoursesByTenant(user.tenantId);
        setCourses(data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.response?.data?.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const handleRemoveCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    }
  };

  const newCourseButton = useMemo(
    () => (
      <button
        onClick={() => navigate("/instructor/courses/new")}
        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 cursor-pointer"
      >
        <span className="text-lg">+</span> New Course
      </button>
    ),
    [navigate]
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <Header
          title="Courses"
          description="Monitor and organize your catalog"
          actions={newCourseButton}
        />
        <SectionShell>
          <div className="flex items-center gap-4">
            <span className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
            <p className="text-slate-600">Loading courses…</p>
          </div>
        </SectionShell>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Header
          title="Courses"
          description="Monitor and organize your catalog"
          actions={newCourseButton}
        />
        <SectionShell>
          <div className="space-y-3">
            <p className="text-base font-semibold text-red-600">Unable to load courses</p>
            <p className="text-sm text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer"
            >
              Retry
            </button>
          </div>
        </SectionShell>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title="Courses"
        description="Monitor and organize your catalog"
        actions={newCourseButton}
      />
      {courses.length === 0 ? (
        <SectionShell>
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <svg className="h-16 w-16 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">No courses yet</h3>
              <p className="text-sm text-slate-500">Create your first course to get started.</p>
            </div>
            <button
              onClick={() => navigate("/instructor/courses/new")}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 cursor-pointer"
            >
              <span className="text-lg">+</span> Create Course
            </button>
          </div>
        </SectionShell>
      ) : (
        <SectionShell>
          <CoursesGrid
            courses={courses}
            onEdit={(course) => navigate(`/instructor/courses/${course.id}`)}
            onRemove={handleRemoveCourse}
          />
        </SectionShell>
      )}
    </div>
  );
}
