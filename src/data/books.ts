import type { Book, BookCategory } from "@/types";

export const books: readonly Book[] = [
  {
    slug: "la-no-muerte-de-jesus",
    title: "La no muerte de Jesús",
    subtitle: "El evangelio invisible",
    category: "trilogia",
    trilogiaNum: 1,
    amazonUrl:
      "https://www.amazon.es/muerte-Jes%C3%BAs-INVISIBLES-EVANGELIO-MIRAHADAS/dp/8419973521/",
    price: "26,95 €",
    hook: "¿Y si Jesús no murió en la cruz?",
    synopsis: "", // TODO: completar sinopsis larga del libro
    quote: "", // TODO: completar cita memorable del libro
    coverImage: "", // TODO: /images/covers/la-no-muerte-de-jesus.jpg (pendiente de asset)
  },
  {
    slug: "la-no-muerte-de-jesus-apostoles",
    title: "La no muerte de Jesús",
    subtitle: "Hechos de los Apóstoles",
    category: "trilogia",
    trilogiaNum: 2,
    amazonUrl:
      "https://www.amazon.es/muerte-Jes%C3%BAs-Ap%C3%B3stoles-MIRAHADAS-J%C3%93VENES/dp/B0DNHLDBR9/",
    price: "25,95 €",
    hook: "Los apóstoles sabían la verdad.",
    synopsis: "", // TODO: completar sinopsis larga del libro
    quote: "", // TODO: completar cita memorable del libro
    coverImage: "", // TODO: /images/covers/la-no-muerte-de-jesus-apostoles.jpg
  },
  {
    slug: "la-no-muerte-de-jesus-cartas-pablo",
    title: "La no muerte de Jesús",
    subtitle: "Cartas de Pablo",
    category: "trilogia",
    trilogiaNum: 3,
    amazonUrl:
      "https://www.amazon.es/muerte-Jes%C3%BAs-MIRAHADAS-J%C3%93VENES-ADULTOS/dp/B0DNHQQVP7/",
    price: "25,95 €",
    hook: "Las cartas que nadie debía leer.",
    synopsis: "", // TODO: completar sinopsis larga del libro
    quote: "", // TODO: completar cita memorable del libro
    coverImage: "", // TODO: /images/covers/la-no-muerte-de-jesus-cartas-pablo.jpg
  },
  {
    slug: "entre-versos-y-prosa-amor-y-desamor",
    title: "Entre versos y prosa",
    subtitle: "Amor y desamor",
    category: "poesia",
    amazonUrl:
      "https://www.amazon.es/Entre-versos-prosa-Amor-desamor/dp/B0FKZTFB3J/",
    hook: "Poesía al filo del sentimiento.",
    synopsis: "", // TODO: completar sinopsis larga del libro
    quote: "", // TODO: completar cita memorable del libro
    coverImage: "", // TODO: /images/covers/entre-versos-y-prosa-amor-y-desamor.jpg
  },
  {
    slug: "entre-prosa-y-poesia",
    title: "Entre prosa y poesía",
    subtitle: "",
    category: "poesia",
    amazonUrl:
      "https://www.amazon.es/Entre-Prosa-Poes%C3%ADa-MIRAHADAS-JOVENES/dp/B0DZ66Z26N/",
    hook: "Un diálogo íntimo entre verso y relato.",
    synopsis: "", // TODO: completar sinopsis larga del libro
    quote: "", // TODO: completar cita memorable del libro
    coverImage: "", // TODO: /images/covers/entre-prosa-y-poesia.jpg
  },
  {
    slug: "estacion-terminus",
    title: "Estación Terminus",
    subtitle: "",
    category: "narrativa",
    amazonUrl:
      "https://www.amazon.es/Estaci%C3%B3n-Terminus-Jos%C3%A9-Hern%C3%A1ndez-Mond%C3%A9jar/dp/B0GXGK65FF/",
    hook: "El final de trayecto siempre es un principio.",
    synopsis: "", // TODO: completar sinopsis larga del libro
    quote: "", // TODO: completar cita memorable del libro
    coverImage: "", // TODO: /images/covers/estacion-terminus.jpg
  },
] as const;

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getBooksByCategory(category: BookCategory): Book[] {
  return books.filter((book) => book.category === category);
}

export function getTrilogy(): Book[] {
  return books
    .filter((book) => book.category === "trilogia")
    .slice()
    .sort((a, b) => (a.trilogiaNum ?? 0) - (b.trilogiaNum ?? 0));
}

export function getFeaturedBooks(): Book[] {
  const firstTrilogy = getTrilogy()[0];
  const poetry = getBooksByCategory("poesia")[0];
  const fiction = getBooksByCategory("narrativa")[0];
  return [firstTrilogy, poetry, fiction].filter(
    (book): book is Book => Boolean(book),
  );
}

export function getRelatedBooks(slug: string, limit = 3): Book[] {
  const current = getBookBySlug(slug);
  if (!current) return [];

  const remaining = books.filter((book) => book.slug !== slug);

  if (current.category === "trilogia") {
    const otherTrilogy = remaining.filter((b) => b.category === "trilogia");
    const others = remaining.filter((b) => b.category !== "trilogia");
    return [...otherTrilogy, ...others].slice(0, limit);
  }

  const sameCategory = remaining.filter((b) => b.category === current.category);
  const differentCategory = remaining.filter(
    (b) => b.category !== current.category,
  );
  return [...sameCategory, ...differentCategory].slice(0, limit);
}
