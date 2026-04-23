import type { MetadataRoute } from "next";
import { books } from "@/data/books";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = [
  "",
  "/autor",
  "/obras",
  "/obras/trilogia",
  "/contacto",
  "/privacidad",
  "/aviso-legal",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://josehernandezmondejar.com"
  ).replace(/\/$/, "");

  const { locales, defaultLocale } = routing;

  const makeUrl = (locale: string, path: string): string => {
    if (locale === defaultLocale) {
      return `${base}${path || "/"}`;
    }
    return `${base}/${locale}${path}`;
  };

  const paths: string[] = [
    ...STATIC_PATHS,
    ...books.map((book) => `/obras/${book.slug}`),
  ];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = makeUrl(locale, path);
    }

    for (const locale of locales) {
      entries.push({
        url: makeUrl(locale, path),
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : path.startsWith("/obras/") ? 0.7 : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
