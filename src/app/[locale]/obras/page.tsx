import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WorksHero } from "@/components/works/WorksHero";
import { WorksCategorySection } from "@/components/works/WorksCategorySection";
import {
  getBooksByCategory,
  getTrilogy,
} from "@/data/books";
import type { BookCategory } from "@/types";

interface WorksPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params,
}: WorksPageProps): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "works" });
  return {
    title: t("title"),
    description: t("body"),
  };
}

export default async function WorksPage({ params }: WorksPageProps) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("works");
  const tBooks = await getTranslations("books");

  const trilogy = getTrilogy();
  const poetry = getBooksByCategory("poesia");
  const fiction = getBooksByCategory("narrativa");
  const articulos = getBooksByCategory("articulos");

  const categoryLabels: Record<BookCategory, string> = {
    trilogia: tBooks("categories.trilogia"),
    poesia: tBooks("categories.poesia"),
    narrativa: tBooks("categories.narrativa"),
    articulos: tBooks("categories.articulos"),
  };

  const sharedLabels = {
    categoryLabels,
    trilogyShort: tBooks("trilogyShort"),
    buyOnAmazon: tBooks("buyOnAmazon"),
    learnMore: tBooks("learnMore"),
  };

  return (
    <>
      <WorksHero tag={t("tag")} title={t("title")} body={t("body")} />

      <WorksCategorySection
        id="trilogia"
        tag={tBooks("categories.trilogia")}
        title={t("sections.trilogia.title")}
        subtitle={t("sections.trilogia.subtitle")}
        body={t("sections.trilogia.body")}
        books={trilogy}
        background="dark-2"
        roman="III"
        {...sharedLabels}
      />

      <WorksCategorySection
        id="poesia"
        tag={tBooks("categories.poesia")}
        title={t("sections.poesia.title")}
        subtitle={t("sections.poesia.subtitle")}
        body={t("sections.poesia.body")}
        books={poetry}
        background="dark"
        {...sharedLabels}
      />

      <WorksCategorySection
        id="narrativa"
        tag={tBooks("categories.narrativa")}
        title={t("sections.narrativa.title")}
        subtitle={t("sections.narrativa.subtitle")}
        body={t("sections.narrativa.body")}
        books={fiction}
        background="dark-2"
        {...sharedLabels}
      />

      <WorksCategorySection
        id="articulos"
        tag={tBooks("categories.articulos")}
        title={t("sections.articulos.title")}
        subtitle={t("sections.articulos.subtitle")}
        body={t("sections.articulos.body")}
        books={articulos}
        background="dark"
        {...sharedLabels}
      />
    </>
  );
}
