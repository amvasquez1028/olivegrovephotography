"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ClientSiteFavicon } from "@/components/ClientSiteFavicon";
import { SiteThemeApplier } from "@/components/SiteThemeApplier";
import {
  mergeSiteUi,
  type MergedSiteUi,
  type SiteUiPayload,
} from "@/lib/site-ui-defaults";
import { loadSiteUiPayload } from "@/lib/site-ui-api";

type SiteUiContextValue = {
  /** Merged view (defaults + saved payload from the site UI API). */
  ui: MergedSiteUi;
  /** Raw payload from the API. */
  payload: SiteUiPayload;
  /** First load from the site UI API has finished (success or error). */
  uiReady: boolean;
  /** True while reload is in flight. */
  refreshing: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const SiteUiContext = createContext<SiteUiContextValue | null>(null);

/** Neutral shell so code defaults (images, copy) are not shown before API merge. */
const SiteUiBootstrapShell = () => (
  <div
    className="flex min-h-screen flex-col bg-white text-ink"
    aria-busy="true"
    aria-live="polite"
  >
    <div
      className="h-[4.5rem] shrink-0 border-b border-ink/12 bg-white/95"
      aria-hidden
    />
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-16">
      <div
        className="h-10 w-10 shrink-0 animate-pulse bg-ink/[0.07]"
        aria-hidden
      />
      <p className="sr-only">Loading site content</p>
    </div>
    <div
      className="h-20 shrink-0 border-t border-ink/15 bg-white/98 sm:h-24"
      aria-hidden
    />
  </div>
);

export const SiteUiProvider = ({ children }: { children: ReactNode }) => {
  const [payload, setPayload] = useState<SiteUiPayload>({});
  const [uiReady, setUiReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPayload = useCallback(async (isManualRefresh: boolean) => {
    if (isManualRefresh) {
      setRefreshing(true);
    }
    setError(null);
    try {
      const next = await loadSiteUiPayload();
      setPayload(next);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to load site settings.",
      );
    } finally {
      if (isManualRefresh) {
        setRefreshing(false);
      }
      setUiReady(true);
    }
  }, []);

  useEffect(() => {
    void loadPayload(false);
  }, [loadPayload]);

  const refresh = useCallback(async () => {
    await loadPayload(true);
  }, [loadPayload]);

  const ui = useMemo(() => mergeSiteUi(payload), [payload]);

  const value = useMemo(
    () => ({ ui, payload, uiReady, refreshing, error, refresh }),
    [ui, payload, uiReady, refreshing, error, refresh],
  );

  return (
    <SiteUiContext.Provider value={value}>
      <SiteThemeApplier />
      {!uiReady ? (
        <SiteUiBootstrapShell />
      ) : (
        <>
          <ClientSiteFavicon />
          {children}
        </>
      )}
    </SiteUiContext.Provider>
  );
};

export const useSiteUi = (): SiteUiContextValue => {
  const ctx = useContext(SiteUiContext);
  if (!ctx) {
    throw new Error("useSiteUi must be used within SiteUiProvider");
  }
  return ctx;
};
