import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function TeepeeRentalPartyPortfolioRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/portfolio/special-sessions"
      message="Special session galleries are combined under Special sessions."
      linkLabel="Open Special sessions gallery"
    />
  );
}
