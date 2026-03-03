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
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ROIGradeBadge } from "@/components/ui/ROIGradeBadge";
import { FEATURES } from "@/lib/constants";

const icons = [
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
];

const accentTextColor: Record<string, string> = {
  orange: "text-accent-orange",
  teal: "text-accent-teal",
  blue: "text-accent-blue",
  red: "text-accent-red",
};

const accentBg: Record<string, string> = {
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
  const bars = [
    { label: "Today", value: 65, amount: "$3.57" },
    { label: "Week", value: 85, amount: "$24.80" },
    { label: "Month", value: 45, amount: "$67.20" },
  ];
  return (
    <div className="mt-4 space-y-2.5">
      {bars.map((bar) => (
        <div key={bar.label} className="flex items-center gap-3">
          <span className="w-12 font-mono text-[10px] text-text-tertiary">
            {bar.label}
          </span>
          <div className="flex-1 h-2 rounded-full bg-track-bg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${bar.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full rounded-full bg-accent-orange"
            />
          </div>
          <span className="font-mono text-[11px] text-accent-orange">
            {bar.amount}
          </span>
        </div>
      ))}
    </div>
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
            strokeDashoffset={2 * Math.PI * 28 * 0.13}
          />
        </svg>
        <span className="font-mono text-sm font-bold text-accent-teal">
          87%
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
  const models = [
    { name: "Opus", cost: "$280", pct: 80 },
    { name: "Sonnet", cost: "$180", pct: 55 },
    { name: "Haiku", cost: "$45", pct: 15 },
  ];
  return (
    <div className="mt-4 space-y-3">
      {models.map((m) => (
        <div key={m.name} className="flex items-center gap-3">
          <span className="w-14 font-mono text-[11px] text-text-secondary">
            {m.name}
          </span>
          <div className="flex-1 h-2 rounded-full bg-track-bg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${m.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full rounded-full bg-accent-blue"
            />
          </div>
          <span className="font-mono text-[11px] text-text-tertiary">
            {m.cost}
          </span>
        </div>
      ))}
    </div>
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
      <svg width={width} height={height + 4} className="overflow-visible">
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
    <div className="dark mt-4 rounded-lg bg-terminal-content-bg px-3 py-2.5">
      <div className="flex items-center gap-2">
        <span className="text-accent-teal font-mono text-xs">$</span>
        <span className="font-mono text-xs text-text-primary">
          npx claude-roi
        </span>
      </div>
      <div className="mt-1 font-mono text-[10px] text-text-tertiary">
        ✓ Dashboard ready
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

const visualizations = [
  ROIViz,
  CostBars,
  SurvivalRing,
  TokenBars,
  ModelBars,
  HeatmapMini,
  OrphanedCount,
  SparklineMini,
  TerminalMini,
  ShieldIcon,
];

// Grid layout for 3-col grid — each row must sum to 3
// Features order: ROI Grade, Cost/Commit, Line Survival, Token Analytics,
//   Model Comparison, Productivity Heatmap, Session Analysis, Cost Breakdown,
//   Zero Config, Privacy First
const gridClasses = [
  "sm:col-span-2",  // 0 ROI Grade (large)         row1: 2
  "sm:col-span-1",  // 1 Cost per Commit            row1: +1=3
  "sm:col-span-1",  // 2 Line Survival              row2: 1
  "sm:col-span-1",  // 3 Token Analytics             row2: +1=2
  "sm:col-span-1",  // 4 Model Comparison → small    row2: +1=3
  "sm:col-span-1",  // 5 Heatmap                    row3: 1
  "sm:col-span-1",  // 6 Session Analysis            row3: +1=2
  "sm:col-span-1",  // 7 Cost Breakdown → small      row3: +1=3
  "sm:col-span-1",  // 8 Zero Config                row4: 1
  "sm:col-span-2",  // 9 Privacy First (wide)       row4: +2=3
];

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-14 sm:py-20">
      <Container>
        <SectionHeading
          label="Key Features"
          heading="Everything you need to quantify your AI investment"
          subheading="From ROI grades to token-level analytics — comprehensive visibility into your AI coding spend."
          accent="orange"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = icons[i];
            const Viz = visualizations[i];

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
                className={gridClasses[i]}
              >
                <GlassCard
                  accent={feature.accent}
                  hover
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
