"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/GoldButton";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";

interface AuthorMiniProps {
  tag: string;
  body: string;
  cta: string;
}

export function AuthorMini({ tag, body, cta }: AuthorMiniProps) {
  return (
    <section className="border-t border-gold/10 bg-dark-2 py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="container-editorial grid gap-12 md:grid-cols-[1fr_2fr] md:items-center"
      >
        <div className="relative mx-auto aspect-[4/5] w-full max-w-xs border border-gold/20 bg-dark">
          <div className="absolute inset-3 border border-gold/10" />
          <Image
            src="/images/author/jose-hernandez-mondejar.jpg"
            alt="José Hernández Mondéjar, escritor"
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/90 to-transparent px-4 pb-4 pt-10">
            <p className="text-center font-serif text-sm text-cream/90">
              José Hernández Mondéjar
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SectionTag>{tag}</SectionTag>
          <GoldDivider />
          <p className="font-serif text-lg italic leading-relaxed text-cream/80 md:text-xl">
            {body}
          </p>
          <div>
            <GoldButton href="/autor" variant="ghost">
              {cta}
            </GoldButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
