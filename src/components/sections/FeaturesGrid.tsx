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
  LineChart,
  Zap,
  Shield,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ROIGradeBadge } from "@/components/ui/ROIGradeBadge";
import { CopyButton } from "@/components/ui/CopyButton";
import { AnimatedBarList } from "@/components/ui/AnimatedBarList";
import { FEATURES, STATS, type Accent } from "@/lib/constants";

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

// Mini-visualizations for specific cards
function ROIViz() {
  return (
    <div className="mt-4 flex justify-center">
      <ROIGradeBadge grade="B" score={72} size="md" />
    </div>
  );
}

function CostBars() {
  return (
    <AnimatedBarList
      items={[
        { label: "Today", pct: 65, value: "$3.57" },
        { label: "Week", pct: 85, value: "$24.80" },
        { label: "Month", pct: 45, value: "$67.20" },
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
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth="3"
          />
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
      <span className="text-xs text-text-tertiary">
        of AI lines survive 24h
      </span>
    </div>
  );
}

function TokenBars() {
  const segments = [
    { label: "Input", pct: 41, color: "bg-accent-blue" },
    { label: "Output", pct: 59, color: "bg-accent-purple" },
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

function ModelBars() {
  return (
    <AnimatedBarList
      items={[
        { label: "Opus", pct: 80, value: "$280" },
        { label: "Sonnet", pct: 55, value: "$180" },
        { label: "Haiku", pct: 15, value: "$45" },
      ]}
      labelWidth="w-14"
      labelClassName="text-[11px] text-text-secondary"
      barColor="bg-accent-blue"
      spacing="space-y-3"
    />
  );
}

function HeatmapMini() {
  // Generate a random-looking but deterministic heatmap
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
          <div
            key={i}
            className={`h-[7px] w-[7px] rounded-[2px] ${colors[v]}`}
          />
        ))}
      </div>
    </div>
  );
}

function OrphanedCount() {
  return (
    <div className="mt-4 text-center">
      <div className="font-mono text-3xl font-bold text-accent-red">33%</div>
      <div className="mt-1 text-xs text-text-tertiary">
        sessions orphaned
      </div>
    </div>
  );
}

function SparklineMini() {
  const points = [2, 5, 3, 8, 6, 12, 9, 15, 11, 18, 14, 20, 16, 22, 19];
  const max = Math.max(...points);
  const width = 200;
  const height = 40;
  const path = points
    .map(
      (p, i) =>
        `${(i / (points.length - 1)) * width},${height - (p / max) * height}`
    )
    .join(" L ");

  return (
    <div className="mt-4 flex justify-center">
      <svg viewBox={`0 0 ${width} ${height + 4}`} className="overflow-visible w-full max-w-[200px]" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-orange)" />
            <stop offset="100%" stopColor="var(--accent-teal)" />
          </linearGradient>
        </defs>
        <path
          d={`M ${path}`}
          fill="none"
          stroke="url(#sparkGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function TerminalMini() {
  return (
    <div className="dark mt-4 overflow-hidden rounded-lg border border-white/[0.06] bg-[#1a1a2e]">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03]">
        <div className="flex items-center gap-1.5">
          <div className="h-[7px] w-[7px] rounded-full bg-[#ff5f57]" />
          <div className="h-[7px] w-[7px] rounded-full bg-[#febc2e]" />
          <div className="h-[7px] w-[7px] rounded-full bg-[#28c840]" />
        </div>
        <CopyButton text="npx codelens-ai" className="!px-1.5 !py-0.5 !text-[10px] !bg-transparent" />
      </div>
      {/* Content */}
      <div className="bg-[#0d1117] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#2ecc71]">$</span>
          <span className="font-mono text-xs text-[#f0f2f5]">
            npx codelens-ai
          </span>
        </div>
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
          <circle
            cx="36" cy="36" r="30"
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth="4"
          />
          <motion.circle
            cx="36" cy="36" r="30"
            fill="none"
            stroke="var(--accent-teal)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 30}
            initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
            whileInView={{ strokeDashoffset: 2 * Math.PI * 30 * 0.12 }}
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
            { label: "Autopilot Ratio", value: "4.2x", pct: 84, color: "bg-accent-teal" },
            { label: "Self-Heal Score", value: "78%", pct: 78, color: "bg-accent-blue" },
            { label: "Toolbelt Coverage", value: "65%", pct: 65, color: "bg-accent-orange" },
            { label: "Commit Velocity", value: "12", pct: 60, color: "bg-accent-teal" },
          ]}
          labelWidth="w-20 sm:w-24"
          barHeight="h-1.5"
          valueClassName="w-8 text-right text-[11px] font-medium text-text-primary"
          spacing="space-y-2.5"
        />
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue-dim">
        <Shield className="h-5 w-5 text-accent-blue" />
      </div>
      <span className="text-xs text-text-tertiary">
        All data stays on your machine
      </span>
    </div>
  );
}

// Co-located feature metadata: icon, visualization, and grid class for each feature.
// Order must match FEATURES in constants.ts. Each row in the 3-col grid must sum to 3.
const featureConfig: { icon: LucideIcon; viz: () => React.JSX.Element; gridClass: string }[] = [
  { icon: DollarSign,     viz: ROIViz,        gridClass: "md:col-span-2" },  // ROI Grade        row1: 2
  { icon: GitCommit,      viz: CostBars,      gridClass: "md:col-span-1" },  // Cost per Commit  row1: +1=3
  { icon: TrendingUp,     viz: SurvivalRing,  gridClass: "md:col-span-1" },  // Line Survival    row2: 1
  { icon: BarChart3,      viz: TokenBars,     gridClass: "md:col-span-1" },  // Token Analytics   row2: +1=2
  { icon: Layers,         viz: ModelBars,     gridClass: "md:col-span-1" },  // Model Comparison  row2: +1=3
  { icon: Clock,          viz: HeatmapMini,   gridClass: "md:col-span-1" },  // Heatmap          row3: 1
  { icon: AlertTriangle,  viz: OrphanedCount, gridClass: "md:col-span-1" },  // Session Analysis  row3: +1=2
  { icon: LineChart,      viz: SparklineMini, gridClass: "md:col-span-1" },  // Cost Breakdown    row3: +1=3
  { icon: Bot,            viz: AutonomyViz,   gridClass: "md:col-span-2" },  // Agent Autonomy    row4: 2
  { icon: Zap,            viz: TerminalMini,  gridClass: "md:col-span-1" },  // Zero Config       row4: +1=3
  { icon: Shield,         viz: ShieldIcon,    gridClass: "md:col-span-3" },  // Privacy First     row5: 3
];

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-10 sm:py-20">
      <Container>
        <SectionHeading
          label="Key Features"
          heading="Everything you need to quantify your AI investment"
          subheading="From ROI grades to token-level analytics — comprehensive visibility into your AI coding spend."
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
                <GlassCard
                  accent={feature.accent}
                  hover
                  spotlight
                  className="h-full p-5 sm:p-6"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accentBg[feature.accent]}`}
                    >
                      <Icon
                        className={`h-4 w-4 ${accentTextColor[feature.accent]}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-semibold text-text-primary">
                        {feature.title}
                        {feature.title === "Agent Autonomy" && (
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
