import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home/HomePage';
import CorporatePage from './pages/Corporate/CorporatePage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ProjectDetailPage from './pages/Projects/ProjectDetailPage';
import ServicesPage from './pages/Services/ServicesPage';
import ContactPage from './pages/Contact/ContactPage';

// ─────────────────────────────────────────────────────────────
// App — Router Configuration
//
// Routes:
//   /                    → HomePage
//   /kurumsal            → CorporatePage
//   /projeler            → ProjectsPage
//   /projeler/:slug      → ProjectDetailPage
//   /hizmetler           → ServicesPage
//   /iletisim            → ContactPage
//
// All routes share the Layout (Navbar + main + Footer).
// ─────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="kurumsal" element={<CorporatePage />} />
          <Route path="projeler" element={<ProjectsPage />} />
          <Route path="projeler/:slug" element={<ProjectDetailPage />} />
          <Route path="hizmetler" element={<ServicesPage />} />
          <Route path="iletisim" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
