"use client";

import { motion } from "framer-motion";
import { BookCard } from "@/components/ui/BookCard";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";
import type { Book, BookCategory } from "@/types";

interface WorksCategorySectionProps {
  id: BookCategory;
  tag: string;
  title: string;
  subtitle: string;
  body: string;
  books: Book[];
  categoryLabels: Record<BookCategory, string>;
  trilogyShort: string;
  buyOnAmazon: string;
  learnMore: string;
  background?: "dark" | "dark-2";
  roman?: string;
}

export function WorksCategorySection({
  id,
  tag,
  title,
  subtitle,
  body,
  books,
  categoryLabels,
  trilogyShort,
  buyOnAmazon,
  learnMore,
  background = "dark",
  roman,
}: WorksCategorySectionProps) {
  const bg = background === "dark-2" ? "bg-dark-2" : "bg-dark";

  return (
    <section
      id={id}
      className={`relative overflow-hidden border-t border-gold/10 ${bg} py-32`}
    >
      {roman && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 top-10 select-none font-serif text-[12rem] leading-none text-gold/5 md:text-[18rem]"
        >
          {roman}
        </div>
      )}

      <div className="container-editorial relative z-10 flex flex-col gap-16">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-2xl flex-col gap-6"
        >
          <SectionTag>{tag}</SectionTag>
          <h2 className="font-serif text-3xl leading-tight text-cream md:text-5xl">
            {title}
          </h2>
          <p className="font-serif text-sm italic text-cream/60">{subtitle}</p>
          <GoldDivider />
          <p className="text-base leading-relaxed text-cream/75 md:text-lg">
            {body}
          </p>
        </motion.header>

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
