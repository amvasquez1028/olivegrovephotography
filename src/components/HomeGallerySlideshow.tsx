"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent } from "react";
import { AppLink } from "@/components/AppLink";
import { useSiteUi } from "@/context/SiteUiContext";
import { getResolvedHomeSlideshowImageSrcs } from "@/lib/site-ui-defaults";

const SLIDE_INTERVAL_MS = 5500;

const ChevronLeftIcon = () => (
  <svg
    width="26"
    height="44"
    viewBox="0 0 24 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
  >
    <polyline
      points="18,8 9,24 18,40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="26"
    height="44"
    viewBox="0 0 24 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
  >
    <polyline
      points="6,8 15,24 6,40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

const chevronButtonClass =
  "pointer-events-auto absolute top-1/2 z-[3] flex min-h-[3.25rem] min-w-[3.25rem] -translate-y-1/2 touch-manipulation items-center justify-center rounded-none border-0 bg-transparent p-2 text-white/95 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const thumbStripScrollClass =
  "mt-0 flex w-full shrink-0 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth border-t border-ink/10 bg-ink text-left [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

export const HomeGallerySlideshow = () => {
  const { ui } = useSiteUi();
  const slides = getResolvedHomeSlideshowImageSrcs(ui);
  const liveId = useId();
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollSlot, setScrollSlot] = useState<number | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const suppressIndexScrollRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (slides.length <= 1 || reducedMotion) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [slides.length, reducedMotion]);

  useLayoutEffect(() => {
    const behavior = reducedMotion ? ("auto" as const) : ("smooth" as const);
    if (scrollSlot !== null) {
      thumbRefs.current[scrollSlot]?.scrollIntoView({
        behavior,
        inline: "center",
        block: "nearest",
      });
      suppressIndexScrollRef.current = true;
      queueMicrotask(() => {
        setScrollSlot(null);
      });
      return;
    }
    if (suppressIndexScrollRef.current) {
      suppressIndexScrollRef.current = false;
      return;
    }
    const slot = Math.min(index, slides.length - 1);
    thumbRefs.current[slot]?.scrollIntoView({
      behavior,
      inline: "center",
      block: "nearest",
    });
  }, [index, scrollSlot, reducedMotion, slides.length]);

  const handlePrev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const handleThumbClick = useCallback((slot: number) => {
    setIndex(slot);
    setScrollSlot(slot);
  }, []);

  const handleKeyDownRegion = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const setThumbRef = useCallback(
    (slot: number) => (el: HTMLButtonElement | null) => {
      thumbRefs.current[slot] = el;
    },
    [],
  );

  if (slides.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="sr-only">Home</h1>
        <p className="text-lg text-ink/80">
          Gallery photos will appear here once they are available.
        </p>
        <AppLink
          href="/portfolio"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-none border-2 border-sage-dark px-5 text-sm font-semibold tracking-wide text-ink transition hover:bg-sage/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          View portfolio
        </AppLink>
      </div>
    );
  }

  return (
    <div
      className="mx-auto flex max-w-6xl flex-col px-4 pb-12 pt-8 sm:h-[calc(100dvh-11rem)] sm:max-h-[calc(100dvh-11rem)] sm:min-h-0 sm:px-6 sm:pb-3 sm:pt-3"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos from portrait and family galleries"
      onKeyDown={handleKeyDownRegion}
      tabIndex={0}
    >
      <h1 className="sr-only">Home</h1>
      <p id={liveId} className="sr-only" aria-live="polite">
        Slide {index + 1} of {slides.length}
      </p>

      <div className="relative aspect-[4/5] w-full min-h-0 shrink-0 bg-cream-dark sm:aspect-auto sm:flex-1 sm:shrink">
        {slides.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            width={1600}
            height={1000}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : undefined}
            className={`absolute inset-0 z-[1] h-full w-full object-contain object-center transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink/20 to-transparent" />
        <button
          type="button"
          className={`${chevronButtonClass} left-1 sm:left-2`}
          aria-label="Previous slide"
          onClick={handlePrev}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          className={`${chevronButtonClass} right-1 sm:right-2`}
          aria-label="Next slide"
          onClick={handleNext}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div
        className={thumbStripScrollClass}
        role="tablist"
        aria-label="Slide thumbnails — tap an image to select; strip scrolls to center the selection"
      >
        {slides.map((src, i) => (
          <button
            key={`thumb-${src}`}
            ref={setThumbRef(i)}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show slide ${i + 1}`}
            tabIndex={0}
            onClick={() => handleThumbClick(i)}
            className="relative h-16 w-[5.5rem] shrink-0 overflow-hidden border-0 p-0 outline-none ring-0 transition focus-visible:z-[1] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0 sm:h-[4.5rem] sm:w-28"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              width={224}
              height={144}
              loading="lazy"
              className="h-full w-full object-cover"
              draggable={false}
            />
            {i !== index ? (
              <span
                className="pointer-events-none absolute inset-0 bg-white/55"
                aria-hidden
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
};
