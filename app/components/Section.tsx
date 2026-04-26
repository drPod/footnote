import { cn } from "@/lib/utils";

export function Section({
  title,
  caption,
  className,
  children,
}: {
  title: string;
  caption?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("scroll-mt-24", className)}>
      <header className="mb-3 flex items-baseline justify-between border-b border-border pb-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </h3>
        {caption && <span className="text-[11px] text-muted-foreground/80">{caption}</span>}
      </header>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

export function Subsection({
  title,
  children,
  trailing,
}: {
  title: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        {trailing}
      </div>
      <div>{children}</div>
    </div>
  );
}
