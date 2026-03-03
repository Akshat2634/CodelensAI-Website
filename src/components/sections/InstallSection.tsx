"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { CopyButton } from "@/components/ui/CopyButton";
import { INSTALL_COMMANDS, CLI_OPTIONS } from "@/lib/constants";

const altInstalls = [
  { label: "npm", command: INSTALL_COMMANDS.npm },
  { label: "pnpm", command: INSTALL_COMMANDS.pnpm },
  { label: "yarn", command: INSTALL_COMMANDS.yarn },
];

export function InstallSection() {
  return (
    <section id="install" className="relative py-14 sm:py-20">
      <Container>
        <SectionHeading
          label="Get Started"
          heading="Up and running in seconds"
          subheading="One command. No config files. No API keys. No setup."
          accent="teal"
        />

        <div className="mt-14 mx-auto max-w-2xl">
          {/* Primary install command */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TerminalWindow title="~ terminal">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <span className="text-accent-teal">$</span>
                  <span className="ml-2 text-text-primary">
                    {INSTALL_COMMANDS.npx}
                  </span>
                  <span className="ml-0.5 inline-block h-[1.1em] w-[2px] bg-accent-teal animate-blink" />
                </div>
                <CopyButton text={INSTALL_COMMANDS.npx} />
              </div>
            </TerminalWindow>

            {/* Glow */}
            <div className="mx-auto -mt-4 h-8 w-3/4 rounded-full bg-accent-teal/5 blur-2xl" />
          </motion.div>

          {/* Alternative installs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <p className="mb-3 text-center text-xs text-text-tertiary">
              Or install globally:
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {altInstalls.map((install) => (
                <div
                  key={install.label}
                  className="flex items-center justify-between rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3"
                >
                  <div>
                    <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
                      {install.label}
                    </span>
                    <span className="font-mono text-xs text-text-secondary">
                      {install.command}
                    </span>
                  </div>
                  <CopyButton text={install.command} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* CLI Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 rounded-xl border border-border-subtle bg-bg-glass p-5 backdrop-blur-xl sm:p-6"
          >
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-text-tertiary">
              CLI Options
            </h3>
            <div className="space-y-2.5">
              {CLI_OPTIONS.map((opt) => (
                <div
                  key={opt.flag}
                  className="flex items-start gap-4"
                >
                  <code className="shrink-0 font-mono text-xs text-accent-teal">
                    {opt.flag}
                  </code>
                  <span className="text-xs text-text-secondary">
                    {opt.description}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
