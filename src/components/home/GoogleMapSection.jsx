import { useWebsiteSettings } from "../../context/WebsiteSettingsContext";

function GoogleMapSection() {
  const { settings, loading } = useWebsiteSettings();

  if (loading) {
    return null;
  }

  const siteName = settings.siteName || "Falguni Xerox & Computer Work";
  
  // Google Maps ની direct link - iframe નહીં
  const mapUrl = "https://maps.google.com/?q=Falguni+Xerox+Computer+Work+Uvarsad+Gujarat+382422";

  return (
    <section className="map-section py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Find Us
        </h2>

        <p className="text-gray-600 text-lg mb-8">
          Visit {siteName} <br/>
          Dental College, near Karnavati, Uvarsad, Gujarat 382422
        </p>

        {/* Map ની જગ્યાએ Button */}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl"
        >
          📍 Open in Google Maps
        </a>

        <p className="text-sm text-gray-500 mt-4">
          Click કરો અને direct Google Maps માં location ખુલશે
        </p>

      </div>
    </section>
  );
}

export default GoogleMapSection;