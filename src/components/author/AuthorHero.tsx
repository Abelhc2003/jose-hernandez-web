"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";

interface AuthorHeroProps {
  tag: string;
  title: string;
  kicker: string;
  quote: string;
}

export function AuthorHero({ tag, title, kicker, quote }: AuthorHeroProps) {
  return (
    <section className="relative overflow-hidden bg-dark pb-20 pt-40 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.10)_0%,transparent_55%)]"
      />

      <div className="container-editorial relative z-10 grid gap-16 md:grid-cols-[1fr_1.3fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md border border-gold/20 bg-dark-2"
        >
          {/* TODO: sustituir por foto real del autor en /public/images/author/ cuando esté disponible */}
          <div className="absolute inset-4 border border-gold/10" />
          <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
            <span className="font-serif text-7xl text-gold/30">JHM</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-cream/40">
              Foto pendiente
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          <SectionTag>{tag}</SectionTag>
          <h1 className="font-serif text-4xl leading-[1.05] text-cream md:text-6xl">
            {title}
          </h1>
          <p className="text-sm uppercase tracking-[0.4em] text-cream/60">
            {kicker}
          </p>
          <GoldDivider length={70} />
          <blockquote className="max-w-xl font-serif text-xl italic leading-relaxed text-cream/85 md:text-2xl">
            “{quote}”
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
