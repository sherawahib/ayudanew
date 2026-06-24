"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { useAccessibility } from "@/components/providers/AccessibilityProvider";

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();

  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-2 hover:bg-black/[0.04]">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-ayuda-blue"
      />
      <span>
        <span className="block text-sm font-semibold text-[#0f2d52]">{label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-[#3f4f63]">{description}</span>
      </span>
    </label>
  );
}

export default function AccessibilityWidget() {
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const { settings, updateSetting, resetSettings, announce } = useAccessibility();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function focusMainContent() {
    const main = document.getElementById("main-content");
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: "smooth", block: "start" });
      announce("Moved focus to main content.");
    }
    setOpen(false);
  }

  function handleTextScaleChange(scale: 0 | 1 | 2) {
    updateSetting("textScale", scale);
    const labels = ["Default text size", "Large text enabled", "Extra large text enabled"];
    announce(labels[scale]);
  }

  return (
    <div className="fixed bottom-[7.25rem] left-4 z-40 sm:bottom-[8.25rem] sm:left-6">
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${panelId}-title`}
          className="mb-3 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-black/10 bg-white p-4 shadow-2xl"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 id={`${panelId}-title`} className="text-base font-semibold text-[#0f2d52]">
                Accessibility options
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-[#3f4f63]">
                Adjust the site for screen readers, keyboard navigation, and low vision.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-1 text-xs font-semibold text-ayuda-blue hover:bg-ayuda-blue/10"
              aria-label="Close accessibility options"
            >
              Close
            </button>
          </div>

          <div className="space-y-1 border-b border-black/10 pb-3">
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-ayuda-blue">
              Text size
            </p>
            <div className="grid grid-cols-3 gap-2 px-2">
              {([
                [0, "Default"],
                [1, "Large"],
                [2, "XL"],
              ] as const).map(([scale, label]) => (
                <button
                  key={scale}
                  type="button"
                  aria-pressed={settings.textScale === scale}
                  onClick={() => handleTextScaleChange(scale)}
                  className={`rounded-md border px-2 py-2 text-xs font-semibold transition-colors ${
                    settings.textScale === scale
                      ? "border-ayuda-blue bg-ayuda-blue text-white"
                      : "border-black/15 bg-white text-[#0f2d52] hover:border-ayuda-blue/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1 py-2">
            <ToggleRow
              label="High contrast"
              description="Stronger colors and borders for easier reading."
              checked={settings.highContrast}
              onChange={(checked) => {
                updateSetting("highContrast", checked);
                announce(checked ? "High contrast enabled." : "High contrast disabled.");
              }}
            />
            <ToggleRow
              label="Highlight links"
              description="Underline and highlight all links on the page."
              checked={settings.highlightLinks}
              onChange={(checked) => {
                updateSetting("highlightLinks", checked);
                announce(checked ? "Link highlighting enabled." : "Link highlighting disabled.");
              }}
            />
            <ToggleRow
              label="Readable font"
              description="Use a simpler sans-serif font across the site."
              checked={settings.readableFont}
              onChange={(checked) => {
                updateSetting("readableFont", checked);
                announce(checked ? "Readable font enabled." : "Readable font disabled.");
              }}
            />
            <ToggleRow
              label="Reduce motion"
              description="Turn off animations and smooth scrolling."
              checked={settings.reduceMotion}
              onChange={(checked) => {
                updateSetting("reduceMotion", checked);
                announce(checked ? "Reduced motion enabled." : "Reduced motion disabled.");
              }}
            />
          </div>

          <div className="space-y-2 border-t border-black/10 pt-3">
            <button
              type="button"
              onClick={focusMainContent}
              className="w-full rounded-md bg-ayuda-blue px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ayuda-blue-dark"
            >
              Skip to main content
            </button>
            <button
              type="button"
              onClick={() => {
                resetSettings();
                setOpen(false);
              }}
              className="w-full rounded-md border border-black/15 px-3 py-2 text-sm font-medium text-[#0f2d52] transition-colors hover:border-ayuda-blue/40"
            >
              Reset accessibility settings
            </button>
          </div>
        </div>
      ) : null}

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close accessibility options" : "Open accessibility options"}
        title="Accessibility options"
        onClick={() => setOpen((value) => !value)}
        className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-black/10 bg-white shadow-lg transition-transform hover:scale-105"
      >
        <Image
          src="/images/accessibility-widget-icon.png"
          alt=""
          width={88}
          height={88}
          className="h-14 w-14 object-contain"
          aria-hidden
        />
      </button>
    </div>
  );
}
