export const dynamic = "force-static";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
          Connection lost
        </p>
        <h1 className="font-serif text-4xl mt-4">You&rsquo;re offline.</h1>
        <p className="text-[var(--ink-soft)] mt-4">
          GenContent still works without a network. Reopen the app to keep drafting —
          every saved piece lives on your device until you&rsquo;re back online.
        </p>
      </div>
    </main>
  );
}
