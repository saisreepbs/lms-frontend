import Header from "../../components/instructor/Header.jsx";

export default function Enrollments() {
  return (
    <div className="space-y-6">
      <Header
        title="Enrollments"
        description="See who has enrolled in your courses"
      />
      <div className="rounded-2xl bg-white p-12 text-center">
        <h3 className="text-lg font-semibold text-slate-900">Enrollments View</h3>
        <p className="mt-2 text-sm text-slate-500">
          This feature will show enrollment data across all your courses
        </p>
      </div>
    </div>
  );
}
