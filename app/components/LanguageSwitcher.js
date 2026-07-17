"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, defaultLocale } from "../../lib/i18n";

export default function LanguageSwitcher({ current }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(lang) {
    // Replace the current locale prefix with the chosen one.
    const segments = pathname.split("/").filter(Boolean);
    if (locales.includes(segments[0])) segments.shift();
    const rest = segments.join("/");
    const target = `/${lang}${rest ? "/" + rest : ""}`;
    setOpen(false);
    router.push(target);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-edge bg-surface/60 px-3 py-2 text-sm text-mist transition-colors hover:text-white"
        aria-label="Change language"
      >
        <GlobeIcon />
        <span className="hidden sm:inline">{localeNames[current] || "Language"}</span>
        <span className="sm:hidden uppercase">{current}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 max-h-80 w-48 overflow-auto rounded-xl border border-edge bg-surface p-1 shadow-xl">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchTo(l)}
              className={
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors " +
                (l === current ? "bg-signal/10 text-signal" : "text-mist hover:bg-edge/60 hover:text-white")
              }
            >
              {localeNames[l]}
              {l === current && <CheckIcon />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function ChevronIcon({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={"transition-transform " + (open ? "rotate-180" : "")}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
