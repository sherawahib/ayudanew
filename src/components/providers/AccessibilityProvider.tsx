"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyAccessibilitySettings,
  DEFAULT_A11Y_SETTINGS,
  loadAccessibilitySettings,
  saveAccessibilitySettings,
  type AccessibilitySettings,
} from "@/lib/accessibility";

type AccessibilityContextValue = {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => void;
  resetSettings: () => void;
  announce: (message: string) => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}

export default function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_A11Y_SETTINGS);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const loaded = loadAccessibilitySettings();
    setSettings(loaded);
    applyAccessibilitySettings(loaded);
  }, []);

  const announce = useCallback((message: string) => {
    setAnnouncement("");
    window.setTimeout(() => setAnnouncement(message), 50);
  }, []);

  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
      setSettings((current) => {
        const next = { ...current, [key]: value };
        saveAccessibilitySettings(next);
        applyAccessibilitySettings(next);
        return next;
      });
    },
    [],
  );

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_A11Y_SETTINGS);
    saveAccessibilitySettings(DEFAULT_A11Y_SETTINGS);
    applyAccessibilitySettings(DEFAULT_A11Y_SETTINGS);
    announce("Accessibility settings reset.");
  }, [announce]);

  const value = useMemo(
    () => ({ settings, updateSetting, resetSettings, announce }),
    [settings, updateSetting, resetSettings, announce],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      {children}
    </AccessibilityContext.Provider>
  );
}
