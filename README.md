# Olive Grove Photography — public source snapshot

This tree is generated from the **private** studio repository. It intentionally omits:

- `/admin` and all admin-only React modules
- `/login` and Cognito / Amplify authentication
- `saveSiteUiPayload`, presigned S3 uploads, and other admin-only client code
- `infrastructure/`, `lambda/`, deployment PowerShell, root `amplify.yml` (this snapshot is the Next app only; `scripts/` only contains `strip-default-favicon.cjs` for the build)

The marketing site still loads merged content from **`NEXT_PUBLIC_SITE_UI_API_URL`** (same GET endpoint as production), so you need that URL set to build or run locally.

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
