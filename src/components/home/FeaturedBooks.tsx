"use client";

import { useTranslations } from "next-intl";
import { BookCard } from "@/components/ui/BookCard";
import { GoldButton } from "@/components/ui/GoldButton";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";
import type { Book, BookCategory } from "@/types";

interface FeaturedBooksProps {
  books: Book[];
}

export function FeaturedBooks({ books }: FeaturedBooksProps) {
  const t = useTranslations("home.featured");
  const tBooks = useTranslations("books");

  const categories: Record<BookCategory, string> = {
    trilogia: tBooks("categories.trilogia"),
    poesia: tBooks("categories.poesia"),
    narrativa: tBooks("categories.narrativa"),
  };

  return (
    <section className="border-y border-gold/10 bg-dark-2 py-32">
      <div className="container-editorial flex flex-col gap-16">
        <header className="flex flex-col items-start gap-6">
          <SectionTag>{t("tag")}</SectionTag>
          <h2 className="max-w-2xl font-serif text-3xl leading-tight text-cream md:text-5xl">
            {t("title")}
          </h2>
          <GoldDivider />
          <p className="max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
            {t("body")}
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          {books.map((book, i) => (
            <BookCard
              key={book.slug}
              book={book}
              delay={i * 0.1}
              labels={{
                categories,
                trilogyShort: tBooks("trilogyShort"),
                buyOnAmazon: tBooks("buyOnAmazon"),
                learnMore: tBooks("learnMore"),
              }}
            />
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <GoldButton href="/obras" variant="ghost">
            {t("cta")}
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
