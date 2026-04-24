"use client";

import dynamic from "next/dynamic";

const PricingPageBody = dynamic(
  () =>
    import("./PricingPageBody").then((m) => ({ default: m.PricingPageBody })),
  { ssr: false, loading: () => null },
);

export const PricingPageClient = () => <PricingPageBody />;
