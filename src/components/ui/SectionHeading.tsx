"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(center && "text-center", className)}
    >
      <span
        className={cn(
          "mb-4 inline-block font-mono text-xs font-medium uppercase tracking-[0.2em]",
          labelColors[accent]
        )}
      >
        {label}
      </span>
      <h2 className="font-sans text-3xl font-bold text-text-primary sm:text-4xl lg:text-[2.75rem] leading-tight tracking-tight">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-4 max-w-xl mx-auto text-base text-text-secondary sm:text-lg leading-relaxed">
          {subheading}
        </p>
      )}
    </motion.div>
  );
}
