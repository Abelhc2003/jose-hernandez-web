"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

const SUBJECTS = ["presentation", "interview", "work", "other"] as const;

export function ContactForm() {
  const t = useTranslations("contact");
  const tPage = useTranslations("contactPage");
  const locale = useLocale();

  const [state, setState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "presentation",
      message: "",
      consent: false as unknown as true,
    },
  });

  async function onSubmit(values: ContactInput) {
    setState("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      if (res.status === 429) {
        setServerError(tPage("errors.rate"));
        setState("error");
        return;
      }

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setServerError(
          body?.error === "invalid"
            ? tPage("errors.invalid")
            : tPage("errors.generic"),
        );
        setState("error");
        return;
      }

      setState("success");
      reset();
    } catch {
      setServerError(tPage("errors.generic"));
      setState("error");
    }
  }

  const inputClass =
    "w-full border border-gold/30 bg-dark px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";
  const labelClass = "text-[11px] uppercase tracking-[0.3em] text-cream/70";
  const errorClass = "text-[11px] uppercase tracking-[0.2em] text-red-400";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>{t("form.name")}</span>
          <input
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputClass}
          />
          {errors.name && (
            <span className={errorClass}>
              {errors.name.message === "String must contain at least 2 character(s)"
                ? tPage("errors.short")
                : tPage("errors.required")}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>{t("form.email")}</span>
          <input
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputClass}
          />
          {errors.email && (
            <span className={errorClass}>{tPage("errors.email")}</span>
          )}
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>{t("form.subject")}</span>
        <select
          {...register("subject")}
          className={cn(inputClass, "appearance-none")}
        >
          {SUBJECTS.map((key) => (
            <option key={key} value={key} className="bg-dark text-cream">
              {t(`subjects.${key}`)}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>{t("form.message")}</span>
        <textarea
          rows={7}
          {...register("message")}
          className={cn(inputClass, "resize-y")}
        />
        {errors.message && (
          <span className={errorClass}>{tPage("errors.short")}</span>
        )}
      </label>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-cream/60">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-[3px] h-4 w-4 shrink-0 appearance-none border border-gold/40 bg-transparent checked:bg-gold"
        />
        <span>{tPage("consent")}</span>
      </label>
      {errors.consent && (
        <span className={errorClass}>{tPage("errors.consent")}</span>
      )}

      <div className="flex items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={isSubmitting || state === "loading"}
          className={cn(
            "group relative inline-flex items-center justify-center overflow-hidden border border-gold px-10 py-3 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-50",
            state !== "loading" && "hover:text-dark",
          )}
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0"
          />
          <span className="relative z-10">
            {state === "loading" ? "…" : t("form.send")}
          </span>
        </button>

        {state === "success" && (
          <span
            role="status"
            className="text-xs uppercase tracking-[0.3em] text-gold"
          >
            {tPage("success")}
          </span>
        )}
      </div>

      {state === "error" && serverError && (
        <p role="alert" className="text-xs uppercase tracking-[0.3em] text-red-400">
          {serverError}
        </p>
      )}
    </form>
  );
}
