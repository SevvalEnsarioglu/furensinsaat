import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';
import { corporateValues } from '../../../data/corporate';

gsap.registerPlugin(ScrollTrigger);

export default function ValuesSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLSelectElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const activeIndexRef = useRef<number>(0);

  // Map translation keys dynamically based on corporateValues array
  const valuesData = corporateValues.map((val) => {
    // Cast to any because TS might complain about dynamic key access, 
    // but we know id matches the keys in locale
    const trData = (t.pages.corporate.values.items as any)[val.id];
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
      const mm = gsap.matchMedia();

      // Desktop: Sticky image logic & text highlight
      mm.add('(min-width: 1024px)', () => {
        // Init images: first one visible, others hidden
        imagesRef.current.forEach((img, i) => {
          if (i === 0) {
            gsap.set(img, { opacity: 1, scale: 1, filter: 'blur(0px)', zIndex: 2 });
          } else {
            gsap.set(img, { opacity: 0, scale: 1.06, filter: 'blur(4px)', zIndex: 1 });
          }
        });

        // Setup ScrollTrigger for each text item
        itemsRef.current.forEach((item, i) => {
          // Opacity transition for text
          gsap.to(item, {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top 60%',
              end: 'top 40%',
              scrub: true,
              onEnter: () => switchImage(i),
              onEnterBack: () => switchImage(i),
            },
          });
        });

        function switchImage(index: number) {
          if (index === activeIndexRef.current || prefersReducedMotion) return;
          
          const oldImg = imagesRef.current[activeIndexRef.current];
          const newImg = imagesRef.current[index];
          
          if (!oldImg || !newImg) return;

          // Push old image behind
          gsap.set(oldImg, { zIndex: 1 });
          gsap.set(newImg, { zIndex: 2 });

          // Animate old image out
          gsap.to(oldImg, {
            opacity: 0,
            scale: 1.03,
            filter: 'blur(4px)',
            duration: 0.8,
            ease: 'power3.out',
          });

          // Animate new image in
          gsap.fromTo(
            newImg,
            { opacity: 0, scale: 1.06, filter: 'blur(4px)' },
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power3.out',
            }
          );

          activeIndexRef.current = index;
        }
      });

      // Mobile: Simple reveal, no sticky
      mm.add('(max-width: 1023px)', () => {
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
                start: 'top 85%',
              }
            }
          );
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background text-foreground relative">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Left Column: Values List */}
          <div className="w-full lg:w-[55%] flex flex-col pt-10">
            <span className="text-xs font-medium tracking-[0.2em] text-muted uppercase mb-16 lg:mb-24 block">
              {t.pages.corporate.values.label}
            </span>

            <div className="flex flex-col">
              {valuesData.map((val, idx) => (
                <div 
                  key={val.id}
                  ref={(el) => {
                    if (el) itemsRef.current[idx] = el;
                  }}
                  className="flex flex-col border-t border-border py-12 lg:py-20 lg:opacity-30 transition-opacity duration-300"
                >
                  <div className="flex gap-6 lg:gap-12">
                    <span className="text-sm font-medium text-muted shrink-0 pt-2">
                      0{idx + 1}
                    </span>
                    <div className="flex flex-col gap-4 lg:gap-6">
                      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-tight">
                        {val.title}
                      </h3>
                      <p className="text-base lg:text-lg text-foreground-secondary leading-relaxed max-w-md">
                        {val.description}
                      </p>
                      
                      {/* Mobile Image (Hidden on Desktop) */}
                      <div className="block lg:hidden mt-6 w-full aspect-[4/3] overflow-hidden bg-surface-secondary">
                        <img 
                          src={val.image} 
                          alt={val.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Final bottom border */}
            <div className="border-t border-border w-full h-[50vh] lg:h-[30vh]"></div>
          </div>

          {/* Right Column: Sticky Image Area (Desktop Only) */}
          <div className="hidden lg:block w-[40%]">
            <div className="sticky top-[20vh] h-[65vh] w-full bg-surface-secondary overflow-hidden">
              {valuesData.map((val, idx) => (
                <img
                  key={`img-${val.id}`}
                  ref={(el) => {
                    if (el) imagesRef.current[idx] = el;
                  }}
                  src={val.image}
                  alt={val.title}
                  className="absolute inset-0 w-full h-full object-cover origin-center"
                />
              ))}
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
