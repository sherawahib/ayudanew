import DonateSection from "@/components/DonateSection";
import FeatureCards from "@/components/FeatureCards";
import HomeHero from "@/components/HomeHero";
import HomeVideos from "@/components/HomeVideos";
import MayorMessageSection from "@/components/MayorMessageSection";

export const revalidate = 0;

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <MayorMessageSection />
      <FeatureCards />
      <DonateSection />
      <HomeVideos />
    </>
  );
}
