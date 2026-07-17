import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { siteConfig } from "../../siteConfig";
import { locales, defaultLocale, isValidLocale } from "../../../lib/i18n";
import { getDictionary } from "../../../lib/getDictionary";
import { pageContent, pageOrder } from "../../../lib/pageContent";
import { notFound } from "next/navigation";

// Pre-render every info page in every language, e.g. /en/about, /id/privacy.
export function generateStaticParams() {
  const params = [];
  locales.forEach((lang) => {
    pageOrder.forEach((page) => params.push({ lang, page }));
  });
  return params;
}

function fill(str) {
  const domain = siteConfig.url.replace(/^https?:\/\//, "");
  return (str || "")
    .replaceAll("{SITE}", siteConfig.name)
    .replaceAll("{DOMAIN}", domain);
}

export async function generateMetadata({ params }) {
  const lang = isValidLocale(params.lang) ? params.lang : defaultLocale;
  const content = pageContent[params.page];
  if (!content) return {};
  const languages = {};
  locales.forEach((l) => {
    languages[l] = `/${l}/${params.page}`;
  });
  return {
    metadataBase: new URL(siteConfig.url),
    title: `${content.title} — ${siteConfig.name}`,
    description: fill(content.intro).slice(0, 155),
    alternates: {
      canonical: `/${lang}/${params.page}`,
      languages,
    },
    robots: { index: true, follow: true },
  };
}

export default function InfoPage({ params }) {
  const lang = isValidLocale(params.lang) ? params.lang : defaultLocale;
  const t = getDictionary(lang);
  const content = pageContent[params.page];
  if (!content) notFound();

  return (
    <main className="relative min-h-screen">
      <SiteHeader lang={lang} t={t} showNav={false} />

      <article className="mx-auto max-w-3xl px-6 py-12">
        <a href={`/${lang}`} className="text-sm text-signal hover:underline">← {siteConfig.name}</a>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-mist">{fill(content.intro)}</p>

        <div className="mt-10 space-y-8">
          {content.blocks.map((b, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-white">{b.h}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-mist">{fill(b.p)}</p>
            </section>
          ))}
        </div>
      </article>

      <SiteFooter lang={lang} t={t} />
    </main>
  );
}
