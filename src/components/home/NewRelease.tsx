"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/GoldButton";
import { GoldDivider } from "@/components/ui/GoldDivider";
import type { Book } from "@/types";

interface NewReleaseProps {
  book: Book;
}

export function NewRelease({ book }: NewReleaseProps) {
  return (
    <section className="relative overflow-hidden border-y border-gold/15 bg-dark-3 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,168,76,0.08)_0%,transparent_60%)]"
      />

      <div className="container-editorial relative z-10 grid gap-12 md:grid-cols-[1fr_1.6fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xs"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-gold/20 bg-dark-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <Image
              src={book.coverImage}
              alt={`Portada de ${book.title}`}
              fill
              priority
              sizes="(max-width: 768px) 80vw, 320px"
              className="object-cover"
            />
          </div>
          <span className="absolute -right-3 -top-3 bg-gold px-4 py-2 text-[10px] uppercase tracking-[0.4em] text-dark shadow-lg">
            Novedad
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold">
            Nueva publicación
          </span>

          <h2 className="font-serif text-4xl leading-tight text-cream md:text-5xl">
            {book.title}
          </h2>

          {book.subtitle && (
            <p className="font-serif text-lg italic text-cream/60">
              {book.subtitle}
            </p>
          )}

          <GoldDivider length={50} />

          <p className="font-serif text-xl italic leading-relaxed text-cream/80">
            &ldquo;{book.hook}&rdquo;
          </p>

          <p className="max-w-lg text-sm leading-relaxed text-cream/60">
            {book.synopsis.split("\n\n")[0]}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <GoldButton href={book.shopUrl ?? book.amazonUrl} external>
              {book.shopUrl && !book.amazonUrl.includes("amazon")
                ? "Comprar libro"
                : "Comprar en Amazon"}
            </GoldButton>
            <GoldButton href={`/obras/${book.slug}`} variant="ghost">
              Leer más
            </GoldButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
