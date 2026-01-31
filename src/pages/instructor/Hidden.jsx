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
        <div className="card-enterprise">
          <div className="card-enterprise-body">
            <div className="loading-enterprise">
              <div className="spinner-enterprise"></div>
              <span>Loading hidden courses…</span>
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
        <div className="card-enterprise">
          <div className="card-enterprise-body empty-state-enterprise">
            <h3>No hidden courses</h3>
            <p>All your courses are visible</p>
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
