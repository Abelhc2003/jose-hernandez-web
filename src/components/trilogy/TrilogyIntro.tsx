"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";

interface TrilogyIntroProps {
  kicker: string;
  title: string;
  body: string;
}

export function TrilogyIntro({ kicker, title, body }: TrilogyIntroProps) {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-dark pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.12)_0%,transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.5)_0%,transparent_30%,transparent_70%,rgba(13,13,13,1)_100%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[22rem] leading-none text-gold/5 md:text-[32rem]"
      >
        ∞
      </div>

      <div className="container-editorial relative z-10 flex flex-col items-center gap-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] uppercase tracking-[0.45em] text-gold/80"
        >
          {kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="font-serif text-4xl leading-[1.05] text-cream md:text-7xl"
        >
          {title}
        </motion.h1>

        <GoldDivider align="center" length={80} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="max-w-2xl font-serif text-lg italic leading-relaxed text-cream/80 md:text-2xl"
        >
          {body}
        </motion.p>

        <div
          aria-hidden
          className="mt-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-cream/40"
        >
          <span>scroll</span>
          <span className="h-14 w-px bg-gold/40" />
        </div>
      </div>
    </section>
  );
}
