import Downloader from "./components/Downloader";

export default function Home() {
  return (
    <main className="relative">
      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-signal text-ink font-display font-bold">
            G
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Grab<span className="text-signal">Tok</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-mist sm:flex">
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="grid-bg pointer-events-none absolute inset-0 h-[600px]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-20 text-center sm:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface/60 px-4 py-1.5 text-xs font-medium text-mist">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Free · No signup · Unlimited
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Grab any TikTok.
            <br />
            <span className="text-signal">Clean, HD, no watermark.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-mist">
            Paste a link, pick your format. MP4 in HD, MP3 audio, cover art, and
            photo slideshows — saved to your device in seconds.
          </p>

          <div className="mt-10">
            <Downloader />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead
          kicker="Three steps"
          title="From link to saved in seconds"
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { n: "01", t: "Copy the link", d: "In TikTok, tap Share → Copy link on any public video." },
            { n: "02", t: "Paste it here", d: "Drop the link in the box above and hit Grab it." },
            { n: "03", t: "Pick a format", d: "Choose HD video, audio, or cover — it saves straight to your device." },
          ].map((s) => (
            <li key={s.n} className="rounded-2xl border border-edge bg-surface/40 p-6">
              <span className="font-mono text-sm text-signal">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead
          kicker="Why GrabTok"
          title="Everything you need, nothing you don't"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "No watermark", d: "Clean video with no TikTok logo or username stamped on it." },
            { t: "True HD", d: "Pulls the highest quality the original post offers." },
            { t: "Audio & covers", d: "Extract the MP3 sound or grab the cover image on its own." },
            { t: "Slideshows too", d: "Photo posts download as individual images, all of them." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-edge bg-surface/40 p-6">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-signal/10 text-signal">
                <CheckIcon />
              </div>
              <h3 className="font-display font-semibold text-white">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
        <SectionHead kicker="Questions" title="Good to know" />
        <div className="mt-10 divide-y divide-edge">
          {[
            {
              q: "Is GrabTok free?",
              a: "Yes. Unlimited grabs, no account, no app to install. It runs in your browser.",
            },
            {
              q: "Why no watermark?",
              a: "We fetch the source video directly, so it arrives clean — no logo, no username overlay.",
            },
            {
              q: "Can I grab private videos?",
              a: "No. Only public TikTok links work. We can't bypass private accounts, region locks, or deleted posts.",
            },
            {
              q: "Does it work on my phone?",
              a: "Yes — iPhone, Android, tablets, and desktop. Any modern browser is fine.",
            },
          ].map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between font-display font-medium text-white marker:content-none">
                {item.q}
                <span className="text-mist transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-mist">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-edge">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-xs text-mist">
          <p>© {new Date().getFullYear()} GrabTok. Not affiliated with TikTok or ByteDance.</p>
          <p className="mt-2">Only download content you have the right to save.</p>
        </div>
      </footer>
    </main>
  );
}

function SectionHead({ kicker, title }) {
  return (
    <div className="text-center">
      <span className="font-mono text-xs uppercase tracking-widest text-signal">{kicker}</span>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
