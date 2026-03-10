# CodelensAI Website

The promotional landing page for [CodelensAI](https://github.com/Akshat2634/Codelens-AI) (`codelens-ai`) — the open-source ROI dashboard that ties your Claude Code token spend to actual git output.

> **Note:** Previously published as `claude-roi` — same tool, new name. The package was renamed to `codelens-ai` to be agent-neutral (supports Claude, Codex, Cursor, and more).

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
- Dashboard screenshot carousel with slide navigation
- Bento-grid feature cards with mini-visualizations
- Animated counters, progress bars, and heatmaps
- One-click copy-to-clipboard install commands
- Fully responsive (mobile, tablet, desktop)
- Static export — zero server runtime, deploy anywhere

## Deployment

The site is configured for static export (`output: 'export'` in `next.config.ts`). Build output goes to the `out/` directory, ready for deployment on Vercel, Netlify, GitHub Pages, or any static host.

## License

MIT
