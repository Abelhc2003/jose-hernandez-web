"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GoldButton } from "@/components/ui/GoldButton";
import { SectionTag } from "@/components/ui/SectionTag";

export function TrilogyTeaser() {
  const t = useTranslations("home.trilogy");

  return (
    <section className="relative overflow-hidden bg-dark py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(201,168,76,0.10)_0%,transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(201,168,76,0.05)_0%,transparent_55%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-10 select-none font-serif text-[14rem] leading-none text-gold/5 md:text-[20rem]"
      >
        III
      </div>

      <div className="container-editorial relative z-10 flex max-w-3xl flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8"
        >
          <SectionTag>{t("tag")}</SectionTag>
          <h2 className="font-serif text-4xl leading-[1.05] text-cream md:text-6xl">
            {t("title")}
          </h2>
          <p className="max-w-xl font-serif text-lg italic leading-relaxed text-cream/80 md:text-xl">
            {t("body")}
          </p>
          <div>
            <GoldButton href="/obras/trilogia">{t("cta")}</GoldButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
