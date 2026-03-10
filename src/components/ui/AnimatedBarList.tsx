"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BarItem {
  label: string;
  value: string;
  pct: number;
  color?: string;
}

export function AnimatedBarList({
  items,
  labelWidth = "w-12",
  labelClassName = "text-[10px] text-text-tertiary",
  barHeight = "h-2",
  barColor = "bg-accent-orange",
  valueClassName = "text-[11px] text-text-tertiary",
  spacing = "space-y-2.5",
}: {
  items: BarItem[];
  labelWidth?: string;
  labelClassName?: string;
  barHeight?: string;
  barColor?: string;
  valueClassName?: string;
  spacing?: string;
}) {
  return (
    <div className={cn("mt-4", spacing)}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className={cn(labelWidth, "font-mono truncate", labelClassName)}>
            {item.label}
          </span>
          <div className={cn("flex-1 rounded-full bg-track-bg overflow-hidden", barHeight)}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn("h-full rounded-full", item.color ?? barColor)}
            />
          </div>
          <span className={cn("font-mono", valueClassName)}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
