"use client";

import { useCallback, useState, type DragEvent } from "react";
import { ArrowDownToLine, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onTrigger: () => void;
  documentCount: number;
};

export function DropZone({ onTrigger, documentCount }: Props) {
  const [hover, setHover] = useState(false);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHover(true);
  }, []);
  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHover(false);
  }, []);
  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setHover(false);
      onTrigger();
    },
    [onTrigger]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-card p-12 text-center transition-all",
        hover ? "border-foreground bg-foreground/[0.02]" : "border-border"
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border">
        <ArrowDownToLine size={22} />
      </div>
      <h2 className="mt-5 text-2xl font-medium text-foreground">
        Drop client documents to begin
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Tax returns, brokerage statements, insurance policies, estate documents, RSU agreements.
        We extract structured fields and link every value back to the source document.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button onClick={onTrigger} size="default" className="gap-2">
          <FolderOpen size={15} />
          Load Smith family vault ({documentCount} docs)
        </Button>
        <span className="text-xs text-muted-foreground">or drag PDFs here</span>
      </div>
      <p className="mt-8 max-w-md text-[11px] text-muted-foreground/70">
        Demo data. Extraction is pre-computed against the Smith family fixture — every populated
        value is verifiable against the source PDF and page number it cites.
      </p>
    </div>
  );
}
