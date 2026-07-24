import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';

gsap.registerPlugin(ScrollTrigger);

const philosophyData = [
  { id: '01', titleTR: 'MİMARİ', titleEN: 'ARCHITECTURE', textTR: 'Form ve fonksiyonun kusursuz dengesini kuruyoruz.', textEN: 'We establish the perfect balance of form and function.' },
  { id: '02', titleTR: 'MÜHENDİSLİK', titleEN: 'ENGINEERING', textTR: 'Güvenliği ve dayanıklılığı standartların ötesine taşıyoruz.', textEN: 'We take safety and durability beyond standards.' },
  { id: '03', titleTR: 'YAŞAM', titleEN: 'LIFE', textTR: 'Sadece binalar değil, içinde hayat bulan sürdürülebilir yaşam alanları inşa ediyoruz.', textEN: 'We build sustainable living spaces that come to life.' }
];

export default function PhilosophySection() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only pin on desktop
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!sectionRef.current || !leftContentRef.current || !rightContentRef.current || !isDesktop) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: rightContentRef.current,
        scrub: true,
      });

      const items = gsap.utils.toArray('.philosophy-item') as HTMLElement[];
      
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.15, filter: 'blur(4px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top center+=150',
              end: 'top center-=50',
              scrub: true,
            }
          }
        );
        
        gsap.to(item, {
          opacity: 0.15,
          filter: 'blur(4px)',
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'bottom center-=50',
            end: 'bottom center-=250',
            scrub: true,
          }
        });
      });

      gsap.fromTo(
        '.philosophy-img',
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--background-alt)] text-[var(--foreground)] relative z-20">
      {/* Mobile Layout (Normal flow) */}
      <div className="lg:hidden py-24 md:py-32">
        <Container>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight mb-16 text-[var(--foreground)]">
            {t.pages.home.philosophy.title}
          </h2>
          
          <div className="flex flex-col gap-16">
            {philosophyData.map((item) => (
              <div key={item.id} className="flex flex-col gap-4">
                <span className="text-[var(--primary)] font-sans text-xs md:text-sm tracking-widest">{item.id}</span>
                <h3 className="font-display text-4xl md:text-5xl text-[var(--foreground)] font-light tracking-tight">
                  {lang === 'en' ? item.titleEN : item.titleTR}
                </h3>
                <p className="text-[var(--foreground-secondary)] font-light md:text-lg">
                  {lang === 'en' ? item.textEN : item.textTR}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 w-full aspect-[4/5] relative overflow-hidden rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Philosophy"
              className="w-full h-full object-cover"
            />
          </div>
        </Container>
      </div>

      {/* Desktop Layout (Pinned) */}
      <div className="hidden lg:flex w-full relative">
        {/* Left Side: Scrolling text */}
        <div ref={leftContentRef} className="w-1/2 flex flex-col relative z-10">
          <div className="h-screen flex items-center px-12 xl:px-24">
             <h2 className="font-display text-5xl xl:text-6xl font-light leading-[1.1] tracking-tight text-[var(--foreground)] max-w-xl">
               {t.pages.home.philosophy.title}
             </h2>
          </div>
          
          {philosophyData.map((item) => (
            <div key={item.id} className="philosophy-item h-screen flex flex-col justify-center px-12 xl:px-24 max-w-xl will-change-[opacity,filter]">
              <span className="text-[var(--primary)] font-sans text-sm tracking-widest mb-6 block">{item.id}</span>
              <h3 className="font-display text-7xl xl:text-8xl text-[var(--foreground)] font-light tracking-tight mb-6">
                {lang === 'en' ? item.titleEN : item.titleTR}
              </h3>
              <p className="text-[var(--foreground-secondary)] font-light text-xl xl:text-2xl leading-relaxed max-w-md">
                {lang === 'en' ? item.textEN : item.textTR}
              </p>
            </div>
          ))}
          
          <div className="h-[20vh]" />
        </div>
        
        {/* Right Side: Pinned Image */}
        <div ref={rightContentRef} className="w-1/2 h-screen overflow-hidden sticky top-0 z-0">
          <div className="absolute inset-y-12 right-12 left-6 xl:left-12 overflow-hidden rounded-sm">
             <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Architecture Philosophy"
                className="philosophy-img w-full h-full object-cover origin-center will-change-transform"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
