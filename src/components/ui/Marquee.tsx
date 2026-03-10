"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  speed = 30,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
