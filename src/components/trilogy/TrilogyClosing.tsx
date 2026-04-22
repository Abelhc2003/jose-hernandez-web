"use client";

import { motion } from "framer-motion";
import { BookCard } from "@/components/ui/BookCard";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";
import type { Book, BookCategory } from "@/types";

interface TrilogyClosingProps {
  kicker: string;
  title: string;
  body: string;
  books: Book[];
  categoryLabels: Record<BookCategory, string>;
  trilogyShort: string;
  buyOnAmazon: string;
  learnMore: string;
}

export function TrilogyClosing({
  kicker,
  title,
  body,
  books,
  categoryLabels,
  trilogyShort,
  buyOnAmazon,
  learnMore,
}: TrilogyClosingProps) {
  return (
    <section className="relative overflow-hidden border-t border-gold/10 bg-dark-2 py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.12)_0%,transparent_60%)]"
      />

      <div className="container-editorial relative z-10 flex flex-col gap-16">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-3xl flex-col items-center gap-6 text-center mx-auto"
        >
          <SectionTag>{kicker}</SectionTag>
          <h2 className="font-serif text-3xl leading-tight text-cream md:text-5xl">
            {title}
          </h2>
          <GoldDivider align="center" length={70} />
          <p className="max-w-xl font-serif text-lg italic leading-relaxed text-cream/80 md:text-xl">
            {body}
          </p>
        </motion.header>

        <div className="grid gap-8 md:grid-cols-3">
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
