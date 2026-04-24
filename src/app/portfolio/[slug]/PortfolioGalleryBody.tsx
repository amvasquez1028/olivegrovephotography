"use client";

import { AppLink } from "@/components/AppLink";
import { BookButton } from "@/components/BookButton";
import { ClientDocumentSeo } from "@/components/ClientDocumentSeo";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageShell } from "@/components/PageShell";
import { useSiteUi } from "@/context/SiteUiContext";
import {
  documentTitleForPortfolioGallery,
  metaDescriptionForPortfolioGallery,
} from "@/lib/site-seo";
import { getDisplaySession } from "@/lib/site-ui-defaults";
type PortfolioGalleryBodyProps = {
  slug: string;
};

export const PortfolioGalleryBody = ({ slug }: PortfolioGalleryBodyProps) => {
  const { ui } = useSiteUi();
  const display = getDisplaySession(slug, ui);

  return (
    <PageShell>
      <ClientDocumentSeo
        title={documentTitleForPortfolioGallery(slug, ui)}
        description={metaDescriptionForPortfolioGallery(slug, ui)}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-ink/65">
        <ol className="flex flex-wrap gap-2">
          <li>
            <AppLink
              href="/portfolio"
              className="font-medium text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              Portfolio
            </AppLink>
          </li>
          <li aria-hidden>/</li>
          <li className="text-ink/80">{display.title}</li>
        </ol>
      </nav>

      <h1 className="mt-6 font-display text-5xl font-light tracking-tight text-ink sm:text-6xl">
        {display.title.toLowerCase()} gallery
      </h1>

      <div className="mt-8 flex flex-wrap gap-4">
        <BookButton href={display.portfolioGalleryBookingUrl} />
      </div>

      <div className="mt-12">
        <GalleryGrid slug={display.slug} title={display.title} />
      </div>
    </PageShell>
  );
};
