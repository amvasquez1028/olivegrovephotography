"use client";

import { AppLink } from "@/components/AppLink";
import { useEffect } from "react";

type ClientReplaceRedirectProps = {
  href: string;
  message: string;
  linkLabel: string;
};

export const ClientReplaceRedirect = ({
  href,
  message,
  linkLabel,
}: ClientReplaceRedirectProps) => {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-lg text-ink/85">
        {message}{" "}
        <AppLink
          href={href}
          className="font-semibold text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          {linkLabel}
        </AppLink>
        .
      </p>
    </div>
  );
};
