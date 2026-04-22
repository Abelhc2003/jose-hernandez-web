"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";

interface AuthorCareerProps {
  tag: string;
  title: string;
  body: string;
}

export function AuthorCareer({ tag, title, body }: AuthorCareerProps) {
  return (
    <section className="border-t border-gold/10 bg-dark-2 py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="container-editorial flex max-w-3xl flex-col gap-6"
      >
        <SectionTag>{tag}</SectionTag>
        <h2 className="font-serif text-2xl leading-tight text-cream md:text-4xl">
          {title}
        </h2>
        <GoldDivider />
        <p className="text-base leading-relaxed text-cream/80 md:text-lg">
          {body}
        </p>
      </motion.div>
    </section>
  );
}
