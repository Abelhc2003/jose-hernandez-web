"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";

interface WorksHeroProps {
  tag: string;
  title: string;
  body: string;
}

export function WorksHero({ tag, title, body }: WorksHeroProps) {
  return (
    <section className="relative overflow-hidden bg-dark pb-20 pt-40 md:pt-56">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.10)_0%,transparent_60%)]"
      />
      <div className="container-editorial relative z-10 flex max-w-3xl flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionTag>{tag}</SectionTag>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-serif text-4xl leading-[1.05] text-cream md:text-6xl"
        >
          {title}
        </motion.h1>
        <GoldDivider length={70} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="max-w-2xl font-serif text-lg italic leading-relaxed text-cream/80 md:text-xl"
        >
          {body}
        </motion.p>
      </div>
    </section>
  );
}
