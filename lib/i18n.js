// All supported languages. Add or remove here and everything follows.
export const locales = ["en", "id", "es", "pt", "fr", "de", "ar", "ru", "vi", "th", "ja"];
export const defaultLocale = "en";

// RTL languages need direction flip.
export const rtlLocales = ["ar"];

export const localeNames = {
  en: "English",
  id: "Bahasa Indonesia",
  es: "Español",
  pt: "Português",
  fr: "Français",
  de: "Deutsch",
  ar: "العربية",
  ru: "Русский",
  vi: "Tiếng Việt",
  th: "ไทย",
  ja: "日本語",
};

export function isValidLocale(l) {
  return locales.includes(l);
}
export function dirFor(l) {
  return rtlLocales.includes(l) ? "rtl" : "ltr";
}
