"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [state, setState] = useState<FormState>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !accepted) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: accepted, locale }),
      });
      if (!res.ok) {
        setState("error");
        return;
      }
      setState("success");
      setEmail("");
      setAccepted(false);
      router.push("/newsletter");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4" noValidate>
      <div className="flex w-full flex-col gap-3 border border-gold/30 bg-dark p-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          {t("placeholder")}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          className="flex-1 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading" || !accepted}
          className={cn(
            "group relative overflow-hidden border border-gold px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-50",
            state !== "loading" && "hover:text-dark",
          )}
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0"
          />
          <span className="relative z-10">
            {state === "loading" ? "…" : t("cta")}
          </span>
        </button>
      </div>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-cream/60">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-[3px] h-4 w-4 shrink-0 appearance-none border border-gold/40 bg-transparent checked:bg-gold"
          aria-label={t("legal")}
        />
        <span>{t("legal")}</span>
      </label>

      {state === "success" && (
        <p role="status" className="text-xs uppercase tracking-[0.3em] text-gold">
          {t("success")}
        </p>
      )}
      {state === "error" && (
        <p role="alert" className="text-xs uppercase tracking-[0.3em] text-red-400">
          {t("error")}
        </p>
      )}
    </form>
  );
}
