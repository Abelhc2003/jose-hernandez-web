import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-gold/10 bg-dark-2 py-20">
      <div className="container-editorial grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl leading-tight text-cream">
            José <span className="text-gold">Hernández</span> Mondéjar
          </p>
          <p className="mt-4 text-sm text-cream/60">{t("tagline")}</p>
        </div>

        <nav aria-label="footer primary" className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] text-cream/70">
          <Link href="/autor" className="hover:text-gold">
            {tNav("author")}
          </Link>
          <Link href="/obras" className="hover:text-gold">
            {tNav("works")}
          </Link>
          <Link href="/obras/trilogia" className="hover:text-gold">
            {tNav("trilogy")}
          </Link>
          <Link href="/contacto" className="hover:text-gold">
            {tNav("contact")}
          </Link>
        </nav>

        <nav aria-label="footer legal" className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] text-cream/70">
          <Link href="/privacidad" className="hover:text-gold">
            {t("privacy")}
          </Link>
          <Link href="/aviso-legal" className="hover:text-gold">
            {t("legal")}
          </Link>
        </nav>
      </div>

      <div className="container-editorial mt-16 border-t border-gold/10 pt-8 text-xs uppercase tracking-[0.3em] text-cream/40">
        {t("rights", { year })}
      </div>
    </footer>
  );
}
