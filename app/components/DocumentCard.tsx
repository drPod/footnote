"use client";

import { Check, FileText, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import type { DocumentMeta, IngestStatus } from "@/lib/types";
import { useApp } from "./AppContext";
import { cn } from "@/lib/utils";

type Props = {
  doc: DocumentMeta;
  status: IngestStatus;
  layoutId?: string;
};

export function DocumentCard({ doc, status, layoutId }: Props) {
  const { ordinals } = useApp();
  const ord = ordinals.get(doc.id);

  return (
    <motion.div
      layout
      layoutId={layoutId}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.22,
        ease: "easeOut",
        layout: { duration: 0.55, ease: [0.16, 0.85, 0.36, 1] },
      }}
      className={cn(
        "group flex items-start gap-3 rounded-lg border bg-card p-2.5 transition-all",
        status === "pending" && "border-border opacity-60",
        status === "extracting" &&
          "border-amber-300 bg-amber-50/40 ring-1 ring-amber-200/70 dark:border-amber-900/60 dark:bg-amber-950/20",
        status === "extracted" && "border-border",
      )}
    >
      <div
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md ring-1 transition-colors",
          status === "pending" && "bg-muted text-muted-foreground/70 ring-border",
          status === "extracting" && "bg-muted text-foreground ring-foreground/20",
          status === "extracted" && "bg-foreground text-background ring-foreground"
        )}
      >
        {status === "extracting" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : status === "extracted" ? (
          <Check size={16} strokeWidth={2.4} />
        ) : (
          <FileText size={16} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {status === "extracted" && ord !== undefined && (
            <span className="rounded-sm bg-foreground/10 px-1 text-[10px] font-medium tabular-nums text-foreground">
              [{ord}]
            </span>
          )}
          <div className="truncate text-[13px] font-medium leading-tight text-foreground">
            {doc.label}
          </div>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span>{doc.source}</span>
          <span aria-hidden="true">·</span>
          <span>{doc.category}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {doc.pages}p
          </span>
        </div>
        {status === "extracting" && (
          <div className="relative mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 w-1/2 bg-foreground/40"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
