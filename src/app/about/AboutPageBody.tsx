"use client";

import { AppLink } from "@/components/AppLink";
import { BookButton } from "@/components/BookButton";
import { ClientDocumentSeo } from "@/components/ClientDocumentSeo";
import { PageExtentScrollButtons } from "@/components/PageExtentScrollButtons";
import { PageShell } from "@/components/PageShell";
import { useSiteUi } from "@/context/SiteUiContext";
import {
  documentTitleForAbout,
  metaDescriptionForAbout,
} from "@/lib/site-seo";
import { BOOKING_URL, FACEBOOK_MESSENGER_URL, FACEBOOK_REVIEWS } from "@/lib/site";

const homeOutlineButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-none border-2 border-ink/35 px-5 text-sm font-semibold tracking-wide text-ink transition hover:bg-ink/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export const AboutPageBody = () => {
  const { ui } = useSiteUi();

  return (
    <PageShell>
      <ClientDocumentSeo
        title={documentTitleForAbout(ui)}
        description={metaDescriptionForAbout(ui)}
      />

      <section
        aria-label="Introduction"
        className="scroll-mt-24"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-1 flex-col">
            <h1 className="font-display text-4xl font-light leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {ui.homeHeroTitle}
            </h1>
            <div className="mt-8 flex flex-wrap gap-4">
              <BookButton />
              <AppLink href="/pricing" className={homeOutlineButtonClass}>
                View pricing
              </AppLink>
            </div>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/85">
              {ui.aboutBioParagraph1}{" "}
              {ui.aboutBioParagraph2}{" "}
              In order to book sessions, or if you have a question for me, you
              can get in touch by using{" "}
              <a
                href={FACEBOOK_MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                messenger
              </a>{" "}
              or visiting my{" "}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                booking page
              </a>
              . {ui.aboutClosingLine}
            </p>
          </div>
          <div className="flex-1 shrink-0 lg:max-w-[min(100%,28rem)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-none border border-ink/15 bg-ink/[0.04] shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ui.homeHeroImageSrc}
                alt={ui.homeHeroImageAlt}
                className="h-full w-full object-cover"
                width={960}
                height={1200}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-intro-heading"
        className="mt-20 scroll-mt-24 border-t border-ink/10 pt-16"
      >
        <h2
          id="about-intro-heading"
          className="font-display text-4xl font-light tracking-tight text-ink sm:text-5xl"
        >
          {ui.homeAboutHeading}
        </h2>
        <p className="mt-4 max-w-2xl whitespace-pre-wrap text-lg leading-relaxed text-ink/85">
          {ui.homeAboutBody}
        </p>
        <AppLink href="/portfolio" className={`mt-6 ${homeOutlineButtonClass}`}>
          View portfolio
        </AppLink>
      </section>

      <section
        aria-labelledby="reviews-heading"
        className="mt-20 scroll-mt-24 border-t border-ink/10 pt-16"
      >
        <h2
          id="reviews-heading"
          className="font-display text-4xl font-light tracking-tight text-ink sm:text-5xl"
        >
          {ui.homeReviewsHeading}
        </h2>
        <ul className="mt-10 grid gap-8 lg:grid-cols-2">
          {FACEBOOK_REVIEWS.map((r) => (
            <li
              key={r.id}
              className="rounded-none border border-ink/10 bg-white/40 p-6 shadow-sm"
            >
              {r.kind === "recommendation" ? (
                <>
                  <blockquote className="text-base leading-relaxed text-ink/85">
                    <span className="text-sage-dark" aria-hidden>
                      “
                    </span>
                    {r.quote}
                    <span className="text-sage-dark" aria-hidden>
                      ”
                    </span>
                  </blockquote>
                  <p className="mt-4 text-sm font-semibold text-ink">{r.name}</p>
                  <p className="text-xs text-ink/60">{r.dateLabel}</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-ink">{r.headline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/80">
                    {r.body}
                  </p>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-sage-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                  >
                    {r.cta}
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
      <PageExtentScrollButtons />
    </PageShell>
  );
};
