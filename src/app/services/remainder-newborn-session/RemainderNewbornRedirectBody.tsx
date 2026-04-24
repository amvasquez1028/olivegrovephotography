"use client";

import { AppLink } from "@/components/AppLink";
import { useEffect } from "react";

/**
 * Remainder newborn sessions removed from offerings; client redirect for static export.
 */
export const RemainderNewbornRedirectBody = () => {
  useEffect(() => {
    window.location.replace("/pricing");
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-lg text-ink/85">
        This offering is no longer listed.{" "}
        <AppLink
          href="/pricing"
          className="font-semibold text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          View current pricing
        </AppLink>
        .
      </p>
    </div>
  );
};
