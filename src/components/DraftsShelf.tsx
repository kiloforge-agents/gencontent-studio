"use client";

import { useState } from "react";
import type { Draft } from "@/lib/storage";
import { kindLabel } from "@/lib/storage";
import { NICHES } from "@/lib/niches";

type Props = {
  drafts: Draft[];
  activeId: string | null;
  onOpen: (d: Draft) => void;
  onDelete: (id: string) => void;
};

const FILTERS: { id: "all" | "blog" | "social" | "code"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "blog", label: "Blog" },
  { id: "social", label: "Social" },
  { id: "code", label: "Code" },
];

export function DraftsShelf({ drafts, activeId, onOpen, onDelete }: Props) {
  const [filter, setFilter] = useState<"all" | "blog" | "social" | "code">("all");

  const filtered = drafts.filter((d) => {
    if (filter === "all") return true;
    if (filter === "blog") return d.meta.kind === "blog";
    if (filter === "code") return d.meta.kind === "code";
    return ["twitter", "linkedin", "instagram"].includes(d.meta.kind);
  });

  return (
    <section id="drafts" className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-14">
        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
              On this device
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-2 tracking-tight">
              Your drafts shelf.
            </h2>
            <p className="text-[var(--ink-soft)] mt-1.5 text-[15px] leading-relaxed">
              {drafts.length === 0
                ? "Nothing saved yet — generate above and tap save."
                : `${drafts.length} draft${drafts.length === 1 ? "" : "s"} stored locally. Nothing leaves your device.`}
            </p>
          </div>

          <div className="ml-auto flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                data-active={filter === f.id}
                className="chip rounded-full px-3 py-1 text-xs"
                type="button"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyShelf hasAny={drafts.length > 0} />
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((d) => (
              <DraftCard
                key={d.id}
                draft={d}
                active={activeId === d.id}
                onOpen={() => onOpen(d)}
                onDelete={() => {
                  if (confirm("Delete this draft? This cannot be undone.")) {
                    onDelete(d.id);
                  }
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function DraftCard({
  draft,
  active,
  onOpen,
  onDelete,
}: {
  draft: Draft;
  active: boolean;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const niche = NICHES.find((n) => n.id === draft.meta.nicheId);
  const preview = stripPreview(draft.body, draft.format);
  const date = new Date(draft.updatedAt);

  return (
    <li
      className="card p-4 flex flex-col gap-3 hover:border-[var(--ink-soft)] transition-colors group cursor-pointer relative"
      data-active={active}
      onClick={onOpen}
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
          {kindLabel(draft.meta.kind)}
        </span>
        <span className="text-[var(--line-strong)]">·</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
          {niche?.label ?? "Niche"}
        </span>
        {active && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--accent)]">
            Open
          </span>
        )}
      </div>

      <h3 className="font-serif text-[19px] leading-[1.2] tracking-tight line-clamp-2 min-h-[2.4em]">
        {draft.title}
      </h3>

      <p className="text-[13px] text-[var(--ink-soft)] leading-[1.55] line-clamp-3 min-h-[3.5em]">
        {preview}
      </p>

      <div className="mt-auto flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)]">
        <span>{date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
        <span>{draft.meta.wordCount} w</span>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-md p-1 text-[var(--ink-muted)] hover:text-[var(--accent)] hover:bg-[var(--paper)]"
        aria-label="Delete draft"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
        </svg>
      </button>
    </li>
  );
}

function EmptyShelf({ hasAny }: { hasAny: boolean }) {
  return (
    <div className="card p-8 text-center">
      <p className="font-serif text-xl">{hasAny ? "Nothing matches that filter." : "Your shelf is empty."}</p>
      <p className="text-sm text-[var(--ink-soft)] mt-2 max-w-md mx-auto">
        {hasAny
          ? "Try switching filters above, or generate something new."
          : "Generate a draft and save it. It'll persist on this device, even offline."}
      </p>
    </div>
  );
}

function stripPreview(body: string, format: Draft["format"]): string {
  if (format === "code") return body.split("\n").slice(0, 3).join(" ").slice(0, 240);
  return body
    .replace(/^#{1,4}\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .split("\n")
    .filter(Boolean)
    .slice(0, 3)
    .join(" ")
    .slice(0, 280);
}
