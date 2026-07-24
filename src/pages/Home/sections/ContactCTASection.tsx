import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTASection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || !imageRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(bgRef.current, { clipPath: 'inset(0% 0 0 0)' });
        gsap.set('.cta-content', { opacity: 1 });
        return;
      }
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      });
      
      tl.fromTo(
        bgRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power3.inOut'
        }
      ).fromTo(
        imageRef.current,
        { scale: 1.15, yPercent: 5 },
        {
          scale: 1,
          yPercent: 0,
          duration: 1.5,
          ease: 'power3.inOut'
        },
        '<'
      ).fromTo(
        '.cta-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        },
        '-=0.5'
      );
      
      // Parallax
      gsap.to(imageRef.current, {
        yPercent: 15,
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
    <section ref={sectionRef} className="h-[75vh] md:h-[90vh] w-full relative overflow-hidden bg-[var(--background)]">
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ clipPath: 'inset(100% 0 0 0)' }}>
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
          alt="Contact CTA"
          className="w-full h-[120%] object-cover -top-[10%] relative origin-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      </div>
      
      <Container className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 text-center items-center">
        <div className="cta-content max-w-5xl opacity-0 flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-light tracking-tight leading-[1.05] mb-10 md:mb-14">
            {t.pages.home.contact.title}
          </h2>
          <Button 
            variant="primary" 
            size="lg"
            className="!bg-white !text-black hover:!bg-gray-200 border-none group px-8 md:px-12"
            onClick={() => navigate('/iletisim')}
          >
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase">{t.pages.home.contact.cta}</span>
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
