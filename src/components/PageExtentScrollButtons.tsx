"use client";

import { useCallback, useEffect, useState } from "react";

const SCROLLABLE_SLACK_PX = 64;

/** Symmetric stroke chevrons: ∧ points up, ∨ points down (same caps as home slideshow). */
const ChevronUpIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="text-ink"
  >
    <polyline
      points="7,17 12,8 17,17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="text-ink"
  >
    <polyline
      points="7,7 12,16 17,7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

/** Up/down controls when the document is taller than the viewport (about, portfolio, pricing). */
export const PageExtentScrollButtons = () => {
  const [scrollable, setScrollable] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  const update = useCallback(() => {
    const root = document.documentElement;
    const tall =
      root.scrollHeight > root.clientHeight + SCROLLABLE_SLACK_PX;
    setScrollable(tall);
    const y = window.scrollY;
    setAtTop(y < 32);
    setAtBottom(y + root.clientHeight >= root.scrollHeight - 32);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!scrollable) {
    return null;
  }

  const btnClass =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink bg-white text-ink transition hover:bg-ink/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage disabled:pointer-events-none disabled:opacity-35";

  return (
    <div
      className="pointer-events-auto fixed bottom-24 right-4 z-[45] flex flex-col gap-2 sm:bottom-28 sm:right-5"
      role="group"
      aria-label="Scroll to top or bottom of page"
    >
      <button
        type="button"
        className={btnClass}
        aria-label="Scroll to top of page"
        disabled={atTop}
        onClick={handleScrollTop}
      >
        <ChevronUpIcon />
      </button>
      <button
        type="button"
        className={btnClass}
        aria-label="Scroll to bottom of page"
        disabled={atBottom}
        onClick={handleScrollBottom}
      >
        <ChevronDownIcon />
      </button>
    </div>
  );
};
