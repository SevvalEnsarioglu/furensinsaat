import { cn } from '../../utils/cn';

// ─────────────────────────────────────────────────────────────
// SectionTitle
// Standardised section heading used across all pages.
// ─────────────────────────────────────────────────────────────

interface SectionTitleProps {
  /** Main heading text */
  title: string;
  /** Optional supporting subtitle */
  subtitle?: string;
  /** Text alignment (default: left) */
  align?: 'left' | 'center' | 'right';
  /** Optional overline label above the title (e.g. "— Hakkımızda") */
  overline?: string;
  className?: string;
}

const alignClasses: Record<NonNullable<SectionTitleProps['align']>, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

export default function SectionTitle({
  title,
  subtitle,
  align = 'left',
  overline,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        alignClasses[align],
        className,
      )}
    >
      {overline && (
        <span
          className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]"
          aria-hidden="true"
        >
          {overline}
        </span>
      )}

      <h2
        className="font-display text-3xl font-light text-[var(--foreground)] sm:text-4xl lg:text-5xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="max-w-2xl text-base text-[var(--foreground-secondary)] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
