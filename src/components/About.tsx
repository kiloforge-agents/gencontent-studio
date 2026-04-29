export function About() {
  return (
    <section id="about" className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            About the studio
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl mt-3 tracking-[-0.01em] leading-[1.05]">
            Built for the creators big AI tools forget.
          </h2>
        </div>
        <div className="md:col-span-7 space-y-6 text-[15.5px] leading-[1.7] text-[var(--ink-soft)]">
          <p>
            Every general-purpose chatbot will write you a blog post. Most will write the same one.
            GenContent Studio is a deliberately small alternative: a niche-aware drafting tool that
            knows the difference between a thread for indie devs, a caption for slow-living readers,
            and a LinkedIn post for design leads.
          </p>
          <p>
            Generation runs entirely in your browser. There&rsquo;s no server roundtrip, no key to
            paste in, no usage cap. The PWA installs to your home screen, and the service worker
            keeps the shell, your drafts, and the generator available the next time the train goes
            into a tunnel.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-[var(--ink)]">
            <li className="flex gap-2"><Marker /> Eight niche profiles, each with a distinct voice</li>
            <li className="flex gap-2"><Marker /> Five output formats, one consistent tone</li>
            <li className="flex gap-2"><Marker /> Local-only drafts, no account required</li>
            <li className="flex gap-2"><Marker /> Works fully offline once installed</li>
            <li className="flex gap-2"><Marker /> Editable inline before you ship</li>
            <li className="flex gap-2"><Marker /> Copy or save — you choose</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Marker() {
  return (
    <span
      aria-hidden
      className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]"
    />
  );
}
