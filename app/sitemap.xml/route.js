import { siteConfig } from "../siteConfig";
import { locales, defaultLocale } from "../../lib/i18n";
import { pageOrder } from "../../lib/pageContent";

// Clean, nicely-formatted /sitemap.xml with line breaks so it's easy to read
// in a browser, and fully standard for Google Search Console.
export const dynamic = "force-static";

function buildUrls() {
  const base = siteConfig.url;
  const now = new Date().toISOString();
  const blocks = [];

  // Homepages (all languages) with hreflang alternates
  locales.forEach((l) => {
    const alts = locales
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${base}/${a}"/>`)
      .join("\n");
    blocks.push(
`  <url>
    <loc>${base}/${l}</loc>
${alts}
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${l === defaultLocale ? "1.0" : "0.8"}</priority>
  </url>`
    );
  });

  // Info pages + human sitemap page per language
  const extra = [...pageOrder, "sitemap"];
  extra.forEach((page) => {
    locales.forEach((l) => {
      const alts = locales
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${base}/${a}/${page}"/>`)
        .join("\n");
      blocks.push(
`  <url>
    <loc>${base}/${l}/${page}</loc>
${alts}
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`
      );
    });
  });

  return blocks.join("\n");
}

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${buildUrls()}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
