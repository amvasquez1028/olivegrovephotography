"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

type PortfolioGalleryLightboxProps = {
  images: readonly string[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  /** Session title for accessible labels */
  galleryTitle: string;
};

const CloseIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="text-white"
  >
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>
);

/** Match home slideshow chevrons (stroke polylines). */
const ChevronLeftIcon = () => (
  <svg
    width="26"
    height="44"
    viewBox="0 0 24 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
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
    className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
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

const lightboxChevronButtonClass =
  "pointer-events-auto absolute top-1/2 z-[3] flex min-h-[3.25rem] min-w-[3.25rem] -translate-y-1/2 touch-manipulation items-center justify-center rounded-none border-0 bg-transparent p-2 text-white/95 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export const PortfolioGalleryLightbox = ({
  images,
  openIndex,
  onClose,
  onNavigate,
  galleryTitle,
}: PortfolioGalleryLightboxProps) => {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const active =
    openIndex !== null && count > 0 && openIndex >= 0 && openIndex < count;

  useEffect(() => {
    if (!active || openIndex === null) {
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (count <= 1) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((openIndex - 1 + count) % count);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((openIndex + 1) % count);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, count, onClose, onNavigate, openIndex]);

  if (!active || typeof document === "undefined") {
    return null;
  }

  const src = images[openIndex]!;
  const label = `${galleryTitle} — image ${openIndex + 1} of ${count}, full screen`;
  const showNav = count > 1;

  const handlePrev = () => {
    onNavigate((openIndex - 1 + count) % count);
  };

  const handleNext = () => {
    onNavigate((openIndex + 1) % count);
  };

  const overlay = (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black outline-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-label={label}
    >
      <div className="flex shrink-0 items-start justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-5">
        <p
          id={titleId}
          className="font-sans text-sm font-normal tracking-wide text-white sm:text-base"
        >
          {openIndex + 1} / {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border-0 bg-transparent text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Close full screen image"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 pt-2 sm:px-4 sm:pb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="relative z-[1] max-h-full max-w-full object-contain"
          width={1600}
          height={1200}
        />
        {showNav ? (
          <>
            <button
              type="button"
              className={`${lightboxChevronButtonClass} left-1 sm:left-3`}
              aria-label="Previous gallery image"
              onClick={handlePrev}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className={`${lightboxChevronButtonClass} right-1 sm:right-3`}
              aria-label="Next gallery image"
              onClick={handleNext}
            >
              <ChevronRightIcon />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};
