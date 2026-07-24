import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';

gsap.registerPlugin(ScrollTrigger);

// Placeholder data - ready for backend integration
const statsData = [
  { id: 'experience', value: 10, suffix: '+', label: 'Yıllık Deneyim' },
  { id: 'projects', value: 25, suffix: '+', label: 'Tamamlanan Proje' },
  { id: 'area', value: 150, suffix: '.000+', label: 'm² İnşaat Alanı' },
  { id: 'living', value: 500, suffix: '+', label: 'Yaşam Alanı' },
];

export default function StatsSection() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Simple localized labels
  const getLabel = (id: string) => {
    if (lang === 'en') {
      const enLabels: Record<string, string> = {
        experience: 'Years of Experience',
        projects: 'Completed Projects',
        area: 'm² Construction Area',
        living: 'Living Spaces'
      };
      return enLabels[id];
    }
    return statsData.find(s => s.id === id)?.label;
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      // Fade in section content
      gsap.fromTo('.stat-item', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          }
        }
      );

      // Counter animation
      if (!prefersReducedMotion) {
        countersRef.current.forEach((counter, i) => {
          if (!counter) return;
          const targetValue = statsData[i].value;
          
          gsap.fromTo(counter, 
            { innerHTML: 0 },
            {
              innerHTML: targetValue,
              duration: 2,
              ease: 'power2.out',
              snap: { innerHTML: 1 },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
              }
            }
          );
        });
      } else {
        countersRef.current.forEach((counter, i) => {
          if (!counter) return;
          counter.innerHTML = statsData[i].value.toString();
        });
      }
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 bg-[var(--background-alt)] text-[var(--foreground)] relative z-20">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 lg:gap-24">
          <div className="lg:w-1/3">
            <h2 className="stat-item font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-[var(--foreground)]">
              {t.pages.home.stats.title}
            </h2>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-2 gap-y-12 gap-x-8 md:gap-x-12">
            {statsData.map((stat, i) => (
              <div key={stat.id} className="stat-item flex flex-col gap-2 border-t border-[var(--border)] pt-6">
                <div className="font-display text-5xl md:text-6xl lg:text-7xl text-[var(--foreground)] font-light tracking-tight flex items-baseline">
                  <span ref={el => countersRef.current[i] = el}>0</span>
                  <span className="text-3xl md:text-4xl lg:text-5xl text-[var(--primary)] -ml-1">
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-sm md:text-base text-[var(--muted)] font-light">
                  {getLabel(stat.id)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
