import { useWebsiteSettings } from "../context/WebsiteSettingsContext";
import "../styles/Contact.css";

function Contact() {
  const { settings, loading } = useWebsiteSettings();

  if (loading) {
    return null;
  }

  const phone =
    settings.phone || "8320217733";

  const whatsapp =
    settings.whatsapp || phone;

  const morningOpening =
    settings.morningOpening || "7:30 AM";

  const morningClosing =
    settings.morningClosing || "1:30 PM";

  const eveningOpening =
    settings.eveningOpening || "3:30 PM";

  const eveningClosing =
    settings.eveningClosing || "9:30 PM";

  const closedMessage =
    settings.closedMessage ||
    "We are closed from 1:30 PM to 3:30 PM.";

  const cleanPhone = phone.replace(/\D/g, "");
  const cleanWhatsapp = whatsapp.replace(/\D/g, "");

  const phoneUrl = `tel:+91${cleanPhone}`;
  const whatsappUrl = `https://wa.me/91${cleanWhatsapp}`;

  return (
    <section className="contact-page">
      <div className="container">

        <h1>Contact Falguni Xerox</h1>

        <p className="contact-intro">
          Get in touch with us for Xerox, Printing, Lamination,
          Poster Design and Stationery services.
        </p>

        <div className="contact-page-details">

          {/* CALL */}
          <div className="contact-item">
            <h3>Call Us</h3>

            <p>
              <a href={phoneUrl}>
                {phone}
              </a>
            </p>
          </div>

          {/* WHATSAPP */}
          <div className="contact-item">
            <h3>WhatsApp</h3>

            <p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {whatsapp}
              </a>
            </p>
          </div>

          {/* BUSINESS HOURS */}
          <div className="contact-item">
            <h3>Business Hours</h3>

            <p>
              {morningOpening} – {morningClosing}
            </p>

            <p>
              {eveningOpening} – {eveningClosing}
            </p>

            <p className="closed-message">
              {closedMessage}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;