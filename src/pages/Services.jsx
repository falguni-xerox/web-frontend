import { useEffect, useState } from "react";
import ServiceCard from "../components/services/ServiceCard";

function Services() {
  const API_URL =
    "https://falguni-upload-backend.onrender.com/api/services/active";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =================================
  // FETCH ACTIVE SERVICES
  // =================================

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch services (${response.status})`
        );
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.services)) {
        setServices(data.services);
      } else {
        setServices([]);
        throw new Error(
          "Invalid services response from server"
        );
      }
    } catch (error) {
      console.error(
        "Fetch public services error:",
        error
      );

      setError(
        "Unable to load services right now."
      );
    } finally {
      setLoading(false);
    }
  };

  // =================================
  // INITIAL LOAD
  // =================================

  useEffect(() => {
    fetchServices();
  }, []);

  // =================================
  // GROUP SERVICES BY CATEGORY
  // =================================

  const groupedServices = services.reduce(
    (groups, service) => {
      const category = service.category;

      const categoryId =
        category?._id ||
        category?.slug ||
        "other";

      const categoryName =
        category?.name ||
        "Other Services";

      const categorySlug =
        category?.slug ||
        "other";

      if (!groups[categoryId]) {
        groups[categoryId] = {
          id: categoryId,
          name: categoryName,
          slug: categorySlug,
          services: [],
        };
      }

      groups[categoryId].services.push(
        service
      );

      return groups;
    },
    {}
  );

  const categories =
    Object.values(groupedServices);

  // =================================
  // RENDER
  // =================================

  return (
    <section className="services-page">
      <div className="container">

        {/* =================================
            PAGE HEADER
        ================================= */}

        <div className="services-header">

          <h1>
            Our Services
          </h1>

          <p>
            Quality printing and document
            services at Falguni Xerox.
          </p>

        </div>

        {/* =================================
            LOADING
        ================================= */}

        {loading && (
          <div className="services-loading">
            Loading services...
          </div>
        )}

        {/* =================================
            ERROR
        ================================= */}

        {!loading && error && (
          <div className="services-error">
            {error}
          </div>
        )}

        {/* =================================
            EMPTY
        ================================= */}

        {!loading &&
          !error &&
          services.length === 0 && (
            <div className="services-empty">
              No services available right now.
            </div>
          )}

        {/* =================================
            CATEGORIES
        ================================= */}

        {!loading &&
          !error &&
          categories.length > 0 && (
            <div className="services-categories">

              {categories.map(
                (category) => (
                  <div
                    className="service-category"
                    key={category.id}
                  >

                    {/* CATEGORY TITLE */}

                    <div className="service-category-header">

                      <h2>
                        {category.name}
                      </h2>

                    </div>

                    {/* SERVICES GRID */}

                    <div className="services-grid">

                      {category.services.map(
                        (service) => (
                          <ServiceCard
                            key={service._id}
                            title={service.name}
                            icon={service.icon}
                            description={
                              service.shortDescription
                            }
                            image={
                              service.image
                            }
                            price={
                              service.price
                            }
                          />
                        )
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

      </div>
    </section>
  );
}

export default Services;