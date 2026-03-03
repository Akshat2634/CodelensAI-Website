"use client";

import { useState, useEffect } from "react";

export function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  onComplete,
  className,
}: {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!done) {
      const timeout = setTimeout(() => {
        setDone(true);
        onComplete?.();
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [started, displayed, text, speed, onComplete, done]);

  if (!started) return null;

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-blink ml-0.5 text-accent-teal">▋</span>}
    </span>
  );
}
