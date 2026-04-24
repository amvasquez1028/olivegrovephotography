"use client";

import { useMemo, useState } from "react";
import { PortfolioGalleryLightbox } from "@/components/PortfolioGalleryLightbox";
import { useSiteUi } from "@/context/SiteUiContext";
import { getGalleryImageSrcs } from "@/lib/site-ui-defaults";
import { sessionUsesLogoInsteadOfPhotos } from "@/lib/site";

type GalleryGridProps = {
  slug: string;
  title: string;
};

const cellClass =
  "flex min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-none border-0 bg-white p-4 sm:p-5";

export const GalleryGrid = ({ slug, title }: GalleryGridProps) => {
  const { ui } = useSiteUi();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const custom = ui.sessionOverrides[slug]?.portfolioGalleryImageSrcs?.filter(
    (s) => s.trim().length > 0,
  );
  const resolved = getGalleryImageSrcs(slug, ui);

  const images = useMemo(
    () => (custom && custom.length > 0 ? custom : resolved),
    [custom, resolved],
  );

  if (custom && custom.length > 0) {
    return (
      <>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {custom.map((src, index) => (
            <li key={`${src}-${index}`} className={cellClass}>
              <button
                type="button"
                className="block max-h-[min(75vh,36rem)] max-w-full cursor-pointer border-0 bg-transparent p-0 text-left transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                aria-label={`Open ${title} gallery image ${index + 1} full screen`}
                onClick={() => setLightboxIndex(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="max-h-[min(75vh,36rem)] max-w-full object-contain transition duration-500 hover:scale-[1.02]"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
              </button>
            </li>
          ))}
        </ul>
        <PortfolioGalleryLightbox
          images={images}
          openIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          galleryTitle={title}
        />
      </>
    );
  }

  if (sessionUsesLogoInsteadOfPhotos(slug)) {
    return (
      <div
        className="flex min-h-0 items-center justify-center rounded-none border-0 bg-white px-8 py-16"
        role="img"
        aria-label={`${title} — studio logo`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ui.siteLogoSrc}
          alt=""
          width={280}
          height={280}
          className="h-auto max-h-64 w-auto max-w-[min(100%,18rem)] object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resolved.map((src, index) => (
          <li key={src} className={cellClass}>
            <button
              type="button"
              className="block max-h-[min(75vh,36rem)] max-w-full cursor-pointer border-0 bg-transparent p-0 text-left transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              aria-label={`Open ${title} gallery image ${index + 1} full screen`}
              onClick={() => setLightboxIndex(index)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="max-h-[min(75vh,36rem)] max-w-full object-contain transition duration-500 hover:scale-[1.02]"
                loading="lazy"
                width={800}
                height={1000}
              />
            </button>
          </li>
        ))}
      </ul>
      <PortfolioGalleryLightbox
        images={images}
        openIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        galleryTitle={title}
      />
    </>
  );
};
