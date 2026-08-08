"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  GitCommit,
  TrendingUp,
  BarChart3,
  Layers,
  Clock,
  AlertTriangle,
  Wallet,
  ScanSearch,
  Shield,
  Bot,
  Users,
  GitBranch,
  Droplets,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ROIGradeBadge } from "@/components/ui/ROIGradeBadge";
import { AnimatedBarList } from "@/components/ui/AnimatedBarList";
import { AGENTS, COMBINED, FEATURES, STATS, formatUsd, type Accent } from "@/lib/constants";

const accentTextColor: Record<Accent, string> = {
  orange: "text-accent-orange",
  teal: "text-accent-teal",
  blue: "text-accent-blue",
  red: "text-accent-red",
};

const accentBg: Record<Accent, string> = {
  orange: "bg-accent-orange-dim",
  teal: "bg-accent-teal-dim",
  blue: "bg-accent-blue-dim",
  red: "bg-accent-red-dim",
};

const accentDot: Record<Accent, string> = {
  orange: "bg-accent-orange",
  teal: "bg-accent-teal",
  blue: "bg-accent-blue",
  red: "bg-accent-red",
};

// ── Mini-visualizations ──────────────────────────────────────────────

function AgentTabsViz() {
  const tabs = [
    { label: "All Agents", active: true },
    ...AGENTS.map((a) => ({ label: a.name, active: false })),
  ];
  const rows = AGENTS.map((a) => ({
    label: a.name,
    dot: accentDot[a.accent],
    value: formatUsd(a.spend),
    sub: `${a.commits} commits`,
  }));
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <span
            key={t.label}
            className={`rounded-md px-2 py-1 font-mono text-[10px] transition-colors ${
              t.active
                ? "bg-accent-teal-dim text-accent-teal ring-1 ring-accent-teal/30"
                : "bg-track-bg text-text-tertiary"
            }`}
          >
            {t.label}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${r.dot}`} />
            <span className="text-[11px] text-text-secondary">{r.label}</span>
            <span className="ml-auto font-mono text-[11px] font-medium text-text-primary">
              {r.value}
            </span>
            <span className="w-20 shrink-0 whitespace-nowrap text-right font-mono text-[10px] text-text-tertiary">
              {r.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ROIViz() {
  return (
    <div className="mt-4 flex justify-center">
      <ROIGradeBadge grade="A" score={95} size="md" />
    </div>
  );
}

function CostBars() {
  return (
    <AnimatedBarList
      items={[
        { label: "Today", pct: 40, value: "$0.00" },
        { label: "Week", pct: 88, value: "$140.63" },
        { label: "Month", pct: 100, value: formatUsd(COMBINED.spend) },
      ]}
      barColor="bg-accent-orange"
      valueClassName="text-[11px] text-accent-orange"
    />
  );
}

function SurvivalRing() {
  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <svg width="64" height="64" className="absolute -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border-subtle)" strokeWidth="3" />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="var(--accent-teal)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 28}
            strokeDashoffset={2 * Math.PI * 28 * (1 - STATS.lineSurvivalRate / 100)}
          />
        </svg>
        <span className="font-mono text-sm font-bold text-accent-teal">
          {STATS.lineSurvivalRate}%
        </span>
      </div>
      <span className="text-xs text-text-tertiary">of AI lines survive 24h</span>
    </div>
  );
}

function AICodeShareViz() {
  const segments = [
    { label: "AI-written", pct: STATS.aiCodeShare, color: "bg-accent-teal" },
    { label: "Human", pct: 100 - STATS.aiCodeShare, color: "bg-text-tertiary/40" },
  ];
  return (
    <div className="mt-4">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-track-bg">
        {segments.map((seg) => (
          <motion.div
            key={seg.label}
            initial={{ width: 0 }}
            whileInView={{ width: `${seg.pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`h-full ${seg.color}`}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        {segments.map((seg) => (
          <span key={seg.label} className="font-mono text-[10px] text-text-tertiary">
            {seg.label} {seg.pct}%
          </span>
        ))}
      </div>
    </div>
  );
}

function ValueLeakViz() {
  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <div className="text-center">
        <div className="font-mono text-3xl font-bold text-accent-red">
          {STATS.valueLeakPct}%
        </div>
        <div className="mt-1 text-[10px] text-text-tertiary">of spend leaked</div>
      </div>
      <div className="text-left text-xs leading-snug text-text-tertiary">
        {formatUsd((COMBINED.spend * STATS.valueLeakPct) / 100)} that never
        <br />
        became a commit
      </div>
    </div>
  );
}

function StatuslineViz() {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg bg-terminal-content-bg px-3 py-2.5">
      <code className="whitespace-nowrap font-mono text-[10px] leading-relaxed">
        <span className="text-accent-teal">$4.20 session</span>
        <span className="text-text-tertiary"> │ </span>
        <span className="text-[#94a0b8]">today $12.40 · 3 commits</span>
        <span className="text-text-tertiary"> │ </span>
        <span className="text-accent-orange">burn 2.6K/min</span>
        <span className="text-text-tertiary"> │ </span>
        <span className="text-accent-blue">5h 84%</span>
      </code>
    </div>
  );
}

function EffectiveCostViz() {
  return (
    <div className="mt-4 flex items-center justify-between gap-4">
      <div>
        <div className="font-mono text-3xl font-bold text-accent-blue">
          {STATS.planUtilization}×
        </div>
        <div className="mt-1 text-[11px] text-text-tertiary">plan value extracted</div>
      </div>
      <div className="text-right">
        <div className="font-mono text-sm font-semibold text-text-primary">$0.59</div>
        <div className="text-[10px] text-text-tertiary">effective / commit</div>
        <div className="mt-1.5 font-mono text-sm font-semibold text-text-primary">$0.025</div>
        <div className="text-[10px] text-text-tertiary">/ surviving line</div>
      </div>
    </div>
  );
}

function ModelBars() {
  return (
    <AnimatedBarList
      items={[
        { label: "Opus 4.8", pct: 100, value: "$158" },
        { label: "GPT-5 Codex", pct: 42, value: "$107" },
        { label: "Sonnet", pct: 38, value: "$79" },
        { label: "Gemini 3.1", pct: 17, value: "$35" },
      ]}
      labelWidth="w-20"
      labelClassName="text-[11px] text-text-secondary"
      barColor="bg-accent-blue"
      spacing="space-y-3"
    />
  );
}

function AttributionViz() {
  const segments = [
    { label: "High", pct: 11, color: "bg-accent-teal" },
    { label: "Medium", pct: 79, color: "bg-accent-orange" },
    { label: "Organic", pct: 10, color: "bg-text-tertiary/50" },
  ];
  return (
    <div className="mt-4">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-track-bg">
        {segments.map((seg) => (
          <motion.div
            key={seg.label}
            initial={{ width: 0 }}
            whileInView={{ width: `${seg.pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`h-full ${seg.color}`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {segments.map((seg) => (
          <span key={seg.label} className="font-mono text-[10px] text-text-tertiary">
            {seg.label} {seg.pct}%
          </span>
        ))}
      </div>
    </div>
  );
}

function AutonomyViz() {
  return (
    <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
      {/* Grade ring */}
      <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center">
        <svg width="72" height="72" className="absolute -rotate-90">
          <circle cx="36" cy="36" r="30" fill="none" stroke="var(--border-subtle)" strokeWidth="4" />
          <motion.circle
            cx="36"
            cy="36"
            r="30"
            fill="none"
            stroke="var(--accent-teal)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 30}
            initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
            whileInView={{ strokeDashoffset: 2 * Math.PI * 30 * 0.17 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </svg>
        <span className="font-mono text-2xl font-bold text-accent-teal">A</span>
      </div>
      {/* Metric bars */}
      <div className="flex-1">
        <AnimatedBarList
          items={[
            { label: "Autopilot Ratio", value: "2.34x", pct: 58, color: "bg-accent-teal" },
            { label: "Self-Heal Score", value: "100%", pct: 100, color: "bg-accent-blue" },
            { label: "Toolbelt Coverage", value: "23%", pct: 23, color: "bg-accent-orange" },
            { label: "Commit Velocity", value: "2", pct: 88, color: "bg-accent-teal" },
          ]}
          labelWidth="w-24"
          barHeight="h-1.5"
          valueClassName="w-10 text-right text-[11px] font-medium text-text-primary"
          spacing="space-y-2.5"
        />
      </div>
    </div>
  );
}

function HeatmapMini() {
  const data = [
    [0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 1, 0],
    [1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 2],
    [2, 3, 4, 4, 3, 3, 2, 1, 2, 3, 4, 3],
    [1, 2, 3, 4, 4, 3, 2, 2, 3, 4, 3, 2],
    [2, 3, 4, 3, 3, 2, 1, 1, 2, 3, 4, 3],
    [1, 2, 3, 2, 2, 1, 0, 0, 1, 2, 2, 1],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  ];
  const colors = [
    "bg-track-bg",
    "bg-accent-teal/20",
    "bg-accent-teal/40",
    "bg-accent-teal/60",
    "bg-accent-teal/80",
  ];
  return (
    <div className="mt-4 flex justify-center">
      <div className="grid grid-cols-12 gap-[3px]">
        {data.flat().map((v, i) => (
          <div key={i} className={`h-[7px] w-[7px] rounded-[2px] ${colors[v]}`} />
        ))}
      </div>
    </div>
  );
}

function TokenBars() {
  const segments = [
    { label: "Input", pct: 18, color: "bg-accent-blue" },
    { label: "Output", pct: 82, color: "bg-accent-purple" },
  ];
  return (
    <div className="mt-4">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-track-bg">
        {segments.map((seg) => (
          <motion.div
            key={seg.label}
            initial={{ width: 0 }}
            whileInView={{ width: `${seg.pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`h-full ${seg.color}`}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        {segments.map((seg) => (
          <span key={seg.label} className="font-mono text-[10px] text-text-tertiary">
            {seg.label} {seg.pct}%
          </span>
        ))}
      </div>
    </div>
  );
}

function OrphanedCount() {
  return (
    <div className="mt-4 text-center">
      <div className="font-mono text-3xl font-bold text-accent-red">4%</div>
      <div className="mt-1 text-xs text-text-tertiary">sessions orphaned</div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue-dim">
        <Shield className="h-5 w-5 text-accent-blue" />
      </div>
      <span className="text-xs text-text-tertiary">All data stays on your machine</span>
    </div>
  );
}

// Co-located feature metadata: icon, visualization, and grid class for each feature.
// Order must match FEATURES in constants.ts. Each row in the 3-col grid must sum to 3.
const featureConfig: { icon: LucideIcon; viz: () => React.JSX.Element; gridClass: string }[] = [
  { icon: Users,         viz: AgentTabsViz,     gridClass: "md:col-span-2" }, // Multi-Agent      row1: 2
  { icon: DollarSign,    viz: ROIViz,           gridClass: "md:col-span-1" }, // ROI Grade        row1: +1=3
  { icon: GitCommit,     viz: CostBars,         gridClass: "md:col-span-1" }, // Cost per Commit  row2: 1
  { icon: GitBranch,     viz: AICodeShareViz,   gridClass: "md:col-span-1" }, // AI Code Share    row2: +1=2
  { icon: Droplets,      viz: ValueLeakViz,     gridClass: "md:col-span-1" }, // Value Leak       row2: +1=3
  { icon: Layers,        viz: ModelBars,        gridClass: "md:col-span-2" }, // Model Comparison row3: 2
  { icon: TrendingUp,    viz: SurvivalRing,     gridClass: "md:col-span-1" }, // Line Survival    row3: +1=3
  { icon: Wallet,        viz: EffectiveCostViz, gridClass: "md:col-span-1" }, // Effective Cost   row4: 1
  { icon: ScanSearch,    viz: AttributionViz,   gridClass: "md:col-span-1" }, // Attribution      row4: +1=2
  { icon: Clock,         viz: HeatmapMini,      gridClass: "md:col-span-1" }, // Heatmap          row4: +1=3
  { icon: Bot,           viz: AutonomyViz,      gridClass: "md:col-span-2" }, // Agent Autonomy   row5: 2
  { icon: BarChart3,     viz: TokenBars,        gridClass: "md:col-span-1" }, // Token Analytics  row5: +1=3
  { icon: AlertTriangle, viz: OrphanedCount,    gridClass: "md:col-span-1" }, // Session Analysis row6: 1
  { icon: Gauge,         viz: StatuslineViz,    gridClass: "md:col-span-1" }, // Reports & Statusline row6: +1=2
  { icon: Shield,        viz: ShieldIcon,       gridClass: "md:col-span-1" }, // Privacy First    row6: +1=3
];

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-14 sm:py-20">
      <Container>
        <SectionHeading
          label="Key Features"
          heading="Everything you need to quantify your AI investment"
          subheading="From per-agent ROI grades to token-level analytics — complete, auditable visibility into your Claude Code, Codex, and Copilot spend."
          accent="orange"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const { icon: Icon, viz: Viz, gridClass } = featureConfig[i];

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={gridClass}
              >
                <GlassCard accent={feature.accent} hover spotlight className="h-full p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accentBg[feature.accent]}`}
                    >
                      <Icon className={`h-4 w-4 ${accentTextColor[feature.accent]}`} />
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-semibold text-text-primary">
                        {feature.title}
                        {feature.isNew && (
                          <span className="ml-2 inline-block rounded-full bg-accent-teal px-2 py-0.5 align-middle font-sans text-[10px] font-bold uppercase tracking-wider text-white">
                            New
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <Viz />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
