import { Link } from "react-router-dom";

const galleryImages = import.meta.glob(
  "../../assets/gallery/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const featuredImages = Object.values(galleryImages).slice(0, 4);

function ShopGallery() {
  return (
    <section className="gallery-section">
      <div className="container">

        <h2>Our Shop</h2>

        <p className="gallery-intro">
          A glimpse of Falguni Xerox & Computer Work.
        </p>

        <div className="gallery-grid">
          {featuredImages.map((image, index) => (
            <div className="gallery-item" key={image}>
              <img
                src={image}
                alt={`Falguni Xerox Shop ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="gallery-button">
          <Link to="/gallery" className="btn btn-primary">
            View Full Gallery
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ShopGallery;