"use client";

import { Link } from "@/i18n/navigation";
import { SectionTag } from "@/components/ui/SectionTag";
import type { Book } from "@/types";
import { cn } from "@/lib/utils";

const ROMAN = ["", "I", "II", "III"] as const;

interface TrilogyNavProps {
  tag: string;
  books: Book[];
  currentSlug: string;
}

export function TrilogyNav({ tag, books, currentSlug }: TrilogyNavProps) {
  return (
    <section className="border-t border-gold/10 bg-dark py-20">
      <div className="container-editorial flex flex-col gap-10">
        <SectionTag>{tag}</SectionTag>

        <ol className="grid gap-4 md:grid-cols-3">
          {books.map((book) => {
            const active = book.slug === currentSlug;
            const roman = ROMAN[book.trilogiaNum ?? 0];
            return (
              <li key={book.slug}>
                <Link
                  href={`/obras/${book.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-start gap-6 border p-6 transition-colors duration-500",
                    active
                      ? "border-gold bg-gold-muted"
                      : "border-gold/15 hover:border-gold/60",
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-4xl leading-none",
                      active ? "text-gold" : "text-gold/40 group-hover:text-gold/70",
                    )}
                  >
                    {roman}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "font-serif text-lg leading-tight",
                        active ? "text-cream" : "text-cream/90",
                      )}
                    >
                      {book.title}
                    </span>
                    {book.subtitle && (
                      <span className="font-serif text-xs italic text-cream/50">
                        {book.subtitle}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
