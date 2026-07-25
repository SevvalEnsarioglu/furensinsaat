import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function VisionMissionSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLSelectElement>(null);
  
  // Vision Refs
  const visionPanelRef = useRef<HTMLDivElement>(null);
  const visionLabelRef = useRef<HTMLSpanElement>(null);
  const visionTextRef = useRef<HTMLParagraphElement>(null);
  
  // Mission Refs
  const missionPanelRef = useRef<HTMLDivElement>(null);
  const missionLabelRef = useRef<HTMLSpanElement>(null);
  const missionTextRef = useRef<HTMLParagraphElement>(null);

  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Elements to animate inside panels
      const visionElements = [visionLabelRef.current, visionTextRef.current];
      const missionElements = [missionLabelRef.current, missionTextRef.current];

      mm.add('(min-width: 1024px)', () => {
        if (prefersReducedMotion) {
          gsap.set([visionPanelRef.current, missionPanelRef.current], { opacity: 1, xPercent: 0 });
          gsap.set([...visionElements, ...missionElements], { opacity: 1, y: 0 });
          gsap.set(dividerRef.current, { scaleY: 1 });
          return;
        }

        // Initial setup for Desktop
        gsap.set(visionPanelRef.current, { xPercent: -8, opacity: 0 });
        gsap.set(missionPanelRef.current, { xPercent: 8, opacity: 0 });
        gsap.set([...visionElements, ...missionElements], { opacity: 0, y: 20 });
        gsap.set(dividerRef.current, { scaleY: 0, transformOrigin: 'top center' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        });

        // Panels slide in
        tl.to([visionPanelRef.current, missionPanelRef.current], {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, 0);

        // Divider grows
        tl.to(dividerRef.current, {
          scaleY: 1,
          duration: 1,
          ease: 'power3.inOut',
        }, 0.2);

        // Inner elements reveal
        tl.to(visionElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }, 0.4);

        tl.to(missionElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }, 0.5); // slightly staggered after vision
      });

      mm.add('(max-width: 1023px)', () => {
        if (prefersReducedMotion) {
          gsap.set([visionPanelRef.current, missionPanelRef.current], { opacity: 1, y: 0 });
          gsap.set([...visionElements, ...missionElements], { opacity: 1, y: 0 });
          return;
        }

        // Initial setup for Mobile/Tablet
        gsap.set([visionPanelRef.current, missionPanelRef.current], { opacity: 0, y: 30 });
        gsap.set([...visionElements, ...missionElements], { opacity: 0, y: 15 });

        // Vision Panel
        const vTl = gsap.timeline({
          scrollTrigger: { trigger: visionPanelRef.current, start: 'top 85%' }
        });
        vTl.to(visionPanelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
           .to(visionElements, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.4');

        // Mission Panel
        const mTl = gsap.timeline({
          scrollTrigger: { trigger: missionPanelRef.current, start: 'top 85%' }
        });
        mTl.to(missionPanelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
           .to(missionElements, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.4');
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col lg:flex-row min-h-[60vh] overflow-hidden">
      
      {/* Vision Panel */}
      <div 
        ref={visionPanelRef}
        className="w-full lg:w-1/2 flex items-center justify-center py-24 px-8 lg:px-16 xl:px-24"
        style={{ backgroundColor: 'var(--primary)', color: 'var(--text-on-primary)' }}
      >
        <div className="max-w-xl w-full flex flex-col items-start gap-8 lg:gap-12">
          <span 
            ref={visionLabelRef}
            className="text-xs lg:text-sm font-medium tracking-[0.2em] uppercase opacity-80"
          >
            {t.pages.corporate.visionMission.visionLabel}
          </span>
          <p 
            ref={visionTextRef}
            className="font-display font-light text-[clamp(1.5rem,3vw,2.5rem)] leading-snug tracking-tight"
          >
            {t.pages.corporate.visionMission.visionText}
          </p>
        </div>
      </div>

      {/* Optional Divider (Desktop only) */}
      <div className="hidden lg:block relative w-0">
        <div 
          ref={dividerRef}
          className="absolute top-12 bottom-12 left-0 w-[1px] bg-border z-10 opacity-50"
          style={{ transformOrigin: 'top center' }}
        ></div>
      </div>

      {/* Mission Panel */}
      <div 
        ref={missionPanelRef}
        className="w-full lg:w-1/2 flex items-center justify-center py-24 px-8 lg:px-16 xl:px-24 bg-background-alt text-foreground"
      >
        <div className="max-w-xl w-full flex flex-col items-start gap-8 lg:gap-12">
          <span 
            ref={missionLabelRef}
            className="text-xs lg:text-sm font-medium tracking-[0.2em] uppercase text-muted"
          >
            {t.pages.corporate.visionMission.missionLabel}
          </span>
          <p 
            ref={missionTextRef}
            className="font-display font-light text-[clamp(1.5rem,3vw,2.5rem)] leading-snug tracking-tight"
          >
            {t.pages.corporate.visionMission.missionText}
          </p>
        </div>
      </div>

    </section>
  );
}
