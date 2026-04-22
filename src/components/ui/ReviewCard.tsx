import { cn } from "@/lib/utils";

interface ReviewCardProps {
  author: string;
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  bookTitle?: string;
  className?: string;
}

export function ReviewCard({
  author,
  quote,
  rating,
  bookTitle,
  className,
}: ReviewCardProps) {
  return (
    <figure
      className={cn(
        "relative flex flex-col gap-6 border border-gold/10 bg-dark-2 p-10",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute left-6 top-0 font-serif text-[7rem] leading-none text-gold/30"
      >
        “
      </span>
      <blockquote className="relative pt-4 font-serif text-lg italic leading-relaxed text-cream/90">
        {quote}
      </blockquote>
      <figcaption className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold">
            {author}
          </div>
          {bookTitle && (
            <div className="mt-1 text-xs italic text-cream/50">
              {bookTitle}
            </div>
          )}
        </div>
        {typeof rating === "number" && (
          <div
            aria-label={`${rating} de 5`}
            className="text-sm tracking-[0.2em] text-gold"
          >
            {"★".repeat(rating)}
            <span className="text-gold/20">{"★".repeat(5 - rating)}</span>
          </div>
        )}
      </figcaption>
    </figure>
  );
}
