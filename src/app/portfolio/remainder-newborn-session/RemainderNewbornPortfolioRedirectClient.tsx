"use client";

import dynamic from "next/dynamic";

const RemainderNewbornPortfolioRedirectBody = dynamic(
  () =>
    import("./RemainderNewbornPortfolioRedirectBody").then((m) => ({
      default: m.RemainderNewbornPortfolioRedirectBody,
    })),
  { ssr: false, loading: () => null },
);

export const RemainderNewbornPortfolioRedirectClient = () => (
  <RemainderNewbornPortfolioRedirectBody />
);
