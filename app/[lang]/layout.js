import "../globals.css";
import { siteConfig } from "../siteConfig";
import { locales, defaultLocale, dirFor, isValidLocale } from "../../lib/i18n";
import { getDictionary } from "../../lib/getDictionary";

// Pre-render every language at build time.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Per-language SEO metadata, including hreflang alternates so Google
// indexes each locale separately.
export async function generateMetadata({ params }) {
  const lang = isValidLocale(params.lang) ? params.lang : defaultLocale;
  const t = getDictionary(lang);
  const languages = {};
  locales.forEach((l) => {
    languages[l] = l === defaultLocale ? "/" : `/${l}`;
  });
  return {
    metadataBase: new URL(siteConfig.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: lang === defaultLocale ? "/" : `/${lang}`,
      languages,
    },
    openGraph: {
      type: "website",
      url: lang === defaultLocale ? siteConfig.url : `${siteConfig.url}/${lang}`,
      siteName: siteConfig.name,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  themeColor: "#0B1120",
  width: "device-width",
  initialScale: 1,
};

export default function LangLayout({ children, params }) {
  const lang = isValidLocale(params.lang) ? params.lang : defaultLocale;
  return (
    <html lang={lang} dir={dirFor(lang)}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
