"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  CalendarDays,
  Timer,
  Gauge,
  Plug,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { CopyButton } from "@/components/ui/CopyButton";

type OutputLine = { text: string; className?: string };

type CliTab = {
  id: string;
  label: string;
  icon: LucideIcon;
  tagline: string;
  command: string;
  output: OutputLine[];
};

const TABS: CliTab[] = [
  {
    id: "report",
    label: "report",
    icon: FileText,
    tagline: "ROI scorecard — terminal, Markdown, or HTML",
    command: "npx codelens-ai report",
    output: [
      { text: "CodelensAI · ROI Report — last 30 days", className: "text-text-primary font-semibold" },
      { text: "─────────────────────────────────────────", className: "text-text-tertiary" },
      { text: "ROI Grade            A", className: "text-accent-teal font-semibold" },
      { text: "Spend (API-equiv)    $350.82", className: "text-text-secondary" },
      { text: "Commits shipped      179 · $1.96/commit", className: "text-text-secondary" },
      { text: "AI code share        64% of merged lines", className: "text-accent-blue" },
      { text: "Line survival (24h)  90%", className: "text-text-secondary" },
      { text: "Value leak           7% ($24.56) never committed", className: "text-accent-red" },
      { text: "Plan utilization     2.9× your subscription", className: "text-accent-orange" },
      { text: "", className: "" },
      { text: "→ add --md or --html for a one-pager your manager can read", className: "text-text-tertiary" },
    ],
  },
  {
    id: "daily",
    label: "daily",
    icon: CalendarDays,
    tagline: "Usage tables with the ROI columns others can't show",
    command: "npx codelens-ai daily",
    output: [
      { text: "Date       Tokens   Cost     Commits  $/Commit", className: "text-text-tertiary" },
      { text: "─────────────────────────────────────────────", className: "text-text-tertiary" },
      { text: "Jul 10     4.2M     $11.48   6        $1.91", className: "text-text-secondary" },
      { text: "Jul 11     6.8M     $18.02   9        $2.00", className: "text-text-secondary" },
      { text: "Jul 12     3.1M     $8.15    5        $1.63", className: "text-text-secondary" },
      { text: "Jul 13     5.5M     $14.61   8        $1.83", className: "text-text-secondary" },
      { text: "─────────────────────────────────────────────", className: "text-text-tertiary" },
      { text: "Total      19.6M    $52.26   28       $1.87", className: "text-accent-teal font-semibold" },
      { text: "", className: "" },
      { text: "→ weekly · monthly · --breakdown for per-model rows", className: "text-text-tertiary" },
    ],
  },
  {
    id: "blocks",
    label: "blocks",
    icon: Timer,
    tagline: "5-hour billing windows, burn rate & projections",
    command: "npx codelens-ai blocks --active",
    output: [
      { text: "Active block — opened 14:05, 3h 12m remaining", className: "text-text-primary font-semibold" },
      { text: "─────────────────────────────────────────────", className: "text-text-tertiary" },
      { text: "Tokens      2.1M", className: "text-text-secondary" },
      { text: "Cost        $4.87", className: "text-text-secondary" },
      { text: "Burn rate   2.6K tok/min · $0.23/hr", className: "text-accent-orange" },
      { text: "Projection  ~$7.10 by window close", className: "text-accent-blue" },
      { text: "Quota       ▓▓▓▓▓▓▓░░░  68% of limit", className: "text-accent-teal" },
      { text: "", className: "" },
      { text: "→ -t max to warn against your plan's token limit", className: "text-text-tertiary" },
    ],
  },
  {
    id: "statusline",
    label: "statusline",
    icon: Gauge,
    tagline: "An always-on ROI HUD inside Claude Code",
    command: "npx codelens-ai statusline --install",
    output: [
      { text: "✓ Backed up ~/.claude/settings.json", className: "text-accent-teal" },
      { text: "✓ Statusline installed", className: "text-accent-teal" },
      { text: "", className: "" },
      { text: "Your new Claude Code statusline:", className: "text-text-tertiary" },
      {
        text: "$4.20 session │ today $12.40 · 3 commits · $4.13/commit · A │ burn 2.6K/min │ 5h 84% (resets 1h15m) · wk 41% │ ctx 23%",
        className: "text-text-primary",
      },
      { text: "", className: "" },
      { text: "→ the only statusline that shows ROI alongside burn", className: "text-text-tertiary" },
    ],
  },
  {
    id: "mcp",
    label: "mcp",
    icon: Plug,
    tagline: "Ask Claude about your own usage & ROI, in-chat",
    command: "claude mcp add codelens -- npx -y codelens-ai mcp",
    output: [
      { text: "✓ codelens MCP server registered", className: "text-accent-teal" },
      { text: "", className: "" },
      {
        text: "Tools: roi_summary · usage · blocks · sessions · projects · refresh",
        className: "text-text-secondary",
      },
      { text: "", className: "" },
      { text: "Now just ask Claude:", className: "text-text-tertiary" },
      { text: "❯ “What did my AI coding cost this week?”", className: "text-accent-blue" },
      { text: "❯ “Which repo has the worst $/commit?”", className: "text-accent-blue" },
    ],
  },
];

export function CliShowcase() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="cli" className="relative py-14 sm:py-20">
      <Container>
        <SectionHeading
          label="New · CLI Toolkit"
          heading="Way more than a dashboard"
          subheading="ROI reports, ccusage-style usage tables, 5-hour billing blocks, a live Claude Code statusline, and an MCP server — all in the same zero-config command."
          accent="orange"
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="CLI subcommands"
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {TABS.map((t, i) => {
              const Icon = t.icon;
              const isActive = i === active;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
                    isActive
                      ? "bg-accent-orange-dim text-accent-orange ring-1 ring-accent-orange/30"
                      : "border border-border-subtle text-text-tertiary hover:border-border-hover hover:text-text-secondary"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Tagline for the active tab */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`tagline-${tab.id}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-4 text-center text-sm text-text-secondary"
            >
              {tab.tagline}
            </motion.p>
          </AnimatePresence>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="beam-border mt-6"
          >
            <TerminalWindow title={`~ codelens-ai ${tab.id}`} className="border-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center">
                  <span className="shrink-0 text-accent-teal">$</span>
                  <code className="ml-2 truncate text-[12px] text-text-primary sm:text-[13px]">
                    {tab.command}
                  </code>
                </div>
                <CopyButton text={tab.command} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 space-y-0.5"
                >
                  {tab.output.map((line, i) => (
                    <motion.div
                      key={`${tab.id}-${i}`}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      className={`whitespace-pre text-[10.5px] sm:text-[12.5px] ${line.className || "text-text-secondary"}`}
                    >
                      {line.text || " "}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TerminalWindow>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
