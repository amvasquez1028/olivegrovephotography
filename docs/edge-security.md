# Edge security (CSP, HSTS, etc.)

This public app is a **static export** (`next build` → `out/`). It does not run Node in production. **Security headers are not set by Next.js** in this mode; apply them at your **hosting edge** (for example [Amazon CloudFront response headers policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-response-headers-policies.html), or the equivalent in Vercel / Netlify).

## Why use edge headers

- **HSTS** enforces HTTPS for your apex and subdomains.
- **CSP** (Content-Security-Policy) reduces impact of any markup/injection issues by restricting script, style, and connection sources.
- **Frame / referrer** headers reduce clickjacking and information leakage.
- A static site can still be framed or hit by mixed content if headers are never set; the edge is the right place to fix that.

## Recommended direction (tune to your real hosts)

1. **Start strict for scripts**, then relax only where needed:
   - Allow `'self'` for your site origin and `https:` for your image/CDN and **your** `NEXT_PUBLIC_SITE_UI_API_URL` host (if different).
   - Avoid `unsafe-inline` in `script-src` if you can; Next static export and your bundle may allow a nonce- or hash-based policy only if the host supports it—many teams use a **reviewed** CSP and allow `unsafe-inline` for styles only in the short term.

2. **HSTS**: `max-age` of at least one year, `includeSubDomains` if all subdomains are HTTPS, `preload` only after you are sure.

3. **X-Frame-Options** (or `frame-ancestors` in CSP): `SAMEORIGIN` or `DENY` for a typical marketing site unless you intentionally embed the site in an iframe elsewhere.

4. **Referrer-Policy**: e.g. `strict-origin-when-cross-origin` is a solid default.

5. **API CORS** (not in this repo) must still allow your **public site origin** to call the read-only GET; lock down **mutating** routes in the private stack. Headers here do not replace CORS on the API.

6. **COOP / COEP** are optional; enabling strict COEP can break third-party widgets. Treat as advanced hardening, not a default.

Revisit the policy when you add analytics, chat widgets, or new asset domains.
