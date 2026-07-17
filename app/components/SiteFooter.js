import { siteConfig } from "../siteConfig";

// Shared footer with brand, page links, and legal note.
export default function SiteFooter({ lang, t }) {
  const f = t.footer;
  const links = [
    { href: `/${lang}/about`, label: f.about },
    { href: `/${lang}/contact`, label: f.contact },
    { href: `/${lang}/privacy`, label: f.privacy },
    { href: `/${lang}/dmca`, label: f.dmca },
    { href: `/${lang}/terms`, label: f.terms },
  ];

  return (
    <footer className="mt-10 border-t border-edge bg-ink/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <a href={`/${lang}`} className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-signal text-ink font-bold">G</div>
              <span className="text-lg font-semibold tracking-tight">
                Grab<span className="text-signal">Tok</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-mist">{f.tagline}</p>
          </div>

          {/* Page links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-mist">{f.pages}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-mist transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-edge pt-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. {f.disclaimer}</p>
          <p>{f.rights}</p>
        </div>
      </div>
    </footer>
  );
}
