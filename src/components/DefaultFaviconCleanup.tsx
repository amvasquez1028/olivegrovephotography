"use client";

import { useLayoutEffect } from "react";

/**
 * In dev, Next still injects `/favicon.ico` before the logo `rel="icon"` link.
 * Remove the default so the browser uses the logo (matches post-build HTML strip).
 */
export const DefaultFaviconCleanup = () => {
  useLayoutEffect(() => {
    document.querySelectorAll('link[rel="icon"]').forEach((node) => {
      const href = node.getAttribute("href") ?? "";
      if (href === "/favicon.ico" || href.endsWith("/favicon.ico")) {
        node.remove();
      }
    });
  }, []);

  return null;
};
