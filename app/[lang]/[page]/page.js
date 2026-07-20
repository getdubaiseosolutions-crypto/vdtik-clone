import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import AdSlot from "../../components/AdSlot";
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
  const waPretty = "+" + siteConfig.whatsapp;
  return (str || "")
    .replaceAll("{SITE}", siteConfig.name)
    .replaceAll("{DOMAIN}", domain)
    .replaceAll("{EMAIL}", siteConfig.email)
    .replaceAll("{WHATSAPP}", waPretty);
}

// Turn the email address and WhatsApp number into clickable links.
function linkify(text) {
  const email = siteConfig.email;
  const waPretty = "+" + siteConfig.whatsapp;
  const parts = [];
  let rest = text;
  let key = 0;
  while (rest.length) {
    const iE = rest.indexOf(email);
    const iW = rest.indexOf(waPretty);
    // find nearest token
    const candidates = [iE, iW].filter((x) => x >= 0);
    if (candidates.length === 0) {
      parts.push(rest);
      break;
    }
    const next = Math.min(...candidates);
    if (next > 0) parts.push(rest.slice(0, next));
    if (next === iE) {
      parts.push(
        <a key={key++} href={`mailto:${email}`} className="text-signal hover:underline">{email}</a>
      );
      rest = rest.slice(next + email.length);
    } else {
      parts.push(
        <a key={key++} href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer" className="text-signal hover:underline">{waPretty}</a>
      );
      rest = rest.slice(next + waPretty.length);
    }
  }
  return parts;
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
        <p className="mt-4 text-[15px] leading-relaxed text-mist">{linkify(fill(content.intro))}</p>

        <div className="mt-10 space-y-8">
          {content.blocks.map((b, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-white">{b.h}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-mist">{linkify(fill(b.p))}</p>
            </section>
          ))}
        </div>
      </article>

      {/* Ad — info page */}
      <AdSlot slot="infoPage" className="py-4" />

      <SiteFooter lang={lang} t={t} />
    </main>
  );
}
