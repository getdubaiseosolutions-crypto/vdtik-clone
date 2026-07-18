import LanguageSwitcher from "./LanguageSwitcher";

// Shared header used on the homepage and all info pages.
// `showNav` hides the section anchors on pages that don't have them.
export default function SiteHeader({ lang, t, showNav = true }) {
  return (
    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <a href={`/${lang}`} className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-signal text-ink font-bold">G</div>
        <span className="text-lg font-semibold tracking-tight">
          Grab<span className="text-signal">Tok</span>
        </span>
      </a>
      <div className="flex items-center gap-3">
        {showNav && (
          <nav className="hidden items-center gap-6 text-sm text-mist sm:flex">
            <a href={`/${lang}#how`} className="hover:text-white transition-colors">{t.nav.how}</a>
            <a href={`/${lang}#features`} className="hover:text-white transition-colors">{t.nav.features}</a>
            <a href={`/${lang}#faq`} className="hover:text-white transition-colors">{t.nav.faq}</a>
          </nav>
        )}
        <LanguageSwitcher current={lang} />
      </div>
    </header>
  );
}
