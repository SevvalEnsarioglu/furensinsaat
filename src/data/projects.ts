import type { Project } from '../types/project';

// Real project data will be added here once available.
// Structure is ready for CMS / backend integration.
export const projects: Project[] = [
  {
    id: 1,
    slug: 'vadi-konaklari',
    title: 'Vadi Konakları',
    location: 'Diyarbakır, Kayapınar',
    status: 'completed',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    description: 'Modern yaşamın doğayla iç içe geçtiği, yenilikçi ve sürdürülebilir mimari yaklaşımın en güzel örneklerinden biri olan Vadi Konakları projesi.',
    year: 2024,
    area: '12.500 m²',
    category: 'Konut',
    featured: true,
  },
  {
    id: 2,
    slug: 'merkez-ofis',
    title: 'Merkez Plaza',
    location: 'Diyarbakır, Yenişehir',
    status: 'ongoing',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    description: 'İş dünyasına yeni bir soluk getiren, çevre dostu malzemeler ve akıllı bina teknolojileriyle donatılmış ticari kompleks.',
    year: 2025,
    area: '25.000 m²',
    category: 'Ticari',
    featured: true,
  },
  {
    id: 3,
    slug: 'yasam-kulesi',
    title: 'Yaşam Kulesi',
    location: 'Diyarbakır, Bağlar',
    status: 'planned',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
    description: 'Şehrin siluetine değer katan, karma kullanımlı ve yüksek mühendislik standartlarıyla tasarlanmış prestijli proje.',
    year: 2026,
    area: '45.000 m²',
    category: 'Karma Kullanım',
    featured: true,
  }
];
