import { cn } from "@/lib/utils";

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "div";
}

export function SectionTag({
  children,
  className,
  as: Tag = "span",
}: SectionTagProps) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-gold/80",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-gold/60" />
      {children}
    </Tag>
  );
}
