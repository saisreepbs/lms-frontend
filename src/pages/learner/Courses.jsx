import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="h4 fw-semibold mb-4">Courses</h1>

      <div className="row g-4">
        {[1, 2, 3, 4, 5].map((c) => (
          <div key={c} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: "128px" }}>
                Image
              </div>
              <div className="card-body">
                <h3 className="h6 fw-semibold">Course {c}</h3>
                <p className="small text-muted mb-3">Description</p>
                <button
                  onClick={() => navigate(`/learner/courses/${c}`)}
                  className="btn btn-outline-secondary btn-sm"
                >
                  View Content
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}