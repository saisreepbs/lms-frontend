import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCourses } from "../../api";
import Header from "../../components/instructor/Header.jsx";
import CoursesGrid from "../../components/instructor/CoursesGrid.jsx";

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.tenantId) return;
      try {
        const data = await getCourses(user.tenantId);
        setCourses(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  const handleRemoveCourse = (courseId) => {
    if (confirm("Delete this course?")) {
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    }
  };

  if (loading) {
    return (
      <div>
        <Header title="My Courses" description="All your courses" />
        <div className="card-enterprise">
          <div className="card-enterprise-body">
            <div className="loading-enterprise">
              <div className="spinner-enterprise"></div>
              <span>Loading courses…</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header 
        title="My Courses" 
        description="All your courses"
        actions={
          <button
            onClick={() => navigate("/instructor/courses/new")}
            className="btn-enterprise btn-enterprise-dark"
          >
            + New Course
          </button>
        }
      />
      {courses.length === 0 ? (
        <div className="card-enterprise">
          <div className="card-enterprise-body empty-state-enterprise">
            <h3>No courses yet</h3>
            <p>Create your first course to get started</p>
            <button
              onClick={() => navigate("/instructor/courses/new")}
              className="btn-enterprise btn-enterprise-dark"
            >
              + Create Course
            </button>
          </div>
        </div>
      ) : (
        <CoursesGrid
          courses={courses}
          onEdit={(course) => navigate(`/instructor/courses/${course.id}`)}
          onRemove={handleRemoveCourse}
        />
      )}
    </div>
  );
}