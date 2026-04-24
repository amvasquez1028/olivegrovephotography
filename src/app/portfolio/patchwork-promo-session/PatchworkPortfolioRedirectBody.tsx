"use client";

import { AppLink } from "@/components/AppLink";
import { useEffect } from "react";

/**
 * Gallery removed; client redirect for static export (see services/patchwork-promo-session).
 */
export const PatchworkPortfolioRedirectBody = () => {
  useEffect(() => {
    window.location.replace("/portfolio");
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-lg text-ink/85">
        This gallery is no longer available.{" "}
        <AppLink
          href="/portfolio"
          className="font-semibold text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          Browse portfolio
        </AppLink>
        .
      </p>
    </div>
  );
};
