import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

type Messages = { [key: string]: string | Messages };

// English is the fallback: any key missing in another language falls back to English.
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [k, v] of Object.entries(override)) {
    const b = out[k];
    out[k] =
      typeof v === 'object' && v !== null && typeof b === 'object' && b !== null
        ? deepMerge(b as Messages, v as Messages)
        : v;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const en = (await import('../messages/en.json')).default as unknown as Messages;
  const messages =
    locale === 'en'
      ? en
      : deepMerge(
          en,
          (await import(`../messages/${locale}.json`)).default as unknown as Messages
        );

  return { locale, messages };
});
