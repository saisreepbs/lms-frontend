import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCourses, getEnrolledCourses, enrollInCourse } from "../../api";
import api from "../../api";

export default function Courses() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState(new Set());
  const [thumbnails, setThumbnails] = useState({});
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!user?.tenantId || !user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const [allCourses, enrolled] = await Promise.all([
        getCourses(user.tenantId),
        getEnrolledCourses(user.id),
      ]);
      setCourses(allCourses);
      setEnrolledIds(new Set(enrolled.map((c) => c.id)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  }, [user?.tenantId, user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fetch thumbnails for courses that have them
  useEffect(() => {
    let isMounted = true;
    const urls = {};

    const fetchThumbnails = async () => {
      const toFetch = courses.filter((c) => c.thumbnailId && !thumbnails[c.id]);
      await Promise.all(
        toFetch.map(async (course) => {
          try {
            const response = await api.get(`/api/resources/${course.thumbnailId}`, {
              responseType: "blob",
            });
            if (isMounted) {
              urls[course.id] = URL.createObjectURL(response.data);
              setThumbnails((prev) => ({ ...prev, [course.id]: urls[course.id] }));
            }
          } catch {
            // ignore thumbnail load failures
          }
        })
      );
    };

    if (courses.length > 0) fetchThumbnails();

    return () => {
      isMounted = false;
      Object.values(urls).forEach(URL.revokeObjectURL);
    };
  }, [courses]);

  const handleEnroll = async (courseId) => {
    setEnrollingId(courseId);
    setError(null);
    try {
      await enrollInCourse(courseId, user.id);
      setEnrolledIds((prev) => new Set([...prev, courseId]));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to enroll");
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <div className="page-header-left">
            <div>
              <h1 className="page-header-title">Courses</h1>
              <p className="page-header-desc">Browse and enroll in available courses</p>
            </div>
          </div>
        </div>
        <div className="loading-enterprise">
          <div className="spinner-enterprise"></div>
          <span>Loading courses…</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <div>
            <h1 className="page-header-title">Courses</h1>
            <p className="page-header-desc">Browse and enroll in available courses</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert-enterprise alert-enterprise-danger" style={{ marginBottom: 16 }}>
          {error}
        </div>
      )}

      {courses.length === 0 ? (
        <div className="card-enterprise">
          <div className="card-enterprise-body" style={{ textAlign: "center", padding: "48px 24px", color: "#95a5a6" }}>
            No courses available yet.
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {courses.map((course) => {
            const isEnrolled = enrolledIds.has(course.id);
            return (
              <div key={course.id} className="col-md-6 col-lg-4">
                <div className="card-enterprise" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      height: 140,
                      background: thumbnails[course.id] ? `url(${thumbnails[course.id]}) center/cover no-repeat` : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "3px 3px 0 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 13,
                    }}
                  >
                    {!thumbnails[course.id] && "No Image"}
                  </div>
                  <div className="card-enterprise-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px 0" }}>{course.title}</h3>
                    <p style={{ fontSize: 13, color: "#7f8c8d", margin: "0 0 12px 0", flex: 1 }}>
                      {course.description?.length > 100
                        ? course.description.slice(0, 100) + "…"
                        : course.description || "No description"}
                    </p>
                    {isEnrolled ? (
                      <button
                        className="btn-enterprise btn-enterprise-primary"
                        style={{ width: "100%" }}
                        onClick={() => navigate(`/learner/courses/${course.id}`)}
                      >
                        View Course
                      </button>
                    ) : (
                      <button
                        className="btn-enterprise btn-enterprise-dark"
                        style={{ width: "100%" }}
                        onClick={() => handleEnroll(course.id)}
                        disabled={enrollingId === course.id}
                      >
                        {enrollingId === course.id ? "Enrolling…" : "Enroll"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}