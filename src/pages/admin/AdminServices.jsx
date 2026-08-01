import { useEffect, useState } from "react";
import "../../styles/AdminSettings.css";

function AdminServices() {
  const API_URL = "http://localhost:5000/api/services";
  const CATEGORY_API_URL =
    "http://localhost:5000/api/service-categories";

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    shortDescription: "",
    description: "",
    icon: "fa-copy",
    price: "",
    status: true,
    displayOrder: 0,
  });

  // =================================
  // FETCH SERVICES
  // =================================

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await response.json();

      setServices(data.services || []);
    } catch (error) {
      console.error("Fetch services error:", error);
      setError("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  // =================================
  // FETCH CATEGORIES
  // =================================

  const fetchCategories = async () => {
    try {
      const response = await fetch(CATEGORY_API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();

      setCategories(
        data.categories ||
          data.serviceCategories ||
          []
      );
    } catch (error) {
      console.error(
        "Fetch categories error:",
        error
      );

      setError(
        "Failed to load service categories."
      );
    }
  };

  // =================================
  // INITIAL LOAD
  // =================================

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  // =================================
  // HANDLE INPUT
  // =================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =================================
  // AUTO SLUG
  // =================================

  const handleNameChange = (event) => {
    const name = event.target.value;

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((previous) => ({
      ...previous,
      name,
      slug,
    }));
  };

  // =================================
  // RESET FORM
  // =================================

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      category: "",
      shortDescription: "",
      description: "",
      icon: "fa-copy",
      price: "",
      status: true,
      displayOrder: 0,
    });
  };

  // =================================
  // OPEN ADD FORM
  // =================================

  const openAddForm = () => {
    setEditingId(null);
    setSuccess("");
    setError("");
    resetForm();
    setShowForm(true);
  };

  // =================================
  // OPEN EDIT FORM
  // =================================

  const openEditForm = (service) => {
    setSuccess("");
    setError("");

    setEditingId(service._id);

    setFormData({
      name: service.name || "",
      slug: service.slug || "",
      category:
        service.category?._id ||
        service.category ||
        "",
      shortDescription:
        service.shortDescription || "",
      description:
        service.description || "",
      icon: service.icon || "fa-copy",
      price: service.price || "",
      status:
        service.status !== undefined
          ? service.status
          : true,
      displayOrder:
        service.displayOrder || 0,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =================================
  // CLOSE FORM
  // =================================

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setSuccess("");
    setError("");
    resetForm();
  };

  // =================================
  // SAVE / UPDATE SERVICE
  // =================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!formData.name.trim()) {
        setError(
          "Service name is required."
        );
        setSaving(false);
        return;
      }

      if (!formData.slug.trim()) {
        setError(
          "Service slug is required."
        );
        setSaving(false);
        return;
      }

      if (!formData.category) {
        setError(
          "Please select a category."
        );
        setSaving(false);
        return;
      }

      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = isEditing
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...formData,
          displayOrder: Number(
            formData.displayOrder
          ),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to ${
              isEditing
                ? "update"
                : "create"
            } service`
        );
      }

      setSuccess(
        isEditing
          ? "Service updated successfully."
          : "Service created successfully."
      );

      setShowForm(false);
      setEditingId(null);
      resetForm();

      await fetchServices();
    } catch (error) {
      console.error(
        "Save service error:",
        error
      );

      setError(
        error.message ||
          "Failed to save service."
      );
    } finally {
      setSaving(false);
    }
  };

  // =================================
  // DELETE SERVICE
  // =================================

  const handleDelete = async (service) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${service.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${service._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete service"
        );
      }

      setSuccess(
        "Service deleted successfully."
      );

      await fetchServices();
    } catch (error) {
      console.error(
        "Delete service error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete service."
      );
    }
  };

  // =================================
  // TOGGLE STATUS
  // =================================

  const handleToggleStatus = async (
    service
  ) => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${service._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status: !service.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update status"
        );
      }

      setSuccess(
        service.status
          ? "Service deactivated."
          : "Service activated."
      );

      await fetchServices();
    } catch (error) {
      console.error(
        "Toggle status error:",
        error
      );

      setError(
        error.message ||
          "Failed to update status."
      );
    }
  };

  return (
    <div className="admin-settings-page">

      {/* =================================
          HEADER
      ================================= */}

      <div className="admin-settings-header">
        <h1>Services</h1>

        <p>
          Manage your website services
          without coding.
        </p>
      </div>

      {/* =================================
          SUCCESS MESSAGE
      ================================= */}

      {success && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 15px",
            background: "#e8f7ee",
            color: "#176b36",
            borderRadius: "8px",
          }}
        >
          {success}
        </div>
      )}

      {/* =================================
          ERROR MESSAGE
      ================================= */}

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 15px",
            background: "#fdecec",
            color: "#a32020",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

      {/* =================================
          ADD / EDIT FORM
      ================================= */}

      {showForm && (
        <div className="settings-card">

          <h2>
            {editingId
              ? "Edit Service"
              : "Add Service"}
          </h2>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">
              <label>
                Service Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Example: Color Print"
              />
            </div>

            {/* SLUG */}

            <div className="form-group">
              <label>
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="color-print"
              />
            </div>

            {/* CATEGORY */}

            <div className="form-group">
              <label>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">
                  Select Category
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* SHORT DESCRIPTION */}

            <div className="form-group">
              <label>
                Short Description
              </label>

              <input
                type="text"
                name="shortDescription"
                value={
                  formData.shortDescription
                }
                onChange={handleChange}
                placeholder="Short service description"
              />
            </div>

            {/* DESCRIPTION */}

            <div className="form-group">
              <label>
                Description
              </label>

              <textarea
                name="description"
                rows="4"
                value={
                  formData.description
                }
                onChange={handleChange}
                placeholder="Full service description"
              />
            </div>

            {/* ICON */}

            <div className="form-group">
              <label>
                Icon
              </label>

              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="fa-copy"
              />
            </div>

            {/* PRICE */}

            <div className="form-group">
              <label>
                Price
              </label>

              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Example: ₹5"
              />
            </div>

            {/* DISPLAY ORDER */}

            <div className="form-group">
              <label>
                Display Order
              </label>

              <input
                type="number"
                name="displayOrder"
                value={
                  formData.displayOrder
                }
                onChange={handleChange}
              />
            </div>

            {/* STATUS */}

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="status"
                  checked={
                    formData.status
                  }
                  onChange={handleChange}
                />

                {" "}
                Active Service
              </label>
            </div>

            {/* BUTTONS */}

            <div
              className="settings-actions"
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                type="submit"
                className="save-settings-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Service"
                  : "Save Service"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                style={{
                  padding: "10px 18px",
                  border:
                    "1px solid #ccc",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* =================================
          SERVICES LIST
      ================================= */}

      <div className="settings-card">

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>
            All Services
          </h2>

          {!showForm && (
            <button
              type="button"
              className="save-settings-btn"
              onClick={openAddForm}
            >
              + Add Service
            </button>
          )}
        </div>

        {/* LOADING */}

        {loading && (
          <p>
            Loading services...
          </p>
        )}

        {/* EMPTY */}

        {!loading &&
          services.length === 0 && (
            <p>
              No services found.
            </p>
          )}

        {/* SERVICES */}

        {!loading &&
          services.length > 0 && (
            <div>

              {services.map(
                (service) => (
                  <div
                    key={service._id}
                    style={{
                      padding:
                        "16px 0",
                      borderBottom:
                        "1px solid #ddd",
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        gap: "20px",
                      }}
                    >

                      {/* SERVICE INFO */}

                      <div
                        style={{
                          flex: 1,
                        }}
                      >

                        <h3
                          style={{
                            margin:
                              "0 0 5px",
                          }}
                        >
                          {service.name}
                        </h3>

                        <p
                          style={{
                            margin:
                              "0 0 5px",
                          }}
                        >
                          Category:{" "}

                          <strong>
                            {service
                              .category
                              ?.name ||
                              "No Category"}
                          </strong>
                        </p>

                        {service.shortDescription && (
                          <p
                            style={{
                              margin:
                                "0 0 5px",
                            }}
                          >
                            {
                              service.shortDescription
                            }
                          </p>
                        )}

                        {service.price && (
                          <p
                            style={{
                              margin: 0,
                            }}
                          >
                            Price:{" "}
                            <strong>
                              {
                                service.price
                              }
                            </strong>
                          </p>
                        )}

                      </div>

                      {/* STATUS */}

                      <div
                        style={{
                          textAlign:
                            "center",
                          minWidth:
                            "90px",
                        }}
                      >

                        <strong>
                          {service.status
                            ? "Active"
                            : "Inactive"}
                        </strong>

                      </div>

                      {/* ACTIONS */}

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap:
                            "wrap",
                          justifyContent:
                            "flex-end",
                        }}
                      >

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(
                              service
                            )
                          }
                          style={{
                            padding:
                              "8px 12px",
                            border:
                              "1px solid #ccc",
                            borderRadius:
                              "6px",
                            background:
                              "#fff",
                            cursor:
                              "pointer",
                          }}
                        >
                          ✏️ Edit
                        </button>

                        {/* STATUS */}

                        <button
                          type="button"
                          onClick={() =>
                            handleToggleStatus(
                              service
                            )
                          }
                          style={{
                            padding:
                              "8px 12px",
                            border:
                              "1px solid #ccc",
                            borderRadius:
                              "6px",
                            background:
                              "#fff",
                            cursor:
                              "pointer",
                          }}
                        >
                          {service.status
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              service
                            )
                          }
                          style={{
                            padding:
                              "8px 12px",
                            border:
                              "1px solid #dc3545",
                            color:
                              "#dc3545",
                            borderRadius:
                              "6px",
                            background:
                              "#fff",
                            cursor:
                              "pointer",
                          }}
                        >
                          🗑️ Delete
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

      </div>

    </div>
  );
}

export default AdminServices;