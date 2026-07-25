import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
      
      if (prefersReducedMotion) {
        gsap.set(lines, { opacity: 1, letterSpacing: '0em' });
        gsap.set(descRef.current, { opacity: 1, y: 0 });
        return;
      }

      // We use gsap.matchMedia for responsive animations
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Desktop: Pinned scroll animation
        gsap.set(lines, { opacity: 0.12, letterSpacing: '0.04em' });
        gsap.set(descRef.current, { opacity: 0, y: 20 });
        gsap.set(bgRef.current, { scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%', // Pin for 150% of viewport height
            pin: true,
            scrub: 1,
          },
        });

        // Subtle background scale
        tl.to(bgRef.current, { scale: 1.05, duration: 10, ease: 'none' }, 0);

        // Text reveals
        tl.to(line1Ref.current, { opacity: 1, letterSpacing: '0em', duration: 2, ease: 'power1.inOut' }, 1)
          .to(line2Ref.current, { opacity: 1, letterSpacing: '0em', duration: 2, ease: 'power1.inOut' }, 2.5)
          .to(line3Ref.current, { opacity: 1, letterSpacing: '0em', duration: 2, ease: 'power1.inOut' }, 4)
          .to(descRef.current, { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, 5.5)
          // Add some empty space at the end so it doesn't unpin immediately
          .to({}, { duration: 1.5 });
      });

      mm.add('(max-width: 1023px)', () => {
        // Mobile/Tablet: Normal scroll reveal without pinning
        gsap.set(lines, { opacity: 0.12 });
        gsap.set(descRef.current, { opacity: 0, y: 20 });

        gsap.to(lines, {
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        });

        gsap.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
          }
        });
      });
      
      return () => mm.revert();
    }, sectionRef);

    // Refresh ScrollTrigger to ensure pin spacer heights are correct
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: 'var(--gray-900)', 
        color: 'var(--gray-50)',
        minHeight: '100svh'
      }}
    >
      {/* Optional faint background texture or noise */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, var(--gray-50) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <Container className="relative z-10 w-full h-full flex flex-col justify-center items-center py-24 text-center">
        <div ref={contentRef} className="max-w-4xl mx-auto flex flex-col items-center gap-12">
          <h2 className="font-display font-light text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] tracking-tight uppercase">
            <div ref={line1Ref}>{t.pages.corporate.manifesto.titleLine1}</div>
            <div ref={line2Ref}>{t.pages.corporate.manifesto.titleLine2}</div>
            <div ref={line3Ref} className="text-primary-bright">{t.pages.corporate.manifesto.titleLine3}</div>
          </h2>
          
          <p 
            ref={descRef}
            className="text-lg md:text-xl lg:text-2xl font-light max-w-2xl leading-relaxed"
            style={{ color: 'var(--gray-300)' }}
          >
            {t.pages.corporate.manifesto.description}
          </p>
        </div>
      </Container>
    </section>
  );
}
