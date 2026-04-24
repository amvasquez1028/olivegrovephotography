"use client";

import dynamic from "next/dynamic";

const RemainderNewbornRedirectBody = dynamic(
  () =>
    import("./RemainderNewbornRedirectBody").then((m) => ({
      default: m.RemainderNewbornRedirectBody,
    })),
  { ssr: false, loading: () => null },
);

export const RemainderNewbornRedirectClient = () => (
  <RemainderNewbornRedirectBody />
);
