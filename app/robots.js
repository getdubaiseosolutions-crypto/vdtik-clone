import { siteConfig } from "./siteConfig";

// ============================================================
//   ★ ROBOTS.TXT SETTINGS ★  (controls what search engines crawl)
// ------------------------------------------------------------
//  This makes your /robots.txt automatically.
//
//  allow    = paths search engines CAN crawl ("/" = everything)
//  disallow = paths to BLOCK (add lines here to hide pages)
//
//  EXAMPLE — block a page from Google:
//    disallow: ["/api/", "/thank-you"],
// ============================================================
const allow = ["/"];
const disallow = ["/api/"]; // block the download API from being crawled

// ---- do not touch below ----
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow,
        disallow,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
