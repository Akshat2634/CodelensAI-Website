# CodelensAI Website

The promotional landing page for [CodelensAI](https://github.com/Akshat2634/Codelens-AI) (`codelens-ai`) — the open-source ROI toolkit that ties your Claude Code, OpenAI Codex, and GitHub Copilot token spend to actual git output: a local dashboard with per-agent tabs, terminal ROI reports, ccusage-style usage tables, 5-hour billing blocks, a Claude Code statusline, and an MCP server.

> **Note:** Previously published as `claude-roi` — same tool, new name. The package was renamed to `codelens-ai` when it grew beyond a single agent; it now reads Claude Code (`~/.claude/projects/`), OpenAI Codex (`~/.codex/sessions/`), and GitHub Copilot CLI (`~/.copilot/session-state/`) sessions.

**Live site**: [codelensai.dev](https://codelensai-dev.vercel.app/)

## Tech Stack

- **Next.js 16** (App Router, static export)
- **TypeScript**
- **Tailwind CSS v4** with CSS custom properties
- **Framer Motion** for animations
- **Lucide React** for icons

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production (static export)
npm run build

# Preview production build
npx serve out
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata, theme provider
│   ├── page.tsx            # Landing page composing all sections
│   └── globals.css         # Design system (CSS variables + Tailwind theme)
│
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, Dashboard, Features, HowItWorks, etc.
│   ├── ui/                 # Reusable components (Terminal, GlassCard, etc.)
│   └── ThemeProvider.tsx    # Dark/Light/System theme context
│
├── lib/
│   ├── constants.ts        # Site data, features, stats, install commands
│   ├── fonts.ts            # JetBrains Mono + Outfit font config
│   └── utils.ts            # cn() helper
│
└── public/
    └── screenshots/        # Dashboard screenshots
```

## Features

- Dark / Light / System theme toggle
- Animated terminal with typewriter effect
- Dashboard screenshot carousel with auto-advance, keyboard, and slide navigation
- Interactive CLI toolkit explorer (report / daily / blocks / statusline / mcp tabs)
- Interactive ROI calculator with live effective-cost math
- Bento-grid feature cards with mini-visualizations
- FAQ accordion with matching FAQPage JSON-LD for rich search results
- Animated counters, progress bars, and heatmaps
- One-click copy-to-clipboard install commands
- Fully responsive (mobile, tablet, desktop)
- Static export — zero server runtime, deploy anywhere

## Deployment

The site is configured for static export (`output: 'export'` in `next.config.ts`). Build output goes to the `out/` directory, ready for deployment on Vercel, Netlify, GitHub Pages, or any static host.

## License

MIT
