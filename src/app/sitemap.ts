import type { MetadataRoute } from "next";
import { SESSION_TYPES } from "@/lib/site";
import {
  fetchMergedSiteUiForBuild,
  getActiveSessionSlugsForSite,
} from "@/lib/site-ui-defaults";

export const dynamic = "force-static";

const BASE = "https://olivegrovephotography.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date() },
    { url: `${BASE}/about`, lastModified: new Date() },
    { url: `${BASE}/pricing`, lastModified: new Date() },
    { url: `${BASE}/portfolio`, lastModified: new Date() },
    { url: `${BASE}/contact`, lastModified: new Date() },
  ];

  const ui = await fetchMergedSiteUiForBuild();
  const slugs = ui
    ? getActiveSessionSlugsForSite(ui)
    : SESSION_TYPES.map((s) => s.slug);

  const portfolioPages = slugs.map((slug) => ({
    url: `${BASE}/portfolio/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...portfolioPages];
}
