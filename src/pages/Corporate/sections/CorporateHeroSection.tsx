import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';
import { corporateHeroImage } from '../../../data/corporate';

gsap.registerPlugin(ScrollTrigger);

export default function CorporateHeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRefs = useRef<HTMLDivElement[]>([]);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([labelRef.current, line1Ref.current, line2Ref.current, line3Ref.current, descRef.current, metaRefs.current], { opacity: 1, y: 0 });
        gsap.set(imageWrapperRef.current, { clipPath: 'inset(0 0 0 0)' });
        gsap.set(imageRef.current, { scale: 1, xPercent: 0 });
        return;
      }

      const tl = gsap.timeline();

      // Initial States
      gsap.set(labelRef.current, { opacity: 0, y: 20 });
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { yPercent: 100 });
      gsap.set(descRef.current, { opacity: 0, y: 20 });
      gsap.set(metaRefs.current, { opacity: 0, y: 15 });
      gsap.set(imageWrapperRef.current, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(imageRef.current, { scale: 1.08, xPercent: 4 });

      // Animation Sequence
      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.15)
        .to(line1Ref.current, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, 0.3)
        .to(line2Ref.current, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, 0.42)
        .to(line3Ref.current, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, 0.54)
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.7)
        .to(metaRefs.current, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, 0.85)
        .to(
          imageWrapperRef.current,
          { clipPath: 'inset(0 0 0 0)', duration: 1.5, ease: 'power3.inOut' },
          0.3
        )
        .to(
          imageRef.current,
          { scale: 1, xPercent: 0, duration: 1.5, ease: 'power3.inOut' },
          0.3
        );

      // Scroll Parallax for image
      gsap.to(imageRef.current, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const metaData = [
    { label: t.pages.corporate.hero.metadata.headquartersLabel, value: t.pages.corporate.hero.metadata.headquartersValue },
    { label: t.pages.corporate.hero.metadata.activityLabel, value: t.pages.corporate.hero.metadata.activityValue },
    { label: t.pages.corporate.hero.metadata.approachLabel, value: t.pages.corporate.hero.metadata.approachValue },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background-alt pt-32 pb-16 lg:pt-40 lg:pb-24 flex items-center min-h-[90svh] lg:min-h-[800px] overflow-hidden"
    >
      <Container className="h-full">
        <div ref={containerRef} className="flex flex-col lg:flex-row h-full gap-12 lg:gap-8 justify-between">
          
          {/* Left Column: Text & Meta */}
          <div className="flex flex-col justify-center w-full lg:w-[55%] pt-4 lg:pt-8 relative z-10">
            <span
              ref={labelRef}
              className="text-xs md:text-sm font-medium tracking-[0.2em] mb-8 lg:mb-12 text-primary uppercase"
            >
              {t.pages.corporate.hero.label}
            </span>

            <h1 className="font-display font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] mb-8 text-foreground tracking-tight">
              <div className="overflow-hidden pb-2"><div ref={line1Ref}>{t.pages.corporate.hero.titleLine1}</div></div>
              <div className="overflow-hidden pb-2"><div ref={line2Ref}>{t.pages.corporate.hero.titleLine2}</div></div>
              <div className="overflow-hidden pb-2"><div ref={line3Ref}>{t.pages.corporate.hero.titleLine3}</div></div>
            </h1>

            <p
              ref={descRef}
              className="text-foreground-secondary text-base md:text-lg lg:text-xl max-w-lg mb-12 lg:mb-20 leading-relaxed"
            >
              {t.pages.corporate.hero.description}
            </p>

            {/* Meta data - moved below description on all screens, but grid layout changes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8 mt-auto">
              {metaData.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) metaRefs.current[index] = el;
                  }}
                  className="flex flex-col gap-1"
                >
                  <span className="text-[10px] md:text-xs tracking-wider text-muted uppercase">
                    {item.label}
                  </span>
                  <span className="text-sm md:text-base text-foreground font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-[40%] flex items-end lg:items-center mt-8 lg:mt-0">
            <div
              ref={imageWrapperRef}
              className="w-full aspect-[4/5] lg:aspect-[3/4] xl:aspect-[2/3] relative overflow-hidden bg-surface-secondary"
            >
              <img
                ref={imageRef}
                src={corporateHeroImage}
                alt="Corporate Architecture"
                className="w-full h-full object-cover origin-center"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
