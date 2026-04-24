"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteUiProvider } from "@/context/SiteUiContext";

type PublicSiteRootProps = {
  children: ReactNode;
};

/**
 * Public snapshot shell: no Cognito, no `/login` or `/admin`.
 * The private repo uses `AuthRoot` instead.
 */
export const PublicSiteRoot = ({ children }: PublicSiteRootProps) => (
  <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-none focus:bg-sage focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to main content
    </a>
    <SiteUiProvider>
      <SiteHeader />
      <main id="main-content" className="pb-32 sm:pb-28">
        {children}
      </main>
      <SiteFooter />
    </SiteUiProvider>
  </>
);
