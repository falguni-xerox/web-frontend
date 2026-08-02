import React from "react";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">

      {/* =================================
          ADMIN HEADER
      ================================= */}

      <header className="admin-header">

        <div className="admin-brand">

          <div className="admin-logo">
            F
          </div>

          <div>
            <h1>Falguni Xerox & Computer Work</h1>
            <p>Admin Panel</p>
          </div>

        </div>

      </header>


      {/* =================================
          ADMIN CONTENT
      ================================= */}

      <main className="admin-content">
        {children}
      </main>

    </div>
  );
}

export default AdminLayout;