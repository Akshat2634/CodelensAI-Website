"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CopyButton } from "@/components/ui/CopyButton";

const PLANS = [
  { label: "Claude Pro", fee: 20 },
  { label: "Max 5×", fee: 100 },
  { label: "Max 20×", fee: 200 },
  { label: "Max 5× + Plus", fee: 120 },
  { label: "Max 5× + Plus + Copilot Pro", fee: 130 },
];

function gradeFor(costPerCommit: number): { grade: string; color: string } {
  if (costPerCommit <= 2) return { grade: "A", color: "text-accent-teal" };
  if (costPerCommit <= 4) return { grade: "B", color: "text-accent-blue" };
  if (costPerCommit <= 7) return { grade: "C", color: "text-accent-orange" };
  if (costPerCommit <= 12) return { grade: "D", color: "text-accent-orange" };
  return { grade: "F", color: "text-accent-red" };
}

export function RoiCalculator() {
  const [spend, setSpend] = useState(410);
  const [commits, setCommits] = useState(220);
  // Defaults to the three-agent combo so the demo lands on the same effective
  // cost and plan utilization the rest of the page quotes.
  const [planIdx, setPlanIdx] = useState(4);

  const plan = PLANS[planIdx];
  const apiPerCommit = spend / Math.max(commits, 1);
  const effectivePerCommit = plan.fee / Math.max(commits, 1);
  const utilization = spend / plan.fee;
  const { grade, color } = gradeFor(apiPerCommit);

  const verdict =
    utilization >= 2
      ? `You're extracting ~${utilization.toFixed(1)}× your subscription in API-equivalent value.`
      : utilization >= 1
        ? "Your plan is roughly paying for itself."
        : "Your usage is below your plan fee — a smaller plan (or pay-as-you-go) might be cheaper.";

  return (
    <section id="calculator" className="relative py-14 sm:py-20">
      <Container>
        <SectionHeading
          label="Try The Math"
          heading="What is your cost per commit?"
          subheading="Drag the sliders — this is the same effective-cost math codelens-ai runs on your real session data."
          accent="blue"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 grid max-w-4xl gap-6 rounded-2xl border border-border-subtle bg-bg-glass p-6 backdrop-blur-xl sm:p-8 md:grid-cols-2"
        >
          {/* Controls */}
          <div className="space-y-7">
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="spend" className="text-sm text-text-secondary">
                  Monthly token spend (API-equivalent)
                </label>
                <span className="font-mono text-sm font-semibold text-accent-orange">
                  ${spend}
                </span>
              </div>
              <input
                id="spend"
                type="range"
                min={10}
                max={1000}
                step={5}
                value={spend}
                onChange={(e) => setSpend(Number(e.target.value))}
                className="mt-3 w-full cursor-pointer"
                style={{ accentColor: "var(--accent-orange)" }}
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="commits" className="text-sm text-text-secondary">
                  AI-assisted commits per month
                </label>
                <span className="font-mono text-sm font-semibold text-accent-teal">
                  {commits}
                </span>
              </div>
              <input
                id="commits"
                type="range"
                min={1}
                max={500}
                step={1}
                value={commits}
                onChange={(e) => setCommits(Number(e.target.value))}
                className="mt-3 w-full cursor-pointer"
                style={{ accentColor: "var(--accent-teal)" }}
              />
            </div>

            <div>
              <span className="text-sm text-text-secondary">Your subscription</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {PLANS.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setPlanIdx(i)}
                    className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                      i === planIdx
                        ? "bg-accent-blue-dim text-accent-blue ring-1 ring-accent-blue/30"
                        : "border border-border-subtle text-text-tertiary hover:border-border-hover hover:text-text-secondary"
                    }`}
                  >
                    {p.label} · ${p.fee}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col justify-between rounded-xl border border-border-subtle bg-bg-elevated/60 p-5 sm:p-6">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="font-mono text-2xl font-bold text-text-primary sm:text-3xl">
                  ${apiPerCommit.toFixed(2)}
                </div>
                <div className="mt-1 text-[11px] leading-tight text-text-tertiary">
                  API-equiv / commit
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-accent-blue sm:text-3xl">
                  ${effectivePerCommit.toFixed(2)}
                </div>
                <div className="mt-1 text-[11px] leading-tight text-text-tertiary">
                  effective / commit
                </div>
              </div>
              <div>
                <div className={`font-mono text-2xl font-bold sm:text-3xl ${color}`}>
                  {grade}
                </div>
                <div className="mt-1 text-[11px] leading-tight text-text-tertiary">
                  ROI grade
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-track-bg px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-accent-teal" />
                <span className="font-mono text-sm font-semibold text-accent-teal">
                  {utilization.toFixed(1)}× plan utilization
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">{verdict}</p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-border-subtle px-4 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="font-mono text-xs text-accent-teal">$</span>
                <code className="truncate font-mono text-xs text-text-primary">
                  npx codelens-ai
                </code>
              </div>
              <CopyButton text="npx codelens-ai" />
            </div>
            <p className="mt-3 text-center text-[11px] text-text-tertiary">
              Get your real numbers — measured from your actual sessions and git history.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
