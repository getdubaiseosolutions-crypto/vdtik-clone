import { NextResponse } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";

// Redirect "/" to a locale, and let "/id", "/es" etc pass through.
// Also picks a sensible locale from the browser's Accept-Language on first visit.
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip Next internals, API, and files with an extension.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Does the path already start with a known locale?
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Guess from browser language, fall back to default.
  const accept = request.headers.get("accept-language") || "";
  const preferred = accept.split(",")[0]?.split("-")[0]?.toLowerCase();
  const locale = locales.includes(preferred) ? preferred : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
