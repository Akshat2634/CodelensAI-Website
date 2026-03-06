"use client";

import { motion } from "framer-motion";
import { Quote, Download, Package, Scale, Box } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useNpmStats } from "@/lib/useNpmStats";
import { SITE, STATS } from "@/lib/constants";

export function SocialProof() {
  const { version, downloads } = useNpmStats();

  const stats = [
    {
      icon: Download,
      render: () => <AnimatedCounter end={downloads} suffix="+" />,
      label: "Weekly Downloads",
    },
    {
      icon: Package,
      render: () => <>v{version}</>,
      label: "Current Version",
    },
    {
      icon: Scale,
      render: () => <>{STATS.license}</>,
      label: "Open Source License",
    },
    {
      icon: Box,
      render: () => <AnimatedCounter end={STATS.dependencies} />,
      label: "Dependencies",
    },
  ];
  return (
    <section id="testimonials" className="relative pt-8 pb-14 sm:pt-10 sm:pb-20">
      <Container>
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl rounded-2xl border-l-2 border-accent-orange bg-bg-glass p-8 backdrop-blur-xl sm:p-10"
        >
          <Quote className="absolute top-6 right-6 h-8 w-8 text-accent-orange/20" />
          <blockquote className="text-lg leading-relaxed text-text-primary sm:text-xl">
            &ldquo;I built this because I was spending hundreds on Claude Code and had no
            idea if it was worth it. CodelensAI gives you the answer in one
            command.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent-orange to-accent-teal" />
            <div>
              <div className="text-sm font-medium text-text-primary">
                {SITE.author}
              </div>
              <div className="text-xs text-text-tertiary">
                Creator of CodelensAI
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border-subtle bg-bg-glass p-5 text-center backdrop-blur-xl"
            >
              <stat.icon className="mx-auto mb-3 h-5 w-5 text-text-tertiary" />
              <div className="font-mono text-xl font-bold text-text-primary">
                {stat.render()}
              </div>
              <div className="mt-1 text-xs text-text-tertiary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
