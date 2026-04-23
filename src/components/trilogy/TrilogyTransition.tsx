"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface TrilogyTransitionProps {
  text: string;
}

export function TrilogyTransition({ text }: TrilogyTransitionProps) {
  const container = useRef<HTMLElement>(null);
  const chars = Array.from(text);

  useGSAP(
    () => {
      gsap.from(".tr-char", {
        opacity: 0,
        y: 6,
        filter: "blur(4px)",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.018,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          end: "top 35%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative border-t border-gold/10 bg-dark py-32"
    >
      <p
        aria-label={text}
        className="container-editorial max-w-3xl text-center font-serif text-2xl italic leading-relaxed text-cream/70 md:text-4xl"
      >
        {chars.map((c, i) => (
          <span
            key={i}
            aria-hidden
            className="tr-char inline-block whitespace-pre"
          >
            {c}
          </span>
        ))}
      </p>
    </section>
  );
}
