"use client";

import { useLayoutEffect } from "react";
import { useSiteUi } from "@/context/SiteUiContext";
import {
  applySiteThemeFromResolution,
  getResolvedSiteTheme,
} from "@/lib/site-theme";

/** Applies the site theme from the API to `document.documentElement`. */
export const SiteThemeApplier = () => {
  const { ui } = useSiteUi();

  useLayoutEffect(() => {
    applySiteThemeFromResolution(getResolvedSiteTheme(ui));
  }, [ui]);

  return null;
};
