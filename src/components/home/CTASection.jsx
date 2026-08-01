import { useWebsiteSettings } from "../../context/WebsiteSettingsContext";

function CTASection() {
  const { settings, loading } = useWebsiteSettings();

  if (loading) {
    return null;
  }

  const ctaTitle =
    settings.ctaTitle ||
    "Need Printing Services?";

  const ctaDescription =
    settings.ctaDescription ||
    "Get quality printing work with Falguni Xerox & Computer Work.";

  const whatsapp =
    settings.whatsapp ||
    settings.phone ||
    "8320217733";

  const whatsappMessage =
    settings.whatsappMessage ||
    "Hello Falguni Xerox, I want to print some documents.";

  const cleanWhatsapp =
    whatsapp.replace(/\D/g, "");

  const whatsappUrl =
    `https://wa.me/91${cleanWhatsapp}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  return (
    <section className="cta-section">
      <div className="container">

        <h2>{ctaTitle}</h2>

        <p>
          {ctaDescription}
        </p>

        <a
          href={whatsappUrl}
          className="btn btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp Us
        </a>

      </div>
    </section>
  );
}

export default CTASection;