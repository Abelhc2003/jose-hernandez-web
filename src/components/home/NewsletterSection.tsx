"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function NewsletterSection() {
  const t = useTranslations("newsletter");

  return (
    <section className="bg-dark py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="container-editorial flex max-w-2xl flex-col items-center gap-8 text-center"
      >
        <SectionTag>{t("tag")}</SectionTag>
        <h2 className="font-serif text-3xl leading-tight text-cream md:text-5xl">
          {t("title")}
        </h2>
        <GoldDivider align="center" />
        <p className="max-w-md text-sm leading-relaxed text-cream/60">
          {t("body")}
        </p>
        <div className="w-full max-w-md pt-4">
          <NewsletterForm />
        </div>
      </motion.div>
    </section>
  );
}
