import type { TrilogiaNumber } from "@/types";
import { cn } from "@/lib/utils";

const ROMAN: Record<TrilogiaNumber, string> = {
  1: "I",
  2: "II",
  3: "III",
};

interface TrilogyBadgeProps {
  num: TrilogiaNumber;
  label: string;
  className?: string;
}

export function TrilogyBadge({ num, label, className }: TrilogyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-gold/50 bg-gold-muted px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold",
        className,
      )}
    >
      <span>{label}</span>
      <span aria-hidden className="h-3 w-px bg-gold/40" />
      <span className="font-serif text-sm leading-none tracking-normal">
        {ROMAN[num]}
      </span>
    </span>
  );
}
