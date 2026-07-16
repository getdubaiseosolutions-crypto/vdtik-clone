"use client";

import { useState } from "react";

function formatCount(n) {
  if (n == null) return "—";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function Downloader() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url.trim()) {
      setStatus("error");
      setError("Paste a TikTok link first.");
      return;
    }
    setStatus("loading");
    setError("");
    setData(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const payload = await res.json();
      if (!payload.ok) {
        setStatus("error");
        setError(payload.error || "Couldn't grab that one.");
        return;
      }
      setData(payload);
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Network hiccup. Check your connection and try again.");
    }
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text.trim());
    } catch {
      /* clipboard blocked — user can paste manually */
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Input bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-surface/80 backdrop-blur border border-edge">
          <div className="flex-1 flex items-center gap-2 px-3">
            <LinkIcon />
            <input
              type="text"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste TikTok link here…"
              className="w-full bg-transparent py-3 text-[15px] text-white placeholder:text-mist/60 outline-none"
              aria-label="TikTok video URL"
            />
            <button
              type="button"
              onClick={pasteFromClipboard}
              className="shrink-0 text-xs font-medium text-mist hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-edge/60"
            >
              Paste
            </button>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="relative shrink-0 rounded-xl bg-signal px-6 py-3 font-display font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 shadow-glow"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <Spinner /> Grabbing…
              </span>
            ) : (
              "Grab it"
            )}
          </button>
        </div>
      </form>

      <p className="mt-3 text-center text-xs text-mist">
        Secure & anonymous · Unlimited grabs · No signup
      </p>

      {/* Error */}
      {status === "error" && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Result */}
      {status === "done" && data && (
        <ResultCard data={data} />
      )}
      {/* end result */}
    </div>
  );
}

// Build a URL that routes the file through our /api/save route so the
// browser SAVES it (attachment) instead of opening/playing it in a tab.
function saveUrl(fileUrl, name) {
  if (!fileUrl) return null;
  const params = new URLSearchParams({ url: fileUrl, name: name || "grabtok" });
  return `/api/save?${params.toString()}`;
}

function ResultCard({ data }) {
  const isSlideshow = data.type === "slideshow";
  // A clean base filename like "username_1234"
  const base = `${(data.author.handle || "grabtok").replace(/[@\s]/g, "")}_${data.id || ""}`.replace(/_+$/, "");

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-edge bg-surface/70 backdrop-blur">
      <div className="flex flex-col md:flex-row">
        {/* Cover */}
        <div className="md:w-56 shrink-0 bg-ink/60">
          {data.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.cover}
              alt="Video cover"
              className="h-full w-full object-cover md:aspect-[9/16]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex aspect-[9/16] items-center justify-center text-mist text-sm">
              No preview
            </div>
          )}
        </div>

        {/* Info + actions */}
        <div className="flex-1 p-5">
          <div className="flex items-center gap-3">
            {data.author.avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.author.avatar}
                alt=""
                className="h-9 w-9 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="min-w-0">
              <p className="truncate font-display font-semibold text-white">
                {data.author.name}
              </p>
              <p className="truncate text-xs text-mist">{data.author.handle}</p>
            </div>
          </div>

          {data.title && (
            <p className="mt-3 line-clamp-2 text-sm text-mist">{data.title}</p>
          )}

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-mist">
            <Stat label="Plays" value={formatCount(data.stats.plays)} />
            <Stat label="Likes" value={formatCount(data.stats.likes)} />
            <Stat label="Comments" value={formatCount(data.stats.comments)} />
          </div>

          {/* Download buttons */}
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {!isSlideshow && (
              <>
                <DownloadBtn href={saveUrl(data.downloads.hd, `${base}_hd`)} primary label="HD · No watermark" />
                <DownloadBtn href={saveUrl(data.downloads.sd, `${base}_sd`)} label="SD · No watermark" />
                <DownloadBtn href={saveUrl(data.downloads.watermarked, `${base}_wm`)} label="With watermark" />
              </>
            )}
            <DownloadBtn href={saveUrl(data.downloads.music, `${base}_audio`)} label="MP3 audio" />
            <DownloadBtn href={saveUrl(data.cover, `${base}_cover`)} label="Cover image" />
          </div>

          {/* Slideshow images */}
          {isSlideshow && data.images.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-medium text-mist">
                {data.images.length} photos
              </p>
              <div className="grid grid-cols-4 gap-2">
                {data.images.map((img, i) => (
                  <a
                    key={i}
                    href={saveUrl(img, `${base}_photo${i + 1}`)}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-edge"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Photo ${i + 1}`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <span>
      <span className="font-mono font-medium text-white">{value}</span>{" "}
      <span>{label}</span>
    </span>
  );
}

function DownloadBtn({ href, label, primary }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      download
      className={
        "flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors " +
        (primary
          ? "bg-signal text-ink hover:bg-signal/90"
          : "border border-edge bg-ink/40 text-white hover:bg-edge/60")
      }
    >
      <DownloadIcon /> {label}
    </a>
  );
}

/* --- tiny inline icons (no dependency) --- */
function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-mist">
      <path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
