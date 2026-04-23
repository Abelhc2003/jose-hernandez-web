import Image from "next/image";
import type { Book } from "@/types";
import { cn } from "@/lib/utils";

interface BookCoverProps {
  book: Book;
  className?: string;
  priority?: boolean;
}

export function BookCover({ book, className, priority = false }: BookCoverProps) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden border border-gold/10 bg-dark-3",
        className,
      )}
    >
      {book.coverImage ? (
        <Image
          src={book.coverImage}
          alt={`Portada de ${book.title}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
          className="object-cover transition-opacity duration-700 hover:opacity-90"
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
