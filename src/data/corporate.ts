// ─────────────────────────────────────────────────────────────
// Corporate Page Data
// ─────────────────────────────────────────────────────────────
// This file contains the data structures for the Corporate page.
// All visible text is managed via the language files (tr.ts / en.ts) 
// to support localization. This file only contains IDs, logic structures,
// and media (e.g., image URLs) that do not require translation.

export interface CorporateValue {
  id: string;
  image: string;
}

export interface CorporateProcessStep {
  id: string;
}

export interface CorporateQualityItem {
  id: string;
}

export interface CorporateInfoItem {
  id: string;
  value: string; // Not translated if it's just a number, but can be a translation key if needed.
}

// Temporary images focused on modern architecture, brutalism, light/shadow
export const corporateValues: CorporateValue[] = [
  { 
    id: 'trust', 
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    id: 'architecture', 
    image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2072&auto=format&fit=crop' 
  },
  { 
    id: 'engineering', 
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop' 
  },
  { 
    id: 'sustainability', 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' 
  },
  { 
    id: 'human', 
    image: 'https://images.unsplash.com/photo-1541888045610-18451121d5a7?q=80&w=2070&auto=format&fit=crop' 
  },
];

export const corporateProcess: CorporateProcessStep[] = [
  { id: 'analysis' },
  { id: 'design' },
  { id: 'engineering' },
  { id: 'construction' },
  { id: 'delivery' },
];

export const corporateQuality: CorporateQualityItem[] = [
  { id: 'material' },
  { id: 'application' },
  { id: 'control' }
];

export const corporateHeroImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop';
export const corporateArchitectureImage = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop';
