"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function AuthorQuote() {
  const t = useTranslations("home.quote");

  return (
    <section className="border-y border-gold/10 bg-dark-2 py-32">
      <div className="container-editorial flex max-w-3xl flex-col items-center gap-10 text-center">
        <motion.span
          aria-hidden
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-8xl leading-none text-gold/40"
        >
          “
        </motion.span>
        <motion.blockquote
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-serif text-2xl italic leading-relaxed text-cream md:text-3xl"
        >
          {t("text")}
        </motion.blockquote>
        <motion.figcaption
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-xs uppercase tracking-[0.4em] text-gold"
        >
          — {t("author")}
        </motion.figcaption>
      </div>
    </section>
  );
}
