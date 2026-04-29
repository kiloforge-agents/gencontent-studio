"use client";

import { useEffect, useRef } from "react";
import type { ContentKind, GenerateOutput } from "@/lib/generator";
import { renderMarkdown } from "@/lib/markdown";
import { kindLabel } from "@/lib/storage";

type Props = {
  output: GenerateOutput;
  kind: ContentKind;
  editing: boolean;
  copied: boolean;
  saved: boolean;
  isExistingDraft: boolean;
  onEdit: () => void;
  onStopEdit: () => void;
  onChangeBody: (next: string) => void;
  onCopy: () => void;
  onSave: () => void;
};

export function OutputCard({
  output,
  kind,
  editing,
  copied,
  saved,
  isExistingDraft,
  onEdit,
  onStopEdit,
  onChangeBody,
  onCopy,
  onSave,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      autoResize(textareaRef.current);
    }
  }, [editing]);

  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <article className="card overflow-hidden fade-up">
      {/* Header */}
      <header className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] px-5 sm:px-6 py-3.5 bg-[var(--paper)]/60">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
          {kindLabel(kind)}
        </span>
        <span className="text-[var(--line-strong)]">·</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
          {output.meta.nicheLabel}
        </span>
        <span className="text-[var(--line-strong)]">·</span>
        <span className="font-mono text-[10px] text-[var(--ink-muted)]">
          {output.meta.wordCount} words · {output.meta.readingMinutes} min
        </span>

        <div className="ml-auto flex items-center gap-1.5">
          {!editing ? (
            <button
              type="button"
              onClick={onEdit}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-[var(--ink-soft)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={onStopEdit}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-[var(--ink-soft)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors"
            >
              Done
            </button>
          )}
          <button
            type="button"
            onClick={onCopy}
            className="rounded-md px-2.5 py-1 text-xs font-medium text-[var(--ink-soft)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-md bg-[var(--ink)] px-3 py-1 text-xs font-medium text-[var(--bg)] hover:opacity-90 transition-opacity"
          >
            {saved ? "Saved ✓" : isExistingDraft ? "Update draft" : "Save draft"}
          </button>
        </div>
      </header>

      {/* Title */}
      <div className="px-6 sm:px-8 pt-7 pb-2">
        <h3 className="font-serif text-[28px] sm:text-[34px] leading-[1.05] tracking-[-0.01em]">
          {output.title}
        </h3>
      </div>

      {/* Body */}
      <div className="px-6 sm:px-8 pb-8 pt-3">
        {editing ? (
          <textarea
            ref={textareaRef}
            value={output.body}
            onChange={(e) => {
              onChangeBody(e.target.value);
              autoResize(e.currentTarget);
            }}
            className="w-full resize-none rounded-lg border border-[var(--line-strong)] bg-[var(--paper)]/30 p-4 font-mono text-[13px] leading-[1.6] text-[var(--ink)] focus-ring"
            spellCheck
          />
        ) : output.format === "code" ? (
          <pre className="rounded-lg bg-[#0e0e0c] text-[#f5f1e6] p-5 overflow-x-auto font-mono text-[13px] leading-[1.6] scrollbar-thin">
            <code>{output.body}</code>
          </pre>
        ) : output.format === "markdown" ? (
          <div
            className="prose-paper text-[15.5px] leading-[1.7] text-[var(--ink)] max-w-prose"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(output.body) }}
          />
        ) : (
          // Social: preserve linebreaks, monospace-leaning serif
          <div className="whitespace-pre-wrap font-serif text-[16px] leading-[1.7] text-[var(--ink)] max-w-prose">
            {output.body}
          </div>
        )}
      </div>

      <footer className="border-t border-[var(--line)] bg-[var(--paper)]/40 px-5 sm:px-6 py-3 flex items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--ink-muted)]">
        <span>Tone — {output.meta.tone}</span>
        <span>{output.meta.charCount.toLocaleString()} chars</span>
      </footer>
    </article>
  );
}
