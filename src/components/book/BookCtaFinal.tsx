"use client";

import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/GoldButton";
import { SectionTag } from "@/components/ui/SectionTag";

interface BookCtaFinalProps {
  tag: string;
  title: string;
  body: string;
  cta: string;
  amazonUrl: string;
}

export function BookCtaFinal({
  tag,
  title,
  body,
  cta,
  amazonUrl,
}: BookCtaFinalProps) {
  return (
    <section className="relative overflow-hidden border-t border-gold/10 bg-dark py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.10)_0%,transparent_60%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="container-editorial relative z-10 flex max-w-2xl flex-col items-center gap-8 text-center"
      >
        <SectionTag>{tag}</SectionTag>
        <h2 className="font-serif text-3xl leading-tight text-cream md:text-5xl">
          {title}
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-cream/60">{body}</p>
        <div className="pt-4">
          <GoldButton href={amazonUrl} external>
            {cta}
          </GoldButton>
        </div>
      </motion.div>
    </section>
  );
}
