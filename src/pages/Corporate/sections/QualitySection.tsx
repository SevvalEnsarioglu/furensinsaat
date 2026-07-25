import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';
import { corporateQuality } from '../../../data/corporate';

gsap.registerPlugin(ScrollTrigger);

export default function QualitySection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLSelectElement>(null);
  const titleLinesRef = useRef<HTMLDivElement[]>([]);
  const pillarsRef = useRef<HTMLDivElement[]>([]);

  const qualityData = corporateQuality.map((val) => {
    const trData = (t.pages.corporate.quality.items as any)[val.id];
    return {
      ...val,
      title: trData?.title || '',
      description: trData?.description || ''
    };
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(titleLinesRef.current, { y: 0, opacity: 1 });
        gsap.set(pillarsRef.current, { y: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        titleLinesRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        pillarsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarsRef.current[0],
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-40 bg-background text-foreground">
      <Container>
        {/* Header */}
        <div className="mb-20 lg:mb-32">
          <h2 className="font-display font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight max-w-3xl">
            <div ref={el => { if(el) titleLinesRef.current[0] = el; }}>
              {t.pages.corporate.quality.titleLine1}
            </div>
            <div ref={el => { if(el) titleLinesRef.current[1] = el; }}>
              {t.pages.corporate.quality.titleLine2}
            </div>
            <div ref={el => { if(el) titleLinesRef.current[2] = el; }} className="text-primary">
              {t.pages.corporate.quality.titleLine3}
            </div>
          </h2>
        </div>

        {/* Pillars (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 lg:gap-x-12">
          {qualityData.map((item, idx) => (
            <div 
              key={item.id}
              ref={el => { if(el) pillarsRef.current[idx] = el; }}
              className="group relative flex flex-col pt-8 lg:pt-12 cursor-default"
            >
              {/* Top Border (Animates on hover) */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-border transition-colors duration-500 group-hover:bg-primary z-10"></div>
              {/* Expanding border on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-primary scale-x-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 z-20"></div>

              {/* Number */}
              <span className="font-display text-4xl lg:text-5xl font-light text-muted transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-2 group-hover:text-primary mb-6 lg:mb-8">
                0{idx + 1}
              </span>

              {/* Title */}
              <h3 className="font-display text-2xl lg:text-3xl tracking-tight mb-4 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-foreground-secondary text-base lg:text-lg leading-relaxed lg:opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                {item.description}
              </p>

              {/* Subtle background tint on hover */}
              <div className="absolute inset-0 bg-primary-subtle opacity-0 transition-opacity duration-700 -z-10 group-hover:opacity-5 -mx-6 px-6 -mb-6 pb-6 lg:mx-0 lg:px-0 lg:mb-0 lg:pb-0"></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
