import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <section className="admin-settings-page">

      {/* HEADER */}
      <div className="admin-settings-header">
        <h1>Admin Dashboard</h1>

        <p>
          Manage your Falguni Xerox website
          from one place.
        </p>
      </div>

      {/* DASHBOARD CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        {/* SETTINGS */}
        <Link
          to="/admin/settings"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div className="settings-card">
            <h2>⚙️ Website Settings</h2>

            <p>
              Manage website name, contact
              details, timings, hero section
              and other settings.
            </p>

            <strong>
              Manage Settings →
            </strong>
          </div>
        </Link>


        {/* CATEGORIES */}
        <Link
          to="/admin/service-categories"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div className="settings-card">
            <h2>📂 Service Categories</h2>

            <p>
              Add, edit and delete service
              categories.
            </p>

            <strong>
              Manage Categories →
            </strong>
          </div>
        </Link>


        {/* SERVICES */}
        <Link
          to="/admin/services"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div className="settings-card">
            <h2>🛠️ Services</h2>

            <p>
              Add, edit, activate or deactivate
              your website services.
            </p>

            <strong>
              Manage Services →
            </strong>
          </div>
        </Link>

      </div>

    </section>
  );
}

export default AdminDashboard;