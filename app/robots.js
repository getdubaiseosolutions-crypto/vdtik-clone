import { siteConfig } from "./siteConfig";

// ============================================================
//   ★ ROBOTS.TXT SETTINGS ★  (controls what Google can crawl)
// ------------------------------------------------------------
//  This makes your /robots.txt file automatically.
//
//  allow    = pages search engines CAN crawl ("/" means all)
//  disallow = pages to BLOCK from crawling (add lines here)
//
//  EXAMPLE — block a page from Google:
//    disallow: ["/api/", "/secret-page"],
// ============================================================
const allow = "/";
const disallow = ["/api/"]; // block API routes (keep this)

// ---- do not touch below ----
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow,
      disallow,
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
