export const SITE_NAME = "Olive Grove Photography";

/** Shown on the sign-in gate and while session is checked (production: auth required). */
export const SITE_SIGN_IN_REQUIRED_BLURB =
  "Olive Grove Photography — access the site after you sign in.";

export const SITE_TAGLINE =
  "Waco-based portrait and lifestyle photography for families, newborns, seniors, milestones, and seasonal minis—rooted in connection and honest light.";

export const SITE_LOGO_SRC = "/brand/page-profile.jpg";

/** Home hero image (`public/gallery/hero-home-chels.jpg`). */
export const HERO_IMAGE_SRC = "/gallery/hero-home-chels.jpg";

/** Service cards + portfolio preview for the bluebonnet sessions. */
export const BLUEBONNET_CARD_IMAGE_SRC = "/gallery/Bluebonnet1.jpg";

/** Bluebonnet portfolio gallery only (not the hero/card image). */
export const BLUEBONNET_GALLERY_IMAGE_SRCS = [
  "/gallery/Bluebonnet2.png",
  "/gallery/Bluebonnet3.png",
  "/gallery/Bluebonnet4.png",
] as const;
export const FACEBOOK_PAGE_URL =
  "https://www.facebook.com/OliveGrovePhotography";
/** Opens a Facebook Messenger thread with the business page when supported. */
export const FACEBOOK_MESSENGER_URL = "https://m.me/OliveGrovePhotography";
export const FACEBOOK_REVIEWS_URL = `${FACEBOOK_PAGE_URL}/reviews`;

export const STUDIO_PHONE_DISPLAY = "(210) 897-4884";
export const STUDIO_PHONE_TEL = "tel:+12108974884";

export const BOOKING_URL = "https://book.usesession.com/i/S1Hlve7Nlm";

/** Optional “What to expect” layout for a service detail page. */
export type SessionWhatToExpect = {
  preambleLines: readonly string[];
  bullets: readonly string[];
  footnote?: string;
};

/** Side-by-side package tiers (e.g. family mini / mid / full) on a service detail page. */
export type SessionTierPackage = {
  tierLabel: string;
  whatToExpect: SessionWhatToExpect;
};

export const SESSION_TYPES = [
  {
    slug: "family-session",
    title: "Family sessions",
    blurb: "Mini, mid, and full family packages.",
    longDescription:
      "Family photography is offered in three packages so you can choose the pace and variety that fits you. Minis hit the highlights; mid-level sessions add flexibility and more groupings; full sessions leave room for wardrobe changes and unhurried storytelling at a meaningful location.",
    tierPackages: [
      {
        tierLabel: "Mini",
        whatToExpect: {
          preambleLines: [
            "A sweet little window for updated wall photos and holiday cards—snuggly, efficient, and designed around wiggly kiddos.",
          ],
          bullets: [
            "$250",
            "20 minutes",
            "8 digital images",
            "Online gallery",
            "Print Release",
          ],
        },
      },
      {
        tierLabel: "Mid",
        whatToExpect: {
          preambleLines: [
            "A bit more room to breathe: more groupings, a relaxed pace, and space for everyone’s personality to show up in the frame.",
          ],
          bullets: [
            "$375",
            "45 minutes",
            "15 digital images",
            "Online gallery",
            "Print Release",
          ],
        },
      },
      {
        tierLabel: "Full",
        whatToExpect: {
          preambleLines: [
            "The whole story—wardrobe changes, a meaningful location, and unhurried time to chase giggles, quiet hugs, and the in-between moments you’ll want to keep.",
          ],
          bullets: [
            "$525",
            "60-75 minutes",
            "25 digital images",
            "Online gallery",
            "Print Release",
          ],
        },
      },
    ] as const satisfies readonly SessionTierPackage[],
  },
  {
    slug: "newborn-session",
    title: "Newborn sessions",
    blurb: "Mini, mid, and full newborn packages.",
    longDescription:
      "Newborn photography is offered in three packages so you can choose the pace and coverage that fits your family.",
    tierPackages: [
      {
        tierLabel: "Mini",
        whatToExpect: {
          preambleLines: [
            "Newborn minis prioritize rest and feeding schedules while delivering a curated set of wrapped poses ideal for fresh babies in the first few weeks.",
          ],
          bullets: [
            "$349 plus tax",
            "45-60 minutes",
            "7 digital images",
            "Online gallery",
            "Print release",
            "*These will be wrapped poses*",
          ],
        },
      },
      {
        tierLabel: "Mid",
        whatToExpect: {
          preambleLines: [
            "The Sweet Pea sessions lean into dreamy wraps and unhurried pacing with family poses if desired. Safety and warmth come first while we document those fleeting newborn features.",
          ],
          bullets: [
            "$450 plus tax",
            "1.5-2 hours",
            "15 digital images",
            "online gallery",
            "Print release",
            "*Includes mini wraps and poses*",
          ],
        },
      },
      {
        tierLabel: "Full",
        whatToExpect: {
          preambleLines: [
            "Enjoy a relaxed session catered to baby's needs for breaks. This package has multiple setups, sibling and family portraits, and a wider variety of poses and angles.",
          ],
          bullets: [
            "$575",
            "2-2.5 hours",
            "25 digital images",
            "Online gallery",
            "Print release",
            "*Includes mini and sweet pea packages*",
          ],
        },
      },
    ] as const satisfies readonly SessionTierPackage[],
  },
  {
    slug: "maternity-session",
    title: "Maternity sessions",
    blurb: "Celebrate pregnancy with flattering light, movement, and emotional connection.",
    longDescription:
      "Maternity sessions are an amazing way to capture the milestone of your pregnancy with the excitement of your little one's arrival!",
    whatToExpect: {
      preambleLines: [
        "Maternity sessions are an amazing way to capture the milestone of your pregnancy with the excitement of your little one's arrival!",
        "$350",
      ],
      bullets: [
        "45 minutes",
        "ALL MATERNITY SESSIONS BUNDLED WITH NEWBORN SESSIONS RECEIVE 50% OFF your Maternity session. To receive this deal, book your newborn session and add on the maternity session",
      ],
    } satisfies SessionWhatToExpect,
  },
  {
    slug: "milestone-sessions",
    title: "Milestone sessions",
    blurb: "Classic milestones and cake smash packages for birthdays and stages.",
    longDescription:
      "Celebrate milestones with portraits and cake smashing.",
    tierPackages: [
      {
        tierLabel: "Classic simple milestone",
        whatToExpect: {
          preambleLines: [
            "Straightforward milestone sessions focused on classic poses, simple backdrops, and baby-led pacing. Ideal when you want beautiful images that age gracefully.",
          ],
          bullets: [],
        },
      },
      {
        tierLabel: "Mid-level milestone + cake smash",
        whatToExpect: {
          preambleLines: [
            "This package balances portrait time with a full cake smash story: clean portraits first, then messy, joyful frosting moments. Styling guidance included for outfit changes and the smash setup.",
          ],
          bullets: [],
        },
      },
      {
        tierLabel: "Milestone + cake smash",
        whatToExpect: {
          preambleLines: [
            "We start with polished milestone portraits, then transition to the cake smash with a coordinated set. Bring the cake or ask for vendor recommendations.",
          ],
          bullets: [],
        },
      },
    ] as const satisfies readonly SessionTierPackage[],
  },
  {
    slug: "graduation-sessions",
    title: "Graduation sessions",
    blurb:
      "Compact graduation minis and full senior + graduation storytelling with caps, gowns, and personality.",
    longDescription:
      "Mini and full graduation packages honoring caps, gowns, and personality",
    tierPackages: [
      {
        tierLabel: "Graduation mini",
        whatToExpect: {
          preambleLines: [
            "Graduation minis are efficient but celebratory: cap, gown, and plenty of joy. Perfect for seniors who want quality images without a full-day commitment.",
          ],
          bullets: [],
        },
      },
      {
        tierLabel: "Senior + graduation",
        whatToExpect: {
          preambleLines: [
            "Senior plus graduation sessions blend editorial portraits with cap-and-gown moments. Planned locations that feel personal, multiple outfits, and a mix of classic and creative poses.",
          ],
          bullets: [],
        },
      },
    ] as const satisfies readonly SessionTierPackage[],
  },
  {
    slug: "headshot-session",
    title: "Headshot sessions",
    blurb: "Professional headshots with flattering light and confident, approachable direction.",
    longDescription:
      "Update your website, LinkedIn, or speaker bios with headshots that feel like you. Includes coaching on posture and expressions.",
    whatToExpect: {
      preambleLines: [
        "Professional headshots in the studio or outside of my studio.",
        "$150",
      ],
      bullets: [
        "Crawford only",
        "2 fully edited digital images of your choice",
      ],
    } satisfies SessionWhatToExpect,
  },
  {
    slug: "sports-portraits",
    title: "Sports sessions",
    blurb: "Bold, clean athletic portraits for players who want more than a yearbook snap.",
    longDescription:
      "Celebrate athletic accomplishments with a sports session.",
    whatToExpect: {
      preambleLines: [
        "Celebrate athletic accomplishments with bold, clean portraits for players who want more than a yearbook snap.",
        "$250",
      ],
      bullets: [
        "45 min",
        "20 digital images",
        "online gallery",
        "print release",
      ],
    } satisfies SessionWhatToExpect,
  },
  {
    slug: "seasonal-sessions",
    title: "Seasonal sessions",
    blurb: "Greenhouse, bluebonnet, and sunflower outdoor and botanical portraits.",
    longDescription:
      "Stop and smell the roses in the beautiful Texan outdoors with a portrait session in a greenhouse or wildflower field. Availability dependent on seasonality and timing of flower blossoms.",
    tierPackages: [
      {
        tierLabel: "Greenhouse",
        whatToExpect: {
          preambleLines: [
            "Greenhouse sessions use lush indoor botanical spaces for portraits with steady light and curated greenery—ideal when you want a natural look without depending on outdoor weather.",
          ],
          bullets: [],
        },
      },
      {
        tierLabel: "Bluebonnet",
        whatToExpect: {
          preambleLines: [
            "Spring into the new season with bluebonnet portraits: a classic Texan tradition.",
          ],
          bullets: [],
          footnote:
            "Sessions will be dependent on bluebonnets which will most likely start popping out mid-March.",
        },
      },
      {
        tierLabel: "Sunflower",
        whatToExpect: {
          preambleLines: [
            "Sunflower sessions capture warm, open-air portraits among tall blooms when fields are at peak season. Timing follows bloom cycles and daylight—book early for the best dates.",
          ],
          bullets: [],
        },
      },
    ] as const satisfies readonly SessionTierPackage[],
  },
  {
    slug: "holiday-sessions",
    title: "Holiday sessions",
    blurb:
      "Festive holiday minis and seasonal portraits for Christmas, Valentines, Thanksgiving, and Easter.",
    longDescription:
      "Book a festive session in preparation for upcoming holidays. Availability dependent on upcoming calendar events.",
    tierPackages: [
      {
        tierLabel: "Christmas",
        whatToExpect: {
          preambleLines: [
            "Christmas baking minis mix seasonal decor with interactive prompts. Think rolling dough, sprinkles, and aprons. Short, structured time slots keep kids engaged and whimsy alive.",
          ],
          bullets: [],
        },
      },
      {
        tierLabel: "Valentines",
        whatToExpect: {
          preambleLines: [
            "Valentine minis are short, themed sessions designed for little ones and siblings. Sets stay simple and cheerful so genuine smiles shine through.",
          ],
          bullets: [],
        },
      },
      {
        tierLabel: "Thanksgiving",
        whatToExpect: {
          preambleLines: [
            "Thanksgiving sessions lean into rich textures, fall palettes, and family. Fantastic for cards, gifts, and mantle prints before the holiday rush.",
          ],
          bullets: [],
        },
      },
      {
        tierLabel: "Easter",
        whatToExpect: {
          preambleLines: [
            "Easter sessions celebrate spring renewal with soft palettes, themed props, and family-friendly setups. Short time slots keep little ones engaged while we capture joyful holiday memories.",
          ],
          bullets: [],
        },
      },
    ] as const satisfies readonly SessionTierPackage[],
  },
  {
    slug: "special-sessions",
    title: "Special sessions",
    blurb: "Teepee parties and animal-forward mini sessions.",
    longDescription:
      "Wonderful miscellaneous sessions that include teepee parties and animal friends. Book as soon as you are interested, as availability is limited and these unique sessions may not occur again!",
    tierPackages: [
      {
        tierLabel: "Animal",
        whatToExpect: {
          preambleLines: [
            "Animal minis pair curated sets with safe, supervised animal interactions when available. Perfect for kids who light up around bunnies, ponies, or barn friends. Details vary by event and date.",
          ],
          bullets: [],
        },
      },
      {
        tierLabel: "Teepee",
        whatToExpect: {
          preambleLines: [
            "Teepee rental party coverage documents the setup, details, and group fun when you are hosting a styled sleepover or celebration. Combine rental aesthetics with candid laughter and keepsake group shots.",
          ],
          bullets: [],
        },
      },
    ] as const satisfies readonly SessionTierPackage[],
  },
] as const;

export type BuiltInSessionSlug = (typeof SESSION_TYPES)[number]["slug"];
/** Built-in slugs plus admin-added portfolio session slugs (string widened for custom URLs). */
export type SessionSlug = BuiltInSessionSlug | (string & {});
export type SessionType = (typeof SESSION_TYPES)[number];

export const createSyntheticSessionType = (slug: string): SessionType =>
  ({
    slug,
    title: "New session",
    blurb: "Set the title and blurb in admin.",
    longDescription: "Set the title and blurb in admin.",
    whatToExpect: {
      preambleLines: [
        "Edit “What to expect” in admin (Markdown), or replace this text with your own.",
      ],
      bullets: [],
    },
  }) as unknown as SessionType;

/** Slugs whose gallery images are shown first on the home slideshow (families & babies, then graduation, headshots, sports, then the rest). */
export const HOME_SLIDESHOW_GALLERY_ORDER: readonly BuiltInSessionSlug[] = [
  "family-session",
  "newborn-session",
  "maternity-session",
  "milestone-sessions",
  "graduation-sessions",
  "headshot-session",
  "sports-portraits",
  "seasonal-sessions",
  "holiday-sessions",
  "special-sessions",
];

export const getSessionBySlug = (slug: BuiltInSessionSlug): SessionType => {
  const found = SESSION_TYPES.find((s) => s.slug === slug);
  if (!found) {
    throw new Error(`Unknown slug: ${slug}`);
  }
  return found;
};

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/olivegrovephotography/",
    ariaLabel: "Olive Grove Photography on Instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/OliveGrovePhotography",
    ariaLabel: "Olive Grove Photography on Facebook",
  },
] as const;

export const CONTACT_EMAIL = "Olivegrovephotography@gmail.com";

/** Main biography paragraphs on the About page (Chelsea). */
export const ABOUT_BIO_PARAGRAPHS = [
  "My photography journey over the last 8 years has been one of discovery and learning my true passions. After majoring in pre-med in college and deciding not to pursue Medical school, I married the love of my life and we've had two adorable babies since. After discovering that I truly love capturing memories for my own family, this desire translated to establishing my photography business. I absolutely love working with incredible individuals, families, kids and other businesses or peers and have been so blessed by their relationships. It's my favorite thing to watch families grow through relationships, marriage, pregnancy, birth and working with their kids and seeing them grow.",
  "Sometimes our paths aren't what we expected them to be, but I've discovered that there is no greater feeling than finding your true calling. This is mine!",
] as const;

export type FacebookReviewCard =
  | {
      kind: "recommendation";
      id: string;
      quote: string;
      name: string;
      dateLabel: string;
    }
  | {
      kind: "aggregate";
      id: string;
      headline: string;
      body: string;
      href: string;
      cta: string;
    };

/** From Facebook recommendations; includes a link to the full review list. */
export const FACEBOOK_REVIEWS: readonly FacebookReviewCard[] = [
  {
    kind: "recommendation",
    id: "danielle-paulsen-2024-11",
    name: "Danielle Paulsen",
    dateLabel: "November 20, 2024 · Facebook recommendation",
    quote:
      "When you make the choice to do family photos you look for someone good with kids. However newborn takes it to a new level. You want someone who knows what they're doing and is gentle. She checked all the boxes. Make sure you communicate what vibe you want and she will make it happen. I have a toddler boy who is going through lots of emotions right now and she was able to get some great photos. Also does not take months to get photos back to you.",
  },
  {
    kind: "aggregate",
    id: "facebook-aggregate",
    headline: "100% recommend",
    body: "Read the full list of reviews or add yours on the Facebook page.",
    href: FACEBOOK_REVIEWS_URL,
    cta: "View reviews on Facebook",
  },
] as const;

/**
 * Fallback gallery URLs when no admin `portfolioGalleryImageSrcs` exist.
 * Empty: galleries use the merged card image + explicit defaults in `site-ui-defaults`.
 */
export const GALLERY_PLACEHOLDER_IMAGES: Record<BuiltInSessionSlug, string[]> =
  Object.fromEntries(
    SESSION_TYPES.map((s) => [s.slug, [] as string[]]),
  ) as Record<BuiltInSessionSlug, string[]>;

/** Services that use the studio logo instead of sample photos on cards and in the gallery slot. */
export const sessionUsesLogoInsteadOfPhotos = (slug: string): boolean => {
  void slug;
  return false;
};

export const sessionCardImage = (slug: string): string => {
  if (slug === "seasonal-sessions") {
    return BLUEBONNET_CARD_IMAGE_SRC;
  }
  if (slug === "holiday-sessions") {
    return "/gallery/fb-08.jpg";
  }
  if (slug === "milestone-sessions") {
    return "/gallery/fb-03.jpg";
  }
  if (slug === "special-sessions") {
    return "/gallery/fb-09.jpg";
  }
  if (slug === "graduation-sessions") {
    return "/gallery/fb-02.jpg";
  }
  if (slug === "sports-portraits") {
    return "/gallery/sports-portrait-putting.png";
  }
  if (slug === "family-session") {
    return "/gallery/fb-07.jpg";
  }
  if (slug === "newborn-session") {
    return "/gallery/fb-04.jpg";
  }
  if (slug === "maternity-session") {
    return "/gallery/fb-06.jpg";
  }
  if (slug === "headshot-session") {
    return "/gallery/fb-04.jpg";
  }
  return "/gallery/fb-04.jpg";
};

export const portfolioPreviewUrl = (slug: string): string =>
  sessionCardImage(slug);
