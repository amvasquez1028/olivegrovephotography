"use client";

import dynamic from "next/dynamic";

const PatchworkPortfolioRedirectBody = dynamic(
  () =>
    import("./PatchworkPortfolioRedirectBody").then((m) => ({
      default: m.PatchworkPortfolioRedirectBody,
    })),
  { ssr: false, loading: () => null },
);

export const PatchworkPortfolioRedirectClient = () => (
  <PatchworkPortfolioRedirectBody />
);
