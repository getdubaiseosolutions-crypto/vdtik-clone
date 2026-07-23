import { siteConfig } from "../siteConfig";
import { locales, defaultLocale } from "../../lib/i18n";
import { pageOrder } from "../../lib/pageContent";

// Simple, clean /sitemap.xml — one plain block per URL.
// Standard format that Google Search Console reads without any trouble.
export const dynamic = "force-static";

// Date only (YYYY-MM-DD), like most sitemaps use.
function today() {
  return new Date().toISOString().slice(0, 10);
}

function urlBlock(loc, changefreq, priority, lastmod) {
  return `<url>
<loc>${loc}</loc>
<lastmod>${lastmod}</lastmod>
<changefreq>${changefreq}</changefreq>
<priority>${priority}</priority>
</url>`;
}

function buildUrls() {
  const base = siteConfig.url;
  const lastmod = today();
  const blocks = [];

  // 1) Language home pages
  locales.forEach((l) => {
    blocks.push(
      urlBlock(
        `${base}/${l}`,
        l === defaultLocale ? "weekly" : "monthly",
        l === defaultLocale ? "1.0" : "0.9",
        lastmod
      )
    );
  });

  // 2) Info pages + human sitemap, for every language
  const extra = [...pageOrder, "sitemap"];
  locales.forEach((l) => {
    extra.forEach((page) => {
      blocks.push(urlBlock(`${base}/${l}/${page}`, "monthly", "0.7", lastmod));
    });
  });

  return blocks.join("\n");
}

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${buildUrls()}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
