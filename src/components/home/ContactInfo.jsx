import { useWebsiteSettings } from "../../context/WebsiteSettingsContext";

function ContactInfo() {
  const { settings, loading } = useWebsiteSettings();

  if (loading) {
    return null;
  }

  const siteName =
    settings.siteName || "Falguni Xerox & Computer Work";

  const phone =
    settings.phone || "8320217733";

  const whatsapp =
    settings.whatsapp || phone;

  const email =
    settings.email || "";

  const address =
    settings.address || "";

  const cleanPhone = phone.replace(/\D/g, "");
  const cleanWhatsapp = whatsapp.replace(/\D/g, "");

  const phoneUrl = `tel:+91${cleanPhone}`;

  const whatsappUrl = `https://wa.me/91${cleanWhatsapp}`;

  return (
    <section className="contact-info-section">
      <div className="container">

        <h2>Visit Falguni Xerox</h2>

        <p>
          {siteName}
        </p>

        <div className="contact-details">

          <p>
            📞 Call:{" "}
            <a href={phoneUrl}>
              {phone}
            </a>
          </p>

          <p>
            💬 WhatsApp:{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {whatsapp}
            </a>
          </p>

          {email && (
            <p>
              📧 Email:{" "}
              <a href={`mailto:${email}`}>
                {email}
              </a>
            </p>
          )}

          {address && (
            <p>
              📍 {address}
            </p>
          )}

        </div>

      </div>
    </section>
  );
}

export default ContactInfo;