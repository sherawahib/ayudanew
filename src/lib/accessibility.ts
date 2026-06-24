export type AccessibilitySettings = {
  textScale: 0 | 1 | 2;
  highContrast: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  reduceMotion: boolean;
};

export const DEFAULT_A11Y_SETTINGS: AccessibilitySettings = {
  textScale: 0,
  highContrast: false,
  highlightLinks: false,
  readableFont: false,
  reduceMotion: false,
};

export const A11Y_STORAGE_KEY = "ayuda-a11y-settings";

export function loadAccessibilitySettings(): AccessibilitySettings {
  if (typeof window === "undefined") {
    return DEFAULT_A11Y_SETTINGS;
  }

  try {
    const raw = window.localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_A11Y_SETTINGS;
    }
    const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
    return { ...DEFAULT_A11Y_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_A11Y_SETTINGS;
  }
}

export function saveAccessibilitySettings(settings: AccessibilitySettings) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
}

export function applyAccessibilitySettings(settings: AccessibilitySettings) {
  const root = document.documentElement;

  root.dataset.a11yText = String(settings.textScale);
  root.toggleAttribute("data-a11y-high-contrast", settings.highContrast);
  root.toggleAttribute("data-a11y-highlight-links", settings.highlightLinks);
  root.toggleAttribute("data-a11y-readable-font", settings.readableFont);
  root.toggleAttribute("data-a11y-reduce-motion", settings.reduceMotion);
}
