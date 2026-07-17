import Downloader from "../components/Downloader";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
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

      {/* Intro / SEO copy */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.intro.heading}</h2>
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-mist">
          {t.intro.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
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
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
