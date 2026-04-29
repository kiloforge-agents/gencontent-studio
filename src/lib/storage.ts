import type { GenerateOutput, ContentKind } from "./generator";

const KEY = "gcs.drafts.v1";

export type Draft = GenerateOutput & {
  id: string;
  topic: string;
  language?: string;
  createdAt: number;
  updatedAt: number;
};

function readAll(): Draft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(drafts: Draft[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(drafts));
}

export function listDrafts(): Draft[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getDraft(id: string): Draft | undefined {
  return readAll().find((d) => d.id === id);
}

export function saveDraft(input: {
  output: GenerateOutput;
  topic: string;
  language?: string;
}): Draft {
  const all = readAll();
  const id = cryptoRandomId();
  const now = Date.now();
  const draft: Draft = {
    ...input.output,
    id,
    topic: input.topic,
    language: input.language,
    createdAt: now,
    updatedAt: now,
  };
  writeAll([draft, ...all]);
  return draft;
}

export function updateDraftBody(id: string, body: string): Draft | undefined {
  const all = readAll();
  const idx = all.findIndex((d) => d.id === id);
  if (idx === -1) return undefined;
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const updated: Draft = {
    ...all[idx],
    body,
    meta: {
      ...all[idx].meta,
      wordCount,
      charCount: body.length,
      readingMinutes: Math.max(1, Math.round(wordCount / 220)),
    },
    updatedAt: Date.now(),
  };
  all[idx] = updated;
  writeAll(all);
  return updated;
}

export function deleteDraft(id: string): void {
  const all = readAll().filter((d) => d.id !== id);
  writeAll(all);
}

export function clearDrafts(): void {
  writeAll([]);
}

export function kindLabel(kind: ContentKind): string {
  switch (kind) {
    case "blog": return "Blog post";
    case "twitter": return "X / Twitter thread";
    case "linkedin": return "LinkedIn post";
    case "instagram": return "Instagram caption";
    case "code": return "Code snippet";
  }
}

function cryptoRandomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
