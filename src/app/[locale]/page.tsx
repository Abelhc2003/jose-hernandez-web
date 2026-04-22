import { setRequestLocale } from "next-intl/server";
import { HeroPlaceholder } from "@/components/home/HeroPlaceholder";
import { AuthorIntro } from "@/components/home/AuthorIntro";
import { FeaturedBooks } from "@/components/home/FeaturedBooks";
import { TrilogyTeaser } from "@/components/home/TrilogyTeaser";
import { AuthorQuote } from "@/components/home/AuthorQuote";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getFeaturedBooks } from "@/data/books";

interface HomePageProps {
  params: { locale: string };
}

export default function HomePage({ params }: HomePageProps) {
  setRequestLocale(params.locale);
  const featured = getFeaturedBooks();

  return (
    <>
      <HeroPlaceholder />
      <AuthorIntro />
      <FeaturedBooks books={featured} />
      <TrilogyTeaser />
      <AuthorQuote />
      <NewsletterSection />
    </>
  );
}
