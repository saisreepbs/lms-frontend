import { useNavigate, useParams } from "react-router-dom";

export default function CourseOverview() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div>
      <button onClick={() => navigate("/learner/courses")} className="btn btn-link text-decoration-none mb-3 p-0">
        🡸 Back to Courses
      </button>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className="nav-link active">Overview</button>
        </li>
        <li className="nav-item">
          <button
            onClick={() => navigate(`/learner/courses/${courseId}/content`)}
            className="nav-link"
          >
            Content
          </button>
        </li>
      </ul>

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h2 className="h5 fw-semibold mb-2">Programming with Java</h2>
              <p className="small mb-2">Author: Dr. Stephen Strange</p>
              <p className="small mb-3">
                Programming with Java is a comprehensive course created for beginners and professionals.
              </p>
              <button
                onClick={() => navigate(`/learner/courses/${courseId}/content`)}
                className="btn btn-outline-secondary btn-sm"
              >
                View Content
              </button>
            </div>
            <div className="col-md-4">
              <div className="bg-light border d-flex align-items-center justify-content-center" style={{ height: "160px" }}>
                Cover Image
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}