"use client";

import { cn } from "@/lib/utils";

export function TerminalWindow({
  children,
  title = "terminal",
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border-subtle shadow-2xl shadow-shadow-medium",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border-subtle bg-terminal-bg px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 font-mono text-[11px] text-text-tertiary">
          {title}
        </span>
      </div>

      {/* Content — force dark context so text stays visible on dark bg */}
      <div className="dark bg-terminal-content-bg px-3 py-3 font-mono text-sm leading-relaxed overflow-x-auto sm:px-5 sm:py-4">
        {children}
      </div>
    </div>
  );
}
