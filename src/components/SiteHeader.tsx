"use client";

import { AppLink } from "@/components/AppLink";
import { usePathname } from "next/navigation";
import type { KeyboardEvent } from "react";
import { useEffect, useState } from "react";
import { useSiteUi } from "@/context/SiteUiContext";
import { SITE_NAME } from "@/lib/site";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export const SiteHeader = () => {
  const pathname = usePathname();
  const { ui } = useSiteUi();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleToggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  /**
   * Defer menu close on the logo so a sync `setState` in the same turn as navigation
   * does not interrupt navigation (same class of issue as the mobile sheet).
   */
  const handleLogoClick = () => {
    window.setTimeout(() => setMenuOpen(false), 0);
  };

  const handleKeyDownToggle = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleMenu();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/12 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <AppLink
          href="/"
          className="flex items-center gap-3 rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          onClick={handleLogoClick}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ui.siteLogoSrc}
            alt=""
            width={52}
            height={52}
            className="h-12 w-12 shrink-0 rounded-none border border-ink/15 bg-white object-cover shadow-sm"
          />
          <span className="font-script text-2xl tracking-wide text-ink sm:text-3xl">
            {SITE_NAME}
          </span>
        </AppLink>

        <nav
          aria-label="Primary"
          className="relative z-10 hidden touch-manipulation md:block"
        >
          <ul className="flex flex-wrap items-center gap-6 text-xs font-medium uppercase tracking-[0.2em] text-ink/90">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <AppLink
                  href={link.href}
                  className="rounded-none text-ink/80 underline-offset-4 transition-colors hover:text-sage-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                >
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-none border border-sage/40 text-ink md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={handleToggleMenu}
          onKeyDown={handleKeyDownToggle}
        >
          <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`touch-manipulation border-t border-ink/10 bg-white md:hidden ${menuOpen ? "" : "hidden"}`}
        inert={!menuOpen ? true : undefined}
      >
        <nav aria-label="Mobile primary" className="mx-auto max-w-6xl px-4 py-4">
          <ul className="flex flex-col gap-3 text-base font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <AppLink
                  href={link.href}
                  className="block rounded-none px-2 py-2 text-ink/90 underline-offset-4 hover:bg-sage/10 hover:text-sage-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                  onClick={handleCloseMenu}
                >
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
