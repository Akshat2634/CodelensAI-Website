"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function GridBackground({
  children,
  className,
  showOrbs = true,
}: {
  children?: React.ReactNode;
  className?: string;
  showOrbs?: boolean;
}) {
  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 600], [0, -80]);
  const orbY2 = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Dot grid */}
      <div className="dot-grid pointer-events-none absolute inset-0" />

      {/* Gradient orbs with parallax */}
      {showOrbs && (
        <>
          <motion.div
            style={{ y: orbY1 }}
            className="pointer-events-none absolute -top-40 -left-40 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full opacity-[0.07]"
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-orange) 0%, transparent 70%)",
              }}
            />
          </motion.div>
          <motion.div
            style={{ y: orbY2 }}
            className="pointer-events-none absolute -right-40 -bottom-40 h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full opacity-[0.05]"
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-teal) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
