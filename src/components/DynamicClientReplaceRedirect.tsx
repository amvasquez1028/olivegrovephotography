"use client";

import dynamic from "next/dynamic";

const ClientReplaceRedirect = dynamic(
  () =>
    import("@/components/ClientReplaceRedirect").then((m) => ({
      default: m.ClientReplaceRedirect,
    })),
  { ssr: false, loading: () => null },
);

type DynamicClientReplaceRedirectProps = {
  href: string;
  message: string;
  linkLabel: string;
};

export const DynamicClientReplaceRedirect = (
  props: DynamicClientReplaceRedirectProps,
) => <ClientReplaceRedirect {...props} />;
