"use client";

import { motion } from "framer-motion";
import { Star, Bug, GitPullRequest } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE, STATS } from "@/lib/constants";

export function OpenSourceCTA() {
  return (
    <section id="open-source" className="relative py-14 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-glass p-8 text-center backdrop-blur-xl sm:p-14"
        >
          {/* Animated gradient border overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl p-[1px]">
            <div
              className="h-full w-full rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(230,126,34,0.15), transparent 40%, transparent 60%, rgba(46,204,113,0.15))",
              }}
            />
          </div>

          {/* Background glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 h-40 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-teal/5 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              CodelensAI is free and open source.
            </h2>
            <p className="mt-3 text-base text-text-secondary sm:text-lg">
              Built by developers, for developers.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl bg-accent-teal px-6 py-3 font-medium text-bg-primary transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(46,204,113,0.25)]"
              >
                <Star className="h-4 w-4 transition-transform group-hover:rotate-[360deg] group-hover:duration-500" />
                Star on GitHub
              </a>
              <a
                href={`${SITE.github}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border-subtle px-6 py-3 text-text-secondary transition-all hover:border-border-hover hover:text-text-primary"
              >
                <Bug className="h-4 w-4" />
                Report an Issue
              </a>
              <a
                href={`${SITE.github}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border-subtle px-6 py-3 text-text-secondary transition-all hover:border-border-hover hover:text-text-primary"
              >
                <GitPullRequest className="h-4 w-4" />
                Contribute
              </a>
            </div>

            {/* Tech stats */}
            <p className="mt-8 font-mono text-xs text-text-tertiary">
              {STATS.license} Licensed · {STATS.dependencies} dependencies ·{" "}
              {STATS.unpackedSize} unpacked
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
