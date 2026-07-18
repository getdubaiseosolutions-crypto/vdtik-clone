import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { siteConfig } from "../../siteConfig";
import { locales, defaultLocale, isValidLocale, localeNames } from "../../../lib/i18n";
import { getDictionary } from "../../../lib/getDictionary";
import { pageOrder, pageContent } from "../../../lib/pageContent";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const lang = isValidLocale(params.lang) ? params.lang : defaultLocale;
  return {
    metadataBase: new URL(siteConfig.url),
    title: `Sitemap — ${siteConfig.name}`,
    description: `Browse all pages on ${siteConfig.name}: the TikTok downloader home page and info pages, available in ${locales.length} languages.`,
    alternates: { canonical: `/${lang}/sitemap` },
    robots: { index: true, follow: true },
  };
}

export default function HumanSitemap({ params }) {
  const lang = isValidLocale(params.lang) ? params.lang : defaultLocale;
  const t = getDictionary(lang);

  return (
    <main className="relative min-h-screen">
      <SiteHeader lang={lang} t={t} showNav={false} />

      <article className="mx-auto max-w-4xl px-6 py-12">
        <a href={`/${lang}`} className="text-sm text-signal hover:underline">← {siteConfig.name}</a>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Sitemap</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mist">
          A complete map of every page on {siteConfig.name}. Use the links below to jump to the
          downloader home page or any information page, in your language. The full list of all
          languages is at the bottom.
        </p>

        {/* Main pages (current language) */}
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-signal">Main pages</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li>
              <a href={`/${lang}`} className="text-white hover:text-signal transition-colors">
                Home — TikTok Video Downloader
              </a>
            </li>
          </ul>
        </section>

        {/* Info pages (current language) */}
        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-signal">Information pages</h2>
          <ul className="mt-4 grid gap-2 text-[15px] sm:grid-cols-2">
            {pageOrder.map((p) => (
              <li key={p}>
                <a href={`/${lang}/${p}`} className="text-white hover:text-signal transition-colors">
                  {pageContent[p].title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* All languages */}
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-signal">All languages</h2>
          <p className="mt-2 text-sm text-mist">The home page is available in every language below.</p>
          <ul className="mt-4 grid gap-2 text-[15px] sm:grid-cols-3">
            {locales.map((l) => (
              <li key={l}>
                <a href={`/${l}`} className="text-white hover:text-signal transition-colors">
                  {localeNames[l]}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* XML for search engines */}
        <section className="mt-10 rounded-2xl border border-edge bg-surface/40 p-5">
          <h2 className="font-semibold text-white">For search engines</h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Search engines can use the machine-readable sitemap at{" "}
            <a href="/sitemap.xml" className="text-signal hover:underline">/sitemap.xml</a>.
            This page is the friendly, human version.
          </p>
        </section>
      </article>

      <SiteFooter lang={lang} t={t} />
    </main>
  );
}
