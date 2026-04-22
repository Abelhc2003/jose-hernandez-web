import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GoldButton } from "@/components/ui/GoldButton";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionTag } from "@/components/ui/SectionTag";

interface NewsletterPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params,
}: NewsletterPageProps): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "newsletterPage" });
  return {
    title: t("title"),
    description: t("body"),
  };
}

export default async function NewsletterPage({ params }: NewsletterPageProps) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("newsletterPage");

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-dark py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.10)_0%,transparent_55%)]"
      />
      <div className="container-editorial relative z-10 flex max-w-2xl flex-col items-center gap-8 text-center mx-auto">
        <SectionTag>{t("kicker")}</SectionTag>
        <h1 className="font-serif text-4xl leading-[1.05] text-cream md:text-6xl">
          {t("title")}
        </h1>
        <GoldDivider align="center" length={70} />
        <p className="max-w-md text-base leading-relaxed text-cream/75 md:text-lg">
          {t("body")}
        </p>
        <div className="pt-4">
          <GoldButton href="/" variant="ghost">
            {t("cta")}
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
