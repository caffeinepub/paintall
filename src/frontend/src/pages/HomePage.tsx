import BookingForm from "../components/BookingForm";
import BrandsTicker from "../components/BrandsTicker";
import CTABanner from "../components/CTABanner";
import CostCalculator from "../components/CostCalculator";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";
import HowItWorks from "../components/HowItWorks";
import NavBar from "../components/NavBar";
import ProjectsGallery from "../components/ProjectsGallery";
import ServicesGrid from "../components/ServicesGrid";
import StatsBar from "../components/StatsBar";
import Testimonials from "../components/Testimonials";
import TrustBadges from "../components/TrustBadges";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <HeroSlider />
      <TrustBadges />
      <StatsBar />
      <ServicesGrid />
      <BookingForm />
      <HowItWorks />
      <ProjectsGallery />
      <CostCalculator />
      <Testimonials />
      <BrandsTicker />
      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
