import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

// ─────────────────────────────────────────────────────────────
// Button
// Reusable button with variant and size system.
// ─────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--primary)] text-white',
    'hover:bg-[var(--primary-hover)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
  ].join(' '),

  secondary: [
    'bg-transparent',
    'text-[var(--btn-secondary)] border border-[var(--btn-secondary)]',
    'hover:bg-[var(--primary-soft)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--btn-secondary)] focus-visible:ring-offset-2',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--foreground-secondary)]',
    'hover:bg-[var(--surface-secondary)] hover:text-[var(--foreground)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--border)] focus-visible:ring-offset-2',
  ].join(' '),

  outline: [
    'bg-transparent text-[var(--foreground)]',
    'border border-[var(--foreground)]',
    'hover:bg-[var(--foreground)] hover:text-[var(--background)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm tracking-wide',
  md: 'px-6 py-3 text-base tracking-wide',
  lg: 'px-8 py-4 text-base tracking-widest uppercase',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className={cn(
          // Base
          'inline-flex items-center justify-center gap-2',
          'font-sans font-medium',
          'transition-colors duration-200',
          'outline-none rounded-sm',
          'disabled:opacity-50 disabled:pointer-events-none',
          // Variant
          variantClasses[variant],
          // Size
          sizeClasses[size],
          // Width
          fullWidth && 'w-full',
          className,
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
