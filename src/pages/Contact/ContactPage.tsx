import { useLanguage } from '../../hooks/useLanguage';
import Container from '../../components/common/Container';

// ─────────────────────────────────────────────────────────────
// ContactPage — Placeholder
// ─────────────────────────────────────────────────────────────

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center"
      style={{ minHeight: 'calc(100vh - 4rem)', paddingTop: '4rem' }}
    >
      <Container>
        <div className="flex flex-col items-center gap-6 py-32 text-center">
          <span
            className="text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: 'var(--accent)' }}
          >
            Phase 1 — Placeholder
          </span>
          <h1
            className="font-display text-5xl font-light sm:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
          >
            {t.pages.contact.title}
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            {t.pages.contact.placeholder}
          </p>
        </div>
      </Container>
    </div>
  );
}
