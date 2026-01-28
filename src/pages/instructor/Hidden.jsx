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
      <div>
        <Header title="Hidden Courses" description="Temporarily unavailable courses" />
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center gap-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mb-0">Loading hidden courses…</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Hidden Courses"
        description="Temporarily unavailable courses"
      />
      {courses.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <h3 className="h5 mb-2">No hidden courses</h3>
            <p className="text-muted mb-0">All your courses are visible</p>
          </div>
        </div>
      ) : (
        <CoursesGrid
          courses={courses}
          onEdit={(course) => navigate(`/instructor/courses/${course.id}`)}
          onRemove={(id) => setCourses(prev => prev.filter(c => c.id !== id))}
        />
      )}
    </div>
  );
}
