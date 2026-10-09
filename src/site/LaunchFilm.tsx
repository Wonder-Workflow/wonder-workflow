import { useEffect, useRef, useState } from "react";
import "./launch-film.css";

function fullMotionRequested() {
  if (typeof window === "undefined") return false;
  const selected = new URLSearchParams(window.location.search).get("motion");
  try {
    if (selected === "full") sessionStorage.setItem("ww-motion-choice", "full");
    if (selected === "reduced") sessionStorage.removeItem("ww-motion-choice");
    return (
      selected === "full" ||
      sessionStorage.getItem("ww-motion-choice") === "full"
    );
  } catch {
    return selected === "full";
  }
}
export function LaunchFilm({
  onComplete,
}: {
  onComplete: (complete: boolean) => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const eligible = useRef<boolean | null>(null);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [playing, setPlaying] = useState(false);
  const dismiss = () => {
    const returnFocus = document.activeElement?.closest(".ww-launch-intro");
    video.current?.pause();
    setExiting(true);
    onComplete(true);
    if (returnFocus)
      document
        .querySelector<HTMLElement>(".ww-hero h1")
        ?.focus({ preventScroll: true });
  };
  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!preference) {
      onComplete(true);
      return;
    }
    if (eligible.current === null) {
      eligible.current = fullMotionRequested() || !preference.matches;
    }
    if (!eligible.current) {
      onComplete(true);
      return;
    }
    setVisible(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") dismiss();
    };
    const onPreference = () => {
      if (preference.matches && !fullMotionRequested()) dismiss();
    };
    const timer = window.setTimeout(dismiss, 2650);
    document.addEventListener("keydown", onKey);
    preference.addEventListener("change", onPreference);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      preference.removeEventListener("change", onPreference);
    };
  }, []);
  useEffect(() => {
    if (!exiting) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete(true);
    }, 200);
    return () => window.clearTimeout(timer);
  }, [exiting, onComplete]);
  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    if (video.current) video.current.playbackRate = 2.5;
    video.current?.play().catch(() => {
      // Keep the branded CSS sequence visible when a browser refuses autoplay.
      if (!cancelled) setPlaying(false);
    });
    return () => {
      cancelled = true;
    };
  }, [visible]);
  if (!visible) return null;
  return (
    <div
      className={`ww-launch-intro${exiting ? " ww-intro-exiting" : ""}`}
      data-testid="home-intro"
    >
      <div className="ww-launch-fallback" aria-hidden="true">
        <img src="/brand/emblem.png" alt="" />
        <span>
          Wonder <i>&amp;</i> Workflow
        </span>
        <small>Clear work. Connected well.</small>
      </div>
      <video
        className={playing ? "ww-launch-video-playing" : ""}
        ref={video}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
        onLoadedMetadata={() => {
          if (video.current) video.current.playbackRate = 2.5;
        }}
        onTimeUpdate={() => {
          if (!exiting && video.current && video.current.currentTime >= 5)
            dismiss();
        }}
        onEnded={dismiss}
        onError={dismiss}
      >
        <source src="/brand/launch.mp4" type="video/mp4" />
      </video>
      <button className="ww-intro-skip" onClick={dismiss}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
