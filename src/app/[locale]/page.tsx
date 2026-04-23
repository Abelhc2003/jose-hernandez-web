import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero/Hero";
import { AuthorIntro } from "@/components/home/AuthorIntro";
import { FeaturedBooks } from "@/components/home/FeaturedBooks";
import { NewRelease } from "@/components/home/NewRelease";
import { TrilogyTeaser } from "@/components/home/TrilogyTeaser";
import { AuthorQuote } from "@/components/home/AuthorQuote";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getFeaturedBooks, getNewRelease } from "@/data/books";

interface HomePageProps {
  params: { locale: string };
}

export default function HomePage({ params }: HomePageProps) {
  setRequestLocale(params.locale);
  const featured = getFeaturedBooks();
  const newRelease = getNewRelease();

  return (
    <>
      <Hero />
      {newRelease && <NewRelease book={newRelease} />}
      <AuthorIntro />
      <FeaturedBooks books={featured} />
      <TrilogyTeaser />
      <AuthorQuote />
      <NewsletterSection />
    </>
  );
}
