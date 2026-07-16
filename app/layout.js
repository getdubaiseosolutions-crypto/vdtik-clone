import "./globals.css";

export const metadata = {
  title: "GrabTok — Download TikTok HD, No Watermark",
  description:
    "Paste a TikTok link, grab it clean. HD MP4, MP3 audio, and cover images with no watermark. Free, fast, no signup.",
  openGraph: {
    title: "GrabTok — Download TikTok HD, No Watermark",
    description:
      "Paste a TikTok link, grab it clean. HD MP4, MP3 audio, and covers. No watermark, no signup.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0B1120",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
