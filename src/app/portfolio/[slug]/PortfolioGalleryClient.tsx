"use client";

import dynamic from "next/dynamic";
const PortfolioGalleryBody = dynamic(
  () =>
    import("./PortfolioGalleryBody").then((m) => ({
      default: m.PortfolioGalleryBody,
    })),
  { ssr: false, loading: () => null },
);

type PortfolioGalleryClientProps = {
  slug: string;
};

export const PortfolioGalleryClient = ({
  slug,
}: PortfolioGalleryClientProps) => <PortfolioGalleryBody slug={slug} />;
