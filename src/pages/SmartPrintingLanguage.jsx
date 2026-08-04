import { useNavigate } from "react-router-dom";

function SmartPrintingLanguage() {
  const navigate = useNavigate();

  const languages = [
    {
      code: "gu",
      title: "ગુજરાતી",
      subtitle: "ગુજરાતીમાં સંપૂર્ણ માહિતી",
    },
    {
      code: "en",
      title: "English",
      subtitle: "Complete information in English",
    },
    {
      code: "hi",
      title: "हिंदी",
      subtitle: "हिंदी में पूरी जानकारी",
    },
  ];

  return (
    <div className="smart-language-page">
      <div className="smart-language-card">

        <div className="smart-language-icon">
          💻
        </div>

        <h1>
          Smart Printing System
        </h1>

        <p className="smart-language-subtitle">
          Choose Your Language
        </p>

        <div className="smart-language-options">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() =>
                navigate(
                  `/smart-printing-system/${language.code}`
                )
              }
              className="smart-language-btn"
            >
              <strong>{language.title}</strong>
              <span>{language.subtitle}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default SmartPrintingLanguage;