const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usd2 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const pct = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateMonthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

export function formatCurrency(n: number, opts?: { decimals?: 0 | 2 }): string {
  return (opts?.decimals === 2 ? usd2 : usd0).format(n);
}

export function formatPercent(n: number): string {
  return pct.format(n);
}

export function formatDate(iso: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    const [y, m, d] = iso.split("-").map(Number);
    return dateMonthYear.format(new Date(Date.UTC(y, m - 1, d)));
  }
  return iso;
}

const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatInteger(n: number): string {
  return integer.format(n);
}

export function formatValue(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "number") return formatCurrency(v);
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "string") return v;
  return String(v);
}
