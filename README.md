# Olive Grove Photography — public source snapshot

This tree is generated from the **private** studio repository. It intentionally omits:

- `/admin` and all admin-only React modules
- `/login` and Cognito / Amplify authentication
- `saveSiteUiPayload`, presigned S3 uploads, and other admin-only client code
- `infrastructure/`, `lambda/`, deployment PowerShell, root `amplify.yml` (this snapshot is the Next app only; `scripts/` only contains `strip-default-favicon.cjs` for the build)

The marketing site still loads merged content from **`NEXT_PUBLIC_SITE_UI_API_URL`** (same GET endpoint as production), so you need that URL set to build or run locally.

**Where API security actually lives:** The read-only public bundle only calls the HTTP GET API from the browser. **Authentication of writes, IAM, CORS for mutating routes, Lambda authorizers, and DynamoDB** are implemented in the **private** repository and in **AWS**—this public repo is not a substitute for that review.

## Production vs local dev (static `out/` vs `next start`)

- **Production and CI:** The app is built with [`output: "export"`](./next.config.ts), so `npm run build` produces a static site under **`out/`**. Deploy that folder to S3, CloudFront, or any static host. Do not rely on `next start` for the exported site—it is meant for a non-export Next server, which this project is not.
- **Local dev:** Use `npm run dev` (or `next dev` as in `package.json`) while editing. The `start` script points at `next start`; for this repo it is a convenience and does not match a typical **production** static deployment.

## Edge security (CSP, HSTS, CloudFront)

This repository does not configure response headers. Apply **CSP, HSTS, and related headers at the CDN** (e.g. CloudFront response headers policy). See [docs/edge-security.md](docs/edge-security.md) for a concise checklist and [AWS response headers policy documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-response-headers-policies.html).

## Generate a fresh export (maintainers)

From the private repo root:

```powershell
.\scripts\export-public-site-sources.ps1
```

Optional: `-OutputDir D:\path\to\olive-grove-photography-public` and `-Force` to overwrite.

Then review the folder, run `npm install` and `npm run build`, and push to a **separate** public GitHub repository.

## Security before `git push` (public remote)

- Confirm **no** `.env`, `.env.local`, or `.env.production.local` files are tracked.
- Run `git log -p` on a fresh clone or use secret scanning; never commit IAM keys, Cognito app secrets, or personal tokens.
- Prefer passing your **public** Git remote URL at runtime, not in committed files, for example:
  - `OGP_PUBLIC_GIT_REMOTE` or `-PublicRemoteUrl` in `.\scripts\publish-public-snapshot.ps1` (see that script’s header for placeholders)

## Private repo

Admin UI, login, Cognito wiring, and deploy automation remain in the private repository only.
