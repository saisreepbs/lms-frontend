import Header from "../../components/instructor/Header.jsx";

export default function Stats() {
  return (
    <div className="space-y-6">
      <Header
        title="Course Stats"
        description="Performance metrics across your courses"
      />
      <div className="rounded-2xl bg-white p-12 text-center">
        <h3 className="text-lg font-semibold text-slate-900">Course Statistics</h3>
        <p className="mt-2 text-sm text-slate-500">
          View enrollment trends, completion rates, and engagement metrics
        </p>
      </div>
    </div>
  );
}
