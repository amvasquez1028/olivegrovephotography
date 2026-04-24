import {
  DEFAULT_SITE_THEME_COLOR_ID,
  DEFAULT_SITE_THEME_FONT_ID,
  normalizeSiteThemeColorPreset,
  normalizeSiteThemeFontPreset,
  type SiteThemeCustomColorEntry,
  type SiteThemeCustomFontEntry,
} from "@/lib/site-theme";
import {
  ABOUT_BIO_PARAGRAPHS,
  BLUEBONNET_CARD_IMAGE_SRC,
  BLUEBONNET_GALLERY_IMAGE_SRCS,
  CONTACT_EMAIL,
  GALLERY_PLACEHOLDER_IMAGES,
  HERO_IMAGE_SRC,
  HOME_SLIDESHOW_GALLERY_ORDER,
  SITE_LOGO_SRC,
  SOCIAL_LINKS,
  STUDIO_PHONE_DISPLAY,
  STUDIO_PHONE_TEL,
  SESSION_TYPES,
  createSyntheticSessionType,
  portfolioPreviewUrl,
  sessionCardImage,
  sessionUsesLogoInsteadOfPhotos,
  type SessionType,
} from "@/lib/site";

/** Single DynamoDB item partition key — must match IAM / admin saves. */
export const SITE_CONFIG_ID = "SITE" as const;

/** Optional overrides per service/portfolio slug (Dynamo-friendly string keys). */
export type SessionUiOverride = {
  title?: string;
  blurb?: string;
  longDescription?: string;
  /** Home + services index card image */
  serviceCardImageSrc?: string;
  /** Portfolio index card image */
  portfolioCardImageSrc?: string;
  /** Portfolio gallery — non-empty list replaces built-in placeholders */
  portfolioGalleryImageSrcs?: string[];
  /** Overrides default booking link for the “Booking site” button on /portfolio/[slug] only. */
  portfolioGalleryBookingUrl?: string;
  /** e.g. bluebonnet “what to expect” feature image */
  serviceDetailFeatureImageSrc?: string;
  /** Replaces structured “what to expect” when session has no tierPackages */
  whatToExpectMarkdown?: string;
  /** Markdown per tier label when tierPackages exist */
  tierWhatToExpectMarkdownByLabel?: Record<string, string>;
  /** Public tier titles on the pricing page; keys are canonical tier labels from code (e.g. "Mini"). */
  tierDisplayTitles?: Record<string, string>;
  /** Full browser tab title for /services/[slug] */
  seoDocumentTitle?: string;
  metaDescription?: string;
  /** Full browser tab title for /portfolio/[slug] */
  seoPortfolioDocumentTitle?: string;
  seoPortfolioMetaDescription?: string;
};

export type ContactSocialLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type SiteUiPayload = {
  siteLogoSrc?: string;
  homeHeroImageSrc?: string;
  homeHeroImageAlt?: string;
  homeHeroTitle?: string;
  homeHeroBody?: string;
  homeAboutHeading?: string;
  homeAboutBody?: string;
  homeAboutLinkLabel?: string;
  /** When set, home slideshow uses this ordered list only; omit for automatic merge from visible galleries. */
  homeSlideshowImageSrcs?: string[];
  homeServicesHeading?: string;
  homeServicesIntro?: string;
  homeReviewsHeading?: string;
  aboutHeading?: string;
  aboutBioParagraph1?: string;
  aboutBioParagraph2?: string;
  aboutClosingLine?: string;
  contactEyebrow?: string;
  contactHeading?: string;
  contactIntro?: string;
  contactReachHeading?: string;
  contactSocialHeading?: string;
  contactSocialBlurb?: string;
  contactPhoneDisplay?: string;
  contactPhoneTel?: string;
  contactEmail?: string;
  contactSocialLinks?: ContactSocialLink[];
  servicesPageHeading?: string;
  /** Optional label above pricing index sections (visible on /pricing). */
  pricingEyebrow?: string;
  portfolioEyebrow?: string;
  portfolioHeading?: string;
  serviceDetailWhatToExpectHeading?: string;
  /** Slugs hidden from services + portfolio index lists (detail URLs still exist). */
  hiddenSessionSlugs?: string[];
  /** Admin-added portfolio/pricing sessions (not in code `SESSION_TYPES`). */
  additionalSessionSlugs?: string[];
  /** Built-in `SESSION_TYPES` slugs removed from the site until restored in admin. */
  removedBuiltInSessionSlugs?: string[];
  sessionOverrides?: Record<string, SessionUiOverride>;
  /** Live tab title + meta (client-side); empty uses code fallbacks in `site-seo`. */
  seoHomeDocumentTitle?: string;
  seoHomeMetaDescription?: string;
  seoAboutDocumentTitle?: string;
  seoAboutMetaDescription?: string;
  seoContactDocumentTitle?: string;
  seoContactMetaDescription?: string;
  seoServicesIndexDocumentTitle?: string;
  seoServicesIndexMetaDescription?: string;
  seoPortfolioIndexDocumentTitle?: string;
  seoPortfolioIndexMetaDescription?: string;
  seoAdminDocumentTitle?: string;
  seoAdminMetaDescription?: string;
  /** Body + heading font stacks; see `SITE_THEME_FONT_OPTIONS` in `site-theme.ts`. */
  siteThemeFontPreset?: string;
  /** Brand palette as CSS variables; see `SITE_THEME_COLOR_OPTIONS` in `site-theme.ts`. */
  siteThemeColorPreset?: string;
  /** Saved custom font styles (appear in font dropdown). */
  siteThemeCustomFonts?: SiteThemeCustomFontEntry[];
  /** Saved custom color styles (appear in color dropdown). */
  siteThemeCustomColors?: SiteThemeCustomColorEntry[];
};

export type MergedSiteUi = {
  siteLogoSrc: string;
  homeHeroImageSrc: string;
  homeHeroImageAlt: string;
  homeHeroTitle: string;
  homeHeroBody: string;
  homeAboutHeading: string;
  homeAboutBody: string;
  homeAboutLinkLabel: string;
  /** Explicit home slideshow URLs; undefined = build from all visible portfolio galleries. */
  homeSlideshowImageSrcs?: string[];
  homeServicesHeading: string;
  homeServicesIntro: string;
  homeReviewsHeading: string;
  aboutHeading: string;
  aboutBioParagraph1: string;
  aboutBioParagraph2: string;
  aboutClosingLine: string;
  contactEyebrow: string;
  contactHeading: string;
  contactIntro: string;
  contactReachHeading: string;
  contactSocialHeading: string;
  contactSocialBlurb: string;
  contactPhoneDisplay: string;
  contactPhoneTel: string;
  contactEmail: string;
  contactSocialLinks: ContactSocialLink[];
  servicesPageHeading: string;
  pricingEyebrow: string;
  portfolioEyebrow: string;
  portfolioHeading: string;
  serviceDetailWhatToExpectHeading: string;
  hiddenSessionSlugs: string[];
  additionalSessionSlugs: string[];
  removedBuiltInSessionSlugs: string[];
  sessionOverrides: Record<string, SessionUiOverride>;
  seoHomeDocumentTitle: string;
  seoHomeMetaDescription: string;
  seoAboutDocumentTitle: string;
  seoAboutMetaDescription: string;
  seoContactDocumentTitle: string;
  seoContactMetaDescription: string;
  seoServicesIndexDocumentTitle: string;
  seoServicesIndexMetaDescription: string;
  seoPortfolioIndexDocumentTitle: string;
  seoPortfolioIndexMetaDescription: string;
  seoAdminDocumentTitle: string;
  seoAdminMetaDescription: string;
  siteThemeFontPreset: string;
  siteThemeColorPreset: string;
  siteThemeCustomFonts: SiteThemeCustomFontEntry[];
  siteThemeCustomColors: SiteThemeCustomColorEntry[];
};

const mergeSessionOverrides = (
  base: Record<string, SessionUiOverride>,
  patch?: Record<string, SessionUiOverride>,
): Record<string, SessionUiOverride> => {
  if (!patch) {
    return { ...base };
  }
  const out: Record<string, SessionUiOverride> = { ...base };
  for (const key of Object.keys(patch)) {
    out[key] = { ...(base[key] ?? {}), ...patch[key] };
  }
  return out;
};

const DEFAULT_HOME_ABOUT_BODY =
  "My process is organized and efficient while maintaining consideration for all family members, both big and small, so you can stay present and relaxed while I preserve precious milestones.";

const DEFAULT_CONTACT_INTRO =
  "Share your schedule, location, and the sessions you have in mind. I usually respond within 24 hours.";

const DEFAULT_SOCIAL_BLURB =
  "Follow along for recent work, behind-the-scenes, and seasonal booking updates.";

/** Code defaults for session-specific images (merged with saved admin payload). */
const DEFAULT_CODE_SESSION_OVERRIDES: Record<string, SessionUiOverride> = {
  "seasonal-sessions": {
    serviceCardImageSrc: BLUEBONNET_CARD_IMAGE_SRC,
    portfolioCardImageSrc: BLUEBONNET_CARD_IMAGE_SRC,
    serviceDetailFeatureImageSrc: BLUEBONNET_CARD_IMAGE_SRC,
    portfolioGalleryImageSrcs: [
      BLUEBONNET_CARD_IMAGE_SRC,
      ...BLUEBONNET_GALLERY_IMAGE_SRCS,
    ],
  },
  "holiday-sessions": {
    serviceCardImageSrc: "/gallery/fb-08.jpg",
    portfolioCardImageSrc: "/gallery/fb-08.jpg",
    portfolioGalleryImageSrcs: ["/gallery/fb-08.jpg"],
  },
  "milestone-sessions": {
    serviceCardImageSrc: "/gallery/fb-03.jpg",
    portfolioCardImageSrc: "/gallery/fb-03.jpg",
    portfolioGalleryImageSrcs: ["/gallery/fb-03.jpg"],
  },
  "special-sessions": {
    serviceCardImageSrc: "/gallery/fb-09.jpg",
    portfolioCardImageSrc: "/gallery/fb-09.jpg",
    portfolioGalleryImageSrcs: ["/gallery/fb-09.jpg"],
  },
  "sports-portraits": {
    serviceCardImageSrc: "/gallery/sports-portrait-putting.png",
    portfolioCardImageSrc: "/gallery/sports-portrait-putting.png",
    portfolioGalleryImageSrcs: [
      "/gallery/sports-portrait-putting.png",
      "/gallery/sports-portrait-swing.png",
    ],
  },
  "headshot-session": {
    serviceCardImageSrc: "/gallery/fb-04.jpg",
    portfolioCardImageSrc: "/gallery/fb-04.jpg",
    portfolioGalleryImageSrcs: ["/gallery/fb-04.jpg"],
  },
  "graduation-sessions": {
    serviceCardImageSrc: "/gallery/fb-02.jpg",
    portfolioCardImageSrc: "/gallery/fb-02.jpg",
    portfolioGalleryImageSrcs: ["/gallery/fb-02.jpg"],
  },
  "newborn-session": {
    serviceCardImageSrc: "/gallery/fb-04.jpg",
    portfolioCardImageSrc: "/gallery/fb-04.jpg",
    portfolioGalleryImageSrcs: ["/gallery/fb-04.jpg"],
  },
  "maternity-session": {
    serviceCardImageSrc: "/gallery/fb-06.jpg",
    portfolioCardImageSrc: "/gallery/fb-06.jpg",
    portfolioGalleryImageSrcs: ["/gallery/fb-06.jpg"],
  },
  "family-session": {
    serviceCardImageSrc: "/gallery/fb-07.jpg",
    portfolioCardImageSrc: "/gallery/fb-07.jpg",
    portfolioGalleryImageSrcs: ["/gallery/fb-07.jpg"],
  },
};

export const SITE_UI_DEFAULTS: MergedSiteUi = {
  siteLogoSrc: SITE_LOGO_SRC,
  homeHeroImageSrc: HERO_IMAGE_SRC,
  homeHeroImageAlt:
    "Portrait from bluebonnet sessions by Olive Grove Photography",
  homeHeroTitle: "let's get to know each other",
  homeHeroBody:
    "Hello and welcome! I'm Chelsea, a lifestyle and family portrait photographer based in Waco, TX, excited to capture your special moments.",
  homeAboutHeading: "a little about me",
  homeAboutBody: DEFAULT_HOME_ABOUT_BODY,
  homeAboutLinkLabel: "My story",
  homeServicesHeading: "my services",
  homeServicesIntro:
    "Explore sessions from newborn minis to specialty celebrations.",
  homeReviewsHeading: "testimonials",
  aboutHeading: "Howdy!",
  aboutBioParagraph1: ABOUT_BIO_PARAGRAPHS[0] ?? "",
  aboutBioParagraph2: ABOUT_BIO_PARAGRAPHS[1] ?? "",
  aboutClosingLine: "I can't wait to meet you!",
  contactEyebrow: "",
  contactHeading: "say hello",
  contactIntro: DEFAULT_CONTACT_INTRO,
  contactReachHeading: "How to reach me",
  contactSocialHeading: "Social",
  contactSocialBlurb: DEFAULT_SOCIAL_BLURB,
  contactPhoneDisplay: STUDIO_PHONE_DISPLAY,
  contactPhoneTel: STUDIO_PHONE_TEL,
  contactEmail: CONTACT_EMAIL,
  contactSocialLinks: SOCIAL_LINKS.map((l) => ({
    label: l.label,
    href: l.href,
    ariaLabel: l.ariaLabel,
  })),
  servicesPageHeading: "pricing",
  pricingEyebrow: "",
  portfolioEyebrow: "",
  portfolioHeading: "stories told in still frames",
  serviceDetailWhatToExpectHeading: "What to expect",
  hiddenSessionSlugs: [],
  additionalSessionSlugs: [],
  removedBuiltInSessionSlugs: [],
  sessionOverrides: DEFAULT_CODE_SESSION_OVERRIDES,
  seoHomeDocumentTitle: "",
  seoHomeMetaDescription: "",
  seoAboutDocumentTitle: "",
  seoAboutMetaDescription: "",
  seoContactDocumentTitle: "",
  seoContactMetaDescription: "",
  seoServicesIndexDocumentTitle: "",
  seoServicesIndexMetaDescription: "",
  seoPortfolioIndexDocumentTitle: "",
  seoPortfolioIndexMetaDescription: "",
  seoAdminDocumentTitle: "",
  seoAdminMetaDescription: "",
  siteThemeFontPreset: DEFAULT_SITE_THEME_FONT_ID,
  siteThemeColorPreset: DEFAULT_SITE_THEME_COLOR_ID,
  siteThemeCustomFonts: [],
  siteThemeCustomColors: [],
};

export const mergeSiteUi = (payload: SiteUiPayload): MergedSiteUi => {
  const siteThemeCustomFonts =
    payload.siteThemeCustomFonts !== undefined
      ? [...payload.siteThemeCustomFonts]
      : [...SITE_UI_DEFAULTS.siteThemeCustomFonts];
  const siteThemeCustomColors =
    payload.siteThemeCustomColors !== undefined
      ? [...payload.siteThemeCustomColors]
      : [...SITE_UI_DEFAULTS.siteThemeCustomColors];

  return {
  siteLogoSrc: payload.siteLogoSrc ?? SITE_UI_DEFAULTS.siteLogoSrc,
  homeHeroImageSrc:
    payload.homeHeroImageSrc ?? SITE_UI_DEFAULTS.homeHeroImageSrc,
  homeHeroImageAlt:
    payload.homeHeroImageAlt ?? SITE_UI_DEFAULTS.homeHeroImageAlt,
  homeHeroTitle: payload.homeHeroTitle ?? SITE_UI_DEFAULTS.homeHeroTitle,
  homeHeroBody: payload.homeHeroBody ?? SITE_UI_DEFAULTS.homeHeroBody,
  homeAboutHeading:
    payload.homeAboutHeading ?? SITE_UI_DEFAULTS.homeAboutHeading,
  homeAboutBody: payload.homeAboutBody ?? SITE_UI_DEFAULTS.homeAboutBody,
  homeAboutLinkLabel:
    payload.homeAboutLinkLabel ?? SITE_UI_DEFAULTS.homeAboutLinkLabel,
  homeSlideshowImageSrcs:
    payload.homeSlideshowImageSrcs !== undefined
      ? [...payload.homeSlideshowImageSrcs].map((s) => s.trim()).filter(Boolean)
      : undefined,
  homeServicesHeading:
    payload.homeServicesHeading ?? SITE_UI_DEFAULTS.homeServicesHeading,
  homeServicesIntro:
    payload.homeServicesIntro ?? SITE_UI_DEFAULTS.homeServicesIntro,
  homeReviewsHeading:
    payload.homeReviewsHeading ?? SITE_UI_DEFAULTS.homeReviewsHeading,
  aboutHeading: payload.aboutHeading ?? SITE_UI_DEFAULTS.aboutHeading,
  aboutBioParagraph1:
    payload.aboutBioParagraph1 ?? SITE_UI_DEFAULTS.aboutBioParagraph1,
  aboutBioParagraph2:
    payload.aboutBioParagraph2 ?? SITE_UI_DEFAULTS.aboutBioParagraph2,
  aboutClosingLine:
    payload.aboutClosingLine ?? SITE_UI_DEFAULTS.aboutClosingLine,
  contactEyebrow: payload.contactEyebrow ?? SITE_UI_DEFAULTS.contactEyebrow,
  contactHeading: payload.contactHeading ?? SITE_UI_DEFAULTS.contactHeading,
  contactIntro: payload.contactIntro ?? SITE_UI_DEFAULTS.contactIntro,
  contactReachHeading:
    payload.contactReachHeading ?? SITE_UI_DEFAULTS.contactReachHeading,
  contactSocialHeading:
    payload.contactSocialHeading ?? SITE_UI_DEFAULTS.contactSocialHeading,
  contactSocialBlurb:
    payload.contactSocialBlurb ?? SITE_UI_DEFAULTS.contactSocialBlurb,
  contactPhoneDisplay:
    payload.contactPhoneDisplay ?? SITE_UI_DEFAULTS.contactPhoneDisplay,
  contactPhoneTel: payload.contactPhoneTel ?? SITE_UI_DEFAULTS.contactPhoneTel,
  contactEmail: payload.contactEmail ?? SITE_UI_DEFAULTS.contactEmail,
  contactSocialLinks:
    payload.contactSocialLinks !== undefined
      ? payload.contactSocialLinks.filter((l) => l.href?.trim())
      : SITE_UI_DEFAULTS.contactSocialLinks,
  servicesPageHeading:
    payload.servicesPageHeading ?? SITE_UI_DEFAULTS.servicesPageHeading,
  pricingEyebrow:
    payload.pricingEyebrow ?? SITE_UI_DEFAULTS.pricingEyebrow,
  portfolioEyebrow:
    payload.portfolioEyebrow ?? SITE_UI_DEFAULTS.portfolioEyebrow,
  portfolioHeading:
    payload.portfolioHeading ?? SITE_UI_DEFAULTS.portfolioHeading,
  serviceDetailWhatToExpectHeading:
    payload.serviceDetailWhatToExpectHeading ??
    SITE_UI_DEFAULTS.serviceDetailWhatToExpectHeading,
  hiddenSessionSlugs:
    payload.hiddenSessionSlugs !== undefined
      ? [...payload.hiddenSessionSlugs]
      : [...SITE_UI_DEFAULTS.hiddenSessionSlugs],
  additionalSessionSlugs:
    payload.additionalSessionSlugs !== undefined
      ? [...payload.additionalSessionSlugs]
          .map((s) => s.trim())
          .filter(Boolean)
      : [...SITE_UI_DEFAULTS.additionalSessionSlugs],
  removedBuiltInSessionSlugs:
    payload.removedBuiltInSessionSlugs !== undefined
      ? [...payload.removedBuiltInSessionSlugs]
          .map((s) => s.trim())
          .filter(Boolean)
      : [...SITE_UI_DEFAULTS.removedBuiltInSessionSlugs],
  sessionOverrides: mergeSessionOverrides(
    SITE_UI_DEFAULTS.sessionOverrides,
    payload.sessionOverrides,
  ),
  seoHomeDocumentTitle:
    payload.seoHomeDocumentTitle ?? SITE_UI_DEFAULTS.seoHomeDocumentTitle,
  seoHomeMetaDescription:
    payload.seoHomeMetaDescription ?? SITE_UI_DEFAULTS.seoHomeMetaDescription,
  seoAboutDocumentTitle:
    payload.seoAboutDocumentTitle ?? SITE_UI_DEFAULTS.seoAboutDocumentTitle,
  seoAboutMetaDescription:
    payload.seoAboutMetaDescription ??
    SITE_UI_DEFAULTS.seoAboutMetaDescription,
  seoContactDocumentTitle:
    payload.seoContactDocumentTitle ??
    SITE_UI_DEFAULTS.seoContactDocumentTitle,
  seoContactMetaDescription:
    payload.seoContactMetaDescription ??
    SITE_UI_DEFAULTS.seoContactMetaDescription,
  seoServicesIndexDocumentTitle:
    payload.seoServicesIndexDocumentTitle ??
    SITE_UI_DEFAULTS.seoServicesIndexDocumentTitle,
  seoServicesIndexMetaDescription:
    payload.seoServicesIndexMetaDescription ??
    SITE_UI_DEFAULTS.seoServicesIndexMetaDescription,
  seoPortfolioIndexDocumentTitle:
    payload.seoPortfolioIndexDocumentTitle ??
    SITE_UI_DEFAULTS.seoPortfolioIndexDocumentTitle,
  seoPortfolioIndexMetaDescription:
    payload.seoPortfolioIndexMetaDescription ??
    SITE_UI_DEFAULTS.seoPortfolioIndexMetaDescription,
  seoAdminDocumentTitle:
    payload.seoAdminDocumentTitle ?? SITE_UI_DEFAULTS.seoAdminDocumentTitle,
  seoAdminMetaDescription:
    payload.seoAdminMetaDescription ?? SITE_UI_DEFAULTS.seoAdminMetaDescription,
    siteThemeCustomFonts,
    siteThemeCustomColors,
    siteThemeFontPreset: normalizeSiteThemeFontPreset(
      payload.siteThemeFontPreset ?? SITE_UI_DEFAULTS.siteThemeFontPreset,
      siteThemeCustomFonts,
    ),
    siteThemeColorPreset: normalizeSiteThemeColorPreset(
      payload.siteThemeColorPreset ?? SITE_UI_DEFAULTS.siteThemeColorPreset,
      siteThemeCustomColors,
    ),
  };
};

type SessionCopyFields = { blurb: string; longDescription: string };

/** Built-in sessions minus removed, then admin-added slugs (order: code order, then additions). */
export const getActiveSessionSlugsForSite = (ui: MergedSiteUi): string[] => {
  const removed = new Set(ui.removedBuiltInSessionSlugs ?? []);
  const built = SESSION_TYPES.map((s) => s.slug).filter((s) => !removed.has(s));
  return [...built, ...(ui.additionalSessionSlugs ?? [])];
};

export const getSessionBaseForSlug = (
  slug: string,
  ui: MergedSiteUi,
): SessionType => {
  const removed = new Set(ui.removedBuiltInSessionSlugs ?? []);
  const additional = new Set(ui.additionalSessionSlugs ?? []);
  const builtIn = SESSION_TYPES.find((s) => s.slug === slug);
  if (builtIn) {
    if (removed.has(slug)) {
      throw new Error(`Session removed: ${slug}`);
    }
    return builtIn;
  }
  if (additional.has(slug)) {
    return createSyntheticSessionType(slug);
  }
  throw new Error(`Unknown session slug: ${slug}`);
};

export const getDisplaySession = (slug: string, ui: MergedSiteUi) => {
  const base = getSessionBaseForSlug(slug, ui);
  const o = ui.sessionOverrides[slug] ?? {};
  const { blurb, longDescription } = base as SessionCopyFields;
  const baseLong = longDescription || blurb;
  const tierPackages =
    "tierPackages" in base ? base.tierPackages : undefined;
  const whatToExpect =
    "whatToExpect" in base ? base.whatToExpect : undefined;

  return {
    slug,
    title: o.title?.trim() ? o.title.trim() : base.title,
    blurb: o.blurb?.trim() ? o.blurb.trim() : base.blurb,
    longDescription: o.longDescription?.trim()
      ? o.longDescription.trim()
      : baseLong,
    serviceCardImageSrc: o.serviceCardImageSrc?.trim()
      ? o.serviceCardImageSrc.trim()
      : sessionCardImage(slug),
    portfolioCardImageSrc: o.portfolioCardImageSrc?.trim()
      ? o.portfolioCardImageSrc.trim()
      : portfolioPreviewUrl(slug),
    tierPackages,
    whatToExpect,
    whatToExpectMarkdown: o.whatToExpectMarkdown?.trim()
      ? o.whatToExpectMarkdown.trim()
      : undefined,
    tierWhatToExpectMarkdownByLabel: o.tierWhatToExpectMarkdownByLabel,
    portfolioGalleryBookingUrl: o.portfolioGalleryBookingUrl?.trim()
      ? o.portfolioGalleryBookingUrl.trim()
      : undefined,
  };
};

export type DisplaySession = ReturnType<typeof getDisplaySession>;

export const getVisibleSessionTypes = (ui: MergedSiteUi): SessionType[] => {
  const hidden = new Set(ui.hiddenSessionSlugs ?? []);
  const out: SessionType[] = [];
  for (const slug of getActiveSessionSlugsForSite(ui)) {
    if (hidden.has(slug)) {
      continue;
    }
    out.push(getSessionBaseForSlug(slug, ui));
  }
  return out;
};

export const getGalleryImageSrcs = (
  slug: string,
  ui: MergedSiteUi,
): string[] => {
  const custom = ui.sessionOverrides[slug]?.portfolioGalleryImageSrcs?.filter(
    (s) => s.trim().length > 0,
  );
  const placeholders =
    (GALLERY_PLACEHOLDER_IMAGES as Record<string, string[] | undefined>)[slug] ??
    [];
  const base: string[] =
    custom && custom.length > 0 ? [...custom] : [...placeholders];
  const card = getDisplaySession(slug, ui).serviceCardImageSrc.trim();
  if (!card) {
    return base;
  }
  return [card, ...base.filter((src) => src !== card)];
};

const slideshowImageDedupeKey = (raw: string): string => {
  const t = raw.trim();
  if (!t) {
    return "";
  }
  if (t.startsWith("http://") || t.startsWith("https://")) {
    try {
      const u = new URL(t);
      const path = u.pathname.replace(/\/+$/, "");
      return `${u.origin}${path}`.toLowerCase();
    } catch {
      return t.toLowerCase();
    }
  }
  const norm = t.replace(/\\/g, "/").replace(/\/+$/, "");
  return norm.toLowerCase();
};

const slideshowSessionOrder = (ui: MergedSiteUi): string[] => {
  const active = new Set(getActiveSessionSlugsForSite(ui));
  const ordered: string[] = [];
  for (const slug of HOME_SLIDESHOW_GALLERY_ORDER) {
    if (active.has(slug) && !ordered.includes(slug)) {
      ordered.push(slug);
    }
  }
  for (const slug of getActiveSessionSlugsForSite(ui)) {
    if (!ordered.includes(slug)) {
      ordered.push(slug);
    }
  }
  return ordered;
};

/** Unique image URLs from every visible portfolio gallery (for home slideshow). */
export const getAllPortfolioGalleryImageSrcsForSlideshow = (
  ui: MergedSiteUi,
): string[] => {
  const hidden = new Set(ui.hiddenSessionSlugs ?? []);
  const out: string[] = [];
  const seen = new Set<string>();
  for (const slug of slideshowSessionOrder(ui)) {
    if (hidden.has(slug)) {
      continue;
    }
    if (sessionUsesLogoInsteadOfPhotos(slug)) {
      continue;
    }
    for (const src of getGalleryImageSrcs(slug, ui)) {
      const t = src.trim();
      const key = slideshowImageDedupeKey(t);
      if (t && key && !seen.has(key)) {
        seen.add(key);
        out.push(t);
      }
    }
  }
  return out;
};

/** Home hero carousel: explicit admin order, or merged galleries when unset. */
export const getResolvedHomeSlideshowImageSrcs = (
  ui: MergedSiteUi,
): string[] => {
  if (ui.homeSlideshowImageSrcs !== undefined) {
    return [...ui.homeSlideshowImageSrcs];
  }
  return getAllPortfolioGalleryImageSrcsForSlideshow(ui);
};

/** Every unique gallery image URL across all sessions (admin picker). */
export const collectAllGalleryImageUrlsForAdmin = (ui: MergedSiteUi): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const slug of getActiveSessionSlugsForSite(ui)) {
    for (const raw of getGalleryImageSrcs(slug, ui)) {
      const t = raw.trim();
      if (!t || seen.has(t)) {
        continue;
      }
      seen.add(t);
      out.push(t);
    }
  }
  return out;
};

export const getTierDisplayTitle = (
  slug: string,
  canonicalTierLabel: string,
  ui: MergedSiteUi,
): string => {
  const raw =
    ui.sessionOverrides[slug]?.tierDisplayTitles?.[canonicalTierLabel]?.trim();
  return raw || canonicalTierLabel;
};

export const getServiceDetailFeatureImageSrc = (
  slug: string,
  ui: MergedSiteUi,
  fallbackSrc: string,
): string => {
  const v = ui.sessionOverrides[slug]?.serviceDetailFeatureImageSrc?.trim();
  return v ? v : fallbackSrc;
};

/**
 * Fetches saved site UI during `next build` when `NEXT_PUBLIC_SITE_UI_API_URL` is set
 * (used for portfolio static paths and sitemap). Returns null on failure or missing env.
 */
export const fetchMergedSiteUiForBuild = async (): Promise<MergedSiteUi | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_UI_API_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) {
    return null;
  }
  try {
    const res = await fetch(`${baseUrl}/site-ui`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return null;
    }
    const data: unknown = await res.json();
    const payload =
      data && typeof data === "object" && "payload" in data
        ? (data as { payload: unknown }).payload
        : null;
    if (!payload || typeof payload !== "object") {
      return null;
    }
    return mergeSiteUi(payload as SiteUiPayload);
  } catch {
    return null;
  }
};
