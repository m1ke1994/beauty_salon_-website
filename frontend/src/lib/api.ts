const DEFAULT_API_BASE_URL = "http://localhost:8000/api/v1";

const getBaseUrl = () => {
  const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const base = envBase && envBase.trim().length > 0 ? envBase : DEFAULT_API_BASE_URL;
  return base.replace(/\/$/, "");
};

const apiBaseUrl = getBaseUrl();

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export type SectionItem = {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image_url: string;
  icon: string;
  button_text: string;
  button_url: string;
  order: number;
  meta: Record<string, unknown>;
};

export type Section = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  order: number;
  extra: Record<string, unknown>;
  items: SectionItem[];
};

export type Page = {
  id: number;
  title: string;
  slug: string;
  description: string;
  order: number;
  sections: Section[];
};

export type Review = {
  id: number;
  name: string;
  avatar_url: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  order: number;
};

export type PriceItem = {
  id: number;
  name: string;
  price: string;
  duration: string;
  is_popular: boolean;
  order: number;
};

export type PriceCategory = {
  id: number;
  title: string;
  order: number;
  items: PriceItem[];
};

export type PortfolioItem = {
  id: number;
  category: string;
  title: string;
  image_url: string;
  order: number;
};

export type SiteSettings = {
  id: number;
  site_name: string;
  phone: string;
  phone_display: string;
  address: string;
  address_note: string;
  work_hours: string;
  work_hours_note: string;
  footer_text: string;
  instagram_url: string;
  telegram_url: string;
  whatsapp_url: string;
  map_place_url: string;
  map_route_url: string;
  map_iframe_src: string;
  navigation_links: Array<{ href: string; label: string }>;
  footer_links: Array<{ href: string; label: string }>;
  social_links: Array<{ icon?: string; href: string; label: string }>;
  extra: Record<string, unknown>;
};

export type BookingRequestPayload = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  comment?: string;
};

export const api = {
  getPage: (slug: string) => fetchJson<Page>(`/pages/${slug}/`),
  getReviews: () => fetchJson<Review[]>("/reviews/"),
  getPriceCategories: () => fetchJson<PriceCategory[]>("/price-categories/"),
  getPortfolioItems: () => fetchJson<PortfolioItem[]>("/portfolio-items/"),
  getSiteSettings: () => fetchJson<SiteSettings>("/site-settings/"),
  createBookingRequest: (payload: BookingRequestPayload) =>
    fetch(`${apiBaseUrl}/booking-requests/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
};
