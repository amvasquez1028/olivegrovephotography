"use client";

import dynamic from "next/dynamic";

const ContactPageBody = dynamic(
  () =>
    import("./ContactPageBody").then((m) => ({ default: m.ContactPageBody })),
  { ssr: false, loading: () => null },
);

export const ContactPageClient = () => <ContactPageBody />;
