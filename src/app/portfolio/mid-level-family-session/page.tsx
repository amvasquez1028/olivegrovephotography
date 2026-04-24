import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function MidLevelFamilyPortfolioRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/portfolio/family-session"
      message="Family galleries are combined under Family sessions."
      linkLabel="Open Family sessions gallery"
    />
  );
}
