"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const scrubbingRef = useRef(false);
  const isInView = useInView(ref, { margin: "-15% 0px" });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // ARIA value for the seek slider. Kept separate from `currentTime` so it only
  // changes on user-initiated seeks — not the ~4x/sec timeupdate stream, which
  // would make a focused slider announce endlessly to screen readers.
  const [announcedTime, setAnnouncedTime] = useState(0);
  // Read once on the client; gates the autoplay effect only, never the markup.
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Force muted so browsers allow the scroll-triggered autoplay. Also backfill
  // duration if metadata already loaded before hydration — otherwise the
  // one-shot loadedmetadata event can be missed and the fill/readout stick at 0.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (v.readyState >= 1 && Number.isFinite(v.duration)) {
      setDuration(v.duration);
      setCurrentTime(v.currentTime);
    }
  }, []);

  // Autoplay (muted) when scrolled into view; pause when it leaves — unless the
  // user paused it themselves or prefers reduced motion.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduceMotion) return;
    if (isInView && !userPausedRef.current) {
      v.play().catch(() => {});
    } else if (!isInView) {
      v.pause();
    }
  }, [isInView, reduceMotion]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      v.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      v.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const nextMuted = !v.muted;
    v.muted = nextMuted;
    // Unmuting is a clear intent to watch — make sure it's actually playing.
    if (!nextMuted && v.paused) {
      userPausedRef.current = false;
      v.play().catch(() => {});
    }
  }, []);

  // Seek to the position under the pointer along the progress track.
  const seekToClientX = useCallback((clientX: number, track: HTMLElement) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration) || v.duration === 0) return;
    const rect = track.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    v.currentTime = frac * v.duration;
    setCurrentTime(v.currentTime);
    setAnnouncedTime(v.currentTime);
  }, []);

  const handleSeekKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const v = videoRef.current;
      if (!v) return;
      // Space/Enter toggle playback — and must preventDefault so Space doesn't
      // scroll the page while this focusable slider has focus.
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        togglePlay();
        return;
      }
      if (!Number.isFinite(v.duration) || v.duration === 0) return;
      const step = 5;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          v.currentTime = Math.max(0, v.currentTime - step);
          break;
        case "ArrowRight":
        case "ArrowUp":
          v.currentTime = Math.min(v.duration, v.currentTime + step);
          break;
        case "Home":
          v.currentTime = 0;
          break;
        case "End":
          v.currentTime = v.duration;
          break;
        default:
          return;
      }
      e.preventDefault();
      setCurrentTime(v.currentTime);
      setAnnouncedTime(v.currentTime);
    },
    [togglePlay]
  );

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="dashboard" className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 overflow-hidden">
      <Container wide>
        <SectionHeading
          label="Product Demo"
          heading="See exactly where your tokens go"
          subheading="A local-first dashboard that breaks every dollar of your Claude Code and Codex spend into auditable, per-agent insights."
          accent="teal"
        />

        <div ref={ref} className="relative mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto max-w-2xl"
          >
            {/* Video frame */}
            <div
              onClick={togglePlay}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-border-subtle bg-screenshot-bg shadow-2xl shadow-shadow-heavy"
            >
              <video
                ref={videoRef}
                src="/media/codelens-demo.mp4"
                poster="/media/codelens-demo-poster.jpg"
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="CodelensAI product demo — AI agent spend, tokens burned, and per-agent cost breakdown for Claude Code and OpenAI Codex"
                className="h-full w-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              />

              {/* Center play affordance when paused (decorative — controls below are keyboard-accessible) */}
              {!isPlaying && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                    <Play className="ml-1 h-7 w-7 fill-white text-white" />
                  </span>
                </div>
              )}

              {/* Controls */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-x-3 bottom-7 flex items-center justify-between gap-2"
              >
                <span className="rounded-md bg-arrow-bg px-2 py-1 font-mono text-[11px] tabular-nums text-arrow-text backdrop-blur-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-arrow-bg text-arrow-text backdrop-blur-sm transition-all hover:bg-arrow-bg-hover hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/60"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="ml-0.5 h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    aria-label={isMuted ? "Unmute demo video" : "Mute demo video"}
                    aria-pressed={!isMuted}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-arrow-bg text-arrow-text backdrop-blur-sm transition-all hover:bg-arrow-bg-hover hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/60"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Playback progress / seek bar (tap, drag or arrow-key to scrub) */}
              <div
                role="slider"
                tabIndex={duration > 0 ? 0 : -1}
                aria-disabled={duration === 0}
                aria-label="Video progress — seek"
                aria-valuemin={0}
                aria-valuemax={Math.floor(duration) || 0}
                aria-valuenow={Math.floor(announcedTime)}
                aria-valuetext={`${formatTime(announcedTime)} of ${formatTime(duration)}`}
                onFocus={() => setAnnouncedTime(videoRef.current?.currentTime ?? 0)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleSeekKeyDown}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  const el = e.currentTarget;
                  el.setPointerCapture(e.pointerId);
                  scrubbingRef.current = true;
                  seekToClientX(e.clientX, el);
                }}
                onPointerMove={(e) => {
                  if (scrubbingRef.current) seekToClientX(e.clientX, e.currentTarget);
                }}
                onPointerUp={(e) => {
                  scrubbingRef.current = false;
                  e.currentTarget.releasePointerCapture(e.pointerId);
                }}
                onPointerCancel={() => {
                  scrubbingRef.current = false;
                }}
                className="absolute inset-x-0 bottom-0 flex h-6 touch-none cursor-pointer items-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-teal/60"
              >
                <div className="h-1 w-full bg-white/15">
                  <div
                    className="h-full bg-accent-teal"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-5 flex justify-center">
              <span className="font-mono text-xs text-text-tertiary">
                Live product demo · tap {isMuted ? "the speaker to unmute" : "to mute"}
              </span>
            </div>

            {/* Glow beneath */}
            <div className="absolute -bottom-8 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-accent-teal/5 blur-3xl" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
