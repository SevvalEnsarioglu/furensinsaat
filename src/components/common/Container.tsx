import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

// ─────────────────────────────────────────────────────────────
// Container
// Centered max-width wrapper with generous responsive padding.
// Default: max-w-screen-xl (1280px) — spacious, architectural feel
// Narrow:  max-w-3xl        (768px)  — for text-heavy/editorial content
// Wide:    max-w-screen-2xl (1536px) — for full-bleed sections
// ─────────────────────────────────────────────────────────────

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof React.JSX.IntrinsicElements;
  /** Narrower column for editorial / text-heavy content */
  narrow?: boolean;
  /** Wider column for large showcases */
  wide?: boolean;
  /** Full width container for Navbar/Headers */
  fluid?: boolean;
}

export default function Container({
  as: Tag = 'div',
  narrow = false,
  wide = false,
  fluid = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    // @ts-expect-error — polymorphic `as` prop; safe because Tag is limited to HTML intrinsics
    <Tag
      className={cn(
        'mx-auto w-full',
        // Generous horizontal padding: 1.5rem → 3rem → 5rem → 6rem
        'px-6 sm:px-10 lg:px-16 xl:px-20',
        className,
      )}
      style={{
        maxWidth: narrow ? '768px' : wide ? '1536px' : fluid ? '1920px' : '1280px',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
