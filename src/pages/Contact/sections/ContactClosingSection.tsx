import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';
import { ArrowRight } from 'lucide-react';

export default function ContactClosingSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(textRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(textRef.current, { opacity: 0, y: 30 });
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="border-t py-24 lg:py-32"
      style={{
        backgroundColor: 'var(--surface-secondary)',
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
      }}
    >
      <Container>
        <div ref={textRef} className="flex flex-col items-center text-center">
          <h2
            className="mb-6 text-3xl font-light uppercase leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="block">{t.pages.contact.closing.titleLine1}</span>
            <span className="block" style={{ color: 'var(--primary)' }}>
              {t.pages.contact.closing.titleLine2}
            </span>
          </h2>
          
          <p
            className="mb-12 max-w-xl text-sm leading-relaxed sm:text-base md:text-lg"
            style={{ color: 'var(--muted)' }}
          >
            {t.pages.contact.closing.description}
          </p>

          <Link
            to="/kurumsal"
            className="group flex w-fit items-center gap-4 border-b border-transparent pb-1 text-sm font-semibold tracking-widest uppercase transition-colors hover:border-[var(--primary)]"
            style={{ color: 'var(--foreground)' }}
          >
            <span>{t.pages.contact.closing.cta}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--primary)' }} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
