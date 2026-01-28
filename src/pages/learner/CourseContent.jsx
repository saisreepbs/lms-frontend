import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CourseContent() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState("Loops");

  return (
    <div>
      <button
        onClick={() => navigate(`/learner/courses/${courseId}`)}
        className="btn btn-link text-decoration-none mb-3 p-0"
      >
        🡸 Back to Overview
      </button>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            onClick={() => navigate(`/learner/courses/${courseId}`)}
            className="nav-link"
          >
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link active">Content</button>
        </li>
      </ul>

      <div className="row">
        {/* Left modules */}
        <div className="col-md-4 col-lg-3">
          <div className="card" style={{ maxHeight: "320px", overflowY: "auto" }}>
            <div className="card-body">
              <p className="fw-semibold mb-2">Course Content</p>
              <div className="small">
                <p className="fw-semibold">Module 1</p>
                <p
                  className="ms-3 text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveLesson("JDK & JVM")}
                >
                  Lesson 1: JDK and JVM
                </p>
                <p
                  className="ms-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveLesson("Variables")}
                >
                  Lesson 2: Variables
                </p>
                <p className="fw-semibold mt-2">Module 2</p>
                <p
                  className="ms-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveLesson("Conditionals")}
                >
                  Lesson 1: Conditionals
                </p>
                <p
                  className="ms-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveLesson("Loops")}
                >
                  Lesson 2: Loops
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right video */}
        <div className="col-md-8 col-lg-9">
          <div className="card">
            <div className="card-body">
              <h3 className="h6 fw-semibold mb-3">Lesson: {activeLesson}</h3>
              <div className="bg-secondary d-flex align-items-center justify-content-center text-white mb-3" style={{ height: "256px" }}>
                Video Player Placeholder
              </div>
              <p className="small">
                {activeLesson} are fundamental concepts used in programming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}