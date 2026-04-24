import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioGalleryClient } from "@/app/portfolio/[slug]/PortfolioGalleryClient";
import { SESSION_TYPES, SITE_NAME } from "@/lib/site";
import {
  fetchMergedSiteUiForBuild,
  getActiveSessionSlugsForSite,
  getDisplaySession,
  mergeSiteUi,
} from "@/lib/site-ui-defaults";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const ui = await fetchMergedSiteUiForBuild();
  const slugs = ui
    ? getActiveSessionSlugsForSite(ui)
    : SESSION_TYPES.map((s) => s.slug);
  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const ui = await fetchMergedSiteUiForBuild();
  const slugs = ui
    ? getActiveSessionSlugsForSite(ui)
    : SESSION_TYPES.map((s) => s.slug);
  if (!slugs.includes(slug)) {
    return { title: "Gallery" };
  }
  const merged = ui ?? mergeSiteUi({});
  const display = getDisplaySession(slug, merged);
  return {
    title: `${display.title} gallery`,
    description: `Portfolio gallery: ${display.blurb} ${SITE_NAME}.`,
  };
};

export default async function PortfolioGalleryPage({ params }: PageProps) {
  const { slug } = await params;
  const ui = await fetchMergedSiteUiForBuild();
  const slugs = ui
    ? getActiveSessionSlugsForSite(ui)
    : SESSION_TYPES.map((s) => s.slug);
  if (!slugs.includes(slug)) {
    notFound();
  }

  return <PortfolioGalleryClient slug={slug} />;
}
