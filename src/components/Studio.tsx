"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { NICHES } from "@/lib/niches";
import {
  generate,
  type CodeLanguage,
  type ContentKind,
  type GenerateOutput,
} from "@/lib/generator";
import {
  saveDraft,
  listDrafts,
  deleteDraft,
  updateDraftBody,
  kindLabel,
  type Draft,
} from "@/lib/storage";
import { OutputCard } from "./OutputCard";
import { DraftsShelf } from "./DraftsShelf";

const KINDS: { id: ContentKind; label: string; sub: string }[] = [
  { id: "blog", label: "Blog post", sub: "Long-form, structured" },
  { id: "twitter", label: "X thread", sub: "6 connected beats" },
  { id: "linkedin", label: "LinkedIn", sub: "Authority post" },
  { id: "instagram", label: "Instagram", sub: "Caption + tags" },
  { id: "code", label: "Code snippet", sub: "Drop-in utility" },
];

const LANGUAGES: { id: CodeLanguage; label: string }[] = [
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
];

const TOPIC_SUGGESTIONS: Record<ContentKind, string[]> = {
  blog: [
    "lessons from shipping fast",
    "what nobody tells you about retention",
    "the boring part of growth",
  ],
  twitter: [
    "evals over vibe checks",
    "why I deleted half my notes",
    "the under-rated metric",
  ],
  linkedin: [
    "leading through the messy middle",
    "what changed when we slowed down",
    "the meeting we removed",
  ],
  instagram: [
    "morning rituals that stuck",
    "the small upgrade",
    "before & after",
  ],
  code: [
    "useDebouncedValue",
    "tiny LRU cache",
    "retry with backoff",
  ],
};

export function Studio() {
  const [kind, setKind] = useState<ContentKind>("blog");
  const [nicheId, setNicheId] = useState<string>(NICHES[0].id);
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<CodeLanguage>("typescript");
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState<GenerateOutput | null>(null);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const studioRef = useRef<HTMLDivElement>(null);

  // Hydrate drafts on mount
  useEffect(() => {
    setDrafts(listDrafts());
  }, []);

  const niche = useMemo(
    () => NICHES.find((n) => n.id === nicheId) ?? NICHES[0],
    [nicheId],
  );

  const canGenerate = topic.trim().length >= 3 && !generating;

  async function handleGenerate() {
    if (!canGenerate) return;
    setGenerating(true);
    setEditing(false);
    setActiveDraftId(null);
    setOutput(null);
    try {
      const result = await generate({
        kind,
        topic: topic.trim(),
        nicheId,
        language: kind === "code" ? language : undefined,
      });
      setOutput(result);
    } finally {
      setGenerating(false);
    }
  }

  function handleSave() {
    if (!output) return;
    if (activeDraftId) {
      const updated = updateDraftBody(activeDraftId, output.body);
      if (updated) {
        setDrafts(listDrafts());
        setSavedFlash(true);
        setTimeout(() => setSavedFlash(false), 1200);
      }
      return;
    }
    const d = saveDraft({
      output,
      topic: topic.trim(),
      language: kind === "code" ? language : undefined,
    });
    setActiveDraftId(d.id);
    setDrafts(listDrafts());
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1200);
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  }

  function handleOpenDraft(d: Draft) {
    setKind(d.meta.kind);
    setNicheId(d.meta.nicheId);
    setTopic(d.topic);
    if (d.language) setLanguage(d.language as CodeLanguage);
    setOutput({
      title: d.title,
      body: d.body,
      format: d.format,
      meta: d.meta,
    });
    setActiveDraftId(d.id);
    setEditing(false);
    setTimeout(() => {
      studioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function handleDeleteDraft(id: string) {
    deleteDraft(id);
    setDrafts(listDrafts());
    if (activeDraftId === id) {
      setActiveDraftId(null);
      setOutput(null);
    }
  }

  function handleBodyChange(next: string) {
    if (!output) return;
    const wordCount = next.trim().split(/\s+/).filter(Boolean).length;
    setOutput({
      ...output,
      body: next,
      meta: {
        ...output.meta,
        wordCount,
        charCount: next.length,
        readingMinutes: Math.max(1, Math.round(wordCount / 220)),
      },
    });
  }

  return (
    <section id="studio" ref={studioRef} className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16 grid lg:grid-cols-12 gap-8">
        {/* Left rail: composer */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 lg:self-start space-y-7">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
              The Studio
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-2 tracking-tight">
              Compose a draft.
            </h2>
            <p className="text-[var(--ink-soft)] mt-2 leading-relaxed text-[15px]">
              Pick a channel, then a niche. Type a topic in your own words.
              We&rsquo;ll structure the rest.
            </p>
          </div>

          {/* Kind tabs */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">
              01 · Channel
            </p>
            <div className="flex flex-wrap gap-2">
              {KINDS.map((k) => (
                <button
                  key={k.id}
                  onClick={() => setKind(k.id)}
                  data-active={kind === k.id}
                  className="chip rounded-lg px-3 py-2 text-sm focus-ring"
                  type="button"
                  aria-pressed={kind === k.id}
                >
                  <span className="block font-medium leading-tight">{k.label}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] opacity-70 mt-0.5">
                    {k.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Niche grid */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">
              02 · Niche
            </p>
            <div className="grid grid-cols-2 gap-2">
              {NICHES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setNicheId(n.id)}
                  data-active={nicheId === n.id}
                  className="chip rounded-lg px-3 py-2.5 text-left focus-ring"
                  type="button"
                  aria-pressed={nicheId === n.id}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-serif text-base leading-none w-4">{n.emoji}</span>
                    <span className="text-sm font-medium">{n.label}</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2.5 text-xs text-[var(--ink-muted)] leading-relaxed">
              Tone: <span className="text-[var(--ink-soft)]">{niche.tone}</span>.
              Audience: <span className="text-[var(--ink-soft)]">{niche.audience}</span>.
            </p>
          </div>

          {/* Topic */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">
              03 · Topic
            </p>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. the metric that finally moved my newsletter"
              rows={3}
              className="w-full resize-none rounded-xl border border-[var(--line-strong)] bg-[var(--bg-elev)] px-4 py-3 text-[15px] leading-relaxed placeholder:text-[var(--ink-muted)] focus-ring"
              maxLength={160}
              aria-label="Topic"
            />
            <div className="mt-1.5 flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1.5">
                {TOPIC_SUGGESTIONS[kind].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setTopic(s)}
                    className="rounded-full border border-[var(--line)] bg-[var(--bg-elev)] px-2 py-0.5 text-[11px] text-[var(--ink-soft)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                {topic.length}/160
              </span>
            </div>
          </div>

          {kind === "code" && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">
                04 · Language
              </p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLanguage(l.id)}
                    data-active={language === l.id}
                    className="chip rounded-lg px-3 py-1.5 text-sm focus-ring"
                    type="button"
                    aria-pressed={language === l.id}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Generate */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="btn-primary rounded-full px-6 py-3 text-sm font-medium inline-flex items-center gap-2"
              type="button"
            >
              {generating ? (
                <>
                  <Spinner /> <span>Drafting…</span>
                </>
              ) : (
                <>
                  <span>Generate {kindLabel(kind).toLowerCase()}</span>
                  <span aria-hidden>→</span>
                </>
              )}
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              ⌘ + Enter
            </span>
          </div>
        </div>

        {/* Right column: output */}
        <div className="lg:col-span-7">
          {!output && !generating && <EmptyState />}
          {generating && <Skeleton kind={kind} />}
          {output && !generating && (
            <OutputCard
              output={output}
              kind={kind}
              editing={editing}
              onEdit={() => setEditing(true)}
              onStopEdit={() => setEditing(false)}
              onChangeBody={handleBodyChange}
              onCopy={handleCopy}
              onSave={handleSave}
              copied={copied}
              saved={savedFlash}
              isExistingDraft={Boolean(activeDraftId)}
            />
          )}
        </div>
      </div>

      {/* Hidden keyboard shortcut */}
      <KeyboardShortcuts onGenerate={handleGenerate} />

      {/* Drafts shelf */}
      <DraftsShelf
        drafts={drafts}
        onOpen={handleOpenDraft}
        onDelete={handleDeleteDraft}
        activeId={activeDraftId}
      />
    </section>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-[var(--bg)]/40 border-t-[var(--bg)]"
    />
  );
}

function EmptyState() {
  return (
    <div className="card p-8 sm:p-10 fade-up">
      <div className="flex items-center gap-2 mb-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
          Output preview
        </span>
        <span className="h-px flex-1 bg-[var(--line-strong)]" />
      </div>
      <h3 className="font-serif text-3xl tracking-tight">
        Ready when you are.
      </h3>
      <p className="text-[var(--ink-soft)] mt-3 max-w-md leading-relaxed">
        Type a topic on the left. Pick a channel and niche. Generation is local — no API keys, no
        sign-in, no waiting on a server thousands of miles away.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-[var(--ink-soft)]">
        <li className="flex gap-2"><Tick /> Fully offline-capable PWA</li>
        <li className="flex gap-2"><Tick /> Drafts persist on your device</li>
        <li className="flex gap-2"><Tick /> One topic, multiple channels</li>
        <li className="flex gap-2"><Tick /> Edit, copy, or export anytime</li>
      </ul>
    </div>
  );
}

function Tick() {
  return (
    <span
      aria-hidden
      className="mt-[5px] inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
    />
  );
}

function Skeleton({ kind }: { kind: ContentKind }) {
  return (
    <div className="card p-8 sm:p-10 fade-up">
      <div className="flex items-center gap-2 mb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
          Drafting {kindLabel(kind).toLowerCase()}
        </span>
        <span className="h-px flex-1 bg-[var(--line-strong)]" />
        <span className="dot-pulse text-[var(--accent)] font-mono text-xs">●</span>
      </div>
      <div className="space-y-3">
        <div className="h-7 w-3/4 shimmer rounded" />
        <div className="h-3 w-full shimmer rounded mt-6" />
        <div className="h-3 w-[92%] shimmer rounded" />
        <div className="h-3 w-[85%] shimmer rounded" />
        <div className="h-3 w-[60%] shimmer rounded" />
        <div className="h-5 w-1/2 shimmer rounded mt-6" />
        <div className="h-3 w-full shimmer rounded mt-3" />
        <div className="h-3 w-[88%] shimmer rounded" />
        <div className="h-3 w-[72%] shimmer rounded" />
      </div>
    </div>
  );
}

function KeyboardShortcuts({ onGenerate }: { onGenerate: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        onGenerate();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onGenerate]);
  return null;
}
