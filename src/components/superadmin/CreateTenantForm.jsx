function CreateTenantForm({ onBack }) {
  return (
    <div className="card" style={{ maxWidth: "800px" }}>
      <div className="card-body">
        <p
          onClick={onBack}
          className="small mb-4 text-primary fw-medium"
          style={{ cursor: "pointer" }}
        >
          ← Create a new Tenant
        </p>
        {/* Tenant Details */}
        <div className="border rounded p-4 mb-4">
          <h3 className="h6 fw-semibold mb-3">Tenant Details</h3>

          <div style={{ maxWidth: "500px" }}>
            <input
              placeholder="Name"
              className="form-control mb-3"
            />
            <select className="form-select">
              <option>Select Category</option>
              <option>Educators</option>
              <option>Corporate</option>
              <option>Training Institutes</option>
            </select>
          </div>
        </div>
        {/* Admin Details */}
        <div className="border rounded p-4 mb-4">
          <h3 className="h6 fw-semibold mb-3">Admin Details</h3>

          <div style={{ maxWidth: "500px" }}>
            <input
              placeholder="Full Name"
              className="form-control mb-3"
            />

            <input
              placeholder="Email"
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTenantForm;
