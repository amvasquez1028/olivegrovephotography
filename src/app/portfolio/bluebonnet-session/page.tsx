import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function BluebonnetPortfolioRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/portfolio/seasonal-sessions"
      message="Bluebonnet galleries are now under Seasonal sessions."
      linkLabel="Open Seasonal sessions gallery"
    />
  );
}
