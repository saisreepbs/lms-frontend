import Header from "../../components/instructor/Header.jsx";

export default function Stats() {
  return (
    <div>
      <Header
        title="Course Stats"
        description="Performance metrics across your courses"
      />
      <div className="card">
        <div className="card-body text-center py-5">
          <h3 className="h5 mb-3">Course Statistics</h3>
          <p className="text-muted">
            View enrollment trends, completion rates, and engagement metrics
          </p>
        </div>
      </div>
    </div>
  );
}
