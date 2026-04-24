import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function AnimalMiniPortfolioRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/portfolio/special-sessions"
      message="Special session galleries are combined under Special sessions."
      linkLabel="Open Special sessions gallery"
    />
  );
}
