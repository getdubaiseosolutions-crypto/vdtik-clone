import en from "./translations/en";
import id from "./translations/id";
import es from "./translations/es";
import pt from "./translations/pt";
import fr from "./translations/fr";
import de from "./translations/de";
import ar from "./translations/ar";
import ru from "./translations/ru";
import vi from "./translations/vi";
import th from "./translations/th";
import ja from "./translations/ja";
import { defaultLocale } from "./i18n";

const dictionaries = { en, id, es, pt, fr, de, ar, ru, vi, th, ja };

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}
