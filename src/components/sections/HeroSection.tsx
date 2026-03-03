"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GridBackground } from "@/components/ui/GridBackground";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { SITE, STATS } from "@/lib/constants";

const terminalLines = [
  { text: "Starting CodelensAI dashboard...", color: "text-text-secondary" },
  {
    text: "Parsing 85 sessions from ~/.claude/projects/",
    color: "text-text-secondary",
  },
  {
    text: "Analyzing git history across 3 repositories...",
    color: "text-text-secondary",
  },
  {
    text: "Dashboard ready at http://localhost:3457",
    color: "text-accent-blue",
  },
  {
    text: "ROI Grade: B | Cost/Commit: $3.57 | Survival: 87%",
    color: "text-accent-teal",
  },
];

const trustItems = [
  `${STATS.weeklyDownloads} weekly downloads`,
  `${STATS.license} License`,
  "Zero Config",
  "Privacy First",
];

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function HeroSection() {
  const [typingDone, setTypingDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  const handleTypingComplete = useCallback(() => {
    setTypingDone(true);
    // Show lines one by one
    terminalLines.forEach((_, i) => {
      setTimeout(() => setVisibleLines((v) => Math.max(v, i + 1)), (i + 1) * 350);
    });
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <GridBackground className="absolute inset-0" showOrbs />

      <Container className="relative z-10 py-24 sm:py-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col items-center text-center"
        >
          {/* Headline */}
          <motion.h1
            variants={item}
            className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            <span className="text-text-primary">Stop guessing.</span>
            <br />
            <span className="gradient-text-orange-teal">Start measuring.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            The open-source ROI dashboard that ties your Claude Code token spend
            to actual git output.
          </motion.p>

          {/* Terminal */}
          <motion.div variants={item} className="mt-10 w-full max-w-2xl">
            <TerminalWindow title="~ terminal" className="text-left">
              <div className="flex items-center">
                <span className="text-accent-teal">$</span>
                <span className="ml-2">
                  <TypewriterText
                    text="npx claude-roi"
                    speed={60}
                    onComplete={handleTypingComplete}
                    className="text-text-primary"
                  />
                </span>
              </div>

              {typingDone && (
                <div className="mt-3 space-y-1">
                  {terminalLines.map((line, i) =>
                    i < visibleLines ? (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`text-[13px] ${line.color}`}
                      >
                        {i === terminalLines.length - 1 ? (
                          <span className="font-semibold">{line.text}</span>
                        ) : (
                          line.text
                        )}
                      </motion.div>
                    ) : null
                  )}
                </div>
              )}
            </TerminalWindow>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#install"
              className="group flex items-center gap-2 rounded-xl bg-accent-teal px-6 py-3 font-medium text-bg-primary transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(46,204,113,0.25)]"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border-subtle px-6 py-3 text-text-secondary transition-all hover:border-border-hover hover:text-text-primary"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {trustItems.map((text, i) => (
              <span
                key={i}
                className="font-mono text-xs text-text-tertiary"
              >
                {i > 0 && (
                  <span className="mr-6 hidden sm:inline text-text-tertiary/40">
                    ·
                  </span>
                )}
                {text}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
