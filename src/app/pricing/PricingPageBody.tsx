"use client";

import { AppLink } from "@/components/AppLink";
import { ClientDocumentSeo } from "@/components/ClientDocumentSeo";
import { MarkdownBlock } from "@/components/MarkdownBlock";
import { PageExtentScrollButtons } from "@/components/PageExtentScrollButtons";
import { PageShell } from "@/components/PageShell";
import { useSiteUi } from "@/context/SiteUiContext";
import { formatBulletEmphasis } from "@/lib/formatBulletEmphasis";
import type { SessionTierPackage, SessionWhatToExpect } from "@/lib/site";
import { sessionUsesLogoInsteadOfPhotos } from "@/lib/site";
import {
  documentTitleForServicesIndex,
  metaDescriptionForServicesIndex,
} from "@/lib/site-seo";
import {
  getDisplaySession,
  getTierDisplayTitle,
  getVisibleSessionTypes,
} from "@/lib/site-ui-defaults";

const pricingTierGridClassName = (tierCount: number) => {
  if (tierCount >= 4) {
    return "mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4";
  }
  if (tierCount === 3) {
    return "mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3";
  }
  return "mt-6 grid grid-cols-1 gap-6 md:grid-cols-2";
};

const priceDisplayClass =
  "font-display text-2xl font-light italic tracking-tight text-ink";

const narrativeClass = "text-base leading-relaxed text-ink/85";

const expectPackageBorderClass = "border border-black bg-white";

const DashBulletList = ({ items }: { items: readonly string[] }) => (
  <ul className="mt-3 list-none space-y-2 pl-0 text-base leading-relaxed text-ink/85">
    {items.map((item) => (
      <li key={item} className="flex gap-2">
        <span className="shrink-0 text-ink/45" aria-hidden>
          —
        </span>
        <span>{formatBulletEmphasis(item)}</span>
      </li>
    ))}
  </ul>
);

const renderStructuredExpectInner = (whatToExpect: SessionWhatToExpect) => {
  const preamble = [...whatToExpect.preambleLines];
  const narrativePre = preamble.filter((l) => !l.trim().startsWith("$"));
  const pricePre = preamble.filter((l) => l.trim().startsWith("$"));
  const bullets = [...whatToExpect.bullets];
  const priceBullets = bullets.filter((b) => b.trim().startsWith("$"));
  const dashBullets = bullets.filter((b) => !b.trim().startsWith("$"));

  return (
    <>
      {narrativePre.map((line) => (
        <p key={line} className={narrativeClass}>
          {line}
        </p>
      ))}
      {pricePre.map((line) => (
        <p key={`pre-price-${line}`} className={priceDisplayClass}>
          {line.trim()}
        </p>
      ))}
      {priceBullets.map((line) => (
        <p key={`bullet-price-${line}`} className={priceDisplayClass}>
          {line.trim()}
        </p>
      ))}
      {dashBullets.length > 0 ? <DashBulletList items={dashBullets} /> : null}
    </>
  );
};

const SingleWhatToExpectSection = ({
  whatToExpect,
}: {
  whatToExpect: SessionWhatToExpect;
}) => (
  <div className={`mt-6 space-y-3 p-6 sm:p-7 ${expectPackageBorderClass}`}>
    {renderStructuredExpectInner(whatToExpect)}
    {"footnote" in whatToExpect &&
    typeof whatToExpect.footnote === "string" ? (
      <p className="text-sm italic text-ink/70">{whatToExpect.footnote}</p>
    ) : null}
  </div>
);

const TierPackageCard = ({
  tier,
  tierMarkdown,
  tierHeading,
}: {
  tier: SessionTierPackage;
  tierMarkdown: string;
  tierHeading: string;
}) => (
  <div
    className={`flex min-h-full flex-col p-6 sm:p-7 ${expectPackageBorderClass}`}
  >
    <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
      {tierHeading}
    </h3>
    <div className="mt-4 flex flex-1 flex-col gap-3 text-ink/85">
      {tierMarkdown.trim() ? (
        <MarkdownBlock content={tierMarkdown.trim()} />
      ) : (
        <>
          {renderStructuredExpectInner(tier.whatToExpect)}
          {"footnote" in tier.whatToExpect &&
          typeof tier.whatToExpect.footnote === "string" ? (
            <p className="text-sm italic text-ink/70">
              {tier.whatToExpect.footnote}
            </p>
          ) : null}
        </>
      )}
    </div>
  </div>
);

const defaultExpectFallback = (
  <ul
    className={`mt-6 list-none space-y-2 p-6 text-base text-ink/85 sm:p-7 ${expectPackageBorderClass}`}
  >
    <li className="flex gap-2">
      <span className="shrink-0 text-ink/45" aria-hidden>
        —
      </span>
      <span>Planning guides, wardrobe suggestions, and timeline support</span>
    </li>
    <li className="flex gap-2">
      <span className="shrink-0 text-ink/45" aria-hidden>
        —
      </span>
      <span>Proof galleries with an easy favorites workflow</span>
    </li>
    <li className="flex gap-2">
      <span className="shrink-0 text-ink/45" aria-hidden>
        —
      </span>
      <span>Hand-edited final images in a private online gallery</span>
    </li>
  </ul>
);

export const PricingPageBody = () => {
  const { ui } = useSiteUi();

  return (
    <PageShell>
      <ClientDocumentSeo
        title={documentTitleForServicesIndex(ui)}
        description={metaDescriptionForServicesIndex(ui)}
      />
      <h1 className="sr-only">{ui.servicesPageHeading}</h1>

      {ui.pricingEyebrow.trim() ? (
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-ink">
          {ui.pricingEyebrow}
        </p>
      ) : null}

      <div
        className={`space-y-20 sm:space-y-24${ui.pricingEyebrow.trim() ? " mt-10 sm:mt-12" : ""}`}
      >
        {getVisibleSessionTypes(ui).map((s) => {
          const d = getDisplaySession(s.slug, ui);
          const tierPackages = d.tierPackages ?? null;
          const whatToExpect = d.whatToExpect;
          const portfolioGalleryHref = `/portfolio/${s.slug}`;
          const portfolioGalleryLabel = `View ${d.title} gallery`;

          return (
            <section
              key={s.slug}
              aria-labelledby={`pricing-title-${s.slug}`}
              className="max-w-4xl"
            >
              <AppLink
                href={portfolioGalleryHref}
                aria-label={portfolioGalleryLabel}
                className="group block w-full border-0 bg-white p-3 shadow-none transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-dark sm:p-5"
              >
                <div className="flex h-[min(62vh,30rem)] min-h-[11rem] w-full min-w-0 items-center justify-center bg-white">
                  {sessionUsesLogoInsteadOfPhotos(s.slug) ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={d.serviceCardImageSrc}
                      alt=""
                      width={320}
                      height={240}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={d.serviceCardImageSrc}
                      alt=""
                      width={1200}
                      height={900}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>
              </AppLink>

              <h2
                id={`pricing-title-${s.slug}`}
                className="mt-8 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl"
              >
                {d.title}
              </h2>
              <div
                className="mt-4 h-px w-14 bg-ink/25"
                aria-hidden
              />

              {tierPackages ? (
                <div className={pricingTierGridClassName(tierPackages.length)}>
                  {tierPackages.map((tier) => {
                    const tierMd =
                      d.tierWhatToExpectMarkdownByLabel?.[tier.tierLabel]?.trim() ??
                      "";
                    return (
                      <TierPackageCard
                        key={tier.tierLabel}
                        tier={tier}
                        tierMarkdown={tierMd}
                        tierHeading={getTierDisplayTitle(
                          s.slug,
                          tier.tierLabel,
                          ui,
                        )}
                      />
                    );
                  })}
                </div>
              ) : d.whatToExpectMarkdown?.trim() ? (
                <div className={`mt-6 p-6 sm:p-8 ${expectPackageBorderClass}`}>
                  <MarkdownBlock content={d.whatToExpectMarkdown.trim()} />
                </div>
              ) : whatToExpect ? (
                <SingleWhatToExpectSection whatToExpect={whatToExpect} />
              ) : (
                defaultExpectFallback
              )}
            </section>
          );
        })}
      </div>
      <PageExtentScrollButtons />
    </PageShell>
  );
};
