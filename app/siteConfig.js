// One place to set your site info. When you get a real domain,
// change SITE_URL below to "https://yourdomain.com" and everything
// (sitemap, canonical, OG tags) updates automatically.
export const siteConfig = {
  name: "GrabTok",
  // 👇 CHANGE THIS to your real domain when you have one.
  //    For now it uses an env var if set, otherwise a placeholder.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://grabtok.example.com",
  title: "GrabTok — Download TikTok HD, No Watermark",
  description:
    "Download TikTok videos in HD without watermark. Free, fast MP4 & MP3 downloader. Paste a link and save instantly — no signup.",
  twitter: "@grabtok",
};
