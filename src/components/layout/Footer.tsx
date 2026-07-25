import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import Container from '../common/Container';
import { cn } from '../../utils/cn';
import { contactInfo } from '../../data/contact';

// ─────────────────────────────────────────────────────────────
// Logo
// ─────────────────────────────────────────────────────────────

function FooterLogo() {
  return (
    <div className="flex flex-col gap-0.5 leading-none">
      <span
        className="font-display font-semibold tracking-widest uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          letterSpacing: '0.18em',
          color: 'var(--footer-foreground)',
        }}
      >
        FURENS
      </span>

      <span
        className="font-sans font-light uppercase"
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.32em',
          color: 'var(--footer-muted)',
        }}
      >
        İNŞAAT
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer Link
// ─────────────────────────────────────────────────────────────

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'group flex w-fit items-center gap-3 text-sm transition-colors duration-200',
          isActive
            ? 'text-[var(--footer-foreground)]'
            : 'text-[var(--footer-muted)] hover:text-[var(--footer-foreground)]',
        )
      }
    >
      <span className="text-lg font-light leading-none text-[var(--footer-muted)] transition-colors group-hover:text-[var(--footer-foreground)]">
        +
      </span>

      <span>{children}</span>
    </NavLink>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: 'var(--footer-background)',
        color: 'var(--footer-foreground)',
      }}
    >
      <Container wide>
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-12">

          {/* Brand & Intro */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <Link
              to="/"
              aria-label="Furens İnşaat — Ana Sayfa"
              className="inline-block w-fit"
            >
              <FooterLogo />
            </Link>
            
            <p className="max-w-[280px] text-sm leading-relaxed text-[var(--footer-muted)]">
              {t.footer.shortIntro}
            </p>
          </div>

          {/* Legal / Aydınlatma Metinleri */}
          <div className="flex flex-col gap-6 lg:justify-self-center">
            <h3 className="text-base font-medium text-[var(--footer-foreground)]">
              {t.footer.legal}
            </h3>

            <nav aria-label="Aydınlatma Metinleri">
              <ul className="flex flex-col gap-4" role="list">
                <li>
                  <FooterLink to="/cerez-politikasi">
                    {t.footer.cookiePolicy}
                  </FooterLink>
                </li>

                <li>
                  <FooterLink to="/kisisel-veriler">
                    {t.footer.kvkk}
                  </FooterLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6 lg:justify-self-center">
            <h3 className="text-base font-medium text-[var(--footer-foreground)]">
              {t.footer.quickLinks}
            </h3>

            <nav aria-label="Hızlı Erişim">
              <ul className="flex flex-col gap-4" role="list">
                <li>
                  <FooterLink to="/">{t.nav.home}</FooterLink>
                </li>

                <li>
                  <FooterLink to="/hizmetler">
                    {t.nav.services}
                  </FooterLink>
                </li>

                <li>
                  <FooterLink to="/projeler">
                    {t.nav.projects}
                  </FooterLink>
                </li>

                <li>
                  <FooterLink to="/iletisim">
                    {t.nav.contact}
                  </FooterLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6 md:justify-self-end">
            <h3 className="text-base font-medium text-[var(--footer-foreground)]">
              {t.footer.contactUs}
            </h3>

            <address className="flex max-w-[300px] flex-col gap-5 text-sm not-italic text-[var(--footer-muted)]">
              <p className="leading-7">
                {contactInfo.address.line1} {contactInfo.address.line2}{' '}
                {contactInfo.address.line3} {contactInfo.address.line4}
              </p>

              <a
                href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                className="w-fit transition-colors hover:text-[var(--footer-foreground)]"
              >
                {contactInfo.phone}
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="w-fit transition-colors hover:text-[var(--footer-foreground)]"
              >
                {contactInfo.email}
              </a>

            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 border-t py-6 sm:flex-row"
          style={{
            borderColor: 'var(--footer-border)',
          }}
        >
          <p className="text-sm text-[var(--footer-muted)]">
            {t.footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}