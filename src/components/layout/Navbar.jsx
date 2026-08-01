import { NavLink } from "react-router-dom";
import "../../styles/Navbar.css";
import { useState } from "react";
import { useWebsiteSettings } from "../../context/WebsiteSettingsContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { settings, loading } = useWebsiteSettings();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const siteName =
    settings.siteName || "Falguni Xerox";

  if (loading) {
    return null;
  }

  return (
    <header className="navbar">
      <div className="container">

        <NavLink
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          {siteName}
        </NavLink>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <nav
          className={`nav-menu ${
            menuOpen ? "active" : ""
          }`}
        >

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
            onClick={closeMenu}
          >
            Services
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
            onClick={closeMenu}
          >
            Gallery
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
            onClick={closeMenu}
          >
            Contact
          </NavLink>

        </nav>

      </div>
    </header>
  );
}

export default Navbar;