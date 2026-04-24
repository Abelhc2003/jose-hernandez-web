import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrilogyIntro } from "@/components/trilogy/TrilogyIntro";
import { TrilogyAct } from "@/components/trilogy/TrilogyAct";
import { TrilogyTransition } from "@/components/trilogy/TrilogyTransition";
import { TrilogyClosing } from "@/components/trilogy/TrilogyClosing";
import { getTrilogy } from "@/data/books";
import type { BookCategory } from "@/types";

interface TrilogyPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params,
}: TrilogyPageProps): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "trilogyPage" });
  return {
    title: t("intro.title"),
    description: t("intro.body"),
  };
}

export default async function TrilogyPage({ params }: TrilogyPageProps) {
  const { locale } = params;
  setRequestLocale(locale);

  const t = await getTranslations("trilogyPage");
  const tBooks = await getTranslations("books");

  const trilogy = getTrilogy();
  const [book1, book2, book3] = trilogy;

  const categoryLabels: Record<BookCategory, string> = {
    trilogia: tBooks("categories.trilogia"),
    poesia: tBooks("categories.poesia"),
    narrativa: tBooks("categories.narrativa"),
    articulos: tBooks("categories.articulos"),
  };

  return (
    <>
      <TrilogyIntro
        kicker={t("intro.kicker")}
        title={t("intro.title")}
        body={t("intro.body")}
      />

      {book1 && (
        <TrilogyAct
          roman={t("acts.1.roman")}
          kicker={t("acts.1.kicker")}
          title={t("acts.1.title")}
          body={t("acts.1.body")}
          amazonUrl={book1.amazonUrl}
          ctaLabel={tBooks("buyOnAmazon")}
          align="left"
          background="dark"
        />
      )}

      <TrilogyTransition text={t("transitions.1")} />

      {book2 && (
        <TrilogyAct
          roman={t("acts.2.roman")}
          kicker={t("acts.2.kicker")}
          title={t("acts.2.title")}
          body={t("acts.2.body")}
          amazonUrl={book2.amazonUrl}
          ctaLabel={tBooks("buyOnAmazon")}
          align="right"
          background="dark-2"
        />
      )}

      <TrilogyTransition text={t("transitions.2")} />

      {book3 && (
        <TrilogyAct
          roman={t("acts.3.roman")}
          kicker={t("acts.3.kicker")}
          title={t("acts.3.title")}
          body={t("acts.3.body")}
          amazonUrl={book3.amazonUrl}
          ctaLabel={tBooks("buyOnAmazon")}
          align="left"
          background="dark"
        />
      )}

      <TrilogyClosing
        kicker={t("closing.kicker")}
        title={t("closing.title")}
        body={t("closing.body")}
        books={trilogy}
        categoryLabels={categoryLabels}
        trilogyShort={tBooks("trilogyShort")}
        buyOnAmazon={tBooks("buyOnAmazon")}
        learnMore={tBooks("learnMore")}
      />
    </>
  );
}
