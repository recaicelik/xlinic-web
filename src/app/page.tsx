import { HeroSection } from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-16">
        <HeroSection />
        <NewsletterSection />
        <Footer />
      </main>
    </>
  );
}