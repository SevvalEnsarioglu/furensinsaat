import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { id: '01', titleTR: 'KONUT PROJELERİ', titleEN: 'RESIDENTIAL' },
  { id: '02', titleTR: 'TİCARİ YAPILAR', titleEN: 'COMMERCIAL' },
  { id: '03', titleTR: 'PROJE GELİŞTİRME', titleEN: 'DEVELOPMENT' },
  { id: '04', titleTR: 'TAAHHÜT & İNŞAAT', titleEN: 'CONSTRUCTION' },
  { id: '05', titleTR: 'MİMARİ UYGULAMA', titleEN: 'ARCHITECTURE' },
];

export default function ServicesPreviewSection() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !listRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        listRef.current!.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-32 lg:py-40 bg-[var(--background)] relative"
    >
      <Container>
        <div className="mb-16 md:mb-24 relative z-10">
          <span className="text-xs font-sans font-medium tracking-[0.2em] text-[var(--primary)] uppercase block mb-4">
            {t.pages.home.services.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-[var(--foreground)]">
            {t.pages.home.services.title}
          </h2>
        </div>

        <ul ref={listRef} className="flex flex-col border-t border-[var(--border)] relative z-10">
          {servicesData.map((service) => (
            <li 
              key={service.id}
              className="group border-b border-[var(--border)]"
            >
              <Link 
                to="/hizmetler" 
                className="flex items-center justify-between py-8 md:py-12 transition-colors duration-300 hover:bg-[var(--surface-secondary)] px-4 -mx-4 rounded-sm"
              >
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="font-sans text-sm md:text-base font-medium text-[var(--muted)] transition-colors group-hover:text-[var(--primary)]">
                    {service.id}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-light text-[var(--foreground)] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] md:group-hover:translate-x-6">
                    {lang === 'en' ? service.titleEN : service.titleTR}
                  </h3>
                </div>
                
                <div className="overflow-hidden">
                  <span className="block text-[var(--foreground)] transition-transform duration-500 ease-out -translate-x-8 opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
