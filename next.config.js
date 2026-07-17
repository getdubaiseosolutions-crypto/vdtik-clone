/** @type {import('next').NextConfig} */

// Reads your redirects from the easy-to-edit "redirects.js" file.
// To add a redirect: open redirects.js and follow the example there.
const myRedirects = require("./redirects");

const nextConfig = {
  images: {
    // Allow remote TikTok CDN thumbnails / covers
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  async redirects() {
    return myRedirects;
  },
};

module.exports = nextConfig;
