import type { MetadataRoute } from "next";

const BASE = "https://olivegrovephotography.com";

export const dynamic = "force-static";

/**
 * Tell crawlers not to request studio-only routes. The marketing site and public
 * export still ship this file for consistency; public builds do not include the
 * admin or login app routes, but the rules remain harmless.
 */
const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/login", "/login/"],
    },
  ],
  sitemap: `${BASE}/sitemap.xml`,
});

export default robots;
