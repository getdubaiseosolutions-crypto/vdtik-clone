// ============================================================
//   ★ PROXY SETTINGS ★  — add your residential proxy here
// ============================================================
//
//  WHAT THIS IS FOR:
//  When TikTok/TikWM starts blocking your server's IP (usually only
//  after lots of traffic), a residential proxy makes each request look
//  like it comes from a different, normal home IP — so you stop getting
//  blocked.
//
//  ⚠️ IMPORTANT: Proxies work reliably on a VPS (e.g. Hetzner,
//  DigitalOcean), NOT well on Vercel's serverless hosting. Only turn
//  this on once you have moved the site to a VPS.
//
//  HOW TO TURN ON (later):
//   1. Buy a residential proxy (Bright Data, IPRoyal, Webshare, etc).
//   2. They give you: host, port, username, password.
//   3. Fill them in below.
//   4. Set  enabled: false
//   5. Upload. Requests to TikTok now go through the proxy.
//
//  While enabled is false, the site works exactly as now (no proxy).
// ------------------------------------------------------------

export const proxyConfig = {
  // Master switch. Keep false on Vercel. Turn true only on a VPS.
  enabled: false,

  // From your proxy provider:
  host: "",      // e.g. "proxy.provider.com"
  port: "",      // e.g. "8080"
  username: "",  // your proxy username
  password: "",  // your proxy password

  // "http" for most residential proxies. Some offer "https" or "socks5".
  protocol: "http",
};

// Builds a proxy URL string like: http://user:pass@host:port
export function proxyUrl() {
  const { enabled, host, port, username, password, protocol } = proxyConfig;
  if (!enabled || !host || !port) return null;
  const auth = username && password ? `${username}:${password}@` : "";
  return `${protocol}://${auth}${host}:${port}`;
}

export function proxyReady() {
  return Boolean(proxyConfig.enabled && proxyConfig.host && proxyConfig.port);
}
