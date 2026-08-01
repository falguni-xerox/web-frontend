import { useEffect, useState } from "react";
import ServiceCard from "../services/ServiceCard";

import {
  FaCopy,
  FaPrint,
  FaBook,
  FaFileAlt,
} from "react-icons/fa";

import {
  MdOutlineLayers,
} from "react-icons/md";

import {
  PiImageSquareBold,
} from "react-icons/pi";

function ServicesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "http://localhost:5000/api/service-categories/active";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch service categories");
        }

        const data = await response.json();

        setCategories(data.categories || []);
      } catch (error) {
        console.error(
          "Fetch service categories error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case "xerox-print":
        return <FaCopy />;

      case "scan":
        return <FaFileAlt />;

      case "lamination":
        return <MdOutlineLayers />;

      case "graphic-design":
        return <PiImageSquareBold />;

      case "stationery":
        return <FaBook />;

      default:
        return <FaPrint />;
    }
  };

  if (loading) {
    return null;
  }

  return (
    <section className="services-section">
      <h2>Our Services</h2>

      <div className="services-grid">

        {categories.map((category) => (
          <ServiceCard
            key={category._id}
            icon={getCategoryIcon(category.slug)}
            title={category.name}
          />
        ))}

      </div>
    </section>
  );
}

export default ServicesSection;