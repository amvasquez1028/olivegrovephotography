"use client";

import { useEffect } from "react";
import { useSiteUi } from "@/context/SiteUiContext";

const toAbsoluteIconHref = (src: string) => {
  const t = src.trim();
  if (!t) {
    return "";
  }
  if (t.startsWith("http://") || t.startsWith("https://")) {
    return t;
  }
  if (typeof window === "undefined") {
    return t;
  }
  const path = t.startsWith("/") ? t : `/${t}`;
  return new URL(path, window.location.origin).href;
};

export const ClientSiteFavicon = () => {
  const { ui } = useSiteUi();

  useEffect(() => {
    const href = toAbsoluteIconHref(ui.siteLogoSrc);
    if (!href) {
      return;
    }
    document.querySelectorAll('link[rel="icon"]').forEach((node) => {
      const h = node.getAttribute("href") ?? "";
      if (h === "/favicon.ico" || h.endsWith("/favicon.ico")) {
        node.remove();
      }
    });
    const ensureLink = (rel: string) => {
      let el = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };
    ensureLink("icon");
    ensureLink("apple-touch-icon");
  }, [ui.siteLogoSrc]);

  return null;
};
