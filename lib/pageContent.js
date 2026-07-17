// Content for the About, Contact, Privacy, DMCA, and Terms pages.
// Legal pages are kept in clear English (standard practice), with the
// page chrome (nav, footer, language switcher) still fully localized.
// siteConfig.name is injected where {SITE} appears.

export const pageContent = {
  about: {
    title: "About Us",
    intro:
      "We built this TikTok video downloader to give everyone a fast, clean, and completely free way to save TikTok videos without watermark. No apps, no sign-ups, and no cost — just paste a link and download.",
    blocks: [
      {
        h: "What we do",
        p: "Our tool lets you download any public TikTok video in HD MP4, extract the audio as MP3, save the cover image, or grab every photo from a TikTok slideshow. Everything runs in your browser, so it works on iPhone, Android, Windows, Mac, and Linux without installing anything.",
      },
      {
        h: "Why we made it",
        p: "The TikTok app adds a moving watermark and username to every saved video, which gets in the way when creators, editors, and everyday users want a clean copy. We wanted a simple website that returns the original, watermark-free file in the best available quality, available in many languages for users around the world.",
      },
      {
        h: "Our promise",
        p: "We do not store your videos, we do not ask for a login, and we do not require any personal information. The tool is free to use with no download limits, and we work to keep it fast, private, and reliable.",
      },
    ],
  },

  contact: {
    title: "Contact Us",
    intro:
      "Have a question, a bug to report, or a suggestion? We would love to hear from you. Use the details below and we will get back to you as soon as we can.",
    blocks: [
      {
        h: "Email",
        p: "For general questions, feedback, or support, email us at support@{DOMAIN}. We read every message and aim to reply within a few business days.",
      },
      {
        h: "Copyright and removal requests",
        p: "If you are a rights holder and want content-related help, please see our DMCA page for the fastest way to reach us and the information we need to act on your request.",
      },
      {
        h: "Response time",
        p: "We are a small team, so please allow a little time for a reply. Clear, detailed messages help us help you faster.",
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    intro:
      "Your privacy matters to us. This policy explains, in plain language, what information we do and do not collect when you use {SITE}.",
    blocks: [
      {
        h: "Information we collect",
        p: "We do not require you to create an account or provide personal information to use this tool. We do not ask for your name, email, or TikTok login. The TikTok links you paste are used only to fetch the requested video and are not tied to your identity.",
      },
      {
        h: "Downloads and storage",
        p: "We do not store the videos you download. When you request a video, the file is fetched and passed through to your device; it is not kept on our servers after your download completes.",
      },
      {
        h: "Cookies and analytics",
        p: "We may use basic, privacy-friendly analytics to understand overall traffic (such as page views and general country) so we can improve the site. This data is aggregated and does not identify individual users. Any advertising or analytics providers we use are subject to their own privacy policies.",
      },
      {
        h: "Third parties",
        p: "Videos are served from TikTok's own content servers. When your browser downloads a file, that request goes to those servers directly. We do not control and are not responsible for the privacy practices of TikTok or ByteDance.",
      },
      {
        h: "Children",
        p: "This site is not directed at children under 13, and we do not knowingly collect information from them.",
      },
      {
        h: "Changes",
        p: "We may update this policy from time to time. Any changes will be posted on this page with an updated date.",
      },
    ],
  },

  dmca: {
    title: "DMCA / Copyright Policy",
    intro:
      "{SITE} respects the intellectual property rights of others and expects users to do the same. We respond to valid notices of alleged copyright infringement under the Digital Millennium Copyright Act (DMCA) and similar laws.",
    blocks: [
      {
        h: "We do not host content",
        p: "This site is a tool that helps users access publicly available TikTok videos. We do not host, store, or upload any videos ourselves. Files are delivered directly from TikTok's servers to the user's device.",
      },
      {
        h: "Filing a notice",
        p: "If you believe your copyrighted work has been made accessible in a way that infringes your rights, send a written notice to dmca@{DOMAIN} including: your contact information; a description of the copyrighted work; the specific URL or link involved; a statement that you have a good-faith belief the use is not authorized; a statement that the information is accurate and that you are the owner or authorized to act on the owner's behalf; and your physical or electronic signature.",
      },
      {
        h: "What we do",
        p: "Because we do not host content, the most effective action is usually to contact TikTok directly to remove the source video. Where applicable, we will take reasonable steps in response to valid notices.",
      },
      {
        h: "Counter-notices and misuse",
        p: "Submitting false or bad-faith claims may carry legal consequences. Please make sure your request is accurate before sending it.",
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    intro:
      "By using {SITE}, you agree to these terms. Please read them carefully. If you do not agree, please do not use the site.",
    blocks: [
      {
        h: "Acceptable use",
        p: "This tool is provided for personal, lawful use only. You agree to download only content that you own or that you have permission to save. You are solely responsible for how you use any downloaded content and for complying with TikTok's terms and all applicable laws.",
      },
      {
        h: "No affiliation",
        p: "{SITE} is an independent tool. We are not affiliated with, endorsed by, or connected to TikTok or ByteDance in any way. All trademarks belong to their respective owners.",
      },
      {
        h: "Intellectual property",
        p: "Videos and other content accessed through this tool belong to their original creators and rights holders. We claim no ownership over that content. Downloading and re-posting someone else's content without permission may violate copyright law.",
      },
      {
        h: "No warranty",
        p: "The service is provided 'as is' and 'as available', without warranties of any kind. We do not guarantee that every video will download, that the service will be uninterrupted, or that it will be error-free. Availability may change at any time.",
      },
      {
        h: "Limitation of liability",
        p: "To the maximum extent permitted by law, we are not liable for any damages arising from your use of, or inability to use, this site, including any misuse of downloaded content.",
      },
      {
        h: "Changes",
        p: "We may update these terms at any time. Continued use of the site after changes means you accept the updated terms.",
      },
    ],
  },
};

export const pageOrder = ["about", "contact", "privacy", "dmca", "terms"];
