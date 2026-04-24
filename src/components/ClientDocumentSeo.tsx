"use client";

import { useEffect } from "react";

type ClientDocumentSeoProps = {
  title: string;
  description: string;
};

/** Updates document title and meta description after load (static export has no SSR metadata refresh). */
export const ClientDocumentSeo = ({
  title,
  description,
}: ClientDocumentSeoProps) => {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);

  return null;
};
