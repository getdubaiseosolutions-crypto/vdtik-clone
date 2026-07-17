import { siteConfig } from "./siteConfig";
import { locales, defaultLocale } from "../lib/i18n";
import { pageOrder } from "../lib/pageContent";

// Generates /sitemap.xml: every language homepage + every info page,
// each with hreflang alternates so Google indexes all locales.
export default function sitemap() {
  const base = siteConfig.url;
  const now = new Date();
  const entries = [];

  // Homepages
  const homeLangs = {};
  locales.forEach((l) => {
    homeLangs[l] = l === defaultLocale ? base : `${base}/${l}`;
  });
  locales.forEach((l) => {
    entries.push({
      url: l === defaultLocale ? base : `${base}/${l}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: l === defaultLocale ? 1 : 0.8,
      alternates: { languages: homeLangs },
    });
  });

  // Info pages (about, contact, privacy, dmca, terms) per language
  pageOrder.forEach((page) => {
    const langs = {};
    locales.forEach((l) => {
      langs[l] = `${base}/${l}/${page}`;
    });
    locales.forEach((l) => {
      entries.push({
        url: `${base}/${l}/${page}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: { languages: langs },
      });
    });
  });

  return entries;
}
