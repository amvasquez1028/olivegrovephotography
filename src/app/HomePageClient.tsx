"use client";

import dynamic from "next/dynamic";

const HomePageView = dynamic(
  () =>
    import("@/components/HomePageView").then((m) => ({
      default: m.HomePageView,
    })),
  { ssr: false, loading: () => null },
);

export const HomePageClient = () => <HomePageView />;
