"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="text-gold/30">·</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={active === loc ? "true" : undefined}
            className={cn(
              "transition-colors",
              active === loc
                ? "text-gold"
                : "text-cream/50 hover:text-gold",
            )}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
