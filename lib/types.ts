export type DocumentCategory =
  | "Tax"
  | "Income"
  | "Investment"
  | "Retirement"
  | "Education"
  | "Insurance"
  | "Real Estate"
  | "Estate"
  | "Equity Comp"
  | "Meeting";

export type DocumentMeta = {
  id: string;
  filename: string;
  label: string;
  category: DocumentCategory;
  source: string;
  pages: number;
  uploadedAt: string;
};

export type Citation = {
  documentId: string;
  page: number;
  excerpt?: string;
};

export type Cited<T> = {
  value: T;
  citations: Citation[];
  alert?: string;
};

export type IngestStatus = "pending" | "extracting" | "extracted";
