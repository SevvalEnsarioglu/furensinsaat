import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';

gsap.registerPlugin(ScrollTrigger);

export default function CorporateCTASection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLSelectElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const elements = [line1Ref.current, line2Ref.current, ctaGroupRef.current];

      if (prefersReducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 lg:py-48 flex items-center min-h-[60svh] overflow-hidden relative"
      style={{ backgroundColor: 'var(--gray-900)', color: 'var(--gray-50)' }}
    >
      <Container className="relative z-10 w-full flex flex-col items-center justify-center text-center">
        
        {/* Typographic Headline */}
        <h2 className="font-display font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.1] tracking-tight mb-16 lg:mb-24">
          <div className="overflow-hidden pb-2"><div ref={line1Ref}>{t.pages.corporate.cta.titleLine1}</div></div>
          <div className="overflow-hidden pb-2"><div ref={line2Ref} className="text-primary-bright">{t.pages.corporate.cta.titleLine2}</div></div>
        </h2>

        {/* Action Links */}
        <div ref={ctaGroupRef} className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16">
          
          {/* Primary CTA */}
          <Link 
            to="/projeler" 
            className="group relative flex items-center justify-center gap-4 text-lg lg:text-xl font-light tracking-wide text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span>{t.pages.corporate.cta.projectsCTA}</span>
            <span className="text-primary-bright group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]">
              →
            </span>
            {/* Underline grow */}
            <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-primary-bright scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100"></div>
          </Link>

          {/* Divider on desktop */}
          <div className="hidden sm:block w-[1px] h-8 bg-gray-600 opacity-50"></div>

          {/* Secondary CTA */}
          <Link 
            to="/iletisim" 
            className="group relative flex items-center justify-center text-lg lg:text-xl font-light tracking-wide text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span>{t.pages.corporate.cta.contactCTA}</span>
            <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-gray-400 scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100"></div>
          </Link>

        </div>
      </Container>
    </section>
  );
}
