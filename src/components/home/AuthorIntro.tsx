"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GoldButton } from "@/components/ui/GoldButton";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function AuthorIntro() {
  const t = useTranslations("home.intro");

  return (
    <section className="py-32">
      <div className="container-editorial grid gap-16 md:grid-cols-[1fr_1.25fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] w-full max-w-md border border-gold/20 bg-dark-2"
        >
          <div className="absolute inset-4 border border-gold/10" />
          <Image
            src="/images/author/jose-hernandez-mondejar.jpg"
            alt="José Hernández Mondéjar, escritor"
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <SectionTag>{t("tag")}</SectionTag>
          <h2 className="font-serif text-3xl leading-tight text-cream md:text-5xl">
            {t("title")}
          </h2>
          <GoldDivider />
          <p className="text-base leading-relaxed text-cream/80 md:text-lg">
            {t("body")}
          </p>
          <div>
            <GoldButton href="/autor">{t("cta")}</GoldButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
