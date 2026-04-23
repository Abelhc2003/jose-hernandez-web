import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionTag } from "@/components/ui/SectionTag";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { GoldButton } from "@/components/ui/GoldButton";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "legalPage" });
  return { title: t("privacyTitle") };
}

export default async function PrivacidadPage({ params }: PageProps) {
  setRequestLocale(params.locale);
  const t = await getTranslations("legalPage");

  return (
    <section className="relative overflow-hidden bg-dark py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_55%)]"
      />
      <div className="container-editorial relative z-10 flex max-w-3xl flex-col gap-8">
        <SectionTag>{t("privacyKicker")}</SectionTag>
        <h1 className="font-serif text-4xl leading-[1.05] text-cream md:text-6xl">
          {t("privacyTitle")}
        </h1>
        <GoldDivider length={70} />
        <p className="text-base leading-relaxed text-cream/80 md:text-lg">
          {t("privacyBody")}
        </p>
        <p className="text-sm leading-relaxed text-cream/60">
          {t("privacyContact")}
        </p>
        <div className="pt-4">
          <GoldButton href="/contacto" variant="ghost">
            Contacto
          </GoldButton>
        </div>
        <div className="pt-2">
          <GoldButton href="/" variant="ghost">
            {t("backHome")}
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
