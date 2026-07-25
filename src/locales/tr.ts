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
      hero: {
        eyebrow: string;
        titleLine1: string;
        titleLine2: string;
        description: string;
        projectsCTA: string;
        aboutCTA: string;
      };
      intro: {
        label: string;
        title: string;
        description: string;
        cta: string;
      };
      projects: {
        label: string;
        title: string;
        description: string;
        viewProject: string;
      };
      stats: {
        title: string;
      };
      services: {
        label: string;
        title: string;
      };
      philosophy: {
        title: string;
      };
      contact: {
        title: string;
        cta: string;
      };
    };
    corporate: {
      hero: {
        label: string;
        titleLine1: string;
        titleLine2: string;
        titleLine3: string;
        description: string;
        metadata: {
          headquartersLabel: string;
          headquartersValue: string;
          activityLabel: string;
          activityValue: string;
          approachLabel: string;
          approachValue: string;
        };
      };
      about: {
        label: string;
        title: string;
        paragraph1: string;
        paragraph2: string;
        info: {
          foundedLabel: string;
          foundedValue: string;
          headquartersLabel: string;
          headquartersValue: string;
          activityLabel: string;
          activityValue: string;
          expertiseLabel: string;
          expertiseValue: string;
        };
      };
      manifesto: {
        titleLine1: string;
        titleLine2: string;
        titleLine3: string;
        description: string;
      };
      values: {
        label: string;
        items: {
          trust: { title: string; description: string; };
          architecture: { title: string; description: string; };
          engineering: { title: string; description: string; };
          sustainability: { title: string; description: string; };
          human: { title: string; description: string; };
        };
      };
      process: {
        label: string;
        steps: {
          analysis: { title: string; description: string; };
          design: { title: string; description: string; };
          engineering: { title: string; description: string; };
          construction: { title: string; description: string; };
          delivery: { title: string; description: string; };
        };
      };
      statement: {
        titleLine1: string;
        titleLine2: string;
        titleLine3: string;
      };
      quality: {
        titleLine1: string;
        titleLine2: string;
        titleLine3: string;
        items: {
          material: { title: string; description: string; };
          application: { title: string; description: string; };
          control: { title: string; description: string; };
        };
      };
      visionMission: {
        visionLabel: string;
        visionText: string;
        missionLabel: string;
        missionText: string;
      };
      cta: {
        titleLine1: string;
        titleLine2: string;
        projectsCTA: string;
        contactCTA: string;
      };
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
      hero: {
        label: string;
        titleLine1: string;
        titleLine2: string;
        description: string;
      };
      details: {
        title: string;
        addressLabel: string;
        addressValue: string;
        phoneLabel: string;
        phoneValue: string;
        emailLabel: string;
        emailValue: string;
        workingHoursLabel: string;
        weekdays: string;
        saturday: string;
        sunday: string;
        mapTitle: string;
      };
      form: {
        title: string;
        description: string;
        fullNameLabel: string;
        fullNamePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        phoneLabel: string;
        phonePlaceholder: string;
        subjectLabel: string;
        subjectPlaceholder: string;
        messageLabel: string;
        messagePlaceholder: string;
        consent: string;
        submit: string;
        sending: string;
        success: string;
        alternativeContact: string;
        subjects: {
          project: string;
          sales: string;
          partnership: string;
          quote: string;
          corporate: string;
          other: string;
        };
        errors: {
          required: string;
          invalidEmail: string;
          shortName: string;
          shortMessage: string;
          consentRequired: string;
        };
      };
      closing: {
        titleLine1: string;
        titleLine2: string;
        description: string;
        cta: string;
      };
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
    phone: '+90 507 066 01 42',
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
      hero: {
        titleLine1: 'GELECEĞİ',
        titleLine2: 'İNŞA EDİYORUZ.',
        description: 'Modern mimariyi güçlü mühendislik anlayışıyla bir araya getirerek kalıcı yaşam alanları oluşturuyoruz.',
        projectsCTA: 'PROJELERİ KEŞFET',
        aboutCTA: 'BİZİ TANIYIN',
      },
      intro: {
        label: '01 / FURENS',
        title: 'YAŞAM ALANLARINDAN\nDAHA FAZLASINI\nİNŞA EDİYORUZ.',
        description: 'Furens İnşaat, modern mimari anlayışını güçlü mühendislik standartlarıyla bir araya getirerek nitelikli ve sürdürülebilir yaşam alanları geliştirir.',
        cta: "FURENS'İ KEŞFET",
      },
      projects: {
        label: '02 / PROJELER',
        title: 'SEÇİLİ PROJELER',
        description: 'Mimariyi, yaşamı ve mühendisliği bir araya getiren projelerimizden seçkiler.',
        viewProject: 'KEŞFET',
      },
      stats: {
        title: 'DENEYİMİMİZİ RAKAMLARLA ANLATIYORUZ.',
      },
      services: {
        label: '03 / UZMANLIKLARIMIZ',
        title: 'UZMANLIKLARIMIZ',
      },
      philosophy: {
        title: 'DETAYLARA VERDİĞİMİZ ÖNEM, YAPILARIMIZIN KARAKTERİNİ OLUŞTURUR.',
      },
      contact: {
        title: 'BİRLİKTE GELECEĞİ İNŞA EDELİM.',
        cta: 'BİZE ULAŞIN',
      },
    },
    corporate: {
      hero: {
        label: '01 / KURUMSAL',
        titleLine1: 'YAPILAR DEĞİL,',
        titleLine2: 'KALICI DEĞERLER',
        titleLine3: 'ÜRETİYORUZ.',
        description: 'Furens İnşaat; mimari, mühendislik ve yaşam kültürünü bir araya getirerek bulunduğu bölgeye değer katan yapılar geliştirir.',
        metadata: {
          headquartersLabel: 'MERKEZ',
          headquartersValue: 'DİYARBAKIR',
          activityLabel: 'FAALİYET',
          activityValue: 'YAPI & PROJE GELİŞTİRME',
          approachLabel: 'YAKLAŞIM',
          approachValue: 'MİMARİ & MÜHENDİSLİK',
        },
      },
      about: {
        label: '02 / BİZ KİMİZ',
        title: 'GEÇMİŞTEN ALDIĞIMIZ DENEYİMİ, BUGÜNÜN MÜHENDİSLİĞİ VE GELECEĞİN YAŞAM ANLAYIŞIYLA BİRLEŞTİRİYORUZ.',
        paragraph1: 'Furens İnşaat, estetik kaygıyı teknik güvenilirlikle bir araya getiren bütüncül bir yapı anlayışına sahiptir.',
        paragraph2: 'Her projeyi yalnızca fiziksel bir yapı olarak değil, bulunduğu çevreye ve içinde yaşayan insanlara uzun vadeli değer sağlayan bir yaşam alanı olarak ele alır.',
        info: {
          foundedLabel: 'KURULUŞ',
          foundedValue: '2016',
          headquartersLabel: 'MERKEZ',
          headquartersValue: 'DİYARBAKIR',
          activityLabel: 'FAALİYET',
          activityValue: 'YAPI & PROJE GELİŞTİRME',
          expertiseLabel: 'UZMANLIK',
          expertiseValue: 'KONUT & TİCARİ YAPILAR',
        },
      },
      manifesto: {
        titleLine1: 'İYİ BİR YAPI,',
        titleLine2: 'YALNIZCA BUGÜN İÇİN',
        titleLine3: 'TASARLANMAZ.',
        description: 'Uzun ömürlü, sürdürülebilir ve bulunduğu çevreyle ilişki kuran yaşam alanları üretmenin sorumluluğunu taşıyoruz.',
      },
      values: {
        label: 'DEĞERLERİMİZ',
        items: {
          trust: {
            title: 'GÜVEN',
            description: 'Her aşamada şeffaf, tutarlı ve sorumlu bir yaklaşım benimsiyoruz.',
          },
          architecture: {
            title: 'NİTELİKLİ MİMARİ',
            description: 'Estetik ve işlevselliği aynı yapıda buluşturan tasarım anlayışı geliştiriyoruz.',
          },
          engineering: {
            title: 'GÜÇLÜ MÜHENDİSLİK',
            description: 'Dayanıklılığı, güvenliği ve teknik kaliteyi projenin temeli olarak görüyoruz.',
          },
          sustainability: {
            title: 'SÜRDÜRÜLEBİLİRLİK',
            description: 'Kaynakları doğru kullanan, uzun ömürlü ve çevresiyle uyumlu yapılar üretiyoruz.',
          },
          human: {
            title: 'İNSAN ODAKLI YAŞAM',
            description: 'İçinde yaşayan insanların günlük ihtiyaçlarını ve yaşam kalitesini merkeze alıyoruz.',
          },
        },
      },
      process: {
        label: 'SÜRECİMİZ',
        steps: {
          analysis: {
            title: 'ANALİZ',
            description: 'Arsa, çevre, kullanıcı profili ve proje ihtiyaçlarını bütüncül olarak değerlendiririz.',
          },
          design: {
            title: 'TASARIM',
            description: 'Mimari fikir ile işlevsel ihtiyaçları dengeli bir çözümde bir araya getiririz.',
          },
          engineering: {
            title: 'MÜHENDİSLİK',
            description: 'Güvenlik, dayanıklılık, teknik doğruluk ve uygulanabilirliği detaylandırırız.',
          },
          construction: {
            title: 'UYGULAMA',
            description: 'Projeyi planlanan kalite standartları ve saha disipliniyle hayata geçiririz.',
          },
          delivery: {
            title: 'TESLİM & YAŞAM',
            description: 'Uzun ömürlü, değer üreten ve kullanıcılarıyla yaşayan mekânlar teslim ederiz.',
          },
        },
      },
      statement: {
        titleLine1: 'DETAYLARDA BAŞLAYAN',
        titleLine2: 'KALİTE, BÜTÜN YAPIYA',
        titleLine3: 'YANSIR.',
      },
      quality: {
        titleLine1: 'KALİTEYİ SONUÇTA DEĞİL,',
        titleLine2: 'SÜRECİN HER AŞAMASINDA',
        titleLine3: 'ARIYORUZ.',
        items: {
          material: {
            title: 'MALZEME',
            description: 'Projeye uygun, güvenilir ve uzun ömürlü malzeme seçimi.',
          },
          application: {
            title: 'UYGULAMA',
            description: 'Planlama, saha kontrolü ve detay çözümünde yüksek hassasiyet.',
          },
          control: {
            title: 'KONTROL',
            description: 'Projenin her aşamasında teknik denetim ve kalite standardı takibi.',
          },
        },
      },
      visionMission: {
        visionLabel: 'VİZYON',
        visionText: 'Kentlerin geleceğine değer katan, mimari ve mühendislik kalitesiyle örnek gösterilen bir yapı markası olmak.',
        missionLabel: 'MİSYON',
        missionText: 'Güvenli, nitelikli ve uzun ömürlü yaşam alanlarını sorumlu bir üretim anlayışıyla hayata geçirmek.',
      },
      cta: {
        titleLine1: 'FURENS PROJELERİNİ',
        titleLine2: 'YAKINDAN KEŞFEDİN.',
        projectsCTA: 'PROJELERİ İNCELE',
        contactCTA: 'BİZE ULAŞIN',
      },
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
      hero: {
        label: '01 / İLETİŞİM',
        titleLine1: 'BİRLİKTE',
        titleLine2: 'KONUŞALIM.',
        description: 'Yeni bir proje, iş birliği veya detaylı bilgi için bizimle iletişime geçebilirsiniz. Ekibimiz size en kısa sürede dönüş yapacaktır.',
      },
      details: {
        title: 'İLETİŞİM BİLGİLERİ',
        addressLabel: 'ADRES',
        addressValue: 'Peyas Mahallesi, Mahabad Bulvarı (75. Yol), Kutay Şato Plaza, Dış Kapı No: 73, İç Kapı No: 41, 21070 Kayapınar / Diyarbakır',
        phoneLabel: 'TELEFON',
        phoneValue: '+90 507 066 01 42',
        emailLabel: 'E-POSTA',
        emailValue: 'info@furensinsaat.com',
        workingHoursLabel: 'ÇALIŞMA SAATLERİ',
        weekdays: 'Pazartesi – Cuma: 09:00 – 18:00',
        saturday: 'Cumartesi: 10:00 – 14:00',
        sunday: 'Pazar: Kapalı',
        mapTitle: 'HARİTADA GÖRÜNTÜLE',
      },
      form: {
        title: 'MESAJ GÖNDER',
        description: 'Lütfen aşağıdaki formu doldurarak bize ulaşın.',
        fullNameLabel: 'Ad Soyad *',
        fullNamePlaceholder: 'Adınız Soyadınız',
        emailLabel: 'E-Posta *',
        emailPlaceholder: 'ornek@email.com',
        phoneLabel: 'Telefon',
        phonePlaceholder: '+90 5XX XXX XX XX',
        subjectLabel: 'Konu *',
        subjectPlaceholder: 'Konu seçiniz',
        messageLabel: 'Mesaj *',
        messagePlaceholder: 'Projeniz veya talebiniz hakkında kısa bilgi verebilir misiniz?',
        consent: 'KVKK Aydınlatma Metni’ni okudum ve kişisel verilerimin işlenmesine onay veriyorum.',
        submit: 'MESAJ GÖNDER',
        sending: 'GÖNDERİLİYOR...',
        success: 'MESAJINIZ ALINDI',
        alternativeContact: 'Dilerseniz +90 507 066 01 42 numaralı hattımızdan da bize ulaşabilirsiniz.',
        subjects: {
          project: 'Proje Bilgisi',
          sales: 'Satış ve Teslim Bilgisi',
          partnership: 'İş Birliği',
          quote: 'Teklif Talebi',
          corporate: 'Kurumsal İletişim',
          other: 'Diğer',
        },
        errors: {
          required: 'Bu alan zorunludur.',
          invalidEmail: 'Lütfen geçerli bir e-posta adresi giriniz.',
          shortName: 'Adınız en az 2 karakter olmalıdır.',
          shortMessage: 'Mesajınız en az 10 karakter olmalıdır.',
          consentRequired: 'Devam etmek için onay vermelisiniz.',
        },
      },
      closing: {
        titleLine1: 'DOĞRU PROJE,',
        titleLine2: 'DOĞRU İLETİŞİMLE BAŞLAR.',
        description: 'Furens ekibi, projenizi dinlemek ve doğru çözümü birlikte geliştirmek için hazır.',
        cta: 'KURUMSAL YAKLAŞIMIMIZ',
      },
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
