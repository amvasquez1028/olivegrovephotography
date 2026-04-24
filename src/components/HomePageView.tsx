"use client";

import { ClientDocumentSeo } from "@/components/ClientDocumentSeo";
import { HomeGallerySlideshow } from "@/components/HomeGallerySlideshow";
import { useSiteUi } from "@/context/SiteUiContext";
import {
  documentTitleForHome,
  metaDescriptionForHome,
} from "@/lib/site-seo";

export const HomePageView = () => {
  const { ui } = useSiteUi();

  return (
    <>
      <ClientDocumentSeo
        title={documentTitleForHome(ui)}
        description={metaDescriptionForHome(ui)}
      />
      <section
        aria-label="Home"
        className="border-b border-ink/10 bg-white sm:min-h-0"
      >
        <HomeGallerySlideshow />
      </section>
    </>
  );
};
