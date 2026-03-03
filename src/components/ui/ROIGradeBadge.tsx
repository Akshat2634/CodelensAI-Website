"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function ROIGradeBadge({
  grade = "B",
  score = 72,
  size = "md",
}: {
  grade?: string;
  score?: number;
  size?: "sm" | "md" | "lg";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const sizes = {
    sm: { outer: 80, stroke: 4, fontSize: "text-2xl" },
    md: { outer: 120, stroke: 5, fontSize: "text-4xl" },
    lg: { outer: 160, stroke: 6, fontSize: "text-5xl" },
  };

  const { outer, stroke, fontSize } = sizes[size];
  const radius = (outer - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const gradeColor =
    score >= 90
      ? "var(--accent-teal)"
      : score >= 75
        ? "#7ed957"
        : score >= 50
          ? "var(--accent-orange)"
          : "var(--accent-red)";

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{ width: outer, height: outer }}
    >
      <svg
        width={outer}
        height={outer}
        className="absolute -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={outer / 2}
          cy={outer / 2}
          r={radius}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth={stroke}
        />
        {/* Animated progress */}
        <motion.circle
          cx={outer / 2}
          cy={outer / 2}
          r={radius}
          fill="none"
          stroke={gradeColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset: circumference - progress }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        />
      </svg>

      {/* Grade letter */}
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
        className={`font-mono font-bold ${fontSize}`}
        style={{ color: gradeColor }}
      >
        {grade}
      </motion.span>
    </div>
  );
}
