"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { AGENTS } from "@/lib/constants";

const accentText = {
  orange: "text-accent-orange",
  teal: "text-accent-teal",
  blue: "text-accent-blue",
  red: "text-accent-red",
} as const;

const accentDot = {
  orange: "bg-accent-orange",
  teal: "bg-accent-teal",
  blue: "bg-accent-blue",
  red: "bg-accent-red",
} as const;

const combined = [
  { label: "Total spend", value: "$350.82" },
  { label: "Commits shipped", value: "179" },
  { label: "Cost / commit", value: "$1.96" },
];

export function AgentSupport() {
  return (
    <section id="agents" className="relative py-14 sm:py-20">
      <Container>
        <SectionHeading
          label="Multi-Agent"
          heading="Two agents. One dashboard."
          subheading="CodelensAI reads both your Claude Code and OpenAI Codex sessions. When both are present, switch tabs to compare them side by side — every metric recomputes for the selected agent."
          accent="teal"
        />

        <div className="mx-auto mt-12 max-w-4xl">
          {/* Source tabs (mirrors the real dashboard) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <span className="rounded-lg bg-accent-teal-dim px-3 py-1.5 font-mono text-xs font-medium text-accent-teal ring-1 ring-accent-teal/30">
              All Agents
            </span>
            <span className="rounded-lg border border-border-subtle px-3 py-1.5 font-mono text-xs text-text-tertiary">
              Claude Code
            </span>
            <span className="rounded-lg border border-border-subtle px-3 py-1.5 font-mono text-xs text-text-tertiary">
              OpenAI Codex
            </span>
          </motion.div>

          {/* Combined "All Agents" summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 grid grid-cols-3 gap-3 rounded-2xl border border-border-subtle bg-bg-glass p-5 backdrop-blur-xl"
          >
            {combined.map((c) => (
              <div key={c.label} className="text-center">
                <div className="font-mono text-xl font-bold text-text-primary sm:text-2xl">
                  {c.value}
                </div>
                <div className="mt-1 text-[11px] text-text-tertiary">{c.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Per-agent cards */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {AGENTS.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <GlassCard accent={agent.accent} hover className="h-full p-6">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${accentDot[agent.accent]}`} />
                    <h3 className="font-mono text-base font-semibold text-text-primary">
                      {agent.name}
                    </h3>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-text-tertiary">
                    <Layers className="h-3 w-3" />
                    {agent.models}
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div>
                      <div className={`font-mono text-lg font-bold ${accentText[agent.accent]}`}>
                        {agent.spend}
                      </div>
                      <div className="mt-0.5 text-[10px] text-text-tertiary">spend</div>
                    </div>
                    <div>
                      <div className="font-mono text-lg font-bold text-text-primary">
                        {agent.commits}
                      </div>
                      <div className="mt-0.5 text-[10px] text-text-tertiary">commits</div>
                    </div>
                    <div>
                      <div className="font-mono text-lg font-bold text-text-primary">
                        {agent.costPerCommit}
                      </div>
                      <div className="mt-0.5 text-[10px] text-text-tertiary">/ commit</div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-border-subtle pt-3">
                    <code className="font-mono text-[11px] text-text-secondary">{agent.path}</code>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
