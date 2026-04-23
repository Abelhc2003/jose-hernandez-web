"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { GoldButton } from "@/components/ui/GoldButton";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { TrilogyBadge } from "@/components/ui/TrilogyBadge";
import type { Book } from "@/types";

interface BookHeroProps {
  book: Book;
  categoryLabel: string;
  trilogyShort: string;
  buyOnAmazon: string;
  backToWorks: string;
  priceLabel: string;
}

export function BookHero({
  book,
  categoryLabel,
  trilogyShort,
  buyOnAmazon,
  backToWorks,
  priceLabel,
}: BookHeroProps) {
  const [showBack, setShowBack] = useState(false);
  const hasBothCovers = Boolean(book.coverImage && book.coverImageBack);
  const activeSrc = showBack ? book.coverImageBack! : book.coverImage;

  return (
    <section className="relative overflow-hidden bg-dark pb-20 pt-40 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(201,168,76,0.10)_0%,transparent_55%)]"
      />

      <div className="container-editorial relative z-10 grid gap-16 md:grid-cols-[1fr_1.2fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-5"
        >
          {/* Cover image with fade transition */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-gold/10 bg-dark-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={showBack ? "back" : "front"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {activeSrc ? (
                    <Image
                      src={activeSrc}
                      alt={
                        showBack
                          ? `Contraportada de ${book.title}`
                          : `Portada de ${book.title}`
                      }
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-dark-2 to-dark-3 p-6 text-center">
                      <span className="font-serif text-6xl text-gold/20">
                        {book.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Toggle front / back */}
          {hasBothCovers && (
            <div className="flex items-center gap-1 rounded-none border border-gold/20">
              <button
                onClick={() => setShowBack(false)}
                aria-pressed={!showBack}
                className={`px-5 py-2 text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                  !showBack
                    ? "bg-gold text-dark"
                    : "text-cream/50 hover:text-cream"
                }`}
              >
                Portada
              </button>
              <div className="h-4 w-px bg-gold/20" />
              <button
                onClick={() => setShowBack(true)}
                aria-pressed={showBack}
                className={`px-5 py-2 text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                  showBack
                    ? "bg-gold text-dark"
                    : "text-cream/50 hover:text-cream"
                }`}
              >
                Contraportada
              </button>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <Link
            href="/obras"
            className="text-[10px] uppercase tracking-[0.4em] text-cream/50 transition-colors hover:text-gold"
          >
            ← {backToWorks}
          </Link>

          {book.category === "trilogia" && book.trilogiaNum ? (
            <TrilogyBadge num={book.trilogiaNum} label={trilogyShort} />
          ) : (
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              {categoryLabel}
            </span>
          )}

          <h1 className="font-serif text-4xl leading-[1.05] text-cream md:text-6xl">
            {book.title}
          </h1>
          {book.subtitle && (
            <p className="font-serif text-xl italic text-cream/70 md:text-2xl">
              {book.subtitle}
            </p>
          )}

          <GoldDivider length={60} />

          {book.hook && (
            <p className="max-w-xl font-serif text-lg italic leading-relaxed text-cream/80 md:text-xl">
              &ldquo;{book.hook}&rdquo;
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <GoldButton href={book.amazonUrl} external>
              {buyOnAmazon}
            </GoldButton>
            {book.price && (
              <span className="text-xs uppercase tracking-[0.3em] text-cream/50">
                {priceLabel} {book.price}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
