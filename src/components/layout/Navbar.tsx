"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SITE } from "@/lib/constants";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Install", href: "#install" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border-subtle bg-bg-glass backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex gap-[3px] items-end">
              <div className="w-[3px] h-3 rounded-sm bg-accent-orange" />
              <div className="w-[3px] h-5 rounded-sm bg-accent-teal" />
              <div className="w-[3px] h-4 rounded-sm bg-accent-blue" />
            </div>
            <span className="font-mono text-lg font-bold text-text-primary">
              {SITE.name}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-accent-teal transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-border-subtle px-3 py-1.5 text-sm text-text-secondary transition-all hover:border-border-hover hover:text-text-primary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="#install"
              className="flex items-center gap-1.5 rounded-lg bg-accent-teal px-4 py-1.5 font-mono text-xs font-medium text-bg-primary transition-all hover:brightness-110"
            >
              npx codelens-ai
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-text-secondary md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border-subtle bg-bg-glass backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <ThemeToggle />
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-border-subtle px-3 py-2 text-sm text-text-secondary"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="#install"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 rounded-lg bg-accent-teal px-4 py-2 font-mono text-xs font-medium text-bg-primary"
                >
                  npx codelens-ai
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
