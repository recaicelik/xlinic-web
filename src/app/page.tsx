import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

export default function Home() {
  return (
    <main className="flex flex-col bg-white">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}