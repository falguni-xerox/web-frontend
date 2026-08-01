import {
  FaCopy,
  FaPrint,
  FaFile,
  FaImage,
  FaBook,
  FaFolder,
  FaIdCard,
  FaAddressCard,
  FaPen,
  FaLayerGroup,
  FaFileAlt,
  FaSearch,
  FaPalette,
} from "react-icons/fa";

function ServiceCard({
  title,
  icon,
  description,
  image,
  price,
}) {
  // =================================
  // ICON MAP
  // =================================

  const iconMap = {
    "fa-copy": <FaCopy />,
    "fa-print": <FaPrint />,
    "fa-file": <FaFile />,
    "fa-image": <FaImage />,
    "fa-book": <FaBook />,
    "fa-folder": <FaFolder />,
    "fa-id-card": <FaIdCard />,
    "fa-address-card": <FaAddressCard />,
    "fa-pen": <FaPen />,
    "fa-layer-group": <FaLayerGroup />,
    "fa-file-lines": <FaFileAlt />,
    "fa-panorama": <FaImage />,
    "fa-scan": <FaSearch />,
    "fa-palette": <FaPalette />,
  };

  // =================================
  // CHECK IMAGE
  // =================================

  const hasImage =
    typeof image === "string" &&
    image.trim() !== "";

  // =================================
  // PRICE
  // =================================

  const hasPrice =
    price !== undefined &&
    price !== null &&
    price !== "";

  return (
    <div className="service-card">

      {/* =================================
          IMAGE / ICON
      ================================= */}

      <div className="service-icon">

        {hasImage ? (
          <img
            src={image}
            alt={title || "Service"}
            className="service-card-image"
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          iconMap[icon] || <FaCopy />
        )}

      </div>

      {/* =================================
          SERVICE CONTENT
      ================================= */}

      <div className="service-card-content">

        <h3>
          {title}
        </h3>

        {/* DESCRIPTION */}

        {description && (
          <p className="service-description">
            {description}
          </p>
        )}

        {/* PRICE */}

        {hasPrice && (
          <div className="service-price">
            ₹{price}
          </div>
        )}

      </div>

    </div>
  );
}

export default ServiceCard;
