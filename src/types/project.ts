// ─────────────────────────────────────────────────────────────
// Project Type Definitions
// ─────────────────────────────────────────────────────────────

export type ProjectStatus = 'ongoing' | 'completed' | 'planned';

export interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  status: ProjectStatus;
  coverImage: string;
  description: string;
  year?: number;
  area?: string;       // e.g. "4.200 m²"
  category?: string;  // e.g. "Konut" | "Ticari" | "Karma Kullanım"
  client?: string;
  images?: string[];
}
