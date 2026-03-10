"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const slides = [
  {
    src: "/screenshots/dashboard-hero.png",
    alt: "CodelensAI Dashboard — Performance Overview with ROI Grade, Cost per Commit, and Line Survival Rate",
    label: "Performance Overview",
  },
  {
    src: "/screenshots/stats1.png",
    alt: "CodelensAI Dashboard — Cost Breakdown and Spending Analytics",
    label: "Cost Breakdown",
  },
  {
    src: "/screenshots/stats2.png",
    alt: "CodelensAI Dashboard — Token Usage and Model Comparison",
    label: "Token Analytics",
  },
  {
    src: "/screenshots/stats3.png",
    alt: "CodelensAI Dashboard — Session Analysis and Productivity Heatmap",
    label: "Session Insights",
  },
  {
    src: "/screenshots/stats4.png",
    alt: "CodelensAI Dashboard — Agent Autonomy, Line Survival Rate, and Session Details",
    label: "Agent Autonomy",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  }, []);

  return (
    <section id="dashboard" className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 overflow-hidden">
      <Container wide>
        <SectionHeading
          label="Dashboard Preview"
          heading="See exactly where your tokens go"
          subheading="A beautiful localhost dashboard that breaks down every dollar of your AI spend into actionable insights."
          accent="teal"
        />

        <div ref={ref} className="relative mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto max-w-5xl"
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

              {/* Screenshot carousel */}
              <div className="relative bg-screenshot-bg overflow-hidden">
                {/* Fixed-height container to prevent layout shift */}
                <div className="relative aspect-[14/9]">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.img
                      key={current}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      src={slides[current].src}
                      alt={slides[current].alt}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </AnimatePresence>
                </div>

                {/* Arrow buttons */}
                <button
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-arrow-bg text-arrow-text backdrop-blur-sm transition-all hover:bg-arrow-bg-hover hover:scale-110"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-arrow-bg text-arrow-text backdrop-blur-sm transition-all hover:bg-arrow-bg-hover hover:scale-110"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation dots + label */}
            <div className="mt-5 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${slide.label}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-accent-teal"
                        : "w-2 bg-text-tertiary/30 hover:bg-text-tertiary/60"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-text-tertiary">
                {slides[current].label}
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
