"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GoldButton } from "@/components/ui/GoldButton";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { cn } from "@/lib/utils";

interface TrilogyActProps {
  roman: string;
  kicker: string;
  title: string;
  body: string;
  amazonUrl: string;
  ctaLabel: string;
  align?: "left" | "right";
  background?: "dark" | "dark-2";
}

export function TrilogyAct({
  roman,
  kicker,
  title,
  body,
  amazonUrl,
  ctaLabel,
  align = "left",
  background = "dark",
}: TrilogyActProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const bg = background === "dark-2" ? "bg-dark-2" : "bg-dark";

  return (
    <section
      ref={ref}
      className={cn(
        "relative min-h-[90vh] overflow-hidden border-t border-gold/10 py-32",
        bg,
      )}
    >
      <motion.div
        aria-hidden
        style={{ y }}
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-serif text-[18rem] leading-none text-gold/10 md:text-[28rem]",
          align === "left" ? "-right-10 md:-right-20" : "-left-10 md:-left-20",
        )}
      >
        {roman}
      </motion.div>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          align === "left"
            ? "bg-[radial-gradient(ellipse_at_20%_50%,rgba(201,168,76,0.08)_0%,transparent_55%)]"
            : "bg-[radial-gradient(ellipse_at_80%_50%,rgba(201,168,76,0.08)_0%,transparent_55%)]",
        )}
      />

      <div className="container-editorial relative z-10 flex min-h-[60vh] items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex max-w-2xl flex-col gap-8",
            align === "right" && "md:ml-auto md:text-right md:items-end",
          )}
        >
          <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
            {kicker}
          </span>
          <h2 className="font-serif text-4xl leading-[1.05] text-cream md:text-6xl">
            {title}
          </h2>
          <GoldDivider
            length={60}
            className={align === "right" ? "md:ml-auto" : undefined}
          />
          <p className="max-w-xl font-serif text-lg leading-relaxed text-cream/80 md:text-xl">
            {body}
          </p>
          <div className="pt-4">
            <GoldButton href={amazonUrl} external>
              {ctaLabel}
            </GoldButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
