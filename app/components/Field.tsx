"use client";

import { AlertTriangle } from "lucide-react";
import { useApp } from "./AppContext";
import { CitationGroup } from "./CitationBadge";
import { citationsReady } from "@/lib/citations";
import type { Cited } from "@/lib/types";
import { formatValue } from "@/lib/format";
import { motion, AnimatePresence } from "motion/react";

type FieldProps<T> = {
  label: string;
  cited?: Cited<T>;
  format?: (v: T) => string;
  emphasis?: boolean;
};

export function Field<T>({ label, cited, format, emphasis }: FieldProps<T>) {
  const { extractedIds } = useApp();
  const ready = cited ? citationsReady(cited.citations, extractedIds) : false;

  return (
    <div className="grid grid-cols-[160px_1fr] items-baseline gap-x-4 gap-y-0.5 py-1.5">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="text-sm">
        <AnimatePresence mode="wait" initial={false}>
          {ready && cited ? (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-wrap items-baseline gap-x-1 gap-y-1"
            >
              <span
                className={
                  emphasis
                    ? "font-medium tabular-nums text-foreground"
                    : "tabular-nums text-foreground"
                }
              >
                {format ? format(cited.value) : formatValue(cited.value)}
              </span>
              <CitationGroup citations={cited.citations} />
              {cited.alert && (
                <div className="mt-1 flex w-full items-start gap-1.5 rounded-md bg-amber-50 px-2 py-1.5 text-[11px] text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-900/60">
                  <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                  <span>{cited.alert}</span>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-4 w-32 max-w-full rounded bg-muted"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
