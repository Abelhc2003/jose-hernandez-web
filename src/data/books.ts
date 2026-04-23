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
    synopsis:
      "Tras la lectura de los Evangelios, junto con mis opiniones... podría cambiar tu concepto sobre el cristianismo vaticano.\n\nUn plan muy bien diseñado para que Jesús no muriese en la cruz... Una mujer que lo amaba por encima de todo... Un suegro que se jugó la vida por Él... Un discípulo que lo entregó porque Él se lo ordenó... Un corto sufrimiento que no justifica la magnitud que le ha dado la cristiandad... Unos milagros grandiosos que salieron de su boca en forma de palabras... Un hombre, sexo incluido... como cualquier hombre... Dos Jesús diferentes, según los evangelistas... Unos discípulos desastrosos... Unos falsos herederos de su cristianismo que convirtieron la sencillez de sus mensajes en un negocio recaudatorio lleno de dogmas y boatos que Jesús jamás hubiese aceptado... ni cumplido... Una estafa a sus enseñanzas y consejos... a su buena nueva.",
    quote: "",
    coverImage: "/images/covers/la-no-muerte-de-jesus.jpg",
    coverImageBack: "/images/covers/la-no-muerte-de-jesus-posterior.jpg",
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
    synopsis:
      "Tras la no muerte de Jesús en la cruz, afloraron las ambiciones, las envidias, las traiciones, las intrigas y los más bajos instintos de quienes deseaban heredar el poder del Dios Padre de Jesús en la Tierra.\n\nTodo fue una lucha por el poder, por la riqueza, por la supremacía. Si para conseguirlo había que matar, se mataba, y si había que crear un dios distinto, a semejanza de ellos, para utilizarlo según sus intereses, pues se creaba… y lo crearon.\n\nUn dios que se alegra recibiendo dinero y mata por no recibirlo, un dios al que le gusta el sufrimiento humano, un dios al que le agrada que no forniquen, un dios que crea normas, categorías religiosas y pone salarios, un dios vengativo y castigador, un dios que no es el Dios Padre de Jesús.\n\nLos Hechos de los Apóstoles, narrados por Lucas, es la historia de dos ambiciones: la del asesino y loco Pablo y la del ambicioso Pedro.\n\n¿Lucas escribió y siguió a Pablo por amor?",
    quote: "",
    coverImage: "/images/covers/la-no-muerte-de-jesus-apostoles.jpg",
    coverImageBack: "/images/covers/la-no-muerte-de-jesus-apostoles-posterior.jpg",
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
    synopsis:
      "XXI siglos ofendiendo al Dios Padre de Jesús.\n\n\"La iglesia vaticana es la obra de una obsesión, … la de un enfermo mental que creó su propio dios dogmático, normativo y anti fornicación …y triunfó\"\n\nAl final todo sale a la luz.",
    quote: "",
    coverImage: "/images/covers/la-no-muerte-de-jesus-cartas-pablo.jpg",
    coverImageBack: "/images/covers/la-no-muerte-de-jesus-cartas-pablo-posterior.jpg",
  },
  {
    slug: "entre-versos-y-prosa-amor-y-desamor",
    title: "Entre versos y prosa",
    subtitle: "Amor y desamor",
    category: "poesia",
    amazonUrl:
      "https://www.amazon.es/Entre-versos-prosa-Amor-desamor/dp/B0FKZTFB3J/",
    hook: "Poesía al filo del sentimiento.",
    synopsis:
      "Entre verso y prosa, amor y desamor, río y lloro, vivo y muero, recordando aquel tiempo en el que fui feliz, viendo el triste ahora de mi lenta decrepitud. Entre verso y prosa te vuelvo a revivir.",
    quote: "",
    coverImage: "/images/covers/entre-versos-y-prosa-amor-y-desamor.jpg",
    coverImageBack: "/images/covers/entre-versos-y-prosa-amor-y-desamor-posterior.jpg",
  },
  {
    slug: "entre-prosa-y-poesia",
    title: "Entre prosa y poesía",
    subtitle: "",
    category: "poesia",
    amazonUrl:
      "https://www.amazon.es/Entre-Prosa-Poes%C3%ADa-MIRAHADAS-JOVENES/dp/B0DZ66Z26N/",
    hook: "Un diálogo íntimo entre verso y relato.",
    synopsis:
      "Entre prosa y poesía… estás tú, junto a los recuerdos tan vivos de aquellos apasionados besos que se grabaron en tu boca con el ardor de la primera vez. Entre prosa y poesía… andas tú, cada noche al recordar el sueño hecho realidad de sentir en tu pecho sus latidos corazón con corazón. Entre prosa y poesía… lloras tú, cuando del cielo al abismo caes sin previo aviso, ni por qué, teniendo con tristeza que pagar el amargo precio del desamor.",
    quote: "",
    coverImage: "/images/covers/entre-prosa-y-poesia.jpg",
    coverImageBack: "/images/covers/entre-prosa-y-poesia-posterior.jpg",
  },
  {
    slug: "estacion-terminus",
    title: "Estación Terminus",
    subtitle: "",
    category: "narrativa",
    amazonUrl:
      "https://www.amazon.es/Estaci%C3%B3n-Terminus-Jos%C3%A9-Hern%C3%A1ndez-Mond%C3%A9jar/dp/B0GXGK65FF/",
    hook: "El final de trayecto siempre es un principio.",
    synopsis:
      "José está a punto de jubilarse tras tres décadas como director de un hospital. Cree tenerlo todo bajo control: su futuro, su tiempo, su vida. Pero en el último mes antes de su retirada, algo empieza a resquebrajar esa certeza. Un anciano aparece con palabras inquietantemente precisas. Un perro parece reconocerlo. Una aplicación le envía mensajes intrigantes pero necesarios. Y un sobre misterioso, con su nombre, irrumpe en su rutina.\n\nMientras el calendario avanza inexorable hacia Nochevieja, José se ve arrastrado a un enigma que desafía la lógica y el tiempo. Lo que descubrirá no solo pondrá en cuestión todo lo que creía saber… sino que le abrirá la puerta a una última oportunidad.\n\nPorque hay trenes que solo pasan una vez… y estaciones en las que nadie quiere bajar.",
    quote: "",
    coverImage: "/images/covers/estacion-terminus.jpg",
    coverImageBack: "/images/covers/estacion-terminus-posterior.jpg",
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
