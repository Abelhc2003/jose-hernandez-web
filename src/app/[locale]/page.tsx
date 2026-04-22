import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

interface HomePageProps {
  params: { locale: string };
}

export default function HomePage({ params }: HomePageProps) {
  setRequestLocale(params.locale);
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <div className="container-editorial text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold/80">
          {t("ornament")}
        </p>
        <h1 className="mt-6 font-serif text-5xl text-cream md:text-7xl">
          {t("name")}
        </h1>
      </div>
    </section>
  );
}
