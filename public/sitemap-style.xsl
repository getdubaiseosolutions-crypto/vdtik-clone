<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>GrabTok — XML Sitemap</title>
        <style>
          :root {
            --ink: #0B1120; --surface: #111a2e; --edge: #1e2c4a;
            --mist: #8ea0c4; --signal: #4ADE80; --white: #e8edf7;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0; padding: 0;
            font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
            background: radial-gradient(1200px 600px at 50% -10%, #16233f 0%, #0B1120 55%);
            color: var(--white); min-height: 100vh;
          }
          .wrap { max-width: 1000px; margin: 0 auto; padding: 40px 20px; }
          .brand { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
          .logo {
            width: 38px; height: 38px; border-radius: 11px;
            background: var(--signal); color: var(--ink);
            display: grid; place-items: center; font-weight: 800; font-size: 20px;
          }
          .brand span { font-size: 20px; font-weight: 700; }
          .brand span b { color: var(--signal); font-weight: 700; }
          h1 { font-size: 26px; margin: 18px 0 6px; }
          .sub { color: var(--mist); font-size: 14px; margin: 0 0 6px; }
          .count {
            display: inline-block; margin-top: 10px; padding: 5px 12px;
            border: 1px solid var(--edge); border-radius: 999px;
            color: var(--mist); font-size: 13px;
          }
          table {
            width: 100%; border-collapse: collapse; margin-top: 24px;
            background: rgba(17,26,46,0.6); border: 1px solid var(--edge);
            border-radius: 14px; overflow: hidden;
          }
          th, td {
            text-align: left; padding: 12px 16px; font-size: 14px;
            border-bottom: 1px solid var(--edge);
          }
          th {
            background: rgba(17,26,46,0.9); color: var(--mist);
            text-transform: uppercase; letter-spacing: 0.05em; font-size: 12px;
          }
          td a { color: var(--white); text-decoration: none; word-break: break-all; }
          td a:hover { color: var(--signal); text-decoration: underline; }
          tr:last-child td { border-bottom: none; }
          .pill {
            display: inline-block; padding: 2px 9px; border-radius: 999px;
            background: rgba(74,222,128,0.1); color: var(--signal); font-size: 12px;
          }
          .foot { margin-top: 20px; color: var(--mist); font-size: 12px; }
          .foot a { color: var(--signal); }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="brand">
            <div class="logo">G</div>
            <span>Grab<b>Tok</b></span>
          </div>
          <h1>XML Sitemap</h1>
          <p class="sub">This is the machine-readable sitemap that search engines like Google use to discover every page on this website.</p>
          <span class="count">
            <xsl:value-of select="count(s:urlset/s:url)"/> URLs
          </span>

          <table>
            <tr>
              <th>URL</th>
              <th>Priority</th>
              <th>Change frequency</th>
              <th>Last modified</th>
            </tr>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td>
                  <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                </td>
                <td><span class="pill"><xsl:value-of select="s:priority"/></span></td>
                <td><xsl:value-of select="s:changefreq"/></td>
                <td><xsl:value-of select="substring(s:lastmod,1,10)"/></td>
              </tr>
            </xsl:for-each>
          </table>

          <p class="foot">
            Looking for the friendly version? Visit the <a href="/en/sitemap">human sitemap</a>.
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
