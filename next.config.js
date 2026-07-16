/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow remote TikTok CDN thumbnails / covers
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

module.exports = nextConfig;
