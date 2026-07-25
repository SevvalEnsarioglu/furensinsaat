import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../../hooks/useLanguage';
import { contactInfo } from '../../../data/contact';
import Container from '../../../components/common/Container';
import ContactInfoItem from '../components/ContactInfoItem';
import ContactMap from '../components/ContactMap';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactMainSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const items = gsap.utils.toArray<HTMLElement>('.contact-info-item');

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 20 });
      gsap.to(items, {
        scrollTrigger: {
          trigger: infoColRef.current,
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col pb-8 pt-24 lg:min-h-screen lg:justify-center lg:pb-8 lg:pt-24"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <Container>
        <div 
          className="mx-auto flex w-full max-w-6xl flex-col p-6 lg:flex-row lg:p-8 lg:px-10"
          style={{ 
            backgroundColor: 'transparent'
          }}
        >
          {/* Left Column: Contact Info & Map (50%) */}
          <div ref={infoColRef} className="flex w-full flex-col gap-6 pr-0 lg:w-1/2 lg:pr-8">
            <div>
              <h2
                className="mb-4 text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: 'var(--primary)' }}
              >
                {t.pages.contact.details.title}
              </h2>
              
              <div className="flex flex-col border-t" style={{ borderColor: 'var(--border)' }}>
                <ContactInfoItem
                  icon={<MapPin className="h-5 w-5" />}
                  label={t.pages.contact.details.addressLabel}
                  value={
                    <>
                      {contactInfo.address.line1} <br />
                      {contactInfo.address.line2} <br />
                      {contactInfo.address.line3} <br />
                      {contactInfo.address.line4}
                    </>
                  }
                />
                <ContactInfoItem
                  icon={<Phone className="h-5 w-5" />}
                  label={t.pages.contact.details.phoneLabel}
                  value={
                    <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-[var(--primary)]">
                      {contactInfo.phone}
                    </a>
                  }
                />
                <ContactInfoItem
                  icon={<Mail className="h-5 w-5" />}
                  label={t.pages.contact.details.emailLabel}
                  value={
                    <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-[var(--primary)]">
                      {contactInfo.email}
                    </a>
                  }
                  className="border-b-0"
                />
              </div>
            </div>

            {/* Map fills remaining space on desktop, has fixed min-height on mobile */}
            <ContactMap className="mt-4 flex-1" />
          </div>

          {/* Vertical Divider for Desktop */}
          <div className="hidden w-px bg-transparent lg:block" style={{ backgroundColor: 'var(--border)' }} />

          {/* Right Column: Contact Form (50%) */}
          <div className="mt-8 flex w-full flex-col pl-0 lg:mt-0 lg:w-1/2 lg:pl-8">
            <h2
              className="mb-2 text-2xl font-light uppercase sm:text-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.pages.contact.form.title}
            </h2>
            <p className="mb-6 text-sm" style={{ color: 'var(--muted)' }}>
              {t.pages.contact.form.description}
            </p>
            
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
