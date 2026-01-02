const Card = ({ value, label }) => (
  <div className="bg-white w-40 p-4 rounded-md text-center border border-black-400 shadow">
    <p className="text-xl font-bold">{value}</p>
    <p className="text-sm">{label}</p>
  </div>
);

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
     
      <section className="mb-8">
        <h2 className="font-semibold mb-3">Users</h2>
        <div className="flex gap-6">
          <Card value="0" label="Total Users" />
          <Card value="0" label="Learners" />
          <Card value="0" label="Instructors" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold mb-3">Courses</h2>
        <div className="flex gap-6">
          <Card value="0" label="Total Courses" />
          <Card value="0" label="Active Courses" />
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Organization Units</h2>
        <div className="flex gap-6">
          <Card value="0" label="Branches" />
          <Card value="0" label="Classes" />
        </div>
      </section>
    </div>
  );
}
