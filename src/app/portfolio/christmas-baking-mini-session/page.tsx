import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function ChristmasBakingMiniPortfolioRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/portfolio/holiday-sessions"
      message="Holiday galleries are combined under Holiday sessions."
      linkLabel="Open Holiday sessions gallery"
    />
  );
}
