"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

const metrics = [
  {
    value: 3.57,
    prefix: "$",
    suffix: "",
    decimals: 2,
    label: "Avg Cost / Commit",
    color: "text-accent-orange",
  },
  {
    value: 87,
    prefix: "",
    suffix: "%",
    decimals: 0,
    label: "Line Survival Rate",
    color: "text-accent-teal",
  },
  {
    value: 86,
    prefix: "",
    suffix: "%",
    decimals: 0,
    label: "Token Efficiency",
    color: "text-accent-blue",
  },
  {
    value: 171,
    prefix: "",
    suffix: "",
    decimals: 0,
    label: "Commits Shipped",
    color: "text-accent-teal",
  },
  {
    value: 610.95,
    prefix: "$",
    suffix: "",
    decimals: 2,
    label: "Total Tracked",
    color: "text-accent-orange",
  },
];

export function MetricsStrip() {
  return (
    <section id="metrics" className="relative py-6 sm:py-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-6 rounded-2xl border border-border-subtle bg-bg-glass p-6 backdrop-blur-xl sm:grid-cols-3 lg:grid-cols-5 sm:p-8"
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className={cn("text-center", i === metrics.length - 1 && "col-span-2 sm:col-span-1")}
            >
              <div className={`font-mono text-2xl font-bold sm:text-3xl ${m.color}`}>
                <AnimatedCounter
                  end={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  duration={1500}
                />
              </div>
              <div className="mt-1 text-xs text-text-tertiary">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
