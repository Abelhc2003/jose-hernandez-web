"use client";

import { BookCard } from "@/components/ui/BookCard";
import { GoldButton } from "@/components/ui/GoldButton";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";
import type { Book, BookCategory } from "@/types";

interface AuthorWorksProps {
  tag: string;
  title: string;
  body: string;
  cta: string;
  books: Book[];
  categoryLabels: Record<BookCategory, string>;
  trilogyShort: string;
  buyOnAmazon: string;
  learnMore: string;
}

export function AuthorWorks({
  tag,
  title,
  body,
  cta,
  books,
  categoryLabels,
  trilogyShort,
  buyOnAmazon,
  learnMore,
}: AuthorWorksProps) {
  return (
    <section className="border-t border-gold/10 bg-dark py-32">
      <div className="container-editorial flex flex-col gap-16">
        <header className="flex max-w-2xl flex-col gap-6">
          <SectionTag>{tag}</SectionTag>
          <h2 className="font-serif text-3xl leading-tight text-cream md:text-5xl">
            {title}
          </h2>
          <GoldDivider />
          <p className="text-base leading-relaxed text-cream/75 md:text-lg">
            {body}
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <BookCard
              key={book.slug}
              book={book}
              delay={i * 0.08}
              labels={{
                categories: categoryLabels,
                trilogyShort,
                buyOnAmazon,
                learnMore,
              }}
            />
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <GoldButton href="/obras" variant="ghost">
            {cta}
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
