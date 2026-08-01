import { createContext, useContext, useEffect, useState } from "react";
import API_BASE_URL from "../api";

const WebsiteSettingsContext = createContext(null);

export function WebsiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/settings`);
        const data = await response.json();

        if (response.ok && data.success) {
          setSettings(data.settings || {});
        }
      } catch (error) {
        console.error("Website settings error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  return (
    <WebsiteSettingsContext.Provider
      value={{
        settings,
        loading,
      }}
    >
      {children}
    </WebsiteSettingsContext.Provider>
  );
}

export function useWebsiteSettings() {
  const context = useContext(WebsiteSettingsContext);

  if (!context) {
    throw new Error(
      "useWebsiteSettings must be used inside WebsiteSettingsProvider"
    );
  }

  return context;
}