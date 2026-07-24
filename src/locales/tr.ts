// ─────────────────────────────────────────────────────────────
// Turkish Translations
// ─────────────────────────────────────────────────────────────

export interface Translations {
  nav: {
    home: string;
    corporate: string;
    projects: string;
    services: string;
    contact: string;
  };
  footer: {
    tagline: string;
    shortIntro: string;
    quickLinks: string;
    corporate: string;
    legal: string;
    contactUs: string;
    address: string;
    phone: string;
    email: string;
    copyright: string;
    kvkk: string;
    privacy: string;
    cookiePolicy: string;
    aboutUs: string;
    visionMission: string;
    hse: string;
    environment: string;
    certificates: string;
  };
  pages: {
    home: {
      title: string;
      placeholder: string;
    };
    corporate: {
      title: string;
      placeholder: string;
    };
    projects: {
      title: string;
      placeholder: string;
      noProjects: string;
    };
    projectDetail: {
      notFound: string;
      backToProjects: string;
    };
    services: {
      title: string;
      placeholder: string;
    };
    contact: {
      title: string;
      placeholder: string;
    };
  };
  common: {
    comingSoon: string;
    viewAll: string;
    learnMore: string;
    contactUs: string;
    loading: string;
    placeholder: string;
  };
  accessibility: {
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    selectLanguage: string;
    lightMode: string;
    darkMode: string;
  };
  theme: {
    light: string;
    dark: string;
  };
}

// ─────────────────────────────────────────────────────────────
// Turkish values
// ─────────────────────────────────────────────────────────────

export const tr: Translations = {
  nav: {
    home: 'Ana Sayfa',
    corporate: 'Kurumsal',
    projects: 'Projeler',
    services: 'Hizmetler',
    contact: 'İletişim',
  },

  footer: {
    tagline: '[Kurumsal slogan buraya gelecek]',
    shortIntro: 'Furens İnşaat, modern mimari anlayışı ve yüksek mühendislik standartlarıyla sektöründe güven inşa eden vizyoner bir markadır.',
    quickLinks: 'Hızlı Erişim',
    corporate: 'Kurumsal',
    legal: 'Aydınlatma Metinleri',
    contactUs: 'Bize Ulaşın',
    address: 'Peyas Mahallesi, Mahabad Bulvarı (75. Yol), Kutay Şato Plaza, Dış Kapı No: 73, İç Kapı No: 41, 21070 Kayapınar / Diyarbakır',
    phone: '+90 312 397 09 29',
    email: 'info@furensinsaat.com',
    copyright: 'Copyright © 2026 Furens İnşaat. Tüm hakları saklıdır.',
    kvkk: 'Kişisel Verilerin Korunması',
    privacy: 'Gizlilik Politikası',
    cookiePolicy: 'Çerez Politikası',
    aboutUs: 'Hakkımızda',
    visionMission: 'Vizyon & Misyon',
    hse: 'İş Güvenliği ve Sağlığı',
    environment: 'Çevre Politikamız',
    certificates: 'Sertifika ve Belgelerimiz',
  },

  pages: {
    home: {
      title: 'Ana Sayfa',
      placeholder: 'Ana sayfa içeriği yakında eklenecek.',
    },
    corporate: {
      title: 'Kurumsal',
      placeholder: 'Kurumsal sayfa içeriği yakında eklenecek.',
    },
    projects: {
      title: 'Projeler',
      placeholder: 'Proje listesi yakında eklenecek.',
      noProjects: 'Henüz proje eklenmemiş.',
    },
    projectDetail: {
      notFound: 'Proje bulunamadı.',
      backToProjects: 'Projelere Dön',
    },
    services: {
      title: 'Hizmetler',
      placeholder: 'Hizmetler sayfası içeriği yakında eklenecek.',
    },
    contact: {
      title: 'İletişim',
      placeholder: 'İletişim formu yakında eklenecek.',
    },
  },

  common: {
    comingSoon: 'Bu bölüm yakında hazır olacak.',
    viewAll: 'Tümünü Gör',
    learnMore: 'Daha Fazla',
    contactUs: 'Bize Ulaşın',
    loading: 'Yükleniyor…',
    placeholder: '[Yer tutucu]',
  },

  accessibility: {
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    toggleTheme: 'Temayı değiştir',
    selectLanguage: 'Dil seç',
    lightMode: 'Açık mod',
    darkMode: 'Koyu mod',
  },

  theme: {
    light: 'Açık',
    dark: 'Koyu',
  },
};
