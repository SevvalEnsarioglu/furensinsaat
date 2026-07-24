import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import Container from '../../components/common/Container';
import { projects } from '../../data/projects';

// ─────────────────────────────────────────────────────────────
// ProjectDetailPage — Placeholder
// Reads :slug from the route and looks up the project.
// ─────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();

  const project = projects.find((p) => p.slug === slug);

  return (
    <div
      className="flex flex-1 flex-col"
      style={{ paddingTop: '4rem' }}
    >
      <Container>
        <div className="flex flex-col items-center gap-6 py-32 text-center">
          {project ? (
            <>
              <span
                className="text-xs font-medium uppercase tracking-[0.3em]"
                style={{ color: 'var(--accent)' }}
              >
                {project.status}
              </span>
              <h1
                className="font-display text-5xl font-light sm:text-6xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              >
                {project.title}
              </h1>
              <p style={{ color: 'var(--muted)' }}>{project.location}</p>
            </>
          ) : (
            <>
              <h1
                className="font-display text-4xl font-light"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              >
                {t.pages.projectDetail.notFound}
              </h1>
              <p style={{ color: 'var(--muted)' }}>
                Slug: <code className="text-sm">{slug}</code>
              </p>
            </>
          )}

          <Link
            to="/projeler"
            className="mt-4 flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: 'var(--primary)' }}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            {t.pages.projectDetail.backToProjects}
          </Link>
        </div>
      </Container>
    </div>
  );
}
