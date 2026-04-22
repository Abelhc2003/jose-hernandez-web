"use client";

import { motion } from "framer-motion";

interface TrilogyTransitionProps {
  text: string;
}

export function TrilogyTransition({ text }: TrilogyTransitionProps) {
  return (
    <section className="relative border-t border-gold/10 bg-dark py-32">
      <motion.p
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="container-editorial max-w-3xl text-center font-serif text-2xl italic leading-relaxed text-cream/70 md:text-4xl"
      >
        {text}
      </motion.p>
    </section>
  );
}
