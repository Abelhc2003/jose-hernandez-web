"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { Book } from "@/types";
import { BookCover } from "./BookCover";
import { TrilogyBadge } from "./TrilogyBadge";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  labels: {
    categories: Record<Book["category"], string>;
    trilogyShort: string;
    buyOnAmazon: string;
    learnMore: string;
  };
  className?: string;
  delay?: number;
}

export function BookCard({ book, labels, className, delay = 0 }: BookCardProps) {
  const detailsHref = `/obras/${book.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={cn(
        "group flex flex-col gap-6 border border-gold/10 bg-dark-2 p-8 transition-colors duration-500 hover:border-gold/40",
        className,
      )}
    >
      <Link href={detailsHref} className="relative block">
        {book.isNew && (
          <span className="absolute left-0 top-3 z-10 bg-gold px-3 py-1 text-[9px] font-sans uppercase tracking-[0.35em] text-dark">
            Novedad
          </span>
        )}
        <BookCover book={book} />
      </Link>

      <div className="flex flex-col gap-3">
        {book.category === "trilogia" && book.trilogiaNum ? (
          <TrilogyBadge num={book.trilogiaNum} label={labels.trilogyShort} />
        ) : (
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold/70">
            {labels.categories[book.category]}
          </span>
        )}

        <Link href={detailsHref} className="block">
          <h3 className="font-serif text-2xl leading-tight text-cream transition-colors group-hover:text-gold">
            {book.title}
          </h3>
        </Link>
        {book.subtitle && (
          <p className="font-serif text-sm italic text-cream/60">
            {book.subtitle}
          </p>
        )}
        {book.hook && (
          <p className="mt-2 text-sm leading-relaxed text-cream/70">
            {book.hook}
          </p>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-6 pt-2 text-[11px] uppercase tracking-[0.3em]">
        <Link
          href={detailsHref}
          className="relative text-cream hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-[width] after:duration-500 hover:after:w-full"
        >
          {labels.learnMore}
        </Link>
        <a
          href={book.shopUrl ?? book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold/80 hover:text-gold"
        >
          {book.shopUrl && !book.amazonUrl.includes("amazon") ? "Comprar →" : `${labels.buyOnAmazon} →`}
        </a>
      </div>
    </motion.article>
  );
}
