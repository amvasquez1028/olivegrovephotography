"use client";

import { useSiteUi } from "@/context/SiteUiContext";
import { BOOKING_URL, SITE_NAME } from "@/lib/site";

export const SiteFooter = () => {
  const { ui } = useSiteUi();
  const year = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink/15 bg-white/98 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4">
        <div className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ui.siteLogoSrc}
            alt=""
            width={40}
            height={40}
            className="h-8 w-8 rounded-none border border-ink/15 object-cover"
          />
        </div>

        <ul className="flex min-w-0 flex-1 flex-nowrap items-center justify-center gap-x-2 overflow-x-auto overscroll-x-contain py-0.5 text-xs sm:gap-x-3 sm:text-sm">
          {ui.contactSocialLinks.map((s) => (
            <li key={`${s.label}-${s.href}`} className="shrink-0">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.ariaLabel?.trim() ? s.ariaLabel : s.label}
                className="font-medium text-ink/80 underline-offset-2 transition hover:text-sage-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-none bg-sage px-3 py-1 text-xs font-semibold tracking-wide text-[color:var(--og-button-fg)] shadow-sm transition hover:bg-sage-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-dark sm:px-4 sm:text-sm"
        >
          Booking site
        </a>
      </div>
      <div className="border-t border-ink/10 px-3 py-1.5 text-center text-[10px] leading-snug text-ink/55 sm:text-xs">
        <span>
          © {year} {SITE_NAME}. All rights reserved.
        </span>
        <span className="mx-1.5 text-ink/35" aria-hidden>
          ·
        </span>
        <span>Website design by Reify Consulting</span>
      </div>
    </footer>
  );
};
