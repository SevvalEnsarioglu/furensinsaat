import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../../hooks/useLanguage';
import { contactInfo } from '../../../data/contact';
import { cn } from '../../../utils/cn';
import { ArrowRight } from 'lucide-react';

export default function ContactMap({ className }: { className?: string }) {
  const { t } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(mapContainerRef.current, { opacity: 1, clipPath: 'inset(0 0 0 0)' });
        gsap.set(iframeRef.current, { scale: 1 });
        return;
      }

      gsap.set(mapContainerRef.current, {
        clipPath: 'inset(100% 0 0 0)',
        opacity: 0,
      });
      gsap.set(iframeRef.current, { scale: 1.05 });

      gsap.to(mapContainerRef.current, {
        scrollTrigger: {
          trigger: mapContainerRef.current,
          start: 'top 85%',
        },
        clipPath: 'inset(0 0 0 0)',
        opacity: 1,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.to(iframeRef.current, {
        scrollTrigger: {
          trigger: mapContainerRef.current,
          start: 'top 85%',
        },
        scale: 1,
        duration: 1.4,
        ease: 'power3.out',
      });
    },
    { scope: mapContainerRef }
  );

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div
        ref={mapContainerRef}
        className="relative w-full flex-1 min-h-[250px] overflow-hidden rounded-xl border"
        style={{
          borderColor: 'var(--border)',
        }}
      >
        {/*
          Use CSS filter for dark theme/premium aesthetic if supported.
          Since it's an iframe from Google, we can style the container or use CSS filters.
          A grayscale filter works well for modern dark themes.
        */}
        <iframe
          ref={iframeRef}
          title={t.pages.contact.details.mapTitle}
          src={contactInfo.map.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full object-cover transition-transform"
        />
      </div>
    </div>
  );
}
