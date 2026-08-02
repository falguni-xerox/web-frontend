import { useEffect, useState } from "react";
import "../../styles/AdminSettings.css";

function AdminServiceCategories() {
  const API_URL =
    "https://falguni-upload-backend.onrender.com/api/service-categories";

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
    description: "",
    icon: "",
    image: "",
    isActive: true,
    displayOrder: 0,
  });

  // =================================
  // FETCH CATEGORIES
  // =================================

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch categories (${response.status})`
        );
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        setCategories(
          data.categories ||
            data.serviceCategories ||
            []
        );
      }
    } catch (error) {
      console.error(
        "Fetch categories error:",
        error
      );

      setError(
        "Failed to load service categories."
      );
    } finally {
      setLoading(false);
    }
  };

  // =================================
  // INITIAL LOAD
  // =================================

  useEffect(() => {
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
      description: "",
      icon: "",
      image: "",
      isActive: true,
      displayOrder: 0,
    });

    setEditingId(null);
  };

  // =================================
  // OPEN ADD FORM
  // =================================

  const openAddForm = () => {
    resetForm();

    setError("");
    setSuccess("");

    setShowForm(true);
  };

  // =================================
  // OPEN EDIT FORM
  // =================================

  const openEditForm = (category) => {
    setFormData({
      name: category.name || "",
      slug: category.slug || "",
      description:
        category.description || "",
      icon: category.icon || "",
      image: category.image || "",
      isActive:
        category.isActive !== false,
      displayOrder:
        category.displayOrder || 0,
    });

    setEditingId(category._id);

    setError("");
    setSuccess("");

    setShowForm(true);
  };

  // =================================
  // CLOSE FORM
  // =================================

  const closeForm = () => {
    setShowForm(false);

    resetForm();

    setError("");
    setSuccess("");
  };

  // =================================
  // SAVE CATEGORY
  // =================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!formData.name.trim()) {
        setError(
          "Category name is required."
        );
        setSaving(false);
        return;
      }

      if (!formData.slug.trim()) {
        setError(
          "Category slug is required."
        );
        setSaving(false);
        return;
      }

      const method = editingId
        ? "PUT"
        : "POST";

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          ...formData,

          displayOrder: Number(
            formData.displayOrder
          ),
        }),
      });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save category"
        );
      }

      setSuccess(
        editingId
          ? "Category updated successfully."
          : "Category created successfully."
      );

      setShowForm(false);

      resetForm();

      await fetchCategories();
    } catch (error) {
      console.error(
        "Save category error:",
        error
      );

      setError(
        error.message ||
          "Failed to save category."
      );
    } finally {
      setSaving(false);
    }
  };

  // =================================
  // DELETE CATEGORY
  // =================================

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Delete "${category.name}" category?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${category._id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete category"
        );
      }

      setSuccess(
        "Category deleted successfully."
      );

      await fetchCategories();
    } catch (error) {
      console.error(
        "Delete category error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete category."
      );
    }
  };

  return (
    <div className="admin-settings-page">

      {/* =================================
          HEADER
      ================================= */}

      <div className="admin-settings-header">

        <h1>
          Service Categories
        </h1>

        <p>
          Manage your service categories
          without coding.
        </p>

      </div>

      {/* =================================
          SUCCESS
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
          ERROR
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
              ? "Edit Category"
              : "Add Category"}
          </h2>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <label>
                Category Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Example: Xerox & Print"
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
                placeholder="xerox-print"
              />

            </div>

            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                rows="3"
                value={
                  formData.description
                }
                onChange={handleChange}
                placeholder="Category description"
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
                placeholder="🖨️"
              />

            </div>

            {/* IMAGE */}

            <div className="form-group">

              <label>
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/services/xerox.jpg"
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

            {/* ACTIVE */}

            <div className="form-group">

              <label>

                <input
                  type="checkbox"
                  name="isActive"
                  checked={
                    formData.isActive
                  }
                  onChange={handleChange}
                />

                {" "}Active Category

              </label>

            </div>

            {/* BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
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
                  ? "Update Category"
                  : "Save Category"}
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
          CATEGORIES LIST
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
            Categories
          </h2>

          {!showForm && (
            <button
              type="button"
              className="save-settings-btn"
              onClick={openAddForm}
            >
              + Add Category
            </button>
          )}

        </div>

        {/* LOADING */}

        {loading && (
          <p>
            Loading categories...
          </p>
        )}

        {/* EMPTY */}

        {!loading &&
          categories.length === 0 && (
            <p>
              No categories found.
            </p>
          )}

        {/* LIST */}

        {!loading &&
          categories.length > 0 && (
            <div>

              {categories.map(
                (category) => (

                  <div
                    key={category._id}
                    style={{
                      padding: "16px 0",
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

                      {/* LEFT */}

                      <div>

                        <h3
                          style={{
                            margin:
                              "0 0 6px",
                          }}
                        >

                          {category.icon && (
                            <span
                              style={{
                                marginRight:
                                  "8px",
                              }}
                            >
                              {
                                category.icon
                              }
                            </span>
                          )}

                          {category.name}

                        </h3>

                        <p
                          style={{
                            margin:
                              "0 0 5px",
                            color:
                              "#666",
                          }}
                        >
                          Slug:{" "}
                          <strong>
                            {
                              category.slug
                            }
                          </strong>
                        </p>

                        {category.description && (
                          <p
                            style={{
                              margin: 0,
                            }}
                          >
                            {
                              category.description
                            }
                          </p>
                        )}

                      </div>

                      {/* RIGHT */}

                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          gap: "8px",
                          flexWrap:
                            "wrap",
                          justifyContent:
                            "flex-end",
                        }}
                      >

                        <span>
                          {category.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(
                              category
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
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              category
                            )
                          }
                          style={{
                            padding:
                              "8px 12px",
                            border:
                              "1px solid #dc3545",
                            borderRadius:
                              "6px",
                            background:
                              "#fff",
                            color:
                              "#dc3545",
                            cursor:
                              "pointer",
                          }}
                        >
                          Delete
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

export default AdminServiceCategories;