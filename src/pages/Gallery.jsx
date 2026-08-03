import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Gallery.css";

const galleryImages = import.meta.glob(
  "../assets/gallery/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = Object.values(galleryImages);

  return (
    <section className="gallery-page">
      <div className="container">

        <Link to="/" className="gallery-back-btn">
          ← Back to Home
        </Link>

        <h1>Falguni Xerox Gallery</h1>

        <p className="gallery-page-intro">
          Explore Falguni Xerox & Computer Work.
        </p>

        <div className="gallery-page-grid">
          {images.map((image, index) => (
            <div
              className="gallery-page-item"
              key={image}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Falguni Xerox Shop ${index + 1}`}
              />
            </div>
          ))}
        </div>

      </div>

      {selectedImage && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="gallery-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Falguni Xerox Shop"
            loading="lazy"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </section>
  );
}

export default Gallery;