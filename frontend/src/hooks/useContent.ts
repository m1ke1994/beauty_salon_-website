import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const usePage = (slug: string) =>
  useQuery({
    queryKey: ["page", slug],
    queryFn: () => api.getPage(slug),
  });

export const useReviews = () =>
  useQuery({
    queryKey: ["reviews"],
    queryFn: () => api.getReviews(),
  });

export const usePriceCategories = () =>
  useQuery({
    queryKey: ["price-categories"],
    queryFn: () => api.getPriceCategories(),
  });

export const usePortfolioItems = () =>
  useQuery({
    queryKey: ["portfolio-items"],
    queryFn: () => api.getPortfolioItems(),
  });

export const useSiteSettings = () =>
  useQuery({
    queryKey: ["site-settings"],
    queryFn: () => api.getSiteSettings(),
  });
