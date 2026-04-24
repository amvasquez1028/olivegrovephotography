"use client";

import dynamic from "next/dynamic";

const PortfolioPageBody = dynamic(
  () =>
    import("./PortfolioPageBody").then((m) => ({
      default: m.PortfolioPageBody,
    })),
  { ssr: false, loading: () => null },
);

export const PortfolioPageClient = () => <PortfolioPageBody />;
