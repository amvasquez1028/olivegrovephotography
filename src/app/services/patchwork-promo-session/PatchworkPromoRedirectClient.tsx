"use client";

import dynamic from "next/dynamic";

const PatchworkPromoRedirectBody = dynamic(
  () =>
    import("./PatchworkPromoRedirectBody").then((m) => ({
      default: m.PatchworkPromoRedirectBody,
    })),
  { ssr: false, loading: () => null },
);

export const PatchworkPromoRedirectClient = () => (
  <PatchworkPromoRedirectBody />
);
