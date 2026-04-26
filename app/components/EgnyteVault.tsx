"use client";

import { Cloud, CloudCheck, ChevronRight, Folder } from "lucide-react";
import type { DocumentMeta, IngestStatus } from "@/lib/types";
import { DocumentCard } from "./DocumentCard";

type Props = {
  documents: DocumentMeta[];
  statuses: Record<string, IngestStatus>;
  total: number;
  extractedCount: number;
  syncing: boolean;
};

export function EgnyteVault({
  documents,
  statuses,
  total,
  extractedCount,
  syncing,
}: Props) {
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
                <CloudCheck size={11} className="text-emerald-600 dark:text-emerald-400" />
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
        <span>Files</span>
        <span className="tabular-nums">
          {extractedCount} / {total} extracted
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {documents.map((d) => (
          <DocumentCard key={d.id} doc={d} status={statuses[d.id]} />
        ))}
      </div>
    </aside>
  );
}
