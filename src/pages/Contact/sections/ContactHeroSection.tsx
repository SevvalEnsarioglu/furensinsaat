import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../../hooks/useLanguage';
import Container from '../../../components/common/Container';

export default function ContactHeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            labelRef.current,
            titleLine1Ref.current,
            titleLine2Ref.current,
            descRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 1.2,
        },
      });

      // Set initial states
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: '110%' });
      gsap.set([labelRef.current, descRef.current], { opacity: 0, y: 20 });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
        .to(
          [titleLine1Ref.current, titleLine2Ref.current],
          {
            y: '0%',
            stagger: 0.1,
          },
          '-=0.4'
        )
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.8'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center overflow-hidden pt-32 pb-16 lg:pt-48 lg:pb-24"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        minHeight: 'clamp(400px, 60svh, 800px)',
      }}
    >
      <Container wide>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left: Typography */}
          <div className="flex flex-col justify-end lg:col-span-8">
            <span
              ref={labelRef}
              className="mb-8 block text-xs font-medium tracking-[0.2em]"
              style={{ color: 'var(--primary)' }}
            >
              {t.pages.contact.hero.label}
            </span>

            <h1
              className="font-display flex flex-col text-5xl font-light uppercase leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="overflow-hidden pb-2">
                <span ref={titleLine1Ref} className="block">
                  {t.pages.contact.hero.titleLine1}
                </span>
              </span>
              <span className="overflow-hidden pb-2">
                <span ref={titleLine2Ref} className="block">
                  {t.pages.contact.hero.titleLine2}
                </span>
              </span>
            </h1>
          </div>

          {/* Right: Description */}
          <div className="flex flex-col justify-end lg:col-span-4 lg:pb-4">
            <p
              ref={descRef}
              className="max-w-md text-base leading-relaxed md:text-lg"
              style={{ color: 'var(--muted)' }}
            >
              {t.pages.contact.hero.description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
