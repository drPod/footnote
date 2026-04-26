import type { Citation, Cited } from "./types";

function isCited(node: unknown): node is Cited<unknown> {
  return (
    typeof node === "object" &&
    node !== null &&
    "value" in node &&
    "citations" in node &&
    Array.isArray((node as { citations: unknown }).citations)
  );
}

export function buildOrdinals(record: unknown): Map<string, number> {
  const order: string[] = [];
  const seen = new Set<string>();

  const walk = (node: unknown): void => {
    if (node === null || node === undefined) return;
    if (Array.isArray(node)) {
      for (const item of node) walk(item);
      return;
    }
    if (typeof node !== "object") return;
    if (isCited(node)) {
      for (const c of node.citations) {
        if (!seen.has(c.documentId)) {
          seen.add(c.documentId);
          order.push(c.documentId);
        }
      }
      if (node.value && typeof node.value === "object") walk(node.value);
      return;
    }
    for (const v of Object.values(node)) walk(v);
  };

  walk(record);
  return new Map(order.map((id, i) => [id, i + 1]));
}

export function citationsReady(
  citations: Citation[],
  extractedIds: ReadonlySet<string>
): boolean {
  return citations.every((c) => extractedIds.has(c.documentId));
}
