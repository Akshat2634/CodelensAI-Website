"use client";

import { motion } from "framer-motion";
import { Terminal, Search, BarChart3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { STEPS } from "@/lib/constants";

const stepIcons = [Terminal, Search, BarChart3];

const accentColors = [
  { text: "text-accent-teal", bg: "bg-accent-teal-dim", line: "bg-accent-teal" },
  { text: "text-accent-blue", bg: "bg-accent-blue-dim", line: "bg-accent-blue" },
  { text: "text-accent-orange", bg: "bg-accent-orange-dim", line: "bg-accent-orange" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative pt-14 pb-8 sm:pt-20 sm:pb-10">
      <Container>
        <SectionHeading
          label="How It Works"
          heading="From terminal to insight in seconds"
          subheading="Three steps. Zero configuration. Complete visibility."
          accent="blue"
        />

        <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
          {/* Connecting lines (desktop) */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {/* Line 1→2 */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-1/2 left-[33.3%] h-[2px] w-[calc(33.3%-2rem)] origin-left rounded-full bg-gradient-to-r from-accent-teal/40 to-accent-blue/40"
              style={{ transform: "translateX(1rem)" }}
            />
            {/* Line 2→3 */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute top-1/2 left-[66.6%] h-[2px] w-[calc(33.3%-2rem)] origin-left rounded-full bg-gradient-to-r from-accent-blue/40 to-accent-orange/40"
              style={{ transform: "translateX(1rem)" }}
            />
          </div>

          {STEPS.map((step, i) => {
            const Icon = stepIcons[i];
            const colors = accentColors[i];

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <GlassCard hover className="relative h-full p-6 sm:p-8">
                  {/* Step number */}
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-current ${colors.text}`}
                  >
                    <span className="font-mono text-sm font-bold">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${colors.text}`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-mono text-lg font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
