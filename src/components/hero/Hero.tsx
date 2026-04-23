"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GoldButton } from "@/components/ui/GoldButton";
import { GoldDivider } from "@/components/ui/GoldDivider";

const BookScene = dynamic(() => import("./BookScene"), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.12)_0%,transparent_60%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <BookScene />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(13,13,13,0.55)_65%,rgba(13,13,13,1)_100%)]"
      />

      <div className="container-editorial relative z-10 flex flex-col items-center gap-10 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] uppercase tracking-[0.45em] text-gold/80"
        >
          {t("ornament")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="font-serif text-4xl leading-[1.05] text-cream md:text-7xl"
        >
          {t("name")}
        </motion.h1>

        <GoldDivider align="center" length={70} />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="max-w-xl font-serif text-base italic leading-relaxed text-cream/80 md:text-lg"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="pointer-events-auto flex flex-wrap items-center justify-center gap-6"
        >
          <GoldButton href="/obras">{t("cta")}</GoldButton>
          <GoldButton href="/autor" variant="ghost">
            {t("secondaryCta")}
          </GoldButton>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-cream/40"
      >
        <span>scroll</span>
        <span className="h-10 w-px bg-gold/40" />
      </div>
    </section>
  );
}
