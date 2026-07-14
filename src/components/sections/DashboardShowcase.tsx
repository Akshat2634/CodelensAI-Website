"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Demo recording lives at public/codelens-demo.mp4 (1080×1080, ~54s, H.264).
// The current file has NO audio track — flip HAS_AUDIO to true once a version
// with sound is in place to re-enable the mute/unmute control.
const VIDEO_MP4 = "/codelens-demo.mp4";
const VIDEO_WEBM = "/codelens-demo.webm";
const HAS_AUDIO = false;

export function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { margin: "-120px" });

  // Autoplay by default, but never under prefers-reduced-motion unless the
  // visitor manually presses play. `isPlaying` mirrors the real element state.
  const [wantsPlay, setWantsPlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  // Start muted — browsers only autoplay muted video; user can unmute for sound.
  const [muted, setMuted] = useState(true);
  const userInteracted = useRef(false);

  // Keep the element's muted property in sync (React's `muted` prop is unreliable).
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  // Drive playback from intent + viewport (pause offscreen to save battery/data).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mayAutoplay = !reduced || userInteracted.current;
    if (wantsPlay && isInView && mayAutoplay) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [wantsPlay, isInView]);

  const play = useCallback(() => {
    userInteracted.current = true;
    setWantsPlay(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    setWantsPlay(false);
    videoRef.current?.pause();
  }, []);

  const toggleMute = useCallback(() => {
    userInteracted.current = true;
    setMuted((m) => {
      const next = !m;
      if (!next) play(); // unmuting should also start playback
      return next;
    });
  }, [play]);

  return (
    <section
      id="dashboard"
      className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 overflow-hidden"
    >
      <Container wide>
        <SectionHeading
          label="Dashboard Preview"
          heading="See exactly where your tokens go"
          subheading="A local-first dashboard that breaks every dollar of your Claude Code and Codex spend into auditable, per-agent insights — here's the real thing in action."
          accent="teal"
        />

        <div ref={ref} className="relative mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto max-w-2xl"
          >
            {/* Browser chrome */}
            <div className="overflow-hidden rounded-xl border border-border-subtle shadow-2xl shadow-shadow-heavy">
              {/* Address bar */}
              <div className="flex items-center gap-2 border-b border-border-subtle bg-terminal-bg px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-terminal-url-bg px-3 py-1">
                  <span className="font-mono text-[11px] text-text-tertiary">
                    localhost:3457
                  </span>
                </div>
              </div>

              {/* Video (square 1:1 source) */}
              <div className="group relative aspect-square bg-terminal-content-bg">
                <video
                  ref={videoRef}
                  className="block h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="CodelensAI dashboard product demo"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={VIDEO_WEBM} type="video/webm" />
                  <source src={VIDEO_MP4} type="video/mp4" />
                </video>

                {/* Center play button — shown whenever paused */}
                {!isPlaying && (
                  <button
                    onClick={play}
                    aria-label="Play demo"
                    className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/10"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-teal text-bg-primary shadow-lg transition-transform hover:scale-105">
                      <Play className="h-6 w-6 translate-x-[2px]" />
                    </span>
                  </button>
                )}

                {/* Bottom-right controls — shown while playing */}
                {isPlaying && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    {HAS_AUDIO && (
                      <button
                        onClick={toggleMute}
                        aria-label={muted ? "Unmute demo" : "Mute demo"}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-arrow-bg text-arrow-text backdrop-blur-sm transition-all hover:bg-arrow-bg-hover hover:scale-110"
                      >
                        {muted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                    )}
                    <button
                      onClick={pause}
                      aria-label="Pause demo"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-arrow-bg text-arrow-text backdrop-blur-sm transition-all hover:bg-arrow-bg-hover hover:scale-110"
                    >
                      <Pause className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Caption */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-teal" />
              </span>
              <span className="font-mono text-xs text-text-tertiary">
                Live product demo — no edits, real session data
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
