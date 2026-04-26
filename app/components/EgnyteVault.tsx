"use client";

import { useState, useMemo } from "react";
import {
  Cloud,
  CloudCheck,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { DocumentMeta, IngestStatus, DocumentCategory } from "@/lib/types";
import { DocumentCard } from "./DocumentCard";

type Props = {
  documents: DocumentMeta[];
  statuses: Record<string, IngestStatus>;
  total: number;
  extractedCount: number;
  syncing: boolean;
};

// Display order — most-referenced surfaces in advisor workflows first
const FOLDER_ORDER: DocumentCategory[] = [
  "Tax",
  "Income",
  "Investment",
  "Retirement",
  "Equity Comp",
  "Insurance",
  "Real Estate",
  "Estate",
  "Education",
  "Meeting",
];

const FOLDER_LABEL: Record<DocumentCategory, string> = {
  Tax: "Tax Returns",
  Income: "Income · W-2 / K-1",
  Investment: "Investment Accounts",
  Retirement: "Retirement Accounts",
  "Equity Comp": "Equity Compensation",
  Insurance: "Insurance Policies",
  "Real Estate": "Real Estate",
  Estate: "Estate Documents",
  Education: "Education Funding",
  Meeting: "Meeting Transcripts",
};

export function EgnyteVault({
  documents,
  statuses,
  total,
  extractedCount,
  syncing,
}: Props) {
  const grouped = useMemo(() => {
    const buckets = new Map<DocumentCategory, DocumentMeta[]>();
    for (const cat of FOLDER_ORDER) buckets.set(cat, []);
    for (const d of documents) {
      const list = buckets.get(d.category);
      if (list) list.push(d);
    }
    return buckets;
  }, [documents]);

  const [collapsed, setCollapsed] = useState<Set<DocumentCategory>>(new Set());

  const toggle = (cat: DocumentCategory) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });

  const allExtracted = extractedCount === total;

  return (
    <aside className="flex flex-col gap-3 lg:sticky lg:top-[64px] lg:max-h-[calc(100vh-80px)] lg:overflow-y-auto lg:pr-1">
      {/* Egnyte header */}
      <div className="rounded-lg border border-border bg-card px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#00b4a0]/15 text-[#00b4a0]">
              <Cloud size={12} strokeWidth={2.4} />
            </div>
            <span className="text-[11px] font-semibold tracking-tight text-foreground">
              Egnyte
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            {syncing ? (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                </span>
                <span>Syncing</span>
              </>
            ) : (
              <>
                <CloudCheck
                  size={11}
                  className="text-emerald-600 dark:text-emerald-400"
                />
                <span>Synced</span>
              </>
            )}
          </div>
        </div>
        <nav className="mt-2 flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[11px] text-muted-foreground">
          <Folder size={10} />
          <span>Beechwood</span>
          <ChevronRight size={10} className="text-muted-foreground/60" />
          <span>Clients</span>
          <ChevronRight size={10} className="text-muted-foreground/60" />
          <span className="text-foreground">Smith, Robert &amp; Mary</span>
          <ChevronRight size={10} className="text-muted-foreground/60" />
          <span>Documents</span>
        </nav>
      </div>

      <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        <span>Folders</span>
        <span className="tabular-nums">
          {extractedCount} / {total} extracted
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {FOLDER_ORDER.map((cat) => {
          const docs = grouped.get(cat) ?? [];
          if (docs.length === 0) return null;
          const folderExtracted = docs.filter(
            (d) => statuses[d.id] === "extracted",
          ).length;
          const folderExtracting = docs.some(
            (d) => statuses[d.id] === "extracting",
          );
          const isCollapsed = collapsed.has(cat);
          const isComplete = folderExtracted === docs.length;

          return (
            <div
              key={cat}
              className="overflow-hidden rounded-lg border border-border bg-card/40"
            >
              <button
                type="button"
                onClick={() => toggle(cat)}
                className="flex w-full items-center gap-2 px-2.5 py-2 text-left transition-colors hover:bg-muted/40"
              >
                {isCollapsed ? (
                  <ChevronRight size={12} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={12} className="text-muted-foreground" />
                )}
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                    isComplete
                      ? "bg-foreground/[0.08] text-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCollapsed ? (
                    <Folder size={11} />
                  ) : (
                    <FolderOpen size={11} />
                  )}
                </div>
                <span className="flex-1 truncate text-[12px] font-medium text-foreground">
                  {FOLDER_LABEL[cat]}
                </span>
                <span
                  className={`shrink-0 font-mono text-[10px] tabular-nums ${
                    folderExtracting
                      ? "text-amber-600 dark:text-amber-400"
                      : isComplete
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-muted-foreground"
                  }`}
                >
                  {folderExtracted}/{docs.length}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-1.5 px-2 pb-2 pt-0.5">
                      {docs.map((d) => (
                        <DocumentCard
                          key={d.id}
                          doc={d}
                          status={statuses[d.id]}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Auto-classified footer */}
      <div
        className={`mt-1 flex items-center gap-2 rounded-md border border-dashed px-2.5 py-2 text-[10.5px] leading-snug transition-colors ${
          allExtracted
            ? "border-emerald-300 bg-emerald-50/40 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-200"
            : "border-border text-muted-foreground"
        }`}
      >
        <Sparkles size={11} className="shrink-0" />
        <span>
          {allExtracted
            ? "Auto-classified into 10 folders by document content (not filename). Re-classify on disagreement."
            : "Folders auto-organize as documents are read."}
        </span>
      </div>
    </aside>
  );
}
