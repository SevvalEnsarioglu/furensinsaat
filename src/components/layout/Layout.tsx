import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

// ─────────────────────────────────────────────────────────────
// Page transition variants
// ─────────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeIn' as const,
    },
  },
};

// ─────────────────────────────────────────────────────────────
// Layout
// Wraps every page: Navbar + main content + Footer.
// AnimatePresence drives smooth page transitions keyed by route.
// ─────────────────────────────────────────────────────────────

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex flex-1 flex-col"
          id="main-content"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
