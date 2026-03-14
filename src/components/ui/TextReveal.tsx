"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function TextReveal({
  text,
  className,
  wordClassName,
  controlled = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  controlled?: boolean;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      variants={containerVariants}
      {...(controlled
        ? {}
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" } })}
      className={cn("inline", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span variants={wordVariants} className={cn("inline-block", wordClassName)}>
            {word}
          </motion.span>
          {i < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}
