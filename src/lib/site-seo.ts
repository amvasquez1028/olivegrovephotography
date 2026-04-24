import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import {
  getDisplaySession,
  type MergedSiteUi,
} from "@/lib/site-ui-defaults";

const pick = (value: string | undefined, fallback: string) =>
  value?.trim() ? value.trim() : fallback;

export const documentTitleForHome = (ui: MergedSiteUi) =>
  pick(ui.seoHomeDocumentTitle, SITE_NAME);

export const metaDescriptionForHome = (ui: MergedSiteUi) =>
  pick(ui.seoHomeMetaDescription, SITE_TAGLINE);

export const documentTitleForAbout = (ui: MergedSiteUi) =>
  pick(ui.seoAboutDocumentTitle, `About | ${SITE_NAME}`);

export const metaDescriptionForAbout = (ui: MergedSiteUi) =>
  pick(
    ui.seoAboutMetaDescription,
    `Learn more about ${SITE_NAME} — Waco-based portrait and lifestyle photography.`,
  );

export const documentTitleForContact = (ui: MergedSiteUi) =>
  pick(ui.seoContactDocumentTitle, `Contact | ${SITE_NAME}`);

export const metaDescriptionForContact = (ui: MergedSiteUi) =>
  pick(
    ui.seoContactMetaDescription,
    `Get in touch with ${SITE_NAME} for bookings and questions.`,
  );

export const documentTitleForServicesIndex = (ui: MergedSiteUi) =>
  pick(ui.seoServicesIndexDocumentTitle, `Pricing | ${SITE_NAME}`);

export const metaDescriptionForServicesIndex = (ui: MergedSiteUi) =>
  pick(
    ui.seoServicesIndexMetaDescription,
    `Session pricing and what to expect for portrait packages from ${SITE_NAME}.`,
  );

export const documentTitleForPortfolioIndex = (ui: MergedSiteUi) =>
  pick(ui.seoPortfolioIndexDocumentTitle, `Portfolio | ${SITE_NAME}`);

export const metaDescriptionForPortfolioIndex = (ui: MergedSiteUi) =>
  pick(
    ui.seoPortfolioIndexMetaDescription,
    `Portfolio galleries from ${SITE_NAME}.`,
  );

export const documentTitleForAdmin = (ui: MergedSiteUi) =>
  pick(ui.seoAdminDocumentTitle, `Site content | ${SITE_NAME}`);

export const metaDescriptionForAdmin = (ui: MergedSiteUi) =>
  pick(
    ui.seoAdminMetaDescription,
    `Edit site copy and images for ${SITE_NAME}.`,
  );

/** Default SEO title for legacy /services/[slug] when no override is saved. */
export const builtInDocumentTitleServiceDetail = (
  slug: string,
  ui: MergedSiteUi,
): string => {
  const d = getDisplaySession(slug, ui);
  return `${d.title} | ${SITE_NAME}`;
};

/** Default meta for legacy /services/[slug] when no override is saved. */
export const builtInMetaDescriptionServiceDetail = (
  slug: string,
  ui: MergedSiteUi,
): string => {
  const d = getDisplaySession(slug, ui);
  return `${d.blurb} Book ${d.title.toLowerCase()} photography with ${SITE_NAME}.`;
};

/** Default SEO title for /portfolio/[slug] when no override is saved. */
export const builtInDocumentTitlePortfolioGallery = (
  slug: string,
  ui: MergedSiteUi,
): string => {
  const d = getDisplaySession(slug, ui);
  return `${d.title} gallery | ${SITE_NAME}`;
};

/** Default meta for /portfolio/[slug] when no override is saved. */
export const builtInMetaDescriptionPortfolioGallery = (
  slug: string,
  ui: MergedSiteUi,
): string => {
  const d = getDisplaySession(slug, ui);
  return `Portfolio gallery: ${d.blurb} ${SITE_NAME}.`;
};

export const documentTitleForServiceDetail = (
  slug: string,
  ui: MergedSiteUi,
) => {
  const override = ui.sessionOverrides[slug]?.seoDocumentTitle;
  if (override?.trim()) {
    return override.trim();
  }
  return builtInDocumentTitleServiceDetail(slug, ui);
};

export const metaDescriptionForServiceDetail = (
  slug: string,
  ui: MergedSiteUi,
) => {
  const override = ui.sessionOverrides[slug]?.metaDescription;
  if (override?.trim()) {
    return override.trim();
  }
  return builtInMetaDescriptionServiceDetail(slug, ui);
};

export const documentTitleForPortfolioGallery = (
  slug: string,
  ui: MergedSiteUi,
) => {
  const override = ui.sessionOverrides[slug]?.seoPortfolioDocumentTitle;
  if (override?.trim()) {
    return override.trim();
  }
  return builtInDocumentTitlePortfolioGallery(slug, ui);
};

export const metaDescriptionForPortfolioGallery = (
  slug: string,
  ui: MergedSiteUi,
) => {
  const override = ui.sessionOverrides[slug]?.seoPortfolioMetaDescription;
  if (override?.trim()) {
    return override.trim();
  }
  return builtInMetaDescriptionPortfolioGallery(slug, ui);
};
