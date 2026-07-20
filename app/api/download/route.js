// POST /api/download  { url: "<tiktok link>" }
// Calls the TikWM API, then returns a clean, normalized shape the UI can render.
// Runs on the server, so the TikWM call never touches the browser (no CORS, key stays hidden if you add one later).

import { proxyConfig, proxyUrl, proxyReady } from "../../../lib/proxyConfig";

export const runtime = "nodejs";        // needs full node runtime, not edge
export const dynamic = "force-dynamic";  // never cache download results

const TIKWM_ENDPOINT = "https://www.tikwm.com/api/";

// Lazily builds an undici ProxyAgent when a residential proxy is configured.
// Returns undefined when no proxy is set, so normal fetch is used.
let _agent = null;
async function getDispatcher() {
  if (!proxyReady()) return undefined;
  if (_agent) return _agent;
  try {
    const { ProxyAgent } = await import("undici");
    _agent = new ProxyAgent(proxyUrl());
    return _agent;
  } catch {
    // If undici isn't available for some reason, fall back to direct fetch.
    return undefined;
  }
}

// Loose sanity check: is this plausibly a TikTok URL?
function looksLikeTikTok(url) {
  try {
    const u = new URL(url);
    return /(^|\.)tiktok\.com$/i.test(u.hostname) || /(^|\.)douyin\.com$/i.test(u.hostname);
  } catch {
    return false;
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Send a JSON body like { \"url\": \"...\" }." }, 400);
  }

  const url = (body?.url || "").trim();

  if (!url) {
    return json({ ok: false, error: "Paste a TikTok link first." }, 400);
  }
  if (!looksLikeTikTok(url)) {
    return json({ ok: false, error: "That doesn't look like a TikTok link. Copy the share link from the app." }, 400);
  }

  try {
    // TikWM accepts form-encoded POST. hd=1 asks for the HD variant.
    const form = new URLSearchParams();
    form.set("url", url);
    form.set("hd", "1");

    const dispatcher = await getDispatcher();

    const upstream = await fetch(TIKWM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // A UA header helps avoid some bot filters.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      },
      body: form.toString(),
      // Fail fast instead of hanging forever if TikWM is slow.
      signal: AbortSignal.timeout(20000),
      // When a residential proxy is configured, route through it.
      ...(dispatcher ? { dispatcher } : {}),
    });

    if (!upstream.ok) {
      return json({ ok: false, error: `Downloader service returned ${upstream.status}. Try again in a moment.` }, 502);
    }

    const payload = await upstream.json();

    // TikWM signals success with code === 0.
    if (payload?.code !== 0 || !payload?.data) {
      return json(
        { ok: false, error: payload?.msg || "Couldn't fetch that video. It may be private, deleted, or region-locked." },
        422
      );
    }

    const d = payload.data;

    // Normalize into a predictable shape. TikWM returns relative-ish paths sometimes,
    // so we absolutize anything that starts with "/".
    const abs = (p) =>
      typeof p === "string" && p.startsWith("/") ? `https://www.tikwm.com${p}` : p;

    const result = {
      ok: true,
      type: Array.isArray(d.images) && d.images.length ? "slideshow" : "video",
      id: d.id || null,
      title: d.title || "",
      cover: abs(d.cover) || abs(d.origin_cover) || null,
      duration: d.duration ?? null,
      author: {
        name: d.author?.nickname || d.author?.unique_id || "Unknown",
        handle: d.author?.unique_id ? `@${d.author.unique_id}` : "",
        avatar: abs(d.author?.avatar) || null,
      },
      stats: {
        plays: d.play_count ?? null,
        likes: d.digg_count ?? null,
        comments: d.comment_count ?? null,
        shares: d.share_count ?? null,
      },
      // The good stuff — direct, watermark-free URLs.
      downloads: {
        hd: abs(d.hdplay) || null,           // HD, no watermark
        sd: abs(d.play) || null,             // SD, no watermark
        watermarked: abs(d.wmplay) || null,  // original with watermark
        music: abs(d.music) || null,         // MP3 audio
      },
      images: Array.isArray(d.images) ? d.images.map(abs) : [],
    };

    return json(result, 200);
  } catch (err) {
    const timedOut = err?.name === "TimeoutError";
    return json(
      { ok: false, error: timedOut ? "The request timed out. Try again." : "Something broke on our side. Try again." },
      500
    );
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
