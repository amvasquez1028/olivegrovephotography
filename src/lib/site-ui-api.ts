import { type SiteUiPayload } from "@/lib/site-ui-defaults";

const getApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_SITE_UI_API_URL?.trim().replace(/\/$/, "") ?? "";

/**
 * Public snapshot: read-only GET. No Amplify / Cognito (admin save lives in the private repo).
 */
export const loadSiteUiPayload = async (): Promise<SiteUiPayload> => {
  const base = getApiBaseUrl();
  if (!base) {
    return {};
  }
  const res = await fetch(`${base}/site-ui`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(
      errBody.trim() || `Failed to load site settings (${res.status}).`,
    );
  }
  const data: unknown = await res.json();
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {};
  }
  const raw = (data as { payload?: unknown }).payload;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {};
  }
  return raw as SiteUiPayload;
};
