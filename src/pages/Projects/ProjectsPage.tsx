import { useLanguage } from '../../hooks/useLanguage';
import Container from '../../components/common/Container';
import { projects } from '../../data/projects';

// ─────────────────────────────────────────────────────────────
// ProjectsPage — Placeholder
// ─────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <div
      className="flex flex-1 flex-col"
      style={{ paddingTop: '4rem' }}
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
            {t.pages.projects.title}
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            {projects.length === 0
              ? t.pages.projects.noProjects
              : t.pages.projects.placeholder}
          </p>
        </div>
      </Container>
    </div>
  );
}
