import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthorHero } from "@/components/author/AuthorHero";
import { AuthorBio } from "@/components/author/AuthorBio";
import { AuthorTimeline, type TimelineEntry } from "@/components/author/AuthorTimeline";
import { AuthorCareer } from "@/components/author/AuthorCareer";
import { AuthorWorks } from "@/components/author/AuthorWorks";
import { books } from "@/data/books";
import type { BookCategory } from "@/types";

interface AuthorPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "author" });
  return {
    title: t("title"),
    description: t("kicker"),
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { locale } = params;
  setRequestLocale(locale);

  const t = await getTranslations("author");
  const tBooks = await getTranslations("books");

  const bioParagraphs = t.raw("intro.body") as string[];
  const timelineEntries = t.raw("timeline.entries") as TimelineEntry[];

  const categoryLabels: Record<BookCategory, string> = {
    trilogia: tBooks("categories.trilogia"),
    poesia: tBooks("categories.poesia"),
    narrativa: tBooks("categories.narrativa"),
  };

  return (
    <>
      <AuthorHero
        tag={t("tag")}
        title={t("title")}
        kicker={t("kicker")}
        quote={t("quote")}
      />

      <AuthorBio
        tag={t("intro.tag")}
        title={t("intro.title")}
        paragraphs={bioParagraphs}
      />

      <AuthorTimeline
        tag={t("timeline.tag")}
        title={t("timeline.title")}
        entries={timelineEntries}
      />

      <AuthorCareer
        tag={t("career.tag")}
        title={t("career.title")}
        body={t("career.body")}
      />

      <AuthorWorks
        tag={t("worksTag")}
        title={t("worksTitle")}
        body={t("worksBody")}
        cta={t("worksCta")}
        books={[...books]}
        categoryLabels={categoryLabels}
        trilogyShort={tBooks("trilogyShort")}
        buyOnAmazon={tBooks("buyOnAmazon")}
        learnMore={tBooks("learnMore")}
      />
    </>
  );
}
