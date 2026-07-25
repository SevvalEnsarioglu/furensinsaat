import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';
import { corporateProcess } from '../../../data/corporate';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLSelectElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const processData = corporateProcess.map((val) => {
    const trData = (t.pages.corporate.process.steps as any)[val.id];
    return {
      ...val,
      title: trData?.title || '',
      description: trData?.description || ''
    };
  });

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !progressBarRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Large Desktop (pinned horizontal scroll)
      mm.add('(min-width: 1280px)', () => {
        if (prefersReducedMotion) return;

        const trackWidth = trackRef.current!.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distanceToMove = trackWidth - viewportWidth + (viewportWidth * 0.1); // Add a bit of padding

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${distanceToMove}px`,
            pin: true,
            scrub: 1,
          },
        });

        // Move the track horizontally
        tl.to(trackRef.current, {
          x: -distanceToMove,
          ease: 'none',
        });

        // Fill the progress bar
        tl.to(
          progressBarRef.current,
          {
            scaleX: 1,
            ease: 'none',
          },
          0
        );
        
        // Staggered text opacity for items as they come into view
        itemsRef.current.forEach((item, i) => {
          gsap.to(item, {
            opacity: 1,
            duration: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top top-=${(distanceToMove / itemsRef.current.length) * (i - 0.5)}px`,
              end: `top top-=${(distanceToMove / itemsRef.current.length) * (i + 0.5)}px`,
              scrub: true,
            }
          });
        });
      });

      // Mobile/Tablet Vertical Animation
      mm.add('(max-width: 1279px)', () => {
        gsap.set(progressBarRef.current, { scaleX: 1, scaleY: 0, transformOrigin: 'top center' });
        
        if (prefersReducedMotion) {
           gsap.set(progressBarRef.current, { scaleY: 1 });
           gsap.set(itemsRef.current, { opacity: 1, y: 0 });
           return;
        }

        // Fill vertical progress bar based on section scroll
        gsap.to(progressBarRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          }
        });

        itemsRef.current.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
              }
            }
          );
        });
      });

      return () => mm.revert();
    }, sectionRef);

    // Refresh ScrollTrigger to recalculate widths after render
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background-alt text-foreground overflow-hidden py-24 xl:py-0 xl:h-[100svh] relative">
      <div className="absolute top-0 left-0 w-full xl:h-full xl:flex xl:items-center">
        
        {/* Main Content Area */}
        <div className="w-full flex flex-col xl:flex-row h-full">
          
          {/* Intro Section (Fixed left side on Desktop) */}
          <div className="w-full xl:w-[35vw] shrink-0 xl:h-full flex flex-col justify-center px-6 md:px-12 xl:pl-[max(3rem,calc((100vw-80rem)/2))] xl:pr-12 xl:border-r border-border mb-16 xl:mb-0 relative z-10 bg-background-alt">
            <span className="text-xs font-medium tracking-[0.2em] text-muted uppercase mb-6 xl:mb-12 block">
              {t.pages.corporate.process.label}
            </span>
            <h2 className="font-display font-light text-4xl xl:text-5xl leading-tight">
              YAPIM<br className="hidden xl:block" /> SÜRECİMİZ
            </h2>
          </div>

          {/* Track (Scrolls horizontally on Desktop, vertically on Mobile/Tablet) */}
          <div className="w-full xl:w-auto xl:h-full relative px-6 md:px-12 xl:px-0">
            {/* Progress Line */}
            <div className="absolute left-[38px] md:left-[62px] xl:left-0 top-0 bottom-0 xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 w-[1px] xl:w-full xl:h-[1px] bg-border z-0">
              <div 
                ref={progressBarRef}
                className="w-full h-full bg-primary xl:origin-left"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>

            <div 
              ref={trackRef} 
              className="flex flex-col xl:flex-row xl:h-full items-start xl:items-center gap-16 xl:gap-0 relative z-10"
            >
              {processData.map((step, idx) => (
                <div 
                  key={step.id} 
                  ref={(el) => { if(el) itemsRef.current[idx] = el; }}
                  className="xl:w-[40vw] max-w-xl xl:max-w-none shrink-0 flex flex-row xl:flex-col gap-6 xl:gap-12 xl:px-16 items-start xl:opacity-40 transition-opacity duration-300"
                >
                  {/* Step Number with Node */}
                  <div className="relative xl:static flex flex-col xl:flex-row items-center gap-4 xl:gap-0 pt-1 xl:pt-0">
                    <span className="font-display text-2xl xl:text-4xl text-primary font-light bg-background-alt z-10 xl:bg-transparent">
                      0{idx + 1}
                    </span>
                    {/* Node on line */}
                    <div className="hidden xl:block absolute top-1/2 left-[calc(4rem+1.5rem)] w-2 h-2 bg-background-alt border border-primary rounded-full -translate-y-1/2 z-10"></div>
                    <div className="xl:hidden w-3 h-3 bg-background-alt border-2 border-primary rounded-full z-10 mt-2"></div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 xl:gap-6 bg-background-alt py-2 xl:py-0">
                    <h3 className="font-display text-xl md:text-2xl xl:text-3xl tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-foreground-secondary text-base xl:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Extra spacing at the end for desktop to scroll smoothly off */}
              <div className="hidden xl:block w-[10vw] shrink-0 h-full"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
