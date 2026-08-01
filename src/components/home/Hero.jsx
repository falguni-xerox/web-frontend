import { useWebsiteSettings } from "../../context/WebsiteSettingsContext";

function Hero() {
  const { settings, loading } = useWebsiteSettings();

  if (loading) {
    return null;
  }

  const siteName =
    settings.siteName || "Falguni Xerox & Computer Work";

  const heroTitle =
    settings.heroTitle || siteName;

  const heroDescription =
    settings.tagline ||
    settings.heroDescription ||
    "Fast • Reliable • Affordable Printing Services";

  const uploadUrl =
    settings.uploadUrl ||
    "https://upload.falgunixerox.in/";

  const whatsappNumber =
    settings.whatsapp ||
    settings.phone ||
    "8320217733";

  const whatsappMessage =
    settings.whatsappMessage ||
    "Hello Falguni Xerox, I want to print some documents.";

  const cleanWhatsappNumber = whatsappNumber.replace(/\D/g, "");

  const whatsappUrl = `https://wa.me/91${cleanWhatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section className="hero">
      <div className="container hero-container">

        <div className="hero-content">

          <h1>{heroTitle}</h1>

          <p>{heroDescription}</p>

          <div className="hero-buttons">

            <a
              href={uploadUrl}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Upload Documents
            </a>

            <a
              href={whatsappUrl}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Print
            </a>

          </div>
        </div>

        <div className="hero-image">
          <img
            src="/images/hero/shop.jpg"
            alt={siteName}
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;