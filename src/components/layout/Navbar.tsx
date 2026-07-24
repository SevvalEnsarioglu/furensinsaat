import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import type { Lang } from '../../context/LanguageContext';
import type { Translations } from '../../locales/tr';
import Container from '../common/Container';
import { cn } from '../../utils/cn';

// ─────────────────────────────────────────────────────────────
// Nav items definition
// ─────────────────────────────────────────────────────────────

type NavKey = keyof Translations['nav'];

const navItems: { href: string; key: NavKey }[] = [
  { href: '/', key: 'home' },
  { href: '/kurumsal', key: 'corporate' },
  { href: '/projeler', key: 'projects' },
  { href: '/hizmetler', key: 'services' },
  { href: '/iletisim', key: 'contact' },
];

// ─────────────────────────────────────────────────────────────
// Logo
// ─────────────────────────────────────────────────────────────

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('flex flex-col leading-none', compact ? 'gap-0' : 'gap-0.5')}>
      <span
        className="font-display font-semibold tracking-widest text-[var(--foreground)] uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: compact ? '0.95rem' : '1.05rem',
          letterSpacing: '0.18em',
        }}
      >
        FURENS
      </span>
      <span
        className="font-sans font-light text-[var(--muted)] uppercase"
        style={{
          fontSize: compact ? '0.55rem' : '0.6rem',
          letterSpacing: '0.32em',
        }}
      >
        İNŞAAT
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Theme Toggle Button
// ─────────────────────────────────────────────────────────────

function ThemeToggle({ label }: { label: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-sm',
        'text-[var(--foreground-secondary)] transition-colors duration-200',
        'hover:text-[var(--foreground)] hover:bg-[var(--surface-secondary)]',
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={16} strokeWidth={1.5} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={16} strokeWidth={1.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────
// Language Selector
// ─────────────────────────────────────────────────────────────

function LanguageSelector({ label }: { label: string }) {
  const { lang, setLang } = useLanguage();

  const toggle = () => {
    const next: Lang = lang === 'tr' ? 'en' : 'tr';
    setLang(next);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        'flex items-center gap-1 px-2 py-1 rounded-sm',
        'text-xs font-medium tracking-widest uppercase',
        'text-[var(--foreground-secondary)] transition-colors duration-200',
        'hover:text-[var(--foreground)] hover:bg-[var(--surface-secondary)]',
      )}
    >
      <span className={cn(lang === 'tr' ? 'text-[var(--foreground)]' : 'text-[var(--muted)]')}>
        TR
      </span>
      <span className="text-[var(--border)]">/</span>
      <span className={cn(lang === 'en' ? 'text-[var(--foreground)]' : 'text-[var(--muted)]')}>
        EN
      </span>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile Menu Overlay
// ─────────────────────────────────────────────────────────────

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();

  // Stagger animation variants for list items
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col bg-[var(--background)]"
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">
        <NavLink to="/" onClick={onClose}>
          <Logo />
        </NavLink>

        <button
          onClick={onClose}
          aria-label={t.accessibility.closeMenu}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-sm',
            'text-[var(--foreground-secondary)]',
            'hover:text-[var(--foreground)] hover:bg-[var(--surface-secondary)]',
            'transition-colors duration-200',
          )}
        >
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-[var(--divider)] sm:mx-6" />

      {/* Nav links */}
      <nav className="flex flex-1 flex-col justify-center px-6 sm:px-10" aria-label="Mobile navigation">
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-1"
          role="list"
        >
          {navItems.map((item) => (
            <motion.li key={item.href} variants={itemVariants}>
              <NavLink
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between py-4',
                    'font-display text-3xl font-light',
                    'border-b border-[var(--divider)]',
                    'transition-colors duration-200',
                    'group',
                    isActive
                      ? 'text-[var(--primary)]'
                      : 'text-[var(--foreground)] hover:text-[var(--primary)]',
                  )
                }
                style={{ fontFamily: 'var(--font-display)' }}
                end={item.href === '/'}
              >
                <span>{t.nav[item.key]}</span>
                <span
                  className="text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Bottom bar — theme + language */}
      <div className="mx-4 border-t border-[var(--divider)] sm:mx-6" />
      <div className="flex items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-2">
          <ThemeToggle label={t.accessibility.toggleTheme} />
          <LanguageSelector label={t.accessibility.selectLanguage} />
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <span style={{ letterSpacing: '0.12em' }}>FURENS İNŞAAT</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40',
          'transition-all duration-300 ease-in-out',
          scrolled
            ? 'bg-[var(--navbar-background)] backdrop-blur-md shadow-[var(--shadow-soft)]'
            : 'bg-transparent',
        )}
        role="banner"
      >
        <Container wide>
          <div className="flex h-16 items-center lg:h-18 w-full">
            {/* Left Segment: Logo */}
            <div className="flex flex-1 items-center justify-start">
              <NavLink
                to="/"
                aria-label="Furens İnşaat — Ana Sayfa"
                className="flex-shrink-0"
              >
                <Logo />
              </NavLink>
            </div>

            {/* Center Segment: Desktop Navigation */}
            <nav
              className="hidden flex-1 items-center justify-center gap-8 lg:flex"
              aria-label="Ana navigasyon"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative text-sm font-medium tracking-wide',
                      'transition-colors duration-200',
                      'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full',
                      'after:origin-left after:scale-x-0 after:transition-transform after:duration-300',
                      'after:bg-[var(--primary)] hover:after:scale-x-100',
                      isActive
                        ? 'text-[var(--primary)] after:scale-x-100'
                        : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)]',
                    )
                  }
                >
                  {t.nav[item.key]}
                </NavLink>
              ))}
            </nav>

            {/* Right Segment: Desktop Controls */}
            <div className="hidden flex-1 items-center justify-end gap-2 lg:flex">
              <ThemeToggle label={t.accessibility.toggleTheme} />
              <LanguageSelector label={t.accessibility.selectLanguage} />
            </div>

            {/* Mobile Hamburger (visible only on mobile, takes the right side) */}
            <div className="flex flex-1 items-center justify-end lg:hidden">
              <button
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-sm lg:hidden',
                'text-[var(--foreground-secondary)]',
                'hover:text-[var(--foreground)] hover:bg-[var(--surface-secondary)]',
                'transition-colors duration-200',
              )}
              onClick={() => setMenuOpen(true)}
              aria-label={t.accessibility.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
            </div>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigasyon menüsü">
            <MobileMenu onClose={() => setMenuOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

