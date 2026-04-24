"use client";

import dynamic from "next/dynamic";

const AboutPageBody = dynamic(
  () => import("./AboutPageBody").then((m) => ({ default: m.AboutPageBody })),
  { ssr: false, loading: () => null },
);

export const AboutPageClient = () => <AboutPageBody />;
