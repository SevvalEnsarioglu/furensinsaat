import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// ─────────────────────────────────────────────────────────────
// Entry point
// Provider order:
//   ThemeProvider (outermost — affects HTML element attribute)
//   └─ LanguageProvider (syncs document.documentElement.lang)
//      └─ App
// ─────────────────────────────────────────────────────────────

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
