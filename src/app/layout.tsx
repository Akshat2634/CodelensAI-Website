import type { Metadata, Viewport } from "next";
import { outfit, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const siteUrl = "https://codelensai.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CodelensAI — ROI Dashboard for Claude Code",
    template: "%s | CodelensAI",
  },
  description:
    "Measure your AI coding ROI. CodelensAI correlates Claude Code token spend with actual git output. Get ROI grades, cost-per-commit, and line survival metrics. One command: npx claude-roi.",
  keywords: [
    "Claude Code",
    "Claude Code ROI",
    "AI coding ROI",
    "token analytics",
    "developer tools",
    "productivity dashboard",
    "cost tracking",
    "claude-roi",
    "npx claude-roi",
    "AI spend tracker",
    "code cost analysis",
    "Claude token usage",
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
    title: "CodelensAI — Are you getting ROI from Claude Code?",
    description:
      "The open-source CLI dashboard that ties your Claude Code token spend to actual git output. One command: npx claude-roi.",
    siteName: "CodelensAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodelensAI — ROI Dashboard for Claude Code. Stop guessing. Start measuring.",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodelensAI — ROI Dashboard for Claude Code",
    description:
      "One command to measure your AI coding ROI: npx claude-roi",
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
  alternateName: "claude-roi",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, Windows",
  description:
    "Open-source CLI dashboard that measures your AI coding ROI by correlating Claude Code token spend with actual git output.",
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
  downloadUrl: "https://www.npmjs.com/package/claude-roi",
  softwareVersion: "0.5.0",
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
      </body>
    </html>
  );
}
