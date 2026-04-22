import type { Book } from "@/types";
import { cn } from "@/lib/utils";

interface BookCoverProps {
  book: Book;
  className?: string;
}

export function BookCover({ book, className }: BookCoverProps) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden border border-gold/10 bg-dark-3",
        className,
      )}
    >
      {book.coverImage ? (
        // TODO: sustituir por next/image cuando haya portadas finales en /public/images/covers
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover transition-opacity duration-700 hover:opacity-90"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-dark-2 to-dark-3 p-6 text-center">
          <span className="font-serif text-6xl text-gold/20">
            {book.title.charAt(0)}
          </span>
          <span className="font-serif text-xs italic text-cream/40">
            {book.title}
          </span>
        </div>
      )}
    </div>
  );
}
