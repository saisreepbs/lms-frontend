const Card = ({ value, label }) => (
  <div className="card text-center" style={{ width: "160px" }}>
    <div className="card-body">
      <p className="h4 fw-bold mb-1">{value}</p>
      <p className="small text-muted mb-0">{label}</p>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div>
      <h1 className="h3 fw-bold mb-4">Dashboard</h1>
     
      <section className="mb-4">
        <h2 className="h6 fw-semibold mb-3">Users</h2>
        <div className="d-flex gap-3">
          <Card value="0" label="Total Users" />
          <Card value="0" label="Learners" />
          <Card value="0" label="Instructors" />
        </div>
      </section>

      <section className="mb-4">
        <h2 className="h6 fw-semibold mb-3">Courses</h2>
        <div className="d-flex gap-3">
          <Card value="0" label="Total Courses" />
          <Card value="0" label="Active Courses" />
        </div>
      </section>

      <section>
        <h2 className="h6 fw-semibold mb-3">Organization Units</h2>
        <div className="d-flex gap-3">
          <Card value="0" label="Branches" />
          <Card value="0" label="Classes" />
        </div>
      </section>
    </div>
  );
}
