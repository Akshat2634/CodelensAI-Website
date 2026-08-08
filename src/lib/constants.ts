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
    "Measure your AI coding ROI. CodelensAI correlates Claude Code, OpenAI Codex, and GitHub Copilot token spend with actual git output — dashboard, terminal reports, billing blocks, statusline, and an MCP server. One command: npx codelens-ai.",
  url: "https://codelensai-dev.vercel.app",
  github: "https://github.com/Akshat2634/Codelens-AI",
  npm: "https://www.npmjs.com/package/codelens-ai",
  author: "Akshat Sahu",
};

export const STATS = {
  weeklyDownloads: "1,500+",
  version: "0.9.13",
  license: "MIT",
  dependencies: 4,
  releases: 35,
  lineSurvivalRate: 90,
  costPerCommit: 1.87,
  aiCodeShare: 64,
  valueLeakPct: 7,
  tokenEfficiency: 98,
  commitsShipped: 219,
  planUtilization: 3.2,
  overallGrade: "A",
};

// Combined "All Agents" totals — must stay the sum of AGENTS below.
export const COMBINED = {
  spend: "$409.75",
  commits: STATS.commitsShipped,
  costPerCommit: `$${STATS.costPerCommit.toFixed(2)}`,
};

// Supported coding agents — read straight from your local session files.
// Figures are illustrative of a real month analyzed with
// `--plan max5 --codex-plan plus --copilot-plan pro`.
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
  {
    name: "GitHub Copilot",
    models: "Claude · GPT · Gemini",
    spend: "$58.93",
    commits: 40,
    costPerCommit: "$1.47",
    accent: "blue" as const,
    path: "~/.copilot/session-state/",
  },
];

export const FEATURES: Feature[] = [
  {
    title: "Multi-Agent Dashboard",
    description:
      "Claude Code, OpenAI Codex, and GitHub Copilot in one place. When more than one has sessions, switch between All Agents, Claude Code, OpenAI Codex, and GitHub Copilot tabs — every metric recomputes so you can compare them side by side.",
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
    title: "AI Code Share",
    description:
      "What percentage of all merged lines this window did the AI actually write? Measured from git history — not surveys, not vibes.",
    accent: "teal" as const,
    size: "small" as const,
    isNew: true,
  },
  {
    title: "Value Leak",
    description:
      "The dollars and percent of spend that never became committed code. Find the sessions burning tokens without shipping anything.",
    accent: "red" as const,
    size: "small" as const,
    isNew: true,
  },
  {
    title: "Model Comparison",
    description:
      "Compare cost and efficiency across Opus, Sonnet, Haiku, GPT-5.x Codex, Gemini, and Copilot-only models. New model IDs are auto-priced from LiteLLM's public price map — no code change needed.",
    accent: "blue" as const,
    size: "large" as const,
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
      "On a flat plan? Pass --plan / --codex-plan / --copilot-plan to reframe spend against the fee you actually pay: effective $/commit, $/surviving line, and how many times over you've earned back your subscription.",
    accent: "blue" as const,
    size: "small" as const,
  },
  {
    title: "Attribution & Coverage",
    description:
      "Every commit gets a high / medium / low confidence score from file overlap and timing — and Co-authored-by agent trailers confirm attribution as near-ground-truth. Auditable, not a black box.",
    accent: "orange" as const,
    size: "small" as const,
  },
  {
    title: "Productivity Heatmap",
    description:
      "A GitHub-style hour-by-day grid of when your AI-assisted commits land. Discover your most productive coding hours.",
    accent: "teal" as const,
    size: "small" as const,
  },
  {
    title: "Agent Autonomy",
    description:
      "An A–F autonomy grade blending autopilot ratio (actions per prompt), self-heal score (test/lint usage), toolbelt coverage, and commit velocity. See how independently your agent really works.",
    accent: "teal" as const,
    size: "large" as const,
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
      "Spot orphaned sessions — 10+ messages that produced zero commits — plus per-repo project ROI and a sortable table of every session with its matched commits.",
    accent: "red" as const,
    size: "small" as const,
  },
  {
    title: "Reports & Statusline",
    description:
      "codelens-ai report prints an ROI scorecard — or exports a self-contained Markdown/HTML one-pager. Add the live statusline to Claude Code for an always-on ROI HUD.",
    accent: "orange" as const,
    size: "small" as const,
    isNew: true,
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
      "Run npx codelens-ai in any git repo where you've used Claude Code, OpenAI Codex, or GitHub Copilot CLI. No config files, no API keys, no setup required.",
  },
  {
    number: "02",
    title: "Analyze",
    description:
      "CodelensAI reads your local Claude Code, Codex, and Copilot CLI session files and correlates them with your git history by file overlap, timing, and Co-authored-by trailers — every commit is attributed to at most one session, across all agents.",
  },
  {
    number: "03",
    title: "Optimize",
    description:
      "Get an interactive dashboard with per-agent tabs, ROI grade, cost-per-commit, AI code share, value leak, and effective cost vs your plan — the insights to cut wasted spend.",
  },
];

export const INSTALL_COMMANDS = {
  npx: "npx codelens-ai",
  npm: "npm install -g codelens-ai",
  pnpm: "pnpm add -g codelens-ai",
  yarn: "yarn global add codelens-ai",
};

export const POWER_COMMANDS = [
  {
    command: "npx codelens-ai statusline --install",
    description: "Add the live ROI statusline to Claude Code",
  },
  {
    command: "claude mcp add codelens -- npx -y codelens-ai mcp",
    description: "Let Claude query your usage & ROI in-chat via MCP",
  },
];

// Rendered in FaqSection and mirrored as FAQPage JSON-LD in layout.tsx
export const FAQS = [
  {
    q: "What is CodelensAI?",
    a: "CodelensAI is a free, open-source CLI that measures your AI coding ROI. It correlates Claude Code, OpenAI Codex, and GitHub Copilot token spend with your actual git output — commits shipped, cost per commit, AI code share, line survival — and serves a local dashboard, terminal reports, and an MCP server. One command: npx codelens-ai.",
  },
  {
    q: "How is CodelensAI different from a usage tracker like ccusage?",
    a: "Usage trackers stop at tokens and cost. CodelensAI adds the output side of the equation: it ties spend to git commits, so you get $/commit, AI code share, value leak, and line survival — plus ccusage-style daily/weekly/monthly tables, 5-hour billing blocks with burn rate, a Claude Code statusline, and an MCP server.",
  },
  {
    q: "Does my code or data leave my machine?",
    a: "No. CodelensAI is local-first with zero telemetry: it only reads your local session files and git history, and the dashboard runs on localhost. The single optional network call fetches current model pricing, and you can skip it with --offline.",
  },
  {
    q: "Which AI coding agents are supported?",
    a: "Claude Code (~/.claude/projects/), OpenAI Codex CLI (~/.codex/sessions/), and GitHub Copilot CLI (~/.copilot/session-state/). When more than one has sessions, the dashboard adds All Agents / Claude Code / OpenAI Codex / GitHub Copilot tabs so you can compare them side by side. CodelensAI was previously published as claude-roi — same tool, new name.",
  },
  {
    q: "How is GitHub Copilot usage measured?",
    a: "The standalone GitHub Copilot CLI records per-session token totals in ~/.copilot/session-state/. CodelensAI prices those from GitHub's published Copilot per-token table — Claude, GPT, Gemini, and Copilot-only models like Raptor mini and Kimi K2.7 Code — so reports stay correct even offline. Copilot bills a flat plan plus premium requests, so the dollar figures are API-equivalent value; pass --copilot-plan to see effective cost against your real fee. IDE Copilot completions aren't analyzed — only the CLI keeps a durable local token record.",
  },
  {
    q: "Can Claude answer questions about my own usage?",
    a: "Yes. Run `claude mcp add codelens -- npx -y codelens-ai mcp` and Claude can query your usage and ROI in-chat via MCP tools like roi_summary, usage, blocks, sessions, and projects.",
  },
  {
    q: "Is CodelensAI free?",
    a: "Yes — MIT licensed, free forever, and open source on GitHub. No account, no API keys, no config.",
  },
];

export const CLI_OPTIONS = [
  { flag: "--source copilot", description: "Analyze a single agent: claude | codex | copilot | all" },
  { flag: "--plan max20", description: "Claude subscription mode — effective $/commit vs your flat plan" },
  { flag: "--codex-plan plus", description: "ChatGPT/Codex subscription mode: free … pro" },
  { flag: "--copilot-plan pro", description: "GitHub Copilot subscription mode: free … enterprise" },
  { flag: "--days 90", description: "Look back 90 days (default: 30)" },
  { flag: "--project techops", description: "Filter to a specific project / repo" },
  { flag: "--offline", description: "Skip the network pricing refresh — fully offline analysis" },
  { flag: "--json", description: "Output all metrics as JSON to stdout" },
];
