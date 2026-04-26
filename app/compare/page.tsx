"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SCENARIOS, TOOLS, type Tool, type ContextCard, type ToolOutput } from "./scenarios";
import { FileText, Sparkles, AlertTriangle, Mail, ClipboardList, EyeOff } from "lucide-react";

type Phase = "idle" | "assembling" | "generating" | "complete";

export default function ComparePage() {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealedToolIdx, setRevealedToolIdx] = useState(0);
  const [reactiveDocAdded, setReactiveDocAdded] = useState(false);

  const scenario = useMemo(
    () => SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0],
    [scenarioId]
  );

  const reset = useCallback(() => {
    setPhase("idle");
    setRevealedToolIdx(0);
    setReactiveDocAdded(false);
  }, []);

  useEffect(() => {
    reset();
  }, [scenarioId, reset]);

  const runAll = useCallback(() => {
    setPhase("assembling");
    setRevealedToolIdx(0);
    // Cards animate in via CSS — phase advances on a timer
    const t1 = setTimeout(() => setPhase("generating"), 1400);
    const t2 = setTimeout(() => setPhase("complete"), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const triggerReactive = useCallback(() => {
    setReactiveDocAdded(true);
    setPhase("assembling");
    const t1 = setTimeout(() => setPhase("generating"), 800);
    const t2 = setTimeout(() => setPhase("complete"), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header
        scenarioId={scenarioId}
        onScenarioChange={setScenarioId}
        phase={phase}
        onRun={runAll}
        onReset={reset}
      />

      <main className="flex flex-1 flex-col px-6 py-6 lg:px-10">
        <ScenarioHeader scenario={scenario} />

        <div className="mt-6 grid grid-cols-5 gap-4">
          {TOOLS.map((tool, idx) => (
            <ToolColumn
              key={tool.id}
              tool={tool}
              output={scenario.outputs[tool.id]}
              phase={phase}
              isOurs={tool.id === "ours"}
              reactiveDocAdded={reactiveDocAdded && tool.id === "ours"}
              revealedToolIdx={revealedToolIdx}
              colIdx={idx}
              scenarioId={scenarioId}
            />
          ))}
        </div>

        {phase === "complete" && !reactiveDocAdded && (
          <ReactiveDropZone onTrigger={triggerReactive} />
        )}

        {reactiveDocAdded && phase === "complete" && (
          <ReactiveResult />
        )}
      </main>

      <footer className="border-t border-border px-6 py-4 text-[11px] text-muted-foreground lg:px-10">
        Same data sources. Different processing layer. · Built on Memv · Cache Hackathon 2026
      </footer>
    </div>
  );
}

function Header({
  scenarioId,
  onScenarioChange,
  phase,
  onRun,
  onReset,
}: {
  scenarioId: string;
  onScenarioChange: (id: string) => void;
  phase: Phase;
  onRun: () => void;
  onReset: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 px-6 py-3 backdrop-blur-sm lg:px-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h1 className="font-heading text-lg font-medium tracking-tight text-foreground">
            Footnote — Side-by-Side
          </h1>
          <span className="hidden text-[12px] text-muted-foreground sm:inline">
            Smith Family · Sarah Chen, CFP · Beechwood Wealth
          </span>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={scenarioId}
            onChange={(e) => onScenarioChange(e.target.value)}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-[12px] text-foreground"
          >
            {SCENARIOS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          {phase === "idle" ? (
            <button
              onClick={onRun}
              className="rounded-md bg-foreground px-4 py-1.5 text-[12px] font-medium text-background transition hover:opacity-90"
            >
              ▶ Run all 5 tools
            </button>
          ) : (
            <button
              onClick={onReset}
              className="rounded-md border border-border px-4 py-1.5 text-[12px] text-foreground transition hover:bg-muted"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function ScenarioHeader({ scenario }: { scenario: (typeof SCENARIOS)[0] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h2 className="text-xl font-medium tracking-tight">{scenario.title}</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">{scenario.context}</p>
          <p className="mt-2 text-[12px] text-foreground/80">{scenario.trigger}</p>
        </div>
        <div className="text-right">
          <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Same task across 5 tools
          </div>
          <div className="text-[11px] text-muted-foreground">
            same client · same data sources · different processing
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolColumn({
  tool,
  output,
  phase,
  isOurs,
  reactiveDocAdded,
  colIdx,
}: {
  tool: { id: Tool; label: string; tagline: string };
  output: ToolOutput;
  phase: Phase;
  isOurs: boolean;
  reactiveDocAdded: boolean;
  revealedToolIdx: number;
  colIdx: number;
  scenarioId: string;
}) {
  const showCards = phase !== "idle";
  const showOutput = phase === "complete";

  return (
    <div
      className={`flex flex-col rounded-lg border ${
        isOurs ? "border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/10" : "border-border bg-card"
      } overflow-hidden`}
    >
      <div className={`border-b ${isOurs ? "border-emerald-500/30 bg-emerald-100/50 dark:bg-emerald-900/20" : "border-border bg-muted/40"} px-3 py-2`}>
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[12px] font-medium ${isOurs ? "text-emerald-700 dark:text-emerald-400" : "text-foreground"}`}>
            {tool.label}
          </span>
          {isOurs && <Sparkles size={11} className="text-emerald-600 dark:text-emerald-400" />}
        </div>
        <div className="mt-0.5 truncate text-[10px] text-muted-foreground">{tool.tagline}</div>
      </div>

      {/* Context fed section */}
      <div className="border-b border-border px-3 py-2.5">
        <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          <FileText size={10} />
          <span>Context fed to LLM</span>
        </div>
        <div className="space-y-1">
          <AnimatePresence>
            {showCards &&
              output.contextCards.map((card, i) => (
                <ContextCardItem key={i} card={card} delay={colIdx * 0.06 + i * 0.05} />
              ))}
          </AnimatePresence>
          {!showCards && (
            <div className="text-[10px] text-muted-foreground/50 italic">waiting…</div>
          )}
        </div>
        {showCards && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-[10px] text-muted-foreground"
          >
            {output.contextCards.filter((c) => !c.notInContext).length} sources fed ·{" "}
            {output.contextCards.filter((c) => c.notInContext).length} ignored
          </motion.div>
        )}
      </div>

      {/* Reactive doc indicator */}
      {reactiveDocAdded && isOurs && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-emerald-500/30 bg-emerald-100/50 px-3 py-1.5 text-[10px] text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
        >
          + new doc retrieved → output regenerated
        </motion.div>
      )}

      {/* Output section */}
      <div className="flex-1 p-3">
        <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <FormatIcon format={output.outputFormat} />
            <span>Generated output</span>
          </span>
          {showOutput && (
            <span className="font-mono text-foreground/60 normal-case tracking-normal">
              {output.stats.words}w · {output.stats.citations}c
            </span>
          )}
        </div>
        {showOutput ? (
          <OutputBody output={output} isOurs={isOurs} />
        ) : phase === "generating" ? (
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-foreground" />
            <span>generating…</span>
          </div>
        ) : (
          <div className="text-[10px] text-muted-foreground/50 italic">awaiting context…</div>
        )}
      </div>
    </div>
  );
}

function ContextCardItem({ card, delay }: { card: ContextCard; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.18 }}
      className={`flex items-start gap-1.5 rounded border px-2 py-1 text-[10px] ${
        card.notInContext
          ? "border-dashed border-muted-foreground/30 bg-muted/30 text-muted-foreground/60 line-through"
          : "border-border bg-card text-foreground"
      }`}
    >
      {card.notInContext ? (
        <EyeOff size={9} className="mt-0.5 flex-shrink-0" />
      ) : (
        <FileText size={9} className="mt-0.5 flex-shrink-0 text-foreground/60" />
      )}
      <div className="min-w-0">
        <div className="truncate font-mono">{card.source}</div>
        {card.detail && (
          <div className={`truncate text-[9px] ${card.notInContext ? "" : "text-muted-foreground"}`}>
            {card.detail}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function OutputBody({ output, isOurs }: { output: ToolOutput; isOurs: boolean }) {
  if (output.outputFormat === "silent") {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded border border-dashed border-muted-foreground/30 px-3 py-6 text-center">
        <EyeOff size={16} className="text-muted-foreground/50" />
        <p className="text-[11px] italic text-muted-foreground">{output.output}</p>
      </div>
    );
  }

  // Render output text with citation highlights for OURS
  const text = output.output;
  if (isOurs && output.citations) {
    const parts = text.split(/(\[\d+\])/g);
    return (
      <div className="whitespace-pre-wrap text-[11px] leading-relaxed text-foreground/90">
        {parts.map((part, i) => {
          const m = /^\[(\d+)\]$/.exec(part);
          if (m) {
            const id = parseInt(m[1], 10);
            const cite = output.citations!.find((c) => c.id === id);
            return (
              <span
                key={i}
                title={cite ? `${cite.source} ${cite.page}` : ""}
                className="inline-flex translate-y-[-1px] items-center rounded bg-emerald-500/20 px-1 text-[9px] font-medium text-emerald-700 dark:text-emerald-400"
              >
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  }

  return (
    <div className="whitespace-pre-wrap text-[11px] leading-relaxed text-foreground/80">
      {text}
    </div>
  );
}

function FormatIcon({ format }: { format: ToolOutput["outputFormat"] }) {
  const size = 10;
  switch (format) {
    case "email":
      return <Mail size={size} />;
    case "alert":
      return <AlertTriangle size={size} />;
    case "task":
      return <ClipboardList size={size} />;
    case "memo":
      return <FileText size={size} />;
    case "silent":
      return <EyeOff size={size} />;
  }
}

function ReactiveDropZone({ onTrigger }: { onTrigger: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-6 flex items-center justify-between rounded-lg border-2 border-dashed border-emerald-500/40 bg-emerald-50/30 px-5 py-4 dark:bg-emerald-950/10"
    >
      <div>
        <div className="text-[11px] uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
          Reactive moment
        </div>
        <div className="mt-1 text-[13px] text-foreground">
          Client just emailed an updated RSU grant amendment. Drag onto vault → watch retrieval re-run.
        </div>
      </div>
      <button
        onClick={onTrigger}
        className="rounded-md bg-emerald-600 px-4 py-1.5 text-[12px] font-medium text-white transition hover:bg-emerald-700"
      >
        + Add new document
      </button>
    </motion.div>
  );
}

function ReactiveResult() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-6 rounded-lg border border-emerald-500/40 bg-emerald-50/30 px-5 py-4 dark:bg-emerald-950/10"
    >
      <div className="text-[11px] uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
        Reactive update complete
      </div>
      <p className="mt-1 text-[13px] text-foreground">
        New <span className="font-mono">rsu_grant_amendment_2026_04.pdf</span> retrieved into the OURS context. Output rewrote in place. Other 4 tools: context unchanged, output unchanged. <strong>Same data arrived for all 5. Only one product reacted.</strong>
      </p>
    </motion.div>
  );
}
