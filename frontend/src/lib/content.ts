import type { Page, Section, SectionItem } from "@/lib/api";

export const findSection = (page: Page | undefined, slug: string): Section | undefined =>
  page?.sections?.find((section) => section.slug === slug);

export const sortByOrder = <T extends { order: number }>(items: T[] | undefined): T[] =>
  [...(items ?? [])].sort((a, b) => a.order - b.order);

export const sortItems = (items: SectionItem[] | undefined): SectionItem[] =>
  sortByOrder(items);
