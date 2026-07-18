// ============================================================
//   ★ YOUR REDIRECTS ★  — edit THIS file to add redirects
// ============================================================
//
//  HOW TO ADD A REDIRECT (copy one line, change the links):
//
//    { from: "/old-link",  to: "/new-link",  permanent: true },
//
//  RULES (simple):
//   - from = the OLD address (must start with / )
//   - to   = the NEW address (where visitor goes)
//   - permanent: true  = moved forever (best for Google/SEO) — use this normally
//   - permanent: false = only temporary
//   - keep the comma at the end of each line
//
//  EXAMPLES:
//    { from: "/download", to: "/en", permanent: true },
//    { from: "/tiktok-mp3", to: "/en#faq", permanent: true },
//    { from: "/old-about", to: "/en/about", permanent: true },
//
// ------------------------------------------------------------
//  👇 ADD YOUR REDIRECTS BETWEEN THE [ ] BRACKETS BELOW
// ------------------------------------------------------------

const redirects = [

  // { from: "/old-link", to: "/en", permanent: true },

];

// ---- do not touch below this line ----
module.exports = redirects.map((r) => ({
  source: r.from,
  destination: r.to,
  permanent: r.permanent !== false,
}));
