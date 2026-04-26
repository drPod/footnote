"use client";

import { createContext, useContext } from "react";
import type { DocumentMeta } from "@/lib/types";

type AppContextShape = {
  extractedIds: ReadonlySet<string>;
  ordinals: Map<string, number>;
  documents: DocumentMeta[];
};

const AppContext = createContext<AppContextShape | null>(null);

export function AppProvider({
  value,
  children,
}: {
  value: AppContextShape;
  children: React.ReactNode;
}) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextShape {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppContext missing — wrap with <AppProvider>");
  return ctx;
}

export function useDocument(id: string): DocumentMeta | undefined {
  const { documents } = useApp();
  return documents.find((d) => d.id === id);
}
