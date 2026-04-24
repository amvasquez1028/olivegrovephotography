"use client";

import { AppLink } from "@/components/AppLink";
import { ClientDocumentSeo } from "@/components/ClientDocumentSeo";
import { PageExtentScrollButtons } from "@/components/PageExtentScrollButtons";
import { PageShell } from "@/components/PageShell";
import { useSiteUi } from "@/context/SiteUiContext";
import {
  splitPortfolioTitleLines,
  titleCaseWords,
} from "@/lib/portfolio-index-eyebrows";
import {
  documentTitleForPortfolioIndex,
  metaDescriptionForPortfolioIndex,
} from "@/lib/site-seo";
import { getDisplaySession, getVisibleSessionTypes } from "@/lib/site-ui-defaults";

export const PortfolioPageBody = () => {
  const { ui } = useSiteUi();

  return (
    <PageShell>
      <ClientDocumentSeo
        title={documentTitleForPortfolioIndex(ui)}
        description={metaDescriptionForPortfolioIndex(ui)}
      />
      {ui.portfolioEyebrow.trim() ? (
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-ink">
          {ui.portfolioEyebrow}
        </p>
      ) : null}
      <h1
        className={`text-center font-display text-5xl font-light tracking-tight text-ink sm:text-6xl ${ui.portfolioEyebrow.trim() ? "mt-3" : ""}`}
      >
        {ui.portfolioHeading}
      </h1>

      <ul className="mt-16 grid gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
        {getVisibleSessionTypes(ui).map((s) => {
          const d = getDisplaySession(s.slug, ui);
          const linkedTitle = titleCaseWords(d.title);
          const { line1, line2 } = splitPortfolioTitleLines(d.title);
          return (
            <li
              key={s.slug}
              className="flex flex-col items-center text-center"
            >
              <AppLink
                href={`/portfolio/${s.slug}`}
                aria-label={`Open ${linkedTitle} gallery`}
                className="block max-w-[20ch] font-display text-3xl font-light leading-[1.2] tracking-tight text-ink/70 underline-offset-[1px] [text-decoration-thickness:1px] transition-colors hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage sm:text-4xl"
              >
                <span className="block">{line1}</span>
                {line2 ? (
                  <span className="mt-1 block">{line2}</span>
                ) : null}
              </AppLink>
            </li>
          );
        })}
      </ul>
      <PageExtentScrollButtons />
    </PageShell>
  );
};
