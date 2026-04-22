"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

interface AuthorTimelineProps {
  tag: string;
  title: string;
  entries: TimelineEntry[];
}

export function AuthorTimeline({ tag, title, entries }: AuthorTimelineProps) {
  return (
    <section className="border-t border-gold/10 bg-dark py-32">
      <div className="container-editorial flex flex-col gap-16">
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
          <GoldDivider />
        </motion.header>

        <ol className="relative mx-auto max-w-3xl">
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gold/20 md:left-[11px]"
          />
          {entries.map((entry, i) => (
            <motion.li
              key={`${entry.year}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
              className="relative pb-14 pl-10 last:pb-0 md:pl-16"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[6px] h-4 w-4 rounded-full border border-gold bg-dark md:h-6 md:w-6"
              />
              <span
                aria-hidden
                className="absolute left-[5px] top-[11px] h-2 w-2 rounded-full bg-gold md:left-[9px]"
              />

              <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.35em] text-gold">
                  {entry.year}
                </span>
                <h3 className="font-serif text-xl leading-tight text-cream md:text-2xl">
                  {entry.title}
                </h3>
                <p className="max-w-prose text-sm leading-relaxed text-cream/70 md:text-base">
                  {entry.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
