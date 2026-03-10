"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TextReveal } from "./TextReveal";

// SectionHeading only uses a subset of accents (no "red")
type AccentColor = "orange" | "teal" | "blue";

const labelColors: Record<AccentColor, string> = {
  orange: "text-accent-orange",
  teal: "text-accent-teal",
  blue: "text-accent-blue",
};

export function SectionHeading({
  label,
  heading,
  subheading,
  accent = "teal",
  className,
  center = true,
}: {
  label: string;
  heading: string;
  subheading?: string;
  accent?: AccentColor;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className={cn(center && "text-center", className)}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className={cn(
          "mb-4 inline-block font-mono text-xs font-medium uppercase tracking-[0.2em]",
          labelColors[accent]
        )}
      >
        {label}
      </motion.span>
      <h2 className="font-sans text-3xl font-bold text-text-primary sm:text-4xl lg:text-[2.75rem] leading-tight tracking-tight">
        <TextReveal text={heading} />
      </h2>
      {subheading && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mt-4 max-w-xl mx-auto text-base text-text-secondary sm:text-lg leading-relaxed"
        >
          {subheading}
        </motion.p>
      )}
    </div>
  );
}
