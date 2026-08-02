import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminSettings.css";
import API_BASE_URL from "../../api";

function AdminSettings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================================
  // LOAD SETTINGS
  // ================================

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/settings`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load settings"
          );
        }

        setSettings(data.settings || {});
      } catch (error) {
        console.error(
          "Load settings error:",
          error
        );

        setError(
          "Failed to load website settings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // ================================
  // HANDLE INPUT
  // ================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // ================================
  // SAVE SETTINGS
  // ================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/settings`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(settings),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update settings"
        );
      }

      // Update local settings
      setSettings(
        data.settings || settings
      );

      // Success message
      setMessage(
        "Website settings saved successfully."
      );

      // =================================
      // RETURN TO ADMIN DASHBOARD
      // =================================

      setTimeout(() => {
        navigate("/admin");
      }, 1000);

    } catch (error) {
      console.error(
        "Save settings error:",
        error
      );

      setError(
        error.message ||
          "Failed to save website settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div className="admin-settings-page">

        <div className="admin-settings-header">

          <h1>
            Website Settings
          </h1>

          <p>
            Loading settings...
          </p>

        </div>

      </div>
    );
  }

  // ================================
  // PAGE
  // ================================

  return (
    <div className="admin-settings-page">

      {/* ================================
          HEADER
      ================================= */}

      <div className="admin-settings-header">

        <h1>
          Website Settings
        </h1>

        <p>
          Manage your website content
          without coding.
        </p>

      </div>


      {/* ================================
          SUCCESS MESSAGE
      ================================= */}

      {message && (
        <div className="settings-success">
          {message}
        </div>
      )}


      {/* ================================
          ERROR MESSAGE
      ================================= */}

      {error && (
        <div className="settings-error">
          {error}
        </div>
      )}


      {/* ================================
          FORM
      ================================= */}

      <form onSubmit={handleSubmit}>

        {/* ================================
            BASIC INFORMATION
        ================================= */}

        <div className="settings-card">

          <h2>
            Basic Website Information
          </h2>

          <div className="settings-grid">

            <div className="form-group">

              <label>
                Website Name
              </label>

              <input
                type="text"
                name="siteName"
                value={
                  settings.siteName || ""
                }
                onChange={handleChange}
                placeholder="Falguni Xerox & Computer Work"
              />

            </div>


            <div className="form-group">

              <label>
                Tagline
              </label>

              <input
                type="text"
                name="tagline"
                value={
                  settings.tagline || ""
                }
                onChange={handleChange}
                placeholder="Fast • Reliable • Affordable Printing Services"
              />

            </div>

          </div>

        </div>


        {/* ================================
            CONTACT INFORMATION
        ================================= */}

        <div className="settings-card">

          <h2>
            Contact Information
          </h2>

          <div className="settings-grid">

            <div className="form-group">

              <label>
                Mobile Number
              </label>

              <input
                type="text"
                name="phone"
                value={
                  settings.phone || ""
                }
                onChange={handleChange}
                placeholder="8320217733"
              />

            </div>


            <div className="form-group">

              <label>
                WhatsApp Number
              </label>

              <input
                type="text"
                name="whatsapp"
                value={
                  settings.whatsapp || ""
                }
                onChange={handleChange}
                placeholder="8320217733"
              />

            </div>


            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  settings.email || ""
                }
                onChange={handleChange}
                placeholder="Enter email"
              />

            </div>


            <div className="form-group">

              <label>
                Address
              </label>

              <input
                type="text"
                name="address"
                value={
                  settings.address || ""
                }
                onChange={handleChange}
                placeholder="Enter shop address"
              />

            </div>

          </div>

        </div>


        {/* ================================
            SHOP TIMING
        ================================= */}

        <div className="settings-card">

          <h2>
            Shop Timing
          </h2>

          <div className="settings-grid">

            <div className="form-group">

              <label>
                Morning Opening
              </label>

              <input
                type="text"
                name="morningOpening"
                value={
                  settings.morningOpening || ""
                }
                onChange={handleChange}
                placeholder="7:30 AM"
              />

            </div>


            <div className="form-group">

              <label>
                Morning Closing
              </label>

              <input
                type="text"
                name="morningClosing"
                value={
                  settings.morningClosing || ""
                }
                onChange={handleChange}
                placeholder="1:30 PM"
              />

            </div>


            <div className="form-group">

              <label>
                Evening Opening
              </label>

              <input
                type="text"
                name="eveningOpening"
                value={
                  settings.eveningOpening || ""
                }
                onChange={handleChange}
                placeholder="3:30 PM"
              />

            </div>


            <div className="form-group">

              <label>
                Evening Closing
              </label>

              <input
                type="text"
                name="eveningClosing"
                value={
                  settings.eveningClosing || ""
                }
                onChange={handleChange}
                placeholder="9:30 PM"
              />

            </div>

          </div>


          <div className="form-group">

            <label>
              Closed Message
            </label>

            <input
              type="text"
              name="closedMessage"
              value={
                settings.closedMessage || ""
              }
              onChange={handleChange}
              placeholder="We are closed from 1:30 PM to 3:30 PM."
            />

          </div>

        </div>


        {/* ================================
            HERO SECTION
        ================================= */}

        <div className="settings-card">

          <h2>
            Hero Section
          </h2>


          <div className="form-group">

            <label>
              Hero Title
            </label>

            <input
              type="text"
              name="heroTitle"
              value={
                settings.heroTitle || ""
              }
              onChange={handleChange}
              placeholder="Falguni Xerox & Computer Work"
            />

          </div>


          <div className="form-group">

            <label>
              Hero Description
            </label>

            <textarea
              rows="3"
              name="heroDescription"
              value={
                settings.heroDescription || ""
              }
              onChange={handleChange}
              placeholder="Fast, reliable and affordable printing services."
            />

          </div>

        </div>


        {/* ================================
            CTA SECTION
        ================================= */}

        <div className="settings-card">

          <h2>
            CTA Section
          </h2>


          <div className="form-group">

            <label>
              CTA Title
            </label>

            <input
              type="text"
              name="ctaTitle"
              value={
                settings.ctaTitle || ""
              }
              onChange={handleChange}
              placeholder="Need Prints? We Are Here To Help!"
            />

          </div>


          <div className="form-group">

            <label>
              CTA Description
            </label>

            <textarea
              rows="3"
              name="ctaDescription"
              value={
                settings.ctaDescription || ""
              }
              onChange={handleChange}
              placeholder="Upload your files or contact us on WhatsApp."
            />

          </div>


          <div className="form-group">

            <label>
              Upload URL
            </label>

            <input
              type="text"
              name="uploadUrl"
              value={
                settings.uploadUrl || ""
              }
              onChange={handleChange}
              placeholder="Upload portal URL"
            />

          </div>


          <div className="form-group">

            <label>
              WhatsApp Message
            </label>

            <textarea
              rows="3"
              name="whatsappMessage"
              value={
                settings.whatsappMessage || ""
              }
              onChange={handleChange}
              placeholder="Hello Falguni Xerox, I want to print some documents."
            />

          </div>

        </div>


        {/* ================================
            LOCATION
        ================================= */}

        <div className="settings-card">

          <h2>
            Location
          </h2>


          <div className="form-group">

            <label>
              Google Map URL
            </label>

            <input
              type="text"
              name="googleMapUrl"
              value={
                settings.googleMapUrl || ""
              }
              onChange={handleChange}
              placeholder="Google Maps URL"
            />

          </div>

        </div>


        {/* ================================
            SOCIAL LINKS
        ================================= */}

        <div className="settings-card">

          <h2>
            Social Links
          </h2>


          <div className="settings-grid">

            <div className="form-group">

              <label>
                Instagram URL
              </label>

              <input
                type="text"
                name="instagramUrl"
                value={
                  settings.instagramUrl || ""
                }
                onChange={handleChange}
                placeholder="Instagram URL"
              />

            </div>


            <div className="form-group">

              <label>
                Facebook URL
              </label>

              <input
                type="text"
                name="facebookUrl"
                value={
                  settings.facebookUrl || ""
                }
                onChange={handleChange}
                placeholder="Facebook URL"
              />

            </div>

          </div>

        </div>


        {/* ================================
            SEO
        ================================= */}

        <div className="settings-card">

          <h2>
            SEO Settings
          </h2>


          <div className="form-group">

            <label>
              SEO Title
            </label>

            <input
              type="text"
              name="seoTitle"
              value={
                settings.seoTitle || ""
              }
              onChange={handleChange}
              placeholder="Falguni Xerox & Computer Work"
            />

          </div>


          <div className="form-group">

            <label>
              SEO Description
            </label>

            <textarea
              rows="4"
              name="seoDescription"
              value={
                settings.seoDescription || ""
              }
              onChange={handleChange}
              placeholder="Website SEO description"
            />

          </div>

        </div>


        {/* ================================
            ACTIONS
        ================================= */}

        <div className="settings-actions">

          <button
            type="submit"
            className="save-settings-btn"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AdminSettings;