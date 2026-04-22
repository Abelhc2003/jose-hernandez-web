import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookHero } from "@/components/book/BookHero";
import { BookSynopsis } from "@/components/book/BookSynopsis";
import { TrilogyNav } from "@/components/book/TrilogyNav";
import { AuthorMini } from "@/components/book/AuthorMini";
import { RelatedBooks } from "@/components/book/RelatedBooks";
import { BookCtaFinal } from "@/components/book/BookCtaFinal";
import {
  books,
  getBookBySlug,
  getRelatedBooks,
  getTrilogy,
} from "@/data/books";
import type { BookCategory } from "@/types";

interface BookPageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const book = getBookBySlug(slug);
  const t = await getTranslations({ locale, namespace: "bookPage" });

  if (!book) {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundBody"),
    };
  }

  const title = book.subtitle ? `${book.title} — ${book.subtitle}` : book.title;
  const description =
    book.synopsis?.slice(0, 160) || book.hook || t("aboutBody");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: book.coverImage ? [book.coverImage] : undefined,
    },
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { locale, slug } = params;
  setRequestLocale(locale);

  const book = getBookBySlug(slug);
  if (!book) notFound();

  const t = await getTranslations("bookPage");
  const tBooks = await getTranslations("books");

  const categoryLabels: Record<BookCategory, string> = {
    trilogia: tBooks("categories.trilogia"),
    poesia: tBooks("categories.poesia"),
    narrativa: tBooks("categories.narrativa"),
  };

  const related = getRelatedBooks(slug, 3);
  const trilogy = book.category === "trilogia" ? getTrilogy() : [];

  const synopsisBody = book.synopsis?.trim() || t("synopsisFallback");

  return (
    <>
      <BookHero
        book={book}
        categoryLabel={categoryLabels[book.category]}
        trilogyShort={tBooks("trilogyShort")}
        buyOnAmazon={tBooks("buyOnAmazon")}
        backToWorks={t("backToWorks")}
        priceLabel={t("price")}
      />

      <BookSynopsis
        tag={t("synopsisTag")}
        body={synopsisBody}
        quote={book.quote?.trim() || undefined}
      />

      {book.category === "trilogia" && trilogy.length > 0 && (
        <TrilogyNav
          tag={t("trilogyNavTag")}
          books={trilogy}
          currentSlug={book.slug}
        />
      )}

      <AuthorMini
        tag={t("authorTag")}
        body={t("authorBody")}
        cta={t("authorCta")}
      />

      <RelatedBooks
        tag={t("relatedTag")}
        books={related}
        categoryLabels={categoryLabels}
        trilogyShort={tBooks("trilogyShort")}
        buyOnAmazon={tBooks("buyOnAmazon")}
        learnMore={tBooks("learnMore")}
      />

      <BookCtaFinal
        tag={t("ctaFinalTag")}
        title={t("ctaFinalTitle")}
        body={t("ctaFinalBody")}
        cta={tBooks("buyOnAmazon")}
        amazonUrl={book.amazonUrl}
      />
    </>
  );
}
