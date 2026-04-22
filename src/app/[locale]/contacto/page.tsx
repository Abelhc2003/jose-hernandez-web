import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ContactForm } from "@/components/forms/ContactForm";

interface ContactPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return {
    title: t("title"),
    description: t("body"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  return (
    <section className="relative overflow-hidden bg-dark pb-32 pt-40 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.10)_0%,transparent_55%)]"
      />

      <div className="container-editorial relative z-10 grid gap-16 md:grid-cols-[1fr_1.4fr]">
        <header className="flex flex-col gap-6">
          <SectionTag>{t("kicker")}</SectionTag>
          <h1 className="font-serif text-4xl leading-[1.05] text-cream md:text-6xl">
            {t("title")}
          </h1>
          <GoldDivider length={60} />
          <p className="max-w-md text-base leading-relaxed text-cream/75 md:text-lg">
            {t("body")}
          </p>

          <dl className="mt-6 grid gap-6 border-t border-gold/10 pt-8 text-sm text-cream/70">
            <div className="flex flex-col gap-1">
              <dt className="text-[10px] uppercase tracking-[0.4em] text-gold/70">
                {t("info.location").split(",")[0]}
              </dt>
              <dd>{t("info.location")}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[10px] uppercase tracking-[0.4em] text-gold/70">
                ↳
              </dt>
              <dd>{t("info.response")}</dd>
            </div>
          </dl>
        </header>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
