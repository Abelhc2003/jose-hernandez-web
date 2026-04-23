"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GoldButton } from "@/components/ui/GoldButton";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

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
  const container = useRef<HTMLElement>(null);
  const words = body.split(/\s+/);

  useGSAP(
    () => {
      const roots = container.current;
      if (!roots) return;

      gsap.to(".act-roman", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: roots,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".act-content",
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".act-kicker", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      })
        .from(
          ".act-title",
          {
            opacity: 0,
            y: 40,
            filter: "blur(8px)",
            duration: 1.1,
            ease: "power2.out",
          },
          "<0.1",
        )
        .from(
          ".act-divider",
          {
            scaleX: 0,
            transformOrigin: align === "right" ? "right center" : "left center",
            duration: 0.8,
            ease: "power2.out",
          },
          "<0.2",
        )
        .from(
          ".act-word",
          {
            opacity: 0,
            y: 10,
            stagger: 0.025,
            duration: 0.55,
            ease: "power2.out",
          },
          "<0.2",
        )
        .from(
          ".act-cta",
          {
            opacity: 0,
            y: 16,
            duration: 0.8,
            ease: "power2.out",
          },
          "<0.35",
        );
    },
    { scope: container },
  );

  const bg = background === "dark-2" ? "bg-dark-2" : "bg-dark";

  return (
    <section
      ref={container}
      className={cn(
        "relative min-h-[90vh] overflow-hidden border-t border-gold/10 py-32",
        bg,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "act-roman pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-serif text-[18rem] leading-none text-gold/10 md:text-[28rem]",
          align === "left" ? "-right-10 md:-right-20" : "-left-10 md:-left-20",
        )}
      >
        {roman}
      </div>

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
        <div
          className={cn(
            "act-content flex max-w-2xl flex-col gap-8",
            align === "right" && "md:ml-auto md:items-end md:text-right",
          )}
        >
          <span className="act-kicker text-[11px] uppercase tracking-[0.4em] text-gold/80">
            {kicker}
          </span>
          <h2 className="act-title font-serif text-4xl leading-[1.05] text-cream md:text-6xl">
            {title}
          </h2>
          <div
            className={cn(
              "act-divider",
              align === "right" && "md:ml-auto",
            )}
          >
            <GoldDivider length={60} />
          </div>
          <p className="max-w-xl font-serif text-lg leading-relaxed text-cream/80 md:text-xl">
            {words.map((w, i) => (
              <span key={i}>
                <span className="act-word inline-block">{w}</span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
          <div className="act-cta pt-4">
            <GoldButton href={amazonUrl} external>
              {ctaLabel}
            </GoldButton>
          </div>
        </div>
      </div>
    </section>
  );
}
