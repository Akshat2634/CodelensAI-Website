import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { outfit, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const siteUrl = "https://codelensai-dev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CodelensAI — ROI Dashboard for AI Coding Agents",
    template: "%s | CodelensAI",
  },
  description:
    "Measure your AI coding ROI. CodelensAI (formerly claude-roi) correlates AI agent token spend with actual git output. Get ROI grades, cost-per-commit, and line survival metrics. One command: npx codelens-ai.",
  keywords: [
    "AI coding agent",
    "AI agent ROI",
    "Claude Code",
    "AI coding ROI",
    "token analytics",
    "developer tools",
    "productivity dashboard",
    "cost tracking",
    "codelens-ai",
    "npx codelens-ai",
    "claude-roi",
    "npx claude-roi",
    "claude-roi alternative",
    "claude-roi renamed",
    "AI spend tracker",
    "code cost analysis",
    "Claude token usage",
    "Codex ROI",
    "Cursor ROI",
    "open source CLI",
    "developer productivity",
  ],
  authors: [{ name: "Akshat Sahu", url: "https://github.com/Akshat2634" }],
  creator: "Akshat Sahu",
  publisher: "CodelensAI",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "CodelensAI — Are you getting ROI from your AI coding agent?",
    description:
      "The open-source CLI dashboard that ties your AI agent token spend to actual git output. One command: npx codelens-ai.",
    siteName: "CodelensAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodelensAI — ROI Dashboard for AI Coding Agents. Stop guessing. Start measuring.",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodelensAI — ROI Dashboard for AI Coding Agents",
    description:
      "One command to measure your AI coding ROI: npx codelens-ai",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Developer Tools",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06080F" },
    { media: "(prefers-color-scheme: light)", color: "#f8f9fc" },
  ],
};

// Inline script to prevent flash of wrong theme on page load
const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      var resolved = t === 'light' ? 'light' : t === 'dark' ? 'dark' :
        window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      document.documentElement.classList.add(resolved);
    } catch(e) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

// JSON-LD structured data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CodelensAI",
  alternateName: ["claude-roi", "npx claude-roi", "npx codelens-ai"],
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, Windows",
  description:
    "Open-source CLI dashboard (formerly claude-roi) that measures your AI coding ROI by correlating AI agent token spend with actual git output. Supports Claude Code, Codex, Cursor, and more.",
  url: siteUrl,
  author: {
    "@type": "Person",
    name: "Akshat Sahu",
    url: "https://github.com/Akshat2634",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  license: "https://opensource.org/licenses/MIT",
  codeRepository: "https://github.com/Akshat2634/Codelens-AI",
  downloadUrl: "https://www.npmjs.com/package/codelens-ai",
  softwareVersion: "0.8.5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
