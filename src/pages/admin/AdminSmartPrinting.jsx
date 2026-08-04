import { useEffect, useState } from "react";
import API_BASE_URL from "../../api";

const languages = [
  {
    code: "gu",
    name: "ગુજરાતી",
  },
  {
    code: "en",
    name: "English",
  },
  {
    code: "hi",
    name: "हिंदी",
  },
];

const emptyItem = {
  title: "",
  description: "",
};

const emptyFaq = {
  question: "",
  answer: "",
};

const emptyContent = {
  title: "",
  subtitle: "",
  description: "",

  features: [],

  howItWorks: [],

  benefits: [],

  demoVideoTitle: "",
  demoVideoDescription: "",
  demoVideoUrl: "",
  demoVideoActive: true,

  pricing: {
    title: "",
    description: "",
    price: "",
  },

  faqs: [],

  ctaTitle: "",
  ctaDescription: "",
  ctaButtonText: "",
  ctaButtonLink: "",

  active: true,
};

function AdminSmartPrinting() {
  const [language, setLanguage] = useState("gu");

  const [content, setContent] =
    useState(emptyContent);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const API_URL =
    `${API_BASE_URL}/smart-printing/${language}`;

  // ======================================
  // LOAD CONTENT
  // ======================================

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response =
        await fetch(API_URL);

      if (response.status === 404) {
        setContent({
          ...emptyContent,
          pricing: {
            ...emptyContent.pricing,
          },
        });

        return;
      }

      const data =
        await response.json();

      if (
        response.ok &&
        data.success &&
        data.content
      ) {
        setContent({
          ...emptyContent,
          ...data.content,

          features:
            Array.isArray(
              data.content.features
            )
              ? data.content.features
              : [],

          howItWorks:
            Array.isArray(
              data.content.howItWorks
            )
              ? data.content.howItWorks
              : [],

          benefits:
            Array.isArray(
              data.content.benefits
            )
              ? data.content.benefits
              : [],

          faqs:
            Array.isArray(
              data.content.faqs
            )
              ? data.content.faqs
              : [],

          demoVideoTitle:
            data.content.demoVideoTitle ||
            "",

          demoVideoDescription:
            data.content.demoVideoDescription ||
            "",

          demoVideoUrl:
            data.content.demoVideoUrl ||
            "",

          demoVideoActive:
            data.content.demoVideoActive !==
            undefined
              ? data.content.demoVideoActive
              : true,

          pricing: {
            ...emptyContent.pricing,
            ...(data.content.pricing || {}),
          },
        });
      } else {
        setContent({
          ...emptyContent,
        });
      }
    } catch (error) {
      console.error(
        "Smart Printing content error:",
        error
      );

      setMessage(
        "Failed to load content."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // BASIC CHANGE
  // ======================================

  const handleChange = (
    field,
    value
  ) => {
    setContent((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ======================================
  // PRICING CHANGE
  // ======================================

  const handlePricingChange = (
    field,
    value
  ) => {
    setContent((previous) => ({
      ...previous,

      pricing: {
        ...previous.pricing,
        [field]: value,
      },
    }));
  };

  // ======================================
  // FEATURES
  // ======================================

  const addFeature = () => {
    setContent((previous) => ({
      ...previous,

      features: [
        ...previous.features,
        {
          ...emptyItem,
        },
      ],
    }));
  };

  const updateFeature = (
    index,
    field,
    value
  ) => {
    setContent((previous) => ({
      ...previous,

      features:
        previous.features.map(
          (item, itemIndex) =>
            itemIndex === index
              ? {
                  ...item,
                  [field]: value,
                }
              : item
        ),
    }));
  };

  const deleteFeature = (
    index
  ) => {
    setContent((previous) => ({
      ...previous,

      features:
        previous.features.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  // ======================================
  // HOW IT WORKS
  // ======================================

  const addHowItWorks = () => {
    setContent((previous) => ({
      ...previous,

      howItWorks: [
        ...previous.howItWorks,
        {
          ...emptyItem,
        },
      ],
    }));
  };

  const updateHowItWorks = (
    index,
    field,
    value
  ) => {
    setContent((previous) => ({
      ...previous,

      howItWorks:
        previous.howItWorks.map(
          (item, itemIndex) =>
            itemIndex === index
              ? {
                  ...item,
                  [field]: value,
                }
              : item
        ),
    }));
  };

  const deleteHowItWorks = (
    index
  ) => {
    setContent((previous) => ({
      ...previous,

      howItWorks:
        previous.howItWorks.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  // ======================================
  // BENEFITS
  // ======================================

  const addBenefit = () => {
    setContent((previous) => ({
      ...previous,

      benefits: [
        ...previous.benefits,
        {
          ...emptyItem,
        },
      ],
    }));
  };

  const updateBenefit = (
    index,
    field,
    value
  ) => {
    setContent((previous) => ({
      ...previous,

      benefits:
        previous.benefits.map(
          (item, itemIndex) =>
            itemIndex === index
              ? {
                  ...item,
                  [field]: value,
                }
              : item
        ),
    }));
  };

  const deleteBenefit = (
    index
  ) => {
    setContent((previous) => ({
      ...previous,

      benefits:
        previous.benefits.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  // ======================================
  // FAQ
  // ======================================

  const addFaq = () => {
    setContent((previous) => ({
      ...previous,

      faqs: [
        ...previous.faqs,
        {
          ...emptyFaq,
        },
      ],
    }));
  };

  const updateFaq = (
    index,
    field,
    value
  ) => {
    setContent((previous) => ({
      ...previous,

      faqs:
        previous.faqs.map(
          (item, itemIndex) =>
            itemIndex === index
              ? {
                  ...item,
                  [field]: value,
                }
              : item
        ),
    }));
  };

  const deleteFaq = (
    index
  ) => {
    setContent((previous) => ({
      ...previous,

      faqs:
        previous.faqs.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  // ======================================
  // SAVE
  // ======================================

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response =
        await fetch(API_URL, {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            content
          ),
        });

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to save content"
        );
      }

      setContent({
        ...emptyContent,
        ...data.content,

        features:
          Array.isArray(
            data.content.features
          )
            ? data.content.features
            : [],

        howItWorks:
          Array.isArray(
            data.content.howItWorks
          )
            ? data.content.howItWorks
            : [],

        benefits:
          Array.isArray(
            data.content.benefits
          )
            ? data.content.benefits
            : [],

        faqs:
          Array.isArray(
            data.content.faqs
          )
            ? data.content.faqs
            : [],

        demoVideoTitle:
          data.content.demoVideoTitle ||
          "",

        demoVideoDescription:
          data.content.demoVideoDescription ||
          "",

        demoVideoUrl:
          data.content.demoVideoUrl ||
          "",

        demoVideoActive:
          data.content.demoVideoActive !==
          undefined
            ? data.content.demoVideoActive
            : true,

        pricing: {
          ...emptyContent.pricing,
          ...(data.content.pricing || {}),
        },
      });

      const languageName =
        languages.find(
          (item) =>
            item.code === language
        )?.name;

      setMessage(
        `${languageName} content saved successfully.`
      );
    } catch (error) {
      console.error(
        "Save Smart Printing content error:",
        error
      );

      setMessage(
        error.message ||
          "Failed to save content."
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="admin-page">
        <h1>
          Smart Printing System
        </h1>

        <p>Loading...</p>
      </div>
    );
  }

  // ======================================
  // REUSABLE ITEM EDITOR
  // ======================================

  const renderItems = (
    items,
    updateItem,
    deleteItem,
    emptyMessage
  ) => {
    if (items.length === 0) {
      return (
        <p className="admin-empty-text">
          {emptyMessage}
        </p>
      );
    }

    return items.map(
      (item, index) => (
        <div
          className="admin-smart-item"
          key={index}
        >
          <div className="admin-smart-item-header">
            <strong>
              #{index + 1}
            </strong>

            <button
              type="button"
              className="admin-delete-btn"
              onClick={() =>
                deleteItem(index)
              }
            >
              Delete
            </button>
          </div>

          <div className="form-group">
            <label>
              Title
            </label>

            <input
              type="text"
              value={
                item.title || ""
              }
              onChange={(e) =>
                updateItem(
                  index,
                  "title",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Description
            </label>

            <textarea
              rows="3"
              value={
                item.description ||
                ""
              }
              onChange={(e) =>
                updateItem(
                  index,
                  "description",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      )
    );
  };

  // ======================================
  // PAGE
  // ======================================

  return (
    <div className="admin-page">

      {/* ==================================
          HEADER
      ================================== */}

      <div className="admin-page-header">
        <div>
          <h1>
            Smart Printing System
          </h1>

          <p>
            Manage complete multilingual
            product details.
          </p>
        </div>
      </div>


      {/* ==================================
          LANGUAGE
      ================================== */}

      <div className="admin-card">

        <h2>
          Choose Language
        </h2>

        <div className="language-tabs">

          {languages.map(
            (item) => (
              <button
                key={item.code}
                type="button"
                onClick={() =>
                  setLanguage(
                    item.code
                  )
                }
                className={
                  language ===
                  item.code
                    ? "active"
                    : ""
                }
              >
                {item.name}
              </button>
            )
          )}

        </div>

      </div>


      {/* ==================================
          BASIC INFORMATION
      ================================== */}

      <div className="admin-card">

        <h2>
          Basic Information
        </h2>

        <div className="form-group">

          <label>
            Title
          </label>

          <input
            type="text"
            value={
              content.title
            }
            onChange={(e) =>
              handleChange(
                "title",
                e.target.value
              )
            }
            placeholder="Smart Printing System"
          />

        </div>


        <div className="form-group">

          <label>
            Subtitle
          </label>

          <input
            type="text"
            value={
              content.subtitle
            }
            onChange={(e) =>
              handleChange(
                "subtitle",
                e.target.value
              )
            }
          />

        </div>


        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            rows="5"
            value={
              content.description
            }
            onChange={(e) =>
              handleChange(
                "description",
                e.target.value
              )
            }
          />

        </div>

      </div>


      {/* ==================================
          DEMO VIDEO
      ================================== */}

      <div className="admin-card">

        <h2>
          Demo Video
        </h2>

        <p>
          Add a demo video to explain
          the Smart Printing System.
        </p>


        <div className="form-group">

          <label>
            Video Title
          </label>

          <input
            type="text"
            value={
              content.demoVideoTitle
            }
            onChange={(e) =>
              handleChange(
                "demoVideoTitle",
                e.target.value
              )
            }
            placeholder="See How Smart Printing System Works"
          />

        </div>


        <div className="form-group">

          <label>
            Video Description
          </label>

          <textarea
            rows="3"
            value={
              content.demoVideoDescription
            }
            onChange={(e) =>
              handleChange(
                "demoVideoDescription",
                e.target.value
              )
            }
            placeholder="Watch this short demo to understand the complete system."
          />

        </div>


        <div className="form-group">

          <label>
            Video URL
          </label>

          <input
            type="url"
            value={
              content.demoVideoUrl
            }
            onChange={(e) =>
              handleChange(
                "demoVideoUrl",
                e.target.value
              )
            }
            placeholder="https://www.youtube.com/watch?v=..."
          />

          <small>
            You can add a YouTube video URL
            or a direct MP4 video URL.
          </small>

        </div>


        <label className="checkbox-row">

          <input
            type="checkbox"
            checked={
              content.demoVideoActive
            }
            onChange={(e) =>
              handleChange(
                "demoVideoActive",
                e.target.checked
              )
            }
          />

          <span>
            Show Demo Video
          </span>

        </label>

      </div>


      {/* ==================================
          FEATURES
      ================================== */}

      <div className="admin-card">

        <div className="admin-section-title">

          <div>
            <h2>
              Features
            </h2>

            <p>
              Add the main features
              of your system.
            </p>
          </div>

          <button
            type="button"
            className="admin-add-btn"
            onClick={
              addFeature
            }
          >
            + Add Feature
          </button>

        </div>

        {renderItems(
          content.features,
          updateFeature,
          deleteFeature,
          "No features added yet."
        )}

      </div>


      {/* ==================================
          HOW IT WORKS
      ================================== */}

      <div className="admin-card">

        <div className="admin-section-title">

          <div>
            <h2>
              How It Works
            </h2>

            <p>
              Add step-by-step
              instructions.
            </p>
          </div>

          <button
            type="button"
            className="admin-add-btn"
            onClick={
              addHowItWorks
            }
          >
            + Add Step
          </button>

        </div>

        {renderItems(
          content.howItWorks,
          updateHowItWorks,
          deleteHowItWorks,
          "No steps added yet."
        )}

      </div>


      {/* ==================================
          BENEFITS
      ================================== */}

      <div className="admin-card">

        <div className="admin-section-title">

          <div>
            <h2>
              Benefits
            </h2>

            <p>
              Explain why Xerox shop
              owners should use it.
            </p>
          </div>

          <button
            type="button"
            className="admin-add-btn"
            onClick={
              addBenefit
            }
          >
            + Add Benefit
          </button>

        </div>

        {renderItems(
          content.benefits,
          updateBenefit,
          deleteBenefit,
          "No benefits added yet."
        )}

      </div>


      {/* ==================================
          PRICING
      ================================== */}

      <div className="admin-card">

        <h2>
          Pricing
        </h2>

        <div className="form-group">

          <label>
            Title
          </label>

          <input
            type="text"
            value={
              content.pricing.title
            }
            onChange={(e) =>
              handlePricingChange(
                "title",
                e.target.value
              )
            }
          />

        </div>


        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            rows="4"
            value={
              content.pricing
                .description
            }
            onChange={(e) =>
              handlePricingChange(
                "description",
                e.target.value
              )
            }
          />

        </div>


        <div className="form-group">

          <label>
            Price
          </label>

          <input
            type="text"
            value={
              content.pricing.price
            }
            onChange={(e) =>
              handlePricingChange(
                "price",
                e.target.value
              )
            }
            placeholder="₹999"
          />

        </div>

      </div>


      {/* ==================================
          FAQ
      ================================== */}

      <div className="admin-card">

        <div className="admin-section-title">

          <div>
            <h2>
              FAQs
            </h2>

            <p>
              Add frequently asked
              questions.
            </p>
          </div>

          <button
            type="button"
            className="admin-add-btn"
            onClick={
              addFaq
            }
          >
            + Add FAQ
          </button>

        </div>


        {content.faqs.length ===
        0 ? (
          <p className="admin-empty-text">
            No FAQs added yet.
          </p>
        ) : (
          content.faqs.map(
            (faq, index) => (
              <div
                className="admin-smart-item"
                key={index}
              >

                <div className="admin-smart-item-header">

                  <strong>
                    FAQ #{index + 1}
                  </strong>

                  <button
                    type="button"
                    className="admin-delete-btn"
                    onClick={() =>
                      deleteFaq(
                        index
                      )
                    }
                  >
                    Delete
                  </button>

                </div>


                <div className="form-group">

                  <label>
                    Question
                  </label>

                  <input
                    type="text"
                    value={
                      faq.question ||
                      ""
                    }
                    onChange={(e) =>
                      updateFaq(
                        index,
                        "question",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="form-group">

                  <label>
                    Answer
                  </label>

                  <textarea
                    rows="4"
                    value={
                      faq.answer ||
                      ""
                    }
                    onChange={(e) =>
                      updateFaq(
                        index,
                        "answer",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>
            )
          )
        )}

      </div>


      {/* ==================================
          CTA
      ================================== */}

      <div className="admin-card">

        <h2>
          Call To Action
        </h2>


        <div className="form-group">

          <label>
            CTA Title
          </label>

          <input
            type="text"
            value={
              content.ctaTitle
            }
            onChange={(e) =>
              handleChange(
                "ctaTitle",
                e.target.value
              )
            }
          />

        </div>


        <div className="form-group">

          <label>
            CTA Description
          </label>

          <textarea
            rows="4"
            value={
              content.ctaDescription
            }
            onChange={(e) =>
              handleChange(
                "ctaDescription",
                e.target.value
              )
            }
          />

        </div>


        <div className="form-group">

          <label>
            Button Text
          </label>

          <input
            type="text"
            value={
              content.ctaButtonText
            }
            onChange={(e) =>
              handleChange(
                "ctaButtonText",
                e.target.value
              )
            }
          />

        </div>


        <div className="form-group">

          <label>
            Button Link
          </label>

          <input
            type="text"
            value={
              content.ctaButtonLink
            }
            onChange={(e) =>
              handleChange(
                "ctaButtonLink",
                e.target.value
              )
            }
            placeholder="https://..."
          />

        </div>

      </div>


      {/* ==================================
          ACTIVE
      ================================== */}

      <div className="admin-card">

        <label className="checkbox-row">

          <input
            type="checkbox"
            checked={
              content.active
            }
            onChange={(e) =>
              handleChange(
                "active",
                e.target.checked
              )
            }
          />

          <span>
            Show Smart Printing System
          </span>

        </label>

      </div>


      {/* ==================================
          MESSAGE
      ================================== */}

      {message && (
        <div className="admin-message">
          {message}
        </div>
      )}


      {/* ==================================
          SAVE
      ================================== */}

      <button
        type="button"
        className="admin-save-btn"
        onClick={
          handleSave
        }
        disabled={saving}
      >
        {saving
          ? "Saving..."
          : "Save Changes"}
      </button>

    </div>
  );
}

export default AdminSmartPrinting;