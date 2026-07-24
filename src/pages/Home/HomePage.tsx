import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './sections/HeroSection';
import IntroSection from './sections/IntroSection';
import FeaturedProjectsSection from './sections/FeaturedProjectsSection';
import StatsSection from './sections/StatsSection';
import ServicesPreviewSection from './sections/ServicesPreviewSection';
import PhilosophySection from './sections/PhilosophySection';
import ContactCTASection from './sections/ContactCTASection';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  
  useEffect(() => {
    // Ensure we start at top and GSAP calculates positions correctly
    window.scrollTo(0, 0);
    
    // Refresh scroll triggers after all assets load to prevent wrong trigger positions
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    
    // If document is already loaded, refresh immediately
    if (document.readyState === 'complete') {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    return () => {
      window.removeEventListener('load', handleLoad);
      // Clean up any remaining scroll triggers specific to this page
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="w-full flex flex-col bg-[var(--background)]">
      <HeroSection />
      <IntroSection />
      <FeaturedProjectsSection />
      <StatsSection />
      <ServicesPreviewSection />
      <PhilosophySection />
      <ContactCTASection />
    </main>
  );
}
