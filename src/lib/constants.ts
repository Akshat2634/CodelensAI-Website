export const SITE = {
  name: "CodelensAI",
  tagline: "Agent Productivity-to-Cost Correlator",
  description:
    "Measure your AI coding ROI. CodelensAI correlates Claude Code token spend with actual git output. One command: npx claude-roi.",
  url: "https://codelensai.dev",
  github: "https://github.com/Akshat2634/Codelens-AI",
  npm: "https://www.npmjs.com/package/claude-roi",
  author: "Akshat Sahu",
};

export const STATS = {
  weeklyDownloads: "1,072+",
  version: "0.7.2",
  license: "MIT",
  dependencies: 3,
  unpackedSize: "163 kB",
};

export const FEATURES = [
  {
    title: "ROI Grade",
    description:
      "Get an A-F composite score based on cost-per-commit and line survival rate. Know instantly if your AI spend is paying off.",
    accent: "orange" as const,
    size: "large" as const,
  },
  {
    title: "Cost per Commit",
    description:
      "See exactly how much each AI-assisted commit costs in tokens. Track spending at the granularity that matters.",
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
    title: "Token Analytics",
    description:
      "Deep token breakdown: efficiency rate, tokens per commit, cache savings, input vs output ratios. Know where every token goes.",
    accent: "blue" as const,
    size: "small" as const,
  },
  {
    title: "Model Comparison",
    description:
      "Compare cost and efficiency across Claude model families — Opus, Sonnet, and Haiku. Find the best model for your workflow.",
    accent: "blue" as const,
    size: "large" as const,
  },
  {
    title: "Productivity Heatmap",
    description:
      "GitHub-style activity grid showing your peak coding hours. Discover when AI-assisted development is most productive.",
    accent: "teal" as const,
    size: "small" as const,
  },
  {
    title: "Session Analysis",
    description:
      "Identify orphaned sessions — conversations with 10+ messages that produced zero commits. Eliminate wasted spend.",
    accent: "red" as const,
    size: "small" as const,
  },
  {
    title: "Cost Breakdown",
    description:
      "Track spending over time: today, this week, this month, all time. Spot trends and control your budget.",
    accent: "orange" as const,
    size: "large" as const,
  },
  {
    title: "Agent Autonomy",
    description:
      "Measure how independently Claude Code operates without hand-holding. See how often it self-corrects, how many tools it leverages, and how efficiently it ships commits.",
    accent: "teal" as const,
    size: "large" as const,
  },
  {
    title: "Zero Config",
    description:
      "One command. No setup. No API keys. Just run npx claude-roi in any git repo where you've used Claude Code.",
    accent: "teal" as const,
    size: "small" as const,
  },
  {
    title: "Privacy First",
    description:
      "All data stays on your machine. Zero telemetry. Zero cloud. Reads only local session files and git history.",
    accent: "blue" as const,
    size: "small" as const,
  },
];

export const STEPS = [
  {
    number: "01",
    title: "Install & Run",
    description:
      "Run npx claude-roi in any git repository where you've used Claude Code. No config files, no API keys, no setup required.",
  },
  {
    number: "02",
    title: "Analyze",
    description:
      "CodelensAI reads your local Claude Code session files and correlates them with your git history using file overlap and timestamps.",
  },
  {
    number: "03",
    title: "Optimize",
    description:
      "Get an interactive dashboard with your ROI grade, cost-per-commit, line survival rate, and actionable insights to optimize spend.",
  },
];

export const INSTALL_COMMANDS = {
  npx: "npx claude-roi",
  npm: "npm install -g claude-roi",
  pnpm: "pnpm add -g claude-roi",
  yarn: "yarn global add claude-roi",
};

export const CLI_OPTIONS = [
  { flag: "--days 90", description: "Analyze last 90 days (default: 30)" },
  { flag: "--port 8080", description: "Custom port (default: 3457)" },
  { flag: "--json", description: "Output metrics as JSON to stdout" },
  { flag: "--project <name>", description: "Filter to a specific project" },
  { flag: "--refresh", description: "Force full re-parse, ignore cache" },
];
