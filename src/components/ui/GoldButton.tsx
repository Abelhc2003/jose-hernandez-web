import NextLink from "next/link";
import { Link as IntlLink } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

interface SharedProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

interface InternalLinkProps extends SharedProps {
  href: string;
  external?: false;
  type?: never;
  onClick?: never;
}

interface ExternalLinkProps extends SharedProps {
  href: string;
  external: true;
  type?: never;
  onClick?: never;
}

interface ButtonProps
  extends SharedProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
  external?: undefined;
}

type Props = InternalLinkProps | ExternalLinkProps | ButtonProps;

const base =
  "group relative inline-flex items-center justify-center overflow-hidden border px-8 py-3 text-[11px] font-sans uppercase tracking-[0.3em] transition-colors duration-500";

const variants: Record<Variant, string> = {
  primary: "border-gold text-gold hover:text-dark",
  ghost: "border-gold/30 text-cream hover:border-gold hover:text-gold",
};

function ButtonContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );
}

export function GoldButton(props: Props) {
  const variant = props.variant ?? "primary";
  const classes = cn(base, variants[variant], props.className);

  if (isExternalLink(props)) {
    const { href, children } = props;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        <ButtonContent>{children}</ButtonContent>
      </a>
    );
  }

  if (isInternalLink(props)) {
    const { href, children } = props;
    const LinkEl = isAnchorHash(href) ? NextLink : IntlLink;
    return (
      <LinkEl href={href} className={classes}>
        <ButtonContent>{children}</ButtonContent>
      </LinkEl>
    );
  }

  const { children, variant: _v, className: _c, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      <ButtonContent>{children}</ButtonContent>
    </button>
  );
}

function isExternalLink(p: Props): p is ExternalLinkProps {
  return "href" in p && typeof p.href === "string" && p.external === true;
}

function isInternalLink(p: Props): p is InternalLinkProps {
  return "href" in p && typeof p.href === "string" && p.external !== true;
}

function isAnchorHash(href: string): boolean {
  return href.startsWith("#");
}
