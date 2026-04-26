"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useApp, useDocument } from "./AppContext";
import type { Citation } from "@/lib/types";

export function CitationBadge({ citation }: { citation: Citation }) {
  const { ordinals } = useApp();
  const doc = useDocument(citation.documentId);
  const n = ordinals.get(citation.documentId) ?? "?";

  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <button
            type="button"
            className="ml-1 inline-flex h-[18px] min-w-[22px] items-center justify-center rounded-md bg-muted px-1 align-[2px] text-[10px] font-medium tabular-nums text-muted-foreground ring-1 ring-border transition-colors hover:bg-foreground hover:text-background hover:ring-foreground"
          />
        }
      >
        [{n}]
      </HoverCardTrigger>
      <HoverCardContent side="top" className="w-80">
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-foreground">{doc?.label ?? citation.documentId}</span>
            <span className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground">
              p.{citation.page}
            </span>
          </div>
          <div className="font-mono text-[11px] text-muted-foreground/80 break-all">
            {doc?.filename}
          </div>
          {citation.excerpt && (
            <blockquote className="border-l-2 border-foreground/20 pl-2 text-muted-foreground italic">
              {citation.excerpt}
            </blockquote>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function CitationGroup({ citations }: { citations: Citation[] }) {
  if (!citations?.length) return null;
  const byDoc = new Map<string, Citation>();
  for (const c of citations) {
    if (!byDoc.has(c.documentId)) byDoc.set(c.documentId, c);
  }
  const unique = Array.from(byDoc.values());
  return (
    <span className="inline-flex flex-wrap items-baseline gap-0.5">
      {unique.map((c, i) => (
        <CitationBadge key={`${c.documentId}-${i}`} citation={c} />
      ))}
    </span>
  );
}
