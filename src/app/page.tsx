import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ComingSoonSection } from "@/components/sections/ComingSoonSection";

export default function Home() {
  return (
    <main className="flex flex-col bg-white">
      <HeroSection />
      <ComingSoonSection />
      <FeaturesSection />
    </main>
  );
}