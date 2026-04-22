"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", key: "home" },
  { href: "/autor", key: "author" },
  { href: "/obras", key: "works" },
  { href: "/obras/trilogia", key: "trilogy" },
  { href: "/contacto", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-gold/10 bg-dark/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-editorial flex h-20 items-center justify-between">
        <Link href="/" className="font-serif text-lg tracking-wide text-cream">
          <span className="text-gold">J.</span> Hernández Mondéjar
        </Link>

        <nav aria-label="primary" className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xs uppercase tracking-[0.3em] transition-colors",
                  active ? "text-gold" : "text-cream/80 hover:text-gold",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <LocaleSwitcher />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className={cn("block h-px w-6 bg-gold transition-transform", open && "translate-y-[3px] rotate-45")} />
          <span className={cn("absolute block h-px w-6 bg-gold transition-opacity", open && "opacity-0")} />
          <span className={cn("block h-px w-6 bg-gold transition-transform", open && "-translate-y-[3px] -rotate-45")} />
        </button>
      </div>

      {open && (
        <div className="border-t border-gold/10 bg-dark md:hidden">
          <nav className="container-editorial flex flex-col gap-6 py-8" aria-label="primary mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.3em] text-cream/80 hover:text-gold"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-4">
              <LocaleSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
