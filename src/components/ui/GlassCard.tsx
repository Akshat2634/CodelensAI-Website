"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";

type AccentColor = "orange" | "teal" | "blue" | "red" | "none";

const accentTopStyles: Record<AccentColor, string> = {
  orange:
    "before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-accent-orange before:to-accent-orange/40",
  teal: "before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-accent-teal before:to-accent-teal/40",
  blue: "before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-accent-blue before:to-accent-blue/40",
  red: "before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-accent-red before:to-accent-red/40",
  none: "",
};

const accentGlowStyles: Record<AccentColor, string> = {
  orange: "hover:shadow-[0_0_20px_rgba(230,126,34,0.15),0_0_40px_rgba(230,126,34,0.05)]",
  teal: "hover:shadow-[0_0_20px_rgba(46,204,113,0.15),0_0_40px_rgba(46,204,113,0.05)]",
  blue: "hover:shadow-[0_0_20px_rgba(52,152,219,0.15),0_0_40px_rgba(52,152,219,0.05)]",
  red: "hover:shadow-[0_0_20px_rgba(231,76,60,0.15),0_0_40px_rgba(231,76,60,0.05)]",
  none: "",
};

export function GlassCard({
  children,
  className,
  accent = "none",
  hover = false,
  spotlight = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: AccentColor;
  hover?: boolean;
  spotlight?: boolean;
}) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );
      e.currentTarget.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );
    },
    []
  );

  return (
    <div
      onMouseMove={spotlight ? handleMouseMove : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-glass backdrop-blur-xl",
        accent !== "none" && "before:content-['']",
        accentTopStyles[accent],
        hover &&
          "transition-all duration-300 hover:border-border-hover hover:bg-bg-glass-hover hover:-translate-y-0.5",
        hover && accentGlowStyles[accent],
        spotlight && "glass-spotlight",
        className
      )}
    >
      {children}
    </div>
  );
}
