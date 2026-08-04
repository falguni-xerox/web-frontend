import "../styles/SmartPrinting.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

const allowedLanguages = ["gu", "en", "hi"];

const languageNames = {
  gu: "ગુજરાતી",
  en: "English",
  hi: "हिंदी",
};

function getYouTubeEmbedUrl(url) {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);

    // youtube.com/watch?v=VIDEO_ID
    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.searchParams.get("v")
    ) {
      return `https://www.youtube.com/embed/${parsedUrl.searchParams.get(
        "v"
      )}`;
    }

    // youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.replace("/", "");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // youtube.com/embed/VIDEO_ID
    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.pathname.startsWith("/embed/")
    ) {
      return url;
    }
  } catch (error) {
    console.error("YouTube URL error:", error);
  }

  return "";
}

function isYouTubeUrl(url) {
  return Boolean(getYouTubeEmbedUrl(url));
}

function SmartPrintingDetails() {
  const { language } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentLanguage =
    allowedLanguages.includes(language)
      ? language
      : null;

  useEffect(() => {
    if (!currentLanguage) {
      setLoading(false);
      setError("Invalid language.");
      return;
    }

    const loadContent = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/smart-printing/${currentLanguage}`
        );

        const data = await response.json();

        if (
          !response.ok ||
          !data.success ||
          !data.content
        ) {
          throw new Error(
            data.message ||
              "Smart Printing content not found."
          );
        }

        if (data.content.active === false) {
          setError(
            "Smart Printing System is currently unavailable."
          );
          return;
        }

        setContent(data.content);
      } catch (err) {
        console.error(
          "Smart Printing details error:",
          err
        );

        setError(
          err.message ||
            "Failed to load Smart Printing details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  // ======================================
  // INVALID LANGUAGE
  // ======================================

  if (!currentLanguage) {
    return (
      <div className="smart-details-page">
        <div className="smart-details-error">
          <h1>Invalid Language</h1>

          <button
            type="button"
            onClick={() =>
              navigate("/smart-printing-system")
            }
          >
            Choose Language
          </button>
        </div>
      </div>
    );
  }

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="smart-details-page">
        <div className="smart-details-loading">
          <div className="smart-loading-icon">
            💻
          </div>

          <h2>
            Loading Smart Printing System...
          </h2>

          <p>
            {languageNames[currentLanguage]}
          </p>
        </div>
      </div>
    );
  }

  // ======================================
  // ERROR
  // ======================================

  if (error) {
    return (
      <div className="smart-details-page">
        <div className="smart-details-error">
          <div className="smart-error-icon">
            ⚠️
          </div>

          <h1>
            Smart Printing System
          </h1>

          <p>{error}</p>

          <button
            type="button"
            onClick={() =>
              navigate("/smart-printing-system")
            }
          >
            Choose Language
          </button>
        </div>
      </div>
    );
  }

  // ======================================
  // DATA
  // ======================================

  const features =
    Array.isArray(content.features)
      ? content.features
      : [];

  const howItWorks =
    Array.isArray(content.howItWorks)
      ? content.howItWorks
      : [];

  const benefits =
    Array.isArray(content.benefits)
      ? content.benefits
      : [];

  const faqs =
    Array.isArray(content.faqs)
      ? content.faqs
      : [];

  const pricing =
    content.pricing || {};

  const demoVideoUrl =
    content.demoVideoActive !== false
      ? content.demoVideoUrl || ""
      : "";

  const demoVideoTitle =
    content.demoVideoTitle ||
    "Demo Video";

  const demoVideoDescription =
    content.demoVideoDescription || "";

  const youtubeEmbedUrl =
    getYouTubeEmbedUrl(demoVideoUrl);

  // ======================================
  // PAGE
  // ======================================

  return (
    <div className="smart-details-page">

      {/* ==================================
          TOP BAR
      ================================== */}

      <div className="smart-details-topbar">

        <button
          type="button"
          className="smart-back-btn"
          onClick={() =>
            navigate("/smart-printing-system")
          }
        >
          ← Choose Language
        </button>

        <span className="smart-language-badge">
          {languageNames[currentLanguage]}
        </span>

      </div>


      {/* ==================================
          HERO
      ================================== */}

      <section className="smart-details-hero">

        <div className="smart-details-hero-icon">
          💻
        </div>

        <h1>
          {content.title ||
            "Smart Printing System"}
        </h1>

        {content.subtitle && (
          <h2>
            {content.subtitle}
          </h2>
        )}

        {content.description && (
          <p>
            {content.description}
          </p>
        )}

      </section>


      {/* ==================================
          DEMO VIDEO
      ================================== */}

      {demoVideoUrl && (
        <section className="smart-details-section">

          <div className="smart-section-heading">

            <span>
              🎬
            </span>

            <h2>
              {demoVideoTitle}
            </h2>

          </div>


          {demoVideoDescription && (
            <p className="smart-video-description">
              {demoVideoDescription}
            </p>
          )}


          <div className="smart-video-wrapper">

            {youtubeEmbedUrl ? (

              <iframe
                className="smart-demo-video"
                src={youtubeEmbedUrl}
                title={demoVideoTitle}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

            ) : (

              <video
                controls
                preload="metadata"
                className="smart-demo-video"
              >

                <source
                  src={demoVideoUrl}
                  type="video/mp4"
                />

                Your browser does not support
                the video tag.

              </video>

            )}

          </div>

        </section>
      )}


      {/* ==================================
          FEATURES
      ================================== */}

      {features.length > 0 && (
        <section className="smart-details-section">

          <div className="smart-section-heading">

            <span>
              ✨
            </span>

            <h2>
              Features
            </h2>

          </div>


          <div className="smart-details-grid">

            {features.map(
              (feature, index) => (
                <div
                  className="smart-detail-card"
                  key={index}
                >

                  <div className="smart-card-number">
                    {index + 1}
                  </div>

                  <div>

                    <h3>
                      {feature.title}
                    </h3>

                    {feature.description && (
                      <p>
                        {feature.description}
                      </p>
                    )}

                  </div>

                </div>
              )
            )}

          </div>

        </section>
      )}


      {/* ==================================
          HOW IT WORKS
      ================================== */}

      {howItWorks.length > 0 && (
        <section className="smart-details-section">

          <div className="smart-section-heading">

            <span>
              ⚙️
            </span>

            <h2>
              How It Works
            </h2>

          </div>


          <div className="smart-steps">

            {howItWorks.map(
              (step, index) => (
                <div
                  className="smart-step"
                  key={index}
                >

                  <div className="smart-step-number">
                    {index + 1}
                  </div>

                  <div className="smart-step-content">

                    <h3>
                      {step.title}
                    </h3>

                    {step.description && (
                      <p>
                        {step.description}
                      </p>
                    )}

                  </div>

                </div>
              )
            )}

          </div>

        </section>
      )}


      {/* ==================================
          BENEFITS
      ================================== */}

      {benefits.length > 0 && (
        <section className="smart-details-section">

          <div className="smart-section-heading">

            <span>
              🚀
            </span>

            <h2>
              Benefits
            </h2>

          </div>


          <div className="smart-details-grid">

            {benefits.map(
              (benefit, index) => (
                <div
                  className="smart-benefit-card"
                  key={index}
                >

                  <div className="smart-benefit-icon">
                    ✓
                  </div>

                  <div>

                    <h3>
                      {benefit.title}
                    </h3>

                    {benefit.description && (
                      <p>
                        {benefit.description}
                      </p>
                    )}

                  </div>

                </div>
              )
            )}

          </div>

        </section>
      )}


      {/* ==================================
          PRICING
      ================================== */}

      {(pricing.title ||
        pricing.description ||
        pricing.price) && (
        <section className="smart-details-section">

          <div className="smart-section-heading">

            <span>
              💰
            </span>

            <h2>
              Pricing
            </h2>

          </div>


          <div className="smart-pricing-card">

            {pricing.title && (
              <h3>
                {pricing.title}
              </h3>
            )}

            {pricing.description && (
              <p>
                {pricing.description}
              </p>
            )}

            {pricing.price && (
              <div className="smart-price">
                {pricing.price}
              </div>
            )}

          </div>

        </section>
      )}


      {/* ==================================
          FAQ
      ================================== */}

      {faqs.length > 0 && (
        <section className="smart-details-section">

          <div className="smart-section-heading">

            <span>
              ❓
            </span>

            <h2>
              Frequently Asked Questions
            </h2>

          </div>


          <div className="smart-faq-list">

            {faqs.map(
              (faq, index) => (
                <details
                  className="smart-faq"
                  key={index}
                >

                  <summary>
                    {faq.question}
                  </summary>

                  {faq.answer && (
                    <p>
                      {faq.answer}
                    </p>
                  )}

                </details>
              )
            )}

          </div>

        </section>
      )}


      {/* ==================================
          CTA
      ================================== */}

      {(content.ctaTitle ||
        content.ctaDescription ||
        content.ctaButtonText) && (
        <section className="smart-cta">

          {content.ctaTitle && (
            <h2>
              {content.ctaTitle}
            </h2>
          )}

          {content.ctaDescription && (
            <p>
              {content.ctaDescription}
            </p>
          )}

          {content.ctaButtonText && (
            <a
              href={
                content.ctaButtonLink ||
                "#"
              }
              className="smart-cta-btn"
              target={
                content.ctaButtonLink?.startsWith(
                  "http"
                )
                  ? "_blank"
                  : undefined
              }
              rel={
                content.ctaButtonLink?.startsWith(
                  "http"
                )
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {content.ctaButtonText}
            </a>
          )}

        </section>
      )}

    </div>
  );
}

export default SmartPrintingDetails;