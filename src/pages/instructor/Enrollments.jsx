import Header from "../../components/instructor/Header.jsx";

export default function Enrollments() {
  return (
    <div>
      <Header
        title="Enrollments"
        description="See who has enrolled in your courses"
      />
      <div className="card">
        <div className="card-body text-center py-5">
          <h3 className="h5 mb-3">Enrollments View</h3>
          <p className="text-muted">
            This feature will show enrollment data across all your courses
          </p>
        </div>
      </div>
    </div>
  );
}
