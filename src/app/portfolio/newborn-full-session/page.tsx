import { DynamicClientReplaceRedirect } from "@/components/DynamicClientReplaceRedirect";

export default function NewbornFullPortfolioRedirectPage() {
  return (
    <DynamicClientReplaceRedirect
      href="/portfolio/newborn-session"
      message="Newborn galleries are combined under Newborn sessions."
      linkLabel="Open Newborn sessions gallery"
    />
  );
}
