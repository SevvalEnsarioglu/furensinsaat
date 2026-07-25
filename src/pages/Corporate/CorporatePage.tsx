import CorporateHeroSection from './sections/CorporateHeroSection';
import AboutStorySection from './sections/AboutStorySection';
import ManifestoSection from './sections/ManifestoSection';
import ValuesSection from './sections/ValuesSection';
import ProcessSection from './sections/ProcessSection';
import ArchitectureStatementSection from './sections/ArchitectureStatementSection';
import QualitySection from './sections/QualitySection';
import VisionMissionSection from './sections/VisionMissionSection';
import CorporateCTASection from './sections/CorporateCTASection';

export default function CorporatePage() {
  return (
    <main className="w-full min-h-screen">
      <CorporateHeroSection />
      <AboutStorySection />
      <ManifestoSection />
      <ValuesSection />
      <ProcessSection />
      <ArchitectureStatementSection />
      <QualitySection />
      <VisionMissionSection />
      <CorporateCTASection />
    </main>
  );
}
