"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    void tryPlay();

    const startOnInteraction = () => {
      void tryPlay();
    };

    document.addEventListener("pointerdown", startOnInteraction, { once: true });
    document.addEventListener("keydown", startOnInteraction, { once: true });

    return () => {
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
  }, [tryPlay]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted && !playing) {
      void tryPlay();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={SITE.backgroundMusic}
        loop
        preload="auto"
        aria-hidden
      />
      <button
        type="button"
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ayuda-blue shadow-lg transition-transform hover:scale-105"
        aria-label={muted ? "Unmute background music" : "Mute background music"}
        title={muted ? "Unmute music" : "Mute music"}
      >
        {muted || !playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </>
  );
}
