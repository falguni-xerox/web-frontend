import { useWebsiteSettings } from "../../context/WebsiteSettingsContext";

function GoogleMapSection() {
  const { settings, loading } = useWebsiteSettings();

  if (loading) {
    return null;
  }

  const siteName =
    settings.siteName || "Falguni Xerox & Computer Work";

  const mapUrl =
    settings.googleMapUrl ||
    "https://www.google.com/maps?q=Falguni+Pan+Parlour+Maggi+House+Xerox+Uvarsad+Gujarat&output=embed";

  return (
    <section className="map-section">
      <div className="container">

        <h2>Find Us</h2>

        <p>
          Visit {siteName}.
        </p>

        <div className="map-container">
          <iframe
            src={mapUrl}
            title={`${siteName} Location`}
            loading="lazy"
            width="100%"
            height="400"
            style={{border:0}}
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </section>
  );
}

export default GoogleMapSection;