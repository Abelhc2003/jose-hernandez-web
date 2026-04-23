"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";

interface AuthorBioProps {
  tag: string;
  title: string;
  paragraphs: string[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function AuthorBio({ tag, title, paragraphs }: AuthorBioProps) {
  return (
    <section className="border-t border-gold/10 bg-dark-2 py-32">
      <div className="container-editorial flex max-w-3xl flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col gap-6"
        >
          <SectionTag>{tag}</SectionTag>
          <h2 className="font-serif text-3xl leading-tight text-cream md:text-5xl">
            {title}
          </h2>
          <GoldDivider />
        </motion.div>

        <div className="flex flex-col gap-6 text-base leading-relaxed text-cream/80 md:text-lg">
          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
              className={
                i === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-gold"
                  : undefined
              }
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
