// GET /api/save?url=<encoded file url>&name=<filename>
// Streams a remote file (video/mp3/image) through our server and tells the
// browser to SAVE it, not play it. This is what makes "Download" actually
// drop a file into the user's device instead of opening a new tab.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { proxyUrl, proxyReady } from "../../../lib/proxyConfig";

// Lazily builds an undici ProxyAgent when a residential proxy is configured.
let _agent = null;
async function getDispatcher() {
  if (!proxyReady()) return undefined;
  if (_agent) return _agent;
  try {
    const { ProxyAgent } = await import("undici");
    _agent = new ProxyAgent(proxyUrl());
    return _agent;
  } catch {
    return undefined;
  }
}

// Only let through hosts we expect, so this route can't be abused as an
// open proxy for arbitrary URLs.
const ALLOWED_HOST_PATTERNS = [
  /tikcdn/i,
  /tiktokcdn/i,
  /tiktokv\.com$/i,
  /muscdn/i,
  /bytecdn/i,
  /tikwm\.com$/i,
  /akamaized\.net$/i,
];

function hostAllowed(hostname) {
  return ALLOWED_HOST_PATTERNS.some((re) => re.test(hostname));
}

// Pick a sensible extension from the content-type.
function extFromType(ct) {
  if (!ct) return "mp4";
  if (ct.includes("mp4") || ct.includes("video")) return "mp4";
  if (ct.includes("mpeg") || ct.includes("mp3") || ct.includes("audio")) return "mp3";
  if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
  if (ct.includes("png")) return "png";
  if (ct.includes("webp")) return "webp";
  return "mp4";
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  const wantedName = (searchParams.get("name") || "grabtok").replace(/[^a-z0-9_\-]/gi, "_");

  if (!fileUrl) {
    return new Response("Missing url", { status: 400 });
  }

  let target;
  try {
    target = new URL(fileUrl);
  } catch {
    return new Response("Bad url", { status: 400 });
  }

  if (!hostAllowed(target.hostname)) {
    return new Response("Host not allowed", { status: 403 });
  }

  try {
    const dispatcher = await getDispatcher();
    const upstream = await fetch(target.toString(), {
      headers: {
        // TikTok CDN is picky — pretend to be a normal browser + referer.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Referer: "https://www.tiktok.com/",
        Accept: "*/*",
      },
      signal: AbortSignal.timeout(60000),
      ...(dispatcher ? { dispatcher } : {}),
    });

    if (!upstream.ok || !upstream.body) {
      return new Response(`Upstream error ${upstream.status}`, { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const ext = extFromType(contentType);
    const filename = `${wantedName}.${ext}`;

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    // This header is the magic: "attachment" = SAVE, don't play.
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    headers.set("Cache-Control", "no-store");
    const len = upstream.headers.get("content-length");
    if (len) headers.set("Content-Length", len);

    // Stream straight through — no buffering the whole file in memory.
    return new Response(upstream.body, { status: 200, headers });
  } catch (err) {
    const timedOut = err?.name === "TimeoutError";
    return new Response(timedOut ? "Timed out" : "Fetch failed", { status: 500 });
  }
}
