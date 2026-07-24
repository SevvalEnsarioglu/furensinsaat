import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !descRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([titleRef.current, descRef.current], { autoAlpha: 1 });
        return;
      }
      
      const lines = titleRef.current.querySelectorAll('.intro-line');
      
      gsap.fromTo(
        lines,
        { opacity: 0.15, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'none', // linear feels better for scrub
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'center center',
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const titleLines = t.pages.home.intro.title.split('\n');

  return (
    <section ref={sectionRef} className="py-24 md:py-32 lg:py-40 bg-[var(--background)] relative z-10">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">
          {/* Label (Left) */}
          <div className="lg:w-1/5 shrink-0 pt-2">
            <span className="text-xs font-sans font-medium tracking-[0.2em] text-[var(--primary)] uppercase">
              {t.pages.home.intro.label}
            </span>
          </div>

          {/* Large Statement (Center) */}
          <div className="lg:w-2/5 shrink-0">
            <h2 
              ref={titleRef}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-[var(--foreground)]"
            >
              {titleLines.map((line, i) => (
                <span key={i} className="intro-line block will-change-[opacity,transform]">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* Description & CTA (Right) */}
          <div className="lg:w-2/5 flex flex-col gap-10 lg:pt-3">
            <p ref={descRef} className="text-lg md:text-xl text-[var(--foreground-secondary)] font-light leading-relaxed">
              {t.pages.home.intro.description}
            </p>
            
            <div>
              <Link 
                to="/kurumsal"
                className="group inline-flex items-center text-sm font-medium tracking-widest text-[var(--foreground)] uppercase"
              >
                <span className="relative pb-1">
                  {t.pages.home.intro.cta}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--foreground)] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
