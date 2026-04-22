"use client";

import { BookCard } from "@/components/ui/BookCard";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";
import type { Book, BookCategory } from "@/types";

interface RelatedBooksProps {
  tag: string;
  books: Book[];
  categoryLabels: Record<BookCategory, string>;
  trilogyShort: string;
  buyOnAmazon: string;
  learnMore: string;
}

export function RelatedBooks({
  tag,
  books,
  categoryLabels,
  trilogyShort,
  buyOnAmazon,
  learnMore,
}: RelatedBooksProps) {
  if (books.length === 0) return null;

  return (
    <section className="border-t border-gold/10 bg-dark py-32">
      <div className="container-editorial flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <SectionTag>{tag}</SectionTag>
          <GoldDivider />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <BookCard
              key={book.slug}
              book={book}
              delay={i * 0.1}
              labels={{
                categories: categoryLabels,
                trilogyShort,
                buyOnAmazon,
                learnMore,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
