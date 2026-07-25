import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';
import { corporateArchitectureImage } from '../../../data/corporate';

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectureStatementSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLSelectElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];

      if (prefersReducedMotion) {
        gsap.set(imageWrapperRef.current, { clipPath: 'inset(0 0 0 0)' });
        gsap.set(imageRef.current, { scale: 1, xPercent: 0 });
        gsap.set(lines, { yPercent: 0, opacity: 1 });
        return;
      }

      // Initial States
      gsap.set(imageWrapperRef.current, { clipPath: 'inset(0 0 0 100%)' });
      gsap.set(imageRef.current, { scale: 1.08, xPercent: 3 });
      gsap.set(lines, { yPercent: 100 });

      // Create main animation timeline triggered by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%', // trigger when section is 25% into viewport
        }
      });

      // Image Reveal from right to left
      tl.to(imageWrapperRef.current, {
        clipPath: 'inset(0 0 0 0)',
        duration: 1.6,
        ease: 'power3.inOut'
      }, 0)
      .to(imageRef.current, {
        scale: 1,
        xPercent: 0,
        duration: 1.6,
        ease: 'power3.inOut'
      }, 0)
      // Text reveal starts slightly after image starts
      .to(lines, {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }, 0.6);

      // Optional Parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[65vh] md:h-[75vh] lg:h-[90vh] min-h-[500px] overflow-hidden bg-background">
      
      {/* Background Image Container */}
      <div 
        ref={imageWrapperRef} 
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-overlay z-10 mix-blend-multiply opacity-40"></div>
        <img
          ref={imageRef}
          src={corporateArchitectureImage}
          alt="Architecture Detail"
          className="w-full h-full object-cover object-center lg:object-[center_30%]"
        />
      </div>

      {/* Foreground Content */}
      <Container className="relative z-20 h-full flex items-center justify-center lg:justify-start">
        <h2 className="font-display font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.1] tracking-tight text-white max-w-4xl text-center lg:text-left mt-16 lg:mt-0">
          <div className="overflow-hidden pb-1"><div ref={line1Ref}>{t.pages.corporate.statement.titleLine1}</div></div>
          <div className="overflow-hidden pb-1"><div ref={line2Ref}>{t.pages.corporate.statement.titleLine2}</div></div>
          <div className="overflow-hidden pb-1 text-teal-100/90"><div ref={line3Ref}>{t.pages.corporate.statement.titleLine3}</div></div>
        </h2>
      </Container>
      
      {/* Decorative Line (Optional detail) */}
      <div className="hidden lg:block absolute bottom-0 left-[calc(max(3rem,(100vw-80rem)/2))] w-[1px] h-32 bg-white/30 z-20"></div>
    </section>
  );
}
