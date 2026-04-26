"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import documentsRaw from "@/data/documents.json";
import recordRaw from "@/data/smith-family.json";
import { buildOrdinals } from "@/lib/citations";
import type { DocumentMeta, IngestStatus } from "@/lib/types";
import { AppProvider } from "./components/AppContext";
import { FactFinder } from "./components/FactFinder";
import { EgnyteVault } from "./components/EgnyteVault";
import { DropZone } from "./components/DropZone";
import { CheckCircle2, FileText, Sparkles } from "lucide-react";

const documents = documentsRaw as DocumentMeta[];
const ordinals = buildOrdinals(recordRaw);

type Phase = "empty" | "ingesting" | "done";

const STAGGER_MS = 160;
const EXTRACT_MS = 1400;

export default function Home() {
  const [phase, setPhase] = useState<Phase>("empty");
  const [statuses, setStatuses] = useState<Record<string, IngestStatus>>(() => {
    const init: Record<string, IngestStatus> = {};
    for (const d of documents) init[d.id] = "pending";
    return init;
  });
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      for (const t of timersRef.current) clearTimeout(t);
    };
  }, []);

  const startIngest = useCallback(() => {
    setPhase("ingesting");
    documents.forEach((doc, i) => {
      const startAt = i * STAGGER_MS;
      const finishAt = startAt + EXTRACT_MS;
      timersRef.current.push(
        setTimeout(() => {
          setStatuses((prev) => ({ ...prev, [doc.id]: "extracting" }));
        }, startAt)
      );
      timersRef.current.push(
        setTimeout(() => {
          setStatuses((prev) => ({ ...prev, [doc.id]: "extracted" }));
        }, finishAt)
      );
    });
    timersRef.current.push(
      setTimeout(() => {
        setPhase("done");
      }, documents.length * STAGGER_MS + EXTRACT_MS + 80)
    );
  }, []);

  const extractedIds = useMemo(() => {
    const set = new Set<string>();
    for (const id in statuses) if (statuses[id] === "extracted") set.add(id);
    return set;
  }, [statuses]);

  const extractedCount = extractedIds.size;
  const total = documents.length;

  return (
    <AppProvider value={{ extractedIds, ordinals, documents }}>
      <div className="flex min-h-screen flex-col">
        <Header phase={phase} extractedCount={extractedCount} total={total} />

        <main className="flex flex-1 flex-col">
          <AnimatePresence mode="wait">
            {phase === "empty" ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-1 flex-col px-6 py-8 lg:px-10"
              >
                <DropZone onTrigger={startIngest} documentCount={total} />
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="grid w-full flex-1 grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8 lg:px-10"
              >
                <EgnyteVault
                  documents={documents}
                  statuses={statuses}
                  total={total}
                  extractedCount={extractedCount}
                  syncing={phase === "ingesting"}
                />

                <div className="min-w-0">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      <FileText size={12} />
                      <span>
                        Generated artifact ·{" "}
                        <span className="text-foreground">
                          Married-Couple Fact Finder
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                      <Sparkles size={11} className={phase === "ingesting" ? "text-amber-600" : "text-foreground"} />
                      <span>
                        {phase === "ingesting"
                          ? `Summarizing… ${extractedCount}/${total}`
                          : "Auto-summarized from 26 documents"}
                      </span>
                    </div>
                  </div>
                  <FactFinder />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4 text-[11px] text-muted-foreground lg:px-10">
          <span>Beechwood Wealth · Smith Family record · citations link back to source PDF + page</span>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[10px] tracking-wide text-foreground/80">Built on Memv</span>
            <a href="/compare" className="rounded-md bg-foreground px-3 py-1.5 text-[11px] font-medium text-background transition hover:opacity-90">
              Same data → 5 tools side-by-side →
            </a>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

function Header({
  phase,
  extractedCount,
  total,
}: {
  phase: Phase;
  extractedCount: number;
  total: number;
}) {
  const status =
    phase === "empty"
      ? "No documents loaded"
      : phase === "ingesting"
        ? `Extracting ${extractedCount} / ${total}…`
        : `${extractedCount} of ${total} documents extracted`;

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 px-6 py-3 backdrop-blur-sm lg:px-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h1 className="font-heading text-lg font-medium tracking-tight text-foreground">
            Smith Family
          </h1>
          <span className="hidden text-[12px] text-muted-foreground sm:inline">
            Robert &amp; Mary Smith · Bronxville, NY
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
            {phase === "done" ? (
              <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
            ) : (
              <FileText size={12} />
            )}
            <span className="tabular-nums">{status}</span>
          </div>
          <div className="hidden items-center gap-2 text-[11px] text-muted-foreground md:flex">
            <span className="text-muted-foreground/70">Advisor</span>
            <span className="text-foreground">Sarah Chen, CFP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
