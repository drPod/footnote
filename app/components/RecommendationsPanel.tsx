"use client";

import { motion, AnimatePresence } from "motion/react";
import { AlertOctagon, AlertTriangle, Info } from "lucide-react";
import { useApp } from "./AppContext";
import {
  applicableRecommendations,
  severityRank,
  type RecSeverity,
} from "@/lib/recommendations";
import { CitationGroup } from "./CitationBadge";

const sevConfig: Record<
  RecSeverity,
  {
    label: string;
    Icon: typeof AlertOctagon;
    accent: string;
    chip: string;
    border: string;
  }
> = {
  urgent: {
    label: "Urgent",
    Icon: AlertOctagon,
    accent: "text-red-700",
    chip: "bg-red-50 text-red-700 ring-red-200",
    border: "border-l-red-600",
  },
  important: {
    label: "Important",
    Icon: AlertTriangle,
    accent: "text-amber-700",
    chip: "bg-amber-50 text-amber-700 ring-amber-200",
    border: "border-l-amber-500",
  },
  informational: {
    label: "Informational",
    Icon: Info,
    accent: "text-sky-700",
    chip: "bg-sky-50 text-sky-700 ring-sky-200",
    border: "border-l-sky-500",
  },
};

export function RecommendationsPanel() {
  const { extractedIds } = useApp();
  const recs = applicableRecommendations(extractedIds).sort(
    (a, b) => severityRank(a.severity) - severityRank(b.severity),
  );

  const counts = recs.reduce(
    (acc, r) => ({ ...acc, [r.severity]: (acc[r.severity] ?? 0) + 1 }),
    {} as Record<RecSeverity, number>,
  );

  return (
    <div>
      {/* Counter strip */}
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
        {(["urgent", "important", "informational"] as const).map((sev) => {
          const cfg = sevConfig[sev];
          return (
            <span
              key={sev}
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ring-1 ${cfg.chip}`}
            >
              <cfg.Icon size={11} />
              <span className="tabular-nums">
                {counts[sev] ?? 0} {cfg.label.toLowerCase()}
              </span>
            </span>
          );
        })}
        <span className="ml-auto text-[10px] uppercase tracking-wider text-zinc-500">
          rules engine · cross-document
        </span>
      </div>

      <ol className="space-y-3">
        <AnimatePresence initial={false}>
          {recs.map((r, i) => {
            const cfg = sevConfig[r.severity];
            return (
              <motion.li
                key={r.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`relative rounded-r-md border border-zinc-200 border-l-4 bg-white px-4 py-3 ${cfg.border}`}
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${cfg.chip}`}
                  >
                    <cfg.Icon size={10} />
                    {cfg.label}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    {r.category}
                  </span>
                  <span className="ml-auto font-mono text-[10px] tabular-nums text-zinc-400">
                    L.{i + 1}
                  </span>
                </div>
                <h4 className="mt-1.5 text-[14px] font-semibold leading-snug text-zinc-900">
                  {r.title}
                </h4>
                <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-[auto_minmax(0,1fr)] md:gap-x-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 md:pt-0.5">
                    Why
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-zinc-700">
                    {r.why}
                  </p>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 md:pt-0.5">
                    Action
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-zinc-900">
                    {r.action}
                  </p>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 md:pt-0.5">
                    Sources
                  </div>
                  <div>
                    <CitationGroup citations={r.citations} />
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>

      {recs.length === 0 && (
        <div className="rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center text-[12px] text-zinc-500">
          No issues flagged. Recommendations will populate as documents are ingested.
        </div>
      )}
    </div>
  );
}
