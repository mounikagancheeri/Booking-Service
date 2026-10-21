export interface Category {
  id: string;
  label: string;
  /** Material Symbols icon name. */
  icon: string;
  caption: string;
  disabled?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  /** Starting price in INR. */
  startingPrice: number;
  verified: boolean;
  avatarUrl?: string;
  area?: string;
  distanceKm?: number;
  /** Human-readable next available slot, e.g. "Today, 04:00 PM". */
  nextSlot?: string;
  /** Categories this provider is listed under, e.g. `['ac-repair']`. */
  categoryIds?: string[];
  /** Longer job title for profile and results, e.g. "Senior AC Technician". */
  role?: string;
  bio?: string;
  skills?: string[];
  serviceAreas?: string;
  trustBadges?: TrustBadge[];
  /** Short pre-priced packages shown on the results card. */
  highlights?: ProviderHighlight[];
  reviews?: Review[];
}

export interface TrustBadge {
  icon: string;
  label: string;
}

export interface ProviderHighlight {
  icon: string;
  label: string;
  price: number;
}

export interface Review {
  id: string;
  author: string;
  area: string;
  when: string;
  rating: number;
  text: string;
  service: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

/** A service a provider offers, as listed by `GET /api/providers/:id/services`. */
export interface ProviderOffering {
  id: string;
  name: string;
  /** Price in INR. */
  price: number;
  durationMinutes: number;
  description?: string;
}

/** An arrival slot, as listed by `GET /api/providers/:id/slots?date=YYYY-MM-DD`. */
export interface ProviderSlot {
  id: string;
  /** `YYYY-MM-DD`. */
  date: string;
  /** 24h `HH:mm`, e.g. "14:30". */
  time: string;
  available: boolean;
}
