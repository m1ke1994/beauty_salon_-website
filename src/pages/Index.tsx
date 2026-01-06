import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PricesSection } from "@/components/sections/PricesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StepsSection } from "@/components/sections/StepsSection";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollArrows } from "@/components/ui/ScrollArrows";

const Index = () => {
  return (
    <div className="min-h-screen">
      <span id="top" className="sr-only" aria-hidden="true" />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricesSection />
        <PortfolioSection />
        <ReviewsSection />
        <AboutSection />
        <StepsSection />
        <ContactsSection />
        <CTASection />
      </main>
      <Footer />
      <ScrollArrows />
    </div>
  );
};

export default Index;
