import Downloader from "../components/Downloader";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AdSlot from "../components/AdSlot";
import { siteConfig } from "../siteConfig";
import { defaultLocale, isValidLocale } from "../../lib/i18n";
import { getDictionary } from "../../lib/getDictionary";

function StructuredData({ t, lang }) {
  const url = lang === defaultLocale ? siteConfig.url : `${siteConfig.url}/${lang}`;
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: siteConfig.name,
        url,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: t.meta.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function Home({ params }) {
  const lang = isValidLocale(params.lang) ? params.lang : defaultLocale;
  const t = getDictionary(lang);

  return (
    <main className="relative">
      <StructuredData t={t} lang={lang} />

      {/* Nav */}
      <SiteHeader lang={lang} t={t} />

      {/* Hero */}
      <section className="relative">
        <div className="grid-bg pointer-events-none absolute inset-0 h-[600px]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-16 text-center sm:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface/60 px-4 py-1.5 text-xs font-medium text-mist">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            {t.hero.badge}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-signal sm:text-xl">{t.hero.subtitle}</p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-mist">{t.hero.lead}</p>
          <div className="mt-10">
            <Downloader t={t.hero} r={t.result} />
          </div>
        </div>
      </section>

      {/* Ad — after hero */}
      <AdSlot slot="afterHero" className="py-4" />

      {/* Intro / SEO copy */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.intro.heading}</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-mist">{t.intro.body[0]}</p>
        </div>

        {/* Highlight grid — breaks up the long text visually */}
        {t.intro.highlights && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.intro.highlights.map((h, i) => (
              <div key={i} className="rounded-2xl border border-edge bg-surface/40 p-5">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-signal/10 text-signal">
                  <IntroIcon name={h.icon} />
                </div>
                <h3 className="font-semibold text-white">{h.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{h.d}</p>
              </div>
            ))}
          </div>
        )}

        {/* Remaining SEO paragraphs as alternating feature rows */}
        {t.intro.sections && (
          <div className="mt-16">
            <h3 className="mx-auto max-w-3xl text-center text-xl font-bold tracking-tight sm:text-2xl">
              {t.intro.sectionsHeading}
            </h3>
            <div className="mt-10 space-y-4">
              {t.intro.sections.map((s, i) => (
                <div
                  key={i}
                  className={
                    "flex flex-col gap-4 rounded-2xl border border-edge bg-surface/40 p-6 sm:items-center sm:gap-6 " +
                    (i % 2 === 1 ? "sm:flex-row-reverse" : "sm:flex-row")
                  }
                >
                  <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-signal/10 text-signal">
                      <IntroIcon name={s.icon} />
                    </div>
                    <h4 className="font-semibold text-white">{s.t}</h4>
                  </div>
                  <p className="text-[15px] leading-relaxed text-mist">{t.intro.body[i + 1]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final keyword paragraph — kept low-key for SEO */}
        {t.intro.body.length > 8 && (
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-mist/80">
            {t.intro.body[t.intro.body.length - 1]}
          </p>
        )}
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-16">
        <SectionHead kicker={t.steps.kicker} title={t.steps.heading} />
        <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-mist">{t.steps.body}</p>
        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          {t.steps.items.map((s) => (
            <li key={s.n} className="rounded-2xl border border-edge bg-surface/40 p-6">
              <span className="text-sm font-semibold text-signal">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Ad — in content */}
      <AdSlot slot="inContent" className="py-4" />

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-16">
        <SectionHead kicker={t.features.kicker} title={t.features.heading} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((f) => (
            <div key={f.t} className="rounded-2xl border border-edge bg-surface/40 p-6">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-signal/10 text-signal"><CheckIcon /></div>
              <h3 className="font-semibold text-white">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHead kicker={t.useCases.kicker} title={t.useCases.heading} />
        <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-mist">{t.useCases.body}</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.useCases.items.map((u) => (
            <div key={u.t} className="rounded-2xl border border-edge bg-surface/40 p-6">
              <h3 className="font-semibold text-white">{u.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{u.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <SectionHead kicker={t.compare.kicker} title={t.compare.heading} />
        <p className="mt-4 text-center text-[15px] leading-relaxed text-mist">{t.compare.body}</p>
        <div className="mt-10 overflow-hidden rounded-2xl border border-edge">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface/60 text-mist">
                <th className="px-4 py-3 text-start font-medium"></th>
                <th className="px-4 py-3 text-start font-medium">TikTok App</th>
                <th className="px-4 py-3 text-start font-medium text-signal">GrabTok</th>
              </tr>
            </thead>
            <tbody>
              {t.compare.rows.map((row, i) => (
                <tr key={i} className="border-t border-edge">
                  <td className="px-4 py-3 font-medium text-white">{row.label}</td>
                  <td className="px-4 py-3 text-mist">{row.app}</td>
                  <td className="px-4 py-3 text-white">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Safety */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.safety.heading}</h2>
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-mist">
          {t.safety.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-16">
        <SectionHead kicker={t.faq.kicker} title={t.faq.heading} />
        <div className="mt-10 divide-y divide-edge">
          {t.faq.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-white marker:content-none">
                {item.q}
                <span className="text-mist transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-mist">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Ad — before footer */}
      <AdSlot slot="beforeFooter" className="py-4" />

      {/* Footer */}
      <SiteFooter lang={lang} t={t} />
    </main>
  );
}

function SectionHead({ kicker, title }) {
  return (
    <div className="text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-signal">{kicker}</span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
function IntroIcon({ name }) {
  const p = {
    clean: <path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
    hd: <><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M7 10v4m0-2h2m0-2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
    mp3: <><path d="M9 18V6l10-2v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.7" /><circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.7" /></>,
    device: <><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M11 18h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
    fast: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" /></>,
    shield: <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
    share: <><circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.7" /><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" /><circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.7" /><path d="M8.6 10.6l6.8-4m0 10.8l-6.8-4" stroke="currentColor" strokeWidth="1.7" /></>,
    tap: <path d="M9 11V6a2 2 0 114 0v5m0 0V9a2 2 0 114 0v6a5 5 0 01-5 5h-2a4 4 0 01-3.5-2l-2-3.5a1.5 1.5 0 012.5-1.7L11 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
    search: <><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" /><path d="M21 21l-4.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      {p[name] || p.clean}
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
