export type Accent = "orange" | "teal" | "blue" | "red";

export type Feature = {
  title: string;
  description: string;
  accent: Accent;
  size: "large" | "small";
  isNew?: boolean;
};

export const SITE = {
  name: "CodelensAI",
  tagline: "Agent Productivity-to-Cost Correlator",
  description:
    "Measure your AI coding ROI. CodelensAI correlates Claude Code and OpenAI Codex token spend with actual git output — one dashboard, side by side. One command: npx codelens-ai.",
  url: "https://codelensai-dev.vercel.app",
  github: "https://github.com/Akshat2634/Codelens-AI",
  npm: "https://www.npmjs.com/package/codelens-ai",
  author: "Akshat Sahu",
};

export const STATS = {
  weeklyDownloads: "1,500+",
  version: "0.9.2",
  license: "MIT",
  dependencies: 3,
  lineSurvivalRate: 90,
  costPerCommit: 1.96,
  tokenEfficiency: 98,
  commitsShipped: 179,
  planUtilization: 2.9,
  overallGrade: "A",
};

// Supported coding agents — read straight from your local session files.
// Figures are illustrative of a real month analyzed with `--plan max5 --codex-plan plus`.
export const AGENTS = [
  {
    name: "Claude Code",
    models: "Opus · Sonnet · Haiku",
    spend: "$243.75",
    commits: 104,
    costPerCommit: "$2.34",
    accent: "orange" as const,
    path: "~/.claude/projects/",
  },
  {
    name: "OpenAI Codex",
    models: "GPT-5.x Codex · GPT-5.x",
    spend: "$107.07",
    commits: 75,
    costPerCommit: "$1.43",
    accent: "teal" as const,
    path: "~/.codex/sessions/",
  },
];

export const FEATURES: Feature[] = [
  {
    title: "Multi-Agent Dashboard",
    description:
      "Claude Code and OpenAI Codex in one place. When both have sessions, switch between All Agents, Claude Code, and OpenAI Codex tabs — every metric recomputes so you can compare them side by side.",
    accent: "teal" as const,
    size: "large" as const,
    isNew: true,
  },
  {
    title: "ROI Grade",
    description:
      "An A–F composite score from cost-per-commit and line survival. Know instantly if your AI spend is paying off.",
    accent: "orange" as const,
    size: "small" as const,
  },
  {
    title: "Cost per Commit",
    description:
      "See exactly what each AI-assisted commit costs in tokens — priced against each provider's published API rates.",
    accent: "orange" as const,
    size: "small" as const,
  },
  {
    title: "Line Survival Rate",
    description:
      "What percentage of AI-written lines survive 24 hours without being rewritten? Measure code quality, not just quantity.",
    accent: "teal" as const,
    size: "small" as const,
  },
  {
    title: "Effective Cost",
    description:
      "On a flat plan? Pass --plan / --codex-plan to reframe spend against the fee you actually pay: effective $/commit, $/surviving line, and how many times over you've earned back your subscription.",
    accent: "blue" as const,
    size: "small" as const,
    isNew: true,
  },
  {
    title: "Model Comparison",
    description:
      "Compare cost and efficiency across Opus, Sonnet, Haiku, GPT-5.x Codex, and more. Find the best model for each kind of task.",
    accent: "blue" as const,
    size: "large" as const,
  },
  {
    title: "Attribution & Coverage",
    description:
      "Every commit gets a high / medium / low confidence score from file overlap and timing, plus an AI-vs-organic line reconciliation. The ROI numbers are auditable, not a black box.",
    accent: "orange" as const,
    size: "small" as const,
    isNew: true,
  },
  {
    title: "Agent Autonomy",
    description:
      "An A–F autonomy grade blending autopilot ratio (actions per prompt), self-heal score (test/lint usage), toolbelt coverage, and commit velocity. See how independently your agent really works.",
    accent: "teal" as const,
    size: "large" as const,
  },
  {
    title: "Productivity Heatmap",
    description:
      "A GitHub-style hour-by-day grid of when your AI-assisted commits land. Discover your most productive coding hours.",
    accent: "teal" as const,
    size: "small" as const,
  },
  {
    title: "Token Analytics",
    description:
      "Deep token breakdown: efficiency rate, tokens per commit, cache savings, input vs output. Know where every token goes.",
    accent: "blue" as const,
    size: "small" as const,
  },
  {
    title: "Session Analysis",
    description:
      "Spot orphaned sessions — 10+ messages that produced zero commits — and a sortable, expandable table of every session with its matched commits.",
    accent: "red" as const,
    size: "small" as const,
  },
  {
    title: "Privacy First",
    description:
      "All data stays on your machine. Zero telemetry, zero cloud. Reads only local session files and git history.",
    accent: "blue" as const,
    size: "small" as const,
  },
];

export const STEPS = [
  {
    number: "01",
    title: "Install & Run",
    description:
      "Run npx codelens-ai in any git repo where you've used Claude Code or OpenAI Codex. No config files, no API keys, no setup required.",
  },
  {
    number: "02",
    title: "Analyze",
    description:
      "CodelensAI reads your local Claude Code and Codex session files and correlates them with your git history by file overlap and timing — every commit is attributed to at most one session.",
  },
  {
    number: "03",
    title: "Optimize",
    description:
      "Get an interactive dashboard with per-agent tabs, ROI grade, cost-per-commit, effective cost vs your plan, and line survival — the insights to cut wasted spend.",
  },
];

export const INSTALL_COMMANDS = {
  npx: "npx codelens-ai",
  npm: "npm install -g codelens-ai",
  pnpm: "pnpm add -g codelens-ai",
  yarn: "yarn global add codelens-ai",
};

export const CLI_OPTIONS = [
  { flag: "--source codex", description: "Analyze a single agent: claude | codex | all" },
  { flag: "--plan max20", description: "Claude subscription mode — effective $/commit vs your flat plan" },
  { flag: "--codex-plan plus", description: "ChatGPT/Codex subscription mode: free … pro" },
  { flag: "--days 90", description: "Look back 90 days (default: 30)" },
  { flag: "--autonomy", description: "Print the autonomy score to your terminal and exit" },
  { flag: "--json", description: "Output all metrics as JSON to stdout" },
];
