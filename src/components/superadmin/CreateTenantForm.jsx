function CreateTenantForm({ onBack }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-4xl">
      <p
        onClick={onBack}
        className="text-sm mb-6 cursor-pointer text-blue-600 font-medium"
      >
        ← Create a new Tenant
      </p>
      {/* Tenant Details */}
      <div className="border p-6 mb-6 rounded-lg">
        <h3 className="font-semibold mb-4">Tenant Details</h3>

        <div className="max-w-xl">
          <input
            placeholder="Name"
            className="w-full border px-4 py-3 mb-4 rounded-md text-sm"
          />
          <select className="w-full border px-4 py-3 rounded-md text-sm">
            <option>Select Category</option>
            <option>Educators</option>
            <option>Corporate</option>
            <option>Training Institutes</option>
          </select>
        </div>
      </div>
      {/* Admin Details */}
      <div className="border p-6 mb-6 rounded-lg">
        <h3 className="font-semibold mb-4">Admin Details</h3>

        <div className="max-w-xl">
          <input
            placeholder="Full Name"
            className="w-full border px-4 py-3 mb-4 rounded-md text-sm"
          />

          <input
            placeholder="Email"
            className="w-full border px-4 py-3 rounded-md text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTenantForm;
