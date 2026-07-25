import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStorySection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLSelectElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const infoRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !statementRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Setup statement lines
      const lines = statementRef.current?.querySelectorAll('.statement-line');
      
      if (prefersReducedMotion) {
        gsap.set(lines || [], { opacity: 1, y: 0 });
        gsap.set([paragraph1Ref.current, paragraph2Ref.current, infoRefs.current], { opacity: 1, y: 0 });
        return;
      }

      // Statement scrub animation
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { opacity: 0.15, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }

      // Paragraphs entry
      gsap.fromTo(
        [paragraph1Ref.current, paragraph2Ref.current],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: paragraph1Ref.current,
            start: 'top 85%',
          },
        }
      );

      // Info grid entry
      if (infoRefs.current.length > 0) {
        gsap.fromTo(
          infoRefs.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRefs.current[0],
              start: 'top 90%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const aboutInfo = [
    { label: t.pages.corporate.about.info.foundedLabel, value: t.pages.corporate.about.info.foundedValue },
    { label: t.pages.corporate.about.info.headquartersLabel, value: t.pages.corporate.about.info.headquartersValue },
    { label: t.pages.corporate.about.info.activityLabel, value: t.pages.corporate.about.info.activityValue },
    { label: t.pages.corporate.about.info.expertiseLabel, value: t.pages.corporate.about.info.expertiseValue },
  ];

  // Helper to split text into lines for the scrub effect
  // In a real scenario, we might use SplitText, but we can do a simple word/line split
  // For simplicity without external libraries, we just split by commas or logical breaks, or just let CSS wrap and animate the whole block.
  // The prompt says "Each line begins with...", so we can wrap words or manually split if we had a specific line structure. 
  // We'll wrap the title in spans. Let's split by words for a similar effect.
  const titleWords = t.pages.corporate.about.title.split(' ');

  return (
    <section ref={sectionRef} className="py-24 lg:py-40 bg-background text-foreground">
      <Container>
        {/* Top Content: 3 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-32">
          {/* Col 1: Label */}
          <div className="md:col-span-12 lg:col-span-2">
            <span className="text-xs font-medium tracking-[0.2em] text-muted uppercase block pt-2">
              {t.pages.corporate.about.label}
            </span>
          </div>

          {/* Col 2: Large Statement */}
          <div className="md:col-span-12 lg:col-span-6">
            <h2 
              ref={statementRef}
              className="font-display font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.2] tracking-tight"
            >
              {titleWords.map((word, i) => (
                <span key={i} className="statement-line inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </h2>
          </div>

          {/* Col 3: Paragraphs */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6 pt-2">
            <p ref={paragraph1Ref} className="text-foreground-secondary text-base lg:text-lg leading-relaxed">
              {t.pages.corporate.about.paragraph1}
            </p>
            <p ref={paragraph2Ref} className="text-foreground-secondary text-base lg:text-lg leading-relaxed">
              {t.pages.corporate.about.paragraph2}
            </p>
          </div>
        </div>

        {/* Bottom Content: Company Info Grid */}
        <div className="border-t border-border pt-12 lg:pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {aboutInfo.map((info, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (el) infoRefs.current[idx] = el;
                }}
                className="flex flex-col gap-3"
              >
                <span className="text-xs tracking-wider text-muted uppercase">
                  {info.label}
                </span>
                <span className="font-display text-xl lg:text-3xl font-light text-foreground">
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
