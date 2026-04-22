"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";

interface BookSynopsisProps {
  tag: string;
  body: string;
  quote?: string;
}

export function BookSynopsis({ tag, body, quote }: BookSynopsisProps) {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="border-t border-gold/10 bg-dark-2 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="container-editorial flex max-w-3xl flex-col gap-8"
      >
        <SectionTag>{tag}</SectionTag>
        <GoldDivider />
        <div className="flex flex-col gap-6 text-base leading-relaxed text-cream/80 md:text-lg">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className={i === 0 ? "first-letter:font-serif first-letter:text-5xl first-letter:text-gold first-letter:leading-none first-letter:float-left first-letter:mr-2 first-letter:mt-1" : undefined}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {quote && (
          <blockquote className="relative mt-6 border-l border-gold/40 pl-6 font-serif text-xl italic leading-relaxed text-cream md:text-2xl">
            “{quote}”
          </blockquote>
        )}
      </motion.div>
    </section>
  );
}
