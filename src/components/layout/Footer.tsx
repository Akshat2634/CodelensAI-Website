import { Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Install", href: "#install" },
  { label: "CLI Options", href: "#install" },
];

const resourceLinks = [
  { label: "GitHub", href: SITE.github },
  { label: "npm", href: SITE.npm },
  { label: "MIT License", href: `${SITE.github}/blob/main/LICENSE` },
  { label: "Contributing", href: `${SITE.github}/blob/main/CONTRIBUTING.md` },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-[3px] items-end">
                <div className="w-[3px] h-3 rounded-sm bg-accent-orange" />
                <div className="w-[3px] h-5 rounded-sm bg-accent-teal" />
                <div className="w-[3px] h-4 rounded-sm bg-accent-blue" />
              </div>
              <span className="font-mono text-lg font-bold text-text-primary">
                {SITE.name}
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
              {SITE.tagline}. Measure your AI coding ROI with a single
              command.
            </p>
            <p className="mt-2 font-mono text-[11px] text-text-tertiary">
              Previously <span className="text-accent-teal">claude-roi</span> — same tool, new name
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Product
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-xs text-text-tertiary">
            Built with care by{" "}
            <a
              href="https://www.linkedin.com/in/akshat2634/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-secondary transition-colors hover:text-accent-blue"
            >
              {SITE.author}
              <Linkedin className="inline h-3 w-3" />
            </a>
          </p>
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
