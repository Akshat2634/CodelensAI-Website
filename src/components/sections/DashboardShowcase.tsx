"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const isInView = useInView(ref, { margin: "-15% 0px" });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  // Read once on the client; gates the autoplay effect only, never the markup.
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Force muted so browsers allow the scroll-triggered autoplay.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
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
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
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
